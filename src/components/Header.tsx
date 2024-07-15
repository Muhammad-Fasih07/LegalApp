import React, { useState } from "react";
import "../Css/Header.css";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/buttons/button";
import { useNavigate } from "react-router-dom";
// import SearchImage from "../Screens/SearchImage"; // Import the new component

interface HeaderProps {
  logoSrc: string;
  logoAlt: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, logoAlt }) => {
  const [dropdown, setDropdown] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = (menu: string) => {
    setDropdown(menu);
  };

  const handleMouseLeave = () => {
    setDropdown("");
  };

  const toggleSearchBar = () => {
    setShowSearch(!showSearch);
  };

  const handleAskFreeQuestionClick = () => {
    navigate("/askFreeQuestion");
  };

  const handleSignUpClick = () => {
    navigate("/signUp");
  };
  const handleLoginClick = () => {
    navigate("/Login");
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
                      {[
                        "Islamabad",
                        "Lahore",
                        "Karachi",
                        "Multan",
                        "Faisalabad",
                        "Hyderabad",
                        "Peshawar",
                        "Quetta",
                        "Gujranwala",
                        "Dera Ismail Khan",
                        "Bahawalpur",
                        "Abbottabad",
                      ].map((city) => (
                        <a href="#" key={city}>
                          {city}
                        </a>
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
                      {[
                          "Divorce Lawyers",
                          "Accident Lawyer",
                          "Tax Lawyer",
                          "Criminal Lawyer",
                          "Family Lawyer",
                          "Immigration Lawyer",
                          "Property Lawyer",
                          "Civil Lawyer",
                          "Marriage Lawyer",
                          "Medical Lawyer",
                          "Inheritance Lawyer",
                          "Nab & Anti Corruption Lawyer",
                          "Child Custody Lawyer",
                      ].map((area) => (
                        <a href="#" key={area}>
                          {area}
                        </a>
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
                    className="dropdown dropdown-with-button"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="dropdown-grid">
                      {[
                        "Divorce Procedure in Pakistan",
                        "Property Transfer in Pakistan",
                        "Cheque bounce legal advice in Pakistan",
                        "Child Custody Legal Advice in Pakistan",
                        "Constitution of Pakistan",
                        "Law Videos",
                        "Labour & Service Guide",
                      ].map((topic) => (
                        <a href="#" key={topic}>
                          {topic}
                        </a>
                      ))}
                    </div>
                    <div className="ask-question-container">
                      <h4>Ask a Free Question</h4>
                      <p>
                        Post your question and get advice from multiple lawyers.
                      </p>
                      <Button
                        type="button"
                        height="50px"
                        width="150px"
                        buttonColor="orange"
                        textColor="white"
                        onClick={handleAskFreeQuestionClick}
                      >
                        Ask a Free Question
                      </Button>
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
          <div className="button-container" style={{ marginRight: '10px' }}>
            <Button
              type="button"
              height="50px"
              width="90px"
              buttonColor="green"
              textColor="white"
            onClick={handleLoginClick}
            >
              Login
            </Button>
          </div>
          <div className="button-container">
            <Button
              type="button"
              height="50px"
              width="90px"
              buttonColor="green"
              textColor="white"
              onClick={handleSignUpClick}
            >
              Sign Up
            </Button>
          </div>

        </div>
      </header>
      {showSearch && (
        <div className="search-bar">
          <input type="text" placeholder="Search Q&A, lawyers and more" />
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
      {/* <SearchImage /> Add the SearchImage component below the header */}
    </>
  );
};

export default Header;
