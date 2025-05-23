type Role = 'student' | 'assistant_teacher' | 'lead_teacher';
type Action =
  | 'start'
  | 'join'
  | 'viewStudentAttendance'
  | 'viewTeacherAttendance'
  | 'markAttendance'
  | 'viewStudentResources'
  | 'viewTeacherResources'
  | 'editTeacherResources';
type Subject = 'Class' | 'Attendance' | 'Resources';

export function createCan(role: Role) {
  return (action: Action, subject: Subject): boolean => {
    if (subject === 'Class') {
      if (role === 'student' && action === 'join') return true;
      if ((role === 'assistant_teacher' || role === 'lead_teacher') && action === 'start') return true;
    }

    if (subject === 'Attendance') {
      if (role === 'student' && action === 'viewStudentAttendance') return true;
      if (
        (role === 'assistant_teacher' || role === 'lead_teacher') &&
        (action === 'viewTeacherAttendance' || action === 'markAttendance')
      )
        return true;
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
