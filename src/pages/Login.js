import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ApprovalIcon from "@mui/icons-material/Approval";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { asyncStorageKeys, labels } from "../dictionary";
import { getRandomToken } from "../utils/getRandomToken";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigation = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const dataToStore = {
      email: data.get("email"),
      password: data.get("password"),
      token: getRandomToken(),
    };
    localStorage.setItem(asyncStorageKeys.login, JSON.stringify(dataToStore));
    navigation("/dashboard/task");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "blue" }}>
          <ApprovalIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {labels.login}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required={true}
            fullWidth={true}
            id="email"
            label="Email"
            name="email"
            autoFocus={true}
            
          />
          <TextField
            margin="normal"
            required={true}
            fullWidth={true}
            name="password"
            label="Password"
            type="password"
            id="password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {labels.login}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
