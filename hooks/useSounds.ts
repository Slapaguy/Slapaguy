import { useCallback, useRef, useEffect } from 'react';

// Use the Vite base URL
const base = import.meta.env.BASE_URL;

// Helper to create an audio element with the right path and volume
const createAudio = (src: string, volume: number): HTMLAudioElement => {
  const audio = new Audio(src);
  audio.volume = volume;
  return audio;
};

// Preload audio files with specified volumes and correct base path
const slapSound = createAudio(`${base}sounds/slap.mp3`, 0.7);
const reactionSounds = [
  createAudio(`${base}sounds/reaction1.mp3`, 0.5),
  createAudio(`${base}sounds/reaction2.mp3`, 0.5),
  createAudio(`${base}sounds/reaction3.mp3`, 0.5),
  createAudio(`${base}sounds/reaction4.mp3`, 0.5),
];
const knockoutSound = createAudio(`${base}sounds/knockout.mp3`, 0.8);
const victorySound = createAudio(`${base}sounds/victory.mp3`, 0.6);
const loseSound = createAudio(`${base}sounds/lose.mp3`, 0.7);

const allSounds = [slapSound, ...reactionSounds, knockoutSound, victorySound, loseSound];

export const useSounds = () => {
    const soundsLoaded = useRef(false);

    useEffect(() => {
        if (!soundsLoaded.current) {
            allSounds.forEach(sound => {
                sound.load(); // Encourages browser to load audio
            });
            soundsLoaded.current = true;
        }
    }, []);

    const playSound = useCallback((audio: HTMLAudioElement) => {
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.error(`Error playing sound: ${audio.src}`, error);
        });
    }, []);

    const playSlap = useCallback(() => {
        playSound(slapSound);
    }, [playSound]);

    const playReaction = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * reactionSounds.length);
        playSound(reactionSounds[randomIndex]);
    }, [playSound]);
    
    const playKnockout = useCallback(() => {
        playSound(knockoutSound);
    }, [playSound]);

    const playVictory = useCallback(() => {
        playSound(victorySound);
    }, [playSound]);
    
    const playLose = useCallback(() => {
        playSound(loseSound);
    }, [playSound]);

    return { playSlap, playReaction, playKnockout, playVictory, playLose };
};
