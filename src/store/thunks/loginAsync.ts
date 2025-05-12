import { createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, Tokens } from '@/services/authService';

export const loginAsync = createAsyncThunk<Tokens, { email: string; password: string }, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const tokens = await signIn(email, password);
      return tokens;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);
