import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/buttons/button";
import { useNavigate } from "react-router-dom";

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
  const [isBioTyped, setIsBioTyped] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

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

  // New handler for focus event
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  // New handler for blur event
  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
            label="Specialization "
            style={{ marginBottom: "1.5rem" }}
          />
          <InputField
            type="text"
            name="languages"
            value={formState.languages}
            onChange={handleInputChange}
            label="Languages "
            style={{ marginBottom: "1.5rem" }}
          />
          <InputField
            type="text"
            name="education"
            value={formState.education}
            onChange={handleInputChange}
            label="Education "
            style={{ marginBottom: "1.5rem" }}
          />
        </div>

        <div className="signup-Button">
          <Button type="submit" height="50px" width="100px">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FurtherDetails;
