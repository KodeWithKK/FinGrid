import { Geist, Libre_Baskerville } from "next/font/google";
import { headers } from "next/headers";
import type { Metadata } from "next";

import RootProvider from "@/contexts/root-provider";
import { cn } from "@/lib/utils";

import MainContainer from "./_components/main-container";
import NavBar from "./_components/nav-bar";
import SideBar from "./_components/side-bar";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile =
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${fontSans.variable} ${fontSerif.variable} antialiased`,
          isMobile ? "mobile" : "desktop",
        )}
        suppressHydrationWarning
      >
        <RootProvider isMobileSSR={isMobile}>
          <SideBar />
          <NavBar />
          <MainContainer>{children}</MainContainer>
        </RootProvider>
      </body>
    </html>
  );
}
