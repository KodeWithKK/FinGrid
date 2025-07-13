"use client";

import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Transaction } from "@/database/schema";
import { getTransactions } from "@/services/transactions";

interface IAppContext {
  mobileShowSidebar: boolean;
  setMobileShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  desktopShowSidebar: boolean;
  setDesktopShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isTransactionsLoading: boolean;
  transactions: undefined | Transaction[];
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

  return (
    <AppContext.Provider
      value={{
        mobileShowSidebar,
        setMobileShowSidebar,
        desktopShowSidebar,
        setDesktopShowSidebar,
        isTransactionsLoading,
        transactions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
