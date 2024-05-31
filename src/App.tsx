// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Routes } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Screens/signUpLawyer";
import LawyersPersonalDetails from "../src/Screens/lawyerPersonalDetails";
import HomePage from "./Screens/homePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/Signup" element={<Signup />} />

        <Route
          path="/lawyersPersonalDetails"
          element={<LawyersPersonalDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
