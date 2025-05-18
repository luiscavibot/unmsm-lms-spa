import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CourseDetailResponseDto } from '@/services/courses/types';
import { SliceNames } from '../sliceNames';

export interface CourseOfferingsState {
  courseOfferingSelected: CourseDetailResponseDto | null;
}

const initialState: CourseOfferingsState = {
  courseOfferingSelected: null,
};

const courseOfferingsSlice = createSlice({
  name: SliceNames.CourseOfferings,
  initialState,
  reducers: {
    setCourseOfferingSelected(state, action: PayloadAction<CourseDetailResponseDto>) {
      state.courseOfferingSelected = action.payload;
    },
    clearCourseOfferingSelected(state) {
      state.courseOfferingSelected = null;
    },
  },
});

export const { setCourseOfferingSelected, clearCourseOfferingSelected } = courseOfferingsSlice.actions;
export default courseOfferingsSlice.reducer;
