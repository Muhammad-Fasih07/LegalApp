import React, { useState } from "react";
import "../Css/LawyersPersonalDetails.css";
import DropDownField from "../components/fields/DropDownField";
import InputField from "../components/InputField";
import Modal from "react-modal";
import ImageUploadModal from "../components/ImageUploadModal";
import Button from "../components/buttons/button";

import Checkbox from "../components/buttons/checkBox";

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

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedOptions((prev) => [...prev, event.target.value]);
    } else {
      setSelectedOptions((prev) =>
        prev.filter((value) => value !== event.target.value)
      );
    }
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  console.log("License Number: ", formState.licenseNumber);
  return (
    <div className="lawyers-details">
      <h1 className="title">Enter your state bar license information</h1>
      <div className="card">
        <div style={{ width: "100%", textAlign: "left" }}>
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
              width: "100%",
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
            marginBottom: 5,
            marginTop: 20,
            color: "black",
            fontWeight: "bold",
          }}
        >
          Verify disciplinary history
          <Checkbox
            id="option1"
            name="option"
            value="Option 1"
            labelText=" I have never been sanctioned by a state licensing authority.
            
            "
            labelStyle={{ fontWeight: "normal" }}
            checked={selectedOptions.includes("Option 1")}
            onChange={handleOptionChange}
          />
          <Checkbox
            id="option2"
            name="option"
            value="Option 2"
            labelText="I have been sanctioned by a state licensing authority.
            "
            labelStyle={{ fontWeight: "normal" }}
            checked={selectedOptions.includes("Option 2")}
            onChange={handleOptionChange}
          />
        </label>
      </div>
    </div>
  );
}

export default LawyersPersonalDetails;
