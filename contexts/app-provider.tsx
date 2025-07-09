"use client";

import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Transaction } from "@/database/schema";
import { getTransactions } from "@/services/transactions";

interface IAppContext {
  isTransactionsLoading: boolean;
  transactions: undefined | Transaction[];
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

function AppProvider({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true);

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
