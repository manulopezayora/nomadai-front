export interface ToastOptions {
  description?: string;
  duration?: number;
}

export interface ToastService {
  success(message: string, options?: ToastOptions): void;
  error(message: string, options?: ToastOptions): void;
  info(message: string, options?: ToastOptions): void;
  warning(message: string, options?: ToastOptions): void;
}
