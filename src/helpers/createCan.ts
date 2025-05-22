type Role = 'student' | 'assistant_teacher' | 'lead_teacher';
type Action = 'start' | 'join' | 'viewAttendance' | 'markAttendance';
type Subject = 'Class' | 'Attendance';

export function createCan(role: Role) {
  return (action: Action, subject: Subject): boolean => {
    if (subject === 'Class') {
      if (role === 'student' && action === 'join') return true;
      if ((role === 'assistant_teacher' || role === 'lead_teacher') && action === 'start') return true;
    }

    if (subject === 'Attendance') {
      if (role === 'student' && action === 'viewAttendance') return true;
      if ((role === 'assistant_teacher' || role === 'lead_teacher') && action === 'markAttendance') return true;
    }

    return false;
  };
}
