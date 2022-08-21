import { configureStore } from "@reduxjs/toolkit";
import { expenseSlice } from "./reducer";
import { apiSlice } from "./apiSlice";

const store = configureStore({
  reducer: {
    expenseSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const x = getDefaultMiddleware().concat(apiSlice.middleware);
    return x;
  },
});

export default store;
