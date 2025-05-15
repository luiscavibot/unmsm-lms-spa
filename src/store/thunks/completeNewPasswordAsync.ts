import { AWS_COGNITO_CLIENT_ID, AWS_REGION } from '@/configs/consts';
import { ChallengeName } from '@/features/auth/interfaces/Cognito';
import { Tokens } from '@/interfaces/tokens';
import { CognitoIdentityProviderClient, RespondToAuthChallengeCommand } from '@aws-sdk/client-cognito-identity-provider';
import { createAsyncThunk } from '@reduxjs/toolkit';

type CompleteNewPasswordResponse = Tokens;

type CompleteNewPasswordParams = {
  username: string;
  session: string;
  newPassword: string;
};

type CompleteNewPasswordOptions = {
  rejectValue: string;
};

export const completeNewPasswordAsync = createAsyncThunk<CompleteNewPasswordResponse, CompleteNewPasswordParams, CompleteNewPasswordOptions>(
  'auth/completeNewPassword',
  async ({ username, session, newPassword }, { rejectWithValue }) => {
    const client = new CognitoIdentityProviderClient({ region: AWS_REGION });
    try {
      const resp = await client.send(
        new RespondToAuthChallengeCommand({
          ClientId: AWS_COGNITO_CLIENT_ID,
          ChallengeName: ChallengeName.NewPasswordRequired,
          Session: session,
          ChallengeResponses: {
            USERNAME: username,
            NEW_PASSWORD: newPassword,
          },
        }),
      );
      const result = resp.AuthenticationResult;
      if (!result || !result.AccessToken) {
        throw new Error('No se recibieron tokens tras cambiar contraseña');
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
