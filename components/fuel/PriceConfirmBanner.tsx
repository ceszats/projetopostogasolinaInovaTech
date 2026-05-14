import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { useColors } from '@/hooks/theme/use-colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { FuelType, FUEL_TYPE_LABELS } from '@/data/stations';
import * as Haptics from 'expo-haptics';

interface PriceConfirmBannerProps {
  stationName: string;
  fuelType: FuelType;
  price: number;
  onConfirm: () => void;
  onIncorrect: () => void;
}

export function PriceConfirmBanner({
  stationName,
  fuelType,
  price,
  onConfirm,
  onIncorrect,
}: PriceConfirmBannerProps) {
  const colors = useColors();

  const handleConfirm = () => {
    if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onConfirm();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary, borderColor: colors.primary }]}>
      <View style={styles.iconContainer}>
        <IconSymbol name="fuelpump.fill" size={20} color="#fff" />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Confirme o preço no {stationName}</Text>
        <Text style={styles.subtitle}>
          {FUEL_TYPE_LABELS[fuelType]} está R$ {price.toFixed(2)}?
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={handleConfirm}
          style={({ pressed }) => [
            styles.btn,
            styles.btnConfirm,
            { opacity: pressed ? 0.8 : 1 }
          ]}
        >
          <IconSymbol name="checkmark" size={16} color={colors.primary} />
          <Text style={[styles.btnText, { color: colors.primary }]}>Sim</Text>
        </Pressable>

        <Pressable
          onPress={onIncorrect}
          style={({ pressed }) => [
            styles.btn,
            styles.btnOutline,
            { opacity: pressed ? 0.8 : 1 }
          ]}
        >
          <Text style={styles.btnTextOutline}>Não</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  btnConfirm: {
    backgroundColor: '#fff',
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: '#fff',
  },
  btnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  btnTextOutline: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});
