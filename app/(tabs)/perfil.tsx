import { ScrollView, Text, View, Pressable, Alert, TextInput, Modal } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function PerfilScreen() {
  const [userProfile] = useState({
    name: "Gustavo Henrique S. Oliveira",
    email: "gustavo@example.com",
    phone: "(11) 99999-9999",
    city: "São Paulo, SP",
  });

  const [secretNotes, setSecretNotes] = useState("");
  const [showSecretNotes, setShowSecretNotes] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);

  const SECRET_PASSWORD = "1234";

  const handleUnlockSecretNotes = () => {
    if (passwordInput === SECRET_PASSWORD) {
      setIsUnlocked(true);
      setShowPasswordModal(false);
      setPasswordInput("");
      setShowSecretNotes(true);
    } else {
      Alert.alert("Erro", "Senha incorreta!");
      setPasswordInput("");
    }
  };

  const handleOpenSecretNotes = () => {
    if (isUnlocked) {
      setShowSecretNotes(true);
    } else {
      setShowPasswordModal(true);
    }
  };

  const handleSaveNotes = () => {
    Alert.alert("Sucesso", "Notas salvas com segurança!");
    setEditingNotes(false);
  };

  const handleLockSecretNotes = () => {
    setIsUnlocked(false);
    setShowSecretNotes(false);
    setEditingNotes(false);
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-1">
            <Text className="text-2xl font-bold text-foreground">Perfil</Text>
            <Text className="text-sm text-muted">Suas informações</Text>
          </View>

          {/* Profile Card */}
          <Card className="gap-4 p-4 items-center">
            <View className="w-20 h-20 bg-primary rounded-full items-center justify-center">
              <Text className="text-4xl">👤</Text>
            </View>
            <View className="items-center gap-1">
              <Text className="text-lg font-bold text-foreground">{userProfile.name}</Text>
              <Text className="text-sm text-muted">{userProfile.email}</Text>
            </View>
          </Card>

          {/* Contact Information */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-muted uppercase">Informações de Contato</Text>
            <Card className="gap-3 p-4">
              <View className="gap-2">
                <Text className="text-xs text-muted">Telefone</Text>
                <Text className="text-sm font-semibold text-foreground">{userProfile.phone}</Text>
              </View>
              <View className="gap-2 border-t border-border pt-3">
                <Text className="text-xs text-muted">Localização</Text>
                <Text className="text-sm font-semibold text-foreground">{userProfile.city}</Text>
              </View>
            </Card>
          </View>

          {/* Settings */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-muted uppercase">Configurações</Text>
            <Card className="gap-2 p-0 overflow-hidden">
              <Pressable
                className="p-4 flex-row items-center justify-between border-b border-border"
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                onPress={() => Alert.alert("Notificações", "Gerenciar preferências de notificações")}
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-lg">🔔</Text>
                  <Text className="text-sm font-semibold text-foreground">Notificações</Text>
                </View>
                <Text className="text-lg">›</Text>
              </Pressable>

              <Pressable
                className="p-4 flex-row items-center justify-between border-b border-border"
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                onPress={() => Alert.alert("Tema", "Escolher tema claro ou escuro")}
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-lg">🎨</Text>
                  <Text className="text-sm font-semibold text-foreground">Tema</Text>
                </View>
                <Text className="text-lg">›</Text>
              </Pressable>

              <Pressable
                className="p-4 flex-row items-center justify-between"
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                onPress={() => Alert.alert("Privacidade", "Gerenciar configurações de privacidade")}
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-lg">🔒</Text>
                  <Text className="text-sm font-semibold text-foreground">Privacidade</Text>
                </View>
                <Text className="text-lg">›</Text>
              </Pressable>
            </Card>
          </View>

          {/* Secret Notes */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-muted uppercase">Bloco de Notas Secreto 🔐</Text>
            <Card className="p-4 gap-3">
              <Text className="text-sm text-muted">
                Guarde informações importantes com segurança
              </Text>
              <Pressable
                onPress={handleOpenSecretNotes}
                className="px-4 py-3 bg-primary rounded-lg items-center"
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              >
                <Text className="text-sm font-semibold text-background">
                  {isUnlocked ? "Acessar Notas" : "Abrir Notas Secretas"}
                </Text>
              </Pressable>
            </Card>
          </View>

          {/* About */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-muted uppercase">Sobre</Text>
            <Card className="gap-2 p-4">
              <View className="gap-1">
                <Text className="text-xs text-muted">Versão</Text>
                <Text className="text-sm font-semibold text-foreground">1.0.0</Text>
              </View>
              <View className="gap-1 border-t border-border pt-3 mt-3">
                <Pressable
                  className="py-2"
                  style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                  onPress={() => Alert.alert("Termos de Serviço", "Leia nossos termos de serviço")}
                >
                  <Text className="text-sm text-primary font-semibold">Termos de Serviço</Text>
                </Pressable>
              </View>
              <View className="gap-1">
                <Pressable
                  className="py-2"
                  style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                  onPress={() => Alert.alert("Política de Privacidade", "Leia nossa política de privacidade")}
                >
                  <Text className="text-sm text-primary font-semibold">Política de Privacidade</Text>
                </Pressable>
              </View>
            </Card>
          </View>

          {/* Logout Button */}
          <Pressable
            className="px-4 py-3 bg-error/10 rounded-lg items-center border border-error"
            style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
            onPress={() => Alert.alert("Sair", "Tem certeza que deseja sair?", [
              { text: "Cancelar", onPress: () => {} },
              { text: "Sair", onPress: () => Alert.alert("Até logo!", "Você foi desconectado"), style: "destructive" },
            ])}
          >
            <Text className="text-sm font-semibold text-error">Sair da Conta</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Password Modal */}
      <Modal visible={showPasswordModal} transparent animationType="fade" onRequestClose={() => setShowPasswordModal(false)}>
        <View className="flex-1 bg-black/50 items-center justify-center p-4">
          <Card className="w-full gap-4 p-6">
            <View className="gap-1">
              <Text className="text-xl font-bold text-foreground">Notas Secretas 🔐</Text>
              <Text className="text-sm text-muted">Digite a senha para acessar (1234)</Text>
            </View>

            <TextInput
              placeholder="Digite a senha"
              value={passwordInput}
              onChangeText={setPasswordInput}
              secureTextEntry
              className="border border-border rounded-lg p-3 text-foreground bg-surface"
              placeholderTextColor="#9BA1A6"
            />

            <View className="flex-row gap-2">
              <Pressable
                onPress={() => {
                  setShowPasswordModal(false);
                  setPasswordInput("");
                }}
                className="flex-1 px-4 py-3 bg-surface rounded-lg items-center border border-border"
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              >
                <Text className="text-sm font-semibold text-foreground">Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={handleUnlockSecretNotes}
                className="flex-1 px-4 py-3 bg-primary rounded-lg items-center"
                style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
              >
                <Text className="text-sm font-semibold text-background">Desbloquear</Text>
              </Pressable>
            </View>
          </Card>
        </View>
      </Modal>

      {/* Secret Notes Modal */}
      <Modal visible={showSecretNotes} transparent animationType="slide" onRequestClose={handleLockSecretNotes}>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-background rounded-t-3xl p-6 gap-4 max-h-4/5">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xl font-bold text-foreground">Notas Secretas 🔐</Text>
              <Pressable
                onPress={handleLockSecretNotes}
                className="p-2"
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <Text className="text-2xl">✕</Text>
              </Pressable>
            </View>

            {editingNotes ? (
              <ScrollView showsVerticalScrollIndicator={false} className="gap-4">
                <TextInput
                  placeholder="Digite suas notas secretas aqui..."
                  value={secretNotes}
                  onChangeText={setSecretNotes}
                  multiline
                  numberOfLines={10}
                  className="border border-border rounded-lg p-3 text-foreground bg-surface"
                  placeholderTextColor="#9BA1A6"
                  textAlignVertical="top"
                />
              </ScrollView>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} className="gap-4">
                <Card className="p-4 gap-2">
                  {secretNotes.trim() ? (
                    <Text className="text-sm text-foreground leading-relaxed">{secretNotes}</Text>
                  ) : (
                    <Text className="text-sm text-muted italic">Nenhuma nota adicionada ainda...</Text>
                  )}
                </Card>
              </ScrollView>
            )}

            {/* Action Buttons */}
            <View className="flex-row gap-2 mt-4">
              {editingNotes ? (
                <>
                  <Pressable
                    onPress={() => {
                      setSecretNotes("");
                      setEditingNotes(false);
                    }}
                    className="flex-1 px-4 py-3 bg-surface rounded-lg items-center border border-border"
                    style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                  >
                    <Text className="text-sm font-semibold text-foreground">Cancelar</Text>
                  </Pressable>
                  <Pressable
                    onPress={handleSaveNotes}
                    className="flex-1 px-4 py-3 bg-primary rounded-lg items-center"
                    style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                  >
                    <Text className="text-sm font-semibold text-background">Salvar</Text>
                  </Pressable>
                </>
              ) : (
                <>
                  <Pressable
                    onPress={handleLockSecretNotes}
                    className="flex-1 px-4 py-3 bg-surface rounded-lg items-center border border-border"
                    style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                  >
                    <Text className="text-sm font-semibold text-foreground">Fechar</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setEditingNotes(true)}
                    className="flex-1 px-4 py-3 bg-primary rounded-lg items-center"
                    style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                  >
                    <Text className="text-sm font-semibold text-background">Editar</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
