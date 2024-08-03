interface Fighter {
    category: string;
    draws: string;
    imgUrl: string;
    losses: string;
    name: string;
    nickname: string;
    wins: string;
    status: string;
    placeOfBirth: string;
    trainsAt: string;
    fightingStyle: string;
    age: string;
    height: string;
    weight: string;
    octagonDebut: string;
    reach: string;
    legReach: string;
    id: string;
}

interface Ranking
{
    id: number;
    weightClassId: string;
    weightClassName: string;
    ranking: number;
    fighterId: string;
}

interface User {
    username: string;
    displayName: string;
    aboutMe: string;
}

export type {
    Fighter, User, Ranking
}