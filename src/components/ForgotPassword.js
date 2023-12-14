// ForgotPassword.jsx
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const ForgotPassword = ({ onForgot, handleForgotPassword }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the function passed from the parent component to handle the "Forgot Password" logic
    handleForgotPassword(email);
  };

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: '1rem', color: 'white' }}>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '1rem' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Send Reset Email
        </Button>
      </form>
      <Button variant="text" color="primary" onClick={onForgot} sx={{ marginTop: '1rem' }}>
        Back to Sign In
      </Button>
    </div>
  );
};

export default ForgotPassword;
