import { useState, useCallback } from 'react';
import type { AppScreen } from './types';
import { useTelegram } from './hooks/useTelegram';
import { startGeneration, sendResult } from './api/generate';
import { DESIGN_STYLES } from './config/styles';
import { PhotoUpload } from './components/PhotoUpload';
import { StyleSelector } from './components/StyleSelector';
import { ModelSelector } from './components/ModelSelector';
import { Processing } from './components/Processing';
import { Result } from './components/Result';
import { VideoPlayer } from './components/VideoPlayer';

function getInitData(): string {
  return window.Telegram?.WebApp.initData ?? '';
}

export function App() {
  const { haptic, hapticNotification } = useTelegram();

  const [screen, setScreen] = useState<AppScreen>('main');
  const [photo, setPhoto] = useState<File | null>(null);
  const [style, setStyle] = useState('modern');
  const [model, setModel] = useState('nano-banana-pro');
  const [taskId, setTaskId] = useState<string | null>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const doGeneration = useCallback(async () => {
    if (!photo) return;
    const initData = getInitData();
    try {
      const id = await startGeneration(photo, style, model, initData);
      setTaskId(id);
      setScreen('processing');
    } catch {
      setError('Не удалось начать генерацию. Попробуйте ещё раз.');
      hapticNotification('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [photo, style, model, hapticNotification]);

  const handleGenerate = useCallback(async () => {
    if (!photo) return;
    setError(null);
    setIsSubmitting(true);
    haptic('medium');

    try {
      await doGeneration();
    } catch {
      setError('Не удалось начать генерацию. Попробуйте ещё раз.');
      hapticNotification('error');
      setIsSubmitting(false);
    }
  }, [photo, haptic, hapticNotification, doGeneration]);

  const handleComplete = useCallback(
    (imageUrl: string) => {
      setGeneratedUrl(imageUrl);
      setScreen('result');
      hapticNotification('success');

      const initData = getInitData();
      const styleConfig = DESIGN_STYLES.find((s) => s.id === style);
      const caption = styleConfig ? `${styleConfig.emoji} ${styleConfig.nameRu}` : style;
      if (initData) {
        sendResult(initData, imageUrl, caption);
      }
    },
    [hapticNotification, style],
  );

  const handleError = useCallback(
    async (errorMsg: string) => {
      setScreen('main');
      hapticNotification('error');
      setError(errorMsg || 'Генерация не удалась. Попробуйте ещё раз.');
    },
    [hapticNotification],
  );

  const handleNewGeneration = useCallback(() => {
    setScreen('main');
    setTaskId(null);
    setGeneratedUrl(null);
    setError(null);
  }, []);

  if (screen === 'processing' && taskId) {
    return (
      <div className="min-h-screen bg-bg-primary text-white">
        <Processing taskId={taskId} onComplete={handleComplete} onError={handleError} />
      </div>
    );
  }

  if (screen === 'result' && generatedUrl && photo) {
    return (
      <div className="min-h-screen bg-bg-primary text-white">
        <div className="pt-4">
          <h1 className="text-xl font-bold text-center mb-4">Ваш дизайн</h1>
          <Result
            originalPhoto={photo}
            generatedUrl={generatedUrl}
            roomStyle={style}
            onNewGeneration={handleNewGeneration}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-white">
      <div className="px-4 py-6 flex flex-col gap-5">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Комната" className="w-10 h-10 rounded-xl object-cover" />
            <h1 className="text-2xl font-bold tracking-wide uppercase">Комната</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">Редизайн интерьера с помощью ИИ</p>
        </div>

        <section>
          <VideoPlayer />
        </section>

        <section>
          <h2 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">Фото</h2>
          <PhotoUpload photo={photo} onPhotoChange={setPhoto} />
        </section>

        <section>
          <h2 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">Стиль</h2>
          <StyleSelector selected={style} onSelect={setStyle} />
        </section>

        <section>
          <h2 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">AI Модель</h2>
          <ModelSelector selected={model} onSelect={setModel} />
        </section>

        {error && (
          <div className="p-3 rounded-xl bg-red-900/30 border border-red-800 text-red-300 text-sm">
            {error}
          </div>
        )}

        <button
          type="button"
          disabled={!photo || isSubmitting}
          onClick={handleGenerate}
          className="w-full py-4 rounded-xl bg-accent text-black font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed active:opacity-80 transition-opacity"
        >
          {isSubmitting ? 'Запуск...' : '🎨 Сгенерировать дизайн БЕСПЛАТНО'}
        </button>
      </div>
    </div>
  );
}
