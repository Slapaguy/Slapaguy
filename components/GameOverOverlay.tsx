import React from 'react';
import { Character } from './CharacterSelector';

interface GameOverContent {
  title: string;
  subtitle: string;
  icon: string;
  textColor: string;
  buttonColor: string;
}

const gameOverData: Record<Character, GameOverContent> = {
  default: {
    title: 'YOU LOSE',
    subtitle: "Maybe don't slap people next time.",
    icon: '😵',
    textColor: 'text-red-500',
    buttonColor: 'bg-red-600 hover:bg-red-700',
  },
  nerd: {
    title: 'SYSTEM OFFLINE',
    subtitle: 'A critical error occurred in facial_subsystem.exe.',
    icon: '💻',
    textColor: 'text-green-400',
    buttonColor: 'bg-green-600 hover:bg-green-700',
  },
  musician: {
    title: "SHOW'S OVER",
    subtitle: 'The final curtain call.',
    icon: '🎤',
    textColor: 'text-pink-400',
    buttonColor: 'bg-pink-600 hover:bg-pink-700',
  },
  wizard: {
    title: 'VANQUISHED!',
    subtitle: 'You have been bested by a superior force.',
    icon: '💀',
    textColor: 'text-purple-400',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
  },
  biden: {
    title: 'END OF QUOTE',
    subtitle: 'Repeat the line.',
    icon: '🦅',
    textColor: 'text-blue-400',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
  },
  chef: {
    title: 'SERVICE IS OVER!',
    subtitle: 'GET OUT!',
    icon: '🔪',
    textColor: 'text-white',
    buttonColor: 'bg-gray-800 hover:bg-gray-700',
  },
  billionaire: {
    title: 'HOSTILE TAKEOVER',
    subtitle: 'Your assets have been liquidated.',
    icon: '📉',
    textColor: 'text-yellow-400',
    buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
  },
};

interface GameOverOverlayProps {
  character: Character;
  onReset: () => void;
}

const GameOverOverlay: React.FC<GameOverOverlayProps> = ({ character, onReset }) => {
  const content = gameOverData[character] || gameOverData.default;
  const bgColor = character === 'chef' ? 'bg-red-700' : 'bg-black';


  return (
    <div className={`game-over-overlay ${bgColor}`}>
      <div className="game-over-icon">{content.icon}</div>
      <h2 className={`text-8xl font-bold font-mono ${content.textColor}`}>
        {content.title}
      </h2>
      <p className={`text-2xl mt-4 ${character === 'chef' ? 'text-yellow-300' : 'text-slate-300'}`}>
        {content.subtitle}
      </p>
      <button
        onClick={onReset}
        className={`mt-12 px-8 py-4 ${content.buttonColor} text-white font-bold rounded-lg text-2xl transition-transform hover:scale-105`}
      >
        Try Again
      </button>
    </div>
  );
};

export default GameOverOverlay;
