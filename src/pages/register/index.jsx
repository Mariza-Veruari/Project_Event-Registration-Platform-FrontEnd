import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {
          m: 1,
        },
      }}
      onSubmit={(e) => {
        e.preventDefault();
        axios
          .post("/user/register", {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
          })
          .then((res) => {
            if (res) {
              alert("User registered successfully");
              navigate("/login");
            }
          });
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField required id="name" label="Name" name="name" />
        <TextField required id="email" label="Email" name="email" />
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          name="password"
          autoComplete="password"
        />
        <Button type="submit">Register</Button>
        <div>or</div>
        <Button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
      </div>
    </Box>
  );
}
