import { cloudinaryClient, type CloudinaryUploadResponse } from '@/api/cloudinary-client';

export const uploadPhotoAction = async (formData: FormData): Promise<CloudinaryUploadResponse> => {
  const { data } = await cloudinaryClient.post<CloudinaryUploadResponse>('/image/upload', formData);

  return data;
};
