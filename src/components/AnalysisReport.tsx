import React, { useState } from 'react';
import { InvestigationReport } from '../types';
import { EvidenceCard } from './EvidenceCard';
import {
  formatDateTime,
  getAssessmentLabel,
  getAssessmentBadgeStyle,
  generateShareableReportText,
  copyToClipboard,
} from '../utils/formatters';
import {
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  AlertCircle,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Shield,
  Search,
} from 'lucide-react';

interface AnalysisReportProps {
  report: InvestigationReport;
  onSaveReport: (report: InvestigationReport) => void;
  isSaved: boolean;
  onNewInvestigation: () => void;
  onShowToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

export const AnalysisReport: React.FC<AnalysisReportProps> = ({
  report,
  onSaveReport,
  isSaved,
  onNewInvestigation,
  onShowToast,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const badgeStyle = getAssessmentBadgeStyle(report.assessment);
  const highSeverityCount = report.findings.filter((f) => f.severity === 'high').length;
  const mediumSeverityCount = report.findings.filter((f) => f.severity === 'medium').length;

  const handleCopy = async () => {
    const text = generateShareableReportText(report);
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      onShowToast('Report copied! You can paste it into notes or chat.', 'success');
      setTimeout(() => setCopied(false), 2500);
    } else {
      onShowToast('Could not copy report.', 'error');
    }
  };

  const handleSave = () => {
    onSaveReport(report);
    onShowToast('Saved to your history!', 'success');
  };

  const getAssessmentIcon = () => {
    switch (report.assessment) {
      case 'high_risk_indicators':
        return <AlertCircle className="w-6 h-6 text-red-400 shrink-0" />;
      case 'some_warning_signs':
        return <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />;
      case 'insufficient_information':
        return <HelpCircle className="w-6 h-6 text-neutral-400 shrink-0" />;
      case 'no_obvious_warning_signs':
        return <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="font-bold text-white">Results</span>
          <span aria-hidden="true">·</span>
          <span>{formatDateTime(report.createdAt)}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
              isSaved
                ? 'bg-neutral-900 text-neutral-400 border-neutral-700 cursor-default'
                : 'text-white bg-neutral-900 hover:bg-neutral-800 border-neutral-700'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isSaved ? 'Saved In History' : 'Save Report'}</span>
          </button>

          <button
            onClick={onNewInvestigation}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-black bg-white hover:bg-neutral-200 rounded-lg transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Check Another</span>
          </button>
        </div>
      </div>

      {/* Section A: Overall Result Banner */}
      <div className={`p-6 rounded-2xl border ${badgeStyle.border} ${badgeStyle.bg} space-y-3`}>
        <div className="flex items-center gap-3">
          {getAssessmentIcon()}
          <div>
            <div className="text-xs uppercase font-extrabold tracking-wider text-neutral-400">
              Scam Verdict
            </div>
            <div className={`text-xl sm:text-2xl font-black ${badgeStyle.text}`}>
              {getAssessmentLabel(report.assessment)}
            </div>
          </div>
        </div>

        <p className="text-sm text-white leading-relaxed font-medium">
          {report.summary}
        </p>

        {report.assessment === 'no_obvious_warning_signs' && (
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-600 text-xs text-amber-200 leading-relaxed">
            <strong>Important Tip:</strong> Even though we didn't find obvious scam words in this text, scammers can be very clever. Always protect yourself: NEVER send money, gift cards, or passwords to someone you only met online!
          </div>
        )}
      </div>

      {/* Section F: Simple Scoreboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            Total Red Flags
          </div>
          <div className="text-2xl font-black font-mono tabular-nums text-white">
            {report.findings.length}
          </div>
          <div className="text-[11px] text-neutral-500">Signs spotted</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            Big Red Flags
          </div>
          <div className="text-2xl font-black font-mono tabular-nums text-red-400">
            {highSeverityCount}
          </div>
          <div className="text-[11px] text-neutral-500">Major danger</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            Warning Signs
          </div>
          <div className="text-2xl font-black font-mono tabular-nums text-amber-400">
            {mediumSeverityCount}
          </div>
          <div className="text-[11px] text-neutral-500">Suspicious stuff</div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            Safe Move
          </div>
          <div className="text-sm font-black text-white pt-1 truncate">
            {report.assessment === 'high_risk_indicators' ? 'Stop & Delete' : 'Double Check'}
          </div>
          <div className="text-[11px] text-neutral-500">What to do</div>
        </div>
      </div>

      {/* The Message Checked */}
      {report.rawInputSnippet && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
            <Search className="w-3.5 h-3.5 text-white" />
            <span>The Message You Checked</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 leading-relaxed break-words">
            {report.rawInputSnippet}
          </div>
        </div>
      )}

      {/* Section B: Findings / Red Flags */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-white" />
          <span>Red Flags Found ({report.findings.length})</span>
        </h3>

        {report.findings.length === 0 ? (
          <div className="p-6 text-center rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 text-sm">
            Good news! We did not spot any obvious scam tricks or red flags in this message text.
          </div>
        ) : (
          <div className="space-y-3">
            {report.findings.map((finding, idx) => (
              <EvidenceCard key={finding.id || idx} finding={finding} index={idx} />
            ))}
          </div>
        )}
      </div>

      {/* Section C & D: What We Know vs What We Don't Know */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Things We Are Sure About</span>
          </div>
          <ul className="space-y-2 text-xs text-neutral-300">
            {report.knownFacts.map((fact, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span className="leading-relaxed">{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Things We Still Don’t Know</span>
          </div>
          <ul className="space-y-2 text-xs text-neutral-300">
            {report.unknowns.map((unk, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-neutral-500 font-bold shrink-0">?</span>
                <span className="leading-relaxed">{unk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section E: What You Should Do Next */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-850 space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-white" />
          <span>Your Safety Checklist</span>
        </h3>
        <ol className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
          {report.recommendedActions.map((action, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-white text-black font-bold text-[11px] flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className="leading-relaxed text-white font-medium">{action}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
