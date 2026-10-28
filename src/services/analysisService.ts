import { InvestigationReport } from '../types';
import { analyzeMessageLocally } from './ruleEngine';

export interface ApiStatus {
  aiAvailable: boolean;
  model: string;
  mode: string;
}

export async function getApiStatus(): Promise<ApiStatus> {
  try {
    const res = await fetch('/api/status', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('API status unavailable');
    return await res.json();
  } catch {
    return {
      aiAvailable: false,
      model: 'local-heuristics-engine',
      mode: 'local_heuristics_fallback',
    };
  }
}

export async function runMessageInvestigation(
  text: string,
  preferredEngine: 'auto' | 'local_only' = 'auto'
): Promise<InvestigationReport> {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error('Please enter text to investigate.');
  }

  // If user requested local only, bypass network directly
  if (preferredEngine === 'local_only') {
    return analyzeMessageLocally(trimmed);
  }

  // Attempt server-side Gemini analysis
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

    const res = await fetch('/api/analyze/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: trimmed }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data: InvestigationReport = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('[PROOFIT Analysis] Server AI unavailable, utilizing local heuristic engine:', err);
  }

  // Resilient fallback to local rule-based analysis
  return analyzeMessageLocally(trimmed);
}

export async function runScreenshotInvestigation(
  imageBase64: string,
  mimeType: string
): Promise<{ success: boolean; report?: InvestigationReport; error?: string; requiresTextFallback?: boolean }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const res = await fetch('/api/analyze/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageBase64, mimeType }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const report: InvestigationReport = await res.json();
      return { success: true, report };
    }

    const errorData = await res.json().catch(() => ({}));
    if (res.status === 503 || errorData.error === 'AI_UNAVAILABLE') {
      return {
        success: false,
        requiresTextFallback: true,
        error:
          'Multimodal screenshot analysis requires active Gemini API credentials. Please paste the visible text from the screenshot into the Message Analyzer below for instant local rule-based investigation.',
      };
    }

    return {
      success: false,
      error: errorData.message || 'Screenshot analysis failed. Please try extracting text into the Message Analyzer.',
    };
  } catch {
    return {
      success: false,
      requiresTextFallback: true,
      error:
        'Server screenshot endpoint is not accessible. You can paste the text from your screenshot directly into the Message Analyzer to run a full local investigation.',
    };
  }
}
