import React from 'react';
import { Search, Gamepad2, CheckSquare, BookOpen, Bookmark, User } from 'lucide-react';

interface MobileNavigationProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  savedCount: number;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
}) => {
  const tabs = [
    { id: 'investigate', label: 'Check', icon: Search },
    { id: 'challenge', label: 'Play Game', icon: Gamepad2 },
    { id: 'toolkit', label: 'Tools', icon: CheckSquare },
    { id: 'learn', label: 'Guides', icon: BookOpen },
    { id: 'about', label: 'About', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-neutral-800 px-2 py-1.5 flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] rounded transition-colors ${
              isActive ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="relative">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-1 whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
