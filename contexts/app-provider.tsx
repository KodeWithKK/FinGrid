"use client";

import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Budget, Transaction } from "@/database/schema";
import { getBudgets } from "@/services/budget";
import { getTransactions } from "@/services/transactions";

interface IAppContext {
  mobileShowSidebar: boolean;
  desktopShowSidebar: boolean;
  setMobileShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setDesktopShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isTransactionsLoading: boolean;
  transactions: undefined | Transaction[];
  isBudgetsLoading: boolean;
  budgets: undefined | Budget[];
}

const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

function AppProvider({ children }: { children: React.ReactNode }) {
  const [mobileShowSidebar, setMobileShowSidebar] = useState(false);
  const [desktopShowSidebar, setDesktopShowSidebar] = useState(true);

  const { isLoading: isTransactionsLoading, data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });

  const { isLoading: isBudgetsLoading, data: budgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: () => getBudgets(),
  });

  return (
    <AppContext.Provider
      value={{
        mobileShowSidebar,
        desktopShowSidebar,
        setMobileShowSidebar,
        setDesktopShowSidebar,
        isTransactionsLoading,
        transactions,
        isBudgetsLoading,
        budgets,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
