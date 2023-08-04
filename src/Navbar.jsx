import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from './contexts/AuthContext';

import BASE_API_ENDPOINT from './vars/BASE_API_ENDPOINT';


const Navbar = () => {

  const { isAuth, hasPermC } = useAuthContext();
  const navigate = useNavigate();

  let home = '/client/home';
  if (isAuth && hasPermC) {
    home = '/home';
  } else if (isAuth && !hasPermC) {
    home = '/client/home';
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to={home} style={{color: 'white', textDecoration: 'none'}}>UR Assisto <Chip label="Beta" color="warning"/></Link>
        </Typography>
        {isAuth ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
      </Toolbar>
    </AppBar>
  );
}

const NavbarLoggedIn = () => {

  const {setIsAuth} = useAuthContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {

    // Remove the login info from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Send a logout request to the server
    try{
      const res = await axios.post(`${BASE_API_ENDPOINT}api/logout/`, {
        refresh_token: localStorage.getItem('refresh_token')
      });
      axios.defaults.headers.common['Authorization'] = null;
      setIsAuth(false);
    }catch(err){}
    // Redirect the user to the login page
    window.location.href = '/';
  }

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=> navigate('/my-account/')}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

const NavbarLoggedOut = () => {

  const from_C = !window.location.href.includes("client");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (from_C){
      navigate('/login');
    }else{
      navigate('/client/login');
    }
  }
  const handleSignup = () => {
    if (from_C){
      navigate('/signup');
    }else{
      navigate('/client/signup');
    }
  }

  return (
    <>
      {/* <Button variant="contained" onClick={handleSignup}>
        Sign up
      </Button>
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button> */}
    </>
  )
}

export default Navbar;