"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Transaction } from "@/database/schema";
import useIsMobile from "@/hooks/use-is-mobile";
import { getTransactions } from "@/services/transactions";

interface IAppContext {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isTransactionsLoading: boolean;
  transactions: undefined | Transaction[];
}

const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

interface AppProviderProps {
  children: React.ReactNode;
  isMobileSSR: boolean;
}

function AppProvider({ children, isMobileSSR }: AppProviderProps) {
  const isMobileBreakpoint = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobileSSR);

  useEffect(() => {
    if (isMobileBreakpoint != null) {
      setShowSidebar(!isMobileBreakpoint);
    }
  }, [isMobileBreakpoint]);

  const { isLoading: isTransactionsLoading, data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });

  return (
    <AppContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        isTransactionsLoading,
        transactions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
