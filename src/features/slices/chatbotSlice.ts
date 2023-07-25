// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chatbot, User } from '@/types/models/globals';
import { Language } from '@/types/enums/lang';

const initialState: Partial<Chatbot> = {};

export const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    setChatbot: (state, action: PayloadAction<Chatbot>) => {
      return action.payload;
    },
  },
});

// Export actions
export const { setChatbot } = chatbotSlice.actions;

// Export reducer
export const chatbotReducer = chatbotSlice.reducer;
