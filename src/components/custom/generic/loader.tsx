import { cn } from "@/lib/utils";
import React from "react";

interface loaderProps {
  className?: string;
}
function Loader({ className }: loaderProps) {
  return (
    <span className="ml-1.5 flex items-center gap-1">
      <span
        className={cn(
          "inline-block h-1 w-1 animate-flashing rounded-full bg-white",
          className,
        )}
      />
      <span
        className={cn(
          "inline-block h-1 w-1 animate-flashing rounded-full bg-white delay-100",
          className,
        )}
      />
      <span
        className={cn(
          "inline-block h-1 w-1 animate-flashing rounded-full bg-white delay-200",
          className,
        )}
      />
    </span>
  );
}

export default Loader;
