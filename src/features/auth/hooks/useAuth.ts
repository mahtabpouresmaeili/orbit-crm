import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext); //opens the shared authentication box

  if (context === undefined) {
    //if the compoenet is outside AuthProvider , the value is undefined
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
