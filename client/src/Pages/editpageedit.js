import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cover from "../assets/cricket.png";
import ReactQuill from "react-quill";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LogContext } from "../component/logcontext.js";

const EditPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { logged } = useContext(LogContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      navigate("/");
    }
  }, []);

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

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:4100/geteach/${id}`, {
        withCredentials: true,
      });

      setDetails(response.data);
      setContent(response.data.content);
      setTitle(response.data.title);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const updatedDetails = {
      id: id,
      title: title,
      content: content,
    };
    await axios
      .put("http://localhost:4100/updatepost", updatedDetails)
      .then((response) => {
        toast.success(response.data.message);
      });
  };

  const handleClick = (event) => {
    event.preventDefault();
    navigate("/editpage");
  };

  return (
    <div>
      {Object.keys(details).length > 0 ? (
        <div key={id}>
          <form
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <Card sx={{ maxWidth: "100%", maxHeight: "100%" }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={cover}
              />

              <CardContent>
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
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <ReactQuill
                    margin="normal"
                    required
                    fullWidth
                    name="content"
                    label="content"
                    id="content"
                    value={content}
                    onChange={setContent}
                  />
                )}
              </CardContent>
              <Box sx={{ flexGrow: 1, paddingLeft: 10, paddingRight: 10 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      style={{ backgroundColor: "black" }}
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      style={{ backgroundColor: "black" }}
                      onClick={handleClick}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </form>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default EditPage;
