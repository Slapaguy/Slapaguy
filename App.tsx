import React, { useState, useCallback, useRef, useEffect } from 'react';
import Header from './components/Header';
import SlapZone from './components/SlapZone';
import SlapButton from './components/SlapButton';
import SlapCounter from './components/SlapCounter';
import ResetButton from './components/ResetButton';
import Tooltip from './components/Tooltip';
import CharacterSelector, { Character } from './components/CharacterSelector';
import DynamicBackground from './components/DynamicBackground';
import { useSounds } from './hooks/useSounds';
import GameOverOverlay from './components/GameOverOverlay';

interface ReactionTier {
  threshold: number;
  messages: string[];
}

interface CharacterReactions {
  tiers: ReactionTier[];
  knockout: string[];
  postKnockout: string[];
}


const reactions: Record<Character, CharacterReactions> = {
  default: {
    tiers: [
      { threshold: 1, messages: ["Oof!", "Hey!", "What was that for?!", "My face!", "Easy there!", "Whoa!", "Rude!"] },
      { threshold: 5, messages: ["Cut it out!", "Seriously?", "My cheek is tingling.", "Stop that!", "Getting old, pal.", "My teeth rattled.", "Find a new hobby!"] },
      { threshold: 10, messages: ["Okay, that's enough!", "I'm warning you!", "My jaw...", "Please, stop!", "I'm about to lose it!", "You're crossing a line!", "My ear is ringing!"] },
    ],
    knockout: ["Lights out...", "Down for the count!", "I'm finished..."],
    postKnockout: ["Uncle... uncle!", "I'm seeing stars...", "Is it over yet?"],
  },
  nerd: {
    tiers: [
      { threshold: 1, messages: ["Ackchyually...", "Uncalled for!", "My calculations!", "That's illogical!", "A kinetic force transfer!", "Fascinating.", "My hypothesis is... pain."] },
      { threshold: 5, messages: ["You wouldn't hit a guy with glasses!", "A logical fallacy!", "That computes... as painful.", "My protractor!", "The integrity of my spectacles is compromised!", "Cease this brute-force attack!", "This isn't a peer-reviewed activity!"] },
      { threshold: 10, messages: ["My glasses!", "I'm telling the principal!", "The variables are... pain!", "This is not optimal!", "I'm reaching my tensile limit!", "You're corrupting my data!", "This is highly illogical, Captain!"] },
    ],
    knockout: ["FATAL ERROR.", "System offline.", "Blue screen of... face."],
    postKnockout: ["Critical failure...", "Rebooting required...", "Does not compute..."],
  },
  musician: {
    tiers: [
      { threshold: 1, messages: ["Whoa, killin' my vibe.", "Not cool.", "Hey! The headphones!", "That's not my tempo.", "Not groovy.", "You're harshing my mellow.", "Bad vibes, man."] },
      { threshold: 5, messages: ["You're scratching my vinyl!", "That's off-beat.", "This is a bad mix!", "You're off-key!", "My sunglasses! Watch it!", "This rhythm is all wrong.", "Hey, the artist is sensitive!"] },
      { threshold: 10, messages: ["Droppin' the bass... on my face?!", "This is not my jam.", "My ears are ringing!", "This ain't a mosh pit!", "My perfect pitch is off!", "This is a solo act!", "The feedback is killing me!"] },
    ],
    knockout: ["*Record scratch*", "And... fade to black.", "The final countdown."],
    postKnockout: ["The sound of silence...", "Encore's cancelled.", "My final mix..."],
  },
  wizard: {
    tiers: [
      { threshold: 1, messages: ["By my beard!", "Unhand me, mortal!", "A curse upon you!", "Such insolence!", "A feeble strike!", "You dare touch a sorcerer?!", "The spirits are displeased."] },
      { threshold: 5, messages: ["You shall not pass... that slap!", "My hat!", "You've broken my concentration!", "My incantation!", "I shall turn you into a newt!", "My focus is wavering!", "You interrupt my mana flow!"] },
      { threshold: 10, messages: ["I'm brewing a potion for you...", "Feel my wrath!", "You meddle with powerful forces!", "My orb is cracked!", "My staff will hear of this!", "I'm preparing a counter-spell!", "This violates the ancient laws!"] },
    ],
    knockout: ["I've been... vanquished!", "Back to the ethereal plane!", "My spirit has left my body..."],
    postKnockout: ["My mana is depleted.", "Fizzled out.", "A curse... on my- zzz..."],
  },
  biden: {
    tiers: [
      { threshold: 1, messages: ["C'mon, man!", "No malarkey!", "That's a bunch of stuff.", "Hey, easy does it, pal.", "Not a joke, son.", "Listen here.", "That's not cricket."] },
      { threshold: 5, messages: ["Look, fat...", "Here's the deal.", "I'm being serious here.", "You're a real dog-faced pony soldier.", "For real.", "I'm not being hyperbolic.", "You're testing my patience, kid."] },
      { threshold: 10, messages: ["Will you shut up, man?", "This is getting old, Jack.", "I'm not kidding around.", "My word as a Biden... that smarts.", "This is a big deal.", "We've gotta be better than this.", "I'm being straight with you."] },
    ],
    knockout: ["I'm... down for the count, folks.", "End of quote.", "Time for some ice cream..."],
    postKnockout: ["Zzz... malarkey...", "Where am I?", "Did I win?"],
  },
  chef: {
    tiers: [
      { threshold: 1, messages: ["What are you?!", "You donkey!", "It's RAAAW!", "Pathetic!", "Wake up!", "Delicate! BE DELICATE!", "Absolutely shocking!"] },
      { threshold: 5, messages: ["Where's the passion?!", "My gran could do better!", "You call that a slap?!", "An idiot sandwich!", "Zero finesse!", "You cook like you slap!", "My palate is ruined!"] },
      { threshold: 10, messages: ["Look at me! LOOK AT ME!", "Service is over!", "This is a disaster!", "Get OUT!", "Unbelievable!", "Pack your knives and go!", "It's a horror show!"] },
    ],
    knockout: ["Shut it down!", "Done.", "Finally, some peace and quiet."],
    postKnockout: ["The slap... it's burnt.", "I need a lamb sauce...", "Zzz... unacceptable..."],
  },
  billionaire: {
    tiers: [
      { threshold: 1, messages: ["Interesting.", "Concerning.", "Woke mind virus detected.", "420% cringe.", "Data point logged.", "Sub-optimal.", "An inefficient use of force."] },
      { threshold: 5, messages: ["Not great, not terrible.", "This is not optimal.", "Are we in a simulation?", "Let that sink in.", "This could affect the stock price.", "My algorithm did not predict this.", "A stress test, I presume?"] },
      { threshold: 10, messages: ["To the moon... with my face?", "Activating self-preservation mode.", "My neuralink is fritzing!", "X is down!", "My mission is compromised.", "Launch sequence interrupted.", "This is a waste of bandwidth."] },
    ],
    knockout: ["Funding secured... for a new face.", "I'm selling.", "System crash."],
    postKnockout: ["Zzz... Dogecoin...", "Mars... needs... slaps...", "Resume the simulation..."],
  },
};

