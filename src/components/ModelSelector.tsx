import { AI_MODELS } from '../config/models';

export function ModelSelector({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <div className="space-y-2">
      {AI_MODELS.map((model) => (
        <button
          key={model.id}
          onClick={() => onSelect(model.id)}
          className={`w-full p-3 rounded-xl text-left transition-all ${
            selected === model.id
              ? 'bg-accent text-black'
              : 'bg-bg-card text-gray-300 hover:bg-bg-body'
          }`}
        >
          <div className="font-medium">{model.name}</div>
          <div className="text-xs opacity-70">{model.description}</div>
        </button>
      ))}
    </div>
  );
}
