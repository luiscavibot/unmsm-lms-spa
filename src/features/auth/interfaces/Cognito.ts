import { UserRole } from '@/roles';

export interface CognitoIdTokenPayload {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  jti: string;
  token_use: 'id' | 'access' | 'refresh';
  auth_time: number;

  email: string;
  email_verified: boolean;
  name?: string;

  'cognito:username': string;
  'cognito:groups'?: string[];
  'custom:role'?: UserRole;

  [claim: string]: unknown;
}

export enum ChallengeName {
  NewPasswordRequired = 'NEW_PASSWORD_REQUIRED',
  MfaSetup = 'MFA_SETUP',
  SelectMfaType = 'SELECT_MFA_TYPE',
  MfaVerifyCode = 'MFA_VERIFY_CODE',
  CustomChallenge = 'CUSTOM_CHALLENGE',
  SoftwareTokenMfa = 'SOFTWARE_TOKEN_MFA',
  SmsMfa = 'SMS_MFA',
  DeviceSrpAuth = 'DEVICE_SRP_AUTH',
  AdminNoSrpAuth = 'ADMIN_NO_SRP_AUTH',
}

export enum AuthFlowName {
  UserPasswordAuth = 'USER_PASSWORD_AUTH',
  RefreshTokenAuth = 'REFRESH_TOKEN_AUTH',
}
