import React, { useState } from "react";
import InputField from "../components/InputField";
import "./signUpLawyer.css";

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
        placeholder=""
        label="Name"
      />
      <InputField
        type="email"
        name="email"
        value={formState.email}
        onChange={handleInputChange}
        placeholder=""
        label="Email"
      />
      <InputField
        type="password"
        name="password"
        value={formState.password}
        onChange={handleInputChange}
        placeholder=""
        label="Password"
      />
      <InputField
        type="password"
        name="confirmPassword"
        value={formState.confirmPassword}
        onChange={handleInputChange}
        placeholder=""
        label="Confirm Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
