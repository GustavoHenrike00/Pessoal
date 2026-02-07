import { View, Text, ScrollView } from "react-native";
import { Card } from "./card";

interface FinancialChartProps {
  income: number;
  expenses: number;
  categories?: Record<string, number>;
}

export function FinancialChart({ income, expenses, categories }: FinancialChartProps) {
  const balance = income - expenses;
  const total = income + expenses;
  const incomePercent = total > 0 ? (income / total) * 100 : 0;
  const expensePercent = total > 0 ? (expenses / total) * 100 : 0;

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="gap-4">
      {/* Summary Cards */}
      <View className="flex-row gap-2">
        <Card className="flex-1 p-4 gap-1">
          <Text className="text-xs text-muted">Receita</Text>
          <Text className="text-lg font-bold text-success">
            +R$ {income.toFixed(2)}
          </Text>
        </Card>
        <Card className="flex-1 p-4 gap-1">
          <Text className="text-xs text-muted">Despesa</Text>
          <Text className="text-lg font-bold text-error">
            -R$ {expenses.toFixed(2)}
          </Text>
        </Card>
      </View>

      {/* Balance */}
      <Card className="p-4 gap-2">
        <Text className="text-xs text-muted">Saldo</Text>
        <Text className={`text-2xl font-bold ${balance >= 0 ? "text-success" : "text-error"}`}>
          {balance >= 0 ? "+" : ""}R$ {balance.toFixed(2)}
        </Text>
      </Card>

      {/* Progress Bar */}
      <Card className="p-4 gap-3">
        <View className="gap-1">
          <View className="flex-row justify-between">
            <Text className="text-xs font-semibold text-foreground">Distribuição</Text>
            <View className="flex-row gap-2">
              <View className="flex-row items-center gap-1">
                <View className="w-3 h-3 rounded-full bg-success" />
                <Text className="text-xs text-muted">{incomePercent.toFixed(0)}%</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <View className="w-3 h-3 rounded-full bg-error" />
                <Text className="text-xs text-muted">{expensePercent.toFixed(0)}%</Text>
              </View>
            </View>
          </View>

          <View className="flex-row rounded-full overflow-hidden h-2 bg-surface">
            <View
              style={{ width: `${incomePercent}%` }}
              className="bg-success"
            />
            <View
              style={{ width: `${expensePercent}%` }}
              className="bg-error"
            />
          </View>
        </View>
      </Card>

      {/* Categories */}
      {categories && Object.keys(categories).length > 0 && (
        <Card className="p-4 gap-3">
          <Text className="text-sm font-semibold text-foreground">Categorias</Text>
          {Object.entries(categories)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([category, value]) => (
              <View key={category} className="gap-1">
                <View className="flex-row justify-between">
                  <Text className="text-xs text-muted">{category}</Text>
                  <Text className="text-xs font-semibold text-foreground">
                    R$ {value.toFixed(2)}
                  </Text>
                </View>
                <View className="h-1 bg-surface rounded-full overflow-hidden">
                  <View
                    style={{
                      width: `${(value / Math.max(...Object.values(categories))) * 100}%`,
                    }}
                    className="bg-primary h-full"
                  />
                </View>
              </View>
            ))}
        </Card>
      )}
    </ScrollView>
  );
}
