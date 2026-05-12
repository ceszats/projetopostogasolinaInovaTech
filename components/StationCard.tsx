import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { useApp } from '@/context/AppContext';
import {
  Station,
  FuelType,
  getPriceCategory,
  getPriceCategoryColor,
  formatTimeAgo,
  isOutdated,
  getPriceConfidence,
  FUEL_TYPE_LABELS,
} from '@/data/stations';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface StationCardProps {
  station: Station;
  fuelType?: FuelType;
  showDistance?: boolean;
  compact?: boolean;
}

export function StationCard({ station, fuelType = 'gasolina', showDistance = true, compact = false }: StationCardProps) {
  const colors = useColors();
  const router = useRouter();
  const { state, dispatch } = useApp();

  const isFavorite = state.favoriteIds.includes(station.id);
  const price = station.prices.find(p => p.type === fuelType);
  const category = price ? getPriceCategory(price.price) : 'medium';
  const priceColor = price ? getPriceCategoryColor(category) : colors.muted;
  const outdated = price ? isOutdated(price.updatedAt) : false;
  const confidence = price ? getPriceConfidence(price) : null;

  const handlePress = () => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/station/${station.id}` as any);
  };

  const handleFavorite = (e: any) => {
    e.stopPropagation();
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch({ type: 'TOGGLE_FAVORITE', stationId: station.id });
  };

  const brandColors: Record<string, string> = {
    'Ipiranga': '#FF6B00',
    'Shell': '#DD1D21',
    'BR': '#009B3A',
    'Ale': '#0066CC',
    'Bandeirante': '#6B21A8',
    'Raízen': '#DD1D21',
  };
  const brandColor = brandColors[station.brand] ?? colors.muted;

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: (colors as any).card ?? colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
        compact && styles.compact,
      ]}
    >
      {/* Brand strip */}
      <View style={[styles.brandStrip, { backgroundColor: brandColor }]} />

      <View style={styles.content}>
        {/* Header row */}
        <View style={styles.headerRow}>
          <View style={styles.nameBlock}>
            <Text style={[styles.name, { color: colors.foreground }]} numberOfLines={1}>
              {station.name}
            </Text>
            <Text style={[styles.address, { color: colors.muted }]} numberOfLines={1}>
              {station.neighborhood} · {station.address}
            </Text>
          </View>
          <Pressable
            onPress={handleFavorite}
            style={({ pressed }) => [styles.favBtn, { opacity: pressed ? 0.6 : 1 }]}
          >
            <IconSymbol
              name={isFavorite ? 'heart.fill' : 'heart.fill'}
              size={20}
              color={isFavorite ? '#EF4444' : colors.border}
            />
          </Pressable>
        </View>

        {/* Price row */}
        <View style={styles.priceRow}>
          <View style={styles.priceBlock}>
            <View style={[styles.priceBadge, { backgroundColor: priceColor + '20' }]}>
              <Text style={[styles.priceValue, { color: priceColor }]}>
                {price ? `R$ ${price.price.toFixed(2)}` : 'Sem preço'}
              </Text>
            </View>
            <Text style={[styles.fuelLabel, { color: colors.muted }]}>
              {FUEL_TYPE_LABELS[fuelType]}
            </Text>
          </View>

          <View style={styles.metaBlock}>
            {showDistance && station.distance !== undefined && (
              <View style={styles.metaItem}>
                <IconSymbol name="location.fill" size={12} color={colors.muted} />
                <Text style={[styles.metaText, { color: colors.muted }]}>
                  {station.distance < 1 ? `${Math.round(station.distance * 1000)}m` : `${station.distance.toFixed(1)}km`}
                </Text>
              </View>
            )}
            {price && (
              <View style={styles.metaItem}>
                <IconSymbol
                  name={outdated ? 'exclamationmark.triangle.fill' : 'clock.fill'}
                  size={12}
                  color={outdated ? colors.warning : colors.muted}
                />
                <Text style={[styles.metaText, { color: outdated ? colors.warning : colors.muted }]}>
                  {outdated ? 'Desatualizado' : formatTimeAgo(price.updatedAt)}
                </Text>
              </View>
            )}
            {price && (
              <View style={styles.metaItem}>
                <IconSymbol name="person.2.fill" size={12} color={colors.muted} />
                <Text style={[styles.metaText, { color: colors.muted }]}>
                  {price.confirmations}
                </Text>
              </View>
            )}
          </View>
        </View>
        {confidence && (
          <View
            style={[
              styles.confidenceBadge,
              {
                backgroundColor:
                  confidence === 'confirmed'
                    ? colors.success + '20'
                    : confidence === 'recent'
                      ? colors.warning + '20'
                      : colors.error + '20',
              },
            ]}
          >
            <Text
              style={[
                styles.confidenceText,
                {
                  color:
                    confidence === 'confirmed'
                      ? colors.success
                      : confidence === 'recent'
                        ? colors.warning
                        : colors.error,
                },
              ]}
            >
              {confidence === 'confirmed' ? 'Confirmado' : confidence === 'recent' ? 'Recente' : 'Desatualizado'}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#C21A2C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  compact: {
    marginHorizontal: 0,
    marginVertical: 3,
  },
  brandStrip: {
    width: 6,
  },
  content: {
    flex: 1,
    padding: 12,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  nameBlock: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  address: {
    fontSize: 12,
    lineHeight: 16,
  },
  favBtn: {
    padding: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  priceBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
    minWidth: 0,
  },
  priceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  fuelLabel: {
    fontSize: 12,
    lineHeight: 16,
  },
  metaBlock: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    flexShrink: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: 11,
    lineHeight: 15,
  },
  confidenceBadge: {
    marginTop: 2,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  confidenceText: {
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 15,
  },
});
