// src/features/auth/authThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import { Tokens } from '@/interfaces/tokens';
import { AWS_COGNITO_CLIENT_ID, AWS_REGION } from '@/configs/consts';
import { AuthFlowName } from '@/features/auth/interfaces/Cognito';

export const refreshAsync = createAsyncThunk<Tokens, void, { rejectValue: string; state: any }>(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const refreshToken = getState().auth.refreshToken;
    if (!refreshToken) return rejectWithValue('No hay refresh token');

    const client = new CognitoIdentityProviderClient({ region: AWS_REGION });
    try {
      const resp = await client.send(
        new InitiateAuthCommand({
          AuthFlow: AuthFlowName.RefreshTokenAuth,
          ClientId: AWS_COGNITO_CLIENT_ID,
          AuthParameters: { REFRESH_TOKEN: refreshToken },
        }),
      );
      const result = resp.AuthenticationResult;
      if (!result?.AccessToken || !result?.IdToken || !result?.RefreshToken) {
        throw new Error('Refresh fallido');
      }
      return {
        accessToken: result.AccessToken,
        idToken: result.IdToken,
        refreshToken: result.RefreshToken,
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);
