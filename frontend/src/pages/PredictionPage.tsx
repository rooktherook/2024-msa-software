import React, { useState, useEffect } from "react";
import { Typography, Box, Stack, Button, MenuItem, Select, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../Contexts/DataContext";
import api from '../Service/ApiService';
import ReactMarkdown from 'react-markdown';

const PredictionPage: React.FC = () => {
  const navigate = useNavigate();
  const { fighters, ranking } = useDataContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedWeightClass, setSelectedWeightClass] = useState("");
  const [filteredFighters, setFilteredFighters] = useState<typeof fighters | null>(null);
  const [fighter1, setFighter1] = useState<string>("");
  const [fighter2, setFighter2] = useState<string>("");
  const [rounds, setRounds] = useState<number | "">("");
  const [prediction, setPrediction] = useState<string>("");
  const [winner, setWinner] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (ranking && selectedWeightClass) {
      const filtered = ranking
        .filter(r => r.weightClassName !== "Men's Pound-for-Pound Top Rank" && r.weightClassName === selectedWeightClass)
        .map(r => fighters?.find(f => f.id === r.fighterId))
        .filter(f => f !== undefined) as typeof fighters;
      setFilteredFighters(filtered);
      setFighter1("");
      setFighter2("");
    }
  }, [selectedWeightClass, ranking, fighters]);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await api.post('/api/Prediction', {
        fighter1Id: fighter1,
        fighter2Id: fighter2,
        rounds
      });
      setPrediction(response.data.text);
      setWinner(response.data.winnerName);
    } catch (error) {
      console.error("Failed to get prediction", error);
    } finally {
      setLoading(false);
    }
  };

  const canPredict = fighter1 && fighter2 && rounds && selectedWeightClass && !loading;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
        paddingTop: '10vh',
        paddingBottom: '30vh',
      }}
    >
      {/* Top row */}
      <Stack spacing={2} sx={{ alignItems: 'center', width: isMobile ? '100%' : '60%' }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', paddingX: 10 }}>
          <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
            &larr; Back
          </Button>
          <Typography variant="h4">Prediction</Typography>
        </Stack>
        {/* Middle row with logic and portraits */}
        <Stack direction={isMobile ? "column" : "row"} spacing={2} alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
          <Stack direction="column" alignItems="center" spacing={2} sx={{ width: isMobile ? '100%' : '30%' }}>
            <Box
              sx={{
                width: isMobile ? '125px' : '150px',
                height: isMobile ? '125px' : '150px',
                backgroundColor: fighter1 ? 'none' : 'grey.800',
                border: '1px solid',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {fighter1 && (
                <img src={fighters?.find(f => f.id === fighter1)?.imgUrl} alt="Fighter 1" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              )}
            </Box>
            <Select
              value={fighter1}
              onChange={(e) => setFighter1(e.target.value as string)}
              displayEmpty
              sx={{ width: '100%', maxWidth: '200px' }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
            >
              <MenuItem value="" disabled>Select Fighter 1</MenuItem>
              {filteredFighters?.filter(f => f.id !== fighter2).map((fighter) => (
                <MenuItem key={fighter.id} value={fighter.id}>
                  {fighter.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack direction="column" alignItems="center" spacing={2} sx={{ width: isMobile ? '100%' : '30%' }}>
            <Typography variant="h3">VS</Typography>
            <Select
              value={selectedWeightClass}
              onChange={(e) => setSelectedWeightClass(e.target.value as string)}
              displayEmpty
              sx={{ width: '100%', maxWidth: '200px' }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
            >
              <MenuItem value="" disabled>Select Weight Class</MenuItem>
              {Array.from(new Set(ranking?.map(r => r.weightClassName)))
                .filter(weightClass => weightClass !== "Men's Pound-for-Pound Top Rank")
                .map((weightClass) => (
                  <MenuItem key={weightClass} value={weightClass}>
                    {weightClass}
                  </MenuItem>
                ))}
            </Select>
            <Select
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
              displayEmpty
              sx={{ width: '100%', maxWidth: '200px' }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
            >
              <MenuItem value="" disabled>Select Rounds</MenuItem>
              {[3, 5].map((round) => (
                <MenuItem key={round} value={round}>
                  {round}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack direction="column" alignItems="center" spacing={2} sx={{ width: isMobile ? '100%' : '30%' }}>
            <Box
              sx={{
                width: isMobile ? '125px' : '150px',
                height: isMobile ? '125px' : '150px',
                backgroundColor: fighter2 ? 'none' : 'grey.800',
                border: '1px solid',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {fighter2 && (
                <img src={fighters?.find(f => f.id === fighter2)?.imgUrl} alt="Fighter 2" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              )}
            </Box>
            <Select
              value={fighter2}
              onChange={(e) => setFighter2(e.target.value as string)}
              displayEmpty
              sx={{ width: '100%', maxWidth: '200px' }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
            >
              <MenuItem value="" disabled>Select Fighter 2</MenuItem>
              {filteredFighters?.filter(f => f.id !== fighter1).map((fighter) => (
                <MenuItem key={fighter.id} value={fighter.id}>
                  {fighter.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
        {/* Bottom Row with output and buttons */}
        <Stack direction="column" spacing={2} alignItems="center" sx={{ width: '100%' }}>
          {/* Prediction Body Text. */}
          <Box sx={{ width: '100%', height: '300px', backgroundColor: 'grey.800', padding: 2, borderRadius: 1, overflow: 'auto', color: theme.palette.mode === 'dark' ? 'default' : 'white' }}>
            <ReactMarkdown>{prediction}</ReactMarkdown>
          </Box>
          <Typography variant="h6">{winner && `Winner: ${winner}`}</Typography>
          {/* Prediction Button */}
          <Button variant="contained" color="primary" onClick={handlePredict} disabled={!canPredict}>
            {loading ? 'Predicting...' : 'Predict'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PredictionPage;
