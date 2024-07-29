import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Button } from '@mui/material';
import { useTheme } from '../Contexts/ThemeContext';
import { useAuth } from '../Contexts/AuthContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoginIcon from '@mui/icons-material/Login';
import LoginModal from './LoginModal';

const Topbar: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();
  const { state: authState, actions: authActions } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,  marginLeft: 300,
      width: `calc(100% - 300px)`, background: 'transparent', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 2 }}>
          {themeMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <Button color="inherit" startIcon={<LoginIcon />} onClick={handleLoginClick}>
          {authState.isLoggedIn ? authState.user?.username : 'Login'}
        </Button>
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

export default Topbar;