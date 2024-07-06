import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/buttons/button";
import { useNavigate, useLocation } from "react-router-dom";
import ENV from "../env";

interface FurtherDetailsState {
  bio: string;
  fee: number;
  practiceArea: string;
  court: string;
  specialization: string;
  education: string;
  languages: string;
}

const initialFormState: FurtherDetailsState = {
  bio: "",
  fee: 0,
  practiceArea: "",
  court: "",
  specialization: "",
  education: "",
  languages: "",
};

function FurtherDetails() {
  const [formState, setFormState] =
    useState<FurtherDetailsState>(initialFormState);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const lawyerId = location.state?.lawyerId;

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

    if (!lawyerId) {
      console.error("No lawyer ID provided");
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

      if (response.ok) {
        const updatedLawyer = await response.json();
        console.log("Updated Lawyer:", updatedLawyer);
        navigate("/dashboard");
      } else {
        console.error("Failed to update lawyer");
      }
    } catch (error) {
      console.error("Error updating lawyer:", error);
    }
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
            name="practiceArea"
            value={formState.practiceArea}
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
    </div>
  );
}

export default FurtherDetails;
