import React, { useEffect, useState,useRef } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const SinglePost = () => {

  const [title,setTitle]=useState("")
  const [content,setContent]=useState("")
  const [author,setAuthor]=useState("")
  const navigate=useNavigate()

  useEffect(()=>{

         async function func(){
                await axios.get("https://madstuffs-backend.onrender.com/getuser",{
                       withCredentials:true
                }).then(response=>{
                  setAuthor(response.data)
                  
                })
         }
         func()

  },[])

  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  const handleCancel=(event)=>{
    event.preventDefault()

    navigate('/')
  }

  const handleSubmit=async(event)=>{
    event.preventDefault()

    console.log(author)

    const details={
      title:title,
      content:content,
      author:author
    }

    await axios.post("https://madstuffs-backend.onrender.com/newpost",details,{
      withCredentials:true
    });
    navigate('/')
    toast.success("Post created successfully")

  }
  
  const handleTextChange = (value) => {
    setContent(value);
  };


  return (
  <div>
  <Container  maxWidth="xl">
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow:5,
            padding:5
          }}
        >

          <Typography component="h1" variant="h5">
            New Post
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 ,width:'100%'}}>
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
                          style={{backgroundColor:"black"}}
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
                        style={{backgroundColor:"black"}}
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
  )
}

export default SinglePost
