import React from "react";
import SearchImage from "./SearchImage";
import Footer from "../Screens/Footer";
import SearchLawyers from "./searchLawyers";

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

      <Footer />
    </div>
  );
};

export default HomePage;
