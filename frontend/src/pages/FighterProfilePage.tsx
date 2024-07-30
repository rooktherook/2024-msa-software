import React from "react";
import { Box, Typography } from "@mui/material";
import FavoriteStar from "../Components/FavoriteStar";


const dummy = {
    "category": "Welterweight Division",
    "draws": "0",
    "imgUrl": "https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2024-03/PAGE_MICHAEL_L_03-09.png?itok=XqoQbGfO",
    "losses": "3",
    "name": "Michael Page",
    "nickname": "Venom",
    "wins": "22",
    "placeOfBirth": "England, United Kingdom",
    "age": "37",
    "height": "75.00",
    "weight": "170.00",
    "octagonDebut": "Mar. 9, 2024",
    "reach": "79.00",
    "legReach": "42.00",
    "id": "michael-page",
    "iconurl": "https://a.espncdn.com/combiner/i?img=/i/headshots/mma/players/full/3022067.png&w=150&h=150&cquality=40&scale=crop"
};

const FighterProfilePage: React.FC = () => {
  return (
    <Box>
      <FavoriteStar userId={0} fighterId={0} isFavorite={false} onToggle={function (fighterId: number): void {
        throw new Error("Function not implemented.");
      } }></FavoriteStar>
    </Box>
  );
};



export default FighterProfilePage;