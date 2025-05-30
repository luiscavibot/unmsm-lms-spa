export const actions = ['view', 'read', 'create', 'update', 'delete', 'manage'] as const;
export type Actions = (typeof actions)[number];

export const subjects = ['studentResources', 'teacherResources', 'courseCardTeacherName', 'all'] as const;
export type Subjects = (typeof subjects)[number];
