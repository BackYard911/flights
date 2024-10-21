import React, { useRef, useState } from "react";
import { ImagePreview } from "../ImagePreview/ImagePreview";
import { Input } from "../Input/Input";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file from the input
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a URL for preview
      onImageSelect(file); // Notify parent component about the selected image
    } else {
      setImagePreview(undefined);
      setSelectedImage(null);
      onImageSelect(null);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(undefined);
    setSelectedImage(null);
    onImageSelect(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <Input
        required={false}
        label="Upload an image"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleImageChange}
        passedRef={inputRef}
      />

      {selectedImage && (
        <div>
          <button type="button" onClick={() => setPreviewImage(true)}>
            Preview
          </button>
          <button type="button" onClick={handleRemoveImage}>
            Remove
          </button>
        </div>
      )}

      {previewImage && (
        <ImagePreview
          src={imagePreview}
          alt="Selected image"
          handleClose={() => setPreviewImage(false)}
        />
      )}
    </div>
  );
};

export default ImageUpload;
