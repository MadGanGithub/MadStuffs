import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DisplayComments = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchcomments() {
      try{
      const response = await axios.get(
        `https://mad-stuffs-uc64.vercel.app/getcomments/${id}`,
        {
          withCredentials: true,
        }
      );
      setDetails(response.data);
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
    }
    fetchcomments();
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
      <Box>
        <Typography component="h1" variant="h5">
          Comments: ({details.length})
        </Typography>
      </Box>
      {details.length > 0 ? (
        details.map((each) => {
          return (
            <Box>
              <hr></hr>
              <Grid>
                <Grid>
                  <Typography>
                    <b>{each.name}</b> says
                  </Typography>
                </Grid>
              </Grid>
              <br></br>
              <Typography style={{ paddingLeft: 100 }}>
                {each.comment}
              </Typography>
              <br></br>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Created At : {each.createdDate}</Typography>
                </Grid>
              </Grid>
            </Box>
          );
        })
      ) : (
        <div>No Comments</div>
      )}
    </div>
  );
};

export default DisplayComments;
