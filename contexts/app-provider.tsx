"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Transaction } from "@/database/schema";
import useIsMobile from "@/hooks/use-is-mobile";
import { getTransactions } from "@/services/transactions";

interface IAppContext {
  isMobileBreakpoint: boolean;
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isTransactionsLoading: boolean;
  transactions: undefined | Transaction[];
}

const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

function AppProvider({ children }: { children: React.ReactNode }) {
  const isMobileBreakpoint = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(false);

  useLayoutEffect(() => {
    if (!isMobileBreakpoint) {
      setShowSidebar(true);
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
        isMobileBreakpoint,
        isTransactionsLoading,
        transactions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
