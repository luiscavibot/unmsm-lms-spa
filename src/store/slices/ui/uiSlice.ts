import { createSlice } from '@reduxjs/toolkit';
import { UIState } from './types';
import { SliceNames } from '../sliceNames';

const initialState: UIState = {
  drawerOpen: false,
};

const uiSlice = createSlice({
  name: SliceNames.UI,
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.drawerOpen = true;
    },
    closeDrawer: (state) => {
      state.drawerOpen = false;
    },
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
  },
});

export const { openDrawer, closeDrawer, toggleDrawer } = uiSlice.actions;
export default uiSlice.reducer;
