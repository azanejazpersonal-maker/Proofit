import React, { useState } from 'react';
import { Finding } from '../types';
import { ChevronDown, AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface EvidenceCardProps {
  finding: Finding;
  index: number;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ finding, index }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const getSeverityBadge = () => {
    switch (finding.severity) {
      case 'high':
        return (
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span className="uppercase tracking-wider text-[11px]">Big Red Flag</span>
          </div>
        );
      case 'medium':
        return (
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span className="uppercase tracking-wider text-[11px]">Warning Sign</span>
          </div>
        );
      case 'low':
        return (
          <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-300">
            <Info className="w-3.5 h-3.5 text-neutral-400" />
            <span className="uppercase tracking-wider text-[11px]">Things To Note</span>
          </div>
        );
    }
  };

  return (
    <div className="border border-neutral-800 bg-neutral-900 rounded-xl overflow-hidden transition-all duration-200">
      {/* Header Bar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-none"
        aria-expanded={isExpanded}
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 text-xs text-neutral-400">
            <span className="font-bold text-white">Red Flag #{index + 1}</span>
            <span aria-hidden="true">·</span>
            {getSeverityBadge()}
          </div>
          <h4 className="text-base font-bold text-white">{finding.title}</h4>
        </div>

        <div className="pt-1 text-neutral-400">
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-white' : ''}`} />
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 sm:px-5 pb-5 pt-1 space-y-4 border-t border-neutral-800 text-xs sm:text-sm">
          {/* Exact Quote */}
          {finding.observedEvidence && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                Exact Words In The Message:
              </span>
              <div className="p-3 rounded-lg bg-black border border-neutral-800 font-mono text-xs text-neutral-200 leading-relaxed break-words">
                "{finding.observedEvidence}"
              </div>
            </div>
          )}

          {/* Why It's Bad */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Why This Looks Like A Scam:
            </span>
            <p className="text-neutral-200 leading-relaxed font-normal">{finding.explanation}</p>
          </div>

          {/* Limitations */}
          {finding.limitations && (
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                What We Still Don’t Know:
              </span>
              <p className="text-neutral-400 leading-relaxed text-xs italic">{finding.limitations}</p>
            </div>
          )}

          {/* What You Should Do */}
          {finding.recommendedAction && (
            <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-xs text-white">What You Should Do:</span>
                <p className="text-xs text-neutral-300 leading-relaxed">{finding.recommendedAction}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
