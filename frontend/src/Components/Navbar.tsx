import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Button, Box, ListItemButton, List, Drawer, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Contexts/ThemeContext';
import { useAuth } from '../Contexts/AuthContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

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
    <AppBar position="fixed" sx={{ boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {isMobile ? (
          <Box>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Button
              color="inherit"
              sx={{ fontSize: 30, '&:hover': { color: '#D01110' }, marginLeft: 2, marginRight: 2 }}
              onClick={() => handleNavigation('/')}
            >
              <span style={{ color: 'red' }}>F</span>I
            </Button>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              color="inherit"
              sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 2, marginRight: 2, '&:hover': { color: '#D01110' } }}
              startIcon={<OnlinePredictionIcon />}
              onClick={() => handleNavigation('/prediction')}
            >
              Predict
            </Button>
            <Button
              color="inherit"
              sx={{ fontSize: 30, '&:hover': { color: '#D01110' }, marginLeft: 2, marginRight: 2 }}
              onClick={() => handleNavigation('/')}
            >
              <span style={{ color: 'red' }}>F</span>I
            </Button>
            <Button
              color="inherit"
              sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 2, marginRight: 2, '&:hover': { color: '#D01110' } }}
              startIcon={<SportsMmaIcon />}
              onClick={() => handleNavigation('/listing')}
            >
              Fighters
            </Button>
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 2 }}>
            {themeMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          <Button color="inherit" startIcon={<AccountCircleIcon />} onClick={handleLoginClick}>
            {authState.isLoggedIn ? authState.user?.displayName : 'Login'}
          </Button>
        </Box>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
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
      <LoginModal
        open={loginModalOpen}
        onClose={handleCloseLoginModal}
        isLoggedIn={authState.isLoggedIn}
        user={authState.user}
        onLogin={authActions.login}
        onLogout={authActions.logout}
        onUpdateUser={authActions.editUser}
        onSignup={authActions.signup}
        onDelete={authActions.deleteUser}
      />
    </AppBar>
  );
};

export default Navbar;
