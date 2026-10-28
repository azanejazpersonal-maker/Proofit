import React, { useState, useRef } from 'react';
import { SAMPLE_CASES, SampleCase, SAMPLE_JOB_OFFER_TEXT } from '../data/sampleCases';
import {
  FileText,
  Image as ImageIcon,
  Play,
  Gamepad2,
  ArrowRight,
  Upload,
  X,
  AlertCircle,
  ShieldCheck,
  Lock,
  Search,
} from 'lucide-react';

interface InvestigationInputProps {
  onAnalyzeMessage: (text: string) => void;
  onAnalyzeScreenshot: (base64: string, mimeType: string, filename: string) => void;
  onSelectTab: (tab: string) => void;
  isLoading: boolean;
  error: string | null;
  onClearError: () => void;
  initialText?: string;
}

export const InvestigationInput: React.FC<InvestigationInputProps> = ({
  onAnalyzeMessage,
  onAnalyzeScreenshot,
  onSelectTab,
  isLoading,
  error,
  onClearError,
  initialText = '',
}) => {
  const [activeMode, setActiveMode] = useState<'text' | 'screenshot'>('text');
  const [messageText, setMessageText] = useState<string>(initialText);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_CHAR_COUNT = 10000;
  const charCount = messageText.length;
  const isOverLimit = charCount > MAX_CHAR_COUNT;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value);
    if (error) onClearError();
  };

  const handleClear = () => {
    setMessageText('');
    if (error) onClearError();
  };

  const handleSelectSample = (sample: SampleCase) => {
    setMessageText(sample.text);
    if (error) onClearError();
  };

  const handleSubmitText = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = messageText.trim();
    if (!trimmed || isOverLimit || isLoading) return;
    onAnalyzeMessage(trimmed);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setFileError('Please choose a PNG, JPEG, or WebP picture.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setFileError('Picture is too large (over 8MB). Please choose a smaller picture.');
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmitScreenshot = () => {
    if (!selectedFile || isLoading) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      if (base64Data) {
        onAnalyzeScreenshot(base64Data, selectedFile.type, selectedFile.name);
      }
    };
    reader.onerror = () => {
      setFileError('Could not read this picture. Please try another one.');
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Clear Explanation Card for Beginners & Kids */}
      <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>What Is PROOFIT?</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Is That Message A Scam? Let’s Check It.
        </h1>

        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
          Did someone text you asking for money, gift cards, or your password? Don’t panic.
          Paste the message below, and we will tell you in plain English if it looks like a scam, what looks fishy, and what you should do next.
        </p>

        {/* 2 Big Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onAnalyzeMessage(SAMPLE_JOB_OFFER_TEXT)}
            className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-black bg-white hover:bg-neutral-200 active:scale-[0.98] transition-all rounded-lg shadow-sm"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>Try An Example (Fake $8,000/mo Job Offer)</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>

          <button
            onClick={() => onSelectTab('challenge')}
            className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-neutral-800 hover:bg-neutral-700 active:scale-[0.98] border border-neutral-700 transition-all rounded-lg"
          >
            <Gamepad2 className="w-4 h-4 text-white" />
            <span>Play "Spot the Scam" Game</span>
          </button>
        </div>
      </div>

      {/* Main Checking Box */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 sm:p-7 space-y-5">
        {/* Method Switcher */}
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
          <button
            onClick={() => setActiveMode('text')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeMode === 'text'
                ? 'bg-white text-black'
                : 'text-neutral-400 hover:text-white bg-neutral-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Paste Text Message</span>
          </button>
          <button
            onClick={() => setActiveMode('screenshot')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeMode === 'screenshot'
                ? 'bg-white text-black'
                : 'text-neutral-400 hover:text-white bg-neutral-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Upload Screenshot</span>
          </button>
        </div>

        {/* Global Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-700 text-red-200 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1 flex-1">
              <span className="font-bold">Notice:</span>
              <p className="leading-relaxed">{error}</p>
            </div>
            <button onClick={onClearError} className="text-red-400 hover:text-red-200 p-0.5">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Mode A: Text Input */}
        {activeMode === 'text' && (
          <form onSubmit={handleSubmitText} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <label htmlFor="message-input" className="font-bold text-white">
                  Paste the text or email here:
                </label>
                <span className={`font-mono text-[11px] ${isOverLimit ? 'text-red-400 font-bold' : 'text-neutral-500'}`}>
                  {charCount} / {MAX_CHAR_COUNT} letters
                </span>
              </div>

              <textarea
                id="message-input"
                rows={6}
                value={messageText}
                onChange={handleTextChange}
                placeholder="Example: 'Congratulations! You won a brand new iPhone. Click this link and pay $5 shipping to claim it now!'"
                className="w-full p-4 text-sm bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all font-sans leading-relaxed resize-y"
              />
            </div>

            {/* Quick Click Examples */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Or click one of these real scam examples to test:
              </div>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_CASES.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className="px-3 py-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors text-left"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-850">
              <button
                type="button"
                onClick={handleClear}
                disabled={!messageText || isLoading}
                className="px-3 py-2 text-xs font-semibold text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
              >
                Clear Box
              </button>

              <button
                type="submit"
                disabled={!messageText.trim() || isOverLimit || isLoading}
                className="flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-black bg-white hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all shadow-sm"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Checking Message...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Check This Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Mode B: Screenshot Upload */}
        {activeMode === 'screenshot' && (
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
            />

            {!previewUrl ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 border-2 border-dashed border-neutral-800 hover:border-neutral-600 rounded-xl text-center cursor-pointer transition-colors bg-neutral-900/40 space-y-3"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-neutral-800 flex items-center justify-center text-white">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">
                    Click to choose a screenshot picture
                  </div>
                  <div className="text-xs text-neutral-400">
                    Supports PNG, JPEG, WebP pictures (under 8MB)
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 border border-neutral-800 rounded-xl bg-neutral-900 space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-2">
                  <span className="font-mono truncate max-w-[260px] text-white">
                    {selectedFile?.name}
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="flex items-center gap-1 text-red-400 hover:text-red-300 text-xs font-semibold"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Remove Picture</span>
                  </button>
                </div>

                <div className="max-h-72 overflow-hidden rounded-lg border border-neutral-800 flex items-center justify-center bg-black">
                  <img
                    src={previewUrl}
                    alt="Screenshot preview"
                    className="max-h-72 object-contain"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2 text-xs font-semibold text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                  >
                    Change Picture
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitScreenshot}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold text-black bg-white hover:bg-neutral-200 rounded-lg transition-all"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Checking Picture...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        <span>Check Screenshot</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {fileError && (
              <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-600 text-amber-200 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>{fileError}</p>
                  <button
                    onClick={() => setActiveMode('text')}
                    className="text-white underline font-semibold text-xs block"
                  >
                    Or just copy and paste the text instead →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Safety Note */}
        <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-300">
          <Lock className="w-4 h-4 text-white shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Safety Rule:</strong> Never send passwords, PIN codes, or bank card numbers into any tool. Remove them before pasting!
          </p>
        </div>
      </div>

      {/* 4 Super Simple Steps */}
      <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
        <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-white" />
          <span>How It Works In 4 Easy Steps</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
            <div className="text-xs font-bold text-white">1. Paste Message</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Copy any text or email that feels weird or suspicious.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
            <div className="text-xs font-bold text-white">2. Spot Red Flags</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We look for countdown timers, money requests, and fake links.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
            <div className="text-xs font-bold text-white">3. See The Proof</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We highlight the exact suspicious words and explain why they are risky.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
            <div className="text-xs font-bold text-white">4. Stay Safe</div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Follow our simple advice so you never lose your money or account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
