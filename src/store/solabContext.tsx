import React, { createContext } from "react";

// Define user data type
type UserData = {
  id: string;
  email: string | null;
  name: string | null;
  picture: string | null;
};

// Define the context type
type SolabContextType = {
  currentUser: UserData | null;
  setCurrentUser: (user: UserData | null) => void;
};

// Create context with a default value (undefined)
const SolabContext = createContext<SolabContextType | undefined>(undefined);

export default SolabContext;
