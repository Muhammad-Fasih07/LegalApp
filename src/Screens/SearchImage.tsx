import React from "react";
import "../Css/SearchImage.css";
import lawyerSearchImage from "../images/lawyersearch.svg"; // Import the image
import Button from "../components/buttons/button";

const SearchImage: React.FC = () => {
  return (
    <div className="image-container">
      <img src={lawyerSearchImage} alt="Background" className="background-image" />
      <div className="overlay">
       
        <div className="search-bar-on-image">
          <input
            type="text"
            placeholder="Practice area or lawyer name"
            className="search-input"
          />
          <input
            type="text"
            placeholder="City, state, or ZIP code"
            className="search-input"
          />
          <Button
            type="submit"
            height="40px"
            width="80px"
            buttonColor="orange"
            textColor="white"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchImage;
