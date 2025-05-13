import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SemestersState } from './types';
import lab from '@/services/apiLabels';
import { ISemesterResp } from '@/services/semesters/types';

const initialState: SemestersState = { list: [] };

const semestersSlice = createSlice({
  name: lab.Semesters,
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
