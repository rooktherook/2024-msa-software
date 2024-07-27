import React from "react";
import { TextField, List, Box, IconButton, ListItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


interface SearchBarProps {
    searchInput: string;
    onSearchChange: (value: string) => void;
    suggestions: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ searchInput, onSearchChange, suggestions }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    const handleSearch = () => {
        console.log("Search button clicked");
        // Should go to page of first suggestion.
    };


    return (
        <Box>
            <Box display="flex" alignItems="center">
                <TextField
                    variant="outlined"
                    placeholder="Search MMA Fighters"
                    value={searchInput}
                    onChange={handleChange}
                    fullWidth
                />
                <IconButton onClick={handleSearch} sx={{ ml: 2 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            {searchInput && (
                <List>
                    {suggestions.slice(0, 5).map((suggestion, index) => (
                        <ListItem
                            button
                            key={index}
                            onClick={() => console.log(`Clicked on ${suggestion}`)}
                        >
                            {suggestion}
                        </ListItem>
                    ))}
                </List>
            )}

        </Box>
    );
};

export default SearchBar;
