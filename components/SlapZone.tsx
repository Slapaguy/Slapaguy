import React from 'react';
import { Character } from './CharacterSelector';
import SpeechBubble from './SpeechBubble';
import MumbleBubble from './MumbleBubble';

type SlapAngle = 'from-left' | 'from-right';

interface SlapZoneProps {
  isSlapping: boolean;
  showSlapMark: boolean;
  slapCount: number;
  onSlap: () => void;
  character: Character;
  reactionText: string;
  mumbleText: string;
  knockoutThreshold: number;
  slapAngle: SlapAngle;
  idleAnimation: string | null;
  isTaunting: boolean;
  isGameOverByGun: boolean;
  degradationPath: number;
}

const Particles: React.FC<{ slapAngle: SlapAngle }> = ({ slapAngle }) => {
  const particleCount = 18;
  
  const particleTypes = [
    'particle-star-gold', 'particle-star-red', 'particle-dust', 'particle-square-blue', 'particle-triangle-purple'
  ];

  const particles = Array.from({ length: particleCount }).map((_, i) => {
    // Bias the angle away from the slap direction
    const baseAngle = slapAngle === 'from-left' ? 0 : 180;
    const angleOffset = (Math.random() - 0.5) * 180; // Spread of 180 degrees
    const angle = baseAngle + angleOffset;

    const distance = 50 + Math.random() * 60;
    const duration = 0.5 + Math.random() * 0.5;
    const delay = Math.random() * 0.1;
    const style = {
      '--angle': `${angle}deg`, '--distance': `${distance}px`,
      animationDuration: `${duration}s`, animationDelay: `${delay}s`,
    } as React.CSSProperties;
    const particleClass = particleTypes[Math.floor(Math.random() * particleTypes.length)];
    return <div key={i} className={`particle ${particleClass}`} style={style} />;
  });
  
  // A slap from the left hits the character's right cheek (from viewer's perspective).
  // A slap from the right hits the character's left cheek.
  const positionClasses = slapAngle === 'from-left'
      ? '-translate-x-[20%] -translate-y-[10%]' // Right cheek
      : '-translate-x-[80%] -translate-y-[10%]'; // Left cheek

  return (
    <div className={`absolute top-1/2 left-1/2 w-px h-px pointer-events-none ${positionClasses}`}>
        {particles}
    </div>
  );
};

interface GearProps {
    slapCount: number;
    showSlapMark: boolean;
    knockoutThreshold: number;
    victoryThreshold: number;
    slapAngle: SlapAngle;
}

const NerdGlasses: React.FC<GearProps> = ({ slapCount, showSlapMark, knockoutThreshold, victoryThreshold, slapAngle }) => {
    const isKO = slapCount > knockoutThreshold && slapCount <= victoryThreshold;
    const isBruised = slapCount > 10;
    const slapReactionTransform = showSlapMark && !isKO 
        ? (slapAngle === 'from-left' ? 'translate(2, -1)' : 'translate(-2, -1)')
        : '';

    const glassesTransform = `${isKO ? 'rotate(-15 50 50)' : ''} ${slapReactionTransform}`;

    return (
        <g transform={glassesTransform} style={{ transition: 'transform 0.1s ease-in-out' }} pointerEvents="none">
            {/* Frames [O-O] style */}
            <circle cx="35" cy="40" r="11" fill="none" stroke="black" strokeWidth="3" />
            <circle cx="65" cy="40" r="11" fill="none" stroke="black" strokeWidth="3" />
            
            {/* Bridge */}
            <path d="M 46 40 Q 50 35 54 40" fill="none" stroke="black" strokeWidth="3" />
            
            {/* Lenses */}
            <circle cx="35" cy="40" r="8" fill="white" opacity="0.3" />
            <circle cx="65" cy="40" r="8" fill="white" opacity="0.3" />

            {/* Crack on lens when bruised */}
            {isBruised && (
                <path d="M 31 36 L 39 44" stroke="white" strokeWidth="1.5" opacity="0.8" />
            )}
            
            {/* Tape on the bridge */}
            <rect x="47" y="33" width="6" height="4" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.5" transform="rotate(-15 50 35)"/>
        </g>
    );
};

