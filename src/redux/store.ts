import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
