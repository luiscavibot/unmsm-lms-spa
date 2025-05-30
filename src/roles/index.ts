export enum UserRole {
  Student = 'STUDENT',
  Teacher = 'TEACHER',
  Admin = 'ADMIN',
  Guest = 'GUEST',
}

export enum BlockRole {
  Responsible = 'responsible',
  Collaborator = 'collaborator',
}
export type Role = UserRole | BlockRole;
