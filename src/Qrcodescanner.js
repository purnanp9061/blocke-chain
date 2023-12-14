import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import "./App.css";
const Webscanner = () => {
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
  const [errormsg, setErrormsg] = useState("");
  const [msg, setMsg] = useState("");
  const [showScanner, setShowScanner] = useState(true);
  const handleScan = async (data) => {
    if (data) {
      const d = JSON.parse(data.text);
      setResult(d);
      setShowScanner(false);
      let verify = fetch(
        "http://localhost:5001/qrscan",
        await {
          method: "post",
          body: JSON.stringify({ text: data.text }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setErrormsg(data.message);
        })
        .catch((error) => {
          setMsg(error);
        });
    }
  };

  const handleError = (err) => {
    console.error(err);
    setMsg(err);
  };

  return (
    <div style={{ textAlign: "", marginTop: "50px" }}>
      {showScanner && (
        <QrScanner
          onScan={handleScan}
          onError={handleError}
          style={{ width: "50%" }}
        />
      )}
      {!showScanner && errormsg && (
        <p
          style={{
            color: errormsg == "Verified" ? "green" : "red",
            fontSize: "20px",
          }}
        >
          {errormsg}
        </p>
      )}
      {errormsg == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          Name:<span style={{ marginLeft: "10px" }}></span>
          {result.name}
        </p>
      )}
      {errormsg == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          pc No.:<span style={{ marginLeft: "10px" }}></span>
          {result.pcNo}
        </p>
      )}
      {errormsg == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          Serial No:
          <span style={{ marginLeft: "10px" }}>{result.serialNo}</span>
        </p>
      )}
      {errormsg == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          HallTicket No:
          <span style={{ marginLeft: "10px" }}>{result.hallTicketNo}</span>
        </p>
      )}
      {errormsg == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          Adhar Number
          <span style={{ marginLeft: "10px" }}>{result.adharNo}</span>
        </p>
      )}
      {errormsg == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          Father Name:<span style={{ marginLeft: "10px" }}>{result.fatherName}</span>
        </p>
      )}
      {errormsg == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          Email:<span style={{ marginLeft: "10px" }}>{result.email}</span>
        </p>
      )}
      {errormsg == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          Course:<span style={{ marginLeft: "10px" }}>{result.course}</span>
        </p>
      )}
      {errormsg == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          Passed Out Year:
          <span style={{ marginLeft: "10px" }}>{result.passedOutYear}</span>
        </p>
      )}
      {errormsg == "Verified" && (
        <p style={{ color: "white", fontSize: "18px" }}>
          Institution Name:
          <span style={{ marginLeft: "10px" }}>{result.institutionName}</span>
        </p>
      )}
      {errormsg == "Verified" && (
        <p className="textField" style={{ color: "white", fontSize: "18px" }}>
          Certificate Id:<span style={{ marginLeft: "10px" }}>{result.id}</span>
        </p>
      )}
    </div>
  );
};

export default Webscanner;
