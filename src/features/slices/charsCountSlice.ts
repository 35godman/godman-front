// userSlice.ts
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
export type CountFileChars = {
  id: string;
  chars: number;
};

const initialState: CountFileChars[] = [];

export const charsCountSlice = createSlice({
  name: 'chars',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<CountFileChars>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        // Replace the existing file
        state[index] = action.payload;
      } else {
        // Add the new file
        state.push(action.payload);
      }
    },
    removeFile: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});
export const selectCurrentSize = createSelector(
  (state: { chars: CountFileChars[] }) => state.chars,
  (chars) => chars.reduce((acc, cur) => acc + cur.chars, 0),
);

// Export actions
export const { addFile, removeFile } = charsCountSlice.actions;

// Export reducer
export const charsCountReducer = charsCountSlice.reducer;
