export interface PasswordState {
  forgotStatus: 'idle' | 'loading' | 'failed';
  forgotError: string | null;
  resetStatus: 'idle' | 'loading' | 'failed';
  resetError: string | null;
  // Guardamos el email para reutilizar en la confirmación de reset:
  forgotEmail: string | null;
}
