import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGavel,
  FaIdBadge,
  FaLocationArrow,
  FaPen,
} from "react-icons/fa";
import "../Css/Dashboard.css";
import ENV from "../env";
import UserProfileImage from "../components/fields/UserProfileImage";
import EditableInputField from "../components/fields/EditableInputField";

const Dashboard: React.FC = () => {
  const [lawyer, setLawyer] = useState<any>(null);
  const [editData, setEditData] = useState<any>({});
  const navigate = useNavigate();
  const location = useLocation();
  const passedLawyer = location.state?.lawyer;
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log("Navigated to dashboard");

    if (passedLawyer) {
      setLawyer(passedLawyer);
      localStorage.setItem("lawyerId", passedLawyer._id);
      setInitialValues(passedLawyer);
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
        localStorage.setItem("lawyerId", data._id);
        setInitialValues(data);
      } catch (error) {
        console.error("Error fetching lawyer data:", error);
        navigate("/login");
      }
    };

    fetchLawyerData();
  }, [navigate, passedLawyer]);

  const setInitialValues = (lawyer: any) => {
    setEditData({
      name: lawyer.name || "",
      email: lawyer.email || "",
      phoneNum: lawyer.phoneNum || "",
      address: lawyer.address || "",
      licenseNumber: lawyer.licenseNumber || "",
      bio: lawyer.bio || "",
      fee: lawyer.fee ? lawyer.fee.toString() : "0",
      practiceArea: lawyer.practiceArea || "",
      specialization: lawyer.specialization ? lawyer.specialization.join(", ") : "",
      education: lawyer.education ? lawyer.education.join(", ") : "",
      languages: lawyer.languages ? lawyer.languages.join(", ") : "",
      profileImage: lawyer.profileImage || ""
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const lawyerId = localStorage.getItem("lawyerId");
      if (!token || !lawyerId) {
        navigate("/login");
        return;
      }

      console.log("Saving data:", editData);

      const response = await fetch(`${ENV.API_BASE_URL}/api/lawyers/${lawyerId}/additional-info`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Response Error:", responseData);
        throw new Error(responseData.message || "Failed to update lawyer data");
      }

      console.log("Response Data:", responseData);

      setLawyer(responseData);
      setIsEditing(false);
      setInitialValues(responseData);

      toast.success("Changes saved successfully!");
    } catch (error: any) {
      console.error("Error updating lawyer data:", error);
      toast.error("Failed to save changes.");
    }
  };

  if (!lawyer) {
    return <div>Loading...</div>;
  }

  const handleIconClick = () => {
    document.getElementById("imageUpload")?.click();
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("profileImage", file);

      const token = localStorage.getItem("token");
      const lawyerId = localStorage.getItem("lawyerId");

      try {
        const response = await fetch(`${ENV.API_BASE_URL}/api/lawyers/${lawyerId}/profile-image`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        console.log(`Image URL: ${data.profileImage}`);
        setUploadedImage(data.profileImage);
        setLawyer({ ...lawyer, profileImage: data.profileImage });
        setEditData({ ...editData, profileImage: data.profileImage }); // Update the editData state
        toast.success("Profile image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload profile image");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <ToastContainer />
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
            <li
              onClick={() => {
                console.log("Navigating to furtherDetails with lawyerId:", lawyer._id);
                navigate("/furtherDetails", { state: { lawyerId: lawyer._id } });
              }}
            >
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
              cameraStyle={{ width: 60, height: 60 }}
              imageUrl={uploadedImage || lawyer?.profileImage}
              onIconClick={handleIconClick}
            />
            <input
              id="imageUpload"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
              <h1 style={{ marginLeft: 15, marginBottom: 0 }}>{editData.name}</h1>
              <div style={{ display: "flex", alignItems: "center", marginLeft: 15 }}>
                <FaLocationArrow style={{ color: "grey", marginRight: "10px" }} />
                <p>{editData.address}</p>
              </div>
            </div>
          </div>
          <div className="dashboard-InfoCard">
            <div style={{ marginTop: 15, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <text style={{ fontSize: 20, fontWeight: "bold" }}>Profile</text>
              <button className="edit-button" onClick={handleEditClick}>
                Edit
                <FaPen style={{ width: 14, height: "auto" }} />
              </button>
            </div>
            <div style={{ marginTop: 12 }}>
              <text style={{ color: "gray", fontWeight: "bold" }}>User Information</text>
              <div style={{ marginTop: 18 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>Name</text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => setIsEditing(false)}
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
                  placeholder="Name"
                  name="name"
                  value={editData.name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>Email</text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => setIsEditing(false)}
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
                  placeholder="Email"
                  name="email"
                  value={editData.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>Phone</text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => setIsEditing(false)}
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
                  placeholder="Phone"
                  name="phoneNum"
                  value={editData.phoneNum || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>Address</text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => setIsEditing(false)}
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
                  placeholder="Address"
                  name="address"
                  value={editData.address || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>License No.</text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => setIsEditing(false)}
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
                  placeholder="License No."
                  name="licenseNumber"
                  value={editData.licenseNumber || ""}
                  onChange={handleInputChange}
                />
              </div>

              <hr style={{ marginTop: 20, color: "grey" }}></hr>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>Bio</text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => setIsEditing(false)}
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
                  placeholder="Bio"
                  name="bio"
                  value={editData.bio || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>Fee</text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => setIsEditing(false)}
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
                  placeholder="Fee"
                  name="fee"
                  value={editData.fee || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>
                  Practice Area
                </text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => setIsEditing(false)}
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
                  placeholder="Practice Area"
                  name="practiceArea"
                  value={editData.practiceArea || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>
                  Specialization
                </text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => setIsEditing(false)}
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
                  placeholder="Specialization"
                  name="specialization"
                  value={editData.specialization || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>
                  Education
                </text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => setIsEditing(false)}
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
                  placeholder="Education"
                  name="education"
                  value={editData.education || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginTop: 15 }}>
                <text style={{ color: "black", fontWeight: "bold" }}>
                  Languages
                </text>
                <EditableInputField
                  isEditing={isEditing}
                  toggleEdit={() => setIsEditing(false)}
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
                  placeholder="Languages"
                  name="languages"
                  value={editData.languages || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginTop: 15, display: "flex", justifyContent: "center" }}>
                {isEditing && (
                  <button className="save-button" onClick={handleSaveClick}>
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
