import { Transformer, Text } from "react-konva";
import Konva from "konva";
import { useRef, useEffect } from "react";
import { AppDispatch, RootState } from "./store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  setDimensions,
  setPosition,
  setTextId,
  TextState,
} from "./store/textSlice.ts";
import { toggleIsSelected } from "./store/appReducer.ts";

interface EditableTextResizeProps {
  text: TextState;
  setIsEditing: (arg: boolean) => void;
}
export default function EditableTextResize({
  text,
  setIsEditing,
}: EditableTextResizeProps) {
  const {
    id,
    pageId,
    x,
    y,
    textValue,
    width,
    height,
    fontSize,
    fontStyle,
    fontColor,
    fontFamily,
  } = text;
  const textBoxRef = useRef<Konva.Text | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);
  const { isSelected, currentNodeId } = useSelector(
    (state: RootState) => state.app
  );
  const { fontLoaded } = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch<AppDispatch>();

  // Attach transformer to text
  useEffect(() => {
    if (isSelected && transformerRef.current !== null) {
      transformerRef.current!.nodes([textBoxRef.current!]);
      transformerRef.current.getLayer()!.batchDraw();
    }
  }, [currentNodeId]);

  const handleOnClick = () => {
    dispatch(setTextId(id)); // Set current textId for Control Panel
    dispatch(
      toggleIsSelected({ nodeId: id, isSelected: true, layerId: pageId })
    );
    if (isSelected && currentNodeId === id) {
      setIsEditing(true);
    }
  };

  const handleOnTransform = () => {
    if (textBoxRef.current !== null) {
      const textNode = textBoxRef.current;
      const newWidth = textNode.width() * textNode.scaleX();
      const newHeight = textNode.height() * textNode.scaleY();
      textNode.setAttrs({
        width: newWidth,
      });
      dispatch(setDimensions({ id, width: newWidth, height: newHeight }));
    }
  };

  useEffect(() => {
    if (textBoxRef.current !== null) {
      handleOnTransform();
    }
  }, []);

  const handleOnMoving = () => {
    if (textBoxRef.current !== null) {
      const textNode = textBoxRef.current;
      const x = textNode.x();
      const y = textNode.y();
      dispatch(setPosition({ id, x, y }));
    }
  };

  const transformerMarkup =
    isSelected && currentNodeId === id ? (
      <Transformer
        ref={transformerRef}
        rotateEnabled={false}
        flipEnabled={false}
        enabledAnchors={["middle-left", "middle-right"]}
        boundBoxFunc={(_, newBox) => {
          newBox.width = Math.max(30, newBox.width);
          return newBox;
        }}
      />
    ) : null;

  return (
    <>
      <Text
        ref={textBoxRef}
        text={textValue}
        fontStyle={fontStyle}
        fill={fontColor}
        fontFamily={fontLoaded ? fontFamily : "Arial"}
        fontSize={fontSize}
        perfectDrawEnabled={false}
        onClick={handleOnClick}
        onTap={handleOnClick}
        onTransform={handleOnTransform}
        width={width}
        x={x}
        y={y}
        draggable
        onDragMove={handleOnMoving}
        onDragEnd={handleOnMoving}
      />
      {transformerMarkup}
    </>
  );
}
