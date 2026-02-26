import { useCallback } from 'react';

export function useTelegram() {
  const haptic = useCallback((type: 'light' | 'medium' | 'heavy' = 'medium') => {
    window.Telegram?.WebApp.HapticFeedback.impactOccurred(type);
  }, []);

  const hapticNotification = useCallback((type: 'success' | 'error' | 'warning' = 'success') => {
    window.Telegram?.WebApp.HapticFeedback.notificationOccurred(type);
  }, []);

  return { haptic, hapticNotification };
}
