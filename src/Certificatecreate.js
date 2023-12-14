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
import React from "react";
import useStyle from "./cercreatecss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SchoolIcon from "@mui/icons-material/School";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TodayIcon from "@mui/icons-material/Today";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import "./App.css";
import { makeStyles } from "@mui/styles";
import "./certificate.css";

const useStyles = makeStyles((theme) => ({
  myCustomStyle: {
    color: "red",
    fontSize: "20px",
  },
}));

const Create = () => {
  const [certificateData, setCertificateData] = useState({
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
    setCertificateData({ ...certificateData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    try {
      result = await fetch("http://localhost:5001/createCertificate", {
        method: "post",
        body: JSON.stringify(certificateData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setMail(certificateData.email);
          setCertificateData({
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
          if (data.message == "Certificate created") {
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
    <div className="cert"
      // style={{
      //   // backgroundColor: "rgba(0,0,0,0)",
      //   // maxWidth: "80%",
      //   margin: "",
      //   display: "flex",
      //   flexDirection: "",
      //   justifyContent: "",
      //   alignItems: "",
      //   paddingBottom: "15px",
      // }}
    >
      {/* <p>{errmsg}</p> */}
      {!msg && (
        // <form onSubmit={handleSubmit}>
        //   <h1
        //     style={{
        //       textAlign: "",
        //       color: "#FFF8C9",
        //       marginLeft: "50px",
        //       marginBottom: "50px",
        //       fontFamily: "Helvetica",
        //     }}
        //   >
        //     Create Certificate
        //   </h1>
        //   <Container sx={{ display: "flex", maxWidth: "30%" }}>
        //     <Container>
        //       <InputLabel
        //         htmlFor="serialNo"
        //         sx={{ color: "white", fontSize: "22px", padding: "10px" }}
        //       >
        //         Serial Number
        //         {!certificateData.serialNo && (
        //           <span
        //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
        //           >
        //             *
        //           </span>
        //         )}
        //       </InputLabel>
        //     </Container>
        //     <Container>
        //       <TextField
        //         // fullWidth
        //         id="serialNo"
        //         type="number"
        //         // label="serialNo"
        //         name="serialNo"
        //         placeholder="serialNo"
        //         value={certificateData.serialNo}
        //         onChange={handleChange}
        //         sx={{
        //           margin: "0.5rem 0",
        //           backgroundColor: "#f2eef2",
        //           border: "1px solid none",
        //           color: "white",
        //         }}
        //       />
        //     </Container>
        //   </Container>
        //   <Container sx={{ display: "flex" }}>
        //     <Container sx={{ display: "flex" }}>
        //       <FormatListNumberedIcon
        //         sx={{ color: "#7f6ca8", paddingTop: "10px" }}
        //       />
        //       <InputLabel
        //         htmlFor=""
        //         sx={{ color: "white", fontSize: "22px", padding: "10px" }}
        //       >
        //         Roll Number
        //         {!certificateData.rollNo && (
        //           <span
        //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
        //           >
        //             *
        //           </span>
        //         )}
        //       </InputLabel>
        //     </Container>
        //     <Container>
        //       <TextField
        //         id="rollNo"
        //         type="number"
        //         // label="Roll Number"
        //         name="rollNo"
        //         placeholder="rollNo"
        //         value={certificateData.Rollno}
        //         onChange={handleChange}
        //         sx={{
        //           margin: "0.5rem 0",
        //           backgroundColor: "#f2eef2",
        //           border: "1px solid none",
        //           color: "white",
        //         }}
        //       />
        //     </Container>
        //   </Container>
        //   <Container sx={{ display: "flex" }}>
        //     <Container sx={{ display: "flex" }} className="">
        //       <FormatListNumberedIcon
        //         sx={{ color: "#7f6ca8", paddingTop: "10px" }}
        //       />
        //       <InputLabel
        //         htmlFor="name"
        //         sx={{ color: "white", fontSize: "22px", padding: "10px" }}
        //       >
        //         Name
        //         {!certificateData.name && (
        //           <span
        //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
        //           >
        //             *
        //           </span>
        //         )}
        //       </InputLabel>
        //     </Container>
        //     <Container>
        //       <TextField
        //         id="name"
        //         type="text"
        //         // label="name"
        //         name="name"
        //         placeholder="Name"
        //         value={certificateData.name}
        //         onChange={handleChange}
        //         sx={{
        //           margin: "0.5rem 0",
        //           backgroundColor: "#f2eef2",
        //           border: "1px solid none",
        //           color: "white",
        //         }}
        //       />
        //     </Container>
        //   </Container>
        //   <Container sx={{ display: "flex" }}>
        //     <Container sx={{ display: "flex" }} className="">
        //       <EmailIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
        //       <InputLabel
        //         htmlFor="email"
        //         sx={{ color: "white", fontSize: "22px", padding: "10px" }}
        //       >
        //         Email
        //         {!certificateData.email && (
        //           <span
        //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
        //           >
        //             *
        //           </span>
        //         )}
        //       </InputLabel>
        //     </Container>
        //     <Container>
        //       <TextField
        //         id="Email"
        //         type="email"
        //         // label="Email"
        //         name="email"
        //         placeholder="email"
        //         value={certificateData.email}
        //         onChange={handleChange}
        //         sx={{
        //           margin: "0.5rem 0",
        //           backgroundColor: "#f2eef2",
        //           border: "1px solid none",
        //           color: "white",
        //         }}
        //       />
        //     </Container>
        //   </Container>
        //   <Container sx={{ display: "flex" }}>
        //     <Container sx={{ display: "flex" }} className="">
        //       <LibraryBooksIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
        //       <InputLabel
        //         htmlFor="course"
        //         sx={{ color: "white", fontSize: "22px", padding: "10px" }}
        //       >
        //         Course
        //         {!certificateData.course && (
        //           <span
        //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
        //           >
        //             *
        //           </span>
        //         )}
        //       </InputLabel>
        //     </Container>
        //     <Container>
        //       <TextField
        //         id="course"
        //         type="text"
        //         // label="course"
        //         name="course"
        //         placeholder="course"
        //         value={certificateData.course}
        //         onChange={handleChange}
        //         sx={{
        //           margin: "0.5rem 0",
        //           backgroundColor: "#f2eef2",
        //           border: "1px solid none",
        //           color: "white",
        //         }}
        //       />
        //     </Container>
        //   </Container>
        //   <Container sx={{ display: "flex" }}>
        //     <Container sx={{ display: "flex" }} className="">
        //       <SchoolIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
        //       <InputLabel
        //         htmlFor="collegeName"
        //         sx={{ color: "white", fontSize: "22px", padding: "10px" }}
        //       >
        //         Collage Name
        //         {!certificateData.collegeName && (
        //           <span
        //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
        //           >
        //             *
        //           </span>
        //         )}
        //       </InputLabel>
        //     </Container>
        //     <Container>
        //       <TextField
        //         id="collegeName"
        //         type="text"
        //         // label="Collage Name"
        //         name="collegeName"
        //         placeholder="collegeName"
        //         value={certificateData.collegeName}
        //         onChange={handleChange}
        //         sx={{
        //           margin: "0.5rem 0",
        //           backgroundColor: "#f2eef2",
        //           border: "1px solid none",
        //         }}
        //       />
        //     </Container>
        //   </Container>
        //   <Container sx={{ display: "flex" }}>
        //     <Container sx={{ display: "flex" }} className="">
        //       <TodayIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
        //       <InputLabel
        //         htmlFor="passedOutYear"
        //         sx={{ color: "white", fontSize: "22px", padding: "10px" }}
        //       >
        //         Year of passed out
        //         {!certificateData.passedOutYear && (
        //           <span
        //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
        //           >
        //             {" "}
        //             *
        //           </span>
        //         )}
        //       </InputLabel>
        //     </Container>
        //     <Container>
        //       <TextField
        //         id="passedOutYear"
        //         type="number"
        //         // label="Year of passed out"
        //         name="passedOutYear"
        //         placeholder="passedOutYear"
        //         value={certificateData.passedOutYear}
        //         onChange={handleChange}
        //         sx={{
        //           margin: "0.5rem 0",
        //           backgroundColor: "#f2eef2",
        //           border: "1px solid none",
        //         }}
        //       />
        //     </Container>
        //   </Container>

        //   <Container sx={{ display: "flex", justifyContent: "" }}>
        //     <Button
        //       type="submit"
        //       variant="contained"
        //       sx={{
        //         backgroundColor: "rgba(210,0,210,0.3)",
        //         "&:hover": { backgroundColor: "rgba(125,125,125,0.9)" },
        //         borderRadius: "0px",
        //         marginTop: "20px",
        //         padding: "8px",
        //         marginLeft: "24px",
        //         width: "100px",
        //       }}
        //     >
        //       Create
        //     </Button>{" "}
        //     <p style={{ color: "red", marginLeft: "10px" }}>{errmsg}</p>
        //   </Container>
        // </form>
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
          Create Certificate
        </h1>
        <Container sx={{ display: "flex", maxWidth: "30%" }}>
          <Container>
            <InputLabel
              htmlFor="serialNo"
              sx={{ color: "white", fontSize: "22px", padding: "10px",width:'275px' }}
            >
              Serial Number
              {!certificateData.serialNo && (
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
              value={certificateData.serialNo}
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
              sx={{ color: "white", fontSize: "22px", padding: "10px",width:'250px' }}
            >
             Pc Number
              {!certificateData.pcNo && (
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
              value={certificateData.pcNo}
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
              sx={{ color: "white", fontSize: "22px", padding: "10px",width:'250px' }}
            >
              HallTicket No
              {!certificateData.hallTicketNo && (
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
              value={certificateData.hallTicketNo}
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
              sx={{ color: "white", fontSize: "22px", padding: "10px",width:'250px' }}
            >
             Adhaar Number
              {!certificateData.adharNo && (
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
              value={certificateData.adharNo}
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
              sx={{ color: "white", fontSize: "22px", padding: "10px",width:'250px' }}
            >
              Name
              {!certificateData.name && (
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
              value={certificateData.name}
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
              sx={{ color: "white", fontSize: "22px", padding: "10px",width:'250px' }}
            >
             Father's Name
              {!certificateData.fatherName && (
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
              value={certificateData.fatherName}
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
              sx={{ color: "white", fontSize: "22px", padding: "10px",width:'250px' }}
            >
             Email
              {!certificateData.email && (
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
              value={certificateData.email}
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
              sx={{ color: "white", fontSize: "22px", padding: "10px" ,width:'250px'}}
            >
              Course
              {!certificateData.course && (
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
              value={certificateData.course}
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
              sx={{ color: "white", fontSize: "22px", padding: "10px",width:'270px' }}
            >
                Institution Name
              {!certificateData.institutionName && (
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
          value={certificateData.institutionName}
          onChange={handleChange}
          // variant="outlined"
          sx={{
            margin: "0.5rem 0",
            width: "500px",
            backgroundColor: "#f2eef2",
            border: "1px solid none",
            width:'210px'
            ,width:'230px'
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
              sx={{ color: "white", fontSize: "22px", padding: "10px" ,width:'250px'}}
            >
              Year of passed out
              {!certificateData.passedOutYear && (
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
              type="date"
              // label="Year of passed out"
              name="passedOutYear"
              placeholder="passedOutYear"
              value={certificateData.passedOutYear}
              onChange={handleChange}
              sx={{
                margin: "0.5rem 0",
                backgroundColor: "#f2eef2",
                border: "1px solid none",
                width:'230px'
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
            Create
          </Button>{" "}
          <p style={{ color: "red", marginLeft: "10px" }}>{errmsg}</p>
        </Container>
      </form>
      // <form onSubmit={handleSubmit}>
      //   <h1
      //     style={{
      //       textAlign: "",
      //       color: "#FFF8C9",
      //       marginLeft: "50px",
      //       marginBottom: "50px",
      //       fontFamily: "Helvetica",
      //     }}
      //   >
      //     Create Certificate
      //   </h1>
      //   <Container sx={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}> 
      //   <Container sx={{ display: "flex",flexDirection:'column'  }}>
      //     <Container>
      //       <InputLabel
      //         htmlFor="serialNo"
      //         sx={{ color: "white", fontSize: "22px", padding: "10px",width:'275px' }}
      //       >
      //         Serial Number
      //         {!certificateData.serialNo && (
      //           <span
      //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
      //           >
      //             *
      //           </span>
      //         )}
      //       </InputLabel>
      //     </Container>
      //     <Container>
      //       <TextField
      //         // fullWidth
      //         id="serialNo"
      //         type="number"
      //         // label="serialNo"
      //         name="serialNo"
      //         placeholder="serialNo"
      //         value={certificateData.serialNo}
      //         onChange={handleChange}
      //         sx={{
      //           margin: "0.5rem 0",
      //           backgroundColor: "#f2eef2",
      //           border: "1px solid none",
      //           color: "white",
      //         }}
      //       />
      //     </Container>
      //   </Container>
       
      //   <Container sx={{ display: "flex",flexDirection:'column' }}>
      //     <Container sx={{ display: "flex" }}>
      //       <FormatListNumberedIcon
      //         sx={{ color: "#7f6ca8", paddingTop: "10px" }}
      //       />
      //       <InputLabel
      //         htmlFor="pcNo"
      //         sx={{ color: "white", fontSize: "22px", padding: "10px",width:'250px' }}
      //       >
      //        Pc Number
      //         {!certificateData.pcNo && (
      //           <span
      //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
      //           >
      //             *
      //           </span>
      //         )}
      //       </InputLabel>
      //     </Container>
      //     <Container>
      //       <TextField
      //         id="pcNo"
      //         type="text"
      //         // label="Roll Number"
      //         name="pcNo"
      //         placeholder="pcNo"
      //         value={certificateData.pcNo}
      //         onChange={handleChange}
      //         sx={{
      //           margin: "0.5rem 0",
      //           backgroundColor: "#f2eef2",
      //           border: "1px solid none",
      //           color: "white",
      //         }}
      //       />
      //     </Container>
      //   </Container>
      //   <Container sx={{ display: "flex",flexDirection:'column' }}>
      //     <Container sx={{ display: "flex" }} className="">
      //       <FormatListNumberedIcon
      //         sx={{ color: "#7f6ca8", paddingTop: "10px" }}
      //       />
      //       <InputLabel
      //         htmlFor="hallTicketNo"
      //         sx={{ color: "white", fontSize: "22px", padding: "10px",width:'250px' }}
      //       >
      //         HallTicket No
      //         {!certificateData.hallTicketNo && (
      //           <span
      //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
      //           >
      //             *
      //           </span>
      //         )}
      //       </InputLabel>
      //     </Container>
      //     <Container>
      //       <TextField
      //         id="hallTicketNo"
      //         type="text"
      //         // label="name"
      //         name="hallTicketNo"
      //         placeholder="hallTicketNo"
      //         value={certificateData.hallTicketNo}
      //         onChange={handleChange}
      //         sx={{
      //           margin: "0.5rem 0",
      //           backgroundColor: "#f2eef2",
      //           border: "1px solid none",
      //           color: "white",
      //         }}
      //       />
      //     </Container>
      //   </Container>
      //   <Container sx={{ display: "flex",flexDirection:'column' }}>
      //     <Container sx={{ display: "flex" }} className="">
      //       <EmailIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
      //       <InputLabel
      //         htmlFor="adharNo"
      //         sx={{ color: "white", fontSize: "22px", padding: "10px",width:'250px' }}
      //       >
      //        Adhaar Number
      //         {!certificateData.adharNo && (
      //           <span
      //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
      //           >
      //             *
      //           </span>
      //         )}
      //       </InputLabel>
      //     </Container>
      //     <Container>
      //       <TextField
      //         id="adharNo"
      //         type="text"
      //         // label="Email"
      //         name="adharNo"
      //         placeholder="adharNo"
      //         value={certificateData.adharNo}
      //         onChange={handleChange}
      //         sx={{
      //           margin: "0.5rem 0",
      //           backgroundColor: "#f2eef2",
      //           border: "1px solid none",
      //           color: "white",
      //         }}
      //       />
      //     </Container>
      //   </Container>
      //   <Container sx={{ display: "flex",flexDirection:'column' }}>
      //     <Container sx={{ display: "flex" }} className="">
      //       <LibraryBooksIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
      //       <InputLabel
      //         htmlFor="name"
      //         sx={{ color: "white", fontSize: "22px", padding: "10px",width:'250px' }}
      //       >
      //         Name
      //         {!certificateData.name && (
      //           <span
      //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
      //           >
      //             *
      //           </span>
      //         )}
      //       </InputLabel>
      //     </Container>
      //     <Container>
      //       <TextField
      //         id="name"
      //         type="text"
      //         // label="course"
      //         name="name"
      //         placeholder="name"
      //         value={certificateData.name}
      //         onChange={handleChange}
      //         sx={{
      //           margin: "0.5rem 0",
      //           backgroundColor: "#f2eef2",
      //           border: "1px solid none",
      //           color: "white",
      //         }}
      //       />
      //     </Container>
      //   </Container>
      //   <Container sx={{ display: "flex",flexDirection:'column' }}>
      //     <Container sx={{ display: "flex" }} className="">
      //       <SchoolIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
      //       <InputLabel
      //         htmlFor="fatherName"
      //         sx={{ color: "white", fontSize: "22px", padding: "10px",width:'250px' }}
      //       >
      //        Father's Name
      //         {!certificateData.fatherName && (
      //           <span
      //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
      //           >
      //             *
      //           </span>
      //         )}
      //       </InputLabel>
      //     </Container>
      //     <Container>
      //       <TextField
      //         id="fatherName"
      //         type="text"
      //         // label="Collage Name"
      //         name="fatherName"
      //         placeholder="fatherName"
      //         value={certificateData.fatherName}
      //         onChange={handleChange}
      //         sx={{
      //           margin: "0.5rem 0",
      //           backgroundColor: "#f2eef2",
      //           border: "1px solid none",
      //         }}
      //       />
      //     </Container>
      //   </Container>
      //   <Container sx={{ display: "flex",flexDirection:'column' }}>
      //     <Container sx={{ display: "flex" }} className="">
      //       <TodayIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
      //       <InputLabel
      //         htmlFor="email"
      //         sx={{ color: "white", fontSize: "22px", padding: "10px",width:'250px' }}
      //       >
      //        Email
      //         {!certificateData.email && (
      //           <span
      //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
      //           >
      //             {" "}
      //             *
      //           </span>
      //         )}
      //       </InputLabel>
      //     </Container>
      //     <Container>
      //       <TextField
      //         id="email"
      //         type="email"
      //         // label="Year of passed out"
      //         name="email"
      //         placeholder="email"
      //         value={certificateData.email}
      //         onChange={handleChange}
      //         sx={{
      //           margin: "0.5rem 0",
      //           backgroundColor: "#f2eef2",
      //           border: "1px solid none",
      //         }}
      //       />
      //     </Container>
      //   </Container>
      //   <Container sx={{ display: "flex",flexDirection:'column' }}>
      //     <Container sx={{ display: "flex" }} className="">
      //       <TodayIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
      //       <InputLabel
      //         htmlFor="course"
      //         sx={{ color: "white", fontSize: "22px", padding: "10px" ,width:'250px'}}
      //       >
      //         Course
      //         {!certificateData.course && (
      //           <span
      //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
      //           >
      //             {" "}
      //             *
      //           </span>
      //         )}
      //       </InputLabel>
      //     </Container>
      //     <Container>
      //       <TextField
      //         id="course"
      //         type="text"
      //         // label="Year of passed out"
      //         name="course"
      //         placeholder="course"
      //         value={certificateData.course}
      //         onChange={handleChange}
      //         sx={{
      //           margin: "0.5rem 0",
      //           backgroundColor: "#f2eef2",
      //           border: "1px solid none",
      //         }}
      //       />
      //     </Container>
      //   </Container>
      //   <Container sx={{ display: "flex",flexDirection:'column' }}>
      //     <Container sx={{ display: "flex" }} className="">
      //       {/* <TodayIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} /> */}
      //       <InputLabel
      //         htmlFor="institutionName"
      //         sx={{ color: "white", fontSize: "22px", padding: "10px",width:'270px' }}
      //       >
      //           Institution Name
      //         {!certificateData.institutionName && (
      //           <span
      //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
      //           >
      //             {" "}
      //             *
      //           </span>
      //         )}
      //       </InputLabel>
      //     </Container>

      //     <Container>
      //     <Select
      //     // label="Type"
      //     id="institutionName"
      //     name="institutionName"
      //     value={certificateData.institutionName}
      //     onChange={handleChange}
      //     // variant="outlined"
      //     sx={{
      //       margin: "0.5rem 0",
      //       width: "500px",
      //       backgroundColor: "#f2eef2",
      //       border: "1px solid none",
      //       width:'210px'
      //       ,width:'230px'
      //     }}
      //   >
      //     <MenuItem value="jntu">JNTU</MenuItem>
      //     <MenuItem value="ou">OU</MenuItem>
      //     <MenuItem value="kits">Kits</MenuItem>
      //   </Select>
      // </Container>


      //     {/* <Container>
      //       <TextField
      //         id="institutionName"
      //         type="text"
      //         // label="Year of passed out"
      //         name="institutionName"
      //         placeholder="institutionNamer"
      //         value={studentData.institutionName}
      //         onChange={handleChange}
      //         sx={{
      //           margin: "0.5rem 0",
      //           backgroundColor: "#f2eef2",
      //           border: "1px solid none",
      //         }}
      //       />
      //     </Container> */}
      //   </Container>
      //   <Container sx={{ display: "flex",flexDirection:'column' }}>
      //     <Container sx={{ display: "flex" }} className="">
      //       <TodayIcon sx={{ color: "#7f6ca8", paddingTop: "10px" }} />
      //       <InputLabel
      //         htmlFor="passedOutYear"
      //         sx={{ color: "white", fontSize: "22px", padding: "10px" ,width:'250px'}}
      //       >
      //         Year of passed out
      //         {!certificateData.passedOutYear && (
      //           <span
      //             style={{ color: "red", marginLeft: "", fontSize: "30px" }}
      //           >
      //             {" "}
      //             *
      //           </span>
      //         )}
      //       </InputLabel>
      //     </Container>
      //     <Container>
      //     {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
      //       <TextField
      //         id="passedOutYear"
      //         type="date"
      //         // label="Year of passed out"
      //         name="passedOutYear"
      //         placeholder="passedOutYear"
      //         value={certificateData.passedOutYear}
      //         onChange={handleChange}
      //         sx={{
      //           margin: "0.5rem 0",
      //           backgroundColor: "#f2eef2",
      //           border: "1px solid none",
      //           width:'230px'
      //         }}
      //       />
      //        {/* </LocalizationProvider> */}
      //     </Container>
      //   </Container>
      //   </Container>
      //   <Container sx={{ display: "flex", justifyContent: "" }}>
      //     <Button
      //       type="submit"
      //       variant="contained"
      //       sx={{
      //         backgroundColor: "rgba(210,0,210,0.3)",
      //         "&:hover": { backgroundColor: "rgba(125,125,125,0.9)" },
      //         borderRadius: "0px",
      //         marginTop: "20px",
      //         padding: "8px",
      //         marginLeft: "24px",
      //         width: "100px",
      //       }}
      //     >
      //       Create
      //     </Button>{" "}
      //     <p style={{ color: "red", marginLeft: "10px" }}>{errmsg}</p>
      //   </Container>
      // </form>
      )}
      {msg && (
        <div style={{ backgroundColor: "", padding: "40px" }}>
          <p style={{ color: "white" }}>
            {" "}
            Your Cerificate has been successfully created and send to your mail{" "}
            <span style={{ color: "#D67BFF" }}>{mail}.</span> Please check your
            mail.
          </p>
        </div>
      )}
    </div>
  );
};

export default Create;