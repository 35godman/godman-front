// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/models/globals';
import { Language } from '@/types/enums/lang';

const initialState: User = {
  chatbot_limit: 0,
  _id: '',
  email: '',
  plan: 'free',
  username: '',
  password: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
  language: Language.RU,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

// Export actions
export const { setUser } = userSlice.actions;

// Export reducer
export const userReducer = userSlice.reducer;
