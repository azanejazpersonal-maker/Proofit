import { AssessmentType, InvestigationReport } from '../types';

export function formatDateTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
}

export function getAssessmentLabel(assessment: AssessmentType): string {
  switch (assessment) {
    case 'high_risk_indicators':
      return 'HIGH DANGER: Looks Like A Scam';
    case 'some_warning_signs':
      return 'BE CAREFUL: Warning Signs Found';
    case 'insufficient_information':
      return 'NOT ENOUGH INFO: Need More Text';
    case 'no_obvious_warning_signs':
      return 'NO OBVIOUS RED FLAGS: Still Stay Alert';
    default:
      return 'Checking...';
  }
}

export function getAssessmentBadgeStyle(assessment: AssessmentType): {
  bg: string;
  text: string;
  border: string;
  dot: string;
} {
  switch (assessment) {
    case 'high_risk_indicators':
      return {
        bg: 'bg-red-950/40',
        text: 'text-red-400',
        border: 'border-red-600',
        dot: 'bg-red-500',
      };
    case 'some_warning_signs':
      return {
        bg: 'bg-amber-950/40',
        text: 'text-amber-400',
        border: 'border-amber-600',
        dot: 'bg-amber-500',
      };
    case 'insufficient_information':
      return {
        bg: 'bg-neutral-900',
        text: 'text-neutral-300',
        border: 'border-neutral-700',
        dot: 'bg-neutral-400',
      };
    case 'no_obvious_warning_signs':
      return {
        bg: 'bg-emerald-950/40',
        text: 'text-emerald-400',
        border: 'border-emerald-600',
        dot: 'bg-emerald-500',
      };
  }
}

export function generateShareableReportText(report: InvestigationReport): string {
  const divider = '========================================';
  const label = getAssessmentLabel(report.assessment).toUpperCase();

  const lines: string[] = [
    'PROOFIT SCAM REPORT',
    `Checked on: ${formatDateTime(report.createdAt)}`,
    divider,
    `RESULT: ${label}`,
    '',
    `SUMMARY:`,
    report.summary,
    '',
    divider,
    `WHAT LOOKS FISHY (${report.findings.length} warning signs):`,
  ];

  if (report.findings.length === 0) {
    lines.push('No obvious red flags detected in this text.');
  } else {
    report.findings.forEach((f, idx) => {
      lines.push('');
      lines.push(`${idx + 1}. ${f.title}`);
      lines.push(`   Quote: "${f.observedEvidence}"`);
      lines.push(`   Why it's bad: ${f.explanation}`);
      lines.push(`   What to do: ${f.recommendedAction}`);
    });
  }

  lines.push('');
  lines.push(divider);
  lines.push('WHAT YOU SHOULD DO:');
  report.recommendedActions.forEach((act, i) => lines.push(`${i + 1}. ${act}`));

  lines.push('');
  lines.push(divider);
  lines.push('Remember: Before you trust it, prove it with PROOFIT.');

  return lines.join('\n');
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback
    }
  }

  try {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(el);
    return successful;
  } catch (err) {
    console.warn('[PROOFIT Clipboard] Copy failed:', err);
    return false;
  }
}
