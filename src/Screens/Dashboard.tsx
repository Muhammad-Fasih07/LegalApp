import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGavel,
  FaIdBadge,
  FaEdit,
  FaLocationArrow,
  FaPen,
  FaMoneyBill,
  FaBuilding,
  FaWrench,
  FaSchool,
  FaLanguage,
  FaBook, // Add this line to import the FaMoneyBill component
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
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("Name Here");
  const [email, setEmail] = useState("Email Here");
  const [phone, phoneNumber] = useState("Phone Here");
  const [address, setAddress] = useState("Address Here");
  const [licenseNumber, setLicenseNumber] = useState("License Here");
  const [yearsAdmitted, setYearsAdmitted] = useState("Years Here");

  useEffect(() => {
    if (passedLawyer) {
      setLawyer(passedLawyer);
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
            {" "}
            <UserProfileImage
              style={{ width: 200, height: 200, borderRadius: "15%" }}
              cameraStyle={{ width: 40, height: 40 }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <h1 style={{ marginLeft: 15, marginBottom: 0 }}>{lawyer.name}</h1>
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
                <p>Hubertusstraße 149, 41239 Mönchengladbach</p>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="dashboard-details">
              <div className="detail-item">
                <FaBook size={20} />
                <span>Bio: {lawyer.bio}</span>
              </div>
              <div className="detail-item">
                <FaMoneyBill size={20} />
                <span>Fee: {lawyer.fee}</span>
              </div>
              <div className="detail-item">
                <FaGavel size={20} />
                <span>Practice Area: {lawyer.practiceArea}</span>
              </div>
              <div className="detail-item">
                <FaBuilding size={20} />
                <span>Court: {lawyer.practiceArea}</span>
              </div>
              <div className="detail-item">
                <FaWrench size={20} />
                <span>Specialization: {lawyer.practiceArea}</span>
              </div>
              <div className="detail-item">
                <FaSchool size={20} />
                <span>Education: {lawyer.practiceArea}</span>
              </div>
              <div className="detail-item">
                <FaLanguage size={20} />
                <span>Languages: {lawyer.practiceArea}</span>
              </div>
              <hr style={{ color: "gray", width: "100%" }} />
              <div className="detail-item">
                <FaEnvelope size={20} />
                <span>{lawyer.email}</span>
              </div>
              <div className="detail-item">
                <FaPhone size={20} />
                <span>{lawyer.phoneNum}</span>
              </div>
              <div className="detail-item">
                <FaMapMarkerAlt size={20} />
                <span>
                  {lawyer.address}, {lawyer.city}, {lawyer.zip}
                </span>
              </div>

              <div className="detail-item">
                <FaIdBadge size={20} />
                <span>License Number: {lawyer.licenseNumber}</span>
              </div>
              <div className="detail-item">
                <FaIdBadge size={20} />
                <span>Years Admitted: {lawyer.yearsAdmitted}</span>
              </div>
              <div className="detail-item">
                <FaIdBadge size={20} />
                <span>
                  Disciplinary History: {lawyer.disciplinaryHistory.join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
