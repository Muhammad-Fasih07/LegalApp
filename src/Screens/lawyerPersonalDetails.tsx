import React, { useState } from "react";
import "../Css/LawyersPersonalDetails.css";
import DropDownField from "../components/fields/DropDownField";
import InputField from "../components/fields/InputField";
import Modal from "react-modal";
import ImageUploadModal from "../components/ImageUploadModal";
import Button from "../components/buttons/button";

import Checkbox from "../components/buttons/checkBox";
import Footer from "./Footer";

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

  const [formState, setFormState] = useState({
    licenseNumber: "",
    name: "",
    address: "",
    city: "",
    zip: "",
    phoneNum: "",
  });

  // This function is used to handle the change in the input field
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };
  // This function is used to handle the change in the checkbox
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
      <h1 className="title">Enter your State Bar License Information</h1>
      <h3 style={{ color: "black", marginTop: 0, marginBottom: 35 }}>
        Once your license is confirmed, your profile will be listed in our
        directory and search results
      </h3>
      <div className="card">
        <InputField
          type="text"
          name="name"
          label="Name"
          labelColor="#000"
          width="100%"
          labelStyle={{ fontWeight: "bold" }}
          value={formState.name}
          onChange={handleInputChange}
          enteredValueColor="black"
        />

        <InputField
          type="text"
          name="address"
          label="Adress"
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
            labelText=" I have never been sanctioned by a state licensing authority.
            "
            labelStyle={{ fontWeight: "normal", fontSize: 16 }}
            checked={selectedOptions.includes("Option 1")}
            onChange={handleOptionChange}
          />
          <Checkbox
            id="option2"
            name="option"
            value="Option 2"
            labelText="I have been sanctioned by a state licensing authority.
            "
            labelStyle={{ fontWeight: "normal", fontSize: 16 }}
            checked={selectedOptions.includes("Option 2")}
            onChange={handleOptionChange}
          />
        </label>
      </div>
      <Footer />
    </div>
  );
}

export default LawyersPersonalDetails;
