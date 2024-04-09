import { useEffect, useState, useLayoutEffect } from "react";
import Page from "./Page";
import { Layer, Group, Rect, Text } from "react-konva";
import { useSelector } from "react-redux";
import { RootState } from "./store/store.ts";

interface PageProps {
  sceneWidth: number;
  onUpdateTotalHeight: (totalHeight: number) => void;
}

// Add more initial layers with shapes as needed
export default function Pages({ sceneWidth, onUpdateTotalHeight }: PageProps) {
  const { pagesData } = useSelector((state: RootState) => state.app);
  const [pagesHeight, setPagesHeight] = useState(0);
  // Calculate the scale factor to fit the pages within the scene width
  const scaleFactor = sceneWidth / 1350; // Assuming the original page width is 1350px

  useEffect(() => {
    const heightSum = pagesData.reduce((sum, page) => {
      return sum + page.height + 30;
    }, 0);
    setPagesHeight(heightSum);
    onUpdateTotalHeight(heightSum * scaleFactor);
  }, [pagesData]);

  // Calculate the x position to center the layer horizontally within the scene
  const calculateXPosition = () => {
    return (sceneWidth - pagesData[0].width * scaleFactor) / 2;
  };
  const calculateYPosition = () => {
    return pagesData[0].height * scaleFactor;
  };

  // Add new page

  // i want to create a button to use addNewPage, but I can't do it here. Konva do not support create html element inside Stage

  return (
    <>
      {pagesData.map((page, index) => {
        const pageYPosition =
          index === 0 ? 0 : 30 * index + index * calculateYPosition();

        return (
          <Page
            key={page.id}
            page={page}
            pageIdx={index + 1}
            x={calculateXPosition()}
            y={pageYPosition}
            scaleX={scaleFactor}
            scaleY={scaleFactor}
          />
        );
      })}

      {/*<Layer>*/}
      {/*  <Group>*/}
      {/*    <Rect*/}
      {/*      x={20} // Adjust the x position as needed*/}
      {/*      y={totalHeight - 50} // Adjust the y position as needed*/}
      {/*      width={100}*/}
      {/*      height={50}*/}
      {/*      fill="lightblue"*/}
      {/*      onClick={addNewPage}*/}
      {/*      draggable={false} // Ensure it's not draggable*/}
      {/*    />*/}
      {/*    /!* Text inside the button *!/*/}
      {/*    <Text*/}
      {/*      x={35} // Adjust the x position as needed*/}
      {/*      y={totalHeight - 30} // Adjust the y position as needed*/}
      {/*      text="Add Page"*/}
      {/*      fontSize={16}*/}
      {/*      fill="black"*/}
      {/*      onClick={addNewPage}*/}
      {/*      draggable={false} // Ensure it's not draggable*/}
      {/*    />*/}
      {/*  </Group>*/}
      {/*</Layer>*/}
    </>
  );
}
