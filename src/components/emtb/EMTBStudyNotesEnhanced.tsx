import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, BookOpen, AlertCircle, Heart, Shield, Stethoscope, ChevronDown, ChevronUp, Download, FileText, Activity, Zap } from 'lucide-react';
import MedicalDisclaimer from '../MedicalDisclaimer';
import { medicationsData } from '../../data/medications';
import { emsProtocols } from '../../data/ems-protocols';
import { emergencyScenarios } from '../../data/emergency-scenarios';

interface StudySection {
  title: string;
  content: string[];
  clinicalPearls?: string[];
  mnemonics?: string[];
  commonPitfalls?: string[];
  decisionTrees?: string[];
  fieldApplications?: string[];
}

interface Flashcard {
  front: string;
  back: string;
  category?: 'definition' | 'protocol' | 'clinical' | 'scenario';
}

interface ChapterData {
  title: string;
  description: string;
  module: string;
  scope: 'EMT-B' | 'AEMT' | 'Paramedic';
  learningObjectives: string[];
  keyTerms: string[];
  protocols: string[];
  sections: StudySection[];
  criticalConcepts?: string[];
  clinicalDecisionRules?: string[];
  commonMisconceptions?: string[];
  examTips?: string[];
  crossReferences?: string[];
  flashcards: Flashcard[];
}

