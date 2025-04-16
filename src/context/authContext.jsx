import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { decodeToken, getTokenExpiration } from "../utils/tokenUtils/token";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
    user: null,
  });

  const isTokenValid = (token) => {
    if (!token) return false;
    const expiration = getTokenExpiration(token);
    return expiration ? Date.now() < expiration : false;
  };

  useEffect(() => {
    if (!authState.token) return;

    const expiration = getTokenExpiration(authState.token);
    if (!expiration) {
      logout();
      return;
    }

    const timeLeft = expiration - Date.now();
    if (timeLeft <= 0) {
      logout();
      return;
    }

    const logoutTimer = setTimeout(logout, timeLeft);
    return () => clearTimeout(logoutTimer);
  }, [authState.token]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && isTokenValid(token)) {
      login(token);
    } else {
      logout();
    }
  }, []);

  const login = (token) => {
    if (!isTokenValid(token)) {
      logout();
      return;
    }

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
      isTokenExpired: () => !isTokenValid(authState.token),
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
