import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";

interface UserProfileImageProps {
  style?: React.CSSProperties;
  cameraStyle?: React.CSSProperties;
  imageUrl?: string;
  onIconClick?: () => void;
}

interface CustomUserIconProps {
  style?: React.CSSProperties;
  onClick?: () => void;
}

const CustomUserIcon: React.FC<CustomUserIconProps> = ({ style, onClick }) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    style={style}
    onClick={onClick}
  >
    <rect width="100" height="100" rx="15" ry="15" fill="#E0E0E0" />
    <path
      d="M50 30c8.284 0 15-6.716 15-15S58.284 0 50 0 35 6.716 35 15s6.716 15 15 15zm0 10c-12.15 0-35 6.075-35 18.225V70h70v-11.775C85 46.075 62.15 40 50 40z"
      fill="#757575"
    />
  </svg>
);

const UserProfileImage: React.FC<UserProfileImageProps> = ({
  style,
  cameraStyle,
  imageUrl,
  onIconClick,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(imageUrl || null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (uploadedImage) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => setShowSuccessMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [uploadedImage]);

  const handleIconClick = () => {
    document.getElementById("imageUpload")?.click();
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        ...style,
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
            ...style,
          }}
        />
      ) : (
        <CustomUserIcon
          onClick={handleIconClick}
          style={{
            cursor: "pointer",
            color: "#4CAF50",
            ...style,
          }}
        />
      )}
      <FaCamera
        size={25}
        onClick={handleIconClick}
        style={{
          cursor: "pointer",
          position: "absolute",
          bottom: 0,
          right: -5,
          color: "#8ad9f8",
          borderRadius: "25%",
          ...cameraStyle,
        }}
      />
      {showSuccessMessage && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: "rgba(0, 128, 0, 0.7)",
            color: "white",
            textAlign: "center",
            borderRadius: "15% 15% 0 0",
            padding: "5px 0",
          }}
        >
          Upload Successful
        </div>
      )}
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
