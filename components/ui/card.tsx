import { View, type ViewProps } from "react-native";
import { cn } from "@/lib/utils";

export interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ className, ...props }: CardProps) {
  return (
    <View
      className={cn(
        "bg-surface rounded-lg p-4 border border-border",
        className
      )}
      {...props}
    />
  );
}
