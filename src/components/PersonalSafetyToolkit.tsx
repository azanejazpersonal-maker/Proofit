import React, { useState } from 'react';
import { IncidentNote } from '../types';
import {
  Briefcase,
  Heart,
  KeyRound,
  FileEdit,
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Lock,
} from 'lucide-react';

interface PersonalSafetyToolkitProps {
  incidentNotes: IncidentNote[];
  onSaveNote: (note: IncidentNote) => void;
  onDeleteNote: (id: string) => void;
  onClearNotes: () => void;
  onShowToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

export const PersonalSafetyToolkit: React.FC<PersonalSafetyToolkitProps> = ({
  incidentNotes,
  onSaveNote,
  onDeleteNote,
  onClearNotes,
  onShowToast,
}) => {
  const [activeTool, setActiveTool] = useState<'job' | 'charity' | 'security' | 'notes'>('job');

  // Tool A: Job Offer Checker State
  const [jobAnswers, setJobAnswers] = useState<{ [key: string]: boolean }>({
    verifiedCompany: false,
    careersPageListing: false,
    officialEmail: false,
    noUpfrontFee: true,
    realisticPay: true,
    noDeadlinePressure: true,
  });

  // Tool B: Charity Verification Checklist State
  const [charityChecks, setCharityChecks] = useState<{ [key: string]: boolean }>({
    registryNumber: false,
    officialGateway: false,
    auditedFinancials: false,
    nonPersonalPayee: false,
    historicalPresence: false,
  });

  // Tool C: Account Security Checklist State
  const [securityChecks, setSecurityChecks] = useState<{ [key: string]: boolean }>({
    hardwareMfa: false,
    uniquePassword: false,
    sessionReview: false,
    contactVerification: false,
    spamReporting: false,
  });

  // Tool D: Incident Notes Form State
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteForm, setNoteForm] = useState({
    title: '',
    category: 'Job Scam' as IncidentNote['category'],
    date: new Date().toISOString().split('T')[0],
    notes: '',
    status: 'Investigating' as IncidentNote['status'],
  });

  // Job Evaluation Logic in simple words
  const calculateJobRisk = () => {
    let riskScore = 0;
    const reasons: string[] = [];

    if (!jobAnswers.noUpfrontFee) {
      riskScore += 4;
      reasons.push('They asked you for money first. Real jobs never charge you to work for them!');
    }
    if (!jobAnswers.noDeadlinePressure) {
      riskScore += 2;
      reasons.push('They are rushing you with a short countdown timer.');
    }
    if (!jobAnswers.realisticPay) {
      riskScore += 2;
      reasons.push('The salary is way too high for simple work. That is usually bait.');
    }
    if (!jobAnswers.officialEmail) {
      riskScore += 1.5;
      reasons.push('They are messaging from a random Gmail or Telegram instead of a real company email.');
    }
    if (!jobAnswers.careersPageListing) {
      riskScore += 1;
      reasons.push('This job cannot be found on the company’s real website.');
    }
    if (!jobAnswers.verifiedCompany) {
      riskScore += 2;
      reasons.push('You cannot find proof that this company actually exists.');
    }

    return { riskScore, reasons };
  };

  const jobResult = calculateJobRisk();

  const handleStartAddNote = () => {
    setNoteForm({
      title: '',
      category: 'Job Scam',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      status: 'Investigating',
    });
    setEditingNoteId(null);
    setIsAddingNote(true);
  };

  const handleStartEditNote = (note: IncidentNote) => {
    setNoteForm({
      title: note.title,
      category: note.category,
      date: note.date,
      notes: note.notes,
      status: note.status,
    });
    setEditingNoteId(note.id);
    setIsAddingNote(true);
  };

