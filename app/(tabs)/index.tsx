import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { FuelTypeFilter } from '@/components/FuelTypeFilter';
import { useColors } from '@/hooks/use-colors';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'expo-router';
import {
  STATIONS,
  MANAUS_CENTER,
  getPriceCategory,
  getPriceCategoryColor,
  formatTimeAgo,
  isOutdated,
  FuelType,
  Station,
} from '@/data/stations';
import * as Haptics from 'expo-haptics';
import Map from '@/components/map';

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const mapRef = useRef<any>(null);
  const hasCenteredOnUser = useRef(false);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const fuelType = state.selectedFuelType;

  const handleFuelSelect = useCallback((type: FuelType) => {
    dispatch({ type: 'SET_FUEL_TYPE', fuelType: type });
  }, [dispatch]);

  const handleMarkerPress = useCallback((station: Station) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedStation(station);
  }, []);

  const handleCenterMap = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const target = state.userLocation
      ? {
          latitude: state.userLocation.latitude,
          longitude: state.userLocation.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }
      : MANAUS_CENTER;
    mapRef.current?.animateToRegion(target, 800);
  }, [state.userLocation]);

  useEffect(() => {
    if (!state.userLocation || hasCenteredOnUser.current) return;
    const target = {
      latitude: state.userLocation.latitude,
      longitude: state.userLocation.longitude,
      latitudeDelta: 0.08,
      longitudeDelta: 0.08,
    };
    mapRef.current?.animateToRegion(target, 900);
    hasCenteredOnUser.current = true;
  }, [state.userLocation]);

  const handleViewDetail = useCallback((station: Station) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/station/${station.id}` as any);
  }, [router]);

  // Native: mapa real
  return (
    <View style={styles.container}>
      <Map
        mapRef={mapRef}
        initialRegion={MANAUS_CENTER}
        stations={STATIONS}
        fuelType={fuelType}
        onMarkerPress={handleMarkerPress}
        userLocation={state.userLocation}
      />

      {/* Header overlay */}
      <View style={[styles.headerOverlay, { backgroundColor: colors.background + 'F8', paddingTop: insets.top + 4, borderBottomColor: colors.border, borderBottomWidth: 0.5 }]}>
        <View style={styles.headerTitle}>
          <Text style={[styles.appName, { color: colors.primary }]}>⛽ Abastece</Text>
          <View style={[styles.cityBadge, { backgroundColor: colors.primary + '18' }]}>
            <Text style={[styles.appCity, { color: colors.primary }]}>Manaus</Text>
          </View>
        </View>
        <FuelTypeFilter selected={fuelType} onSelect={handleFuelSelect} />
      </View>

      {/* Legend */}
      <View style={[styles.legendOverlay, { backgroundColor: colors.background + 'EE', bottom: insets.bottom + 20 }]}>
        {(['cheap', 'medium', 'expensive'] as const).map(cat => (
          <View key={cat} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: getPriceCategoryColor(cat) }]} />
            <Text style={[styles.legendLabel, { color: colors.foreground }]}>
              {cat === 'cheap' ? 'Barato' : cat === 'medium' ? 'Médio' : 'Caro'}
            </Text>
          </View>
        ))}
      </View>

      {/* Center button */}
      <Pressable
        onPress={handleCenterMap}
        style={({ pressed }) => [
          styles.centerBtn,
          { backgroundColor: colors.background, borderColor: colors.border, opacity: pressed ? 0.8 : 1, bottom: insets.bottom + 20 },
        ]}
      >
        <IconSymbol name="location.fill" size={22} color={colors.primary} />
      </Pressable>

      {/* Bottom sheet for selected station — TouchableWithoutFeedback impede
           que toques internos "vazem" para o mapa abaixo e quebrem o X */}
      {selectedStation && (
        <TouchableWithoutFeedback>
          <View
            style={[
              styles.bottomSheet,
              {
                backgroundColor: colors.card ?? colors.background,
                borderColor: colors.border,
                paddingBottom: insets.bottom + 12,
              },
            ]}
          >
            {/* Handle + botão fechar no topo */}
            <View style={styles.bsTopRow}>
              <View style={[styles.bottomSheetHandle, { backgroundColor: colors.border }]} />
              <Pressable
                hitSlop={12}
                onPress={() => setSelectedStation(null)}
                style={({ pressed }) => [
                  styles.bsCloseBtn,
                  { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.6 : 1 },
                ]}
              >
                <IconSymbol name="xmark" size={15} color={colors.foreground} />
              </Pressable>
            </View>

            <View style={styles.bottomSheetContent}>
              <View style={{ flex: 1 }}>
                {/* Nome + endereço */}
                <Text style={[styles.bsName, { color: colors.foreground }]} numberOfLines={1}>
                  {selectedStation.name}
                </Text>
                <Text style={[styles.bsAddr, { color: colors.muted }]} numberOfLines={1}>
                  {selectedStation.neighborhood} · {selectedStation.address}
                </Text>
                {(() => {
                  const price = selectedStation.prices.find(p => p.type === fuelType);
                  if (!price) return null;
                  const cat = getPriceCategory(price.price);
                  const pc = getPriceCategoryColor(cat);
                  return (
                    <View style={styles.bsPriceRow}>
                      <View style={[styles.bsPriceBadge, { backgroundColor: pc + '20' }]}>
                        <Text style={[styles.bsPrice, { color: pc }]}>R$ {price.price.toFixed(2)}</Text>
                      </View>
                      <Text style={[styles.bsTime, { color: colors.muted }]}>
                        {formatTimeAgo(price.updatedAt)} · {price.confirmations} confirmações
                      </Text>
                    </View>
                  );
                })()}
              </View>

              {/* Botão principal */}
              <Pressable
                onPress={() => handleViewDetail(selectedStation)}
                style={({ pressed }) => [
                  styles.bsBtnPrimary,
                  { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
                ]}
              >
                <Text style={styles.bsBtnText}>Ver detalhes</Text>
                <IconSymbol name="chevron.right" size={16} color="#fff" />
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 6,
  },
  cityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  appName: {
    fontSize: 19,
    fontWeight: '900',
    lineHeight: 25,
    letterSpacing: -0.3,
  },
  appCity: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  // Map pins
  pin: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  pinText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  pinTextSmall: {
    fontSize: 14,
    lineHeight: 18,
  },
  pinTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    alignSelf: 'center',
    marginTop: -1,
  },
  pinWarning: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FEF3C7',
    borderRadius: 6,
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Legend
  legendOverlay: {
    position: 'absolute',
    left: 16,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 12,
    lineHeight: 16,
  },
  // Center button
  centerBtn: {
    position: 'absolute',
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  // Bottom sheet
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  bsTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingHorizontal: 16,
    marginBottom: 2,
    position: 'relative',
  },
  bottomSheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    flex: 1,
  },
  bsCloseBtn: {
    position: 'absolute',
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 2,
    gap: 12,
  },
  bsName: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  bsAddr: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
  },
  bsPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  bsPriceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  bsPrice: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  bsTime: {
    fontSize: 11,
    lineHeight: 15,
  },
  bsActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  bsBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  bsBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },
  // Web fallback
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    lineHeight: 24,
  },
});