const MusicianGear: React.FC<GearProps> = ({ slapCount, showSlapMark, knockoutThreshold, victoryThreshold, slapAngle }) => {
    const isKO = slapCount > knockoutThreshold && slapCount <= victoryThreshold;
    const slapReactionTransform = showSlapMark && !isKO
        ? (slapAngle === 'from-left' ? 'translate(2, 1)' : 'translate(-2, 1)')
        : '';

    const gearTransform = `${isKO ? 'rotate(-10 50 50) translate(0, 5)' : ''} ${slapReactionTransform}`;

    return (
        <g transform={gearTransform} style={{ transition: 'transform 0.1s ease-in-out' }} pointerEvents="none">
            {/* Headphones Band */}
            <path d="M 15 45 C 10 10, 90 10, 85 45" stroke="black" strokeWidth="5" fill="none" strokeLinecap="round" />
            
            {/* Headphones Earpieces */}
            <circle cx="15" cy="50" r="10" fill="#333" stroke="black" strokeWidth="2" />
            <circle cx="85" cy="50" r="10" fill="#333" stroke="black" strokeWidth="2" />
            <circle cx="15" cy="50" r="7" fill="#555" />
            <circle cx="85" cy="50" r="7" fill="#555" />

            {/* Sunglasses */}
            <g>
                {/* Lenses */}
                <rect x="25" y="35" width="22" height="12" fill="#222" rx="3"/>
                <rect x="53" y="35" width="22" height="12" fill="#222" rx="3"/>
                {/* Frames */}
                <path d="M 24 34 h 52 v 14 h -52 z" fill="none" stroke="black" strokeWidth="3" rx="5" />
                
                {/* Crack on lens when bruised */}
                {slapCount > 10 && (
                    <path d="M 60 38 L 70 42" stroke="white" strokeWidth="1.5" opacity="0.7" />
                )}
            </g>
        </g>
    );
};

const WizardGear: React.FC<GearProps> = ({ slapCount, showSlapMark, knockoutThreshold, victoryThreshold, slapAngle }) => {
    const isKO = slapCount > knockoutThreshold && slapCount <= victoryThreshold;
    const slapReactionTransform = showSlapMark && !isKO
        ? (slapAngle === 'from-left' ? 'translate(3, 2) rotate(5 50 50)' : 'translate(-3, 2) rotate(-5 50 50)')
        : '';

    const gearTransform = `${isKO ? 'rotate(-15 50 50) translate(-5, 5)' : ''} ${slapReactionTransform}`;

    return (
        <g transform={gearTransform} style={{ transition: 'transform 0.1s ease-in-out' }} pointerEvents="none">
            {/* Wizard Hat */}
            <path d="M 20 35 L 50 5 L 80 35 L 70 32 L 30 32 Z" fill="#4A00E0" stroke="black" strokeWidth="2" />
            <path d="M 15 35 Q 50 45 85 35" fill="#4A00E0" stroke="black" strokeWidth="2" />
            {/* Star on hat */}
            <path d="M48 18 l2 4 4 1 -3 3 1 5 -5 -2 -5 2 1 -5 -3 -3 4 -1z" fill="yellow" />


            {/* Wizard Beard */}
            <path d="M 30 65 C 20 80, 25 100, 50 95 C 75 100, 80 80, 70 65" fill="white" stroke="black" strokeWidth="2" />
        </g>
    );
};

const BidenGear: React.FC<GearProps> = ({ slapCount, showSlapMark, knockoutThreshold, victoryThreshold, slapAngle }) => {
    const isKO = slapCount > knockoutThreshold && slapCount <= victoryThreshold;
    const slapReactionTransform = showSlapMark && !isKO 
        ? (slapAngle === 'from-left' ? 'translate(3, 1) rotate(5 50 50)' : 'translate(-3, 1) rotate(-5 50 50)')
        : '';
    // When KO'd, glasses fly off to the side.
    const gearTransform = isKO ? 'rotate(45 50 50) translate(25, -25)' : slapReactionTransform;

    return (
        <g transform={gearTransform} style={{ transition: 'transform 0.2s ease-in-out' }} pointerEvents="none">
            {/* Hair */}
            <path d="M25,28 C35,15, 65,15, 75,28 L78,35 L22,35 Z" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.5" />

            {/* Aviator Sunglasses */}
            <g>
                {/* Lenses with reflection */}
                <path d="M25,38 C20,52 50,52 48,38 Z" fill="#222" stroke="black" strokeWidth="2"/>
                <path d="M52,38 C50,52 80,52 75,38 Z" fill="#222" stroke="black" strokeWidth="2"/>
                <path d="M28,42 L35,42" stroke="white" strokeWidth="1.5" opacity="0.6" />
                <path d="M55,42 L62,42" stroke="white" strokeWidth="1.5" opacity="0.6" />

                {/* Bridge */}
                <rect x="47" y="37" width="6" height="2.5" fill="#a0a0a0" />
                {/* Top Bar */}
                <path d="M24,38 h52" stroke="black" strokeWidth="2.5" fill="none" />
            </g>
        </g>
    );
};

