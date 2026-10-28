import { KnowledgeArticle } from '../types';

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'phishing-smishing-mechanics',
    title: 'Phishing & Smishing Mechanics: How Attackers Manufacture Urgency',
    category: 'Phishing & Credentials',
    readTime: '4 min read',
    summary: 'Understand the psychological levers and technical disguises used in fake security warnings and deceptive links.',
    howItOperates:
      'Attackers create artificial crises—such as a frozen bank account, an unauthorized overseas purchase, or an expiring service. By inciting panic, they short-circuit rational verification. The message directs the victim to a replica login page hosted on a lookalike domain, capturing credentials and 2FA tokens in real time.',
    commonRedFlags: [
      'Unsolicited claims that your account will be deleted or locked within minutes/hours',
      'Generic greetings or slightly altered brand names (e.g., PayPaI, NetfIix with uppercase "I")',
      'Demands to input one-time SMS verification codes or banking passwords',
      'Shortened URLs or domain structures placing the brand name in a subdomain (e.g., chase.security-alert-center.com)',
    ],
    fictionalExample:
      '"ALERT: Unauthorized $742.00 charge on your Apple Card. If this was not you, tap http://apple-card-security.net/verify immediately to cancel within 30 minutes."',
    verificationSteps: [
      'Do not click the link provided in the message.',
      'Open your browser independently and type the known official domain manually, or use your official installed mobile app.',
      'Check your actual account notifications or call the phone number printed on the physical back of your bank card.',
      'Forward suspicious SMS messages to your carrier spam reporting line (7726 in North America and the UK).',
    ],
    harmReduction: [
      'If you entered credentials, change passwords immediately from an uncompromised device.',
      'Enable hardware security keys (FIDO2/WebAuthn) or an authenticator app instead of SMS 2FA.',
      'Notify your bank’s fraud division to place a temporary freeze on your card or account.',
    ],
  },
  {
    id: 'fake-job-offers',
    title: 'Fake Remote Jobs & Advance Fee Employment Schemes',
    category: 'Employment Scams',
    readTime: '5 min read',
    summary: 'How fraudulent recruiters recruit for phantom positions to extract upfront equipment fees or launder bad checks.',
    howItOperates:
      'Scammers reach out via WhatsApp, Telegram, or LinkedIn with an exceptionally attractive remote offer requiring little to no prior interview. Before work begins, they either demand an upfront fee for "software licenses/background check," or send a fraudulent digital check instructing the candidate to deposit it and wire funds to a "designated home office vendor."',
    commonRedFlags: [
      'Interviews conducted exclusively through text messaging apps (Telegram, WhatsApp, Signal) without a video or phone call',
      'Salary compensation dramatically out of proportion with the required experience or job duties',
      'Demands that the applicant pay upfront for training, registration, or software equipment',
      'Recruiter email addresses from public webmail domains (@gmail.com, @outlook.com) claiming to represent major corporations',
      'Checks sent before any work is performed, accompanied by instructions to forward a portion of the balance',
    ],
    fictionalExample:
      '"Congratulations! You have been accepted as Data Entry Specialist at GlobalTech. Weekly pay is $1,950 for 15 hours. Kindly send $85 for your encrypted corporate laptop setup via Zelle."',
    verificationSteps: [
      'Locate the company’s official corporate website by searching independently in a search engine.',
      'Navigate to their "Careers" or "Jobs" portal to verify the exact job requisition ID exists.',
      'Verify the recruiter’s profile on LinkedIn and ensure their email domain exactly matches the corporate employer domain.',
      'Remember: legitimate employers never require employees to pay money to start a job.',
    ],
    harmReduction: [
      'If you deposited a check, notify your bank immediately that you suspect it is fraudulent before it bounces.',
      'Do not spend or wire any funds drawn against an uncleared check.',
      'File an employment scam report with the FTC (reportfraud.ftc.gov) or your national consumer protection agency.',
    ],
  },
  {
    id: 'charity-disaster-impersonation',
    title: 'Charity & Disaster Impersonation During Humanitarian Crises',
    category: 'Donation Fraud',
    readTime: '3 min read',
    summary: 'Why crisis-driven donation requests on social media often divert funds to personal wallets.',
    howItOperates:
      'Following natural disasters, conflicts, or humanitarian emergencies, bad actors scrape emotional photos and videos from news broadcasts. They launch fake crowdfunding campaigns, social media accounts, or mass emails pleading for urgent aid, accepting only untraceable payment channels such as cryptocurrency or P2P transfer apps.',
    commonRedFlags: [
      'Urgent emotional pleas with no charity registration number (e.g., 501(c)(3) EIN in the US, Charity Commission number in the UK)',
      'Payment requests directed to personal names, Zelle handles, Venmo accounts, or cryptocurrency addresses',
      'High-pressure claims that "government aid is failing" and only immediate peer transfer will reach survivors',
      'Lack of clear financial transparency reports or established history prior to the breaking news event',
    ],
    fictionalExample:
      '"Emergency Wildfire Relief: Hundreds trapped! Help volunteer medics buy medical burn supplies today. Send any amount to PayPal: emergency_medic_john@hotmail.com."',
    verificationSteps: [
      'Search charity evaluation registries like Charity Navigator, GuideStar, or the Better Business Bureau Wise Giving Alliance.',
      'Donate exclusively through the official, verified domain of well-established humanitarian organizations.',
      'Check whether the organization publishes audited financial statements detailing the percentage of funds going to programs.',
    ],
    harmReduction: [
      'If you sent a donation via credit card to a fraudulent site, contact your card issuer to dispute the charge.',
      'Report fake fundraising pages directly to the hosting platform (GoFundMe, social platforms) to prevent further harm.',
    ],
  },
  {
    id: 'executive-bank-impersonation',
    title: 'Executive & Authority Impersonation (Business Email Compromise)',
    category: 'Impersonation',
    readTime: '4 min read',
    summary: 'Recognizing spear-phishing tactics that mimic executives, government agents, or bank fraud departments.',
    howItOperates:
      'Impersonation scams exploit respect for authority. In corporate settings, attackers pose as the CEO or legal counsel demanding urgent gift cards or confidential wire transfers. In consumer settings, callers or texters pose as law enforcement or fraud specialists claiming the victim’s identity was used in a felony.',
    commonRedFlags: [
      'Insistence on absolute secrecy ("Do not tell your colleagues" or "Do not hang up this call")',
      'Requests for gift card PINs, wire transfers, or Bitcoin ATM deposits as legal bail or security deposits',
      'Sender email address using a typo-squatted domain (e.g., @c0mpany.com instead of @company.com)',
      'Threats of imminent arrest, license revocation, or asset freezing if not addressed within hours',
    ],
    fictionalExample:
      '"From Officer Miller (Federal Marshals): Your SSN has been flagged in connection with illicit border transit. You must transfer your savings to a secure government locker account while under investigation."',
    verificationSteps: [
      'Government agencies and real law enforcement never demand payments in cryptocurrency, prepaid debit cards, or gift cards.',
      'Hang up immediately and call the organization’s publicly verified switchboard phone number.',
      'In a workplace setting, verify unusual executive payment requests through an established secondary channel (e.g., in-person or voice call).',
    ],
    harmReduction: [
      'Never send photos of gift cards or initiate wire transfers under phone pressure.',
      'If an unauthorized wire was initiated, contact your bank’s wire fraud unit immediately within 24 hours to request a SWIFT recall.',
    ],
  },
  {
    id: 'investment-crypto-scams',
    title: 'High-Yield Investment Fraud & "Pig Butchering" Operations',
    category: 'Financial Fraud',
    readTime: '5 min read',
    summary: 'How long-term relationship building and simulated trading dashboards trick victims into depositing life savings.',
    howItOperates:
      'Attackers make contact through "wrong number" texts, dating applications, or professional networks. Over weeks or months, they build trust before casually mentioning an exclusive cryptocurrency, foreign exchange, or AI arbitrage platform. The platform displays fabricated astronomical profits and may even allow a small initial withdrawal before freezing all capital unless exorbitant "tax fees" are paid.',
    commonRedFlags: [
      'Guarantees of high, steady returns with "zero risk" or "guaranteed algorithmic profit"',
      'Recommendations to download unverified trading apps outside the official Google Play or Apple App Stores',
      'The trading platform requires you to deposit funds into varying personal crypto wallets rather than an institutional account',
      'Inability to withdraw funds without paying additional "unlock fees," "capital gains taxes," or "security deposits"',
    ],
    fictionalExample:
      '"I am trading gold futures using my uncle’s proprietary algorithm on NovaTradePro.com. We make 8% daily. You can start with $1,000 and I will guide every trade."',
    verificationSteps: [
      'Check whether the firm is registered with financial regulators such as FINRA, the SEC, CFTC (US), or FCA (UK).',
      'Search the domain name alongside terms like "scam," "review," or "warning" on consumer forums.',
      'Understand that all high returns inherently carry proportional risk; guaranteed high yield does not exist in legitimate markets.',
    ],
    harmReduction: [
      'Stop sending money immediately. Never pay an "advance fee" to retrieve trapped funds.',
      'Beware of secondary "recovery scammers" who message victims claiming they can hack the blockchain to recover lost funds.',
      'Report the incident to the FBI Internet Crime Complaint Center (IC3.gov).',
    ],
  },
  {
    id: 'delivery-package-traps',
    title: 'Delivery Notifications & Package Tracking Smishing',
    category: 'Phishing & Credentials',
    readTime: '3 min read',
    summary: 'Why package delivery texts spike during holidays and how deceptive micro-charges harvest credit cards.',
    howItOperates:
      'Almost everyone orders goods online regularly. Attackers capitalize on this by sending millions of generic SMS alerts claiming a package cannot be delivered due to an missing house number or an unpaid customs duty of $1.00 - $3.00. The low fee lowers suspicion, but the payment portal actually steals the victim’s full card details and signs them up for recurring unauthorized charges.',
    commonRedFlags: [
      'Text messages claiming delivery issues with no mention of the sender or merchant name',
      'Short links or unusual top-level domains (.top, .icu, .buzz, .vip)',
      'Demands for small administrative fees (e.g., $0.75, $1.49) to complete standard domestic postal deliveries',
      'Sender number originating from foreign area codes for domestic postal services (e.g., +44 or +63 for a US post office alert)',
    ],
    fictionalExample:
      '"FedEx Notification: Your parcel code #FDX-88192 is held at our local depot. Please update your address and pay $1.99 redelivery fee at http://fedex-parcel-hold.com/dispatch."',
    verificationSteps: [
      'Postal carriers (USPS, FedEx, UPS, DHL) do not require credit card payments via SMS to deliver regular mail.',
      'Copy the tracking number and paste it directly into the carrier’s official web page (e.g., usps.com or fedex.com).',
      'Check your actual recent store purchase receipts to see which courier was designated for legitimate orders.',
    ],
    harmReduction: [
      'If you submitted card details, immediately cancel the card through your mobile banking application.',
      'Review pending bank transactions over the following 30 days for micro-charges from overseas billing processors.',
    ],
  },
  {
    id: 'ai-deepfakes-audio-cloning',
    title: 'AI Audio Cloning & Family Emergency Impersonation',
    category: 'Emerging AI Threats',
    readTime: '4 min read',
    summary: 'How synthetic voice tools are used in "grandparent scams" and emergency distress calls.',
    howItOperates:
      'With only a few seconds of public audio from a TikTok, YouTube video, or voicemail greeting, generative audio tools can synthesize an individual’s voice. Attackers call family members using caller-ID spoofing, mimicking a grandchild or relative in tears claiming they were arrested, involved in a car accident, or kidnapped and need bail immediately.',
    commonRedFlags: [
      'Calls from unknown numbers or familiar numbers where the caller sounds panicked, muffled, or distressed',
      'Background noise designed to mask audio artifacts (sirens, loud static, heavy weeping)',
      'Refusal to let the recipient speak to other known companions or law enforcement directly',
      'Payment demanded immediately via cash courier, wire transfer, or cryptocurrency',
    ],
    fictionalExample:
      '"Grandma, it’s me! I was in a terrible car accident and broke my nose. The police are holding me until someone pays $4,000 for the other driver’s tow truck. Please don’t tell mom!"',
    verificationSteps: [
      'Establish a private family "safeword" or challenge question that only real family members know and that is never shared online.',
      'Hang up and immediately call the family member back at their verified, stored phone number in your contact list.',
      'Reach out to another close family member or friend to independently confirm the person’s actual whereabouts.',
    ],
    harmReduction: [
      'Remind elder family members never to hand cash or envelopes to couriers who arrive at their door.',
      'Keep social media profiles private to limit publicly accessible voice and personal family relationship data.',
    ],
  },
  {
    id: 'post-incident-playbook',
    title: 'Incident Response Playbook: What To Do If You Shared Information',
    category: 'Incident Response',
    readTime: '6 min read',
    summary: 'Immediate, prioritized steps to contain identity exposure, safeguard accounts, and minimize financial damage.',
    howItOperates:
      'When you realize you have interacted with a scammer, minutes matter. Acting systematically—without panic—can stop unauthorized fund transfers, secure other linked accounts, and establish a verifiable paper trail for recovery.',
    commonRedFlags: [
      'Suddenly receiving password reset emails you did not request',
      'Unfamiliar two-factor authentication push notifications popping up on your phone',
      'Friends asking why you are sending strange money requests on social media',
    ],
    fictionalExample:
      'You entered your email, password, and credit card number on a fake utility refund page before realizing the URL was fraudulent.',
    verificationSteps: [
      'Priority 1: Contact financial institutions. Call the fraud department for every debit or credit card entered. Request a card cancellation and dispute any pending unauthorized charges.',
      'Priority 2: Change passwords and revoke active sessions. If you reused the password elsewhere, change it on your primary email, banking, and social accounts immediately. Select "Sign out of all other sessions."',
      'Priority 3: Place a credit freeze. In the US, contact all three nationwide bureaus (Equifax, Experian, TransUnion) to freeze your credit report for free. This prevents new loans or accounts from being opened in your name.',
      'Priority 4: Check for unauthorized email forwarding rules. Attackers often add rules to your email account to forward incoming bank alerts to their inbox or delete them immediately.',
    ],
    harmReduction: [
      'Document everything: save screenshots of the communication, transaction numbers, and phone numbers in PROOFIT Incident Notes.',
      'File an official report with the FTC (reportfraud.ftc.gov) or local law enforcement to obtain a formal police report number for disputes.',
      'Be cautious of follow-up calls claiming to be "investigators" or "white hat hackers" promising recovery for an upfront fee.',
    ],
  },
];
