import React from 'react';
import { Sparkles, ExternalLink, Instagram, Code2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto py-2">
      {/* Profile Hero Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar with AE initials */}
          <div className="w-20 h-20 rounded-2xl bg-white text-black font-black text-2xl flex items-center justify-center shadow-lg shrink-0 tracking-tight">
            AE
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-700 text-white text-xs font-bold font-mono">
                15 Y/O
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-medium">
                15 Years Old
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-black text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-black" />
                <span>Created by Vibecoding</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Azan Ejaz
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              Hey! I'm Azan Ejaz, a 15-year-old passionate about building apps, games, and creative projects.
            </p>
          </div>
        </div>
      </div>

      {/* Main Story Cards */}
      <div className="grid grid-cols-1 gap-5">
        {/* Card 1: Created by Vibecoding */}
        <div className="p-6 sm:p-7 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
          <div className="flex items-center gap-2.5 text-white">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold">Created by Vibecoding</h2>
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed">
            This entire game, TRACE: The Internet Is Lying to You, was brought to life through vibecoding — combining creative vision, game design ideas, and iterative AI guidance to build a complete interactive investigation experience from scratch.
          </p>
        </div>

        {/* Card 2: Instagram Connect */}
        <div className="p-6 sm:p-7 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                <Instagram className="w-4 h-4 text-black" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold">My Instagram</h2>
                <div className="text-xs text-neutral-400 font-mono">@azanejaz_</div>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-700 text-xs font-semibold text-neutral-300">
              Instagram
            </span>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed">
            Click here to open my account on Instagram: <span className="font-mono text-white font-semibold">azanejaz_</span>
          </p>

          <div className="pt-1">
            <a
              href="https://instagram.com/azanejaz_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-bold text-xs sm:text-sm hover:bg-neutral-200 transition-colors shadow-sm"
            >
              <Instagram className="w-4 h-4" />
              <span>Open Profile</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
