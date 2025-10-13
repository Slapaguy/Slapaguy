import React from 'react';
import { Character } from './CharacterSelector';

interface BackgroundProps {
  slapCount: number;
  knockoutThreshold: number;
}

const DefaultBackground: React.FC<BackgroundProps> = ({ slapCount }) => {
  // Starts at slate-900 (hsl(222 47% 11%)) and gets slightly redder and lighter
  const redness = Math.min(20, slapCount);
  const lightness = 11 + Math.floor(slapCount / 2);
  const hue = 222 - redness;
  const saturation = 47 - redness;

  return (
    <div 
      className="w-full h-full transition-colors duration-500" 
      style={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)` }} 
    />
  );
};

const NerdBackground: React.FC<BackgroundProps> = ({ slapCount }) => (
  <div className="w-full h-full bg-[#2c3e50] overflow-hidden p-8">
    <div className="w-full h-full border-8 border-[#8c6c4c] bg-[#34495e] p-4">
      <svg width="100%" height="100%" className="text-gray-300 opacity-60 font-mono text-xl md:text-2xl" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
        <text x="10%" y="20%" className="transition-opacity duration-500" style={{ opacity: slapCount > 1 ? 1 : 0 }}>E = mc²</text>
        <text x="80%" y="15%" className="transition-opacity duration-500" style={{ opacity: slapCount > 4 ? 1 : 0 }}>F = ma</text>
        <text x="50%" y="50%" className="transition-opacity duration-500" style={{ opacity: slapCount > 8 ? 1 : 0 }}>a²+b²=c²</text>
        <text x="20%" y="80%" className="transition-opacity duration-500" style={{ opacity: slapCount > 12 ? 1 : 0 }}>∫(1/x)dx=ln|x|+C</text>
        <path d="M 120 180 q 50 -50 100 0 t 100 0" stroke="white" strokeWidth="2" fill="none" className="transition-opacity duration-500" style={{ opacity: slapCount > 15 ? 0.5 : 0 }}/>
      </svg>
    </div>
  </div>
);

const MusicianBackground: React.FC<BackgroundProps> = ({ slapCount }) => (
  <div className="w-full h-full bg-gray-800 overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/50 to-transparent" />
    <div className={`bg-spotlight transition-opacity duration-1000 ${slapCount > 5 ? 'opacity-100' : 'opacity-50'}`} />
    <div className={`bg-spotlight animation-delay-[-10s] transition-opacity duration-1000 ${slapCount > 10 ? 'opacity-100' : 'opacity-50'}`} style={{ transform: 'scaleX(-1)' }} />
  </div>
);

const WizardBackground: React.FC<BackgroundProps> = ({ slapCount }) => (
  <div className="w-full h-full bg-gradient-to-br from-[#1e1b4b] to-[#4c1d95] relative overflow-hidden">
    {Array.from({ length: Math.min(20, Math.floor(slapCount / 2)) }).map((_, i) => (
      <div 
        key={i} 
        className="bg-rune"
        style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 10 + 10}s`,
          animationDelay: `${Math.random() * 10}s`,
        }}
      >
        룬
      </div>
    ))}
  </div>
);

const BidenBackground: React.FC<BackgroundProps> = ({ slapCount, knockoutThreshold }) => (
  <div className="w-full h-full bg-gradient-to-b from-sky-200 to-sky-400 flex items-center justify-center">
    <svg viewBox="0 0 200 100" className="w-4/5 h-4/5">
      <defs>
        <filter id="blur-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={slapCount > 10 ? Math.min(2, (slapCount-10)/2) : 0} />
        </filter>
      </defs>
      <g filter={slapCount > 10 ? "url(#blur-effect)" : ""} style={{ transition: 'filter 0.5s ease-in-out' }}>
        <rect x="0" y="0" width="200" height="100" fill="#a0d2e8" />
        <rect x="0" y="80" width="200" height="20" fill="#4a7c59" />
        <circle cx="150" cy="30" r="10" fill="#ffeb3b" />
        <path d="M 10 90 C 40 70, 70 70, 100 90 S 160 110, 190 90" fill="none" stroke="#6b9b7a" strokeWidth="5" />
      </g>
      <path d="M 50 5 C 20 5, 20 95, 50 95 L 150 95 C 180 95, 180 5, 150 5 Z" fill="#f5f5dc" stroke="#8B4513" strokeWidth="4" />
      <path d="M 100 5 L 100 95" stroke="#8B4513" strokeWidth="4" />
      <path d="M 50 50 L 150 50" stroke="#8B4513" strokeWidth="4" />
    </svg>
  </div>
);

const ChefBackground: React.FC<BackgroundProps> = ({ slapCount }) => (
  <div className="w-full h-full bg-[#eee] overflow-hidden" style={{
    backgroundImage: `
      linear-gradient(45deg, #ddd 25%, transparent 25%), 
      linear-gradient(-45deg, #ddd 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ddd 75%),
      linear-gradient(-45deg, transparent 75%, #ddd 75%)`,
    backgroundSize: '40px 40px',
  }}>
    {Array.from({ length: Math.min(10, Math.floor(slapCount / 2)) }).map((_, i) => (
      <div 
        key={i} 
        className="absolute text-5xl text-red-700/70 pop-in"
        style={{
          top: `${10 + i * 8 + Math.random() * 5}%`,
          left: `${10 + Math.random() * 80}%`,
          transform: `rotate(${Math.random() * 360}deg)`,
          animationDelay: `${i * 0.1}s`
        }}
      >
        🍅
      </div>
    ))}
  </div>
);

const BillionaireBackground: React.FC<BackgroundProps> = ({ slapCount }) => (
    <div className="w-full h-full bg-[#000010] overflow-hidden relative">
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="bg-star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
      <div 
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-tl from-red-800 via-orange-600 to-yellow-400 transition-transform duration-1000"
        style={{ transform: `rotate(${slapCount * 2}deg)` }}
      />
    </div>
);


interface DynamicBackgroundProps {
  character: Character;
  slapCount: number;
  knockoutThreshold: number;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ character, slapCount, knockoutThreshold }) => {
  const renderBackground = () => {
    const props = { slapCount, knockoutThreshold };
    switch(character) {
      case 'nerd': return <NerdBackground {...props} />;
      case 'musician': return <MusicianBackground {...props} />;
      case 'wizard': return <WizardBackground {...props} />;
      case 'biden': return <BidenBackground {...props} />;
      case 'chef': return <ChefBackground {...props} />;
      case 'billionaire': return <BillionaireBackground {...props} />;
      default: return <DefaultBackground {...props} />;
    }
  };

  return (
    <div className="fixed inset-0 -z-10">
      {renderBackground()}
    </div>
  );
};

export default DynamicBackground;