import {
  Card,
  Container,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Admin from "../Admin/Admin";
import Footer from "./Bottom";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import ForgotPassword from "./ForgotPassword";
import './SignInPage.css';
import '../App.css'

const Signin = () => {
  const [path, setPath] = useState("/");
  const [admin, setAdmin] = useState({
    loginmail: "",
    loginpassword: "",
    logintype: "",
  });
  const [users, setUsers] = useState("");
  const [visible, setVisible] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    type: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({
      ...admin,
      [name]: value,
    });
  };
  const handleForgotPassword = async (email) => {
    try {
      console.log('Before fetch');
      const response = await fetch('http://localhost:5001/api/signin', {
        method: 'post',
        body: JSON.stringify({
          loginmail: email,
          forgotPassword: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('After fetch:', response);

      const data = await response.json();
      console.log(data);
      

      // Handle the response from the server
      if (response.ok) {
        console.log('Password recovery email sent successfully.');
        
      } else {
        console.error('Failed to send password recovery email:', data.error || data.message);
       
      }


      
    } catch (error) {
      console.error('Error during forgot password:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    try {
      result = await fetch("http://localhost:5001/api/signin", {
        method: "post",
        body: JSON.stringify(admin),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAdmin({
            loginmail: "",
            loginpassword: "",
            logintype: "",
          });
          if (data.message == "Log In successful") {
            localStorage.setItem("Admin", JSON.stringify(admin));
            window.location.href = `/${admin.logintype}`;
          }
          setUsers(data.message);
          console.log(data.message);
        })
        .catch((error) => {
          // alert(error)
          console.error("Error:", error);
          setUsers(error);
          console.log(users);
        });
    } catch (error) {
      // alert(error)
      console.error(error);

      setUsers(error);
      // console.log(users)
    }
  };

  // if (showForgotPassword) {
  //   // Handle the logic for sending a password recovery email
  //   // You can implement this logic in the ForgotPassword component
  //   // and pass a function to close the recovery form from there
  //   console.log("Password recovery logic here");
  //   setShowForgotPassword(false); // Close the password recovery form after handling logic
  // }

  return (
    <div 
    className="signin"
    // style={{
    //   paddingLeft: "80px",
    //   maxWidth: "100%",
    //   height: "70vh",
    //   paddingBottom: "10px",
    //   paddingTop: "98px",
      
    //   borderRadius: "0px",
    //   backgroundImage: 'url("/home/ubu/Downloads/Blockchain Images/4.jpg")',
    //   // backgroundImage: 'url("https://res-console.cloudinary.com/dkihdpqbu/media_explorer_thumbnails/0130f573eed3c909e653c6d98be809b2/detailed")',
    //   height: "100vh",
    //   backgroundSize: 'cover',
    //   backgroundRepeat: 'no-repeat',
    // }}
      
    >
      <form onSubmit={handleSubmit}>
        <Typography
          variant="h4"
          align=""
          sx={{ margin: "0.5rem 0", color: "white" }}
        >
          Sign In
        </Typography>
        {/* <Footer /> */}
        <container sx={{ display: "flex", flexDirection: "column" }}>
          <container>
            <InputLabel
              htmlFor="email"
              sx={{ color: "#ffffff", fontSize: "18px" }}
            >
              Email
            </InputLabel>
            <TextField
              variant="outlined"
              // label="email"
              type="email"
              name="loginmail"
              value={admin.loginmail}
              onChange={handleChange}
              className="TextField"
              sx={{
                margin: "0.5rem 0",
                width: "500px",
                backgroundColor: "#f2eef2",
                border: "1px solid none",
              }}
            />
          </container>
          <container>
            <InputLabel htmlFor="" sx={{ color: "#ffffff", fontSize: "18px" }}>
              Password
            </InputLabel>
            <TextField
              type="password"
              name="loginpassword"
              value={admin.loginpassword}
              onChange={handleChange}
              sx={{
                margin: "0.5rem 0",
                width: "500px",
                backgroundColor: "#f2eef2",
                border: "1px solid none",
              }}
            />
          </container>
          <container>
            <InputLabel
              htmlFor="Type"
              sx={{ color: "#ffffff", fontSize: "18px" }}
            >
              Type
            </InputLabel>
            <Select
              id="Type"
              name="logintype"
              value={admin.logintype}
              onChange={handleChange}
              variant="outlined"
              sx={{
                margin: "0.5rem 0",
                width: "500px",
                backgroundColor: "#f2eef2",
                border: "1px solid none",
                borderRadius: "0px",
              }}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="student">Student</MenuItem>

            </Select>
          </container>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "rgba(210,0,210,0.3)",
                "&:hover": { backgroundColor: "rgba(125,125,125,0.9)" },
                borderRadius: "0px",
                marginTop: "20px",
                paddingTop: "10px",
              }}
            >
              Sign In
            </Button>
          

      {/* Display error messages or other UI based on the state */}
      <p style={{ color: 'red', fontSize: '20px', fontWeight: '500' }}>{users}</p>
            </div>
            {/* <br></br> */}
            
        </container>
        
      </form>
      {!showForgotPassword ? (
        <Button variant="text" color="primary" onClick={() => setShowForgotPassword(true)} sx={{ marginTop: '10px' }}>
          Forgot Password
        </Button>
      ) : (
        <ForgotPassword onForgot={() => setShowForgotPassword(false)} handleForgotPassword={handleForgotPassword} />
      )}
    </div>
  );
};

export default Signin;
