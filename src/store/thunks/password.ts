// src/features/auth/passwordSlice.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CognitoIdentityProviderClient,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';

export const forgotPasswordAsync = createAsyncThunk<void, string, { rejectValue: string }>(
  'password/forgot',
  async (email, { rejectWithValue }) => {
    const client = new CognitoIdentityProviderClient({ region: import.meta.env.VITE_AWS_REGION });
    try {
      await client.send(
        new ForgotPasswordCommand({
          ClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID,
          Username: email,
        }),
      );
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

// 2️⃣ Thunk: confirma el cambio de contraseña
export const confirmPasswordResetAsync = createAsyncThunk<
  void,
  { email: string; code: string; newPassword: string },
  { rejectValue: string }
>('password/reset', async ({ email, code, newPassword }, { rejectWithValue }) => {
  const client = new CognitoIdentityProviderClient({ region: import.meta.env.VITE_AWS_REGION });
  try {
    await client.send(
      new ConfirmForgotPasswordCommand({
        ClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID,
        Username: email,
        ConfirmationCode: code,
        Password: newPassword,
      }),
    );
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
