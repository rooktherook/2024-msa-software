import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

interface FavoriteStarProps {
  userId: number;
  fighterId: number;
  isFavorite: boolean;
  onToggle: (fighterId: number) => void;
}

const FavoriteStar: React.FC<FavoriteStarProps> = ({ userId, fighterId, isFavorite, onToggle }) => {
  const handleClick = async () => {
    try {
      await axios.put(`/favorites/${userId}`, { fighterId });
      onToggle(fighterId);
    } catch (error) {
      console.error("Failed to update favorite", error);
    }
  };

  return (
    <IconButton onClick={handleClick} color="primary">
      {isFavorite ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  );
};

export default FavoriteStar;
