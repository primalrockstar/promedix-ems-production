// Balanced Practice Quiz Questions for EMT-B Modules
// 15 questions per chapter across 41 chapters = 615 total questions
// Replacing previous unbalanced system (modules 1-3: 30 questions, modules 4-14: 3-4 questions)

export interface QuizQuestion {
  id: string;
  module: number;
  chapter: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
  category: 'knowledge' | 'application' | 'analysis' | 'medication' | 'protocol' | 'scenario';
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  nremtDomain?: string;
  points: number;
}

export interface QuizModule {
  module: number;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit: number; // minutes
  passingScore: number; // percentage
}

// =============================================================================
// BALANCED QUIZ SYSTEM - 615 TOTAL QUESTIONS
// 15 questions per chapter across 41 chapters
// =============================================================================

// Chapter 1: EMS System Fundamentals - 15 Questions (Module 1)
export const chapter1Questions: QuizQuestion[] = [
  {
    id: "ch1-q001",
    module: 1,
    chapter: 1,
    question: "What is the primary purpose of the EMS system?",
    options: [
      "To transport patients to hospitals quickly",
      "To provide emergency medical care and transport when needed",
      "To replace hospital emergency departments",
      "To train medical professionals"
    ],
    correctAnswer: 1,
    explanation: "The EMS system's primary purpose is to provide emergency medical care and transport when needed, ensuring patients receive appropriate care from the scene through definitive treatment.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["EMS system", "purpose", "emergency care"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "ch1-q002",
    module: 1,
    chapter: 1,
    question: "Which level of EMS certification typically has the most extensive scope of practice?",
    options: [
      "Emergency Medical Responder (EMR)",
      "Emergency Medical Technician (EMT)",
      "Advanced Emergency Medical Technician (AEMT)",
      "Paramedic"
    ],
    correctAnswer: 3,
    explanation: "Paramedics have the most extensive scope of practice, including advanced airway management, medication administration, cardiac monitoring, and advanced procedures.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["certification levels", "scope of practice", "paramedic"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "ch1-q003",
    module: 1,
    chapter: 1,
    question: "What are the four levels of EMS certification in order from lowest to highest scope of practice?",
    options: [
      "EMR, EMT, Paramedic, AEMT",
      "EMT, EMR, AEMT, Paramedic",
      "EMR, EMT, AEMT, Paramedic",
      "EMT, AEMT, EMR, Paramedic"
    ],
    correctAnswer: 2,
    explanation: "The four levels in order are: Emergency Medical Responder (EMR), Emergency Medical Technician (EMT), Advanced Emergency Medical Technician (AEMT), and Paramedic.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["certification levels", "hierarchy", "scope of practice"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch1-q004",
    module: 1,
    chapter: 1,
    question: "What is the primary role of medical direction in EMS?",
    options: [
      "To control EMS vehicle dispatch",
      "To provide physician oversight and protocol guidance",
      "To handle billing and insurance claims",
      "To manage EMS personnel schedules"
    ],
    correctAnswer: 1,
    explanation: "Medical direction provides physician oversight, develops treatment protocols, and ensures medical quality assurance within the EMS system.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["medical direction", "physician oversight", "protocols"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch1-q005",
    module: 1,
    chapter: 1,
    question: "Which component is NOT typically part of the EMS system continuum of care?",
    options: [
      "Public access and recognition",
      "Emergency dispatch",
      "Hospital billing department",
      "Emergency department care"
    ],
    correctAnswer: 2,
    explanation: "The EMS continuum includes public access, dispatch, first response, EMS care, transport, emergency department care, and definitive care. Billing is administrative, not part of clinical care.",
    category: "application",
    difficulty: "medium",
    tags: ["continuum of care", "EMS components", "system integration"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch1-q006",
    module: 1,
    chapter: 1,
    question: "What is quality improvement (QI) in EMS?",
    options: [
      "A system to punish poor performance",
      "A process to continuously improve patient care and system performance",
      "A method to reduce EMS costs",
      "A requirement only for paramedic level providers"
    ],
    correctAnswer: 1,
    explanation: "Quality improvement is a systematic process to continuously enhance patient care quality, system efficiency, and clinical outcomes through data analysis and corrective actions.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["quality improvement", "patient care", "system performance"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch1-q007",
    module: 1,
    chapter: 1,
    question: "When did the modern EMS system begin to develop in the United States?",
    options: [
      "1950s",
      "1960s-1970s",
      "1980s",
      "1990s"
    ],
    correctAnswer: 1,
    explanation: "Modern EMS development began in the 1960s-1970s, driven by events like the Highway Safety Act of 1966 and the EMS Act of 1973, following recognition of trauma care needs.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["EMS history", "development", "legislation"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "ch1-q008",
    module: 1,
    chapter: 1,
    question: "What does the term 'scope of practice' refer to in EMS?",
    options: [
      "The geographic area an EMT can work",
      "The legal limits of what an EMT can do",
      "The number of hours an EMT can work",
      "The types of ambulances an EMT can drive"
    ],
    correctAnswer: 1,
    explanation: "Scope of practice defines the legal boundaries and specific skills, procedures, and medications that an EMT is authorized to perform based on their certification level.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["scope of practice", "legal limits", "authorization"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "ch1-q009",
    module: 1,
    chapter: 1,
    question: "A patient calls 911 for chest pain. What is the FIRST link in the chain of survival?",
    options: [
      "EMT assessment and treatment",
      "Public recognition and access to EMS",
      "Hospital emergency department care",
      "Paramedic advanced life support"
    ],
    correctAnswer: 1,
    explanation: "Public recognition of the emergency and access to EMS (calling 911) is the first critical link, as without activation, no other links in the chain can function.",
    category: "application",
    difficulty: "medium",
    tags: ["chain of survival", "public access", "emergency recognition"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch1-q010",
    module: 1,
    chapter: 1,
    question: "What is the primary difference between online and offline medical direction?",
    options: [
      "Online is computerized, offline is paper-based",
      "Online is real-time physician contact, offline is standing orders/protocols",
      "Online is for EMTs, offline is for paramedics",
      "Online costs more than offline direction"
    ],
    correctAnswer: 1,
    explanation: "Online medical direction involves real-time communication with a physician for specific patient care decisions. Offline direction consists of pre-written protocols and standing orders.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["medical direction", "online", "offline", "protocols"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch1-q011",
    module: 1,
    chapter: 1,
    question: "Which agency is primarily responsible for EMS oversight at the federal level?",
    options: [
      "Federal Emergency Management Agency (FEMA)",
      "National Highway Traffic Safety Administration (NHTSA)",
      "Centers for Disease Control (CDC)",
      "Department of Health and Human Services (HHS)"
    ],
    correctAnswer: 1,
    explanation: "NHTSA has primary federal responsibility for EMS oversight, developing standards, and providing guidance for state and local EMS systems.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["federal oversight", "NHTSA", "EMS standards"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch1-q012",
    module: 1,
    chapter: 1,
    question: "You arrive at a scene where another EMT is providing inappropriate care. What should you do?",
    options: [
      "Ignore it to avoid conflict",
      "Take over patient care immediately",
      "Address the issue professionally and report through proper channels",
      "Post about it on social media"
    ],
    correctAnswer: 2,
    explanation: "Professional responsibility requires addressing patient safety concerns appropriately while maintaining professionalism and following proper reporting procedures for quality improvement.",
    category: "analysis",
    difficulty: "hard",
    tags: ["professional responsibility", "quality improvement", "patient safety"],
    nremtDomain: "Preparatory",
    points: 3
  },
  {
    id: "ch1-q013",
    module: 1,
    chapter: 1,
    question: "What is the primary purpose of the National EMS Scope of Practice Model?",
    options: [
      "To replace state EMS regulations",
      "To provide guidance for consistent certification levels nationwide",
      "To eliminate the need for medical direction",
      "To standardize ambulance equipment requirements"
    ],
    correctAnswer: 1,
    explanation: "The National EMS Scope of Practice Model provides guidance to states for developing consistent certification levels and scope of practice standards across the country.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["scope of practice model", "national standards", "certification"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch1-q014",
    module: 1,
    chapter: 1,
    question: "During a cardiac arrest call, the EMT's role in the chain of survival includes:",
    options: [
      "Only providing CPR",
      "CPR, defibrillation, and basic life support",
      "Advanced airway management only",
      "Medication administration and surgery"
    ],
    correctAnswer: 1,
    explanation: "EMTs provide CPR, use AEDs for defibrillation, and deliver comprehensive basic life support care as part of the chain of survival for cardiac arrest patients.",
    category: "application",
    difficulty: "medium",
    tags: ["chain of survival", "cardiac arrest", "EMT role", "basic life support"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch1-q015",
    module: 1,
    chapter: 1,
    question: "A rural EMS system with limited resources must prioritize system improvements. Which would have the greatest impact on patient outcomes?",
    options: [
      "Purchasing newer ambulances",
      "Implementing quality improvement programs",
      "Increasing EMT salaries",
      "Adding more administrative staff"
    ],
    correctAnswer: 1,
    explanation: "Quality improvement programs have the greatest impact on patient outcomes by systematically identifying and addressing care deficiencies, improving protocols, and enhancing overall system performance.",
    category: "analysis",
    difficulty: "hard",
    tags: ["quality improvement", "system priorities", "patient outcomes", "rural EMS"],
    nremtDomain: "Preparatory",
    points: 3
  }
];

// Chapter 2: Responder Safety & Resilience - 15 Questions (Module 1)
export const chapter2Questions: QuizQuestion[] = [
  // Knowledge Questions (5 questions, 1 point each)
  {
    id: "ch2-q001",
    module: 1,
    chapter: 2,
    question: "What percentage of first responders have experienced traumatic events during their careers?",
    options: [
      "54%",
      "64%",
      "74%",
      "84%"
    ],
    correctAnswer: 3,
    explanation: "84% of first responders have experienced traumatic events during their careers, highlighting the significant occupational exposure to trauma in EMS work.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["statistics", "trauma exposure", "first responders"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "ch2-q002",
    module: 1,
    chapter: 2,
    question: "What is the difference between eustress and distress?",
    options: [
      "Eustress is harmful stress, distress is beneficial stress",
      "Eustress is beneficial stress, distress is harmful stress",
      "Eustress is acute stress, distress is chronic stress",
      "Eustress is physical stress, distress is emotional stress"
    ],
    correctAnswer: 1,
    explanation: "Eustress is beneficial stress that motivates and energizes (like preparing for an exam), while distress is harmful stress that can cause negative health effects.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["stress types", "eustress", "distress"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "ch2-q003",
    module: 1,
    chapter: 2,
    question: "What is the most effective single infection control measure?",
    options: [
      "Wearing gloves",
      "Hand washing",
      "Using antibiotics",
      "Wearing masks"
    ],
    correctAnswer: 1,
    explanation: "Hand washing is the single most effective infection control measure and should be performed frequently, especially before eating and after patient contact.",
    category: "knowledge",
    difficulty: "easy",
    tags: ["infection control", "hand washing", "prevention"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "ch2-q004",
    module: 1,
    chapter: 2,
    question: "Critical Incident Stress Management (CISM) includes which of the following components?",
    options: [
      "Defusing and debriefing sessions",
      "Medication administration",
      "Physical fitness programs",
      "Equipment maintenance"
    ],
    correctAnswer: 0,
    explanation: "CISM includes defusing (informal group discussions during/immediately after events) and debriefing (formal sessions 24-72 hours later with mental health professionals).",
    category: "knowledge",
    difficulty: "easy",
    tags: ["CISM", "stress management", "debriefing"],
    nremtDomain: "Preparatory",
    points: 1
  },
  {
    id: "ch2-q005",
    module: 1,
    chapter: 2,
    question: "What does General Adaptation Syndrome describe?",
    options: [
      "The body's ability to adapt to new equipment",
      "The body's physiological response to stress",
      "The process of adapting to different work schedules",
      "The ability to work with different partners"
    ],
    correctAnswer: 1,
    explanation: "General Adaptation Syndrome describes the body's physiological response to stress, including increased heart rate, blood pressure, and hormone release.",
    category: "knowledge",
    difficulty: "medium",
    tags: ["stress response", "physiology", "adaptation"],
    nremtDomain: "Preparatory",
    points: 1
  },

  // Application Questions (7 questions, 2 points each)
  {
    id: "ch2-q006",
    module: 1,
    chapter: 2,
    question: "You respond to a multi-vehicle accident with multiple casualties. What is your first priority upon arrival?",
    options: [
      "Begin treating the most critically injured patient",
      "Perform scene safety assessment and ensure personal safety",
      "Contact medical direction for guidance",
      "Begin triaging all patients immediately"
    ],
    correctAnswer: 1,
    explanation: "Scene safety is always the first priority. You cannot help anyone if you become a casualty yourself. Always ensure scene safety before patient care.",
    category: "application",
    difficulty: "medium",
    tags: ["scene safety", "priorities", "multiple casualties"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch2-q007",
    module: 1,
    chapter: 2,
    question: "After a particularly difficult pediatric cardiac arrest call that was unsuccessful, you notice your partner seems withdrawn and hasn't spoken much. What is the most appropriate action?",
    options: [
      "Tell them to get over it and move on",
      "Report them to your supervisor for unprofessional behavior",
      "Approach them with concern and offer to talk or seek resources",
      "Ignore the behavior as it will resolve on its own"
    ],
    correctAnswer: 2,
    explanation: "Recognizing signs of stress in colleagues and offering support is part of professional responsibility. Early intervention can prevent more serious mental health issues.",
    category: "application",
    difficulty: "medium",
    tags: ["peer support", "stress recognition", "mental health"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch2-q008",
    module: 1,
    chapter: 2,
    question: "When donning personal protective equipment (PPE), what is the correct order?",
    options: [
      "Gloves, gown, mask, eye protection",
      "Gown, mask, eye protection, gloves",
      "Mask, eye protection, gown, gloves",
      "Eye protection, mask, gown, gloves"
    ],
    correctAnswer: 1,
    explanation: "The correct order for donning PPE is: gown, mask, eye protection, then gloves. This sequence prevents contamination during the donning process.",
    category: "application",
    difficulty: "medium",
    tags: ["PPE", "infection control", "procedure"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch2-q009",
    module: 1,
    chapter: 2,
    question: "You are treating a patient who appears to have hepatitis. What is the most important consideration for your protection?",
    options: [
      "Avoiding all contact with the patient",
      "Following standard precautions as with all patients",
      "Requesting a different crew to handle the call",
      "Wearing only gloves for protection"
    ],
    correctAnswer: 1,
    explanation: "Standard precautions should be used with all patients regardless of known or suspected infections. This approach provides consistent protection and prevents discrimination.",
    category: "application",
    difficulty: "medium",
    tags: ["standard precautions", "infectious disease", "protection"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch2-q010",
    module: 1,
    chapter: 2,
    question: "During a long transport of a critical patient, you begin feeling overwhelmed and your hands start shaking. What is the best immediate response?",
    options: [
      "Continue working and ignore the symptoms",
      "Take slow, deep breaths and focus on your training",
      "Ask your partner to take over all patient care",
      "Request immediate backup from another unit"
    ],
    correctAnswer: 1,
    explanation: "Acute stress reactions are normal. Deep breathing and focusing on training helps manage immediate stress while maintaining patient care capability.",
    category: "application",
    difficulty: "medium",
    tags: ["stress management", "acute stress", "coping techniques"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch2-q011",
    module: 1,
    chapter: 2,
    question: "A colleague mentions they've been having trouble sleeping and have lost interest in activities they used to enjoy since starting EMS work. This could indicate:",
    options: [
      "Normal adjustment to shift work",
      "Signs of burnout or depression that warrant attention",
      "Lack of physical fitness",
      "Need for additional training"
    ],
    correctAnswer: 1,
    explanation: "Sleep problems and loss of interest in activities are warning signs of burnout, depression, or other mental health issues that require attention and possibly professional help.",
    category: "application",
    difficulty: "medium",
    tags: ["burnout", "depression", "warning signs"],
    nremtDomain: "Preparatory",
    points: 2
  },
  {
    id: "ch2-q012",
    module: 1,
    chapter: 2,
    question: "When responding to a scene with potential violence, what is the most appropriate action?",
    options: [
      "Enter immediately to provide medical care",
      "Wait for law enforcement to secure the scene before entering",
      "Call medical direction for permission to enter",
      "Send only one crew member to assess the situation"
    ],
    correctAnswer: 1,
    explanation: "Scene safety requires waiting for law enforcement to secure potentially violent scenes. EMS providers should never enter unsafe scenes as they can become additional casualties.",
    category: "application",
    difficulty: "medium",
    tags: ["scene safety", "violence", "law enforcement"],
    nremtDomain: "Preparatory",
    points: 2
  },

  // Analysis Questions (3 questions, 3 points each)
  {
    id: "ch2-q013",
    module: 1,
    chapter: 2,
    question: "An EMT has been working for two years and recently began calling in sick frequently, showing decreased empathy for patients, and making more documentation errors. These signs most likely indicate:",
    options: [
      "Normal career progression requiring additional training",
      "Physical illness requiring medical evaluation",
      "Burnout syndrome requiring intervention and support",
      "Incompetence requiring disciplinary action"
    ],
    correctAnswer: 2,
    explanation: "The combination of absenteeism, decreased empathy, and performance issues are classic signs of burnout syndrome, which is an occupational hazard in EMS requiring supportive intervention, not punishment.",
    category: "analysis",
    difficulty: "hard",
    tags: ["burnout", "syndrome recognition", "intervention"],
    nremtDomain: "Preparatory",
    points: 3
  },
  {
    id: "ch2-q014",
    module: 1,
    chapter: 2,
    question: "A new EMT asks why they need to practice stress management when they 'feel fine' and 'can handle anything.' How should you respond to help them understand the importance of proactive wellness?",
    options: [
      "Agree that young, healthy people don't need stress management",
      "Explain that stress management is a professional skill that prevents problems before they occur",
      "Tell them they'll understand after their first traumatic call",
      "Suggest they are not tough enough for EMS work"
    ],
    correctAnswer: 1,
    explanation: "Stress management is a professional skill like CPR - it's learned and practiced before it's needed. Proactive wellness prevents problems and is more effective than reactive treatment.",
    category: "analysis",
    difficulty: "hard",
    tags: ["proactive wellness", "professional development", "prevention"],
    nremtDomain: "Preparatory",
    points: 3
  },
  {
    id: "ch2-q015",
    module: 1,
    chapter: 2,
    question: "Considering the high rates of PTSD and suicide among EMS workers compared to the general population, what systemic changes would most effectively address these issues?",
    options: [
      "Requiring all EMTs to have medical degrees",
      "Implementing comprehensive wellness programs, peer support, and reducing stigma around mental health",
      "Limiting EMTs to shorter career spans",
      "Providing higher pay to compensate for stress"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive approaches including wellness programs, peer support, mental health resources, and reducing stigma address the root causes of EMS mental health issues more effectively than individual solutions.",
    category: "analysis",
    difficulty: "hard",
    tags: ["systemic solutions", "mental health", "program development"],
    nremtDomain: "Preparatory",
    points: 3
  }
];

// Balanced Quiz System Configuration
export const balancedQuizConfig = {
  totalQuestions: 615,
  questionsPerChapter: 15,
  totalChapters: 41,
  totalModules: 14,
  
  // Progress tracking
  currentImplementation: {
    chaptersCompleted: 2,
    questionsCompleted: 30,
    chaptersRemaining: 39,
    questionsRemaining: 585
  },
  
  // Module structure
  moduleStructure: [
    { module: 1, title: "Foundations of EMS Practice", chapters: [1, 2, 3, 4], questionsTotal: 60 },
    { module: 2, title: "Clinical Foundations", chapters: [5, 6, 7, 8, 9], questionsTotal: 75 },
    { module: 3, title: "Patient Assessment Mastery", chapters: [10], questionsTotal: 15 },
    { module: 4, title: "Airway & Ventilatory Management", chapters: [11], questionsTotal: 15 },
    { module: 5, title: "Pharmacological Principles", chapters: [12], questionsTotal: 15 },
    { module: 6, title: "Shock & Circulatory Emergencies", chapters: [13, 14], questionsTotal: 30 },
    { module: 7, title: "Medical Emergency Response", chapters: [15, 16, 17], questionsTotal: 45 },
    { module: 8, title: "Neurological & Systemic Emergencies", chapters: [18, 19, 20], questionsTotal: 45 },
    { module: 9, title: "Specialized Emergency Care", chapters: [21, 22, 23, 24], questionsTotal: 60 },
    { module: 10, title: "Trauma Response Principles", chapters: [25, 26, 27], questionsTotal: 45 },
    { module: 11, title: "Traumatic Injury Management", chapters: [28, 29, 30], questionsTotal: 45 },
    { module: 12, title: "Environmental & Musculoskeletal Emergencies", chapters: [31, 32, 33], questionsTotal: 45 },
    { module: 13, title: "Special Patient Populations", chapters: [34, 35, 36, 37], questionsTotal: 60 },
    { module: 14, title: "EMS Operations & Disaster Response", chapters: [38, 39, 40, 41], questionsTotal: 60 }
  ]
};

// Legacy module structure for compatibility (will be replaced)
export const quizModules: QuizModule[] = [
  {
    module: 1,
    title: "Foundations of EMS Practice",
    description: "EMS Systems, Safety, Legal and Ethical Issues, Communications and Documentation",
    questions: [...chapter1Questions, ...chapter2Questions], // Now includes both chapters (30 questions)
    timeLimit: 90, // Adjusted for 30 questions
    passingScore: 80
  }
  // Additional modules will be added as chapters are completed
];

export default {
  chapter1Questions,
  chapter2Questions,
  balancedQuizConfig,
  quizModules
};
