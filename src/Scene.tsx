import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import Konva from "konva";
import { Stage, Layer, Circle, Rect, Text, Group } from "react-konva";
import Pages from "./Pages.tsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store.ts";
import { toggleFontLoaded, toggleIsSelected } from "./store/appReducer.ts";
import ControlPanel from "./ControlPanel.tsx";
import { FONT_LISTS, SCENE_WIDTH } from "./util/constants.ts";

const Scene = (props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage | null>(null);
  const [totalHeight, setTotalHeight] = useState(0);
  const [containerWidthStyle, setContainerWidthStyle] = useState({});
  const dispatch = useDispatch<AppDispatch>();
  // define your scene dimensions
  const initialSceneWidth = SCENE_WIDTH;
  const [sceneWidth, setSceneWidth] = useState(initialSceneWidth); // Initial value
  const [scale, setScale] = useState(1);
  const endOfStageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadFonts = async () => {
      for (const font of FONT_LISTS) {
        const fontObserver = new FontFaceObserver(font);
        await fontObserver.load();
      }
      dispatch(toggleFontLoaded({ fontLoaded: true }));
    };
    loadFonts();
  }, []);

  useLayoutEffect(() => {
    const fitStageIntoParentContainer = () => {
      const viewportWidth = document.documentElement.clientWidth; // exclude scrollbar
      const maxContainerWidth = SCENE_WIDTH;
      const percentageWidth = 0.9; // Width in percentage if viewport width is less than maxWidth

      const container = parentRef.current!;
      const containerWidth = container.offsetWidth;
      const scale = containerWidth / sceneWidth;
      setScale(scale);

      // adjust stage size and scale all objects on canvas
      stageRef.current!.width(sceneWidth * scale);
      setSceneWidth(stageRef.current!.width());
      stageRef.current!.height(totalHeight * scale);
      // stageRef.current!.scale({ x: scale, y: scale });

      if (viewportWidth < maxContainerWidth) {
        setContainerWidthStyle({
          width: "90vw",
          maxWidth: "90vw",
        });
      } else {
        setContainerWidthStyle({
          width: SCENE_WIDTH + "px",
          maxWidth: SCENE_WIDTH + "px",
        });
      }
    };

    // fit stage into parent container initially
    fitStageIntoParentContainer();

    // adapt the stage on any window resize
    window.addEventListener("resize", fitStageIntoParentContainer);
    return () => {
      window.removeEventListener("resize", fitStageIntoParentContainer);
    };
  }, [totalHeight]);

  // if (stageRef.current) {
  //   console.log("stageRef.current", stageRef.current);
  // }

  const handleGetLayers = () => {
    dispatch(
      toggleIsSelected({ nodeId: null, isSelected: false, layerId: null })
    );
    // Temporary change Stage/Scene size to export
    // const currentScale = scale;
    // stageRef.current!.width(sceneWidth * 1);
    // setSceneWidth(initialSceneWidth);
    // stageRef.current!.height(totalHeight * 1);
    // stageRef.current!.batchDraw();

    if (stageRef.current) {
      const stageClone = stageRef.current.getStage().clone();
      const currentStageWidth = stageClone.width();

      // Find exluded nodes and destroy them
      const excludedNodes = stageClone.find(
        (node: Konva.Node) => node.getAttr("exludedFromExport") && node
      );
      // console.log("excludedNodes", excludedNodes);
      excludedNodes.forEach((node: Konva.Node) => node.destroy());

      // Remove excluded nodes
      const layers = stageClone.getChildren(
        (node) => node instanceof Konva.Layer && node.getAttr("isPage")
      );

      // console.log("print layers data", layers);
      let scaleFactorOfLayerCompareToStage = 1;
      const pixelRatio =
        currentStageWidth >= 1000
          ? 2
          : currentStageWidth >= 500 && currentStageWidth < 1000
          ? 3
          : 4;
      layers.forEach((layer) => {
        console.log("layer", layer, "pixelRatio", pixelRatio);
        scaleFactorOfLayerCompareToStage = layer.getAttr("scaleX");
        const layerData = layer.toDataURL({
          pixelRatio: pixelRatio,
          height: 2025 * scaleFactorOfLayerCompareToStage,
        });
        console.log("layerData", layerData);
      });
    }
  };

  const handleScrollToEndOfStage = () => {
    if (endOfStageRef.current !== null) {
      endOfStageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={parentRef}
      id="stage-parent"
      style={{
        position: "relative",
        border: "2px solid black",
        borderRadius: "5px",
        // overflow: "hidden",
        ...containerWidthStyle, // Merge with dynamic width styles
      }}
    >
      <ControlPanel onScrollToEndOfStage={handleScrollToEndOfStage} />
      <Stage ref={stageRef} width={sceneWidth} height={totalHeight}>
        {/*<Layer>*/}
        {/*  <Circle*/}
        {/*    radius={50}*/}
        {/*    fill="red"*/}
        {/*    x={sceneWidth / 2}*/}
        {/*    y={totalHeight / 2}*/}
        {/*  />*/}
        {/*  <Rect*/}
        {/*    fill="green"*/}
        {/*    x={sceneWidth - 100}*/}
        {/*    y={totalHeight - 100}*/}
        {/*    width={100}*/}
        {/*    height={100}*/}
        {/*  />*/}
        {/*</Layer>*/}
        <Pages
          sceneWidth={sceneWidth}
          onUpdateTotalHeight={setTotalHeight}
          totalHeight={totalHeight}
        />
        {props.children}
      </Stage>
      <div style={{ visibility: "hidden" }} ref={endOfStageRef}></div>
      {/*<button onClick={handleGetLayers}>Get Layers</button>*/}
    </div>
  );
};

export default Scene;
