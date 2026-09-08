export const getAvatarUrl = (publicId: string, size = 200) =>
  `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/w_${size},h_${size},c_fill,g_face/${publicId}`;
