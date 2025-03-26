
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff" | "user";
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  resetPassword: async () => false,
});

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@duttmandir.com",
    password: "admin123",
    role: "admin" as const,
  },
  {
    id: "2",
    name: "Staff Member",
    email: "staff@duttmandir.com",
    password: "staff123",
    role: "staff" as const,
  },
];

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("temple_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem("temple_user", JSON.stringify(userWithoutPassword));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800); // Simulate network delay
    });
  };

  // Register function
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = MOCK_USERS.find((u) => u.email === email);
        if (existingUser) {
          resolve(false);
        } else {
          // In a real app, this would be handled by a backend
          const newUser = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            role: "user" as const,
          };
          setUser(newUser);
          localStorage.setItem("temple_user", JSON.stringify(newUser));
          resolve(true);
        }
      }, 800);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("temple_user");
  };

  // Reset password function
  const resetPassword = async (email: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = MOCK_USERS.find((u) => u.email === email);
        if (existingUser) {
          // In a real app, this would send an email with reset link
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
