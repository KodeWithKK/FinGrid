"use client";

import { Toaster } from "@/components/ui/sonner";

import AppProvider from "./app-provider";
import ReactQueryProvider from "./react-query-provider";
import ThemeProvider from "./theme-provider";

function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AppProvider>
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
