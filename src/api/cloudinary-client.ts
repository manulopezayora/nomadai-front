import axios from 'axios';

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

const cloudinaryClient = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`,
});

export { cloudinaryClient };
