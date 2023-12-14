// src/Sidebar.js

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const Sidebar = ({ isOpen, toggleDrawer }) => {
  return (
    <div
      anchor="left"
      open={isOpen}
      onClose={toggleDrawer(false)}
      style={{ backgroundColor: "rgba(0,0,0,0)" }}
    >
      <List>
        <ListItem button>
          <ListItemIcon>{/* Add an icon here */}</ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>{/* Add an icon here */}</ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>{/* Add an icon here */}</ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
