import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  type AuthenticationResultType,
} from '@aws-sdk/client-cognito-identity-provider';

export interface Tokens {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

const client = new CognitoIdentityProviderClient({ region: import.meta.env.VITE_AWS_REGION });

export async function signIn(email: string, password: string): Promise<Tokens> {
  const { AuthenticationResult } = await client.send(
    new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID,
      AuthParameters: { USERNAME: email, PASSWORD: password },
    }),
  );

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
