"use client";

import Link from "next/link";
import { PanelLeftClose } from "lucide-react";

import { IconBrand } from "@/components/icons";
import { useAppContext } from "@/contexts/app-provider";
import { cn } from "@/lib/utils";

function NavBar() {
  const { showSidebar, setShowSidebar } = useAppContext();

  return (
    <div className="sticky top-0 left-0 z-20 flex h-16 items-center border-b backdrop-blur-md md:hidden">
      <button
        type="button"
        className="z-20 ml-6 cursor-pointer text-gray-500"
        onClick={() => setShowSidebar(true)}
      >
        <PanelLeftClose
          className={cn("h-6 scale-120 rotate-180", showSidebar && "hidden")}
          strokeWidth={1.5}
        />
      </button>

      <div className="left absolute mx-auto flex w-full items-center justify-center">
        <Link href="/" className="flex items-center justify-center gap-3 py-2">
          <IconBrand className="text-primary h-6" />
          <h3 className="text-lg font-semibold tracking-wider">Financify</h3>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
