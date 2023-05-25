import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import DisplayComments from "../component/displaycomments.js";

const Comment = () => {
    const {id}=useParams()
    const [comment,setComment]=useState("")
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")

    const handleSubmit=async(event)=>{
        event.preventDefault()
        const commentDetails={
            name:name,
            email:email,
            comment:comment
        }
        await axios.post(`http://localhost:4100/enter/comments/${id}`,commentDetails)
        console.log("test")
    }

  return (
    <div>
     <Container  maxWidth="100%">
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            boxShadow:5,
            padding:5
          }}
        >

          <Typography component="h1" variant="h5">
            Leave a Reply
         </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>          
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  id="comment"
                  label="Type your comments"
                  name="comment"
                  type='text'
                  value={comment}
                  onChange={(e)=>setComment(e.target.value)}
                />
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={2}>          
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  multiline
                  id="name"
                  label="Name"
                  name="name"
                  type='text'
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  multiline
                  id="Email"
                  label="Email"
                  name="Email"
                  type='email'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:"black"}}
            >
              Send
            </Button>
          </Box>
          <hr></hr>
          <DisplayComments/>
        </Box>

      </Container>

    </div>
  )
}

export default Comment
