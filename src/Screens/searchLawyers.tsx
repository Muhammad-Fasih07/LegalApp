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
          gap: "20px",
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
              height={125}
              width={125}
            />
            <div style={{}}>
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: 0,
                  marginLeft: 10,
                  color: "#ffa500",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                Ahmed Shah
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 0,
                  marginBottom: 0,
                  marginLeft: 5,
                }}
              >
                <MyRating
                  emptySymbol={
                    <span style={{ color: "gray", fontSize: "1.5em" }}>☆</span>
                  }
                  fullSymbol={
                    <span style={{ color: "gold", fontSize: "1.5em" }}>★</span>
                  }
                  initialRating={4}
                  readonly
                />
                <p style={{ fontSize: 12, marginLeft: 2 }}>(9) reviews</p>
              </div>

              <div
                style={{
                  fontSize: 16,
                  textAlign: "left",

                  marginLeft: 10,
                }}
              >
                <text>Location</text>
              </div>
              <div
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  marginTop: 2,
                  marginLeft: 10,
                }}
              >
                <text>Khanna Pul, Tarlai</text>
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: 14,
              fontWeight: "bold",
              textAlign: "left",
              marginTop: 15,
            }}
          >
            <text>Practice Areas</text>
          </div>
          <div
            style={{
              fontSize: 14,
              textAlign: "left",
              marginTop: 2,
              marginBottom: 20,
            }}
          >
            <text>Consumate, Family, Health, Probation</text>
          </div>
          <hr style={{ marginBottom: 10 }} />
          <div
            style={{
              textAlign: "left",
              marginTop: 2,
            }}
          >
            <text
              style={{ fontWeight: "bold", fontSize: 14, textAlign: "left" }}
            >
              Excellent Lawyer
            </text>
            <p
              style={{
                fontSize: 14,
                fontWeight: "normal",
                textAlign: "left",
                marginTop: 4,
              }}
            >
              This lawyer has received a 4.5-star rating based on 9 reviews.
              Clients have praised their professionalism, responsiveness, and
              expertise.
            </p>
          </div>

          <Button
            type="button"
            height="35px"
            width="300px"
            buttonColor="#1d73b4"
            textColor="white"
          >
            See more Consumate Lawyers
          </Button>
        </div>
        <div className="lawyerDetailCard"></div>
        <div className="lawyerDetailCard"></div>
      </div>
    </div>
  );
};

export default SearchLawyers;