const taunts: Record<Character, string[]> = {
  default: ["Is that all you've got?", "My grandma slaps harder.", "Waiting...?", "C'mon!"],
  nerd: ["Your technique is... suboptimal.", "Awaiting input.", "The probability of you landing an effective slap is decreasing.", "My calculations predicted more... vigor."],
  musician: ["Lost the rhythm?", "Don't be shy, drop the beat.", "This is just the sound check, right?", "Waiting for the drop..."],
  wizard: ["Are you pondering your weak attack?", "My mystical barrier holds strong!", "I sense hesitation, mortal.", "Don't make me use a real spell."],
  biden: ["Let me be clear...", "I'm not messing around.", "Think you've got what it takes, Jack?", "This ain't no joke."],
  chef: ["What are you waiting for?!", "An idiot sandwich is what you are!", "Still waiting!", "I'm losing the will to live!"],
  billionaire: ["Engage.", "Looking into this.", "The physics engine is lagging.", "Next tweet..."]
};

const postKnockoutTaunts: Record<Character, string[]> = {
  default: ["Ugh, just finish it already.", "Are you admiring your work?", "My head... still spinning."],
  nerd: ["System... still... offline... please wait.", "Does not compute... user idle while target is incapacitated.", "My face is running at 1 FPS."],
  musician: ["The show's over, man.", "Just... silence.", "Is this the B-side?"],
  wizard: ["My spirit... lingers...", "Even in defeat, I am... mystical.", "You're just watching me... strange mortal."],
  biden: ["Look... I'm resting my eyes.", "Four more years... of this headache.", "Come on, man. Finish the job."],
  chef: ["The service is over. Go home.", "Letting the slap rest... it's still raw.", "Still here? Pathetic."],
  billionaire: ["Rebooting consciousness... please stand by.", "My stock is down... and so am I.", "Are you... screen-shotting this?"]
};

