import React from "react";
import DropDownField from "../components/fields/DropDownField";
import Button from "../components/buttons/button";

const SearchLawyers = () => {
  const practiceAreas = ["Area 1", "Area 2", "Area 3"];
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
    <div>
      <h1 className="searchLawyer-title">Search for top-rated lawyers</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <DropDownField
          options={cities}
          style={{ width: "100%", height: "2.5rem", color: "black" }}
          onChange={(value) => console.log(value)}
        />
        <DropDownField
          options={practiceAreas}
          style={{ width: "100%", height: "2.5rem", color: "black" }}
          onChange={(value) => console.log(value)}
        />
        <Button
          type="submit"
          height="40px"
          width="80px"
          buttonColor="green"
          textColor="white"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchLawyers;
