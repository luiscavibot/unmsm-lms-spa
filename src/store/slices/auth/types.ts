import { CognitoIdTokenPayload } from '@/features/auth/interfaces/Cognito';

export enum AuthStatusLogin {
  Idle = 'idle',
  Loading = 'loading',
  Failed = 'failed',
}

export interface AuthState {
  user: CognitoIdTokenPayload | null;
  accessToken: string | null;
  idToken: string | null;
  refreshToken: string | null;
  status: AuthStatusLogin;
  error: string | null;
  // Para el flujo NEW_PASSWORD_REQUIRED
  newPasswordRequired: boolean;
  tempSession: string | null;
  tempUsername: string | null;
}
