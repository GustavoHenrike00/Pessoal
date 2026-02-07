import { View, Text, Pressable, Alert } from "react-native";
import { useState } from "react";
import { Card } from "./card";

interface FileUploadProps {
  onFileSelected?: (file: { name: string; uri: string; type: string }) => Promise<void>;
  acceptedTypes?: string[];
  label?: string;
}

export function FileUpload({
  onFileSelected,
  acceptedTypes = [".xlsx", ".xls", ".csv"],
  label = "Selecionar Arquivo",
}: FileUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string } | null>(null);

  const handleFileSelect = async () => {
    // Simular seleção de arquivo (em app real, usar expo-document-picker)
    Alert.alert(
      "Selecionar Arquivo",
      `Selecione um arquivo ${acceptedTypes.join(", ")}`,
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Usar Arquivo de Exemplo",
          onPress: async () => {
            setIsLoading(true);
            try {
              const mockFile = {
                name: "dados_exemplo.xlsx",
                uri: "file:///mock/dados_exemplo.xlsx",
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              };
              setSelectedFile({ name: mockFile.name });
              await onFileSelected?.(mockFile);
              Alert.alert("Sucesso", "Arquivo carregado com sucesso!");
            } catch (error) {
              Alert.alert("Erro", "Falha ao carregar arquivo");
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View className="gap-3">
      <Pressable
        onPress={handleFileSelect}
        disabled={isLoading}
        style={({ pressed }) => ({
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Card className="flex-row items-center justify-between p-4 border-2 border-dashed border-primary">
          <View className="flex-row items-center gap-3">
            <Text className="text-3xl">📁</Text>
            <View>
              <Text className="text-sm font-semibold text-foreground">
                {selectedFile ? selectedFile.name : label}
              </Text>
              <Text className="text-xs text-muted mt-1">
                {acceptedTypes.join(", ")}
              </Text>
            </View>
          </View>
          <Text className="text-2xl">{isLoading ? "⏳" : "+"}</Text>
        </Card>
      </Pressable>

      {selectedFile && (
        <View className="flex-row items-center gap-2 p-3 bg-success/10 rounded-lg border border-success">
          <Text className="text-lg">✓</Text>
          <Text className="text-xs text-success font-medium">Arquivo selecionado</Text>
        </View>
      )}
    </View>
  );
}
