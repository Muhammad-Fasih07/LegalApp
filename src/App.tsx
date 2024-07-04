import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Signup from "./Screens/signUpLawyer";
import LawyersPersonalDetails from "../src/Screens/lawyerPersonalDetails";
import Header from "../src/components/Header";
import AskFreeQuestion from "./Screens/AskFreeQuestion";
import logoImage from "./images/Gif.gif"; // replace with your image path
import SearchLawyers from "./Screens/searchLawyers";
import HomePage from "./Screens/homePage"; // Import the HomePage component
// import ViewLawyersScreen from "./Screens/viewLawyersScreen";
import Login from "../src/Screens/Login";
import Dashboard from "../src/Screens/Dashboard";
import ViewLawyersScreen from "./Screens/viewLawyersScreen";

function App() {
  return (
    <Router>
      <Header
        logoSrc={logoImage}
        logoAlt="
      .0.03Logo"
      />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Add the HomePage route */}
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
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ViewLawyersScreen" element={<ViewLawyersScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
