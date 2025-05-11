// src/providers/AuthProvider.tsx
import { FC, useEffect, useState } from 'react';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  RevokeTokenCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import AuthContext from '../contexts';
import { decode, isExpired } from '@/helpers/jwt';
import { signIn, Tokens } from '@/services/authService';
import { jwtDecode } from 'jwt-decode';

const client = new CognitoIdentityProviderClient({
  region: import.meta.env.VITE_REGION,
});

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  /* ─────────── estado ─────────── */
  const [idToken, setIdToken] = useState<string | null>(localStorage.getItem('idToken'));
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  /* ─────────── re-ingreso automático ─────────── */
  useEffect(() => {
    const tryRestore = async () => {
      if (!refreshToken) return setLoading(false);

      if (isExpired(accessToken)) {
        try {
          const { AuthenticationResult } = await client.send(
            new InitiateAuthCommand({
              AuthFlow: 'REFRESH_TOKEN_AUTH',
              ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID!,
              AuthParameters: { REFRESH_TOKEN: refreshToken },
            }),
          );
          setIdToken(AuthenticationResult?.IdToken ?? null);
          setAccessToken(AuthenticationResult?.AccessToken ?? null);
          localStorage.setItem('idToken', AuthenticationResult?.IdToken ?? '');
          localStorage.setItem('accessToken', AuthenticationResult?.AccessToken ?? '');
        } catch {
          await logout();
          return;
        }
      }

      setUser(decode(idToken));
      setLoading(false);
    };

    tryRestore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─────────── login credenciales ─────────── */
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

  /* ─────────── logout (solo este dispositivo) ─────────── */
  const logout = async () => {
    try {
      if (refreshToken) {
        await client.send(
          new RevokeTokenCommand({
            ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID!,
            Token: refreshToken,
          }),
        );
      }
    } catch (err) {
      console.warn('No se pudo revocar el refresh token en Cognito:', err);
    } finally {
      localStorage.clear();
      setIdToken(null);
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, idToken, accessToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
