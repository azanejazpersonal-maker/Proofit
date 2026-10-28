import React, { useState, useEffect } from 'react';
import {
  InvestigationReport,
  IncidentNote,
  UserSettings,
} from './types';
import {
  getSavedInvestigations,
  saveInvestigation as persistInvestigation,
  deleteInvestigation as removeInvestigation,
  clearAllInvestigations as purgeInvestigations,
  getIncidentNotes,
  saveIncidentNote as persistIncidentNote,
  deleteIncidentNote as removeIncidentNote,
  clearAllIncidentNotes as purgeIncidentNotes,
  getUserSettings,
  saveUserSettings,
} from './utils/persistence';
import {
  getApiStatus,
  runMessageInvestigation,
  runScreenshotInvestigation,
} from './services/analysisService';
import { SAMPLE_JOB_OFFER_TEXT } from './data/sampleCases';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileNavigation } from './components/MobileNavigation';
import { InvestigationInput } from './components/InvestigationInput';
import { AnalysisReport } from './components/AnalysisReport';
import { PersonalSafetyToolkit } from './components/PersonalSafetyToolkit';
import { ScamKnowledgeCenter } from './components/ScamKnowledgeCenter';
import { LearningChallenge } from './components/LearningChallenge';
import { InvestigationHistory } from './components/InvestigationHistory';
import { SettingsPage } from './components/SettingsPage';
import { AboutSection } from './components/AboutSection';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('investigate');

  // Investigation & Active Report State
  const [activeReport, setActiveReport] = useState<InvestigationReport | null>(null);
  const [savedReports, setSavedReports] = useState<InvestigationReport[]>([]);
  const [incidentNotes, setIncidentNotes] = useState<IncidentNote[]>([]);
  const [settings, setSettings] = useState<UserSettings>(getUserSettings());

  // Engine & API Status
  const [isAiAvailable, setIsAiAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Toast Notification State
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({
      id: Date.now().toString(),
      text,
      type,
    });
  };

  // Initialize data on mount
  useEffect(() => {
    setSavedReports(getSavedInvestigations());
    setIncidentNotes(getIncidentNotes());

    getApiStatus().then((status) => {
      setIsAiAvailable(status.aiAvailable);
    });
  }, []);

  // Sync settings when modified
  const handleUpdateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    saveUserSettings(newSettings);
  };

  // Investigation Execution Handlers
  const handleAnalyzeMessage = async (text: string) => {
    setIsLoading(true);
    setAnalysisError(null);
    try {
      const report = await runMessageInvestigation(text, settings.preferredEngine);
      setActiveReport(report);
      setCurrentTab('report');
      window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
    } catch (err: any) {
      setAnalysisError(err.message || 'Could not check this message. Please try again.');
      showToast(err.message || 'Check failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeScreenshot = async (base64: string, mimeType: string, filename: string) => {
    setIsLoading(true);
    setAnalysisError(null);
    try {
      const result = await runScreenshotInvestigation(base64, mimeType);
      if (result.success && result.report) {
        result.report.metadata = {
          ...result.report.metadata,
          imageFilename: filename,
        };
        setActiveReport(result.report);
        setCurrentTab('report');
        window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
      } else {
        setAnalysisError(result.error || 'Could not check picture. Try pasting the text instead.');
        showToast(result.error || 'Picture check unavailable', 'error');
      }
    } catch (err: any) {
      setAnalysisError(err.message || 'Could not check picture. Try pasting the text instead.');
      showToast('Check failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Sample Investigation Trigger (1-click test for judges and users)
  const handleRunSample = () => {
    handleAnalyzeMessage(SAMPLE_JOB_OFFER_TEXT);
  };

  // Saved Investigations Handlers
  const handleSaveReport = (report: InvestigationReport) => {
    persistInvestigation(report);
    setSavedReports(getSavedInvestigations());
  };

  const handleDeleteReport = (id: string) => {
    removeInvestigation(id);
    setSavedReports(getSavedInvestigations());
  };

  const handleClearAllReports = () => {
    purgeInvestigations();
    setSavedReports([]);
  };

  const handleOpenReportFromHistory = (report: InvestigationReport) => {
    setActiveReport(report);
    setCurrentTab('report');
    window.scrollTo({ top: 0, behavior: settings.reducedMotion ? 'auto' : 'smooth' });
  };

  // Incident Notes Handlers
  const handleSaveIncidentNote = (note: IncidentNote) => {
    persistIncidentNote(note);
    setIncidentNotes(getIncidentNotes());
  };

  const handleDeleteIncidentNote = (id: string) => {
    removeIncidentNote(id);
    setIncidentNotes(getIncidentNotes());
  };

  const handleClearAllIncidentNotes = () => {
    purgeIncidentNotes();
    setIncidentNotes([]);
  };

  const isCurrentReportSaved = activeReport
    ? savedReports.some((r) => r.id === activeReport.id)
    : false;

  return (
    <div
      className={`min-h-screen bg-black text-white flex flex-col font-sans ${
        settings.textSize === 'large' ? 'text-[17px]' : 'text-[15px]'
      }`}
    >
      {/* Top Bar */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onRunSample={handleRunSample}
        savedCount={savedReports.length}
      />

      {/* Main App Layout Container */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar Navigation */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          savedCount={savedReports.length}
          incidentCount={incidentNotes.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12 max-w-5xl mx-auto w-full">
          {currentTab === 'investigate' && (
            <InvestigationInput
              onAnalyzeMessage={handleAnalyzeMessage}
              onAnalyzeScreenshot={handleAnalyzeScreenshot}
              onSelectTab={setCurrentTab}
              isLoading={isLoading}
              error={analysisError}
              onClearError={() => setAnalysisError(null)}
            />
          )}

          {currentTab === 'report' && activeReport && (
            <AnalysisReport
              report={activeReport}
              onSaveReport={handleSaveReport}
              isSaved={isCurrentReportSaved}
              onNewInvestigation={() => setCurrentTab('investigate')}
              onShowToast={showToast}
            />
          )}

          {currentTab === 'report' && !activeReport && (
            <div className="p-10 text-center rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <h3 className="text-base font-bold text-white">No Message Checked Yet</h3>
              <p className="text-xs text-neutral-400">
                Please paste a message or upload a screenshot to see your scam report.
              </p>
              <button
                onClick={() => setCurrentTab('investigate')}
                className="px-5 py-2 text-xs font-bold text-black bg-white hover:bg-neutral-200 rounded-lg"
              >
                Go to Check Message
              </button>
            </div>
          )}

          {currentTab === 'challenge' && <LearningChallenge />}

          {currentTab === 'toolkit' && (
            <PersonalSafetyToolkit
              incidentNotes={incidentNotes}
              onSaveNote={handleSaveIncidentNote}
              onDeleteNote={handleDeleteIncidentNote}
              onClearNotes={handleClearAllIncidentNotes}
              onShowToast={showToast}
            />
          )}

          {currentTab === 'learn' && <ScamKnowledgeCenter />}

          {currentTab === 'history' && (
            <InvestigationHistory
              savedReports={savedReports}
              onOpenReport={handleOpenReportFromHistory}
              onDeleteReport={handleDeleteReport}
              onClearAll={handleClearAllReports}
              onShowToast={showToast}
            />
          )}

          {currentTab === 'about' && <AboutSection />}

          {currentTab === 'settings' && (
            <SettingsPage
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onClearInvestigations={handleClearAllReports}
              onClearIncidentNotes={handleClearAllIncidentNotes}
              savedInvestigationsCount={savedReports.length}
              incidentNotesCount={incidentNotes.length}
              isAiAvailable={isAiAvailable}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        savedCount={savedReports.length}
      />

      {/* Lightweight Toast Feedback */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
