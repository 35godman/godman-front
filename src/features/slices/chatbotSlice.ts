// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chatbot } from '@/types/models/globals';

const initialState: Partial<Chatbot> = {};

export const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    addChatbot: (state, action: PayloadAction<Chatbot>) => {
      return action.payload;
    },
  },
});

// Export actions
export const { addChatbot } = chatbotSlice.actions;

// Export reducer
export const chatbotReducer = chatbotSlice.reducer;
