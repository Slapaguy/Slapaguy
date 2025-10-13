import React from 'react';

interface SlapButtonProps {
  onSlap: () => void;
  isSlapping: boolean;
}

const SlapButton: React.FC<SlapButtonProps> = ({ onSlap, isSlapping }) => {
  return (
    <button
      onClick={onSlap}
      disabled={isSlapping}
      className={`
        relative inline-flex items-center justify-center p-0.5 overflow-hidden 
        text-2xl font-extrabold text-gray-900 rounded-lg group bg-gradient-to-br 
        from-red-500 to-orange-400
        group-hover:from-red-500 group-hover:to-orange-400 
        hover:text-white dark:text-white 
        focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800
        transition-all ease-in duration-75
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <span className="relative px-12 py-4 transition-all ease-in duration-150 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        SLAP!
      </span>
    </button>
  );
};

export default SlapButton;