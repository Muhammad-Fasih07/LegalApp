// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Signup from "./Screens/signUpLawyer";
import Header from "./Screens/Header";

function App() {
  return (
    <>
      <div>
        <Header logoSrc="src/images/Gif.gif" logoAlt="WAUQLA" />
        <Signup/>
       
      </div>
    </>
  );
}

export default App;
