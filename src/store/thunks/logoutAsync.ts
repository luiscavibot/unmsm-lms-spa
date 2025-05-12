import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CognitoIdentityProviderClient, RevokeTokenCommand } from '@aws-sdk/client-cognito-identity-provider';

export const logoutAsync = createAsyncThunk<void, void, { state: RootState; rejectValue: string }>(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    const refreshToken = getState().auth.refreshToken;
    if (!refreshToken) return;
    try {
      const client = new CognitoIdentityProviderClient({ region: import.meta.env.VITE_AWS_REGION });
      await client.send(
        new RevokeTokenCommand({
          ClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID,
          Token: refreshToken,
        }),
      );
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);
