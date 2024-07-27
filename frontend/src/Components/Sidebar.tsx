import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { Link } from "react-router-dom";
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import SportsMmaIcon from '@mui/icons-material/SportsMma';

const drawerWidth = 240;

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
        transition: theme => theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidth : 60,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: theme => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Box sx={{ overflow: 'hidden' }}>
        <List>
          <ListItem button component={Link} to="/" sx={{ justifyContent: open ? 'flex-start' : 'center', paddingLeft: open ? 2 : 0 }}>
            <Tooltip title="Home" placement="right">
              <IconButton>
                <Typography variant="h5" noWrap sx={{ fontWeight: 'bold' }}>
                  {open ? 'FI.ai' : 'FI'}
                </Typography>
              </IconButton>
            </Tooltip>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/prediction" sx={{ justifyContent: open ? 'flex-start' : 'center', paddingLeft: open ? 2 : 0 }}>
            <Tooltip title="Prediction Page" placement="right">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <OnlinePredictionIcon />
                {open && <ListItemText primary="Prediction Page" sx={{ ml: 2, fontWeight: 'bold' }} />}
              </Box>
            </Tooltip>
          </ListItem>
          <ListItem button component={Link} to="/listing" sx={{ justifyContent: open ? 'flex-start' : 'center', paddingLeft: open ? 2 : 0 }}>
            <Tooltip title="Fighters" placement="right">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SportsMmaIcon />
                {open && <ListItemText primary="Fighters" sx={{ ml: 2, fontWeight: 'bold' }} />}
              </Box>
            </Tooltip>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
