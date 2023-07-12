// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/models/User/User';

const initialState: User = {
  chatbot_limit: 0,
  message_limit: 0,
  char_limit: 0,
  _id: '',
  email: '',
  plan: '',
  username: '',
  password: '',
  createdAt: '',
  updatedAt: '',
  __v: 0,
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
export default userSlice.reducer;
