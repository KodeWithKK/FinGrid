"use client";

import Link from "next/link";
import {
  IndianRupee,
  LayoutDashboard,
  PanelLeftClose,
  Target,
} from "lucide-react";

import { IconBrand } from "@/components/icons";
import { useAppContext } from "@/contexts/app-provider";
import { cn } from "@/lib/utils";

import { NavItem } from "./nav-item";

function SideBar() {
  const { showSidebar, setShowSidebar } = useAppContext();

  return (
    <div className="flex">
      <aside
        className={cn(
          "bg-background fixed top-0 -left-64 z-50 flex h-screen w-64 flex-col items-center border-r p-5 transition-all duration-300 *:w-full md:left-0 md:duration-500",
          showSidebar && "left-0",
          !showSidebar && "px-3 md:w-20",
        )}
      >
        <div className="flex justify-center">
          <Link href="/" className="flex h-[28px] items-center gap-2.5">
            <IconBrand className="text-primary h-6" />
            <h3
              className={cn(
                "truncate text-lg font-semibold tracking-wider",
                !showSidebar && "md:hidden",
              )}
            >
              Financify
            </h3>
          </Link>
          <button
            type="button"
            className={cn(
              "ml-auto cursor-pointer text-gray-500",
              !showSidebar && "md:hidden",
            )}
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            <PanelLeftClose className="h-6 scale-120" strokeWidth={1.5} />
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

        <button
          type="button"
          className={cn(
            "mt-auto hidden cursor-pointer justify-center text-gray-500",
            !showSidebar && "md:flex",
          )}
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <PanelLeftClose
            className="h-6 scale-120 rotate-180"
            strokeWidth={1.5}
          />
        </button>
      </aside>
      {showSidebar && (
        <div className="fixed left-0 z-25 h-screen w-full backdrop-blur-md md:hidden"></div>
      )}
    </div>
  );
}

export default SideBar;
