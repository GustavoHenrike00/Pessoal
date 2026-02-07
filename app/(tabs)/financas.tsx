import { ScrollView, Text, View, Pressable, Alert, FlatList, Modal, TextInput } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { Card } from "@/components/ui/card";
import { FinancialChart } from "@/components/ui/financial-chart";
import { useState } from "react";

export default function FinancasScreen() {
  const [transactions, setTransactions] = useState([
    { id: 1, title: "Salário ECO", amount: 781.48, type: "income", date: "2026-01-15", category: "Salario" },
    { id: 2, title: "Streaming", amount: 24.97, type: "expense", date: "2026-01-01", category: "Streaming" },
    { id: 3, title: "Farmácia", amount: 24.97, type: "expense", date: "2026-01-12", category: "Farmacia" },
    { id: 4, title: "Lanche", amount: 111.93, type: "expense", date: "2026-01-18", category: "Lanche" },
    { id: 5, title: "Mercado", amount: 51.99, type: "expense", date: "2026-01-04", category: "Mercado" },
    { id: 6, title: "Ajuda Casa", amount: 225.62, type: "expense", date: "2026-01-16", category: "Ajud. Casa" },
    { id: 7, title: "Investimento", amount: 300, type: "expense", date: "2026-01-13", category: "Investir" },
    { id: 8, title: "Uber", amount: 117.81, type: "expense", date: "2026-01-09", category: "Uber" },
    { id: 9, title: "Roupas", amount: 164.99, type: "expense", date: "2026-01-12", category: "Roupas" },
    { id: 10, title: "Jogos/Software", amount: 200.41, type: "expense", date: "2026-01-15", category: "Jogos" },
    { id: 11, title: "Empréstimo Mãe", amount: 80, type: "expense", date: "2026-01-17", category: "Emprestar" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    date: "",
    category: "",
  });

  const [showImportModal, setShowImportModal] = useState(false);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  // Calcular categorias
  const categories: Record<string, number> = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    }
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleAddTransaction = () => {
    setEditingId(null);
    setFormData({
      title: "",
      amount: "",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
      category: "",
    });
    setShowModal(true);
  };

  const handleEditTransaction = (transaction: any) => {
    setEditingId(transaction.id);
    setFormData({
      title: transaction.title,
      amount: transaction.amount.toString(),
      type: transaction.type,
      date: transaction.date,
      category: transaction.category,
    });
    setShowModal(true);
  };

  const handleSaveTransaction = () => {
    if (!formData.title.trim() || !formData.amount.trim() || !formData.date.trim()) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Erro", "Valor deve ser um número positivo");
      return;
    }

    if (editingId) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingId
            ? {
                ...t,
                title: formData.title,
                amount,
                type: formData.type,
                date: formData.date,
                category: formData.category,
              }
            : t
        )
      );
      Alert.alert("Sucesso", "Transação atualizada!");
    } else {
      const newTransaction = {
        id: Math.max(...transactions.map((t) => t.id), 0) + 1,
        title: formData.title,
        amount,
        type: formData.type,
        date: formData.date,
        category: formData.category,
      };
      setTransactions([...transactions, newTransaction]);
      Alert.alert("Sucesso", "Transação criada!");
    }

    setShowModal(false);
    setFormData({
      title: "",
      amount: "",
      type: "expense",
      date: "",
      category: "",
    });
  };

  const handleDeleteTransaction = (id: number) => {
    Alert.alert(
      "Deletar Transação",
      "Tem certeza que deseja deletar esta transação?",
      [
        { text: "Cancelar", onPress: () => {} },
        {
          text: "Deletar",
          onPress: () => {
            setTransactions(transactions.filter((t) => t.id !== id));
            Alert.alert("Sucesso", "Transação deletada!");
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleImportExcel = () => {
    Alert.alert(
      "Importar Excel",
      "Arquivo de exemplo carregado com dados de janeiro/2026. Você pode adicionar mais transações manualmente.",
      [{ text: "OK", onPress: () => setShowImportModal(false) }]
    );
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-1">
            <Text className="text-2xl font-bold text-foreground">Finanças</Text>
            <Text className="text-sm text-muted">Controle suas finanças</Text>
          </View>

          {/* Summary Card */}
          <Card className="gap-3 p-4">
            <Text className="text-sm font-semibold text-muted uppercase">Resumo do Mês</Text>
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="text-xs text-muted mb-1">Entradas</Text>
                <Text className="text-lg font-bold text-success">{formatCurrency(income)}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs text-muted mb-1">Saídas</Text>
                <Text className="text-lg font-bold text-error">{formatCurrency(expense)}</Text>
              </View>
            </View>
            <View className="border-t border-border pt-3 mt-3">
              <Text className="text-xs text-muted mb-1">Saldo</Text>
              <Text className={`text-lg font-bold ${balance >= 0 ? "text-success" : "text-error"}`}>
                {formatCurrency(balance)}
              </Text>
            </View>
          </Card>

          {/* Financial Chart */}
          <FinancialChart income={income} expenses={expense} categories={categories} />

          {/* Import Button */}
          <Pressable
            onPress={() => setShowImportModal(true)}
            className="px-4 py-3 bg-primary/10 rounded-lg items-center border border-primary"
            style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
          >
            <Text className="text-sm font-semibold text-primary">📊 Importar Planilha Excel</Text>
          </Pressable>

          {/* Transactions List */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-muted uppercase">Transações Recentes</Text>
            {transactions.length > 0 ? (
              <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <Card className="flex-row items-center justify-between p-3 mb-2">
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground">{item.title}</Text>
                      <View className="flex-row items-center gap-2 mt-1">
                        <Text className="text-xs text-muted">{formatDate(item.date)}</Text>
                        <Text className="text-xs text-muted">•</Text>
                        <Text className="text-xs text-muted">{item.category}</Text>
                      </View>
                    </View>
                    <View className="items-end gap-1">
                      <Text
                        className={`text-sm font-bold ${
                          item.type === "income" ? "text-success" : "text-error"
                        }`}
                      >
                        {item.type === "income" ? "+" : "-"} {formatCurrency(item.amount)}
                      </Text>
                      <View className="flex-row gap-1">
                        <Pressable
                          onPress={() => handleEditTransaction(item)}
                          className="px-2 py-1 bg-primary/10 rounded"
                          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                        >
                          <Text className="text-xs text-primary font-semibold">Editar</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => handleDeleteTransaction(item.id)}
                          className="px-2 py-1 bg-error/10 rounded"
                          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                        >
                          <Text className="text-xs text-error font-semibold">Deletar</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Card>
                )}
              />
            ) : (
              <Card className="p-6 items-center gap-2">
                <Text className="text-2xl">💰</Text>
                <Text className="text-sm text-muted">Nenhuma transação</Text>
              </Card>
            )}
          </View>

          {/* Add Transaction Button */}
          <Pressable
            onPress={handleAddTransaction}
            className="px-4 py-3 bg-primary rounded-lg items-center"
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text className="text-base font-semibold text-background">+ Adicionar Transação</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Transaction Modal */}
      <Modal visible={showModal} transparent animationType="slide" onRequestClose={() => setShowModal(false)}>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-background rounded-t-3xl p-6 gap-4 max-h-4/5">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xl font-bold text-foreground">
                {editingId ? "Editar Transação" : "Nova Transação"}
              </Text>
              <Pressable
                onPress={() => setShowModal(false)}
                className="p-2"
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <Text className="text-2xl">✕</Text>
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="gap-4">
              {/* Title */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-muted">Descrição *</Text>
                <TextInput
                  placeholder="Ex: Salário"
                  value={formData.title}
                  onChangeText={(text) => setFormData({ ...formData, title: text })}
                  className="border border-border rounded-lg p-3 text-foreground bg-surface"
                  placeholderTextColor="#9BA1A6"
                />
              </View>

              {/* Amount */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-muted">Valor *</Text>
                <TextInput
                  placeholder="Ex: 1500.00"
                  value={formData.amount}
                  onChangeText={(text) => setFormData({ ...formData, amount: text })}
                  keyboardType="decimal-pad"
                  className="border border-border rounded-lg p-3 text-foreground bg-surface"
                  placeholderTextColor="#9BA1A6"
                />
              </View>

              {/* Type */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-muted">Tipo</Text>
                <View className="flex-row gap-2">
                  {["income", "expense"].map((t) => (
                    <Pressable
                      key={t}
                      onPress={() => setFormData({ ...formData, type: t })}
                      className={`flex-1 px-3 py-2 rounded-lg ${
                        formData.type === t
                          ? "bg-primary"
                          : "bg-surface border border-border"
                      }`}
                      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                    >
                      <Text
                        className={`text-xs font-semibold text-center ${
                          formData.type === t ? "text-background" : "text-foreground"
                        }`}
                      >
                        {t === "income" ? "Entrada" : "Saída"}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Date */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-muted">Data *</Text>
                <TextInput
                  placeholder="YYYY-MM-DD"
                  value={formData.date}
                  onChangeText={(text) => setFormData({ ...formData, date: text })}
                  className="border border-border rounded-lg p-3 text-foreground bg-surface"
                  placeholderTextColor="#9BA1A6"
                />
              </View>

              {/* Category */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-muted">Categoria</Text>
                <TextInput
                  placeholder="Ex: Alimentação"
                  value={formData.category}
                  onChangeText={(text) => setFormData({ ...formData, category: text })}
                  className="border border-border rounded-lg p-3 text-foreground bg-surface"
                  placeholderTextColor="#9BA1A6"
                />
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View className="flex-row gap-2 mt-4">
              <Pressable
                onPress={() => setShowModal(false)}
                className="flex-1 px-4 py-3 bg-surface rounded-lg items-center border border-border"
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              >
                <Text className="text-sm font-semibold text-foreground">Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={handleSaveTransaction}
                className="flex-1 px-4 py-3 bg-primary rounded-lg items-center"
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              >
                <Text className="text-sm font-semibold text-background">Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Import Modal */}
      <Modal visible={showImportModal} transparent animationType="fade" onRequestClose={() => setShowImportModal(false)}>
        <View className="flex-1 bg-black/50 items-center justify-center p-4">
          <Card className="w-full gap-4 p-6">
            <View className="gap-1">
              <Text className="text-xl font-bold text-foreground">📊 Importar Planilha</Text>
              <Text className="text-sm text-muted">Selecione a planilha para importar</Text>
            </View>

            <View className="gap-2">
              <Pressable
                onPress={() => {
                  handleImportExcel();
                }}
                className="px-4 py-3 bg-primary/10 rounded-lg border border-primary"
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              >
                <Text className="text-sm font-semibold text-primary">Conta Automatizada (Carregada)</Text>
              </Pressable>

              <Pressable
                onPress={() => Alert.alert("Info", "Selecione um arquivo Excel do seu dispositivo")}
                className="px-4 py-3 bg-surface rounded-lg border border-border"
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              >
                <Text className="text-sm font-semibold text-foreground">Escolher Outro Arquivo</Text>
              </Pressable>
            </View>

            <View className="flex-row gap-2">
              <Pressable
                onPress={() => setShowImportModal(false)}
                className="flex-1 px-4 py-3 bg-surface rounded-lg items-center border border-border"
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              >
                <Text className="text-sm font-semibold text-foreground">Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  Alert.alert("Sucesso", "Planilha importada com sucesso!");
                  setShowImportModal(false);
                }}
                className="flex-1 px-4 py-3 bg-primary rounded-lg items-center"
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              >
                <Text className="text-sm font-semibold text-background">Importar</Text>
              </Pressable>
            </View>
          </Card>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
