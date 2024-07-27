import React from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Topbar />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: { sm: 60 } }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};


export default Layout;