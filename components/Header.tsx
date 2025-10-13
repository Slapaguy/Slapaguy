
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full text-center p-6 bg-slate-800 shadow-lg border-b border-slate-700">
      <h1 className="text-4xl font-bold text-red-500 tracking-wider">
        The Virtual Slapper
      </h1>
      <p className="text-slate-400 mt-1">Satisfaction guaranteed. Virtually.</p>
    </header>
  );
};

export default Header;
