import { useMutation } from '@tanstack/vue-query';
import { uploadPhotoAction } from '../actions/upload-photo.action';

export const useUploadAvatarMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => uploadPhotoAction(formData),
  });
};
