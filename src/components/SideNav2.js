import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom"; // Import Link from React Router
const drawerWidth = 250;

const SideNav = () => {
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
      component={Link} // Use Link component
      to={to} // Specify the 'to' prop with the destination route
      onClick={() => handleItemClick(item)}
    >
      {icon && React.createElement(icon, { style: { marginRight: "10px", color: "#FFFFFF" } })}
      <Typography
        variant="body1"
        sx={{ color: "#FFFFFF", textTransform: "capitalize" }}
      >
        {text}
      </Typography>
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
        <span style={{ color: "#43a047" }}>stage</span>
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
      
      {renderButton("dashboard", DashboardIcon, "accueil", "/etudiantsProgression")}
      {renderButton("logout", LogoutIcon, "Déconnecter", "/SignIn")}
    </Drawer>
  );
};

export default SideNav;
