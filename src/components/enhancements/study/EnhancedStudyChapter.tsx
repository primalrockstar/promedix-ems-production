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

const EnhancedStudyChapter: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [isReading, setIsReading] = useState(false);
  const [readingMode, setReadingMode] = useState<'normal' | 'focus' | 'speed'>('normal');
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [studySession, setStudySession] = useState<StudySession | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [studyNotes, setStudyNotes] = useState<StudyNote[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState(250); // WPM
  const [comprehensionQuiz, setComprehensionQuiz] = useState<any[]>([]);
  const [showQuickQuiz, setShowQuickQuiz] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });

  // Enhanced Chapter Content Structure
  const chapterContent = {
    id: chapterId || 'chapter1',
    title: 'EMS Systems: Foundation of Emergency Care',
    estimatedReadTime: '45 minutes',
    difficulty: 'Beginner',
    learningObjectives: [
      'Define emergency medical services (EMS) systems and their key components',
      'Name the four levels of EMT training and licensure (EMR, EMT, AEMT, Paramedic)',
      'Describe EMT licensure criteria and how the ADA applies to EMT employment',
      'Explain the historic development of the EMS system from 1966 to present',
      'Understand the guiding principles of EMS Agenda 2050',
      'Describe how medical direction works and the EMT\'s role in the process',
      'Explain continuous quality improvement (CQI) and patient safety in EMS',
      'Characterize the EMT\'s role in disease prevention and public education',
      'Describe the roles, responsibilities, and professional attributes of an EMT',
      'Explain the impact of HIPAA on patient privacy and confidentiality'
    ],
    sections: [
      {
        id: 'introduction',
        title: 'Introduction to Emergency Medical Services',
        wordCount: 520,
        keyTerms: ['EMS System', 'Emergency Medical Technician', 'Prehospital Care', 'Healthcare Team'],
        content: `Emergency Medical Services (EMS) is a comprehensive system of healthcare professionals who provide prehospital emergency care and transportation to people who are sick or injured. As an Emergency Medical Technician (EMT), you become an essential part of this critical healthcare delivery system that serves as the vital link between emergency scenes and definitive medical care.

The EMS system consists of a coordinated team of healthcare providers working together to deliver emergency medical care. This team approach ensures that patients receive appropriate care from the moment of injury or illness through their arrival at a medical facility. The effectiveness of this system depends on seamless coordination between multiple components working in harmony.

EMTs serve as the backbone of the EMS system in the United States. Your role extends far beyond basic medical care - you serve as a healthcare advocate, a source of comfort during traumatic events, and often the first medical professional a patient encounters during their most vulnerable moments. This responsibility requires not only technical competence but also emotional intelligence, cultural sensitivity, and the ability to make rapid decisions under pressure.

Modern EMS systems are built on the principle of providing the right care, at the right time, by the right provider. This concept emphasizes that effective emergency care is not just about speed—it's about delivering appropriate interventions that improve patient outcomes while ensuring the safety of both patients and providers.

The EMS system is governed by state laws and operates under strict medical oversight to ensure quality care and patient safety. After successfully completing EMT training, you will be eligible to take either the National Registry of EMTs (NREMT) exam or your state's certification exam, followed by state licensure that grants you the legal authority to practice as an EMT.`
      },
      {
        id: 'training-levels',
        title: 'Four Levels of EMS Training and Licensure',
        wordCount: 680,
        keyTerms: ['EMR', 'EMT', 'AEMT', 'Paramedic', 'Scope of Practice', 'National Registry'],
        content: `The National Emergency Medical Service Scope of Practice Model describes four distinct levels of EMS practice, each with specific training requirements and capabilities. Understanding these levels is crucial for recognizing your role within the broader EMS team.

**Emergency Medical Responder (EMR)** represents the entry level of EMS training. EMRs are generally first responders such as law enforcement officers and firefighters who provide immediate life-saving interventions with limited equipment. EMR training focuses on basic life support (BLS) and urgent care skills necessary to initiate immediate care and assist EMTs upon their arrival. This level typically requires 40-60 hours of training.

**Emergency Medical Technician (EMT)** is the foundation level requiring approximately 150-200 hours of comprehensive training. EMTs possess the knowledge and skills to provide basic emergency care including patient assessment, basic life support, medication administration, and patient transport. Upon arrival at the scene, the EMT assumes responsibility for assessment, care, packaging, and transport of the patient. This is the level you are training to achieve.

**Advanced Emergency Medical Technician (AEMT)** builds upon EMT knowledge with additional training in specific advanced skills including intravenous (IV) therapy, advanced airway adjuncts, and administration of a limited number of medications. AEMT training adds 200-400 hours of education beyond the EMT level, creating an intermediate level that bridges basic and advanced life support.

**Paramedic** represents the highest level of EMS practice with extensive training ranging from 1,000 to more than 1,300 hours, often offered within associate's or bachelor's degree programs. Paramedic training covers advanced life support (ALS) skills including endotracheal intubation, emergency pharmacology, cardiac monitoring, and other advanced assessment and treatment skills.

The **National Registry of Emergency Medical Technicians (NREMT)** is a non-profit organization established in 1970 that provides standardized certification for EMS providers across the United States. Most states require NREMT certification as a prerequisite for state licensure. The certification process involves both cognitive and psychomotor examinations using computer adaptive testing (CAT) technology.

Each level has a defined **scope of practice** that outlines the specific skills and procedures each provider level is authorized to perform. It's important to understand that a medical director can limit an EMT's scope of practice but cannot expand it beyond state law - expanding scope requires state approval.`
      },
      {
        id: 'licensure-requirements',
        title: 'EMT Licensure Criteria and Legal Requirements',
        wordCount: 485,
        keyTerms: ['Licensure', 'Certification', 'ADA Compliance', 'Background Check', 'Medical Director'],
        content: `Licensure is the process by which states ensure applicant competency and grant legal authority to practice as a healthcare provider. While requirements differ from state to state, general requirements to be licensed and employed as an EMT include:

**Educational and Training Requirements:** High school diploma or equivalent, successful completion of a state-approved EMT course, and successful completion of a recognized healthcare provider BLS/CPR course. You must also pass both state-recognized written and practical certification examinations.

**Background and Health Requirements:** Proof of immunization against certain communicable diseases, successful completion of background check and drug screening, and a valid driver's license. You must demonstrate the mental and physical ability necessary to safely perform all tasks and functions described in the EMT role.

**The Americans with Disabilities Act (ADA) of 1990** protects people with disabilities from being denied access to programs and services provided by state or local governments. Title I of the ADA protects EMTs with disabilities who are seeking employment and prohibits employers from failing to provide full and equal employment opportunities. This may require modifying the work environment or how the job is performed, ensuring that qualified individuals with disabilities can serve as EMTs when they can perform essential job functions.

**Personal Background Considerations:** States have various criminal requirements that may prohibit individuals who have committed certain misdemeanors and/or felonies from becoming EMS providers. These requirements vary significantly by state and are designed to protect public safety while ensuring that EMS providers maintain the highest standards of professionalism and trustworthiness.

**Continuing Education and Recertification:** Maintaining certification requires ongoing education and periodic recertification to ensure that EMS providers stay current with evolving medical practices and maintain their competency throughout their careers. This lifelong learning approach reflects the dynamic nature of emergency medicine and the importance of evidence-based practice.

**Credentialing Process:** This involves checking a healthcare provider's qualifications and is usually managed by a physician medical director. Sometimes EMTs receive special permission to perform fewer or additional medical tasks, or to work in specific healthcare systems, always within the bounds of state law and medical oversight.`
      },
      {
        id: 'history-evolution',
        title: 'Historic Development of the EMS System',
        wordCount: 625,
        keyTerms: ['White Paper 1966', 'EMS Act 1973', 'DOT Curriculum', 'EMS Agenda 2050', 'Evidence-Based Medicine'],
        content: `The modern EMS system has evolved significantly from its early origins to become the sophisticated healthcare delivery system we know today. Understanding this evolution helps appreciate the professional standards and evidence-based practices that define contemporary EMS.

**Early Origins and Military Influence:** The origins of EMS can be traced to volunteer ambulances in World War I, field care developments in World War II, and the field medic and rapid helicopter evacuation systems developed during the Korean conflict. These military innovations demonstrated the value of rapid medical intervention and transportation in saving lives.

**The Watershed Moment - 1966:** EMS as we know it today originated in 1966 with the publication of "Accidental Death and Disability: The Neglected Disease of Modern Society," commonly known as "The White Paper." This landmark document exposed major deficiencies in prehospital emergency care and catalyzed the development of modern EMS systems.

**Legislative Foundation:** The Emergency Medical Services Act of 1973 created funding sources and programs to develop improved systems of prehospital emergency care. This federal legislation provided the financial and regulatory framework necessary for the systematic development of EMS across the United States.

**Educational Standardization:** The Department of Transportation (DOT) published the first EMT training curriculum in the early 1970s, and the American Academy of Orthopaedic Surgeons prepared and published the first EMT textbook in 1971 - "Emergency Care and Transportation of the Sick and Injured." This established the foundation for standardized EMT education that continues today.

**Evolution of Training Levels:** In the late 1970s, DOT developed a recommended National Standard Curriculum. During the 1980s, many areas enhanced the EMT curriculum by adding advanced levels of training (AEMTs) who could provide key components of advanced life support care. This created the multi-tiered system we use today.

**Modern Framework - EMS Agenda for the Future:** In the 1990s, the National Highway Traffic Safety Administration (NHTSA) developed the EMS Agenda for the Future, a comprehensive document with a plan to standardize levels of EMS education and providers. This document established 14 key components of an effective EMS system.

**Contemporary Vision - EMS Agenda 2050:** In 2019, NHTSA revised and published EMS Agenda 2050, which envisions a "people-centered" EMS system focused on comprehensive, quality, convenient care based on evidence-based clinical practices. This modern framework emphasizes preventive care, efficient well-rounded care, and comprehensive patient records that support continuity of care.

**Evidence-Based Evolution:** Today's EMS system emphasizes evidence-based medicine (EBM), which focuses on procedures that have proven useful in improving patient outcomes. Many EMS systems consult the National Model EMS Clinical Guidelines from the National Association of State EMS Officials, which are based on current research and expert consensus.`
      },
      {
        id: 'system-components',
        title: 'Components of the EMS System and Medical Direction',
        wordCount: 745,
        keyTerms: ['Medical Direction', 'Standing Orders', 'Protocols', 'Online/Offline Control', 'Quality Improvement', '911 System'],
        content: `The EMS Agenda 2050 outlines key components of an effective EMS system that work together to create a comprehensive, people-centered approach to emergency medical care.

**Public Access and Emergency Medical Dispatch:** Easy access to help in an emergency is essential, typically through the 911 system serving as the public safety access point. Trained dispatchers obtain critical information and dispatch appropriate resources while providing emergency medical dispatch (EMD) guidance. New mobile applications allow CPR-trained laypeople to be alerted to cardiac arrests in their area and locate the nearest public automated external defibrillator (AED).

**Medical Direction - The Cornerstone of EMS:** The physician medical director serves as the ongoing liaison between the medical community, hospitals, and EMTs. This physician authorizes EMTs to provide medical care in the field and ensures that appropriate care standards are maintained through comprehensive protocols and standing orders.

**Protocols and Standing Orders:** Protocols are comprehensive guides that delineate the EMT's scope of practice for specific patient complaints or conditions. Standing orders are part of protocols and designate what the EMT is required to do for specific complaints without needing to contact medical direction first. This system ensures rapid, appropriate care while maintaining medical oversight.

**Medical Control Types:** Medical control operates in two forms:
- **Off-line (Indirect) Medical Control:** Includes standing orders, training programs, quality assurance reviews, and supervision authorized by the medical director
- **Online (Direct) Medical Control:** Involves real-time physician directions given over phone or radio during patient care incidents

**Human Resources and Professional Development:** This component focuses on the people who deliver care. EMS Agenda 2050 encourages creating an environment where talented people want to work and can turn their passion into a rewarding career. This includes appropriate compensation, professional development opportunities, and career advancement pathways.

**Continuous Quality Improvement (CQI):** A systematic process that reviews and performs audits of the EMS system to identify areas for improvement and assign remedial training when necessary. CQI utilizes a plan-do-study-act cycle with the goal of minimizing errors and improving patient outcomes. This process is essential for maintaining high standards of care and identifying opportunities for system enhancement.

**Patient Safety Initiatives:** Modern EMS systems focus on minimizing medical errors that can result from rules-based failures, knowledge-based failures, or skill-based failures. Patient safety requires coordinated efforts from both EMS agencies and individual EMS personnel, emphasizing a culture of safety and continuous improvement.

**Integration of Health Services:** Prehospital care should seamlessly continue in the emergency department to ensure comprehensive continuity of care. This integration includes effective communication, proper documentation, and coordinated treatment plans that bridge prehospital and hospital care.

**Mobile Integrated Healthcare (MIH) and Community Paramedicine:** MIH represents a method of delivering healthcare that utilizes the prehospital spectrum to provide care within the community rather than solely at physician offices or hospitals. Community paramedicine involves experienced paramedics receiving advanced training to provide additional services including health evaluations, chronic illness monitoring, laboratory sample collection, and immunization administration.

**Information Systems and Documentation:** Computer systems are used to document patient care electronically, and this stored information can be analyzed to improve care quality, identify trends, and support evidence-based decision making. Proper documentation is crucial for continuity of care, quality improvement, and legal protection.`
      }
    ],
    practiceQuestions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'According to the National EMS Education Standards, which document published in 1966 led to the development of modern EMS systems?',
        options: [
          'The Emergency Medical Services Act',
          'Accidental Death and Disability: The Neglected Disease of Modern Society',
          'EMS Agenda for the Future',
          'The EMT National Standard Curriculum'
        ],
        correct: 1,
        explanation: 'The 1966 publication "Accidental Death and Disability: The Neglected Disease of Modern Society," known as "The White Paper," exposed major deficiencies in prehospital emergency care and catalyzed the development of modern EMS systems.'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Which of the four EMT training levels requires approximately 150-200 hours of training and serves as the foundation level of EMS practice?',
        options: [
          'Emergency Medical Responder (EMR)',
          'Emergency Medical Technician (EMT)',
          'Advanced Emergency Medical Technician (AEMT)',
          'Paramedic'
        ],
        correct: 1,
        explanation: 'EMT is the foundation level requiring approximately 150-200 hours of comprehensive training, providing core competencies for basic life support and patient transport.'
      },
      {
        id: 'q3',
        type: 'multiple-choice',
        question: 'What is the primary role of a physician medical director in the EMS system?',
        options: [
          'To respond to emergency calls with EMTs',
          'To serve as the ongoing liaison between the medical community and EMTs',
          'To operate the 911 dispatch center',
          'To perform quality improvement audits exclusively'
        ],
        correct: 1,
        explanation: 'The physician medical director serves as the ongoing liaison between the medical community, hospitals, and EMTs, authorizing EMTs to provide medical care and ensuring appropriate care standards.'
      },
      {
        id: 'q4',
        type: 'multiple-choice',
        question: 'According to EMS Agenda 2050, what is the primary focus of the modern EMS system vision?',
        options: [
          'Provider-centered emergency response',
          'People-centered comprehensive care',
          'Hospital-centered transport system',
          'Technology-centered medicine'
        ],
        correct: 1,
        explanation: 'EMS Agenda 2050 envisions a "people-centered" EMS system focused on comprehensive, quality, convenient care based on evidence-based clinical practices.'
      },
      {
        id: 'q5',
        type: 'multiple-choice',
        question: 'Which type of medical control involves real-time physician directions given over phone or radio during patient care?',
        options: [
          'Off-line (Indirect) Medical Control',
          'Online (Direct) Medical Control',
          'Standing Orders',
          'Protocol-based Control'
        ],
        correct: 1,
        explanation: 'Online (Direct) Medical Control involves real-time physician directions given over phone or radio during patient care incidents, providing immediate medical oversight.'
      },
      {
        id: 'q6',
        type: 'multiple-choice',
        question: 'What does the acronym CQI stand for in the context of EMS systems?',
        options: [
          'Continuous Quality Improvement',
          'Certified Quality Instructor',
          'Clinical Quality Index',
          'Critical Quality Initiative'
        ],
        correct: 0,
        explanation: 'CQI stands for Continuous Quality Improvement, a systematic process that reviews and performs audits of the EMS system to identify areas for improvement and assign remedial training when necessary.'
      },
      {
        id: 'q7',
        type: 'multiple-choice',
        question: 'According to the Americans with Disabilities Act (ADA), which statement about EMT employment is correct?',
        options: [
          'Individuals with disabilities cannot serve as EMTs',
          'Qualified individuals with disabilities who can perform essential job functions may serve as EMTs',
          'Only physical disabilities are protected under the ADA',
          'EMT positions are exempt from ADA requirements'
        ],
        correct: 1,
        explanation: 'The ADA protects qualified individuals with disabilities who can perform essential job functions, and employers may need to modify the work environment to ensure equal employment opportunities.'
      },
      {
        id: 'q8',
        type: 'multiple-choice',
        question: 'Which organization provides standardized certification for EMS providers across the United States?',
        options: [
          'Department of Transportation (DOT)',
          'National Highway Traffic Safety Administration (NHTSA)',
          'National Registry of Emergency Medical Technicians (NREMT)',
          'American Academy of Orthopaedic Surgeons'
        ],
        correct: 2,
        explanation: 'The National Registry of Emergency Medical Technicians (NREMT) is a non-profit organization established in 1970 that provides standardized certification for EMS providers across the United States.'
      },
      {
        id: 'q9',
        type: 'multiple-choice',
        question: 'What is the highest level of EMS practice that typically requires more than 1,000 hours of training?',
        options: [
          'Emergency Medical Responder (EMR)',
          'Emergency Medical Technician (EMT)',
          'Advanced Emergency Medical Technician (AEMT)',
          'Paramedic'
        ],
        correct: 3,
        explanation: 'Paramedic represents the highest level of EMS practice with extensive training ranging from 1,000 to more than 1,300 hours, often offered within associate\'s or bachelor\'s degree programs.'
      },
      {
        id: 'q10',
        type: 'multiple-choice',
        question: 'Under HIPAA regulations, when can patient information be shared without written consent?',
        options: [
          'Whenever requested by family members',
          'Only when treating the patient and for billing purposes',
          'With any healthcare provider in the hospital',
          'When the patient is unconscious'
        ],
        correct: 1,
        explanation: 'HIPAA allows sharing of patient information without written consent only when treating the patient and for billing purposes, ensuring patient privacy while enabling necessary care coordination.'
      },
      {
        id: 'q11',
        type: 'multiple-choice',
        question: 'Which of the following best describes the scope of practice for EMTs?',
        options: [
          'EMTs can perform any medical procedure they feel comfortable with',
          'The scope of practice defines specific skills and procedures each provider level is authorized to perform',
          'EMTs have unlimited scope as long as they have medical director approval',
          'Scope of practice varies daily based on call volume'
        ],
        correct: 1,
        explanation: 'Scope of practice outlines the specific skills and procedures each provider level is authorized to perform. A medical director can limit scope but cannot expand it beyond state law.'
      },
      {
        id: 'q12',
        type: 'multiple-choice',
        question: 'What is the primary difference between certification and licensure?',
        options: [
          'There is no difference between the two terms',
          'Certification verifies competency, licensure grants legal authority to practice',
          'Licensure is federal, certification is state-level',
          'Certification is permanent, licensure expires annually'
        ],
        correct: 1,
        explanation: 'Certification verifies that a provider has the necessary knowledge and skills, while licensure grants the legal authority to practice in a specific state or jurisdiction.'
      }
    ]
  };

  // Study session management
  useEffect(() => {
    const session: StudySession = {
      chapterId: chapterId || 'chapter1',
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentSectionData = chapterContent.sections[currentSection];
  const metrics = calculateMetrics();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/modules" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{chapterContent.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {chapterContent.estimatedReadTime}
                  </span>
                  <span className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    {chapterContent.difficulty}
                  </span>
                  {studySession && (
                    <span className="flex items-center">
                      <Play className="w-4 h-4 mr-1" />
                      {formatTime(studySession.timeSpent)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Reading Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTextToSpeech}
                className={`p-2 rounded-lg ${textToSpeech ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'} hover:bg-blue-200`}
              >
                {textToSpeech ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              
              <select 
                value={readingMode} 
                onChange={(e) => setReadingMode(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="normal">Normal Mode</option>
                <option value="focus">Focus Mode</option>
                <option value="speed">Speed Reading</option>
              </select>

              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <BarChart3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Learning Objectives */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Learning Objectives
              </h3>
              <ul className="space-y-2">
                {chapterContent.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-blue-800">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section Navigation */}
            <div className="bg-white rounded-lg border border-gray-200 mb-6">
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Section {currentSection + 1}: {currentSectionData.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {currentSectionData.wordCount} words
                    </span>
                    <div className="flex space-x-1">
                      {chapterContent.sections.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSection(index)}
                          className={`w-3 h-3 rounded-full ${
                            index === currentSection ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div 
                ref={contentRef}
                className="px-6 py-6 prose max-w-none"
                onMouseUp={handleTextSelection}
                style={{
                  fontSize: readingMode === 'speed' ? '18px' : '16px',
                  lineHeight: readingMode === 'focus' ? '2' : '1.6'
                }}
              >
                <div className="text-gray-800 leading-relaxed">
                  {currentSectionData.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Key Terms */}
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Key Terms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentSectionData.keyTerms.map((term, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-medium"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section Navigation */}
              <div className="border-t border-gray-200 px-6 py-4 flex justify-between">
                <button
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>
                
                <button
                  onClick={() => setShowQuickQuiz(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Quick Check
                </button>

                <button
                  onClick={() => setCurrentSection(Math.min(chapterContent.sections.length - 1, currentSection + 1))}
                  disabled={currentSection === chapterContent.sections.length - 1}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Study Progress */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Section Progress</span>
                    <span>{currentSection + 1}/{chapterContent.sections.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentSection + 1) / chapterContent.sections.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {studySession && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Time Spent</span>
                      <span className="text-sm font-medium">{formatTime(studySession.timeSpent)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Highlights</span>
                      <span className="text-sm font-medium">{studySession.highlightsMade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Notes</span>
                      <span className="text-sm font-medium">{studySession.notesCreated}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Study Metrics */}
            {showAnalytics && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Study Analytics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Reading Speed</span>
                    <span className="text-sm font-medium">{metrics.readingSpeed} WPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Engagement</span>
                    <span className={`text-sm font-medium capitalize ${
                      metrics.engagementLevel === 'high' ? 'text-green-600' :
                      metrics.engagementLevel === 'medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {metrics.engagementLevel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Focus Time</span>
                    <span className="text-sm font-medium">{formatTime(metrics.focusTime)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Notes */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Quick Notes
              </h3>
              <div className="space-y-3">
                {studyNotes.slice(-3).map((note) => (
                  <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-800">{note.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {note.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                ))}
                <button 
                  onClick={() => {
                    const content = prompt('Add a note:');
                    if (content) addStudyNote(content);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  + Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text Selection Toolbar */}
      {selectedText && (
        <div 
          className="fixed bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50 flex space-x-2"
          style={{ left: selectionPosition.x, top: selectionPosition.y }}
        >
          <button onClick={() => addHighlight('yellow')} className="p-1 bg-yellow-200 rounded">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
          </button>
          <button onClick={() => addHighlight('blue')} className="p-1 bg-blue-200 rounded">
            <div className="w-4 h-4 bg-blue-400 rounded"></div>
          </button>
          <button onClick={() => addHighlight('green')} className="p-1 bg-green-200 rounded">
            <div className="w-4 h-4 bg-green-400 rounded"></div>
          </button>
          <button 
            onClick={() => {
              const content = prompt('Add note for this text:');
              if (content) addStudyNote(`"${selectedText}" - ${content}`);
              setSelectedText('');
            }}
            className="p-1 bg-gray-200 rounded"
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick Quiz Modal */}
      {showQuickQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Quick Comprehension Check</h3>
            <p className="text-gray-600 mb-4">Test your understanding of this section</p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowQuickQuiz(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                Skip for Now
              </button>
              <button 
                onClick={() => setShowQuickQuiz(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedStudyChapter;
