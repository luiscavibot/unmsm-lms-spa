import { createAsyncThunk } from '@reduxjs/toolkit';
import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { AuthFlowName, ChallengeName } from '@/features/auth/interfaces/Cognito';
import { Tokens } from '@/interfaces/tokens';
import { AWS_COGNITO_CLIENT_ID, AWS_REGION } from '@/configs/consts';

type LoginSuccess = Tokens;

interface PasswordChallengeResponse {
  challengeName: ChallengeName;
  session: string;
  username: string;
}

type LoginResponse = Partial<LoginSuccess> & Partial<PasswordChallengeResponse>;

interface LoginRequest {
  username: string;
  password: string;
}

export const loginAsync = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: string }>(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    const client = new CognitoIdentityProviderClient({ region: AWS_REGION });
    try {
      const resp = await client.send(
        new InitiateAuthCommand({
          AuthFlow: AuthFlowName.UserPasswordAuth,
          ClientId: AWS_COGNITO_CLIENT_ID,
          AuthParameters: { USERNAME: username, PASSWORD: password },
        }),
      );

      if (resp.ChallengeName === ChallengeName.NewPasswordRequired) {
        return {
          challengeName: ChallengeName.NewPasswordRequired,
          session: resp.Session,
          username,
        };
      }

      const result = resp.AuthenticationResult;
      if (!result || !result.AccessToken) {
        throw new Error('Autenticación falló');
      }
      return {
        idToken: result.IdToken!,
        accessToken: result.AccessToken!,
        refreshToken: result.RefreshToken!,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error de autenticación desconocido';
      return rejectWithValue(errorMessage);
    }
  },
);
