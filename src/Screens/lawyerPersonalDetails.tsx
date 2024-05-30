import React, { useState } from "react";
import "../Css/LawyersPersonalDetails.css";
import DropDownField from "../components/fields/DropDownField";
import InputField from "../components/InputField";
import Modal from "react-modal";
import ImageUploadModal from "../components/ImageUploadModal";
import Button from "../components/buttons/button";

Modal.setAppElement("#root");

function LawyersPersonalDetails() {
  const cities = [
    "Karachi",
    "Lahore",
    "Faisalabad",
    "Rawalpindi",
    "Multan",
    "Hyderabad",
    "Gujranwala",
    "Peshawar",
    "Quetta",
    "Islamabad",
    "Sargodha",
    "Sialkot",
    "Bahawalpur",
    "Sukkur",
    "Jhang",
    "Sheikhupura",
    "Larkana",
    "Gujrat",
    "Mardan",
    "Kasur",
    "Rahim Yar Khan",
    "Sahiwal",
    "Okara",
    "Wah Cantonment",
    "Dera Ghazi Khan",
    "Mirpur Khas",
    "Nawabshah",
  ];

  const yearsAdmitted = Array.from({ length: 50 }, (_, i) => i + 1);

  const [formState, setFormState] = useState({ licenseNumber: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  console.log("License Number: ", formState.licenseNumber);
  return (
    <div className="lawyers-details">
      <h1 className="title">Enter your state bar license information</h1>
      <div className="card">
        <div style={{ width: "100%", textAlign: "left" }}>
          {" "}
          <label
            style={{
              display: "block",
              textAlign: "left",
              marginTop: 10,
              color: "black",
              fontWeight: "bold",
            }}
          >
            License ID Number
          </label>
          <InputField
            type="number"
            name="licenseNumber"
            value={formState.licenseNumber}
            onChange={handleInputChange}
            style={{
              width: "86%",
            }}
            enteredValueColor="black"
          />
        </div>
        <div style={{ width: "100%", textAlign: "left" }}>
          {" "}
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
            onChange={(value) => console.log(value)}
          />
        </div>
        <div style={{ width: "100%", textAlign: "left", marginTop: 15 }}>
          {" "}
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
            onChange={(value) => console.log(value)}
          />
        </div>
        <Button
          type="submit"
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
          onImageUpload={setSelectedImage}
        />
      </div>
    </div>
  );
}

export default LawyersPersonalDetails;
