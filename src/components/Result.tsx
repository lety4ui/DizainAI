import { useState } from 'react';
import { DESIGN_STYLES } from '../config/styles';

interface ResultProps {
  originalPhoto: File;
  generatedUrl: string;
  roomStyle: string;
  onNewGeneration: () => void;
}

export function Result({ originalPhoto, generatedUrl, roomStyle, onNewGeneration }: ResultProps) {
  const [showOriginal, setShowOriginal] = useState(false);
  const [showShopping, setShowShopping] = useState(false);
  const [furnitureStyle, setFurnitureStyle] = useState(roomStyle);
  const originalUrl = URL.createObjectURL(originalPhoto);

  const furniture = [
    { id: '1', name: 'Диван', cat: 'Мягкая мебель' },
    { id: '2', name: 'Кресло', cat: 'Мягкая мебель' },
    { id: '3', name: 'Кофейный столик', cat: 'Столы' },
    { id: '4', name: 'Обеденный стол', cat: 'Столы' },
    { id: '5', name: 'Торшер', cat: 'Освещение' },
    { id: '6', name: 'Люстра', cat: 'Освещение' },
    { id: '7', name: 'Настольная лампа', cat: 'Освещение' },
    { id: '8', name: 'Шкаф', cat: 'Хранение' },
    { id: '9', name: 'Комод', cat: 'Хранение' },
    { id: '10', name: 'Тумбочка', cat: 'Хранение' },
    { id: '11', name: 'Ковер', cat: 'Текстиль' },
    { id: '12', name: 'Шторы', cat: 'Текстиль' },
    { id: '13', name: 'Зеркало', cat: 'Декор' },
    { id: '14', name: 'Картина', cat: 'Декор' },
    { id: '15', name: 'Ваза', cat: 'Декор' },
    { id: '16', name: 'Растение', cat: 'Декор' },
    { id: '17', name: 'Полка', cat: 'Хранение' },
    { id: '18', name: 'ТВ-тумба', cat: 'Хранение' },
  ].map(item => {
    const query = `${item.name} ${furnitureStyle}`;
    const encoded = encodeURIComponent(query);
    return { 
      ...item, 
      yandex: `https://market.yandex.ru/search?text=${encoded}`, 
      ozon: `https://www.ozon.ru/search/?text=${encoded}` 
    };
  });

  const getName = (s: string) => {
    const st = DESIGN_STYLES.find(x => x.id === s);
    return st ? `${st.emoji} ${st.nameRu}` : s;
  };

  return (
    <div className="flex flex-col gap-4 px-4 pb-6">
      <div className="relative rounded-2xl overflow-hidden">
        <img src={showOriginal ? originalUrl : generatedUrl} alt="" className="w-full object-cover" style={{ aspectRatio: '3/4' }} />
        <div className="absolute bottom-3 left-3 right-3 flex gap-2">
          <button onClick={() => setShowOriginal(false)} className={`flex-1 py-2 rounded-lg text-sm ${!showOriginal ? 'bg-accent text-black' : 'bg-black/50 text-white'}`}>Результат</button>
          <button onClick={() => setShowOriginal(true)} className={`flex-1 py-2 rounded-lg text-sm ${showOriginal ? 'bg-accent text-black' : 'bg-black/50 text-white'}`}>Оригинал</button>
        </div>
      </div>

      <div className="bg-bg-card rounded-xl p-3 flex justify-between">
        <span className="text-sm text-gray-400">Комната:</span>
        <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">{getName(roomStyle)}</span>
      </div>

      <button onClick={() => setShowShopping(!showShopping)} className={`w-full py-3 rounded-xl font-semibold text-sm ${showShopping ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
        {showShopping ? `✓ ${furniture.length} товаров` : '🔍 Найти товары'}
      </button>

      {showShopping && (
        <div className="bg-bg-card rounded-xl p-4">
          <h3 className="font-semibold text-gray-200 mb-3">🎨 Стиль мебели:</h3>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {DESIGN_STYLES.map(s => (
              <button key={s.id} onClick={() => setFurnitureStyle(s.id)} className={`p-2 rounded-lg text-sm text-left ${furnitureStyle === s.id ? 'bg-blue-500 text-white' : 'bg-bg-body text-gray-300'}`}>
                {s.emoji} {s.nameRu}
              </button>
            ))}
          </div>
        </div>
      )}

      {showShopping && (
        <div className="bg-bg-card rounded-xl p-4">
          <h3 className="font-semibold text-gray-200 mb-2">🏷️ {furniture.length} предметов</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {furniture.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-bg-body rounded-lg">
                <div>
                  <p className="font-medium text-gray-200">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.cat}</p>
                </div>
                <div className="flex gap-2">
                  <a href={item.yandex} target="_blank" rel="noopener" className="px-3 py-1.5 bg-[#fc3f1d] text-white text-xs rounded-lg">Яндекс</a>
                  <a href={item.ozon} target="_blank" rel="noopener" className="px-3 py-1.5 bg-[#005bff] text-white text-xs rounded-lg">Ozon</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={() => {}} className="flex-1 py-3.5 rounded-xl bg-accent text-black font-semibold text-sm">Сохранить</button>
        <button onClick={onNewGeneration} className="flex-1 py-3.5 rounded-xl bg-bg-card text-gray-300 font-semibold text-sm">Ещё раз</button>
      </div>
    </div>
  );
}
