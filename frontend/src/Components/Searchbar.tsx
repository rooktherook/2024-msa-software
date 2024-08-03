import React from "react";
import { TextField, List, Box, IconButton, ListItemText, ListItemButton, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    searchInput: string;
    onSearchChange: (value: string) => void;
    suggestions: string[];
    onSearchSubmit: () => void;
    onSuggestionSelect: (suggestion: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchInput,
    onSearchChange,
    suggestions,
    onSearchSubmit,
    onSuggestionSelect
}) => {
    return (
        <Box>
            <Box display="flex" alignItems="center">
                <TextField
                    value={searchInput}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                    fullWidth
                    label="Search Fighters"
                    autoComplete="off"
                />
                <IconButton onClick={onSearchSubmit} sx={{ ml: 2 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            {searchInput && suggestions.length > 0 && (
                <Paper elevation={3} sx={{
                    position: 'absolute',
                    width: '100%',
                    maxHeight: '200px',
                    overflowY: 'hidden', 
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <List sx={{
                        flex: '1 1 auto',
                        overflowY: suggestions.length > 5 ? 'scroll' : 'hidden', // Enable scroll only if more than 5 suggestions
                    }}>
                        {suggestions.map((suggestion, index) => (
                            <ListItemButton
                                key={index}
                                onClick={() => onSuggestionSelect(suggestion)}
                            >
                                <ListItemText primary={suggestion} />
                            </ListItemButton>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    );
};

export default SearchBar;
