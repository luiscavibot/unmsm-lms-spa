import { createSlice } from '@reduxjs/toolkit';
import { UIState } from './types';

const initialState: UIState = {
  drawerOpen: true,
};

const uiSlice = createSlice({
  name: 'ui',
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
