import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/buttons/button";
import { useNavigate } from "react-router-dom";

interface SignupFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialFormState: SignupFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const [formState, setFormState] = useState<SignupFormState>(initialFormState);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true); // State to track password match
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });

    // Check if passwords match when either password or confirmPassword changes
    if (event.target.name === "password" || event.target.name === "confirmPassword") {
      setPasswordMatch(formState.password === event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Check if passwords match
    if (formState.password === formState.confirmPassword) {
      navigate("/lawyersPersonalDetails", { state: formState });
    } else {
      alert("Passwords do not match. Please check and try again.");
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
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            label="Username"
            style={{ marginBottom: "1rem" }}
            labelColor="#000"
          />
          <InputField
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            label="Email"
            style={{ marginBottom: "1rem" }}
            labelColor="#000"
          />
          <InputField
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            label="Password"
            style={{ marginBottom: "1rem" }}
            labelColor="#000"
          />
          <InputField
            type="password"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleInputChange}
            label="Confirm Password"
            style={{ marginBottom: "1.5rem" }}
            labelColor={passwordMatch ? "#000" : "red"} // Change label color based on password match
          />
        </div>
        <div className="signup-Button">
          <Button
            type="submit"
            height="50px"
            width="100px"
            buttonColor={passwordMatch ? "green" : "red"} // Change button color based on password match
            textColor="white"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
