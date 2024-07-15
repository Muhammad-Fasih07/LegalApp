import React from "react";
import SearchImage from "./SearchImage";
import Footer from "../Screens/Footer";
import SearchLawyers from "./searchLawyers";
import Searchfooter from "./Searchfooter";
import Blog from "./Blog";
import Statistics from "./Statistics";
const HomePage: React.FC = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <SearchImage />
      <div
        style={{
          width: "90%",
          margin: "2% auto",
        }}
      >
        <SearchLawyers />
      </div>
      <Blog />
      <Statistics />
      <Searchfooter />


      <Footer />
    </div>
  );
};

export default HomePage;
