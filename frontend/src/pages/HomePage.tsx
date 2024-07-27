import React, { useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import SearchBar from "../Components/Searchbar";

const fighterNames = [
  "Conor McGregor",
  "Khabib Nurmagomedov",
  "Jon Jones",
  "Israel Adesanya",
  "Stipe Miocic",
  "Daniel Cormier",
  "Francis Ngannou",
  "Max Holloway",
  "Kamaru Usman",
  "Jorge Masvidal"
];

const HomePage: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredFighters, setFilteredFighters] = useState<string[]>(fighterNames);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    const filtered = fighterNames.filter(name => 
      name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredFighters(filtered);
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
