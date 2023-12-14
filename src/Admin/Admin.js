import {
  Container,
  Toolbar,
  AppBar,
  Button,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { Typography,AppBar } from '@mui/material';
import Create from "../Certificatecreate";
import Webscanner from "../Qrcodescanner";
import Verify from "../Certificatever.js";
import Approve from "../ApproveCert.js";
import RejectUser from "../RejectCert.js";
import MailIcon from "@mui/icons-material/Mail";
import CreateIcon from "@mui/icons-material/Create";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import './admin.css'
import '../App.css';

const Admin = () => {
  const [admin, setAdmin] = useState({
    loginmail: "",
    loginpassword: "",
    logintype: "",
  });
  useEffect(() => {
    const admindata = JSON.parse(localStorage.getItem("admin"));
    setAdmin(admindata);
  }, []);

  const [areCardsVisible1, setAreCardsVisible1] = useState(false);
  const [areCardsVisible2, setAreCardsVisible2] = useState(false);
  const [areCardsVisible3, setAreCardsVisible3] = useState(false);
  const [areCardsVisible4, setAreCardsVisible4] = useState(false);
  const [msg, setMsg] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [activeList, setActiveList] = useState(null);

  useEffect(() => {
    const admindata = JSON.parse(localStorage.getItem("Admin"));
    setAdmin(admindata);
    if (admindata && admindata.logintype === "user") {
      setIsAdmin(false);
      setMsg(false);
      setAreCardsVisible1(false);
    } else {
      setIsAdmin(true);
      setMsg(true);
      setAreCardsVisible1(true);
    }
  }, []);

  const toggleCards1 = () => {
    setActiveList(1);
    setAreCardsVisible2(false);
    setAreCardsVisible3(false);
    setAreCardsVisible4(false);
    setAreCardsVisible1(!areCardsVisible1);
    console.log("1");
  
  };
  const toggleCards2 = () => {
    setActiveList(2);
    setAreCardsVisible1(false);
    setAreCardsVisible3(false);
    setAreCardsVisible4(false);
    setAreCardsVisible2(!areCardsVisible2);
    console.log("2");
   
  };
  const toggleCards3 = () => {
    setActiveList(3);
    setAreCardsVisible1(false);
    setAreCardsVisible2(false);
    setAreCardsVisible4(false);
    setAreCardsVisible3(!areCardsVisible3);
    console.log("3");
    
  };
  const toggleCards4 = () => {
    setActiveList(4);
    setAreCardsVisible1(false);
    setAreCardsVisible2(false);
    setAreCardsVisible3(false);
    setAreCardsVisible4(!areCardsVisible4);
    console.log("4");
  
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };


  const getBackgroundImage = (list) => {
    switch (list) {
      case 1:
        return "url('https://res.cloudinary.com/dkihdpqbu/image/upload/v1702276532/2_qi6li7.jpg')";
      case 2:
        return "url('https://res.cloudinary.com/dkihdpqbu/image/upload/v1702276534/8_n3awub.jpg')";
      case 3:
        return "url('https://res.cloudinary.com/dkihdpqbu/image/upload/v1702276531/5_otahj4.jpg')";
      case 4:
        return "url('https://res.cloudinary.com/dkihdpqbu/image/upload/v1702276529/15_meio2k.jpg')";
      // default:
      //   return "default_background_image";
    }
  };


  return (
    <div className="adm"
    //  style={{ backgroundImage: getBackgroundImage(activeList),flexGrow:'1' }}
     >
     
      <div
        // anchor="left"
       style={{backgroundColor:'#2c3e50'}}
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <List   
        sx={{ backgroundColor: "" }}>
          {isAdmin && msg && (
            <ListItem 
           
              button
              sx={{
                // backgroundColor: "#2c3e50", // Set the background color for the button
                // borderBottom: "1px solid #34495e", // Set the line color
                "&:hover": { backgroundColor: '' },

                color: "white",
                "&:hover": { color: "" },

              }}
            >
              <ListItemIcon>
                {/* <MailIcon  /> */}
                <CreateIcon sx={{ color: "#B15EFF", width:"100%" }} />
              </ListItemIcon>
              <ListItemText
                primary=" Generate Certificate"
                onClick={toggleCards1}
              />
            </ListItem>
          )}
          <ListItem
          
            button
            sx={{
              // backgroundColor: "#2c3e50", // Set the background color for the button
              // borderBottom: "1px solid #34495e", // Set the line color
              width: "280px",
              "&:hover": { backgroundColor: "#292a5e" },
              color: "white",
              "&:hover": { color: "" },
              borderTop: "",
            }}
          >
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: "#B15EFF" }} />
            </ListItemIcon>
            <ListItemText
              primary=" Certificate Verification"
              onClick={toggleCards2}
            />
          </ListItem>
          <ListItem
            button
            sx={{
              // backgroundColor: "#2c3e50", // Set the background color for the button
              // borderBottom: "1px solid #34495e", // Set the line color
              width: "280px",
              "&:hover": { backgroundColor: "#292a5e" },
              color: "white",
              "&:hover": { color: "" },
              borderTop: "",
            }}
          >
            <ListItemIcon>
              <CameraAltIcon sx={{ color: "#B15EFF" }} />
            </ListItemIcon>
            <ListItemText
              primary="Pdf webscanner verify"
              onClick={toggleCards3}
            />
          </ListItem>
          <ListItem
              button
              sx={{
                // backgroundColor: "#2c3e50", // Set the background color for the button
                // borderBottom: "1px solid #34495e", // Set the line color
                // "&:hover": { backgroundColor: "#292a5e" },
                color: "white",
                "&:hover": { color: "" },
              }}
            >
              <ListItemIcon>
                {/* <MailIcon  /> */}
                <CreateIcon sx={{ color: "#B15EFF" }} />
              </ListItemIcon>
              <ListItemText

                primary="Approve Certificate"
                onClick={toggleCards4}
              />
            </ListItem>
        </List>

      </div>
      <div
        // className={`main-content ${areCardsVisible1 && isAdmin && msg ? 'with-background' : ''}`}
        // style={{ backgroundImage: areCardsVisible1 && isAdmin && msg ? getBackgroundImage(activeList) : '' }}
        // className="main-content"
        style={{ backgroundImage: getBackgroundImage(activeList),flexGrow:'2', backgroundSize: "cover",
        backgroundRepeat: 'no-repeat' }}
     
     >
        {areCardsVisible1 && isAdmin && msg && <Create />}
        {areCardsVisible2 && <Verify />}
        {areCardsVisible3 && <Webscanner />}
        {areCardsVisible4 && <Approve />}
      </div>
     
    </div>
  );
};
export default Admin;
