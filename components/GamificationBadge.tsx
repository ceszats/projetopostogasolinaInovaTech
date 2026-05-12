import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/hooks/use-colors';
import { calcReputation } from '@/hooks/use-price-engine';

interface GamificationBadgeProps {
  totalContributions: number;
  confirmedContributions: number;
  hideLabel?: boolean;
}

export function GamificationBadge({
  totalContributions,
  confirmedContributions,
  hideLabel = false,
}: GamificationBadgeProps) {
  const colors = useColors();
  const rep = calcReputation(totalContributions, confirmedContributions);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={styles.emoji}>{rep.emoji}</Text>
      {!hideLabel && (
        <View>
          <Text style={[styles.label, { color: colors.foreground }]}>{rep.label}</Text>
          <Text style={[styles.score, { color: colors.muted }]}>
            Confiança: {rep.score}% · {totalContributions} reportes
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  emoji: {
    fontSize: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  score: {
    fontSize: 11,
    lineHeight: 15,
  },
});
