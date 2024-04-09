import { configureStore } from "@reduxjs/toolkit";
import textReducer from "./textSlice";
import appReducer from "./appReducer.ts";
import imageReducer from "./imageSlice";

export const store = configureStore({
  reducer: {
    text: textReducer,
    // Add other reducers here if you have more slices
    image: imageReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["PUSH_PAGES_REF", "TOGGLE_FONTLOADED"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
