import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SinglePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function func() {
      await axios
        .get("http://localhost:4100/getuser", {
          withCredentials: true,
        })
        .then((response) => {
          setAuthor(response.data);
        });
    }
    func();
  }, []);

  const handleCancel = (event) => {
    event.preventDefault();

    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const details = {
      title: title,
      content: content,
      author: author,
    };

    await axios
      .post("http://localhost:4100/newpost", details, {
        withCredentials: true,
      })
      .then((response) => {
        navigate("/");
        toast.success("Post created successfully");
      });
  };

  const handleTextChange = (value) => {
    setContent(value);
  };

  return (
    <div>
      <Container maxWidth="xl">
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
            New Post
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <ReactQuill
              margin="normal"
              required
              fullWidth
              name="content"
              label="content"
              id="content"
              value={content}
              onChange={handleTextChange}
            />

            {/* <input type="file" onChange={(e)=>setSelectedFile(e.target.files[0])} /> */}

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ backgroundColor: "black" }}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ backgroundColor: "black" }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default SinglePost;
