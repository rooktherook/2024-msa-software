import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogin: (username: string) => Promise<boolean>;
  onSignup: (username: string) => Promise<boolean>;
  onLogout: () => Promise<void>;
  onUpdateName: (name: string) => Promise<void>;
}

const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  isLoggedIn,
  onLogin,
  onSignup,
  onLogout,
  onUpdateName
}) => {
  const [username, setUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleLogin = async () => {
    const success = await onLogin(username);
    if (success) {
      setUsername('');
      onClose();
    }
  };

  const handleSignup = async () => {
    const success = await onSignup(username);
    if (success) {
      setUsername('');
      onClose();
    }
  };

  const handleUpdateName = async () => {
    await onUpdateName(username);
    setIsEditing(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isLoggedIn ? 'Account' : 'Login'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isLoggedIn
            ? 'You can update your name or sign out.'
            : 'Please enter your username to log in.'}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoggedIn && !isEditing}
        />
      </DialogContent>
      <DialogActions>
        {isLoggedIn ? (
          <>
            {isEditing ? (
              <>
                <Button onClick={handleUpdateName} color="primary">
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)} color="secondary">
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <IconButton onClick={() => setIsEditing(true)} color="primary">
                  <EditIcon />
                </IconButton>
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
    </Dialog>
  );
};

export default LoginModal;
