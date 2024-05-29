import React, { useState } from "react";
import "../Css/Header.css"; // Import the CSS file for styling
import { FaSearch } from "react-icons/fa"; // Import the search icon
import Button from "../components/buttons/button";

interface HeaderProps {
  logoSrc: string;
  logoAlt: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, logoAlt }) => {
  const [dropdown, setDropdown] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleMouseEnter = (menu: string) => {
    setDropdown(menu);
  };

  const handleMouseLeave = () => {
    setDropdown("");
  };

  const toggleSearchBar = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <a href="#" className="logo">
            <img src={logoSrc} alt={logoAlt} />
          </a>
          <nav className="nav">
            <div
              className="nav-item"
              onMouseEnter={() => handleMouseEnter("location")}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#">Lawyers by Location</a>
              {dropdown === "location" && (
                <div className="dropdown">
                  <a href="#">Location 1</a>
                  <a href="#">Location 2</a>
                  <a href="#">Location 3</a>
                </div>
              )}
            </div>
            <div
              className="nav-item"
              onMouseEnter={() => handleMouseEnter("practice")}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#">Lawyers by Practice Area</a>
              {dropdown === "practice" && (
                <div className="dropdown">
                  <a href="#">Practice Area 1</a>
                  <a href="#">Practice Area 2</a>
                  <a href="#">Practice Area 3</a>
                </div>
              )}
            </div>
            <div
              className="nav-item"
              onMouseEnter={() => handleMouseEnter("qna")}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#">Legal Topics and Q&A</a>
              {dropdown === "qna" && (
                <div className="dropdown">
                  <a href="#">Topic 1</a>
                  <a href="#">Topic 2</a>
                  <a href="#">Topic 3</a>
                </div>
              )}
            </div>
          </nav>
        </div>
        <div className="header-right">
          <FaSearch
            className="search-icon"
            onClick={toggleSearchBar}
            style={{ width: "auto" }}
          />
          <a href="#" className="grow-practice">
            Grow your practice
          </a>
          <Button
            type="submit"
            height="50px"
            width="100px"
            buttonColor="green"
            textColor="white"
          >
            Sign Up
          </Button>
        </div>
      </header>
      {showSearch && (
        <div className="search-bar">
          <input
            // style={{ width: "80%" }}
            type="text"
            placeholder="Search Q&A, lawyers and more"
          />
        </div>
      )}
    </>
  );
};

export default Header;
