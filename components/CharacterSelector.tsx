import React from 'react';

// Define the available characters.
export type Character = 'default' | 'nerd' | 'wizard' | 'musician' | 'biden' | 'chef' | 'billionaire';

interface CharacterSelectorProps {
  onSelectCharacter: (character: Character) => void;
  currentCharacter: Character;
  isDisabled: boolean;
}

const characters: { id: Character; name: string; emoji: string; }[] = [
  { id: 'default', name: 'Default', emoji: '😐' },
  { id: 'nerd', name: 'Nerd', emoji: '🤓' },
  { id: 'musician', name: 'Musician', emoji: '🎧' },
  { id: 'wizard', name: 'Wizard', emoji: '🧙‍♂️' },
  { id: 'biden', name: 'Joe Biden', emoji: '🕶️' },
  { id: 'chef', name: 'Chef', emoji: '👨‍🍳' },
  { id: 'billionaire', name: 'Billionaire', emoji: '🚀' },
];

const CharacterSelector: React.FC<CharacterSelectorProps> = ({ onSelectCharacter, currentCharacter, isDisabled }) => {
  return (
    <div className="flex justify-center items-center gap-3 mb-4">
      <p className="text-slate-400 font-semibold mr-2">Character:</p>
      {characters.map(({ id, name, emoji }) => (
        <button
          key={id}
          onClick={() => onSelectCharacter(id)}
          disabled={isDisabled}
          aria-label={`Select ${name} character`}
          title={name}
          className={`
            px-4 py-2 text-xl border-2 rounded-lg transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${currentCharacter === id 
              ? 'bg-sky-500 border-sky-400 text-white shadow-lg scale-110' 
              : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:border-slate-500'}
          `}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default CharacterSelector;