const ChefGear: React.FC<GearProps> = ({ slapCount, showSlapMark, knockoutThreshold, victoryThreshold, slapAngle }) => {
    const isKO = slapCount > knockoutThreshold && slapCount <= victoryThreshold;
    const slapReactionTransform = showSlapMark && !isKO 
        ? (slapAngle === 'from-left' ? 'translate(2, -1) rotate(3 50 50)' : 'translate(-2, -1) rotate(-3 50 50)')
        : '';
    const gearTransform = `${isKO ? 'rotate(-25 50 50) translate(-10, 10)' : ''} ${slapReactionTransform}`;

    return (
        <g transform={gearTransform} style={{ transition: 'transform 0.1s ease-in-out' }} pointerEvents="none">
            {/* Chef Toque */}
            <path d="M20,35 C20,15 80,15 80,35 Q85,20 75,15 C70,10 60,10 50,15 C40,10 30,10 25,15 Q15,20 20,35 Z" fill="white" stroke="black" strokeWidth="2" />
        </g>
    );
};

const BillionaireGear: React.FC<GearProps> = ({ slapCount, showSlapMark, knockoutThreshold, victoryThreshold, slapAngle }) => {
    const isKO = slapCount > knockoutThreshold && slapCount <= victoryThreshold;
    const slapReactionTransform = showSlapMark && !isKO 
        ? (slapAngle === 'from-left' ? 'translate(1, 0)' : 'translate(-1, 0)')
        : '';
    const gearTransform = `${isKO ? 'rotate(5 50 50)' : ''} ${slapReactionTransform}`;

    return (
        <g transform={gearTransform} style={{ transition: 'transform 0.1s ease-in-out' }} pointerEvents="none">
            {/* Hair */}
            <path d="M30 25 C 40 18, 60 18, 70 25 L 75 35 L 25 35 Z" fill="#574940" />
            <path d="M 48 20 L 52 20 L 50 25 Z" fill="#574940" />
        </g>
    );
};

// Victory Animations
const ConfettiVictory: React.FC = () => {
    const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => {
                const style = {
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 8 + 6}px`,
                    height: `${Math.random() * 8 + 6}px`,
                    backgroundColor: colors[i % colors.length],
                    '--r-end': `${Math.random() * 360}deg`,
                    animationDuration: `${Math.random() * 2 + 3}s`,
                    animationDelay: `${Math.random() * 3}s`,
                } as React.CSSProperties;
                return <div key={i} className="victory-confetti" style={style} />;
            })}
        </div>
    );
};

const NerdVictory: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => {
            const style = {
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 12 + 10}px`,
                animationDuration: `${Math.random() * 2 + 2}s`,
                animationDelay: `${Math.random() * 3}s`,
            } as React.CSSProperties;
            return <div key={i} className="victory-binary" style={style}>{Math.round(Math.random())}</div>;
        })}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-mono text-[#0F0] pop-in" style={{ textShadow: '0 0 10px #0F0' }}>
            VICTORY!
        </div>
    </div>
);

const MusicianVictory: React.FC = () => {
    const notes = ['🎵', '🎶', '🎼', '🎤'];
    const colors = ['#EC4899', '#8B5CF6', '#3B82F6'];
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => {
                const style = {
                    left: `${Math.random() * 100}%`,
                    color: colors[i % colors.length],
                    '--r-start': `${Math.random() * 90 - 45}deg`,
                    '--r-end': `${Math.random() * 90 - 45}deg`,
                    animationDuration: `${Math.random() * 3 + 4}s`,
                    animationDelay: `${Math.random() * 4}s`,
                } as React.CSSProperties;
                return <div key={i} className="victory-note" style={style}>{notes[i % notes.length]}</div>;
            })}
        </div>
    );
};

