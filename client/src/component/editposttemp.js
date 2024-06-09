import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ActionAreaCard() {
  const [data, setData] = useState([]);
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

  useEffect(() => {
    async function func() {
      const response = await axios.get("http://localhost:4100/getdata", {
        withCredentials: true,
      });
      setData(response.data);
    }
    func();
  }, []);

  const handleDelete = async (post_id) => {
    await axios
      .delete(`http://localhost:4100/deletepost/${post_id}`)
      .then((response) => {
        toast.success("Deleted the post successfully");
        navigate("/");
      });
  };

  return (
    <div>
      {data.length > 0 ? (
        data.map((each) => {
          if (each.author == author) {
            return (
              <Box sx={{ mb: 5 }} key={each._id}>
                <Card sx={{ width: 800 }}>
                  <CardActionArea>
                    <Link
                      to={`/eachonly/${each._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <CardMedia component="img" height="150" image={`http://localhost:4100/uploads/${each.image_name}`} />

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {each.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {each.title}
                        </Typography>
                      </CardContent>
                    </Link>
                    <CardActions>
                      <Button onClick={() => handleDelete(each._id)}>
                        Delete
                      </Button>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Box>
            );
          }
        })
      ) : (
        <Typography variant="h5" component="h2">
          Loading...
        </Typography>
      )}
    </div>
  );
}

export default ActionAreaCard;