const EMTBStudyNotes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [activeChapter, setActiveChapter] = useState('chapter2');
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const downloadMenuRef = useRef<HTMLDivElement>(null);

  // Close download menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target as Node)) {
        setShowDownloadMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset flashcard when chapter changes
  useEffect(() => {
    setCurrentFlashcard(0);
    setIsFlipped(false);
  }, [activeChapter]);

  // Chapter 2: Workforce Safety and Wellness Data
  // Module 1: Foundations of EMS Practice
  const chapter1StudyNotes: ChapterData = {
    title: "Chapter 1: EMS System Fundamentals",
    description: "Comprehensive overview of Emergency Medical Services systems, structure, and integration within the healthcare continuum",
    module: "1",
    scope: "EMT-B",
    protocols: ["System Access", "Medical Direction", "Quality Improvement", "Transport Decisions", "System Integration", "Resource Management"],
    learningObjectives: [
      "Analyze the historical development and evolution of Emergency Medical Services",
      "Describe the integrated structure of modern EMS systems and their components",
      "Explain the roles and responsibilities of EMS providers within the healthcare system",
      "Evaluate quality improvement processes and their impact on patient outcomes",
      "Apply medical direction concepts including online and offline protocols",
      "Understand EMS system financing, regulation, and operational oversight"
    ],
    keyTerms: [
      "Emergency Medical Services",
      "System Integration",
      "Medical Direction",
      "Online Medical Control",
      "Offline Medical Control",
      "Standing Orders",
      "Clinical Protocols",
      "Quality Assurance",
      "Quality Improvement",
      "Continuous Quality Improvement",
      "Evidence-Based Practice",
      "System Access",
      "911 System",
      "Enhanced 911",
      "Public Safety Answering Point",
      "Emergency Medical Dispatch",
      "Medical Priority Dispatch",
      "First Responder",
      "Basic Life Support",
      "Advanced Life Support",
      "Critical Care Transport",
      "Interfacility Transport",
      "Air Medical Transport",
      "Trauma System",
      "Trauma Center",
      "Stroke Center",
      "STEMI Center",
      "Regionalization",
      "System Design",
      "Resource Allocation",
      "Response Time Standards",
      "Clinical Outcomes",
      "System Evaluation"
    ],
    sections: [
      {
        title: "Historical Evolution and System Development",
        content: [
          "EMS origins traced to military battlefield medicine and Napoleon's ambulance corps (1792)",
          "Modern EMS development began with 1966 National Academy of Sciences report 'Accidental Death and Disability'",
          "Highway Safety Act of 1966 established federal EMS funding and national standards",
          "Emergency Medical Services Systems Act of 1973 defined comprehensive system components",
          "Current EMS systems integrate 14 essential attributes for optimal patient care delivery",
          "Evolution from transport-focused to treatment-oriented clinical care model",
          "Integration with trauma systems, stroke networks, and cardiac care systems",
          "Evidence-based practice implementation driving continuous system improvement"
        ],
        clinicalPearls: [
          "EMS response time targets: 90% of high-priority calls in <8 minutes urban, <12 minutes rural",
          "Modern EMS systems show 3x better cardiac arrest survival than basic transport systems",
          "Integrated trauma systems reduce preventable death rates by 25-30%",
          "Early EMS recognition reduces stroke treatment delays by average of 45 minutes"
        ],
        mnemonics: [
          "EMS SYSTEM: Emergency access, Medical direction, Staffing, System integration, Transport, Equipment, Medical oversight, Monitoring outcomes",
          "QUALITY: Quantify performance, Understand variations, Analyze data, Learn from outcomes, Implement improvements, Track progress, Yield better care"
        ],
        decisionTrees: [
          "System Access → 911 Call → EMD Triage → Resource Deployment → Clinical Response → Definitive Care",
          "Quality Issue → Data Collection → Analysis → Root Cause → Intervention → Monitoring → System Improvement"
        ],
        fieldApplications: [
          "Understanding your role within the larger healthcare system improves care coordination",
          "Knowledge of system capabilities helps with appropriate resource utilization",
          "Quality metrics directly impact system funding and operational decisions",
          "System integration affects patient outcomes and professional development opportunities"
        ]
      },
      {
        title: "System Components and Structure",
        content: [
          "Public access through enhanced 911 systems with location identification capabilities",
          "Emergency Medical Dispatch (EMD) provides pre-arrival instructions and resource optimization",
          "First responder integration ensures rapid initial care and scene safety",
          "BLS and ALS providers deliver tiered clinical care based on patient acuity",
          "Transport capabilities include ground ambulances, air medical, and specialty vehicles",
          "Hospital integration through trauma centers, stroke centers, and specialty care facilities",
          "System governance through medical directors, administrators, and regulatory oversight",
          "Continuous quality improvement monitoring outcomes and driving system enhancement"
        ],
        clinicalPearls: [
          "EMD instructions can reduce cardiac arrest brain damage by initiating CPR 2-3 minutes earlier",
          "Tiered response systems reduce costs by 30% while maintaining clinical outcomes",
          "Air medical transport shows survival benefit for distances >30 miles or difficult access",
          "Hospital destination selection impacts patient outcomes more than transport time in many cases"
        ],
        mnemonics: [
          "ACCESS: Activation system, Call processing, Crew dispatch, Emergency response, Scene management, System destination",
          "TIERED: Transport decisions, Initial assessment, Emergency interventions, Resource allocation, Effective care, Destination selection"
        ],
        decisionTrees: [
          "System Activation → Call Type → EMD Protocol → Resource Level → Response Mode → Clinical Care",
          "Transport Decision → Patient Acuity → Distance → Capabilities → Destination → Care Level"
        ],
        fieldApplications: [
          "Proper EMD interaction improves response accuracy and resource allocation",
          "Understanding transport options helps optimize patient destination decisions",
          "System knowledge enables effective communication with hospitals and specialists",
          "Quality participation directly impacts individual and system performance"
        ]
      },
      {
        title: "Medical Direction and Clinical Oversight",
        content: [
          "Medical directors provide clinical oversight and protocol development for EMS systems",
          "Online medical control offers real-time clinical guidance for complex patient scenarios",
          "Offline medical control through standing orders and clinical protocols guides routine care",
          "Scope of practice definitions establish legal boundaries for each provider level",
          "Continuing education requirements maintain clinical competency and introduce new practices",
          "Quality assurance processes monitor care delivery and identify improvement opportunities",
          "Clinical research integration advances evidence-based EMS practice",
          "Medical direction liaison facilitates hospital integration and care coordination"
        ],
        clinicalPearls: [
          "Online medical control reduces medication errors by 40% in complex cases",
          "Standardized protocols improve care consistency and reduce variation by 60%",
          "Regular medical director feedback improves EMT clinical decision-making skills",
          "Evidence-based protocol updates can improve survival rates by 15-25%"
        ],
        mnemonics: [
          "MEDICAL: Medical director, Education requirements, Direct oversight, Immediate consultation, Clinical protocols, Assessment feedback, Legal guidance",
          "OVERSIGHT: Online control, Verification of care, Educational feedback, Regulatory compliance, Standards maintenance, Implementation monitoring, Guidelines development, Hospital coordination"
        ],
        decisionTrees: [
          "Clinical Decision → Within Protocol → Execute → Outside Protocol → Medical Control → Authorization → Execute",
          "Quality Issue → Case Review → Medical Director → Corrective Action → Education → Monitoring → System Improvement"
        ],
        fieldApplications: [
          "Know when to contact medical control for guidance beyond standing orders",
          "Understand your scope of practice limitations and legal responsibilities",
          "Participate actively in quality improvement and continuing education",
          "Maintain professional relationship with medical director and hospital staff"
        ]
      },
      {
        title: "System Integration and Coordination",
        content: [
          "EMS integrates with public safety agencies including fire, police, and emergency management",
          "Hospital networks coordinate care through trauma systems, stroke networks, and cardiac programs",
          "Public health integration addresses prevention, preparedness, and population health",
          "Healthcare system coordination ensures continuity from prehospital to definitive care",
          "Regional coordination optimizes resource distribution and specialty care access",
          "Information systems enable data sharing and clinical communication across providers",
          "Disaster preparedness requires coordinated response with multiple agencies",
          "Community education and prevention programs reduce emergency service demand"
        ],
        clinicalPearls: [
          "Integrated stroke systems reduce door-to-needle times by average of 30 minutes",
          "Trauma system integration improves survival odds by 25% for major trauma",
          "Regional cardiac networks increase STEMI survival rates by 20-35%",
          "Coordinated disaster response reduces mortality rates during mass casualty events"
        ],
        mnemonics: [
          "INTEGRATE: Information sharing, Networks coordination, Transport optimization, Emergency preparedness, Guidelines consistency, Resource allocation, Accurate communication, Training standardization, Evaluation continuous",
          "COORDINATE: Communication systems, Operations planning, Resource management, Outcomes monitoring, Regional networks, Data integration, Information sharing, Network optimization, Agency cooperation, Training programs, Emergency preparedness"
        ],
        decisionTrees: [
          "System Integration → Identify Partners → Establish Protocols → Train Personnel → Implement Systems → Monitor Outcomes",
          "Emergency Response → Multi-Agency → Incident Command → Resource Coordination → Clinical Care → System Recovery"
        ],
        fieldApplications: [
          "Understanding regional capabilities improves patient destination decisions",
          "Knowledge of partner agencies enhances scene safety and operational efficiency",
          "System integration awareness improves care coordination and outcomes",
          "Professional networking supports career development and system improvement"
        ]
      }
    ],
    criticalConcepts: [
      "EMS systems are integrated networks designed to optimize emergency medical care delivery",
      "Medical direction provides essential clinical oversight and legal framework for EMT practice",
      "Quality improvement is continuous process requiring active participation from all providers",
      "System integration improves patient outcomes through coordinated care delivery",
      "Evidence-based practice drives system evolution and improved clinical outcomes"
    ],
    clinicalDecisionRules: [
      "System Access: All emergency medical needs should enter through standardized 911 system",
      "Medical Direction: Consult online medical control when clinical situation exceeds standing orders",
      "Transport Decision: Patient acuity, distance, and receiving facility capabilities determine optimal destination"
    ],
    commonMisconceptions: [
      "MYTH: EMS is just an ambulance service - FACT: Modern EMS is integrated healthcare delivery system",
      "MYTH: Faster response always equals better outcomes - FACT: Appropriate care delivery more important than speed alone", 
      "MYTH: EMTs work independently - FACT: EMTs function within structured medical oversight system",
      "MYTH: All hospitals provide same level of care - FACT: Specialized centers improve outcomes for specific conditions"
    ],
    examTips: [
      "Questions focus on understanding EMS as system, not just individual provider role",
      "Medical direction concepts frequently tested - know online vs offline control",
      "System integration questions test knowledge of EMS role within healthcare continuum",
      "Quality improvement principles often appear in scenario-based questions"
    ],
    crossReferences: [
      "Chapter 2: Responder Safety & Resilience - safety within system context",
      "Chapter 4: Emergency Communication Protocols - system communication standards",
      "Chapter 9: Interprofessional EMS Teams - team roles within system structure",
      "Chapter 10: Comprehensive Patient Evaluation - assessment within system protocols"
    ],
    flashcards: [
      { front: "What are the 4 T's of EMS system development?", back: "Treatment, Transport, Transfer, Teamwork", category: "definition" },
      { front: "What is medical direction?", back: "Clinical oversight provided by physicians to guide EMS practice", category: "definition" },
      { front: "What is online medical control?", back: "Real-time physician consultation for clinical guidance", category: "definition" },
      { front: "What is offline medical control?", back: "Standing orders and protocols that guide routine EMS care", category: "definition" },
      { front: "What year was the landmark EMS report 'Accidental Death and Disability' published?", back: "1966", category: "clinical" },
      { front: "What act established federal EMS funding?", back: "Highway Safety Act of 1966", category: "clinical" },
      { front: "How much do integrated trauma systems reduce preventable deaths?", back: "25-30% reduction in preventable death rates", category: "clinical" },
      { front: "What are EMD instructions designed to provide?", back: "Pre-arrival care instructions and resource optimization", category: "protocol" },
      { front: "What is the urban EMS response time target?", back: "90% of high-priority calls in <8 minutes", category: "protocol" },
      { front: "What is the rural EMS response time target?", back: "90% of high-priority calls in <12 minutes", category: "protocol" },
      { front: "How much do online medical control reduce medication errors?", back: "40% reduction in complex cases", category: "clinical" },
      { front: "What is continuous quality improvement (CQI)?", back: "Ongoing process to monitor and improve EMS care delivery", category: "definition" },
      { front: "What does Enhanced 911 provide?", back: "Automatic location identification for emergency calls", category: "protocol" },
      { front: "What is a PSAP?", back: "Public Safety Answering Point - where 911 calls are received", category: "definition" },
      { front: "How much do stroke systems reduce treatment delays?", back: "Average 45-minute reduction in stroke treatment delays", category: "clinical" }
    ]
  };

  const chapter3StudyNotes: ChapterData = {
    title: "Chapter 3: EMS Law & Ethical Practice",
    description: "Legal foundations, ethical principles, and professional responsibilities in emergency medical services practice",
    module: "1",
    scope: "EMT-B",
    protocols: ["Legal Authority", "Consent Procedures", "Confidentiality", "Documentation Requirements", "Ethical Decision Making", "Professional Standards"],
    learningObjectives: [
      "Apply legal principles governing EMS practice and scope of practice limitations",
      "Obtain proper consent for treatment including implied, expressed, and informed consent",
      "Implement appropriate procedures for refusal of care and against medical advice situations",
      "Maintain patient confidentiality and apply HIPAA regulations in field operations",
      "Demonstrate ethical decision-making processes in complex patient scenarios",
      "Understand mandatory reporting requirements and legal documentation standards"
    ],
    keyTerms: [
      "Scope of Practice",
      "Standard of Care",
      "Duty to Act",
      "Negligence",
      "Malpractice",
      "Expressed Consent",
      "Implied Consent",
      "Informed Consent",
      "Minor Consent",
      "Refusal of Care",
      "Against Medical Advice",
      "Abandonment",
      "Assault",
      "Battery",
      "False Imprisonment",
      "Confidentiality",
      "HIPAA",
      "Protected Health Information",
      "Mandatory Reporting",
      "Advanced Directive",
      "DNR Order",
      "Living Will",
      "Healthcare Proxy",
      "Emancipated Minor",
      "Good Samaritan Laws",
      "Governmental Immunity",
      "Ethical Dilemma",
      "Beneficence",
      "Non-maleficence",
      "Autonomy",
      "Justice",
      "Veracity",
      "Documentation",
      "Legal Discovery"
    ],
    sections: [
      {
        title: "Legal Foundation and Scope of Practice",
        content: [
          "EMS providers operate under specific legal authority granted by state legislation and regulations",
          "Scope of practice defines the procedures, medications, and interventions legally permitted for each certification level",
          "Standard of care represents the level of care expected from similarly trained providers in similar circumstances",
          "Duty to act exists when EMS providers are on duty or have contractual obligations to respond",
          "Negligence requires four elements: duty, breach of duty, causation, and damages",
          "Malpractice represents professional negligence by healthcare providers falling below standard of care",
          "Good Samaritan laws provide limited liability protection for off-duty emergency care",
          "Governmental immunity may protect public EMS services from certain civil lawsuits"
        ],
        clinicalPearls: [
          "Scope of practice violations account for 25% of EMS-related lawsuits",
          "Standard of care is determined by local protocols, training standards, and expert testimony",
          "Duty to act extends beyond transport refusals to include scene safety and appropriate referrals",
          "Negligence claims increase by 40% when documentation is incomplete or inaccurate"
        ],
        mnemonics: [
          "SCOPE: Standards define, Care protocols, Operations authorized, Practice limitations, Education required",
          "NEGLIGENCE: Need duty, Error in care, Grounds for causation, Legal damages, Investigation required, Guidelines violated, Evidence documented, No excuse defense, Court proceedings, Evaluation by peers"
        ],
        decisionTrees: [
          "Legal Authority → On Duty → Scope of Practice → Standard Protocols → Document Actions",
          "Potential Negligence → Assess Duty → Review Actions → Document Thoroughly → Consult Medical Direction"
        ],
        fieldApplications: [
          "Always verify scope of practice before performing advanced interventions",
          "Follow local protocols and medical direction for complex situations",
          "Document rationale for deviations from standard procedures",
          "Consult with medical control when scope of practice questions arise"
        ]
      },
      {
        title: "Consent and Patient Rights",
        content: [
          "Expressed consent involves verbal or written agreement to treatment after explanation of risks and benefits",
          "Implied consent assumes unconscious or incapacitated patients would consent to life-saving treatment",
          "Informed consent requires explanation of condition, proposed treatment, risks, benefits, and alternatives",
          "Minor consent requires parent or guardian permission except for emancipated minors or emergency situations",
          "Refusal of care must be by competent adult after explanation of risks and consequences",
          "Against medical advice (AMA) situations require thorough documentation and risk explanation",
          "Mental capacity assessment determines patient's ability to make informed healthcare decisions",
          "Advanced directives including DNR orders must be honored when properly executed and presented"
        ],
        clinicalPearls: [
          "Consent issues are involved in 30% of EMS legal disputes",
          "Implied consent applies to all life-threatening emergencies regardless of patient response",
          "Refusal documentation reduces liability by 60% when properly completed",
          "Mental capacity can fluctuate and must be assessed for each treatment decision"
        ],
        mnemonics: [
          "CONSENT: Competent patient, Options explained, No coercion, Specific to treatment, Explained risks/benefits, No time pressure, Thoroughly documented",
          "REFUSAL: Risks explained, Explanation documented, Fully competent, Understanding confirmed, Signature obtained, Alternatives offered, Legal consultation available"
        ],
        decisionTrees: [
          "Patient Consent → Conscious? → Competent? → Risks Explained? → Consent Obtained → Treatment Provided",
          "Refusal Situation → Assess Capacity → Explain Risks → Document Thoroughly → Offer Alternatives → Respect Decision"
        ],
        fieldApplications: [
          "Explain procedures in terms patients can understand before obtaining consent",
          "Document patient's exact words when refusing care",
          "Use translator services for non-English speaking patients",
          "Reassess capacity throughout patient encounter, especially if condition changes"
        ]
      },
      {
        title: "Confidentiality and Privacy Protection",
        content: [
          "Patient confidentiality is fundamental ethical and legal obligation in healthcare",
          "HIPAA establishes national standards for protection of health information",
          "Protected Health Information (PHI) includes any identifiable patient data in any form",
          "Permitted disclosures include treatment, payment, healthcare operations, and legal requirements",
          "Patient authorization required for disclosures beyond permitted uses",
          "Minimum necessary standard limits information shared to essential elements only",
          "Verbal communications must protect privacy in public areas and emergency scenes",
          "Electronic health records require proper security measures and access controls"
        ],
        clinicalPearls: [
          "HIPAA violations can result in fines up to $1.5 million and criminal prosecution",
          "Patient information shared inappropriately appears in 15% of EMS complaints",
          "Proper privacy training reduces violations by 75% in EMS organizations",
          "Electronic audit trails identify unauthorized access in 95% of privacy breaches"
        ],
        mnemonics: [
          "HIPAA: Health Information Privacy and Portability Act",
          "PRIVATE: Protect information, Restrict access, Individual authorization, Verify recipients, Audit compliance, Train staff, Electronic security"
        ],
        decisionTrees: [
          "Information Request → Verify Identity → Check Authorization → Determine Minimum Necessary → Release Information",
          "Privacy Breach → Stop Disclosure → Assess Damage → Notify Patients → Report Incident → Implement Corrections"
        ],
        fieldApplications: [
          "Position yourself to prevent overhearing of patient information by bystanders",
          "Use patient numbers or initials instead of names in radio communications",
          "Verify identity before sharing information with family members",
          "Log off computer systems when stepping away from workstation"
        ]
      },
      {
        title: "Ethical Decision Making and Professional Standards",
        content: [
          "Biomedical ethics provides framework for healthcare decision making in complex situations",
          "Beneficence requires acting in the patient's best interest and promoting good outcomes",
          "Non-maleficence mandates 'do no harm' by avoiding actions that could injure patients",
          "Autonomy respects patient's right to make informed decisions about their healthcare",
          "Justice ensures fair distribution of resources and equal treatment regardless of patient characteristics",
          "Veracity requires honesty and truthfulness in all patient interactions and documentation",
          "Ethical dilemmas arise when competing principles create conflicts in patient care decisions",
          "Professional standards include competence, integrity, respect, and continuous improvement"
        ],
        clinicalPearls: [
          "Ethical conflicts appear in 20% of complex EMS calls involving end-of-life care",
          "Patient autonomy takes precedence when competent adults make informed decisions",
          "Resource allocation decisions must consider medical need rather than social factors",
          "Professional integrity requires reporting impaired colleagues and safety violations"
        ],
        mnemonics: [
          "ETHICS: Examine situation, Think through principles, Honor patient rights, Identify conflicts, Consider consequences, Seek consultation",
          "PRINCIPLES: Patient autonomy, Respect persons, Integrity in actions, Non-maleficence first, Care with beneficence, Individual justice, Promote welfare, Legal compliance, Ethical standards, Service to others"
        ],
        decisionTrees: [
          "Ethical Dilemma → Identify Principles → Assess Conflicts → Consider Options → Consult Resources → Make Decision → Document Rationale",
          "Professional Conflict → Review Standards → Assess Obligations → Seek Guidance → Take Action → Follow Up"
        ],
        fieldApplications: [
          "Respect cultural and religious beliefs while providing medical care",
          "Treat all patients equally regardless of social status or personal characteristics",
          "Report suspected abuse or neglect according to mandatory reporting requirements",
          "Maintain professional boundaries in all patient relationships"
        ]
      }
    ],
    criticalConcepts: [
      "Legal authority and scope of practice define boundaries of EMS practice",
      "Proper consent protects both patient rights and provider liability",
      "Confidentiality and privacy are fundamental obligations in healthcare",
      "Ethical decision making requires balancing competing principles and values",
      "Professional standards demand competence, integrity, and continuous improvement"
    ],
    clinicalDecisionRules: [
      "Consent Assessment: Conscious + Competent + Informed = Valid Consent",
      "Refusal Protocol: Competent patient + Risks explained + Documented = Valid refusal",
      "Confidentiality Standard: Minimum necessary information + Authorized recipient = Permitted disclosure"
    ],
    commonMisconceptions: [
      "MYTH: Unconscious patients cannot refuse care - FACT: Advanced directives may limit treatment",
      "MYTH: Family members can always make decisions - FACT: Legal guardianship or healthcare proxy required",
      "MYTH: EMS providers have unlimited authority - FACT: Must operate within defined scope of practice",
      "MYTH: Patient information can be shared freely with police - FACT: Requires specific legal authority or patient consent"
    ],
    examTips: [
      "Consent questions often involve capacity assessment and emergency exceptions",
      "Legal scenarios test understanding of scope of practice and standard of care",
      "Confidentiality questions focus on HIPAA requirements and permitted disclosures",
      "Ethical dilemmas require application of biomedical ethics principles"
    ],
    crossReferences: [
      "Chapter 1: EMS System Fundamentals - legal framework of EMS systems",
      "Chapter 2: Responder Safety & Resilience - professional responsibilities and standards",
      "Chapter 4: Emergency Communication Protocols - documentation and confidentiality requirements",
      "Chapter 23: Behavioral Crisis Protocols - capacity assessment and involuntary treatment"
    ],
    flashcards: [
      { front: "What are the four elements of negligence?", back: "Duty, breach of duty, causation, and damages", category: "definition" },
      { front: "What is implied consent?", back: "Assumed consent for life-saving treatment of unconscious or incapacitated patients", category: "definition" },
      { front: "What does HIPAA protect?", back: "Protected Health Information (PHI) - any identifiable patient data", category: "definition" },
      { front: "What is scope of practice?", back: "Procedures, medications, and interventions legally permitted for each certification level", category: "definition" },
      { front: "What percentage of EMS lawsuits involve scope of practice violations?", back: "25% of EMS-related lawsuits", category: "clinical" },
      { front: "What is the standard of care?", back: "Level of care expected from similarly trained providers in similar circumstances", category: "definition" },
      { front: "What is beneficence?", back: "Acting in the patient's best interest and promoting good outcomes", category: "definition" },
      { front: "What is non-maleficence?", back: "'Do no harm' - avoiding actions that could injure patients", category: "definition" },
      { front: "How much do proper refusal documentation reduce liability?", back: "60% reduction when properly completed", category: "clinical" },
      { front: "What is autonomy in medical ethics?", back: "Patient's right to make informed decisions about their healthcare", category: "definition" },
      { front: "What percentage of EMS complaints involve inappropriate information sharing?", back: "15% of EMS complaints", category: "clinical" },
      { front: "What is expressed consent?", back: "Verbal or written agreement to treatment after explanation of risks and benefits", category: "definition" },
      { front: "What is abandonment in EMS?", back: "Terminating care without ensuring appropriate continuation of care", category: "definition" },
      { front: "How much can HIPAA violation fines reach?", back: "Up to $1.5 million and potential criminal prosecution", category: "protocol" },
      { front: "What is justice in medical ethics?", back: "Fair distribution of resources and equal treatment regardless of patient characteristics", category: "definition" }
    ]
  };

  const chapter4StudyNotes: ChapterData = {
    title: "Chapter 4: Emergency Communication Protocols",
    description: "Advanced communication systems, documentation standards, and information management in emergency medical services",
    module: "1",
    scope: "EMT-B",
    protocols: ["Radio Communication", "Written Documentation", "Electronic Records", "Interprofessional Communication", "Legal Documentation", "Quality Assurance"],
    learningObjectives: [
      "Demonstrate effective radio communication techniques following standardized protocols",
      "Complete accurate and legally defensible patient care documentation",
      "Apply HIPAA regulations and patient privacy protections in EMS communications",
      "Utilize electronic health record systems for patient information management",
      "Implement effective interprofessional communication strategies",
      "Understand legal implications of EMS documentation and communication"
    ],
    keyTerms: [
      "Radio Communication",
      "Base Station",
      "Mobile Radio",
      "Portable Radio",
      "Repeater System",
      "Frequency",
      "Channel",
      "Simplex",
      "Duplex",
      "Multiplex",
      "Digital Communication",
      "Trunked System",
      "Interoperability",
      "Patient Care Report",
      "Electronic Health Record",
      "Documentation",
      "SOAP Format",
      "Narrative Report",
      "Objective Findings",
      "Subjective Findings",
      "Assessment",
      "Plan",
      "HIPAA",
      "Protected Health Information",
      "Confidentiality",
      "Legal Documentation",
      "Falsification",
      "Addendum",
      "Amendment",
      "Quality Assurance",
      "Peer Review",
      "Medical Direction",
      "Verbal Orders",
      "Standing Orders"
    ],
    sections: [
      {
        title: "Radio Communication Systems and Protocols",
        content: [
          "EMS radio systems operate on FCC-allocated frequencies with specific protocols for emergency communication",
          "Base station provides central communication hub with dispatch and hospital coordination",
          "Mobile radios in ambulances offer higher power and better range than portable units",
          "Repeater systems extend communication range and improve signal quality in challenging terrain",
          "Digital trunked systems provide enhanced capacity and interoperability between agencies",
          "Standard radio procedures include proper identification, clear speech, and brevity",
          "Medical communication follows structured format: unit ID, patient age/sex, chief complaint, vital signs, ETA",
          "Emergency traffic protocols ensure priority communication during critical incidents"
        ],
        clinicalPearls: [
          "Radio communication errors contribute to 15% of medication administration mistakes",
          "Clear, structured radio reports reduce hospital preparation time by 3-5 minutes",
          "Digital systems provide 40% better audio quality and reduced background noise",
          "Interoperable communication systems improve multi-agency response by 60%"
        ],
        mnemonics: [
          "RADIO: Recognize unit, Announce patient info, Describe condition, Inquire for orders, Over and out",
          "CLEAR: Concise message, Loud and clear speech, Emergency priority, Accurate information, Repeat if necessary"
        ],
        decisionTrees: [
          "Radio Communication → Unit ID → Patient Info → Vital Signs → Assessment → Plan → Medical Control Orders",
          "System Failure → Switch to backup → Contact dispatch → Use cell phone → Document communication issue"
        ],
        fieldApplications: [
          "Test radio equipment at start of shift to ensure proper function",
          "Use standardized medical terminology to avoid confusion",
          "Position radio microphone 2-3 inches from mouth for optimal clarity",
          "Monitor emergency channels for high-priority traffic during routine operations"
        ]
      },
      {
        title: "Patient Care Documentation Standards",
        content: [
          "Patient Care Report (PCR) serves as legal document, billing record, and quality assurance tool",
          "SOAP format organizes documentation: Subjective findings, Objective data, Assessment, Plan",
          "Narrative section provides chronological account of patient encounter and care provided",
          "Vital signs must be documented with times, patient position, and measurement method",
          "All interventions require documentation with times, patient response, and complications",
          "Medication administration documentation includes drug name, dose, route, time, and patient response",
          "Refusal of care requires thorough documentation of patient capacity and risks explained",
          "Electronic PCRs improve legibility, reduce errors, and enhance data collection"
        ],
        clinicalPearls: [
          "Electronic documentation reduces medication errors by 35% compared to handwritten reports",
          "Complete PCRs within 24 hours to ensure accuracy and meet legal requirements",
          "Objective findings carry more legal weight than subjective interpretations",
          "Time documentation accuracy within 2 minutes improves quality assurance outcomes"
        ],
        mnemonics: [
          "SOAP: Subjective complaints, Objective findings, Assessment impression, Plan of care",
          "CHART: Chief complaint, History, Assessment findings, Rx (treatment), Transport decisions"
        ],
        decisionTrees: [
          "Documentation → Identify Patient → Chief Complaint → History → Physical Exam → Treatment → Transport",
          "Error Correction → Single line through error → Initial and date → Write correct information → Never erase or white out"
        ],
        fieldApplications: [
          "Document assessment findings immediately after patient contact",
          "Use direct quotes for patient statements rather than interpretation",
          "Record exact medication doses and administration times",
          "Complete documentation before end of shift while details are fresh"
        ]
      },
      {
        title: "HIPAA Compliance and Patient Privacy",
        content: [
          "Health Insurance Portability and Accountability Act (HIPAA) protects patient health information",
          "Protected Health Information (PHI) includes any identifiable patient data in EMS records",
          "Minimum necessary standard requires limiting PHI disclosure to essential personnel only",
          "Patient authorization required for non-routine disclosures beyond treatment and payment",
          "Verbal communications must protect patient privacy in public areas and hospitals",
          "Electronic systems require user authentication and audit trails for PHI access",
          "Breach notification requirements mandate reporting unauthorized PHI disclosures",
          "Business associate agreements required for vendors handling patient information"
        ],
        clinicalPearls: [
          "HIPAA violations can result in fines up to $1.5 million per incident",
          "70% of HIPAA violations in healthcare involve improper verbal disclosures",
          "Electronic audit trails identify 95% of unauthorized PHI access attempts",
          "Proper privacy training reduces HIPAA violations by 80% in EMS services"
        ],
        mnemonics: [
          "HIPAA: Health Information Privacy and Accountability Act",
          "PRIVATE: Protect information, Restrict access, Individual rights, Verify authorization, Audit compliance, Train personnel, Electronic safeguards"
        ],
        decisionTrees: [
          "PHI Disclosure → Treatment/Payment/Operations → No authorization needed → Other purposes → Patient authorization required",
          "Privacy Breach → Identify scope → Notify patients → Report to authorities → Implement corrective measures"
        ],
        fieldApplications: [
          "Lower voice when discussing patient information in public areas",
          "Position computer screens away from public view",
          "Verify recipient identity before sharing patient information",
          "Use patient initials rather than full names in radio communications when possible"
        ]
      },
      {
        title: "Legal and Quality Assurance Documentation",
        content: [
          "EMS documentation serves as legal evidence in malpractice, criminal, and workers' compensation cases",
          "Contemporaneous documentation carries more legal weight than delayed entries",
          "Objective language and factual observations preferred over opinions and assumptions",
          "All corrections must follow proper procedures with original entries remaining visible",
          "Late entries and addenda must be clearly identified with reasons for delay",
          "Quality assurance reviews identify documentation deficiencies and improvement opportunities",
          "Peer review processes use documentation to evaluate care quality and compliance",
          "Documentation audit trails support system improvement and regulatory compliance"
        ],
        clinicalPearls: [
          "Poor documentation is cited in 65% of successful EMS malpractice suits",
          "Electronic timestamps provide irrefutable evidence of care timing",
          "Objective documentation reduces liability exposure by 40% in legal proceedings",
          "Quality metrics derived from documentation drive system performance improvement"
        ],
        mnemonics: [
          "LEGAL: Legible writing, Evidence-based, Good timing, Accurate facts, Legal corrections",
          "QUALITY: Quantify performance, Understand variations, Analyze outcomes, Learn from data, Implement improvements, Track progress, Yield better care"
        ],
        decisionTrees: [
          "Legal Challenge → Review documentation → Assess completeness → Identify gaps → Supplement with additional evidence",
          "QA Review → Compare to standards → Identify deficiencies → Provide feedback → Implement improvements → Monitor progress"
        ],
        fieldApplications: [
          "Document unusual circumstances or deviations from standard care",
          "Use quotation marks for exact patient statements",
          "Record refusals with specific risks explained to patient",
          "Maintain professional language even in challenging situations"
        ]
      }
    ],
    criticalConcepts: [
      "Effective communication is essential for patient safety and system coordination",
      "Documentation serves multiple purposes: legal protection, quality improvement, and billing",
      "HIPAA compliance protects patient privacy and prevents legal violations",
      "Radio protocols ensure clear, efficient communication during emergencies",
      "Quality documentation supports evidence-based practice improvement"
    ],
    clinicalDecisionRules: [
      "Radio Communication: Use standard format - Unit ID, patient demographics, vital signs, assessment, ETA",
      "Documentation Timing: Complete PCRs within 24 hours of patient contact for legal validity",
      "HIPAA Disclosure: Verify recipient authorization before sharing patient information"
    ],
    commonMisconceptions: [
      "MYTH: Radio communications are private - FACT: EMS radio traffic is public and can be monitored",
      "MYTH: Electronic records are automatically HIPAA compliant - FACT: Require proper safeguards and training",
      "MYTH: Late documentation is acceptable - FACT: Contemporaneous records have greater legal validity",
      "MYTH: Abbreviations save time and space - FACT: Can create confusion and legal liability"
    ],
    examTips: [
      "Radio communication questions focus on proper procedures and medical terminology",
      "Documentation scenarios test SOAP format and legal requirements",
      "HIPAA questions emphasize patient privacy and proper disclosure procedures",
      "Quality assurance concepts often appear in system improvement contexts"
    ],
    crossReferences: [
      "Chapter 1: EMS System Fundamentals - system communication integration",
      "Chapter 2: Responder Safety & Resilience - safety communication protocols",
      "Chapter 9: Interprofessional EMS Teams - team communication strategies",
      "Chapter 10: Comprehensive Patient Evaluation - assessment documentation"
    ],
    flashcards: [
      { front: "What does SOAP stand for in documentation?", back: "Subjective, Objective, Assessment, Plan", category: "definition" },
      { front: "What is the maximum time to complete a PCR?", back: "24 hours after patient contact", category: "protocol" },
      { front: "What is PHI?", back: "Protected Health Information - any identifiable patient data", category: "definition" },
      { front: "What is the proper way to correct documentation errors?", back: "Single line through error, initial and date, write correct information", category: "protocol" },
      { front: "What are the four components of SOAP documentation?", back: "Subjective findings, Objective data, Assessment, Plan", category: "definition" },
      { front: "What is HIPAA?", back: "Health Insurance Portability and Accountability Act", category: "definition" },
      { front: "How much do radio communication errors contribute to medication mistakes?", back: "15% of medication administration errors", category: "clinical" },
      { front: "What is a base station in radio communication?", back: "Central communication hub for dispatch and hospital coordination", category: "definition" },
      { front: "What is the minimum necessary standard?", back: "HIPAA requirement to limit PHI disclosure to essential personnel only", category: "protocol" },
      { front: "How much do electronic PCRs reduce medication errors?", back: "35% reduction compared to handwritten reports", category: "clinical" },
      { front: "What is a repeater system?", back: "Radio system that extends communication range and improves signal quality", category: "definition" },
      { front: "What percentage of HIPAA violations involve verbal disclosures?", back: "70% of healthcare HIPAA violations", category: "clinical" },
      { front: "What is interoperability in radio systems?", back: "Ability for different agencies to communicate on same system", category: "definition" },
      { front: "How much can HIPAA violation fines reach?", back: "Up to $1.5 million per incident", category: "protocol" },
      { front: "What is contemporaneous documentation?", back: "Documentation completed at the time of or immediately after patient care", category: "definition" }
    ]
  };

  const chapter5StudyNotes: ChapterData = {
    title: "Chapter 5: Medical Terminology Foundations",
    description: "Essential medical terminology, anatomical references, and professional communication language for emergency medical services",
    module: "2",
    scope: "EMT-B",
    protocols: ["Medical Terminology", "Anatomical Position", "Directional Terms", "Body Systems", "Medical Abbreviations", "Professional Communication"],
    learningObjectives: [
      "Apply proper medical terminology in patient assessment and documentation",
      "Utilize anatomical position and directional terms for accurate body reference",
      "Demonstrate understanding of medical word components including roots, prefixes, and suffixes",
      "Implement appropriate medical abbreviations following standardized conventions",
      "Communicate effectively using professional medical terminology with healthcare teams",
      "Interpret medical terminology in various healthcare documentation and reports"
    ],
    keyTerms: [
      "Anatomical Position",
      "Anterior",
      "Posterior",
      "Superior",
      "Inferior",
      "Medial",
      "Lateral",
      "Proximal",
      "Distal",
      "Superficial",
      "Deep",
      "Sagittal Plane",
      "Coronal Plane",
      "Transverse Plane",
      "Midline",
      "Bilateral",
      "Unilateral",
      "Ipsilateral",
      "Contralateral",
      "Dorsal",
      "Ventral",
      "Cephalic",
      "Caudal",
      "Prone",
      "Supine",
      "Fowler Position",
      "Trendelenburg Position",
      "Root Word",
      "Prefix",
      "Suffix",
      "Combining Form",
      "Medical Abbreviation",
      "Acronym"
    ],
    sections: [
      {
        title: "Anatomical Position and Directional Terms",
        content: [
          "Anatomical position serves as universal reference point: standing erect, facing forward, arms at sides, palms facing forward",
          "Anterior (ventral) refers to front of body while posterior (dorsal) indicates back of body",
          "Superior (cranial/cephalic) means toward head while inferior (caudal) means toward feet",
          "Medial indicates toward midline of body while lateral means away from midline",
          "Proximal refers to closer to point of attachment while distal means farther from attachment point",
          "Superficial describes closer to surface while deep indicates farther from surface",
          "Bilateral means both sides while unilateral refers to one side only",
          "Ipsilateral indicates same side while contralateral means opposite side"
        ],
        clinicalPearls: [
          "Consistent use of anatomical terms reduces communication errors by 60% in EMS reports",
          "Proper directional terminology is essential for accurate injury documentation and legal protection",
          "Anatomical position reference prevents confusion regardless of patient's actual position",
          "Medical terminology standardization improves hospital handoff communication by 45%"
        ],
        mnemonics: [
          "PALM: Proximal closer, Anterior front, Lateral away, Medial toward midline",
          "SIDS: Superior up, Inferior down, Distal away, Superficial surface"
        ],
        decisionTrees: [
          "Body Reference → Establish Anatomical Position → Apply Directional Terms → Document Accurately",
          "Injury Location → Identify Body Region → Use Proper Terminology → Communicate Clearly"
        ],
        fieldApplications: [
          "Always use anatomical position as reference regardless of how patient is found",
          "Combine directional terms for precise location: 'proximal medial forearm'",
          "Use consistent terminology in radio reports and documentation",
          "Verify understanding when communicating with other healthcare providers"
        ]
      },
      {
        title: "Body Planes and Positioning",
        content: [
          "Sagittal plane divides body into right and left portions with midsagittal creating equal halves",
          "Coronal (frontal) plane separates body into anterior and posterior sections",
          "Transverse (horizontal) plane creates superior and inferior divisions",
          "Prone position places patient face down while supine position has patient face up",
          "Fowler's position elevates head and torso at various angles for respiratory comfort",
          "Trendelenburg position places patient supine with feet elevated above head",
          "Lateral recumbent (recovery) position places patient on side for airway protection",
          "Positioning terminology essential for patient movement and treatment protocols"
        ],
        clinicalPearls: [
          "Body plane understanding critical for radiographic interpretation and surgical communication",
          "Positioning terminology prevents confusion during patient transfers between providers",
          "Proper position documentation supports quality assurance and protocol compliance",
          "Anatomical planes provide framework for understanding three-dimensional body relationships"
        ],
        mnemonics: [
          "PLANES: Posterior-anterior coronal, Lateral sagittal, Above-below transverse, Never confuse, Equal divisions, Systematic approach",
          "POSITION: Prone face down, Opposite supine, Sides lateral, Inclined Fowler's, Trendelenburg feet up, Identify clearly, Options multiple, Never assume"
        ],
        decisionTrees: [
          "Patient Positioning → Assess Condition → Choose Appropriate Position → Use Correct Terminology → Document Position",
          "Position Description → Identify Plane → Apply Directional Terms → Communicate Clearly"
        ],
        fieldApplications: [
          "Document patient's found position before any movement",
          "Use standard positioning terminology in patient care reports",
          "Communicate position changes clearly during transport",
          "Consider anatomical position when describing injury mechanisms"
        ]
      },
      {
        title: "Medical Word Construction and Components",
        content: [
          "Root words provide basic meaning and often refer to body parts or systems",
          "Prefixes appear before root words and modify meaning, often indicating location, number, or condition",
          "Suffixes follow root words and typically indicate procedures, conditions, or states",
          "Combining forms use connecting vowels (usually 'o') to join word parts smoothly",
          "Medical terms often combine multiple roots, prefixes, and suffixes for precise meaning",
          "Understanding word components allows interpretation of unfamiliar medical terms",
          "Greek and Latin origins predominate in medical terminology construction",
          "Systematic approach to word analysis improves medical vocabulary comprehension"
        ],
        clinicalPearls: [
          "Understanding word components enables interpretation of 75% of medical terminology",
          "Systematic word analysis reduces medication errors by identifying drug classifications",
          "Medical terminology knowledge improves patient education and communication effectiveness",
          "Root word mastery provides foundation for learning complex medical concepts"
        ],
        mnemonics: [
          "COMPONENTS: Combining forms connect, Origins Greek-Latin, Meaning modified, Prefixes before, Order matters, Numbers indicated, Endings show conditions, New terms analyzed, Terms systematically, Systems organized",
          "ROOTS: Remember basic meaning, Origins body parts, Organize by systems, Terms build from foundation, Systems connect logically"
        ],
        decisionTrees: [
          "Unknown Term → Identify Components → Analyze Root → Check Prefix → Examine Suffix → Determine Meaning",
          "Word Construction → Choose Root → Add Prefix if Needed → Select Appropriate Suffix → Check Combining Vowels"
        ],
        fieldApplications: [
          "Break down unfamiliar terms into component parts for understanding",
          "Use proper medical terminology in documentation and communication",
          "Verify understanding of terms before using in patient care",
          "Build vocabulary systematically by learning common roots, prefixes, and suffixes"
        ]
      },
      {
        title: "Common Medical Abbreviations and Professional Communication",
        content: [
          "Standard medical abbreviations improve documentation efficiency while maintaining clarity",
          "Dangerous abbreviations list identifies terms that increase error risk and should be avoided",
          "Time notation uses 24-hour format to prevent AM/PM confusion in critical care",
          "Vital signs abbreviations follow standardized format: BP, HR, RR, Temp, SpO2",
          "Route abbreviations specify medication administration pathways: PO, IV, IM, SL, PR",
          "Frequency abbreviations indicate timing: BID, TID, QID, PRN, STAT",
          "Professional communication requires appropriate abbreviation use in proper context",
          "Documentation standards mandate approved abbreviations for legal and quality purposes"
        ],
        clinicalPearls: [
          "Inappropriate abbreviation use contributes to 25% of medication administration errors",
          "Joint Commission maintains 'Do Not Use' abbreviation list to prevent patient harm",
          "Standardized abbreviations improve communication efficiency by 35% in emergency settings",
          "Electronic health records often expand abbreviations automatically for clarity"
        ],
        mnemonics: [
          "ABBREVIATIONS: Approved lists only, Brief but clear, Brackets for clarity, Read carefully, Error prevention, Verify meanings, Inappropriate avoided, Appropriate context, Time format standard, International standards, Organization approved, Never assume, Standard usage",
          "VITALS: Verify measurements, Input correctly, Temperature noted, Always document, Location specified, Standard abbreviations"
        ],
        decisionTrees: [
          "Abbreviation Use → Check Approved List → Verify Meaning → Use Appropriately → Document Correctly",
          "Communication → Choose Terminology → Use Standard Abbreviations → Verify Understanding → Document Accurately"
        ],
        fieldApplications: [
          "Use only organization-approved abbreviations in documentation",
          "Spell out potentially confusing abbreviations when communicating verbally",
          "Verify abbreviation meanings when receiving information from other providers",
          "Follow facility-specific abbreviation policies and procedures"
        ]
      }
    ],
    criticalConcepts: [
      "Anatomical position provides universal reference point for all body descriptions",
      "Consistent medical terminology prevents communication errors and improves patient safety",
      "Understanding word components enables interpretation of complex medical terms",
      "Standardized abbreviations improve efficiency while maintaining clarity and safety",
      "Professional medical communication requires precise terminology and proper context"
    ],
    clinicalDecisionRules: [
      "Anatomical Reference: Always use anatomical position as reference regardless of patient's found position",
      "Terminology Standards: Use approved medical terminology and abbreviations per organizational policy",
      "Communication Clarity: Verify understanding of medical terms when communicating with others"
    ],
    commonMisconceptions: [
      "MYTH: Medical terminology is too complex to master - FACT: Understanding word components makes learning systematic",
      "MYTH: Abbreviations always save time - FACT: Unclear abbreviations can cause dangerous delays and errors",
      "MYTH: Lay terms are acceptable in medical documentation - FACT: Professional terminology is required for legal and clinical accuracy",
      "MYTH: Anatomical terms are only needed for complex injuries - FACT: Precise terminology is essential for all patient descriptions"
    ],
    examTips: [
      "Anatomical position questions often test directional term understanding",
      "Word component analysis helps with unfamiliar terminology questions",
      "Abbreviation questions may include 'Do Not Use' list items",
      "Body plane questions often combine with positioning terminology"
    ],
    crossReferences: [
      "Chapter 6: Human Body Systems - anatomical terminology application",
      "Chapter 4: Emergency Communication Protocols - professional communication standards",
      "Chapter 10: Comprehensive Patient Evaluation - terminology in assessment documentation",
      "All clinical chapters - medical terminology foundation for understanding"
    ],
    flashcards: [
      { front: "What is anatomical position?", back: "Standing erect, facing forward, arms at sides, palms facing forward", category: "definition" },
      { front: "What does anterior mean?", back: "Toward the front of the body", category: "definition" },
      { front: "What does posterior mean?", back: "Toward the back of the body", category: "definition" },
      { front: "What does superior mean?", back: "Toward the head, above", category: "definition" },
      { front: "What does inferior mean?", back: "Toward the feet, below", category: "definition" },
      { front: "What does medial mean?", back: "Toward the midline of the body", category: "definition" },
      { front: "What does lateral mean?", back: "Away from the midline of the body", category: "definition" },
      { front: "What does proximal mean?", back: "Closer to the point of attachment", category: "definition" },
      { front: "What does distal mean?", back: "Farther from the point of attachment", category: "definition" },
      { front: "What does bilateral mean?", back: "Affecting both sides of the body", category: "definition" },
      { front: "What plane divides the body into right and left?", back: "Sagittal plane", category: "definition" },
      { front: "What plane divides the body into front and back?", back: "Coronal (frontal) plane", category: "definition" },
      { front: "What plane divides the body into upper and lower?", back: "Transverse (horizontal) plane", category: "definition" },
      { front: "What position has the patient lying face up?", back: "Supine position", category: "definition" },
      { front: "What are the three components of medical words?", back: "Root, prefix, and suffix", category: "definition" }
    ]
  };

  const chapter2StudyNotes: ChapterData = {
    title: "Chapter 2: Responder Safety & Resilience",
    description: "Comprehensive safety protocols, personal protective equipment, and resilience strategies for emergency medical services personnel",
    module: "1",
    scope: "EMT-B",
    protocols: ["Personal Safety", "Scene Safety", "PPE Usage", "Infection Control", "Stress Management", "Resilience Building"],
    learningObjectives: [
      "Implement comprehensive scene safety assessment protocols before patient approach",
      "Demonstrate proper personal protective equipment selection and usage procedures",
      "Apply infection control measures and standard precautions in all patient encounters",
      "Recognize signs of acute and cumulative stress in self and team members",
      "Utilize evidence-based resilience strategies to maintain professional effectiveness",
      "Understand occupational health requirements and injury prevention strategies"
    ],
    keyTerms: [
      "Scene Safety",
      "Personal Protective Equipment",
      "Standard Precautions",
      "Universal Precautions",
      "Bloodborne Pathogens",
      "Airborne Precautions",
      "Contact Precautions",
      "Droplet Precautions",
      "N95 Respirator",
      "Fit Testing",
      "Decontamination",
      "Exposure Control Plan",
      "Post-Exposure Prophylaxis",
      "Acute Stress Reaction",
      "Cumulative Stress",
      "Critical Incident Stress",
      "Resilience",
      "Self-Care",
      "Burnout",
      "Secondary Trauma",
      "Employee Assistance Program",
      "Peer Support",
      "Mindfulness",
      "Work-Life Balance"
    ],
    sections: [
      {
        title: "Scene Safety Assessment and Management",
        content: [
          "Scene safety assessment begins before arrival through dispatch information analysis and continues throughout call",
          "Primary safety hazards include traffic, violence, environmental dangers, and structural instability",
          "Dynamic scene assessment requires continuous reevaluation as conditions change during emergency response",
          "Safety zones establish safe working areas with clear egress routes for personnel protection",
          "Multiple agency coordination essential for complex scenes requiring specialized resources",
          "Personal safety takes precedence over patient care in dangerous environments",
          "Communication systems must remain functional for emergency assistance requests",
          "Documentation of safety concerns supports legal protection and quality improvement"
        ],
        clinicalPearls: [
          "Scene safety violations contribute to 40% of EMS worker injuries annually",
          "Proper scene assessment reduces responder injury rates by 65% compared to inadequate evaluation",
          "Traffic-related incidents cause 25% of line-of-duty deaths in EMS personnel",
          "Early scene control prevents 80% of secondary incidents during emergency operations"
        ],
        mnemonics: [
          "SAFER: Scene assessment, Assess hazards, Find safe zone, Evaluate continuously, Request assistance as needed",
          "SCENE: Survey thoroughly, Control hazards, Establish zones, Navigate safely, Exit planned"
        ],
        decisionTrees: [
          "Scene Arrival → Initial Assessment → Identify Hazards → Establish Safety Zone → Continuous Monitoring",
          "Unsafe Scene → Stop Approach → Request Additional Resources → Wait for Scene Security → Reassess Safety"
        ],
        fieldApplications: [
          "Conduct 360-degree scene survey before exiting vehicle",
          "Position apparatus to protect work area from traffic",
          "Maintain situational awareness throughout entire call duration",
          "Have predetermined exit strategy for all scene locations"
        ]
      },
      {
        title: "Personal Protective Equipment and Infection Control",
        content: [
          "Standard precautions treat all body fluids as potentially infectious requiring appropriate PPE",
          "PPE selection based on anticipated exposure risks and transmission routes",
          "Proper donning and doffing procedures prevent contamination and self-exposure",
          "Respiratory protection requires fit-tested N95 respirators for airborne pathogens",
          "Eye protection mandatory for procedures with splash or droplet risk",
          "Glove selection varies by procedure: nitrile preferred for durability and chemical resistance",
          "Gown protection required for procedures with significant contamination risk",
          "Decontamination procedures follow established protocols for personnel and equipment safety"
        ],
        clinicalPearls: [
          "Proper PPE use reduces occupational infection risk by 90% in healthcare settings",
          "Incorrect glove removal is the most common cause of hand contamination",
          "N95 respirator fit testing must be performed annually and with facial changes",
          "Eye protection prevents 85% of mucous membrane exposures during patient care"
        ],
        mnemonics: [
          "PPE: Protect yourself first, Proper selection, Equipment maintained, Everyone trained",
          "GLOVES: Guard hands always, Latex-free options, Observe proper technique, Verify integrity, Extended use avoided, Single use only"
        ],
        decisionTrees: [
          "Patient Contact → Assess Exposure Risk → Select Appropriate PPE → Don Properly → Provide Care → Doff Safely",
          "Potential Exposure → Stop Activity → Assess Risk → Implement Controls → Document Incident → Seek Medical Evaluation"
        ],
        fieldApplications: [
          "Change gloves between patients and after contamination",
          "Verify N95 seal check before entering infectious patient areas",
          "Remove contaminated PPE before entering clean areas",
          "Maintain PPE inventory and replace expired equipment"
        ]
      },
      {
        title: "Occupational Health and Injury Prevention",
        content: [
          "Ergonomic principles reduce musculoskeletal injury risk during patient handling and transport",
          "Mechanical lift devices required for patients exceeding safe lifting limits",
          "Body mechanics training essential for proper lifting, carrying, and pushing techniques",
          "Immunization requirements protect against occupational disease exposure",
          "Annual health screenings detect early signs of work-related health issues",
          "Injury reporting systems ensure proper documentation and treatment of workplace injuries",
          "Return-to-work programs facilitate safe recovery and prevent re-injury",
          "Fitness-for-duty evaluations ensure personnel capability to perform essential functions safely"
        ],
        clinicalPearls: [
          "Back injuries account for 45% of all EMS worker compensation claims",
          "Proper body mechanics reduce lifting injury risk by 70% when consistently applied",
          "Mechanical lift device usage mandatory for patients over 157 pounds per NIOSH guidelines",
          "Annual TB screening detects occupational exposure in 2-3% of EMS personnel"
        ],
        mnemonics: [
          "LIFT: Legs do work, Intimate grip, Feet stable, Torso straight",
          "HEALTH: Have regular checkups, Exercise regularly, Avoid risky behaviors, Learn injury prevention, Track exposures, Healthy lifestyle choices"
        ],
        decisionTrees: [
          "Patient Movement → Assess Weight/Mobility → Determine Resources Needed → Use Proper Technique → Monitor for Injury",
          "Workplace Injury → Immediate Care → Report Incident → Seek Medical Attention → Follow Return-to-Work Protocol"
        ],
        fieldApplications: [
          "Use team lifting for all patients regardless of apparent weight",
          "Maintain proper lifting posture with neutral spine alignment",
          "Report all injuries immediately regardless of perceived severity",
          "Participate in required occupational health programs and screenings"
        ]
      },
      {
        title: "Stress Management and Professional Resilience",
        content: [
          "Acute stress reactions are normal responses to abnormal situations requiring recognition and management",
          "Cumulative stress builds over time from repeated exposure to traumatic events and workplace pressures",
          "Critical incident stress management provides structured support following traumatic events",
          "Resilience strategies include mindfulness, social support, physical fitness, and professional development",
          "Self-awareness enables early recognition of stress symptoms and proactive intervention",
          "Work-life balance requires deliberate boundaries between professional and personal time",
          "Peer support programs provide confidential assistance from specially trained colleagues",
          "Employee assistance programs offer professional counseling and resource referral services"
        ],
        clinicalPearls: [
          "Untreated cumulative stress increases burnout risk by 300% in emergency services personnel",
          "Resilience training reduces PTSD symptoms by 40% in first responders",
          "Peer support utilization correlates with 60% reduction in early career turnover",
          "Mindfulness practices improve emotional regulation and job satisfaction by 35%"
        ],
        mnemonics: [
          "RESILIENCE: Recognize stress early, Exercise regularly, Sleep adequately, Interests outside work, Learn coping skills, Involve support systems, Engage in self-care, Navigate challenges, Connect with others, Evaluate regularly",
          "STRESS: Signs recognize early, Take action promptly, Resources utilize available, Evaluate effectiveness, Support seek when needed, Strategy develop personal"
        ],
        decisionTrees: [
          "Stress Recognition → Assess Severity → Implement Coping Strategies → Seek Support if Needed → Monitor Progress",
          "Critical Incident → Immediate Self-Care → Utilize Support Resources → Professional Help if Indicated → Return to Duty Assessment"
        ],
        fieldApplications: [
          "Practice stress recognition techniques during routine calls",
          "Maintain regular exercise and healthy sleep patterns",
          "Participate in peer support programs and critical incident debriefings",
          "Develop personal stress management toolkit with multiple strategies"
        ]
      }
    ],
    criticalConcepts: [
      "Scene safety assessment is continuous and takes precedence over patient care",
      "Standard precautions and proper PPE use prevent occupational disease transmission",
      "Ergonomic principles and mechanical aids prevent musculoskeletal injuries",
      "Stress management and resilience strategies are essential for career longevity",
      "Occupational health programs support personnel safety and wellness"
    ],
    clinicalDecisionRules: [
      "Scene Safety Rule: If scene is unsafe, do not enter until hazards are controlled",
      "PPE Selection: Choose protection based on anticipated exposure routes and risks",
      "Lifting Guidelines: Use mechanical aids for patients over 157 pounds or awkward positioning"
    ],
    commonMisconceptions: [
      "MYTH: Scene safety assessment only occurs on arrival - FACT: Must be continuous throughout call",
      "MYTH: Standard precautions only for known infectious patients - FACT: Apply to all patient contacts",
      "MYTH: Stress reactions indicate weakness - FACT: Normal response to abnormal situations",
      "MYTH: PPE prevents all occupational exposures - FACT: Reduces risk but proper technique essential"
    ],
    examTips: [
      "Scene safety questions often test priority of safety over patient care",
      "PPE questions focus on selection criteria and proper usage techniques",
      "Stress management questions emphasize recognition and resource utilization",
      "Ergonomic questions test knowledge of proper body mechanics and lifting limits"
    ],
    crossReferences: [
      "Chapter 1: EMS System Fundamentals - safety within system context",
      "Chapter 4: Emergency Communication Protocols - safety communication protocols",
      "Chapter 9: Interprofessional EMS Teams - relates to team safety culture",
      "All clinical chapters - safety considerations specific to each area"
    ],
    flashcards: [
      { front: "What is the first priority on any EMS scene?", back: "Scene safety and responder safety", category: "protocol" },
      { front: "What are standard precautions?", back: "Treating all body fluids as potentially infectious", category: "definition" },
      { front: "What percentage of EMS worker injuries involve scene safety violations?", back: "40% of EMS worker injuries annually", category: "clinical" },
      { front: "What is the NIOSH lifting guideline for EMS?", back: "Use mechanical aids for patients over 157 pounds", category: "protocol" },
      { front: "What causes 25% of line-of-duty deaths in EMS?", back: "Traffic-related incidents", category: "clinical" },
      { front: "What does PPE stand for?", back: "Personal Protective Equipment", category: "definition" },
      { front: "How much do proper PPE practices reduce infection risk?", back: "90% reduction in occupational infection risk", category: "clinical" },
      { front: "What percentage of EMS compensation claims involve back injuries?", back: "45% of all EMS worker compensation claims", category: "clinical" },
      { front: "What is acute stress reaction?", back: "Normal response to abnormal situations requiring recognition and management", category: "definition" },
      { front: "How much does resilience training reduce PTSD symptoms?", back: "40% reduction in PTSD symptoms in first responders", category: "clinical" },
      { front: "What is cumulative stress?", back: "Stress that builds over time from repeated traumatic exposures", category: "definition" },
      { front: "How often should N95 fit testing be performed?", back: "Annually and with any facial changes", category: "protocol" },
      { front: "What is the most common PPE mistake?", back: "Incorrect glove removal causing hand contamination", category: "clinical" },
      { front: "What prevents 85% of mucous membrane exposures?", back: "Proper eye protection during patient care", category: "clinical" },
      { front: "How much does peer support reduce early career turnover?", back: "60% reduction in early career turnover", category: "clinical" }
    ]
  };

  const chapter6StudyNotes: ChapterData = {
    title: "Chapter 6: Human Body Systems & Anatomy",
    description: "Comprehensive anatomy and physiology of human body systems essential for emergency medical assessment and intervention",
    module: "2",
    scope: "EMT-B",
    protocols: ["Anatomical Assessment", "System Integration", "Physiological Monitoring", "Pathophysiology Recognition", "Body System Interactions", "Clinical Correlation"],
    learningObjectives: [
      "Identify major anatomical structures and their physiological functions across all body systems",
      "Analyze integration between body systems and predict cascade effects of system dysfunction",
      "Apply anatomical knowledge to perform systematic patient assessment and recognize abnormalities",
      "Correlate signs and symptoms with underlying anatomical and physiological processes",
      "Understand age-related anatomical variations and their clinical implications",
      "Recognize pathophysiological changes that occur in common emergency conditions"
    ],
    keyTerms: [
      "Homeostasis",
      "Metabolism",
      "Perfusion",
      "Oxygenation",
      "Ventilation",
      "Cardiac Output",
      "Blood Pressure",
      "Respiratory System",
      "Cardiovascular System",
      "Nervous System",
      "Musculoskeletal System",
      "Integumentary System",
      "Endocrine System",
      "Digestive System",
      "Urinary System",
      "Reproductive System",
      "Lymphatic System",
      "Immune System",
      "Central Nervous System",
      "Peripheral Nervous System",
      "Sympathetic Nervous System",
      "Parasympathetic Nervous System",
      "Stroke Volume",
      "Heart Rate",
      "Preload",
      "Afterload",
      "Contractility",
      "Tidal Volume",
      "Respiratory Rate",
      "Minute Ventilation"
    ],
    sections: [
      {
        title: "Respiratory System Structure and Function",
        content: [
          "Upper airway includes nose, mouth, pharynx, larynx providing air filtration, warming, and humidification",
          "Lower airway consists of trachea, bronchi, bronchioles, and alveoli enabling gas exchange",
          "Alveolar-capillary membrane facilitates oxygen and carbon dioxide exchange through diffusion",
          "Respiratory muscles including diaphragm and intercostals create pressure changes for ventilation",
          "Respiratory control centers in medulla and pons regulate breathing rate and depth",
          "Chemoreceptors monitor oxygen, carbon dioxide, and pH levels triggering respiratory adjustments",
          "Ventilation moves air while respiration refers to cellular gas exchange processes",
          "Respiratory system integration with cardiovascular system ensures adequate oxygen delivery"
        ],
        clinicalPearls: [
          "Adult respiratory rate normally 12-20 breaths per minute with tidal volume 500mL",
          "Oxygen saturation below 90% indicates significant respiratory compromise requiring intervention",
          "Respiratory drive primarily controlled by CO2 levels, not oxygen in healthy individuals",
          "Accessory muscle use indicates respiratory distress and increased work of breathing"
        ],
        mnemonics: [
          "RESPIRATORY: Rate normal range, Effort assessment, Sounds auscultated, Pattern observed, Intervention when needed, Rate varies by age, Accessory muscles noted, Tidal volume adequate, Oxygen saturation monitored, Rhythm regular expected, Y-axis shows trends",
          "AIRWAY: Assess patency, Inspect for obstructions, Respirations evaluate, Watch for compromise, Auscultate sounds, Year-round vigilance"
        ],
        decisionTrees: [
          "Respiratory Assessment → Rate → Rhythm → Effort → Sounds → Interventions as Needed",
          "Respiratory Distress → Assess Severity → Positioning → Oxygen → Advanced Interventions → Transport"
        ],
        fieldApplications: [
          "Count respiratory rate for full 30 seconds for accuracy",
          "Observe chest rise and fall symmetry during ventilation assessment",
          "Auscultate breath sounds systematically in all lung fields",
          "Monitor oxygen saturation continuously in respiratory compromise"
        ]
      },
      {
        title: "Cardiovascular System Components and Circulation",
        content: [
          "Heart serves as four-chambered pump with right side handling venous return and left side arterial circulation",
          "Cardiac cycle includes systole (contraction) and diastole (relaxation) phases coordinated by electrical system",
          "Coronary circulation supplies heart muscle with oxygen and nutrients through dedicated arterial system",
          "Systemic circulation delivers oxygenated blood to body tissues and returns deoxygenated blood to heart",
          "Pulmonary circulation carries deoxygenated blood to lungs and returns oxygenated blood to left heart",
          "Blood pressure reflects force of blood against arterial walls during cardiac contraction and relaxation",
          "Perfusion depends on adequate cardiac output, blood volume, and vascular integrity",
          "Cardiovascular system responds to stress through sympathetic nervous system activation"
        ],
        clinicalPearls: [
          "Normal cardiac output 4-6 liters per minute calculated as heart rate × stroke volume",
          "Blood pressure normal range: systolic 90-140 mmHg, diastolic 60-90 mmHg",
          "Pulse pressure (systolic-diastolic) normally 30-40 mmHg indicating stroke volume adequacy",
          "Capillary refill time >2 seconds suggests inadequate peripheral perfusion"
        ],
        mnemonics: [
          "CIRCULATION: Cardiac output adequate, Inspection for perfusion, Rate and rhythm, Circulation peripheral, Understanding blood flow, Lungs included, Assessment systematic, Transport decisions, Interventions appropriate, Oxygen delivery, Never ignore signs",
          "PERFUSION: Pressure blood adequate, Extremities warm, Rate capillary refill, Flow blood continuous, Understanding circulation, Skin color normal, Intervention when needed, Output cardiac sufficient, Never delay treatment"
        ],
        decisionTrees: [
          "Circulatory Assessment → Heart Rate → Blood Pressure → Perfusion Signs → Interventions → Monitoring",
          "Shock Recognition → Assess Perfusion → Identify Type → Fluid Resuscitation → Transport Priority"
        ],
        fieldApplications: [
          "Palpate pulse for rate, rhythm, and quality assessment",
          "Measure blood pressure in both arms when indicated",
          "Assess perfusion through skin color, temperature, and capillary refill",
          "Monitor for signs of cardiovascular compromise during transport"
        ]
      },
      {
        title: "Nervous System Organization and Function",
        content: [
          "Central nervous system includes brain and spinal cord providing integration and control functions",
          "Peripheral nervous system consists of cranial and spinal nerves connecting CNS to body structures",
          "Autonomic nervous system regulates involuntary functions through sympathetic and parasympathetic divisions",
          "Brain regions include cerebrum, cerebellum, and brainstem with specialized functions for survival",
          "Spinal cord transmits signals between brain and body while providing reflex coordination",
          "Neurons communicate through electrical and chemical signals enabling rapid response coordination",
          "Blood-brain barrier protects nervous tissue while potentially limiting drug penetration",
          "Neurological assessment evaluates consciousness, motor function, sensory response, and reflexes"
        ],
        clinicalPearls: [
          "Glasgow Coma Scale ranges 3-15 with scores <8 indicating severe brain injury",
          "Pupil response to light tests cranial nerve function and brainstem integrity",
          "Sympathetic activation during stress increases heart rate, blood pressure, and respiratory rate",
          "Neurological deficits may be focal (specific area) or global (widespread) in presentation"
        ],
        mnemonics: [
          "NERVOUS: Neurological assessment, Evaluate consciousness, Reflexes check, Vision and pupils, Orientation assess, Understanding deficits, Sensory function, Systematic approach",
          "NEURO: Note responsiveness, Evaluate pupils, Understanding speech, Reflexes test, Orient to person/place/time"
        ],
        decisionTrees: [
          "Neurological Assessment → Consciousness Level → Motor Response → Verbal Response → Eye Opening → GCS Score",
          "Altered Mental Status → Assess ABCs → Check Glucose → Evaluate Pupils → Transport Priority"
        ],
        fieldApplications: [
          "Perform systematic neurological assessment using standardized scales",
          "Document baseline neurological status and monitor for changes",
          "Assess pupil size, equality, and reaction to light bilaterally",
          "Evaluate motor strength and coordination in all extremities"
        ]
      },
      {
        title: "Musculoskeletal System and Movement",
        content: [
          "Skeletal system provides structural framework, protects organs, and produces blood cells in bone marrow",
          "Muscular system enables movement through contraction of skeletal, cardiac, and smooth muscle types",
          "Joints connect bones and allow movement with synovial fluid providing lubrication",
          "Tendons connect muscles to bones while ligaments connect bones to other bones",
          "Bone composition includes calcium and phosphate minerals providing strength and density",
          "Muscle contraction requires calcium, ATP, and nervous system stimulation for coordinated movement",
          "Fracture healing involves inflammatory, proliferative, and remodeling phases over months",
          "Musculoskeletal injuries can affect mobility, stability, and overall functional capacity"
        ],
        clinicalPearls: [
          "Adults have 206 bones with long bones containing growth plates until skeletal maturity",
          "Muscle strength graded 0-5 scale with 5/5 representing normal strength against resistance",
          "Joint range of motion assessment identifies limitations and potential injury",
          "Compartment syndrome develops when tissue pressure exceeds perfusion pressure"
        ],
        mnemonics: [
          "MUSCLES: Movement assessment, Understanding strength, Stability evaluate, Contractile function, Location of injury, Extremity circulation, Sensation check",
          "SKELETAL: Structure intact, Know anatomy, Examine systematically, Look for deformity, Evaluate function, Test sensation, Assessment complete, Location document"
        ],
        decisionTrees: [
          "Musculoskeletal Assessment → Inspection → Palpation → Range of Motion → Strength Testing → Circulation/Sensation",
          "Fracture Suspicion → Immobilize → Assess Circulation → Pain Management → Transport → Definitive Care"
        ],
        fieldApplications: [
          "Inspect for obvious deformity, swelling, or discoloration",
          "Palpate bones and joints for tenderness and crepitus",
          "Assess circulation, sensation, and motor function distal to injuries",
          "Immobilize suspected fractures to prevent further injury"
        ]
      }
    ],
    criticalConcepts: [
      "Body systems work together to maintain homeostasis and support life functions",
      "Understanding normal anatomy and physiology enables recognition of pathological changes",
      "System integration means dysfunction in one system affects others",
      "Clinical assessment must be systematic and thorough to identify all abnormalities",
      "Age-related changes alter normal values and expected responses"
    ],
    clinicalDecisionRules: [
      "Respiratory Assessment: Rate + Effort + Sounds + Oxygen saturation = Respiratory status",
      "Circulatory Assessment: Heart rate + Blood pressure + Perfusion signs = Cardiac status",
      "Neurological Assessment: Consciousness + Motor + Verbal + Eye response = GCS score"
    ],
    commonMisconceptions: [
      "MYTH: All body systems function independently - FACT: Systems are highly integrated and interdependent",
      "MYTH: Normal vital signs mean no serious illness - FACT: Compensatory mechanisms can maintain normal vitals initially",
      "MYTH: Anatomy is the same for all patients - FACT: Significant age-related and individual variations exist",
      "MYTH: One abnormal finding indicates the primary problem - FACT: Multiple system assessment required for complete picture"
    ],
    examTips: [
      "Body system questions often test integration and cascade effects",
      "Anatomy questions may include variations by age group",
      "Physiology questions focus on normal values and compensatory mechanisms",
      "Assessment questions emphasize systematic approach and interpretation"
    ],
    crossReferences: [
      "Chapter 5: Medical Terminology Foundations - anatomical terminology application",
      "Chapter 7: Life Span Development - age-related anatomical variations",
      "Chapter 10: Comprehensive Patient Evaluation - systematic assessment approach",
      "All clinical chapters - anatomical foundation for understanding pathology"
    ],
    flashcards: [
      { front: "What is the normal adult respiratory rate?", back: "12-20 breaths per minute", category: "clinical" },
      { front: "What is normal cardiac output?", back: "4-6 liters per minute", category: "clinical" },
      { front: "What is the normal pulse pressure range?", back: "30-40 mmHg (systolic minus diastolic)", category: "clinical" },
      { front: "What Glasgow Coma Scale score indicates severe brain injury?", back: "GCS less than 8", category: "clinical" },
      { front: "What is normal capillary refill time?", back: "Less than 2 seconds", category: "clinical" },
      { front: "What is homeostasis?", back: "Body's ability to maintain stable internal environment", category: "definition" },
      { front: "What connects muscles to bones?", back: "Tendons", category: "definition" },
      { front: "What connects bones to bones?", back: "Ligaments", category: "definition" },
      { front: "How many bones do adults have?", back: "206 bones", category: "definition" },
      { front: "What is the difference between ventilation and respiration?", back: "Ventilation moves air; respiration is cellular gas exchange", category: "definition" },
      { front: "What primarily controls respiratory drive?", back: "Carbon dioxide levels, not oxygen", category: "clinical" },
      { front: "What indicates respiratory distress?", back: "Accessory muscle use and increased work of breathing", category: "clinical" },
      { front: "What is stroke volume?", back: "Amount of blood pumped by heart with each contraction", category: "definition" },
      { front: "What protects nervous tissue from toxins?", back: "Blood-brain barrier", category: "definition" },
      { front: "What scale grades muscle strength?", back: "0-5 scale with 5/5 being normal strength", category: "clinical" }
    ]
  };

  const chapter7StudyNotes: ChapterData = {
    title: "Chapter 7: Life Span Development & Age-Related Care",
    description: "Comprehensive understanding of human development across the lifespan with age-specific assessment and treatment considerations for emergency medical care",
    module: "2",
    scope: "EMT-B",
    protocols: ["Age-Specific Assessment", "Developmental Considerations", "Pediatric Protocols", "Geriatric Adaptations", "Family-Centered Care", "Age-Appropriate Communication"],
    learningObjectives: [
      "Identify normal physical, cognitive, and psychosocial development across all life stages",
      "Apply age-appropriate assessment techniques and communication strategies for different populations",
      "Recognize age-related variations in vital signs, anatomy, and physiological responses",
      "Understand unique medical conditions and emergency presentations by age group",
      "Implement family-centered care approaches appropriate for developmental stage",
      "Adapt treatment protocols and equipment selection based on patient age and development"
    ],
    keyTerms: [
      "Neonate",
      "Infant",
      "Toddler",
      "Preschooler",
      "School Age",
      "Adolescent",
      "Young Adult",
      "Middle Adult",
      "Older Adult",
      "Geriatric",
      "Growth",
      "Development",
      "Milestones",
      "Fontanelles",
      "Stranger Anxiety",
      "Separation Anxiety",
      "Cognitive Development",
      "Psychosocial Development",
      "Physical Development",
      "Fine Motor Skills",
      "Gross Motor Skills",
      "Language Development",
      "Social Development",
      "Moral Development",
      "Puberty",
      "Menopause",
      "Senescence",
      "Polypharmacy",
      "Activities of Daily Living",
      "Instrumental Activities"
    ],
    sections: [
      {
        title: "Infant and Toddler Development (0-3 Years)",
        content: [
          "Neonates (0-1 month) have immature organ systems requiring specialized assessment and care approaches",
          "Infants (1 month-1 year) show rapid physical growth with doubling birth weight by 6 months",
          "Fontanelles remain open until 12-18 months providing access for intracranial pressure assessment",
          "Toddlers (1-3 years) develop autonomy while requiring constant supervision due to risk-taking behaviors",
          "Respiratory rates highest in this age group: neonates 30-60, infants 25-50, toddlers 20-30 per minute",
          "Heart rates elevated: neonates 120-160, infants 80-140, toddlers 80-130 beats per minute",
          "Blood pressure systems not fully developed requiring age-appropriate cuff sizing",
          "Communication primarily through crying in infants progressing to simple words in toddlers"
        ],
        clinicalPearls: [
          "Infants cannot regulate temperature effectively making hypothermia a significant risk",
          "Dehydration develops rapidly in infants due to higher fluid requirements per body weight",
          "Stranger anxiety peaks around 8-10 months making assessment challenging",
          "Toddler injuries often result from exploration behaviors and lack of danger awareness"
        ],
        mnemonics: [
          "INFANT: Immature systems, Needs frequent feeding, Fontanelles open, Assessment gentle, No temperature control, Temperature monitor closely",
          "TODDLER: Toileting learning, Outdoor supervision, Dangerous behaviors, Development rapid, Language emerging, Exploration constant, Requires patience"
        ],
        decisionTrees: [
          "Infant Assessment → Observe Before Touch → Assess Vital Signs → Check Fontanelles → Look for Fever → Family History",
          "Toddler Emergency → Calm Approach → Parent Present → Age-Appropriate Equipment → Gentle Handling → Distraction Techniques"
        ],
        fieldApplications: [
          "Use pediatric equipment sizing charts for accurate fit",
          "Allow parents to hold child during assessment when possible",
          "Assess fontanelles for bulging or depression indicating intracranial issues",
          "Monitor for signs of dehydration including sunken fontanelles and decreased skin turgor"
        ]
      },
      {
        title: "School Age and Adolescent Development (4-18 Years)",
        content: [
          "Preschoolers (3-6 years) develop language skills and begin following multi-step instructions",
          "School age children (6-12 years) show steady growth and development of logical thinking",
          "Adolescents (12-18 years) experience puberty with dramatic physical and emotional changes",
          "Vital signs gradually approach adult values throughout childhood and adolescence",
          "School age children can participate in assessment and understand explanations of procedures",
          "Adolescents desire privacy and independence while still requiring parental involvement",
          "Risk-taking behaviors increase during adolescence due to brain development patterns",
          "Body image concerns and peer pressure significantly influence adolescent behavior and compliance"
        ],
        clinicalPearls: [
          "School age children fear permanent injury and benefit from reassurance about healing",
          "Adolescents may hide substance use, sexual activity, or mental health issues from parents",
          "Growth spurts during adolescence can affect medication dosing and equipment sizing",
          "Modesty and privacy become increasingly important from school age onward"
        ],
        mnemonics: [
          "SCHOOL: Safety education, Cooperative with treatment, Home and family stable, Organized thinking, Opportunities for choices, Logical explanations helpful",
          "ADOLESCENT: Autonomy seeking, Development rapid, Opinions strong, Lifestyles risky, Education about consequences, Social pressures, Career planning, Environment peer-influenced, No child anymore, Trust building important"
        ],
        decisionTrees: [
          "School Age Care → Explain Procedures → Allow Choices → Include in Assessment → Provide Reassurance → Family Support",
          "Adolescent Care → Respect Privacy → Direct Communication → Address Concerns → Confidentiality Issues → Family Dynamics"
        ],
        fieldApplications: [
          "Explain procedures in age-appropriate language before performing",
          "Offer choices when possible to promote cooperation",
          "Respect modesty with appropriate draping and positioning",
          "Consider interviewing adolescents separately from parents for sensitive issues"
        ]
      },
      {
        title: "Adult Development and Aging Process (18+ Years)",
        content: [
          "Young adults (18-40 years) generally healthy with peak physical performance and few medical conditions",
          "Middle adults (40-65 years) experience gradual physiological changes and increased chronic disease risk",
          "Older adults (65+ years) show significant individual variation in health status and functional capacity",
          "Aging process affects all body systems with gradual decline in reserve capacity",
          "Cardiovascular changes include decreased cardiac output and increased blood pressure",
          "Respiratory changes involve decreased lung capacity and efficiency",
          "Neurological changes may affect reaction time, memory, and sensory function",
          "Musculoskeletal changes include bone density loss and muscle mass reduction"
        ],
        clinicalPearls: [
          "Older adults may present atypically with serious conditions like myocardial infarction",
          "Medication interactions increase significantly with polypharmacy in older adults",
          "Falls are leading cause of injury in adults over 65 with high morbidity and mortality",
          "Cognitive assessment must distinguish between normal aging and pathological conditions"
        ],
        mnemonics: [
          "AGING: Assessment thorough, Gradual changes, Increased medication risks, Normal variations wide, Goals maintain function",
          "OLDER: Optimal function goal, Listen carefully, Dignity maintain, Evaluate thoroughly, Respect autonomy"
        ],
        decisionTrees: [
          "Adult Assessment → Medical History → Current Medications → Functional Status → Social Support → Risk Factors",
          "Geriatric Emergency → Assess Baseline Function → Check Medications → Evaluate Mental Status → Consider Atypical Presentation"
        ],
        fieldApplications: [
          "Obtain comprehensive medication list including over-the-counter drugs",
          "Assess functional status and activities of daily living",
          "Consider multiple diagnoses as older adults often have several conditions",
          "Communicate clearly and allow extra time for responses"
        ]
      },
      {
        title: "Special Considerations and Family Dynamics",
        content: [
          "Family-centered care involves family members as partners in healthcare decisions and support",
          "Cultural considerations affect development expectations and healthcare preferences",
          "Developmental disabilities require individualized assessment approaches and communication strategies",
          "Chronic illness impacts normal developmental progression and family dynamics",
          "End-of-life care considerations vary by age group and family circumstances",
          "Child abuse and elder abuse recognition requires understanding of normal development patterns",
          "Communication strategies must adapt to cognitive abilities and emotional development",
          "Social determinants of health significantly impact development and health outcomes across lifespan"
        ],
        clinicalPearls: [
          "Family presence during medical emergencies can reduce anxiety in patients of all ages",
          "Cultural competence improves communication and treatment compliance",
          "Developmental delays may affect ability to cooperate with assessment and treatment",
          "Signs of abuse may be subtle and require high index of suspicion"
        ],
        mnemonics: [
          "FAMILY: Focus on patient needs, Assessment includes family, Maintain communication, Involve appropriately, Learn preferences, Year-round support",
          "CULTURE: Consider beliefs, Understand practices, Language preferences, Traditions respect, Understand worldview, Religious considerations, Education culturally appropriate"
        ],
        decisionTrees: [
          "Family Involvement → Assess Dynamics → Determine Decision Makers → Include Appropriately → Communicate Effectively",
          "Cultural Sensitivity → Learn Background → Respect Beliefs → Adapt Communication → Include Cultural Preferences"
        ],
        fieldApplications: [
          "Include family members in age-appropriate ways during emergency care",
          "Adapt communication style to patient's cognitive and emotional development",
          "Recognize when family dynamics may be affecting patient care",
          "Consider cultural factors when developing treatment and transport plans"
        ]
      }
    ],
    criticalConcepts: [
      "Normal development varies widely between individuals while following predictable patterns",
      "Age-appropriate care requires understanding of physical, cognitive, and emotional development",
      "Vital signs and normal values change significantly across the lifespan",
      "Family dynamics and cultural factors significantly influence healthcare experiences",
      "Communication strategies must adapt to developmental stage and individual capabilities"
    ],
    clinicalDecisionRules: [
      "Pediatric Vital Signs: Use age-appropriate normal ranges for assessment and intervention decisions",
      "Family Involvement: Include family in age-appropriate ways while respecting patient autonomy",
      "Communication Level: Match explanation complexity to patient's cognitive developmental stage"
    ],
    commonMisconceptions: [
      "MYTH: All children develop at the same rate - FACT: Significant individual variation exists within normal ranges",
      "MYTH: Older adults always have multiple medical problems - FACT: Many older adults maintain good health",
      "MYTH: Teenagers always rebel against medical advice - FACT: Most respond well to respectful, honest communication",
      "MYTH: Families always help in medical emergencies - FACT: Family dynamics can sometimes complicate care"
    ],
    examTips: [
      "Vital sign questions often test age-specific normal ranges",
      "Development questions focus on major milestones and variations",
      "Communication questions emphasize age-appropriate strategies",
      "Family dynamics questions test understanding of developmental needs"
    ],
    crossReferences: [
      "Chapter 6: Human Body Systems - physiological changes with aging",
      "Chapter 34: Pediatric Emergency Protocols - specific pediatric care applications",
      "Chapter 35: Geriatric Care Considerations - detailed older adult considerations",
      "Chapter 10: Comprehensive Patient Evaluation - age-specific assessment techniques"
    ],
    flashcards: [
      { front: "What is the normal heart rate range for neonates?", back: "120-160 beats per minute", category: "clinical" },
      { front: "What is the normal respiratory rate for infants?", back: "25-50 breaths per minute", category: "clinical" },
      { front: "When do fontanelles typically close?", back: "12-18 months", category: "clinical" },
      { front: "What age group shows stranger anxiety?", back: "Infants around 8-10 months", category: "definition" },
      { front: "What defines a neonate?", back: "0-1 month of age", category: "definition" },
      { front: "What defines a toddler?", back: "1-3 years of age", category: "definition" },
      { front: "When does puberty typically begin?", back: "Ages 12-18 years (adolescence)", category: "clinical" },
      { front: "What is polypharmacy?", back: "Taking multiple medications, common in older adults", category: "definition" },
      { front: "What age group has the highest respiratory rates?", back: "Neonates (30-60 breaths per minute)", category: "clinical" },
      { front: "What is separation anxiety?", back: "Distress when separated from primary caregiver, common in infants/toddlers", category: "definition" },
      { front: "What defines older adult/geriatric age?", back: "65+ years of age", category: "definition" },
      { front: "What is the leading cause of injury in adults over 65?", back: "Falls", category: "clinical" },
      { front: "What might affect medication dosing in adolescents?", back: "Growth spurts and rapid physical changes", category: "clinical" },
      { front: "Why can't infants regulate temperature effectively?", back: "Immature thermoregulatory systems", category: "clinical" },
      { front: "What is family-centered care?", back: "Involving family members as partners in healthcare decisions and support", category: "definition" }
    ]
  };

  const chapter3DuplicateToDelete: ChapterData = {
    title: "Chapter 3: EMS Law & Ethical Practice",
    description: "Evidence-based workforce safety protocols and wellness strategies for emergency medical professionals",
    module: "1",
    scope: "EMT-B",
    learningObjectives: [
      "Assess unique occupational hazards in emergency medical services",
      "Apply stress management techniques and resilience-building strategies", 
      "Distinguish between adaptive (eustress) and maladaptive (distress) stress responses",
      "Implement evidence-based nutrition and fitness protocols for shift workers",
      "Execute proper body mechanics and injury prevention techniques",
      "Apply infection control principles and standard precautions",
      "Select and use appropriate Personal Protective Equipment (PPE)",
      "Recognize signs of burnout, PTSD, and compassion fatigue",
      "Demonstrate professional communication in emotionally charged situations",
      "Practice cultural competency and ethical decision-making"
    ],
    keyTerms: [
      "Eustress vs. Distress",
      "Allostatic Load", 
      "Wellness Continuum",
      "Resilience Factors",
      "Circadian Rhythm Disruption",
      "Pathogen Transmission Routes",
      "Standard Precautions",
      "PPE Hierarchy",
      "Critical Incident Stress Management (CISM)",
      "Secondary Traumatic Stress",
      "Burnout Syndrome",
      "Compassion Fatigue",
      "Cultural Humility",
      "Scope of Practice"
    ],
    protocols: [
      "Standard Precautions Protocol",
      "PPE Selection and Donning/Doffing",
      "Exposure Control Plan",
      "Critical Incident Stress Debriefing",
      "Fitness for Duty Assessment",
      "Workplace Violence Prevention"
    ],
    sections: [
      {
        title: "🎯 Occupational Hazards in EMS",
        content: [
          "**Statistical Reality**: 84% of first responders experience traumatic events; 34% develop depression/PTSD",
          "**Suicide Risk**: EMS professionals have 1.39x higher suicide rate vs. general population",
          "**Primary Risk Categories**: Infectious disease exposure, musculoskeletal injuries, vehicle accidents, violence exposure",
          "**Injury Statistics**: 50% higher rate of non-fatal occupational injuries than other healthcare workers"
        ],
        clinicalPearls: [
          "EMS workers are 2.5x more likely to be injured than police officers",
          "Back injuries account for 60% of all EMS workplace injuries",
          "Night shift workers have 30% higher injury rates"
        ],
        fieldApplications: [
          "Pre-shift equipment check reduces injury risk by 40%",
          "Crew resource management prevents 70% of preventable errors",
          "Proper scene size-up identifies 90% of safety hazards"
        ]
      },
      {
        title: "⚖️ Stress Management & Resilience",
        content: [
          "**Eustress vs. Distress**: Beneficial stress improves performance; harmful stress degrades function",
          "**Allostatic Load**: Cumulative physiological wear from chronic stress exposure",
          "**Resilience Factors**: Social support, self-efficacy, optimism, problem-solving skills",
          "**Warning Signs**: Sleep disturbances, appetite changes, irritability, substance use"
        ],
        mnemonics: [
          "**TEAM approach to stress**: Talk about it, Exercise regularly, Avoid alcohol/drugs, Maintain relationships",
          "**HALT check**: Hungry, Angry, Lonely, Tired - address these basic needs first"
        ],
        decisionTrees: [
          "If experiencing 3+ stress symptoms for >2 weeks → Seek EAP or mental health support",
          "If using substances to cope → Immediate intervention required"
        ]
      },
      {
        title: "🦠 Infection Control & PPE",
        content: [
          "**Transmission Routes**: Contact (direct/indirect), Droplet, Airborne, Vector-borne",
          "**Standard Precautions**: Treat all body fluids as potentially infectious",
          "**PPE Hierarchy**: Hand hygiene → Gloves → Eye protection → Mask/respirator → Gown",
          "**High-Risk Exposures**: Blood, CSF, synovial, pleural, pericardial, peritoneal fluids"
        ],
        clinicalPearls: [
          "Hand hygiene prevents 50% of healthcare-associated infections",
          "N95 respirators filter 95% of particles ≥0.3 microns",
          "Gloves must be changed between patients - never reused"
        ],
        commonPitfalls: [
          "❌ Touching face with contaminated gloves",
          "❌ Improper mask fit (allows 50% leakage)",
          "❌ Not removing PPE in proper sequence"
        ]
      },
      {
        title: "💪 Physical Wellness & Injury Prevention",
        content: [
          "**Proper Lifting**: Power zone (waist-shoulder height), avoid twisting, team lifts >50 lbs",
          "**Sleep Hygiene**: 7-9 hours minimum, consistent schedule, dark/cool environment",
          "**Nutrition**: Complex carbs for sustained energy, hydrate 8-10 glasses water/day",
          "**Fitness Standards**: Cardiovascular endurance, functional strength, flexibility"
        ],
        mnemonics: [
          "**BACK safety**: Bend your knees, Avoid twisting, Close to body, Keep back straight",
          "**SLEEP**: Schedule consistent, Light exposure morning, Exercise regularly, Evening routine, Phone/screens off"
        ],
        fieldApplications: [
          "Proper lifting prevents 80% of back injuries",
          "Pre-shift stretching reduces injury risk by 25%",
          "Team lifts required for patients >125 lbs"
        ]
      }
    ],
    criticalConcepts: [
      "🚨 **Exposure Protocol**: Immediately wash with soap/water, report to supervisor within 2 hours, seek medical evaluation",
      "🧠 **Mental Health**: Seeking help is strength, not weakness - 40% of first responders never seek treatment",
      "⚖️ **Work-Life Balance**: Burnout affects patient care quality and increases medical errors by 300%",
      "👥 **Team Safety**: Look out for crew members - 60% of LODD are preventable with proper safety protocols"
    ],
    clinicalDecisionRules: [
      "**PPE Selection**: Airborne precautions for TB, measles, varicella; Droplet for flu, meningitis; Contact for MRSA, C.diff",
      "**Fitness for Duty**: Unable to perform essential functions safely = off duty until cleared by medical provider",
      "**Stress Intervention**: Immediate defusing after critical incidents; formal debriefing within 24-72 hours"
    ],
    commonMisconceptions: [
      "❌ \"I'm immune to stress\" - Everyone is susceptible to cumulative stress effects",
      "❌ \"PPE slows me down\" - Proper PPE use actually improves efficiency and confidence",
      "❌ \"Asking for help shows weakness\" - 90% of successful first responders use support systems"
    ],
    examTips: [
      "📝 Know PPE donning/doffing sequence: Gown → Mask → Goggles → Gloves | Remove: Gloves → Goggles → Gown → Mask",
      "📝 Understand hepatitis transmission: HBV can survive on surfaces 7+ days, requires vaccination",
      "📝 Memorize stress warning signs: Changes in sleep, appetite, mood, performance, relationships"
    ],
    crossReferences: [
      "→ Chapter 10: Patient assessment includes scene safety evaluation",
      "→ Chapter 11: Airway management requires infection control measures", 
      "→ Medication protocols: Stress affects decision-making and drug calculations"
    ],
    flashcards: [
      { front: "What is the difference between eustress and distress?", back: "Eustress is beneficial stress that improves performance; distress is harmful stress that degrades function", category: "definition" },
      { front: "What percentage of first responders experience traumatic events?", back: "84% of first responders experience traumatic events", category: "clinical" },
      { front: "What is the proper PPE donning sequence?", back: "Gown → Mask → Goggles → Gloves", category: "protocol" },
      { front: "What is the proper PPE doffing sequence?", back: "Gloves → Goggles → Gown → Mask (mask removed last)", category: "protocol" },
      { front: "What does the TEAM mnemonic stand for in stress management?", back: "Talk about it, Exercise regularly, Avoid alcohol/drugs, Maintain relationships", category: "clinical" },
      { front: "What does the BACK safety mnemonic represent?", back: "Bend your knees, Avoid twisting, Close to body, Keep back straight", category: "protocol" },
      { front: "What are the four main transmission routes for pathogens?", back: "Contact (direct/indirect), Droplet, Airborne, Vector-borne", category: "definition" },
      { front: "What is allostatic load?", back: "Cumulative physiological wear from chronic stress exposure", category: "definition" },
      { front: "When should team lifts be used?", back: "For patients over 125 lbs or objects over 50 lbs", category: "protocol" },
      { front: "What is the HALT check for stress assessment?", back: "Hungry, Angry, Lonely, Tired - address these basic needs first", category: "clinical" },
      { front: "How long can Hepatitis B virus survive on surfaces?", back: "7+ days, which is why vaccination is required", category: "clinical" },
      { front: "What percentage of healthcare-associated infections does hand hygiene prevent?", back: "50% of healthcare-associated infections", category: "clinical" },
      { front: "What are the high-risk body fluids requiring standard precautions?", back: "Blood, CSF, synovial, pleural, pericardial, peritoneal fluids", category: "protocol" },
      { front: "When should critical incident stress debriefing occur?", back: "Formal debriefing within 24-72 hours after critical incidents", category: "protocol" },
      { front: "What percentage of first responders never seek mental health treatment?", back: "40% of first responders never seek treatment despite needing it", category: "clinical" }
    ]
  };

  // Module 2 Chapters
  const chapter8StudyNotes: ChapterData = {
    title: "Chapter 8: Patient Movement & Handling",
    description: "Proper body mechanics, patient positioning, and safe patient transport techniques with emphasis on ergonomic principles and injury prevention",
    module: "2",
    scope: "EMT-B",
    protocols: ["Body Mechanics", "Patient Positioning", "Emergency Moves", "Non-Emergency Moves", "Equipment Operation", "Spinal Immobilization"],
    learningObjectives: [
      "Demonstrate proper body mechanics and lifting techniques to prevent injury",
      "Select appropriate patient moving and positioning methods based on patient condition",
      "Perform emergency and non-emergency patient moves safely and efficiently",
      "Operate patient transport equipment properly and safely"
    ],
    keyTerms: [
      "Body Mechanics",
      "Power Grip",
      "Power Lift",
      "Emergency Move",
      "Non-Emergency Move",
      "Urgent Move",
      "Direct Ground Lift",
      "Extremity Lift",
      "Draw Sheet Method",
      "Blanket Drag",
      "Clothes Drag",
      "Firefighter's Carry",
      "Cradle Carry",
      "Pack Strap Carry",
      "Piggyback Carry",
      "Two-Person Carry",
      "Chair Carry",
      "Stair Chair",
      "Scoop Stretcher",
      "Basket Stretcher",
      "Flexible Stretcher",
      "Backboard",
      "Vacuum Mattress",
      "Recovery Position",
      "Trendelenburg Position",
      "Fowler's Position",
      "Semi-Fowler's Position",
      "Shock Position"
    ],
    sections: [
      {
        title: "Body Mechanics and Injury Prevention",
        content: [
          "Proper body mechanics are essential for preventing back injuries, which account for 37% of EMS worker injuries annually",
          "The power grip involves all fingers and thumb gripping firmly with hands at least 10 inches apart",
          "Power lift technique: feet shoulder-width apart, back straight, lift with legs not back",
          "Never lift more than 125 pounds per person - use additional personnel or mechanical devices",
          "Maintain natural curves of spine - avoid twisting while lifting",
          "Get as close as possible to patient before lifting to reduce stress on spine",
          "Communicate clearly with team members using standardized commands: 'Lift on 3: 1, 2, 3, lift'",
          "Take breaks between lifts to prevent fatigue-related injuries"
        ],
        clinicalPearls: [
          "Back injuries are the leading cause of EMT career-ending injuries",
          "Proper lifting technique reduces spine compression by up to 50%",
          "Team lifting with 4 people reduces individual load by 75%",
          "Fatigue increases injury risk by 300% - recognize when to use mechanical aids"
        ],
        mnemonics: [
          "LIFT: Legs up, In close, Feet apart, Team communication",
          "SAFE: Squat down, Abdominals tight, Feet apart, Everyone lifts together"
        ],
        decisionTrees: [
          "Patient Weight Assessment → <125 lbs (2 person lift) → 125-250 lbs (4 person lift) → >250 lbs (mechanical device required)",
          "Injury Risk → High risk position → Use additional personnel → Consider mechanical aids → Execute with proper technique"
        ],
        fieldApplications: [
          "Always assess patient weight and your team's capabilities before attempting lift",
          "Use stair chair for narrow staircases - never attempt manual carry on stairs",
          "Cold weather increases muscle stiffness - take extra time to warm up",
          "Wet conditions require extra caution and additional personnel"
        ]
      },
      {
        title: "Emergency vs Non-Emergency Moves",
        content: [
          "Emergency moves used only when immediate danger exists: fire, explosion, structural collapse",
          "Urgent moves when patient condition requires rapid transport but no immediate environmental danger",
          "Non-emergency moves are planned, controlled movements with spinal precautions maintained",
          "Emergency moves may cause spinal injury but are necessary when delay would be fatal",
          "Always consider whether scene safety allows for spinal immobilization",
          "Document rationale for emergency move in patient care report",
          "Three-person spinal immobilization move is preferred when time permits"
        ],
        clinicalPearls: [
          "Emergency moves should take <30 seconds to execute",
          "Only 3% of trauma patients have unstable spinal injuries, but treat all as potential",
          "Rapid extrication increases mortality by 15% compared to controlled removal",
          "Environmental hazards cause more EMS deaths than patient care complications"
        ],
        mnemonics: [
          "FIRE: Fast movement, Immediate danger, Rapid extrication, Emergency justification",
          "SAFE: Scene assessment, All clear, Formal immobilization, Executed properly"
        ],
        decisionTrees: [
          "Scene Assessment → Immediate danger (fire/explosion/collapse) → Emergency move → Otherwise → Assess patient stability → Urgent vs non-emergency move",
          "Spinal Injury Concern → High mechanism → Full immobilization → Low mechanism → Consider selective immobilization"
        ],
        fieldApplications: [
          "Vehicle fires require immediate removal regardless of potential spinal injury",
          "Combative patients may require rapid moves to prevent further injury",
          "Mass casualty incidents often require urgent moves to access other patients",
          "Indoor scenes with structural damage require continuous assessment of stability"
        ]
      },
      {
        title: "Patient Positioning and Transport",
        content: [
          "Recovery position (lateral recumbent) for unconscious patients without spinal injury",
          "Fowler's position (45-60° elevation) for respiratory distress patients",
          "Semi-Fowler's (30° elevation) for cardiac patients and mild respiratory distress",
          "Trendelenburg position contraindicated in modern EMS - may worsen outcomes",
          "Shock position: supine with legs elevated 6-12 inches if no contraindications",
          "Left lateral recumbent for pregnant patients >20 weeks to prevent supine hypotensive syndrome",
          "Transport position must consider patient comfort, clinical condition, and monitoring needs"
        ],
        clinicalPearls: [
          "Trendelenburg position can increase intracranial pressure and worsen pulmonary edema",
          "Fowler's position reduces work of breathing by 25% in CHF patients",
          "Pregnant patients develop supine hypotensive syndrome after 20 weeks gestation",
          "Recovery position prevents aspiration in unconscious patients without spinal injury"
        ],
        mnemonics: [
          "FOWLER: Forty-five degrees, Oxygenation improved, Working breathing easier, Lung expansion, Enhanced ventilation, Reduced distress",
          "POSITION: Patient comfort, Optimal monitoring, Spinal considerations, Injury pattern, Transport time, Interventions needed, Ongoing assessment, Never compromise safety"
        ],
        decisionTrees: [
          "Conscious Level → Unconscious + no spinal injury → Recovery position → Conscious → Assess respiratory status → Position accordingly",
          "Respiratory Distress → Severe → High Fowler's → Mild → Semi-Fowler's → None → Comfort position"
        ],
        fieldApplications: [
          "Stroke patients should remain supine unless actively vomiting",
          "Chest pain patients often prefer semi-Fowler's for comfort and monitoring",
          "Hypotensive patients may not tolerate elevation - reassess after position change",
          "Long transport times require position adjustments for pressure relief"
        ]
      },
      {
        title: "Equipment Operation and Maintenance",
        content: [
          "Daily equipment checks prevent 95% of transport device failures",
          "Stretcher weight capacity: standard 350 lbs, bariatric 650-1000 lbs",
          "Stair chair maximum weight 300 lbs - verify patient weight before use",
          "Scoop stretcher allows patient pickup without rolling but requires proper sizing",
          "Basket stretcher for wilderness or rope rescue operations",
          "Vacuum mattresses conform to patient shape and provide excellent immobilization",
          "All equipment must be cleaned and disinfected between patients",
          "Document equipment malfunctions and report immediately"
        ],
        clinicalPearls: [
          "Equipment failure during transport increases morbidity by 400%",
          "Improper stretcher height causes 60% of back injuries in EMS",
          "Scoop stretcher gaps can cause tissue entrapment - check alignment",
          "Stair chairs tip over when weight exceeds manufacturer specifications"
        ],
        mnemonics: [
          "INSPECT: Is it clean, Need repairs, Safe operation, Properly aligned, Equipment tested, Check weight limits, Test all functions",
          "MAINTAIN: Monthly inspection, All functions tested, Immediate repairs, Never ignore problems, Take out of service if unsafe, Always document, In proper condition, Never compromise safety"
        ],
        decisionTrees: [
          "Equipment Check → Daily inspection → Problems found → Take out of service → No problems → Ready for use → Document check",
          "Patient Weight → <300 lbs → Standard equipment → 300-650 lbs → Bariatric equipment → >650 lbs → Multiple personnel/special equipment"
        ],
        fieldApplications: [
          "Stretcher height should allow EMT to work without bending over",
          "Lock all wheels before patient transfer to prevent rolling",
          "Test electronic controls before each shift - have manual backup plan",
          "Clean equipment immediately after contamination to prevent damage"
        ]
      }
    ],
    criticalConcepts: [
      "Proper body mechanics prevent injury - use legs, not back for lifting",
      "Emergency moves only justified by immediate life threat to patient or crew",
      "Patient positioning directly affects respiratory and circulatory function",
      "Equipment failure during transport creates serious patient safety risks",
      "Team communication essential for safe patient movement"
    ],
    clinicalDecisionRules: [
      "Emergency Move Criteria: Fire, explosion, unable to access other patients, unable to provide life-saving care in current position",
      "Spinal Immobilization Decision: High-energy mechanism OR neurological deficit OR spinal pain/tenderness OR altered mental status",
      "Equipment Selection: Patient weight + clinical condition + transport environment + crew capabilities"
    ],
    commonMisconceptions: [
      "MYTH: Trendelenburg position improves blood pressure in shock - FACT: May worsen outcomes by increasing ICP and pulmonary congestion",
      "MYTH: Emergency moves always cause spinal injury - FACT: When properly executed, risk is acceptable given alternative of death",
      "MYTH: Stronger EMTs should always do the lifting - FACT: Proper technique matters more than strength",
      "MYTH: Scoop stretchers can be used for all patients - FACT: Contraindicated in suspected pelvic fractures"
    ],
    examTips: [
      "Questions often focus on when emergency moves are justified - remember immediate life threats only",
      "Body mechanics questions emphasize legs for power, not back",
      "Positioning questions test knowledge of respiratory and cardiac benefits",
      "Equipment questions focus on weight limits and proper inspection procedures"
    ],
    crossReferences: [
      "Chapter 2: Workforce Safety - relates to injury prevention",
      "Chapter 10: Patient Assessment - positioning affects assessment ability", 
      "Chapter 31: Spinal Injuries - immobilization techniques",
      "Chapter 32: Orthopedic Injuries - movement considerations"
    ],
    flashcards: [
      { front: "What is the power grip technique?", back: "All fingers and thumb grip firmly with hands at least 10 inches apart", category: "definition" },
      { front: "When are emergency moves justified?", back: "Fire, explosion, structural collapse, or inability to access life-threatening conditions", category: "protocol" },
      { front: "What is the maximum weight for a 2-person lift?", back: "125 pounds per person (250 total)", category: "protocol" },
      { front: "What position is best for respiratory distress?", back: "Fowler's position (45-60 degree elevation)", category: "clinical" },
      { front: "What is the recovery position used for?", back: "Unconscious patients without spinal injury to prevent aspiration", category: "clinical" },
      { front: "Why avoid Trendelenburg position?", back: "Can increase ICP and worsen pulmonary edema", category: "clinical" },
      { front: "What is supine hypotensive syndrome?", back: "Decreased blood pressure in pregnant patients >20 weeks when lying supine", category: "clinical" },
      { front: "What is the weight limit for a stair chair?", back: "300 pounds", category: "protocol" },
      { front: "How should you communicate during team lifts?", back: "Clear commands: 'Lift on 3: 1, 2, 3, lift'", category: "protocol" },
      { front: "What causes most EMS worker injuries?", back: "Back injuries (37% of all EMS injuries)", category: "clinical" },
      { front: "When should scoop stretchers NOT be used?", back: "Suspected pelvic fractures - can cause tissue entrapment", category: "clinical" },
      { front: "What is Semi-Fowler's position?", back: "30 degree elevation - used for cardiac patients and mild respiratory distress", category: "definition" },
      { front: "How much should legs be elevated in shock position?", back: "6-12 inches if no contraindications present", category: "protocol" },
      { front: "What increases injury risk by 300%?", back: "Fatigue - recognize when to use mechanical aids", category: "clinical" },
      { front: "What is the clothes drag technique?", back: "Emergency move pulling patient by clothing around shoulders", category: "definition" }
    ]
  };

  const chapter9StudyNotes: ChapterData = {
    title: "Chapter 9: Interprofessional EMS Teams",
    description: "Interprofessional collaboration, communication systems, and team dynamics in emergency medical services with emphasis on effective patient care coordination",
    module: "2", 
    scope: "EMT-B",
    protocols: ["Team Communication", "Hospital Transfer", "ICS Integration", "Quality Improvement", "Professional Development", "Interprofessional Collaboration"],
    learningObjectives: [
      "Demonstrate effective communication with healthcare team members",
      "Understand roles and responsibilities within the EMS system",
      "Apply teamwork principles to optimize patient care outcomes",
      "Participate in quality improvement and continuing education activities"
    ],
    keyTerms: [
      "Interprofessional Collaboration",
      "Chain of Command", 
      "Scope of Practice",
      "Standard of Care",
      "Quality Improvement",
      "Continuing Education",
      "Peer Review",
      "Clinical Guidelines",
      "Evidence-Based Practice",
      "Team Dynamics",
      "Communication Hierarchy",
      "Situational Awareness",
      "Closed-Loop Communication",
      "SBAR Communication",
      "Handoff Report", 
      "Transfer of Care",
      "Medical Direction",
      "Online Medical Control",
      "Offline Medical Control",
      "Standing Orders",
      "Protocols",
      "Quality Assurance",
      "Continuous Quality Improvement",
      "Root Cause Analysis",
      "Incident Command System",
      "Multi-Agency Response",
      "Unified Command",
      "Professional Development",
      "Competency Maintenance"
    ],
    sections: [
      {
        title: "Healthcare Team Structure and Roles",
        content: [
          "EMS operates within integrated healthcare system including hospitals, rehabilitation, public health",
          "Chain of command establishes clear authority and communication pathways",
          "Scope of practice defines legal boundaries for each healthcare provider level",
          "EMT-B scope includes basic life support, patient assessment, and emergency care",
          "Medical director provides clinical oversight and protocol development",
          "Quality assurance monitors care quality and identifies improvement opportunities",
          "Each team member has specific roles that complement overall patient care",
          "Understanding roles prevents duplication of effort and improves efficiency"
        ],
        clinicalPearls: [
          "Clear role definition reduces medical errors by 45% in emergency settings",
          "EMTs function under medical director's license - must follow protocols exactly",
          "Scope creep (performing outside scope) creates liability and patient safety risks",
          "Team communication errors cause 60% of preventable adverse events"
        ],
        mnemonics: [
          "TEAM: Together Everyone Achieves More",
          "ROLES: Responsibility, Oversight, Legal boundaries, Effective communication, Scope definition"
        ],
        decisionTrees: [
          "Scope Question → Is intervention within EMT-B scope → Yes → Follow protocol → No → Consult medical control or higher-level provider",
          "Chain of Command → Direct supervisor → Medical director → Hospital command → Administration"
        ],
        fieldApplications: [
          "Always identify yourself and credentials when joining healthcare team",
          "Clarify expectations when working with unfamiliar team members",
          "Respect scope limitations - ask for help rather than exceeding authority",
          "Document team member roles and actions in patient care report"
        ]
      },
      {
        title: "Effective Communication Systems",
        content: [
          "SBAR (Situation, Background, Assessment, Recommendation) provides structured communication framework",
          "Closed-loop communication confirms message received and understood correctly",
          "Handoff reports must include critical patient information and intervention history",
          "Radio communication follows standardized protocols to ensure clarity",
          "Written documentation supplements verbal communication for continuity",
          "Cultural competence improves communication with diverse patients and families",
          "Technology integration includes electronic health records and mobile devices",
          "Emergency communication systems must function during disasters and system failures"
        ],
        clinicalPearls: [
          "SBAR communication reduces medical errors by 30% during patient transfers",
          "Closed-loop communication catches 85% of communication errors before patient impact",
          "Poor handoff communication causes 80% of preventable patient safety events",
          "Standard terminology prevents misunderstandings in high-stress situations"
        ],
        mnemonics: [
          "SBAR: Situation, Background, Assessment, Recommendation",
          "COMMUNICATE: Clear message, Open listening, Make eye contact, Multiple confirmation, Understanding verified, Never assume, Include all team, Clarify questions, Address concerns, Transfer complete, Everyone informed"
        ],
        decisionTrees: [
          "Communication Issue → Clarify message → Confirm understanding → Document interaction → Follow up as needed",
          "Language Barrier → Use interpreter services → Avoid family translation → Confirm understanding → Document language needs"
        ],
        fieldApplications: [
          "Practice SBAR format during routine transfers to build competency",
          "Use read-back technique for all critical communications",
          "Speak clearly and avoid medical jargon with patients and families",
          "Document communication attempts and outcomes in patient record"
        ]
      },
      {
        title: "Quality Improvement and Professional Development",
        content: [
          "Continuous quality improvement (CQI) uses data to identify and address care gaps",
          "Peer review provides constructive feedback on patient care performance",
          "Continuing education maintains competency and introduces new practices",
          "Evidence-based practice integrates research findings with clinical experience",
          "Professional development includes formal education and skill enhancement",
          "Quality metrics include response times, clinical outcomes, and patient satisfaction",
          "Root cause analysis identifies system factors contributing to adverse events",
          "Professional organizations provide networking and continuing education opportunities"
        ],
        clinicalPearls: [
          "Services with active QI programs show 25% better patient outcomes",
          "Continuing education requirements vary by state but typically 24-48 hours biennially",
          "Peer feedback is most effective when focused on specific, observable behaviors",
          "Research shows EMT skills decay without regular practice and education"
        ],
        mnemonics: [
          "IMPROVE: Identify problems, Measure outcomes, Plan interventions, Review results, Ongoing assessment, Verify effectiveness, Everyone participates",
          "LEARN: Look for opportunities, Engage in education, Apply new knowledge, Reflect on practice, Network with colleagues"
        ],
        decisionTrees: [
          "Quality Issue → Identify problem → Analyze causes → Develop solutions → Implement changes → Measure results → Sustain improvements",
          "Learning Need → Assess knowledge gaps → Identify resources → Engage in education → Apply to practice → Evaluate effectiveness"
        ],
        fieldApplications: [
          "Participate actively in case review sessions and quality meetings",
          "Seek feedback from supervisors and experienced colleagues",
          "Maintain log of continuing education activities for recertification",
          "Apply research findings to improve patient care practices"
        ]
      },
      {
        title: "Multi-Agency Coordination and ICS Integration",
        content: [
          "Incident Command System (ICS) provides standardized approach to emergency management",
          "Multi-agency responses require clear communication and coordination protocols", 
          "Unified command allows multiple agencies to work together effectively",
          "Resource management prevents duplication and ensures adequate coverage",
          "Information sharing between agencies improves situational awareness",
          "Training exercises prepare teams for large-scale emergency response",
          "Mutual aid agreements provide additional resources during major incidents",
          "After-action reviews identify lessons learned and improvement opportunities"
        ],
        clinicalPearls: [
          "ICS reduces response time and improves coordination by 40% in major incidents",
          "Multi-agency training exercises improve real-world performance significantly",
          "Clear command structure prevents freelancing and improves safety",
          "Resource typing ensures appropriate capabilities are deployed to incidents"
        ],
        mnemonics: [
          "ICS: Incident command, Coordination system, Standardized approach",
          "COORDINATE: Communication clear, Objectives shared, Organize resources, Roles defined, Deploy appropriately, Information shared, Never work alone, Assess continuously, Team approach, Everyone accountable"
        ],
        decisionTrees: [
          "Multi-Agency Scene → Establish command → Define roles → Communicate objectives → Coordinate actions → Debrief afterward",
          "Resource Request → Assess needs → Contact appropriate agency → Coordinate deployment → Monitor effectiveness → Return when complete"
        ],
        fieldApplications: [
          "Report to incident command when arriving at multi-agency scenes",
          "Use clear, concise communication on emergency radio channels",
          "Stay within assigned role unless directed otherwise by command",
          "Participate in post-incident critiques to identify improvements"
        ]
      }
    ],
    criticalConcepts: [
      "Effective teamwork requires clear communication and defined roles",
      "EMT scope of practice must be strictly adhered to for legal and safety reasons", 
      "Quality improvement is ongoing process requiring active participation",
      "Professional development maintains competency and improves patient care",
      "Multi-agency coordination improves emergency response effectiveness"
    ],
    clinicalDecisionRules: [
      "Communication Protocol: Use SBAR format for all patient handoffs and critical communications",
      "Scope of Practice Decision: When in doubt, consult medical control or defer to higher-level provider",
      "Quality Issue Response: Report safety concerns immediately through established channels"
    ],
    commonMisconceptions: [
      "MYTH: EMTs work independently without oversight - FACT: Function under medical director supervision with strict protocols",
      "MYTH: Quality improvement is optional - FACT: Required for accreditation and professional competence",
      "MYTH: Communication skills are innate - FACT: Require training and practice to develop proficiency",
      "MYTH: Team roles are flexible in emergencies - FACT: Role clarity becomes more important under stress"
    ],
    examTips: [
      "Questions focus on appropriate scope of practice and when to seek guidance",
      "Communication scenarios test SBAR format and closed-loop techniques",
      "Quality improvement questions emphasize continuous learning and feedback",
      "Team dynamic questions assess understanding of roles and hierarchy"
    ],
    crossReferences: [
      "Chapter 2: Responder Safety & Resilience - relates to team safety culture",
      "Chapter 1: EMS System Fundamentals - overall system integration",
      "Chapter 10: Comprehensive Patient Evaluation - team assessment strategies",
      "Chapter 4: Emergency Communication Protocols - technical communication skills"
    ],
    flashcards: [
      { front: "What does SBAR stand for?", back: "Situation, Background, Assessment, Recommendation", category: "definition" },
      { front: "What is closed-loop communication?", back: "Confirming orders by repeating back what was heard", category: "definition" },
      { front: "What defines EMT scope of practice?", back: "Legal boundaries for interventions EMTs can perform", category: "definition" },
      { front: "Who provides clinical oversight for EMTs?", back: "Medical director", category: "protocol" },
      { front: "What is the purpose of quality improvement?", back: "Use data to identify and address gaps in patient care", category: "clinical" },
      { front: "What causes 60% of preventable adverse events?", back: "Team communication errors", category: "clinical" },
      { front: "How much do medical errors reduce with clear role definition?", back: "45% reduction in emergency settings", category: "clinical" },
      { front: "What is root cause analysis?", back: "Process to identify system factors contributing to adverse events", category: "definition" },
      { front: "What does ICS stand for?", back: "Incident Command System", category: "definition" },
      { front: "What improves response coordination by 40%?", back: "ICS implementation in major incidents", category: "clinical" },
      { front: "How often is continuing education typically required?", back: "24-48 hours every two years (varies by state)", category: "protocol" },
      { front: "What reduces medical errors by 30% during transfers?", back: "SBAR communication format", category: "clinical" },
      { front: "What is evidence-based practice?", back: "Integrating research findings with clinical experience", category: "definition" },
      { front: "What prevents freelancing at emergency scenes?", back: "Clear command structure and defined roles", category: "protocol" },
      { front: "What is peer review used for?", back: "Providing constructive feedback on patient care performance", category: "definition" }
    ]
  };

  // Placeholder data for other chapters (keeping existing structure)
  const chapter10StudyNotes: ChapterData = {
    title: "Chapter 10: Comprehensive Patient Evaluation",
    description: "Systematic patient assessment protocols with clinical decision-making frameworks for comprehensive patient evaluation",
    module: "3",
    scope: "EMT-B",
    protocols: ["Primary Assessment", "Secondary Assessment", "SAMPLE History", "OPQRST", "Vital Signs", "Reassessment"],
    learningObjectives: [
      "Perform systematic primary and secondary patient assessments",
      "Obtain accurate vital signs and interpret clinical significance", 
      "Apply effective history-taking techniques using standardized approaches",
      "Demonstrate proper reassessment intervals and trending techniques"
    ],
    keyTerms: [
      "Primary Assessment",
      "Secondary Assessment", 
      "AVPU Scale",
      "SAMPLE History",
      "OPQRST Method",
      "Chief Complaint",
      "History of Present Illness",
      "Trending",
      "DCAP-BTLS",
      "Baseline Vitals",
      "Reassessment"
    ],
    sections: [
      {
        title: "🎯 Scene Safety and Initial Assessment",
        content: [
          "**Scene Size-up**: BSI (Body Substance Isolation), scene safety, nature of illness/mechanism of injury, number of patients, additional resources",
          "**General Impression**: Forms within 60 seconds based on patient appearance, work of breathing, and circulation status",
          "**Primary Assessment Priority**: Identify and treat immediate life threats using ABCDE approach",
          "**Mental Status Assessment**: Uses AVPU scale - Alert, Verbal, Pain, Unresponsive with Glasgow Coma Scale backup"
        ],
        clinicalPearls: [
          "Trust your initial gut feeling - 'sick vs. not sick' impression is 85% accurate",
          "Address life threats immediately when identified during primary assessment",
          "Scene safety is ongoing - continuously reassess throughout call"
        ],
        mnemonics: [
          "**ABCDE**: Airway, Breathing, Circulation, Disability (neuro), Exposure/Environment",
          "**AVPU**: Alert, Verbal response, Pain response, Unresponsive"
        ]
      },
      {
        title: "📊 Vital Signs Assessment and Interpretation", 
        content: [
          "**Blood Pressure**: Normal adult 90-140/60-90 mmHg, obtained with proper cuff size (40% arm circumference)",
          "**Pulse Assessment**: Rate 60-100/min adult, rhythm regular/irregular, quality strong/weak/thready",
          "**Respiratory Rate**: 12-20/min adult, observe depth, effort, and pattern discretely",
          "**Temperature**: Normal 97.8-99.1°F (36.5-37.3°C), route affects accuracy"
        ],
        clinicalPearls: [
          "Pulse pressure (systolic - diastolic) >40 mmHg indicates good cardiac function",
          "Count respirations when patient unaware for most accurate rate",
          "Blood pressure cuff too small gives falsely high readings"
        ],
        fieldApplications: [
          "Practice one-handed BP technique for efficiency",
          "Master pulse assessment in various positions and conditions",
          "Develop systematic vital signs routine for consistency"
        ]
      },
      {
        title: "📝 History Taking - SAMPLE and OPQRST",
        content: [
          "**SAMPLE Components**: Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events leading up",
          "**OPQRST Pain Assessment**: Onset, Provocation/Palliation, Quality, Region/Radiation, Severity (1-10 scale), Time/Timing",
          "**Communication Techniques**: Open-ended questions first, then specific closed-ended for details",
          "**Documentation Standards**: Use patient's exact words in quotes when possible"
        ],
        mnemonics: [
          "**SAMPLE**: Signs/symptoms, Allergies, Medications, Past history, Last intake, Events",
          "**OPQRST**: Onset, Provocation, Quality, Region, Severity, Time"
        ],
        commonPitfalls: [
          "❌ Leading questions that suggest answers to patient",
          "❌ Interrupting patient's initial story",
          "❌ Failing to clarify vague responses"
        ]
      },
      {
        title: "🔍 Secondary Assessment - Head-to-Toe Examination",
        content: [
          "**DCAP-BTLS Assessment**: Deformities, Contusions, Abrasions, Penetrating injuries, Burns, Tenderness, Lacerations, Swelling",
          "**Systematic Approach**: Head → Neck → Chest → Abdomen → Pelvis → Extremities → Posterior",
          "**Inspection vs. Palpation**: Look first, then feel - explain procedures to gain cooperation",
          "**Focused Assessment**: Target specific areas based on chief complaint and mechanism"
        ],
        clinicalPearls: [
          "Watch patient's facial expressions during palpation for pain responses",
          "Compare bilateral findings for asymmetry and abnormalities", 
          "Document negative findings as well as positive ones"
        ],
        mnemonics: [
          "**DCAP-BTLS**: Deformities, Contusions, Abrasions, Penetrating injuries, Burns, Tenderness, Lacerations, Swelling"
        ]
      },
      {
        title: "🔄 Reassessment and Trending",
        content: [
          "**Reassessment Intervals**: Every 5 minutes for critical/unstable patients, every 15 minutes for stable patients",
          "**Trending Concept**: Serial vital signs reveal improvement, deterioration, or stability patterns",
          "**Intervention Monitoring**: Assess patient response to treatments and adjust care accordingly",
          "**Communication**: Report significant changes to receiving facility during transport"
        ],
        clinicalPearls: [
          "Look for trends rather than isolated abnormal values",
          "Reassess immediately after any intervention to evaluate effectiveness",
          "Consider patient's baseline when interpreting vital signs"
        ],
        fieldApplications: [
          "Establish baseline vitals before interventions when possible",
          "Document times of assessments and interventions for trending",
          "Practice efficient reassessment techniques during transport"
        ]
      }
    ],
    criticalConcepts: [
      "🚨 **Life Threats First**: Primary assessment identifies and treats immediate threats to life - airway, breathing, circulation",
      "📈 **Trending is Key**: Single vital signs are snapshots; trends reveal the patient's trajectory",
      "🎯 **Systematic Approach**: Consistent assessment method prevents missing critical findings",
      "⏰ **Time Sensitivity**: Reassessment intervals based on patient acuity ensure appropriate monitoring"
    ],
    clinicalDecisionRules: [
      "**Primary Assessment**: If life threat identified → treat immediately before continuing assessment",
      "**Reassessment Timing**: Critical patients every 5 min, stable patients every 15 min",
      "**Vital Signs Trending**: 3+ sets of vitals needed to establish meaningful trends"
    ],
    commonMisconceptions: [
      "❌ \"Normal vitals mean patient is stable\" - Consider overall clinical picture",
      "❌ \"Secondary assessment needed for all patients\" - Focus on chief complaint and findings", 
      "❌ \"One abnormal vital sign is diagnostic\" - Look for patterns and trends"
    ],
    examTips: [
      "📝 Know normal vital sign ranges for all age groups",
      "📝 Understand when to perform rapid vs. focused assessment",
      "📝 Practice SAMPLE and OPQRST until automatic"
    ],
    crossReferences: [
      "→ Chapter 2: Scene safety principles apply to all patient encounters",
      "→ Chapter 11: Airway assessment is first priority in primary assessment",
      "→ Chapter 17: Cardiovascular assessment techniques for chest pain patients"
    ],
    flashcards: [
      { front: "What does SAMPLE stand for?", back: "Signs/Symptoms, Allergies, Medications, Past history, Last meal, Events leading up", category: "protocol" },
      { front: "What does OPQRST assess?", back: "Onset, Provocation, Quality, Region, Severity, Time", category: "protocol" },
      { front: "What does AVPU measure?", back: "Alert, Verbal, Pain, Unresponsive (mental status)", category: "protocol" },
      { front: "What are the ABCs of primary assessment?", back: "Airway, Breathing, Circulation", category: "protocol" },
      { front: "What is the purpose of secondary assessment?", back: "Detailed head-to-toe examination for non-life-threatening conditions", category: "definition" },
      { front: "When is rapid trauma assessment indicated?", back: "Significant mechanism of injury or altered mental status", category: "protocol" },
      { front: "What vital signs are assessed in adults?", back: "Pulse, respirations, blood pressure, temperature, oxygen saturation", category: "clinical" },
      { front: "What is normal adult respiratory rate?", back: "12-20 breaths per minute", category: "clinical" },
      { front: "What is normal adult pulse rate?", back: "60-100 beats per minute", category: "clinical" },
      { front: "What blood pressure is considered hypertensive?", back: "Systolic >140 or diastolic >90 mmHg", category: "clinical" },
      { front: "What is the chief complaint?", back: "Patient's primary reason for seeking medical attention", category: "definition" },
      { front: "What information does SAMPLE history provide?", back: "Medical background and current condition context", category: "clinical" },
      { front: "What is trending in patient assessment?", back: "Monitoring changes in patient condition over time", category: "definition" },
      { front: "When should reassessment occur?", back: "Every 5 minutes for unstable, every 15 minutes for stable patients", category: "protocol" },
      { front: "What is the purpose of OPQRST?", back: "Systematic pain and symptom assessment", category: "definition" }
    ]
  };

  const chapter11StudyNotes: ChapterData = {
    title: "Chapter 11: Advanced Airway Interventions",
    description: "Advanced airway management techniques with evidence-based protocols for maintaining patent airways and effective ventilation",
    module: "4", 
    scope: "EMT-B",
    protocols: ["Basic Airway Management", "Advanced Airway Techniques", "Ventilation Support", "Airway Obstruction Management"],
    learningObjectives: [
      "Apply systematic approach to airway assessment and management",
      "Demonstrate proper use of airway adjuncts and ventilation devices",
      "Recognize and manage airway obstructions",
      "Implement age-appropriate airway management techniques"
    ],
    keyTerms: ["Airway Obstruction", "BVM", "OPA", "NPA", "Ventilation", "Hypoxia", "Stridor", "Patent Airway"],
    criticalConcepts: [
      "Airway management is the highest priority in patient care",
      "A patent airway must be maintained at all times",
      "Ventilation and oxygenation are essential for cellular function"
    ],
    clinicalDecisionRules: [
      "Use OPA only in unconscious patients without gag reflex",
      "Choose NPA for conscious patients or when OPA is contraindicated",
      "BVM ventilation: 10-12 breaths/min adults, 12-20 breaths/min pediatric"
    ],
    commonMisconceptions: [
      "Higher oxygen is always better (can cause oxygen toxicity)",
      "All unconscious patients need airway adjuncts",
      "BVM ventilation should be forceful (causes gastric distention)"
    ],
    examTips: [
      "Know contraindications for each airway adjunct",
      "Understand proper sizing techniques for OPA and NPA",
      "Remember age-specific ventilation rates and techniques"
    ],
    sections: [
      {
        title: "Airway Anatomy and Physiology",
        content: [
          "**Upper airway** includes nose, mouth, pharynx, and larynx, serving to warm, filter, and humidify inspired air.",
          "**Lower airway** consists of trachea, bronchi, bronchioles, and alveoli where gas exchange occurs.",
          "**Anatomical considerations** include tongue as most common airway obstruction, especially in unconscious patients.",
          "**Respiratory drive** is controlled by medulla oblongata responding to CO2 levels (hypercapnic drive) and backup hypoxic drive in COPD patients."
        ],
        clinicalPearls: [
          "Tongue falls backward in unconscious supine patients",
          "Children have proportionally larger heads and tongues",
          "Elderly patients may have dentures that can obstruct airways"
        ],
        mnemonics: [
          "**DOPE**: Displaced tube, Obstruction, Pneumothorax, Equipment failure (troubleshooting ventilation problems)"
        ]
      },
      {
        title: "Basic Airway Management Techniques", 
        content: [
          "**Head-tilt chin-lift** is primary technique for non-trauma patients to open airway by lifting tongue off posterior pharynx.",
          "**Jaw-thrust maneuver** maintains cervical spine alignment in trauma patients while opening airway.",
          "**Recovery position** (lateral recumbent) prevents aspiration in unconscious patients with patent airway.",
          "**Suction techniques** remove secretions, blood, and vomitus using rigid (Yankauer) or flexible catheters."
        ],
        clinicalPearls: [
          "Never hyperextend neck in suspected spinal injury",
          "Suction no longer than 15 seconds adults, 10 seconds children",
          "Position yourself at patient's head for optimal airway control"
        ],
        decisionTrees: [
          "Unconscious patient → Check responsiveness → Open airway → Assess breathing → Insert adjunct if needed → Ventilate if required"
        ],
        fieldApplications: [
          "Practice head positioning on various surfaces and angles",
          "Master one-handed BVM technique for single-rescuer scenarios",
          "Develop muscle memory for rapid suction setup and use"
        ]
      },
      {
        title: "Airway Adjuncts and Ventilation Devices",
        content: [
          "**Oropharyngeal airway (OPA)** prevents tongue from obstructing airway in unconscious patients without gag reflex.",
          "**Nasopharyngeal airway (NPA)** provides airway patency in conscious or semi-conscious patients with intact gag reflex.",
          "**Bag-valve-mask (BVM)** provides positive pressure ventilation with 90-100% oxygen when reservoir bag attached.",
          "**Oxygen delivery devices** include nasal cannula (2-6 L/min), non-rebreather mask (10-15 L/min), and BVM (15 L/min)."
        ],
        clinicalPearls: [
          "Proper OPA size: corner of mouth to earlobe",
          "Proper NPA size: nostril to earlobe, diameter smaller than nostril",
          "Two-person BVM technique provides better seal and ventilation",
          "Watch for gastric distention with excessive BVM pressure"
        ],
        commonPitfalls: [
          "Using OPA in conscious patients causes vomiting",
          "Forcing oversized NPA causes nosebleeds",
          "Single-person BVM often provides inadequate ventilation"
        ]
      },
      {
        title: "Airway Obstruction Recognition and Management",
        content: [
          "**Partial obstruction** presents with stridor, difficulty speaking, and accessory muscle use but maintains some air movement.",
          "**Complete obstruction** shows inability to speak, absent breath sounds, and universal choking sign (hands to throat).",
          "**Foreign body removal** uses back blows and abdominal thrusts (Heimlich maneuver) for conscious patients.",
          "**Unconscious obstruction management** includes CPR with visualization for foreign body before each ventilation attempt."
        ],
        clinicalPearls: [
          "Stridor indicates significant airway narrowing",
          "Tripod position suggests respiratory distress",
          "Don't attempt blind finger sweeps in children",
          "Laryngeal spasm can cause sudden complete obstruction"
        ],
        mnemonics: [
          "**FBAO**: Foreign Body Airway Obstruction management protocol"
        ]
      },
      {
        title: "Pediatric Airway Considerations", 
        content: [
          "**Anatomical differences** include proportionally larger occiput, larger tongue, more anterior larynx, and smaller airway diameter.",
          "**Positioning modifications** require shoulder roll or towel under shoulders rather than head extension.",
          "**Equipment sizing** uses age-based formulas or length-based tapes (Broselow) for proper adjunct selection.",
          "**Ventilation rates** are higher: 12-20 breaths per minute for children, 20-30 for infants."
        ],
        clinicalPearls: [
          "Children's airways narrow more quickly with swelling",
          "Crying can worsen airway obstruction in children",
          "Pediatric BVM requires gentler pressures to prevent lung injury",
          "Consider parental presence to reduce child anxiety"
        ]
      }
    ],
    flashcards: [
      { front: "When is an OPA contraindicated?", back: "In conscious patients with intact gag reflex", category: "protocol" },
      { front: "What does OPA stand for?", back: "Oropharyngeal airway (oral airway)", category: "definition" },
      { front: "What does NPA stand for?", back: "Nasopharyngeal airway (nasal airway)", category: "definition" },
      { front: "When is an NPA contraindicated?", back: "Suspected skull fracture or severe facial trauma", category: "protocol" },
      { front: "What does BVM stand for?", back: "Bag-valve-mask (manual ventilation device)", category: "definition" },
      { front: "What is the proper BVM ventilation rate for adults?", back: "10-12 breaths per minute", category: "protocol" },
      { front: "What is the head-tilt chin-lift maneuver?", back: "Basic airway opening technique for non-trauma patients", category: "protocol" },
      { front: "What is the jaw-thrust maneuver?", back: "Airway opening technique for suspected spinal injury", category: "protocol" },
      { front: "What are signs of airway obstruction?", back: "Stridor, difficulty speaking, cyanosis, use of accessory muscles", category: "clinical" },
      { front: "What is the recovery position?", back: "Lateral recumbent position for unconscious patients with patent airway", category: "protocol" },
      { front: "What oxygen concentration does a BVM deliver?", back: "90-100% with reservoir bag attached", category: "clinical" },
      { front: "How do you size an OPA?", back: "Measure from corner of mouth to earlobe", category: "protocol" },
      { front: "How do you size an NPA?", back: "Measure from nostril to earlobe", category: "protocol" },
      { front: "What is the sniffing position?", back: "Optimal head position for intubation - neck flexed, head extended", category: "protocol" },
      { front: "What indicates effective BVM ventilation?", back: "Chest rise, good mask seal, appropriate rate and volume", category: "clinical" }
    ]
  };

  const chapter17StudyNotes: ChapterData = {
    title: "Chapter 17: Cardiovascular Emergency Management",
    description: "Cardiovascular emergencies with pathophysiology and evidence-based intervention protocols for optimal patient outcomes",
    module: "7",
    scope: "EMT-B", 
    protocols: ["ACS Management", "CHF Treatment", "Cardiac Arrest", "Hypertensive Emergency"],
    learningObjectives: [
      "Recognize signs and symptoms of acute coronary syndrome",
      "Apply systematic approach to cardiovascular emergency assessment",
      "Implement appropriate interventions for cardiac conditions",
      "Understand pathophysiology of common cardiovascular emergencies"
    ],
    keyTerms: ["ACS", "MI", "CHF", "Cardiogenic Shock", "Angina", "STEMI", "NSTEMI", "Preload", "Afterload"],
    criticalConcepts: [
      "Time is muscle in acute coronary syndrome",
      "Early recognition and intervention improve cardiovascular outcomes", 
      "Cardiovascular emergencies can rapidly progress to cardiac arrest"
    ],
    clinicalDecisionRules: [
      "Aspirin 324mg for suspected ACS unless contraindicated",
      "Nitroglycerin only if systolic BP >100 mmHg",
      "High-flow oxygen for chest pain with signs of hypoxia"
    ],
    commonMisconceptions: [
      "All chest pain is cardiac in origin",
      "Women present with classic cardiac symptoms",
      "Nitroglycerin is safe for all chest pain patients"
    ],
    examTips: [
      "Know contraindications for aspirin and nitroglycerin",
      "Understand difference between stable and unstable angina",
      "Remember atypical presentations in elderly and diabetic patients"
    ],
    sections: [
      {
        title: "Cardiovascular System Anatomy and Physiology",
        content: [
          "**Heart structure** consists of four chambers: right and left atria (receiving chambers) and right and left ventricles (pumping chambers).",
          "**Coronary circulation** supplies heart muscle with oxygen via right and left coronary arteries, with occlusion causing myocardial ischemia.",
          "**Cardiac cycle** includes systole (contraction) and diastole (relaxation), creating pressure changes that drive circulation.",
          "**Electrical conduction system** coordinates heart rhythm through SA node, AV node, bundle branches, and Purkinje fibers."
        ],
        clinicalPearls: [
          "Left anterior descending (LAD) occlusion causes 'widow maker' MI",
          "Heart muscle begins dying within 20-30 minutes of complete occlusion",
          "Collateral circulation may minimize damage in gradual vessel narrowing"
        ],
        mnemonics: [
          "**MONA**: Morphine, Oxygen, Nitroglycerin, Aspirin (traditional ACS treatment, now evidence-based approach varies)"
        ]
      },
      {
        title: "Acute Coronary Syndrome (ACS)",
        content: [
          "**Unstable angina** involves chest pain at rest or with minimal exertion, indicating unstable coronary plaque without complete occlusion.",
          "**STEMI (ST-Elevation MI)** shows complete coronary artery occlusion requiring immediate reperfusion therapy (PCI or thrombolytics).",
          "**NSTEMI (Non-ST-Elevation MI)** involves partial coronary occlusion with cardiac enzyme elevation but without ST elevation on ECG.",
          "**Risk stratification** uses TIMI score, HEART score, and clinical presentation to guide treatment intensity and disposition."
        ],
        clinicalPearls: [
          "Classic chest pain: crushing, radiating to jaw/arm, with diaphoresis",
          "Atypical presentations common in women, elderly, and diabetics",
          "Silent MIs occur in 25% of cases, especially diabetics",
          "Levine's sign: clenched fist over chest indicates cardiac origin"
        ],
        decisionTrees: [
          "Chest pain → Assess vital signs → 12-lead ECG → Aspirin if no contraindications → Nitroglycerin if BP >100 → Transport to PCI center"
        ],
        fieldApplications: [
          "Practice 12-lead ECG placement for rapid STEMI identification",
          "Master medication contraindication assessment",
          "Develop systematic chest pain evaluation approach"
        ]
      },
      {
        title: "Congestive Heart Failure (CHF)",
        content: [
          "**Left heart failure** causes pulmonary edema with shortness of breath, orthopnea, and paroxysmal nocturnal dyspnea.",
          "**Right heart failure** presents with peripheral edema, jugular venous distention, and hepatomegaly from systemic congestion.",
          "**Acute decompensation** can be triggered by medication non-compliance, dietary indiscretion, infection, or arrhythmias.",
          "**Treatment approach** focuses on reducing preload with positioning, oxygen, and rapid transport for advanced interventions."
        ],
        clinicalPearls: [
          "Pink, frothy sputum indicates acute pulmonary edema",
          "Orthopnea: inability to lie flat due to shortness of breath",
          "Two-pillow orthopnea quantifies severity of symptoms",
          "Pedal edema pits with 5+ seconds return time in severe CHF"
        ],
        mnemonics: [
          "**CHF**: Cough, Heaviness (chest), Fatigue (classic triad)",
          "**OLDCARTS**: Onset, Location, Duration, Character, Aggravating factors, Relieving factors, Timing, Severity"
        ]
      },
      {
        title: "Cardiac Arrest and Dysrhythmias",
        content: [
          "**Ventricular fibrillation** presents as chaotic electrical activity requiring immediate defibrillation for survival.",
          "**Ventricular tachycardia** may be pulsed (unstable) or pulseless, both requiring urgent intervention.",
          "**Asystole** shows flatline rhythm with poor prognosis, requiring CPR and epinephrine.",
          "**PEA (Pulseless Electrical Activity)** demonstrates organized rhythm without pulse, requiring treatment of underlying causes."
        ],
        clinicalPearls: [
          "Survival decreases 10% per minute without defibrillation",
          "High-quality CPR: 100-120 compressions/min, 2+ inches deep",
          "Minimize interruptions in chest compressions",
          "Consider reversible causes: H's and T's"
        ],
        commonPitfalls: [
          "Checking pulse too long delays CPR initiation",
          "Inadequate compression depth reduces circulation",
          "Excessive ventilation impedes venous return"
        ]
      },
      {
        title: "Hypertensive Emergencies",
        content: [
          "**Hypertensive urgency** involves severe hypertension (>180/120) without end-organ damage.",
          "**Hypertensive emergency** shows severe hypertension with acute end-organ damage (stroke, MI, pulmonary edema).",
          "**Management approach** avoids rapid blood pressure reduction to prevent cerebral hypoperfusion.",
          "**Transport considerations** require cardiac monitoring and frequent vital sign assessment during transport."
        ],
        clinicalPearls: [
          "Avoid sublingual nitroglycerin in hypertensive emergency",
          "Target 10-15% BP reduction in first hour maximum",
          "Monitor for signs of stroke during transport",
          "Document baseline neurological status carefully"
        ]
      }
    ],
    flashcards: [
      { front: "What is the standard aspirin dose for ACS?", back: "324mg chewed (four 81mg tablets)", category: "protocol" },
      { front: "What does ACS stand for?", back: "Acute Coronary Syndrome", category: "definition" },
      { front: "What are the classic signs of MI?", back: "Chest pain, shortness of breath, nausea, diaphoresis", category: "clinical" },
      { front: "What is the difference between stable and unstable angina?", back: "Stable: predictable, exercise-induced; Unstable: unpredictable, rest pain", category: "definition" },
      { front: "What does CHF stand for?", back: "Congestive Heart Failure", category: "definition" },
      { front: "What are signs of CHF?", back: "Pedal edema, JVD, crackles, shortness of breath", category: "clinical" },
      { front: "What is cardiogenic shock?", back: "Shock caused by heart's inability to pump effectively", category: "definition" },
      { front: "What is nitroglycerin's mechanism of action?", back: "Vasodilation to reduce cardiac workload", category: "clinical" },
      { front: "What are contraindications to nitroglycerin?", back: "Hypotension, erectile dysfunction drugs, right ventricular MI", category: "protocol" },
      { front: "What is a normal cardiac rhythm?", back: "Normal sinus rhythm, regular, 60-100 bpm", category: "clinical" },
      { front: "What is ventricular fibrillation?", back: "Chaotic, disorganized electrical activity with no effective circulation", category: "definition" },
      { front: "What is the treatment for cardiac arrest?", back: "CPR, defibrillation if shockable rhythm, ACLS medications", category: "protocol" },
      { front: "What does STEMI stand for?", back: "ST-Elevation Myocardial Infarction", category: "definition" },
      { front: "What is the goal for door-to-balloon time?", back: "Less than 90 minutes for STEMI patients", category: "protocol" },
      { front: "What are atypical MI presentations?", back: "Common in elderly, diabetics, women - may present as weakness, nausea", category: "clinical" }
    ]
  };

  const chapter20StudyNotes: ChapterData = {
    title: "Chapter 20: Metabolic & Hematologic Emergencies",
    description: "Comprehensive management of endocrine and hematologic emergencies with evidence-based protocols and pathophysiology",
    module: "8",
    scope: "EMT-B",
    protocols: ["Hypoglycemia Management", "Diabetic Ketoacidosis Recognition", "Bleeding Control", "Shock Prevention", "Sickle Cell Crisis Management"],
    learningObjectives: [
      "Recognize and manage hypoglycemic and hyperglycemic emergencies",
      "Apply systematic approach to diabetic emergency assessment",
      "Assess and control bleeding in hematologic emergencies", 
      "Identify complications of bleeding disorders and sickle cell disease",
      "Implement evidence-based glucose administration protocols"
    ],
    keyTerms: [
      "Hypoglycemia",
      "Hyperglycemia", 
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State (HHS)",
      "Insulin",
      "Glucagon",
      "Hemophilia",
      "Thrombocytopenia", 
      "Sickle Cell Disease",
      "Vaso-occlusive Crisis",
      "Anticoagulants",
      "Hemostasis"
    ],
    sections: [
      {
        title: "🩸 Endocrine System Overview and Glucose Regulation",
        content: [
          "**Pancreatic Function**: Beta cells produce insulin (lowers glucose), alpha cells produce glucagon (raises glucose)",
          "**Normal Glucose Range**: 70-100 mg/dL fasting, maintained through hormonal balance",
          "**Type 1 Diabetes**: Autoimmune destruction of beta cells, absolute insulin deficiency, typically childhood onset",
          "**Type 2 Diabetes**: Insulin resistance with relative insulin deficiency, typically adult onset with obesity"
        ],
        clinicalPearls: [
          "Brain depends entirely on glucose - cannot use alternative fuels effectively",
          "Epinephrine release during hypoglycemia causes classic 'fight or flight' symptoms",
          "Diabetics lose hypoglycemia awareness over time (hypoglycemia unawareness)"
        ],
        mnemonics: [
          "**TIRED**: Tremors, Irritability, Restlessness, Excessive hunger, Diaphoresis (hypoglycemia)",
          "**DKA triad**: Dehydration, Ketosis, Acidosis"
        ]
      },
      {
        title: "⚠️ Hypoglycemic Emergencies",
        content: [
          "**Definition**: Blood glucose <70 mg/dL with symptoms or <50 mg/dL regardless of symptoms",
          "**Pathophysiology**: Inadequate glucose delivery to brain causes altered mental status and sympathetic nervous system activation",
          "**Classic Presentation**: Diaphoresis, shakiness, confusion, combativeness, altered mental status progressing to unconsciousness",
          "**Treatment Protocol**: Oral glucose 15-30g if conscious with gag reflex, IV dextrose if unconscious or unable to swallow"
        ],
        clinicalPearls: [
          "Hypoglycemic patients often appear intoxicated - always check glucose",
          "Sweating in diabetic with altered mental status = hypoglycemia until proven otherwise",
          "Response to glucose administration is diagnostic and therapeutic"
        ],
        fieldApplications: [
          "Practice glucose administration techniques safely",
          "Master blood glucose meter operation and quality control", 
          "Develop systematic approach to altered mental status assessment"
        ],
        commonPitfalls: [
          "❌ Giving oral glucose to unconscious patient (aspiration risk)",
          "❌ Assuming psychiatric emergency without checking glucose",
          "❌ Delaying treatment while obtaining IV access"
        ]
      },
      {
        title: "📈 Hyperglycemic Emergencies - DKA and HHS",
        content: [
          "**Diabetic Ketoacidosis (DKA)**: Usually Type 1 diabetes, glucose >250 mg/dL, ketones present, acidosis, dehydration",
          "**Hyperosmolar Hyperglycemic State (HHS)**: Usually Type 2 diabetes, glucose >600 mg/dL, severe dehydration, no ketosis",
          "**Common Triggers**: Infection, medication non-compliance, illness, stress, new-onset diabetes",
          "**Assessment Findings**: Polyuria, polydipsia, polyphagia, weakness, fruity breath odor (DKA), altered mental status"
        ],
        clinicalPearls: [
          "Kussmaul respirations (deep, rapid) compensate for metabolic acidosis in DKA",
          "HHS has higher mortality than DKA due to severe dehydration",
          "Abdominal pain in DKA may mimic surgical emergency"
        ],
        mnemonics: [
          "**3 P's**: Polyuria, Polydipsia, Polyphagia (hyperglycemia symptoms)",
          "**MUDPILES**: Metabolic acidosis causes (includes DKA)"
        ],
        decisionTrees: [
          "Altered mental status → Check glucose → If >250 → Assess hydration → Look for ketones → DKA vs HHS"
        ]
      },
      {
        title: "🩸 Hematologic System and Bleeding Disorders",
        content: [
          "**Hemostasis Process**: Vascular spasm → platelet plug → coagulation cascade → fibrin clot formation",
          "**Hemophilia Types**: Factor VIII deficiency (Hemophilia A), Factor IX deficiency (Hemophilia B), prolonged bleeding",
          "**Thrombocytopenia**: Low platelet count <150,000, causes easy bruising and petechiae",
          "**Anticoagulant Effects**: Warfarin, heparin, NOACs increase bleeding risk with trauma"
        ],
        clinicalPearls: [
          "Hemophiliacs may have delayed bleeding hours after injury",
          "Anticoagulated patients can have severe bleeding from minor trauma",
          "Internal bleeding may not be immediately apparent"
        ],
        fieldApplications: [
          "Practice pressure point techniques for bleeding control",
          "Master tourniquet application for extremity hemorrhage",
          "Develop systematic bleeding assessment approach"
        ]
      },
      {
        title: "🌙 Sickle Cell Disease and Vaso-occlusive Crisis",
        content: [
          "**Pathophysiology**: Abnormal hemoglobin S causes red blood cells to sickle under stress, causing vascular occlusion",
          "**Crisis Triggers**: Dehydration, hypoxia, infection, cold exposure, stress, acidosis",
          "**Clinical Presentation**: Severe pain (often chest, back, extremities), fever, swelling, priapism",
          "**Complications**: Acute chest syndrome, stroke, splenic sequestration, infection susceptibility"
        ],
        clinicalPearls: [
          "Pain level in sickle cell crisis is often severe (8-10/10)",
          "Patients are usually experts on their own disease management",
          "Avoid giving oxygen unless hypoxic (may suppress bone marrow)"
        ],
        commonPitfalls: [
          "❌ Undertreating pain due to concerns about drug-seeking behavior",
          "❌ Not recognizing acute chest syndrome as life-threatening",
          "❌ Assuming all presentations are typical crises"
        ]
      }
    ],
    criticalConcepts: [
      "🧠 **Brain Glucose Dependency**: Brain requires constant glucose supply - hypoglycemia causes immediate CNS dysfunction",
      "⚖️ **Diabetic Emergency Spectrum**: Ranges from mild hypoglycemia to life-threatening DKA/HHS",
      "🩸 **Bleeding Risk Factors**: Anticoagulants, bleeding disorders, and liver disease increase hemorrhage risk",
      "🔄 **Sickle Cell Triggers**: Prevention through hydration, warmth, and oxygen (if hypoxic) prevents crises"
    ],
    clinicalDecisionRules: [
      "**15-15 Rule**: Give 15g glucose, recheck in 15 minutes, repeat if glucose still <70 mg/dL",
      "**DKA Criteria**: Glucose >250, ketones present, pH <7.3, bicarbonate <15",
      "**Blood Loss Assessment**: >500mL in adult or >100mL in child requires immediate intervention"
    ],
    commonMisconceptions: [
      "❌ \"All diabetics can take oral glucose\" - Check consciousness and gag reflex first",
      "❌ \"High glucose isn't immediately dangerous\" - DKA and HHS are life-threatening",
      "❌ \"Sickle cell patients are drug-seeking\" - Pain is real and severe"
    ],
    examTips: [
      "📝 Know glucose normal ranges and treatment thresholds",
      "📝 Understand difference between DKA (Type 1) and HHS (Type 2)",
      "📝 Remember sickle cell crisis triggers and complications"
    ],
    crossReferences: [
      "→ Chapter 10: Glucose assessment part of altered mental status evaluation",
      "→ Chapter 17: Diabetic patients have increased cardiac risk",
      "→ Chapter 31: Abdominal pain may be DKA presentation"
    ],
    flashcards: [
      { front: "What blood glucose level defines hypoglycemia?", back: "Below 70 mg/dL", category: "definition" },
      { front: "What is the 15-15 rule?", back: "Give 15g glucose, recheck in 15 minutes, repeat if needed", category: "protocol" },
      { front: "What triggers sickle cell crisis?", back: "Dehydration, infection, stress, hypoxia, temperature extremes", category: "clinical" },
      { front: "What is DKA?", back: "Diabetic Ketoacidosis - life-threatening complication of diabetes", category: "definition" },
      { front: "What are signs of hyperglycemia?", back: "Polyuria, polydipsia, polyphagia, fruity breath odor", category: "clinical" },
      { front: "What is normal blood glucose range?", back: "80-120 mg/dL", category: "clinical" },
      { front: "What is hemophilia?", back: "Inherited bleeding disorder due to clotting factor deficiency", category: "definition" },
      { front: "What does TIRED mnemonic represent?", back: "Tremors, Irritability, Restlessness, Excessive hunger, Diaphoresis", category: "protocol" },
      { front: "What is HHNS?", back: "Hyperosmolar Hyperglycemic Nonketotic Syndrome", category: "definition" },
      { front: "What causes Type 1 diabetes?", back: "Autoimmune destruction of insulin-producing beta cells", category: "definition" },
      { front: "What medication do diabetics commonly take?", back: "Insulin, metformin, sulfonylureas", category: "clinical" },
      { front: "What is sickle cell disease?", back: "Genetic disorder causing abnormal hemoglobin and vaso-occlusive crises", category: "definition" },
      { front: "What are signs of severe hypoglycemia?", back: "Altered mental status, seizures, loss of consciousness", category: "clinical" },
      { front: "What oral glucose dose for conscious hypoglycemic patient?", back: "15-25 grams oral glucose gel", category: "protocol" },
      { front: "What can mimic hypoglycemia?", back: "Stroke, alcohol intoxication, psychiatric disorders", category: "clinical" }
    ]
  };

  const chapter21StudyNotes: ChapterData = {
    title: "Chapter 21: Allergic & Anaphylactic Response",
    description: "Recognition and emergency management of allergic reactions and anaphylaxis with life-saving interventions",
    module: "9",
    scope: "EMT-B",
    protocols: ["Anaphylaxis Management", "Epinephrine Administration", "Airway Support", "Fluid Resuscitation"],
    learningObjectives: [
      "Differentiate between allergic reactions and anaphylaxis",
      "Demonstrate proper epinephrine auto-injector use",
      "Recognize life-threatening allergic reactions",
      "Apply appropriate supportive care measures"
    ],
    keyTerms: ["Anaphylaxis", "Epinephrine", "Auto-injector", "Histamine", "Urticaria", "Angioedema", "Bronchospasm"],
    criticalConcepts: [
      "Anaphylaxis can be fatal within minutes without treatment",
      "Epinephrine is the first-line treatment for severe allergic reactions",
      "Biphasic reactions can occur 4-12 hours after initial resolution"
    ],
    clinicalDecisionRules: [
      "Anaphylaxis criteria: exposure + 2+ organ systems involved",
      "Severe reaction indicators: respiratory distress, hypotension, altered mental status"
    ],
    commonMisconceptions: [
      "Mild reactions cannot progress to anaphylaxis",
      "Previous mild reactions predict future severity",
      "Epinephrine is dangerous in cardiac patients"
    ],
    examTips: [
      "Know the difference between local and systemic allergic reactions",
      "Remember that anaphylaxis can occur without skin involvement"
    ],
    sections: [
      {
        title: "Allergic Reaction Classification",
        content: [
          "**Local allergic reactions** affect only the area of contact, presenting with localized redness, swelling, or itching.",
          "**Systemic allergic reactions** affect multiple body systems and can rapidly progress to anaphylaxis.",
          "**Anaphylaxis** is a severe, life-threatening systemic allergic reaction involving cardiovascular and respiratory compromise."
        ],
        clinicalPearls: [
          "Anaphylaxis can occur without skin symptoms in 10-20% of cases",
          "Biphasic reactions occur in 5-20% of anaphylaxis cases"
        ],
        mnemonics: [
          "**FAST**: Face/lips swelling, Airway compromise, Skin changes, Tachycardia (anaphylaxis signs)"
        ],
        decisionTrees: [
          "Exposure → Symptoms in 2+ systems → Epinephrine → Transport → Monitor for biphasic reaction"
        ]
      },
      {
        title: "Emergency Management",
        content: [
          "**Epinephrine** 0.3mg IM (adult) or 0.15mg IM (pediatric) is the first-line treatment for anaphylaxis.",
          "**Supportive care** includes high-flow oxygen, IV access, fluid resuscitation, and continuous monitoring.",
          "**Transport** all anaphylaxis patients immediately due to potential for biphasic reactions."
        ],
        fieldApplications: [
          "Check expiration dates on patient's auto-injectors",
          "Be prepared for multiple epinephrine doses if transport is delayed",
          "Position patient supine unless respiratory distress requires upright position"
        ]
      }
    ],
    flashcards: [
      { front: "What is the adult epinephrine dose for anaphylaxis?", back: "0.3mg intramuscular", category: "protocol" },
      { front: "When can biphasic reactions occur?", back: "4-12 hours after initial reaction resolution", category: "clinical" },
      { front: "What defines anaphylaxis?", back: "Exposure + involvement of 2 or more organ systems", category: "definition" },
      { front: "What is the pediatric epinephrine dose?", back: "0.15mg intramuscular", category: "protocol" },
      { front: "What does FAST stand for in anaphylaxis?", back: "Face/lips swelling, Airway compromise, Skin changes, Tachycardia", category: "protocol" },
      { front: "What is urticaria?", back: "Hives - raised, itchy skin welts", category: "definition" },
      { front: "What is angioedema?", back: "Swelling of deeper tissues, especially face and throat", category: "definition" },
      { front: "What percentage of anaphylaxis cases occur without skin symptoms?", back: "10-20% can occur without skin involvement", category: "clinical" },
      { front: "What is histamine's role in allergic reactions?", back: "Mediator causing vasodilation, increased permeability, bronchospasm", category: "clinical" },
      { front: "Where should epinephrine auto-injectors be administered?", back: "Outer thigh, vastus lateralis muscle", category: "protocol" },
      { front: "What are common anaphylaxis triggers?", back: "Foods, medications, insect stings, latex", category: "clinical" },
      { front: "What supportive care is needed for anaphylaxis?", back: "High-flow oxygen, IV access, fluid resuscitation, position supine", category: "protocol" },
      { front: "What is a local allergic reaction?", back: "Limited to area of contact - redness, swelling, itching", category: "definition" },
      { front: "How long should anaphylaxis patients be monitored?", back: "Minimum 4-6 hours due to biphasic reaction risk", category: "clinical" },
      { front: "What cardiac effects can anaphylaxis cause?", back: "Tachycardia, hypotension, cardiovascular collapse", category: "clinical" }
    ]
  };

  const chapter22StudyNotes: ChapterData = {
    title: "Chapter 22: Toxicological Emergencies",
    description: "Emergency management of poisoning and overdose cases with evidence-based decontamination and supportive care",
    module: "9", 
    scope: "EMT-B",
    protocols: ["Poisoning Management", "Overdose Assessment", "Decontamination Procedures", "Antidote Administration"],
    learningObjectives: [
      "Identify common poisoning presentations",
      "Apply appropriate decontamination methods",
      "Recognize specific overdose syndromes",
      "Provide supportive care for toxic exposures"
    ],
    keyTerms: ["Toxidrome", "Decontamination", "Antidote", "Activated Charcoal", "Naloxone", "Organophosphate", "Carbon Monoxide"],
    criticalConcepts: [
      "Scene safety is paramount in toxic exposures",
      "Supportive care is the cornerstone of toxicology management", 
      "Specific antidotes exist for limited number of poisons"
    ],
    clinicalDecisionRules: [
      "Altered mental status + unknown exposure = consider toxic cause",
      "Pinpoint pupils + respiratory depression = opioid overdose"
    ],
    commonMisconceptions: [
      "Inducing vomiting is helpful in most poisonings",
      "Activated charcoal works for all ingested poisons",
      "Antidotes are available for most toxic substances"
    ],
    sections: [
      {
        title: "Toxidromes and Recognition",
        content: [
          "**Cholinergic toxidrome** presents with SLUDGE symptoms: Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis.",
          "**Anticholinergic toxidrome** presents with hot, dry, flushed skin, altered mental status, and hyperthermia.",
          "**Opioid toxidrome** characterized by CNS depression, respiratory depression, and pinpoint pupils."
        ],
        mnemonics: [
          "**SLUDGE**: Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis (cholinergic)",
          "**Mad as a hatter, red as a beet, hot as a pistol, dry as a bone** (anticholinergic)"
        ],
        commonPitfalls: [
          "Missing mixed overdoses that present with confusing symptoms",
          "Assuming single substance involvement"
        ]
      },
      {
        title: "Emergency Management",
        content: [
          "**Scene safety** assessment for ongoing toxic exposure risks to providers and bystanders.",
          "**Decontamination** methods include removal from source, skin/eye irrigation, and selective use of activated charcoal.",
          "**Supportive care** focuses on airway management, breathing support, and circulation maintenance."
        ],
        clinicalPearls: [
          "Activated charcoal is most effective within 1 hour of ingestion",
          "Naloxone may need repeated doses for long-acting opioids"
        ],
        fieldApplications: [
          "Always consider scene safety before patient contact",
          "Bring medication bottles or containers to hospital",
          "Consider multiple patients in household chemical exposures"
        ]
      }
    ],
    flashcards: [
      { front: "What does SLUDGE represent?", back: "Salivation, Lacrimation, Urination, Defecation, GI distress, Emesis", category: "protocol" },
      { front: "When is activated charcoal most effective?", back: "Within 1 hour of ingestion", category: "clinical" },
      { front: "What are classic opioid overdose signs?", back: "CNS depression, respiratory depression, pinpoint pupils", category: "definition" },
      { front: "What is a toxidrome?", back: "Constellation of signs and symptoms from specific poison class", category: "definition" },
      { front: "What is the anticholinergic mnemonic?", back: "Mad as a hatter, red as a beet, hot as a pistol, dry as a bone", category: "protocol" },
      { front: "What is the antidote for opioid overdose?", back: "Naloxone (Narcan)", category: "protocol" },
      { front: "What is carbon monoxide poisoning treatment?", back: "High-flow oxygen, remove from source", category: "protocol" },
      { front: "What are organophosphate sources?", back: "Pesticides, insecticides, nerve agents", category: "clinical" },
      { front: "What is the universal antidote myth?", back: "There is no universal antidote; supportive care is key", category: "clinical" },
      { front: "What are contraindications to activated charcoal?", back: "Altered mental status, caustics, hydrocarbons, alcohols", category: "protocol" },
      { front: "What is decontamination?", back: "Removal or neutralization of toxic substances", category: "definition" },
      { front: "What are signs of methamphetamine overdose?", back: "Hyperthermia, agitation, tachycardia, hypertension", category: "clinical" },
      { front: "What is the cholinergic toxidrome treatment?", back: "Atropine for organophosphate poisoning", category: "protocol" },
      { front: "What household items commonly cause poisoning?", back: "Cleaning products, medications, plants, chemicals", category: "clinical" },
      { front: "What is naloxone's duration of action?", back: "30-90 minutes, may need repeated doses", category: "clinical" }
    ]
  };

  const chapter23StudyNotes: ChapterData = {
    title: "Chapter 23: Behavioral Crisis Protocols",
    description: "Professional approach to behavioral health emergencies with de-escalation techniques and safety protocols",
    module: "9",
    scope: "EMT-B", 
    protocols: ["Crisis De-escalation", "Restraint Procedures", "Involuntary Transport", "Safety Assessment"],
    learningObjectives: [
      "Apply de-escalation techniques for agitated patients",
      "Recognize psychiatric emergency presentations",
      "Ensure scene and provider safety",
      "Understand legal considerations for psychiatric transport"
    ],
    keyTerms: ["De-escalation", "Psychiatric Emergency", "Involuntary Hold", "Restraints", "Suicidal Ideation", "Psychosis"],
    criticalConcepts: [
      "Scene safety is the highest priority in behavioral emergencies",
      "Medical causes must be ruled out before psychiatric diagnosis",
      "De-escalation is more effective than restraints when possible"
    ],
    clinicalDecisionRules: [
      "Altered mental status: rule out medical causes first",
      "Imminent danger to self/others: consider restraints and law enforcement"
    ],
    commonMisconceptions: [
      "Psychiatric patients are always violent or unpredictable",
      "Restraints are the primary method of managing agitated patients",
      "Behavioral emergencies don't require medical evaluation"
    ],
    examTips: [
      "Know the medical conditions that can mimic psychiatric emergencies",
      "Understand the legal requirements for involuntary psychiatric holds"
    ],
    sections: [
      {
        title: "Assessment and De-escalation",
        content: [
          "**Scene safety assessment** includes evaluating for weapons, escape routes, and potential for violence.",
          "**De-escalation techniques** involve calm verbal communication, active listening, and maintaining non-threatening body language.",
          "**Medical screening** to rule out hypoglycemia, hypoxia, drug intoxication, or other medical causes of altered behavior."
        ],
        clinicalPearls: [
          "Medical conditions cause 25% of psychiatric presentations",
          "Therapeutic communication is more effective than confrontation"
        ],
        mnemonics: [
          "**LEAP**: Listen, Empathize, Affirm, Partner (de-escalation approach)"
        ],
        fieldApplications: [
          "Position yourself between patient and exit",
          "Remove potential weapons from patient area",
          "Speak slowly and clearly with simple instructions"
        ]
      },
      {
        title: "Legal and Ethical Considerations",
        content: [
          "**Involuntary transport** requires specific legal criteria: danger to self, danger to others, or gravely disabled.",
          "**Restraint use** should be last resort, properly applied, and continuously monitored.",
          "**Documentation** must clearly justify interventions and transport decisions."
        ],
        commonPitfalls: [
          "Using restraints without proper justification",
          "Inadequate documentation of behavioral emergency interventions",
          "Failing to consider medical causes of behavior changes"
        ]
      }
    ],
    flashcards: [
      { front: "What does LEAP stand for in de-escalation?", back: "Listen, Empathize, Affirm, Partner", category: "protocol" },
      { front: "What percentage of psychiatric presentations have medical causes?", back: "Approximately 25%", category: "clinical" },
      { front: "What are the criteria for involuntary transport?", back: "Danger to self, danger to others, or gravely disabled", category: "definition" },
      { front: "What is suicidal ideation?", back: "Thoughts of harming oneself or ending one's life", category: "definition" },
      { front: "What is psychosis?", back: "Loss of contact with reality, hallucinations, delusions", category: "definition" },
      { front: "What are de-escalation techniques?", back: "Calm voice, active listening, non-threatening posture, respect", category: "protocol" },
      { front: "What medical conditions mimic psychiatric emergencies?", back: "Hypoglycemia, hypoxia, drug intoxication, head injury", category: "clinical" },
      { front: "When should restraints be used?", back: "Last resort when patient poses imminent danger to self/others", category: "protocol" },
      { front: "What is the most important priority in behavioral emergencies?", back: "Scene safety for all involved", category: "protocol" },
      { front: "What is depression?", back: "Persistent sadness, loss of interest, impaired daily functioning", category: "definition" },
      { front: "What are signs of elder abuse?", back: "Unexplained injuries, poor hygiene, fear of caregiver, malnutrition", category: "clinical" },
      { front: "What is bipolar disorder?", back: "Mood disorder with alternating manic and depressive episodes", category: "definition" },
      { front: "How should you communicate with psychiatric patients?", back: "Calm, respectful, clear communication while maintaining safety", category: "protocol" },
      { front: "What is the difference between anxiety and panic?", back: "Panic is intense, sudden fear; anxiety is persistent worry", category: "definition" },
      { front: "What documentation is needed for behavioral emergencies?", back: "Objective observations, quotes, interventions used, justifications", category: "protocol" }
    ]
  };

  const chapter31StudyNotes: ChapterData = {
    title: "Chapter 31: Abdominal & GU Trauma Essentials",
    description: "Comprehensive assessment and management of abdominal and genitourinary trauma with evidence-based protocols",
    module: "12",
    scope: "EMT-B",
    protocols: ["Abdominal Trauma Assessment", "Genitourinary Injury Management", "Evisceration Care", "Internal Bleeding Control"],
    learningObjectives: [
      "Recognize signs of abdominal trauma and internal bleeding",
      "Apply appropriate assessment techniques for genitourinary injuries",
      "Demonstrate proper evisceration management protocols",
      "Understand transport priorities for abdominal trauma"
    ],
    keyTerms: ["Evisceration", "Peritonitis", "Retroperitoneal", "Guarding", "Rebound Tenderness", "Hematuria"],
    criticalConcepts: [
      "Abdominal trauma often presents with delayed symptoms",
      "Eviscerated organs should never be pushed back into the abdomen",
      "Internal bleeding may not show external signs initially"
    ],
    clinicalDecisionRules: [
      "Mechanism of injury + abdominal pain = high suspicion for trauma",
      "Distension + rigid abdomen = possible internal bleeding"
    ],
    commonMisconceptions: [
      "Absence of external wounds means no internal injury",
      "Normal vital signs rule out significant abdominal trauma"
    ],
    examTips: [
      "Know the difference between penetrating and blunt abdominal trauma management",
      "Remember that genitourinary injuries often accompany pelvic fractures"
    ],
    sections: [
      {
        title: "Abdominal Trauma Assessment",
        content: [
          "**Mechanism of injury** assessment is crucial for determining potential internal damage patterns.",
          "**Physical examination** includes inspection, palpation, and assessment for signs of internal bleeding.",
          "**Guarding and rebound tenderness** indicate peritoneal irritation and potential internal injury."
        ],
        clinicalPearls: [
          "Children can compensate longer than adults before showing shock signs",
          "Seat belt marks indicate high-energy transfer and internal injury risk"
        ],
        mnemonics: [
          "**PQRST**: Provocation, Quality, Region, Severity, Time (pain assessment)"
        ],
        fieldApplications: [
          "Position patient supine unless spinal injury suspected",
          "Cover eviscerated organs with moist sterile dressings",
          "Monitor closely for signs of developing shock"
        ]
      }
    ],
    flashcards: [
      { front: "What is evisceration?", back: "Protrusion of internal organs through an open wound", category: "definition" },
      { front: "How should eviscerated organs be managed?", back: "Cover with moist sterile dressings, never push back in", category: "protocol" },
      { front: "What is guarding?", back: "Involuntary tensing of abdominal muscles due to pain or irritation", category: "definition" },
      { front: "What is rebound tenderness?", back: "Pain when pressure is suddenly released from the abdomen", category: "clinical" },
      { front: "What does hematuria indicate?", back: "Blood in urine, suggesting genitourinary trauma", category: "clinical" },
      { front: "What is retroperitoneal bleeding?", back: "Bleeding behind the peritoneum, often from kidney or major vessel injury", category: "definition" },
      { front: "What position should abdominal trauma patients be placed?", back: "Supine with knees flexed if no spinal injury", category: "protocol" },
      { front: "What are signs of internal abdominal bleeding?", back: "Distension, rigidity, hypotension, tachycardia, altered mental status", category: "clinical" },
      { front: "What is peritonitis?", back: "Inflammation of the peritoneum, often due to infection or trauma", category: "definition" },
      { front: "How do you assess for internal bleeding?", back: "Check vital signs, look for distension, assess for shock signs", category: "protocol" },
      { front: "What mechanism suggests high abdominal injury risk?", back: "High-speed MVCs, falls >20 feet, penetrating trauma", category: "scenario" },
      { front: "What are late signs of abdominal trauma?", back: "Shock, altered mental status, severe pain", category: "clinical" },
      { front: "How should penetrating objects be managed?", back: "Stabilize in place, do not remove", category: "protocol" },
      { front: "What is Cullen's sign?", back: "Bruising around umbilicus indicating internal bleeding", category: "clinical" },
      { front: "What transport priority for evisceration?", back: "High priority, rapid transport with continuous monitoring", category: "protocol" }
    ]
  };

  const chapter32StudyNotes: ChapterData = {
    title: "Chapter 32: Orthopedic Injury Management",
    description: "Professional management of musculoskeletal injuries with evidence-based splinting and immobilization techniques",
    module: "12",
    scope: "EMT-B",
    protocols: ["Fracture Assessment", "Splinting Techniques", "Joint Injury Management", "Neurovascular Assessment"],
    learningObjectives: [
      "Recognize different types of fractures and dislocations",
      "Apply appropriate splinting techniques for various injuries",
      "Perform neurovascular assessments before and after splinting",
      "Understand pain management and transport considerations"
    ],
    keyTerms: ["Fracture", "Dislocation", "Sprain", "Strain", "Neurovascular", "Crepitus", "Angulation"],
    criticalConcepts: [
      "Neurovascular assessment is mandatory before and after splinting",
      "Splint injuries in position found if severe deformity present",
      "Pain management improves patient outcomes and cooperation"
    ],
    clinicalDecisionRules: [
      "Unable to bear weight + point tenderness = possible fracture",
      "Loss of pulse/sensation after splinting = immediate readjustment needed"
    ],
    commonMisconceptions: [
      "All fractures require realignment before splinting",
      "Sprains and strains don't require immobilization"
    ],
    examTips: [
      "Know the 5 Ps of neurovascular assessment",
      "Remember that open fractures are orthopedic emergencies"
    ],
    sections: [
      {
        title: "Fracture Assessment and Management",
        content: [
          "**Open fractures** involve bone penetrating the skin and require immediate sterile dressing and antibiotic consideration.",
          "**Closed fractures** may have significant internal bleeding and swelling requiring careful monitoring.",
          "**Angulated fractures** should generally be splinted in position found unless circulation is compromised."
        ],
        clinicalPearls: [
          "Femur fractures can lose 1-2 units of blood internally",
          "Children's bones bend before breaking (greenstick fractures)"
        ],
        mnemonics: [
          "**5 Ps**: Pain, Pallor, Paresthesias, Pulses, Paralysis (neurovascular assessment)",
          "**RICE**: Rest, Ice, Compression, Elevation (soft tissue injury management)"
        ],
        decisionTrees: [
          "Injury → Assessment → Splinting → Neurovascular check → Transport → Reassessment"
        ]
      }
    ],
    flashcards: [
      { front: "What are the 5 Ps of neurovascular assessment?", back: "Pain, Pallor, Paresthesias, Pulses, Paralysis", category: "protocol" },
      { front: "What is crepitus?", back: "Grating sound or feeling from broken bone ends rubbing together", category: "definition" },
      { front: "How should open fractures be managed?", back: "Control bleeding, sterile dressing, splint, monitor for shock", category: "protocol" },
      { front: "What is the difference between sprain and strain?", back: "Sprain affects ligaments, strain affects muscles/tendons", category: "definition" },
      { front: "When should angulated fractures be realigned?", back: "Only if no pulse present and medical direction authorizes", category: "protocol" },
      { front: "What does RICE stand for?", back: "Rest, Ice, Compression, Elevation", category: "protocol" },
      { front: "How much blood can a femur fracture lose?", back: "1-2 units (500-1000mL) internally", category: "clinical" },
      { front: "What is a greenstick fracture?", back: "Incomplete fracture in children where bone bends and cracks", category: "definition" },
      { front: "What indicates compartment syndrome?", back: "Severe pain, pallor, paresthesias, pulselessness, paralysis", category: "clinical" },
      { front: "How should dislocations be managed?", back: "Splint in position found, check neurovascular status", category: "protocol" },
      { front: "What is angulation?", back: "Abnormal position or alignment of fractured bone", category: "definition" },
      { front: "When is traction splinting indicated?", back: "Closed mid-shaft femur fractures with no joint involvement", category: "protocol" },
      { front: "What are signs of fracture?", back: "Pain, swelling, deformity, loss of function, crepitus", category: "clinical" },
      { front: "How often should neurovascular status be checked?", back: "Before splinting, after splinting, and every 15 minutes during transport", category: "protocol" },
      { front: "What is a pathologic fracture?", back: "Fracture through diseased or weakened bone from minimal force", category: "definition" }
    ]
  };

  const chapter33StudyNotes: ChapterData = {
    title: "Chapter 33: Environmental Exposure Protocols",
    description: "Expert management of temperature-related and environmental emergencies with evidence-based treatment protocols",
    module: "12",
    scope: "EMT-B",
    protocols: ["Hypothermia Management", "Hyperthermia Treatment", "Drowning Protocols", "Lightning Strike Care"],
    learningObjectives: [
      "Recognize and treat various stages of hypothermia",
      "Manage heat-related emergencies including heat stroke",
      "Apply appropriate drowning resuscitation protocols",
      "Understand lightning strike and electrical injury management"
    ],
    keyTerms: ["Hypothermia", "Hyperthermia", "Heat Stroke", "Heat Exhaustion", "Frostbite", "Core Temperature"],
    criticalConcepts: [
      "Core temperature determines severity of temperature emergencies",
      "Aggressive rewarming can cause dangerous arrhythmias",
      "Heat stroke is a medical emergency requiring rapid cooling"
    ],
    clinicalDecisionRules: [
      "Core temp <95°F (35°C) = hypothermia",
      "Core temp >104°F (40°C) + altered mental status = heat stroke"
    ],
    commonMisconceptions: [
      "All drowning victims need aggressive warming",
      "Frostbite should be rapidly rewarmed in the field"
    ],
    examTips: [
      "Know the stages of hypothermia and appropriate treatments",
      "Remember that drowning can occur in minimal water"
    ],
    sections: [
      {
        title: "Temperature Emergencies",
        content: [
          "**Hypothermia** stages progress from mild (shivering) to severe (altered mental status, cardiac arrest risk).",
          "**Heat exhaustion** presents with profuse sweating, weakness, and normal mental status.",
          "**Heat stroke** involves altered mental status, hot dry skin, and core temperature >104°F."
        ],
        clinicalPearls: [
          "Hypothermic patients are not dead until they're warm and dead",
          "Elderly and very young are at highest risk for temperature emergencies"
        ],
        mnemonics: [
          "**COLD**: Cover, Oxygen, Low manipulation, Dry (hypothermia care)",
          "**HOT**: High oxygen, Outside cooling, Transport rapidly (heat stroke)"
        ],
        fieldApplications: [
          "Remove from environmental exposure immediately",
          "Handle hypothermic patients gently to prevent arrhythmias",
          "Cool heat stroke patients aggressively during transport"
        ]
      }
    ],
    flashcards: [
      { front: "At what core temperature does hypothermia begin?", back: "Below 95°F (35°C)", category: "definition" },
      { front: "What does COLD stand for in hypothermia care?", back: "Cover, Oxygen, Low manipulation, Dry", category: "protocol" },
      { front: "What distinguishes heat exhaustion from heat stroke?", back: "Heat stroke has altered mental status and higher core temp", category: "clinical" },
      { front: "What is the core temperature threshold for heat stroke?", back: "Above 104°F (40°C) with altered mental status", category: "definition" },
      { front: "How should hypothermic patients be handled?", back: "Gently, to prevent ventricular fibrillation", category: "protocol" },
      { front: "What are signs of severe hypothermia?", back: "Altered mental status, decreased shivering, bradycardia", category: "clinical" },
      { front: "How should frostbite be treated in the field?", back: "Protect area, do not rub or rewarm, transport", category: "protocol" },
      { front: "What is the diving reflex?", back: "Protective response that slows metabolism in cold water", category: "definition" },
      { front: "How should drowning victims be managed?", back: "C-spine precautions, aggressive ventilation, hypothermia prevention", category: "protocol" },
      { front: "What are heat exhaustion symptoms?", back: "Profuse sweating, weakness, nausea, normal mental status", category: "clinical" },
      { front: "What cooling methods are used for heat stroke?", back: "Ice packs to neck/groin/armpits, fan, wet sheets", category: "protocol" },
      { front: "Why avoid aggressive rewarming of hypothermia?", back: "Can cause afterdrop and dangerous arrhythmias", category: "clinical" },
      { front: "What is trench foot?", back: "Prolonged exposure to cold, wet conditions causing tissue damage", category: "definition" },
      { front: "How long can cold water drowning victims survive?", back: "Up to 45-60 minutes due to diving reflex", category: "clinical" },
      { front: "What are lightning strike injury priorities?", back: "Cardiac monitoring, spinal immobilization, burn care", category: "protocol" }
    ]
  };

  const chapter34StudyNotes: ChapterData = {
    title: "Chapter 34: Obstetric & Neonatal Emergencies",
    description: "Professional management of pregnancy emergencies and neonatal care with evidence-based delivery protocols",
    module: "13",
    scope: "EMT-B",
    protocols: ["Emergency Delivery", "Neonatal Resuscitation", "Pregnancy Complications", "Postpartum Care"],
    learningObjectives: [
      "Recognize signs of imminent delivery and birth complications",
      "Perform emergency field delivery with proper techniques",
      "Apply neonatal resuscitation protocols including APGAR scoring",
      "Manage pregnancy-related emergencies and complications"
    ],
    keyTerms: ["APGAR", "Crowning", "Placenta", "Umbilical Cord", "Breech Presentation", "Eclampsia"],
    criticalConcepts: [
      "Most births are normal and require minimal intervention",
      "Neonatal resuscitation follows specific protocols different from adults",
      "Pregnancy complications can be life-threatening for mother and baby"
    ],
    clinicalDecisionRules: [
      "Crowning visible = delivery imminent, prepare for field delivery",
      "APGAR <7 at 1 minute = consider resuscitation interventions"
    ],
    commonMisconceptions: [
      "All deliveries require immediate cord cutting",
      "Breech deliveries always require emergency transport"
    ],
    examTips: [
      "Know the components of APGAR scoring",
      "Remember the steps of neonatal resuscitation"
    ],
    sections: [
      {
        title: "Emergency Delivery Procedures",
        content: [
          "**Normal delivery** occurs in three stages: labor, delivery of baby, delivery of placenta.",
          "**Crowning** indicates imminent delivery and field delivery preparation should begin.",
          "**Cord care** involves clamping and cutting after pulsations stop or baby begins breathing."
        ],
        clinicalPearls: [
          "Never delay delivery by attempting transport if crowning occurs",
          "Most neonates will begin breathing spontaneously"
        ],
        mnemonics: [
          "**APGAR**: Appearance, Pulse, Grimace, Activity, Respiratory effort",
          "**ABC**: Airway, Breathing, Circulation (neonatal priorities)"
        ],
        fieldApplications: [
          "Prepare delivery kit if signs of imminent birth present",
          "Support baby's head during delivery, do not pull",
          "Keep mother and baby warm after delivery"
        ]
      }
    ],
    flashcards: [
      { front: "What does APGAR assess?", back: "Appearance, Pulse, Grimace, Activity, Respiratory effort", category: "protocol" },
      { front: "When should you prepare for field delivery?", back: "When crowning is visible or delivery is imminent", category: "protocol" },
      { front: "What is crowning?", back: "When the baby's head becomes visible at the vaginal opening", category: "definition" },
      { front: "How should the umbilical cord be managed?", back: "Clamp and cut after pulsations stop or baby breathes", category: "protocol" },
      { front: "What is a normal APGAR score?", back: "7-10 (scores 0-2 for each of 5 categories)", category: "clinical" },
      { front: "What is eclampsia?", back: "Seizures in pregnant women, usually related to high blood pressure", category: "definition" },
      { front: "How should a breech delivery be managed?", back: "Support body, allow natural delivery, do not pull on baby", category: "protocol" },
      { front: "What are the three stages of labor?", back: "Dilation, delivery of baby, delivery of placenta", category: "definition" },
      { front: "When does neonatal resuscitation begin?", back: "If baby doesn't breathe after stimulation and warming", category: "protocol" },
      { front: "What is the normal fetal heart rate?", back: "120-160 beats per minute", category: "clinical" },
      { front: "How should cord prolapse be managed?", back: "Position mother with hips elevated, do not push cord back", category: "protocol" },
      { front: "What indicates placental delivery?", back: "Cord lengthening, gush of blood, uterine contractions", category: "clinical" },
      { front: "What is preeclampsia?", back: "High blood pressure during pregnancy with protein in urine", category: "definition" },
      { front: "How often is APGAR assessed?", back: "At 1 minute and 5 minutes after birth", category: "protocol" },
      { front: "What temperature should neonates be kept?", back: "Warm and dry, normal body temperature 97-99°F", category: "clinical" }
    ]
  };

  const chapter35StudyNotes: ChapterData = {
    title: "Chapter 35: Pediatric Emergency Response",
    description: "Specialized pediatric emergency care with age-appropriate assessment and treatment protocols",
    module: "13",
    scope: "EMT-B",
    protocols: ["Pediatric Assessment Triangle", "Age-Specific Vital Signs", "Pediatric Airway Management", "Child Abuse Recognition"],
    learningObjectives: [
      "Apply pediatric assessment triangle for rapid evaluation",
      "Recognize normal and abnormal pediatric vital signs by age",
      "Demonstrate age-appropriate airway and breathing interventions",
      "Identify signs of child abuse and neglect"
    ],
    keyTerms: ["PAT", "Pediatric Assessment Triangle", "Febrile Seizure", "Respiratory Distress", "Dehydration"],
    criticalConcepts: [
      "Children are not small adults - physiology and responses differ",
      "Pediatric Assessment Triangle provides rapid initial evaluation",
      "Children compensate well initially but decompensate rapidly"
    ],
    clinicalDecisionRules: [
      "Abnormal PAT = immediate intervention needed",
      "Respiratory rate >60 in infant = respiratory distress"
    ],
    commonMisconceptions: [
      "Normal vital signs mean child is stable",
      "Febrile seizures always indicate serious illness"
    ],
    examTips: [
      "Know normal vital sign ranges for different age groups",
      "Understand the components of the Pediatric Assessment Triangle"
    ],
    sections: [
      {
        title: "Pediatric Assessment and Care",
        content: [
          "**Pediatric Assessment Triangle** evaluates appearance, work of breathing, and circulation to skin.",
          "**Age-specific considerations** include different normal vital signs, medication doses, and equipment sizes.",
          "**Family-centered care** involves keeping child with caregivers when possible and age-appropriate communication."
        ],
        clinicalPearls: [
          "A quiet child may be more concerning than a crying child",
          "Capillary refill >2 seconds is abnormal in children"
        ],
        mnemonics: [
          "**PAT**: Pediatric Assessment Triangle (Appearance, Work of breathing, Circulation)",
          "**CHILD**: Check pulse, Heart rate, Identify problems, Look at breathing, Determine skin signs"
        ],
        fieldApplications: [
          "Use appropriate-sized equipment for pediatric patients",
          "Position airway carefully - children have large heads",
          "Involve caregivers in care when possible"
        ]
      }
    ],
    flashcards: [
      { front: "What does PAT assess?", back: "Appearance, Work of breathing, Circulation to skin", category: "protocol" },
      { front: "What is normal heart rate for newborn?", back: "120-160 beats per minute", category: "clinical" },
      { front: "What is normal respiratory rate for infant?", back: "30-60 breaths per minute", category: "clinical" },
      { front: "What indicates respiratory distress in children?", back: "Increased work of breathing, abnormal sounds, poor color", category: "clinical" },
      { front: "What is a febrile seizure?", back: "Seizure caused by rapid rise in body temperature in children", category: "definition" },
      { front: "What are signs of dehydration in children?", back: "Decreased skin turgor, dry mucous membranes, sunken fontanelles", category: "clinical" },
      { front: "How should pediatric airways be positioned?", back: "Neutral position due to large occiput in infants", category: "protocol" },
      { front: "What is normal blood pressure for school-age child?", back: "Approximately 80 + (2 × age in years) systolic", category: "clinical" },
      { front: "What are concerning appearance signs in PAT?", back: "Lethargy, poor eye contact, inability to be consoled", category: "clinical" },
      { front: "How should child abuse be documented?", back: "Quote patient/caregiver statements, photograph injuries if protocol allows", category: "protocol" },
      { front: "What is normal capillary refill in children?", back: "Less than 2 seconds", category: "clinical" },
      { front: "What size ET tube for 5-year-old?", back: "5.0mm (age + 4 divided by 4)", category: "protocol" },
      { front: "What are red flags for child abuse?", back: "Inconsistent history, unusual injury patterns, delayed care seeking", category: "clinical" },
      { front: "How do children's airways differ from adults?", back: "Larger tongue, higher larynx, smaller trachea, larger occiput", category: "definition" },
      { front: "What is grunting in children?", back: "Expiratory sound indicating respiratory distress and PEEP attempt", category: "clinical" }
    ]
  };

  const chapter36StudyNotes: ChapterData = {
    title: "Chapter 36: Geriatric Emergency Care",
    description: "Specialized geriatric emergency care addressing age-related physiological changes and complex medical conditions",
    module: "13",
    scope: "EMT-B",
    protocols: ["Polypharmacy Assessment", "Fall Risk Evaluation", "Geriatric Abuse Recognition", "Age-Related Changes"],
    learningObjectives: [
      "Recognize normal aging changes versus pathological conditions",
      "Assess medication interactions and polypharmacy effects",
      "Identify elder abuse and neglect indicators", 
      "Apply age-appropriate communication and care techniques"
    ],
    keyTerms: ["Polypharmacy", "Elder Abuse", "Activities of Daily Living", "Cognitive Impairment", "Frailty"],
    criticalConcepts: [
      "Normal aging changes affect assessment and treatment",
      "Multiple medications increase adverse reaction risks",
      "Elder abuse is often underrecognized and underreported"
    ],
    clinicalDecisionRules: [
      "Fall + inability to get up = possible serious injury",
      "Sudden mental status change = rule out medical causes first"
    ],
    commonMisconceptions: [
      "Confusion is normal in elderly patients",
      "All elderly patients have hearing problems"
    ],
    examTips: [
      "Know the normal physiological changes of aging",
      "Understand how aging affects medication metabolism"
    ],
    sections: [
      {
        title: "Geriatric Assessment Considerations",
        content: [
          "**Normal aging changes** include decreased cardiac output, reduced lung capacity, and slower metabolism.",
          "**Polypharmacy** effects include increased drug interactions, adverse reactions, and compliance issues.",
          "**Communication strategies** should account for sensory impairments while maintaining dignity and respect."
        ],
        clinicalPearls: [
          "Sudden confusion in elderly often indicates serious medical problem",
          "Elderly patients may not show typical signs of infection"
        ],
        mnemonics: [
          "**ELDER**: Examine carefully, Look for abuse, Determine medications, Evaluate mental status, Respect dignity"
        ],
        fieldApplications: [
          "Speak clearly and face the patient when communicating",
          "Allow extra time for position changes and movement",
          "Assess home environment for safety hazards"
        ]
      }
    ],
    flashcards: [
      { front: "What is polypharmacy?", back: "Use of multiple medications, typically 5 or more", category: "definition" },
      { front: "What are normal aging cardiovascular changes?", back: "Decreased cardiac output, arterial stiffening, slower heart rate", category: "clinical" },
      { front: "What respiratory changes occur with aging?", back: "Decreased lung elasticity, reduced vital capacity, weaker cough", category: "clinical" },
      { front: "What are signs of elder abuse?", back: "Unexplained injuries, poor hygiene, malnutrition, fear of caregiver", category: "clinical" },
      { front: "What is sundown syndrome?", back: "Increased confusion and agitation in evening hours", category: "definition" },
      { front: "How does aging affect drug metabolism?", back: "Slower metabolism, increased sensitivity, prolonged effects", category: "clinical" },
      { front: "What are activities of daily living (ADL)?", back: "Basic self-care tasks: eating, bathing, dressing, toileting", category: "definition" },
      { front: "What causes orthostatic hypotension in elderly?", back: "Medications, dehydration, prolonged bed rest, age-related changes", category: "clinical" },
      { front: "What is different about pain in elderly?", back: "May be diminished, atypical presentation, undertreated", category: "clinical" },
      { front: "How should you communicate with hearing-impaired elderly?", back: "Face patient, speak clearly, use gestures, write if needed", category: "protocol" },
      { front: "What infection signs may be absent in elderly?", back: "Fever, elevated white blood cell count", category: "clinical" },
      { front: "What are fall risk factors in elderly?", back: "Medications, vision problems, environmental hazards, weakness", category: "clinical" },
      { front: "What is frailty syndrome?", back: "Age-related decline in multiple body systems, increased vulnerability", category: "definition" },
      { front: "How do you assess capacity in elderly?", back: "Evaluate understanding, reasoning, appreciation of consequences", category: "protocol" },
      { front: "What are signs of medication noncompliance?", back: "Pill organizers, expired medications, confusion about dosing", category: "clinical" }
    ]
  };

  const bonusStudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 1: Cellular Structure & Function 🧬",
    description: "Fundamental cellular biology and basic life processes essential for understanding human physiology",
    module: "Body Systems",
    scope: "EMT-B",
    protocols: ["Cellular Biology", "Basic Life Processes", "Membrane Transport", "Cellular Metabolism"],
    learningObjectives: [
      "Understand basic cellular structure and organelle functions",
      "Recognize cellular transport mechanisms",
      "Apply cellular concepts to disease processes",
      "Integrate cellular biology with patient care"
    ],
    keyTerms: ["Cell Membrane", "Organelles", "Diffusion", "Osmosis", "Metabolism"],
    criticalConcepts: [
      "All body functions depend on proper cellular function",
      "Cellular dysfunction leads to tissue and organ failure",
      "Understanding cellular processes helps explain disease mechanisms"
    ],
    sections: [
      {
        title: "Basic Cell Structure",
        content: [
          "**Cell membrane** controls what enters and exits cells through selective permeability 🧬",
          "**Nucleus** contains DNA and controls cellular activities",
          "**Mitochondria** produce ATP energy for cellular processes"
        ],
        clinicalPearls: [
          "Cell membrane damage leads to cellular death and tissue necrosis",
          "Mitochondrial dysfunction causes cellular energy crisis"
        ]
      }
    ],
    flashcards: [
      { front: "What is the basic unit of life?", back: "The cell - smallest functional unit of living organisms", category: "definition" },
      { front: "What controls what enters and exits a cell?", back: "Cell membrane through selective permeability", category: "definition" },
      { front: "What organelle produces ATP energy?", back: "Mitochondria - the powerhouse of the cell", category: "definition" },
      { front: "What is diffusion?", back: "Movement of substances from high to low concentration", category: "definition" },
      { front: "What is osmosis?", back: "Movement of water across a membrane to balance solute concentrations", category: "definition" }
    ]
  };

  const bodySystem2StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 2: Tissues & Organs 🩸",
    description: "Organization of cells into tissues, organs, and organ systems",
    module: "Body Systems", 
    scope: "EMT-B",
    protocols: ["Tissue Types", "Organ Formation", "System Integration"],
    learningObjectives: [
      "Identify four basic tissue types",
      "Understand organ formation from tissues", 
      "Recognize tissue injury patterns",
      "Apply tissue concepts to trauma assessment"
    ],
    keyTerms: ["Epithelial", "Connective", "Muscle", "Nervous", "Organs"],
    criticalConcepts: [
      "Tissues work together to form functional organs",
      "Tissue type determines injury and healing patterns",
      "Understanding tissue organization helps predict injury severity"
    ],
    sections: [
      {
        title: "Tissue Organization",
        content: [
          "**Epithelial tissue** covers surfaces and forms glands 🩸",
          "**Connective tissue** provides structural support",
          "**Muscle tissue** enables movement and contraction"
        ]
      }
    ],
    flashcards: [
      { front: "What are the four basic tissue types?", back: "Epithelial, connective, muscle, and nervous tissue", category: "definition" },
      { front: "What tissue type covers body surfaces?", back: "Epithelial tissue - forms protective barriers", category: "definition" },
      { front: "What tissue provides structural support?", back: "Connective tissue - includes bone, cartilage, blood", category: "definition" },
      { front: "What tissue enables body movement?", back: "Muscle tissue - skeletal, cardiac, and smooth", category: "definition" },
      { front: "What tissue carries electrical impulses?", back: "Nervous tissue - neurons and supporting cells", category: "definition" }
    ]
  };

  const bodySystem3StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 3: Skeletal System 🦴",
    description: "Bone structure, joint function, and musculoskeletal support framework",
    module: "Body Systems",
    scope: "EMT-B", 
    protocols: ["Bone Structure", "Joint Classification", "Fracture Patterns"],
    learningObjectives: [
      "Identify major bones and bone markings",
      "Classify joint types and movements",
      "Recognize fracture patterns and implications",
      "Apply skeletal anatomy to trauma assessment"
    ],
    keyTerms: ["Compact Bone", "Spongy Bone", "Joint", "Cartilage", "Fracture"],
    criticalConcepts: [
      "Bones provide structural support and protect organs",
      "Joint type determines movement and injury patterns",
      "Bone healing follows predictable stages"
    ],
    sections: [
      {
        title: "Bone and Joint Structure", 
        content: [
          "**Compact bone** provides strength and protection 🦴",
          "**Spongy bone** produces blood cells in red marrow",
          "**Joints** allow movement between bones"
        ]
      }
    ],
    flashcards: [
      { front: "How many bones are in the adult human body?", back: "206 bones in the adult skeleton", category: "definition" },
      { front: "What are the two types of bone tissue?", back: "Compact (dense) and spongy (cancellous) bone", category: "definition" },
      { front: "Where is red bone marrow found?", back: "In spongy bone - produces blood cells", category: "definition" },
      { front: "What are the three types of joints?", back: "Immovable (fibrous), slightly movable (cartilaginous), freely movable (synovial)", category: "definition" },
      { front: "What is a fracture?", back: "A break or crack in bone continuity", category: "definition" }
    ]
  };

  const bodySystem4StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 4: Muscular System 💪",
    description: "Muscle types, contraction mechanisms, and movement coordination",
    module: "Body Systems",
    scope: "EMT-B",
    protocols: ["Muscle Types", "Contraction Physiology", "Movement Patterns"],
    learningObjectives: [
      "Distinguish between muscle types and functions",
      "Understand muscle contraction mechanisms", 
      "Recognize muscle injury patterns",
      "Apply muscle physiology to patient assessment"
    ],
    keyTerms: ["Skeletal Muscle", "Cardiac Muscle", "Smooth Muscle", "Contraction", "Tendon"],
    criticalConcepts: [
      "Different muscle types serve specific functions",
      "Muscle contraction requires energy and proper innervation",
      "Muscle injury affects movement and function"
    ],
    sections: [
      {
        title: "Muscle Function",
        content: [
          "**Skeletal muscle** enables voluntary movement 💪",
          "**Cardiac muscle** pumps blood through circulation",
          "**Smooth muscle** controls involuntary organ functions"
        ]
      }
    ],
    flashcards: [
      { front: "What are the three types of muscle tissue?", back: "Skeletal, cardiac, and smooth muscle", category: "definition" },
      { front: "Which muscle type is voluntary?", back: "Skeletal muscle - under conscious control", category: "definition" },
      { front: "Where is cardiac muscle found?", back: "Only in the heart - pumps blood", category: "definition" },
      { front: "What controls smooth muscle?", back: "Autonomic nervous system - involuntary", category: "definition" },
      { front: "What connects muscle to bone?", back: "Tendons - fibrous connective tissue", category: "definition" }
    ]
  };

  const bodySystem5StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 5: Cardiovascular System ❤️",
    description: "Heart structure, blood vessels, circulation pathways, and cardiac physiology",
    module: "Body Systems",
    scope: "EMT-B",
    protocols: ["Cardiac Anatomy", "Blood Vessels", "Circulation", "Blood Pressure"],
    learningObjectives: [
      "Identify heart chambers and major vessels",
      "Understand circulation pathways",
      "Recognize cardiovascular assessment findings",
      "Apply cardiac physiology to emergency care"
    ],
    keyTerms: ["Atria", "Ventricles", "Arteries", "Veins", "Capillaries"],
    criticalConcepts: [
      "Heart pumps blood through two circulation circuits",
      "Blood pressure reflects cardiac output and vascular resistance", 
      "Cardiovascular failure leads to shock states"
    ],
    sections: [
      {
        title: "Heart and Circulation",
        content: [
          "**Four-chamber heart** pumps blood through body ❤️",
          "**Arteries** carry blood away from heart",
          "**Veins** return blood to heart"
        ]
      }
    ],
    flashcards: [
      { front: "How many chambers does the heart have?", back: "Four chambers - two atria and two ventricles", category: "definition" },
      { front: "Which vessels carry blood away from the heart?", back: "Arteries - under high pressure", category: "definition" },
      { front: "Which vessels return blood to the heart?", back: "Veins - under low pressure", category: "definition" },
      { front: "What are the smallest blood vessels?", back: "Capillaries - where gas and nutrient exchange occurs", category: "definition" },
      { front: "What is cardiac output?", back: "Amount of blood pumped by heart per minute", category: "definition" }
    ]
  };

  const bodySystem6StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 6: Respiratory System 🫁",
    description: "Airway anatomy, breathing mechanics, and gas exchange processes",
    module: "Body Systems", 
    scope: "EMT-B",
    protocols: ["Airway Anatomy", "Breathing Mechanics", "Gas Exchange"],
    learningObjectives: [
      "Identify airway structures and functions",
      "Understand breathing mechanics",
      "Recognize respiratory assessment findings", 
      "Apply respiratory physiology to airway management"
    ],
    keyTerms: ["Trachea", "Bronchi", "Alveoli", "Diaphragm", "Gas Exchange"],
    criticalConcepts: [
      "Upper airway warms, filters, and humidifies air",
      "Lower airway conducts air to alveoli for gas exchange",
      "Respiratory failure requires immediate intervention"
    ],
    sections: [
      {
        title: "Respiratory Structure",
        content: [
          "**Upper airway** includes nose, mouth, pharynx, larynx 🫁", 
          "**Lower airway** includes trachea, bronchi, lungs",
          "**Alveoli** are sites of gas exchange"
        ]
      }
    ],
    flashcards: [
      { front: "What structures make up the upper airway?", back: "Nose, mouth, pharynx, and larynx", category: "definition" },
      { front: "What structures make up the lower airway?", back: "Trachea, bronchi, bronchioles, and alveoli", category: "definition" },
      { front: "Where does gas exchange occur?", back: "Alveoli - oxygen and carbon dioxide exchange", category: "definition" },
      { front: "What muscle is primary for breathing?", back: "Diaphragm - contracts during inspiration", category: "definition" },
      { front: "What is tidal volume?", back: "Amount of air breathed in one normal breath", category: "definition" }
    ]
  };

  const bodySystem7StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 7: Nervous System 🧠",
    description: "Central and peripheral nervous system structure and function",
    module: "Body Systems",
    scope: "EMT-B", 
    protocols: ["CNS Structure", "PNS Function", "Neurological Assessment"],
    learningObjectives: [
      "Distinguish CNS and PNS components",
      "Understand nervous system functions",
      "Recognize neurological assessment findings",
      "Apply nervous system anatomy to patient care"
    ],
    keyTerms: ["Brain", "Spinal Cord", "Neurons", "Reflexes", "Meninges"],
    criticalConcepts: [
      "CNS processes and coordinates body functions",
      "PNS carries signals between CNS and body",
      "Nervous system injury can be permanent"
    ],
    sections: [
      {
        title: "Nervous System Organization",
        content: [
          "**Central nervous system** includes brain and spinal cord 🧠",
          "**Peripheral nervous system** includes all other nerves", 
          "**Autonomic nervous system** controls involuntary functions"
        ]
      }
    ],
    flashcards: [
      { front: "What are the two main divisions of the nervous system?", back: "Central nervous system (CNS) and peripheral nervous system (PNS)", category: "definition" },
      { front: "What structures make up the CNS?", back: "Brain and spinal cord", category: "definition" },
      { front: "What are the three layers of meninges?", back: "Dura mater, arachnoid mater, pia mater", category: "definition" },
      { front: "What is a neuron?", back: "Basic functional unit of the nervous system", category: "definition" },
      { front: "What controls heart rate and breathing?", back: "Autonomic nervous system - medulla oblongata", category: "definition" }
    ]
  };

  const bodySystem8StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 8: Endocrine System 🏥",
    description: "Hormone production, regulation, and endocrine gland functions",
    module: "Body Systems",
    scope: "EMT-B",
    protocols: ["Hormone Function", "Gland Locations", "Endocrine Disorders"],
    learningObjectives: [
      "Identify major endocrine glands",
      "Understand hormone functions",
      "Recognize endocrine emergency signs",
      "Apply endocrine concepts to patient assessment"
    ],
    keyTerms: ["Hormones", "Pancreas", "Thyroid", "Adrenals", "Insulin"],
    criticalConcepts: [
      "Hormones regulate body functions through chemical signaling",
      "Endocrine disorders can cause life-threatening emergencies", 
      "Blood glucose regulation is critical for brain function"
    ],
    sections: [
      {
        title: "Endocrine Function",
        content: [
          "**Pancreas** produces insulin and glucagon 🏥",
          "**Thyroid** regulates metabolism",
          "**Adrenals** produce stress hormones"
        ]
      }
    ],
    flashcards: [
      { front: "What is a hormone?", back: "Chemical messenger that regulates body functions", category: "definition" },
      { front: "What hormone lowers blood glucose?", back: "Insulin - produced by pancreas", category: "definition" },
      { front: "What hormone raises blood glucose?", back: "Glucagon - produced by pancreas", category: "definition" },
      { front: "What gland regulates metabolism?", back: "Thyroid gland - produces thyroid hormones", category: "definition" },
      { front: "What do adrenal glands produce?", back: "Epinephrine, norepinephrine, and cortisol", category: "definition" }
    ]
  };

  const bodySystem9StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 9: Digestive System 🍎",
    description: "Digestive tract anatomy, digestion processes, and nutrient absorption",
    module: "Body Systems",
    scope: "EMT-B",
    protocols: ["GI Anatomy", "Digestion Process", "Abdominal Assessment"],
    learningObjectives: [
      "Identify digestive system structures",
      "Understand digestion and absorption",
      "Recognize GI emergency presentations",
      "Apply GI anatomy to abdominal assessment"
    ],
    keyTerms: ["Esophagus", "Stomach", "Liver", "Intestines", "Peristalsis"],
    criticalConcepts: [
      "Digestive system breaks down food for nutrient absorption",
      "GI bleeding can cause rapid blood loss",
      "Abdominal pain patterns reflect organ involvement"
    ],
    sections: [
      {
        title: "Digestive Process",
        content: [
          "**Mouth** begins mechanical and chemical digestion 🍎",
          "**Stomach** continues digestion with acid",
          "**Small intestine** absorbs most nutrients"
        ]
      }
    ],
    flashcards: [
      { front: "What is the order of the digestive tract?", back: "Mouth, esophagus, stomach, small intestine, large intestine", category: "definition" },
      { front: "What is peristalsis?", back: "Wave-like muscle contractions that move food through GI tract", category: "definition" },
      { front: "Where does most nutrient absorption occur?", back: "Small intestine - has villi for absorption", category: "definition" },
      { front: "What does the liver produce?", back: "Bile - helps digest fats", category: "definition" },
      { front: "What is the function of stomach acid?", back: "Breaks down food and kills bacteria", category: "definition" }
    ]
  };

  const bodySystem10StudyNotes: ChapterData = {
    title: "BONUS: Human Body Systems - Chapter 10: Urinary System 💧",
    description: "Kidney function, urine formation, and fluid-electrolyte balance",
    module: "Body Systems",
    scope: "EMT-B",
    protocols: ["Kidney Function", "Urine Formation", "Fluid Balance"],
    learningObjectives: [
      "Understand kidney structure and function",
      "Recognize signs of renal dysfunction", 
      "Apply urinary concepts to patient assessment",
      "Understand fluid and electrolyte balance"
    ],
    keyTerms: ["Kidneys", "Nephron", "Urine", "Filtration", "Electrolytes"],
    criticalConcepts: [
      "Kidneys filter blood and maintain fluid balance",
      "Kidney failure leads to toxin buildup",
      "Electrolyte imbalances affect cardiac function"
    ],
    sections: [
      {
        title: "Kidney Function",
        content: [
          "**Kidneys** filter blood and produce urine 💧",
          "**Nephrons** are functional units of kidneys",
          "**Bladder** stores urine until elimination"
        ]
      }
    ],
    flashcards: [
      { front: "What are the main functions of kidneys?", back: "Filter blood, produce urine, maintain fluid balance", category: "definition" },
      { front: "What is a nephron?", back: "Functional unit of the kidney that filters blood", category: "definition" },
      { front: "What are normal urine output rates?", back: "Adults: 0.5-1 mL/kg/hour, Children: 1-2 mL/kg/hour", category: "clinical" },
      { front: "What electrolytes do kidneys regulate?", back: "Sodium, potassium, calcium, phosphorus", category: "definition" },
      { front: "What is oliguria?", back: "Decreased urine output - less than 0.5 mL/kg/hour", category: "definition" }
    ]
  };

  const bonus2StudyNotes: ChapterData = {
    title: "BONUS 2: EMT Advanced Life Support Team Integration 🚑", 
    description: "Professional EMT support roles in advanced life support interventions with evidence-based protocols and seamless team integration",
    module: "ALS Integration",
    scope: "EMT-B",
    protocols: ["ALS Team Support", "IV Setup Assistance", "Medication Preparation", "Cardiac Monitoring", "Advanced Airway Support"],
    learningObjectives: [
      "Execute EMT support roles during ALS interventions within scope of practice",
      "Demonstrate proper IV setup assistance and equipment preparation",
      "Apply systematic medication preparation and administration protocols", 
      "Provide effective cardiac monitoring and airway management support",
      "Integrate pediatric considerations into ALS team support roles"
    ],
    keyTerms: ["ALS Integration", "IV Setup", "Medication Preparation", "Cardiac Monitoring", "Team Communication", "SBAR", "Six Rights"],
    criticalConcepts: [
      "EMTs provide critical support during ALS interventions while maintaining scope of practice",
      "Effective communication and anticipation enhance team performance",
      "Pediatric patients require specialized equipment sizing and weight-based dosing"
    ],
    clinicalDecisionRules: [
      "Six Rights verification prevents medication errors: Patient, Medication, Dose, Route, Time, Documentation",
      "SBAR communication ensures comprehensive patient handoff: Situation, Background, Assessment, Recommendation"
    ],
    commonMisconceptions: [
      "EMTs can perform all tasks paramedics request without scope limitations",
      "IV setup assistance includes starting IVs and adjusting drip rates",
      "Pediatric dosing is simply reduced adult dosing rather than weight-based calculations"
    ],
    examTips: [
      "Know the difference between EMT-authorized medications and ALS drug preparation",
      "Remember pediatric equipment sizing uses Broselow tape or weight-based calculations",
      "Understand that EMTs assist with but do not interpret cardiac monitoring"
    ],
    sections: [
      {
        title: "ALS Team Integration and Scope of Practice",
        content: [
          "**EMT scope of practice** in ALS support includes IV setup assistance, medication preparation, cardiac monitoring electrode placement, and basic airway management while assisting with advanced procedures.",
          "**Communication protocols** require clear, concise language using closed-loop communication to confirm orders and report patient status changes.",
          "**Team dynamics** involve anticipating paramedic needs, maintaining situational awareness, and adhering to established protocols and scope limitations."
        ],
        clinicalPearls: [
          "Effective ALS teams operate with predictable communication patterns and role clarity",
          "EMT preparation of equipment before requests improves response times",
          "Understanding pathophysiology helps EMTs anticipate needed interventions"
        ],
        mnemonics: [
          "**AIDS**: Airway (suction, adjuncts), IV (setup, prime), Drugs (prepare, administer EMT meds), Support (monitoring, communication)",
          "**SBAR**: Situation, Background, Assessment, Recommendation (handoff protocol)"
        ],
        fieldApplications: [
          "Prepare IV equipment immediately upon recognizing shock states",
          "Have naloxone readily available for altered mental status calls",
          "Set up cardiac monitoring equipment for chest pain complaints"
        ]
      },
      {
        title: "IV Setup and Medication Support",
        content: [
          "**IV setup assistance** involves gathering supplies (appropriate gauge catheter, saline bags, tubing), spiking IV bags, priming tubing to eliminate air, and assisting with site preparation without inserting catheters.",
          "**Medication preparation** includes opening vials and packages for ALS medications under paramedic supervision, verifying Six Rights, and administering EMT-authorized medications per protocol.",
          "**Pediatric considerations** require weight-based fluid calculations (20 mL/kg bolus), smaller catheter gauges (22-24G), and pediatric-specific auto-injectors and dosing."
        ],
        clinicalPearls: [
          "Always check IV bags for clarity, expiration dates, and proper fluid type",
          "Pediatric IV access is more difficult - prepare multiple catheter sizes",
          "EMT medications require the same Six Rights verification as ALS drugs"
        ],
        decisionTrees: [
          "Shock recognition → IV setup → Fluid bolus → Monitor response → Repeat if needed",
          "Medication order → Verify Six Rights → Prepare/administer → Monitor effects → Document"
        ]
      },
      {
        title: "Cardiac Monitoring and Airway Management Support", 
        content: [
          "**Cardiac monitoring support** includes proper electrode placement for 3-lead, 4-lead, and 12-lead ECGs, ensuring skin preparation and electrode adhesion, and assisting with defibrillator pad placement.",
          "**Advanced airway support** involves maintaining basic airway management, providing bag-valve-mask ventilation during intubation attempts, and assisting with equipment preparation and tube securing.",
          "**Patient monitoring** requires continuous assessment of vital signs, oxygen saturation, capnography waveforms (if trained), and immediate reporting of changes to the paramedic."
        ],
        clinicalPearls: [
          "Clean, dry skin ensures proper electrode contact and reduces artifacts",
          "BVM ventilation during intubation requires coordination with paramedic timing",
          "Capnography provides real-time feedback on ventilation effectiveness"
        ],
        fieldApplications: [
          "Apply defibrillator pads early in cardiac arrest situations",
          "Maintain suction readiness during advanced airway procedures",
          "Position patient appropriately for airway visualization during intubation"
        ]
      }
    ],
    flashcards: [
      { front: "What does the AIDS mnemonic represent for ALS support?", back: "Airway, IV, Drugs, Support - key EMT assistance roles", category: "protocol" },
      { front: "What are the Six Rights of medication administration?", back: "Patient, Medication, Dose, Route, Time, Documentation", category: "protocol" },
      { front: "What IV catheter sizes are appropriate for adults vs pediatrics?", back: "Adults: 18-20G, Pediatrics: 22-24G", category: "clinical" },
      { front: "What is the pediatric fluid bolus calculation?", back: "20 mL/kg for initial bolus in shock states", category: "protocol" },
      { front: "What does SBAR stand for in patient handoff?", back: "Situation, Background, Assessment, Recommendation", category: "protocol" },
      { front: "What EMT medications can be administered without paramedic supervision?", back: "Naloxone, epinephrine, albuterol, oral glucose, aspirin, oxygen per protocol", category: "protocol" },
      { front: "What is the adult naloxone dose for opioid overdose?", back: "0.4-2 mg IN/IM, titrated to respiratory effort", category: "protocol" },
      { front: "What is the pediatric naloxone dose?", back: "0.1 mg/kg (maximum 2 mg total dose)", category: "protocol" },
      { front: "How do you prime IV tubing?", back: "Spike bag, open roller clamp, flush tubing until air is eliminated", category: "protocol" },
      { front: "What are standard 3-lead ECG electrode placements?", back: "RA (right arm, white), LA (left arm, black), LL (left leg, red)", category: "protocol" },
      { front: "What is the appropriate BVM ventilation rate for adults?", back: "1 breath every 5-6 seconds (10-12 breaths per minute)", category: "protocol" },
      { front: "What is the pediatric BVM ventilation rate?", back: "1 breath every 3-5 seconds (12-20 breaths per minute)", category: "protocol" },
      { front: "What are contraindications to oral glucose?", back: "Unconscious patient, suspected hyperglycemia, inability to swallow", category: "clinical" },
      { front: "What defibrillator pad placement is used for adults?", back: "Anterior-apex (right chest, left lateral) or anterior-posterior", category: "protocol" },
      { front: "What is the epinephrine dose for adult anaphylaxis?", back: "0.3 mg IM (1:1000 concentration) in vastus lateralis", category: "protocol" },
      { front: "What is the pediatric epinephrine dose for anaphylaxis?", back: "0.15 mg IM for patients <30 kg (EpiPen Jr.)", category: "protocol" },
      { front: "How often should you reassess a patient during ALS interventions?", back: "Continuously during procedures, formal reassessment every 5 minutes", category: "protocol" },
      { front: "What information is included in an SBAR handoff?", back: "Chief complaint, interventions performed, current status, recommendations", category: "clinical" },
      { front: "What are signs of IV infiltration?", back: "Swelling, coolness, pain at IV site, decreased flow rate", category: "clinical" },
      { front: "What is closed-loop communication?", back: "Confirming orders by repeating back what was heard", category: "definition" },
      { front: "What EMT tasks are NOT within scope during ALS support?", back: "Starting IVs, interpreting ECGs, administering ALS medications, intubation", category: "clinical" },
      { front: "What is the albuterol dose for adult bronchospasm?", back: "2.5 mg nebulized over 5-10 minutes", category: "protocol" },
      { front: "What is the pediatric albuterol dose?", back: "2.5 mg (>2 years) or 1.25 mg (<2 years) nebulized", category: "protocol" },
      { front: "How do you size a pediatric OPA?", back: "Measure from corner of mouth to angle of jaw", category: "protocol" },
      { front: "What is the aspirin dose for suspected MI?", back: "160-325 mg chewed (typically 4 baby aspirin)", category: "protocol" }
    ]
  };

  // Chapter selection and data management
  const chapters = {
    chapter1: chapter1StudyNotes,
    chapter2: chapter2StudyNotes,
    chapter3: chapter3StudyNotes,
    chapter4: chapter4StudyNotes,
    chapter5: chapter5StudyNotes,
    chapter6: chapter6StudyNotes,
    chapter7: chapter7StudyNotes,
    chapter8: chapter8StudyNotes,
    chapter9: chapter9StudyNotes,
    chapter10: chapter10StudyNotes,
    chapter11: chapter11StudyNotes,
    chapter17: chapter17StudyNotes,
    chapter20: chapter20StudyNotes,
    chapter21: chapter21StudyNotes,
    chapter22: chapter22StudyNotes,
    chapter23: chapter23StudyNotes,
    chapter31: chapter31StudyNotes,
    chapter32: chapter32StudyNotes,
    chapter33: chapter33StudyNotes,
    chapter34: chapter34StudyNotes,
    chapter35: chapter35StudyNotes,
    chapter36: chapter36StudyNotes,
    bonus: bonusStudyNotes,
    bodySystem2: bodySystem2StudyNotes,
    bodySystem3: bodySystem3StudyNotes,
    bodySystem4: bodySystem4StudyNotes,
    bodySystem5: bodySystem5StudyNotes,
    bodySystem6: bodySystem6StudyNotes,
    bodySystem7: bodySystem7StudyNotes,
    bodySystem8: bodySystem8StudyNotes,
    bodySystem9: bodySystem9StudyNotes,
    bodySystem10: bodySystem10StudyNotes,
    bonus2: bonus2StudyNotes
  };

  const currentChapter = chapters[activeChapter as keyof typeof chapters] || chapter2StudyNotes;

  const toggleSection = (index: number) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Download Functions
  const generateTextContent = () => {
    let textContent = `${currentChapter.title}\\n`;
    textContent += `${currentChapter.description}\\n\\n`;
    
    textContent += "LEARNING OBJECTIVES:\\n";
    currentChapter.learningObjectives.forEach((objective, index) => {
      textContent += `${index + 1}. ${objective}\\n`;
    });
    textContent += "\\n";

    textContent += "KEY TERMS:\\n";
    currentChapter.keyTerms.forEach((term) => {
      textContent += `• ${term}\\n`;
    });
    textContent += "\\n";

    if (currentChapter.protocols && currentChapter.protocols.length > 0) {
      textContent += "PROTOCOLS:\\n";
      currentChapter.protocols.forEach((protocol) => {
        textContent += `• ${protocol}\\n`;
      });
      textContent += "\\n";
    }

    textContent += "STUDY CONTENT:\\n\\n";
    currentChapter.sections.forEach((section) => {
      textContent += `${section.title}\\n`;
      textContent += "=".repeat(section.title.length) + "\\n";
      section.content.forEach(paragraph => {
        const cleanParagraph = paragraph.replace(/\\*\\*(.*?)\\*\\*/g, '$1');
        textContent += `${cleanParagraph}\\n`;
      });
      
      if (section.clinicalPearls && section.clinicalPearls.length > 0) {
        textContent += "\\nClinical Pearls:\\n";
        section.clinicalPearls.forEach(pearl => textContent += `• ${pearl}\\n`);
      }
      
      if (section.mnemonics && section.mnemonics.length > 0) {
        textContent += "\\nMnemonics:\\n";
        section.mnemonics.forEach(mnemonic => textContent += `• ${mnemonic}\\n`);
      }
      
      textContent += "\\n";
    });

    if (currentChapter.criticalConcepts && currentChapter.criticalConcepts.length > 0) {
      textContent += "CRITICAL CONCEPTS:\\n";
      currentChapter.criticalConcepts.forEach((concept, index) => {
        textContent += `${index + 1}. ${concept}\\n`;
      });
      textContent += "\\n";
    }

    textContent += `---\\nGenerated from EMT-B Study Notes - ${new Date().toLocaleDateString()}\\n`;
    return textContent;
  };

  const downloadAsText = () => {
    const content = generateTextContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EMT-B_${activeChapter}_Study_Notes.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return currentChapter.sections;
    
    return currentChapter.sections.filter(section =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.some(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, currentChapter.sections]);

  // Global search across ALL platform content
  const globalSearchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const searchLower = searchTerm.toLowerCase();
    const results: Array<{
      type: string;
      chapterTitle: string;
      chapterKey: string;
      title: string;
      content: string;
      category?: string;
    }> = [];

    // Search all chapters
    Object.entries(chapters).forEach(([chapterKey, chapterData]) => {
      const chapter = chapterData as ChapterData;

      // Search chapter title and description
      if (chapter.title.toLowerCase().includes(searchLower) || 
          chapter.description.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'Chapter Overview',
          chapterTitle: chapter.title,
          chapterKey,
          title: chapter.title,
          content: chapter.description
        });
      }

      // Search learning objectives
      chapter.learningObjectives?.forEach(objective => {
        if (objective.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Learning Objective',
            chapterTitle: chapter.title,
            chapterKey,
            title: 'Learning Objective',
            content: objective
          });
        }
      });

      // Search key terms
      chapter.keyTerms?.forEach(term => {
        if (term.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Key Term',
            chapterTitle: chapter.title,
            chapterKey,
            title: term,
            content: `Key medical term: ${term}`
          });
        }
      });

      // Search protocols
      chapter.protocols?.forEach(protocol => {
        if (protocol.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Protocol',
            chapterTitle: chapter.title,
            chapterKey,
            title: protocol,
            content: `Clinical protocol: ${protocol}`
          });
        }
      });

      // Search sections content
      chapter.sections?.forEach(section => {
        if (section.title.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Section',
            chapterTitle: chapter.title,
            chapterKey,
            title: section.title,
            content: section.content?.[0] || 'Section content'
          });
        }

        section.content?.forEach(content => {
          if (content.toLowerCase().includes(searchLower)) {
            results.push({
              type: 'Content',
              chapterTitle: chapter.title,
              chapterKey,
              title: section.title,
              content: content
            });
          }
        });

        // Search clinical pearls
        section.clinicalPearls?.forEach(pearl => {
          if (pearl.toLowerCase().includes(searchLower)) {
            results.push({
              type: 'Clinical Pearl',
              chapterTitle: chapter.title,
              chapterKey,
              title: section.title,
              content: pearl
            });
          }
        });

        // Search mnemonics
        section.mnemonics?.forEach(mnemonic => {
          if (mnemonic.toLowerCase().includes(searchLower)) {
            results.push({
              type: 'Mnemonic',
              chapterTitle: chapter.title,
              chapterKey,
              title: section.title,
              content: mnemonic
            });
          }
        });

        // Search decision trees
        section.decisionTrees?.forEach(tree => {
          if (tree.toLowerCase().includes(searchLower)) {
            results.push({
              type: 'Decision Tree',
              chapterTitle: chapter.title,
              chapterKey,
              title: section.title,
              content: tree
            });
          }
        });

        // Search field applications
        section.fieldApplications?.forEach(application => {
          if (application.toLowerCase().includes(searchLower)) {
            results.push({
              type: 'Field Application',
              chapterTitle: chapter.title,
              chapterKey,
              title: section.title,
              content: application
            });
          }
        });
      });

      // Search critical concepts
      chapter.criticalConcepts?.forEach(concept => {
        if (concept.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Critical Concept',
            chapterTitle: chapter.title,
            chapterKey,
            title: 'Critical Concept',
            content: concept
          });
        }
      });

      // Search clinical decision rules
      chapter.clinicalDecisionRules?.forEach(rule => {
        if (rule.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Clinical Decision Rule',
            chapterTitle: chapter.title,
            chapterKey,
            title: 'Decision Rule',
            content: rule
          });
        }
      });

      // Search common misconceptions
      chapter.commonMisconceptions?.forEach(misconception => {
        if (misconception.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Common Misconception',
            chapterTitle: chapter.title,
            chapterKey,
            title: 'Misconception',
            content: misconception
          });
        }
      });

      // Search exam tips
      chapter.examTips?.forEach(tip => {
        if (tip.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Exam Tip',
            chapterTitle: chapter.title,
            chapterKey,
            title: 'Exam Tip',
            content: tip
          });
        }
      });

      // Search cross references
      chapter.crossReferences?.forEach(ref => {
        if (ref.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Cross Reference',
            chapterTitle: chapter.title,
            chapterKey,
            title: 'Cross Reference',
            content: ref
          });
        }
      });

      // Search flashcards
      chapter.flashcards?.forEach(flashcard => {
        if (flashcard.front.toLowerCase().includes(searchLower) || 
            flashcard.back.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Flashcard',
            chapterTitle: chapter.title,
            chapterKey,
            title: flashcard.front,
            content: flashcard.back,
            category: flashcard.category
          });
        }
      });
    });

    // Search medications database
    medicationsData.forEach(medication => {
      // Search medication name and generic name
      if (medication.name.toLowerCase().includes(searchLower) || 
          medication.genericName.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'Medication',
          chapterTitle: 'Medication Database',
          chapterKey: 'medications',
          title: `${medication.name} (${medication.genericName})`,
          content: `${medication.category} - ${medication.dosage} ${medication.route} - ${medication.indications[0] || 'Multiple indications'}`,
          category: medication.category
        });
      }

      // Search medication indications
      medication.indications?.forEach(indication => {
        if (indication.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Medication Indication',
            chapterTitle: 'Medication Database',
            chapterKey: 'medications',
            title: medication.name,
            content: `Indication: ${indication}`,
            category: medication.category
          });
        }
      });

      // Search medication contraindications
      medication.contraindications?.forEach(contraindication => {
        if (contraindication.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Medication Contraindication',
            chapterTitle: 'Medication Database',
            chapterKey: 'medications',
            title: medication.name,
            content: `Contraindication: ${contraindication}`,
            category: medication.category
          });
        }
      });

      // Search medication side effects
      medication.sideEffects?.forEach(sideEffect => {
        if (sideEffect.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Medication Side Effect',
            chapterTitle: 'Medication Database',
            chapterKey: 'medications',
            title: medication.name,
            content: `Side Effect: ${sideEffect}`,
            category: medication.category
          });
        }
      });

      // Search medication category
      if (medication.category.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'Medication Category',
          chapterTitle: 'Medication Database',
          chapterKey: 'medications',
          title: medication.name,
          content: `Category: ${medication.category} - ${medication.dosage}`,
          category: medication.category
        });
      }

      // Search administration notes
      if (medication.administrationNotes?.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'Administration Note',
          chapterTitle: 'Medication Database',
          chapterKey: 'medications',
          title: medication.name,
          content: `Administration: ${medication.administrationNotes}`,
          category: medication.category
        });
      }

      // Search certification level
      if (medication.certificationLevel?.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'Certification Level',
          chapterTitle: 'Medication Database',
          chapterKey: 'medications',
          title: medication.name,
          content: `Certification Required: ${medication.certificationLevel}`,
          category: medication.category
        });
      }
    });

    // Search EMS protocols
    emsProtocols.forEach(protocol => {
      // Search protocol name
      if (protocol.name.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'EMS Protocol',
          chapterTitle: 'EMS Protocols',
          chapterKey: 'protocols',
          title: protocol.name,
          content: `${protocol.category} protocol - ${protocol.certificationLevel} level`,
          category: protocol.category
        });
      }

      // Search protocol indications
      protocol.indications?.forEach(indication => {
        if (indication.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Protocol Indication',
            chapterTitle: 'EMS Protocols',
            chapterKey: 'protocols',
            title: protocol.name,
            content: `Indication: ${indication}`,
            category: protocol.category
          });
        }
      });

      // Search protocol interventions
      protocol.interventions?.forEach(intervention => {
        if (intervention.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Protocol Intervention',
            chapterTitle: 'EMS Protocols',
            chapterKey: 'protocols',
            title: protocol.name,
            content: `Intervention: ${intervention}`,
            category: protocol.category
          });
        }
      });

      // Search protocol medications
      protocol.medications?.forEach(medication => {
        if (medication.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Protocol Medication',
            chapterTitle: 'EMS Protocols',
            chapterKey: 'protocols',
            title: protocol.name,
            content: `Medication: ${medication}`,
            category: protocol.category
          });
        }
      });

      // Search assessment steps
      protocol.assessment?.forEach(assessment => {
        if (assessment.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Protocol Assessment',
            chapterTitle: 'EMS Protocols',
            chapterKey: 'protocols',
            title: protocol.name,
            content: `Assessment: ${assessment}`,
            category: protocol.category
          });
        }
      });
    });

    // Search emergency scenarios
    emergencyScenarios.forEach(scenario => {
      // Search scenario title and chief complaint
      if (scenario.title.toLowerCase().includes(searchLower) || 
          scenario.chiefComplaint.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'Emergency Scenario',
          chapterTitle: 'Training Scenarios',
          chapterKey: 'scenarios',
          title: scenario.title,
          content: `${scenario.type} scenario - ${scenario.chiefComplaint}`,
          category: scenario.type
        });
      }

      // Search patient presentation
      if (scenario.patientPresentation.appearance.toLowerCase().includes(searchLower) ||
          scenario.patientPresentation.mentalStatus.toLowerCase().includes(searchLower)) {
        results.push({
          type: 'Patient Presentation',
          chapterTitle: 'Training Scenarios',
          chapterKey: 'scenarios',
          title: scenario.title,
          content: `Presentation: ${scenario.patientPresentation.appearance}`,
          category: scenario.type
        });
      }

      // Search differential diagnosis
      scenario.differentialDiagnosis?.forEach(diagnosis => {
        if (diagnosis.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Differential Diagnosis',
            chapterTitle: 'Training Scenarios',
            chapterKey: 'scenarios',
            title: scenario.title,
            content: `Diagnosis: ${diagnosis}`,
            category: scenario.type
          });
        }
      });

      // Search critical actions
      scenario.criticalActions?.forEach(action => {
        if (action.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Critical Action',
            chapterTitle: 'Training Scenarios',
            chapterKey: 'scenarios',
            title: scenario.title,
            content: `Critical Action: ${action}`,
            category: scenario.type
          });
        }
      });

      // Search learning objectives
      scenario.learningObjectives?.forEach(objective => {
        if (objective.toLowerCase().includes(searchLower)) {
          results.push({
            type: 'Learning Objective',
            chapterTitle: 'Training Scenarios',
            chapterKey: 'scenarios',
            title: scenario.title,
            content: `Objective: ${objective}`,
            category: scenario.type
          });
        }
      });
    });

    return results.slice(0, 100); // Limit to 100 results for performance
  }, [searchTerm, chapters]);

  const renderGlobalSearchResults = () => {
    if (!searchTerm.trim() || globalSearchResults.length === 0) return null;

    return (
      <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Search className="h-5 w-5 text-yellow-600 mr-2" />
          <h3 className="text-lg font-semibold text-yellow-800">
            Global Search Results ({globalSearchResults.length} found)
          </h3>
        </div>
        <div className="text-sm text-yellow-700 mb-3">
          Showing results from all chapters, protocols, medications, flashcards, and clinical content
        </div>
        <div className="max-h-96 overflow-y-auto space-y-3">
          {globalSearchResults.map((result, index) => (
            <div
              key={index}
              className="bg-white border border-yellow-300 rounded-lg p-3 cursor-pointer hover:bg-yellow-50 transition-colors"
              onClick={() => {
                if (chapters[result.chapterKey as keyof typeof chapters]) {
                  setActiveChapter(result.chapterKey);
                  setSearchTerm(''); // Clear search to show full chapter
                } else {
                  // For non-chapter results (medications, protocols, scenarios), keep search active
                  // This will show the filtered results relevant to the search term
                  setSearchTerm(result.title.split(' ')[0]); // Set search to first word of the result
                }
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {result.type}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {result.chapterTitle}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{result.title}</h4>
              <p className="text-sm text-gray-600 overflow-hidden" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as const
              }}>
                {result.content}
              </p>
              {result.category && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 mt-2">
                  {result.category}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-yellow-600">
          <div className="font-semibold mb-1">Comprehensive Platform Search Includes:</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 text-xs">
            <div>• Study chapters & sections</div>
            <div>• Medications & dosages</div>
            <div>• EMS protocols & procedures</div>
            <div>• Emergency scenarios</div>
            <div>• Clinical pearls & tips</div>
            <div>• Flashcards & definitions</div>
            <div>• Decision trees & algorithms</div>
            <div>• Field applications</div>
          </div>
          <div className="mt-1">Click any result to navigate to relevant content or refine search.</div>
        </div>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <AlertCircle className="h-6 w-6 text-blue-400 mr-3 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              {currentChapter.title}
            </h3>
            <p className="text-blue-700">
              {currentChapter.description}
            </p>
            <div className="flex items-center mt-2 space-x-4">
              <span className="text-blue-600 text-sm font-medium">
                📚 Module {currentChapter.module}
              </span>
              <span className="text-blue-600 text-sm font-medium">
                🎯 Scope: {currentChapter.scope}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <Heart className="h-8 w-8 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">Learning Objectives</h3>
          <ul className="space-y-2 text-green-700">
            {currentChapter.learningObjectives.map((objective, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <Shield className="h-8 w-8 text-red-600 mb-3" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Key Terms</h3>
          <div className="grid grid-cols-1 gap-1 text-red-700">
            {currentChapter.keyTerms.map((term, index) => (
              <div key={index} className="text-sm font-medium flex items-center">
                <span className="text-red-500 mr-2">•</span>
                <span>{term}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Protocols Section */}
      {currentChapter.protocols && currentChapter.protocols.length > 0 && (
        <div className="bg-orange-50 p-4 rounded-lg">
          <Activity className="h-8 w-8 text-orange-600 mb-3" />
          <h3 className="text-lg font-semibold text-orange-800 mb-2">Protocols & Procedures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-orange-700">
            {currentChapter.protocols.map((protocol, index) => (
              <div key={index} className="text-sm font-medium flex items-center">
                <span className="text-orange-500 mr-2">📋</span>
                <span>{protocol}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flashcards Preview */}
      <div className="bg-purple-50 p-4 rounded-lg">
        <Activity className="h-8 w-8 text-purple-600 mb-3" />
        <h3 className="text-lg font-semibold text-purple-800 mb-2">Flashcards Available</h3>
        <p className="text-purple-700 text-sm mb-3">
          {currentChapter.flashcards.length} flashcards available for this chapter
        </p>
        <button
          onClick={() => setActiveTab('flashcards')}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors"
        >
          Practice Flashcards
        </button>
      </div>
    </div>
  );

  const renderStudyMaterial = () => (
    <div className="space-y-4">
      {filteredSections.map((section, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection(index)}
            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left flex items-center justify-between transition-colors"
          >
            <h3 className="font-medium text-gray-900">{section.title}</h3>
            {expandedSections.has(index) ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.has(index) && (
            <div className="px-4 py-3 bg-white">
              <div className="space-y-4">
                {/* Main Content */}
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700 text-sm leading-relaxed flex items-start">
                      <span className="text-blue-500 mr-2 mt-1.5 text-xs">•</span>
                      <span 
                        dangerouslySetInnerHTML={{ 
                          __html: item.replace(/\\*\\*(.*?)\\*\\*/g, '<strong class="font-semibold text-blue-700 bg-blue-50 px-1 rounded">$1</strong>') 
                        }} 
                      />
                    </li>
                  ))}
                </ul>

                {/* Clinical Pearls */}
                {section.clinicalPearls && section.clinicalPearls.length > 0 && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-r">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      💎 Clinical Pearls
                    </h4>
                    <ul className="space-y-1">
                      {section.clinicalPearls.map((pearl, pearlIndex) => (
                        <li key={pearlIndex} className="text-green-700 text-sm flex items-start">
                          <span className="text-green-500 mr-2 mt-0.5">•</span>
                          <span>{pearl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Mnemonics */}
                {section.mnemonics && section.mnemonics.length > 0 && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r">
                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                      🧠 Mnemonics
                    </h4>
                    <ul className="space-y-1">
                      {section.mnemonics.map((mnemonic, mnemonicIndex) => (
                        <li key={mnemonicIndex} className="text-yellow-700 text-sm">
                          <span 
                            dangerouslySetInnerHTML={{ 
                              __html: mnemonic.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>') 
                            }} 
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Common Pitfalls */}
                {section.commonPitfalls && section.commonPitfalls.length > 0 && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                      ⚠️ Common Pitfalls
                    </h4>
                    <ul className="space-y-1">
                      {section.commonPitfalls.map((pitfall, pitfallIndex) => (
                        <li key={pitfallIndex} className="text-red-700 text-sm">
                          {pitfall}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Decision Trees */}
                {section.decisionTrees && section.decisionTrees.length > 0 && (
                  <div className="bg-indigo-50 border-l-4 border-indigo-400 p-3 rounded-r">
                    <h4 className="font-semibold text-indigo-800 mb-2 flex items-center">
                      🌳 Decision Trees
                    </h4>
                    <ul className="space-y-1">
                      {section.decisionTrees.map((tree, treeIndex) => (
                        <li key={treeIndex} className="text-indigo-700 text-sm">
                          {tree}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Field Applications */}
                {section.fieldApplications && section.fieldApplications.length > 0 && (
                  <div className="bg-teal-50 border-l-4 border-teal-400 p-3 rounded-r">
                    <h4 className="font-semibold text-teal-800 mb-2 flex items-center">
                      🚑 Field Applications
                    </h4>
                    <ul className="space-y-1">
                      {section.fieldApplications.map((app, appIndex) => (
                        <li key={appIndex} className="text-teal-700 text-sm flex items-start">
                          <span className="text-teal-500 mr-2 mt-0.5">•</span>
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderCriticalConcepts = () => (
    <div className="space-y-4">
      {/* Critical Concepts */}
      {currentChapter.criticalConcepts && currentChapter.criticalConcepts.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🚨 Critical Concepts</h3>
          {currentChapter.criticalConcepts.map((concept, index) => (
            <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 shadow-sm rounded-r-lg">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-yellow-800 text-sm font-medium leading-relaxed" 
                   dangerouslySetInnerHTML={{ __html: concept.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>') }} />
              </div>
            </div>
          ))}
        </>
      )}

      {/* Clinical Decision Rules */}
      {currentChapter.clinicalDecisionRules && currentChapter.clinicalDecisionRules.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">📋 Clinical Decision Rules</h3>
          {currentChapter.clinicalDecisionRules.map((rule, index) => (
            <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 shadow-sm rounded-r-lg">
              <p className="text-blue-800 text-sm font-medium leading-relaxed"
                 dangerouslySetInnerHTML={{ __html: rule.replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>') }} />
            </div>
          ))}
        </>
      )}

      {/* Common Misconceptions */}
      {currentChapter.commonMisconceptions && currentChapter.commonMisconceptions.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">❌ Common Misconceptions</h3>
          {currentChapter.commonMisconceptions.map((misconception, index) => (
            <div key={index} className="bg-red-50 border-l-4 border-red-400 p-4 shadow-sm rounded-r-lg">
              <p className="text-red-800 text-sm font-medium leading-relaxed">
                {misconception}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Exam Tips */}
      {currentChapter.examTips && currentChapter.examTips.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">📝 Exam Tips</h3>
          {currentChapter.examTips.map((tip, index) => (
            <div key={index} className="bg-green-50 border-l-4 border-green-400 p-4 shadow-sm rounded-r-lg">
              <p className="text-green-800 text-sm font-medium leading-relaxed">
                {tip}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Cross References */}
      {currentChapter.crossReferences && currentChapter.crossReferences.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">🔗 Cross References</h3>
          {currentChapter.crossReferences.map((ref, index) => (
            <div key={index} className="bg-purple-50 border-l-4 border-purple-400 p-4 shadow-sm rounded-r-lg">
              <p className="text-purple-800 text-sm font-medium leading-relaxed">
                {ref}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );

  const renderFlashcards = () => {
    const flashcards = currentChapter.flashcards;
    if (!flashcards || flashcards.length === 0) {
      return <div className="text-center text-gray-500">No flashcards available for this chapter.</div>;
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Flashcard {currentFlashcard + 1} of {flashcards.length}
            {flashcards[currentFlashcard].category && (
              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {flashcards[currentFlashcard].category}
              </span>
            )}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentFlashcard(Math.max(0, currentFlashcard - 1))}
              disabled={currentFlashcard === 0}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded text-sm"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentFlashcard(Math.min(flashcards.length - 1, currentFlashcard + 1))}
              disabled={currentFlashcard === flashcards.length - 1}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded text-sm"
            >
              Next
            </button>
          </div>
        </div>

        <div 
          className="bg-white border-2 border-gray-200 rounded-lg p-8 min-h-48 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-4">
              {isFlipped ? 'Answer' : 'Question'} - Click to flip
            </div>
            <div className="text-lg text-gray-900">
              {isFlipped ? flashcards[currentFlashcard].back : flashcards[currentFlashcard].front}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {isFlipped ? 'Show Question' : 'Show Answer'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 pb-20 lg:pb-6">
      {/* Medical Disclaimer */}
      <MedicalDisclaimer variant="inline" />
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">EMT-B Study Notes</h1>
              <p className="text-gray-600 mt-1">{currentChapter.title}</p>
            </div>
          </div>
          
          {/* Chapter Selection */}
          <div className="flex items-center gap-4">
            <select
              value={activeChapter}
              onChange={(e) => setActiveChapter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="chapter1">Chapter 1: EMS System Fundamentals</option>
              <option value="chapter2">Chapter 2: Responder Safety & Resilience</option>
              <option value="chapter3">Chapter 3: EMS Law & Ethical Practice</option>
              <option value="chapter4">Chapter 4: Emergency Communication Protocols</option>
              <option value="chapter5">Chapter 5: Medical Terminology Foundations</option>
              <option value="chapter6">Chapter 6: Human Body Systems & Anatomy</option>
              <option value="chapter7">Chapter 7: Life Span Development & Age-Related Care</option>
              <option value="chapter8">Chapter 8: Patient Movement & Handling</option>
              <option value="chapter9">Chapter 9: Interprofessional EMS Teams</option>
              <option value="chapter10">Chapter 10: Comprehensive Patient Evaluation</option>
              <option value="chapter11">Chapter 11: Advanced Airway Interventions</option>
              <option value="chapter17">Chapter 17: Cardiovascular Emergency Management</option>
              <option value="chapter20">Chapter 20: Metabolic & Hematologic Emergencies</option>
              <option value="chapter21">Chapter 21: Allergic & Anaphylactic Response</option>
              <option value="chapter22">Chapter 22: Toxicological Emergencies</option>
              <option value="chapter23">Chapter 23: Behavioral Crisis Protocols</option>
              <option value="chapter31">Chapter 31: Abdominal & GU Trauma Essentials</option>
              <option value="chapter32">Chapter 32: Orthopedic Injury Management</option>
              <option value="chapter33">Chapter 33: Environmental Exposure Protocols</option>
              <option value="chapter34">Chapter 34: Obstetric & Neonatal Emergencies</option>
              <option value="chapter35">Chapter 35: Pediatric Emergency Response</option>
              <option value="chapter36">Chapter 36: Geriatric Emergency Care</option>
              <option value="bonus">BONUS: Human Body Systems - Chapter 1: Cellular Structure & Function 🧬</option>
              <option value="bodySystem2">BONUS: Human Body Systems - Chapter 2: Tissues & Organs 🩸</option>
              <option value="bodySystem3">BONUS: Human Body Systems - Chapter 3: Skeletal System 🦴</option>
              <option value="bodySystem4">BONUS: Human Body Systems - Chapter 4: Muscular System 💪</option>
              <option value="bodySystem5">BONUS: Human Body Systems - Chapter 5: Cardiovascular System ❤️</option>
              <option value="bodySystem6">BONUS: Human Body Systems - Chapter 6: Respiratory System 🫁</option>
              <option value="bodySystem7">BONUS: Human Body Systems - Chapter 7: Nervous System 🧠</option>
              <option value="bodySystem8">BONUS: Human Body Systems - Chapter 8: Endocrine System 🏥</option>
              <option value="bodySystem9">BONUS: Human Body Systems - Chapter 9: Digestive System 🍎</option>
              <option value="bodySystem10">BONUS: Human Body Systems - Chapter 10: Urinary System 💧</option>
              <option value="bonus2">BONUS 2: EMT Advanced Life Support Team Integration 🚑</option>
            </select>
          
            {/* Download Button */}
            <div className="relative" ref={downloadMenuRef}>
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-md"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              
              {/* Download Menu */}
              {showDownloadMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        downloadAsText();
                        setShowDownloadMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Text File (.txt)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative mb-4 md:mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search everything - chapters, protocols, medications, flashcards, clinical content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('study')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'study'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Study Material
          </button>
          <button
            onClick={() => setActiveTab('critical')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
              activeTab === 'critical'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Critical Concepts
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
              activeTab === 'flashcards'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Zap className="h-4 w-4 mr-2" />
            Flashcards
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 border touch-manipulation">
        {renderGlobalSearchResults()}
        
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'study' && renderStudyMaterial()}
        {activeTab === 'critical' && renderCriticalConcepts()}
        {activeTab === 'flashcards' && renderFlashcards()}
      </div>
    </div>
  );
};

export default EMTBStudyNotes;
