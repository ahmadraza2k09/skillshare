import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, UserRole } from '../data/types';

type AuthContextType = {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

const DEMO_USERS: Record<UserRole, User> = {
  volunteer: {
    id: 'u1',
    name: 'Ahmad Raza',
    email: 'ahmad@demo.com',
    role: 'volunteer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format',
    joinedAt: '2024-03-12',
  },
  community_member: {
    id: 'u2',
    name: 'Sara Khan',
    email: 'sara@demo.com',
    role: 'community_member',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&auto=format',
    joinedAt: '2024-05-08',
  },
  organization: {
    id: 'u5',
    name: 'Bright Future Foundation',
    email: 'info@brightfuture.org.pk',
    role: 'organization',
    joinedAt: '2024-02-14',
  },
  admin: {
    id: 'u4',
    name: 'Admin User',
    email: 'admin@khayr.org',
    role: 'admin',
    joinedAt: '2023-11-01',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => setUser(DEMO_USERS[role]);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
