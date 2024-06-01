import React from "react";
import SearchImage from "./SearchImage"; // Import the SearchImage component
import Footer from "../Screens/Footer"; // Import the Footer component

const HomePage: React.FC = () => {
  return (
    <div>
      <SearchImage /> {/* Include the SearchImage component */}
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default HomePage;
