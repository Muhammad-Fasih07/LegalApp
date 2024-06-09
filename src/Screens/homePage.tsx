import React from "react";
import SearchImage from "./SearchImage"; // Import the SearchImage component
import Footer from "../Screens/Footer"; // Import the Footer component
import SearchLawyers from "./searchLawyers";

const HomePage: React.FC = () => {
  return (
    <div>
      <SearchImage /> {/* Include the SearchImage component */}
      <SearchLawyers />


      <Footer /> {/* Include the Footer component */}
      
    </div>
  );
};

export default HomePage;
