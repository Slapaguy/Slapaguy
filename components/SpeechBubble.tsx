import React from 'react';

interface SpeechBubbleProps {
  text: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ text }) => {
  // Don't render the bubble if there's no text
  if (!text) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      // The 'pop-in' class applies a subtle entrance animation
      className="absolute top-0 left-1/2 -translate-x-1/2 mt-4 w-max max-w-xs pop-in"
    >
      <div className="relative bg-white text-slate-800 font-bold text-center px-4 py-2 rounded-lg shadow-lg">
        {text}
        {/* Tail of the speech bubble */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white"></div>
      </div>
    </div>
  );
};

export default SpeechBubble;