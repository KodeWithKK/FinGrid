"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAppContext } from "@/contexts/app-provider";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
}

export function NavItem({ icon, title, href }: NavItemProps) {
  const isActive = usePathname() === href;
  const { showSidebar } = useAppContext();

  return (
    <Link
      href={href}
      className={cn(
        "bg-background group block rounded-lg pl-0 transition-all duration-200 hover:bg-[linear-gradient(to_right,var(--primary),transparent)]",
        isActive &&
          "bg-[linear-gradient(to_right,var(--primary),transparent)] pl-1",
        !showSidebar && isActive && "bg-primary md:px-[3px]",
      )}
    >
      <div
        className={cn(
          "bg-background flex h-[42px] items-center rounded-md border p-2 transition-all",
          isActive && "bg-background/70",
          !isActive && "group-hover:bg-background/85",
        )}
      >
        <span
          className={cn(
            "mr-2 transition-all",
            !showSidebar && "md:mx-0 md:pl-1.5",
            !showSidebar && isActive && "md:pl-[3px]",
          )}
        >
          {icon}
        </span>
        <span className={cn("truncate", !showSidebar && "md:hidden")}>
          {title}
        </span>
      </div>
    </Link>
  );
}