const WizardVictory: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 40 }).map((_, i) => {
                const style = {
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 2 + 1}s`,
                    animationDelay: `${Math.random() * 3}s`,
                } as React.CSSProperties;
                return <div key={i} className="victory-sparkle" style={style} />;
            })}
        </div>
    );
};

const BidenVictory: React.FC = () => {
    const colors = ['#BF0A30', '#FFFFFF', '#002868']; // US Flag colors
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 60 }).map((_, i) => {
                const isStar = i % 4 === 0;
                const style = {
                    left: `${Math.random() * 100}%`,
                    width: isStar ? '14px' : `${Math.random() * 8 + 6}px`,
                    height: isStar ? '14px' : `${Math.random() * 8 + 6}px`,
                    backgroundColor: isStar ? 'white' : colors[i % colors.length],
                    clipPath: isStar ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 'none',
                    '--r-end': `${Math.random() * 720 - 360}deg`,
                    animationDuration: `${Math.random() * 2 + 3}s`,
                    animationDelay: `${Math.random() * 3}s`,
                } as React.CSSProperties;
                return <div key={i} className="victory-confetti" style={style} />;
            })}
        </div>
    );
};

const ChefVictory: React.FC = () => {
    const utensils = ['🔪', '🍳', '🌶️', '🥩', '🔥'];
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => {
                const style = {
                    left: `${Math.random() * 100}%`,
                    '--r-start': `${Math.random() * 360}deg`,
                    '--r-end': `${Math.random() * 360 + 360}deg`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    animationDelay: `${Math.random() * 3}s`,
                } as React.CSSProperties;
                return <div key={i} className="victory-utensil" style={style}>{utensils[i % utensils.length]}</div>;
            })}
        </div>
    );
};

const BillionaireVictory: React.FC = () => {
    const items = ['🚀', '🐶', '💎', '📈'];
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => {
                const startX = Math.random() * 100;
                const endX = startX + (Math.random() - 0.5) * 50;
                const style = {
                    '--x-start': `${startX}vw`,
                    '--x-end': `${endX}vw`,
                    animationDuration: `${Math.random() * 2 + 1.5}s`,
                    animationDelay: `${Math.random() * 2}s`,
                } as React.CSSProperties;
                return <div key={i} className="victory-rocket" style={style}>{items[i % items.length]}</div>;
            })}
        </div>
    );
};


const Face: React.FC<{ showSlapMark: boolean; slapCount: number; character: Character; knockoutThreshold: number; victoryThreshold: number; slapAngle: SlapAngle; idleAnimation: string | null; isTaunting: boolean; isGameOverByGun: boolean; degradationPath: number; }> = ({ showSlapMark, slapCount, character, knockoutThreshold, victoryThreshold, slapAngle, idleAnimation, isTaunting, isGameOverByGun, degradationPath }) => {
    let eyes: React.ReactElement;
    let mouth: React.ReactElement;
    let extras: React.ReactElement | null = null;

    const headFillColor = character === 'musician' ? '#A1662F' : character === 'chef' ? '#FECACA' : '#FEE2B8';
    const headStrokeColor = character === 'musician' ? '#805022' : character === 'chef' ? '#F87171' : '#E6C69C';

    const blush = (
        <g className={`transition-opacity duration-300 ease-out ${showSlapMark ? 'opacity-60' : 'opacity-0'}`}>
            <ellipse cx="25" cy="58" rx="12" ry="6" fill="#FF2400" />
            <ellipse cx="75" cy="58" rx="12" ry="6" fill="#FF2400" />
        </g>
    );
    
    if (isGameOverByGun) {
        eyes = (
            <g>
                <path d="M 30 38 L 45 35" stroke="black" strokeWidth="3" />
                <path d="M 70 38 L 55 35" stroke="black" strokeWidth="3" />
            </g>
        );
        mouth = <path d="M 40 65 L 60 65" stroke="black" strokeWidth="3" fill="none" />;
    } else if (slapCount > victoryThreshold) {
        eyes = (
            <g>
                <path d="M 30 35 Q 35 45 40 35" stroke="black" strokeWidth="2.5" fill="none" />
                <path d="M 60 35 Q 65 45 70 35" stroke="black" strokeWidth="2.5" fill="none" />
            </g>
        );
        mouth = <path d="M 35 60 Q 50 75 65 60" stroke="black" strokeWidth="3" fill="none" />;
    } else if (slapCount > knockoutThreshold) { // Knocked Out
        eyes = (
            <>
                <path d="M 30 35 L 40 45 M 40 35 L 30 45" stroke="black" strokeWidth="3" strokeLinecap="round" />
                <path d="M 60 35 L 70 45 M 70 35 L 60 45" stroke="black" strokeWidth="3" strokeLinecap="round" />
            </>
        );
        const tonguePath = showSlapMark
            ? "M 40 65 C 45 78, 55 78, 60 65 Q 55 83 45 83 Z"
            : "M 40 65 C 45 75, 55 75, 60 65 Q 55 80 45 80 Z";
        mouth = <path d={tonguePath} fill="#FF69B4" stroke="black" strokeWidth="2" style={{ transition: 'd 0.1s ease-out' }}/>;
        extras = (
            <>
                <path transform="translate(20, 15) scale(0.1)" d="M50 0 L61.8 38.2 L100 38.2 L69.1 61.8 L80.9 100 L50 76.4 L19.1 100 L30.9 61.8 L0 38.2 L38.2 38.2 Z" fill="#FFD700" stroke="black" strokeWidth="10"/>
                <path transform="translate(30, 8) scale(0.07)" d="M50 0 L61.8 38.2 L100 38.2 L69.1 61.8 L80.9 100 L50 76.4 L19.1 100 L30.9 61.8 L0 38.2 L38.2 38.2 Z" fill="#FFD700" stroke="black" strokeWidth="10"/>
            </>
        );
    } else if (slapCount <= 10) {
        // Early slap reactions (0-10) are the same for all paths
        if (slapCount === 0) {
            const eyeRadius = showSlapMark ? 6 : 5;
            eyes = (
                <g style={{ transition: 'all 0.1s ease-in' }} className="blinking">
                    <circle cx="35" cy="40" r={eyeRadius} fill="white" stroke="black" strokeWidth="0.5"/>
                    <circle cx="35" cy="40" r="2" fill="black" />
                    <circle cx="65" cy="40" r={eyeRadius} fill="white" stroke="black" strokeWidth="0.5"/>
                    <circle cx="65" cy="40" r="2" fill="black" />
                </g>
            );
            mouth = <path d="M 40 65 Q 50 70 60 65" stroke="black" strokeWidth="2" fill="transparent" />;
        } else if (slapCount === 1) {
            eyes = (
                <>
                    <circle cx="35" cy="40" r="5" fill="white" stroke="black" strokeWidth="0.5"/>
                    <circle cx="35" cy="40" r="2" fill="black" />
                    <path d="M 60 40 Q 65 38 70 40" stroke="black" strokeWidth="2" fill="transparent" className={showSlapMark ? 'eye-twitch' : ''} />
                </>
            );
            mouth = <path d="M 40 65 Q 50 70 60 65" stroke="black" strokeWidth="2" fill="transparent" />;
        } else if (slapCount <= 2) {
            const wincePath = showSlapMark ? "M 30 40 Q 35 35 40 40" : "M 30 40 Q 35 38 40 40";
            const wincePath2 = showSlapMark ? "M 60 40 Q 65 35 70 40" : "M 60 40 Q 65 38 70 40";
            eyes = (
                 <g style={{ transition: 'd 0.1s ease-in' }}>
                    <path d={wincePath} stroke="black" strokeWidth="2" fill="transparent" />
                    <path d={wincePath2} stroke="black" strokeWidth="2" fill="transparent" />
                </g>
            );
            mouth = <path d="M 40 70 Q 50 65 60 70" stroke="black" strokeWidth="2" fill="transparent" />;
        } else if (slapCount <= 5) {
            const eyebrowY1 = showSlapMark ? 34 : 32;
            const eyebrowY2 = showSlapMark ? 37 : 35;
            eyes = (
                <>
                    <circle cx="35" cy="40" r="6" fill="white" stroke="black" strokeWidth="0.5"/>
                    <circle cx="35" cy="40" r="2.5" fill="black" />
                    <circle cx="65" cy="40" r="6" fill="white" stroke="black" strokeWidth="0.5"/>
                    <circle cx="65" cy="40" r="2.5" fill="black" />
                </>
            );
            mouth = <path d="M 40 70 Q 50 65 60 70" stroke="black" strokeWidth="2" fill="transparent" />;
            extras = (
                <g style={{ transition: 'all 0.1s ease-in' }}>
                    <path d={`M 30 ${eyebrowY1} L 40 ${eyebrowY2}`} stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                    <path d={`M 70 ${eyebrowY1} L 60 ${eyebrowY2}`} stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                </g>
            );
        } else { // 6 to 10
            const eyebrowY1 = showSlapMark ? 34 : 32;
            const eyebrowY2 = showSlapMark ? 37 : 35;
            const wincePath = showSlapMark ? "M 62 42 Q 65 37 68 42" : "M 62 42 Q 65 38 68 42";
            eyes = (
                <g style={{ transition: 'd 0.1s ease-in' }}>
                    <circle cx="35" cy="40" r="6" fill="white" stroke="black" strokeWidth="0.5"/>
                    <circle cx="35" cy="40" r="2.5" fill="black" />
                    <path d={wincePath} stroke="black" strokeWidth="2" fill="transparent" />
                </g>
            );
            mouth = showSlapMark
                ? <ellipse cx="50" cy="70" rx="10" ry="6" stroke="black" strokeWidth="2" fill="transparent" />
                : <path d="M 40 70 Q 50 60 60 70" stroke="black" strokeWidth="2" fill="transparent" />;
            extras = (
                <g style={{ transition: 'all 0.1s ease-in' }}>
                    <path d={`M 30 ${eyebrowY1} L 40 ${eyebrowY2}`} stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                    <path d={`M 70 ${eyebrowY1} L 60 ${eyebrowY2}`} stroke="black" strokeWidth="2.5" strokeLinecap="round" />
                </g>
            );
        }
    } else { // slapCount > 10 and not KO'd - This is where the paths diverge
        const bruiseProgress = (slapCount - 10) / (knockoutThreshold - 10);
        
        switch(degradationPath) {
            case 1: { // Path 1: Right eye bruise, swollen lip, cheek cut
                const bruiseRx = 4 + (6 * bruiseProgress);
                const bruiseRy = 3 + (5 * bruiseProgress);
                const bruiseOpacity = showSlapMark ? 0.95 : 0.65 + (0.2 * bruiseProgress);
                const otherEyeRy = 5 - (3 * bruiseProgress);

                eyes = (
                    <>
                        <ellipse cx="35" cy="40" rx="5" ry={otherEyeRy} fill="white" stroke="black" strokeWidth="0.5" style={{ transition: 'ry 0.2s ease-in' }} />
                        <circle cx="35" cy="40" r="2" fill="black" />
                        <ellipse cx="65" cy="40" rx={bruiseRx} ry={bruiseRy} fill="#4B0082" opacity={bruiseOpacity} style={{ transition: 'all 0.2s ease-in' }}/>
                        <circle cx="65" cy="40" r="4" fill="white" stroke="black" strokeWidth="0.5"/>
                        <circle cx="65" cy="40" r="1.5" fill="black" />
                    </>
                );
                mouth = <path d="M 40 68 Q 45 60 52 70 T 62 65" stroke="black" strokeWidth="2.5" fill="none" />;
                extras = showSlapMark ? <path d="M 25 58 l 5 5" stroke="#A00" strokeWidth="1.5" /> : null;
                break;
            }
            case 2: { // Path 2: Both eyes bruised, nosebleed
                const bruiseRx = 3 + (4 * bruiseProgress);
                const bruiseRy = 2 + (3 * bruiseProgress);
                const bruiseOpacity = showSlapMark ? 0.90 : 0.60 + (0.2 * bruiseProgress);

                eyes = (
                    <>
                        <ellipse cx="35" cy="40" rx={bruiseRx} ry={bruiseRy} fill="#5d3a9b" opacity={bruiseOpacity} style={{ transition: 'all 0.2s ease-in' }}/>
                        <circle cx="35" cy="40" r="3" fill="white" stroke="black" strokeWidth="0.5"/>
                        <circle cx="35" cy="40" r="1" fill="black" />
                        <ellipse cx="65" cy="40" rx={bruiseRx} ry={bruiseRy} fill="#5d3a9b" opacity={bruiseOpacity} style={{ transition: 'all 0.2s ease-in' }}/>
                        <circle cx="65" cy="40" r="3" fill="white" stroke="black" strokeWidth="0.5"/>
                        <circle cx="65" cy="40" r="1" fill="black" />
                    </>
                );
                mouth = <path d="M 40 70 L 48 65 L 52 65 L 60 70" stroke="black" strokeWidth="2" fill="none" />;
                extras = (
                    <g className={`transition-opacity duration-300 ${showSlapMark ? 'opacity-100' : 'opacity-0'}`}>
                        <path d="M 50 58 C 52 63, 48 68, 50 72" stroke="#A00" strokeWidth="2" fill="#A00" />
                    </g>
                );
                break;
            }
            case 0:
            default: { // Path 0: Original left eye bruise
                const bruiseRx = 4 + (6 * bruiseProgress);
                const bruiseRy = 3 + (5 * bruiseProgress);
                const bruiseOpacity = showSlapMark ? 0.95 : 0.65 + (0.2 * bruiseProgress);
                const otherEyeRy = 5 - (3 * bruiseProgress);
                eyes = (
                    <>
                        <ellipse cx="35" cy="40" rx={bruiseRx} ry={bruiseRy} fill="#4B0082" opacity={bruiseOpacity} style={{ transition: 'all 0.2s ease-in' }}/>
                        <circle cx="35" cy="40" r="4" fill="white" stroke="black" strokeWidth="0.5"/>
                        <circle cx="35" cy="40" r="1.5" fill="black" />
                        <ellipse cx="65" cy="40" rx="5" ry={otherEyeRy} fill="white" stroke="black" strokeWidth="0.5" style={{ transition: 'ry 0.2s ease-in' }} />
                        <circle cx="65" cy="40" r="2" fill="black" />
                    </>
                );
                mouth = <path d="M 40 68 Q 45 63 50 68 T 60 68" stroke="black" strokeWidth="2" fill="transparent" />;
                break;
            }
        }
    }


    const gearProps = { slapCount, showSlapMark, knockoutThreshold, victoryThreshold, slapAngle };

    let tauntClass = '';
    if (isTaunting) {
      switch (character) {
        case 'nerd': tauntClass = 'taunt-nerd'; break;
        case 'musician': tauntClass = 'taunt-musician'; break;
        case 'wizard': tauntClass = 'taunt-wizard'; break;
        case 'biden': tauntClass = 'taunt-biden'; break;
        case 'chef': tauntClass = 'taunt-chef'; break;
        case 'billionaire': tauntClass = 'taunt-billionaire'; break;
        default: tauntClass = 'taunt-default'; break;
      }
    }

    const isIdlePeriod = !!idleAnimation && !isTaunting && slapCount > 0 && slapCount <= knockoutThreshold && !isGameOverByGun;
    const idleClass = isIdlePeriod ? idleAnimation : '';

    return (
        <div className="relative w-64 h-64 md:w-80 md:h-80">
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <g className={`${!isGameOverByGun && slapCount === 0 ? 'nodding' : ''} ${tauntClass} ${idleClass}`}>
                    <circle cx="50" cy="50" r="45" fill={headFillColor} stroke={headStrokeColor} strokeWidth="2" className={isGameOverByGun ? '' : 'breathing'}/>
                    {!isGameOverByGun && blush}
                    {character === 'wizard' && <WizardGear {...gearProps} />}
                    {character === 'chef' && <ChefGear {...gearProps} />}
                    {eyes}
                    {mouth}
                    {!isGameOverByGun && extras}
                    {character === 'nerd' && <NerdGlasses {...gearProps} />}
                    {character === 'musician' && <MusicianGear {...gearProps} />}
                    {character === 'biden' && <BidenGear {...gearProps} />}
                    {character === 'billionaire' && <BillionaireGear {...gearProps} />}
                </g>
            </svg>
        </div>
    );
};

const Hand: React.FC<{ isSlapping: boolean, slapCount: number, victoryThreshold: number, slapAngle: SlapAngle }> = ({ isSlapping, slapCount, victoryThreshold, slapAngle }) => {
  if (slapCount > victoryThreshold) return null;

  const transitionClasses = isSlapping
    ? 'transition-transform duration-100 ease-out'
    : 'hand-return-transition';

  const basePosition = 'absolute -bottom-10 w-48 h-48 md:w-64 md:h-64';
  
  const fromLeftClasses = 'right-full ' + (isSlapping
    ? 'translate-x-[150%] -translate-y-1/2 rotate-[15deg]'
    : '-translate-x-1/2 translate-y-full -rotate-[60deg]');
  
  const fromRightClasses = 'left-full ' + (isSlapping
    ? '-translate-x-[150%] -translate-y-1/2 -rotate-[15deg]'
    : 'translate-x-1/2 translate-y-full rotate-[60deg]');

  const dynamicClasses = slapAngle === 'from-left' ? fromLeftClasses : fromRightClasses;
  const svgTransform = slapAngle === 'from-left' ? '-scale-x-100' : 'scale-x-100';

  return (
    <div className={`${basePosition} ${transitionClasses} ${dynamicClasses}`}>
        <svg viewBox="0 0 200 200" className={`w-full h-full transform ${svgTransform}`}>
             <path fill="#FEE2B8" stroke="#E6C69C" strokeWidth="3" d="M136.3,94.9c-2.4-12.8-10-23.7-21.4-29.8c-1-0.5-2.1-1-3.2-1.4V29.1c0-2.3-1.9-4.2-4.2-4.2s-4.2,1.9-4.2,4.2v32.2c-1.3-0.3-2.6-0.5-3.9-0.5c-6.1,0-12,2-16.9,5.6c-0.8,0.6-1.6,1.2-2.3,1.9c-3.1-4.1-7.5-7.2-12.5-8.8V29.1c0-2.3-1.9-4.2-4.2-4.2s-4.2,1.9-4.2,4.2v35.3c-7.3,0.2-14.3,3.3-19.3,8.7c-4.4,4.8-6.9,11-6.9,17.6c0,16.5,13.4,29.8,29.8,29.8h46.8c10.3,0,19.2-5.3,24.1-13.4C136.5,103.7,137.3,99.2,136.3,94.9z"/>
        </svg>
    </div>
  );
};

const getSlapMarkColor = (count: number, koThreshold: number): string => {
  if (count <= 5) return '#EF4444'; // red-500
  if (count <= 10) return '#DC2626'; // red-600
  if (count <= koThreshold * 0.85) return '#B91C1C'; // red-700
  if (count <= koThreshold) return '#991B1B'; // red-800
  return '#7F1D1D'; // red-900 (deep bruised)
};

const Gun: React.FC = () => (
    <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-[60%] translate-y-[10%] pointer-events-none gun-animation">
      <svg viewBox="0 0 100 100" className="w-full h-full transform -scale-x-100">
        <g fill="#4A5568" stroke="#2D3748" strokeWidth="2">
          {/* Grip */}
          <path d="M 60 50 L 60 75 Q 60 85 70 85 L 75 85 Q 85 85 85 75 L 85 60 Z" />
          <rect x="62" y="52" width="21" height="3" fill="#2D3748" />
          <rect x="62" y="62" width="21" height="3" fill="#2D3748" />
          <rect x="62" y="72" width="21" height="3" fill="#2D3748" />
          
          {/* Body */}
          <path d="M 20 35 L 80 35 L 80 50 L 60 50 L 60 50 Z" />
          
          {/* Barrel */}
          <rect x="5" y="30" width="15" height="10" />

          {/* Trigger guard */}
          <path d="M 50 50 Q 50 60 60 60 L 70 60 Q 80 60 80 50" fill="none" />
          {/* Trigger */}
          <path d="M 65 50 L 65 55 L 68 55 Z" />
        </g>
      </svg>
    </div>
);


const SlapZone: React.FC<SlapZoneProps> = ({ isSlapping, showSlapMark, slapCount, onSlap, character, reactionText, knockoutThreshold, slapAngle, idleAnimation, isTaunting, isGameOverByGun, mumbleText, degradationPath }) => {
  const victoryThreshold = knockoutThreshold + 5;

  const effectPositionClasses = slapAngle === 'from-left'
      ? '-translate-x-[20%] -translate-y-[10%]' // Right cheek
      : '-translate-x-[80%] -translate-y-[10%]'; // Left cheek
  const slapMarkFlipClass = slapAngle === 'from-right' ? '-scale-x-100' : '';
  const slapMarkColor = getSlapMarkColor(slapCount, knockoutThreshold);

  return (
    <div 
      className="relative flex items-center justify-center w-[400px] h-[400px] md:w-[500px] md:h-[500px] cursor-pointer"
      onClick={!isGameOverByGun ? onSlap : undefined}
      role="button"
      aria-label="Slap the face"
    >
      {!isGameOverByGun && slapCount > victoryThreshold && character === 'default' && <ConfettiVictory />}
      {!isGameOverByGun && slapCount > victoryThreshold && character === 'nerd' && <NerdVictory />}
      {!isGameOverByGun && slapCount > victoryThreshold && character === 'musician' && <MusicianVictory />}
      {!isGameOverByGun && slapCount > victoryThreshold && character === 'wizard' && <WizardVictory />}
      {!isGameOverByGun && slapCount > victoryThreshold && character === 'biden' && <BidenVictory />}
      {!isGameOverByGun && slapCount > victoryThreshold && character === 'chef' && <ChefVictory />}
      {!isGameOverByGun && slapCount > victoryThreshold && character === 'billionaire' && <BillionaireVictory />}
      
      <SpeechBubble text={reactionText} />
      <MumbleBubble text={mumbleText} />
      <div className={`transition-transform duration-100 ${!isGameOverByGun && showSlapMark && slapCount <= victoryThreshold ? 'shake' : ''}`}>
        <Face showSlapMark={showSlapMark} slapCount={slapCount} character={character} knockoutThreshold={knockoutThreshold} victoryThreshold={victoryThreshold} slapAngle={slapAngle} idleAnimation={idleAnimation} isTaunting={isTaunting} isGameOverByGun={isGameOverByGun} degradationPath={degradationPath} />
      </div>
       {/* Slap Mark */}
       {!isGameOverByGun && <div className={`absolute top-1/2 left-1/2 w-20 h-20 transition-opacity duration-300 ${effectPositionClasses} ${showSlapMark && slapCount <= victoryThreshold ? 'opacity-80' : 'opacity-0'}`}>
           <svg viewBox="0 0 100 100" className={`w-full h-full ${slapMarkFlipClass}`} style={{ transition: 'fill 0.2s ease-in-out' }} fill={slapMarkColor}>
               <path d="M50 0 L61.8 38.2 L100 38.2 L69.1 61.8 L80.9 100 L50 76.4 L19.1 100 L30.9 61.8 L0 38.2 L38.2 38.2 Z" />
           </svg>
       </div>}
      {!isGameOverByGun && showSlapMark && slapCount <= victoryThreshold && <Particles slapAngle={slapAngle} />}
      {!isGameOverByGun && <Hand isSlapping={isSlapping} slapCount={slapCount} victoryThreshold={victoryThreshold} slapAngle={slapAngle} />}
      {isGameOverByGun && <Gun />}
    </div>
  );
};

export default SlapZone;