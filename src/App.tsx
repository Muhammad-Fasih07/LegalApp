import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Signup from "./Screens/signUpLawyer";
import LawyersPersonalDetails from "../src/Screens/lawyerPersonalDetails";
import Header from "../src/components/Header";
import AskFreeQuestion from "./Screens/AskFreeQuestion";
import logoImage from "./images/Gif.gif"; // replace with your image path
import SearchLawyers from "./Screens/searchLawyers";
import HomePage from "./Screens/homePage"; // Import the HomePage component
import ViewLawyersScreen from "./Screens/viewLawyersScreen";

function App() {
  return (
    <Router>
      <Header logoSrc={logoImage} logoAlt="Logo" />
      <Routes>
        <Route path="/" element={<ViewLawyersScreen />} />{" "}
        {/* Add the HomePage route */}
        <Route path="/searchLawyers" element={<SearchLawyers />} />
        <Route path="/signUp" element={<Signup />} />
        <Route
          path="/askFreeQuestion"
          element={<AskFreeQuestion logoSrc={logoImage} logoAlt="Logo" />}
        />
        <Route
          path="/lawyersPersonalDetails"
          element={<LawyersPersonalDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
