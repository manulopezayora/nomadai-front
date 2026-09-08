import { toast as sonnerToast } from 'vue-sonner';
import type { ToastOptions, ToastService } from './toast.interface';

export class SonnerToastAdapter implements ToastService {
  success(message: string, options?: ToastOptions): void {
    sonnerToast.success(message, {
      description: options?.description,
      duration: options?.duration,
    });
  }

  error(message: string, options?: ToastOptions): void {
    sonnerToast.error(message, {
      description: options?.description,
      duration: options?.duration,
    });
  }

  info(message: string, options?: ToastOptions): void {
    sonnerToast.info(message, {
      description: options?.description,
      duration: options?.duration,
    });
  }

  warning(message: string, options?: ToastOptions): void {
    sonnerToast.warning(message, {
      description: options?.description,
      duration: options?.duration,
    });
  }
}

export const toast = new SonnerToastAdapter();
