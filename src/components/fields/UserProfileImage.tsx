import React from "react";
import { FaCamera } from "react-icons/fa";

interface UserProfileImageProps {
  style?: React.CSSProperties;
  cameraStyle?: React.CSSProperties;
  imageUrl?: string;
  onIconClick: () => void;
}

const UserProfileImage: React.FC<UserProfileImageProps> = ({
  style,
  cameraStyle,
  imageUrl,
  onIconClick,
}) => {
  return (
    <div className="user-profile-image" style={style}>
      <img
        src={imageUrl || "/path/to/default/profile/image.png"}
        alt="Profile"
        className="profile-image"
        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
      />
      <FaCamera
        className="camera-icon"
        onClick={onIconClick}
        style={{ ...cameraStyle, cursor: "pointer", position: "absolute", bottom: 10, right: 10 }}
      />
    </div>
  );
};

export default UserProfileImage;
