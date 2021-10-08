import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{textDecoration:'none', color:"white"}} to='/'>Authentication</Link>
          </Typography>
          <Link style={{textDecoration:'none', color: 'white'}} to='/'><Button color="inherit">Home</Button></Link>
          <Button color="inherit">Contact Us</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    );
};

export default Header;