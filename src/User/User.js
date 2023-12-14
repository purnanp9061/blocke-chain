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
// import Result from '../result/Result';
const User = () => {
  const handlesubmit = (e) => {
    e.preventDefault();
    window.location.href = "/result";
  };
  return (
    <Card
      sx={{
        backgroundColor: "white",
        maxWidth: 400,
        margin: "auto",
        marginTop: "2rem",
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h5" component="div">
        Certificate Verification
      </Typography>
      <div
        style={{
          height: "1px",
          width: "240px",
          backgroundColor: "gray",
          margin: "5px",
          marginBottom: "10px",
        }}
      ></div>
      <form onSubmit={handlesubmit}>
        <InputLabel>Upload file</InputLabel>
        <TextField
          type="file"
          label={<CloudUploadIcon />}
          name="file"
          value=""
          sx={{ margin: "0.5rem 0" }}
          placeholder="Upload file"
        />
        <Container
          sx={{
            display: "flex",
            flexDirection: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#4caf50",
              "&:hover": { backgroundColor: "#357a38" },
            }}
          >
            Submit
          </Button>
        </Container>
      </form>
    </Card>
  );
};

export default User;
