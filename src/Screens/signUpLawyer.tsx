import React, { useState } from "react";
import InputField from "../components/InputField";
import "./signUpLawyer.css";
import Button from "../components/buttons/button";

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
    // TODO: Implement signup logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="name"
        value={formState.name}
        onChange={handleInputChange}
        label="Name"
        style={{ marginBottom: "1rem" }}
      />
      <InputField
        type="email"
        name="email"
        value={formState.email}
        onChange={handleInputChange}
        label="Email"
        style={{ marginBottom: "1rem" }}
      />
      <InputField
        type="password"
        name="password"
        value={formState.password}
        onChange={handleInputChange}
        label="Password"
        style={{ marginBottom: "1rem" }}
      />
      <InputField
        type="password"
        name="confirmPassword"
        value={formState.confirmPassword}
        onChange={handleInputChange}
        label="Confirm Password"
        style={{ marginBottom: "1.5rem" }}
      />
      <Button
        type="submit"
        height="50px"
        width="100px"
        buttonColor="green"
        textColor="white"
      >
        Sign Up
      </Button>{" "}
    </form>
  );
}

export default Signup;
