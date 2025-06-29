import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getEmployeeByUid, updateEmployee } from '../services/firebaseService';
import { Employee } from '../types';

interface AuthContextType {
  currentUser: User | null;
  employee: Employee | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userData: Partial<Employee>) => Promise<void>;
  logout: () => Promise<void>;
  updateEmployee: (employeeId: string, data: Partial<Employee>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const { signIn } = await import('../services/firebaseService');
    await signIn(email, password);
  };

  const signup = async (email: string, password: string, userData: Partial<Employee>) => {
    const { signUp } = await import('../services/firebaseService');
    await signUp(email, password, userData);
  };

  const logout = async () => {
    const { signOut } = await import('../services/firebaseService');
    await signOut();
    setEmployee(null);
  };

  const updateEmployeeData = async (employeeId: string, data: Partial<Employee>) => {
    await updateEmployee(employeeId, data);
    // Обновляем локальное состояние
    if (employee && employee.id === employeeId) {
      setEmployee(prev => prev ? { ...prev, ...data } : null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch employee data
        const employeeData = await getEmployeeByUid(user.uid);
        setEmployee(employeeData);
      } else {
        setEmployee(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    employee,
    loading,
    login,
    signup,
    logout,
    updateEmployee: updateEmployeeData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};