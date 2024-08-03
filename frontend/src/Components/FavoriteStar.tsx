import React from 'react';
import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useAuth } from '../Contexts/AuthContext';
import api from '../Service/ApiService';

interface FavoriteStarProps {
  fighterId: string;
}

const FavoriteStar: React.FC<FavoriteStarProps> = ({ fighterId }) => {
  const { state, actions } = useAuth();
  const { isLoggedIn, user, favorites } = state;

  const isFavorite = favorites.includes(fighterId);

  const handleClick = async () => {
    if (!isLoggedIn) return;

    try {
      if (isFavorite) {
        await api.post('/api/Favorites/remove', { username: user!.username, fighterId });
        actions.removeFavorite(fighterId);
      } else {
        await api.post('/api/Favorites/add', { username: user!.username, fighterId });
        actions.addFavorite(fighterId);
      }
    } catch (error) {
      console.error("Failed to update favorite", error);
    }
  };

  return (
    <IconButton onClick={handleClick} color="primary" disabled={!isLoggedIn}>
      {isFavorite ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  );
};

export default FavoriteStar;
