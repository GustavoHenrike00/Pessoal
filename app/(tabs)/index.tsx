import { ScrollView, Text, View, Pressable, ActivityIndicator, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const formatDate = () => {
    return new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const quickAccessItems = [
    {
      id: 1,
      title: "Agenda",
      icon: "📅",
      color: "#3B82F6",
      onPress: () => router.push("/(tabs)/agenda"),
    },
    {
      id: 2,
      title: "Rotina",
      icon: "✓",
      color: "#22C55E",
      onPress: () => router.push("/(tabs)/rotina"),
    },
    {
      id: 3,
      title: "Finanças",
      icon: "💰",
      color: "#F59E0B",
      onPress: () => router.push("/(tabs)/financas"),
    },
    {
      id: 4,
      title: "Notícias",
      icon: "📰",
      color: "#EC4899",
      onPress: () => router.push("/(tabs)/noticias"),
    },
  ];

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <ActivityIndicator size="large" color="#22C55E" />
      </ScreenContainer>
    );
  }

  if (!isAuthenticated) {
    return (
      <ScreenContainer className="p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 gap-6 justify-center">
            <View className="items-center gap-2">
              <Text className="text-4xl font-bold text-foreground">Smart Life Manager</Text>
              <Text className="text-base text-muted text-center">
                Gerencie sua vida em um só lugar
              </Text>
            </View>

            <Card className="gap-4">
              <Text className="text-lg font-semibold text-foreground">Bem-vindo!</Text>
              <Text className="text-sm text-muted">
                Faça login para acessar suas finanças, agenda, rotina e notícias.
              </Text>
            </Card>

            <Pressable
              onPress={() => Alert.alert("Login", "Funcionalidade de login será implementada")}
              className="px-4 py-3 bg-primary rounded-lg items-center"
              style={({ pressed }) => ({
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text className="text-base font-semibold text-background">Fazer Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Greeting Section */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              {getGreeting()}, {user?.name?.split(" ")[0] || "Usuário"}!
            </Text>
            <Text className="text-sm text-muted capitalize">{formatDate()}</Text>
          </View>

          {/* Quick Stats */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-muted uppercase">Resumo do Dia</Text>
            <View className="flex-row gap-2">
              <Card className="flex-1 p-3 items-center gap-2">
                <Text className="text-2xl">📅</Text>
                <Text className="text-xs text-muted">Próximo Evento</Text>
                <Text className="text-sm font-bold text-foreground">14:30</Text>
              </Card>
              <Card className="flex-1 p-3 items-center gap-2">
                <Text className="text-2xl">✓</Text>
                <Text className="text-xs text-muted">Tarefas</Text>
                <Text className="text-sm font-bold text-foreground">5/8</Text>
              </Card>
              <Card className="flex-1 p-3 items-center gap-2">
                <Text className="text-2xl">💰</Text>
                <Text className="text-xs text-muted">Saldo</Text>
                <Text className="text-sm font-bold text-success">R$ 2.450</Text>
              </Card>
            </View>
          </View>

          {/* Quick Access */}
          <View className="gap-3">
            <Text className="text-sm font-semibold text-muted uppercase">Acesso Rápido</Text>
            <View className="flex-row flex-wrap gap-2">
              {quickAccessItems.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={item.onPress}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                    flex: 1,
                    minWidth: "48%",
                  })}
                >
                  <Card className="p-4 items-center gap-2">
                    <Text className="text-3xl">{item.icon}</Text>
                    <Text className="text-xs font-semibold text-foreground text-center">
                      {item.title}
                    </Text>
                  </Card>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Next Event Card */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-muted uppercase">Próximo Compromisso</Text>
            <Card className="p-4 gap-3 border-l-4" style={{ borderLeftColor: "#3B82F6" }}>
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">Reunião de Trabalho</Text>
                  <Text className="text-xs text-muted mt-1">📍 Sala de Conferência</Text>
                </View>
                <Text className="text-lg">📅</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="text-sm text-primary font-semibold">🕐 14:30 - 15:30</Text>
              </View>
              <Pressable
                onPress={() => Alert.alert("Evento", "Clicou no evento")}
                className="px-3 py-2 bg-primary/10 rounded-lg items-center mt-2"
              >
                <Text className="text-xs font-semibold text-primary">Ver Detalhes</Text>
              </Pressable>
            </Card>
          </View>

          {/* Daily Tasks */}
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-muted uppercase">Tarefas de Hoje</Text>
              <Pressable
                onPress={() => Alert.alert("Tarefas", "Abrindo lista completa")}
                className="px-2 py-1 bg-primary/10 rounded"
              >
                <Text className="text-xs font-semibold text-primary">Ver Tudo</Text>
              </Pressable>
            </View>
            <Card className="p-3 gap-2">
              <View className="flex-row items-center gap-2">
                <Pressable
                  onPress={() => Alert.alert("Tarefa", "Marcada como concluída")}
                  className="p-1"
                >
                  <Text className="text-lg">○</Text>
                </Pressable>
                <Text className="text-sm text-foreground flex-1">Responder emails</Text>
                <Text className="text-xs text-muted">09:00</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Pressable
                  onPress={() => Alert.alert("Tarefa", "Marcada como concluída")}
                  className="p-1"
                >
                  <Text className="text-lg">○</Text>
                </Pressable>
                <Text className="text-sm text-foreground flex-1">Preparar apresentação</Text>
                <Text className="text-xs text-muted">14:00</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Pressable
                  onPress={() => Alert.alert("Tarefa", "Marcada como concluída")}
                  className="p-1"
                >
                  <Text className="text-lg">○</Text>
                </Pressable>
                <Text className="text-sm text-foreground flex-1">Revisar relatório</Text>
                <Text className="text-xs text-muted">16:00</Text>
              </View>
            </Card>
          </View>

          {/* Financial Summary */}
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-muted uppercase">Finanças do Mês</Text>
              <Pressable
                onPress={() => Alert.alert("Finanças", "Abrindo detalhes financeiros")}
                className="px-2 py-1 bg-primary/10 rounded"
              >
                <Text className="text-xs font-semibold text-primary">Detalhes</Text>
              </Pressable>
            </View>
            <Card className="p-4 gap-3">
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Text className="text-xs text-muted mb-1">Entradas</Text>
                  <Text className="text-lg font-bold text-success">R$ 5.200</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-muted mb-1">Saídas</Text>
                  <Text className="text-lg font-bold text-error">R$ 2.750</Text>
                </View>
              </View>
              <View className="border-t border-border pt-3">
                <Text className="text-xs text-muted mb-1">Saldo</Text>
                <Text className="text-lg font-bold text-success">R$ 2.450</Text>
              </View>
            </Card>
          </View>

          {/* Action Buttons */}
          <View className="gap-2 flex-row">
            <Pressable
              onPress={() => Alert.alert("Nova Tarefa", "Abrindo formulário de nova tarefa")}
              className="flex-1 px-4 py-3 bg-primary rounded-lg items-center"
              style={({ pressed }) => ({
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text className="text-sm font-semibold text-background">+ Tarefa</Text>
            </Pressable>
            <Pressable
              onPress={() => Alert.alert("Novo Evento", "Abrindo formulário de novo evento")}
              className="flex-1 px-4 py-3 bg-primary rounded-lg items-center"
              style={({ pressed }) => ({
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text className="text-sm font-semibold text-background">+ Evento</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
