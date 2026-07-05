import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const AUTH_USER_KEY = "zelora_user";
const AUTH_ACCOUNTS_KEY = "zelora_accounts";

function getStoredUser() {
  try {
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to load user:", error);
    return null;
  }
}

function getStoredAccounts() {
  try {
    const storedAccounts = localStorage.getItem(AUTH_ACCOUNTS_KEY);
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  } catch (error) {
    console.error("Failed to load accounts:", error);
    return [];
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [accounts, setAccounts] = useState(getStoredAccounts);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }, [user]);

  const signUp = ({ fullName, email, password, confirmPassword }) => {
    setAuthError("");

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setAuthError("Please fill in all required fields.");
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

    if (password !== confirmPassword) {
      setAuthError("Passwords do not match.");
      return false;
    }

    const accountExists = accounts.some(
      (account) => account.email.toLowerCase() === email.toLowerCase()
    );

    if (accountExists) {
      setAuthError("An account with this email already exists.");
      return false;
    }

    const newAccount = {
      id: crypto.randomUUID(),
      fullName,
      email,
      password,
      role: "customer",
      createdAt: new Date().toISOString(),
    };

    setAccounts((currentAccounts) => [...currentAccounts, newAccount]);

    const signedInUser = {
      id: newAccount.id,
      name: newAccount.fullName,
      email: newAccount.email,
      role: newAccount.role,
    };

    setUser(signedInUser);

    return true;
  };

  const login = ({ email, password }) => {
    setAuthError("");

    if (!email.trim() || !password.trim()) {
      setAuthError("Please enter your email and password.");
      return false;
    }

    const existingAccount = accounts.find(
      (account) => account.email.toLowerCase() === email.toLowerCase()
    );

    if (!existingAccount) {
      setAuthError("No account found with this email address.");
      return false;
    }

    if (existingAccount.password !== password) {
      setAuthError("Incorrect password. Please try again.");
      return false;
    }

    const signedInUser = {
      id: existingAccount.id,
      name: existingAccount.fullName,
      email: existingAccount.email,
      role: existingAccount.role,
    };

    setUser(signedInUser);

    return true;
  };

  const logout = () => {
    setUser(null);
    setAuthError("");
  };

  const value = {
    user,
    accounts,
    isAuthenticated: Boolean(user),
    authError,
    signUp,
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