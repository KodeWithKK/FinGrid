import { Geist, Libre_Baskerville } from "next/font/google";
import type { Metadata } from "next";

import RootProvider from "@/contexts/root-provider";

import NavBar from "./_components/nav-bar";
import SideBar from "./_components/side-bar";

import "./globals.css";

import MainContainer from "./_components/main-container";

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
  title: "Financiy | Personal Finance Management",
  description:
    "Manage your personal finances with ease using Financiy. Track income, expenses, and budgets.",
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
          <SideBar />
          <NavBar />

          <MainContainer>{children}</MainContainer>
        </RootProvider>
      </body>
    </html>
  );
}
