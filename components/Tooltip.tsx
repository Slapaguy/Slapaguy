import React from 'react';

interface TooltipProps {
  onClose: () => void;
  isVisible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ onClose, isVisible }) => {
  return (
    <div 
      role="tooltip"
      className={`
        absolute bottom-full mb-4 w-72 p-3 bg-sky-600 text-white rounded-lg shadow-xl
        transform transition-all duration-300 ease-out origin-bottom
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
      `}
    >
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-sky-600 transform rotate-45"></div>
      <p className="text-sm font-semibold text-center z-10 relative">
        Ready for some fun? Click the <span className="font-bold text-yellow-300">SLAP!</span> button or tap the face to begin!
      </p>
      <button 
        onClick={onClose} 
        aria-label="Dismiss tooltip"
        className="absolute top-0 right-0 p-2 text-sky-200 hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Tooltip;
