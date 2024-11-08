import React, { useState } from 'react';

const MAX_IMAGES = 5;

const MultiImageUpload = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    

    if (files.length + images.length <= MAX_IMAGES) {
      setImages((prevImages) => [...prevImages, ...files]);
    } else {
      alert(`Você só pode fazer upload de até ${MAX_IMAGES} imagens.`);
    }
    event.target.value = ''; 
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">

        {images[0] ? (
          <div className="relative w-48 h-48 border border-gray-300">
            <img
              src={URL.createObjectURL(images[0])}
              alt="Imagem principal"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleRemoveImage(0)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
            >
              X
            </button>
          </div>
        ) : (
          <label className="flex items-center justify-center w-48 h-48 border border-dashed border-gray-300 cursor-pointer">
            <span className="text-gray-400 text-2xl">+</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        )}

        <div className="grid grid-cols-2 gap-4">
          {images.slice(1).map((image, index) => (
            <div key={index} className="relative w-24 h-24 border border-gray-300">
              <img
                src={URL.createObjectURL(image)}
                alt={`Upload ${index + 2}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleRemoveImage(index + 1)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
              >
                X
              </button>
            </div>
          ))}


          {[...Array(Math.max(0, 5 - images.length))].map((_, index) => (
            <label
              key={index}
              className="flex items-center justify-center w-24 h-24 border border-dashed border-gray-300 cursor-pointer"
            >
              <span className="text-gray-400 text-2xl">+</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiImageUpload;
