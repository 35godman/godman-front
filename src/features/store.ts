import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { chatbotReducer } from '@/features/slices/chatbotSlice';
import { userReducer } from '@/features/slices/userSlice';
import { addFile, charsCountReducer } from '@/features/slices/charsCountSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chatbot: chatbotReducer,
    chars: charsCountReducer,
  },
});
if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (window && window?.Cypress) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.store = store;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.setTestReduxState = (initialState) => {
      store.dispatch(addFile(initialState));
    };
  }
}

export const getStore = () => {
  return store;
};
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
