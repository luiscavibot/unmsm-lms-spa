// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'es',
  resources: {
    es: {
      translation: {
        UserNotFoundException: 'Usuario no encontrado',
        'User does not exist.': 'El usuario no existe.',
        NotAuthorizedException: 'No autorizado',
        'Incorrect username or password.': 'Nombre de usuario o contraseña incorrectos.',
        UserNotConfirmedException: 'Usuario no confirmado',
        'User is not confirmed.': 'El usuario no ha confirmado su cuenta.',
        PasswordResetRequiredException: 'Restablecimiento de contraseña requerido',
        'Password reset required for the user.': 'Es necesario restablecer la contraseña.',
        TooManyFailedAttemptsException: 'Demasios intentos fallidos',
        'Too many failed attempts, please try again later.':
          'Ha excedido el número de intentos. Intenta de nuevo más tarde.',
        InvalidParameterException: 'Parámetro inválido',
        'Invalid parameter: username or password format.': 'Formato de usuario o contraseña inválido.',
        UserDisabledException: 'Usuario deshabilitado',
        'User is disabled.': 'La cuenta de usuario está deshabilitada.',
      },
    },
  },
});

export default i18n;
