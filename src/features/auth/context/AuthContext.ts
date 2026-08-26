import { createContext } from 'react';
import type { User } from '../types/auth';

export interface AuthContextValue {
  user: User;
  users: User[];
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
user     → کاربر فعلی
users    → تمام کاربران آزمایشی
setUser  → تابع تغییر کاربر فعلی
 */
