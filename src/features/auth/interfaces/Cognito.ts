// src/types/Cognito.ts
/**
 *  Shape del ID-Token que entrega Amazon Cognito.
 *  — Las claims “exóticas” (con :) se declaran entre comillas.
 *  — Marca opcionales las que podrían no venir según tu pool.
 */
export interface CognitoIdTokenPayload {
  /* claims estándar JWT */
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  jti: string;
  token_use: 'id' | 'access' | 'refresh';
  auth_time: number;

  /* claims de usuario */
  email: string;
  email_verified: boolean;
  name?: string;

  /* claims de Cognito */
  'cognito:username': string;
  'cognito:groups'?: string[];
  'custom:role'?: string;

  /* claims extra que puedas añadir en futuro */
  [claim: string]: unknown;
}
