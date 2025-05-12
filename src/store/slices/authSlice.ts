import { createSlice } from '@reduxjs/toolkit';
import { decode } from '@/helpers/jwt';
import { CognitoIdTokenPayload } from '@/features/auth/interfaces/Cognito';
import { loginAsync } from '../thunks/loginAsync';

export interface AuthState {
  user: CognitoIdTokenPayload | null;
  accessToken: string | null;
  idToken: string | null;
  refreshToken: string | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  idToken: localStorage.getItem('idToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.idToken = null;
      state.refreshToken = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.accessToken = payload.accessToken;
        state.idToken = payload.idToken;
        state.refreshToken = payload.refreshToken;
        localStorage.setItem('accessToken', payload.accessToken);
        localStorage.setItem('idToken', payload.idToken);
        localStorage.setItem('refreshToken', payload.refreshToken);

        state.user = decode<CognitoIdTokenPayload>(payload.idToken);
      })
      .addCase(loginAsync.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload ?? 'Login falló';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
