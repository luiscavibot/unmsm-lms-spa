export interface SyllabusResponseDto {
  id: string;
  courseOffering: {
    id: string;
    programId: string;
    courseId: string;
    semesterId: string;
    startDate: string;
    endDate: string;
    module: string;
    status: string;
  };
  courseOfferingId: string;
  type: string;
  group: string;
  classroomNumber: string;
  syllabusUrl: string;
  syllabusUpdateDate: string;
}
