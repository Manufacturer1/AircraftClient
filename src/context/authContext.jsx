import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { decodeToken } from "../utils/token";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      login(token);
    }
  }, []);

  const login = (token) => {
    const decoded = decodeToken(token);

    localStorage.setItem("authToken", token);
    setAuthState({
      token,
      isAuthenticated: true,
      user: {
        email: decoded.email,
        fullName: decoded.name,
        roles: decoded.roles || [],
      },
    });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    setAuthState({
      token: null,
      isAuthenticated: false,
      user: null,
    });
  };

  const contextValue = useMemo(
    () => ({
      ...authState,
      login,
      logout,
    }),
    [authState]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
