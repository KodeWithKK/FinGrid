import { IconLoader2 } from "@/components/icons";

function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-0 flex h-screen w-full flex-col items-center justify-center gap-2 md:absolute"
      style={{ height: "100dvh" }}
    >
      <IconLoader2 className="h-8 animate-spin" />
      <span className="text-muted-foreground text-lg">Loading...</span>
    </div>
  );
}

export default LoadingScreen;
