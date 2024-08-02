import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  IconButton,
  Stack,
  Box,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { User } from '../Types/Entities';


interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  user: User | null;
  onLogin: (username: string) => Promise<boolean>;
  onSignup: (username: string) => Promise<boolean>;
  onLogout: () => Promise<void>;
  onUpdateUser: (updatedUserDetails: { displayName: string; aboutMe: string }) => Promise<void>;
  onDelete: (username: string) => Promise<boolean>;
}

const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  isLoggedIn,
  user,
  onLogin,
  onSignup,
  onLogout,
  onUpdateUser,
  onDelete
}) => {
  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [displayName, setDisplayName] = useState(user?.DisplayName || '');
  const [aboutMe, setAboutMe] = useState(user?.AboutMe || '');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogin = async () => {
    const success = await onLogin(username);
    if (success) {
      setUsername('');
      onClose();
    } else {
      setSnackbarMessage("User doesn't exist.");
      setSnackbarOpen(true);
    }
  };

  const handleSignup = async () => {
    const success = await onSignup(username);
    if (success) {
      setUsername('');
      onClose();
    } else {
      setSnackbarMessage("User already signed up.");
      setSnackbarOpen(true);
    }
  };

  const handleUpdateUser = async () => {
    await onUpdateUser( { displayName, aboutMe });
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    const success = await onDelete(username);
    if (success) {
      onClose();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: 1400 }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog open={open} onClose={onClose}
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : '500px',
            height: isMobile ? '100%' : '400px',
            maxWidth: isMobile ? '100%' : '80%',
            maxHeight: isMobile ? '100%' : '80%',
            margin: isMobile ? '0' : 'auto'
          }
        }}
      >
        <Stack spacing={2} sx={{ height: '100%' }}>
          {/* Horizontal Stack For Top elements. */}
          <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%', padding: '16px' }}>
            <Box>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <DialogTitle>{isLoggedIn ? 'Account' : 'Login'}</DialogTitle>
            </Box>
            <Box>
              {isLoggedIn ? (
                <>
                  {isEditing ? (
                    <>
                      <Button onClick={() => setIsEditing(false)} color="secondary">
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => setIsEditing(true)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </>
                  )}
                </>
              ) : (
                <>
                </>
              )}
            </Box>
          </Stack>
          {/* Box For Body */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <DialogContent>
              <DialogContentText>
                {isLoggedIn
                  ? 'You can update your information or sign out.'
                  : 'Please enter your username to log in.'}
              </DialogContentText>
              {isLoggedIn && !isEditing ? (
                <>
                  <Typography variant="h6">Username</Typography>
                  <Typography variant="body1">{user?.Username}</Typography>
                  <Typography variant="h6">Display Name</Typography>
                  <Typography variant="body1">{user?.DisplayName}</Typography>
                  <Typography variant="h6">About Me</Typography>
                  <Typography variant="body1">{user?.AboutMe}</Typography>
                </>
              ) : (
                <>
                  <TextField
                    margin="dense"
                    label="Username"
                    type="text"
                    fullWidth
                    value={user?.Username}
                    disabled
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Display Name"
                    type="text"
                    fullWidth
                    value={user?.DisplayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                  <TextField
                    margin="dense"
                    label="About Me"
                    type="text"
                    fullWidth
                    value={user?.AboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                  />
                </>
              )}
            </DialogContent>
          </Box>
          <Box>
            <DialogActions>
              {isLoggedIn ? (
                <>
                  {isEditing ? (
                    <>
                      <Button onClick={handleDeleteAccount} color="error">
                        Delete Account
                      </Button>

                      <Button onClick={handleUpdateUser} color="primary">
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={onLogout} color="error" startIcon={<LogoutIcon />}>
                        Sign Out
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Button onClick={handleLogin} color="primary">
                    Sign In
                  </Button>
                  <Button onClick={handleSignup} color="secondary">
                    Create Account
                  </Button>
                </>
              )}
            </DialogActions>
          </Box>
        </Stack>
      </Dialog >
    </>
  );
};

export default LoginModal;
