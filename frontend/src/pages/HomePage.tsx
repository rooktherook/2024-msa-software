import React, { useEffect, useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import SearchBar from "../Components/Searchbar";
import { useDataContext } from "../Contexts/DataContext";

const HomePage: React.FC = () => {
  const { fighters } = useDataContext();
  const [searchInput, setSearchInput] = useState("");
  const [filteredFighters, setFilteredFighters] = useState<string[]>([]);

  useEffect(() => {
    if (fighters) {
      const fighterNames = fighters.map(fighter => fighter.name);
      setFilteredFighters(fighterNames);
    }
  }, [fighters]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    if (fighters) {
      const fighterNames = fighters.map(fighter => fighter.name);
      const filtered = fighterNames.filter(name => 
        name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFighters(filtered);
    }
  };

  return (
    <Container>
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          FI.ai
        </Typography>
        <SearchBar 
          searchInput={searchInput}
          onSearchChange={handleSearchChange}
          suggestions={filteredFighters}
        />
      </Box>
    </Container> 
  );
};

export default HomePage;
