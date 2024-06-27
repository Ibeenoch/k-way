import React, { ReactNode, createContext, useContext, useState } from 'react'

interface AppContextProps {
    refresh: false | true;
    toggleRefresh: () => void;
}

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [refresh, setRefresh] = useState<false | true>(false);
    const toggleRefresh = () => {
        setRefresh(refresh === false ? true : false)
    }
  return (
    <AppContext.Provider value={{ refresh, toggleRefresh }}>
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
}
