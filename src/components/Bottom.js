import React from 'react';
import '../App.css';
// import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const Footer = () => {
   return(
     <div>
      <ul style={{listStyle:'none',color:'#b2e83c'}}>
      <marquee behavior="scroll" direction="left"> <li>Copyright @ 2023 Mempage Technologies Pvt Ltd.</li></marquee>
      </ul>
     </div>
    )
} 

export default Footer;
