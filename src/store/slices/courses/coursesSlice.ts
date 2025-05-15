import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoursesByProgramTypeResp } from '@/services/courses/types';
import { SliceNames } from '../sliceNames';
import { CoursesState } from './types';

const initialState: CoursesState = {
  programs: [],
  meta: null,
};

const coursesSlice = createSlice({
  name: SliceNames.Courses,
  initialState,
  reducers: {
    setCourses(state, action: PayloadAction<ICoursesByProgramTypeResp>) {
      state.programs = action.payload.programs;
      state.meta = action.payload.meta;
    },
    clearCourses(state) {
      state.programs = [];
      state.meta = null;
    },
  },
});

export const { setCourses, clearCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
