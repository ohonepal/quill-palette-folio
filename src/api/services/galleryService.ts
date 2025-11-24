import { apiClient } from '@/api/client';
import { API_ENDPOINTS } from '@/config/constants';

export interface GalleryImage {
  id: string;
  url: string;
  title?: string;
  description?: string;
  uploadedAt: string;
}

export interface UploadImageDto {
  file: File;
  title?: string;
  description?: string;
}

export const galleryService = {
  async getAllImages(): Promise<GalleryImage[]> {
    return apiClient.get<GalleryImage[]>(API_ENDPOINTS.GALLERY.LIST, { requiresAuth: false });
  },

  async uploadImage(data: UploadImageDto): Promise<GalleryImage> {
    const formData = new FormData();
    formData.append('file', data.file);
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);

    const response = await fetch(`${apiClient['baseURL']}${API_ENDPOINTS.GALLERY.UPLOAD}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    return response.json();
  },

  async deleteImage(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.GALLERY.DELETE(id));
  },
};
