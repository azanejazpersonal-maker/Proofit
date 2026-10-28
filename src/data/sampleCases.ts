export interface SampleCase {
  id: string;
  label: string;
  category: string;
  text: string;
  context: string;
}

export const SAMPLE_JOB_OFFER_TEXT =
  "Congratulations! You have been selected for a remote job paying $8,000 per month. Pay a $50 registration fee immediately to secure your position. Reply with your personal details within 15 minutes or your offer will expire.";

export const SAMPLE_CASES: SampleCase[] = [
  {
    id: 'sample-job-offer',
    label: 'Remote Job Offer ($8,000/mo fee)',
    category: 'Employment Impersonation',
    text: SAMPLE_JOB_OFFER_TEXT,
    context: 'Unsolicited Telegram or WhatsApp message claiming to represent an international employer.',
  },
  {
    id: 'sample-usps-delivery',
    label: 'Missed Delivery SMS (Address fee)',
    category: 'Smishing / Postal Scam',
    text: 'USPS: We attempted to deliver your package #940011189922319 but the delivery address is incomplete. Update your street details within 12h at https://usps-track-deliver.com/update to avoid return to sender. A $1.50 redelivery fee applies.',
    context: 'Text message received from an unknown international or spoofed sender number.',
  },
  {
    id: 'sample-bank-security',
    label: 'Urgent Bank Security Alert',
    category: 'Credential Harvesting',
    text: 'CHASE SECURITY ALERT: Unusual login detected from Moscow, IP 185.220.101.4. Your account has been temporarily locked. Verify your credentials and one-time authentication code immediately at https://chase-secure-auth.net/login to prevent permanent suspension.',
    context: 'High-urgency SMS attempting to capture two-factor authentication codes and online banking passwords.',
  },
  {
    id: 'sample-prize-giveaway',
    label: 'Tech Giveaway Prize Winner',
    category: 'Advance Fee Sweepstakes',
    text: 'Claim Dept: You have been randomly chosen as the 2nd prize winner in our Annual Tech Giveaway! You won an Apple MacBook Pro M3. Confirm shipping at https://gift-claim-center.vip/macbook and cover the $14.95 courier handling charge. Offer expires at midnight.',
    context: 'Email or text regarding a sweepstakes the recipient never entered.',
  },
  {
    id: 'sample-crypto-investment',
    label: 'Guaranteed Daily Crypto Returns',
    category: 'Investment Fraud',
    text: 'Hi friend! My algorithmic trading bot on QuantumArbitrage.io is yielding 12.5% daily guaranteed return without market risk. I started with $500 and now have $38,000. Send USDT to the smart contract address and receive your first payout in 24 hours. DM for referral link.',
    context: 'Direct message from an acquaintance whose account was likely compromised or a romance scammer.',
  },
  {
    id: 'sample-ceo-giftcard',
    label: 'CEO Emergency Gift Card Request',
    category: 'Business Email Compromise (BEC)',
    text: 'URGENT from David (CEO): I am tied up in an offsite partner summit and need an urgent favor. Please purchase 5x $200 Apple gift cards for a client presentation. Scratch off the backs, send me clear photos of the redemption codes right away. I will have accounting reimburse you by end of day.',
    context: 'Internal workplace email sent from a lookalike domain (e.g. david@company-corp.com instead of company.com).',
  },
  {
    id: 'sample-disaster-charity',
    label: 'Emergency Relief Crypto Appeal',
    category: 'Charity Impersonation',
    text: 'Urgent Syria & Turkey earthquake disaster response! Thousands of children without shelter tonight. Official rescue teams are overwhelmed. Please donate directly to our relief coordinator’s personal crypto wallet: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa. Every dollar saves lives!',
    context: 'Social media post exploiting breaking humanitarian news without charitable registration numbers.',
  },
];
