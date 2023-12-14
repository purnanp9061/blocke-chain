// Signin.jsx
import React, { useState } from 'react';
import { Card, TextField, Typography, Button, MenuItem, Select, InputLabel } from '@mui/material';
import ForgotPassword from './ForgotPassword';

const Signin = () => {
  const [admin, setAdmin] = useState({
    loginmail: '',
    loginpassword: '',
    logintype: '',
  });
  const [users, setUsers] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({
      ...admin,
      [name]: value,
    });
  };

  const handleForgotPassword = async (email) => {
    try {
      console.log('Before fetch');
      const response = await fetch('http://localhost:5001/api/signin', {
        method: 'post',
        body: JSON.stringify({
          loginmail: email,
          forgotPassword: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('After fetch');

      const data = await response.json();
      console.log(data);
      // console.log(data);

      // Handle the response from the server
      if (response.ok) {
        console.log('Password recovery email sent successfully.');
        // Optionally, show a success message to the user
      } else {
        console.error('Failed to send password recovery email:', data.error || data.message);
        // Optionally, show an error message to the user
      }


      // Handle the response from the server, e.g., show a success message or handle errors
    } catch (error) {
      console.error('Error during forgot password:', error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await fetch('http://localhost:5001/api/signin', {
        method: 'post',
        body: JSON.stringify(admin),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await result.json();
      

      setAdmin({
        loginmail: '',
        loginpassword: '',
        logintype: '',
      });

      if (data.message === 'Log In successful') {
        localStorage.setItem('Admin', JSON.stringify(admin));
        window.location.href = `/${admin.logintype}`;
      }

      setUsers(data.message);
    } catch (error) {
      console.error('Error during sign in:', error);
      setUsers(error.message);
    }
  };

  return (
    <Card sx={{ paddingLeft: '80px', /* ... other styles ... */ }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" sx={{ margin: '0.5rem 0', color: 'white' }}>
          Sign In
        </Typography>
        <TextField
          variant="outlined"
          type="email"
          name="loginmail"
          value={admin.loginmail}
          onChange={handleChange}
          sx={{ margin: '0.5rem 0', width: '500px', backgroundColor: '#f2eef2', border: '1px solid none' }}
        />
        <TextField
          type="password"
          name="loginpassword"
          value={admin.loginpassword}
          onChange={handleChange}
          sx={{ margin: '0.5rem 0', width: '500px', backgroundColor: '#f2eef2', border: '1px solid none' }}
        />
        <Select
          name="logintype"
          value={admin.logintype}
          onChange={handleChange}
          variant="outlined"
          sx={{
            margin: '0.5rem 0',
            width: '500px',
            backgroundColor: '#f2eef2',
            border: '1px solid none',
            borderRadius: '0px',
          }}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="student">Student</MenuItem>
        </Select>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: 'rgba(210,0,210,0.3)',
            '&:hover': { backgroundColor: 'rgba(125,125,125,0.9)' },
            borderRadius: '0px',
            marginTop: '20px',
            paddingTop: '10px',
          }}
        >
          Sign In
        </Button>
        <p style={{ color: 'red', fontSize: '20px', fontWeight: '500' }}>{users}</p>
      </form>
      {!showForgotPassword ? (
        <Button variant="text" color="primary" onClick={() => setShowForgotPassword(true)} sx={{ marginTop: '10px' }}>
          Forgot Password
        </Button>
      ) : (
        <ForgotPassword onForgot={() => setShowForgotPassword(false)} handleForgotPassword={handleForgotPassword} />
      )}
    </Card>
  );  
};

export default Signin;
