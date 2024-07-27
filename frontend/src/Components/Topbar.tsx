import React from "react";
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { useTheme } from '../Contexts/ThemeContext';
import { useAuth } from '../Contexts/AuthContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Topbar = () => {
  const { themeMode, toggleTheme } = useTheme();
  const { state: authState, actions: authActions } = useAuth();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,  marginLeft: 300, // Add left margin here
      width: `calc(100% - 300px)`, background: 'transparent', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 2 }}>
          {themeMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        {/* {!authState.isLoggedIn && (
          <Button color="inherit" startIcon={<LoginIcon />} onClick={authActions.login}>
            Login
          </Button>
        )} */}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
