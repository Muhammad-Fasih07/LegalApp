import React from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Search.css";

const cities = [
  "Lawyers in Islamabad",
  "Lawyers in Lahore",
  "Lawyers in Karachi",
  "Lawyers in Multan",
  "Lawyers in Faisalabad",
  "Lawyers in Hyderabad",
  "Lawyers in Peshawar",
  "Lawyers in Quetta",
  "Lawyers in Gujranwala",
  "Lawyers in Dera Ismail Khan",
  "Lawyers in Bahawalpur",
  "Lawyers in Abbottabad"
];

const practiceAreas = [
  "Divorce Lawyers",
  "Accident Lawyers",
  "Tax Lawyers",
  "Criminal Lawyers",
  "Family Lawyers",
  "Immigration Lawyers",
  "Property Lawyers",
  "Civil Lawyers",
  "Marriage Lawyers",
  "Medical Lawyers",
  "Inheritance Lawyers",
  "Nab & Anti Corruption Lawyers",
  "Child Custody Lawyers"
];

const SearchLawyers: React.FC = () => {
  const navigate = useNavigate();

  const handleCityClick = (city: string) => {
    navigate(`/search?city=${city}`);
  };

  const handlePracticeClick = (practiceArea: string) => {
    navigate(`/search?practiceArea=${practiceArea}`);
  };

  return (
    <div className="search-lawyers">
      <div className="heading-container">
        <h2>Search for Lawyers by Practice Area and Cities</h2>
      </div>
      <div className="list-container">
        <div className="list-column">
          {cities.map((city) => (
            <div className="list-item" key={city}>
              <a href="#" onClick={() => handleCityClick(city)}>{city}</a>
            </div>
          ))}
        </div>
        <div className="list-column">
          {practiceAreas.map((area) => (
            <div className="list-item" key={area}>
              <a href="#" onClick={() => handlePracticeClick(area)}>{area}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchLawyers;
