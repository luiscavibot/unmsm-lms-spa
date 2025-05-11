import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  type InitiateAuthCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import config from '../features/auth/cognito-config.json';

export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

export const signIn = async (username: string, password: string) => {
  const params: InitiateAuthCommandInput = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  try {
    const command = new InitiateAuthCommand(params);
    const { AuthenticationResult } = await cognitoClient.send(command);
    if (AuthenticationResult) {
      localStorage.setItem('idToken', AuthenticationResult.IdToken || '');
      localStorage.setItem('accessToken', AuthenticationResult.AccessToken || '');
      localStorage.setItem('refreshToken', AuthenticationResult.RefreshToken || '');
      return AuthenticationResult;
    }
  } catch (error) {
    console.error('Error signing in: ', error);
    throw error;
  }
};
