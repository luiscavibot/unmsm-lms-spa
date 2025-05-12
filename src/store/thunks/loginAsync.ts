import { createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, Tokens } from '@/services/authService';

export const loginAsync = createAsyncThunk<Tokens, { email: string; password: string }, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await signIn(email, password);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);
