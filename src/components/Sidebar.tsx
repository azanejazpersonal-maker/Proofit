import React from 'react';
import {
  Search,
  Gamepad2,
  CheckSquare,
  BookOpen,
  Bookmark,
  Settings,
  ShieldCheck,
  Lock,
  User,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  savedCount: number;
  incidentCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  incidentCount,
}) => {
  const navItems = [
    { id: 'investigate', label: 'Check a Message', icon: Search },
    { id: 'challenge', label: 'Spot the Scam Game', icon: Gamepad2, highlight: true },
    { id: 'toolkit', label: 'Safety Checklists', icon: CheckSquare, badge: incidentCount },
    { id: 'learn', label: 'Simple Guides', icon: BookOpen },
    { id: 'history', label: 'Saved Checks', icon: Bookmark, badge: savedCount },
    { id: 'about', label: 'About Creator', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-neutral-950 border-r border-neutral-800 p-4 justify-between h-[calc(100vh-57px)] sticky top-[57px]">
      <div className="space-y-6">
        {/* Navigation list */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold tracking-wider uppercase text-neutral-400">
            Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors ${
                  isActive
                    ? 'bg-white text-black shadow-sm'
                    : item.highlight
                    ? 'text-white bg-neutral-900 border border-neutral-700 hover:bg-neutral-800'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : item.highlight ? 'text-white' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </div>
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className={`font-mono text-[11px] tabular-nums px-1.5 py-0.5 rounded ${isActive ? 'bg-black text-white' : 'bg-neutral-800 text-neutral-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* What this app does */}
        <div className="px-3.5 py-3 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>How It Works</span>
          </div>
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            1. Paste any weird text or email.
            <br />
            2. We spot the red flags for you.
            <br />
            3. Play our game to practice!
          </p>
        </div>
      </div>

      {/* Safety Reminder */}
      <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
        <div className="flex items-center gap-1.5 text-white font-bold">
          <Lock className="w-3.5 h-3.5" />
          <span>Keep It Safe</span>
        </div>
        <p className="leading-relaxed">
          Never type your real passwords or credit card numbers into any checker tool.
        </p>
      </div>
    </aside>
  );
};
