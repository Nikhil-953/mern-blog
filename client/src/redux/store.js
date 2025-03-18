// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, // ✅ Correct placement of reducer
  },
  devTools: process.env.NODE_ENV !== 'production', // DevTools enabled in dev mode
});

export default store;
