"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

type ProgressProps = {
  direction?: "left" | "right";
};

function Progress({
  className,
  direction = "left",
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={
          direction === "left"
            ? { transform: `translateX(-${100 - (value || 0)}%)` }
            : { transform: `translateX(${100 - (value || 0)}%)` }
        }
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
