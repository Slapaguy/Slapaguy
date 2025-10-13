import React from 'react';

interface SlapCounterProps {
  count: number;
}

const SlapCounter: React.FC<SlapCounterProps> = ({ count }) => {
  return (
    <div className="text-center">
      <p className="text-xl font-bold text-slate-300">
        Slaps: <span className="text-red-400 text-2xl tabular-nums">{count}</span>
      </p>
    </div>
  );
};

export default SlapCounter;