import { Pressable, Text, type PressableProps, StyleSheet } from "react-native";
import { cn } from "@/lib/utils";

export interface ButtonProps extends PressableProps {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Button({
  label,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-primary",
    secondary: "bg-surface border border-border",
    danger: "bg-error",
  };

  const sizeClasses = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-6 py-4",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const styles = StyleSheet.create({
    pressable: {
      borderRadius: 8,
    },
  });

  return (
    <Pressable
      style={({ pressed }) => ({
        ...styles.pressable,
        transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
        opacity: pressed ? 0.9 : 1,
      })}
      {...props}
    >
      <Text
        className={cn(
          "font-semibold rounded-lg text-center",
          variantClasses[variant],
          sizeClasses[size],
          textSizeClasses[size],
          variant === "primary" && "text-background",
          variant === "secondary" && "text-foreground",
          variant === "danger" && "text-background",
          className
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}
