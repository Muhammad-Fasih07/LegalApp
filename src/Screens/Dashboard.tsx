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
  const [phone, setPhone] = useState("Phone Here");
  const [address, setAddress] = useState("Address Here");
  const [licenseNumber, setLicenseNumber] = useState("License Here");
  const [yearsAdmitted, setYearsAdmitted] = useState("Years Here");

  const [bio, setBio] = useState("Bio Here");
  const [fee, setFee] = useState("Fee Here");
  const [practiceArea, setPracticeArea] = useState("Area Here");
  const [court, setCourt] = useState("Court Here");
  const [specialization, setSpecialization] = useState("Specialization Here");
  const [education, setEducation] = useState("Education Here");
  const [languages, setLanguages] = useState("Languages Here");

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
  const handleImageUpload = (file: File) => {
    // Implement your image upload logic here
    // For example, updating the state or sending the image to a server
    console.log("Uploading image", file);
  };
  const toggleEdit = () => {
    setIsEditing(!isEditing); // Toggle the state
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSave = (field: string, value: string) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;

      case "phone":
        setPhone(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "licenseNumber":
        setAddress(value);
        break;
      case "yearsAdmitted":
        setYearsAdmitted(value);
        break;

      default:
        console.warn(`No handler for field: ${field}`);
    }

    setIsEditing(false);
  };
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
          <div className="dashboard-InfoCard">
            <div
              style={{
                marginTop: 15,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <text style={{ fontSize: 20, fontWeight: "bold" }}>Profile</text>
              <button className="edit-button" onClick={toggleEdit}>
                Edit
                <FaPen style={{ width: 14, height: "auto" }} />
              </button>
            </div>{" "}
            <div style={{ marginTop: 12 }}>
              <text style={{ color: "gray", fontWeight: "bold" }}>
                User Information
              </text>
              <div style={{ marginTop: 18 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>Name</text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => handleSave(name)}
                  width="200px"
                  height="30px"
                  style={{
                    border: "1px solid black",
                    borderRadius: 8,
                    padding: "5px",
                    marginTop: "10px",
                  }}
                  placeholderStyle={{
                    marginTop: "5px",
                    color: "black",
                    fontSize: "16px",
                  }}
                  placeholder={name}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>
                  Email
                </text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => handleSave(email)}
                  width="200px"
                  height="30px"
                  style={{
                    border: "1px solid black",
                    borderRadius: 8,
                    padding: "5px",
                    marginTop: "10px",
                  }}
                  placeholderStyle={{
                    marginTop: "5px",
                    color: "black",
                    fontSize: "16px",
                  }}
                  placeholder={email}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>
                  Phone
                </text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => handleSave(phone)}
                  width="200px"
                  height="30px"
                  style={{
                    border: "1px solid black",
                    borderRadius: 8,
                    padding: "5px",
                    marginTop: "10px",
                  }}
                  placeholderStyle={{
                    marginTop: "5px",
                    color: "black",
                    fontSize: "16px",
                  }}
                  placeholder={phone}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>
                  Address
                </text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => handleSave(address)}
                  width="200px"
                  height="30px"
                  style={{
                    border: "1px solid black",
                    borderRadius: 8,
                    padding: "5px",
                    marginTop: "10px",
                  }}
                  placeholderStyle={{
                    marginTop: "5px",
                    color: "black",
                    fontSize: "16px",
                  }}
                  placeholder={address}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>
                  License No.
                </text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => handleSave(licenseNumber)}
                  width="200px"
                  height="30px"
                  style={{
                    border: "1px solid black",
                    borderRadius: 8,
                    padding: "5px",
                    marginTop: "10px",
                  }}
                  placeholderStyle={{
                    marginTop: "5px",
                    color: "black",
                    fontSize: "16px",
                  }}
                  placeholder={licenseNumber}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>
                  Years Admitted
                </text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => handleSave(yearsAdmitted)}
                  width="200px"
                  height="30px"
                  style={{
                    border: "1px solid black",
                    borderRadius: 8,
                    padding: "5px",
                    marginTop: "10px",
                  }}
                  placeholderStyle={{
                    marginTop: "5px",
                    color: "black",
                    fontSize: "16px",
                  }}
                  placeholder={yearsAdmitted}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
