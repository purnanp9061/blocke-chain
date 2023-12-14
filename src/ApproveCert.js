import { useState, useEffect } from "react";
// import React, { useState } from "react";
import {
    Button,
    Container,
    InputLabel,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import * as XLSX from "xlsx";

const Approve = () => {
    const [certificateData, setCertificateData] = useState([]);
    const [msg, setMsg] = useState("");
    const [mail, setMail] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [studentList, setStudents] = useState([]);
    const [sendMail, setSendMail] = useState();
    const [value, setValue] = React.useState('1');
    const [userId, setUserId] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [rejectedCertificates, setRejectedCertificates] = useState([]);
    const [message, setMessage] = useState('');

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };
    // { serialNo: '', pcNo: '', hallTicketNo: '', adharNo: '', name: '', fatherName: '', email: '', course: '', institutionName: '', passedOutYear: '' }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5001/getStudents");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setStudents(data);
                setSendMail(data.email)
            } catch (error) {
                console.error("Error fetching student data:", error);
                setErrMsg("Error fetching student data");
            }
        };

        fetchData();
    }, []);
    const sentCertificate = async () => {
        // let result2= await fetch('http://localhost:5001/approve',{


        // try {
        //     const response = await fetch('http://localhost:5001/approve');

        //     if (!response.ok) {
        //         throw new Error(`HTTP error! Status: ${response.status}`);
        //     }

        //     const data = await response.json();
        //     setStudents(data);
        // } catch (error) {
        //     console.error('Error fetching student data:', error);
        //     setErrMsg('Error fetching student data');
        // }
        // 

    }

    // const Reject = async (email, cert) =>{
    //     let response1 = await fetch('http://localhost:5001/reject', {
    //         method: 'post',
    //         body: JSON.stringify({ email ,status: 'Rejected'}), // Send the email as part of the request body
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data.message)
    //             setRejectedCertificates((prevRejected) => [...prevRejected, cert]);
    //             console.log("Rejected Certificates:", rejectedCertificates);
    //             setStudents((prevStudents) => prevStudents.filter(student => student.email !== email));
    //         })

    //     .catch ((error) =>{
    //         console.error('Error:', error.message);

    // })
    // }



    const Reject = async (userId, email, cert) => {
        try {
          // Step 1: Update status
          const updateStatusResponse = await fetch(`http://localhost:5001/update-status/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, status: 'Reject' }),
          });
      
          if (!updateStatusResponse.ok) {
            throw new Error(`HTTP error! Status: ${updateStatusResponse.status}`);
          }
      
          const updateStatusData = await updateStatusResponse.json();
          console.log(updateStatusData.message);
      
          // Step 2: Handle the rest of your logic
          setRejectedCertificates((prevRejected) => [...prevRejected, cert]);
          setStudents((prevStudents) => prevStudents.filter(student => student.email !== email));
        } catch (error) {
          console.error('Error:', error.message);
          // Handle errors or update state accordingly
        }
      };
      

   


    








return (
    <>
        <Box sx={{ width: '100%', typography: 'body1', }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', color: 'white' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Initiative" value="1" sx={{ width: '650px', color: 'white', borderColor: 'white' ,}} />
                        <Tab label="Approved" value="2" sx={{ width: '650px', color: 'white', }} />
                        <Tab label="Rejected" value="3" sx={{ width: '650px', color: 'white', }} />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div
                        style={{
                            backgroundColor: "rgba(0,0,0,0)",
                            maxWidth: "",
                            margin: "",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "",
                            alignItems: "",
                            paddingBottom: "15px",
                            // textShadow: "4px 4px 8px  black",
                            // fontSize:"40px"

                        }}
                    >
                        <h1
                            style={{
                                textAlign: "",
                                color: "#FFF8C9",
                                marginLeft: "50px",
                                marginBottom: "50px",
                                fontFamily: "Helvetica",
                                textShadow: "4px 4px 8px  black",
                            }}
                        >
                            Approve Certificate
                        </h1>
                        <Container sx={{ display: "flex", maxWidth: "30%" }}>


                        </Container>

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <InputLabel
                                                htmlFor="serialNo"
                                                sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                            >
                                                Serial Number
                                            </InputLabel>

                                        </TableCell>

                                        <TableCell><InputLabel
                                            htmlFor="pcNO"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >
                                            Pc Number

                                        </InputLabel></TableCell>

                                        <TableCell><InputLabel
                                            htmlFor="hallTicketNo"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >
                                            HallTicket No

                                        </InputLabel></TableCell>

                                        <TableCell><InputLabel
                                            htmlFor="adharNo"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >
                                            Adhaar Number

                                        </InputLabel></TableCell>

                                        <TableCell><InputLabel
                                            htmlFor="name"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >
                                            Name

                                        </InputLabel></TableCell>

                                        <TableCell><InputLabel
                                            htmlFor="fatherName"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >
                                            Father's Name

                                        </InputLabel></TableCell>

                                        <TableCell><InputLabel
                                            htmlFor="email"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >

                                            Email


                                        </InputLabel></TableCell>

                                        <TableCell><InputLabel
                                            htmlFor="course"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >

                                            Course


                                        </InputLabel></TableCell>
                                        <TableCell><InputLabel
                                            htmlFor="institutionName"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >

                                            Institution Name


                                        </InputLabel></TableCell>
                                        <TableCell><InputLabel
                                            htmlFor="passedOutYear"
                                            sx={{ color: "white", fontSize: "14px", padding: "10px" }}
                                        >

                                            Year of passed out


                                        </InputLabel></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >

                                    {Array.isArray(studentList) && studentList.filter((cert) => cert.status === "Initiative")
                                        .map((cert, index) => (
                                            <TableRow key={index} >
                                                <TableCell style={{ color: "white" }}>{cert.serialNo}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.pcNo}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.hallTicketNo}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.adharNo}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.name}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.fatherName}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.email}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.course}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.institutionName}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.passedOutYear}</TableCell>
                                                <button onClick={() => sentCertificate(cert)} style={{ marginTop: "10px", backgroundColor: "green", fontSize: "15px", color: 'white', border: 'none', padding: '4px' }}> Approve</button>
                                                <button onClick={() => Reject(cert.email, cert)} style={{ marginleft: '10px', backgroundColor: "red", fontSize: "15px", color: 'white', border: 'none', padding: '4px' }}>Reject</button>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>


                        <p>{sendMail}</p>

                        {msg && (
                            <div style={{ backgroundColor: "", padding: "40px" }}>
                                <p style={{ color: "white" }}>
                                    Your Certificate has been successfully created and sent to your mail{" "}
                                    <span style={{ color: "#D67BFF" }}>{mail}.</span> Please check your
                                    mail.
                                </p>
                            </div>
                        )}
                    </div>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>

                <TabPanel value="3">
                    <div
                        style={{
                            backgroundColor: "rgba(0,0,0,0)",
                            maxWidth: "",
                            margin: "",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "",
                            alignItems: "",
                            paddingBottom: "15px",
                        }}
                    >
                        <h1
                            style={{
                                textAlign: "",
                                color: "#FFF8C9",
                                marginLeft: "50px",
                                marginBottom: "50px",
                                fontFamily: "Helvetica",
                            }}
                        >
                            Rejected Certificate
                        </h1>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <InputLabel
                                                htmlFor="serialNo"
                                                sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                            >
                                                Serial Number
                                            </InputLabel>

                                        </TableCell>

                                        <TableCell><InputLabel
                                            htmlFor="pcNO"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >
                                            Pc Number

                                        </InputLabel></TableCell>

                                        <TableCell><InputLabel
                                            htmlFor="hallTicketNo"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >
                                            HallTicket No

                                        </InputLabel></TableCell>

                                        <TableCell><InputLabel
                                            htmlFor="adharNo"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >
                                            Adhaar Number

                                        </InputLabel></TableCell>

                                        <TableCell><InputLabel
                                            htmlFor="name"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >
                                            Name

                                        </InputLabel></TableCell>

                                        <TableCell><InputLabel
                                            htmlFor="fatherName"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >
                                            Father's Name

                                        </InputLabel></TableCell>

                                        <TableCell><InputLabel
                                            htmlFor="email"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >

                                            Email


                                        </InputLabel></TableCell>

                                        <TableCell><InputLabel
                                            htmlFor="course"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >

                                            Course


                                        </InputLabel></TableCell>
                                        <TableCell><InputLabel
                                            htmlFor="institutionName"
                                            sx={{ color: "white", fontSize: "14px", padding: "5px" }}
                                        >

                                            Institution Name


                                        </InputLabel></TableCell>
                                        <TableCell><InputLabel
                                            htmlFor="passedOutYear"
                                            sx={{ color: "white", fontSize: "14px", padding: "10px" }}
                                        >

                                            Year of passed out


                                        </InputLabel></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Array.isArray(studentList) && studentList.filter((cert) => cert.status === "Reject")
                                        .map((cert, index) => (
                                            <TableRow key={index}>
                                                <TableCell style={{ color: "white" }}>{cert.serialNo}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.pcNo}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.hallTicketNo}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.adharNo}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.name}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.fatherName}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.email}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.course}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.institutionName}</TableCell>
                                                <TableCell style={{ color: "white" }}>{cert.passedOutYear}</TableCell>

                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* ... (additional content) */}
                    </div>
                </TabPanel>
            </TabContext>
        </Box>


    </>
);
}

export default Approve;
