import { useEffect, useState, FC } from 'react';
import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import AuthContext from '../contexts';
import { decode, isExpired } from '@/helpers/jwt';
import { signIn, Tokens } from '@/services/authService';
import { jwtDecode } from 'jwt-decode';

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [idToken, setIdToken] = useState<string | null>(localStorage.getItem('idToken'));
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tryRestore = async () => {
      if (!refreshToken) {
        setLoading(false);
        return;
      }
      if (isExpired(accessToken)) {
        try {
          const client = new CognitoIdentityProviderClient({ region: import.meta.env.VITE_REGION });
          const resp = await client.send(
            new InitiateAuthCommand({
              AuthFlow: 'REFRESH_TOKEN_AUTH',
              ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID!,
              AuthParameters: { REFRESH_TOKEN: refreshToken },
            }),
          );
          setIdToken(resp.AuthenticationResult?.IdToken ?? null);
          setAccessToken(resp.AuthenticationResult?.AccessToken ?? null);
          localStorage.setItem('idToken', resp.AuthenticationResult?.IdToken!);
          localStorage.setItem('accessToken', resp.AuthenticationResult?.AccessToken!);
        } catch {
          logout();
        }
      }
      setUser(decode(idToken));
      setLoading(false);
    };
    tryRestore();
  }, []);

  const login = async (email: string, password: string) => {
    const tokens: Tokens = await signIn(email, password);
    setIdToken(tokens.idToken);
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    localStorage.setItem('idToken', tokens.idToken);
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    setUser(jwtDecode(tokens.idToken));
  };

  const logout = () => {
    localStorage.clear();
    setIdToken(null);
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, idToken, accessToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
