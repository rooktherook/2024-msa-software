import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Button, Typography, Box, ListItemButton, List, Drawer, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Contexts/ThemeContext';
import { useAuth } from '../Contexts/AuthContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoginIcon from '@mui/icons-material/Login';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import MenuIcon from '@mui/icons-material/Menu';
import LoginModal from './LoginModal';


const Navbar: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  const { state: authState, actions: authActions } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };


  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="fixed" sx={{
      boxShadow: 'none'
    }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Mobile Section */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItemButton onClick={() => handleNavigation('/prediction')}>
                <ListItemIcon><OnlinePredictionIcon /></ListItemIcon>
                <ListItemText primary="Predict" />
              </ListItemButton>
              <ListItemButton onClick={() => handleNavigation('/listing')}>
                <ListItemIcon><SportsMmaIcon /></ListItemIcon>
                <ListItemText primary="Fighters" />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
        {/* Desktop Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
          <Button
            color="inherit"
            sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 10, marginRight: 10, '&:hover': { color: '#D01110' } }}
            startIcon={<OnlinePredictionIcon />}
            onClick={() => handleNavigation('/prediction')}
          >
            Predict
          </Button>
          <Button
            color="inherit"
            sx={{ fontSize: 30, '&:hover': { color: '#D01110' }}}
            onClick={() => handleNavigation('/')}
          >
            <span style={{ color: 'red' }}>F</span>I
          </Button>
          <Button
            color="inherit"
            sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 10, marginRight: 10, '&:hover': { color: '#D01110' } }}
            startIcon={<SportsMmaIcon />}
            onClick={() => handleNavigation('/listing')}
          >
            Fighters
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 2 }}>
            {themeMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          <Button color="inherit" startIcon={<LoginIcon />} onClick={handleLoginClick}>
            {authState.isLoggedIn ? authState.user?.username : 'Login'}
          </Button>
        </Box>
      </Toolbar>
      <LoginModal
        open={loginModalOpen}
        onClose={handleCloseLoginModal}
        isLoggedIn={authState.isLoggedIn}
        onLogin={authActions.login}
        onLogout={authActions.logout}
        onUpdateName={authActions.editUser}
        onSignup={authActions.signup}
      />
    </AppBar>
  );
};

export default Navbar;
