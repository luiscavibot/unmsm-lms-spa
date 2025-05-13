import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SemestersState } from './types';
import { ISemesterResp } from '@/services/semesters/types';
import { SliceNames } from '../sliceNames';

const initialState: SemestersState = { list: [] };

const semestersSlice = createSlice({
  name: SliceNames.Semesters,
  initialState,
  reducers: {
    setSemesters(state, action: PayloadAction<ISemesterResp>) {
      console.log('Semesters desde slice:', action.payload);
      state.list = action.payload;
    },
    clearSemesters(state) {
      state.list = [];
    },
  },
});

export const { setSemesters, clearSemesters } = semestersSlice.actions;
export default semestersSlice.reducer;
