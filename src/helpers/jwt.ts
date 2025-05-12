// src/helpers/jwt.ts
import { CognitoIdTokenPayload } from '@/features/auth/interfaces/Cognito';
import { jwtDecode } from 'jwt-decode';

/**
 * Decodifica un JWT.
 * Por defecto devuelve el payload típico de Cognito,
 * pero puedes pasar un tipo genérico si lo necesitas.
 *
 * @example
 *   const user = decode(token);               // <- CognitoIdTokenPayload | null
 *   const custom = decode<MyCustom>(token);   // <- MyCustom | null
 */
export const decode = <T = CognitoIdTokenPayload>(token: string | null): T | null => {
  if (!token) return null;
  try {
    return jwtDecode<T>(token);
  } catch {
    return null; // token corrupto / mal formado
  }
};

/**
 * Comprueba si un JWT está expirado.
 * @param marginSeconds  margen de gracia, por defecto 30 s
 */
export const isExpired = (token: string | null, marginSeconds = 30): boolean => {
  const payload = decode<{ exp: number }>(token);
  if (!payload) return true;

  const nowMs = Date.now();
  const expMs = payload.exp * 1000;
  return expMs < nowMs - marginSeconds * 1000;
};
