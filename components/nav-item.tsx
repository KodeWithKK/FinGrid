"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
}

export function NavItem({ icon, title, href }: NavItemProps) {
  const isActive = usePathname() === href;

  return (
    <Link
      href={href}
      className={cn(
        "bg-background block overflow-hidden rounded-lg pl-0 transition-all duration-200",
        isActive &&
          "bg-[linear-gradient(to_right,var(--primary),transparent)] pl-0.5",
      )}
    >
      <div
        className={cn(
          "bg-background flex items-center rounded-lg border p-2",
          isActive && "bg-background/70",
        )}
      >
        <span className="mr-2">{icon}</span>
        <span>{title}</span>
      </div>
    </Link>
  );
}
