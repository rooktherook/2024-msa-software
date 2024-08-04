import React, { useState, useEffect } from "react";
import { Box, Button, Stack, Typography, Select, MenuItem, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../Contexts/DataContext";
import { SelectChangeEvent } from "@mui/material";
import { useAuth } from "../Contexts/AuthContext";

const ListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { fighters, ranking } = useDataContext();
  const [viewMode, setViewMode] = useState<'ranking' | 'favorite'>('ranking');
  const { state } = useAuth();
  const [selectedWeightClass, setSelectedWeightClass] = useState<string>("Men's Pound-for-Pound Top Rank");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleViewChange = (mode: 'ranking' | 'favorite') => {
    setViewMode(mode);
  };

  const handleWeightClassChange = (event: SelectChangeEvent<string>) => {
    setSelectedWeightClass(event.target.value);
  };

  const getUniqueWeightClasses = () => {
    if (!ranking) return [];
    const weightClasses = ranking.map(r => r.weightClassName);
    return Array.from(new Set(weightClasses));
  };

  const filteredFighters = () => {
    if (!fighters) return [];
    if (viewMode === 'favorite') {
      return fighters.filter(f => state.favorites.includes(f.id));
    }
    if (viewMode === 'ranking' && selectedWeightClass) {
      const filteredRanking = ranking?.filter(r => r.weightClassName === selectedWeightClass && r.ranking > 0);
      const uniqueFighterIds = Array.from(new Set(filteredRanking?.map(r => r.fighterId)));
      return fighters.filter(f => uniqueFighterIds.includes(f.id));
    }
    return fighters;
  };

  const sortedFighters = filteredFighters().sort((a, b) => {
    if (!ranking) return 0;
    const rankA = ranking.find(r => r.fighterId === a.id)?.ranking ?? 100;
    const rankB = ranking.find(r => r.fighterId === b.id)?.ranking ?? 100;
    return rankA - rankB;
  });

  const getChampion = (weightClass: string) => {
    if (!ranking) return null;
    const champion = ranking.find(r => r.weightClassName === weightClass && r.ranking === 0);
    if (champion) {
      return fighters?.find(f => f.id === champion.fighterId);
    }
    return null;
  };

  const champion = selectedWeightClass === "Men's Pound-for-Pound Top Rank" ? null : getChampion(selectedWeightClass);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '10vh', paddingBottom: '20vh' }}>
      <Stack spacing={2} sx={{ alignItems: 'center', width: '100%' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="contained" color="primary" onClick={() => navigate(-1)}>&larr; Back</Button>
          <Button variant="contained" color={viewMode === 'ranking' ? 'secondary' : 'primary'} onClick={() => handleViewChange('ranking')}>Ranking</Button>
          <Button variant="contained" color={viewMode === 'favorite' ? 'secondary' : 'primary'} onClick={() => handleViewChange('favorite')}>Favorite</Button>
        </Stack>
        {viewMode === 'ranking' && (
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>Filter:</Typography>
            <Select value={selectedWeightClass || ''} onChange={handleWeightClassChange} displayEmpty>
              <MenuItem value="" disabled>Select weight class</MenuItem>
              {getUniqueWeightClasses().map(weightClass => (
                <MenuItem key={weightClass} value={weightClass}>{weightClass}</MenuItem>
              ))}
            </Select>
          </Stack>
        )}
        {viewMode === 'favorite' && <Typography>Favorites</Typography>}
        <Box sx={{ width: isMobile ? '100%' : '40%', margin: 'auto' }}>
          <List>
            <ListItem sx={{ backgroundColor: 'grey.600', textAlign: 'center' }}>
              <ListItemText>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>Name</Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>Record</Typography>
              </ListItemText>
            </ListItem>
            {champion && viewMode === 'ranking' && (
              <ListItem key={champion.id} sx={{ color: 'default', backgroundColor: 'grey.700' }}>
                <ListItemIcon>
                  <Box
                    component="img"
                    src={champion.iconurl}
                    alt={champion.name}
                    sx={{
                      width: 50,
                      height: 50,
                      objectFit: 'cover',
                      border: `2px solid #D4AF37`
                    }}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="body1"
                    onClick={() => navigate(`/fighter/${champion.id}`)}
                    sx={{ cursor: 'pointer', textDecoration: 'underline', textAlign: 'center' }}
                  >
                    {champion.name}
                  </Typography>
                </ListItemText>
                <ListItemText>
                  <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                    <Typography variant="body1" color="#39C37E">{champion.wins}</Typography>
                    <Typography variant="body1" color="#E50000">{champion.losses}</Typography>
                    <Typography variant="body1" color="gray">{champion.draws}</Typography>
                  </Stack>
                </ListItemText>
              </ListItem>
            )}
            {sortedFighters.map((fighter, index) => (
              <ListItem key={fighter.id} sx={{ backgroundColor: index % 2 === 0 ? 'grey.800' : 'grey.700' }}>
                <ListItemIcon>
                  <Box
                    component="img"
                    src={fighter.iconurl}
                    alt={fighter.name}
                    sx={{
                      width: 50,
                      height: 50,
                      objectFit: 'cover',
                      border: `2px solid`
                    }}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="body1"
                    onClick={() => navigate(`/fighter/${fighter.id}`)}
                    sx={{ cursor: 'pointer', textDecoration: 'underline', textAlign: 'center' }}
                  >
                    {fighter.name}
                  </Typography>
                </ListItemText>
                <ListItemText>
                  <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                    <Typography variant="body1" color="#39C37E">{fighter.wins}</Typography>
                    <Typography variant="body1" color="#E50000">{fighter.losses}</Typography>
                    <Typography variant="body1" color="gray">{fighter.draws}</Typography>
                  </Stack>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Stack>
    </Box>
  );
};

export default ListingPage;
