// store.ts
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category/categorySlice';
import usersReducer from './users/usersSlice';
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    users: usersReducer,
   
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
