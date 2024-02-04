// selectedItemsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedItems: [],
  count: 0,
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (state, action) => {
        state.selectedItems.push(action.payload);
        state.count += 1;
      },
      removeItem: (state, action) => {
        state.selectedItems = state.selectedItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.count -= 1;
      },
  },
});

export const { addItem, removeItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
