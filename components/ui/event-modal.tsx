import React from "react";
import { Modal, View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { Card } from "./card";

const CATEGORIES = [
  { id: "trabalho", label: "Trabalho", color: "#3B82F6" },
  { id: "pessoal", label: "Pessoal", color: "#8B5CF6" },
  { id: "urgente", label: "Urgente", color: "#EF4444" },
  { id: "lazer", label: "Lazer", color: "#22C55E" },
  { id: "saude", label: "Saúde", color: "#EC4899" },
  { id: "outro", label: "Outro", color: "#6B7280" },
];

interface EventModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  onSave: (event: any) => void;
  initialData?: any;
}

export function EventModal({
  visible,
  title,
  onClose,
  onSave,
  initialData,
}: EventModalProps) {
  const [eventTitle, setEventTitle] = React.useState(initialData?.title || "");
  const [eventTime, setEventTime] = React.useState(initialData?.time || "");
  const [eventLocation, setEventLocation] = React.useState(
    initialData?.location || ""
  );
  const [selectedCategory, setSelectedCategory] = React.useState(
    initialData?.category || "trabalho"
  );

  const handleSave = () => {
    if (!eventTitle.trim() || !eventTime.trim()) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    onSave({
      title: eventTitle,
      time: eventTime,
      location: eventLocation,
      category: selectedCategory,
    });

    setEventTitle("");
    setEventTime("");
    setEventLocation("");
    setSelectedCategory("trabalho");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-background rounded-t-3xl p-6 gap-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-xl font-bold text-foreground">{title}</Text>
            <Pressable
              onPress={onClose}
              className="p-2"
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <Text className="text-2xl">✕</Text>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="gap-4">
            {/* Title Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-muted">Título *</Text>
              <TextInput
                placeholder="Ex: Reunião de trabalho"
                value={eventTitle}
                onChangeText={setEventTitle}
                className="border border-border rounded-lg p-3 text-foreground bg-surface"
                placeholderTextColor="#9BA1A6"
              />
            </View>

            {/* Time Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-muted">Horário *</Text>
              <TextInput
                placeholder="Ex: 09:00 - 10:00"
                value={eventTime}
                onChangeText={setEventTime}
                className="border border-border rounded-lg p-3 text-foreground bg-surface"
                placeholderTextColor="#9BA1A6"
              />
            </View>

            {/* Location Input */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-muted">Localização</Text>
              <TextInput
                placeholder="Ex: Sala de Conferência"
                value={eventLocation}
                onChangeText={setEventLocation}
                className="border border-border rounded-lg p-3 text-foreground bg-surface"
                placeholderTextColor="#9BA1A6"
              />
            </View>

            {/* Category Selection */}
            <View className="gap-2">
              <Text className="text-sm font-semibold text-muted">Categoria</Text>
              <View className="flex-row flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <Pressable
                    key={cat.id}
                    onPress={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-2 rounded-lg ${
                      selectedCategory === cat.id
                        ? "bg-primary"
                        : "bg-surface border border-border"
                    }`}
                    style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        selectedCategory === cat.id
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
              onPress={onClose}
              className="flex-1 px-4 py-3 bg-surface rounded-lg items-center border border-border"
              style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
            >
              <Text className="text-sm font-semibold text-foreground">Cancelar</Text>
            </Pressable>
            <Pressable
              onPress={handleSave}
              className="flex-1 px-4 py-3 bg-primary rounded-lg items-center"
              style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
            >
              <Text className="text-sm font-semibold text-background">Salvar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
