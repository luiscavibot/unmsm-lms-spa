import { createContext } from 'react';

const AuthContext = createContext<{
  user: any | null;
  idToken: string | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
} | null>(null);

export default AuthContext;
