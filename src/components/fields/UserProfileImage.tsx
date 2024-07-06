import React, { useState, CSSProperties } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";

// Update the component's props type to include cameraStyle
interface UserProfileImageProps {
  style?: CSSProperties; // Optional style prop for the outer div
  cameraStyle?: CSSProperties; // Optional style prop for the camera icon
}

const UserProfileImage: React.FC<UserProfileImageProps> = ({
  style,
  cameraStyle,
}) => {
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
        ...style, // Spread the optional style prop here for the outer div
      }}
    >
      {uploadedImage ? (
        <img
          src={uploadedImage}
          alt="Profile"
          style={{
            width: 200,
            height: 200,
            borderRadius: "15%",
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
          bottom: -3,
          right: -5,
          color: "#8ad9f8",
          borderRadius: "25%",
          ...cameraStyle, // Apply the optional cameraStyle prop here
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
