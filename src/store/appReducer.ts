import {
  createReducer,
  createAction,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import Konva from "konva";
import React from "react";
import { Draft } from "immer";

// Define initial state for your app reducer
export const toggleIsSelected = createAction<{
  isSelected: boolean;
  nodeId: string | null;
  layerId: number | null;
}>("TOGGLE_ISSELECTED");

export const toggleFontLoaded = createAction<{
  fontLoaded: boolean;
}>("TOGGLE_FONTLOADED");

export const setExportedDataImages = createAction<{
  images: string[];
}>("SET_EXPORTED_DATA_IMAGES");

export const pushPagesRef = createAction<{
  pageRef: React.RefObject<Konva.Layer>;
}>("PUSH_PAGES_REF");

export const addNewPage = createAction<{ bgImageUrl: string }>("ADD_NEW_PAGE");

export interface PageData {
  id: number;
  width: number;
  height: number;
  fillColor?: string;
  bgImageUrl: string;
}

const initialLayersData: PageData[] = [
  {
    id: 1,
    width: 1350,
    height: 2025,
    fillColor: "green",
    bgImageUrl: "page_1.jpg",
  },
  {
    id: 2,
    width: 1350,
    height: 2025,
    fillColor: "green",
    bgImageUrl: "page_2.jpg",
  },
  {
    id: 3,
    width: 1350,
    height: 2025,
    fillColor: "green",
    bgImageUrl: "page_3.jpg",
  },
  {
    id: 4,
    width: 1350,
    height: 2025,
    fillColor: "green",
    bgImageUrl: "page_4.jpg",
  },
  {
    id: 5,
    width: 1350,
    height: 2025,
    fillColor: "green",
    bgImageUrl: "page_5.jpg",
  },
  {
    id: 6,
    width: 1350,
    height: 2025,
    fillColor: "green",
    bgImageUrl: "page_6.jpg",
  },
];
interface AppState {
  isSelected: boolean;
  currentNodeId: string | null;
  currentLayerId: number | null;
  fontLoaded: boolean;
  exportedDataImages: string[];
  pagesRef: Array<React.RefObject<Konva.Layer>>;
  pagesData: PageData[];
}

const initialAppState: AppState = {
  // Add initial state properties here
  // For example:
  isSelected: false,
  currentNodeId: null,
  currentLayerId: null,
  fontLoaded: false,
  exportedDataImages: [],
  pagesRef: [],
  pagesData: initialLayersData,
};

// Define your app reducer using createReducer
const appReducer = createReducer(initialAppState, (builder) => {
  // Define cases for your actions here
  builder.addCase(
    toggleIsSelected,
    (
      state,
      action: PayloadAction<{
        isSelected: boolean;
        nodeId: string | null;
        layerId: number | null;
      }>
    ) => {
      state.isSelected = action.payload.isSelected;
      state.currentNodeId = action.payload.nodeId;
      state.currentLayerId = action.payload.layerId;
    }
  );
  builder.addCase(
    toggleFontLoaded,
    (state, action: PayloadAction<{ fontLoaded: boolean }>) => {
      state.fontLoaded = action.payload.fontLoaded;
    }
  );

  builder.addCase(
    setExportedDataImages,
    (state, action: PayloadAction<{ images: string[] }>) => {
      state.exportedDataImages = action.payload.images;
    }
  );
  builder.addCase(
    pushPagesRef,
    (
      state,
      action: PayloadAction<{ pageRef: React.RefObject<Konva.Layer> }>
    ) => {
      state.pagesRef.push(
        action.payload.pageRef as Draft<React.RefObject<Konva.Layer>>
      );
    }
  );
  builder.addCase(
    addNewPage,
    (state, action: PayloadAction<{ bgImageUrl: string }>) => {
      state.pagesData.push({
        id: state.pagesData[state.pagesData.length - 1].id + 1,
        width: 1350,
        height: 2025,
        fillColor: "green",
        bgImageUrl: action.payload.bgImageUrl,
      });
    }
  );

  // Add more cases as needed
});

// Define your action creators using createAction

// Export your app reducer
export default appReducer;
