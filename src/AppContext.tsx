import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
  navBarData: string;
  setNavBarData: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [navBarData, setNavBarData] = useState<string>('');

  return (
    <AppContext.Provider value={{ navBarData, setNavBarData }}>
      {children}
    </AppContext.Provider>
  );
};
