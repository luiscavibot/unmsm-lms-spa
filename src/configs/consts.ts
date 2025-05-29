export const AWS_REGION = import.meta.env.VITE_AWS_REGION;
export const AWS_COGNITO_CLIENT_ID = import.meta.env.VITE_AWS_COGNITO_CLIENT_ID;
export const API_URL = import.meta.env.VITE_API_URL;
// test role
type Role = 'student' | 'assistant_teacher' | 'lead_teacher';
export const role: Role = 'student';
