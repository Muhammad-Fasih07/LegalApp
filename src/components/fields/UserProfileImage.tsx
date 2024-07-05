import React, { useState } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa"; // Import FaCamera

const UserProfileImage: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleIconClick = () => {
    document.getElementById("imageUpload")?.click();
  };

  return (
    <div
      style={{
        textAlign: "center",
        position: "relative",
        display: "inline-block",
      }}
    >
      {uploadedImage ? (
        <img
          src={uploadedImage}
          alt="Profile"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
          }}
        />
      ) : (
        <FaUserCircle
          size={100}
          onClick={handleIconClick}
          style={{ cursor: "pointer", color: "#4CAF50" }}
        />
      )}
      <FaCamera
        size={25}
        onClick={handleIconClick}
        style={{
          cursor: "pointer",
          position: "absolute",
          bottom: 5,
          right: 0,
          color: "grey",
          borderRadius: "25%",
        }}
      />
      <input
        type="file"
        id="imageUpload"
        style={{ display: "none" }}
        accept="image/*"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setUploadedImage(imageUrl);
          }
        }}
      />
    </div>
  );
};

export default UserProfileImage;
