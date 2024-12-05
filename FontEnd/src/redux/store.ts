// store.ts
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category/categorySlice';
import  authReducer  from './User/authSlice';
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    auth:authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
