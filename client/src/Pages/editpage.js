import React from "react";
import EditPagePost from "../component/editposttemp.js";
import { Container, Typography } from "@mui/material";

const EditPage = () => {
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
            My Posts
          </Typography>
          <br></br>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <EditPagePost />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditPage;
