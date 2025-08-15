import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, BookOpen, AlertCircle, Heart, Shield, Stethoscope, ChevronDown, ChevronUp, Download, FileText, Activity, Zap } from 'lucide-react';
import MedicalDisclaimer from '../MedicalDisclaimer';

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
  scope?: 'EMT-B' | 'AEMT' | 'Paramedic';
  learningObjectives: string[];
  keyTerms: string[];
  protocols?: string[];
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

  // Chapter 2: Workforce Safety and Wellness Data
  const chapter2StudyNotes: ChapterData = {
    title: "Chapter 2: Workforce Safety and Wellness",
    description: "Evidence-based workforce safety protocols and wellness strategies for emergency medical professionals",
    module: "2",
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
        content: [
          "Not all stress is bad; **Eustress** causes positive responses",
          "An example is increased focus and job satisfaction from doing well in a tough situation",
          "**Distress** causes negative responses, like feeling overwhelmed or anxious",
          "Stress can be short-term or long-term",
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

  // Chapter 10: Patient Assessment Data
  const chapter10StudyNotes: ChapterData = {
    title: "Chapter 10: Patient Assessment",
    description: "Comprehensive patient assessment skills and systematic evaluation techniques for emergency medical technicians",
    module: "3",
    scope: "EMT-B",
    protocols: [
      "Primary Assessment Protocol",
      "Secondary Assessment Protocol", 
      "Vital Signs Measurement",
      "SAMPLE History",
      "OPQRST Pain Assessment"
    ],
    learningObjectives: [
      "Perform systematic primary and secondary assessments",
      "Obtain accurate vital signs and interpret findings",
      "Conduct appropriate patient history using SAMPLE format",
      "Apply OPQRST method for pain assessment",
      "Recognize life-threatening conditions requiring immediate intervention",
      "Document assessment findings accurately and completely"
    ],
    keyTerms: [
      "Primary Assessment",
      "Secondary Assessment",
      "Scene Size-up",
      "AVPU Scale",
      "SAMPLE History",
      "OPQRST",
      "Vital Signs",
      "Chief Complaint"
    ],
          "The **perception of the act** matters more than the intent",
          "Substance abuse (alcohol, drugs) by EMS personnel increases accidents, tension, and leads to bad treatment decisions",
          "Report impaired co-workers immediately, as covering for them can cause serious harm",
          "Employee assistance programs offer support for mental health and substance abuse issues"
        ]
      },
      {
        title: "27. Injury and Illness Prevention Programs",
        content: [
          "Work-related injuries and Exposures are common for EMTs, with sprains, strains, and fluid Exposures happening most often",
          "Simple actions like safe lifting, using PPE, and wearing slip-resistant shoes can lower injury rates",
          "Many organizations have **injury and illness prevention programs** to find and control workplace hazards",
          "These programs involve identifying hazards, preventing them, providing training, and reviewing results"
        ]
      }
    ],
    criticalConcepts: [
      "EMTs must take care of their physical, mental, and emotional health to properly care for patients",
      "Physical conditioning and proper nutrition are key things EMTs can control",
      "Back injuries are frequent in EMS work - use proper lifting techniques",
      "Avoiding tobacco and vaping is crucial due to severe health risks",
      "Seek help from peer support groups, critical incident stress management teams, or employee assistance programs if work stress is overwhelming",
      "Standard precautions mean assuming every person might be infected - always use infection control procedures",
      "Proper hand washing is the simplest and most effective way to prevent disease spread",
      "EMTs have a much higher risk of suicide than the general population",
      "Prioritize professional judgment over compassion in critical situations",
      "Handle deceased bodies with respect and dignity, following local rules",
      "Cultural humility involves being curious, thinking about your own biases, and adapting your behavior"
    ],
    flashcards: [
      { front: "What is the difference between eustress and distress?", back: "Eustress causes positive responses like increased focus and job satisfaction. Distress causes negative responses like feeling overwhelmed or anxious." },
      { front: "What does wellness mean for EMTs?", back: "Actively working towards good health in physical, mental, and emotional areas" },
      { front: "How many hours of sleep do adults need each night?", back: "7 to 9 hours of sleep each night" },
      { front: "What are the key components of resilience building?", back: "Healthy diet, 7-9 hours sleep, strong relationships, daily exercise, mindfulness practice" },
      { front: "What should EMTs limit in their diet?", back: "Sugar, fats, sodium, and alcohol intake" },
      { front: "What are good sources of long-term energy for EMTs?", back: "Complex carbohydrates like pasta and rice" },
      { front: "What are the key principles of safe lifting?", back: "Pre-plan the move, bend legs not waist, keep weight close to body, lift straight up using legs" },
      { front: "What is the most effective way to prevent disease spread?", back: "Proper hand washing before and after patient contact" },
      { front: "What does PPE stand for and when should it be used?", back: "Personal Protective Equipment - gear worn to prevent exposure, should be used whenever contact with blood, fluids, or airborne particles is possible" },
      { front: "What are standard precautions?", back: "CDC guidelines that mean assuming every person might be infected and always using infection control procedures" },
      { front: "What is PTSD and how does it relate to EMT work?", back: "Post-Traumatic Stress Disorder - can result from critical incident stress and traumatic events common in EMS work" },
      { front: "What is burnout in EMS?", back: "Exhaustion, cynicism, and poor performance from long-term job stress" },
      { front: "What is compassion fatigue?", back: "Secondary stress disorder causing gradual loss of compassion from caring for trauma victims" },
      { front: "What are the five stages of grief identified by Dr. Kubler-Ross?", back: "Denial, Anger, Bargaining, Depression, Acceptance (can occur in any order)" },
      { front: "What is cultural humility?", back: "Being curious about others, thinking about your own biases, and adapting your behavior appropriately" }
    ]
  };

  // Chapter 10: Comprehensive Patient Assessment (Module 3)
  const chapter10StudyNotes: ChapterData = {
    title: "Chapter 10: Comprehensive Patient Assessment",
    description: "Systematic approach to patient evaluation, history taking, physical examination, and documentation for EMT-B level care.",
    module: "3",
    learningObjectives: [
      "Perform systematic scene size-up and ensure scene safety",
      "Conduct primary assessment to identify life-threatening conditions",
      "Obtain complete patient history using SAMPLE methodology",
      "Perform focused physical examination based on patient complaint",
      "Document assessment findings accurately and completely",
      "Reassess patients and monitor changes in condition",
      "Communicate assessment findings to receiving medical facility",
      "Apply appropriate assessment techniques for different age groups",
      "Recognize signs and symptoms requiring immediate intervention",
      "Integrate assessment findings to formulate treatment plan"
    ],
    keyTerms: [
      "Scene Size-up",
      "Primary Assessment",
      "Secondary Assessment",
      "SAMPLE History",
      "OPQRST Pain Assessment",
      "Vital Signs",
      "Chief Complaint",
      "History of Present Illness",
      "Physical Examination",
      "Reassessment",
      "Documentation",
      "Trending",
      "Baseline Vitals",
      "Focused Assessment",
      "Rapid Assessment",
      "Detailed Assessment"
    ],
    sections: [
      {
        title: "1. Scene Size-up and Safety Assessment",
        content: [
          "Scene size-up is the first step in every patient encounter",
          "Assess scene safety for patients, bystanders, and EMS personnel",
          "Identify mechanism of injury or nature of illness",
          "Determine number of patients and need for additional resources",
          "Consider personal protective equipment requirements",
          "Look for hazards including traffic, fire, hazmat, violence, or unstable surfaces",
          "**Never enter an unsafe scene - call for appropriate resources first**"
        ]
      },
      {
        title: "2. Primary Assessment (ABCDE Approach)",
        content: [
          "**A - Airway**: Assess airway patency and intervene if compromised",
          "**B - Breathing**: Evaluate respiratory rate, depth, and quality",
          "**C - Circulation**: Check pulse rate, strength, and skin perfusion",
          "**D - Disability**: Brief neurological assessment (AVPU scale)",
          "**E - Exposure/Environment**: Expose injuries while maintaining temperature",
          "Identify and treat life-threatening conditions immediately",
          "Form general impression of patient's condition and priority for transport"
        ]
      },
      {
        title: "3. Patient History Taking (SAMPLE)",
        content: [
          "**S - Signs and Symptoms**: What the patient reports and what you observe",
          "**A - Allergies**: Medications, foods, environmental allergens",
          "**M - Medications**: Current prescriptions, over-the-counter, recreational drugs",
          "**P - Past Medical History**: Previous surgeries, chronic conditions, hospitalizations",
          "**L - Last Oral Intake**: Food and fluid intake, time of last meal",
          "**E - Events**: What led up to the current episode or injury",
          "Use open-ended questions to gather comprehensive information",
          "Document all findings accurately and completely"
        ]
      },
      {
        title: "4. Pain Assessment (OPQRST)",
        content: [
          "**O - Onset**: When did the pain start? Sudden or gradual?",
          "**P - Provocation/Palliation**: What makes it better or worse?",
          "**Q - Quality**: Sharp, dull, burning, crushing, stabbing?",
          "**R - Radiation**: Does the pain spread to other areas?",
          "**S - Severity**: Rate pain on scale of 1-10",
          "**T - Time**: How long has the pain been present?",
          "Always assess pain in context of patient's overall condition",
          "Consider cultural and age-related factors in pain assessment"
        ]
      },
      {
        title: "5. Vital Signs Assessment",
        content: [
          "**Pulse**: Rate (60-100 adult), rhythm, strength, location",
          "**Respirations**: Rate (12-20 adult), depth, rhythm, effort",
          "**Blood Pressure**: Systolic/diastolic pressures, both arms if indicated",
          "**Temperature**: Core body temperature, method of measurement",
          "**Skin**: Color, temperature, moisture, condition",
          "**Pulse Oximetry**: Oxygen saturation percentage",
          "Compare vital signs to age-appropriate normal ranges",
          "Document time of assessment and reassess frequently"
        ]
      },
      {
        title: "6. Physical Examination Techniques",
        content: [
          "**Inspection**: Visual examination for obvious abnormalities",
          "**Palpation**: Feeling for tenderness, masses, or deformities",
          "**Auscultation**: Listening to breath sounds and bowel sounds",
          "**Percussion**: Tapping to assess underlying structures (advanced)",
          "Use systematic head-to-toe approach for comprehensive exam",
          "Focus examination based on chief complaint and mechanism",
          "Maintain patient dignity and explain procedures"
        ]
      }
    ],
    criticalConcepts: [
      "Scene safety is always the first priority - never enter unsafe scenes",
      "Primary assessment identifies and treats life-threatening conditions first",
      "SAMPLE history provides essential information for patient care decisions",
      "OPQRST methodology ensures comprehensive pain assessment",
      "Vital signs must be compared to age-appropriate normal ranges",
      "Documentation must be accurate, complete, and legible",
      "Reassessment is critical to identify changes in patient condition"
    ],
    flashcards: [
      { front: "What does SAMPLE stand for in patient history taking?", back: "Signs/Symptoms, Allergies, Medications, Past medical history, Last oral intake, Events leading to illness" },
      { front: "What is the correct order of primary assessment?", back: "ABCDE - Airway, Breathing, Circulation, Disability, Exposure/Environment" },
      { front: "What does OPQRST stand for in pain assessment?", back: "Onset, Provocation/Palliation, Quality, Radiation, Severity, Time" },
      { front: "What is the normal adult respiratory rate?", back: "12-20 breaths per minute" },
      { front: "What is the normal adult pulse rate?", back: "60-100 beats per minute" },
      { front: "What are the four levels of consciousness in AVPU?", back: "Alert, Verbal response, Painful response, Unresponsive" },
      { front: "When should you perform a rapid assessment vs focused assessment?", back: "Rapid assessment for significant trauma or altered mental status; focused assessment for isolated complaints" },
      { front: "What are the key components of scene size-up?", back: "Scene safety, mechanism of injury/nature of illness, number of patients, need for additional resources" },
      { front: "How often should vital signs be reassessed in stable patients?", back: "Every 15 minutes for stable patients, every 5 minutes for unstable patients" },
      { front: "What information is critical to obtain about allergies?", back: "Specific allergen, type of reaction, severity of previous reactions, current medications for allergies" },
      { front: "What are red flags during primary assessment that require immediate intervention?", back: "Airway obstruction, absent or inadequate breathing, absent pulse, uncontrolled bleeding, altered mental status" },
      { front: "How do you assess circulation in the primary assessment?", back: "Check pulse rate, rhythm, strength; assess skin color, temperature, moisture; look for obvious bleeding" },
      { front: "What factors affect pain assessment in different populations?", back: "Age, cultural background, previous pain experiences, medications, cognitive ability" },
      { front: "When is detailed physical examination indicated?", back: "During transport when time permits, for patients with unclear complaints, when primary and secondary assessments are inconclusive" },
      { front: "What documentation is required for patient refusal of care?", back: "Mental competency assessment, explanation of risks, witnessed signature, contact information, recommendation to seek medical care" }
    ]
  };

  // Chapter 11: Airway Management Techniques (Module 4)
  const chapter11StudyNotes: ChapterData = {
    title: "Chapter 11: Airway Management Techniques",
    description: "Essential airway management skills including assessment, positioning, adjuncts, and ventilation techniques for EMT-B level care.",
    module: "4",
    learningObjectives: [
      "Assess airway patency and identify obstructions",
      "Perform manual airway positioning techniques",
      "Select and insert appropriate airway adjuncts",
      "Provide effective bag-valve-mask ventilation",
      "Recognize and manage airway emergencies",
      "Apply oxygen therapy using various delivery devices",
      "Perform basic airway suctioning techniques",
      "Manage foreign body airway obstructions",
      "Understand anatomical differences across age groups",
      "Integrate airway management with other patient care"
    ],
    keyTerms: [
      "Airway Patency",
      "Head-Tilt Chin-Lift",
      "Jaw-Thrust Maneuver",
      "Oropharyngeal Airway (OPA)",
      "Nasopharyngeal Airway (NPA)",
      "Bag-Valve-Mask (BVM)",
      "Oxygen Saturation",
      "Suction",
      "Cricoid Pressure",
      "Sellick Maneuver",
      "Recovery Position",
      "Gag Reflex",
      "Hypoxia",
      "Hypoxemia",
      "Ventilation",
      "Aspiration"
    ],
    sections: [
      {
        title: "1. Airway Anatomy and Physiology",
        content: [
          "Upper airway includes nose, mouth, pharynx, and larynx",
          "Lower airway includes trachea, bronchi, and alveoli",
          "**Tongue is the most common cause of airway obstruction in unconscious patients**",
          "Epiglottis prevents aspiration during swallowing",
          "Pediatric airways are smaller and more anterior than adult airways",
          "Recognition of anatomical landmarks is essential for proper technique"
        ]
      },
      {
        title: "2. Airway Assessment",
        content: [
          "Look for visible obstructions in mouth and throat",
          "Listen for abnormal breath sounds (stridor, gurgling, snoring)",
          "Feel for air movement at nose and mouth",
          "Assess level of consciousness - unconscious patients at high risk",
          "**Signs of airway obstruction**: Use of accessory muscles, tripod positioning, inability to speak",
          "Evaluate for trauma that may compromise airway",
          "Consider c-spine precautions if trauma suspected"
        ]
      },
      {
        title: "3. Manual Airway Positioning",
        content: [
          "**Head-Tilt Chin-Lift**: Primary technique for opening airways in non-trauma patients",
          "Place hand on forehead, lift chin with fingers (not thumb)",
          "**Jaw-Thrust Maneuver**: Use when spinal injury suspected",
          "Grasp angles of jaw and lift forward without extending neck",
          "**Recovery Position**: For unconscious patients without spinal injury",
          "Position maintains open airway and allows drainage of fluids"
        ]
      },
      {
        title: "4. Airway Adjuncts",
        content: [
          "**Oropharyngeal Airway (OPA)**: For unconscious patients without gag reflex",
          "Size from corner of mouth to angle of jaw",
          "Insert upside down, then rotate 180 degrees",
          "**Nasopharyngeal Airway (NPA)**: For conscious or semi-conscious patients",
          "Size from nostril to earlobe, use largest that fits",
          "Lubricate and insert with bevel toward septum",
          "**Contraindications**: Facial fractures for NPA, conscious patients for OPA"
        ]
      },
      {
        title: "5. Bag-Valve-Mask Ventilation",
        content: [
          "Two-person technique preferred for effective seal and ventilation",
          "One rescuer maintains mask seal, other squeezes bag",
          "**Proper mask seal**: C-E technique with thumbs and index fingers forming 'C'",
          "Ventilate at 10-12 breaths per minute for adults",
          "Watch for chest rise and fall with each ventilation",
          "Avoid hyperventilation - can cause gastric distention and hypotension"
        ]
      },
      {
        title: "6. Oxygen Therapy",
        content: [
          "**Nasal Cannula**: 1-6 L/min, delivers 24-44% oxygen concentration",
          "**Simple Face Mask**: 6-10 L/min, delivers 40-60% oxygen",
          "**Non-Rebreather Mask**: 10-15 L/min, delivers 80-95% oxygen",
          "**BVM with Reservoir**: 15 L/min, delivers nearly 100% oxygen",
          "Select device based on patient's respiratory status and needs",
          "Monitor pulse oximetry and adjust flow rates as needed"
        ]
      },
      {
        title: "7. Suctioning Techniques",
        content: [
          "Remove visible secretions, blood, or vomitus from airway",
          "**Rigid catheter (Yankauer)**: For large debris and thick secretions",
          "**Flexible catheter**: For deeper suctioning through nose or airway adjunct",
          "Limit suctioning to 15 seconds in adults, 10 seconds in children",
          "Pre-oxygenate patient before suctioning if possible",
          "Use appropriate personal protective equipment during procedure"
        ]
      }
    ],
    criticalConcepts: [
      "Tongue is the most common cause of airway obstruction in unconscious patients",
      "Head-tilt chin-lift for non-trauma patients, jaw-thrust for suspected spinal injury",
      "Two-person BVM technique provides most effective ventilation",
      "OPA only for unconscious patients without gag reflex",
      "NPA can be used in conscious patients and those with intact gag reflex",
      "Limit suctioning time to prevent hypoxia",
      "Always pre-oxygenate before any airway procedure when possible"
    ],
    flashcards: [
      { front: "What is the most common cause of airway obstruction in unconscious patients?", back: "The tongue" },
      { front: "When do you use head-tilt chin-lift vs jaw-thrust maneuver?", back: "Head-tilt chin-lift for non-trauma patients; jaw-thrust when spinal injury is suspected" },
      { front: "What does OPA stand for and when is it used?", back: "Oropharyngeal Airway - used only in unconscious patients without gag reflex" },
      { front: "What does NPA stand for and when is it used?", back: "Nasopharyngeal Airway - used in conscious or semi-conscious patients" },
      { front: "What is the correct ventilation rate for adults using BVM?", back: "10-12 breaths per minute" },
      { front: "How do you size an OPA?", back: "Measure from corner of mouth to angle of jaw (earlobe)" },
      { front: "How do you size an NPA?", back: "Measure from nostril to earlobe, select largest that fits comfortably" },
      { front: "What oxygen concentration does a non-rebreather mask deliver?", back: "80-95% oxygen concentration at 10-15 L/min flow rate" },
      { front: "What is the maximum suctioning time for adults and children?", back: "15 seconds for adults, 10 seconds for children" },
      { front: "Describe the C-E technique for BVM mask seal.", back: "Thumbs and index fingers form 'C' around mask, remaining fingers form 'E' lifting jaw into mask" },
      { front: "What are contraindications for NPA use?", back: "Suspected nasal fractures, basilar skull fracture with CSF leak, severe facial trauma" },
      { front: "Why is two-person BVM technique preferred?", back: "One person maintains proper mask seal while other provides consistent ventilation volumes" },
      { front: "What complications can result from hyperventilation?", back: "Gastric distention, decreased venous return, hypotension, pneumothorax risk" },
      { front: "How do pediatric airways differ from adult airways?", back: "Smaller, more anterior, larger tongue relative to mouth, higher larynx position" },
      { front: "What signs indicate effective BVM ventilation?", back: "Visible chest rise and fall, improving color/pulse oximetry, bilateral breath sounds, gastric distention absence" }
    ]
  };

  // Chapter 17: Cardiovascular Emergency Response (Module 7)
  const chapter17StudyNotes: ChapterData = {
    title: "Chapter 17: Cardiovascular Emergency Response",
    description: "Recognition, assessment, and emergency treatment of cardiovascular emergencies including acute coronary syndromes, heart failure, and arrhythmias.",
    module: "7",
    learningObjectives: [
      "Recognize signs and symptoms of acute coronary syndromes",
      "Differentiate between angina and myocardial infarction",
      "Assess patients with chest pain using systematic approach",
      "Administer appropriate medications for cardiac emergencies",
      "Recognize and manage cardiac arrest situations",
      "Understand basic cardiac rhythm interpretation",
      "Identify signs of congestive heart failure",
      "Provide appropriate emergency care for cardiac patients",
      "Recognize complications of cardiovascular emergencies",
      "Communicate effectively with advanced life support teams"
    ],
    keyTerms: [
      "Acute Coronary Syndrome (ACS)",
      "Myocardial Infarction (MI)",
      "Angina Pectoris",
      "Atherosclerosis",
      "Coronary Artery Disease",
      "Congestive Heart Failure (CHF)",
      "Cardiac Arrest",
      "Arrhythmia",
      "Tachycardia",
      "Bradycardia",
      "Hypertension",
      "Hypotension",
      "Cardiac Output",
      "Perfusion",
      "Nitroglycerin",
      "Aspirin"
    ],
    sections: [
      {
        title: "1. Cardiovascular System Review",
        content: [
          "Heart has four chambers: right and left atria, right and left ventricles",
          "Coronary arteries supply blood to heart muscle (myocardium)",
          "**Left main, LAD, circumflex, and right coronary arteries** are major vessels",
          "Heart electrical system controls rhythm and rate",
          "Cardiac output = Heart Rate × Stroke Volume",
          "Normal adult heart rate: 60-100 beats per minute"
        ]
      },
      {
        title: "2. Acute Coronary Syndromes (ACS)",
        content: [
          "**Unstable Angina**: Chest pain at rest, new onset, or worsening pattern",
          "**STEMI**: ST-elevation myocardial infarction with complete vessel occlusion",
          "**NSTEMI**: Non-ST elevation MI with partial vessel occlusion",
          "All ACS results from reduced blood flow to heart muscle",
          "**Classic symptoms**: Chest pain, shortness of breath, diaphoresis, nausea",
          "**Atypical presentations**: More common in women, elderly, diabetics",
          "Time is muscle - rapid recognition and transport essential"
        ]
      },
      {
        title: "3. Chest Pain Assessment",
        content: [
          "Use OPQRST to characterize chest pain thoroughly",
          "**Quality**: Crushing, pressure, squeezing, burning, stabbing",
          "**Location**: Substernal, left chest, radiating to arm/jaw/back",
          "**Duration**: Angina <20 minutes, MI often >30 minutes",
          "**Associated symptoms**: SOB, diaphoresis, nausea, weakness",
          "**Risk factors**: Age, gender, smoking, diabetes, hypertension, family history",
          "Consider non-cardiac causes: PE, pneumothorax, aortic dissection"
        ]
      },
      {
        title: "4. Emergency Medications",
        content: [
          "**Aspirin**: 324mg chewed, antiplatelet effect reduces clot formation",
          "Contraindications: Allergy, active bleeding, children with viral illness",
          "**Nitroglycerin**: Sublingual spray/tablet, dilates coronary arteries",
          "Contraindications: Hypotension, head injury, erectile dysfunction medications",
          "**Oxygen**: Only if SpO2 <94% or signs of respiratory distress",
          "Always consult medical control before administering medications"
        ]
      },
      {
        title: "5. Congestive Heart Failure",
        content: [
          "Heart unable to pump effectively, causing fluid backup",
          "**Left heart failure**: Pulmonary edema, shortness of breath, orthopnea",
          "**Right heart failure**: Peripheral edema, jugular vein distention",
          "**Signs**: Rales, peripheral edema, weight gain, fatigue",
          "**Treatment**: High-flow oxygen, upright positioning, rapid transport",
          "May require CPAP or advanced airway management"
        ]
      },
      {
        title: "6. Cardiac Arrest Management",
        content: [
          "Immediate CPR with high-quality compressions is critical",
          "**Compression rate**: 100-120 per minute, depth 2-2.4 inches",
          "**Compression-ventilation ratio**: 30:2 for adult single rescuer",
          "Minimize interruptions to chest compressions",
          "AED use as soon as available for shockable rhythms",
          "Continue resuscitation until advanced life support arrives"
        ]
      },
      {
        title: "7. Hypertensive Emergencies",
        content: [
          "**Hypertensive urgency**: Elevated BP without organ damage",
          "**Hypertensive emergency**: Elevated BP with organ damage",
          "**Signs of emergency**: Altered mental status, chest pain, shortness of breath",
          "Do not attempt to rapidly lower blood pressure in field",
          "Focus on treating complications (stroke, MI, pulmonary edema)",
          "Rapid transport to appropriate facility"
        ]
      }
    ],
    criticalConcepts: [
      "Time is muscle in ACS - rapid recognition and transport saves heart tissue",
      "Aspirin should be given to all suspected ACS patients unless contraindicated",
      "Nitroglycerin can cause dangerous hypotension - check BP before and after",
      "Not all cardiac events present with classic chest pain symptoms",
      "High-quality CPR with minimal interruptions is key to cardiac arrest survival",
      "CHF patients benefit from upright positioning and high-flow oxygen",
      "Never try to rapidly lower blood pressure in hypertensive emergencies"
    ],
    flashcards: [
      { front: "What are the three types of acute coronary syndromes?", back: "Unstable angina, STEMI (ST-elevation MI), and NSTEMI (Non-ST elevation MI)" },
      { front: "What is the standard dose of aspirin for suspected ACS?", back: "324mg chewed (usually four 81mg tablets)" },
      { front: "What are the classic signs and symptoms of myocardial infarction?", back: "Chest pain/pressure, shortness of breath, diaphoresis, nausea, radiation to arm/jaw" },
      { front: "What is the normal adult heart rate range?", back: "60-100 beats per minute" },
      { front: "What does the phrase 'time is muscle' mean in cardiac emergencies?", back: "The longer the delay in treatment, the more heart muscle dies from lack of oxygen" },
      { front: "What are contraindications for aspirin administration?", back: "Allergy to aspirin, active bleeding, children with viral illness (Reye's syndrome risk)" },
      { front: "What are contraindications for nitroglycerin?", back: "Hypotension (SBP <100), recent erectile dysfunction medication use, head injury" },
      { front: "What positioning is best for CHF patients?", back: "Upright or high Fowler's position to reduce venous return and improve breathing" },
      { front: "What is the difference between left and right heart failure presentations?", back: "Left: pulmonary edema, SOB; Right: peripheral edema, JVD, hepatic congestion" },
      { front: "What are high-quality CPR parameters for adults?", back: "Rate 100-120/min, depth 2-2.4 inches, complete recoil, minimal interruptions" },
      { front: "Why are atypical presentations more common in certain populations?", back: "Women, elderly, and diabetics may have altered pain sensation or present with fatigue, SOB, nausea instead of chest pain" },
      { front: "What is the pathophysiology behind acute coronary syndromes?", back: "Atherosclerotic plaque rupture causes thrombosis and reduced coronary blood flow, leading to myocardial ischemia" },
      { front: "How do you differentiate hypertensive urgency from emergency?", back: "Emergency involves end-organ damage (altered mental status, chest pain, SOB), urgency is elevated BP alone" },
      { front: "What complications can occur from CHF?", back: "Pulmonary edema, cardiogenic shock, arrhythmias, renal failure, respiratory failure" },
      { front: "Why shouldn't you rapidly lower BP in hypertensive emergencies?", back: "Rapid BP reduction can cause cerebral, coronary, or renal hypoperfusion and worsen organ damage" }
    ]
  };

  // Chapter selection and data management
  const chapters = {
    chapter2: chapter2StudyNotes,
    chapter10: chapter10StudyNotes,
    chapter11: chapter11StudyNotes,
    chapter17: chapter17StudyNotes
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
    let textContent = `${currentChapter.title}\n`;
    textContent += `${currentChapter.description}\n\n`;
    
    textContent += "LEARNING OBJECTIVES:\n";
    currentChapter.learningObjectives.forEach((objective, index) => {
      textContent += `${index + 1}. ${objective}\n`;
    });
    textContent += "\n";

    textContent += "KEY TERMS:\n";
    currentChapter.keyTerms.forEach((term, index) => {
      textContent += `• ${term}\n`;
    });
    textContent += "\n";

    textContent += "STUDY CONTENT:\n\n";
    currentChapter.sections.forEach((section, index) => {
      textContent += `${section.title}\n`;
      textContent += "=".repeat(section.title.length) + "\n";
      section.content.forEach(paragraph => {
        // Remove markdown-style bold formatting for plain text
        const cleanParagraph = paragraph.replace(/\*\*(.*?)\*\*/g, '$1');
        textContent += `${cleanParagraph}\n`;
      });
      textContent += "\n";
    });

    if (currentChapter.criticalConcepts) {
      textContent += "CRITICAL CONCEPTS:\n";
      currentChapter.criticalConcepts.forEach((concept, index) => {
        textContent += `${index + 1}. ${concept}\n`;
      });
      textContent += "\n";
    }

    textContent += `---\nGenerated from EMT-B Study Notes - ${new Date().toLocaleDateString()}\n`;
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

  const downloadAsHTML = () => {
    let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentChapter.title}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; }
        h2 { color: #1f2937; margin-top: 30px; }
        h3 { color: #374151; }
        .section { margin-bottom: 25px; border-left: 4px solid #e5e7eb; padding-left: 20px; }
        .objectives, .terms, .concepts { background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .objectives { border-left: 4px solid #10b981; }
        .terms { border-left: 4px solid #ef4444; }
        .concepts { border-left: 4px solid #f59e0b; }
        ul { padding-left: 20px; }
        li { margin-bottom: 5px; }
        strong { color: #1f2937; }
    </style>
</head>
<body>
    <h1>${currentChapter.title}</h1>
    <p><em>${currentChapter.description}</em></p>
    
    <div class="objectives">
        <h2>Learning Objectives</h2>
        <ul>
            ${currentChapter.learningObjectives.map(obj => `<li>${obj}</li>`).join('')}
        </ul>
    </div>

    <div class="terms">
        <h2>Key Terms</h2>
        <ul>
            ${currentChapter.keyTerms.map(term => `<li><strong>${term}</strong></li>`).join('')}
        </ul>
    </div>

    <h2>Study Content</h2>
    ${currentChapter.sections.map(section => `
        <div class="section">
            <h3>${section.title}</h3>
            ${section.content.map(paragraph => {
              // Convert markdown bold to HTML
              const htmlParagraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
              return `<p>${htmlParagraph}</p>`;
            }).join('')}
        </div>
    `).join('')}

    ${currentChapter.criticalConcepts ? `
    <div class="concepts">
        <h2>Critical Concepts</h2>
        <ul>
            ${currentChapter.criticalConcepts.map(concept => `<li>${concept}</li>`).join('')}
        </ul>
    </div>
    ` : ''}

    <hr>
    <footer>
        <p><em>Generated from EMT-B Study Notes - ${new Date().toLocaleDateString()}</em></p>
    </footer>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EMT-B_${activeChapter}_Study_Notes.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAsMarkdown = () => {
    let mdContent = `# ${currentChapter.title}\n\n`;
    mdContent += `*${currentChapter.description}*\n\n`;
    
    mdContent += "## Learning Objectives\n\n";
    currentChapter.learningObjectives.forEach((objective, index) => {
      mdContent += `${index + 1}. ${objective}\n`;
    });
    mdContent += "\n";

    mdContent += "## Key Terms\n\n";
    currentChapter.keyTerms.forEach(term => {
      mdContent += `- **${term}**\n`;
    });
    mdContent += "\n";

    mdContent += "## Study Content\n\n";
    currentChapter.sections.forEach((section, index) => {
      mdContent += `### ${section.title}\n\n`;
      section.content.forEach(paragraph => {
        mdContent += `${paragraph}\n\n`;
      });
    });

    if (currentChapter.criticalConcepts) {
      mdContent += "## Critical Concepts\n\n";
      currentChapter.criticalConcepts.forEach((concept, index) => {
        mdContent += `${index + 1}. ${concept}\n`;
      });
      mdContent += "\n";
    }

    mdContent += `---\n*Generated from EMT-B Study Notes - ${new Date().toLocaleDateString()}*\n`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EMT-B_${activeChapter}_Study_Notes.md`;
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
            <p className="text-blue-600 text-sm mt-1">
              Module {currentChapter.module}
            </p>
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
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-700 text-sm leading-relaxed flex items-start">
                    <span className="text-blue-500 mr-2 mt-1.5 text-xs">•</span>
                    <span 
                      dangerouslySetInnerHTML={{ 
                        __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-blue-700 bg-blue-50 px-1 rounded">$1</strong>') 
                      }} 
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderCriticalConcepts = () => (
    <div className="space-y-4">
      {currentChapter.criticalConcepts?.map((concept, index) => (
        <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 shadow-sm rounded-r-lg">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-yellow-800 text-sm font-medium leading-relaxed">{concept}</p>
          </div>
        </div>
      ))}
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
              <option value="chapter2">Chapter 2: Workforce Safety</option>
              <option value="chapter10">Chapter 10: Patient Assessment</option>
              <option value="chapter11">Chapter 11: Airway Management</option>
              <option value="chapter17">Chapter 17: Cardiovascular Emergency</option>
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
                    <button
                      onClick={() => {
                        downloadAsHTML();
                        setShowDownloadMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      HTML File (.html)
                    </button>
                    <button
                      onClick={() => {
                        downloadAsMarkdown();
                        setShowDownloadMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Markdown (.md)
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
            placeholder="Search study notes..."
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'study' && renderStudyMaterial()}
        {activeTab === 'critical' && renderCriticalConcepts()}
        {activeTab === 'flashcards' && renderFlashcards()}
      </div>
    </div>
  );
};

export default EMTBStudyNotes;
