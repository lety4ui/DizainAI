declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        HapticFeedback: {
          impactOccurred: (type: 'light' | 'medium' | 'heavy') => void;
          notificationOccurred: (type: 'success' | 'error' | 'warning') => void;
        };
        downloadFile: (params: { url: string; file_name: string }) => void;
      };
    };
  }
}

export {};
