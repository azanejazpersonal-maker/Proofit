import React, { useState } from 'react';
import { UserSettings } from '../types';
import {
  Settings,
  Trash2,
  Lock,
  Type,
  Eye,
  CheckCircle2,
} from 'lucide-react';

interface SettingsPageProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
  onClearInvestigations: () => void;
  onClearIncidentNotes: () => void;
  savedInvestigationsCount: number;
  incidentNotesCount: number;
  isAiAvailable: boolean;
  onShowToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  settings,
  onUpdateSettings,
  onClearInvestigations,
  onClearIncidentNotes,
  savedInvestigationsCount,
  incidentNotesCount,
  onShowToast,
}) => {
  const [confirmClearInv, setConfirmClearInv] = useState<boolean>(false);
  const [confirmClearNotes, setConfirmClearNotes] = useState<boolean>(false);

  const handleTextSizeChange = (textSize: 'normal' | 'large') => {
    onUpdateSettings({ ...settings, textSize });
    onShowToast(`Text size changed to ${textSize}.`, 'info');
  };

  const handleReducedMotionChange = (reducedMotion: boolean) => {
    onUpdateSettings({ ...settings, reducedMotion });
    onShowToast(`Animations ${reducedMotion ? 'turned off' : 'turned on'}.`, 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider">
          <Settings className="w-3.5 h-3.5" />
          <span>Preferences</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">Settings & Privacy</h2>
        <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
          Change text size, manage your saved data, and read our simple privacy promise.
        </p>
      </div>

      {/* Display Controls */}
      <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Eye className="w-4 h-4 text-white" />
          <span>Screen & Text Size</span>
        </h3>

        <div className="space-y-4 text-xs">
          {/* Text Size */}
          <div className="flex items-center justify-between py-2 border-b border-neutral-800">
            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-neutral-400" />
                <span>Text Size</span>
              </div>
              <p className="text-neutral-400 text-[11px]">Make words bigger and easier to read</p>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
              <button
                onClick={() => handleTextSizeChange('normal')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  settings.textSize === 'normal'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => handleTextSizeChange('large')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  settings.textSize === 'large'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Big Text (+2px)
              </button>
            </div>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-bold text-white">Turn Off Extra Animations</div>
              <p className="text-neutral-400 text-[11px]">
                Keeps the screen calm without moving transitions
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) => handleReducedMotionChange(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Storage Management */}
      <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-white" />
          <span>Manage Saved Data</span>
        </h3>

        <div className="space-y-3">
          {/* Clear Investigations */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800">
            <div>
              <div className="font-bold text-xs text-white">Saved Checks</div>
              <p className="text-[11px] text-neutral-400">
                You have <span className="font-mono text-white font-bold">{savedInvestigationsCount}</span> saved reports on this device.
              </p>
            </div>
            {!confirmClearInv ? (
              <button
                onClick={() => setConfirmClearInv(true)}
                disabled={savedInvestigationsCount === 0}
                className="px-3.5 py-1.5 text-xs font-bold text-red-400 hover:bg-red-950/40 border border-red-800 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Delete Saved Checks
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setConfirmClearInv(false)}
                  className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onClearInvestigations();
                    setConfirmClearInv(false);
                    onShowToast('All saved checks deleted.', 'info');
                  }}
                  className="px-3 py-1 text-xs bg-red-600 text-white font-bold rounded-lg"
                >
                  Yes, Delete
                </button>
              </div>
            )}
          </div>

          {/* Clear Notes */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800">
            <div>
              <div className="font-bold text-xs text-white">My Scam Notes</div>
              <p className="text-[11px] text-neutral-400">
                You have <span className="font-mono text-white font-bold">{incidentNotesCount}</span> written notes on this device.
              </p>
            </div>
            {!confirmClearNotes ? (
              <button
                onClick={() => setConfirmClearNotes(true)}
                disabled={incidentNotesCount === 0}
                className="px-3.5 py-1.5 text-xs font-bold text-red-400 hover:bg-red-950/40 border border-red-800 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Delete Notes
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setConfirmClearNotes(false)}
                  className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onClearIncidentNotes();
                    setConfirmClearNotes(false);
                    onShowToast('All notes deleted.', 'info');
                  }}
                  className="px-3 py-1 text-xs bg-red-600 text-white font-bold rounded-lg"
                >
                  Yes, Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Honest Privacy Promise */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3 text-xs text-neutral-300 leading-relaxed">
        <div className="font-bold text-sm text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-white" />
          <span>Our Plain English Privacy Promise</span>
        </div>

        <div className="space-y-2">
          <p>
            • <strong>No tracking, no accounts:</strong> You don't need to sign up, type your email, or create a password.
          </p>
          <p>
            • <strong>Stored on your own computer:</strong> Any notes or checks you save stay right in your own browser. We don't save or sell your data.
          </p>
          <p>
            • <strong>Honest advice only:</strong> We don't invent fake domain scores, fake security badges, or pretend we can catch 100% of scammers. We show you the real red flags in plain English.
          </p>
        </div>
      </div>
    </div>
  );
};
