/**
 * use-price-engine.ts
 *
 * Motor de precificação colaborativa:
 *  - Calcula mediana ponderada das contribuições recentes
 *  - Detecta outliers (preços suspeitos)
 *  - Computa score de reputação do usuário
 *  - Integra o preço de âncora da ANP como fallback
 */

import { useMemo } from 'react';
import { FuelType } from '@/data/stations';

export interface RawContribution {
  price: number;
  createdAt: Date;
  userId?: number;
  confirmed?: boolean; // foi confirmado por outro usuário
}

export interface PriceEngineResult {
  /** Preço mediano calculado pelas contribuições recentes */
  medianPrice: number | null;
  /** Número de contribuições usadas no cálculo */
  sampleCount: number;
  /** Preço é considerado confiável (≥3 contribuições nas últimas 24h) */
  isReliable: boolean;
  /** Indica se há contribuições recentes (< 6h) */
  isFresh: boolean;
  /** Intervalo de confiança (min / max das contribuições válidas) */
  range: { min: number; max: number } | null;
}

export interface OutlierCheck {
  isOutlier: boolean;
  /** Percentual de desvio em relação à mediana atual */
  deviation: number;
}

// --- Constantes de configuração ---
const FRESH_HOURS = 6;        // Contribuições < 6h são "frescas"
const RECENT_HOURS = 24;      // Contribuições < 24h entram no cálculo
const OUTLIER_THRESHOLD = 0.15; // 15% de desvio = suspeito
const RELIABLE_MIN_SAMPLES = 3;

// Preços-âncora ANP Manaus (atualizar semanalmente)
// Fonte: https://www.gov.br/anp — média municipal última semana
export const ANP_ANCHOR_PRICES: Record<FuelType, number> = {
  gasolina:  6.18,
  aditivada: 6.48,
  etanol:    4.38,
  diesel:    5.98,
  gnv:       4.85,
};

// ---

/** Calcula mediana de um array numérico ordenado */
function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

/** Filtra contribuições recentes (dentro de RECENT_HOURS) */
function filterRecent(contributions: RawContribution[], hours = RECENT_HOURS) {
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
  return contributions.filter(c => c.createdAt >= cutoff);
}

/**
 * Hook principal do motor de preços.
 * Recebe contribuições brutas e retorna o preço calculado.
 */
export function usePriceEngine(
  contributions: RawContribution[],
  fuelType: FuelType,
  anchorPrice?: number,
): PriceEngineResult {
  return useMemo(() => {
    const recent = filterRecent(contributions);

    if (recent.length === 0) {
      // Sem contribuições recentes → usa âncora ANP
      const anchor = anchorPrice ?? ANP_ANCHOR_PRICES[fuelType];
      return {
        medianPrice: anchor,
        sampleCount: 0,
        isReliable: false,
        isFresh: false,
        range: null,
      };
    }

    const prices = recent.map(c => c.price);
    const med = median(prices);
    const freshCount = filterRecent(contributions, FRESH_HOURS).length;

    return {
      medianPrice: parseFloat(med.toFixed(2)),
      sampleCount: recent.length,
      isReliable: recent.length >= RELIABLE_MIN_SAMPLES,
      isFresh: freshCount > 0,
      range: {
        min: Math.min(...prices),
        max: Math.max(...prices),
      },
    };
  }, [contributions, fuelType, anchorPrice]);
}

/**
 * Verifica se um preço reportado é um outlier em relação à mediana atual.
 * Usado antes de aceitar uma contribuição para sinalizar preços suspeitos.
 */
export function checkOutlier(
  newPrice: number,
  currentMedian: number | null,
): OutlierCheck {
  if (currentMedian === null || currentMedian === 0) {
    return { isOutlier: false, deviation: 0 };
  }
  const deviation = Math.abs(newPrice - currentMedian) / currentMedian;
  return {
    isOutlier: deviation > OUTLIER_THRESHOLD,
    deviation: parseFloat((deviation * 100).toFixed(1)),
  };
}

// ---
// Score de reputação do usuário
// Fórmula: (contribuições confirmadas / total) × 100, com mínimo de 50
// ---

export interface ReputationScore {
  score: number;           // 0–100
  level: 'bronze' | 'prata' | 'ouro' | 'mestre';
  label: string;
  emoji: string;
  nextLevelAt: number | null; // total de contribuições para subir de nível
}

export const REPUTATION_LEVELS = [
  { level: 'bronze' as const, label: 'Contribuidor Bronze', emoji: '🥉', minContrib: 0,   minScore: 0  },
  { level: 'prata'  as const, label: 'Contribuidor Prata',  emoji: '🥈', minContrib: 10,  minScore: 60 },
  { level: 'ouro'   as const, label: 'Contribuidor Ouro',   emoji: '🥇', minContrib: 50,  minScore: 75 },
  { level: 'mestre' as const, label: 'Mestre da Frota',     emoji: '⭐', minContrib: 200, minScore: 90 },
];

export function calcReputation(
  totalContributions: number,
  confirmedContributions: number,
): ReputationScore {
  const rawScore = totalContributions === 0
    ? 50
    : Math.round((confirmedContributions / totalContributions) * 100);
  const score = Math.max(50, Math.min(100, rawScore));

  // Determinar nível atual (do maior para o menor)
  let currentLevel = REPUTATION_LEVELS[0];
  for (const lvl of REPUTATION_LEVELS) {
    if (totalContributions >= lvl.minContrib && score >= lvl.minScore) {
      currentLevel = lvl;
    }
  }

  const currentIdx = REPUTATION_LEVELS.indexOf(currentLevel);
  const nextLevel = REPUTATION_LEVELS[currentIdx + 1] ?? null;

  return {
    score,
    level: currentLevel.level,
    label: currentLevel.label,
    emoji: currentLevel.emoji,
    nextLevelAt: nextLevel ? nextLevel.minContrib : null,
  };
}
