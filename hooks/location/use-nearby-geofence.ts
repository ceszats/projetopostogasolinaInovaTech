/**
 * use-nearby-geofence.ts
 *
 * Hook para detectar quando o usuário está fisicamente em um posto de gasolina.
 * Utiliza a localização atual e compara com as coordenadas dos postos.
 */

import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { calculateDistance, Station } from '@/data/stations';

// Distância em KM para considerar que o usuário está "no posto" (50 metros)
const GEOFENCE_RADIUS_KM = 0.05;

export function useNearbyGeofence() {
  const { state } = useApp();
  const [nearbyStation, setNearbyStation] = useState<Station | null>(null);

  useEffect(() => {
    if (!state.userLocation) return;

    // Procura o posto mais próximo
    let closest: Station | null = null;
    let minDistance = Infinity;

    for (const station of state.stations) {
      const dist = calculateDistance(
        state.userLocation.latitude,
        state.userLocation.longitude,
        station.latitude,
        station.longitude
      );

      if (dist < minDistance) {
        minDistance = dist;
        closest = station;
      }
    }

    // Se o mais próximo estiver dentro do raio de geofence
    if (closest && minDistance <= GEOFENCE_RADIUS_KM) {
      if (nearbyStation?.id !== closest.id) {
        setNearbyStation(closest);
      }
    } else {
      setNearbyStation(null);
    }
  }, [state.userLocation, state.stations]);

  return nearbyStation;
}
