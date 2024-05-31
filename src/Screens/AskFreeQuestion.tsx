// src/Screens/AskFreeQuestion.tsx
import React, { useState, ChangeEvent, MouseEvent } from "react";
import Header from "./Header";
import Button from "../components/buttons/button";
import "../Css/AskFreeQuestion.css";

const cities = [
  "Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Hyderabad",
  "Gujranwala", "Peshawar", "Quetta", "Islamabad", "Sargodha", "Sialkot",
  "Bahawalpur", "Sukkur", "Jhang", "Sheikhupura", "Larkana", "Gujrat",
  "Mardan", "Kasur", "Rahim Yar Khan", "Sahiwal", "Okara", "Wah Cantonment",
  "Dera Ghazi Khan", "Mirpur Khas", "Nawabshah"
];

type FormData = {
  question: string;
  situation: string;
  city: string;
  hireAttorney: string;
};

type FormErrors = {
  question: string;
  situation: string;
  city: string;
  hireAttorney: string;
};

const AskFreeQuestion: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    question: "",
    situation: "",
    city: "",
    hireAttorney: "Not Sure",
  });

  const [showReview, setShowReview] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    question: "",
    situation: "",
    city: "",
    hireAttorney: "",
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePreview = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let hasError = false;
    let newErrors: FormErrors = { question: "", situation: "", city: "", hireAttorney: "" };

    if (!formData.question) {
      hasError = true;
      newErrors.question = "Question is required.";
    }
    if (!formData.situation) {
      hasError = true;
      newErrors.situation = "Situation details are required.";
    }
    if (!formData.city) {
      hasError = true;
      newErrors.city = "City is required.";
    }

    if (hasError) {
      setErrors(newErrors);
    } else {
      setShowReview(true);
    }
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowReview(false);
    setShowConfirmation(true);
  };

  const handleEdit = () => {
    setShowReview(false);
  };

  return (
    <div>
      <Header logoSrc="path/to/logo.png" logoAlt="Logo" />
      <div className="ask-free-question-container">
        {showReview ? (
          <div className="review-container">
            <h2>Review</h2>
            <p>Your question isn't final yet—you can make changes here. And, once you submit your question, you can still add notes and ask follow-up questions.</p>
            <div className="review-section">
              <strong>Question:</strong> <p>{formData.question}</p>
            </div>
            <div className="review-section">
              <strong>Details:</strong> <p>{formData.situation}</p>
            </div>
            <div className="review-section">
              <strong>Location:</strong> <p>{formData.city}</p>
            </div>
            <div className="review-section">
              <strong>Do you plan to hire an attorney?</strong> <p>{formData.hireAttorney}</p>
            </div>
            <div className="btn-container">
              <button type="button" onClick={handleEdit} className="edit-btn">
                Edit
              </button>
              <button type="button" onClick={handleSubmit} className="submit-btn">
                Submit
              </button>
            </div>
          </div>
        ) : (
          <form>
            <div className="form-group">
              <label htmlFor="question" className={errors.question ? 'error-label' : ''}>Ask your question</label>
              <textarea
                id="question"
                name="question"
                placeholder='Start your question with "how," "what," "why," "when," "can I...," "do I...," or "will I..."'
                rows={2}
                maxLength={128}
                value={formData.question}
                onChange={handleChange}
                className={errors.question ? 'error' : ''}
              ></textarea>
              {errors.question && <p className="error-message">{errors.question}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="situation" className={errors.situation ? 'error-label' : ''}>Explain your situation</label>
              <textarea
                id="situation"
                name="situation"
                placeholder="Provide key details. No need to get it perfect—you can always make clarifications or ask follow-up questions later."
                rows={4}
                maxLength={1200}
                value={formData.situation}
                onChange={handleChange}
                className={errors.situation ? 'error' : ''}
              ></textarea>
              {errors.situation && <p className="error-message">{errors.situation}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="city-state" className={errors.city ? 'error-label' : ''}>City and state</label>
              <select id="city-state" name="city" value={formData.city} onChange={handleChange} className={errors.city ? 'error' : ''}>
                <option value="">Select your city</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <p className="error-message">{errors.city}</p>}
            </div>
            <div className="form-group">
              <label className={errors.hireAttorney ? 'error-label' : ''}>Do you plan to hire an attorney?</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    id="yes"
                    name="hireAttorney"
                    value="Yes"
                    checked={formData.hireAttorney === "Yes"}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    id="not-sure"
                    name="hireAttorney"
                    value="Not Sure"
                    checked={formData.hireAttorney === "Not Sure"}
                    onChange={handleChange}
                  />
                  Not Sure
                </label>
                <label>
                  <input
                    type="radio"
                    id="no"
                    name="hireAttorney"
                    value="No"
                    checked={formData.hireAttorney === "No"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>
            <Button type="button" onClick={handlePreview} height="50px" width="150px" buttonColor="orange" textColor="white">
              Preview
            </Button>
          </form>
        )}

        {showConfirmation && (
          <div className="confirmation-popup">
            <h2>Your question has been submitted!</h2>
            <p>Thank you for submitting your question. An attorney will get back to you shortly.</p>
            <Button type="button" onClick={() => setShowConfirmation(false)} height="40px" width="100px" buttonColor="green" textColor="white">
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskFreeQuestion;
