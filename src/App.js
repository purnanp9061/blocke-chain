// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Signin from "./components/Signin";
import Header from "./components/Header";
import SignUp from "./components/Signup";
// import ForgotPassword from "./components/ForgotPassword";

import Admin from "./Admin/Admin";
import User from "./User/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import Footer from "./components/Bottom";
import Student from "./components/Student";

// import backgroundVideo from "/home/ubu/Downloads/reactbc/reactfirst/src/Video 2.mp4";
import backgroundVideo from "./Video 2.mp4";
// import backgroundVideo from "./Video 4.mp4";
// import  backgroundVideo from "./Video 4.mp4";

const createLetterSpans = (text) => {
  return text.split('').map((letter, index) => (
    <span key={index} className="animated-letter">
      {letter}
    </span>
  ));
};

function BlockCertify() {
  const [animationClass, setAnimationClass] = useState("");
  useEffect(() => {
    // Trigger animation after component mounts
    setAnimationClass("animate");
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        marginTop: "100px",
        marginLeft: "100px",


      }}
    >
      <div>
        <p
          style={{
            fontSize: "80px",
            color: "#BED754",
            textAlign: "center",
            marginBottom: "1px",
            fontWeight: "bold",
            fontFamily: "Helvetica",
            textShadow: "4px 4px 8px  blue",
          }}>
          <span>{createLetterSpans("BlockCertify")}</span>
        </p>
      <p className="mainpage-text">
       
    <span style={{ color: "#FFC0D9",fontSize: "40px", fontFamily: "Lucida Handwriting",textShadow: "4px 4px 8px black", }}>
    {createLetterSpans("   A Blockchain-Based")}
  </span>{" "}
  <span style={{ color: "#FFC0D9",fontSize: "40px", fontFamily: "Lucida Handwriting" ,textShadow: "4px 4px 8px black",}}>
    {createLetterSpans("Certificate Create and Verification System")}
  </span>


        </p>
      </div>
      <div></div>
    </div>
  );
}

function App() {
  const [signData, setsignData] = useState({
    email: "",
    password: "",
    type: "",
  });

  useEffect(() => {
    // Retrieve form data from local storage
    const storedFormData = JSON.parse(localStorage.getItem("Admin"));
    if (storedFormData) {
      setsignData({
        email: storedFormData.loginmail,
        password: storedFormData.loginpassword,
        type: storedFormData.logintype,
      });
    }
  }, []);

  return (
    <div className="app">
      <Router >
        <video autoPlay muted loop id="background-video">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="mainpage">
          <Header />

          <Routes>
            <Route path="/" element={<BlockCertify />} />
            <Route path="/signup" element={<SignUp />} />
            {signData.type !== "student" && (<Route path={signData.type} element={<Admin />} />)}
            <Route path="/signin" element={<Signin />} />
            {signData.type == "student" && (<Route path={signData.type} element={<Student />} />)}


          </Routes>
        </div>

        <div className="foot" style={{}}>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
