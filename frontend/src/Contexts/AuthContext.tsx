import React, { createContext, ReactNode, useContext, useState } from "react";
import axios from 'axios';

interface IAuthContext {
  state: {
    isLoggedIn: boolean;
    user: User | null;
  };
  actions: {
    login: (username: string) => Promise<boolean>;
    signup: (username: string) => Promise<boolean>;
    logout: () => Promise<void>;
    editUser: (name: string) => Promise<void>;
  };
}

interface User {
  id: number;
  username: string;
}

const initialState: IAuthContext = {
  state: { isLoggedIn: false, user: null },
  actions: {
    login: async () => false,
    signup: async () => false,
    logout: async () => {},
    editUser: async () => {},
  },
};

const AuthContext = createContext<IAuthContext>(initialState);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState({
    isLoggedIn: false,
    user: null as User | null,
  });

  const login = async (username: string) => {
    try {
      const response = await axios.post('/auth/signin', { username });
      setState({
        isLoggedIn: true,
        user: response.data,
      });
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const signup = async (username: string) => {
    try {
      const response = await axios.post('/auth/signup', { username });
      setState({
        isLoggedIn: true,
        user: response.data,
      });
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };


  const logout = async () => {
    setState({
      isLoggedIn: false,
      user: null,
    });
  };

  const editUser = async (name: string) => {
    if (state.user) {
      const updatedUser = { ...state.user, username: name };
      setState((prevState) => ({
        ...prevState,
        user: updatedUser,
      }));
      await axios.put(`/user/${state.user.id}`, updatedUser);
    }
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
