import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import "../Css/LawyersPersonalDetails.css";
import DropDownField from "../components/fields/DropDownField";
import InputField from "../components/fields/InputField";
import Modal from "react-modal";
import ImageUploadModal from "../components/ImageUploadModal";
import Button from "../components/buttons/button";
import Checkbox from "../components/buttons/checkBox";
import Footer from "./Footer";
import axios from "axios";
import ENV from '../env'; // Correct path
import signUpSuccessAnimation from "../animations/signUpSuccessAnimation.json"; // Ensure correct path

Modal.setAppElement("#root");

function LawyersPersonalDetails() {
  const { state } = useLocation();
  const { name, email, password } = state;
  const navigate = useNavigate();

  const cities = [
    "Islamabad", "Lahore", "Karachi", "Multan", "Faisalabad", "Hyderabad", 
    "Peshawar", "Quetta", "Gujranwala", "Dera Ismail Khan", "Bahawalpur", "Abbottabad",
  ];

  const practiceAreas = [
    "Divorce Lawyers", "Accident Lawyer", "Tax Lawyer", "Criminal Lawyer", "Family Lawyer", 
    "Immigration Lawyer", "Property Lawyer", "Civil Lawyer", "Marriage Lawyer", "Medical Lawyer", 
    "Inheritance Lawyer", "Nab & Anti Corruption Lawyer", "Child Custody Lawyer",
  ];

  const yearsAdmitted = Array.from({ length: 50 }, (_, i) => i + 1);

  const [formState, setFormState] = useState({
    licenseNumber: "", address: "", city: "", zip: "", phoneNum: "", 
    practiceArea: "", yearsAdmitted: "",
  });

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedOptions((prev) => [...prev, event.target.value]);
    } else {
      setSelectedOptions((prev) => prev.filter((value) => value !== event.target.value));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const fullFormData = {
      ...formState, name, email, password, disciplinaryHistory: selectedOptions, 
      licenseImage: selectedImage ? selectedImage.name : "",
    };

    try {
      const response = await axios.post(`${ENV.API_BASE_URL}/api/lawyers/signup`, fullFormData);
      toast.success("Sign Up Successful!", {
        position: "top-center",
        autoClose: 3000, // Auto close after 3 seconds
      });
      console.log("Response:", response.data);

      setShowAnimation(true);

      setTimeout(() => {
        navigate('/Login'); // Navigate to login after toast message
      }, 3000); // Wait for the toast message to close

    } catch (error) {
      console.error("Error signing up:", (error as any).response ? (error as any).response.data : (error as any).message);
      toast.error("Error signing up, please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="lawyers-details">
      {showAnimation ? (
        <div className="animation-container">
          <Lottie
            animationData={signUpSuccessAnimation}
            loop={false}
            style={{ height: '400px', width: '400px' }} // Adjusted size
          />
        </div>
      ) : (
        <>
          <ToastContainer />
          <h1 className="title">Enter your State Bar License Information</h1>
          <h3 style={{ color: "black", marginTop: 0, marginBottom: 35 }}>
            Once your license is confirmed, your profile will be listed in our directory and search results
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="card">
              <InputField
                type="text"
                name="name"
                label="Name"
                labelColor="#000"
                width="100%"
                labelStyle={{ fontWeight: "bold" }}
                value={name}
                enteredValueColor="black"
                readOnly // Use the readOnly prop
                onChange={() => { }} // Dummy onChange handler
              />
              <InputField
                type="text"
                name="address"
                label="Address"
                labelColor="#000"
                labelStyle={{ fontWeight: "bold" }}
                value={formState.address}
                onChange={handleInputChange}
                enteredValueColor="black"
              />
              <InputField
                type="text"
                name="city"
                label="City"
                labelColor="#000"
                labelStyle={{ fontWeight: "bold" }}
                value={formState.city}
                onChange={handleInputChange}
                enteredValueColor="black"
              />
              <InputField
                type="text"
                name="zip"
                label="Zip"
                labelColor="#000"
                labelStyle={{ fontWeight: "bold" }}
                value={formState.zip}
                onChange={handleInputChange}
                enteredValueColor="black"
              />
              <InputField
                type="tel"
                name="phoneNum"
                label="Phone Number"
                labelColor="#000"
                labelStyle={{ fontWeight: "bold" }}
                value={formState.phoneNum}
                onChange={handleInputChange}
                enteredValueColor="black"
              />
              <InputField
                type="number"
                name="licenseNumber"
                label=" License ID Number"
                labelColor="#000"
                labelStyle={{ fontWeight: "bold" }}
                value={formState.licenseNumber}
                onChange={handleInputChange}
                enteredValueColor="black"
              />
              <div style={{ width: "100%", textAlign: "left" }}>
                <label
                  style={{
                    display: "block",
                    textAlign: "left",
                    marginBottom: 5,
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Practice Area
                </label>
                <DropDownField
                  options={practiceAreas}
                  style={{ width: "100%", height: "2.5rem", color: "black" }}
                  value={formState.practiceArea}
                  onChange={(value) => setFormState({ ...formState, practiceArea: value })}
                />
              </div>
              <div style={{ width: "100%", textAlign: "left" }}>
                <label
                  style={{
                    display: "block",
                    textAlign: "left",
                    marginBottom: 5,
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Licensed in City*
                </label>
                <DropDownField
                  options={cities}
                  style={{ width: "100%", height: "2.5rem", color: "black" }}
                  value={formState.city}
                  onChange={(value) => setFormState({ ...formState, city: value })}
                />
              </div>
              <div style={{ width: "100%", textAlign: "left", marginTop: 15 }}>
                <label
                  style={{
                    display: "block",
                    textAlign: "left",
                    marginBottom: 5,
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Years Admitted
                </label>
                <DropDownField
                  options={yearsAdmitted}
                  style={{ width: "100%", height: "2.5rem", color: "black" }}
                  value={formState.yearsAdmitted}
                  onChange={(value) => setFormState({ ...formState, yearsAdmitted: value })}
                />
              </div>
              <Button
                type="button"
                height="50px"
                width="auto"
                buttonColor="black"
                textColor="white"
                onClick={() => setModalIsOpen(true)}
                style={{ marginTop: 20 }}
              >
                Upload Image {"\n"} of License Card
              </Button>
              <ImageUploadModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onImageUpload={(image) => {
                  setSelectedImage(image);
                }}
              />
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid lightgray",
                  margin: "20px 0",
                }}
              />
              <label
                style={{
                  display: "block",
                  textAlign: "left",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 22,
                }}
              >
                Verify disciplinary history
                <Checkbox
                  id="option1"
                  name="option"
                  value="Option 1"
                  labelText=" I have never been sanctioned by a state licensing authority."
                  labelStyle={{ fontWeight: "normal", fontSize: 16 }}
                  checked={selectedOptions.includes("Option 1")}
                  onChange={handleOptionChange}
                />
                <Checkbox
                  id="option2"
                  name="option"
                  value="Option 2"
                  labelText="I have been sanctioned by a state licensing authority."
                  labelStyle={{ fontWeight: "normal", fontSize: 16 }}
                  checked={selectedOptions.includes("Option 2")}
                  onChange={handleOptionChange}
                />
              </label>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <Button
                  type="submit"
                  height="50px"
                  width="90px"
                  buttonColor="green"
                  textColor="white"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
          <Footer />
        </>
      )}
    </div>
  );
}

export default LawyersPersonalDetails;
