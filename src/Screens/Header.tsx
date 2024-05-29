import React, { useState } from "react";
import "../Css/Header.css"; // Import the CSS file for styling
import { FaSearch } from "react-icons/fa"; // Import the search icon
import { motion, AnimatePresence } from "framer-motion";
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
              <AnimatePresence>
                {dropdown === "location" && (
                  <motion.div
                    className="dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="dropdown-grid">
                      {["Islamabad", "Rawalpindi", "Lahore", "Karachi", "Peshawar", "Sargodha", "Quetta", "Gujranwala", "Multan", "Bahawalpur", "Sukkur"].map((city) => (
                        <a href="#" key={city}>{city}</a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div
              className="nav-item"
              onMouseEnter={() => handleMouseEnter("practice")}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#">Lawyers by Practice Area</a>
              <AnimatePresence>
                {dropdown === "practice" && (
                  <motion.div
                    className="dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="dropdown-grid">
                      {["Criminal", "Civil", "Corporate", "Family", "Constitutional", "Tax", "Intellectual Property", "Labor", "Environmental", "Banking", "Real Estate", "Immigration"]
                        .map((area) => (
                          <a href="#" key={area}>{area}</a>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div
              className="nav-item"
              onMouseEnter={() => handleMouseEnter("qna")}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#">Legal Topics and Q&A</a>
              <AnimatePresence>
                {dropdown === "qna" && (
                  <motion.div
                    className="dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="dropdown-grid">
                      {["Constitutional Rights", "Consumer Protection", "Property Rights", "Contract Law", "Human Rights", "Employment Law", "Family Law", "Environmental Law", "Cyber Law", "Taxation", "Corporate Governance", "Criminal Justice"]
.map((topic) => (
                        <a href="#" key={topic}>{topic}</a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
            type="text"
            placeholder="Search Q&A, lawyers and more"
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
      )}
    </>
  );
};

export default Header;
