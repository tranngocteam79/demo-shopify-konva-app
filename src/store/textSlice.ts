import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export interface TextState {
  id: string;
  textValue: string;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  fontStyle: string;
  pageId: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

interface InitialState {
  currentTextId: string | null;
  data: TextState[];
}

export const page2Texts = {
  id: "txt" + nanoid(),
  textValue: "Click to resize and move, click one more to edit text",
  fontFamily: "Buffalo",
  fontSize: 80,
  fontColor: "white",
  fontStyle: "normal",
  pageId: 2,
  width: 600,
  height: 600,
  x: 401,
  y: 1019,
};
export const page3Texts = {
  id: "txt" + nanoid(),
  textValue:
    "“Motherhood is the big stumble in the world. It is the glorious life force. It’ii huge and scary — it’s an act of infinite optimism.” \n" +
    "— Gilda Radner",
  fontFamily: "Buffalo",
  fontSize: 60,
  fontColor: "grey",
  fontStyle: "normal",
  pageId: 3,
  width: 930,
  height: 600,
  x: 207,
  y: 866,
};
export const page4Texts = {
  id: "txt" + nanoid(),
  textValue: "“Everything I am, you helped me to be.” — unknown",
  fontFamily: "Buffalo",
  fontSize: 60,
  fontColor: "grey",
  fontStyle: "normal",
  pageId: 4,
  width: 780,
  height: 220,
  x: 264,
  y: 866,
};
export const page5Texts = {
  id: "txt" + nanoid(),
  textValue:
    "“All that I am, or ever hope to be, I owe to my angel mother.” \n" +
    "— Abraham Lincoln",
  fontFamily: "Buffalo",
  fontSize: 60,
  fontColor: "white",
  fontStyle: "normal",
  pageId: 5,
  width: 780,
  height: 220,
  x: 264,
  y: 866,
};
export const page6Texts = {
  id: "txt" + nanoid(),
  textValue:
    "“The heart of a mother is a deep abyss at the bottom of which you will always find forgiveness.” \n — Honoré de Balzac",
  fontFamily: "Buffalo",
  fontSize: 60,
  fontColor: "gray",
  fontStyle: "normal",
  pageId: 6,
  width: 870,
  height: 287,
  x: 229,
  y: 1520,
};

export const templateTexts = [
  page2Texts,
  page3Texts,
  page4Texts,
  page5Texts,
  page6Texts,
];

const initialState: InitialState = {
  currentTextId: null,
  data: [page2Texts, page3Texts, page4Texts, page5Texts, page6Texts],
};

// Create textSlice
const textSlice = createSlice({
  name: "text",
  initialState: initialState,
  reducers: {
    setTextId: (state, action: PayloadAction<string>) => {
      state.currentTextId = action.payload;
    },
    addText: (state, action: PayloadAction<TextState | TextState[]>) => {
      if (Array.isArray(action.payload)) {
        state.data.push(...action.payload);
      } else state.data.push(action.payload);
    },
    removeText: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((text) => text.id !== action.payload);
    },
    setTextValue: (
      state,
      action: PayloadAction<{ id: string; textValue: string }>
    ) => {
      state.data = state.data.map((text) => {
        if (text.id === action.payload.id) {
          return { ...text, textValue: action.payload.textValue };
        }
        return text;
      });
    },
    setFontSize: (
      state,
      action: PayloadAction<{ id: string; fontSize: number }>
    ) => {
      state.data = state.data.map((text) => {
        if (text.id === action.payload.id) {
          return { ...text, fontSize: action.payload.fontSize };
        }
        return text;
      });
    },

    setFontStyle: (
      state,
      action: PayloadAction<{ id: string; fontStyle: string }>
    ) => {
      state.data = state.data.map((text) => {
        if (text.id === action.payload.id) {
          return { ...text, fontStyle: action.payload.fontStyle };
        }
        return text;
      });
    },
    setDimensions: (
      state,
      action: PayloadAction<{ id: string; width: number; height: number }>
    ) => {
      const newState = state.data.map((text) => {
        if (text.id === action.payload.id) {
          return {
            ...text,
            width: action.payload.width,
            height: action.payload.height,
          };
        }
        return text;
      });
      state.data = newState;
    },
    setPosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      state.data = state.data.map((text) => {
        if (text.id === action.payload.id) {
          return { ...text, x: action.payload.x, y: action.payload.y };
        }
        return text;
      });
    },
    setFontColor: (
      state,
      action: PayloadAction<{ id: string; fontColor: string }>
    ) => {
      state.data = state.data.map((text) => {
        if (text.id === action.payload.id) {
          return { ...text, fontColor: action.payload.fontColor };
        }
        return text;
      });
    },
    setFontFamily: (
      state,
      action: PayloadAction<{ id: string; fontFamily: string }>
    ) => {
      state.data = state.data.map((text) => {
        if (text.id === action.payload.id) {
          return { ...text, fontFamily: action.payload.fontFamily };
        }
        return text;
      });
    },
  },
});

// Export actions and reducer
export const {
  setTextId,
  addText,
  removeText,
  setTextValue,
  setFontSize,
  setFontColor,
  setFontFamily,
  setFontStyle,
  setDimensions,
  setPosition,
} = textSlice.actions;
export default textSlice.reducer;

// console.log(
//   "addText test",
//   addText({
//     id: nanoid(),
//     textValue: "test addText reducer",
//     fontSize: "16px",
//     color: "#000000",
//     fontWeight: "normal",
//   })
// );
