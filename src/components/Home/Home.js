import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import firebaseInit from "../../firebase/firebaseInit";
import Login from '../Login/Login';

firebaseInit();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const FacebookProvider = new FacebookAuthProvider();
const Home = () => {
    const [error, setError] = useState('');
    const [user, setUser] = useState('')
    const [isGithub, setIsGithub] = useState(false)
    const auth = getAuth();
    const handleGoogleSignIn = () => {
      signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        setError('')
        setIsGithub(false)
      }).catch(err => {
        setError(err.message)
      })
    }
  
    const handleGithubSignIn = () => {
      signInWithPopup(auth, githubProvider )
      .then(result => {
        console.log(result);
        setUser(result._tokenResponse)
        setError('')
        setIsGithub(true)
      }).catch(err => {
        setError(err.message)
        console.log(err);
        
      })
    }
  
    const handleFacebookLogIn = () => {
      signInWithPopup(auth, FacebookProvider)
      .then(result => {
        setUser(result.user)
        setIsGithub(false)
      }).catch(err => {
        setError(err.message)
      })
    }
  
    const handleSignOut = () => {
      setUser('')
    }
    console.log(user);
    
    return (
       <div>
            {
            setError && <p><small>{error}</small></p>
          }
          {
            user ? <Box sx={{textAlign:'center'}}>
              <h2>Welcome {isGithub? user.screenName : user.displayName}</h2>
              <h5>{user.email}</h5>
              {
                isGithub ? <img src={user.photoUrl} alt="" /> : <img src={user.photoURL} alt="" />
              } <br />
              <Button variant="contained" onClick={handleSignOut}>Sign Out</Button>
            </Box> : <Login handleFacebookLogIn={handleFacebookLogIn} handleGoogleSignIn={handleGoogleSignIn} handleGithubSignIn={handleGithubSignIn} setUser={setUser} setError={setError}></Login>
          }
       </div>
    );
};

export default Home;