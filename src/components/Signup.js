import React, { useState } from "react";
import {
  InputLabel,
  Card,
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmpassword:'',
    type: "",
    email: "",
  });
  const [errmsg, setErrmsg] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await fetch("http://localhost:5001/api/signup", {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            name: "",
            password: "",
            confirmpassword:"",
            type: "",
            email: "",
          });
          setErrmsg(data.message);
          console.log(data.message);
        })
        .catch((error) => {
          // alert(error)
          console.error("Error:", error);
          setErrmsg(error);
          console.log(errmsg);
        });
      localStorage.setItem("formData", JSON.stringify(formData));
      console.log("Form data submitted:", formData);
    } catch (error) {
      console.error(error);
    }
  };
  const res = async () => {
    try {
      let resul = await fetch("http://localhost:5001/", {
        method: "get",
      });
      console.log(resul);
      localStorage.setItem("formData", JSON.stringify(formData));
      console.log("Form data submitted:", formData);
    } catch (error) {
      console.error(error);
    }
  };
  const gologin = () => {
    window.location.href = "/signin";
  };
  return (
    <Card
      sx={{
        paddingLeft: "40px",
        maxWidth: "640px",
        maxHeight: "700px",
        paddingBottom: "10px",
        paddingTop: "60px",
        minHeight: "400px",
        borderRadius: "0px",
        backgroundColor: "rgba(0,0,0,0)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h4"
            align=""
            sx={{ margin: "0.5rem 0", color: "whitesmoke", marginLeft: "18px" }}
          >
            Sign Up
          </Typography>
          <Container>
            <InputLabel
              htmlFor="Name"
              sx={{ color: "#ffffff", fontSize: "18px" }}
            >
              Name
            </InputLabel>
            <TextField
              id="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{
                margin: "0.5rem 0",
                width: "500px",
                backgroundColor: "#f2eef2",
                border: "1px solid none",
              }}
            />
          </Container>
          <Container>
            <InputLabel
              htmlFor="email"
              sx={{ color: "#ffffff", fontSize: "18px" }}
            >
              Email
            </InputLabel>
            <TextField
              id="eml"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{
                margin: "0.5rem 0",
                width: "500px",
                backgroundColor: "#f2eef2",
                border: "1px solid none",
              }}
            />
          </Container>
          <Container>
            <InputLabel
              htmlFor="password"
              sx={{ color: "#ffffff", fontSize: "18px" }}
            >
              Password
            </InputLabel>
            <TextField
              type="password"
              id="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{
                margin: "0.5rem 0",
                width: "500px",
                backgroundColor: "#f2eef2",
                border: "1px solid none",
              }}
            />
          </Container>
          <Container>
            <InputLabel
              htmlFor="confirmpassword"
              sx={{ color: "#ffffff", fontSize: "18px" }}
            >
              *Confirm Password
            </InputLabel>
            <TextField
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              sx={{
                margin: "0.5rem 0",
                width: "500px",
                backgroundColor: "#f2eef2",
                border: "1px solid none",
              }}
            />
          </Container>
          <Container>
            <InputLabel
              htmlFor="Type"
              sx={{ color: "#ffffff", fontSize: "18px" }}
            >
              Type
            </InputLabel>
            <Select
              // label="Type"
              id="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              // variant="outlined"
              sx={{
                margin: "0.5rem 0",
                width: "500px",
                backgroundColor: "#f2eef2",
                border: "1px solid none",
              }}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </Container>

          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
            }}
          >
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
              Sign Up
            </Button>
          </Container>
        </Container>
      </form>
      <p
        style={{
          marginLeft: "40px",
          color: errmsg == "Fill the rquired fields" || "Password doesn't match" ? "red" : "green",
          fontSize: "20px",
          fontWeight: "500",
        }}
      >
        {errmsg}{" "}
        <span
          className="login"
          style={{
            display:
              errmsg == "You have register successfully, go to login page."
                ? "block"
                : "none",
          }}
          onClick={gologin}
        >
          Login
        </span>
      </p>
    </Card>
  );
};

export default SignUp;
