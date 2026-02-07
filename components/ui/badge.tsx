import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "error";
  className?: string;
}

export function Badge({ label, variant = "default", className }: BadgeProps) {
  const variantClasses = {
    default: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
  };

  return (
    <View className={cn("rounded-full px-3 py-1", variantClasses[variant], className)}>
      <Text className="text-xs font-semibold text-background">
        {label}
      </Text>
    </View>
  );
}
