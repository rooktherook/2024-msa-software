import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Fighter } from "../Types/Entities";
import { useDataContext } from "../Contexts/DataContext";
import FavoriteStar from "../Components/FavoriteStar";
import { useAuth } from "../Contexts/AuthContext";

const FighterProfilePage: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { fighters } = useDataContext();
  const { state } = useAuth();
  const { isLoggedIn } = state;
  const [fighter, setFighter] = useState<Fighter | null>(location.state?.fighter || null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));




  useEffect(() => {
    if (!fighter && fighters) {
      const selectedFighter = fighters.find(f => f.id === id);
      setFighter(selectedFighter || null);
    }
  }, [fighter, fighters, id]);

  if (!fighter) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10vh',
        paddingBottom: '20vh',
      }}
    >
      <Stack spacing={2} sx={{ width: isMobile ? '100%' : '60%', alignItems: 'center' }}>
        {/* Top row with back button and title */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', paddingX: 10 }}>
          <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
            &larr; Back
          </Button>
          <Typography variant="h4">Fighter</Typography>
        </Stack>
        {/* Middle row with portrait and fighter details */}
        <Stack direction={'row'} spacing={2} alignItems="center-start" sx={{ width: '50%' }}>
          <Box
            component="img"
            src={fighter.imgUrl}
            alt={fighter.name}
            sx={{ width: '50%', objectFit: 'cover' }}
          />
          <Stack spacing={1} sx={{ textAlign: isMobile ? 'center' : 'left' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              {isLoggedIn && (
                <FavoriteStar fighterId={fighter.id} />
              )}
              {fighter.name && (
                <Typography variant="h4">{fighter.name}</Typography>
              )}
            </Stack>
            {fighter.nickname !== "Unknown" && (
              <Typography variant="h5">"{fighter.nickname}"</Typography>
            )}
            <Stack direction="row" spacing={2} sx={{ textAlign: isMobile ? 'center' : 'left' }}>
              <Typography variant="body1" sx={{ flexDirection: 'column', textAlign: 'center', color: '#39C37E' }}>
                <strong>W</strong> <br /> {fighter.wins}
              </Typography>
              <Typography variant="body1" sx={{ flexDirection: 'column', textAlign: 'center', color: '#E50000' }}>
                <strong>L</strong> <br /> {fighter.losses}
              </Typography>
              <Typography variant="body1" sx={{ flexDirection: 'column', textAlign: 'center', color: 'gray' }}>
                <strong>NC</strong> <br /> {fighter.draws}
              </Typography>
            </Stack>
          </Stack>
        </Stack>


        {/* Bottom row with additional fighter info */}
        <Box sx={{ width: '100%' }}>
          <Typography variant="h4" gutterBottom sx={{ paddingLeft: 5 }}>Info</Typography>
          <Box sx={{ backgroundColor: 'grey.800', padding: 2, borderRadius: 1, color: theme.palette.mode === 'dark' ? 'default' : 'white' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><Typography>Category: {fighter.category}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography>Status: {fighter.status}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography>Place of Birth: {fighter.placeOfBirth}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography>Trains At: {fighter.trainsAt}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography>Fighting Style: {fighter.fightingStyle}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography>Age: {fighter.age}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography>Height: {fighter.height}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography>Weight: {fighter.weight}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography>Octagon Debut: {fighter.octagonDebut}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography>Reach: {fighter.reach}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography>Leg Reach: {fighter.legReach}</Typography></Grid>
            </Grid>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default FighterProfilePage;
