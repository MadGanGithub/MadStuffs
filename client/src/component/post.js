import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Box } from '@mui/system';
import cover from "../assets/cricket.png";
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { SearchContext } from './searchcontext.js';
import "./style.css"
import { useContext } from 'react';
import { LogContext } from './logcontext';


function ActionAreaCard(){

  const [data,setData]=useState([])
  const { searchResults } = useContext(SearchContext);
  const {logged}=useContext(LogContext)

  useEffect(()=>{ 
    console.log(logged)
         async function func(){
          console.log(logged)
         const response=await axios.get(`http://localhost:4100/getdata?search=${searchResults}`,{
         withCredentials:true
         }); 
         setData(response.data)
         }
         func()
         
  },[searchResults,logged])

  return (
    <div>
      {data.length > 0 ? (
        data.map((each)=>{
          return (
          <Link to={`/each/${each._id}`}>
            <Box sx={{mb:5}} key={each._id}> 
              <Card sx={{ width:800}} key={each._id} >

                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="150"
                    image={cover}
                    
                  />
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
          Loading...
        </Typography>
      )}
    </div>
  );
}

export default ActionAreaCard;