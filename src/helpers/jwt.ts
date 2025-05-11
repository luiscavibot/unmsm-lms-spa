import { jwtDecode } from 'jwt-decode';

export const decode = (token: string | null) => (token ? jwtDecode<{ exp: number; [k: string]: any }>(token) : null);

export const isExpired = (token: string | null) => {
  const decoded = decode(token);
  return !decoded || decoded.exp * 1000 < Date.now() - 30_000; // margen de 30 s
};
