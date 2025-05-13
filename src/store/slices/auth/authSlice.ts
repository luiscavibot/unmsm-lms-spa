import { createSlice } from '@reduxjs/toolkit';
import { decode } from '@/helpers/jwt';
import { CognitoIdTokenPayload } from '@/features/auth/interfaces/Cognito';
import { loginAsync } from '../../thunks/loginAsync';
import { logoutAsync } from '../../thunks/logoutAsync';
import { AuthState } from './types';
import { SliceNames } from '../sliceNames';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  idToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: SliceNames.Auth,
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.accessToken = null;
      state.idToken = null;
      state.refreshToken = null;
      state.status = 'idle';
      state.error = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // —— loginAsync ——
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.accessToken = payload.accessToken;
        state.idToken = payload.idToken;
        state.refreshToken = payload.refreshToken;
        state.user = decode<CognitoIdTokenPayload>(payload.idToken);
        localStorage.setItem('accessToken', payload.accessToken);
        localStorage.setItem('idToken', payload.idToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(loginAsync.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload ?? 'Login falló';
      })

      // —— logoutAsync ——
      .addCase(logoutAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        // Limpieza local y reset
        state.status = 'idle';
        state.user = null;
        state.accessToken = null;
        state.idToken = null;
        state.refreshToken = null;
        localStorage.clear();
      })
      .addCase(logoutAsync.rejected, (state, { payload }) => {
        // Aunque falle la revocación, siempre limpiamos local
        state.status = 'idle';
        state.user = null;
        state.accessToken = null;
        state.idToken = null;
        state.refreshToken = null;
        localStorage.clear();
        state.error = payload ?? 'Logout falló';
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
