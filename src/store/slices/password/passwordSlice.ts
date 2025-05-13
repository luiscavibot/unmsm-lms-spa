// src/features/auth/passwordSlice.ts
import { createSlice } from '@reduxjs/toolkit';

import { confirmPasswordResetAsync, forgotPasswordAsync } from '../../thunks/password';
import { PasswordState } from './types';

const initialState: PasswordState = {
  forgotStatus: 'idle',
  forgotError: null,
  resetStatus: 'idle',
  resetError: null,
  forgotEmail: null,
};

// 1️⃣ Thunk: solicita el envío de código

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    // limpia estado si el usuario abandona el flujo
    clearPasswordState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // — forgotPasswordAsync —
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.forgotStatus = 'loading';
        state.forgotError = null;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.forgotStatus = 'idle';
        state.forgotEmail = action.meta.arg; // guardamos el email
      })
      .addCase(forgotPasswordAsync.rejected, (state, { payload }) => {
        state.forgotStatus = 'failed';
        state.forgotError = payload ?? 'Error al solicitar código';
      })

      // — confirmPasswordResetAsync —
      .addCase(confirmPasswordResetAsync.pending, (state) => {
        state.resetStatus = 'loading';
        state.resetError = null;
      })
      .addCase(confirmPasswordResetAsync.fulfilled, (state) => {
        state.resetStatus = 'idle';
      })
      .addCase(confirmPasswordResetAsync.rejected, (state, { payload }) => {
        state.resetStatus = 'failed';
        state.resetError = payload ?? 'Error al restablecer contraseña';
      });
  },
});

export const { clearPasswordState } = passwordSlice.actions;
export default passwordSlice.reducer;
