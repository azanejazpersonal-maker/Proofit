import React from 'react';
import { ShieldAlert, Play } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onRunSample: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, onRunSample }) => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-6 px-4 lg:px-8 py-3 bg-black/95 backdrop-blur-md border-b border-neutral-800">
      {/* Zone 1: Brand wordmark */}
      <button
        onClick={() => onSelectTab('investigate')}
        className="flex items-center gap-2.5 text-left text-white font-bold tracking-tight text-lg whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
      >
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-black">
          <ShieldAlert className="w-5 h-5 text-black" />
        </div>
        <div>
          <span className="text-white font-extrabold text-base tracking-wide">PROOFIT</span>
          <span className="hidden sm:inline text-xs font-normal text-neutral-400 ml-2">
            · Scam Checker & Game
          </span>
        </div>
      </button>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
        <button
          onClick={() => onSelectTab('investigate')}
          className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 ${
            currentTab === 'investigate'
              ? 'text-white border-b-2 border-white font-bold'
              : 'hover:text-white'
          }`}
        >
          Check Message
        </button>
        <button
          onClick={() => onSelectTab('challenge')}
          className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 flex items-center gap-1.5 ${
            currentTab === 'challenge'
              ? 'text-white border-b-2 border-white font-bold'
              : 'hover:text-white text-neutral-300'
          }`}
        >
          <span>Spot the Scam Game</span>
        </button>
        <button
          onClick={() => onSelectTab('toolkit')}
          className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 ${
            currentTab === 'toolkit'
              ? 'text-white border-b-2 border-white font-bold'
              : 'hover:text-white'
          }`}
        >
          Safety Tools
        </button>
        <button
          onClick={() => onSelectTab('learn')}
          className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 ${
            currentTab === 'learn'
              ? 'text-white border-b-2 border-white font-bold'
              : 'hover:text-white'
          }`}
        >
          Simple Guides
        </button>
        <button
          onClick={() => onSelectTab('history')}
          className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 ${
            currentTab === 'history'
              ? 'text-white border-b-2 border-white font-bold'
              : 'hover:text-white'
          }`}
        >
          Saved Checks
        </button>
        <button
          onClick={() => onSelectTab('about')}
          className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 ${
            currentTab === 'about'
              ? 'text-white border-b-2 border-white font-bold'
              : 'hover:text-white'
          }`}
        >
          About
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onRunSample}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-black bg-white hover:bg-neutral-200 active:scale-[0.98] transition-all rounded-md shadow-sm whitespace-nowrap shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-black" />
          <span>Try A Fake Scam Example</span>
        </button>
      </div>
    </header>
  );
};
