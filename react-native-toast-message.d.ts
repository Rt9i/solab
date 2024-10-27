declare module 'react-native-toast-message' {
    import { ToastOptions } from 'react-native-toast-message/lib/src/types';
    const Toast: {
      show: (options: ToastOptions) => void;
      hide: () => void;
      setRef: (ref: any) => void;
    };
    export default Toast;
  }
  