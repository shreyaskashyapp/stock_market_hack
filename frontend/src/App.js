import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/home";
import Learn from "./Components/learn";
import Compete from "./Components/compete";
import Profile from "./Components/profile";
import Navbar from "./Components/navbar";
import Smaquiz from "./Components/SMA_Quiz";
import Smaintro from "./Components/LearningMaterial/intro_to_sma";
import SmaLearn from "./Components/LearningMaterial/sma_learning";
import SecIntro from "./Components/LearningMaterial/intro_to_strat2";
import SecLearn from "./Components/LearningMaterial/strat2";


import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/compete" element={<Compete />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sma_quiz" element={<Smaquiz />} />
          <Route path="/sma_intro" element={<Smaintro />} />
          <Route path="/sma_learn" element={<SmaLearn />} />
          <Route path="/sec_intro" element={<SecIntro />} />
          <Route path="/sec_learn" element={<SecLearn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
