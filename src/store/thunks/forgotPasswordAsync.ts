import { createAsyncThunk } from '@reduxjs/toolkit';
import { CognitoIdentityProviderClient, ForgotPasswordCommand, ConfirmForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';
import { AWS_COGNITO_CLIENT_ID, AWS_REGION } from '@/configs/consts';

export const forgotPasswordAsync = createAsyncThunk<void, string, { rejectValue: string }>('password/forgot', async (email, { rejectWithValue }) => {
  const client = new CognitoIdentityProviderClient({ region: AWS_REGION });
  try {
    await client.send(
      new ForgotPasswordCommand({
        ClientId: AWS_COGNITO_CLIENT_ID,
        Username: email,
      }),
    );
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const confirmPasswordResetAsync = createAsyncThunk<void, { email: string; code: string; newPassword: string }, { rejectValue: string }>(
  'password/reset',
  async ({ email, code, newPassword }, { rejectWithValue }) => {
    const client = new CognitoIdentityProviderClient({ region: AWS_REGION });
    try {
      await client.send(
        new ConfirmForgotPasswordCommand({
          ClientId: AWS_COGNITO_CLIENT_ID,
          Username: email,
          ConfirmationCode: code,
          Password: newPassword,
        }),
      );
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);
