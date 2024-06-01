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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
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
            label="Name"
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
            labelColor="#000"
          />
        </div>

        <Button
          type="submit"
          height="50px"
          width="100px"
          buttonColor="green"
          textColor="white"
          onClick={() => navigate("/lawyersPersonalDetails")}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Signup;