const mumbles: Record<Character, string[]> = {
    default: ["Hmm...", "*sigh*", "What was I saying?", "Did I leave the oven on?"],
    nerd: ["*adjusts glasses*", "Fascinating.", "Theorical physics...", "A quantum conundrum..."],
    musician: ["*hums a tune*", "One, two, three, four...", "Needs more cowbell.", "Groovy..."],
    wizard: ["*muttering incantation*", "Eye of newt...", "Where's that scroll?", "The stars are aligned..."],
    biden: ["Thing is...", "God love ya.", "Number one...", "For real."],
    chef: ["Needs more salt.", "Perfectly cooked.", "Delicious.", "*sniffs air*"],
    billionaire: ["Execute.", "Concerning.", "The data suggests...", "Engage." ]
};

const idleAnimations: Record<Character, string[]> = {
  default: ['idle-sway'],
  nerd: ['idle-sway', 'idle-adjust-glasses'],
  musician: ['idle-head-bob'],
  wizard: ['idle-mystic-float'],
  biden: ['idle-slow-nod'],
  chef: ['idle-sniff', 'idle-sway'],
  billionaire: ['idle-scan']
};

const getReaction = (character: Character, count: number, koThreshold: number): string => {
  const charReactions = reactions[character] || reactions.default;

  // 1. Check for post-knockout state
  if (count > koThreshold) {
    const messages = charReactions.postKnockout;
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // 2. Check for the exact knockout slap
  if (count === koThreshold) {
    const messages = charReactions.knockout;
    return messages[Math.floor(Math.random() * messages.length)];
  }

  // 3. Check for tiered reactions before knockout
  let appropriateMessages: string[] = [];
  // Find the highest threshold met by the slap count
  for (const tier of charReactions.tiers) {
    if (count >= tier.threshold) {
      appropriateMessages = tier.messages;
    }
  }

  if (appropriateMessages.length === 0) return '';

  // Return a random message from the selected tier
  return appropriateMessages[Math.floor(Math.random() * appropriateMessages.length)];
};


const generateKnockoutThreshold = () => Math.floor(Math.random() * 6) + 18; // Random number between 18 and 23
type SlapAngle = 'from-left' | 'from-right';

const App: React.FC = () => {
  const [isSlapping, setIsSlapping] = useState<boolean>(false);
  const [character, setCharacter] = useState<Character>('default');
  const [slapCount, setSlapCount] = useState<number>(0);
  const [knockoutThreshold, setKnockoutThreshold] = useState<number>(0);
  const [showSlapMark, setShowSlapMark] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [reactionText, setReactionText] = useState<string>('');
  const [mumbleText, setMumbleText] = useState<string>('');
  const [slapAngle, setSlapAngle] = useState<SlapAngle>('from-left');
  const [showScreenFlash, setShowScreenFlash] = useState<boolean>(false);
  const [idleAnimation, setIdleAnimation] = useState<string | null>(null);
  const [isTaunting, setIsTaunting] = useState<boolean>(false);
  const [isGameOverByGun, setIsGameOverByGun] = useState<boolean>(false);
  const [degradationPath, setDegradationPath] = useState<number>(0);

  const { playSlap, playReaction, playKnockout, playVictory, playLose } = useSounds();

  const reactionTimeoutRef = useRef<number | null>(null);
  const idleTimeoutRef = useRef<number | null>(null);
  const tauntTimeoutRef = useRef<number | null>(null);
  const mumbleTimeoutRef = useRef<number | null>(null);


  // Check for tooltip on component mount
  useEffect(() => {
    // Set the initial random knockout threshold and degradation path
    setKnockoutThreshold(generateKnockoutThreshold());
    setDegradationPath(Math.floor(Math.random() * 3)); // 0, 1, or 2

    // Check if the user has seen the tooltip before
    const hasSeenTooltip = localStorage.getItem('hasSeenSlapTooltip');
    if (!hasSeenTooltip) {
      setShowTooltip(true);
    }

  }, []);

  const triggerIdleAnimation = useCallback(() => {
    const availableAnims = idleAnimations[character] || idleAnimations.default;
    const anim = availableAnims[Math.floor(Math.random() * availableAnims.length)];
    setIdleAnimation(anim);
  }, [character]);
  
  const triggerTaunt = useCallback(() => {
      const victoryThreshold = knockoutThreshold + 5;
      // Don't taunt if slapping, victory is achieved, or game is over
      if (isSlapping || slapCount > victoryThreshold || isGameOverByGun) return;

      let messages: string[];

      // Check for post-knockout taunts (character is KO'd but victory not yet achieved)
      if (slapCount > knockoutThreshold) {
          messages = postKnockoutTaunts[character] || postKnockoutTaunts.default;
      } else { // Otherwise, use regular pre-KO taunts
          messages = taunts[character] || taunts.default;
      }

      if (!messages || messages.length === 0) return;

      const message = messages[Math.floor(Math.random() * messages.length)];

      setIdleAnimation(null); // Stop idle animation when taunt begins
      setMumbleText(''); // Clear any mumbles
      if (mumbleTimeoutRef.current) clearTimeout(mumbleTimeoutRef.current);

      setReactionText(message);
      setIsTaunting(true);

      // Clear the taunt animation state after it plays
      setTimeout(() => {
          setIsTaunting(false);
      }, 500); // Matches animation duration

      // Use the main reaction timeout to clear the text
      if (reactionTimeoutRef.current) {
          clearTimeout(reactionTimeoutRef.current);
      }
      reactionTimeoutRef.current = window.setTimeout(() => {
          setReactionText('');
      }, 2500);
  }, [character, isSlapping, slapCount, knockoutThreshold, isGameOverByGun]);

  // Effect to manage the inactivity timer for idle and taunts
  useEffect(() => {
      // Always clear the previous timeouts when this effect re-runs
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (tauntTimeoutRef.current) clearTimeout(tauntTimeoutRef.current);
      
      const victoryThreshold = knockoutThreshold + 5;
      // Don't set a new timer if the character is victorious, or currently being slapped.
      if (isSlapping || slapCount > victoryThreshold || isGameOverByGun) {
          return;
      }

      // Set a new timer for 2.5 seconds to trigger subtle idle animations
      idleTimeoutRef.current = window.setTimeout(triggerIdleAnimation, 2500);

      // Set a new timer for 5 seconds of inactivity to trigger a taunt
      tauntTimeoutRef.current = window.setTimeout(triggerTaunt, 5000);

      // Cleanup function for when the component unmounts or dependencies change
      return () => {
          if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
          if (tauntTimeoutRef.current) clearTimeout(tauntTimeoutRef.current);
      };
  }, [slapCount, character, knockoutThreshold, isSlapping, triggerTaunt, triggerIdleAnimation, isGameOverByGun]);

  // Effect to manage idle mumbling
  useEffect(() => {
    if (mumbleTimeoutRef.current) clearTimeout(mumbleTimeoutRef.current);

    if (idleAnimation && !isTaunting && slapCount <= knockoutThreshold) {
        const showMumble = () => {
            const charMumbles = mumbles[character] || [];
            if (charMumbles.length > 0) {
                const message = charMumbles[Math.floor(Math.random() * charMumbles.length)];
                setMumbleText(message);

                // Mumble disappears after a short duration
                mumbleTimeoutRef.current = window.setTimeout(() => {
                    setMumbleText('');
                }, 3500); // Animation duration
            }
        };

        // Trigger a mumble at a random interval after becoming idle
        mumbleTimeoutRef.current = window.setTimeout(showMumble, 1000 + Math.random() * 2000);
    }
    
    return () => {
        if (mumbleTimeoutRef.current) clearTimeout(mumbleTimeoutRef.current);
    }
  }, [idleAnimation, isTaunting, character, slapCount, knockoutThreshold]);

  // Effect to manage the gunshot screen flash
  useEffect(() => {
    if (isGameOverByGun) {
      // Wait for the gun animation to play, then flash
      const flashTimeout = setTimeout(() => {
        setShowScreenFlash(true);
        // Hide the flash quickly to simulate a gunshot
        setTimeout(() => setShowScreenFlash(false), 150);
      }, 800); // 0.5s for gun animation, 0.3s pause

      return () => clearTimeout(flashTimeout);
    }
  }, [isGameOverByGun]);


  const handleSlap = useCallback(() => {
    if (isSlapping || isGameOverByGun) return;

    const newSlapCount = slapCount + 1;

    playSlap();

    // Interrupt any ongoing taunt or idle state
    setIdleAnimation(null);
    setIsTaunting(false);
    setMumbleText('');
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    if (tauntTimeoutRef.current) clearTimeout(tauntTimeoutRef.current);
    if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
    if (mumbleTimeoutRef.current) clearTimeout(mumbleTimeoutRef.current);


    // ~2% chance to lose after the 3rd slap
    if (newSlapCount > 3 && Math.random() < 0.02) {
      playLose();
      setIsGameOverByGun(true);
      setReactionText("You've slapped your last slap.");
      if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
      return;
    }

    // Schedule the reaction sound based on the result of this slap
    setTimeout(() => {
        const victoryThreshold = knockoutThreshold + 5;
        if (newSlapCount > victoryThreshold) {
            playVictory();
        } else if (newSlapCount === knockoutThreshold) {
            playKnockout();
        } else {
            playReaction();
        }
    }, 500); // 0.5 second delay

    // Determine slap angle for this slap
    const newAngle: SlapAngle = Math.random() < 0.5 ? 'from-left' : 'from-right';
    setSlapAngle(newAngle);

    setIsSlapping(true);
    
    setSlapCount(newSlapCount);
    
    // Show slap mark and play sounds slightly after the hand connects
    setTimeout(() => {
        setShowSlapMark(true);

        // Set the reaction text
        const message = getReaction(character, newSlapCount, knockoutThreshold);
        setReactionText(message);

        // Set a timeout to clear the reaction text
        reactionTimeoutRef.current = window.setTimeout(() => {
            setReactionText('');
        }, 2000);

        // Haptic feedback for supported devices
        if (window.navigator && window.navigator.vibrate) {
          let vibrationPattern: VibratePattern;

          // "Critical hit" every 10 slaps for extra satisfaction
          if (newSlapCount > 0 && newSlapCount % 10 === 0) {
              vibrationPattern = [50, 30, 50, 30, 150]; // Quick double-tap followed by a strong pulse
              // Trigger screen flash for critical hits
              setShowScreenFlash(true);
              setTimeout(() => setShowScreenFlash(false), 200);
          } else if (newSlapCount > knockoutThreshold) {
              vibrationPattern = [50, 50, 50, 50, 200]; // Knocked out rumble
          } else if (newSlapCount > 10) {
              vibrationPattern = [100, 50, 100, 50, 50]; // Bruised, more intense
          } else if (newSlapCount > 5) {
              vibrationPattern = [150, 50, 100]; // Pained, double-hit
          } else if (newSlapCount > 2) {
              vibrationPattern = 250; // Annoyed, stronger single vibration
          } else if (newSlapCount > 1) {
              vibrationPattern = [100, 40, 100]; // Wince, sharper double-tap
          } else {
              vibrationPattern = 200; // First slap, simple vibration
          }
        
          window.navigator.vibrate(vibrationPattern);
        }
    }, 150);

    // End of slap animation
    setTimeout(() => {
      setIsSlapping(false);
    }, 300);

    // Slap mark fades away
    setTimeout(() => {
        setShowSlapMark(false);
    }, 800);

  }, [isSlapping, slapCount, character, knockoutThreshold, isGameOverByGun, playSlap, playReaction, playKnockout, playVictory, playLose]);

  const handleReset = useCallback(() => {
    // This function can be called while isSlapping is true from the game over screen
    setIsGameOverByGun(false);
    setIdleAnimation(null);
    setIsTaunting(false);
    setSlapCount(0);
    setShowSlapMark(false);
    setReactionText('');
    setMumbleText('');
     if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
     if (mumbleTimeoutRef.current) clearTimeout(mumbleTimeoutRef.current);

    setKnockoutThreshold(generateKnockoutThreshold());
    setDegradationPath(Math.floor(Math.random() * 3));
  }, []);

  const handleCloseTooltip = () => {
    setShowTooltip(false);
    localStorage.setItem('hasSeenSlapTooltip', 'true');
  };

  const handleCharacterChange = useCallback((newCharacter: Character) => {
    if (isSlapping || isGameOverByGun) return;
    setCharacter(newCharacter);
    handleReset(); // Reset count and KO threshold for the new character
  }, [isSlapping, handleReset, isGameOverByGun]);


  return (
    <div className="min-h-screen text-white flex flex-col font-sans">
      <DynamicBackground character={character} slapCount={slapCount} knockoutThreshold={knockoutThreshold} />
      {showScreenFlash && <div className="screen-flash" />}
      {isGameOverByGun && <GameOverOverlay character={character} onReset={handleReset} />}
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 overflow-hidden">
        <SlapZone isSlapping={isSlapping} showSlapMark={showSlapMark} slapCount={slapCount} onSlap={handleSlap} character={character} reactionText={reactionText} knockoutThreshold={knockoutThreshold} slapAngle={slapAngle} idleAnimation={idleAnimation} isTaunting={isTaunting} isGameOverByGun={isGameOverByGun} mumbleText={mumbleText} degradationPath={degradationPath} />
      </main>
      <footer className="relative w-full p-6 flex flex-col items-center justify-center gap-6 bg-slate-800/50 border-t border-slate-700">
        <Tooltip isVisible={showTooltip} onClose={handleCloseTooltip} />
        <CharacterSelector currentCharacter={character} onSelectCharacter={handleCharacterChange} isDisabled={isSlapping || isGameOverByGun} />
        <div className="flex items-center justify-center w-full max-w-md">
          <div className="flex-1 text-left">
            <SlapCounter count={slapCount} />
          </div>
          <div className="flex-shrink-0 mx-4">
            <SlapButton onSlap={handleSlap} isSlapping={isSlapping || isGameOverByGun} />
          </div>
          <div className="flex-1 text-right">
            <ResetButton onReset={handleReset} isDisabled={isSlapping || isGameOverByGun} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;