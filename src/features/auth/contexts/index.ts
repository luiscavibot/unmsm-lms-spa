import { createContext } from 'react';
import { CognitoIdTokenPayload } from '../interfaces/Cognito';

const AuthContext = createContext<{
  user: CognitoIdTokenPayload | null;
  idToken: string | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
} | null>(null);

export default AuthContext;
