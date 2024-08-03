import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  CssBaseline, createTheme,
} from "@mui/material";
import { ThemeProvider } from "./Contexts/ThemeContext";
import { DataContextProvider } from "./Contexts/DataContext";

import { AuthProvider } from "./Contexts/AuthContext";
import HomePage from "./pages/HomePage";
import FighterProfilePage from "./pages/FighterProfilePage";
import ListingPage from "./pages/ListingPage";
import PredictionPage from "./pages/PredictionPage";
import Navbar from "./Components/Navbar";


const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataContextProvider>
        <ThemeProvider>
          <CssBaseline />
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="fighter/:id" element={<FighterProfilePage />} />
              <Route path="listing" element={<ListingPage />} />
              <Route path="prediction" element={<PredictionPage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </DataContextProvider>
    </AuthProvider>
  )
};

export default App;
