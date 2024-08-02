import React, { createContext, ReactNode, useContext, useState } from "react";
import api from '../Service/ApiService';



interface IAuthContext {
  state: {
    isLoggedIn: boolean;
    user: User | null;
  };
  actions: {
    login: (username: string) => Promise<boolean>;
    signup: (username: string) => Promise<boolean>;
    logout: () => Promise<void>;
    editUser: (updatedUserDetails: { displayName: string; aboutMe: string }) => Promise<void>;
    deleteUser: (username: string) => Promise<boolean>;
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
    logout: async () => { },
    editUser: async () => { },
    deleteUser: async () => false,
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
      const response = await api.post('/api/Users/signin', { username });
      if (response.data.success) {
        localStorage.setItem('auth_token', username);
        setState({
          isLoggedIn: true,
          user: response.data.user,
        });
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
      // Clear user data
      user: null,
    });
  };

  const editUser = async (updatedUserDetails: { displayName: string; aboutMe: string }) => {
    if (state.user) {
      try {
        const updatedUser = { ...state.user, ...updatedUserDetails };
        const response = await api.put(`/api/Users/edit`, updatedUser);
        if (response.data.success) {
          setState((prevState) => ({
            ...prevState,
            user: updatedUser,
          }));
        }
      } catch (error) {
        console.error("Failed to update user", error);
      }
    }
  };

  const deleteUser = async (username: string) => {
    try {
      const response = await api.delete(`/api/Users/delete`, { data: { username } });
      if (response.data.success) {
        localStorage.removeItem('auth_token');
        setState({
          isLoggedIn: false,
          user: null,
        });
        return true;
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    }
    return false;
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
