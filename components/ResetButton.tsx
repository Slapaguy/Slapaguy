import React from 'react';

interface ResetButtonProps {
  onReset: () => void;
  isDisabled: boolean;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset, isDisabled }) => {
  return (
    <button
      onClick={onReset}
      disabled={isDisabled}
      aria-label="Reset slap count"
      className={`
        px-6 py-2 border border-slate-600 text-slate-400 rounded-lg 
        hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 
        focus:ring-slate-500 transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400
        flex items-center gap-2
      `}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 15M20 20l-1.5-1.5A9 9 0 003.5 9" />
      </svg>
      <span>Reset</span>
    </button>
  );
};

export default ResetButton;