import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Tạo reducers của bạn

const store = configureStore({
  reducer: rootReducer,
});

export default store;
