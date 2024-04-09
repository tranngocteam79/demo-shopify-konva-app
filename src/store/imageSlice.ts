import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export interface ImageState {
  pageId: number;
  imageUrl: string;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isPinned?: boolean;
  rotate?: number;
}

const page1Images: ImageState[] = [
  {
    pageId: 1,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 144,
    y: 440,
    width: 455,
    height: 596,
  },
  {
    pageId: 1,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 741,
    y: 440,
    width: 455,
    height: 596,
  },
  {
    pageId: 1,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 144,
    y: 1190,
    width: 455,
    height: 596,
  },
  {
    pageId: 1,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 741,
    y: 1190,
    width: 455,
    height: 596,
  },
];

const page2Images: ImageState[] = [
  {
    pageId: 2,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 153,
    y: 149,
    width: 1087,
    height: 717,
  },
  {
    pageId: 2,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 104,
    y: 1420,
    width: 500,
    height: 500,
  },
  {
    pageId: 2,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 725,
    y: 1420,
    width: 500,
    height: 500,
  },
  {
    pageId: 2,
    imageUrl: "pin.png",
    id: "img" + nanoid(),
    x: 318,
    y: 1334,
    width: 72,
    height: 123,
    isPinned: true,
  },
  {
    pageId: 2,
    imageUrl: "pin.png",
    id: "img" + nanoid(),
    x: 950,
    y: 1334,
    width: 72,
    height: 123,
    isPinned: true,
  },
];

const page3Images: ImageState[] = [
  {
    pageId: 3,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 170,
    y: 112,
    width: 1019,
    height: 672,
  },
  {
    pageId: 3,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 180,
    y: 1206,
    width: 1035,
    height: 684,
  },
  {
    pageId: 3,
    imageUrl: "camera.png",
    id: "img" + nanoid(),
    x: 92,
    y: 57,
    width: 198,
    height: 163,
    isPinned: true,
  },
  {
    pageId: 3,
    imageUrl: "star_1.png",
    id: "img" + nanoid(),
    x: 1096,
    y: 1789,
    width: 190,
    height: 190,
    isPinned: true,
  },
];

const page4Images: ImageState[] = [
  {
    pageId: 4,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 149,
    y: 144,
    width: 494,
    height: 536,
    rotate: 6,
  },
  {
    pageId: 4,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 702,
    y: 189,
    width: 496,
    height: 530,
    rotate: -4.4,
  },
  {
    pageId: 4,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 101,
    y: 1280,
    width: 497,
    height: 536,
    rotate: -4.4,
  },
  {
    pageId: 4,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 740,
    y: 1243,
    width: 494,
    height: 536,
    rotate: 4,
  },
  {
    pageId: 4,
    imageUrl: "triple_heart.png",
    id: "img" + nanoid(),
    x: 1,
    y: 1071,
    width: 238,
    height: 302,
    isPinned: true,
  },
  {
    pageId: 4,
    imageUrl: "paper_tape.png",
    id: "img" + nanoid(),
    x: 771,
    y: 1191,
    width: 124,
    height: 68,
    isPinned: true,
  },
];

const page5Images: ImageState[] = [
  {
    pageId: 5,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 115,
    y: 177,
    width: 357,
    height: 475,
  },
  {
    pageId: 5,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 580,
    y: 218,
    width: 641,
    height: 405,
  },
  {
    pageId: 5,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 100,
    y: 1315,
    width: 641,
    height: 405,
  },
  {
    pageId: 5,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 877,
    y: 1221,
    width: 358,
    height: 476,
  },
  {
    pageId: 5,
    imageUrl: "line_airplane.png",
    id: "img" + nanoid(),
    x: 0,
    y: 0,
    width: 392,
    height: 220,
    isPinned: true,
  },
];

const page6Images: ImageState[] = [
  {
    pageId: 6,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 112,
    y: 152,
    width: 519,
    height: 577,
  },
  {
    pageId: 6,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 733,
    y: 148,
    width: 458,
    height: 254,
  },
  {
    pageId: 6,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 733,
    y: 478,
    width: 458,
    height: 254,
  },
  {
    pageId: 6,
    imageUrl: "insert_image.jpg",
    id: "img" + nanoid(),
    x: 110,
    y: 898,
    width: 1079,
    height: 493,
  },
  {
    pageId: 6,
    imageUrl: "triple_heart_2.png",
    id: "img" + nanoid(),
    x: 8,
    y: 660,
    width: 272,
    height: 307,
    isPinned: true,
  },
  {
    pageId: 6,
    imageUrl: "pin_red.png",
    id: "img" + nanoid(),
    x: 664,
    y: 1425,
    width: 80,
    height: 112,
    isPinned: true,
  },
  {
    pageId: 6,
    imageUrl: "yellow_band.png",
    id: "img" + nanoid(),
    x: 1058,
    y: 653,
    width: 244,
    height: 260,
    isPinned: true,
  },
];

export const templateImages = [
  ...page1Images,
  ...page2Images,
  ...page3Images,
  ...page4Images,
  ...page5Images,
  ...page6Images,
];

const initialImageState: { data: ImageState[] } = {
  data: [
    ...page1Images,
    ...page2Images,
    ...page3Images,
    ...page4Images,
    ...page5Images,
    ...page6Images,
  ],
};

const imageSlice = createSlice({
  name: "image",
  initialState: initialImageState,
  reducers: {
    addImage: (state, action: PayloadAction<ImageState | ImageState[]>) => {
      if (Array.isArray(action.payload)) {
        state.data.push(...action.payload);
      } else state.data.push(action.payload);
    },
    changeImage: (
      state,
      action: PayloadAction<{ id: string; imageUrl: string }>
    ) => {
      state.data = state.data.map((image) => {
        if (image.id === action.payload.id) {
          return { ...image, imageUrl: action.payload.imageUrl };
        }
        return image;
      });
    },
  },
});

export const { addImage, changeImage } = imageSlice.actions;
export default imageSlice.reducer;
