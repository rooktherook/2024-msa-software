import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { AuthProvider } from "./Contexts/AuthContext";
import Layout from "./Components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import FighterProfilePage from "./pages/FighterProfilePage";
import ListingPage from "./pages/ListingPage";
import PredictionPage from "./pages/PredictionPage";


const App: React.FC = () => {
  return (
    // <AuthProvider>
    //   <CustomThemeProvider>
    //     <ThemeProvider theme={createTheme()}>
          // <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="fighter" element={<FighterProfilePage />} />
                <Route path="listing" element={<ListingPage />} />
                <Route path="prediction" element={<PredictionPage />} />
              </Route>
            </Routes>
          </Router>
    //     </ThemeProvider>
    //   </CustomThemeProvider>
    // </AuthProvider>
  )
};

export default App;
