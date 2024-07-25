import React, { createContext, useEffect, useState, ReactNode } from "react";
import { useLogin, useLogout, useUser } from "../Hooks";
import { User } from "../Types/Entities";


interface IAuthContext {
  state: {
    isLoggedIn: boolean;
    authToken: string;
    user: User | null;
  };

  actions: {
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    editUser: (user: User) => Promise<void>;
  };
}

const initialState = {
  state: { isLoggedIn: false, authToken: "", user: null },
  actions: {
    login: async () => false,
    logout: async () => {},
    editUser: async () => {},
  },
};

  
  const AuthContext = createContext<IAuthContext>(initialState);


  const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState({
      isLoggedIn: false,
      authToken: "",
      user: null as User | null,
    });
  
    const login = async (username: string, password: string) => {
      const token = await useLogin(username, password);
      if (token) {
        const user = await useUser(token);
        setState({
          isLoggedIn: true,
          authToken: token,
          user: user,
        });
        return true;
      }
      return false;
    };
  
    const logout = async () => {
      await useLogout();
      setState({
        isLoggedIn: false,
        authToken: "",
        user: null,
      });
    };
  
    const editUser = async (user: User) => {
      // Update user logic here
      setState((prevState) => ({
        ...prevState,
        user: user,
      }));
    };
  
    return (
      <AuthContext.Provider
        value={{
          state,
          actions: {
            login,
            logout,
            editUser,
          },
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

export { AuthContext, AuthProvider };