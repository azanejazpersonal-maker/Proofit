import React, { useState } from 'react';
import { InvestigationReport, AssessmentType } from '../types';
import {
  formatDateTime,
  getAssessmentLabel,
  getAssessmentBadgeStyle,
} from '../utils/formatters';
import {
  Bookmark,
  Search,
  Trash2,
  ExternalLink,
  Shield,
  AlertCircle,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';

interface InvestigationHistoryProps {
  savedReports: InvestigationReport[];
  onOpenReport: (report: InvestigationReport) => void;
  onDeleteReport: (id: string) => void;
  onClearAll: () => void;
  onShowToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

export const InvestigationHistory: React.FC<InvestigationHistoryProps> = ({
  savedReports,
  onOpenReport,
  onDeleteReport,
  onClearAll,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterAssessment, setFilterAssessment] = useState<string>('all');
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  const filteredReports = savedReports.filter((rep) => {
    const matchesFilter =
      filterAssessment === 'all' || rep.assessment === filterAssessment;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      rep.title.toLowerCase().includes(query) ||
      rep.summary.toLowerCase().includes(query) ||
      rep.id.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const getAssessmentIcon = (assessment: AssessmentType) => {
    switch (assessment) {
      case 'high_risk_indicators':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'some_warning_signs':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'insufficient_information':
        return <HelpCircle className="w-4 h-4 text-neutral-400" />;
      case 'no_obvious_warning_signs':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider">
          <Bookmark className="w-3.5 h-3.5" />
          <span>My History</span>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Saved Checks ({savedReports.length})
          </h2>
          {savedReports.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="px-3.5 py-1.5 text-xs font-bold text-red-400 hover:bg-red-950/40 border border-red-700 rounded-lg transition-colors"
            >
              Clear All Saved Checks
            </button>
          )}
        </div>
        <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
          Review previous messages you checked. Saved securely in your browser.
        </p>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="p-4 rounded-xl bg-red-950/50 border border-red-600 text-red-200 text-xs sm:text-sm space-y-3">
          <div className="flex items-center gap-2 font-bold">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span>Are you sure you want to delete all saved checks?</span>
          </div>
          <p className="text-xs text-red-300">
            This will erase all saved results from this computer.
          </p>
          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-3 py-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClearAll();
                setShowClearConfirm(false);
                onShowToast('History cleared.', 'info');
              }}
              className="px-3.5 py-1.5 text-xs font-bold bg-red-600 hover:bg-red-500 text-white rounded-lg"
            >
              Yes, Delete All
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved checks by keyword..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-neutral-500 mr-1 text-[11px] font-bold">Filter:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'high_risk_indicators', label: 'Scams' },
            { id: 'some_warning_signs', label: 'Warnings' },
            { id: 'no_obvious_warning_signs', label: 'No Red Flags' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterAssessment(item.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterAssessment === item.id
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white bg-neutral-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {savedReports.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <Shield className="w-8 h-8 text-neutral-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Saved Checks Yet</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              When you check a message on the home page, click "Save Report" to keep a copy here.
            </p>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 text-xs">
            No saved checks matched your search.
          </div>
        ) : (
          filteredReports.map((report) => {
            const badgeStyle = getAssessmentBadgeStyle(report.assessment);
            return (
              <div
                key={report.id}
                className="p-5 rounded-xl border border-neutral-800 bg-neutral-950 space-y-3 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-xs text-neutral-400 font-mono">
                      <span>{formatDateTime(report.createdAt)}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{report.title}</h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onOpenReport(report)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-black bg-white hover:bg-neutral-200 rounded-lg transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open</span>
                    </button>
                    <button
                      onClick={() => {
                        onDeleteReport(report.id);
                        onShowToast('Deleted from history.', 'info');
                      }}
                      className="p-1.5 text-neutral-400 hover:text-red-400 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Verdict Badge */}
                <div className={`p-2.5 rounded-lg border ${badgeStyle.border} ${badgeStyle.bg} flex items-center gap-2 text-xs`}>
                  {getAssessmentIcon(report.assessment)}
                  <span className={`font-bold ${badgeStyle.text}`}>
                    {getAssessmentLabel(report.assessment)}
                  </span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span className="text-white font-mono font-bold">
                    {report.findings.length} red flags found
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                  {report.summary}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
