import React, { useEffect, useState } from "react";
import { Typography, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Components/Searchbar";
import { useDataContext } from "../Contexts/DataContext";

const HomePage: React.FC = () => {
  const { fighters } = useDataContext();
  const [searchInput, setSearchInput] = useState("");
  const [filteredFighters, setFilteredFighters] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (fighters) {
      const fighterNames = fighters.map(fighter => fighter.name);
      const filtered = fighterNames.filter(name =>
        name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setFilteredFighters(filtered);
    }
  };

  const handleSearchSubmit = () => {
    if (filteredFighters.length > 0) {
      const selectedFighter = fighters?.find(fighter => fighter.name === filteredFighters[0]);
      if (selectedFighter) {
        navigate(`/fighter/${selectedFighter.id}`, { state: { fighter: selectedFighter } });
      }
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    const selectedFighter = fighters?.find(fighter => fighter.name === suggestion);
    if (selectedFighter) {
      navigate(`/fighter/${selectedFighter.id}`, { state: { fighter: selectedFighter } });
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '20vh',
      }}
    >
      <Stack spacing={2} sx={{ width: '100%', maxWidth: '600px', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom textAlign="center">
            FI.ai
          </Typography>
        </Box>
        <Box sx={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
          <SearchBar
            searchInput={searchInput}
            onSearchChange={handleSearchChange}
            suggestions={filteredFighters}
            onSearchSubmit={handleSearchSubmit}
            onSuggestionSelect={handleSuggestionSelect}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default HomePage;
