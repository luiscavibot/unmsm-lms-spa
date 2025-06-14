type Role = 'student' | 'assistant_teacher' | 'lead_teacher';
export type Action =
  | 'start'
  | 'join'
  | 'viewStudentAttendance'
  | 'markAttendance'
  | 'viewStudentResources'
  | 'viewTeacherResources'
  | 'editTeacherResources'
  | 'viewStudentGrades'
  | 'viewFinalGrades'
  | 'handleGradeStudent'
  | 'addMaterials'
  | 'addWeeks';
type Subject = 'Materials' | 'Weeks' | 'Class' | 'Attendance' | 'Resources' | 'Grades';

export function createCan(role: Role) {
  return (action: Action, subject: Subject): boolean => {
    if (subject === 'Class') {
      if (role === 'student' && action === 'join') return true;
      if ((role === 'assistant_teacher' || role === 'lead_teacher') && action === 'start') return true;
    }

    if (subject === 'Materials') {
      if ((role === 'assistant_teacher' || role === 'lead_teacher') && action === 'addMaterials') return true;
    }

    if (subject === 'Weeks') {
      if ((role === 'assistant_teacher' || role === 'lead_teacher') && action === 'addWeeks') return true;
    }

    if (subject === 'Attendance') {
      if (role === 'student' && action === 'viewStudentAttendance') return true;
      if ((role === 'assistant_teacher' || role === 'lead_teacher') && action === 'markAttendance') return true;
    }

    if (subject === 'Grades') {
      if (role === 'student' && action === 'viewStudentGrades') return true;
      if ((role === 'assistant_teacher' || role === 'lead_teacher') && action === 'handleGradeStudent') return true;
      if ((role === 'assistant_teacher' || role === 'lead_teacher') && action === 'viewFinalGrades') return true;
    }

    if (subject === 'Resources') {
      if (role === 'student' && action === 'viewStudentResources') return true;
      if (
        (role === 'assistant_teacher' || role === 'lead_teacher') &&
        (action === 'viewTeacherResources' || action === 'editTeacherResources')
      )
        return true;
    }

    return false;
  };
}
