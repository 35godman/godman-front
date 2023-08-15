import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { chatbotReducer } from '@/features/slices/chatbotSlice';
import { userReducer } from '@/features/slices/userSlice';
import { charsCountReducer } from '@/features/slices/charsCountSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chatbot: chatbotReducer,
    chars: charsCountReducer,
  },
});
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (window && window.Cypress) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.store = store;
  }
}

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
