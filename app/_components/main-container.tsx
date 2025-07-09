"use client";

import { useAppContext } from "@/contexts/app-provider";
import { cn } from "@/lib/utils";

function MainContainer({ children }: { children: React.ReactNode }) {
  const { showSidebar } = useAppContext();

  return (
    <div
      className={cn(
        "transition-all duration-500 md:pl-64",
        !showSidebar && "md:pl-20",
      )}
    >
      <main className="px-4 py-6 md:px-6">{children}</main>
    </div>
  );
}

export default MainContainer;
