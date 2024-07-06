import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGavel,
  FaIdBadge,
  FaLocationArrow,
  FaMoneyBill,
  FaBuilding,
  FaWrench,
  FaSchool,
  FaLanguage,
  FaBook,
} from "react-icons/fa";
import "../Css/Dashboard.css";
import ENV from "../env";
import UserProfileImage from "../components/fields/UserProfileImage";
import EditableInputField from "../components/fields/EditableInputField";

const Dashboard: React.FC = () => {
  const [lawyer, setLawyer] = useState<any>(null);
  const [editData, setEditData] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const passedLawyer = location.state?.lawyer;
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (passedLawyer) {
      setLawyer(passedLawyer);
      setUploadedImage(passedLawyer.profileImage); // Set uploaded image if available
      return;
    }

    const fetchLawyerData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${ENV.API_BASE_URL}/api/lawyers/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch lawyer data");
        }
        const data = await response.json();
        setLawyer(data);
        setUploadedImage(data.profileImage); // Set uploaded image if available
      } catch (error) {
        console.error("Error fetching lawyer data:", error);
        navigate("/login");
      }
    };

    fetchLawyerData();
  }, [navigate, passedLawyer]);

  const handleEditClick = () => {
    setEditData(lawyer); // Clone the lawyer object for editing
    setIsEditing(true);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${ENV.API_BASE_URL}/api/lawyers/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update lawyer data");
      }

      const updatedLawyer = await response.json();
      setLawyer(updatedLawyer);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating lawyer data:", error);
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await fetch(`${ENV.API_BASE_URL}/api/lawyers/${lawyer._id}/profile-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setUploadedImage(data.profileImage);
      setLawyer((prevLawyer: any) => ({ ...prevLawyer, profileImage: data.profileImage }));
      setUploadSuccess("Profile image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadSuccess("Failed to upload profile image");
    }

    // Clear the success message after a delay
    setTimeout(() => setUploadSuccess(null), 3000);
  };

  const handleAdditionalProfileDetailsClick = () => {
    navigate("/furtherDetails");
  };

  if (!lawyer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <FaUserCircle size={60} color="#fff" />
          <h2>WAUQLA</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">
              <FaUserCircle /> Dashboard
            </li>
            <li>
              <FaEnvelope /> Announcements
            </li>
            <li>
              <FaGavel /> My Cases
            </li>
            <li>
              <FaIdBadge /> Profile
            </li>
            <li onClick={handleAdditionalProfileDetailsClick}>
              <FaIdBadge /> Additional Profile Details
            </li>
            <li>
              <FaMapMarkerAlt /> Contact
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <div style={{ display: "flex" }}>
          <div className="dashboard-MainCard" style={{ marginRight: "20px" }}>
            <UserProfileImage
              style={{ width: 200, height: 200, borderRadius: "15%" }}
              cameraStyle={{ width: 40, height: 40 }}
              onImageUpload={handleImageUpload}
              src={uploadedImage ?? undefined} // Pass the uploaded image URL or undefined
            />
            {uploadSuccess && <p>{uploadSuccess}</p>}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <h1 style={{ marginLeft: 15, marginBottom: 0 }}>{lawyer?.name || "Loading..."}</h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 15,
                }}
              >
                <FaLocationArrow
                  style={{ color: "grey", marginRight: "10px" }}
                />
                <p>{lawyer?.address || "Loading..."}</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="dashboard-details">
            <div className="detail-item">
              <FaBook size={20} />
              <span>Bio: {lawyer?.bio || "Loading..."}</span>
            </div>
            <div className="detail-item">
              <FaMoneyBill size={20} />
              <span>Fee: {lawyer?.fee || "Loading..."}</span>
            </div>
            <div className="detail-item">
              <FaGavel size={20} />
              <span>Practice Area: {lawyer?.morePracticeArea?.join(", ") || "Loading..."}</span>
            </div>
            <div className="detail-item">
              <FaBuilding size={20} />
              <span>Court: {lawyer?.court?.join(", ") || "Loading..."}</span>
            </div>
            <div className="detail-item">
              <FaWrench size={20} />
              <span>Specialization: {lawyer?.specialization?.join(", ") || "Loading..."}</span>
            </div>
            <div className="detail-item">
              <FaSchool size={20} />
              <span>Education: {lawyer?.education?.join(", ") || "Loading..."}</span>
            </div>
            <div className="detail-item">
              <FaLanguage size={20} />
              <span>Languages: {lawyer?.languages?.join(", ") || "Loading..."}</span>
            </div>
            <hr style={{ color: "gray", width: "100%" }} />
            <div className="detail-item">
              <FaEnvelope size={20} />
              <span>{lawyer?.email || "Loading..."}</span>
            </div>
            <div className="detail-item">
              <FaPhone size={20} />
              <span>{lawyer?.phoneNum || "Loading..."}</span>
            </div>
            <div className="detail-item">
              <FaMapMarkerAlt size={20} />
              <span>{lawyer?.address}, {lawyer?.city}, {lawyer?.zip}</span>
            </div>
            <div className="detail-item">
              <FaIdBadge size={20} />
              <span>License Number: {lawyer?.licenseNumber || "Loading..."}</span>
            </div>
            <div className="detail-item">
              <FaIdBadge size={20} />
              <span>Years Admitted: {lawyer?.yearsAdmitted || "Loading..."}</span>
            </div>
            <div className="detail-item">
              <FaIdBadge size={20} />
              <span>Disciplinary History: {lawyer?.disciplinaryHistory?.join(", ") || "Loading..."}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
