export const actions = ['view', 'create', 'update', 'delete', 'manage'] as const;
export type Actions = (typeof actions)[number];

/*
  theoGenResEditBtns => theoryGeneralResourceEditButtons
  pracGenResEditBtns => practiceGeneralResourceEditButtons
  ---------------------------
  theoMatAddBtn=>  theoryMaterialAddButton
  pracMatAddBtn => practiceMaterialAddButton
  ----------------------------
  theoClassAttCtrl => classAttendanceController
  pracClassAttCtrl => practiceAttendanceController
  ----------------------------
  theoCourseNotesCtrl => theoryCourseNotesController
  pracCourseNotesCtrl => practiceCourseNotesController

*/

export const subjects = [
  'theoGenResEditBtns',
  'pracGenResEditBtns',
  'courseCardTeacherName',
  'theoMatAddBtn',
  'pracMatAddBtn',
  'theoClassAttCtrl',
  'pracClassAttCtrl',
  'theoCourseNotesCtrl',
  'pracCourseNotesCtrl',
  'all',
] as const;
export type Subjects = (typeof subjects)[number];
