import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";
import Button from "../components/buttons/button";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import furtherDetailsAnimation from "../animations/furtherdetailsanimation.json";
import ENV from "../env";
import "../Css/details.css";

interface FurtherDetailsState {
  bio: string;
  fee: number;
  morePracticeArea: string;
  court: string;
  specialization: string;
  education: string;
  languages: string;
}

const initialFormState: FurtherDetailsState = {
  bio: "",
  fee: 0,
  morePracticeArea: "",
  court: "",
  specialization: "",
  education: "",
  languages: "",
};

function FurtherDetails() {
  const [formState, setFormState] = useState<FurtherDetailsState>(initialFormState);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const lawyerIdFromState = location.state?.lawyerId;
  const [lawyerId, setLawyerId] = useState<string | null>(lawyerIdFromState);

  useEffect(() => {
    if (!lawyerIdFromState) {
      const storedLawyerId = localStorage.getItem("lawyerId");
      setLawyerId(storedLawyerId);
    }
  }, [lawyerIdFromState]);

  // Log the lawyerId to verify it's being received
  useEffect(() => {
    console.log("Received lawyerId:", lawyerId);
  }, [lawyerId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "fee") {
      const feeValue = parseInt(value, 10);
      if (feeValue > 0) {
        setFormState((prevState) => ({
          ...prevState,
          fee: feeValue,
        }));
      }
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null); // Reset error message
    setShowSuccessAnimation(false); // Reset success animation

    if (!lawyerId) {
      setErrorMessage("No lawyer ID provided");
      setShowPopup(true);
      return;
    }

    const apiUrl = `${ENV.API_BASE_URL}/api/lawyers/${lawyerId}/additional-info`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Updated Lawyer:", data);
        setFormState(initialFormState); // Clear form fields
        setShowSuccessAnimation(true); // Show success animation

        // Remove the animation after 4 seconds
        setTimeout(() => {
          setShowSuccessAnimation(false);
        }, 4000);
      } else {
        setErrorMessage(`Failed to update lawyer: ${data.message || 'Unknown error'}`);
        console.error("Failed to update lawyer:", data);
        setShowPopup(true);
      }
    } catch (error: any) {
      setErrorMessage(`Error updating lawyer: ${error.message}`);
      console.error("Error updating lawyer:", error);
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setErrorMessage(null);
    setFormState(initialFormState); // Clear form fields when closing the popup
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="signup-Card">
          <InputField
            type="text"
            name="bio"
            value={formState.bio}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            label="Bio"
            style={{
              marginBottom: "1rem",
              marginTop: isInputFocused || formState.bio !== "" ? 20 : 0,
            }}
            labelColor="#000"
            labelStyle={{
              marginTop: isInputFocused || formState.bio !== "" ? 20 : 0,
            }}
          />
          <InputField
            type="number"
            name="fee"
            value={formState.fee.toString()}
            onChange={handleInputChange}
            label="Fee"
            style={{ marginBottom: "1rem" }}
            labelColor="#000"
          />
          <InputField
            type="text"
            name="morePracticeArea"
            value={formState.morePracticeArea}
            onChange={handleInputChange}
            label="Practice Area"
            style={{ marginBottom: "1rem" }}
            labelColor="#000"
          />
          <InputField
            type="text"
            name="court"
            value={formState.court}
            onChange={handleInputChange}
            label="Court"
            style={{ marginBottom: "1.5rem" }}
          />
          <InputField
            type="text"
            name="specialization"
            value={formState.specialization}
            onChange={handleInputChange}
            label="Specialization"
            style={{ marginBottom: "1.5rem" }}
          />
          <InputField
            type="text"
            name="languages"
            value={formState.languages}
            onChange={handleInputChange}
            label="Languages"
            style={{ marginBottom: "1.5rem" }}
          />
          <InputField
            type="text"
            name="education"
            value={formState.education}
            onChange={handleInputChange}
            label="Education"
            style={{ marginBottom: "1.5rem" }}
          />
        </div>

        <div className="signup-Button">
          <Button type="submit" height="50px" width="100px">
            Submit
          </Button>
        </div>
      </form>

      {showPopup && (
        <div className="popup">
          <div className="popup-message">
            <p>{errorMessage}</p>
            <button onClick={handleClosePopup} className="close-button">OK</button>
          </div>
        </div>
      )}

      {showSuccessAnimation && (
        <div className="animation-container">
          <Lottie animationData={furtherDetailsAnimation} loop={false} style={{ width: '300px', height: '300px' }} />
        </div>
      )}
    </div>
  );
}

export default FurtherDetails;
