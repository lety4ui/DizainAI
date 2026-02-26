import { useEffect } from 'react';

export function Processing({ taskId, onComplete, onError }: { 
  taskId: string; 
  onComplete: (url: string) => void; 
  onError: (msg: string) => void;
}) {
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/status?taskId=${taskId}`);
        const data = await response.json();
        
        if (data.status === 'completed' && data.imageUrl) {
          onComplete(data.imageUrl);
        } else if (data.status === 'failed') {
          onError('Генерация не удалась');
        }
      } catch {
        // Retry
      }
    };

    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, [taskId, onComplete, onError]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-bold mb-2">Генерируем дизайн...</h2>
      <p className="text-gray-400 text-center">Это может занять 30-60 секунд</p>
    </div>
  );
}
