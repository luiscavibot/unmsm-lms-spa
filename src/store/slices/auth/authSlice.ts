import { createSlice } from '@reduxjs/toolkit';
import { decode } from '@/helpers/jwt';
import { CognitoIdTokenPayload } from '@/features/auth/interfaces/Cognito';
import { loginAsync } from '../../thunks/loginAsync';
import { logoutAsync } from '../../thunks/logoutAsync';
import { AuthState, AuthStatusLogin } from './types';
import { SliceNames } from '../sliceNames';
import { completeNewPasswordAsync } from '@/store/thunks/completeNewPasswordAsync';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  idToken: null,
  refreshToken: null,
  status: AuthStatusLogin.Idle,
  error: null,
  newPasswordRequired: false,
  tempSession: null,
  tempUsername: null,
};

const authSlice = createSlice({
  name: SliceNames.Auth,
  initialState,
  reducers: {
    clearAuthState: (state) => {
      Object.assign(state, initialState);
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // —— loginAsync ——
      .addCase(loginAsync.pending, (state) => {
        state.status = AuthStatusLogin.Loading;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.status = AuthStatusLogin.Idle;
        if (payload.challengeName === 'NEW_PASSWORD_REQUIRED') {
          state.newPasswordRequired = true;
          state.tempSession = payload.session!;
          state.tempUsername = payload.username!;
          return;
        }
        state.idToken = payload.idToken!;
        state.accessToken = payload.accessToken!;
        state.refreshToken = payload.refreshToken!;
        state.user = decode<CognitoIdTokenPayload>(payload.idToken!);

        localStorage.setItem('idToken', payload.idToken!);
        localStorage.setItem('accessToken', payload.accessToken!);
        localStorage.setItem('refreshToken', payload.refreshToken!);
      })
      .addCase(loginAsync.rejected, (state, { payload }) => {
        state.status = AuthStatusLogin.Failed;
        state.error = payload ?? 'Login falló';
      })
      // —— completeNewPasswordAsync ——
      .addCase(completeNewPasswordAsync.pending, (state) => {
        state.status = AuthStatusLogin.Loading;
        state.error = null;
      })
      .addCase(completeNewPasswordAsync.fulfilled, (state, { payload }) => {
        state.status = AuthStatusLogin.Idle;
        // Limpio el challenge
        state.newPasswordRequired = false;
        state.tempSession = null;
        state.tempUsername = null;

        // Guardar tokens definitivos
        state.idToken = payload.idToken;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.user = decode<CognitoIdTokenPayload>(payload.idToken);

        localStorage.setItem('idToken', payload.idToken);
        localStorage.setItem('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(completeNewPasswordAsync.rejected, (state, { payload }) => {
        state.status = AuthStatusLogin.Failed;
        state.error = payload ?? 'Cambio de contraseña falló';
      })
      // —— logoutAsync ——
      .addCase(logoutAsync.pending, (state) => {
        state.status = AuthStatusLogin.Loading;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = AuthStatusLogin.Idle;
        state.user = null;
        state.accessToken = null;
        state.idToken = null;
        state.refreshToken = null;
        localStorage.clear();
      })
      .addCase(logoutAsync.rejected, (state, { payload }) => {
        state.status = AuthStatusLogin.Idle;
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
