import React, { useState } from "react";
import { TextField, Button, Grid, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../assets/login.gif";
import "./SignUp.css";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("admin"); // State to manage the selected role (admin or enseignant)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "";

      // Determine the URL based on the selected role
      if (role === "admin") {
        url = "http://localhost:3000/login";
      } else if (role === "enseignant") {
        url = "http://localhost:3000/enseignants/login";
      }

      const response = await axios.post(url, {
        email: email,
        password: password,
      });

      console.log("test", response.data);
      
      // Redirect to the appropriate page based on the selected role
      if (role === "admin") {
        navigate("/Home");
      } else if (role === "enseignant") {
        navigate("/etudiantsProgression");
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      setError("email ou mot de passe incorrect!");
    }
  };

  return (
    <div className="signup-container">
      <div className="centered-rectangle">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="signup" style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#43a047", textShadow: "1px 1px 2px rgba(0,0,0,1.5)", letterSpacing: "1px", textDecoration: "none", marginLeft: 0 }}>
            Se connecter
          </h2>
          <br />
          <span className="caption" style={{marginLeft: 0 }}  >
            Bienvenue dans notre plateforme.
          </span>
          <div className="space"></div>
          {/* Radio buttons for selecting role */}
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel value="admin" control={<Radio />} label="En tant qu'Admin" />
              <FormControlLabel value="enseignant" control={<Radio />} label="En tant qu'Enseignant" />
            </RadioGroup>
          </FormControl>
          <Grid container spacing={4}>
            <Grid item xs={10} style={{ marginLeft: 50 }}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                type="email"
                required
              />
            </Grid>
            <Grid item xs={10} style={{ marginLeft: 50 }}>
              <TextField
                label="Mot de Passe"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                type="password"
                required
              />
            </Grid>

            <Grid item xs={12} style={{ textAlign: "center", marginRight: 20 }}>
              {error && <span style={{ color: "red" }}>{error}</span>}
              <br />
              <br />
              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "#43a047", color: "#ffffff" }}
              >
                Se connecter
              </Button>
            </Grid>
          </Grid>
        </form>
        <img src={image} alt="Doctors" className="signup-image" />
      </div>
    </div>
  );
}

export default SignIn;
