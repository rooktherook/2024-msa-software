import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import {Fighter} from "../Types/Entities";

interface DataContextType {
  fighters: Fighter[] | null;
  fetchFighters: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const [fighters, setFighters] = useState<Fighter[] | null>(null);

  const fetchFighters = async () => {
    try {
      const response = await fetch("/api/fighters");
      const data = await response.json();
      setFighters(data);
    } catch (error) {
      console.error("Failed to fetch fighters", error);
    }
  };

  useEffect(() => {
    fetchFighters();
  }, []);

  return (
    <DataContext.Provider value={{ fighters, fetchFighters }}>
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
