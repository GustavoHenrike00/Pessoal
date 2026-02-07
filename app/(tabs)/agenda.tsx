import { ScrollView, Text, View, Pressable, Alert, FlatList, Modal, TextInput } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const CATEGORIES = [
  { id: "trabalho", label: "Trabalho", color: "#3B82F6", emoji: "💼" },
  { id: "pessoal", label: "Pessoal", color: "#8B5CF6", emoji: "👤" },
  { id: "urgente", label: "Urgente", color: "#EF4444", emoji: "🔴" },
  { id: "lazer", label: "Lazer", color: "#22C55E", emoji: "🎉" },
  { id: "saude", label: "Saúde", color: "#EC4899", emoji: "❤️" },
  { id: "outro", label: "Outro", color: "#6B7280", emoji: "📌" },
];

export default function AgendaScreen() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Reunião de Trabalho",
      time: "09:00 - 10:00",
      category: "trabalho",
      location: "Sala de Conferência",
    },
    {
      id: 2,
      title: "Almoço com Amigos",
      time: "12:00 - 13:30",
      category: "pessoal",
      location: "Restaurante",
    },
    {
      id: 3,
      title: "Apresentação Importante",
      time: "14:00 - 15:00",
      category: "urgente",
      location: "Auditório",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    location: "",
    category: "trabalho",
  });

  const getCategoryColor = (categoryId: string) => {
    return CATEGORIES.find((c) => c.id === categoryId)?.color || "#6B7280";
  };

  const getCategoryEmoji = (categoryId: string) => {
    return CATEGORIES.find((c) => c.id === categoryId)?.emoji || "📌";
  };

  const filteredEvents = selectedCategory
    ? events.filter((e) => e.category === selectedCategory)
    : events;

  const handleAddEvent = () => {
    setEditingId(null);
    setFormData({ title: "", time: "", location: "", category: "trabalho" });
    setShowModal(true);
  };

  const handleEditEvent = (event: any) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      time: event.time,
      location: event.location,
      category: event.category,
    });
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (!formData.title.trim() || !formData.time.trim()) {
      Alert.alert("Erro", "Preencha título e horário");
      return;
    }

    if (editingId) {
      setEvents(
        events.map((e) =>
          e.id === editingId ? { ...e, ...formData } : e
        )
      );
      Alert.alert("Sucesso", "Evento atualizado!");
    } else {
      const newEvent = {
        id: Math.max(...events.map((e) => e.id), 0) + 1,
        ...formData,
      };
      setEvents([...events, newEvent]);
      Alert.alert("Sucesso", "Evento criado!");
    }

    setShowModal(false);
    setFormData({ title: "", time: "", location: "", category: "trabalho" });
  };

  const handleDeleteEvent = (id: number) => {
    Alert.alert(
      "Deletar Evento",
      "Tem certeza que deseja deletar este evento?",
      [
        { text: "Cancelar", onPress: () => {} },
        {
          text: "Deletar",
          onPress: () => {
            setEvents(events.filter((e) => e.id !== id));
            Alert.alert("Sucesso", "Evento deletado!");
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-1">
            <Text className="text-2xl font-bold text-foreground">Agenda</Text>
            <Text className="text-sm text-muted">Gerencie seus compromissos</Text>
          </View>

          {/* Date Display */}
          <Card className="p-3 gap-2">
            <Text className="text-xs text-muted uppercase">Data Selecionada</Text>
            <Text className="text-lg font-bold text-foreground">
              {selectedDate.toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
            <View className="flex-row gap-2 mt-2">
              <Pressable
                onPress={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() - 1);
                  setSelectedDate(newDate);
                }}
                className="flex-1 px-2 py-1 bg-primary/10 rounded"
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <Text className="text-xs font-semibold text-primary text-center">← Anterior</Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedDate(new Date())}
                className="flex-1 px-2 py-1 bg-primary/10 rounded"
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <Text className="text-xs font-semibold text-primary text-center">Hoje</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() + 1);
                  setSelectedDate(newDate);
                }}
                className="flex-1 px-2 py-1 bg-primary/10 rounded"
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <Text className="text-xs font-semibold text-primary text-center">Próximo →</Text>
              </Pressable>
            </View>
          </Card>

          {/* Category Filter */}
          <View className="gap-2">
            <Text className="text-xs text-muted uppercase">Categorias</Text>
            <View className="flex-row flex-wrap gap-2">
              <Pressable
                onPress={() => setSelectedCategory(null)}
                className={`px-3 py-1 rounded-full ${
                  selectedCategory === null ? "bg-primary" : "bg-surface border border-border"
                }`}
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              >
                <Text className={`text-xs font-semibold ${selectedCategory === null ? "text-background" : "text-foreground"}`}>
                  Todas
                </Text>
              </Pressable>
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full flex-row gap-1 items-center ${
                    selectedCategory === cat.id ? "bg-primary" : "bg-surface border border-border"
                  }`}
                  style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                >
                  <Text>{cat.emoji}</Text>
                  <Text className={`text-xs font-semibold ${selectedCategory === cat.id ? "text-background" : "text-foreground"}`}>
                    {cat.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Events List */}
          <View className="gap-2">
            <Text className="text-xs text-muted uppercase">
              {filteredEvents.length} compromisso{filteredEvents.length !== 1 ? "s" : ""}
            </Text>
            {filteredEvents.length > 0 ? (
              <FlatList
                data={filteredEvents}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <Card
                    className="p-3 gap-2 mb-2 flex-row items-start justify-between"
                    style={{
                      borderLeftColor: getCategoryColor(item.category),
                      borderLeftWidth: 4,
                    }}
                  >
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground">{item.title}</Text>
                      <Text className="text-xs text-muted mt-1">🕐 {item.time}</Text>
                      <Text className="text-xs text-muted">📍 {item.location}</Text>
                    </View>
                    <View className="flex-row gap-1">
                      <Pressable
                        onPress={() => handleEditEvent(item)}
                        className="px-2 py-1 bg-primary/10 rounded"
                        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                      >
                        <Text className="text-xs font-semibold text-primary">Editar</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => handleDeleteEvent(item.id)}
                        className="px-2 py-1 bg-error/10 rounded"
                        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                      >
                        <Text className="text-xs font-semibold text-error">Deletar</Text>
                      </Pressable>
                    </View>
                  </Card>
                )}
              />
            ) : (
              <Card className="p-6 items-center gap-2">
                <Text className="text-2xl">📭</Text>
                <Text className="text-sm text-muted">Nenhum compromisso</Text>
              </Card>
            )}
          </View>

          {/* Add Event Button */}
          <Pressable
            onPress={handleAddEvent}
            className="px-4 py-3 bg-primary rounded-lg items-center"
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text className="text-base font-semibold text-background">+ Novo Compromisso</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Event Modal */}
      <Modal visible={showModal} transparent animationType="slide" onRequestClose={() => setShowModal(false)}>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-background rounded-t-3xl p-6 gap-4 max-h-4/5">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xl font-bold text-foreground">
                {editingId ? "Editar Compromisso" : "Novo Compromisso"}
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
                <Text className="text-sm font-semibold text-muted">Título *</Text>
                <TextInput
                  placeholder="Ex: Reunião de trabalho"
                  value={formData.title}
                  onChangeText={(text) => setFormData({ ...formData, title: text })}
                  className="border border-border rounded-lg p-3 text-foreground bg-surface"
                  placeholderTextColor="#9BA1A6"
                />
              </View>

              {/* Time */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-muted">Horário *</Text>
                <TextInput
                  placeholder="Ex: 09:00 - 10:00"
                  value={formData.time}
                  onChangeText={(text) => setFormData({ ...formData, time: text })}
                  className="border border-border rounded-lg p-3 text-foreground bg-surface"
                  placeholderTextColor="#9BA1A6"
                />
              </View>

              {/* Location */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-muted">Localização</Text>
                <TextInput
                  placeholder="Ex: Sala de Conferência"
                  value={formData.location}
                  onChangeText={(text) => setFormData({ ...formData, location: text })}
                  className="border border-border rounded-lg p-3 text-foreground bg-surface"
                  placeholderTextColor="#9BA1A6"
                />
              </View>

              {/* Category */}
              <View className="gap-2">
                <Text className="text-sm font-semibold text-muted">Categoria</Text>
                <View className="flex-row flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <Pressable
                      key={cat.id}
                      onPress={() => setFormData({ ...formData, category: cat.id })}
                      className={`px-3 py-2 rounded-lg ${
                        formData.category === cat.id
                          ? "bg-primary"
                          : "bg-surface border border-border"
                      }`}
                      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                    >
                      <Text
                        className={`text-xs font-semibold ${
                          formData.category === cat.id
                            ? "text-background"
                            : "text-foreground"
                        }`}
                      >
                        {cat.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
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
                onPress={handleSaveEvent}
                className="flex-1 px-4 py-3 bg-primary rounded-lg items-center"
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              >
                <Text className="text-sm font-semibold text-background">Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
