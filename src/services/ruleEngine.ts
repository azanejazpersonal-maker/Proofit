import { AssessmentType, Finding, InvestigationReport, SeverityType } from '../types';

export function analyzeMessageLocally(text: string): InvestigationReport {
  const trimmed = text.trim();
  const id = `inv-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
  const createdAt = new Date().toISOString();

  const findings: Finding[] = [];
  const knownFacts: string[] = [];
  const unknowns: string[] = [];
  const recommendedActions: string[] = [];

  const extractSnippet = (pattern: RegExp): string => {
    const match = pattern.exec(trimmed);
    if (!match) return '';
    const start = Math.max(0, match.index - 20);
    const end = Math.min(trimmed.length, match.index + match[0].length + 25);
    const excerpt = trimmed.substring(start, end).trim();
    return (start > 0 ? '...' : '') + excerpt + (end < trimmed.length ? '...' : '');
  };

  // Rule 1: Paying Money First (Registration fee / deposit)
  const advanceFeeRegex =
    /(?:pay(?:ing)?\s+(?:a\s+)?(?:\$\d+|\d+\s*(?:dollars|usd|eur|gbp))\s+(?:registration|application|equipment|setup|processing|clearance|security|courier|holding|courier handling)\s*fee)|(?:registration\s*fee)|(?:processing\s*fee(?:\s*of\s*\$\d+)?)|(?:advance\s*(?:fee|payment))|(?:courier\s*(?:handling|delivery)\s*charge)|(?:redelivery\s*fee)/i;
  if (advanceFeeRegex.test(trimmed)) {
    const snippet = extractSnippet(advanceFeeRegex);
    findings.push({
      id: 'f-advance-fee',
      title: 'Asking You To Pay Money First',
      severity: 'high',
      confidence: 95,
      observedEvidence: snippet || 'Asks for an upfront fee or registration payment.',
      explanation:
        'Real companies and employers NEVER ask you to pay money to get a job, start work, or claim a prize. When a message asks for money upfront, it is almost always a scam trying to steal your cash.',
      limitations: 'Some official government websites have application fees, but you pay those on their real official website, never through a random text message.',
      recommendedAction:
        'Do NOT send any money or pay any fee. Ask yourself: why would a real employer charge you money to work for them?',
    });
    knownFacts.push('The message asks you to pay money before getting anything.');
  }

  // Rule 2: Rushing You With A Tight Timer
  const urgencyRegex =
    /(?:within\s+(?:15|30|45|60|\d+)\s*(?:mins?|minutes?|hours?|hrs?))|(?:expire(?:s)?\s*(?:in|within|today|immediately))|(?:immediately\s*to\s*secure)|(?:reply\s*within)|(?:act\s*now)|(?:temporary\s*suspension)|(?:account\s*(?:locked|frozen|suspended)\s*within)/i;
  if (urgencyRegex.test(trimmed)) {
    const snippet = extractSnippet(urgencyRegex);
    findings.push({
      id: 'f-artificial-urgency',
      title: 'Rushing You With A Tight Timer',
      severity: 'high',
      confidence: 90,
      observedEvidence: snippet || 'Uses a strict time limit like "within 15 minutes" or "expires today".',
      explanation:
        'Scammers use countdown timers and urgent words so you panic and act fast without stopping to think, ask someone, or check if it is real.',
      limitations: 'Real sales or package alerts can have dates, but legitimate employers give you several days to review an offer.',
      recommendedAction:
        'Take a deep breath and ignore the rush. Don’t let a stranger rush you into making a mistake.',
    });
    knownFacts.push('The sender is pressuring you with a short deadline.');
  }

  // Rule 3: Asking For Secrets, Passwords, PINs, or One-Time Codes
  const credentialRegex =
    /(?:one-time\s*(?:code|pin|password|token|otp))|(?:security\s*pin)|(?:verify\s*your\s*(?:credentials|password|card\s*details|ssn|social\s*security))|(?:confirm\s*your\s*card\s*details)|(?:scratch\s*off\s*the\s*backs?)/i;
  if (credentialRegex.test(trimmed)) {
    const snippet = extractSnippet(credentialRegex);
    findings.push({
      id: 'f-credential-harvesting',
      title: 'Asking For Your Secret Password or Code',
      severity: 'high',
      confidence: 95,
      observedEvidence: snippet || 'Asks for passwords, PINs, or one-time codes.',
      explanation:
        'Your bank, phone company, and gaming apps will NEVER ask you to text them your secret code or password. If you give them this, they can break into your account and steal your money.',
      limitations: 'Real apps only ask for codes when YOU opened the app yourself, never when a stranger texts you out of the blue.',
      recommendedAction:
        'Never share codes or passwords with anyone who sends you a message.',
    });
    knownFacts.push('The message asks for private codes or passwords.');
  }

  // Rule 4: Too Good To Be True / Huge Money for Little Work
  const financialPromiseRegex =
    /(?:paying\s+\$(?:[7-9],\d{3}|[1-9]\d{4,})\s*(?:per|\/)\s*(?:month|mo|week|day))|(?:\$(?:[7-9],\d{3}|[1-9]\d{4,})\s*(?:per|\/)\s*(?:month|mo|week|day))|(?:guaranteed\s*(?:daily|weekly|monthly)?\s*(?:return|profit|payout|yield))|(?:12(?:\.\d+)?%\s*daily)|(?:without\s*market\s*risk)|(?:yield(?:ing)?\s*\d+%\s*daily)/i;
  if (financialPromiseRegex.test(trimmed)) {
    const snippet = extractSnippet(financialPromiseRegex);
    findings.push({
      id: 'f-unrealistic-compensation',
      title: 'Too Good To Be True ($8,000+ for Simple Work)',
      severity: 'high',
      confidence: 92,
      observedEvidence: snippet || 'Promises huge money or guaranteed profits.',
      explanation:
        'If an offer sounds too good to be true, it almost always is. Nobody pays $8,000 a month for easy work from home without a real interview.',
      limitations: 'High-paying jobs exist, but they require years of training, background checks, and formal video interviews.',
      recommendedAction:
        'Search the real company website directly to see if this job actually exists.',
    });
    knownFacts.push('The message offers huge money to tempt you.');
  }

  // Rule 5: Gift Cards, Bitcoin, or Irreversible Payment
  const unusualPaymentRegex =
    /(?:apple|google\s*play|steam|amazon|target)\s*gift\s*cards?|(?:send\s*(?:usdt|btc|bitcoin|ethereum|crypto|funds)\s*to)|(?:crypto(?:currency)?\s*wallet)|(?:1[a-km-zA-HJ-NP-Z1-9]{25,34})|(?:0x[a-fA-F0-9]{40})/i;
  if (unusualPaymentRegex.test(trimmed)) {
    const snippet = extractSnippet(unusualPaymentRegex);
    findings.push({
      id: 'f-unconventional-payment',
      title: 'Asking For Gift Cards or Crypto',
      severity: 'high',
      confidence: 95,
      observedEvidence: snippet || 'Asks for gift cards, Bitcoin, or crypto transfer.',
      explanation:
        'Real businesses, police, and bosses NEVER ask you to buy Apple or Steam gift cards or send Bitcoin. Once you send gift card numbers, the money is gone and cannot be reversed.',
      limitations: 'Some tech stores accept crypto, but no real boss or government agency ever asks for gift cards.',
      recommendedAction:
        'Never buy gift cards for someone who contacts you online or by phone.',
    });
    knownFacts.push('The message demands payment through gift cards or crypto.');
  }

  // Rule 6: Won A Prize You Never Entered
  const prizeRegex =
    /(?:randomly\s*(?:chosen|selected)\s*(?:as|for)\s*(?:the\s*)?(?:winner|prize))|(?:won\s*(?:an?\s*)?(?:apple|macbook|iphone|tesla|\$|\bmillion\b))|(?:annual\s*tech\s*giveaway)|(?:claim\s*dept)|(?:sweepstakes\s*winner)/i;
  if (prizeRegex.test(trimmed)) {
    const snippet = extractSnippet(prizeRegex);
    findings.push({
      id: 'f-unsolicited-prize',
      title: 'Claims You Won A Contest You Never Entered',
      severity: 'medium',
      confidence: 88,
      observedEvidence: snippet || 'Claims you are a lucky winner.',
      explanation:
        'You cannot win a raffle, lottery, or giveaway that you never entered. Scammers claim you won so you pay a small "shipping" or "handling" fee that goes straight into their pocket.',
      limitations: 'If you actually entered a real school or store raffle, check with them in person.',
      recommendedAction:
        'Ask yourself: did I actually enter this contest? If not, delete the message.',
    });
    knownFacts.push('The sender claims you won a prize out of nowhere.');
  }

  // Rule 7: Suspicious or Fake Website Link
  const suspiciousUrlRegex =
    /(?:https?:\/\/[^\s]+(?:\.vip|\.top|\.click|\.buzz|\.icu|\.work|\.party|\.rest|\.ru)\b)|(?:chase-secure|wellsfargo-fraud|usps-track|gift-claim|apple-card-security|quantumarbitrage)/i;
  if (suspiciousUrlRegex.test(trimmed)) {
    const snippet = extractSnippet(suspiciousUrlRegex);
    findings.push({
      id: 'f-suspicious-domain',
      title: 'Sneaky or Fake Link Address',
      severity: 'high',
      confidence: 92,
      observedEvidence: snippet || 'Contains a fake-looking link name.',
      explanation:
        'The link in the message is not the real company’s website. Scammers use fake names like "usps-track-deliver.com" or "chase-secure-auth.net" to trick you into typing your password on their fake site.',
      limitations: 'Some short links are used by stores, but you should never click links sent by strangers.',
      recommendedAction:
        'Do NOT tap the link. Open your browser and type the real company website yourself.',
    });
    knownFacts.push('The link looks fake or different from the real company name.');
  }

  // Rule 8: Asking For Your Personal Info In A Message
  const personalDataRegex =
    /(?:reply\s*with\s*(?:your\s*)?personal\s*details)|(?:send\s*(?:your\s*)?(?:ssn|passport|id|driver'?s?\s*license|bank\s*details|address|full\s*name\s*and\s*age))/i;
  if (personalDataRegex.test(trimmed)) {
    const snippet = extractSnippet(personalDataRegex);
    findings.push({
      id: 'f-sensitive-data',
      title: 'Asking For Private Details in a Message',
      severity: 'medium',
      confidence: 85,
      observedEvidence: snippet || 'Asks for your personal info or ID.',
      explanation:
        'Sending your full name, home address, social security number, or photo ID in a text message is dangerous because bad guys can use it to steal your identity.',
      limitations: 'Real jobs do need your info, but they have you fill out real official paperwork after you meet them.',
      recommendedAction:
        'Do not reply with private information until you are 100% sure who you are talking to.',
    });
    knownFacts.push('The message asks you to text back your private details.');
  }

  // Rule 9: Telling You To Switch To Telegram or WhatsApp
  const diversionRegex =
    /(?:contact\s*me\s*on\s*(?:telegram|whatsapp|signal))|(?:offsite\s*partner\s*summit)|(?:do\s*not\s*tell)|(?:confidential\s*favor)|(?:direct\s*message\s*for\s*referral)/i;
  if (diversionRegex.test(trimmed)) {
    const snippet = extractSnippet(diversionRegex);
    findings.push({
      id: 'f-channel-diversion',
      title: 'Telling You To Chat On A Different App',
      severity: 'medium',
      confidence: 80,
      observedEvidence: snippet || 'Tells you to move the conversation to Telegram or WhatsApp.',
      explanation:
        'Scammers move you to chat apps like Telegram because those chats can be deleted and are harder to trace when you realize you were tricked.',
      limitations: 'Some friends chat on these apps, but real business hiring is done through official company email.',
      recommendedAction:
        'Ask the person to send an email from their real company email address.',
    });
  }

  // Identify Unknowns & Missing Evidence
  unknowns.push('We cannot tell who actually sent this message from text alone.');
  unknowns.push('We do not know if the real company even knows someone is sending this in their name.');
  unknowns.push('The sender’s true phone number or computer location is hidden.');

  // Determine Overall Assessment based on findings
  let assessment: AssessmentType = 'no_obvious_warning_signs';
  let summary = '';

  const highSeverityCount = findings.filter((f) => f.severity === 'high').length;
  const mediumSeverityCount = findings.filter((f) => f.severity === 'medium').length;

  if (highSeverityCount >= 2 || (highSeverityCount >= 1 && mediumSeverityCount >= 1)) {
    assessment = 'high_risk_indicators';
    summary = `Danger: We found ${findings.length} major red flags in this message. It looks very much like a scam. Do not pay any money or send your details.`;
  } else if (highSeverityCount === 1 || mediumSeverityCount >= 1) {
    assessment = 'some_warning_signs';
    summary = `Be Careful: We noticed some suspicious things in this message. Take your time and check with someone you trust before replying.`;
  } else if (trimmed.length < 25) {
    assessment = 'insufficient_information';
    summary = `This message is too short to tell. Please paste the full message so we can check it properly.`;
  } else {
    assessment = 'no_obvious_warning_signs';
    summary = `We didn’t spot any obvious scam tricks in this text. But remember: smart scammers can still trick people, so never send money or passwords to strangers!`;
  }

  // Safe Next Steps in plain English
  if (assessment === 'high_risk_indicators' || assessment === 'some_warning_signs') {
    recommendedActions.push('Do NOT send any money, gift cards, or crypto.');
    recommendedActions.push('Do NOT share passwords, codes, or private details.');
    recommendedActions.push('Do NOT click links in the message. If it claims to be from a real company, go to their real website on your own.');
    recommendedActions.push('Talk to a trusted friend, family member, or coworker before doing anything.');
  } else {
    recommendedActions.push('Always check who is really messaging you before sharing anything private.');
    recommendedActions.push('Look closely at links before tapping them.');
    recommendedActions.push('A real company will never get angry at you for double-checking if a message is real.');
  }

  if (knownFacts.length === 0) {
    knownFacts.push(`You pasted a message with ${trimmed.length} characters.`);
  }

  return {
    id,
    createdAt,
    title: generateSimpleTitle(trimmed, findings),
    type: 'message',
    rawInputSnippet: trimmed.length > 280 ? trimmed.substring(0, 277) + '...' : trimmed,
    assessment,
    summary,
    findings,
    knownFacts,
    unknowns,
    recommendedActions,
    disclaimer:
      'This tool gives advice based on what is written in the message. It is not legal or police advice. Even if a message looks clean, always use common sense!',
    analysisMode: 'rule_based_heuristics',
    metadata: {
      charCount: trimmed.length,
    },
  };
}

function generateSimpleTitle(text: string, findings: Finding[]): string {
  const lower = text.toLowerCase();
  if (lower.includes('job') || lower.includes('position') || lower.includes('per month')) {
    return 'Check: Suspicious Job Offer';
  }
  if (lower.includes('package') || lower.includes('delivery') || lower.includes('usps') || lower.includes('fedex')) {
    return 'Check: Package Delivery Text';
  }
  if (lower.includes('bank') || lower.includes('wells fargo') || lower.includes('chase') || lower.includes('security alert')) {
    return 'Check: Bank Security Warning';
  }
  if (lower.includes('winner') || lower.includes('giveaway') || lower.includes('prize') || lower.includes('claim')) {
    return 'Check: Prize Giveaway Message';
  }
  if (lower.includes('crypto') || lower.includes('return') || lower.includes('arbitrage') || lower.includes('invest')) {
    return 'Check: Get-Rich-Quick Investment';
  }
  if (lower.includes('gift card') || lower.includes('ceo') || lower.includes('urgent favor')) {
    return 'Check: Boss / Gift Card Request';
  }
  if (lower.includes('charity') || lower.includes('earthquake') || lower.includes('disaster') || lower.includes('donate')) {
    return 'Check: Emergency Donation Request';
  }

  if (findings.length > 0) {
    return `Check: ${findings[0].title}`;
  }
  return 'Check: Message Analysis';
}
