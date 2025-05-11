import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  type AuthenticationResultType,
} from '@aws-sdk/client-cognito-identity-provider';
import config from '@/features/auth/cognito-config.json';

export interface Tokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

const client = new CognitoIdentityProviderClient({ region: config.region });

export async function signIn(email: string, password: string): Promise<Tokens> {
  const { AuthenticationResult } = await client.send(
    new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: config.clientId,
      AuthParameters: { USERNAME: email, PASSWORD: password },
    }),
  );

  // ⬇️ verificación exhaustiva
  const res = AuthenticationResult as AuthenticationResultType | undefined;

  if (!res?.AccessToken || !res.IdToken || !res.RefreshToken) {
    throw new Error('Credenciales inválidas o usuario no confirmado.');
  }

  return {
    idToken: res.IdToken,
    accessToken: res.AccessToken,
    refreshToken: res.RefreshToken,
  };
}
