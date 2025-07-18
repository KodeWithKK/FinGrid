import { Geist, Libre_Baskerville } from "next/font/google";
import type { Metadata } from "next";

import RootProvider from "@/contexts/root-provider";

import DynamicSidebar from "./_components/dynamic-sidebar";
import MainContainer from "./_components/main-container";

import "./globals.css";

const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontSerif = Libre_Baskerville({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Financify | Personal Finance Management",
  description:
    "Manage your personal finances with ease using Financify. Track income, expenses, and budgets.",
  icons: "icon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} antialiased`}
        suppressHydrationWarning
      >
        <RootProvider>
          <DynamicSidebar />
          <MainContainer>{children}</MainContainer>
        </RootProvider>
      </body>
    </html>
  );
}
