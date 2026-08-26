import { useState, type ReactNode } from 'react';
import { mockUsers } from '../data/mockUsers';
import type { User } from '../types/auth';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(mockUsers[2]);

  return (
    <AuthContext.Provider
      value={{
        user,
        users: mockUsers,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
AuthContextValue = the list of items a package must contain.
createContext = the machine that creates the delivery box.
AuthContext = the delivery box.
AuthProvider = the person who fills and distributes the box.
*/
