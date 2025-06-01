import { Bounce, toast, ToastOptions, TypeOptions } from 'react-toastify';

export const showToast = (text: string, type: TypeOptions = 'success') => {
  const options: ToastOptions = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Bounce,
    style: {
      background: type === 'success' ? 'rgb(34, 134, 101)' : type === 'error' ? '#d32f2f' : undefined,
      color: '#ffffff',
    },
  };

  (toast[type as keyof typeof toast] as Function)(text, options);
};
