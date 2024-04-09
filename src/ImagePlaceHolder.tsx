import useImage from "use-image";
import { Rect, Group, Image as KonvaImage, Transformer } from "react-konva";
import React, { useCallback, useRef, useState } from "react";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store.ts";
import { toggleIsSelected } from "./store/appReducer.ts";
import { ImageState } from "./store/imageSlice.ts";

interface ImagePlaceHolderProps {
  pageId: number;
  image: ImageState;
}
export default function ImagePlaceHolder({
  pageId,
  image,
}: ImagePlaceHolderProps) {
  const { id, x, y, width, height, rotate } = image;
  const { isSelected, currentNodeId } = useSelector(
    (state: RootState) => state.app
  );

  const [imageSrc] = useImage(image.imageUrl);
  const transformerRef = useRef<Konva.Transformer | null>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const dispatch = useDispatch();

  const scaleFactor = imageSrc
    ? image.isPinned
      ? Math.min(width / imageSrc.width, height / imageSrc.height)
      : Math.max(width / imageSrc.width, height / imageSrc.height) * 1.1
    : 1;
  // console.log(
  //   " rerender ImagePlaceHolder",
  //   image.imageUrl,
  //   "scaleFactor",
  //   scaleFactor
  // );

  const handleOnImageClick = (event: KonvaEventObject<MouseEvent>) => {
    if (image.isPinned) return;
    dispatch(
      toggleIsSelected({ nodeId: id, isSelected: true, layerId: pageId })
    );
    if (transformerRef.current !== null) {
      transformerRef.current!.nodes([event.target]);
      transformerRef.current.getLayer()!.batchDraw();
    }
  };

  const transformerMarkup =
    isSelected && currentNodeId === id ? (
      <Transformer ref={transformerRef} key={image.imageUrl.slice(-10)} />
    ) : null;

  return (
    <>
      {transformerMarkup}
      <Group
        x={x}
        y={y}
        width={width}
        height={height}
        rotation={rotate || 0}
        clipFunc={(ctx) => {
          ctx.rect(0, 0, width, height);
        }}
      >
        {imageSrc && (
          <KonvaImage
            ref={imageRef}
            image={imageSrc}
            width={imageSrc.width}
            height={imageSrc.height}
            scaleX={scaleFactor}
            scaleY={scaleFactor}
            // fillPatternScaleX={1} // Maintain aspect ratio
            // fillPatternScaleY={1} // Maintain aspect ratio
            x={(width - imageSrc.width * scaleFactor) / 2}
            y={(height - imageSrc.height * scaleFactor) / 2}
            draggable={image.isPinned ? false : true}
            listening={image.isPinned ? false : true}
            // onDragMove={handleImageDragMove}
            // onDragEnd={handleImageDragEnd}
            onClick={handleOnImageClick}
          />
        )}
      </Group>
    </>
  );
}

// <Rect
//     x={x}
//     y={y}
//     width={width}
//     height={height}
//     fill={image.isPinned ? "" : "red"}
//     listening={false}
// />
