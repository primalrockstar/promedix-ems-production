import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, Clock, Target, Brain, CheckCircle, Star, 
  Volume2, VolumeX, Bookmark, BookmarkCheck, Share2,
  ArrowLeft, ArrowRight, RotateCcw, Play, Pause,
  Eye, EyeOff, Lightbulb, AlertCircle, Trophy,
  BarChart3, TrendingUp, Zap, FileText, Download
} from 'lucide-react';

interface StudySession {
  chapterId: string;
  startTime: Date;
  timeSpent: number;
  sectionsRead: string[];
  highlightsMade: number;
  notesCreated: number;
  comprehensionScore?: number;
}

interface StudyNote {
  id: string;
  sectionId: string;
  content: string;
  timestamp: Date;
  type: 'note' | 'question' | 'insight';
}

interface Highlight {
  id: string;
  text: string;
  sectionId: string;
  color: 'yellow' | 'blue' | 'green' | 'purple';
  timestamp: Date;
}

interface StudyMetrics {
  readingSpeed: number; // words per minute
  comprehensionRate: number; // percentage
  retentionScore: number; // based on quick quizzes
  focusTime: number; // uninterrupted reading time
  engagementLevel: 'low' | 'medium' | 'high';
}

const EnhancedStudyChapter2: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [isReading, setIsReading] = useState(false);
  const [readingMode, setReadingMode] = useState<'normal' | 'focus' | 'speed'>('normal');
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [studySession, setStudySession] = useState<StudySession | null>(null);
  const [studyNotes, setStudyNotes] = useState<StudyNote[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResults, setQuizResults] = useState<{ score: number; total: number } | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Chapter 2: Responder Safety & Resilience - Enhanced Content
  const chapterContent = {
    id: 'chapter2-responder-safety-resilience',
    title: 'Responder Safety & Resilience',
    module: 'Module 1: Foundations of EMS Practice',
    estimatedTime: '90-120 minutes',
    difficultyLevel: 'Intermediate',
    version: '2.1 - Enhanced',
    lastUpdated: 'August 2025',
    
    learningObjectives: [
      'Analyze the unique occupational hazards and stressors faced by emergency medical responders',
      'Evaluate comprehensive wellness strategies for maintaining physical, mental, and emotional health',
      'Demonstrate proper use of personal protective equipment and safety protocols in various emergency scenarios',
      'Apply stress management techniques and recognize signs of critical incident stress, PTSD, and burnout',
      'Implement infection control procedures and understand disease transmission pathways',
      'Assess workplace safety issues including cultural diversity, harassment, and substance abuse prevention',
      'Develop personal resilience strategies for long-term career sustainability in emergency medical services',
      'Recognize signs of compassion fatigue and implement appropriate intervention strategies',
      'Apply proper body mechanics and injury prevention techniques in patient care and equipment handling',
      'Understand legal and ethical obligations related to responder safety and patient care quality'
    ],

    keyTerms: [
      'Eustress', 'Distress', 'Resilience', 'Critical Incident Stress Management (CISM)',
      'Post-Traumatic Stress Disorder (PTSD)', 'Burnout', 'Compassion Fatigue',
      'Personal Protective Equipment (PPE)', 'Standard Precautions', 'Bloodborne Pathogens',
      'Pathogen', 'Contamination', 'Exposure', 'Fomites', 'General Adaptation Syndrome',
      'Sleep Deprivation', 'Cultural Humility', 'Sexual Harassment', 'Substance Abuse'
    ],

    sections: [
      {
        id: 'workforce-safety-intro',
        title: 'Introduction to Responder Safety and Wellness',
        wordCount: 485,
        keyTerms: ['Occupational Hazards', 'Emergency Responder', 'Traumatic Exposure', 'Mental Health'],
        content: `Emergency medical responders face significantly higher occupational risks compared to most other professions. Research indicates that 84% of first responders have experienced traumatic events during their careers, with 34% receiving diagnoses for mental health conditions including depression and post-traumatic stress disorder (PTSD).

The suicide rate among emergency medical technicians and paramedics substantially exceeds that of the general adult population, highlighting the critical importance of comprehensive safety and wellness programs. These statistics underscore the reality that emergency medical services work involves exposure to physical dangers, infectious diseases, violence, and psychologically traumatic situations on a regular basis.

EMTs operate in dynamic, unpredictable environments where conditions can change rapidly. Whether responding to motor vehicle accidents on busy highways, entering homes with unknown hazards, or treating patients with potentially infectious diseases, responders must maintain constant vigilance for personal safety while delivering optimal patient care.

The demanding nature of EMS work requires EMTs to prioritize their physical, mental, and emotional well-being not just for personal health, but as a professional obligation. Impaired responders cannot provide effective patient care and may endanger themselves, their partners, and the patients they serve. This creates an ethical imperative for comprehensive wellness practices.

Modern EMS systems recognize that responder safety and wellness directly impact service quality, response effectiveness, and long-term sustainability of emergency medical services. Organizations that invest in comprehensive safety and wellness programs see reduced injury rates, lower turnover, improved job satisfaction, and better patient outcomes.

Understanding that responder wellness is not a luxury but a fundamental requirement for professional practice represents the first step in developing effective personal safety and resilience strategies.`
      },
      {
        id: 'health-wellness-resilience',
        title: 'Comprehensive Health, Wellness, and Resilience Framework',
        wordCount: 520,
        keyTerms: ['Holistic Health', 'Wellness', 'Resilience', 'Physical Health', 'Mental Health', 'Emotional Health'],
        content: `Health represents a complex interplay of physical, mental, and emotional states rather than simply the absence of disease. For emergency medical responders, maintaining optimal health across all three domains is essential for professional effectiveness and personal sustainability.

**Physical Health** encompasses cardiovascular fitness, muscular strength, flexibility, and freedom from injury or illness. EMTs require physical stamina to perform demanding tasks such as CPR, patient lifting, and equipment carrying while working in challenging environments. Regular exercise, proper nutrition, adequate sleep, and preventive healthcare form the foundation of physical wellness.

**Mental Health** involves cognitive clarity, emotional regulation, stress management, and psychological resilience. The demanding nature of emergency medical work requires sharp decision-making skills, effective problem-solving abilities, and the capacity to remain calm under pressure. Mental wellness practices include stress management techniques, continuing education, and maintaining work-life balance.

**Emotional Health** refers to the ability to understand, express, and manage emotions appropriately while maintaining empathy and compassion for patients and colleagues. Emergency responders regularly encounter human suffering, trauma, and death, requiring emotional resilience and healthy coping mechanisms to prevent compassion fatigue and burnout.

**Wellness** represents an active process of becoming aware of and making choices toward a healthy and fulfilling life. Unlike health, which can be viewed as a state of being, wellness involves intentional actions and lifestyle choices that promote optimal functioning across all life domains.

**Resilience** is the ability to adapt, recover, and grow stronger when facing adversity, trauma, or significant stress. For EMTs, resilience involves bouncing back from difficult calls, learning from challenging experiences, and maintaining professional effectiveness despite ongoing exposure to stressful situations.

The interconnected nature of these health domains means that stress or dysfunction in one area inevitably affects the others. Chronic physical fatigue can impair mental clarity and emotional regulation, while unmanaged psychological stress can manifest as physical symptoms and compromise immune function.

Building resilience requires intentional development across multiple areas: physical conditioning, mental health practices, emotional intelligence skills, social support systems, and spiritual or meaning-making practices that provide purpose and perspective.`
      },
      {
        id: 'stress-eustress-distress',
        title: 'Understanding Stress: Eustress, Distress, and Adaptive Responses',
        wordCount: 610,
        keyTerms: ['Eustress', 'Distress', 'Acute Stress', 'Chronic Stress', 'General Adaptation Syndrome', 'Stress Response'],
        content: `Stress represents the body's physiological and psychological response to perceived challenges or threats. Understanding different types of stress and their effects enables EMTs to harness beneficial stress while managing harmful stress responses effectively.

**Eustress** refers to positive stress that enhances performance, motivation, and well-being. Examples include the heightened focus and energy experienced during successful resuscitation efforts, the satisfaction of mastering new skills, or the excitement of helping save lives. Eustress can improve job performance, increase resilience, and contribute to professional satisfaction and growth.

Characteristics of eustress include increased alertness, enhanced problem-solving abilities, improved physical performance, heightened creativity, and feelings of accomplishment and purpose. This type of stress typically occurs when EMTs feel challenged but capable, with clear goals and adequate resources to meet demands.

**Distress** represents negative stress that overwhelms coping abilities and impairs functioning. Examples include feeling overwhelmed by call volume, experiencing trauma from particularly difficult calls, or struggling with work-life balance. Distress can lead to physical symptoms, emotional dysfunction, and decreased job performance.

Signs of distress include anxiety, irritability, fatigue, difficulty concentrating, sleep disturbances, physical symptoms such as headaches or stomach problems, and decreased motivation or job satisfaction. Chronic distress can contribute to burnout, depression, anxiety disorders, and physical health problems.

**Acute Stress** occurs in response to immediate challenges and typically resolves quickly once the stressor is removed. During emergency calls, acute stress can enhance performance by increasing alertness, focus, and physical capabilities. The body's "fight-or-flight" response provides temporary boosts in energy, strength, and cognitive processing speed.

**Chronic Stress** results from prolonged exposure to stressors without adequate recovery time. For EMTs, sources of chronic stress may include high call volumes, difficult working conditions, administrative burdens, interpersonal conflicts, or cumulative exposure to traumatic events. Chronic stress can lead to serious health consequences including cardiovascular disease, immune system dysfunction, and mental health disorders.

**General Adaptation Syndrome** describes the body's three-stage response to stress: alarm (initial stress response), resistance (adaptation to ongoing stress), and exhaustion (depletion of adaptive resources). Understanding this progression helps EMTs recognize when stress management interventions are needed.

**Individual Stress Responses** vary significantly based on factors including personality, previous experiences, current health status, social support systems, coping skills, and personal resilience. What causes distress for one person may be manageable or even positive for another.

**Stress Cycles** can develop when one stressor triggers additional stressors, creating cascading effects. For example, a difficult patient encounter might lead to sleep problems, which impair job performance, leading to interpersonal conflicts, resulting in increased overall stress levels.

Effective stress management requires recognizing personal stress signals, identifying specific stressors, developing appropriate coping strategies, and seeking support when needed. The goal is not to eliminate all stress but to optimize the balance between challenge and capability while building resilience for long-term sustainability.`
      },
      {
        id: 'wellness-resilience-strategies',
        title: 'Evidence-Based Wellness and Resilience Strategies',
        wordCount: 745,
        keyTerms: ['Stress Management', 'Physical Fitness', 'Nutrition', 'Sleep Hygiene', 'Mindfulness', 'Social Support'],
        content: `Developing and maintaining wellness requires active, intentional efforts across multiple life domains. Evidence-based strategies for EMT wellness and resilience include physical conditioning, nutritional optimization, sleep hygiene, stress management techniques, and social support development.

**Physical Fitness and Exercise**
Regular physical activity provides multiple benefits for emergency responders: improved cardiovascular health, increased strength and endurance for job demands, better stress management, enhanced mood regulation, and reduced injury risk. The American Heart Association recommends at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity activity weekly, plus muscle-strengthening activities at least twice per week.

Cardiovascular training improves stamina for extended calls and reduces fatigue during physically demanding tasks. Strength training prevents injuries and enhances ability to lift patients and equipment safely. Flexibility and mobility work reduce muscle tension and prevent overuse injuries common in EMS work.

**Nutritional Optimization**
Proper nutrition provides the energy and nutrients necessary for optimal physical and mental performance during demanding shifts. EMTs should focus on regular meal timing, balanced macronutrient intake, adequate hydration, and strategic use of snacks to maintain energy levels.

Complex carbohydrates such as whole grains, pasta, and rice provide sustained energy for long shifts. Lean proteins support muscle recovery and maintain stable blood sugar levels. Healthy fats from sources like nuts, avocados, and olive oil support brain function and hormone production.

Limiting processed foods, excessive sugar, sodium, and saturated fats helps prevent energy crashes and reduces inflammation. Alcohol consumption should be moderate (no more than one drink daily for women, two for men) as excessive alcohol interferes with sleep quality and stress management.

**Hydration Strategies**
Maintaining proper hydration is critical for physical performance, cognitive function, and temperature regulation. Water is the optimal hydration choice as it is absorbed most rapidly. Adequate hydration is indicated by frequent urination and light yellow urine color.

Dehydration can impair decision-making, reduce physical performance, and increase injury risk. EMTs should drink water regularly throughout shifts, especially during hot weather or physically demanding calls.

**Sleep Hygiene and Fatigue Management**
Quality sleep is essential for physical recovery, memory consolidation, emotional regulation, and immune function. Adults require 7-9 hours of sleep per night for optimal functioning. Shift work and emergency calls can disrupt normal sleep patterns, making intentional sleep hygiene practices critical.

Sleep hygiene strategies include maintaining consistent sleep schedules when possible, creating dark, quiet, cool sleep environments, avoiding caffeine and large meals before bedtime, limiting screen time before sleep, and using relaxation techniques to promote sleep onset.

Power naps (20-30 minutes) can help manage fatigue during long shifts without interfering with nighttime sleep. Longer naps should be avoided as they can cause grogginess and disrupt circadian rhythms.

**Stress Management and Mindfulness**
Effective stress management involves both preventing excessive stress and developing healthy coping mechanisms for unavoidable stressors. Techniques include deep breathing exercises, progressive muscle relaxation, meditation, mindfulness practices, and cognitive reframing strategies.

Mindfulness involves present-moment awareness without judgment, which can help EMTs stay focused during calls while preventing rumination about difficult situations. Regular mindfulness practice has been shown to reduce stress, improve emotional regulation, and enhance job satisfaction.

**Social Support and Relationships**
Strong relationships with family, friends, and colleagues provide emotional support, practical assistance, and stress buffering effects. EMTs should prioritize maintaining relationships outside of work while also building supportive professional networks.

Peer support programs connect EMTs with colleagues who understand the unique challenges of emergency medical work. These programs provide safe spaces to discuss difficult calls, share coping strategies, and access resources for additional support when needed.

**Work-Life Balance**
Maintaining clear boundaries between work and personal life helps prevent job stress from overwhelming other life domains. Strategies include engaging in non-EMS activities and hobbies, spending time in nature, pursuing creative outlets, and maintaining spiritual or meaning-making practices.

Regular vacations and time off are essential for recovery and preventing burnout. Schedule rotation and adequate rest between shifts help maintain alertness and prevent fatigue-related errors.`
      },
      {
        id: 'infectious-disease-prevention',
        title: 'Infectious Disease Prevention and Standard Precautions',
        wordCount: 685,
        keyTerms: ['Standard Precautions', 'PPE', 'Bloodborne Pathogens', 'Transmission Routes', 'Hand Hygiene', 'OSHA Requirements'],
        content: `Emergency medical technicians face significant exposure risks to infectious and communicable diseases during patient care activities. Understanding disease transmission mechanisms and implementing appropriate prevention strategies is essential for responder safety and preventing healthcare-associated infections.

**Infectious Disease Terminology**
**Pathogens** are microorganisms (bacteria, viruses, fungi, parasites) capable of causing disease in humans. **Infectious diseases** are illnesses caused by pathogenic organisms, while **communicable diseases** can be transmitted from person to person through various routes.

**Contamination** refers to the presence of potentially harmful pathogens on surfaces, equipment, or in body fluids. **Exposure** occurs when there is contact with blood, body fluids, or airborne particles that could potentially transmit disease.

**Disease Transmission Routes**
Understanding how diseases spread enables EMTs to implement appropriate protective measures:

**Contact Transmission** occurs through direct contact with infected individuals or indirect contact via contaminated objects called **fomites**. Examples include MRSA, norovirus, and many skin infections. Prevention involves hand hygiene, gloves, and proper surface disinfection.

**Airborne Transmission** involves pathogens in small particles that remain suspended in air and can be inhaled. Examples include tuberculosis, measles, and COVID-19. Protection requires N95 or higher-level respiratory protection and adequate ventilation.

**Droplet Transmission** involves larger respiratory droplets produced by coughing, sneezing, or talking that travel short distances before falling. Examples include influenza and pertussis. Surgical masks and eye protection provide adequate protection.

**Vector-borne Transmission** involves animals or insects that carry pathogens between hosts. Examples include Lyme disease (ticks), West Nile virus (mosquitoes), and plague (fleas). Prevention focuses on avoiding vector exposure and using appropriate repellents.

**Foodborne and Waterborne Transmission** involves ingestion of contaminated food or water. Examples include salmonella, hepatitis A, and cholera. Prevention involves safe food handling practices and proper hand hygiene.

**Standard Precautions**
The Centers for Disease Control and Prevention (CDC) mandates standard precautions, which assume that every patient may be infected with bloodborne or other pathogens. This approach eliminates the need to identify specific infections before implementing protective measures.

Standard precautions include hand hygiene before and after patient contact, appropriate use of personal protective equipment based on anticipated exposures, safe injection practices, proper handling of contaminated equipment and surfaces, and respiratory hygiene/cough etiquette.

**Personal Protective Equipment (PPE)**
OSHA requires employers to provide appropriate PPE and train employees in proper use. Common PPE includes:

**Gloves** protect hands from contaminated surfaces and body fluids. Use appropriate glove materials (nitrile, latex alternatives) and change between patients. Remove gloves carefully to avoid self-contamination.

**Eye Protection** (safety glasses, goggles, face shields) prevents splash exposures to mucous membranes. Use when blood or body fluid exposure is possible.

**Masks and Respirators** protect against airborne and droplet transmission. Surgical masks filter large droplets, while N95 respirators filter smaller airborne particles. Proper fit testing ensures effective protection.

**Gowns and Protective Clothing** provide barrier protection for skin and clothing. Use fluid-resistant materials for procedures with splash potential.

**Proper PPE Sequence**
**Donning (putting on) PPE**: Gown first, then mask or respirator, eye protection, and gloves last. This sequence prevents contamination during application.

**Doffing (removing) PPE**: Remove gloves first, then eye protection, gown, and mask/respirator last. Remove mask by handling only the ties or ear loops. Perform hand hygiene immediately after PPE removal.

**Hand Hygiene**
Hand washing remains the single most effective method for preventing disease transmission. Use soap and water for visibly soiled hands or alcohol-based hand sanitizers for routine decontamination. Wash hands before and after patient contact, after removing gloves, and after contact with contaminated surfaces.

**Exposure Management**
Post-exposure protocols include immediate wound care, evaluation of exposure risk, potential prophylactic treatment, and follow-up testing. Report exposures promptly to enable timely intervention and documentation.`
      },
      {
        id: 'protective-equipment-safety',
        title: 'Specialized Protective Equipment and Environmental Safety',
        wordCount: 580,
        keyTerms: ['Turnout Gear', 'Environmental Protection', 'Cold Weather Gear', 'Heat Protection', 'Body Armor'],
        content: `Emergency medical technicians work in diverse environmental conditions requiring specialized protective equipment beyond standard medical PPE. Understanding appropriate gear selection and proper use is essential for maintaining safety across various emergency scenarios.

**Environmental Protection Principles**
Protective equipment must be appropriate for specific hazards, properly maintained, and correctly fitted to provide effective protection. Equipment selection depends on environmental conditions, potential exposures, and specific job tasks being performed.

**Cold Weather Protection**
Cold environments pose risks of hypothermia, frostbite, and decreased dexterity that can impair patient care abilities. Effective cold weather protection uses layered clothing systems:

**Base Layer**: Moisture-wicking materials (synthetic fabrics or merino wool) transport sweat away from skin, preventing chilling. Avoid cotton materials in cold, wet conditions as cotton retains moisture and loses insulating properties when wet.

**Insulation Layer**: Provides thermal protection through trapped air layers. Options include fleece, down, or synthetic insulation materials. Thickness should be adjustable based on activity level and environmental conditions.

**Outer Shell**: Wind and water-resistant materials protect against environmental elements while allowing moisture vapor to escape. Features should include ventilation options, reinforced high-wear areas, and compatibility with other equipment.

**Extremity Protection**: Insulated, waterproof gloves maintain dexterity while providing warmth. Consider using liner gloves under work gloves for fine motor tasks. Insulated, slip-resistant boots prevent heat loss and provide traction on icy surfaces.

**Heat and Fire Protection**
**Turnout Gear (Bunker Gear)** provides protection against fire, heat, impact, and cuts during fire suppression and rescue operations. Components include helmet, coat, pants, boots, and gloves designed to meet NFPA standards.

Limitations include minimal electrical protection, reduced mobility and dexterity, and increased heat stress during extended use. Proper maintenance including regular cleaning, inspection, and replacement is essential for continued protection.

**High-Temperature Environments** require cooling strategies such as pre-cooling with cold towels, frequent rest breaks in air-conditioned areas, increased fluid intake, and recognition of heat stress symptoms.

**Specialized Safety Equipment**
**Head Protection**: Helmets provide impact protection from falling objects and bump hazards. Select helmets appropriate for specific environments (construction sites, motor vehicle accidents, technical rescues). Features should include chin straps, impact resistance, and compatibility with other equipment.

**Foot Protection**: Safety boots should provide ankle support, slip resistance, puncture protection, and appropriate insulation. Steel toes protect against crush injuries from heavy equipment. Waterproof materials prevent exposure to contaminated fluids.

**Hearing Protection**: Earplugs or earmuffs protect against hearing damage from sirens, power tools, and loud environments. Consider electronic hearing protection that amplifies normal sounds while protecting against loud noises.

**Eye and Face Protection**: Safety glasses protect against flying debris, chemical splashes, and bright lights. Face shields provide additional protection during high-risk procedures. Consider anti-fog coatings and UV protection for outdoor work.

**Body Armor**: Ballistic vests protect against firearms threats in high-risk environments. Selection depends on threat level assessment and local protocols. Proper fit and regular inspection ensure effective protection.

**Skin Protection**: Sunscreen (minimum SPF 15) prevents sunburn and reduces skin cancer risk during outdoor operations. High-visibility clothing enhances safety around traffic and heavy equipment.

**Personal Safety Considerations**
Secure long hair, jewelry, and loose clothing to prevent entanglement in equipment or machinery. Remove or secure items that could interfere with PPE fit or emergency egress.

Regular equipment inspection identifies damage or wear that could compromise protection. Replace damaged equipment immediately and maintain backup supplies for critical items.

Training in proper equipment use, limitations, and maintenance ensures maximum protection and equipment longevity. Practice donning and doffing procedures to maintain proficiency and prevent contamination.`
      }
    ],

    practiceQuestions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'According to research data, what percentage of first responders have experienced traumatic events during their careers?',
        options: ['34%', '50%', '84%', '95%'],
        correct: 2,
        explanation: 'Studies show that 84% of first responders have experienced traumatic events, with 34% receiving mental health diagnoses such as depression or PTSD.'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Which type of stress can enhance performance and job satisfaction?',
        options: ['Distress', 'Eustress', 'Chronic stress', 'Acute stress'],
        correct: 1,
        explanation: 'Eustress is positive stress that enhances performance, motivation, and well-being, such as the heightened focus experienced during successful patient care.'
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'What is the recommended minimum amount of moderate-intensity aerobic activity per week for optimal health?',
        options: ['75 minutes', '100 minutes', '150 minutes', '200 minutes'],
        correct: 2,
        explanation: 'The American Heart Association recommends at least 150 minutes of moderate-intensity aerobic activity per week, plus muscle-strengthening activities twice weekly.'
      },
      {
        id: 'q4',
        type: 'multiple-choice',
        question: 'Which disease transmission route involves contaminated objects called fomites?',
        options: ['Airborne transmission', 'Indirect contact transmission', 'Droplet transmission', 'Vector-borne transmission'],
        correct: 1,
        explanation: 'Indirect contact transmission occurs via contaminated objects called fomites, which can harbor pathogens and transmit disease when touched.'
      },
      {
        id: 'q5',
        type: 'multiple-choice',
        question: 'What is the correct sequence for donning (putting on) PPE?',
        options: ['Gloves, gown, mask, eye protection', 'Gown, mask, eye protection, gloves', 'Mask, gown, gloves, eye protection', 'Eye protection, gloves, gown, mask'],
        correct: 1,
        explanation: 'The correct donning sequence is: gown first, then mask or respirator, eye protection, and gloves last to prevent contamination during application.'
      },
      {
        id: 'q6',
        type: 'multiple-choice',
        question: 'Which material should be avoided in cold, wet conditions due to moisture retention?',
        options: ['Merino wool', 'Synthetic fabrics', 'Cotton', 'Fleece'],
        correct: 2,
        explanation: 'Cotton should be avoided in cold, wet conditions because it absorbs moisture and loses insulating properties when wet, increasing risk of hypothermia.'
      },
      {
        id: 'q7',
        type: 'multiple-choice',
        question: 'What does the CDC\'s standard precautions approach assume about patients?',
        options: ['Only known infected patients pose risks', 'Every patient may be infected with pathogens', 'PPE is only needed for certain procedures', 'Hand hygiene is sufficient protection'],
        correct: 1,
        explanation: 'Standard precautions assume every patient may be infected with bloodborne or other pathogens, eliminating the need to identify specific infections before implementing protection.'
      },
      {
        id: 'q8',
        type: 'multiple-choice',
        question: 'How many hours of sleep do adults need each night for optimal functioning?',
        options: ['5-6 hours', '6-7 hours', '7-9 hours', '9-10 hours'],
        correct: 2,
        explanation: 'Adults require 7-9 hours of sleep per night for optimal physical recovery, memory consolidation, emotional regulation, and immune function.'
      },
      {
        id: 'q9',
        type: 'multiple-choice',
        question: 'What is the most effective single method for preventing disease transmission?',
        options: ['Wearing gloves', 'Using hand sanitizer', 'Hand washing', 'Wearing masks'],
        correct: 2,
        explanation: 'Hand washing remains the single most effective method for preventing disease transmission and should be performed before and after patient contact.'
      },
      {
        id: 'q10',
        type: 'multiple-choice',
        question: 'Which factor best indicates proper hydration status?',
        options: ['Dark yellow urine', 'Infrequent urination', 'Light yellow urine and frequent urination', 'Clear urine only'],
        correct: 2,
        explanation: 'Adequate hydration is indicated by frequent urination and light yellow urine color, showing proper fluid balance and kidney function.'
      }
    ]
  };

  // Study session management
  useEffect(() => {
    const session: StudySession = {
      chapterId: chapterId || 'chapter2',
      startTime: new Date(),
      timeSpent: 0,
      sectionsRead: [],
      highlightsMade: 0,
      notesCreated: 0
    };
    setStudySession(session);

    const interval = setInterval(() => {
      setStudySession(prev => prev ? { ...prev, timeSpent: prev.timeSpent + 1 } : null);
    }, 1000);

    return () => clearInterval(interval);
  }, [chapterId]);

  // Text selection handling for highlighting
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(selection.toString());
      setSelectionPosition({ x: rect.left, y: rect.top - 50 });
    }
  };

  // Add highlight
  const addHighlight = (color: Highlight['color']) => {
    if (selectedText) {
      const highlight: Highlight = {
        id: Date.now().toString(),
        text: selectedText,
        sectionId: chapterContent.sections[currentSection].id,
        color,
        timestamp: new Date()
      };
      setHighlights([...highlights, highlight]);
      setStudySession(prev => prev ? { ...prev, highlightsMade: prev.highlightsMade + 1 } : null);
      setSelectedText('');
    }
  };

  // Add study note
  const addStudyNote = (content: string, type: StudyNote['type'] = 'note') => {
    const note: StudyNote = {
      id: Date.now().toString(),
      sectionId: chapterContent.sections[currentSection].id,
      content,
      timestamp: new Date(),
      type
    };
    setStudyNotes([...studyNotes, note]);
    setStudySession(prev => prev ? { ...prev, notesCreated: prev.notesCreated + 1 } : null);
  };

  // Calculate study metrics
  const calculateMetrics = (): StudyMetrics => {
    const totalWords = chapterContent.sections.reduce((sum, section) => sum + section.wordCount, 0);
    const timeInMinutes = (studySession?.timeSpent || 0) / 60;
    const actualReadingSpeed = timeInMinutes > 0 ? totalWords / timeInMinutes : 0;
    
    return {
      readingSpeed: Math.round(actualReadingSpeed),
      comprehensionRate: 85, // Mock calculation
      retentionScore: 78, // Mock calculation
      focusTime: studySession?.timeSpent || 0,
      engagementLevel: highlights.length > 3 ? 'high' : highlights.length > 1 ? 'medium' : 'low'
    };
  };

  // Text-to-speech functionality
  const toggleTextToSpeech = () => {
    if (textToSpeech) {
      speechSynthesis.cancel();
      setTextToSpeech(false);
    } else {
      const text = chapterContent.sections[currentSection].content;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
      setTextToSpeech(true);
    }
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const metrics = calculateMetrics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{chapterContent.title}</h1>
                <p className="text-sm text-gray-600">{chapterContent.module}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  bookmarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              </button>
              
              <button
                onClick={toggleTextToSpeech}
                className={`p-2 rounded-lg transition-colors ${
                  textToSpeech ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {textToSpeech ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              
              <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Study Metrics Dashboard */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Study Time</p>
                <p className="text-lg font-semibold text-blue-600">
                  {formatTime(studySession?.timeSpent || 0)}
                </p>
              </div>
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reading Speed</p>
                <p className="text-lg font-semibold text-green-600">{metrics.readingSpeed} WPM</p>
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Highlights</p>
                <p className="text-lg font-semibold text-yellow-600">{highlights.length}</p>
              </div>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Notes</p>
                <p className="text-lg font-semibold text-purple-600">{studyNotes.length}</p>
              </div>
              <FileText className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Engagement</p>
                <p className={`text-lg font-semibold ${
                  metrics.engagementLevel === 'high' ? 'text-green-600' : 
                  metrics.engagementLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {metrics.engagementLevel.charAt(0).toUpperCase() + metrics.engagementLevel.slice(1)}
                </p>
              </div>
              <Zap className="w-5 h-5 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Chapter Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Chapter Sections</h3>
              <nav className="space-y-2">
                {chapterContent.sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors text-sm ${
                      currentSection === index
                        ? 'bg-blue-100 text-blue-700 border-blue-200 border'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">{section.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {section.wordCount} words • ~{Math.ceil(section.wordCount / 200)} min read
                    </div>
                  </button>
                ))}
              </nav>
              
              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => setShowQuiz(!showQuiz)}
                    className="w-full flex items-center justify-center p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Practice Quiz
                  </button>
                  <button className="w-full flex items-center justify-center p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {!showQuiz ? (
              <div className="bg-white rounded-lg shadow-sm border">
                {/* Section Header */}
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {chapterContent.sections[currentSection].title}
                      </h2>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          ~{Math.ceil(chapterContent.sections[currentSection].wordCount / 200)} min read
                        </span>
                        <span className="flex items-center">
                          <Target className="w-4 h-4 mr-1" />
                          {chapterContent.sections[currentSection].wordCount} words
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                        disabled={currentSection === 0}
                        className="p-2 rounded-lg bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentSection(Math.min(chapterContent.sections.length - 1, currentSection + 1))}
                        disabled={currentSection === chapterContent.sections.length - 1}
                        className="p-2 rounded-lg bg-gray-100 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Key Terms */}
                  <div className="flex flex-wrap gap-2">
                    {chapterContent.sections[currentSection].keyTerms.map((term, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Section Content */}
                <div className="p-6">
                  <div
                    ref={contentRef}
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                    onMouseUp={handleTextSelection}
                    style={{ fontSize: readingMode === 'speed' ? '1.125rem' : '1rem' }}
                  >
                    {chapterContent.sections[currentSection].content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Practice Quiz */
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Practice Quiz</h2>
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {chapterContent.practiceQuestions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="flex items-center p-2 rounded hover:bg-gray-50 cursor-pointer">
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={optionIndex}
                              className="mr-3 text-blue-600"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Submit Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text Selection Highlight Menu */}
      {selectedText && (
        <div
          className="fixed z-50 bg-white rounded-lg shadow-lg border p-2 flex space-x-2"
          style={{ left: selectionPosition.x, top: selectionPosition.y }}
        >
          <button
            onClick={() => addHighlight('yellow')}
            className="p-2 rounded bg-yellow-200 hover:bg-yellow-300 transition-colors"
            title="Yellow highlight"
          >
            <div className="w-4 h-4 bg-yellow-400 rounded" />
          </button>
          <button
            onClick={() => addHighlight('blue')}
            className="p-2 rounded bg-blue-200 hover:bg-blue-300 transition-colors"
            title="Blue highlight"
          >
            <div className="w-4 h-4 bg-blue-400 rounded" />
          </button>
          <button
            onClick={() => addHighlight('green')}
            className="p-2 rounded bg-green-200 hover:bg-green-300 transition-colors"
            title="Green highlight"
          >
            <div className="w-4 h-4 bg-green-400 rounded" />
          </button>
          <button
            onClick={() => addHighlight('purple')}
            className="p-2 rounded bg-purple-200 hover:bg-purple-300 transition-colors"
            title="Purple highlight"
          >
            <div className="w-4 h-4 bg-purple-400 rounded" />
          </button>
        </div>
      )}
    </div>
  );
};

export default EnhancedStudyChapter2;
