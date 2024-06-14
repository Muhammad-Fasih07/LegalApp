import React, { useState } from "react";
import Modal from "react-modal";
import uploadImage from "../images/uploadImage.png";
Modal.setAppElement("#root");

interface ImageUploadModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onImageUpload: (file: File) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onRequestClose,
  onImageUpload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleConfirmClick = () => {
    if (selectedFile) {
      onImageUpload(selectedFile);
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Upload Modal"
      style={{
        content: {
          width: "400px",
          height: "400px",
          margin: "auto",
        },
      }}
    >
      <h2>Upload Image</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleConfirmClick}>Confirm</button>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ImageUploadModal;
