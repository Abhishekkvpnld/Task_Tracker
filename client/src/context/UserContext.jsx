import {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";

  
  // Create Context
  const UserContext = createContext(undefined);
  
  // User Provider Component
  export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
    
    }, []);
  
    return (
      <UserContext.Provider value={{ user, loading }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  // Custom hook to use User Context
  export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  };
  