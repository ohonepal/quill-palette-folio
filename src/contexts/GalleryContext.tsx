import React, { createContext, useContext, useState, useEffect } from 'react';

export interface GalleryImage {
  id: string;
  url: string;
  publicId: string;
  uploadedAt: string;
}

interface GalleryContextType {
  images: GalleryImage[];
  addImage: (url: string, publicId: string) => void;
  deleteImage: (id: string) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<GalleryImage[]>(() => {
    const stored = localStorage.getItem('galleryImages');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('galleryImages', JSON.stringify(images));
  }, [images]);

  const addImage = (url: string, publicId: string) => {
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      url,
      publicId,
      uploadedAt: new Date().toISOString(),
    };
    setImages(prev => [newImage, ...prev]);
  };

  const deleteImage = (id: string) => {
    setImages(prev => prev.filter(image => image.id !== id));
  };

  return (
    <GalleryContext.Provider value={{ images, addImage, deleteImage }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) throw new Error('useGallery must be used within GalleryProvider');
  return context;
};
