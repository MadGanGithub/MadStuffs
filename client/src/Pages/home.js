import React from "react";
import Post from "../component/post.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <div>
      <Container maxWidth="xl">
        <div
          style={{
            marginTop: "10%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 5,
            padding: 5,
          }}
        >
          <Typography component="h1" variant="h5">
            All Posts
          </Typography>
          <br></br>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Post />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
