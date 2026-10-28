import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl text-xs sm:text-sm text-white transition-all"
    >
      {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
      {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
      {toast.type === 'info' && <Info className="w-4 h-4 text-white shrink-0" />}

      <span className="font-medium">{toast.text}</span>

      <button
        onClick={onDismiss}
        className="text-neutral-400 hover:text-white p-1 -mr-1 rounded transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
