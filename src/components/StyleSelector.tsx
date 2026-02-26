import { DESIGN_STYLES } from '../config/styles';

export function StyleSelector({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {DESIGN_STYLES.map((style) => (
        <button
          key={style.id}
          onClick={() => onSelect(style.id)}
          className={`p-3 rounded-xl text-left transition-all ${
            selected === style.id
              ? 'bg-accent text-black'
              : 'bg-bg-card text-gray-300 hover:bg-bg-body'
          }`}
        >
          <span className="text-xl mr-2">{style.emoji}</span>
          <span className="text-sm font-medium">{style.nameRu}</span>
        </button>
      ))}
    </div>
  );
}
