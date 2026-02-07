import { View, Text, Pressable } from "react-native";

export type EventCategory = "trabalho" | "pessoal" | "urgente" | "lazer" | "saude" | "outro";

export interface CategoryOption {
  id: EventCategory;
  label: string;
  color: string;
  icon: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: "trabalho", label: "Trabalho", color: "#3B82F6", icon: "💼" },
  { id: "pessoal", label: "Pessoal", color: "#22C55E", icon: "👤" },
  { id: "urgente", label: "Urgente", color: "#EF4444", icon: "⚠️" },
  { id: "lazer", label: "Lazer", color: "#F59E0B", icon: "🎉" },
  { id: "saude", label: "Saúde", color: "#EC4899", icon: "🏥" },
  { id: "outro", label: "Outro", color: "#8B5CF6", icon: "📌" },
];

interface CategorySelectorProps {
  selectedCategory?: EventCategory;
  onSelectCategory?: (category: EventCategory) => void;
}

export function CategorySelector({
  selectedCategory = "pessoal",
  onSelectCategory,
}: CategorySelectorProps) {
  return (
    <View className="gap-3">
      <Text className="text-sm font-semibold text-muted uppercase">Categoria</Text>
      <View className="flex-row flex-wrap gap-2">
        {CATEGORY_OPTIONS.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <Pressable
              key={category.id}
              onPress={() => onSelectCategory?.(category.id)}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <View
                className={`flex-row items-center gap-2 px-3 py-2 rounded-full border-2 ${
                  isSelected ? "border-primary bg-primary/10" : "border-border bg-surface"
                }`}
              >
                <Text className="text-lg">{category.icon}</Text>
                <Text
                  className={`text-xs font-medium ${
                    isSelected ? "text-primary" : "text-foreground"
                  }`}
                >
                  {category.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
