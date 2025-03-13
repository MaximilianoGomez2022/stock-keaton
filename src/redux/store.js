import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import loginReducer from "./loginSlice"

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    login: loginReducer
  },
});
