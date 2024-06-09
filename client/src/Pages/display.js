import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Comment from "../component/comment.js";

const Display = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try{
      const response = await axios.get(`https://madstuffs-backend.onrender.com/geteach/${id}`, {
        withCredentials: true,
      });

      setDetails(response.data);
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Typography variant="h5" component="h2">
        Loading...
      </Typography>
    );
  }

  return (
    <div>
      {Object.keys(details).length > 0 ? (
        <div key={id}>
          <Card sx={{ maxWidth: "100%", maxHeight: "100%" }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={`https://madstuffs-backend.onrender.com/uploads/${details.image_name}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <div dangerouslySetInnerHTML={{ __html: details.title }}></div>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <div
                  dangerouslySetInnerHTML={{ __html: details.content }}
                ></div>
              </Typography>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>
          <p>Loading</p>
        </div>
      )}

      <Comment />
    </div>
  );
};
export default Display;
