import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Modal, Paper, Box, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './NavBar.css';

function NavBar({ user }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Notes App
          </Typography>
          {user ? (
            <>
              <IconButton color="inherit" onClick={handleOpen}>
                <AccountCircleIcon />
              </IconButton>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/signin')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Modal open={open} onClose={handleClose}>
        <Paper className="profile-modal">
          <Box p={4}>
            <Typography variant="h6">Profile</Typography>
            {user && (
              <Box mt={2}>
                <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
              </Box>
            )}
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleClose} 
              style={{ marginTop: 16 }}>
              Close
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
}

export default NavBar;
