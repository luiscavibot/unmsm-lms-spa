export type ProgramType = 'PREGRADO' | 'POSGRADO-DIPLOMADO' | 'POSGRADO-DOCTORADO' | 'POSGRADO-MAESTRIA' | 'POSGRADO-SEGUNDAESPECIALIDAD';

export type CourseStatus = 'unstarted' | 'current' | 'completed';

export interface Meta {
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Teacher {
  name: string;
  imgUrl: string;
}

export interface Course {
  courseId: string;
  name: string;
  teacher: Teacher;
  startDate: string;
  endDate: string;
  semester: string;
  module: string;
  unstarted: boolean;
}

export interface Program {
  programId: string;
  name: string;
  courses: Course[];
}

export interface ICoursesByProgramTypeResp {
  meta: Meta;
  programs: Program[];
}
