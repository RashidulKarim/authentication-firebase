import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
export default function SignIn(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = getAuth();

  const getEmail = (e) => {
    setEmail(e.target.value);
    
  }
  const getPassord = e => {
    setPassword(e.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("email").value = '';
    document.getElementById("password").value = '';
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user
      console.log(user);
      props.setUser(user)
      props.setError("");
      
    }).catch((error) => {
      const errorMessage = error.message;
      props.setError(errorMessage);
      
      // ..
    });
  };
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
            Sign in
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              onBlur={getEmail}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              onBlur={getPassord}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/resetPassword' style={{textDecoration:'none', color:"blue"}}  variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link  style={{textDecoration:'none', color:"blue"}}  to='/signup' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <br /><br />
        <Box  sx={{ textAlign: 'center' }}>
        <Typography component="h5" variant="h5">
            Or Sign In Using
          </Typography > <br />
          <GoogleIcon cursor="pointer" onClick={props.handleGoogleSignIn} sx={{mx:1, color:'blue', fontSize: "30px"}}/>
          <FacebookIcon onClick={props.handleFacebookLogIn} cursor="pointer" sx={{mx:1, color:'blue', fontSize: "30px"}}/>
          <GitHubIcon cursor="pointer" onClick={props.handleGithubSignIn} sx={{mx:1, color:'blue', fontSize: "30px"}}/>
          </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}