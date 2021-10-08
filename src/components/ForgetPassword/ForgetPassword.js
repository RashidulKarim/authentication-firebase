import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from 'react';



const theme = createTheme();
const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');
    const auth = getAuth();
    const getEmail = e => {
        setEmail(e.target.value)
    }
    const handleforgetPassword = () => {
        sendPasswordResetEmail(auth, email)
  .then(() => {
    setSuccess("A password reset mail sent to your email")
  })
  .catch((error) => {
    setErr(error.message)
    // ..
  });
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
             {
                 success ? <Typography component="h5" variant="h5">
                 {success}
               </Typography> :  <div>
               <Typography component="h1" variant="h5">
                 Reset Password
               </Typography>
               <Box component="form"  noValidate sx={{ mt: 1 }}>
                 <TextField
                 onBlur={getEmail}
                   margin="normal"
                   required
                   fullWidth
                   id="email"
                   label="Email Address"
                   name="email"
                   autoComplete="email"
                   autoFocus
                 /></Box>
                 <Button
                   type="submit"
                   onClick={handleforgetPassword}
                   fullWidth
                   variant="contained"
                   sx={{ mt: 3, mb: 2}}
                 >
                 Reset
               </Button>
               {
                   err && <Typography component="h5" variant="h5">
                   {err}
                 </Typography>
               }
               </div>
             }
            </Box>
          </Container>
        </ThemeProvider>
    );
};

export default ForgetPassword;