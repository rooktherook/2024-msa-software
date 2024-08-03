import React, { createContext, ReactNode, useContext, useState } from "react";
import api from '../Service/ApiService';
import { User } from "../Types/Entities";

interface IAuthContext {
  state: {
    isLoggedIn: boolean;
    user: User | null;
    favorites: string[];
  };
  actions: {
    login: (username: string) => Promise<boolean>;
    signup: (username: string) => Promise<boolean>;
    logout: () => Promise<void>;
    editUser: (updatedUserDetails: { username: string; displayName: string; aboutMe: string }) => Promise<void>;
    deleteUser: (username: string) => Promise<boolean>;
    addFavorite: (fighterId: string) => void;
    removeFavorite: (fighterId: string) => void;
  };
}

const initialState: IAuthContext = {
  state: { isLoggedIn: false, user: null, favorites: [] },
  actions: {
    login: async () => false,
    signup: async () => false,
    logout: async () => {},
    editUser: async () => {},
    deleteUser: async () => false,
    addFavorite: () => {},
    removeFavorite: () => {},
  },
};

const AuthContext = createContext<IAuthContext>(initialState);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState({
    isLoggedIn: false,
    user: null as User | null,
    favorites: [] as string[],
  });

  const login = async (username: string) => {
    try {
      const response = await api.post('/api/Users/signin', { username });
      if (response.data.success) {
        localStorage.setItem('auth_token', username);

        const favoritesResponse = await api.get(`/api/Favorites?username=${username}`);
        const favoritesData = favoritesResponse.data.favorites;
        const favoriteIds = favoritesData.map((favorite: { fighterId: string }) => favorite.fighterId);

        setState({
          isLoggedIn: true,
          user: response.data.user,
          favorites: favoriteIds,
        });

        console.log(favoritesData);
        console.log(favoriteIds);

        return true;
      }
    } catch (error) {
      console.error("Login failed", error);
    }
    return false;

  };

  const signup = async (username: string) => {
    try {
      const response = await api.post('/api/Users/signup', { username });
      if (response.data.success) {
        return true;
      }
    } catch (error) {
      console.error("Signup failed", error);
    }
    return false;
  };

  const logout = async () => {
    localStorage.removeItem('auth_token');
    setState({
      isLoggedIn: false,
      user: null,
      favorites: [],
    });
  };

  const editUser = async (data: { username: string; displayName: string; aboutMe: string }) => {
    if (state.user) {
      try {
        const response = await api.put('/api/Users/edit', data);
        if (response.data.success) {
          setState((prevState) => ({
            ...prevState,
            user: {
              ...prevState.user!,
              displayName: data.displayName,
              aboutMe: data.aboutMe,
            },
          }));
        }
      } catch (error) {
        console.error("Failed to update user", error);
      }
    }
  };

  const deleteUser = async (username: string) => {
    try {
      const response = await api.delete('/api/Users/delete', { data: { username } });
      if (response.data.success) {
        localStorage.removeItem('auth_token');
        setState({
          isLoggedIn: false,
          user: null,
          favorites: [],
        });
        return true;
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    }
    return false;
  };

  const addFavorite = (fighterId: string) => {
    setState((prevState) => ({
      ...prevState,
      favorites: [...prevState.favorites, fighterId],
    }));
  };

  const removeFavorite = (fighterId: string) => {
    setState((prevState) => ({
      ...prevState,
      favorites: prevState.favorites.filter(id => id !== fighterId),
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        actions: {
          login,
          signup,
          logout,
          editUser,
          deleteUser,
          addFavorite,
          removeFavorite,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
