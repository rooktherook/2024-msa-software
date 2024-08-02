import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import {Fighter, Ranking} from "../Types/Entities";
import api from '../Service/ApiService';



interface DataContextType {
  fighters: Fighter[] | null;
  fetchFighters: () => void;
  ranking: Ranking[] | null;
  fetchRanking: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [fighters, setFighters] = useState<Fighter[] | null>(null);
  const [ranking, setRanking] = useState<Ranking[] | null>(null);


  const fetchFighters = async () => {
    try {
      const response = await api.get("/Fighters");
      setFighters(response.data);
    } catch (error) {
      console.error("Failed to fetch fighters", error);
    }
  };


  const fetchRanking = async () => {
    try {
      const response = await api.get("/Rankings");
      setRanking(response.data); 
    } catch (error) {
      console.error("Failed to fetch rankings", error);
    }
  };

  useEffect(() => {
    fetchFighters();
    fetchRanking();
  }, []);


  return (
    <DataContext.Provider value={{ fighters, fetchFighters , ranking, fetchRanking}}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};
