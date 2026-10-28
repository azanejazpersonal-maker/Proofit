import { IncidentNote, InvestigationReport, UserSettings } from '../types';

const INVESTIGATIONS_KEY = 'proofit_saved_investigations_v1';
const INCIDENT_NOTES_KEY = 'proofit_incident_notes_v1';
const SETTINGS_KEY = 'proofit_user_settings_v1';

export const DEFAULT_SETTINGS: UserSettings = {
  textSize: 'normal',
  reducedMotion: false,
  preferredEngine: 'auto',
};

// Safe localStorage wrapper
function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    console.warn(`[PROOFIT Storage] Could not read from localStorage for key: ${key}`, err);
    return null;
  }
}

function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.warn(`[PROOFIT Storage] Could not write to localStorage for key: ${key}`, err);
    return false;
  }
}

// Investigations Persistence
export function getSavedInvestigations(): InvestigationReport[] {
  const raw = safeGetItem(INVESTIGATIONS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveInvestigation(report: InvestigationReport): boolean {
  const current = getSavedInvestigations();
  // Ensure we don't save duplicates and prepend the new one
  const filtered = current.filter((item) => item.id !== report.id);
  const updated = [report, ...filtered];
  return safeSetItem(INVESTIGATIONS_KEY, JSON.stringify(updated));
}

export function deleteInvestigation(id: string): boolean {
  const current = getSavedInvestigations();
  const updated = current.filter((item) => item.id !== id);
  return safeSetItem(INVESTIGATIONS_KEY, JSON.stringify(updated));
}

export function clearAllInvestigations(): boolean {
  try {
    localStorage.removeItem(INVESTIGATIONS_KEY);
    return true;
  } catch {
    return false;
  }
}

// Incident Notes Persistence
export function getIncidentNotes(): IncidentNote[] {
  const raw = safeGetItem(INCIDENT_NOTES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveIncidentNote(note: IncidentNote): boolean {
  const current = getIncidentNotes();
  const existingIndex = current.findIndex((n) => n.id === note.id);
  let updated: IncidentNote[];
  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = note;
  } else {
    updated = [note, ...current];
  }
  return safeSetItem(INCIDENT_NOTES_KEY, JSON.stringify(updated));
}

export function deleteIncidentNote(id: string): boolean {
  const current = getIncidentNotes();
  const updated = current.filter((n) => n.id !== id);
  return safeSetItem(INCIDENT_NOTES_KEY, JSON.stringify(updated));
}

export function clearAllIncidentNotes(): boolean {
  try {
    localStorage.removeItem(INCIDENT_NOTES_KEY);
    return true;
  } catch {
    return false;
  }
}

// User Settings Persistence
export function getUserSettings(): UserSettings {
  const raw = safeGetItem(SETTINGS_KEY);
  if (!raw) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveUserSettings(settings: UserSettings): boolean {
  return safeSetItem(SETTINGS_KEY, JSON.stringify(settings));
}
