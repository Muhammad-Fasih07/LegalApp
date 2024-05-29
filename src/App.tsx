// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Routes } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Screens/signUpLawyer";
import LawyersPersonalDetails from "./Screens/lawyerPersonalDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
      <Routes>
        <Route
          path="/lawyersPersonalDetails"
          element={<LawyersPersonalDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
