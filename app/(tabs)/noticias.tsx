import { ScrollView, Text, View, FlatList, Pressable, Alert, Share } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const MOCK_NEWS = [
  { id: 1, title: "IA revoluciona mercado", description: "Novas tecnologias...", category: "tecnologia", source: "TechNews", date: "2026-01-29", image: "💻" },
  { id: 2, title: "Mercado em alta", description: "Indices financeiros...", category: "economia", source: "FinanceDaily", date: "2026-01-29", image: "📈" },
  { id: 3, title: "Programa de emprego", description: "Governo anuncia...", category: "empregos", source: "JobsPortal", date: "2026-01-28", image: "💼" },
  { id: 4, title: "Eleições municipais", description: "Candidatos apresentam...", category: "politica", source: "PoliticsNews", date: "2026-01-28", image: "🏛️" },
];

const CATEGORIES = [
  { id: "tecnologia", label: "Tecnologia", emoji: "💻" },
  { id: "economia", label: "Economia", emoji: "📈" },
  { id: "politica", label: "Política", emoji: "🏛️" },
  { id: "empregos", label: "Empregos", emoji: "💼" },
];

export default function NoticiasScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const filteredNews = selectedCategory ? MOCK_NEWS.filter((n) => n.category === selectedCategory) : MOCK_NEWS;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert("Sucesso", "Notícias atualizadas!");
    }, 1500);
  };

  const handleShare = async (news: any) => {
    try {
      await Share.share({
        message: `${news.title}\n\n${news.description}\n\nFonte: ${news.source}`,
        title: news.title,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar");
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          <View className="gap-1">
            <Text className="text-2xl font-bold text-foreground">Notícias</Text>
            <Text className="text-sm text-muted">Fique atualizado</Text>
          </View>

          <Pressable onPress={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-primary/10 rounded-lg items-center flex-row gap-2 justify-center" style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
            <Text className="text-lg">{refreshing ? "⏳" : "🔄"}</Text>
            <Text className="text-sm font-semibold text-primary">{refreshing ? "Atualizando..." : "Atualizar"}</Text>
          </Pressable>

          <View className="gap-2">
            <Text className="text-xs text-muted uppercase">Categorias</Text>
            <View className="flex-row flex-wrap gap-2">
              <Pressable onPress={() => setSelectedCategory(null)} className={`px-3 py-1 rounded-full ${selectedCategory === null ? "bg-primary" : "bg-surface border border-border"}`} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
                <Text className={`text-xs font-semibold ${selectedCategory === null ? "text-background" : "text-foreground"}`}>Todas</Text>
              </Pressable>
              {CATEGORIES.map((cat) => (
                <Pressable key={cat.id} onPress={() => setSelectedCategory(cat.id)} className={`px-3 py-1 rounded-full flex-row gap-1 items-center ${selectedCategory === cat.id ? "bg-primary" : "bg-surface border border-border"}`} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
                  <Text>{cat.emoji}</Text>
                  <Text className={`text-xs font-semibold ${selectedCategory === cat.id ? "text-background" : "text-foreground"}`}>{cat.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View className="gap-2">
            <Text className="text-xs text-muted uppercase">{filteredNews.length} notícia{filteredNews.length !== 1 ? "s" : ""}</Text>
            {filteredNews.length > 0 ? (
              <FlatList data={filteredNews} keyExtractor={(item) => item.id.toString()} scrollEnabled={false} renderItem={({ item }) => (
                <Card className="p-3 gap-2 mb-2">
                  <View className="flex-row items-start gap-3">
                    <Text className="text-3xl">{item.image}</Text>
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground" numberOfLines={2}>{item.title}</Text>
                      <Text className="text-xs text-muted mt-1" numberOfLines={2}>{item.description}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-between pt-2 border-t border-border">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-xs text-muted">{item.source}</Text>
                      <Text className="text-xs text-muted">•</Text>
                      <Text className="text-xs text-muted">{item.date}</Text>
                    </View>
                    <Pressable onPress={() => handleShare(item)} className="px-2 py-1 bg-primary/10 rounded" style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
                      <Text className="text-xs font-semibold text-primary">Compartilhar</Text>
                    </Pressable>
                  </View>
                </Card>
              )} />
            ) : (
              <Card className="p-6 items-center gap-2">
                <Text className="text-2xl">📰</Text>
                <Text className="text-sm text-muted">Nenhuma notícia</Text>
              </Card>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
