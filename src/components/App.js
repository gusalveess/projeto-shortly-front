import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../Context/UserContext";
import Home from "./Home";
import HomeOne from "./HomeOne";
import Signup from "./SignUp";
import SignIn from "./SignIn";
import Ranking from "./Ranking";
import "../Assets/Reset.css";

export default function App() {
  const [token, setToken] = useState("");

  return (
    <>
      <UserContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<Signup />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/logged" element={<HomeOne />} />
            <Route path="/ranking" element={<Ranking />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
