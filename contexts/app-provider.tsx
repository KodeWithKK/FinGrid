import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { Transaction } from "@/database/schema";
import { getTransactions } from "@/services/transactions";

interface IAppContext {
  isTransactionsLoading: boolean;
  transactions: undefined | Transaction[];
}

const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

function AppProvider({ children }: { children: React.ReactNode }) {
  const { isLoading: isTransactionsLoading, data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });

  return (
    <AppContext.Provider
      value={{
        isTransactionsLoading,
        transactions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
