import { createSlice } from '@reduxjs/toolkit';

const matchSlice = createSlice({
  name: 'match',
  initialState: [],
  reducers: {
    addMatch: (state, action) => {
      return [...state, action.payload];
    },
    removeMatch: (state, action) => {
      return state.filter(match => match._id !== action.payload);
    },
  }
});

export const { addMatch, removeMatch } = matchSlice.actions;
export default matchSlice.reducer;