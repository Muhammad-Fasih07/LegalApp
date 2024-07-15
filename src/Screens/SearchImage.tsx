import React from "react";
import "../Css/SearchImage.css";
import lawyerSearchImage from "../images/lawyer.svg"; // Import the image
import Button from "../components/buttons/button";

const SearchImage: React.FC = () => {
  return (
    <div>
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
      <div className="box-container">
        <div className="info-box">
          <div className="icon">🎯</div>
          <div className="title">High Ethical Standards</div>
          <div className="description">
            Our firm in Pakistan is committed to maintaining the highest ethical standards, ensuring trust and transparency in every case we handle.
          </div>
        </div>
        <div className="info-box">
          <div className="icon">⚖️</div>
          <div className="title">Highly Recommended</div>
          <div className="description">
            Renowned for our expertise, we come highly recommended by clients across Pakistan for our dedication to achieving the best outcomes.
          </div>
        </div>
        <div className="info-box">
          <div className="icon">🎯</div>
          <div className="title">Specialized Lawyers</div>
          <div className="description">
            Our specialized lawyers offer top-notch legal services in commercial law, providing expert advice and representation.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchImage;
