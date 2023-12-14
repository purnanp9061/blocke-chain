import {
  AppBar,
  TextField,
  Typography,
  Button,
  Card,
  Container,
  InputLabel,
  Select,
  MenuItem,
 
} from "@mui/material";
//   import AdapterDateFns from '@mui/lab/AdapterDateFns';
//   import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//   import { DatePicker } from '@mui/x-date-pickers';
import React from "react";
import useStyle from "../cercreatecss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SchoolIcon from "@mui/icons-material/School";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TodayIcon from "@mui/icons-material/Today";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import "../App.css";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  myCustomStyle: {
    color: "red",
    fontSize: "20px",
  },
}));
//   const {  serialNo,  pcNo,hallTicketNo, adharNo,  name,  fatherName,  email,  course,  institutionName,  passedOutYear   }= req.body

const Student = () => {
  const [studentData, setStudentData] = useState({
       serialNo:'', 
       pcNo:'',
       hallTicketNo:'', 
       adharNo:'',  
       name:'',  
       fatherName:'',  
       email:'',  
       course:'',  
       institutionName:'',  
       passedOutYear:''   
  });
  const [msg, setMsg] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const [mail, setMail] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    try {
      result = await fetch("http://localhost:5001/student", {
        method: "post",
        body: JSON.stringify(studentData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setMail(studentData.email);
          setStudentData({
              serialNo:'', 
              pcNo:'',
              hallTicketNo:'', 
              adharNo:'',  
              name:'',  
              fatherName:'',  
              email:'',  
              course:'',  
              institutionName:'',  
              passedOutYear:''
          });
          if (data.message == "you have succsessfully shared your details") {
            setMsg(data.message);
          } else {
            setErrmsg(data.message);
            console.log(data.message);
          }
        })
        .catch((error) => {
          // alert(error)
          console.error("Error:", error);
          setErrmsg(error.message);
          // console.log(users)
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0)",
        maxWidth: "80%",
        margin: "",
        display: "flex",
        flexDirection: "",
        justifyContent: "",
        alignItems: "",
        paddingBottom: "15px",
      }}
    >
      {/* <p>{errmsg}</p> */}
      {!msg && (
        <form onSubmit={handleSubmit}>
          <h1
            style={{
              textAlign: "",
              color: "#FFF8C9",
              marginLeft: "50px",
              marginBottom: "50px",
              fontFamily: "Helvetica",
            }}
          >
            Student Certificate data
          </h1>
          <Container sx={{ display: "flex", maxWidth: "30%" }}>
            <Container>
              <InputLabel
                htmlFor="serialNo"
                sx={{ color: "white", fontSize: "22px", padding: "10px",width:'325px' }}
              >
                Serial Number
                {!studentData.serialNo && (
                  <span
                    style={{ color: "red", marginLeft: "", fontSize: "30px" }}
                  >
                    *
                  </span>
                )}
              </InputLabel>
            </Container>
            <Container>
              <TextField
                // fullWidth
                id="serialNo"
                type="number"
                // label="serialNo"
                name="serialNo"
                placeholder="serialNo"
                value={studentData.serialNo}
                onChange={handleChange}
                sx={{
                  margin: "0.5rem 0",
                  backgroundColor: "#f2eef2",
                  border: "1px solid none",
                  color: "white",
                }}
              />
            </Container>
          </Container>
          <Container sx={{ display: "flex" }}>
            <Container sx={{ display: "flex" }}>
              <FormatListNumberedIcon
                sx={{ color: "#7f6ca8", paddingTop: "10px" }}
              />
              <InputLabel
                htmlFor="pcNo"
                sx={{ color: "white", fontSize: "22px", padding: "10px",width:'300px' }}
              >
               Pc Number
                {!studentData.pcNo && (
                  <span
                    style={{ color: "red", marginLeft: "", fontSize: "30px" }}
                  >
                    *
                  </span>
                )}
              </InputLabel>
            </Container>
            <Container>
              <TextField
                id="pcNo"
                type="text"
                // label="Roll Number"
                name="pcNo"
                placeholder="pcNo"
                value={studentData.pcno}
                onChange={handleChange}
                sx={{
                  margin: "0.5rem 0",
                  backgroundColor: "#f2eef2",
                  border: "1px solid none",
                  color: "white",
                }}
              />
            </Container>
          </Container>
          <Container sx={{ display: "flex" }}>
            <Container sx={{ display: "flex" }} className="">
              <FormatListNumberedIcon
                sx={{ color: "#7f6ca8", paddingTop: "10px" }}
              />
              <InputLabel
                htmlFor="hallTicketNo"
                sx={{ color: "white", fontSize: "22px", padding: "10px",width:'300px' }}
              >
                HallTicket No
                {!studentData.hallTicketNo && (
                  <span
                    style={{ color: "red", marginLeft: "", fontSize: "30px" }}
                  >
                    *
                  </span>
                )}
              </InputLabel>
            </Container>
            <Container>
              <TextField
                id="hallTicketNo"
                type="text"
                // label="name"
                name="hallTicketNo"
                placeholder="hallTicketNo"
                value={studentData.hallTicketNo}
                onChange={handleChange}
                sx={{
                  margin: "0.5rem 0",
                  backgroundColor: "#f2eef2",
                  border: "1px solid none",
                  color: "white",
                }}
              />
            </Container>
          </Container>
          <Container sx={{ display: "flex" }}>
            <Container sx={{ display: "flex" }} className="">
              <EmailIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
              <InputLabel
                htmlFor="adharNo"
                sx={{ color: "white", fontSize: "22px", padding: "10px",width:'300px' }}
              >
               Adhaar Number
                {!studentData.adharNo && (
                  <span
                    style={{ color: "red", marginLeft: "", fontSize: "30px" }}
                  >
                    *
                  </span>
                )}
              </InputLabel>
            </Container>
            <Container>
              <TextField
                id="adharNo"
                type="text"
                // label="Email"
                name="adharNo"
                placeholder="adharNo"
                value={studentData.adharNo}
                onChange={handleChange}
                sx={{
                  margin: "0.5rem 0",
                  backgroundColor: "#f2eef2",
                  border: "1px solid none",
                  color: "white",
                }}
              />
            </Container>
          </Container>
          <Container sx={{ display: "flex" }}>
            <Container sx={{ display: "flex" }} className="">
              <LibraryBooksIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
              <InputLabel
                htmlFor="name"
                sx={{ color: "white", fontSize: "22px", padding: "10px",width:'300px' }}
              >
                Name
                {!studentData.name && (
                  <span
                    style={{ color: "red", marginLeft: "", fontSize: "30px" }}
                  >
                    *
                  </span>
                )}
              </InputLabel>
            </Container>
            <Container>
              <TextField
                id="name"
                type="text"
                // label="course"
                name="name"
                placeholder="name"
                value={studentData.name}
                onChange={handleChange}
                sx={{
                  margin: "0.5rem 0",
                  backgroundColor: "#f2eef2",
                  border: "1px solid none",
                  color: "white",
                }}
              />
            </Container>
          </Container>
          <Container sx={{ display: "flex" }}>
            <Container sx={{ display: "flex" }} className="">
              <SchoolIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
              <InputLabel
                htmlFor="fatherName"
                sx={{ color: "white", fontSize: "22px", padding: "10px" ,width:'300px'}}
              >
               Father's Name
                {!studentData.fatherName && (
                  <span
                    style={{ color: "red", marginLeft: "", fontSize: "30px" }}
                  >
                    *
                  </span>
                )}
              </InputLabel>
            </Container>
            <Container>
              <TextField
                id="fatherName"
                type="text"
                // label="Collage Name"
                name="fatherName"
                placeholder="fatherName"
                value={studentData.fatherName}
                onChange={handleChange}
                sx={{
                  margin: "0.5rem 0",
                  backgroundColor: "#f2eef2",
                  border: "1px solid none",
                }}
              />
            </Container>
          </Container>
          <Container sx={{ display: "flex" }}>
            <Container sx={{ display: "flex" }} className="">
              <TodayIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
              <InputLabel
                htmlFor="email"
                sx={{ color: "white", fontSize: "22px", padding: "10px",width:'300px' }}
              >
               Email
                {!studentData.email && (
                  <span
                    style={{ color: "red", marginLeft: "", fontSize: "30px" }}
                  >
                    {" "}
                    *
                  </span>
                )}
              </InputLabel>
            </Container>
            <Container>
              <TextField
                id="email"
                type="email"
                // label="Year of passed out"
                name="email"
                placeholder="email"
                value={studentData.email}
                onChange={handleChange}
                sx={{
                  margin: "0.5rem 0",
                  backgroundColor: "#f2eef2",
                  border: "1px solid none",
                }}
              />
            </Container>
          </Container>
          <Container sx={{ display: "flex" }}>
            <Container sx={{ display: "flex" }} className="">
              <TodayIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
              <InputLabel
                htmlFor="course"
                sx={{ color: "white", fontSize: "22px", padding: "10px" ,width:'300px'}}
              >
                Course
                {!studentData.course && (
                  <span
                    style={{ color: "red", marginLeft: "", fontSize: "30px" }}
                  >
                    {" "}
                    *
                  </span>
                )}
              </InputLabel>
            </Container>
            <Container>
              <TextField
                id="course"
                type="text"
                // label="Year of passed out"
                name="course"
                placeholder="course"
                value={studentData.course}
                onChange={handleChange}
                sx={{
                  margin: "0.5rem 0",
                  backgroundColor: "#f2eef2",
                  border: "1px solid none",
                }}
              />
            </Container>
          </Container>
          <Container sx={{ display: "flex" }}>
            <Container sx={{ display: "flex" }} className="">
              {/* <TodayIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} /> */}
              <InputLabel
                htmlFor="institutionName"
                sx={{ color: "white", fontSize: "22px", padding: "10px" ,width:'325px'}}
              >
                  Institution Name
                {!studentData.institutionName && (
                  <span
                    style={{ color: "red", marginLeft: "", fontSize: "30px" }}
                  >
                    {" "}
                    *
                  </span>
                )}
              </InputLabel>
            </Container>

            <Container>
            <Select
            // label="Type"
            id="institutionName"
            name="institutionName"
            value={studentData.institutionName}
            onChange={handleChange}
            // variant="outlined"
            sx={{
              margin: "0.5rem 0",
              width: "500px",
              backgroundColor: "#f2eef2",
              border: "1px solid none",
              width:"246px"
            }}
          >
            <MenuItem value="jntu">JNTU</MenuItem>
            <MenuItem value="ou">OU</MenuItem>
            <MenuItem value="kits">Kits</MenuItem>
          </Select>
        </Container>


            {/* <Container>
              <TextField
                id="institutionName"
                type="text"
                // label="Year of passed out"
                name="institutionName"
                placeholder="institutionNamer"
                value={studentData.institutionName}
                onChange={handleChange}
                sx={{
                  margin: "0.5rem 0",
                  backgroundColor: "#f2eef2",
                  border: "1px solid none",
                }}
              />
            </Container> */}
          </Container>
          <Container sx={{ display: "flex" }}>
            <Container sx={{ display: "flex" }} className="">
              <TodayIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
              <InputLabel
                htmlFor="passedOutYear"
                sx={{ color: "white", fontSize: "22px", padding: "10px",width:'300px' }}
              >
                Year of passed out
                {!studentData.passedOutYear && (
                  <span
                    style={{ color: "red", marginLeft: "", fontSize: "30px" }}
                  >
                    {" "}
                    *
                  </span>
                )}
              </InputLabel>
            </Container>
            <Container>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
              <TextField
                id="passedOutYear"
                type="text"
                // label="Year of passed out"
                name="passedOutYear"
                placeholder="passedOutYear"
                value={studentData.passedOutYear}
                onChange={handleChange}
                sx={{
                  margin: "0.5rem 0",
                  backgroundColor: "#f2eef2",
                  border: "1px solid none",
                  width:"248px"
                }}
              />
               {/* </LocalizationProvider> */}
            </Container>
          </Container>

          <Container sx={{ display: "flex", justifyContent: "" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "rgba(210,0,210,0.3)",
                "&:hover": { backgroundColor: "rgba(125,125,125,0.9)" },
                borderRadius: "0px",
                marginTop: "20px",
                padding: "8px",
                marginLeft: "24px",
                width: "100px",
              }}
            >
          Submit
            </Button>{" "}
            <p style={{ color: "red", marginLeft: "10px" }}>{errmsg}</p>
          </Container>
        </form>
      )}
      {msg && (
        <div style={{ backgroundColor: "", padding: "40px" }}>
          <p style={{ color: "white" }}>
           {msg}
          </p>
        </div>
      )}
    </div>
  );
};

export default Student;
