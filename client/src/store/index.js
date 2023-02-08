import { configureStore } from "@reduxjs/toolkit";
import { boardApi } from "./boardApi";
import { taskApi } from "./taskApi";
import globalSlice from "./globalSlice";

export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    global: globalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardApi.middleware, taskApi.middleware),
});
