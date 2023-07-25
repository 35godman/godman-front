import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { chatbotReducer } from '@/features/slices/chatbotSlice';
import { userReducer } from '@/features/slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chatbot: chatbotReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
