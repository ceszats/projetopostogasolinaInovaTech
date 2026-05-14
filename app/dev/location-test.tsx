import React, { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

import { ScreenContainer } from '@/components/layout/screen-container';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/theme/use-colors';

type PermissionStatus = Location.PermissionStatus | 'unknown';

export default function LocationTestScreen() {
  const colors = useColors();
  const { state } = useApp();
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('unknown');
  const [deviceLocation, setDeviceLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [message, setMessage] = useState('Toque em "Atualizar status" para testar.');

  const refreshPermission = useCallback(async () => {
    try {
      const current = await Location.getForegroundPermissionsAsync();
      setPermissionStatus(current.status);
      setMessage(`Permissao atual: ${current.status}`);
    } catch {
      setMessage('Falha ao verificar permissao.');
    }
  }, []);

  const requestPermission = useCallback(async () => {
    try {
      const requested = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(requested.status);
      setMessage(`Permissao solicitada: ${requested.status}`);
    } catch {
      setMessage('Falha ao solicitar permissao.');
    }
  }, []);

  const getCurrentLocation = useCallback(async () => {
    try {
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setDeviceLocation(current.coords);
      setMessage('Localizacao obtida com sucesso.');
    } catch {
      setMessage('Nao foi possivel ler GPS. Verifique permissao e servicos de localizacao.');
    }
  }, []);

  useEffect(() => {
    refreshPermission();
  }, [refreshPermission]);

  return (
    <ScreenContainer containerClassName="bg-background">
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.foreground }]}>Teste de Localizacao</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Plataforma: {Platform.OS}
        </Text>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.muted }]}>Permissao</Text>
          <Text style={[styles.value, { color: colors.foreground }]}>{permissionStatus}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.muted }]}>Localizacao no AppContext</Text>
          <Text style={[styles.value, { color: colors.foreground }]}>
            {state.userLocation
              ? `${state.userLocation.latitude.toFixed(6)}, ${state.userLocation.longitude.toFixed(6)}`
              : 'Ainda nao definida'}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.muted }]}>Localizacao via leitura direta</Text>
          <Text style={[styles.value, { color: colors.foreground }]}>
            {deviceLocation
              ? `${deviceLocation.latitude.toFixed(6)}, ${deviceLocation.longitude.toFixed(6)}`
              : 'Sem leitura ainda'}
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={refreshPermission}
            style={({ pressed }) => [
              styles.btn,
              { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={[styles.btnText, { color: colors.foreground }]}>Atualizar status</Text>
          </Pressable>

          <Pressable
            onPress={requestPermission}
            style={({ pressed }) => [
              styles.btn,
              { backgroundColor: colors.primary, borderColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={[styles.btnText, { color: '#fff' }]}>Solicitar permissao</Text>
          </Pressable>

          <Pressable
            onPress={getCurrentLocation}
            style={({ pressed }) => [
              styles.btn,
              { backgroundColor: colors.primary, borderColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={[styles.btnText, { color: '#fff' }]}>Ler localizacao agora</Text>
          </Pressable>
        </View>

        <Text style={[styles.message, { color: colors.muted }]}>{message}</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 10,
    paddingBottom: 36,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  actions: {
    gap: 8,
    marginTop: 6,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
  },
  message: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
  },
});
