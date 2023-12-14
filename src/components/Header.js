// src/components/Header.js

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import useStyle from "../cercreatecss";
import { isVisible } from "@testing-library/user-event/dist/utils";
import MailIcon from "@mui/icons-material/Mail";
import Divider from "@mui/material/Divider";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";

const Header = () => {
  const [Visible, setVisible] = useState(false);
  const [admin, setAdmin] = useState({
    loginmail: "",
    loginpassword: "",
    logintype: "",
  });
  const [user, setUser] = useState({ email: "" });
  useEffect(() => {
    const admindata = JSON.parse(localStorage.getItem("Admin"));
    if (admindata) {
      setVisible(false);
      setUser({ email: admindata.loginmail });
    } else {
      setVisible(true);
    }
  }, []);
  const Signout = () => {
    localStorage.removeItem("Admin");
    const admindata = JSON.parse(localStorage.getItem("Admin"));
    if (admindata) {
      setVisible(false);
    } else {
      setVisible(true);
      window.location.href = "/";
      }
    };

  return (
    <nav position="static">
      <Toolbar
        sx={{
          backgroundColor: "black",
          padding: "6px",
        }}
      >
        <Typography
          variant=""
          component="p"
          sx={{
            flexGrow: 1,
            color: "#FFC47E",
            fontSize: "40px",
            
            fontFamily: "Gill Sans Extrabold",
            textShadow: "2px 2px 4px blue"
          }}
        >
          Certificates in the Blockchain
        </Typography>
        {!Visible && user.email !== "" && (
          <PersonIcon
            sx={{
              backgroundColor: "white",
              color: "#0c1345",
              borderRadius: "13px",
              marginRight: "5px",
            }}
          />
        )}
        {!Visible && user.email !== "" && (
          <Typography sx={{ color: "white" }}>
            {user ? user.email : ""}
          </Typography>
        )}
        {!Visible && user.email !== "" && (
          <div
            style={{
              width: "1px",
              backgroundColor: "white",
              height: "28px",
              marginLeft: "10px",
            }}
          ></div>
        )}
        {user.email == "" && (
          <Button
            sx={{
              width: "100px",
              fontWeight: "600",
              fontSize: "18px",
              color: " #91ff33 ",
              backgroundColor: "black",
              marginRight: "15px",
              border: "1px solid  #91ff33 ",
              borderRadius: "0px",
              fontFamily: "Helvetica",
              "&:hover": {
                backgroundColor: "#57d828",
                color: "#ffffff",
                border: "0px solid green",
              },
            }}
            component={Link}
            to="/signin"
          >
            Signin
          </Button>
        )}
        {user.email == "" && (
          <Button
            sx={{
              width: "100px",
              fontWeight: "600",
              fontSize: "18px",
              color: " #91ff33 ",
              backgroundColor: "black",
              marginRight: "10px",
              border: "1px solid  #91ff33 ",
              borderRadius: "0px",
              fontFamily: "Helvetica",
              "&:hover": {
                backgroundColor: "#57d828",
                color: "#ffffff",
                border: "0px solid green",
              },
            }}
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        )}
        {!Visible && user.email !== "" && (
          <Button
            sx={{
              width: "100px",
              fontWeight: "600",
              fontSize: "18px",
              color: " #91ff33 ",
              backgroundColor: "black",
              marginRight: "5px",
              border: "1px solid  #91ff33 ",
              borderRadius: "0px",
              ffontFamily: "Helvetica",
              "&:hover": {
                backgroundColor: "#57d828",
                color: "#ffffff",
                border: "0px solid green",
              },
            }}
            onClick={Signout}
          >
            Signout
          </Button>
        )}
      </Toolbar>
    </nav>
  );
};

export default Header;
