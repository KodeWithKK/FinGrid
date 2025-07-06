"use client";

import { Toaster } from "@/components/ui/sonner";

import ReactQueryProvider from "./react-query-provider";
import { ThemeProvider } from "./theme-provider";

function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-center" />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

export default RootProvider;
