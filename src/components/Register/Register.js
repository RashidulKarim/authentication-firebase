import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Axios from 'axios';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}      
      All Right Reserved By Rashidul Karim.
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [userImg, setUserImg] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [name, setName] = useState('')
  const [imgStatusWait, setImgStatusWait] = useState('')
  const [imgStatusDone, setImgStatusDone] = useState('')
  const [varifyEmail, setVarifyEmail] = useState('')
  const [varifyPassword, setVarifyPassword] = useState('')
  
  const auth = getAuth();



  const getEmail = (e) => {
    const email = e.target.value;
    const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const testedEmail = emailRegx.test(email)
    if(testedEmail){
      setEmail(testedEmail)
      setVarifyEmail('')
    }else{
      setVarifyEmail("Please input a valid email")
    } 
  }
  const getPassord = e => {
    const password = e.target.value;
    const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const testedPassword = passwordRegx.test(password)
    if(testedPassword){
      setPassword(testedPassword)
      setVarifyPassword('')
    }else{
      setVarifyPassword("Password must contain minimum eight characters, at least one letter and one number:")
    } 
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    email && password && name && userImg ? createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user
      setUser(user)
      document.getElementById("email").value = '';
      document.getElementById("password").value = ''; 
      document.getElementById("name").value = ''; 
      setSuccessMessage("Your Create Successfully.")
      setErrMessage("");
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: userImg
      }).then(() => {
        // Profile updated!
        // ...
        
      }).catch((error) => {
        // An error occurred
        // ...
      });
      
    }).catch((error) => {
      const errorMessage = error.message;
      setErrMessage(errorMessage);
      setSuccessMessage('')
      
      // ..
    }): alert("Please fill all the input field and upload a image.") 
   
    
  };

  const getName = (e) => {
    setName(e.target.value)
  }

  const selectedFile = e => {
    const file = new FormData();
    file.append("image",(e.target.files[0]),(e.target.files[0]).name );
    setImgStatusWait("Please Wait Your Image is Uploading")
    setImgStatusDone("")
    Axios.post(`https://api.imgbb.com/1/upload?key=571f6ef43e53c793167ddb2a958d51aa`, file)
    .then(res => {
      setUserImg(res.data.data.url)
      setImgStatusWait("")
      setImgStatusDone("Your Image is uploaded successfully.")
    })
    
    
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3}}>
          <Grid item xs={12} sx={{ mb: 2}}>
                <TextField
                onBlur={getName}
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 1}}>
                <TextField
                  onBlur={getEmail}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              {
                varifyEmail && <small style={{margin: "5px", padding: 0, color: "red", display: "block"}}>{varifyEmail}</small>
              }
              <Grid item xs={12}>
                <TextField
                  onBlur={getPassord}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {
                varifyPassword && <small style={{margin: "5px", padding: 0, color: "red", display: "block"}}>{varifyPassword}</small>
              }
              <Grid item xs={12} sx={{ mb: 2, mt:2}} >
                <label htmlFor="image">Image: </label>
              <input onChange={selectedFile} type="file" name="image" id="" />
                </Grid>
              {
                imgStatusWait && <small style={{color: "red"}}>{imgStatusWait}</small>
              }
              {
                imgStatusDone && <small  style={{color: "green"}}>{imgStatusDone}</small>
              }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
          {
            errMessage && <p style={{color: "red", textAlign:'center'}}>{errMessage}</p>
          }
          {
            successMessage && <p style={{color: "green", textAlign:'center'}}>{successMessage}</p>
          }
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}