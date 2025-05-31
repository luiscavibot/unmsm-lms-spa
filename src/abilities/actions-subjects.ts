export const actions = ['view', 'create', 'update', 'delete', 'manage'] as const;
export type Actions = (typeof actions)[number];

/*theoGenResEditBtns => theoryGeneralResourceEditButtons
  pracGenResEditBtns => practiceGeneralResourceEditButtons
*/

export const subjects = ['theoGenResEditBtns', 'pracGenResEditBtns', 'courseCardTeacherName', 'all'] as const;
export type Subjects = (typeof subjects)[number];
