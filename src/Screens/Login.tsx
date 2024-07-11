import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserLock } from "react-icons/fa";
import Lottie from "lottie-react";
import InputField from "../components/InputField";
import Button from "../components/buttons/button";
import "../Css/Login.css";
import ENV from "../env";
import successAnimation from "../animations/successAnimation.json";

interface LoginFormState {
  email: string;
  password: string;
}

const initialFormState: LoginFormState = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const [formState, setFormState] = useState<LoginFormState>(initialFormState);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${ENV.API_BASE_URL}/api/lawyers/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }

      const data = await response.json();
      const { token, lawyer } = data;

      // Store token and lawyerId in localStorage or state for further use (e.g., authentication)
      localStorage.setItem("token", token);
      localStorage.setItem("lawyerId", lawyer._id);

      // Show success animation and message
      setShowAnimation(true);

      // Redirect to dashboard after animation
      setTimeout(() => {
        navigate("/dashboard", { state: { lawyer } });
      }, 1500); // Adjusted the timeout duration to 1.5 seconds
    } catch (error: unknown) {
      console.error("Login error:", error as Error);
      alert((error as Error).message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {showAnimation ? (
        <div className="animation-container">
          <Lottie
            animationData={successAnimation}
            loop={false}
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-header">
            <FaUserLock size={50} color="#4CAF50" />
            <h2 className="login-heading">Login</h2>
          </div>
          <InputField
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            label="Email"
          />
          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            value={formState.password}
            onChange={handleInputChange}
            label="Password"
          />
          <div className="password-toggle">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="show-password">Show Password</label>
          </div>
          <Button
            type="submit"
            height="50px"
            width="100%"
            buttonColor="#4CAF50"
            textColor="white"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default Login;
