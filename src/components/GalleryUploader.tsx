import { useState, useRef } from 'react';
import { useGallery } from '@/contexts/GalleryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GalleryUploaderProps {
  onClose: () => void;
}

const GalleryUploader = ({ onClose }: GalleryUploaderProps) => {
  const { uploadImage } = useGallery();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please select an image to upload.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      await uploadImage(
        selectedFile,
        formData.title || undefined,
        formData.description || undefined
      );

      toast({
        title: 'Image uploaded',
        description: 'Your image has been added to the gallery.',
      });

      onClose();
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Upload Image</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {preview ? (
            <div className="space-y-4">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              
              <Input
                placeholder="Title (optional)"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              
              <Input
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1"
                >
                  {isUploading ? 'Uploading...' : 'Upload to Gallery'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setPreview(null);
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-64 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-accent/5 transition-colors"
            >
              <Upload className="h-12 w-12 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium">Click to select image</p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG or WEBP (max 10MB)
                </p>
              </div>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default GalleryUploader;
