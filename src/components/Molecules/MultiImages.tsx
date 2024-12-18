import { useEffect, useState } from "react";
import ImageUploader from "../Atoms/ImageUploader";

const MultiImages = ({ setValue }: any) => {
  const [images, setImages] = useState<(string | null)[]>(
    new Array(5).fill(null)
  );

  useEffect(() => {
    setValue(
      "images",
      images.filter((image) => image !== null)
    );
  }, [images, setValue]);

  const handleImageUpload = (index: number, base64Image: string) => {
    const updatedImages = [...images];
    updatedImages[index] = base64Image;
    setImages(updatedImages);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.slice(0, 4).map((image, index) => (
        <div key={index} className="w-full h-48 relative">
          <ImageUploader
            image={image}
            onImageUpload={(base64Image) =>
              handleImageUpload(index, base64Image)
            }
            onRemove={() => handleRemoveImage(index)}
          />
        </div>
      ))}
      <div className="col-span-1 sm:col-span-2 lg:col-span-1 w-full h-48 relative">
        <ImageUploader
          image={images[4]}
          onImageUpload={(base64Image) => handleImageUpload(4, base64Image)}
          onRemove={() => handleRemoveImage(4)}
        />
      </div>
    </div>
  );
};

export default MultiImages;
