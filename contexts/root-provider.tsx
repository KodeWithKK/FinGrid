"use client";

import { Toaster } from "@/components/ui/sonner";

import AppProvider from "./app-provider";
import ReactQueryProvider from "./react-query-provider";
import ThemeProvider from "./theme-provider";

interface RootProviderProps {
  children: React.ReactNode;
  isMobileSSR: boolean;
}

function RootProvider({ children, isMobileSSR }: RootProviderProps) {
  return (
    <ReactQueryProvider>
      <AppProvider isMobileSSR={isMobileSSR}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors={false} />
        </ThemeProvider>
      </AppProvider>
    </ReactQueryProvider>
  );
}

export default RootProvider;
