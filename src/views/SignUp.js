import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name,
        lastname: lastName,
        email,
        password,
      });

      console.log("Response from backend:", response.data);

      navigate("/Home");

      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError(""); 
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="centered-rectangle">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2
            className="signup"
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#43a047",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              letterSpacing: "1px",
              textDecoration: "none",
            }}
          >
            Get Started
          </h2>
          <br />
          <span className="caption">
            Make maintenance effortless. Sign up now and transform your
            operations!
          </span>
          <div className="space"></div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={6}>
              <TextField
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                type="password"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Confirm Password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                type="password"
                required
              />
            </Grid>
            {error && (
              <Grid item xs={12} style={{ textAlign: "center", color: "red" }}>
                {error}
              </Grid>
            )}
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <span>Already registered? Sign in to access your account.</span>
              <br />
              <br />
              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "#43a047", color: "#ffffff" }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default SignUp;