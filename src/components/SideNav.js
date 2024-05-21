import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { Link } from "react-router-dom"; 

const drawerWidth = 250;

const SideNav = ({ newDemands }) => {
  const [selectedItem, setSelectedItem] = useState("dashboard");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderButton = (item, icon, text, to) => (
    <Button
      variant="contained"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: "20px",
        marginLeft: "20px",
        width: "80%",
        backgroundColor:
          selectedItem === item ? "#43a047" : "transparent",
        boxShadow:
          selectedItem === item
            ? "0px 3px 5px rgba(0, 0, 0, 0.2)"
            : "none",
      }}
      component={Link}
      to={to}
      onClick={() => handleItemClick(item)}
    >
      {icon && React.createElement(icon, { style: { marginRight: "10px", color: "#FFFFFF" } })}
      <Typography
        variant="body1"
        sx={{ color: "#FFFFFF", textTransform: "capitalize" }}
      >
        {text}
      </Typography>
      {newDemands && item === "Demandes" && <span style={{ marginLeft: "auto", color: "red" }}>•</span>}
    </Button>
  );

  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          height: "920px",
          marginTop: "20px",
          marginLeft: "20px",
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.85))",
          borderRadius: "15px",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
          color: "#FFFFFF",
          position: "relative",
        }}
      >
        <span style={{ color: "#a3d977",fontWeight:'bold' }}>Compo</span>
        <span style={{ color: "#43a047",fontWeight:'bold' }}>stage</span>
        <br />
        <div
          style={{
            width: "80%",
            height: "2px",
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            background:
              "linear-gradient(to right, transparent 0%, #FFFFFF 50%, transparent 100%)",
          }}
        />
        <br />
      </Typography>
      
      {renderButton("dashboard", DashboardIcon, "Dashboard", "/home")}
      {renderButton("Messages", MailOutlineIcon, "messages", "/messages")}
      {renderButton("Demandes",ChecklistRtlIcon,"Demandes","/request")}
      {renderButton("logout", LogoutIcon, "Logout", "/SignIn")}
    </Drawer>
  );
};

export default SideNav;
