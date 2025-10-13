import React from 'react';

interface MumbleBubbleProps {
  text: string;
}

const MumbleBubble: React.FC<MumbleBubbleProps> = ({ text }) => {
  // Don't render if there's no text
  if (!text) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className="absolute top-1/4 right-0 -translate-y-full w-max max-w-xs pointer-events-none mumble-bubble-animation"
    >
      <div className="relative bg-slate-800 bg-opacity-70 text-slate-200 italic text-sm text-center px-3 py-1 rounded-full shadow-md">
        {text}
      </div>
    </div>
  );
};

export default MumbleBubble;