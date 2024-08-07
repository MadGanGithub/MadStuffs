import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import axios from "axios";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogContext } from "./logcontext";
import { SearchContext } from "./searchcontext.js";
import "./style.css";


function ActionAreaCard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchResults } = useContext(SearchContext);
  const { logged } = useContext(LogContext);

  useEffect(() => {
    async function func() {
      try{
      const response = await axios.get(
        `https://mad-stuffs-uc64.vercel.app/getdata?search=${searchResults}`,
        {
          withCredentials: true,
        }
      );
      setData(response.data);
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
    }
    func();
  }, [searchResults, logged]);

  if (loading) {
    return (
      <Typography variant="h5" component="h2">
        Loading...
      </Typography>
    );
  }

  return (
    <div>
      {data.length > 0 ? (
        data.map((each) => {
          return (
            <Link to={`/each/${each._id}`} style={{ textDecoration: "none" }}>
              <Box sx={{ mb: 5 }} key={each._id}>
                <Card sx={{ width: { xs: 400,sm: 800 }}} key={each._id}>
                  <CardActionArea key={each._id}>
                    <CardMedia component="img" height="150" image={`https://mad-stuffs-uc64.vercel.app/uploads/${each.image_name}`} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {each.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {each.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Link>
          );
        })
      ) : (
        <Typography variant="h5" component="h2">
          No Posts
        </Typography>
      )}
    </div>
  );
}

export default ActionAreaCard;
