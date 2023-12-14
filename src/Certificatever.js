import {
  AppBar,
  Container,
  TextField,
  Typography,
  Button,
  Card,
  InputLabel,
} from "@mui/material";
import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import { scanFile } from "@openhealthnz-credentials/pdf-image-qr-scanner";

const Verify = () => {
  const [file, setFile] = useState("");
  const [resultText, setResultText] = useState("");
  const [result, setResult] = useState({
    id: "",
    serialNo: '',
    pcNo: '',
    hallTicketNo: '',
    adharNo: '',
    name: '',
    fatherName: '',
    email: '',
    course: '',
    institutionName: '',
    passedOutYear: ''
  });
  const handleChange = (e) => {
    // const [name,value]=e.target
    setFile(e.target.files[0]);
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    let result;
    try {
      const qrCode = await scanFile(file);
      const d = JSON.parse(qrCode);
      // It returns null if no QR code is found
      setResult(d);
      console.log(resultText);
      let verify;
      if (qrCode) {
        verify = fetch("http://localhost:5001/fileread", {
          method: "post",
          body: qrCode,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setFile({ file: "" });
            setResultText(data.message);
            console.log(data.message);
          })
          .catch((error) => {
            setResultText(error);
            console.error("Error:", error);
          });
      }
    } catch (error) {
      console.error(error);
      if (e?.name === "InvalidPDFException") {
        setResultText("Invalid PDF");
      } else if (e instanceof Event) {
        setResultText("Invalid Image");
      } else {
        console.log(e);
        setResultText("Unknown error");
      }
    }
    // window.location.href='/result'
  };

  return (
    <div
      style={{
        margin:'16rem',
        // backgroundColor: "rgba(0,0,0,0)",
        // color: "white",
        // width: "30vw",
        // marginTop: "2rem",
        // marginBottom: "2rem",
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "",
        // alignItems: "",
        // padding: "auto",
        // border: "",
      }}
    >
      {resultText !== "Verified" && (
        <form onSubmit={handlesubmit}>
          <div style={{ display: "flex" }}>
            <InputLabel sx={{ color: "white", fontSize: "28px" }}>
              Upload file
            </InputLabel>
            <CloudUploadIcon />
          </div>
          <input
            type="file"
            //  label={<CloudUploadIcon />}
            name="file"
            value={file.file}
            onChange={handleChange}
            style={{ margin: "0.5rem 0", color: "white" }}
          // placeholder='Upload file'
          />

          <Container
            sx={{
              display: "flex",
              flexDirection: "flex",
              justifyContent: "",
              margin: "20px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "rgba(210,0,210,0.3)",
                "&:hover": { backgroundColor: "rgba(125,125,125,0.9)" },
                borderRadius: "0px",
                marginTop: "20px",
                paddingTop: "10px",
              }}
            >
              Submit
            </Button>
          </Container>
        </form>
      )}

      {resultText == "Verified" && (
        <p style={{ color: "green", fontSize: "20px" }}>{resultText}</p>
      )}
      {resultText !== "Verified" && (
        <p style={{ color: "red" }}>{resultText}</p>
      )}
      {resultText == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          Name:<span style={{ marginLeft: "10px" }}></span>
          {result.name}
        </p>
      )}
      {resultText == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          PcNo:<span style={{ marginLeft: "10px" }}></span>
          {result.pcNo}
        </p>
      )}
      {resultText == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          SerialNo:
          <span style={{ marginLeft: "10px" }}>{result.serialNo}</span>
        </p>
      )}
      {resultText == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
       Hall Ticket Number:
          <span style={{ marginLeft: "10px" }}>{result.hallTicketNo}</span>
        </p>
      )}
      {resultText == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
       Adhar Number:
          <span style={{ marginLeft: "10px" }}>{result.adharNo}</span>
        </p>
      )}
      {resultText == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
       Father Name:
          <span style={{ marginLeft: "10px" }}>{result.fatherName}</span>
        </p>
      )}
      {resultText == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          Email:<span style={{ marginLeft: "10px" }}>{result.email}</span>
        </p>
      )}
      {resultText == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          Course:<span style={{ marginLeft: "10px" }}>{result.course}</span>
        </p>
      )}
      {resultText == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          Passed out Year:
          <span style={{ marginLeft: "10px" }}>{result.passedOutYear}</span>
        </p>
      )}
      {resultText == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
       Institution Name:
          <span style={{ marginLeft: "10px" }}>{result.institutionName}</span>
        </p>
      )}
      {resultText == "Verified" && (
        <p className="textField" style={{ color: "white", fontSize: "18px" }}>
          Certificate Id:<span style={{ marginLeft: "10px" }}>{result.id}</span>
        </p>
      )}
    </div>
  );
};

export default Verify;
