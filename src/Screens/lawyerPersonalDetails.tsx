import React from "react";
import "../Css/LawyersPersonalDetails.css";
import DropDownField from "../components/fields/DropDownField";

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
  return (
    <div className="lawyers-details">
      <h1 className="title">Enter your state bar license information</h1>
      <div className="card">
        <div style={{ padding: "0 1rem" }}>
          {" "}
          {/* Add a container with padding */}
          <label
            style={{ display: "block", textAlign: "left", marginBottom: 5 }}
          >
            Licensed in* (cities)
          </label>
          <DropDownField
            options={cities}
            style={{ width: "100%", height: "2.5rem" }}
            onChange={(value) => console.log(value)}
          />
        </div>
      </div>
    </div>
  );
}

export default LawyersPersonalDetails;
