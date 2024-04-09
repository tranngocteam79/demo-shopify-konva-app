import React, { useEffect, useRef } from "react";
import { Group, Layer, Rect, Text } from "react-konva";
import EditableText from "./EditableText.tsx";
import { useSelector } from "react-redux";
import { RootState } from "./store/store.ts";
import useImage from "use-image";
import ImagePlaceHolder from "./ImagePlaceHolder.tsx";
import {
  toggleIsSelected,
  pushPagesRef,
  PageData,
} from "./store/appReducer.ts";
import { useDispatch } from "react-redux";
import Konva from "konva";
import DemoImage from "./DemoImage.tsx";

interface PageProps {
  x: number;
  y: number;
  page: PageData;
  pageIdx: number;
  scaleX: number;
  scaleY: number;
}
export default function Page({
  page,
  pageIdx,
  x,
  y,
  scaleX,
  scaleY,
}: PageProps) {
  const { width, height, id, bgImageUrl } = page;
  const layerRef = useRef<Konva.Layer | null>(null);
  const texts = useSelector((state: RootState) =>
    state.text.data.filter((text) => text.pageId === id)
  );
  const images = useSelector((state: RootState) =>
    state.image.data.filter((image) => image.pageId === id)
  );
  const [bgImage] = useImage(bgImageUrl);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("layerRef.current", layerRef.current?.toDataURL());
  //   if (layerRef.current !== null) {
  //     console.log(layerRef.current?.height());
  //     if (layerRef.current.canvas.height === 0) {
  //       console.log("layer is null");
  //       return;
  //     }
  //     // dispatch(pushPagesRef({ pageRef: layerRef.current }));
  //   }
  // }, []);
  // const handleExport = () => {
  //   console.log(layerRef.current!);
  //   const dataURL = layerRef.current!.toDataURL({});
  //   console.log(dataURL);
  //   // Now you can use the dataURL as needed, such as saving it or displaying it
  // };

  useEffect(() => {
    if (layerRef.current !== null) {
      const layerNode = layerRef.current;
      layerNode.setAttrs({ isPage: true });
      layerNode.setAttrs({ pageId: id });
    }
  }, [layerRef.current]);

  return (
    <Layer key={id} ref={layerRef} x={x} y={y} scaleX={scaleX} scaleY={scaleY}>
      <Rect
        width={width}
        height={height}
        fillPatternImage={bgImage} // Set the fillPatternImage to the background image URL
        fillPatternScaleX={1} // Adjust as needed
        fillPatternScaleY={1} // Adjust as needed
        fillPatternRepeat="no-repeat" // Adjust as needed
        // fill={fillColor}
        // stroke="pink"
        // strokeWidth={20}
        onClick={() => {
          dispatch(
            toggleIsSelected({ nodeId: null, isSelected: false, layerId: null })
          );
        }}
        onTap={() => {
          dispatch(
            toggleIsSelected({ nodeId: null, isSelected: false, layerId: null })
          );
        }}
      />
      <DemoImage width={width} height={height}></DemoImage>
      {images
        ? images.map((image) => (
            <ImagePlaceHolder key={image.id} pageId={id} image={image} />
          ))
        : null}
      {texts
        ? texts.map((text) => <EditableText key={text.id} text={text} />)
        : null}
      <Group exludedFromExport={true}>
        <Rect
          x={20} // Adjust the x position as needed
          y={20} // Adjust the y position as needed
          width={140}
          height={50}
          fill="lightblue"
          draggable={false} // Ensure it's not draggable
        />
        {/* Text inside the button */}
        <Text
          x={30} // Adjust the x position as needed
          y={32} // Adjust the y position as needed
          text={`Page ${pageIdx}`}
          fontSize={30}
          fill="black"
          draggable={false} // Ensure it's not draggable
        />
      </Group>
    </Layer>
  );
}