  const handleSaveNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteForm.title.trim()) {
      onShowToast('Please type a title for this note.', 'error');
      return;
    }

    const newNote: IncidentNote = {
      id: editingNoteId || `inc-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      title: noteForm.title.trim(),
      category: noteForm.category,
      date: noteForm.date,
      notes: noteForm.notes.trim(),
      status: noteForm.status,
      updatedAt: new Date().toISOString(),
    };

    onSaveNote(newNote);
    setIsAddingNote(false);
    setEditingNoteId(null);
    onShowToast('Note saved!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Safety Checklists</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Simple Safety Checklists
        </h2>
        <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
          Quick checklists to check if a job offer is real, if a charity is honest, or to write down your own notes.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-neutral-950 rounded-xl border border-neutral-800">
        <button
          onClick={() => setActiveTool('job')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTool === 'job'
              ? 'bg-white text-black shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Job Offer Checker</span>
        </button>

        <button
          onClick={() => setActiveTool('charity')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTool === 'charity'
              ? 'bg-white text-black shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Charity Checker</span>
        </button>

        <button
          onClick={() => setActiveTool('security')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTool === 'security'
              ? 'bg-white text-black shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Account Safety</span>
        </button>

        <button
          onClick={() => setActiveTool('notes')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeTool === 'notes'
              ? 'bg-white text-black shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <FileEdit className="w-3.5 h-3.5" />
          <span>My Scam Notes ({incidentNotes.length})</span>
        </button>
      </div>

      {/* Tool A: Job Offer Checker */}
      {activeTool === 'job' && (
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-5">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-white" />
              <span>Check A Job Offer</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Answer these simple questions about the job offer:
            </p>
          </div>

          <div className="space-y-2.5">
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={jobAnswers.verifiedCompany}
                onChange={(e) => setJobAnswers({ ...jobAnswers, verifiedCompany: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">Can you find the company on Google or LinkedIn?</div>
                <p className="text-neutral-400">They have a real website, real employees, and an address you can find on Google Maps.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={jobAnswers.careersPageListing}
                onChange={(e) => setJobAnswers({ ...jobAnswers, careersPageListing: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">Is this job listed on their real website?</div>
                <p className="text-neutral-400">If you go to company.com/careers, you can see the exact same job listing there.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={jobAnswers.officialEmail}
                onChange={(e) => setJobAnswers({ ...jobAnswers, officialEmail: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">Did they email from a real company email address?</div>
                <p className="text-neutral-400">Their email ends in @company.com, NOT @gmail.com or a weird Telegram chat.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={jobAnswers.noUpfrontFee}
                onChange={(e) => setJobAnswers({ ...jobAnswers, noUpfrontFee: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">They did NOT ask you to pay any money or deposit a check</div>
                <p className="text-neutral-400">They did not ask for a $50 "laptop fee", "registration fee", or send a fake check.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={jobAnswers.realisticPay}
                onChange={(e) => setJobAnswers({ ...jobAnswers, realisticPay: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">The pay makes sense for the work</div>
                <p className="text-neutral-400">They are NOT offering $8,000 a month for simple copy-pasting from home.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={jobAnswers.noDeadlinePressure}
                onChange={(e) => setJobAnswers({ ...jobAnswers, noDeadlinePressure: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">They give you time to read and think</div>
                <p className="text-neutral-400">They are NOT telling you "you have 15 minutes to accept or it expires!"</p>
              </div>
            </label>
          </div>

          {/* Result */}
          <div
            className={`p-4 rounded-xl border ${
              jobResult.riskScore >= 4
                ? 'bg-red-950/40 border-red-600'
                : jobResult.riskScore >= 2
                ? 'bg-amber-950/40 border-amber-600'
                : 'bg-emerald-950/40 border-emerald-600'
            } space-y-2`}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
              {jobResult.riskScore >= 4 ? (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              ) : jobResult.riskScore >= 2 ? (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              <span
                className={
                  jobResult.riskScore >= 4
                    ? 'text-red-400'
                    : jobResult.riskScore >= 2
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }
              >
                {jobResult.riskScore >= 4
                  ? 'HIGH DANGER: Very Likely A Fake Job Scam!'
                  : jobResult.riskScore >= 2
                  ? 'Be Careful: Some Fishy Signs Found'
                  : 'Looks Good: No Obvious Red Flags'}
              </span>
            </div>

            {jobResult.reasons.length > 0 && (
              <ul className="space-y-1 text-xs text-neutral-300 pl-5 list-disc">
                {jobResult.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Tool B: Charity Verification */}
      {activeTool === 'charity' && (
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-white" />
              <span>Charity Donation Checklist</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Before giving money to an emergency appeal on social media, check these 5 rules:
            </p>
          </div>

          <div className="space-y-2.5">
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={charityChecks.registryNumber}
                onChange={(e) => setCharityChecks({ ...charityChecks, registryNumber: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">1. They have an official charity registration number</div>
                <p className="text-neutral-400">Real non-profits have a government tax ID (like a 501c3 number) you can look up.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={charityChecks.officialGateway}
                onChange={(e) => setCharityChecks({ ...charityChecks, officialGateway: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">2. You donate on their real website directly</div>
                <p className="text-neutral-400">You typed the charity's name in your browser, rather than clicking a random comment link.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={charityChecks.nonPersonalPayee}
                onChange={(e) => setCharityChecks({ ...charityChecks, nonPersonalPayee: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">3. Money does NOT go to a person's CashApp, Venmo, or Bitcoin</div>
                <p className="text-neutral-400">Real charities use secure credit card checkouts in their official name, not random personal handles.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={charityChecks.auditedFinancials}
                onChange={(e) => setCharityChecks({ ...charityChecks, auditedFinancials: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">4. Rated on Charity Navigator or GuideStar</div>
                <p className="text-neutral-400">Public ratings show what percentage of donations actually reach people in need.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={charityChecks.historicalPresence}
                onChange={(e) => setCharityChecks({ ...charityChecks, historicalPresence: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">5. They existed before the news broke today</div>
                <p className="text-neutral-400">The account wasn't created 2 hours after a storm or earthquake happened.</p>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Tool C: Account Safety */}
      {activeTool === 'security' && (
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-white" />
              <span>5 Rules To Keep Your Accounts Safe</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Simple habits that stop 99% of hackers:
            </p>
          </div>

          <div className="space-y-2.5">
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={securityChecks.hardwareMfa}
                onChange={(e) => setSecurityChecks({ ...securityChecks, hardwareMfa: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">1. Never share your secret one-time code</div>
                <p className="text-neutral-400">If a code pops up on your phone saying "Do not share this code with anyone", BELIEVE IT!</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={securityChecks.uniquePassword}
                onChange={(e) => setSecurityChecks({ ...securityChecks, uniquePassword: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">2. Use different passwords for important accounts</div>
                <p className="text-neutral-400">Never use the same password for your primary email, your bank, and random gaming forums.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={securityChecks.sessionReview}
                onChange={(e) => setSecurityChecks({ ...securityChecks, sessionReview: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">3. Don't click links in texts claiming your bank is locked</div>
                <p className="text-neutral-400">Always open your official banking app directly from your phone's home screen instead.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={securityChecks.contactVerification}
                onChange={(e) => setSecurityChecks({ ...securityChecks, contactVerification: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">4. Call the number on the back of your bank card</div>
                <p className="text-neutral-400">If anyone calls claiming to be your bank fraud team, hang up and dial the official phone number on your card.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer">
              <input
                type="checkbox"
                checked={securityChecks.spamReporting}
                onChange={(e) => setSecurityChecks({ ...securityChecks, spamReporting: e.target.checked })}
                className="mt-0.5 rounded text-white bg-black border-neutral-700"
              />
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-white">5. Forward spam texts to 7726 (SPAM)</div>
                <p className="text-neutral-400">Your cell phone carrier blocks the spammer so other people won't get tricked.</p>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* Tool D: Incident Notes */}
      {activeTool === 'notes' && (
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileEdit className="w-4 h-4 text-white" />
                <span>My Scam Notes</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Write down what happened if someone tried to scam you so you remember the details:
              </p>
            </div>

            <div className="flex items-center gap-2">
              {incidentNotes.length > 0 && !isAddingNote && (
                <button
                  onClick={onClearNotes}
                  className="px-3 py-1.5 text-xs text-red-400 hover:bg-red-950/40 rounded-lg border border-red-800 transition-colors"
                >
                  Clear All Notes
                </button>
              )}
              {!isAddingNote && (
                <button
                  onClick={handleStartAddNote}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-black bg-white hover:bg-neutral-200 rounded-lg transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Write A Note</span>
                </button>
              )}
            </div>
          </div>

          {/* Privacy Warning */}
          <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-300">
            <Lock className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Notes are saved on this phone/computer only. Never type real passwords or credit card numbers here!
            </p>
          </div>

          {/* Add / Edit Form */}
          {isAddingNote && (
            <form onSubmit={handleSaveNoteSubmit} className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                {editingNoteId ? 'Edit Note' : 'Add A New Note'}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs text-neutral-300 font-bold">What happened? (Title):</label>
                  <input
                    type="text"
                    required
                    value={noteForm.title}
                    onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                    placeholder="e.g. Strange text from unknown number asking for $50"
                    className="w-full px-3 py-2 text-xs bg-black border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-bold">Date:</label>
                  <input
                    type="date"
                    required
                    value={noteForm.date}
                    onChange={(e) => setNoteForm({ ...noteForm, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-black border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-bold">Type:</label>
                  <select
                    value={noteForm.category}
                    onChange={(e) => setNoteForm({ ...noteForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-black border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-white"
                  >
                    <option value="Job Scam">Fake Job Offer</option>
                    <option value="Phishing / SMS">Fake Text / Email</option>
                    <option value="Account Takeover">Someone Tried To Take My Account</option>
                    <option value="Investment">Fake Investment / Crypto</option>
                    <option value="Marketplace">Online Shopping Scam</option>
                    <option value="Other">Other Strange Message</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-bold">Status:</label>
                  <select
                    value={noteForm.status}
                    onChange={(e) => setNoteForm({ ...noteForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-black border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-white"
                  >
                    <option value="Investigating">Checking it</option>
                    <option value="Contained">Blocked them</option>
                    <option value="Reported">Reported to bank/police</option>
                    <option value="Resolved">All safe now</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-300 font-bold">Your Notes:</label>
                <textarea
                  rows={4}
                  value={noteForm.notes}
                  onChange={(e) => setNoteForm({ ...noteForm, notes: e.target.value })}
                  placeholder="Write down phone numbers, email addresses, or what you did (e.g. 'I blocked the number and told my boss')..."
                  className="w-full p-3 text-xs bg-black border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-white leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNote(false);
                    setEditingNoteId(null);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-black bg-white hover:bg-neutral-200 rounded-lg"
                >
                  Save Note
                </button>
              </div>
            </form>
          )}

          {/* Notes List */}
          {incidentNotes.length === 0 && !isAddingNote ? (
            <div className="p-8 text-center rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <p className="text-xs text-neutral-400">No notes written yet.</p>
              <button
                onClick={handleStartAddNote}
                className="text-xs text-white underline font-bold"
              >
                Click here to write your first note →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {incidentNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <span className="font-bold text-white">{note.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{note.date}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                          {note.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{note.title}</h4>
                    </div>

                    <div className="flex items-center gap-1 text-neutral-400">
                      <button
                        onClick={() => handleStartEditNote(note)}
                        className="p-1.5 hover:text-white rounded"
                        title="Edit note"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onDeleteNote(note.id);
                          onShowToast('Note deleted.', 'info');
                        }}
                        className="p-1.5 hover:text-red-400 rounded"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {note.notes && (
                    <p className="text-xs text-neutral-300 leading-relaxed bg-black p-3 rounded-lg border border-neutral-800 whitespace-pre-wrap">
                      {note.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
