// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Routes } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Screens/signUpLawyer";
import LawyersPersonalDetails from '../src/Screens/lawyerPersonalDetails';
import AskFreeQuestion from "./Screens/AskFreeQuestion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/lawyersPersonalDetails"element={<LawyersPersonalDetails />}/>
        <Route path="/askFreeQuestion" element={<AskFreeQuestion />}/>
      </Routes>
      
    </Router>
  );
}

export default App;
