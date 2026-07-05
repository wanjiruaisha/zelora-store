import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "zelora_user";

function getStoredUser() {
  try {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to load user from localStorage:", error);
    return null;
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = ({ email, password }) => {
    setAuthError("");

    if (!email.trim() || !password.trim()) {
      setAuthError("Please enter your email and password.");
      return false;
    }

    if (!email.includes("@")) {
      setAuthError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return false;
    }

    const demoUser = {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      role: "customer",
    };

    setUser(demoUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setAuthError("");
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    authError,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };