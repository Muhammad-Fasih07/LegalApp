import { useState } from "react";
import DropDownField from "../components/fields/DropDownField";
import Button from "../components/buttons/button";
import Rating from "react-rating";

import lawyer from "../images/lawyer.jpg";
import LawyerDetailCard from "../components/lawyerDetailCard";
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
  ];

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <LawyerDetailCard
          label="Consumate Lawyer"
          imageSrc={lawyer}
          name="Ahmed Shah"
          rating={4}
          reviews={9}
          location="Khanna Pul, Tarlai"
          practiceAreas="Consumate, Family, Health, Probation"
          descriptionTitle="Excellent Lawyer"
          descriptionText="This lawyer has received a 4.5-star rating based on 9 reviews. Clients have praised their professionalism, responsiveness, and expertise."
          buttonText="See more Consumate Lawyers"
        />
        <LawyerDetailCard
          label="Divorce Lawyer"
          imageSrc={lawyer}
          name="Ahmed Shah"
          rating={4}
          reviews={12}
          location="Deena, Rawat"
          practiceAreas="Consumate, Family, Health, Probation"
          descriptionTitle="Excellent Lawyer"
          descriptionText="This lawyer has received a 4.5-star rating based on 9 reviews. Clients have praised their professionalism, responsiveness, and expertise."
          buttonText="See more Consumate Lawyers"
        />
        <LawyerDetailCard
          label="Business Lawyer"
          imageSrc={lawyer}
          name="Ahmed Shah"
          rating={4}
          reviews={89}
          location="Dhoke Kala khan"
          practiceAreas="Consumate, Family, Health, Probation"
          descriptionTitle="Excellent Lawyer"
          descriptionText="This lawyer has received a 4.5-star rating based on 9 reviews. Clients have praised their professionalism, responsiveness, and expertise."
          buttonText="See more Consumate Lawyers"
        />
      </div>
    </div>
  );
};

export default SearchLawyers;
