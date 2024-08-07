import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        MadStuffs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (emailRegex.test(email) && passwordRegex.test(pass)) {
      const details = {
        username: userName,
        email: email,
        password: pass,
      };

      await axios
        .post("https://mad-stuffs-uc64.vercel.app/signup", details, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.status) {
            toast.success("Account Created Successfully");
          }
        });

      navigate("/login");
    } else {
      if (!emailRegex.test(email) && !passwordRegex.test(pass)) {
        toast.success("Email and password format is not proper");
      } else if (!passwordRegex.test(pass)) {
        toast.success(
          "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)."
        );
      } else if (!emailRegex.test(email)) {
        toast.success(
          "Please enter a valid email address. It should be in the format of name@domain.com and not contain any spaces or special characters except for '@' and '."
        );
      }
    }
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 5,
            padding: 5,
          }}
        >
          <Typography component="h1" variant="h5">
            SIGN UP
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="off"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  aria-describedby="invalid_format"
                  autoFocus
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "black" }}
            >
              Subscribe
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
}
