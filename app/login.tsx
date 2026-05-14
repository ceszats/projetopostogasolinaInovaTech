import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer } from '@/components/layout/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/theme/use-colors';
import { useApp } from '@/context/AppContext';
import { startOAuthLogin } from '@/constants/oauth';
import * as Haptics from 'expo-haptics';

export default function LoginScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { state, dispatch } = useApp();
  const [loading, setLoading] = useState<'google' | 'facebook' | null>(null);
  const [error, setError] = useState('');

  // Redireciona para o app se o usuário já estiver logado
  useEffect(() => {
    if (state.user) {
      router.replace('/(tabs)');
    }
  }, [state.user]);

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    setLoading(provider);
    setError('');
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      await startOAuthLogin();
      // startOAuthLogin redirects away or opens a web browser,
      // the callback will be handled by app/oauth/callback.tsx
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha no login com o provedor selecionado.';
      setError(message);
      if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <ScreenContainer
      containerClassName="bg-background"
      edges={['top', 'left', 'right', 'bottom']}
    >
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo and branding */}
        <View style={styles.header}>
          <Text style={{ fontSize: 56 }}>⛽</Text>
          <Text style={[styles.appName, { color: colors.foreground }]}>Abastece Manaus</Text>
          <Text style={[styles.appTagline, { color: colors.muted }]}>
            Encontre o combustível mais barato em Manaus
          </Text>
        </View>

        {/* Benefits */}
        <View style={[styles.benefitsBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <BenefitRow icon="🗺️" text="Mapa interativo com preços em tempo real" colors={colors} />
          <BenefitRow icon="💰" text="Compare preços entre postos" colors={colors} />
          <BenefitRow icon="🤝" text="Contribua com preços e ajude a comunidade" colors={colors} />
          <BenefitRow icon="🔔" text="Receba alertas quando o preço baixar" colors={colors} />
        </View>

        {/* Error message */}
        {error ? (
          <View style={[styles.errorBox, { backgroundColor: colors.error + '20', borderColor: colors.error }]}>
            <IconSymbol name="exclamationmark.circle.fill" size={16} color={colors.error} />
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
          </View>
        ) : null}

        {/* Login buttons */}
        <View style={styles.buttonContainer}>
          <Text style={[styles.loginTitle, { color: colors.foreground }]}>Faça login com</Text>

          {/* Google button */}
          <Pressable
            onPress={() => handleOAuthLogin('google')}
            disabled={loading !== null}
            style={({ pressed }) => [
              styles.oauthButton,
              {
                backgroundColor: '#fff',
                borderColor: '#DADCE0',
                opacity: pressed || loading !== null ? 0.75 : 1,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.08,
                shadowRadius: 3,
                elevation: 2,
              },
            ]}
          >
            {loading === 'google' ? (
              <ActivityIndicator size="small" color="#4285F4" />
            ) : (
              <>
                {/* Google "G" colorido */}
                <Text style={styles.googleIcon}>G</Text>
                <Text style={[styles.oauthButtonText, { color: '#3C4043' }]}>
                  Continuar com Google
                </Text>
              </>
            )}
          </Pressable>

          {/* Facebook button */}
          <Pressable
            onPress={() => handleOAuthLogin('facebook')}
            disabled={loading !== null}
            style={({ pressed }) => [
              styles.oauthButton,
              {
                backgroundColor: '#1877F2',
                borderColor: '#1877F2',
                opacity: pressed || loading !== null ? 0.75 : 1,
              },
            ]}
          >
            {loading === 'facebook' ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text style={styles.facebookIcon}>f</Text>
                <Text style={[styles.oauthButtonText, { color: '#fff' }]}>
                  Continuar com Facebook
                </Text>
              </>
            )}
          </Pressable>
        </View>

        {/* Privacy note */}
        <View style={styles.privacyBox}>
          <Text style={[styles.privacyText, { color: colors.muted }]}>
            Seus dados são protegidos. Usamos OAuth para segurança máxima. Você controla suas informações.
          </Text>
        </View>

        {/* Skip login */}
        <Pressable
          onPress={() => {
            // Define um usuário demo para que o AuthGuard não redirecione de volta para o login
            dispatch({
              type: 'SET_USER',
              user: { id: 0, name: 'Demo', email: null, openId: 'demo' },
            });
          }}
          style={({ pressed }) => [
            styles.skipButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Text style={[styles.skipButtonText, { color: colors.muted }]}>Entrar sem login</Text>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

function BenefitRow({ icon, text, colors }: { icon: string; text: string; colors: any }) {
  return (
    <View style={styles.benefitRow}>
      <Text style={{ fontSize: 18, lineHeight: 24 }}>{icon}</Text>
      <Text style={[styles.benefitText, { color: colors.foreground }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  appName: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 38,
    textAlign: 'center',
  },
  appTagline: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  benefitsBox: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  buttonContainer: {
    gap: 12,
  },
  loginTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21,
    textAlign: 'center',
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  oauthButtonText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 21,
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4285F4',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  facebookIcon: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 26,
  },
  privacyBox: {
    padding: 4,
  },
  privacyText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    textDecorationLine: 'underline',
  },
});
