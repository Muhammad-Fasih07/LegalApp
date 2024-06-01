import React, { useState } from "react";
import DropDownField from "../components/fields/DropDownField";
import Button from "../components/buttons/button";
import Rating from "react-rating";

interface IPracticeAreasData {
  [key: string]: string[];
}

const SearchLawyers = () => {
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
  ]; // replace with your actual city data

  const practiceAreasData: IPracticeAreasData = {
    Karachi: ["Criminal Law", "Family Law", "Corporate Law"],
    Lahore: ["Civil Litigation", "Real Estate Law", "Family Law"],
    Faisalabad: ["Bankruptcy Law", "Civil Rights Law", "Corporate Law"],
    Rawalpindi: ["Criminal Law", "Environmental Law", "Family Law"],
    Multan: ["Intellectual Property Law", "Real Estate Law", "Corporate Law"],
    Hyderabad: ["Tax Law", "Employment Law", "Family Law"],
    Gujranwala: ["Immigration Law", "Personal Injury Law", "Corporate Law"],
    Peshawar: ["Estate Planning Law", "Family Law", "Corporate Law"],
    Quetta: ["Military Law", "Real Estate Law", "Family Law"],
    Islamabad: ["Health Law", "Immigration Law", "Corporate Law"],
    // Add more cities and their corresponding practice areas
  };

  const [selectedCity, setSelectedCity] = useState("");
  const practiceAreas = practiceAreasData[selectedCity] || [];

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };
  const MyRating = Rating as any;

  return (
    <div className="searchTopRatedLawyers-Section">
      <h1 className="searchLawyer-title">Search for top-rated lawyers</h1>
      <div
        style={{
          display: "flex",
          gap: "20px", // Add some space between the dropdowns and the button
        }}
      >
        <DropDownField options={cities} onChange={handleCityChange} />
        <DropDownField options={practiceAreas} />
        <Button
          type="submit"
          height="50px"
          width="80px"
          buttonColor="green"
          textColor="white"
        >
          Search
        </Button>
      </div>
      <div className="lawyerDetailCardContainer">
        <div className="lawyerDetailCard">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <img
              src="https://via.placeholder.com/150"
              alt="Lawyer Profile Picture"
            />
            <div style={{}}>
              <h3 style={{ marginTop: 5, marginBottom: 0, marginLeft: 15 }}>
                Ahmed Shah
              </h3>
              <MyRating
                emptySymbol={
                  <span style={{ color: "gray", fontSize: "1.5em" }}>☆</span>
                }
                fullSymbol={
                  <span style={{ color: "gold", fontSize: "1.5em" }}>★</span>
                }
                initialRating={4}
                readonly
              />{" "}
              <p>9 reviews</p>
              <p>Location</p>
              <p>White Bear lk. Mn</p>
            </div>
          </div>

          <p>Practice Area</p>
          <p>Gujrat, Islamabad</p>

          <p>9 Consumate Professional</p>
          <Button
            type="button"
            height="40px"
            width="100px"
            buttonColor="#1d73b4"
            textColor="white"
          >
            View Profile
          </Button>
        </div>
        <div className="lawyerDetailCard"></div>
        <div className="lawyerDetailCard"></div>
      </div>
    </div>
  );
};

export default SearchLawyers;
