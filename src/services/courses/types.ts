export type ProgramType =
  | 'PREGRADO'
  | 'POSGRADO-DIPLOMADO'
  | 'POSGRADO-DOCTORADO'
  | 'POSGRADO-MAESTRIA'
  | 'POSGRADO-SEGUNDAESPECIALIDAD';

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

export interface FileInfoDto {
  fileName: string;
  downloadUrl: string;
  updateDate: string;
}

export interface BlockScheduleDto {
  schedule: string;
}

export enum BlockType {
  THEORY = 'theory',
  PRACTICE = 'practice',
}

export interface BlockDetailDto {
  blockId: string;
  blockType: BlockType.THEORY | BlockType;
  name: string;
  schedule: string[];
  aula: string;
  teacher: string | null;
  syllabus: FileInfoDto;
  cv: FileInfoDto;
  meetUrl: string;
}

export interface CourseDetailResponseDto {
  courseId: string;
  name: string;
  programName: string;
  startDate: string;
  endDate: string;
  semester: string;
  teacher: string;
  endNote: number | null;
  blocks: BlockDetailDto[];
}
