import { Geist, Geist_Mono } from "next/font/google";
import {
  IndianRupee,
  LayoutDashboard,
  PanelLeftClose,
  Target,
} from "lucide-react";
import type { Metadata } from "next";

import { IconBrand } from "@/components/icons";
import { NavItem } from "@/components/nav-item";
import RootProvider from "@/contexts/root-provider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinGrid | Personal Finance Management",
  description:
    "Manage your personal finances with ease using FinGrid. Track income, expenses, and budgets.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <RootProvider>
          <div className="fixed top-0 left-0 h-screen w-64 border-r p-5">
            <div className="flex items-center gap-2">
              <IconBrand className="text-primary h-6" />
              <h3 className="text-lg font-semibold tracking-wider">FinGrid</h3>
              <button type="button" className="ml-auto text-gray-500">
                <PanelLeftClose className="h-6" />
              </button>
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
              <NavItem
                title="Dashboard"
                icon={<LayoutDashboard className="h-5" />}
                href="/"
              />
              <NavItem
                title="Transactions"
                icon={<IndianRupee className="h-5" />}
                href="/transactions"
              />
              <NavItem
                title="Budget"
                icon={<Target className="h-5" />}
                href="/budget"
              />
            </div>
          </div>

          <div className="pl-64">{children}</div>
        </RootProvider>
      </body>
    </html>
  );
}
