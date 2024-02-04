
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  bonusBalance:0
};

const customRefetchSlice = createSlice({
  name: 'customRefetch',
  initialState,
  reducers: {
    refetchApi: (state, action) => {
        state.value += 1;
      },
    bonusPoints: (state, action) => {
        state.bonusBalance = action.payload;
      },
    gamePoints: (state, action) => {
        state.gameBalance = action.payload;
      },
    refCode: (state, action) => {
        state.userRefCode = action.payload;
      }
  },
});

export const { refetchApi, bonusPoints, gamePoints, refCode } = customRefetchSlice.actions;
export default customRefetchSlice.reducer;
