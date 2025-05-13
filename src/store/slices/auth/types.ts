import { CognitoIdTokenPayload } from '@/features/auth/interfaces/Cognito';

export interface AuthState {
  user: CognitoIdTokenPayload | null;
  accessToken: string | null;
  idToken: string | null;
  refreshToken: string | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}
