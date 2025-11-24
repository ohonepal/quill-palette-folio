import React, { createContext, useContext, useState, useEffect } from 'react';
import { galleryService, GalleryImage } from '@/api/services/galleryService';

export type { GalleryImage };

interface GalleryContextType {
  images: GalleryImage[];
  uploadImage: (file: File, title?: string, description?: string) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  isLoading: boolean;
  refreshImages: () => Promise<void>;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshImages = async () => {
    try {
      setIsLoading(true);
      const fetchedImages = await galleryService.getAllImages();
      setImages(fetchedImages);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshImages();
  }, []);

  const uploadImage = async (file: File, title?: string, description?: string) => {
    try {
      const newImage = await galleryService.uploadImage({ file, title, description });
      setImages(prev => [newImage, ...prev]);
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw error;
    }
  };

  const deleteImage = async (id: string) => {
    try {
      await galleryService.deleteImage(id);
      setImages(prev => prev.filter(image => image.id !== id));
    } catch (error) {
      console.error('Failed to delete image:', error);
      throw error;
    }
  };

  return (
    <GalleryContext.Provider value={{ images, uploadImage, deleteImage, isLoading, refreshImages }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) throw new Error('useGallery must be used within GalleryProvider');
  return context;
};
