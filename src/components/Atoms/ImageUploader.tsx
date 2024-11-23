import React from 'react';

interface ImageUploaderProps {
  image: string | null; 
  onImageUpload: (base64Image: string) => void; 
  onRemove: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ image, onImageUpload, onRemove }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string); 
      };
      reader.readAsDataURL(file); 
    }
  };

  return (
    <div className="relative w-full h-full">
    {image ? (
      <div className="w-full h-full border border-gray-300">
        <img src={image} alt="Imagem carregada" className="w-full h-full object-cover" />
        <button
          onClick={onRemove}
          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
        >
          X
        </button>
      </div>
    ) : (
      <label className="flex items-center justify-center w-full h-full border border-dashed border-gray-300 cursor-pointer">
        <span className="text-gray-400 text-2xl">+</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
    )}
    </div>
  );
};

export default ImageUploader;
