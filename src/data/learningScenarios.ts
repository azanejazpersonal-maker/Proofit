import { QuizScenario } from '../types';

export const LEARNING_SCENARIOS: QuizScenario[] = [
  {
    id: 'scenario-bank-alert',
    scenarioTitle: 'Case 1: The Urgent Security SMS',
    category: 'Credential Harvesting',
    messageText:
      'WELLS FARGO ALERT: An unauthorized debit of $849.20 was attempted at Target Store #491. If this was not you, confirm your card details and security PIN at https://wellsfargo-fraud-case49.com/resolve to cancel within 15 mins.',
    question: 'What is the strongest, most critical warning sign in this message?',
    options: [
      {
        id: 'opt-1a',
        text: 'The dollar amount of $849.20 is an odd number.',
        isCorrect: false,
        feedback: 'Incorrect. Legitimate retailer charges regularly include specific odd dollar and cent amounts; the exact dollar amount is not evidence of fraud.',
      },
      {
        id: 'opt-1b',
        text: 'The link directs to an unverified domain ("wellsfargo-fraud-case49.com") demanding PIN entry under urgent pressure.',
        isCorrect: true,
        feedback: 'Correct! Banks never host official account resolution tools on third-party hyphenated domains, and legitimate fraud departments will never request your secret card PIN via a web link.',
      },
      {
        id: 'opt-1c',
        text: 'The text references Target Store #491.',
        isCorrect: false,
        feedback: 'Incorrect. Scammers frequently cite real store numbers copied from receipts to make false alerts seem plausible, but this is a distraction rather than the primary red flag.',
      },
    ],
    keyConcept: 'Domain Spoofing & Credential Harvesting',
    educationalTakeaway:
      'Look past the alarming narrative and examine the destination domain. Real financial institutions manage disputes within their official banking app or the verified domain (e.g. wellsfargo.com), never on auxiliary lookalike domains requesting private PINs.',
  },
  {
    id: 'scenario-remote-job',
    scenarioTitle: 'Case 2: The High-Paying Remote Assistant',
    category: 'Employment Scams',
    messageText:
      'Hello! Apex Global Logistics reviewed your resume. We offer you the position of Remote Operations Assistant at $52/hr (20 hrs/week). We will email you a $2,400 digital check to purchase designated Apple hardware from our approved supplier. Deposit the check and wire the remaining equipment balance.',
    question: 'Why does this offer present immediate, severe risk?',
    options: [
      {
        id: 'opt-2a',
        text: 'The company uses Apple hardware instead of Windows.',
        isCorrect: false,
        feedback: 'Incorrect. Many companies provide Apple computers to employees; hardware preference has no bearing on authenticity.',
      },
      {
        id: 'opt-2b',
        text: 'The employer is having the applicant deposit an upfront check and wire money to an unverified "vendor".',
        isCorrect: true,
        feedback: 'Correct! This is the hallmark of the fake check / advance-fee employment scam. The digital check will initially seem to clear under federal availability rules, but will inevitably bounce days later, leaving the victim liable for all wired funds.',
      },
      {
        id: 'opt-2c',
        text: 'The hourly pay rate is $52/hr.',
        isCorrect: false,
        feedback: 'Incorrect. While generous compensation is an incentive hook, high pay alone does not constitute fraud; the mechanism of laundering an unverified check is the critical danger.',
      },
    ],
    keyConcept: 'Fake Check / Advance-Fee Employment Fraud',
    educationalTakeaway:
      'Legitimate employers ship pre-configured corporate equipment directly to you or reimburse verified expenses through standard payroll. Never accept a check from an unverified stranger with instructions to forward or wire back part of the funds.',
  },
  {
    id: 'scenario-vendor-invoice',
    scenarioTitle: 'Case 3: The Updated Wire Instructions',
    category: 'Business Email Compromise',
    messageText:
      'From: billing@apex-industries-invoices.com\nSubject: Invoice #8849 - Updated Banking Details\n\nHi Team, please find attached our final invoice for October consulting. Please note our primary bank account is undergoing annual audit. Remit this payment to our interim beneficiary routing number: 021000021, Account: 994829104.',
    question: 'What is the most prudent immediate action for this invoice?',
    options: [
      {
        id: 'opt-3a',
        text: 'Execute the wire immediately so late fees are not incurred by the company.',
        isCorrect: false,
        feedback: 'Incorrect. Changing payment routing details based solely on an unverified email is the primary vulnerability exploited in Business Email Compromise (BEC).',
      },
      {
        id: 'opt-3b',
        text: 'Reply directly to the email asking the sender to confirm if their audit is legitimate.',
        isCorrect: false,
        feedback: 'Incorrect. If the email account or domain is compromised, the attacker controlling that inbox will simply reply confirming the fake details.',
      },
      {
        id: 'opt-3c',
        text: 'Pause the payment and authenticate the account change via an established secondary channel (e.g. call a known phone number from the original contract).',
        isCorrect: true,
        feedback: 'Correct! Any out-of-band banking detail modification must be verified via an established, previously trusted voice phone number or in-person confirmation, never by trusting the sender in the incoming email.',
      },
    ],
    keyConcept: 'Out-of-Band Payment Verification',
    educationalTakeaway:
      'In Business Email Compromise, attackers monitor email threads or register lookalike domains. Never update vendor bank details without dual-authorization and a verbal phone confirmation to a previously vetted contact.',
  },
  {
    id: 'scenario-insufficient-info',
    scenarioTitle: 'Case 4: The Unfamiliar Professional Invitation',
    category: 'Uncertainty & Verification',
    messageText:
      'Hi Sarah, I saw your design portfolio on Behance and would love to explore a potential brand identity collaboration for a European client. Are you available for a brief introductory call next week? Here is my LinkedIn profile: linkedin.com/in/marcus-vane-consulting.',
    question: 'How should this inquiry be evaluated based on the available evidence?',
    options: [
      {
        id: 'opt-4a',
        text: 'It is a confirmed phishing scam because you do not personally know Marcus Vane.',
        isCorrect: false,
        feedback: 'Incorrect. Unsolicited professional networking inquiries are a common everyday occurrence in freelance work. Calling it a scam without evidence is inaccurate.',
      },
      {
        id: 'opt-4b',
        text: 'There is insufficient information to determine intent; proceed with standard professional caution and verify through public profiles.',
        isCorrect: true,
        feedback: 'Correct! The message makes no demands for money, passwords, or personal data. The evidence is inconclusive. The right posture is neither blind trust nor knee-jerk panic: verify his LinkedIn and portfolio independently without sharing sensitive credentials.',
      },
      {
        id: 'opt-4c',
        text: 'It is 100% verified safe because it contains a link to a LinkedIn profile.',
        isCorrect: false,
        feedback: 'Incorrect. Scammers often link to real people’s public profiles or build fake social profiles to fabricate legitimacy. A social link does not prove safety.',
      },
    ],
    keyConcept: 'Handling Ambiguity & Avoiding False Certainty',
    educationalTakeaway:
      'Not every unfamiliar message is malicious, but neither is any message guaranteed safe. Distinguish between verified trust, observable evidence, and neutral unknown intent.',
  },
  {
    id: 'scenario-crypto-charity',
    scenarioTitle: 'Case 5: The Breaking Disaster Relief Appeal',
    category: 'Charity Impersonation',
    messageText:
      'Breaking News: Coastal flooding has displaced 10,000 residents! Government relief is slow. Our direct grassroots team is on the ground right now distributing blankets. Send Ethereum or Bitcoin directly to our emergency relief contract: 0x71C...3a9. 100% goes directly to victims!',
    question: 'Which factor makes this appeal deeply problematic?',
    options: [
      {
        id: 'opt-5a',
        text: 'Distributing blankets is an outdated form of disaster aid.',
        isCorrect: false,
        feedback: 'Incorrect. Physical blankets and warm shelter supplies are standard disaster relief items; the stated aid type is not the red flag.',
      },
      {
        id: 'opt-5b',
        text: 'The appeal solicits irreversible cryptocurrency with zero verifiable organization identity, registration numbers, or audited oversight.',
        isCorrect: true,
        feedback: 'Correct! Legitimate disaster response organizations publish registered non-profit EIN/charity numbers, clear leadership records, and auditable payment processors. Anonymous crypto addresses during breaking crises are overwhelmingly fraudulent.',
      },
      {
        id: 'opt-5c',
        text: 'The post claims 10,000 residents were displaced.',
        isCorrect: false,
        feedback: 'Incorrect. Casualty figures in natural disasters may be accurate quotes from news feeds used by scammers as emotional bait.',
      },
    ],
    keyConcept: 'Humanitarian Emotional Exploitation & Payment Irreversibility',
    educationalTakeaway:
      'Always channel disaster donations through accredited relief agencies with verifiable 501(c)(3) or national charity registration records. Irreversible anonymous crypto channels offer zero accountability.',
  },
];
