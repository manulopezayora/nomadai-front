import { ApiError } from '@/api/api-error';
import { useI18n } from 'vue-i18n';
import { toast } from '../services/toast';

export const useShowError = () => {
  const { t } = useI18n();

  const showError = (error: unknown) => {
    const code = error instanceof ApiError ? error.code : 'UNEXPECTED_ERROR';
    toast.error(t(`api.${code}`));
  };

  return { showError };
};
