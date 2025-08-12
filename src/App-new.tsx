
// Complete ProMedix EMS Training Platform - Production Ready  
// Force rebuild timestamp: 2025-08-12 Disclaimer deployment fix
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import {
  Home, BookOpen, Heart, Activity, Calculator, CheckSquare, List, AlertTriangle,
  Settings, Search, Stethoscope, Truck, ClipboardList, Zap, Thermometer, Users,
  Award, TrendingUp, ChevronRight, Clock, Brain, FileText, Play, Target,
  CheckCircle, Star, BarChart3, MessageCircle, Mic, Eye, BookmarkIcon,
  Filter, Bell, User, Download, Plus, Minus, Shield, Baby, Wrench, HelpCircle,
  Menu, ChevronDown, AlertCircle, MessageSquare, MicOff, X
} from 'lucide-react';
import EMTBNavigation from './components/emtb/EMTBNavigation';
import { AuthProvider, RequireRole, useAuth } from './auth/AuthContext';
import LoginPage from './auth/LoginPage';
import InstructorDashboard from './auth/InstructorDashboard';
import EMTBFlashcards from './components/emtb/EMTBFlashcards';
import EMTBStudyNotesFixed from './components/emtb/EMTBStudyNotesFixed';
import EMTBStudyNotesNew from './components/emtb/EMTBStudyNotesNew';
import EMTBStudyNotesClean from './components/emtb/EMTBStudyNotesClean';
import TestStudyNotes from './components/emtb/TestStudyNotes';
import EMSChatbot from './components/EMSChatbot';
import SimpleTestHeader from './SimpleTestHeader';
import MedicalDisclaimer from './components/MedicalDisclaimer';
import DisclaimerPage from './components/DisclaimerPage';
import { clinicalCalculators } from './data/clinical-calculators';
import { medicationSimulations } from './data/medication-simulations';
import { searchEngine } from './utils/search';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  return (
    <main className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-gray-600">Welcome{user?.name ? `, ${user.name}` : ''}. Track progress, join quizzes, and continue learning.</p>
      </div>
    </main>
  );
}

// Complete EMT-B Module Structure with All 41 Chapters (Modules 1–14 only)
// Human Body Systems is treated as a separate Bonus module below
const moduleStructure = [
  {
    id: 1,
    title: "Foundations of EMS Practice",
    description: "Core EMS principles and professional foundations",
    color: "blue",
    icon: BookOpen,
    chapters: [
      { id: 1, title: "EMS Ecosystem Essentials", duration: "45 min", completed: true },
      { id: 2, title: "Safety Protocols for Responders", duration: "30 min", completed: true },
      { id: 3, title: "Legal Frameworks in Emergency Care", duration: "40 min", completed: false },
      { id: 4, title: "Documentation & Field Reporting", duration: "35 min", completed: false }
    ]
  },
  {
    id: 2,
    title: "Clinical Fundamentals",
    description: "Human body systems and Essential Terminology for Responders",
    color: "green",
    icon: Brain,
    chapters: [
      { id: 5, title: "Essential Terminology for Responders", duration: "25 min", completed: false },
      { id: 6, title: "Body Systems for Emergency Care", duration: "60 min", completed: false },
      { id: 7, title: "Lifespan Considerations in EMS", duration: "20 min", completed: false },
      { id: 8, title: "Safe Transport Techniques", duration: "45 min", completed: false },
      { id: 9, title: "Healthcare Team Dynamics", duration: "15 min", completed: false }
    ]
  },
  {
    id: 3,
    title: "Clinical Assessment",
    description: "Systematic patient evaluation and documentation",
    color: "purple",
    icon: Stethoscope,
    chapters: [
      { id: 10, title: "Comprehensive Patient Assessment", duration: "50 min", completed: false }
    ]
  },
  {
    id: 4,
    title: "Critical Interventions",
    description: "Airway assessment and intervention techniques",
    color: "red",
    icon: Activity,
    chapters: [
      { id: 11, title: "Airway Management Techniques", duration: "55 min", completed: false }
    ]
  },
  {
    id: 5,
    title: "Medication Management",
    description: "EMT-B medication administration principles",
    color: "indigo",
    icon: HelpCircle,
    chapters: [
      { id: 12, title: "Medication Administration Essentials", duration: "40 min", completed: false }
    ]
  },
  {
    id: 6,
    title: "Circulatory Emergencies",
    description: "Shock recognition and basic life support",
    color: "yellow",
    icon: Zap,
    chapters: [
      { id: 13, title: "Shock Recognition & Response", duration: "35 min", completed: false },
      { id: 14, title: "BLS Resuscitation Protocols", duration: "50 min", completed: false }
    ]
  },
  {
    id: 7,
    title: "Acute Medical Emergencies",
    description: "Respiratory and Cardiovascular Emergency Response",
    color: "pink",
    icon: Heart,
    chapters: [
      { id: 15, title: "Medical Overview Essentials", duration: "30 min", completed: false },
      { id: 16, title: "Respiratory Emergencies Essentials", duration: "45 min", completed: false },
      { id: 17, title: "Cardiovascular Emergency Response", duration: "50 min", completed: false }
    ]
  },
  {
    id: 8,
    title: "Systemic Disorders",
    description: "Neurologic and systemic emergencies",
    color: "cyan",
    icon: Brain,
    chapters: [
      { id: 18, title: "Brain & Nerve Emergencies", duration: "40 min", completed: false },
      { id: 19, title: "GI/GU Crisis Intervention", duration: "35 min", completed: false },
      { id: 20, title: "Endocrine and Hematologic Emergencies Essentials", duration: "40 min", completed: false }
    ]
  },
  {
    id: 9,
    title: "Specialized Emergency Care",
    description: "Allergic reactions and toxicological emergencies",
    color: "orange",
    icon: AlertTriangle,
    chapters: [
      { id: 21, title: "Allergy & Anaphylaxis Response", duration: "30 min", completed: false },
      { id: 22, title: "Toxicology Emergencies", duration: "40 min", completed: false },
      { id: 23, title: "Behavioral Emergency Protocols", duration: "35 min", completed: false },
      { id: 24, title: "Gynecologic Emergencies Essentials", duration: "25 min", completed: false }
    ]
  },
  {
    id: 10,
    title: "Trauma Fundamentals",
    description: "Basic trauma assessment and hemorrhage control",
    color: "red",
    icon: Shield,
    chapters: [
      { id: 25, title: "Trauma Overview Essentials", duration: "40 min", completed: false },
      { id: 26, title: "Bleeding Emergencies Essentials", duration: "35 min", completed: false },
      { id: 27, title: "Soft-Tissue Injuries Essentials", duration: "45 min", completed: false }
    ]
  },
  {
    id: 11,
    title: "Traumatic Injuries",
    description: "Head, neck, and chest trauma management",
    color: "emerald",
    icon: Eye,
    chapters: [
      { id: 28, title: "Face & Neck Injury Response", duration: "35 min", completed: false },
      { id: 29, title: "Head & Spinal Cord Injuries", duration: "50 min", completed: false },
      { id: 30, title: "Chest Injury Interventions", duration: "40 min", completed: false }
    ]
  },
  {
    id: 12,
    title: "Environmental & Musculoskeletal",
    description: "Abdominal, orthopedic, and environmental trauma",
    color: "violet",
    icon: Wrench,
    chapters: [
      { id: 31, title: "Abdominal and Genitourinary Injuries Essentials", duration: "35 min", completed: false },
      { id: 32, title: "Orthopedic Injuries Essentials", duration: "45 min", completed: false },
      { id: 33, title: "Environmental Emergencies Essentials", duration: "40 min", completed: false }
    ]
  },
  {
    id: 13,
    title: "Special Populations",
    description: "Pediatric, geriatric, and special needs patients",
    color: "rose",
    icon: Baby,
    chapters: [
      { id: 34, title: "Obstetrics and Neonatal Care Essentials", duration: "45 min", completed: false },
      { id: 35, title: "Pediatric Emergencies Essentials", duration: "50 min", completed: false },
      { id: 36, title: "Elderly Patient Management", duration: "40 min", completed: false },
      { id: 37, title: "Patients with Unique Needs", duration: "30 min", completed: false }
    ]
  },
  {
    id: 14,
    title: "Operational Excellence",
    description: "EMS operations and Emergency Scene Management",
    color: "slate",
    icon: Truck,
    chapters: [
      { id: 38, title: "Patient Movement Operations", duration: "35 min", completed: false },
      { id: 39, title: "Vehicle Extrication & Technical Rescue", duration: "40 min", completed: false },
      { id: 40, title: "Emergency Scene Management", duration: "35 min", completed: false },
      { id: 41, title: "Terrorism & Mass Casualty Incidents", duration: "40 min", completed: false }
    ]
  }
];

// Bonus Module (not counted toward 14 modules / 41 chapters)
const bonusModule = {
  id: 15,
  title: "Human Body Systems",
  description: "Systems overview with EMT‑B clinical relevance and quick cross‑references",
  color: "teal",
  icon: ClipboardList,
  chapters: [
    { id: 42, title: "Human Body Systems Overview", duration: "30 min", completed: false },
    { id: 43, title: "Cardiovascular System Essentials (EMT‑B)", duration: "40 min", completed: false },
    { id: 44, title: "Respiratory System Essentials (EMT‑B)", duration: "40 min", completed: false },
    { id: 45, title: "Nervous System Essentials (EMT‑B)", duration: "40 min", completed: false },
    { id: 46, title: "Musculoskeletal System & Trauma Basics", duration: "35 min", completed: false },
    { id: 47, title: "Integumentary System & Wound Care", duration: "25 min", completed: false },
    { id: 48, title: "Gastrointestinal System & Abdominal Assessment", duration: "30 min", completed: false },
    { id: 49, title: "Genitourinary/Renal System & Fluids", duration: "30 min", completed: false },
    { id: 50, title: "Endocrine System & Glucose Emergencies", duration: "30 min", completed: false },
    { id: 51, title: "Immune & Lymphatic Systems (Allergy/Anaphylaxis)", duration: "30 min", completed: false }
  ]
} as const;

// Complete Chapter 1 Content - Fully Integrated
const chapter1Content = `# Chapter 1: EMS Ecosystem Essentials

## Introduction to Emergency Medical Services (EMS)

EMS is an exciting field to join as an Emergency Medical Technician (EMT). EMS is a team of healthcare workers who provide emergency care and transportation to people who are sick or hurt. The kindness, skill, and professional attitude of an EMT can greatly help every patient.

## Levels of EMS Practice and Education Standards

The National Emergency Medical Service Scope of Practice Model describes four levels of EMS practice. The National Emergency Medical Service Education Standards explain the knowledge and skills taught at each of these four levels. This training provides everything needed to become a good entry-level EMT.

**Education must continue throughout an EMS career** to improve knowledge, skills, and to adapt to changes in healthcare.

## Certification and Licensure for EMS Providers

**Certification** checks if a provider has the necessary knowledge and skills for safe emergency care. Exams often include multiple-choice questions, skill tests, and pretend emergency calls. These exams are run by a state or military group, or by the **National Registry of Emergency Medical Technicians (NREMT)**.

The NREMT is a non-profit group that checks the knowledge and skills needed for good EMS practice. Most states require NREMT Certification to get a license to practice. Every five years, the NREMT surveys EMS providers to understand current real-world practices. In 2019, they also used data from the National Emergency Medical Service Information System to see actual types of calls and treatments. This helps them decide what EMTs need to know to give safe and effective care. The NREMT uses this information to create test plans for certification exams.

After passing certification, a provider can usually get **licensure**, which is the legal right to practice in their state. Getting a license does not mean an EMT can practice without limits.

## Credentialing and Scope of Practice

**Credentialing** is checking a healthcare provider's qualifications. This process can happen locally or regionally and is usually managed by a **physician Medical Director**. Sometimes, EMTs are given special permission to do fewer or more medical tasks, or to work in certain healthcare systems.

## Four Licensure Levels in Emergency Medical Care

Most states categorize emergency medical care workers into four main levels:

**Emergency Medical Responder (EMR)**: Has basic training to manage emergency scenes and provide immediate life-saving care before an ambulance arrives.

**Emergency Medical Technician (EMT)**: Has more training in basic emergency care and transport of sick and injured patients. They focus on stabilizing the scene and providing basic emergency care. EMTs are the main link between the emergency scene and the healthcare system.

**Advanced Emergency Medical Technician (AEMT)**: Has extra training beyond the EMT level, including advanced life support like IVs, advanced Airway Management Techniques, and giving certain medicines.

**Paramedic**: Has the most education and training among emergency care providers. Their training focuses on advanced life support, like reading heart rhythms, advanced Airway Management Techniques, and emergency medications. Paramedics work with other EMS providers under medical direction to help extend healthcare services.

## State and National Guidelines for Pre-hospital Care

Rules for pre-hospital emergency care are set by each state's laws, often managed by a State Office of EMS. Most state training and license rules meet or go beyond the guidelines from the National Highway Traffic Safety Administration (NHTSA) EMS Education Standards.

This textbook covers practices and skills from the NHTSA National EMS Education Standards and the 2019 NHTSA National EMS Scope of Practice Model. The goal is to apply this knowledge to be an effective emergency responder.

## Effective Learning Strategies for EMT Students

**It is crucial to read assigned materials before each class**. Just attending class is not enough to prepare you. Classes build on previous information, so reading helps understand later lessons. Your instructor will review readings, answer questions, and explain confusing points. **Take notes before class** to get the most out of discussions.

EMT programs include various learning activities:
- Case Presentations
- Question and Answer Sessions
- Small Group Debates and Discussions
- Hands-on Skills Practice with Feedback
- Patient Care Scenarios and Simulations
- Clinical Experience in real EMS and hospital care

These activities help you apply information, not just memorize it.

## Key Areas of EMT Training Focus

EMT training covers several main subjects that form the foundation of emergency medical care. Scene Size-Up involves understanding the situation, checking for safety threats, deciding if it's safe to go forward, determining if more help is needed, and identifying the first steps to handle the emergency effectively.

Comprehensive Patient Assessment requires using knowledge of the body and diseases to figure out what is wrong with the patient and find life-threatening issues. This systematic approach ensures no critical conditions are missed during the initial evaluation.

Treatment focuses on identifying patient care needs and prioritizing them appropriately, such as helping with breathing difficulties, stopping bleeding through proper management techniques, or assisting with emergency childbirth. EMTs also learn specialized skills to help patients who are experiencing emotional distress during medical emergencies.

Transport involves learning how to safely move patients with different illnesses and injuries to a hospital, clinic, or other appropriate medical facility while maintaining their condition and comfort throughout the journey.

## EMS as a Career and Licensure Requirements

Most people become EMTs to help others, drawn to the meaningful work of providing emergency medical care to those in need. However, it is important to learn how to take care of yourself to have a long, healthy career in EMS, as the physical and emotional demands of the profession require proper self-care and stress management.

General requirements to be licensed as an EMT include obtaining a high school diploma or equivalent, providing proof of immunizations against certain diseases, and passing a background check and drug screening. Additional requirements include maintaining a valid driver's license, completing a recognized basic life support or CPR course, and finishing a state-approved EMT course. Candidates must also pass state-recognized written and practical certification exams, which are often administered through the NREMT, and follow other state, local, and employer rules.

The Americans with Disabilities Act of 1990 (ADA) protects people with disabilities from being denied access to state or local government programs and services, and requires employers to offer equal employment opportunities. Employers must make reasonable accommodations to consider disabled candidates and modify work environments when possible, allowing EMTs with disabilities to work effectively if they can perform essential job skills with reasonable assistance.

Most states have established rules preventing people with certain legal issues, such as specific types of misdemeanors or felonies, from becoming EMS providers, as public safety and trust are essential components of emergency medical services.

## History and Evolution of EMS Ecosystem Essentials

EMS has a long history of people helping others. Early care included volunteer ambulances in World War I and military corpsmen in World War II. The Korean War saw field medics and helicopter evacuations to Mobile Army Surgical Hospital units. Advances in trauma care came from the Korean and Vietnam Wars.

In the 1960s, emergency ambulance services varied widely; some were good, while others used funeral home hearses or police station wagons. Many places had no formal pre-hospital care, and patients were often taken to the hospital by family or neighbors.

Modern EMS started in **1966 with the report "Accidental Death and Disability, the neglected disease of modern society,"** which showed major problems in pre-hospital care. This led to federal agencies like the NHTSA and the Department of Health, Education, and Welfare (now Health and Human Services) creating laws and funding for better EMS Ecosystem Essentials.

The **Department of Transportation (DOT)** developed the first EMT training curriculum in the early 1970s. The first EMT textbook, **"Emergency Care and Transportation of the Sick and Injured,"** was published in 1971. Throughout the 1970s, states created laws and EMS expanded, and emergency medicine became a recognized medical specialty.

In the 1980s, advanced EMTs were added to provide more advanced life support. As EMS grew, the definitions of providers began to differ between states, causing inconsistencies. In the 1990s, the NHTSA created the **Emergency Medical Service Agenda for the Future** to standardize EMS education and providers for more consistent care nationwide. In 2019, this document was revised and published as **Emergency Medical Service Agenda 2050**.

## Components of the EMS System: Oversight and Guidelines

At the federal level, the NHTSA creates the **National EMS Scope of Practice Model**, which sets minimum skill guidelines for each EMS provider level. States then pass laws to regulate how EMS providers operate, enforced by state EMS administrative offices.

Local **Medical Directors** oversee and support EMS personnel. They have input on daily operations, like medications carried or where patients are transported. **A Medical Director can limit an EMT's Scope of Practice, but cannot expand it beyond state law**. Expanding scope requires state approval.

## Public Basic Life Support and Immediate Aid

Many untrained people are now trained in Basic Life Support (BLS) or CPR. They also take first aid courses, like "Stop the Bleed," to provide immediate care before EMTs arrive.

A big development is the rise of **Automated External Defibrillators (AEDs)** in public places for use by anyone. These devices can detect and treat life-threatening heart rhythms.

EMTs often meet people at scenes who want to help, including trained first-aiders, doctors, nurses, or others. These people can be helpful, but sometimes they can interfere or create problems. It's an EMT's job to identify these people during scene size-up and manage their assistance.

## Training Hours and Responsibilities for Each EMS Level

EMS courses are competency-based, meaning they teach students to apply knowledge and skills to meet minimum performance standards established by educational and certification bodies. Training hours vary significantly by state and program, reflecting different regional needs and educational approaches.

Emergency Medical Responder (EMR) programs typically require an estimated 50 to 80 hours of training. This level focuses on providing immediate care with limited equipment before an ambulance arrives at the scene. EMRs are trained to assist EMTs upon their arrival and help bridge the gap between initial emergency response and professional EMS care.

Emergency Medical Technician (EMT) programs require an estimated 150 to 200 hours of comprehensive training. At this level, practitioners assume responsibility for comprehensive patient assessment, emergency care delivery, patient packaging, and safe transport to the emergency department. EMTs serve as the primary care providers in many emergency situations.

Advanced Emergency Medical Technician (AEMT) training ranges between 200 and 400 hours, building upon EMT knowledge with additional advanced life support skills. This includes training on intravenous therapy, advanced airway management tools, and administration of certain medications. AEMTs help fill critical gaps in areas where Paramedic coverage may be limited.

Paramedic training represents the most extensive level of EMS education, with courses ranging from 1,000 to over 2,000 hours, including both classroom instruction and hands-on clinical internships. This comprehensive training is increasingly offered as part of associate's or bachelor's degree programs to ensure thorough preparation for complex medical scenarios.

## Vision and Guiding Principles of EMS Agenda 2050

EMS Agenda 2050 represents a comprehensive national review designed to create a more unified and consistent EMS system across the United States. Its vision centers on developing a "people-centered" EMS system where patients receive high-quality care that is both comfortable and convenient, based on sound research and evidence-based practices. This system focuses on reducing suffering and improving patient outcomes, not just implementing life-saving interventions.

The agenda aims for EMS to be fully integrated into the larger healthcare system, with an emphasis on preventing injuries and illnesses before they occur. The key guiding principles establish that the system should be safe and effective, designed specifically to prevent injury, infection, illness, and unnecessary stress for both patients and providers.

The system must be integrated and seamless, fully connected with other healthcare and emergency services to ensure continuity of care. It should be reliable and prepared, consistently providing compassionate care guided by current research and best practices. Social equity is essential, ensuring that care access and quality are not determined by factors such as age, wealth, gender, ethnicity, or geographic location.

Finally, the system must be sustainable and efficient, operating in a fiscally responsible manner that provides value, minimizes waste, and maximizes accountability to the communities served. It should also be adaptable and innovative, evolving continuously to meet changing healthcare needs by evaluating and implementing new tools, techniques, and educational approaches.

## Public Access to Emergency Services

Easy access to help is vital, usually by dialing **911** in most places. At the **Public Safety Access Point (PSAP)**, trained dispatchers gather information, send out emergency units, and give callers instructions. Enhanced 911 systems show the caller's address. Some centers have special equipment for people with speech or hearing disabilities to communicate via text.

**Mobile apps** are now used to alert trained CPR providers about cardiac arrests nearby and show AED locations. **Emergency Medical Dispatch** helps dispatchers give callers important instructions until EMS arrives.

Dispatchers relay all relevant information to responding crews, but cannot see the scene directly, so the reality may differ from dispatch info. Based on caller information, the dispatcher activates the right parts of the emergency system.

Over half of EMS support comes from government groups (fire agencies, other government agencies). Private services provide about a quarter. Other types include hospital-based and Native American tribal services.

## Human Resources in EMS

This part of EMS deals with the people who provide care. One goal of EMS Agenda 2050 is to make EMS a rewarding career for talented people. Efforts are being made to help EMS providers move between states more easily.

The National EMS Scope of Practice Model helps create consistent definitions for each EMS provider level. **National Registry Certification often helps with getting a license in other states**. The Interstate Commission for EMS Personnel Practice allows providers from member states to work short-term or sometimes in other member states under specific rules.

## Medical Direction and Control in EMS

Every EMS system has a **physician Medical Director** who allows EMTs to provide medical care in the field. The Medical Director sets the appropriate care for injuries and illnesses, described in **written standing orders and protocols**.

**Standing orders** are part of protocols that tell EMTs what to do for specific complaints without needing to ask for permission. The Medical Director is the link between the medical community, hospitals, and EMS workers. They approve continuing education and training for EMTs.

**Medical control** can be **offline (indirect)** or **online (direct)**:

**Online medical control** means direction given over phone or radio directly from the Medical Director or a designated physician (like a hospital doctor). This physician may confirm or change treatment plans.

**Offline medical control** includes standing orders, training, and supervision authorized by the Medical Director.

EMTs must follow the protocols their Medical Director sets.

## Legislation, Regulation, and System Integration

State laws and regulations govern EMS training, protocols, and practices. **The state EMS office** approves and regulates all EMS training centers, courses, instructors, and providers. This office often gets advice from a committee of EMS representatives, Medical Directors, and others.

Locally, each EMS system works in a specific area, providing pre-hospital care and transport. Most services have written rules and policies that EMTs are expected to follow.

**Integration of health services** means that the care given before the hospital (pre-hospital care) is connected with the care given at the hospital. When an EMT brings a patient to the emergency department, they are handing them over to another care provider. This connection helps reduce errors, increase efficiency, and ensures patients get continuous, coordinated care.

Some EMS Ecosystem Essentials work with hospitals to improve results for time-sensitive conditions like heart attacks and strokes. For example, Paramedics alert the hospital about a heart attack, and the hospital team gets ready.

## Mobile Integrated Healthcare and Community Paramedicine

**Mobile Integrated Healthcare (MIH)** is a way to deliver healthcare in the community, aiming for better access and lower costs. In MIH, healthcare is provided outside of a doctor's office or hospital by a team of professionals, including EMS providers, who connect patients with other resources like social services.

This model helps people in communities with few medical resources, or those who are homebound or disabled. **Community Paramedicine** is a growing field where experienced Paramedics get extra training to provide services in the community.

These services can go beyond typical patient care, including health check-ups, monitoring long-term illnesses, taking lab samples, giving shots, and advocating for patients.

## Information Systems and Evaluation in EMS

Information systems help EMS providers efficiently record the care they give. This electronic information can be used to improve care by answering questions like how many chest pain patients a department sees or the average time spent at trauma scenes.

Information is used for many purposes:
- Creating educational sessions for departments
- Justifying hiring more staff
- Guiding purchases of new equipment and continuing education
- Combining with hospital data to see patient outcomes

Data from the National Emergency Medical Service Information System (NEMSIS) helps plan for current and future EMS needs.

**Evaluation** ensures high-quality care is provided:
- The state EMS office and Licensing Bureau ensure only qualified providers are licensed
- The Medical Director maintains quality control
- Chief officers and supervisors ensure quality care under their watch
- Each EMS provider is responsible for their own high-quality care

A **"just culture"** promotes learning and accountability instead of shame and blame for errors. Agencies identify risks and design systems for safety, building trust and encouraging error reporting.

**Continuous Quality Improvement (CQI)** is a process where team members ask how they can do better. It's a proactive way to develop, use strengths, and fix challenges. CQI is important in high-consequence fields like EMS to prevent failures.

High reliability organizations have teamwork, a safety culture, and commitment to CQI. CQI uses information to improve performance and efficiency through a **Plan-Do-Study-Act (PDSA) cycle**:

- **Plan**: Gather and analyze information to get ideas for improvement
- **Do**: Put these ideas into action
- **Study**: Evaluate the changes that resulted
- **Act**: If positive, a larger part of the EMS system adopts the change

CQI is about learning and improving, not just punishing problems.

## Patient Safety and Error Reduction

Evaluation also helps find ways to reduce human error and improve patient safety. Errors can happen at any point during a call and can harm patients, the public, and EMTs. Errors are not always unavoidable; understanding them can help reduce or stop them.

Errors can come from three sources:
- **Rules-based failure**: Not following rules or protocols (e.g., giving medication without permission)
- **Knowledge-based failure**: Not knowing important information (e.g., giving the wrong medication due to lack of knowledge)
- **Skills-based failure**: Equipment not working or being used correctly

Attitudes and biases can also lead to errors. Both the EMS agency and personnel must work to reduce errors. Agencies need clear protocols that all EMTs understand. The environment can cause errors; agencies should work to limit distractions, improve lighting, and organize equipment. Solutions can be simple, like ensuring flashlights are available.

**EMTs can help reduce errors** by:
- Protecting the patient from harm and giving high-quality care; **being a patient advocate**
- Asking "why am I doing this?" before performing a skill to encourage reflection
- Asking for help from partners, medical control, or supervisors if unsure
- Using **checklists and reference sheets** to avoid missing steps or information, especially when busy
- Discussing troublesome calls with partners or supervisors for learning. These discussions can lead to changes in protocols or equipment

## EMS System Finance and Provider Involvement

All EMS departments need a way to get money to keep providing care. Funding can come from taxes, fees, subscriptions, donations, grants, and fundraisers.

**EMTs affect the financial side** through proper documentation. This helps agencies with insurance claims, getting grants, and proving good practices. EMTs may need to collect insurance information, get signatures on documents like HIPAA notices, or get permission to bill insurance. These steps are vital for the EMS organization to stay open.

Healthcare billing is changing; for example, the **Emergency Triage, Treat, and Transport (ET3)** pilot program in 2020 aims to pay EMS for providing the right care at the right time, not just for transport to an emergency department. ET3 allows payments for transport to other places like urgent care centers or for treatment at the scene without transport.

## Education Systems and Continuing Learning

EMT education is led by experienced EMS educators. Most state EMS offices approve and license instructors. Paramedic programs, and future AEMT programs, must meet national standards from the Commission on Accreditation of Allied Health Education Programs (CAAHEP).

**EMTs must take responsibility for their own learning** after initial training. **Continuing education (CE)** hours are required yearly to maintain and update knowledge and skills. CE can be provided by training officers, Medical Directors, local programs, or state and national conferences. It's important to ensure CE is approved for the EMT level.

**Commitment to continuous learning** is key to being a good EMT. Skills weaken if not used regularly, like CPR. Frequent CE, refresher courses, simulations, and self-education help maintain skills and knowledge.

## Prevention and Public Education in EMS

Prevention and public education are closely linked in EMS, focusing on public health. **Public health** looks at the health needs of whole populations to prevent health problems. Healthcare in the U.S. is expensive and does not always lead to longer lives compared to other countries. The goal of public health is **prevention**.

An example of public health success is adding iodine to salt to prevent goiter. EMS works with public health on **primary** and **secondary prevention**:

**Primary prevention** aims to stop an event from happening (e.g., vaccinations preventing polio, community programs on pool safety, car seat installation, or fall prevention for older adults). EMTs can teach first aid and CPR.

**Secondary prevention** aims to lessen the effects of an event that has already happened (e.g., helmets and seat belts preventing serious injuries in accidents). Changes in guardrail construction are another example.

EMTs also help with **surveillance of illnesses and injuries** by gathering data from calls. This data helps local governments improve dangerous intersections or prevent crashes. EMTs can educate the public professionally and respectfully about preventing injuries, like bike helmet use or stopping severe bleeding.

**Public education increases respect for EMS** as a vital part of healthcare, which can lead to more funding and recognition.

## EMS Research and Evidence-Based Medicine

Research and the **scientific method** help decide how EMS operates (e.g., how many ambulances are needed, whether to stabilize on scene or transport quickly). Early EMS relied on expert opinion, but modern healthcare uses **evidence-based medicine**.

Evidence-based medicine focuses on procedures proven to improve patient outcomes. Many EMS Ecosystem Essentials use the National Model EMS Clinical Guidelines, based on research and expert agreement. EMTs are involved in research by gathering data from every call. They may also participate in specific research projects, like studying oxygen levels for patients with shortness of breath.

This gathered information helps change patient care practices. Organizations like the International Liaison Committee on Resuscitation (ILCOR) and the American Heart Association (AHA) regularly update guidelines based on new medical evidence.

## Roles, Responsibilities, and Professional Attributes of an EMT

As the first healthcare professional on scene, EMTs have important roles and responsibilities. The main rule for EMS staff is to **always act in the patient's best interest**, which means being a **patient advocate**.

Patient outcomes often depend on the care provided in the field and quickly identifying patients needing transport. EMTs are responsible for everything from equipment preparation to delivering care and being a good example in the community.

**Professional attributes** include:
- Prioritizing patient care without risking self or others
- Maintaining a **professional appearance and manner** at all times
- Having an attitude that shows knowledge and dedication to serving those injured or ill
- Building confidence and easing patient anxiety through professionalism
- Performing under pressure with **composure**
- Treating patients and families with **understanding, respect, and compassion**
- Being **non-judgmental** even if patients are uncooperative, demanding, or abusive, understanding that people react poorly when under stress, hurt, or influenced by substances. Every patient deserves compassion and the best care
- Understanding that some patients call EMS for non-emergencies because it's their only way to get medical care
- Not being influenced by unprofessional attitudes of experienced but uncaring providers
- Upholding **patient confidentiality** (HIPAA); not discussing patient information with anyone except those treating the patient, or as legally required (e.g., police). Avoid gossiping about calls or patients`;

// Import protocols data
import { emsProtocols, EMSProtocol } from './data/ems-protocols';

// Complete EMT-B Medications Database
const medicationsDatabase = [
  {
    id: 1,
    name: "Oxygen",
    category: "respiratory",
    classification: "Medical Gas",
    mechanism: "Increases oxygen content in blood and tissues, improves cellular respiration",
    indications: ["Hypoxemia (SpO2 < 94%)", "Respiratory distress", "Chest pain", "Altered mental status", "Shock Recognition & Response", "Carbon monoxide poisoning"],
    contraindications: ["None in emergency situations", "Relative: COPD patients (use caution)"],
  dosing: "Titrate to maintain SpO2 94-99%; use NRB or BVM if severe distress/CO exposure",
    routes: ["Inhalation via mask, nasal cannula, or ventilation device"],
    sideEffects: ["Oxygen toxicity (rare in EMS)", "Drying of respiratory tract", "Fire hazard"],
    monitoring: ["SpO2 continuous", "Respiratory rate and effort", "Mental status", "Skin color"],
    precautions: ["Fire hazard - no smoking", "Secure tanks properly", "Check flow rates"],
  clinicalPearls: ["Oxygen is a drug—titrate to effect (SpO2 ≥ 94%)", "High-flow NRB/BVM for severe hypoxia or CO exposure", "Monitor COPD patients carefully; avoid hyperoxia"]
  },
  {
    id: 2,
    name: "Epinephrine",
    category: "cardiac",
    classification: "Sympathomimetic, Vasopressor (EMT-B Scope)",
    mechanism: "Alpha: Constricts blood vessels → ↑ BP, reduces swelling/hives; Beta: Dilates airways (stops wheezing/stridor), ↑ heart rate",
    indications: [
      "Anaphylaxis (life-threatening allergy): Difficulty breathing AND (hives/rash OR swollen lips/tongue OR hypotension SBP <100 mmHg)",
      "Cardiac arrest: ALS-level administration (not EMT-B)"
    ],
    contraindications: [
      "ABSOLUTE: None in life-threatening anaphylaxis (better to give than delay!)",
      "RELATIVE (use caution/medical direction): SBP >180 mmHg + severe headache/chest pain",
      "RELATIVE: Known severe heart disease (e.g., recent heart attack)"
    ],
    dosing: "Adults: 0.3 mg IM (EpiPen®/Auvi-Q®) or 0.3-0.5 mg manual IM (1:1000); Pediatrics (≤30 kg): 0.15 mg (Junior EpiPen®) or 0.01 mg/kg manual IM (Max 0.3 mg)",
    routes: [
      "Intramuscular (EMT-B scope) — anterolateral thigh (vastus lateralis)",
      "Autoinjector: Jab firmly, hold ≥3 seconds → massage ×10 sec",
      "Manual IM: Draw from 1 mg/mL vial (1:1000) → 22-25G needle, 5/8\"-1\" length",
      "Repeat per local protocol (often q5–10 min if symptoms persist)"
    ],
    sideEffects: [
      "Expected: Rapid heartbeat, pale skin/tremors, headache, nausea",
      "DANGER SIGNS: Severe chest pain, irregular pulse (PVCs, VTach), SBP >200 mmHg, seizures/unresponsiveness"
    ],
    monitoring: [
      "Respiratory status (wheezing, stridor, breathing difficulty)",
      "Blood pressure (watch for improvement from shock)",
      "Heart rate and rhythm (watch for dangerous arrhythmias)",
      "Skin (hives, swelling, color)",
      "Mental status improvement"
    ],
    precautions: [
      "ONLY use 1 mg/mL (1:1000) for IM - NEVER use cardiac arrest concentration (0.1 mg/mL) for anaphylaxis",
      "Discard if brown/pink or expired → epinephrine degrades with light/heat",
      "Two doses maximum in prehospital setting",
      "If 2 doses given → Load & go immediately (risk of biphasic reaction)",
      "Pediatric underdosing kills → Use appropriate weight-based dosing"
    ],
    clinicalPearls: [
      "Epi First! Rule: Anaphylaxis = Give epi IMMEDIATELY → then assist ventilations/O₂",
      "Never wait for ALS or medical direction in clear anaphylaxis",
      "Two Strikes Transport: If 2 doses given → Load & go immediately (biphasic reaction risk)",
      "Concentration KILLS: Only use 1 mg/mL (1:1000) for IM anaphylaxis",
      "Pediatric Pitfall: Underdosing kills → Use 0.15 mg autoinjector for kids 15-30 kg",
      "Infants <15 kg: Manual IM dose = 0.01 mg/kg (e.g., 0.07 mg for 7 kg infant)",
      "Vial Check: Discard if brown/pink or expired",
      "Protocol: Signs of anaphylaxis → confirm breathing difficulty + hives/swelling/↓BP → give epi IM NOW",
      "Documentation: Record exact dose, time, route, patient response, need for second dose"
    ]
  },
  {
    id: 3,
    name: "Albuterol",
    category: "respiratory",
    classification: "Beta-2 Adrenergic Agonist, Bronchodilator (EMT-B Scope)",
    mechanism: "Relaxes bronchial smooth muscle → opens airways, reduces airway resistance → ↓ wheezing, ↑ air entry",
    indications: [
      "Asthma exacerbation (wheezing + shortness of breath)",
      "Bronchospasm (e.g., allergic reaction, COPD flare)", 
      "Respiratory distress with wheezing"
    ],
    contraindications: [
      "Known severe allergy to albuterol (rare)",
      "HR > 150 bpm + chest pain/palpitations", 
      "No wheezing + severe distress (suspect upper airway obstruction!)",
      "Cardiac wheezes (CHF): Wheezing + crackles + JVD → withhold albuterol"
    ],
    dosing: "Adults: 2.5 mg in 3mL NS (nebulizer) or 4-8 puffs (MDI w/ spacer); Pediatrics: 1.25 mg in 3mL NS or 4-6 puffs",
    routes: [
      "Nebulizer: Connect O₂ at 6-8 L/min → patient inhales until dry (8-15 min)",
      "MDI + Spacer: Shake vigorously → 1 puff at a time → wait 30 sec between puffs"
    ],
    sideEffects: [
      "Expected: Tremors, mild tachycardia, nervousness, headache",
      "DANGER SIGNS: Chest pain/palpitations, HR > 180 bpm (peds), no improvement/worsening, new stridor/voice change"
    ],
    monitoring: [
      "Respiratory rate and effort", 
      "Wheezing assessment", 
      "Heart rate (watch for >150 bpm)", 
      "SpO2", 
      "Improvement after 20 min"
    ],
    precautions: [
      "Always give with supplemental O₂ (albuterol can temporarily ↓ SpO₂)",
      "Discard if cloudy → clear solution only",
      "Keep neb vials in foil pouch until use",
      "MDI requires spacer - without it, 80% less drug reaches lungs",
      "Shake MDI canister 5+ seconds before each puff"
    ],
    clinicalPearls: [
      "Wheezing ≠ Asthma Rule: Cardiac wheezes (CHF) have wheezing + crackles + JVD → withhold albuterol",
      "Anaphylaxis with wheezing: give EPI first, then albuterol",
      "No improvement after 2 doses: Load & go immediately → prepare for ALS assist",
      "Pediatric: Use small-volume nebulizer for kids → mask if <4 yrs",
      "Never delay transport for repeat dosing if patient is: cyanotic, altered mental status, speaking <3 words/breath",
      "Storage: Keep in foil pouch, discard if cloudy",
      "Repeat: If no improvement after 20 min, give 2nd dose (per protocol)"
    ]
  },
  {
    id: 4,
    name: "Aspirin",
    category: "cardiac",
    classification: "Antiplatelet Agent (EMT-B Scope)",
    mechanism: "Irreversibly blocks platelet COX-1 enzyme → prevents clot formation, reduces mortality in acute coronary syndromes (ACS)",
    indications: [
      "Cardiac chest pain with suspected acute coronary syndrome (ACS)",
      "Suspected myocardial infarction (MI)",
      "Unstable angina"
    ],
    contraindications: [
      "ABSOLUTE: Known aspirin allergy (anaphylaxis/hives)",
      "ABSOLUTE: Active gastrointestinal bleeding (hematemesis/melena)",
      "ABSOLUTE: Pediatrics <18 years (Reye's syndrome risk)",
      "RELATIVE: Severe asthma with prior aspirin-induced bronchospasm",
      "RELATIVE: Recent major surgery/trauma (↑ bleeding risk)"
    ],
    dosing: "Chewable: 162-325 mg (2-4 tablets of 81mg) OR Non-chewable: 325 mg (crush between spoons → mix with water)",
    routes: [
      "Oral - CHEWABLE PREFERRED: Chew thoroughly → swallow fragments (2x faster absorption)",
      "Oral - Non-chewable: Crush 325mg tablet in 30mL water → administer orally",
      "Time Critical: Give within 10 min of ACS recognition"
    ],
    sideEffects: [
      "Common: Mild dyspepsia, metallic taste",
      "DANGER SIGNS: Wheezing/stridor (allergy), vomiting blood, rash/hives"
    ],
    monitoring: [
      "Allergy signs (wheezing, rash, hives)",
      "GI bleeding signs (vomiting blood)",
      "Pain level improvement",
      "Vital signs stability"
    ],
    precautions: [
      "NEVER give to <18 yo (even for cardiac pain) - Reye's syndrome risk",
      "Ask: 'Ever had asthma attack or swelling after aspirin/NSAIDs?' If yes → WITHHOLD",
      "Give with sips of water (unless N/V)",
      "Avoid in patients with active epigastric pain",
      "No repeat dosing in prehospital setting",
      "Avoid enteric-coated tablets (delayed absorption)"
    ],
    clinicalPearls: [
      "Chew & Go Rule: Chewing = 2x faster absorption than swallowing whole",
      "Dosing Clarity: 'Baby aspirin' = 81mg (give 2-4 tabs), Regular strength = 325mg (give 1 tab)",
      "Allergy Safety: Ask about prior aspirin/NSAID reactions before administration",
      "GI Risk Mitigation: Give with sips of water unless nausea/vomiting present",
      "Storage: Keep in light-resistant container - discard if vinegar smell",
      "Evidence: Early aspirin in MI reduces mortality by 23% (ISIS-2 Trial) - every minute counts!",
      "Protocol: Suspected cardiac chest pain → confirm pressure >10 min + radiation + SOB/diaphoresis → give aspirin",
      "Documentation: Record exact dose, time given, chewing compliance, allergy history"
    ]
  },
  {
    id: 5,
    name: "Nitroglycerin",
    category: "cardiac",
  classification: "Vasodilator, Antianginal (AEMT/Paramedic; EMT-B may assist with patient’s Rx per protocol)",
    mechanism: "Dilates veins → ↓ Preload; Dilates arteries → ↓ Afterload; Key Effect: Reduces cardiac oxygen demand & improves coronary blood flow",
    indications: [
      "Cardiac chest pain (angina)",
      "Acute coronary syndrome (ACS)",
      "CHF with medical direction only",
      "Prophylaxis before exertion (if patient took preemptively)"
    ],
    contraindications: [
      "ABSOLUTE: SBP < 90-100 mmHg (verify per protocol)",
      "ABSOLUTE: Recent ED drugs - Sildenafil (Viagra®), Tadalafil (Cialis®), Vardenafil (Levitra®) within 24-48 hrs",
      "ABSOLUTE: Right ventricular infarction (suspect if JVD + hypotension)",
      "ABSOLUTE: Severe aortic stenosis",
      "ABSOLUTE: Head trauma/increased intracranial pressure (ICP)",
      "NEW CONTRAINDICATION: Riociguat use (pulmonary HTN drug)"
    ],
    dosing: "Standard: 0.4 mg SL tablet/spray ×1 dose; Repeat: If pain persists after 5 min → 2nd dose (0.4 mg); Max 3 doses (1.2 mg total); No relief after 3 doses → Suspect STEMI → Transport immediately!",
    routes: [
      "Sublingual tablet: Place under tongue or in buccal pouch → let dissolve",
      "Sublingual spray: Aim under tongue → avoid inhaling",
      "DO NOT let patient swallow, eat, drink, or rinse mouth × 5 min"
    ],
    sideEffects: [
      "Expected: Headache (sign it's working), flushing, transient dizziness",
      "DANGEROUS (Act Immediately): Hypotension (SBP drop >25-30 mmHg), Paradoxical bradycardia, Syncope, Cyanosis/lip bluing (methemoglobinemia risk)"
    ],
    monitoring: [
      "Blood pressure before each dose (critical)",
      "Pain level assessment q5min",
      "Heart rate and rhythm",
      "Mental status changes",
      "Signs of hypotension"
    ],
    precautions: [
      "3 Strikes Rule: 3 NTG doses + unresolved pain = immediate transport (high-risk MI)",
      "PDE-5 Inhibitor Death Risk: Confirm no ED drugs recently - ask directly: 'Any Viagra, Cialis, or Levitra in past 2 days?'",
      "Headache ≠ Stop: Treat with aspirin/acetaminophen per protocol - warn patients it's expected",
      "CHF Caution: NTG may worsen RV failure → Use only with explicit medical direction",
      "Storage: Keep in original glass bottle (light/moisture degrades) - discard if >6 mo opened"
    ],
    clinicalPearls: [
      "Onset: 1-3 min | Duration: ~30 min",
      "Potency Check: Fresh tablets cause burning/tingling under tongue",
      "Hypotension Rx: Trendelenburg position, fluid bolus (if allowed), stop NTG",
      "Tolerance Risk: Chronic users may require higher doses (follow protocol strictly)",
      "Industrial Workers: Sudden NTG withdrawal → rebound angina (ask about occupational exposure)",
      "Quick Reference Decision Tree: SBP < 100 mmHg → Withhold NTG | Chest Pain → 0.4 mg SL → Wait 5 min | No Relief → 2nd dose → Wait 5 min → 3rd dose → If still pain → Rapid Transport!",
      "Life-Threat Priority: SBP thresholds, MI recognition, ED drug interactions are absolute",
      "Documentation: Record BP before each dose, exact time given, patient response, transport decision after max doses"
    ]
  },
  {
    id: 6,
    name: "Activated Charcoal",
    category: "antidote",
    classification: "Antidote, Adsorbent",
    mechanism: "Binds toxins in GI tract, prevents absorption",
    indications: ["Oral poisoning/overdose (within 1 hour)", "Specific toxins as directed"],
    contraindications: ["Altered mental status", "Inability to swallow", "Caustic ingestion", "Hydrocarbon ingestion"],
    dosing: "Adult: 50-100g PO; Pediatric: 1-2g/kg PO (maximum 50g)",
    routes: ["Oral (mixed with water to form slurry)"],
    sideEffects: ["Nausea", "Vomiting", "Constipation", "Black stools", "Aspiration risk"],
    monitoring: ["Mental status", "Gag reflex", "Vomiting", "Respiratory status"],
    precautions: ["Only with intact gag reflex", "Risk of aspiration", "Single dose only"],
    clinicalPearls: ["Most effective within 1 hour", "Mix to milkshake consistency", "Not effective for all toxins"]
  },
  {
    id: 7,
    name: "Oral Glucose",
    category: "metabolic",
    classification: "Antihypoglycemic, Carbohydrate",
    mechanism: "Rapidly absorbed simple sugar, increases blood glucose",
    indications: ["Hypoglycemia with intact gag reflex", "Diabetic emergency with low glucose", "Altered mental status with known diabetes"],
    contraindications: ["Unconsciousness", "Inability to swallow", "Absent gag reflex"],
    dosing: "15-20g PO (1 tube glucose gel or 3-4 glucose tablets)",
    routes: ["Oral (gel, tablets, or liquid)"],
    sideEffects: ["Nausea", "Aspiration (if given inappropriately)"],
    monitoring: ["Mental status improvement", "Blood glucose (if available)", "Swallowing ability"],
    precautions: ["Ensure patient can swallow", "Position to prevent aspiration", "Monitor for improvement"],
    clinicalPearls: ["Effects seen in 10-20 minutes", "May repeat if no improvement", "Transport for definitive care"]
  },
  {
    id: 8,
    name: "Naloxone (Narcan)",
    category: "antidote",
    classification: "Opioid Antagonist",
    mechanism: "Competitive opioid receptor antagonist, reverses opioid effects",
    indications: ["Opioid overdose", "Respiratory depression from opioids", "Altered mental status with suspected opioid use"],
    contraindications: ["Known hypersensitivity (rare)"],
    dosing: "Adult: 0.4-2mg IV/IM/IN; Pediatric: 0.01mg/kg IV/IM/IN; Nasal spray: 4mg per nostril",
    routes: ["Intranasal (preferred)", "Intramuscular", "Intravenous"],
    sideEffects: ["Withdrawal symptoms", "Agitation", "Nausea/vomiting", "Hypertension", "Combativeness"],
    monitoring: ["Respiratory rate and effort", "Mental status", "Vital signs", "Return of symptoms"],
    precautions: ["Short duration (30-90 min)", "Patient may become combative", "Multiple doses may be needed"],
    clinicalPearls: ["Onset 2-5 minutes", "May precipitate withdrawal", "Transport all patients - effects wear off"]
  }
];

type Medication = typeof medicationsDatabase[number];

// Derive visible tools from clinicalCalculators (ensures only implemented calculators are listed)
const iconByCategory: Record<string, any> = {
  general: Brain,
  cardiac: Heart,
  trauma: AlertTriangle,
  pediatric: Users,
  respiratory: Thermometer
};
const colorByCategory: Record<string, string> = {
  general: 'blue',
  cardiac: 'red',
  trauma: 'orange',
  pediatric: 'green',
  respiratory: 'teal'
};
const calculatorsUI = clinicalCalculators.map((c) => ({
  id: c.id,
  name: c.name,
  description: c.description,
  icon: iconByCategory[c.category] || Calculator,
  color: colorByCategory[c.category] || 'blue'
}));

// Medication Simulations index helpers
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
function buildMedSimIndex() {
  const used = new Set<string>();
  const items = medicationSimulations.map((sim: any) => {
    const base = slugify(String(sim.id || sim.title || sim.medication || 'simulation'));
    let normId = base;
    let i = 2;
    while (used.has(normId)) {
      normId = `${base}-${i++}`;
    }
    used.add(normId);
    return { ...sim, normId };
  });
  const byId: Record<string, any> = {};
  for (const it of items) byId[it.normId] = it;
  return { items, byId };
}
const medSimIndex = buildMedSimIndex();

// Medication Simulations - List Page
const MedicationSimulationsPage: React.FC = () => {
  const [level, setLevel] = useState<string>('All');
  const [query, setQuery] = useState<string>('');
  const location = useLocation();

  // Sync from URL query params (?q=...&level=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') ?? '';
    const lv = params.get('level') ?? 'All';
    setQuery(q);
    setLevel(lv);
  }, [location.search]);

  const items = medSimIndex.items as any[];
  const filtered = items.filter((sim) => {
    const matchesLevel = level === 'All' || sim.certificationLevel === level;
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || [sim.title, sim.medication, sim.scenario]
      .filter(Boolean)
      .some((s: string) => s.toLowerCase().includes(q));
    return matchesLevel && matchesQuery;
  });

  const levels = ['All', 'EMT', 'AEMT', 'Paramedic'];

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Medication Administration Simulations</h1>
        <div className="flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, medication, scenario..."
            className="border rounded-lg px-3 py-2 w-64"
          />
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            {levels.map((lv) => (
              <option key={lv} value={lv}>{lv}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((sim) => (
          <Link key={sim.normId} to={`/med-simulations/${sim.normId}`} className="block group">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 group-hover:shadow-md transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 font-medium">{sim.certificationLevel}</span>
                <span className="text-xs px-2 py-1 rounded bg-gray-50 text-gray-700">{sim.difficulty}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{sim.title}</h3>
              <div className="text-sm text-gray-600 mb-2">Medication: <span className="font-medium">{sim.medication}</span></div>
              <div className="text-xs text-gray-500 line-clamp-3">{sim.scenario}</div>
              <div className="mt-3 text-xs text-gray-500">Steps: {sim.steps?.length ?? 0} • Time Limit: {sim.timeLimit ?? 0} min</div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center text-gray-500">No simulations match your filters.</div>
      )}
    </main>
  );
};

// Medication Simulations - Runner
const MedicationSimulationRunner: React.FC = () => {
  const { simId } = useParams();
  const navigate = useNavigate();
  const sim = simId ? (medSimIndex.byId as any)[simId] : null;

  const [stepIdx, setStepIdx] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [mistakes, setMistakes] = useState<string[]>([]);

  if (!sim) {
    return (
      <main className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-yellow-800">
          Simulation not found.
        </div>
  <div className="mt-4"><Link className="link underline" to="/med-simulations">Back to list</Link></div>
      </main>
    );
  }

  const totalSteps: number = sim.steps?.length ?? 0;
  const step = sim.steps[stepIdx];
  const maxScore = sim.steps.reduce((acc: number, s: any) => acc + (s.criticalStep ? 2 : 1), 0);

  const submitAnswer = () => {
    if (selected === null || locked) return;
    const isCorrect = selected === step.correctOption;
    const delta = step.criticalStep ? 2 : 1;
    if (isCorrect) {
      setScore((s) => s + delta);
      setCorrectCount((c) => c + 1);
    } else {
      setMistakes((m) => [...m, `${step.id}. ${step.action}`]);
    }
    setLocked(true);
  };

  const nextStep = () => {
    if (stepIdx < totalSteps - 1) {
      setStepIdx(stepIdx + 1);
      setSelected(null);
      setLocked(false);
    }
  };

  const prevStep = () => {
    if (stepIdx > 0) {
      setStepIdx(stepIdx - 1);
      setSelected(null);
      setLocked(false);
    }
  };

  const restart = () => {
    setStepIdx(0);
    setSelected(null);
    setLocked(false);
    setScore(0);
    setCorrectCount(0);
    setMistakes([]);
  };

  const percent = Math.round((score / maxScore) * 100);
  const passed = percent >= 70;

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-4">
  <button onClick={() => navigate(-1)} className="link hover:underline">← Back</button>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="px-2 py-1 rounded bg-blue-50 text-blue-700">{sim.certificationLevel}</span>
          <span className="px-2 py-1 rounded bg-gray-100">{sim.difficulty}</span>
          <span className="px-2 py-1 rounded bg-green-50 text-green-700">Score: {percent}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-5 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900">{sim.title}</h1>
            <div className="text-sm text-gray-600">Medication: <span className="font-medium">{sim.medication}</span></div>
          </div>

          {/* Progress bar */}
          <div className="px-5 pt-4">
            <div className="w-full bg-gray-100 rounded h-2 overflow-hidden">
              <div className="bg-primary h-2" style={{ width: `${((stepIdx + 1) / totalSteps) * 100}%` }} />
            </div>
            <div className="mt-2 text-xs text-gray-500">Step {stepIdx + 1} of {totalSteps}</div>
          </div>

          {/* Step content */}
          <div className="p-5">
            <div className="mb-2 text-sm text-gray-500">Action</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{step.action}</h2>
            <p className="text-gray-700 mb-4">{step.description}</p>

            <div className="space-y-2">
              {step.options.map((opt: string, idx: number) => (
                <label key={idx} className={`flex items-start gap-2 p-3 border rounded-lg cursor-pointer ${selected === idx ? 'border-blue-500 ring-1 ring-blue-200' : 'border-gray-200'} ${locked ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  <input
                    type="radio"
                    className="mt-1"
                    disabled={locked}
                    checked={selected === idx}
                    onChange={() => setSelected(idx)}
                  />
                  <div>
                    <div className="text-sm text-gray-900">{opt}</div>
                  </div>
                </label>
              ))}
            </div>

            {!locked ? (
              <button
                onClick={submitAnswer}
                disabled={selected === null}
                className="mt-4 btn btn-primary disabled:opacity-50"
              >
                Submit Answer
              </button>
            ) : (
              <div
                className={
                  `mt-4 p-3 rounded border text-sm ` +
                  (selected === step.correctOption
                    ? 'border-green-200 bg-green-50 text-green-800'
                    : 'border-red-200 bg-red-50 text-red-800')
                }
              >
                {selected === step.correctOption ? step.feedback?.correct || 'Correct' : step.feedback?.incorrect || 'Incorrect'}
                {step.rationale && (
                  <div className="mt-2 text-gray-600">Rationale: {step.rationale}</div>
                )}
                {typeof step.clinicalExplanation === 'string' && step.clinicalExplanation && (
                  <div className="mt-2 text-gray-600">Clinical: {step.clinicalExplanation}</div>
                )}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <button onClick={prevStep} disabled={stepIdx === 0} className="btn btn-ghost disabled:opacity-50">Previous</button>
              {stepIdx < totalSteps - 1 ? (
                <button onClick={nextStep} className="btn btn-primary">Next</button>
              ) : (
                <button onClick={restart} className="btn btn-primary">Restart</button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Patient data and checklist */}
        <aside className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Presentation</h3>
          <div className="text-sm text-gray-700">
            <div className="font-medium mb-1">Vitals</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-600">
              <div>HR: <span className="font-medium text-gray-900">{sim.patientPresentation?.vitals?.hr}</span></div>
              <div>BP: <span className="font-medium text-gray-900">{sim.patientPresentation?.vitals?.bp}</span></div>
              <div>RR: <span className="font-medium text-gray-900">{sim.patientPresentation?.vitals?.rr}</span></div>
              <div>SpO₂: <span className="font-medium text-gray-900">{sim.patientPresentation?.vitals?.spo2}%</span></div>
              {typeof sim.patientPresentation?.vitals?.temp !== 'undefined' && (
                <div>T: <span className="font-medium text-gray-900">{sim.patientPresentation?.vitals?.temp}°F</span></div>
              )}
            </div>

            <div className="mt-3">
              <div className="font-medium">Symptoms</div>
              <ul className="list-disc list-inside text-gray-600">
                {(sim.patientPresentation?.symptoms || []).map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            <div className="mt-3">
              <div className="font-medium">Allergies</div>
              <ul className="list-disc list-inside text-gray-600">
                {(sim.patientPresentation?.allergies || []).map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            {Array.isArray(sim.criticalActions) && sim.criticalActions.length > 0 && (
              <div className="mt-4">
                <div className="font-semibold">Critical Actions</div>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {sim.criticalActions.map((c: string, i: number) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}

            <div className="mt-4 p-3 rounded bg-gray-50 text-sm text-gray-700">
              <div>Correct: <span className="font-medium">{correctCount}</span> / {totalSteps}</div>
              <div>Weighted Score: <span className="font-medium">{score}</span> / {maxScore} ({percent}%)</div>
              <div>Status: <span className={`font-semibold ${passed ? 'text-green-700' : 'text-red-700'}`}>{passed ? 'Pass' : 'Needs Improvement'}</span></div>
            </div>

            {mistakes.length > 0 && (
              <div className="mt-3">
                <div className="font-medium">Missed Steps</div>
                <ul className="list-disc list-inside text-red-700 text-sm">
                  {mistakes.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
};

// Generic calculator runner
const CalculatorRunner = ({ calculator }: { calculator: any }) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);

  const handleChange = (input: any, raw: string | boolean) => {
    if (input.type === 'number') {
      const num = raw === '' ? '' : Number(raw);
      setValues((v) => ({ ...v, [input.id]: isNaN(num as number) ? 0 : num }));
    } else if (input.type === 'select') {
      // Preserve original option value type (number|string)
      const opt = (input.options || []).find((o: any) => String(o.value) === String(raw));
      setValues((v) => ({ ...v, [input.id]: opt ? opt.value : raw }));
    } else if (input.type === 'checkbox') {
      setValues((v) => ({ ...v, [input.id]: !!raw }));
    }
  };

  const onCalculate = () => {
    try {
      const r = calculator.calculate(values);
      setResult(r);
    } catch (e) {
      console.error('Calculation error', e);
      setResult({ interpretation: 'Calculation error. Check inputs.' });
    }
  };

  const riskBadge = (risk?: string) => {
    const color = risk === 'very-high' ? 'bg-red-100 text-red-700' :
      risk === 'high' ? 'bg-orange-100 text-orange-700' :
      risk === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
      risk === 'low' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
    return risk ? <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>{risk}</span> : null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {calculator.inputs.map((input: any) => (
          <div key={input.id} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {input.label}{input.unit ? ` (${input.unit})` : ''}
              {input.required && <span className="text-red-500"> *</span>}
            </label>
            {input.type === 'number' && (
              <input
                type="number"
                className="border rounded-lg px-3 py-2"
                value={values[input.id] ?? ''}
                min={input.min}
                max={input.max}
                step={input.step}
                onChange={(e) => handleChange(input, e.target.value)}
              />
            )}
            {input.type === 'select' && (
              <select
                className="border rounded-lg px-3 py-2"
                value={values[input.id] ?? ''}
                onChange={(e) => handleChange(input, e.target.value)}
              >
                <option value="" disabled>Select...</option>
                {(input.options || []).map((opt: any) => (
                  <option key={String(opt.value)} value={String(opt.value)}>{opt.label}</option>
                ))}
              </select>
            )}
            {input.type === 'checkbox' && (
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={!!values[input.id]}
                onChange={(e) => handleChange(input, e.target.checked)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
  <button onClick={onCalculate} className="btn btn-primary">
          Calculate
        </button>
        {result?.risk && riskBadge(result.risk)}
      </div>

      {result && (
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          {typeof result.score !== 'undefined' && (
            <div className="text-sm text-gray-700 mb-2">Score: <span className="font-semibold">{result.score}</span></div>
          )}
          <div className="text-gray-900 font-medium">{result.interpretation}</div>
          {Array.isArray(result.recommendations) && result.recommendations.length > 0 && (
            <ul className="mt-3 list-disc list-inside text-sm text-gray-700 space-y-1">
              {result.recommendations.map((rec: string, idx: number) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          )}
          {result.details && (
            <div className="mt-4 text-xs text-gray-500">
              Details: {Object.entries(result.details).map(([k, v]) => `${k}: ${v}`).join(' | ')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main App Component
function App() {
  const [progress, setProgress] = useState({
    modulesCompleted: 2,
    totalModules: 14,
    chaptersCompleted: 8,
    totalChapters: 41,
    quizAverage: 87,
    studyTime: 24,
    streak: 7
  });

  const [showDisclaimerBanner, setShowDisclaimerBanner] = useState(() => {
    return !localStorage.getItem('promedix_disclaimer_accepted');
  });

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen font-roboto pb-16 lg:pb-0">
          {showDisclaimerBanner && (
            <MedicalDisclaimer 
              variant="banner" 
              onClose={() => setShowDisclaimerBanner(false)}
              showOnce={true}
            />
          )}
          <SimpleTestHeader />
          <div className="max-w-7xl mx-auto pb-4">
            <Routes>
            <Route path="/" element={<Dashboard progress={progress} />} />
            <Route path="/modules" element={<StudyModulesPage />} />
            <Route path="/modules/:moduleId" element={<ModuleDetailPage />} />
            <Route path="/chapter/:chapterId" element={<ChapterPage />} />
            <Route path="/bonus" element={<BonusModulePage />} />
            <Route path="/protocols" element={<ProtocolsPage />} />
            <Route path="/medications" element={<MedicationsPage />} />
            <Route path="/tools" element={<ToolsReferencePage />} />
            <Route path="/tools/pcr-practice" element={<PCRPracticePage />} />
            <Route path="/tools/patient-assessment" element={<PatientAssessmentStepTrainer />} />
            <Route path="/tools/calculators" element={<ClinicalToolsPage />} />
            <Route path="/tools/interaction-checker" element={<PlaceholderTool title="Drug Interaction Checker" description="Quickly screen for potential interactions. A full checker is planned; for now, refer to protocols and medication monographs." />} />
            <Route path="/tools/pill-identifier" element={<PlaceholderTool title="Pill Identifier" description="Identify medications by imprint/shape/color. This utility is planned; use medication list and images when available." />} />
            <Route path="/med-simulations" element={<MedicationSimulationsPage />} />
            <Route path="/med-simulations/:simId" element={<MedicationSimulationRunner />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/instructor" element={<RequireRole role="instructor"><InstructorDashboard /></RequireRole>} />
            {/* EMT-B aliases for calculators/protocols/medications */}
            <Route path="/emtb/calculators" element={<ClinicalToolsPage />} />
            <Route path="/emtb/protocols" element={<ProtocolsPage />} />
            <Route path="/emtb/medications" element={<MedicationsPage />} />
            <Route path="/emtb/med-simulations" element={<MedicationSimulationsPage />} />
            <Route path="/tools/:toolId" element={<ToolPage />} />
            <Route path="/flashcards" element={<EMTBFlashcards />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/student" element={<RequireRole role="student"><StudentDashboard /></RequireRole>} />
            <Route path="/progress" element={<ProgressPage progress={progress} />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/emtb/debug" element={<div style={{backgroundColor: 'yellow', padding: '50px', fontSize: '30px'}}>🐛 DEBUG ROUTE WORKS!</div>} />
            <Route path="/emtb/flashcards" element={<EMTBFlashcards />} />
            <Route path="/emtb/study-notes" element={<EMTBStudyNotesFixed />} />
            <Route path="/emtb/study-notes/new" element={<EMTBStudyNotesNew />} />
            <Route path="/emtb/study-notes/clean" element={<EMTBStudyNotesClean />} />
            <Route path="/emtb/study-notes/test" element={<TestStudyNotes />} />
            <Route path="/emtb" element={<EMTBNavigation />} />
            <Route path="*" element={<div style={{backgroundColor: 'orange', padding: '50px', fontSize: '20px'}}>🚨 CATCH-ALL ROUTE: {window.location.pathname} not matched!</div>} />
            </Routes>
          </div>
          
          {/* Footer */}
          <footer className="hidden lg:block bg-gray-50 border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto py-8 px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">ProMedix EMS™</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Professional Emergency Medical Training Platform for EMT, AEMT, and Paramedic education.
                    For training purposes only.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Important Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link 
                        to="/disclaimer" 
                        className="text-xs text-red-600 hover:text-red-800 font-medium flex items-center"
                      >
                        <Shield className="h-3 w-3 mr-1" />
                        Medical Disclaimer
                      </Link>
                    </li>
                    <li>
                      <a 
                        href="https://www.nremt.org" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-gray-600 hover:text-gray-800"
                      >
                        NREMT Standards
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>Emergency: 911</li>
                    <li>Poison Control: 1-800-222-1222</li>
                    <li>Medical Control: Contact Local</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-8 pt-6 text-center">
                <p className="text-xs text-gray-500">
                  © 2025 ProMedix EMS™ - FOR EDUCATIONAL PURPOSES ONLY
                </p>
                <p className="text-xs text-red-600 font-medium mt-1">
                  Always follow current local EMS protocols and medical direction
                </p>
              </div>
            </div>
          </footer>
          
          <EMSChatbot setActiveTab={(tab) => console.log('Chatbot navigation:', tab)} />
        </div>
      </Router>
    </AuthProvider>
  );
}

// Login dropdown component - combines Student/Instructor login in one dropdown
const LoginDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  if (!user) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen(v => !v)}
          className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <User className="w-4 h-4 mr-2" />
          Login
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
        
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
            <div className="py-2">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/login', { state: { redirectTo: '/progress', prefillEmail: 'student@example.com' } });
                }}
                className="w-full flex items-center px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <User className="w-4 h-4 mr-3" />
                Student Login
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/login', { state: { redirectTo: '/instructor', prefillEmail: 'instructor@example.com' } });
                }}
                className="w-full flex items-center px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Shield className="w-4 h-4 mr-3" />
                Instructor Login
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <User className="w-4 h-4 mr-2 text-gray-500" />
        <span className="text-sm font-medium">{user.name || 'User'}</span>
        <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50"
        >
          <button
            onClick={() => {
              setOpen(false);
              navigate('/progress');
            }}
            className="w-full flex items-center px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <BarChart3 className="w-4 h-4 mr-2 text-gray-500" /> Profile & Progress
          </button>
          {(user.role === 'instructor' || user.role === 'admin') && (
            <button
              onClick={() => {
                setOpen(false);
                navigate('/instructor');
              }}
              className="w-full flex items-center px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Shield className="w-4 h-4 mr-2 text-gray-500" /> Instructor Dashboard
            </button>
          )}
          <hr className="border-gray-200 dark:border-gray-700" />
          <button
            onClick={() => {
              logout();
              setOpen(false);
            }}
            className="w-full flex items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <X className="w-4 h-4 mr-2" /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

// Enhanced Header Component
const ProMedixHeader = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const searchRef = useRef<HTMLDivElement>(null);
  const [hideMobileNav, setHideMobileNav] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    // default light; could read system with matchMedia if desired
    return false;
  });

  useEffect(() => {
    const root = document.documentElement; // html element
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Hide bottom mobile nav on downward scroll, show on upward scroll
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 10) {
        setHideMobileNav(false);
      } else if (delta > 6) {
        setHideMobileNav(true);
      } else if (delta < -6) {
        setHideMobileNav(false);
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handle search suggestions
  useEffect(() => {
    const getSuggestions = async () => {
      if (searchQuery.length > 1) {
        try {
          const newSuggestions = searchEngine.getSearchSuggestions(searchQuery);
          setSuggestions(newSuggestions);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Suggestion error:', error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(getSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Close suggestions and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      // Close mobile menu when clicking outside
      const mobileMenuElement = document.getElementById('mobile-menu');
      if (mobileMenuElement && !mobileMenuElement.contains(event.target as Node)) {
        const menuButton = document.getElementById('mobile-menu-button');
        if (menuButton && !menuButton.contains(event.target as Node)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent, query?: string) => {
    e.preventDefault();
    const searchTerm = query || searchQuery;
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', path: '/', icon: Home },
    { id: 'modules', label: 'Modules', path: '/modules', icon: BookOpen },
    { id: 'emtb', label: 'EMT-B Training', path: '/emtb', icon: Stethoscope },
    { id: 'protocols', label: 'Protocols', path: '/protocols', icon: ClipboardList },
    { id: 'medications', label: 'Medications', path: '/medications', icon: Heart },
    { id: 'tools', label: 'Tools & Reference', path: '/tools', icon: Calculator },
    { id: 'quiz', label: 'Practice Quiz', path: '/quiz', icon: CheckSquare },
    { id: 'ai', label: 'AI Assistant', path: '/ai-assistant', icon: MessageCircle },
    { id: 'progress', label: 'Progress', path: '/progress', icon: BarChart3 },
    // Auth quick actions are handled by the top-right AuthMenu
  ];

  // Keep the top row focused; move the rest into a More menu
  const primaryIds = new Set(['dashboard', 'modules', 'emtb', 'protocols', 'medications', 'tools']);
  const primaryTabs = tabs.filter(t => primaryIds.has(t.id));
  const overflowTabs = tabs.filter(t => !primaryIds.has(t.id));
  // Mobile bottom-nav selection: prioritize core sections
  const mobileIds = new Set(['dashboard', 'modules', 'protocols', 'medications', 'tools']);
  const mobileTabs = primaryTabs.filter(t => mobileIds.has(t.id));

  return (
    <header className="bg-white dark:bg-[#0f141a] border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50">
      {/* TEST BANNER - Remove this once build works */}
      <div style={{backgroundColor: '#ff0000', color: 'white', padding: '5px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold'}}>
        🔥 REACT BUILD TEST - Build timestamp: {new Date().toISOString()} 🔥
      </div>
      
      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <svg width="32" height="32" viewBox="0 0 100 100" className="text-primary">
                <rect x="35" y="10" width="30" height="80" rx="4" fill="currentColor" />
                <rect x="10" y="35" width="80" height="30" rx="4" fill="currentColor" />
                <path
                  d="M15 50 L25 50 L30 40 L35 60 L40 30 L45 70 L50 50 L85 50"
                  stroke="#60A5FA"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold">
                <span className="text-primary">ProMedix</span>
                <span className="text-gray-500 dark:text-gray-400">EMS</span>
              </h1>
              <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">EMT-B Platform</div>
            </div>
          </Link>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(v => !v)}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Expanded Search */}
        {isSearchExpanded && (
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <div className="relative" ref={searchRef}>
              <form onSubmit={(e) => handleSearch(e)}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search protocols, medications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                    className="w-full pl-10 pr-16 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-800 dark:text-gray-100"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                  >
                    Go
                  </button>
                </div>
              </form>
              {/* Mobile Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                  <div className="py-1">
                    {suggestions.slice(0, 6).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center text-sm"
                      >
                        <Search className="w-3 h-3 text-gray-400 mr-2" />
                        <span className="truncate">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f141a] max-h-screen overflow-y-auto">
            <nav className="py-2">
              {tabs.map((tab) => {
                const isActive = location.pathname === tab.path ||
                               (tab.path !== '/' && location.pathname.startsWith(tab.path));
               
                return (
                  <Link
                    key={tab.id}
                    to={tab.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 text-base font-medium border-l-4 transition-colors ${
                      isActive
                        ? 'text-primary border-primary bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-700 dark:text-gray-300 border-transparent hover:text-primary hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                    {isActive && (
                      <div className="ml-auto">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </Link>
                );
              })}
              
              {/* User Section in Mobile Menu */}
              {user && (
                <div className="border-t border-gray-200 dark:border-gray-800 mt-2 pt-2">
                  <div className="px-4 py-2">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Signed in as</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name || user.email}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role} Account</div>
                  </div>
                </div>
              )}
            </nav>
          </div>
        )}

        {/* Fixed Bottom Mobile Navigation */}
        <nav
          className={`fixed bottom-0 inset-x-0 bg-white/95 dark:bg-[#0f141a]/95 backdrop-blur border-t border-gray-200 dark:border-gray-800 z-50 transition-transform duration-200 ${hideMobileNav ? 'translate-y-full' : 'translate-y-0'}`}
          aria-label="Primary mobile"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <ul className="grid grid-cols-5">
            {mobileTabs.map((tab) => {
              const isActive = location.pathname === tab.path ||
                               (tab.path !== '/' && location.pathname.startsWith(tab.path));
              return (
                <li key={tab.id}>
                  <Link
                    to={tab.path}
                    className={`flex flex-col items-center justify-center py-2.5 text-xs font-medium transition-colors ${
                      isActive
                        ? 'text-primary'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="mt-0.5">{tab.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        {/* Top Bar with Navigation Menu, Logo, and Login */}
        <div className="border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="grid grid-cols-3 items-center">
              {/* Left: Navigation Menu Only */}
              <div className="flex items-center space-x-4">
                <MoreMenu items={tabs} />
              </div>

              {/* Center: ProMedix Logo (Dead Center) */}
              <div className="flex justify-center">
                <Link to="/" className="flex flex-col items-center">
                  <div className="flex items-center space-x-3 mb-1">
                    <div className="relative">
                      <svg width="48" height="48" viewBox="0 0 100 100" className="text-primary">
                        <rect x="35" y="10" width="30" height="80" rx="4" fill="currentColor" />
                        <rect x="10" y="35" width="80" height="30" rx="4" fill="currentColor" />
                        <path
                          d="M15 50 L25 50 L30 40 L35 60 L40 30 L45 70 L50 50 L85 50"
                          stroke="#60A5FA"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">
                        <span className="text-primary">ProMedix</span>
                        <span className="text-gray-500 dark:text-gray-400">EMS</span>
                        <sup className="text-sm text-gray-400 dark:text-gray-500">™</sup>
                      </h1>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    The Next-Gen Education Tool for Emergency Medical Services
                  </div>
                </Link>
              </div>

              {/* Right: Dark Mode, Notifications & Login Dropdown */}
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setIsDark(v => !v)}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                  aria-label="Toggle dark mode"
                  title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                  )}
                </button>
                
                <button
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                </button>
                
                <LoginDropdown />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="max-w-2xl mx-auto relative" ref={searchRef}>
            <form onSubmit={(e) => handleSearch(e)}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search protocols, medications, conditions, and study materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                  className="w-full pl-12 pr-20 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 btn btn-primary"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Desktop Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
                <div className="py-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center"
                    >
                      <Search className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="truncate">{suggestion}</span>
                    </button>
                  ))}
                </div>
                
                {/* Popular Searches Footer */}
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-b-xl">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Popular searches:</div>
                  <div className="flex flex-wrap gap-2">
                    {['CPR', 'Airway', 'Trauma', 'Medications'].map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSuggestionClick(term)}
                        className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Enhanced dropdown menu for navigation
const MoreMenu: React.FC<{ items: { id: string; label: string; path: string; icon: any }[] }> = ({ items }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  // Close when navigating
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Menu className="w-4 h-4 mr-2" />
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="py-2">
            {items.map((item) => {
              const isActive = location.pathname === item.path ||
                             (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link 
                  key={item.id}
                  to={item.path} 
                  className={`flex items-center px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? 'text-primary bg-blue-50 dark:bg-blue-900/20 border-r-2 border-primary'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                  <span>{item.label}</span>
                  {isActive && <CheckCircle className="w-4 h-4 ml-auto text-primary" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Dashboard Component
type ProgressSummary = {
  modulesCompleted: number;
  totalModules: number;
  chaptersCompleted: number;
  totalChapters: number;
  quizAverage: number;
  studyTime: number;
  streak: number;
};
const Dashboard: React.FC<{ progress: ProgressSummary }> = ({ progress }) => {
  return (
    <main className="p-6">
      {/* Medical Disclaimer */}
      <MedicalDisclaimer variant="inline" />

  {/* Removed oversized hero to reclaim space */}

      {/* Compact summary chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700">14 Modules</span>
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700">41 Chapters</span>
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700">AI Assistant</span>
        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700">500+ Questions</span>
      </div>

      {/* Quick Stats */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard icon={BookOpen} title="Modules Completed" value={`${progress.modulesCompleted}/${progress.totalModules}`} color="blue" />
        <StatCard icon={CheckCircle} title="Quiz Average" value={`${progress.quizAverage}%`} color="green" />
        <StatCard icon={Clock} title="Study Time" value={`${progress.studyTime}h`} color="purple" />
        <StatCard icon={Target} title="Streak" value={`${progress.streak} days`} color="orange" />
      </div>

      {/* Continue Learning & Quick Actions */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Continue Learning</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer touch-manipulation">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">3</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Legal Frameworks in Emergency Care</h4>
                <p className="text-sm text-gray-500">Module 1 • Chapter 3 • 40 minutes remaining</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <Link to="/chapter/3" className="btn btn-primary">
                Continue
              </Link>
            </div>
          </div>
        </div>

        {/* AI Assistant Quick Access */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span>AI Assistant</span>
          </h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Ask questions about EMT-B protocols, medications, or procedures</p>
            <Link to="/ai-assistant" className="btn btn-primary w-full py-3">Start Conversation</Link>
            <div className="text-xs text-gray-500 text-center">
              Powered by ProMedix AI™
            </div>
          </div>
        </div>
      </div>

      {/* Study Modules Preview */}
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Study Modules</h3>
          <Link to="/modules" className="link text-sm font-medium flex items-center space-x-1">
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {moduleStructure.slice(0, 6).map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>

      {/* Quick Tools */}
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Clinical Tools</h3>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {calculatorsUI.map((tool) => (
            <Link
              key={tool.id}
              to={`/tools/${tool.id}`}
              className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors touch-manipulation min-h-[88px]"
            >
              <div className={`w-10 h-10 bg-${tool.color}-100 rounded-lg flex items-center justify-center mb-2`}>
                <tool.icon className={`w-5 h-5 text-${tool.color}-600`} />
              </div>
              <div className="text-xs font-medium text-center">{tool.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

// Chapter Content Parser with EMT-B Scope Indicators
const parseContent = (content: string) => {
  const lines = content.split('\n');
  const elements = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('# ')) {
      elements.push({ type: 'h1', content: line.substring(2) });
    } else if (line.startsWith('## ')) {
      elements.push({ type: 'h2', content: line.substring(3) });
    } else if (line.startsWith('### ')) {
      elements.push({ type: 'h3', content: line.substring(4) });
    } else if (line.startsWith('#### ')) {
      elements.push({ type: 'h4', content: line.substring(5) });
    } else if (line.includes('**') && (line.includes('EMT') || line.includes('NREMT') || line.includes('Medical Director') || line.includes('911') || line.includes('AED'))) {
      elements.push({ type: 'emt-scope', content: line });
    } else if (line.includes('**Education must continue**') || line.includes('**always act in the patient\'s best interest**') || line.includes('**being a patient advocate**')) {
      elements.push({ type: 'critical', content: line });
    } else if (line.includes('**Plan-Do-Study-Act**') || line.includes('**Continuous Quality Improvement**') || line.includes('**evidence-based medicine**')) {
      elements.push({ type: 'info', content: line });
    } else if (line.startsWith('- **')) {
      elements.push({ type: 'important', content: line.substring(4) });
    } else if (line.startsWith('- ')) {
      elements.push({ type: 'bullet', content: line.substring(2) });
    } else if (line.includes('General requirements to be licensed') || line.includes('Training hours vary by state')) {
      elements.push({ type: 'requirements', content: line });
    } else if (line.includes('**') && line.length > 0) {
      elements.push({ type: 'highlight', content: line });
    } else if (line.includes('*This section will be') || line.includes('*Comprehensive content') || line.includes('*Detailed content')) {
      elements.push({ type: 'placeholder', content: line });
    } else if (line.length > 0) {
      elements.push({ type: 'paragraph', content: line });
    } else if (elements.length > 0 && elements[elements.length - 1].type !== 'break') {
      elements.push({ type: 'break' });
    }
  }

  return elements;
};

// Content Renderer with Professional Medical Styling
const renderContent = (element: any, index: number) => {
  const baseClass = "font-roboto leading-relaxed";
  
  switch (element.type) {
    case 'h1':
      return (
  <h1 key={index} className={`${baseClass} text-3xl font-bold text-slate-800 mb-6 pb-3 border-b border-gray-200`}>
          {element.content}
        </h1>
      );
    case 'h2':
      return (
        <div key={index} className="mb-6">
          <h2 className={`${baseClass} text-2xl font-semibold text-slate-700 mb-4 flex items-center`}>
            <div className="w-1 h-6 bg-slate-400 mr-3"></div>
            {element.content}
          </h2>
        </div>
      );
    case 'h3':
      return (
        <h3 key={index} className={`${baseClass} text-xl font-semibold text-slate-700 mb-3 mt-6`}>
          {element.content}
        </h3>
      );
    case 'h4':
      return (
        <h4 key={index} className={`${baseClass} text-lg font-medium text-slate-600 mb-2 mt-4`}>
          {element.content}
        </h4>
      );
    case 'emt-scope':
      return (
    <div key={index} className="bg-slate-50 border-l-4 border-slate-400 p-4 mb-4 rounded-r-lg">
          <div className="flex items-start">
      <div className="bg-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3 mt-0.5 flex-shrink-0">
              EMT-B SCOPE
            </div>
      <p className={`${baseClass} text-slate-800`} dangerouslySetInnerHTML={{ __html: element.content }} />
          </div>
        </div>
      );
    case 'critical':
      return (
        <div key={index} className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-lg">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <div className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-2 inline-block">
                CRITICAL
              </div>
              <p className={`${baseClass} text-red-800`} dangerouslySetInnerHTML={{ __html: element.content }} />
            </div>
          </div>
        </div>
      );
    case 'info':
      return (
        <div key={index} className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded-r-lg">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <div className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-2 inline-block">
                KEY CONCEPT
              </div>
              <p className={`${baseClass} text-green-800`} dangerouslySetInnerHTML={{ __html: element.content }} />
            </div>
          </div>
        </div>
      );
    case 'important':
      return (
        <div key={index} className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 rounded-r-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className={`${baseClass} text-amber-800 font-medium`} dangerouslySetInnerHTML={{ __html: element.content }} />
          </div>
        </div>
      );
    case 'requirements':
      return (
        <div key={index} className="bg-purple-50 border border-purple-200 p-4 mb-4 rounded-lg">
          <div className="flex items-start">
            <div className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3 mt-0.5 flex-shrink-0">
              REQUIREMENTS
            </div>
            <p className={`${baseClass} text-purple-800`} dangerouslySetInnerHTML={{ __html: element.content }} />
          </div>
        </div>
      );
    case 'placeholder':
      return (
        <div key={index} className="bg-slate-50 border border-slate-200 p-4 mb-4 rounded-lg">
          <p className={`${baseClass} text-slate-600 italic`} dangerouslySetInnerHTML={{ __html: element.content }} />
        </div>
      );
    case 'highlight':
      return (
        <p key={index} className={`${baseClass} text-slate-700 mb-4 leading-7 font-medium`} dangerouslySetInnerHTML={{ __html: element.content }} />
      );
    case 'bullet':
      return (
        <div key={index} className="flex items-start mb-2 ml-4">
          <div className="w-2 h-2 bg-slate-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
          <p className={`${baseClass} text-slate-700`} dangerouslySetInnerHTML={{ __html: element.content }} />
        </div>
      );
    case 'paragraph':
      return (
        <p key={index} className={`${baseClass} text-slate-700 mb-4 leading-7`} dangerouslySetInnerHTML={{ __html: element.content }} />
      );
    case 'break':
      return <div key={index} className="mb-4"></div>;
    default:
      return null;
  }
};

// --- Simple, copyright-safe SVG visuals used in Human Body Systems ---
const VisualCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-sm font-semibold text-gray-700 mb-3"
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className="ml-2 text-gray-500">{open ? 'Hide' : 'Show'}</span>
      </button>
      {open && <div className="overflow-auto">{children}</div>}
    </div>
  );
};

const BloodFlowDiagramSVG: React.FC = () => (
  <svg viewBox="0 0 900 240" className="w-full max-w-4xl" role="img" aria-label="Blood flow through the heart, lungs, and body">
    <title>Blood Flow Pathway</title>
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L10,3 L0,6 Z" fill="#1f2937" />
      </marker>
    </defs>
  {/* Legend */}
  <rect x="20" y="10" width="14" height="14" fill="#e5e7eb" stroke="#9ca3af" />
  <text x="40" y="22" fontSize="11" fill="#374151">Heart chambers</text>
  <rect x="150" y="10" width="14" height="14" fill="#dbeafe" stroke="#60a5fa" />
  <text x="170" y="22" fontSize="11" fill="#1e3a8a">Lungs</text>
  <rect x="230" y="10" width="14" height="14" fill="#fde68a" stroke="#f59e0b" />
  <text x="250" y="22" fontSize="11" fill="#78350f">Body capillaries</text>

  {/* Right heart */}
    <rect x="30" y="40" width="100" height="50" rx="8" fill="#e5e7eb" stroke="#9ca3af" />
    <text x="80" y="70" textAnchor="middle" fontSize="12" fill="#111827">RA</text>
    <rect x="30" y="110" width="100" height="50" rx="8" fill="#e5e7eb" stroke="#9ca3af" />
    <text x="80" y="140" textAnchor="middle" fontSize="12" fill="#111827">RV</text>
    {/* To lungs */}
    <line x1="130" y1="135" x2="220" y2="135" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow)" />
    <text x="175" y="125" fontSize="11" fill="#374151">Pulmonary artery</text>
    {/* Lungs */}
    <rect x="230" y="60" width="160" height="120" rx="10" fill="#dbeafe" stroke="#60a5fa" />
    <text x="310" y="120" textAnchor="middle" fontSize="12" fill="#1e3a8a">Lungs</text>
    {/* Back to left heart */}
    <line x1="390" y1="95" x2="480" y2="95" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow)" />
    <text x="435" y="85" fontSize="11" fill="#374151">Pulmonary veins</text>
    {/* Left heart */}
    <rect x="490" y="40" width="100" height="50" rx="8" fill="#e5e7eb" stroke="#9ca3af" />
    <text x="540" y="70" textAnchor="middle" fontSize="12" fill="#111827">LA</text>
    <rect x="490" y="110" width="100" height="50" rx="8" fill="#e5e7eb" stroke="#9ca3af" />
    <text x="540" y="140" textAnchor="middle" fontSize="12" fill="#111827">LV</text>
    {/* Aorta to body */}
    <line x1="590" y1="135" x2="680" y2="135" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow)" />
    <text x="635" y="125" fontSize="11" fill="#374151">Aorta</text>
    {/* Body */}
    <rect x="690" y="80" width="160" height="80" rx="10" fill="#fde68a" stroke="#f59e0b" />
    <text x="770" y="122" textAnchor="middle" fontSize="12" fill="#78350f">Body / Capillaries</text>
    {/* Return to RA */}
    <path d="M690 160 C 640 200, 120 200, 80 140" fill="none" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow)" />
  <text x="300" y="188" fontSize="11" fill="#374151">Venae cavae</text>
  {/* Caption */}
  <text x="450" y="210" textAnchor="middle" fontSize="11" fill="#111827">Right heart → lungs (oxygenate) → left heart → body (deliver O₂) → back via veins</text>
  {/* Plain language */}
  <text x="450" y="228" textAnchor="middle" fontSize="11" fill="#4b5563">Plain: Right side sends used blood to lungs to pick up oxygen; left side sends fresh blood to the body</text>
  </svg>
);

const GasExchangeDiagramSVG: React.FC = () => (
  <svg viewBox="0 0 700 220" className="w-full max-w-3xl" role="img" aria-label="Alveolar gas exchange of oxygen and carbon dioxide">
    <title>Alveolar Gas Exchange</title>
    <defs>
      <marker id="arrow2" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L10,3 L0,6 Z" fill="#1f2937" />
      </marker>
    </defs>
  {/* Legend */}
  <rect x="20" y="10" width="14" height="14" fill="#fee2e2" stroke="#ef4444" />
  <text x="40" y="22" fontSize="11" fill="#7f1d1d">Alveolus</text>
  <rect x="120" y="10" width="14" height="14" fill="#d1fae5" stroke="#10b981" />
  <text x="140" y="22" fontSize="11" fill="#065f46">Capillary</text>
    
  {/* Alveolus */}
    <circle cx="200" cy="110" r="70" fill="#fee2e2" stroke="#ef4444" />
    <text x="200" y="110" textAnchor="middle" fontSize="12" fill="#7f1d1d">Alveolus</text>
    {/* Capillary */}
    <rect x="330" y="70" width="300" height="80" rx="12" fill="#d1fae5" stroke="#10b981" />
    <text x="480" y="115" textAnchor="middle" fontSize="12" fill="#065f46">Pulmonary Capillary</text>
    {/* O2 into blood */}
    <line x1="240" y1="95" x2="330" y2="95" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow2)" />
    <text x="285" y="85" fontSize="12" fill="#047857">O₂ →</text>
    {/* CO2 out to alveolus */}
    <line x1="330" y1="125" x2="240" y2="125" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow2)" />
  <text x="285" y="135" fontSize="12" fill="#b91c1c">← CO₂</text>
  {/* Caption */}
  <text x="350" y="210" textAnchor="middle" fontSize="11" fill="#111827">O₂ diffuses from alveolus into blood; CO₂ diffuses from blood into alveolus</text>
  {/* Plain language */}
  <text x="350" y="195" textAnchor="middle" fontSize="11" fill="#4b5563">Plain: Oxygen moves from air sacs into blood; carbon dioxide leaves blood into the air to be exhaled</text>
  </svg>
);

const VQDiagramSVG: React.FC = () => (
  <svg viewBox="0 0 600 220" className="w-full max-w-3xl" role="img" aria-label="Ventilation and perfusion matching">
    <title>V/Q Matching</title>
  {/* Legend */}
  <rect x="20" y="10" width="20" height="12" fill="#60a5fa" />
  <text x="45" y="20" fontSize="11" fill="#1d4ed8">Ventilation (V)</text>
  <rect x="160" y="10" width="20" height="12" fill="#34d399" />
  <text x="185" y="20" fontSize="11" fill="#047857">Perfusion (Q)</text>
  {/* Three alveoli showing balanced, low V, and low Q */}
    {[
      { x: 100, label: 'Normal V/Q' },
      { x: 300, label: 'Low V (e.g., asthma)' },
      { x: 500, label: 'Low Q (e.g., PE)' },
    ].map((n, i) => (
      <g key={i}>
        <circle cx={n.x} cy={80} r={40} fill="#e0e7ff" stroke="#6366f1" />
        <text x={n.x} y={30} textAnchor="middle" fontSize="12" fill="#111827">{n.label}</text>
        {/* Ventilation bar */}
        <rect x={n.x - 55} y={140} width={i === 1 ? 40 : 70} height={12} fill="#60a5fa" />
        <text x={n.x - 55} y={135} fontSize="10" fill="#1d4ed8">V</text>
        {/* Perfusion bar */}
        <rect x={n.x + 5} y={140} width={i === 2 ? 40 : 70} height={12} fill="#34d399" />
        <text x={n.x + 5} y={135} fontSize="10" fill="#047857">Q</text>
      </g>
    ))}
  {/* Plain language */}
  <text x="300" y="200" textAnchor="middle" fontSize="11" fill="#4b5563">Plain: V = air reaching lungs; Q = blood reaching lungs. Low V = not enough air. Low Q = not enough blood.</text>
  </svg>
);

const NeuronSignalDiagramSVG: React.FC = () => (
  <svg viewBox="0 0 700 220" className="w-full max-w-3xl" role="img" aria-label="Neuron signaling across a synapse">
    <title>Neuron Signaling</title>
    {/* Presynaptic neuron */}
    <rect x="60" y="60" width="220" height="60" rx="10" fill="#dbeafe" stroke="#60a5fa" />
    <text x="170" y="95" textAnchor="middle" fontSize="12" fill="#1e3a8a">Presynaptic neuron</text>
    {/* Synaptic cleft */}
    <rect x="300" y="70" width="100" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" />
    <text x="350" y="95" textAnchor="middle" fontSize="12" fill="#7c2d12">Synaptic cleft</text>
    {/* Postsynaptic neuron */}
    <rect x="430" y="60" width="220" height="60" rx="10" fill="#dbf4ff" stroke="#38bdf8" />
    <text x="540" y="95" textAnchor="middle" fontSize="12" fill="#0c4a6e">Postsynaptic neuron</text>
    {/* Neurotransmitter arrows */}
    <defs>
      <marker id="arrow3" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L10,3 L0,6 Z" fill="#1f2937" />
      </marker>
    </defs>
    <line x1="280" y1="90" x2="300" y2="90" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow3)" />
    <line x1="400" y1="90" x2="430" y2="90" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow3)" />
  <text x="350" y="65" textAnchor="middle" fontSize="12" fill="#111827">Neurotransmitters</text>
  {/* Caption */}
  <text x="350" y="210" textAnchor="middle" fontSize="11" fill="#111827">Signal travels electrically along neuron, chemically across synapse, then electrically again</text>
  {/* Plain language */}
  <text x="350" y="195" textAnchor="middle" fontSize="11" fill="#4b5563">Plain: Nerve signal runs down the cell, jumps the gap using chemicals, then continues in the next cell</text>
  </svg>
);

const SlidingFilamentDiagramSVG: React.FC = () => (
  <svg viewBox="0 0 700 220" className="w-full max-w-3xl" role="img" aria-label="Sliding filament model of muscle contraction">
    <title>Sliding Filament</title>
    {/* Z-lines */}
    <rect x="100" y="60" width="10" height="100" fill="#9ca3af" />
    <rect x="590" y="60" width="10" height="100" fill="#9ca3af" />
    <text x="105" y="50" fontSize="12" fill="#374151">Z</text>
    <text x="595" y="50" fontSize="12" fill="#374151">Z</text>
    {/* Myosin (thick) */}
    <rect x="250" y="100" width="200" height="20" fill="#a7f3d0" stroke="#10b981" />
    <text x="350" y="95" textAnchor="middle" fontSize="12" fill="#065f46">Myosin (thick)</text>
    {/* Actin (thin) */}
    <rect x="120" y="85" width="120" height="10" fill="#bfdbfe" stroke="#60a5fa" />
    <rect x="460" y="85" width="120" height="10" fill="#bfdbfe" stroke="#60a5fa" />
    <rect x="120" y="125" width="120" height="10" fill="#bfdbfe" stroke="#60a5fa" />
    <rect x="460" y="125" width="120" height="10" fill="#bfdbfe" stroke="#60a5fa" />
  <text x="350" y="145" textAnchor="middle" fontSize="12" fill="#1f2937">Actin (thin)</text>
  {/* Caption */}
  <text x="350" y="210" textAnchor="middle" fontSize="11" fill="#111827">Myosin pulls actin filaments toward center, shortening sarcomere (contraction)</text>
  {/* Plain language */}
  <text x="350" y="195" textAnchor="middle" fontSize="11" fill="#4b5563">Plain: Thick fibers pull thin fibers like ropes, making the muscle unit shorter</text>
  </svg>
);

const SkinLayersDiagramSVG: React.FC = () => (
  <svg viewBox="0 0 600 220" className="w-full max-w-2xl" role="img" aria-label="Layers of the skin">
    <title>Skin Layers</title>
    <rect x="100" y="40" width="400" height="50" fill="#fde68a" stroke="#f59e0b" />
    <text x="300" y="70" textAnchor="middle" fontSize="12" fill="#78350f">Epidermis</text>
    <rect x="100" y="90" width="400" height="70" fill="#fecaca" stroke="#ef4444" />
    <text x="300" y="125" textAnchor="middle" fontSize="12" fill="#7f1d1d">Dermis</text>
    <rect x="100" y="160" width="400" height="40" fill="#d1fae5" stroke="#10b981" />
  <text x="300" y="185" textAnchor="middle" fontSize="12" fill="#065f46">Subcutaneous</text>
  {/* Caption */}
  <text x="300" y="210" textAnchor="middle" fontSize="11" fill="#111827">Barrier (epidermis) → perfusion/sensation (dermis) → insulation/energy (subcutaneous)</text>
  </svg>
);

const GIQuadrantsDiagramSVG: React.FC = () => (
  <svg viewBox="0 0 600 220" className="w-full max-w-2xl" role="img" aria-label="Abdominal quadrants">
    <title>Abdominal Quadrants</title>
    <rect x="150" y="40" width="300" height="140" fill="#f3f4f6" stroke="#9ca3af" />
    <line x1="300" y1="40" x2="300" y2="180" stroke="#9ca3af" />
    <line x1="150" y1="110" x2="450" y2="110" stroke="#9ca3af" />
    <text x="230" y="85" textAnchor="middle" fontSize="12" fill="#111827">LUQ</text>
    <text x="370" y="85" textAnchor="middle" fontSize="12" fill="#111827">RUQ</text>
    <text x="230" y="155" textAnchor="middle" fontSize="12" fill="#111827">LLQ</text>
  <text x="370" y="155" textAnchor="middle" fontSize="12" fill="#111827">RLQ</text>
  {/* Caption */}
  <text x="300" y="210" textAnchor="middle" fontSize="11" fill="#111827">RUQ: liver/GB • LUQ: spleen/stomach • RLQ: appendix • LLQ: sigmoid colon</text>
  {/* Plain language */}
  <text x="300" y="195" textAnchor="middle" fontSize="11" fill="#4b5563">Plain: RUQ = right upper belly, LUQ = left upper, RLQ = right lower, LLQ = left lower (GB = gallbladder)</text>
  </svg>
);

const NephronDiagramSVG: React.FC = () => (
  <svg viewBox="0 0 700 220" className="w-full max-w-3xl" role="img" aria-label="Nephron flow: glomerulus to tubule to collecting duct">
    <title>Nephron Overview</title>
    <defs>
      <marker id="arrow4" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L10,3 L0,6 Z" fill="#1f2937" />
      </marker>
    </defs>
    <circle cx="120" cy="110" r="40" fill="#fee2e2" stroke="#ef4444" />
    <text x="120" y="110" textAnchor="middle" fontSize="12" fill="#7f1d1d">Glomerulus</text>
    <line x1="160" y1="110" x2="260" y2="110" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow4)" />
    <rect x="260" y="90" width="220" height="40" rx="8" fill="#dbeafe" stroke="#60a5fa" />
    <text x="370" y="115" textAnchor="middle" fontSize="12" fill="#1e3a8a">Tubules (reabsorb/secrete)</text>
    <line x1="480" y1="110" x2="600" y2="110" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow4)" />
    <rect x="600" y="90" width="60" height="40" rx="8" fill="#d1fae5" stroke="#10b981" />
  <text x="630" y="115" textAnchor="middle" fontSize="12" fill="#065f46">Collecting</text>
  {/* Caption */}
  <text x="350" y="210" textAnchor="middle" fontSize="11" fill="#111827">Filter → reabsorb/secrete → collect urine; RAAS/ADH regulate volume & BP</text>
  {/* Plain language */}
  <text x="350" y="195" textAnchor="middle" fontSize="11" fill="#4b5563">Plain: Kidney filters blood, tweaks the mix, then sends urine out; hormones control water and pressure</text>
  </svg>
);

const EndocrineFeedbackDiagramSVG: React.FC = () => (
  <svg viewBox="0 0 760 240" className="w-full max-w-3xl" role="img" aria-label="Endocrine feedback for glucose control">
    <title>Endocrine Feedback (Glucose)</title>
    <defs>
      <marker id="arrow5" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L10,3 L0,6 Z" fill="#1f2937" />
      </marker>
    </defs>
    <rect x="80" y="40" width="140" height="40" rx="8" fill="#dbeafe" stroke="#60a5fa" />
    <text x="150" y="65" textAnchor="middle" fontSize="12" fill="#1e3a8a">Pancreas</text>
    <line x1="220" y1="60" x2="350" y2="60" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow5)" />
    <rect x="350" y="40" width="140" height="40" rx="8" fill="#d1fae5" stroke="#10b981" />
    <text x="420" y="65" textAnchor="middle" fontSize="12" fill="#065f46">Insulin</text>
    <line x1="490" y1="60" x2="650" y2="60" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow5)" />
    <rect x="650" y="40" width="80" height="40" rx="8" fill="#fde68a" stroke="#f59e0b" />
    <text x="690" y="65" textAnchor="middle" fontSize="12" fill="#78350f">↓ BG</text>
    {/* Glucagon path */}
    <line x1="220" y1="180" x2="350" y2="180" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow5)" />
    <rect x="80" y="160" width="140" height="40" rx="8" fill="#dbeafe" stroke="#60a5fa" />
    <text x="150" y="185" textAnchor="middle" fontSize="12" fill="#1e3a8a">Pancreas</text>
    <rect x="350" y="160" width="140" height="40" rx="8" fill="#fecaca" stroke="#ef4444" />
    <text x="420" y="185" textAnchor="middle" fontSize="12" fill="#7f1d1d">Glucagon</text>
    <line x1="490" y1="180" x2="650" y2="180" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow5)" />
    <rect x="650" y="160" width="80" height="40" rx="8" fill="#fde68a" stroke="#f59e0b" />
  <text x="690" y="185" textAnchor="middle" fontSize="12" fill="#78350f">↑ BG</text>
  {/* Caption */}
  <text x="380" y="225" textAnchor="middle" fontSize="11" fill="#111827">Insulin lowers BG by uptake/storage; glucagon raises BG via hepatic release</text>
  {/* Plain language */}
  <text x="380" y="205" textAnchor="middle" fontSize="11" fill="#4b5563">Plain: Insulin lowers blood sugar by helping it move into cells; glucagon raises it by telling liver to release sugar</text>
  </svg>
);

const AnaphylaxisPathwayDiagramSVG: React.FC = () => (
  <svg viewBox="0 0 760 240" className="w-full max-w-3xl" role="img" aria-label="Anaphylaxis pathway">
    <title>Anaphylaxis Pathway</title>
    <defs>
      <marker id="arrow6" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L10,3 L0,6 Z" fill="#1f2937" />
      </marker>
    </defs>
    <rect x="60" y="40" width="130" height="40" rx="8" fill="#e0e7ff" stroke="#6366f1" />
    <text x="125" y="65" textAnchor="middle" fontSize="12" fill="#312e81">Allergen</text>
    <line x1="190" y1="60" x2="310" y2="60" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow6)" />
    <rect x="310" y="40" width="130" height="40" rx="8" fill="#dbeafe" stroke="#60a5fa" />
    <text x="375" y="65" textAnchor="middle" fontSize="12" fill="#1e3a8a">IgE bound</text>
    <line x1="440" y1="60" x2="560" y2="60" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow6)" />
    <rect x="560" y="40" width="130" height="40" rx="8" fill="#fecaca" stroke="#ef4444" />
    <text x="625" y="65" textAnchor="middle" fontSize="12" fill="#7f1d1d">Mast cell</text>
    <text x="625" y="95" textAnchor="middle" fontSize="11" fill="#7f1d1d">degranulation</text>
    <line x1="625" y1="80" x2="625" y2="140" stroke="#1f2937" strokeWidth="2" markerEnd="url(#arrow6)" />
    <rect x="560" y="140" width="130" height="40" rx="8" fill="#fde68a" stroke="#f59e0b" />
    <text x="625" y="165" textAnchor="middle" fontSize="12" fill="#78350f">Histamine</text>
  <text x="625" y="185" textAnchor="middle" fontSize="11" fill="#78350f">Vasodilation, leak, bronchospasm</text>
  {/* Caption */}
  <text x="380" y="225" textAnchor="middle" fontSize="11" fill="#111827">IgE‑mediated mast cell degranulation releases mediators causing shock and airway compromise</text>
  {/* Plain language */}
  <text x="380" y="205" textAnchor="middle" fontSize="11" fill="#4b5563">Plain: A trigger makes allergy cells release chemicals → swelling, leaky vessels, low BP, and tight airways</text>
  </svg>
);

// Enhanced Medications Page
const MedicationsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const location = useLocation();

  // Accept pre-filled search via ?q= query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q !== null) setSearchTerm(q);
  }, [location.search]);

  const categories = [
    { id: 'all', name: 'All Medications', count: medicationsDatabase.length },
    { id: 'respiratory', name: 'Respiratory', count: medicationsDatabase.filter(m => m.category === 'respiratory').length },
    { id: 'cardiac', name: 'Cardiac', count: medicationsDatabase.filter(m => m.category === 'cardiac').length },
    { id: 'antidote', name: 'Antidotes', count: medicationsDatabase.filter(m => m.category === 'antidote').length },
    { id: 'metabolic', name: 'Metabolic', count: medicationsDatabase.filter(m => m.category === 'metabolic').length }
  ];

  const filteredMedications = medicationsDatabase.filter(med => {
    const matchesCategory = selectedCategory === 'all' || med.category === selectedCategory;
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.indications.some(indication => indication.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (selectedMedication) {
    return (
      <main className="p-4 md:p-6 pb-24 lg:pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setSelectedMedication(null)}
              className="flex items-center space-x-2 link mb-4"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Back to Medications</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">{selectedMedication.name}</h1>
            <p className="text-gray-600">{selectedMedication.classification}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link to={`/med-simulations?q=${encodeURIComponent(selectedMedication.name)}`} className="text-sm px-3 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100">View Simulations</Link>
              <Link to="/tools/calculators" className="text-sm px-3 py-1 rounded bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100">Open Calculators</Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Mechanism of Action</h3>
                  <p className="text-gray-700">{selectedMedication.mechanism}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Indications</h3>
                  <ul className="space-y-2">
                    {selectedMedication.indications.map((indication, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{indication}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Contraindications</h3>
                  <ul className="space-y-2">
                    {selectedMedication.contraindications.map((contraindication, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{contraindication}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Dosing</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 font-medium">{selectedMedication.dosing}</p>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-medium text-gray-700 mb-1">Routes:</h4>
                    <ul className="text-sm text-gray-600">
                      {selectedMedication.routes.map((route, index) => (
                        <li key={index}>• {route}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Side Effects</h3>
                  <ul className="space-y-1">
                    {selectedMedication.sideEffects.map((effect, index) => (
                      <li key={index} className="text-gray-700 text-sm">• {effect}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Monitoring</h3>
                  <ul className="space-y-1">
                    {selectedMedication.monitoring.map((monitor, index) => (
                      <li key={index} className="text-gray-700 text-sm">• {monitor}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Clinical Pearls</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <ul className="space-y-2">
                      {selectedMedication.clinicalPearls.map((pearl, index) => (
                        <li key={index} className="text-yellow-800 text-sm flex items-start space-x-2">
                          <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{pearl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-6 pb-24 lg:pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">EMT-B Medications</h1>
        <p className="text-gray-600">Complete medication database for EMT-Basic scope of practice</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search medications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto touch-pan-x">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors touch-manipulation ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Medications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredMedications.map((medication) => (
          <div
            key={medication.id}
            onClick={() => setSelectedMedication(medication)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-105 touch-manipulation min-h-[140px]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{medication.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                medication.category === 'respiratory' ? 'bg-blue-100 text-blue-800' :
                medication.category === 'cardiac' ? 'bg-red-100 text-red-800' :
                medication.category === 'antidote' ? 'bg-purple-100 text-purple-800' :
                'bg-green-100 text-green-800'
              }`}>
                {medication.category}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{medication.classification}</p>
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 text-sm mb-2">Primary Indications:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {medication.indications.slice(0, 3).map((indication, index) => (
                  <li key={index}>• {indication}</li>
                ))}
                {medication.indications.length > 3 && (
                  <li className="text-primary">+ {medication.indications.length - 3} more...</li>
                )}
              </ul>
            </div>
            <div className="text-right">
              <span className="link text-sm font-medium">View Details</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

// Glasgow Coma Scale Component
const GlasgowComaScale = () => {
  const [eyeResponse, setEyeResponse] = useState(0);
  const [verbalResponse, setVerbalResponse] = useState(0);
  const [motorResponse, setMotorResponse] = useState(0);

  const totalScore = eyeResponse + verbalResponse + motorResponse;

  const getScoreInterpretation = (score: number) => {
    if (score >= 13) return { level: "Mild TBI", color: "green", description: "Good prognosis" };
    if (score >= 9) return { level: "Moderate TBI", color: "yellow", description: "Moderate injury" };
    if (score >= 3) return { level: "Severe TBI", color: "red", description: "Poor prognosis" };
    return { level: "Invalid", color: "gray", description: "Check responses" };
  };

  const interpretation = getScoreInterpretation(totalScore);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Glasgow Coma Scale</h2>
      
      <div className="space-y-6">
        {/* Eye Response */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Eye Response</h3>
          <div className="space-y-2">
            {[
              { value: 4, label: "Spontaneous opening" },
              { value: 3, label: "Opens to speech" },
              { value: 2, label: "Opens to pain" },
              { value: 1, label: "No response" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setEyeResponse(option.value)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                  eyeResponse === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">{option.value}</span> - {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Verbal Response */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Verbal Response</h3>
          <div className="space-y-2">
            {[
              { value: 5, label: "Oriented and conversing" },
              { value: 4, label: "Disoriented and conversing" },
              { value: 3, label: "Inappropriate words" },
              { value: 2, label: "Incomprehensible sounds" },
              { value: 1, label: "No response" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setVerbalResponse(option.value)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                  verbalResponse === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">{option.value}</span> - {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Motor Response */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Motor Response</h3>
          <div className="space-y-2">
            {[
              { value: 6, label: "Obeys commands" },
              { value: 5, label: "Localizes to pain" },
              { value: 4, label: "Normal flexion (withdrawal)" },
              { value: 3, label: "Abnormal flexion (decorticate)" },
              { value: 2, label: "Extension (decerebrate)" },
              { value: 1, label: "No response" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setMotorResponse(option.value)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                  motorResponse === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">{option.value}</span> - {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {totalScore > 0 && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">{totalScore}/15</div>
            <div className={`text-lg font-semibold mb-2 ${
              interpretation.color === 'green' ? 'text-green-600' :
              interpretation.color === 'yellow' ? 'text-yellow-600' :
              interpretation.color === 'red' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {interpretation.level}
            </div>
            <div className="text-sm text-gray-600">{interpretation.description}</div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Eye: {eyeResponse} + Verbal: {verbalResponse} + Motor: {motorResponse} = {totalScore}
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Clinical Tools Page
const ClinicalToolsPage = () => {
  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Clinical Assessment Tools</h1>
        <p className="text-gray-600">Essential EMT-B clinical assessment and calculation tools</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculatorsUI.map((tool) => (
          <Link key={tool.id} to={`/tools/${tool.id}`} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:scale-105">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 bg-${tool.color}-100 rounded-lg flex items-center justify-center`}>
                <tool.icon className={`w-6 h-6 text-${tool.color}-600`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="link text-sm font-medium">Open Tool</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

// Tools & Reference landing (Medscape-style)
const ToolsReferencePage: React.FC = () => {
  const referenceLinks: { label: string; to: string; icon: React.ReactNode }[] = [
    { label: 'Medications', to: '/medications', icon: <PillIcon /> },
    { label: 'Conditions & Care Pathways', to: '/protocols', icon: <AlertCircle className="w-4 h-4" /> },
    { label: 'Protocols & Guidelines', to: '/protocols', icon: <ClipboardList className="w-4 h-4" /> },
    { label: 'Anatomy & Physiology', to: '/modules', icon: <Brain className="w-4 h-4" /> },
    { label: 'Procedures & Skills', to: '/med-simulations', icon: <Stethoscope className="w-4 h-4" /> },
  { label: 'Flashcards & Visuals', to: '/emtb/flashcards', icon: <ImageIcon /> },
    { label: 'Simulations & Quizzes', to: '/quiz', icon: <CheckSquare className="w-4 h-4" /> },
  ];

  const toolLinks: { label: string; to: string; icon: React.ReactNode }[] = [
  { label: 'Patient Assessment Practice', to: '/tools/patient-assessment', icon: <Stethoscope className="w-4 h-4" /> },
    { label: 'Drug Interaction Checker (planned)', to: '/tools/interaction-checker', icon: <LinkIcon /> },
    { label: 'Pill Identifier (planned)', to: '/tools/pill-identifier', icon: <PillIcon /> },
    { label: 'Calculators', to: '/tools/calculators', icon: <Calculator className="w-4 h-4" /> },
  { label: 'Decision Support', to: '/tools/calculators', icon: <Target className="w-4 h-4" /> },
  { label: 'PCR Report Practice', to: '/tools/pcr-practice', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <main className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Tools & Reference</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-xl border border-gray-200">
              <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Reference</h2>
              </div>
              <ul className="divide-y divide-gray-100">
                {referenceLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="flex items-center justify-between px-6 py-3 hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <span className="text-primary">{item.icon}</span>
                        <span className="text-gray-800 font-medium">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white rounded-xl border border-gray-200">
              <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Tools</h2>
              </div>
              <ul className="divide-y divide-gray-100">
                {toolLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="flex items-center justify-between px-6 py-3 hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <span className="text-primary">{item.icon}</span>
                        <span className="text-gray-800 font-medium">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Training Collections</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/tools/gcs" className="flex items-center space-x-3 group">
                    <div className="w-14 h-10 bg-gray-100 rounded-md" />
                    <span className="group-hover:underline text-gray-800">Glasgow Coma Scale (GCS)</span>
                  </Link>
                </li>
                <li>
                  <Link to="/tools/burn-bsa" className="flex items-center space-x-3 group">
                    <div className="w-14 h-10 bg-gray-100 rounded-md" />
                    <span className="group-hover:underline text-gray-800">Burn Surface Area Estimator</span>
                  </Link>
                </li>
                <li>
                  <Link to="/med-simulations" className="flex items-center space-x-3 group">
                    <div className="w-14 h-10 bg-gray-100 rounded-md" />
                    <span className="group-hover:underline text-gray-800">Medication Skills Simulations</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

// PCR Report Writing Practice (SOAP & Hybrid)
const PCRPracticePage: React.FC = () => {
  type Scenario = {
    id: string;
    title: string;
    dispatch: string;
    setting: string;
    patient: { age: number; sex: 'male' | 'female' | 'non-binary'; weightKg?: number };
    chiefComplaint: string;
    onset: string;
    history: string;
    meds: string;
    allergies: string;
    vitals: { time: string; hr: number; bp: string; rr: number; spo2: number; tempC?: number; bgl?: number; gcs?: number }[];
    exam: string;
    impressionHints: string[];
    redFlags: string[];
    preferredMethod?: 'SOAP' | 'Hybrid';
  complications?: string[];
  };

  const [method, setMethod] = React.useState<'SOAP' | 'Hybrid'>('SOAP');
  const [scenario, setScenario] = React.useState<Scenario | null>(null);
  const [S, setS] = React.useState('');
  const [O, setO] = React.useState('');
  const [A, setA] = React.useState('');
  const [P, setP] = React.useState('');
  const [hybrid, setHybrid] = React.useState({
    scene: '',
    primary: '',
    secondary: '',
    care: '',
    responseDisposition: ''
  });
  const [feedback, setFeedback] = React.useState<string[]>([]);
  const [score, setScore] = React.useState<number | null>(null);
  const [chaos, setChaos] = React.useState<boolean>(false);

  const rand = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
  const randint = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const pad2 = (n: number) => n.toString().padStart(2, '0');
  const nowTime = () => {
    const d = new Date();
    return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  };

  const makeScenario = (useChaos: boolean): Scenario => {
    const complaints = [
      'Chest pain starting 20 minutes ago while watching TV',
      'Shortness of breath at rest with wheezing',
      'Lower abdominal pain with nausea',
      'Mechanical fall with right hip pain',
      'Witnessed seizure, now post-ictal',
      'Allergic reaction after peanuts; hives and throat tightness',
      'Low blood sugar; confused and diaphoretic',
      'Possible overdose; found somnolent with shallow breathing',
      'Facial droop and slurred speech, onset 30 minutes ago',
      'MVC, restrained driver with neck pain'
    ];
    const settings = ['private residence living room', 'second-floor apartment', 'restaurant dining area', 'grocery store aisle', 'roadside shoulder', 'workplace office', 'school gymnasium'];
    const medsPool = ['lisinopril', 'metformin', 'albuterol inhaler', 'atorvastatin', 'warfarin', 'insulin glargine', 'none known'];
    const allergyPool = ['penicillin', 'peanuts', 'latex', 'shellfish', 'none known'];
    const sex: Scenario['patient']['sex'] = rand(['male', 'female', 'non-binary']);
    const age = randint(8, 88);
    const cc = rand(complaints);
    const v1 = { time: nowTime(), hr: randint(58, 130), bp: `${randint(90, 170)}/${randint(50, 100)}`, rr: randint(10, 30), spo2: randint(86, 99), tempC: Math.random() < 0.4 ? +(36 + Math.random() * 2).toFixed(1) as any : undefined, bgl: Math.random() < 0.4 ? randint(40, 350) : undefined, gcs: randint(13, 15) };
    const v2 = { ...v1, time: nowTime(), hr: Math.max(50, Math.min(140, v1.hr + randint(-8, 8))), bp: `${randint(90, 170)}/${randint(50, 100)}`, rr: Math.max(8, Math.min(30, v1.rr + randint(-4, 4))), spo2: Math.max(80, Math.min(100, v1.spo2 + randint(-2, 3))) };
    const base: Scenario = {
      id: Math.random().toString(36).slice(2, 8),
  title: 'PCR Practice Scenario',
      dispatch: `Dispatched for ${cc.toLowerCase()} at ${nowTime()}.`,
      setting: rand(settings),
      patient: { age, sex },
      chiefComplaint: cc,
      onset: rand(['sudden', 'gradual', 'intermittent']),
      history: rand(['HTN, T2DM', 'COPD', 'CAD s/p stent', 'No significant history', 'Epilepsy']),
      meds: rand(medsPool),
      allergies: rand(allergyPool),
      vitals: [v1, v2],
      exam: rand([
        'Awake, oriented ×3. Skin warm, pink, diaphoretic. Lungs clear/wheezes noted. Pupils equal/reactive. No focal deficits. Tenderness at site of pain.',
        'Lethargic but arousable. Skin cool, pale. Wheezes posteriorly. Abdomen soft with RLQ tenderness. Neuro grossly intact.',
        'Anxious, speaking in short phrases. Accessory muscle use. Hives on chest/arms. No stridor.']) ,
      impressionHints: ['Think life threats first; link findings to probable causes.'],
      redFlags: ['Hypotension', 'Hypoxia', 'Altered mental status', 'Chest pain with diaphoresis', 'Unilateral neuro deficits'],
      preferredMethod: Math.random() < 0.5 ? 'SOAP' : 'Hybrid'
    };
    if (!useChaos) return base;
    // Inject Chaos complications
    const twists = [
      'Pulse oximeter not reading; batteries dead',
      'Patient vomits into BVM mask mid-ventilation',
      'Language barrier—patient speaks limited English; no interpreter',
      'Apartment is dark and cluttered; limited room to maneuver',
      'Multiple patients: 3 ambulatory, 1 screaming, 1 unresponsive',
      'Leaking gasoline odor nearby; bystanders with lit cigarettes',
      'Downed power line on vehicle; arcing observed',
      'Protective dog impeding access to patient',
      'Cervical collars adult sizes depleted; only pediatric collars available',
      'Suction battery failing; manual suction intermittent'
    ];
    const selected = twists.sort(()=>Math.random()-0.5).slice(0, 2);
    const cScenario = {
      ...base,
      dispatch: selected.includes('Multiple patients: 3 ambulatory, 1 screaming, 1 unresponsive') ?
        `Dispatched for possible MCI with ${cc.toLowerCase()} among victims at ${nowTime()}.` : base.dispatch,
      complications: selected,
      exam: base.exam + ' ' + selected.map(s => `[Complication: ${s}]`).join(' ')
    } as Scenario;
    return cScenario;
  };

  React.useEffect(() => {
    if (!scenario) {
      const sc = makeScenario(chaos);
      setScenario(sc);
      setMethod(sc.preferredMethod || 'SOAP');
    }
  }, [scenario]);

  const resetInputs = () => {
    setS(''); setO(''); setA(''); setP(''); setHybrid({ scene: '', primary: '', secondary: '', care: '', responseDisposition: '' });
    setFeedback([]); setScore(null);
  };

  const regenerate = () => { setScenario(makeScenario(chaos)); resetInputs(); };

  const sanitize = (s: string) => s.toLowerCase();
  const contains = (s: string, term: string) => sanitize(s).includes(term.toLowerCase());

  const analyze = () => {
    const f: string[] = [];
    const sectionsText = method === 'SOAP' ? `${S}\n${O}\n${A}\n${P}` : `${hybrid.scene}\n${hybrid.primary}\n${hybrid.secondary}\n${hybrid.care}\n${hybrid.responseDisposition}`;
    const len = sectionsText.trim().length;
    if (len < 200) f.push('Narrative is short; add detail to paint the picture.');
    // Structure checks
    if (method === 'SOAP') {
      if (!S.trim()) f.push('Subjective is empty: include chief complaint in quotes and history in patient’s words.');
      if (!O.trim()) f.push('Objective is empty: include scene, assessment findings, and full vitals with times.');
      if (!A.trim()) f.push('Assessment is empty: provide differential/priorities (e.g., ACS vs. GERD, asthma vs. CHF).');
      if (!P.trim()) f.push('Plan is empty: treatments performed, patient response, transport decision, destination, and handoff.');
    } else {
      if (!hybrid.scene) f.push('Scene summary missing: MOI/NOI, environment, patient position/appearance.');
      if (!hybrid.primary) f.push('Primary survey missing: ABCs, life threats, initial interventions.');
      if (!hybrid.secondary) f.push('Secondary exam missing: OPQRST/SAMPLE, focused/rapid exam, serial vitals.');
      if (!hybrid.care) f.push('Care section missing: treatments, times, doses, routes, patient response.');
      if (!hybrid.responseDisposition) f.push('Disposition missing: transport mode/position, destination, handoff summary.');
    }
    // Content checks
  const text = sectionsText;
    if (scenario) {
      const ageStr = scenario.patient.age.toString();
      if (!text.match(/\b(\d{1,3})[- ]?(year|yr|yo|y\/o)/i) && !contains(text, ageStr)) f.push('Include patient age.');
      if (!text.match(/\b(male|female|non-binary)\b/i)) f.push('State patient sex.');
      if (!text.match(/\b(\d{2}:\d{2})\b/)) f.push('Use 24-hour times for key events and vitals (e.g., 14:32).');
      if (!text.match(/BP\s*\d{2,3}\/\d{2,3}|\b\d{2,3}\/\d{2,3}\b/i)) f.push('Document blood pressure.');
      if (!text.match(/HR\s*\d{2,3}|pulse\s*\d{2,3}/i)) f.push('Document heart rate (HR or pulse).');
      if (!text.match(/RR\s*\d{1,2}|resp(irations)?\s*\d{1,2}/i)) f.push('Document respiratory rate (RR).');
      if (!text.match(/SpO2\s*\d{2}/i)) f.push('Document SpO2.');
      if (contains(scenario.chiefComplaint, 'blood sugar') || (scenario.vitals[0].bgl && scenario.vitals[0].bgl < 70)) {
        if (!text.match(/BGL\s*\d{2,3}/i)) f.push('Include blood glucose (BGL) for suspected glucose problems.');
      }
      if (!text.match(/consent|permission|refused/i)) f.push('Include consent/permission or refusal details.');
  if (!text.match(/transport|tx to|transferred care|handoff|report given/i)) f.push('Include transport and handoff details.');
  if (!text.match(/dispatched|dispatch/i)) f.push('Include nature/type of dispatch.');
  if (!text.match(/found|upon arrival|on arrival|at scene/i)) f.push('Describe initial scene assessment and where/how patient was found.');
  if (!text.match(/position|supine|prone|sitting|standing|ambulatory/i)) f.push('Document patient position and ambulatory status.');
  if (!text.match(/moved to|transferred to|stretcher|cot|draw[- ]?sheet|walked with assistance|carried/i)) f.push('Describe how the patient was transferred to the ambulance.');
  if (!text.match(/administered|given|dose|mg|mcg|mL|spray|puffs/i)) f.push('List medications administered with exact dosages and routes.');
  if (!text.match(/suppl(y|ies)|gauze|bandage|BVM|oxygen|monitor|splint|cervical collar|tourniquet/i)) f.push('Document supplies used on the call.');
  if (!text.match(/scene safe|safety|hazard|unsafe|secured by police|threat/i)) f.push('Note any safety concerns and mitigation.');
  if (text.match(/IV/i) && !text.match(/locked|saline lock|flowing|KVO|rate/i)) f.push('If existing IV present, state whether locked or flowing and at what rate.');
  if (!text.match(/MOI|mechanism|MVC|fall|trauma|blunt|penetrating/i) && contains(scenario.chiefComplaint, 'pain')) f.push('If trauma suspected, include mechanism of injury details.');
  if (!text.match(/police|law enforcement|LEO|fire|FD|additional EMS/i)) f.push('Include presence of other responders (EMS/FD/LE) if applicable.');
  if (!text.match(/en route|during transport|enroute/i)) f.push('Include patient response to treatment en route.');
  if (!text.match(/mileage|mi\.|miles|km/i)) f.push('Include fractional mileage per agency policy.');
  if (!text.match(/signature|signed|consent form/i)) f.push('Include required signatures/verifications as applicable.');
  if (!text.match(/lights and sirens|L&S|code ?3|code three|code 3|code 2/i)) f.push('State transport priority/mode (e.g., code 2 vs. code 3).');
      // Chaos-specific expectations
      const comp = scenario.complications || [];
      const want = (re: RegExp) => re.test(text);
      if (comp.some(c=>/Pulse oximeter not reading/i.test(c))) {
        if (!want(/(spo2 (not|un)available|pulse ox (failed|not working)|no.*spo2)/i) && !want(/skin (color|signs)|cyanosis|capillary refill/i)) {
          f.push('Pulse ox failed: note alternative oxygenation assessment (skin signs, cyanosis, capillary refill) and that SpO2 was unavailable.');
        }
      }
      if (comp.some(c=>/vomits into BVM/i.test(c))) {
        if (!want(/stop (ventilation|bagging)|remove (mask|BVM)|suction|log[- ]?roll|airway adjunct|reassess breathing/i)) {
          f.push('Emesis in BVM: stop ventilations, remove mask, suction airway, consider logroll, re-establish airway/adjuncts, then resume ventilations.');
        }
      }
      if (comp.some(c=>/Multiple patients/i.test(c))) {
        if (!want(/START|RPM|triage|immediate|delayed|minor|black|walking wounded|treatment area/i)) {
          f.push('Multiple patients: document START/RPM triage, tagging, and prioritization (e.g., address unresponsive first; direct ambulatory to a treatment area).');
        }
      }
      if (comp.some(c=>/Downed power line/i.test(c))) {
        if (!want(/scene (unsafe|safety)|secure (scene|area)|utility notified|distance maintained|no touch|wait for clearance/i)) {
          f.push('Downed lines: declare scene unsafe, maintain distance, request utility, and defer contact until cleared.');
        }
      }
      if (comp.some(c=>/Leaking gasoline|cigarettes/i.test(c))) {
        if (!want(/remove ignition sources|no smoking|move patients|safe perimeter|ventilation/i)) {
          f.push('Flammable hazard: control ignition sources, move patients to safety, and establish a safe perimeter.');
        }
      }
      if (comp.some(c=>/Protective dog/i.test(c))) {
        if (!want(/secure (dog|animal)|law enforcement|animal control|owner assistance/i)) {
          f.push('Protective animal: secure the animal (owner/LE/animal control) before close contact.');
        }
      }
      if (comp.some(c=>/Cervical collars.*pediatric/i.test(c))) {
        if (!want(/improvise|towel roll|padding|tape|manual stabilization/i)) {
          f.push('Collar shortage: improvise with towel rolls/padding and manual stabilization with securing tape as appropriate.');
        }
      }
      if (comp.some(c=>/Suction battery/i.test(c))) {
        if (!want(/manual suction|limited suction|recovery position|prioritize airway/i)) {
          f.push('Suction limitations: employ manual suction, recovery position if needed, and prioritize airway.');
        }
      }
    }
    // Language quality
    if (text.match(/pt\b/i)) f.push('Use “patient” instead of “pt” in formal documentation.');
    if (text.match(/approx|~|about/i)) f.push('Avoid “about/approx”; document exact or “estimated” with rationale.');
    if (text.match(/appears|seems/i) && !text.match(/by report|per bystander|per patient/i)) f.push('Avoid subjective words like “appears/seems” unless attributed (per patient/bystander).');
    if (!text.match(/".*"/)) f.push('Add a direct quote from the patient for chief complaint or key statements.');
    if (!text.match(/position/i)) f.push('Document patient position during transport (e.g., semi-Fowler’s, left lateral).');
    if (!text.match(/safety|secured|belts|rails/i)) f.push('Include safety measures (belts, rails, cot secured).');

    // Simple scoring (0-100)
    let s = 100;
    s -= Math.min(40, f.length * 5);
    setScore(s);
    setFeedback(f);
  };

  // Essential elements auto-detection for checklist rendering
  const combinedText = (method === 'SOAP'
    ? `${S}\n${O}\n${A}\n${P}`
    : `${hybrid.scene}\n${hybrid.primary}\n${hybrid.secondary}\n${hybrid.care}\n${hybrid.responseDisposition}`).toLowerCase();
  const has = (re: RegExp) => re.test(combinedText);
  const essentials = [
    { label: 'Nature/type of dispatch', ok: has(/dispatched|dispatch/) },
    { label: 'Initial scene assessment and patient condition', ok: has(/found|upon arrival|on arrival|at scene/) },
    { label: 'Patient position and ambulatory status', ok: has(/position|supine|prone|sitting|standing|ambulatory/) },
    { label: 'Transfer method to ambulance (stretcher, draw-sheet, walk)', ok: has(/stretcher|cot|draw[- ]?sheet|walked with assistance|carried/) },
    { label: 'Medications given with dosages and routes', ok: has(/administered|given/) && has(/mg|mcg|ml|spray|puffs/) },
    { label: 'Supplies used (e.g., oxygen, BVM, gauze, monitor)', ok: has(/suppl(y|ies)|gauze|bandage|bvm|oxygen|monitor|splint|cervical collar|tourniquet/) },
    { label: 'Safety concerns and mitigation', ok: has(/scene safe|safety|hazard|unsafe|secured by police|threat/) },
    { label: 'Existing IV monitored/locked/flowing', ok: has(/iv/) && has(/locked|saline lock|flowing|kvo|rate/) },
    { label: 'Mechanism of injury if trauma suspected', ok: has(/moi|mechanism|mvc|fall|trauma|blunt|penetrating/) },
    { label: 'Other responders (EMS/FD/LE) noted', ok: has(/police|law enforcement|leo|fire|fd|additional ems/) },
    { label: 'Assessment and response to treatment en route', ok: has(/en route|enroute|during transport/) && has(/responded|improved|no change|worsened/) },
  ];

  const exampleSOAP = `Unit [Unit Name/Number] dispatched to [nature of dispatch]. Patient is a [age]-year-old [gender] presenting [reported symptoms] reported by [bystander/family]. [Add dispatch details if relevant]. Unit en route at [time] [with lights and sirens if applicable].\n\nPatient found [location/position]. Patient [level of responsiveness] and [assessment details: symptoms, trauma, skin, temp]. Vitals assessed as noted.\n\nInitial assessment performed while patient [location/position]. Assessment observed [key findings]. [#] crew members performed [interventions with times/doses/routes]. Patient responded [details].\n\nPatient moved to stretcher [method] by [#] crew members, secured and moved to ambulance. Once loaded, vitals reassessed. Unit initiated [transport priority/mode] to [destination]. During transport, patient condition [details]. Upon arrival, crew to [location/room]. Patient moved to [equipment] via [method]. No further requests from staff. Unit clear.\n\nNote: List all interventions and supplies used. Document CPR duration (if performed) and medication dosages. Include rationale for performing or not performing interventions.`;

  const loadTemplate = (t: 'SOAP' | 'Hybrid') => {
    if (t === 'SOAP') {
      setS('Chief complaint in quotes. Onset, provocation, quality, radiation, severity, time (OPQRST). Relevant SAMPLE history (meds, allergies, past). Bystander report.');
      setO('Scene description; patient appearance/position. Primary survey (ABCs), pertinent positives/negatives. Full vitals with times. Focused/secondary exam findings.');
      setA('Working impression and differentials. Severity and time-sensitive concerns.');
      setP('Interventions (times/doses/routes), patient response, consult/medical control, transport mode/position, destination, handoff summary.');
    } else {
      setHybrid({
        scene: 'Dispatch info, scene safety, environment, patient position/appearance.',
        primary: 'Airway/Breathing/Circulation findings, life threats, immediate interventions.',
        secondary: 'OPQRST/SAMPLE, focused or head-to-toe exam, serial vitals with times.',
        care: 'Treatments with times/doses/routes, monitoring, re-evaluations, patient response.',
        responseDisposition: 'Decision to transport, mode/position, destination, notifications, handoff.'
      });
    }
  };

  if (!scenario) return <main className="p-6"><div className="text-gray-600">Loading scenario…</div></main>;

  return (
    <main className="p-6">
      <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-30 rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">PCR Report Practice</h1>
            <p className="text-gray-600 text-sm">Practice writing clear, defensible narratives. Choose SOAP or Hybrid, draft, then get targeted guidance.</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-1 text-sm">
              <input type="checkbox" checked={chaos} onChange={(e)=>{ setChaos(e.target.checked); setScenario(makeScenario(e.target.checked)); resetInputs(); }} />
              Chaos Mode
            </label>
            <button onClick={regenerate} className="text-sm link font-medium">New Random Scenario</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Scenario</h2>
            </div>
            <div className="mt-3 text-sm text-gray-800 space-y-1">
              <div><strong>Dispatch:</strong> {scenario.dispatch}</div>
              <div><strong>Setting:</strong> {scenario.setting}</div>
              <div><strong>Patient:</strong> {scenario.patient.age}-year-old {scenario.patient.sex}</div>
              <div><strong>Chief Complaint:</strong> {scenario.chiefComplaint}</div>
              <div><strong>Onset:</strong> {scenario.onset}; <strong>History:</strong> {scenario.history}; <strong>Meds:</strong> {scenario.meds}; <strong>Allergies:</strong> {scenario.allergies}</div>
              <div><strong>Vitals:</strong> {scenario.vitals.map(v=>`[${v.time}] BP ${v.bp}, HR ${v.hr}, RR ${v.rr}, SpO2 ${v.spo2}${v.bgl?`, BGL ${v.bgl}`:''}`).join(' → ')}</div>
              <div><strong>Exam:</strong> {scenario.exam}</div>
              {scenario.complications && scenario.complications.length>0 && (
                <div className="pt-1"><strong>Complications:</strong> <span className="inline-block text-xs bg-amber-100 text-amber-800 border border-amber-200 rounded px-2 py-0.5">Chaos Mode</span> — {scenario.complications.join('; ')}</div>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-700">Method:</span>
                <select value={method} onChange={(e)=>setMethod(e.target.value as any)} className="text-sm border rounded px-2 py-1">
                  <option value="SOAP">SOAP</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <button onClick={()=>loadTemplate(method)} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Load Template</button>
            </div>

    {method === 'SOAP' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">S — Subjective</label>
      <textarea value={S} onChange={(e)=>setS(e.target.value)} rows={4} className="w-full border rounded-lg p-2 text-sm border-amber-300 bg-amber-50/30" placeholder={'"It feels like pressure in my chest". Onset/time; OPQRST; SAMPLE history.'} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">O — Objective</label>
      <textarea value={O} onChange={(e)=>setO(e.target.value)} rows={5} className="w-full border rounded-lg p-2 text-sm border-sky-300 bg-sky-50/30" placeholder={'Scene/safety, patient position/appearance, ABCs, exam findings, serial vitals with 24h times.'} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">A — Assessment</label>
      <textarea value={A} onChange={(e)=>setA(e.target.value)} rows={3} className="w-full border rounded-lg p-2 text-sm border-rose-300 bg-rose-50/30" placeholder={'Working impression and differentials; time-sensitive risks.'} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">P — Plan</label>
      <textarea value={P} onChange={(e)=>setP(e.target.value)} rows={4} className="w-full border rounded-lg p-2 text-sm border-emerald-300 bg-emerald-50/30" placeholder={'Treatments with times/doses/routes, patient response, transport mode/position/destination, handoff.'} />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scene Summary</label>
      <textarea value={hybrid.scene} onChange={(e)=>setHybrid({...hybrid, scene: e.target.value})} rows={3} className="w-full border rounded-lg p-2 text-sm border-indigo-300 bg-indigo-50/30" placeholder={'Dispatch, scene safety, environment, patient position/appearance.'} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Survey</label>
      <textarea value={hybrid.primary} onChange={(e)=>setHybrid({...hybrid, primary: e.target.value})} rows={3} className="w-full border rounded-lg p-2 text-sm border-rose-300 bg-rose-50/30" placeholder={'Airway/Breathing/Circulation, life threats, immediate interventions.'} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secondary/History</label>
      <textarea value={hybrid.secondary} onChange={(e)=>setHybrid({...hybrid, secondary: e.target.value})} rows={4} className="w-full border rounded-lg p-2 text-sm border-amber-300 bg-amber-50/30" placeholder={'OPQRST/SAMPLE, focused or head-to-toe exam, serial vitals with times.'} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Care & Reassessment</label>
      <textarea value={hybrid.care} onChange={(e)=>setHybrid({...hybrid, care: e.target.value})} rows={4} className="w-full border rounded-lg p-2 text-sm border-sky-300 bg-sky-50/30" placeholder={'Treatments with times/doses/routes, monitoring, reevaluations, patient response.'} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Response & Disposition</label>
      <textarea value={hybrid.responseDisposition} onChange={(e)=>setHybrid({...hybrid, responseDisposition: e.target.value})} rows={3} className="w-full border rounded-lg p-2 text-sm border-emerald-300 bg-emerald-50/30" placeholder={'Transport mode/position, destination, notifications, handoff.'} />
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <button onClick={analyze} className="btn btn-primary">Analyze Narrative</button>
              <div className="text-sm text-gray-600">{score !== null && (<span>Score: <span className={score>=80? 'text-green-600':'text-orange-600'}>{score}</span>/100</span>)}</div>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-md font-semibold text-gray-900">Guidance</h3>
            {feedback.length === 0 ? (
              <p className="text-sm text-gray-600 mt-2">Write your narrative and click Analyze to get targeted suggestions.</p>
            ) : (
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-800 space-y-1">
                {feedback.map((g, i)=> <li key={i}>{g}</li>)}
              </ul>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-md font-semibold text-gray-900">Pro Tips</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-800 space-y-1">
              <li>Use 24-hour times and include serial vitals.</li>
              <li>Quote the patient for chief complaint: "It feels like…"</li>
              <li>State findings, not judgments. Avoid “appears/seems” without attribution.</li>
              <li>Document consent/refusal, transport mode/position, destination, and handoff.</li>
              <li>Spell out terms; limit abbreviations to standards (BP, HR, RR, SpO2).</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-md font-semibold text-gray-900">Essential elements checklist</h3>
            <ul className="mt-2 text-sm text-gray-800 space-y-1">
              {essentials.map((e, i)=> (
                <li key={i} className="flex items-center">
                  <span className={`inline-flex items-center justify-center w-4 h-4 mr-2 rounded ${e.ok? 'bg-green-100 text-green-700 border border-green-300':'bg-gray-100 text-gray-600 border border-gray-300'}`}>{e.ok? '✓':'•'}</span>
                  <span>{e.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-semibold text-gray-900">Example SOAP narrative</h3>
              <button
                onClick={()=> { setMethod('SOAP'); setS(exampleSOAP); setO(''); setA(''); setP(''); }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >Insert</button>
            </div>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded p-2">
{exampleSOAP}
            </pre>
          </div>
        </aside>
      </div>
    </main>
  );
};

// Minimal icons for Pills/Images when lucide icon not directly mapped
const PillIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 14L21 3" />
    <path d="M3.5 20.5a4.95 4.95 0 0 0 7 0l6-6a4.95 4.95 0 1 0-7-7l-6 6a4.95 4.95 0 0 0 0 7z" />
  </svg>
);

const ImageIcon: React.FC = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const LinkIcon: React.FC = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 1 7 0l2 2a5 5 0 0 1-7 7l-2-2" />
    <path d="M14 11a5 5 0 0 1-7 0l-2-2a5 5 0 0 1 7-7l2 2" />
  </svg>
);

// Simple placeholder for not-yet-implemented tools
const PlaceholderTool: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
  <main className="p-6">
    <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description || 'This feature is under development. Check back soon.'}</p>
      <Link to="/tools" className="inline-flex items-center text-blue-600 hover:text-blue-700">
        <ChevronRight className="w-4 h-4 rotate-180" />
        <span>Back to Tools & Reference</span>
      </Link>
    </div>
  </main>
);

// Patient Assessment Practice (Medical & Trauma) with Voice Proctor
type AssessmentMode = 'medical' | 'trauma';

type RubricItem = { key: string; label: string; points: number; critical?: boolean; synonyms: string[] };
type RubricSection = { id: string; title: string; items: RubricItem[] };
type Rubric = { timeLimitSecs: number; sections: RubricSection[]; criticalCriteriaNotes: string[] };

const medicalRubric: Rubric = {
  timeLimitSecs: 15 * 60,
  sections: [
    {
      id: 'scene',
      title: 'Scene Size-Up',
      items: [
        { key: 'ppe', label: 'Verbalizes PPE precautions', points: 1, critical: true, synonyms: ['ppe', 'gloves', 'bsi', 'body substance isolation'] },
        { key: 'sceneSafe', label: 'Confirms scene is safe', points: 1, critical: true, synonyms: ['scene safe', 'scene safety'] },
        { key: 'noi', label: 'Determines nature of illness', points: 1, synonyms: ['noi', 'nature of illness'] },
        { key: 'patients', label: 'Determines number of patients', points: 1, synonyms: ['number of patients'] },
        { key: 'additionalResources', label: 'Requests additional resources as needed', points: 1, synonyms: ['additional resources', 'als', 'backup'] },
        { key: 'spine', label: 'Considers spine precautions when indicated', points: 1, synonyms: ['c-spine', 'spinal precautions', 'spine stabilization'] },
      ]
    },
    {
      id: 'primary',
      title: 'Primary Assessment',
      items: [
        { key: 'generalImpression', label: 'States general impression', points: 1, synonyms: ['general impression'] },
        { key: 'loc', label: 'Assesses LOC (AVPU)', points: 1, synonyms: ['avpu', 'level of consciousness'] },
        { key: 'chiefLifeThreats', label: 'Identifies chief complaint / life threats', points: 1, synonyms: ['chief complaint', 'life threat'] },
        { key: 'airwayBreathing', label: 'Assesses airway/breathing; ensures adequate ventilation; oxygen if indicated', points: 3, critical: true, synonyms: ['airway', 'breathing', 'ventilation', 'oxygen'] },
        { key: 'circulation', label: 'Assesses circulation (bleeding, skin, pulse)', points: 3, critical: true, synonyms: ['bleeding', 'skin', 'pulse'] },
        { key: 'priority', label: 'Determines priority and transport decision', points: 1, critical: true, synonyms: ['priority', 'transport decision', 'rapid transport'] },
      ]
    },
    {
      id: 'history',
      title: 'History of Present Illness & PMH',
      items: [
        { key: 'hpi', label: 'Explores HPI (OPQRST + clarifiers)', points: 6, synonyms: ['opqrst', 'onset', 'provocation', 'quality', 'radiation', 'severity', 'time'] },
        { key: 'pmh', label: 'Obtains SAMPLE history', points: 5, synonyms: ['sample', 'allergies', 'medications', 'past history', 'last oral intake', 'events'] },
      ]
    },
    {
      id: 'secondary',
      title: 'Secondary Assessment & Vitals',
      items: [
        { key: 'secondary', label: 'Performs focused or full-body assessment as appropriate', points: 4, synonyms: ['secondary assessment', 'focused exam', 'head to toe'] },
        { key: 'vitals', label: 'Obtains vital signs with qualities', points: 4, synonyms: ['vital signs', 'bp', 'pulse', 'respirations', 'respiratory rate'] },
        { key: 'fieldImpression', label: 'States field impression', points: 1, synonyms: ['impression', 'working diagnosis'] },
        { key: 'interventions', label: 'Initiates appropriate interventions', points: 2, synonyms: ['interventions', 'treatment'] },
      ]
    },
    {
      id: 'reassess',
      title: 'Reassessment & Report',
      items: [
        { key: 'reassessment', label: 'Explains frequency and content of reassessment', points: 1, synonyms: ['reassess', 'reassessment'] },
        { key: 'report', label: 'Delivers concise verbal report', points: 1, synonyms: ['verbal report', 'handoff'] },
      ]
    }
  ],
  criticalCriteriaNotes: [
    'No PPE/scene safety',
    'Does not manage airway/breathing/circulation when indicated',
    'No timely transport decision (within limit)'
  ]
};

const traumaRubric: Rubric = {
  timeLimitSecs: 10 * 60,
  sections: [
    {
      id: 'scene',
      title: 'Scene Size-Up',
      items: [
        { key: 'ppe', label: 'Verbalizes PPE precautions', points: 1, critical: true, synonyms: ['ppe', 'gloves', 'bsi'] },
        { key: 'sceneSafe', label: 'Confirms scene is safe', points: 1, critical: true, synonyms: ['scene safe', 'scene safety'] },
        { key: 'moi', label: 'Determines mechanism of injury', points: 1, synonyms: ['moi', 'mechanism of injury'] },
        { key: 'patients', label: 'Determines number of patients', points: 1, synonyms: ['number of patients'] },
        { key: 'additionalResources', label: 'Requests additional resources as needed', points: 1, synonyms: ['additional resources', 'als', 'backup'] },
        { key: 'cspine', label: 'Considers spine stabilization', points: 1, critical: true, synonyms: ['c-spine', 'cervical spine'] },
      ]
    },
    {
      id: 'primary',
      title: 'Primary Assessment',
      items: [
        { key: 'generalImpression', label: 'States general impression', points: 1, synonyms: ['general impression'] },
        { key: 'loc', label: 'Assesses LOC (AVPU)', points: 1, synonyms: ['avpu', 'level of consciousness'] },
        { key: 'chiefLifeThreats', label: 'Identifies chief complaint / life threats', points: 1, synonyms: ['chief complaint', 'life threat'] },
        { key: 'airway', label: 'Opens/assesses airway and uses adjunct if indicated', points: 2, critical: true, synonyms: ['airway', 'jaw thrust', 'opa', 'npa'] },
        { key: 'breathing', label: 'Assesses breathing; ensures ventilation; O2; manages injuries', points: 4, critical: true, synonyms: ['breathing', 'ventilation', 'oxygen', 'seal chest'] },
        { key: 'circulation', label: 'Checks pulse/skin; controls major bleeding; treats shock', points: 4, critical: true, synonyms: ['pulse', 'bleeding', 'control bleeding', 'shock'] },
        { key: 'priority', label: 'Decides priority and transport decision', points: 1, critical: true, synonyms: ['priority', 'transport decision', 'rapid transport'] },
      ]
    },
    {
      id: 'secondary',
      title: 'Secondary Assessment',
      items: [
        { key: 'head', label: 'Inspects/palpates head/face/eyes/ears', points: 3, synonyms: ['head', 'face', 'eyes', 'ears', 'pupils'] },
        { key: 'neck', label: 'Examines neck (trachea, JVD) and c-spine', points: 2, synonyms: ['neck', 'trachea', 'jvd'] },
        { key: 'chest', label: 'Assesses chest (inspect/palpate/auscultate)', points: 3, synonyms: ['chest', 'lung sounds', 'rib'] },
        { key: 'abdomen', label: 'Assesses abdomen/pelvis', points: 3, synonyms: ['abdomen', 'pelvis'] },
        { key: 'extremities', label: 'Assesses extremities and PMS/CMS', points: 2, synonyms: ['extremities', 'cms', 'pms', 'motor sensory'] },
        { key: 'posterior', label: 'Assesses back/posterior', points: 2, synonyms: ['posterior', 'back', 'buttocks', 'lumbar'] },
        { key: 'managesWounds', label: 'Manages secondary injuries/wounds', points: 1, synonyms: ['dressings', 'splint'] },
        { key: 'vitals', label: 'Obtains baseline vitals', points: 1, synonyms: ['vitals', 'vital signs'] },
        { key: 'history', label: 'Attempts SAMPLE history', points: 1, synonyms: ['sample history', 'sample'] },
      ]
    }
  ],
  criticalCriteriaNotes: [
    'No PPE/scene safety',
    'Does not manage airway/breathing/hemorrhage/shock when indicated',
    'No transport decision within time limit'
  ]
};

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
const spokenIncludesAny = (spoken: string, terms: string[]) => terms.some(t => normalize(spoken).includes(normalize(t)));

const PatientAssessmentPractice: React.FC = () => {
  const [mode, setMode] = React.useState<AssessmentMode>('medical');
  const [scenario, setScenario] = React.useState<string>('Adult with chest pain, cool diaphoretic skin, 10/10 pressure, started 20 minutes ago watching TV.');
  const [spoken, setSpoken] = React.useState<string>('');
  const [autoScore, setAutoScore] = React.useState<{ total: number; earned: number; details: Record<string, boolean> }>({ total: 0, earned: 0, details: {} });
  const [proctorSpeaking, setProctorSpeaking] = React.useState<boolean>(false);
  const rubric = mode === 'medical' ? medicalRubric : traumaRubric;
  const checklist = React.useMemo(() => rubric.sections.flatMap(s => s.items), [rubric]);
  // Section color themes (for visual context in the checklist)
  const sectionTheme: Record<string, { badgeBg: string; badgeText: string; border: string }> = {
    scene: { badgeBg: 'bg-indigo-50', badgeText: 'text-indigo-700', border: 'border-indigo-300' },
    primary: { badgeBg: 'bg-rose-50', badgeText: 'text-rose-700', border: 'border-rose-300' },
    history: { badgeBg: 'bg-amber-50', badgeText: 'text-amber-700', border: 'border-amber-300' },
    secondary: { badgeBg: 'bg-sky-50', badgeText: 'text-sky-700', border: 'border-sky-300' },
    reassess: { badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-700', border: 'border-emerald-300' }
  };
  // Interactive Proctor Q&A
  type ScenarioFacts = {
    sceneSafe: boolean;
    patients: number;
    moi?: string;
    noi?: string;
    cspine?: boolean;
    loc: string;
    airway: string;
    breathing: string;
    respRate?: number;
    circulation: string;
    pulseRate?: number;
    skin?: string;
    majorBleeding?: boolean;
    lungSounds?: string;
    pupils?: string;
    vitals?: { bp: string; hr: number; rr: number; spo2?: number; temp?: string; glu?: number };
    sample?: { allergies: string; meds: string; history: string; lastOral: string; events: string };
    impression?: string;
  };
  const [interactiveProctor, setInteractiveProctor] = React.useState<boolean>(true);
  const [facts, setFacts] = React.useState<ScenarioFacts | null>(null);
  const lastProcessedLenRef = React.useRef<number>(0);

  // Persist Voice Practice preferences (mode, interactive proctor)
  React.useEffect(() => {
    try {
      const savedMode = localStorage.getItem('emt.voice.mode');
      const savedProctor = localStorage.getItem('emt.voice.proctor');
      if (savedMode === 'medical' || savedMode === 'trauma') setMode(savedMode as AssessmentMode);
      if (savedProctor !== null) setInteractiveProctor(savedProctor === '1');
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => { try { localStorage.setItem('emt.voice.mode', mode); } catch {} }, [mode]);
  React.useEffect(() => { try { localStorage.setItem('emt.voice.proctor', interactiveProctor ? '1' : '0'); } catch {} }, [interactiveProctor]);

  // Timer and transport decision tracking
  const limitSecs = rubric.timeLimitSecs;
  const [started, setStarted] = React.useState<boolean>(false);
  const [elapsed, setElapsed] = React.useState<number>(0);
  const startRef = React.useRef<number | null>(null);
  const tickRef = React.useRef<number | null>(null);
  const [transportAt, setTransportAt] = React.useState<number | null>(null);

  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

  // Append new transcript chunks and handle interactive Q&A
  React.useEffect(() => {
    setSpoken(prev => {
      if (transcript.length <= prev.length) return prev;
      return prev + transcript.slice(prev.length);
    });

    // Detect first transport decision mention and timestamp it
    if (started && transportAt === null) {
      const transportTerms = ['transport', 'rapid transport', 'priority transport', 'load and go', 'package for transport', 'initiate transport'];
      if (spokenIncludesAny(transcript, transportTerms)) {
        setTransportAt(elapsed);
      }
    }

    if (!interactiveProctor || !facts) return;
    const from = lastProcessedLenRef.current || 0;
    if (transcript.length <= from) return;
    const chunk = transcript.slice(from).toLowerCase();
    lastProcessedLenRef.current = transcript.length;
    const reply = proctorReplyFor(chunk, facts, mode);
    if (reply) {
      tts(reply);
      setSpoken(prev => prev + (prev.endsWith('\n') ? '' : '\n') + `Proctor: ${reply}`);
    }
  }, [transcript]);

  const generateFacts = (m: AssessmentMode, s: string): ScenarioFacts => {
    if (m === 'medical') {
      // Basic derivation from scenario string
      const chestPain = /chest pain|pressure/.test(s.toLowerCase());
      const sob = /shortness of breath|wheeze|wheezes/.test(s.toLowerCase());
      const altms = /altered/.test(s.toLowerCase());
      const facts: ScenarioFacts = {
        sceneSafe: true,
        patients: 1,
        noi: chestPain ? 'Chest pain' : sob ? 'Respiratory distress' : altms ? 'Altered mental status' : 'Medical complaint',
        loc: altms ? 'Responds to verbal' : 'Alert',
        airway: altms ? 'Patent with verbal stimuli' : 'Patent',
        breathing: sob ? 'Labored breathing' : 'Unlabored but uncomfortable',
        respRate: sob ? 28 : 20,
        circulation: chestPain ? 'Rapid, regular pulses' : 'Regular pulses',
        pulseRate: chestPain ? 108 : 92,
        skin: chestPain ? 'Cool, diaphoretic' : sob ? 'Warm, slightly diaphoretic' : 'Warm, dry',
        majorBleeding: false,
        lungSounds: sob ? 'Wheezes bilaterally' : 'Clear bilaterally',
        pupils: 'PERRL',
        vitals: { bp: chestPain ? '142/88' : '136/84', hr: chestPain ? 108 : 92, rr: sob ? 28 : 20, spo2: sob ? 92 : 96 },
        sample: { allergies: 'NKDA', meds: chestPain ? 'Aspirin daily; Lisinopril' : 'Albuterol PRN' , history: chestPain ? 'Hypertension' : sob ? 'Asthma' : 'Type 2 Diabetes', lastOral: '1 hour ago', events: s },
        impression: chestPain ? 'Possible ACS' : sob ? 'Respiratory distress' : 'Hypoglycemia vs other'
      };
      return facts;
    } else {
      // Trauma facts based on scenario snippets
      const mvc = /mvc|vehicle|driver|airbag|windshield/.test(s.toLowerCase());
      const fall = /fall/.test(s.toLowerCase());
      const assault = /assault|blunt/.test(s.toLowerCase());
      const facts: ScenarioFacts = {
        sceneSafe: true,
        patients: 1,
        moi: mvc ? 'High-speed MVC with airbag deployment' : fall ? 'Fall ~12 feet' : assault ? 'Blunt trauma to head/torso' : 'Trauma of unclear mechanism',
        cspine: mvc || fall,
        loc: 'Alert but anxious',
        airway: 'Patent',
        breathing: mvc ? 'Shallow, painful respirations' : 'Adequate with mild distress',
        respRate: mvc ? 24 : 20,
        circulation: assault ? 'Tachycardic, possible internal bleeding' : 'Tachycardic due to pain',
        pulseRate: assault ? 118 : 104,
        skin: 'Pale, cool',
        majorBleeding: false,
        lungSounds: mvc ? 'Diminished left' : 'Clear bilaterally',
        pupils: 'PERRL',
        vitals: { bp: assault ? '98/62' : '118/76', hr: assault ? 118 : 104, rr: mvc ? 24 : 20, spo2: 95 },
        sample: { allergies: 'NKDA', meds: 'None reported', history: 'No significant history', lastOral: '2 hours ago', events: s },
        impression: 'Multi-system trauma risk'
      };
      return facts;
    }
  };

  const proctorReplyFor = (chunk: string, f: ScenarioFacts, m: AssessmentMode): string | null => {
    const ask = (re: RegExp) => re.test(chunk);
    if (ask(/(scene).*(safe)|is my scene safe|scene safety/)) return f.sceneSafe ? 'Yes, the scene is safe.' : 'No, the scene is not safe.';
    if (ask(/\bbsi\b|\bppe\b/)) return 'Your PPE is on and appropriate for the scene.';
    if (ask(/(how many|number of) patients?/)) return `There ${f.patients === 1 ? 'is' : 'are'} ${f.patients} patient${f.patients === 1 ? '' : 's'}.`;
    if (m === 'trauma' && ask(/moi|mechanism/)) return f.moi ? `Mechanism of injury: ${f.moi}.` : 'Mechanism is unknown.';
    if (m === 'medical' && ask(/noi|nature of illness|what.*complaint/)) return f.noi ? `Nature of illness: ${f.noi}.` : 'Nature of illness is unclear.';
    if (m === 'trauma' && ask(/c[- ]?spine|cervical/)) return f.cspine ? 'C-spine stabilization is indicated.' : 'C-spine precautions are not indicated.';
    if (ask(/general impression|how.*look|sick or not/)) return f.impression ? `General impression: ${f.impression}.` : 'General impression: patient in moderate distress.';
    if (ask(/loc|level of consciousness|avpu/)) return `Level of consciousness: ${f.loc}.`;
    if (ask(/airway/)) return `Airway: ${f.airway}.`;
    if (ask(/breath|resp(irations)?/)) return `Breathing: ${f.breathing}. Respiratory rate approximately ${f.respRate ?? f.vitals?.rr ?? 18} per minute.`;
    if (ask(/oxygen|spo2|pulse oximetry/)) return `SpO2 approximately ${f.vitals?.spo2 ?? 96}%.`;
    if (ask(/pulse|heart( |-)rate/)) return `Pulse approximately ${f.pulseRate ?? f.vitals?.hr ?? 90} and ${/tachy|rapid|fast/.test(f.circulation||'rapid') ? 'rapid' : 'regular'}.`;
    if (ask(/skin/)) return `Skin is ${f.skin || 'warm and dry'}.`;
    if (ask(/bleed|hemorrhage/)) return f.majorBleeding ? 'You see significant external bleeding.' : 'No major external bleeding observed.';
    if (ask(/lung|breath sounds/)) return `Lung sounds: ${f.lungSounds || 'clear bilaterally'}.`;
    if (ask(/pupils/)) return `Pupils are ${f.pupils || 'equal and reactive to light'}.`;
    if (ask(/vital(s)?( signs)?/)) {
      const v = f.vitals; if (!v) return 'Vitals are not available.';
      return `Vitals: BP ${v.bp}, HR ${v.hr}, RR ${v.rr}${typeof v.spo2==='number' ? `, SpO2 ${v.spo2}%` : ''}.`;
    }
    if (ask(/opqrst|onset|provocation|quality|radiation|severity|time/)) return 'HPI: Onset 20 minutes ago; pressure quality; worse with exertion; non-radiating; severity 8 out of 10; constant since onset.';
    if (ask(/sample|allergies|medications|past history|last oral|events/)) {
      const s = f.sample; if (!s) return 'SAMPLE not available.';
      return `SAMPLE: Allergies ${s.allergies}. Medications ${s.meds}. History ${s.history}. Last oral intake ${s.lastOral}. Events: ${s.events}.`;
    }
    if (ask(/transport/)) return 'Transport decision acknowledged. Prepare the patient for transport.';
    return null;
  };

  React.useEffect(() => {
    if (started) {
      if (startRef.current === null) startRef.current = Date.now() - elapsed * 1000;
      if (tickRef.current === null) {
        tickRef.current = window.setInterval(() => {
          if (startRef.current !== null) {
            const now = Date.now();
            const e = Math.floor((now - startRef.current) / 1000);
            setElapsed(e);
            if (e >= limitSecs) {
              setStarted(false);
              if (tickRef.current) {
                window.clearInterval(tickRef.current);
                tickRef.current = null;
              }
              tts('Time limit reached. Please complete your assessment and grade your attempt.');
            }
          }
        }, 1000);
      }
    } else {
      if (tickRef.current) {
        window.clearInterval(tickRef.current);
        tickRef.current = null;
      }
    }
    return () => {
      if (tickRef.current) {
        window.clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };
  }, [started, limitSecs]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const ss = (s % 60).toString().padStart(2, '0');
    return `${m}:${ss}`;
  };

  const startListening = () => {
    if (!browserSupportsSpeechRecognition) return;
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => SpeechRecognition.stopListening();

  const tts = (text: string) => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    u.onstart = () => setProctorSpeaking(true);
    u.onend = () => setProctorSpeaking(false);
    synth.speak(u);
  };

  const newScenario = () => {
    const bank = mode === 'medical'
      ? [
          'Adult with chest pain, cool diaphoretic skin, pressure 10 out of 10, onset 20 minutes, history of hypertension.',
          'Elderly female with shortness of breath at rest, audible wheezes, speaks in short phrases, home nebulizer ineffective.',
          'Young adult with altered mental status, found confused, possible hypoglycemia, bystander reports skipped meals.'
        ]
      : [
          'High-speed MVC, restrained driver, airbag deployed, complaints of neck and chest pain, windshield starring.',
          'Fall from ladder approximately 12 feet, patient on ground, guarding right hip, denies head strike but unsure LOC.',
          'Assault with blunt trauma to head and torso, patient supine, bleeding from scalp, complains of abdominal pain.'
        ];
  const s = bank[Math.floor(Math.random() * bank.length)];
  setScenario(s);
  const f = generateFacts(mode, s);
  setFacts(f);
  lastProcessedLenRef.current = 0;
  tts(`Scenario: ${s}`);
  };

  const grade = () => {
    const total = checklist.reduce((sum, i) => sum + i.points, 0);
    const details: Record<string, boolean> = {};
    let earned = 0;
    for (const item of checklist) {
      const ok = spokenIncludesAny(spoken, [item.label, ...item.synonyms]);
      details[item.key] = ok;
      if (ok) earned += item.points;
    }

    // Critical criteria auto-fail logic (baseline per sheets)
    const reasons: string[] = [];
    // Any critical rubric item that is not met
    rubric.sections.forEach(sec => sec.items.forEach(item => {
      if (item.critical && !details[item.key]) {
        reasons.push(`Critical step not performed: ${item.label}`);
      }
    }));
    // Timer/transport
    if (transportAt === null || transportAt > limitSecs) {
      reasons.push(`No transport decision within time limit (${formatTime(limitSecs)})`);
    }

    setAutoScore({ total, earned, details });
    setCriticalReasons(reasons);
  };

  const criticalCriteria = rubric.criticalCriteriaNotes;

  const [criticalReasons, setCriticalReasons] = React.useState<string[]>([]);
  const criticalFail = criticalReasons.length > 0;

  React.useEffect(() => { // initialize total points and reset timer when mode changes
    const total = checklist.reduce((s, i) => s + i.points, 0);
    setAutoScore(s => ({ ...s, total }));
    // reset timing state on mode change
    setStarted(false);
    setElapsed(0);
    startRef.current = null;
    setTransportAt(null);
    setCriticalReasons([]);
  // re-generate facts for new mode using current scenario
  setFacts(generateFacts(mode, scenario));
  lastProcessedLenRef.current = transcript.length;
  }, [mode]);

  const handleStart = () => {
    if (!started) {
      setStarted(true);
      if (startRef.current === null) startRef.current = Date.now();
      tts(`Timer started. You have ${mode === 'medical' ? '15' : '10'} minutes. You may begin when ready.`);
    }
  };
  const handlePause = () => setStarted(false);
  const handleReset = () => {
    setStarted(false);
    setElapsed(0);
    startRef.current = null;
    setTransportAt(null);
    setCriticalReasons([]);
    resetTranscript();
    setSpoken('');
    setAutoScore(s => ({ ...s, earned: 0, details: {} }));
  };

  const printReport = () => {
    const passFail = criticalFail ? 'FAIL' : 'PASS';
    const html = `<!doctype html>
      <html><head><meta charset="utf-8"/>
      <title>Patient Assessment Report</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { margin: 0 0 10px; }
        .muted { color: #555; }
        .badge { display:inline-block; padding:2px 8px; border-radius:12px; font-weight:600; }
        .pass { background:#e6ffed; color:#05620e; border:1px solid #9ae6b4; }
        .fail { background:#fee2e2; color:#991b1b; border:1px solid #fecaca; }
        .grid { display:grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        ul { margin: 6px 0; }
        li { margin-bottom: 4px; }
        pre { white-space: pre-wrap; background:#f7fafc; padding:10px; border:1px solid #e2e8f0; border-radius:8px; }
      </style></head>
      <body>
        <h1>Patient Assessment Practice Report</h1>
        <div class="muted">Mode: ${mode.charAt(0).toUpperCase() + mode.slice(1)} • Scenario time: ${formatTime(elapsed)} / Limit ${formatTime(limitSecs)}</div>
        <div style="margin:10px 0;">
          <span class="badge ${criticalFail ? 'fail' : 'pass'}">${passFail}</span>
          <span style="margin-left:8px;">Score: ${autoScore.earned} / ${autoScore.total}</span>
        </div>
        <h3>Scenario</h3>
        <p>${scenario}</p>
        <h3>Transcript</h3>
        <pre>${spoken.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c] as string))}</pre>
        <div class="grid">
          <div>
            <h3>Checklist</h3>
            <ul>
              ${checklist.map(i => `<li>${autoScore.details[i.key] ? '✓' : '✗'} ${i.label} (${i.points})</li>`).join('')}
            </ul>
          </div>
          <div>
            <h3>Critical Criteria</h3>
            ${criticalFail ? `<ul>${criticalReasons.map(r=>`<li>✗ ${r}</li>`).join('')}</ul>` : '<div>None triggered</div>'}
            <div style="margin-top:8px;">Transport decision at: ${transportAt!==null?formatTime(transportAt):'Not recorded'}</div>
          </div>
        </div>
      </body></html>`;
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(html);
      w.document.close();
      w.focus();
      w.print();
    }
  };

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Assessment Practice</h1>
        <p className="text-gray-600">Practice the NREMT patient assessment for medical and trauma with a voice proctor and speech-graded steps.</p>
      </div>

      {/* Sticky toolbar for controls */}
      <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-30 rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Mode:</span>
            <select value={mode} onChange={(e)=>setMode(e.target.value as AssessmentMode)} className="text-sm border rounded px-2 py-1">
              <option value="medical">Medical</option>
              <option value="trauma">Trauma</option>
            </select>
            <label className="ml-3 inline-flex items-center gap-1 text-sm">
              <input type="checkbox" checked={interactiveProctor} onChange={(e)=>setInteractiveProctor(e.target.checked)} />
              Interactive Proctor
            </label>
          </div>
          <div className="flex items-center gap-2">
              <button onClick={newScenario} className="text-sm btn btn-primary">Speak Scenario</button>
            <button onClick={()=>tts('You may begin when ready. Describe each step as you perform it.')} className="text-sm btn btn-primary">Proctor: Begin</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Timer:</span>
            <span className={`text-sm font-mono px-2 py-1 rounded ${elapsed >= limitSecs ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-800'}`}>{formatTime(elapsed)} / {formatTime(limitSecs)}</span>
            {!started ? (
              <button onClick={handleStart} className="text-sm btn btn-primary">Start</button>
            ) : (
              <button onClick={handlePause} className="text-sm btn btn-ghost">Pause</button>
            )}
            <button onClick={handleReset} className="text-sm btn btn-ghost">Reset</button>
          </div>
          <div className="flex items-center gap-2">
            {!listening ? (
              <button onClick={startListening} className="text-sm btn btn-primary">Start Listening</button>
            ) : (
              <button onClick={stopListening} className="text-sm btn btn-ghost">Stop Listening</button>
            )}
            <button onClick={printReport} className="text-sm btn btn-ghost">Print Report</button>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-800"><strong>Scenario:</strong> {scenario}</div>
        <div className="mt-1 text-xs text-gray-500">Proctor speaking: {proctorSpeaking ? 'Yes' : 'No'} • Listening: {listening ? 'Yes' : 'No'} {browserSupportsSpeechRecognition ? '' : '• Speech recognition not supported in this browser'} • Transport decision: {transportAt!==null?`at ${formatTime(transportAt)}`:'not yet'} • Proctor: {interactiveProctor ? 'Interactive' : 'Silent'}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Student Verbalization</h2>
            <textarea value={spoken} onChange={(e)=>setSpoken(e.target.value)} rows={10} className="w-full border rounded p-2 text-sm" placeholder="Speak or type each step you are performing..." />
            <div className="mt-3 flex items-center justify-between">
              <button onClick={grade} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded">Grade Attempt</button>
              <div className="text-sm text-gray-700 flex items-center gap-2">
                <span>Score: <span className="font-semibold">{autoScore.earned}</span> / {autoScore.total}</span>
                {criticalReasons.length > 0 ? (
                  <span className="text-red-700 bg-red-50 border border-red-200 rounded px-2 py-0.5">Fail</span>
                ) : (
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5">Pass</span>
                )}
              </div>
            </div>
            {criticalReasons.length > 0 && (
              <div className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3">
                <div className="font-semibold mb-1">Critical issues detected:</div>
                <ul className="list-disc pl-5">
                  {criticalReasons.map((r, i)=>(<li key={i}>{r}</li>))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-md font-semibold text-gray-900">Checklist</h3>
            <div className="mt-2 space-y-3 text-sm">
              {rubric.sections.map(section => (
                <div key={section.id}>
                  {(() => { const t = sectionTheme[section.id] || { badgeBg: 'bg-gray-100', badgeText: 'text-gray-800', border: 'border-gray-300' }; return (
                    <div className="text-gray-800 font-medium mb-1 flex items-center gap-2">
                      <span className={`inline-flex items-center justify-center w-5 h-5 rounded ${t.badgeBg} ${t.badgeText} border ${t.border} text-xs font-semibold`}>{(rubric.sections.findIndex(s=>s.id===section.id))+1}</span>
                      <span>{section.title}</span>
                    </div>
                  ); })()}
                  <ul className="space-y-1">
                    {section.items.map(item => (
                      <li key={item.key} className="flex items-center justify-between">
                        <span className="flex-1 mr-2">{item.label}{item.critical ? <span className="ml-1 text-xs text-red-600">(critical)</span> : null}</span>
                        <span className={`inline-flex items-center justify-center w-6 h-6 text-xs rounded-full border ${autoScore.details[item.key] ? 'bg-green-50 text-green-700 border-green-300' : 'bg-gray-50 text-gray-600 border-gray-300'}`}>
                          {autoScore.details[item.key] ? '✓' : item.points}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-md font-semibold text-gray-900">Critical Criteria</h3>
            <ul className="mt-2 space-y-1 text-sm list-disc pl-5">
              {criticalCriteria.map((c, i)=>(<li key={i}>{c}</li>))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
};

// NEW: Text-based Patient Assessment Step Trainer (no voice, step-locked, timed)
const PatientAssessmentStepTrainer: React.FC = () => {
  const [mode, setMode] = React.useState<AssessmentMode>('medical');
  const [chaos, setChaos] = React.useState<boolean>(false);
  const rubric = mode === 'medical' ? medicalRubric : traumaRubric;
  const limitSecs = rubric.timeLimitSecs;

  // Build a flat ordered list of steps by section
  type StepRef = { sectionId: string; sectionTitle: string; key: string; label: string; critical?: boolean };
  const steps: StepRef[] = React.useMemo(() => {
    const arr: StepRef[] = [];
    rubric.sections.forEach(sec => sec.items.forEach(item => arr.push({ sectionId: sec.id, sectionTitle: sec.title, key: item.key, label: item.label, critical: !!item.critical })));
    return arr;
  }, [rubric]);

  // Section color themes for visual context of "where you are"
  const sectionTheme: Record<string, { badgeBg: string; badgeText: string; border: string; hover: string; ring: string }> = {
    scene: { badgeBg: 'bg-indigo-50', badgeText: 'text-indigo-700', border: 'border-indigo-300', hover: 'hover:bg-indigo-50', ring: 'ring-1 ring-indigo-200' },
    primary: { badgeBg: 'bg-rose-50', badgeText: 'text-rose-700', border: 'border-rose-300', hover: 'hover:bg-rose-50', ring: 'ring-1 ring-rose-200' },
    history: { badgeBg: 'bg-amber-50', badgeText: 'text-amber-700', border: 'border-amber-300', hover: 'hover:bg-amber-50', ring: 'ring-1 ring-amber-200' },
    secondary: { badgeBg: 'bg-sky-50', badgeText: 'text-sky-700', border: 'border-sky-300', hover: 'hover:bg-sky-50', ring: 'ring-1 ring-sky-200' },
    reassess: { badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-700', border: 'border-emerald-300', hover: 'hover:bg-emerald-50', ring: 'ring-1 ring-emerald-200' }
  };

  // Scenario bank (text only)
  const makeScenario = (m: AssessmentMode, chaosMode = false): string => {
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    if (m === 'medical') {
      const base = [
        'Adult with chest pain, cool diaphoretic skin, pressure 10/10, onset 20 minutes, history of hypertension.',
        'Elderly female with shortness of breath at rest, audible wheezes, speaks in short phrases, home nebulizer ineffective.',
        'Young adult with altered mental status, found confused, suspected hypoglycemia; bystander reports skipped meals.'
      ];
      const b = pick(base);
      if (!chaosMode) return b;
      const twists = [
        'Pulse oximeter not reading; batteries dead.',
        'Patient vomits into the BVM mask mid-ventilation.',
        'Language barrier; patient speaks limited English; family not present.',
        'Power outage; apartment is dark and cluttered; limited space to work.',
        'Patient collapses in the bathroom; doorway is narrow; scale tips block stretcher access.',
        'Medication list shows multiple look‑alike/sound‑alike drugs; bottles unlabeled.',
        'Service dog is protective and won’t allow approach until calmed.'
      ];
      const constraint = [
        'Oxygen tank regulator is stuck at 6 L/min.',
        'Glucose gel supply is expired; only oral carbs available are juice and crackers.',
        'BP cuff fails; manual gauge available but noisy environment.',
        'No NRB masks left; only nasal cannulas and BVM with adult mask available.'
      ];
      return `${b} Complications: ${pick(twists)} ${pick(constraint)}`;
    } else {
      const base = [
        'High-speed MVC, restrained driver, airbag deployed, complaints of neck and chest pain, windshield starring.',
        'Fall from ladder ~12 feet, patient supine, guarding right hip, denies head strike but unsure LOC.',
        'Assault with blunt trauma to head and torso, scalp bleeding controlled, abdominal pain reported.'
      ];
      const b = pick(base);
      if (!chaosMode) return b;
      const twists = [
        'There are 5 total patients: 3 are ambulatory, 1 is screaming, 1 is unresponsive.',
        'Leaking gasoline odor nearby; bystanders lighting cigarettes.',
        'Downed power line across the vehicle hood; intermittent arcing.',
        'Active thunderstorm; hail and high winds while packaging.',
        'Trapped arm under debris; patient is combative; law enforcement en route.',
        'Massive emesis with suspected aspiration during movement.',
        'Tourniquet already applied by bystander—unknown time.'
      ];
      const constraint = [
        'Suction unit battery low; only manual suction works intermittently.',
        'Cervical collars are pediatric size only; towels and tape available.',
        'Splint bag missing traction splint; only SAM splints and cravats available.',
        'AED is shared between crews; ETA 6 minutes.'
      ];
      return `${b} Complications: ${pick(twists)} ${pick(constraint)}`;
    }
  };

  const [scenario, setScenario] = React.useState<string>(makeScenario(mode, chaos));
  const regenerateScenario = () => setScenario(makeScenario(mode, chaos));

  // Timer
  const [started, setStarted] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const startRef = React.useRef<number | null>(null);
  const tickRef = React.useRef<number | null>(null);
  React.useEffect(() => {
    if (started) {
      if (startRef.current === null) startRef.current = Date.now() - elapsed * 1000;
      if (tickRef.current === null) {
        tickRef.current = window.setInterval(() => {
          if (startRef.current !== null) {
            const now = Date.now();
            const e = Math.floor((now - startRef.current) / 1000);
            setElapsed(e);
          }
        }, 1000);
      }
    } else if (tickRef.current) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
    return () => { if (tickRef.current) { window.clearInterval(tickRef.current); tickRef.current = null; } };
  }, [started]);

  const formatTime = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  // Progress and answers
  const [stepIndex, setStepIndex] = React.useState(0);
  type Answer = { key: string; label: string; chosen: string; chosenLabel: string; correct: boolean; critical: boolean; options: string[]; rationale?: string; ok?: boolean };
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [completed, setCompleted] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{ msg: string; ok: boolean } | null>(null);
  const [revealing, setRevealing] = React.useState<boolean>(false);
  const [lastChoice, setLastChoice] = React.useState<string | null>(null);
  const [revealCountdown, setRevealCountdown] = React.useState<number>(0);
  const revealIntervalRef = React.useRef<number | null>(null);
  const revealTimeoutRef = React.useRef<number | null>(null);
  const [manualAdvance, setManualAdvance] = React.useState<boolean>(false);
  const [revealCorrect, setRevealCorrect] = React.useState<boolean>(false);

  // Persist preferences (mode, chaos, manualAdvance, revealCorrect)
  React.useEffect(() => {
    try {
      const savedMode = localStorage.getItem('emt.stepTrainer.mode');
      const savedChaos = localStorage.getItem('emt.stepTrainer.chaos');
      const savedManual = localStorage.getItem('emt.stepTrainer.manual');
      const savedReveal = localStorage.getItem('emt.stepTrainer.revealCorrect');
      if (savedMode === 'medical' || savedMode === 'trauma') setMode(savedMode as AssessmentMode);
      if (savedChaos !== null) setChaos(savedChaos === '1');
      if (savedManual !== null) setManualAdvance(savedManual === '1');
      if (savedReveal !== null) setRevealCorrect(savedReveal === '1');
    } catch {}
  }, []);
  React.useEffect(() => { try { localStorage.setItem('emt.stepTrainer.mode', mode); } catch {} }, [mode]);
  React.useEffect(() => { try { localStorage.setItem('emt.stepTrainer.chaos', chaos ? '1' : '0'); } catch {} }, [chaos]);
  React.useEffect(() => { try { localStorage.setItem('emt.stepTrainer.manual', manualAdvance ? '1' : '0'); } catch {} }, [manualAdvance]);
  React.useEffect(() => { try { localStorage.setItem('emt.stepTrainer.revealCorrect', revealCorrect ? '1' : '0'); } catch {} }, [revealCorrect]);

  // Options per step (correct + 3 distractors from same section)
  // Now includes realistic distractors by section (common but out-of-order or inappropriate actions)
  const distractorBank: Record<string, string[]> = {
    scene: [
      'Begin full SAMPLE history before checking ABCs',
      'Call receiving hospital for report now',
      'Apply traction splint immediately',
      'Administer nitroglycerin without assessing BP',
      'Package patient on stretcher before initial assessment'
    ],
    primary: [
      'Complete a full set of vitals now',
      'Perform OPQRST pain assessment',
      'Document a full narrative before interventions',
      'Obtain detailed past medical history first',
      'Walk patient to stretcher for efficiency'
    ],
    history: [
      'Apply tourniquet for minor venous bleed',
      'Perform head-to-toe exam before chief complaint',
      'Start CPR on an awake patient',
      'Remove C-collar to improve comfort',
      'Delay transport to finish paperwork'
    ],
    secondary: [
      'Ignore exposed hypothermia risk',
      'Administer medications without indications',
      'Skip lung sounds to save time',
      'Perform pelvic rock in suspected fracture',
      'Delay critical care to obtain full medication list'
    ],
    reassess: [
      'Do not trend vitals on a critical patient',
      'Provide final report without patient response to treatments',
      'Change transport priority without reassessment',
      'Remove oxygen once SpO₂ briefly improves',
      'Omit time stamps for interventions'
    ]
  };

  const optionsFor = (idx: number): string[] => {
    const target = steps[idx];
    const setUnique = new Set<string>();
    // Always include correct option
    setUnique.add(target.label);

    // In-section legitimate distractors (other real steps from same section)
    const inSection = steps.filter(s => s.sectionId === target.sectionId && s.key !== target.key).map(s => s.label);
    for (const opt of inSection.sort(() => Math.random() - 0.5)) {
      if (setUnique.size >= 3) break; // leave room for at least 1 synthetic
      setUnique.add(opt);
    }

    // Realistic synthetic distractors for this section
    const synth = (distractorBank[target.sectionId] || []).slice().sort(() => Math.random() - 0.5);
    for (const opt of synth) {
      if (setUnique.size >= 4) break;
      setUnique.add(opt);
    }

    // If still short, pull from adjacent section items (common confusion)
    if (setUnique.size < 4) {
      const secIndex = rubric.sections.findIndex(s => s.id === target.sectionId);
      const neighborIds = [rubric.sections[secIndex - 1]?.id, rubric.sections[secIndex + 1]?.id].filter(Boolean) as string[];
      const neighborLabels = steps.filter(s => neighborIds.includes(s.sectionId)).map(s => s.label).sort(() => Math.random() - 0.5);
      for (const opt of neighborLabels) {
        if (setUnique.size >= 4) break;
        setUnique.add(opt);
      }
    }

    return Array.from(setUnique).sort(() => Math.random() - 0.5);
  };

  const [currentOptions, setCurrentOptions] = React.useState<string[]>(optionsFor(0));

  const rationaleFor = (sectionId: string, correctLabel: string, chosen: string): { msg: string; ok: boolean } => {
    if (chosen === correctLabel) {
      const bySection: Record<string, string> = {
        scene: 'Correct — scene size-up and PPE ensure safety and guide initial resources.',
        primary: 'Correct — primary survey addresses life threats first (ABCs, bleeding, priority).',
        history: 'Correct — gather HPI/SAMPLE once life threats are addressed and transport decision is forming.',
        secondary: 'Correct — perform the appropriate focused/head-to-toe exam and baseline vitals.',
        reassess: 'Correct — trend vitals, reassess interventions, and deliver a concise handoff.'
      };
      return { msg: bySection[sectionId] || 'Correct.', ok: true };
    }
    // Synthetic distractor explanations
    const expl: Record<string, string> = {
      'Complete a full set of vitals now': 'Out of order: obtain vitals after immediate life threats in the primary survey.',
      'Perform OPQRST pain assessment': 'Out of order: OPQRST belongs to history after the primary survey and life threats.',
      'Document a full narrative before interventions': 'Do not delay critical care for documentation; act on life threats first.',
      'Obtain detailed past medical history first': 'History comes after ABCs and initial stabilization.',
      'Walk patient to stretcher for efficiency': 'Unsafe before assessing ABCs and stability; consider rapid transport decision instead.',
      'Apply tourniquet for minor venous bleed': 'Tourniquets are for life-threatening hemorrhage; this would be inappropriate here.',
      'Perform head-to-toe exam before chief complaint': 'Secondary exam comes after primary and history or when indicated by MOI.',
      'Start CPR on an awake patient': 'Contraindicated — patient is conscious; CPR is for cardiac arrest.',
      'Remove C-collar to improve comfort': 'Do not remove immobilization without assessment and indication.',
      'Delay transport to finish paperwork': 'Never delay transport for paperwork in time-sensitive cases.',
      'Ignore exposed hypothermia risk': 'Prevent hypothermia after exposure; maintain patient warmth.',
      'Administer medications without indications': 'Medication requires indications and protocols; do not administer arbitrarily.',
      'Skip lung sounds to save time': 'Auscultation is essential when respiratory issues are suspected.',
      'Perform pelvic rock in suspected fracture': 'Avoid pelvic rock due to risk of worsening hemorrhage.',
      'Delay critical care to obtain full medication list': 'Prioritize life threats; med list can be gathered en route.',
      'Do not trend vitals on a critical patient': 'Critical patients require frequent reassessment and trending vitals.',
      'Provide final report without patient response to treatments': 'Include response to interventions for clinical clarity.',
      'Change transport priority without reassessment': 'Update priorities based on reassessment findings.',
      'Remove oxygen once SpO₂ briefly improves': 'Maintain oxygen to target SpO₂ and clinical status; do not yo-yo therapy.',
      'Omit time stamps for interventions': 'Always time-stamp interventions for legal and clinical clarity.'
    };
    const msg = expl[chosen] || 'Right idea, wrong step for this point in the sequence.';
    return { msg: `${msg} Correct next step: ${correctLabel}.`, ok: false };
  };

  const cleanupRevealTimers = () => {
    if (revealIntervalRef.current) { window.clearInterval(revealIntervalRef.current); revealIntervalRef.current = null; }
    if (revealTimeoutRef.current) { window.clearTimeout(revealTimeoutRef.current); revealTimeoutRef.current = null; }
  };

  const advanceStep = () => {
    const next = stepIndex + 1;
    setFeedback(null);
    setLastChoice(null);
    setRevealing(false);
    cleanupRevealTimers();
    setRevealCountdown(0);
    if (next >= steps.length || elapsed >= limitSecs) {
      setCompleted(true);
      setStarted(false);
    } else {
      setStepIndex(next);
      setCurrentOptions(optionsFor(next));
    }
  };

  const selectOption = (choice: string) => {
    if (completed || revealing) return;
    const target = steps[stepIndex];
    const correct = choice === target.label;
    setLastChoice(choice);
    const fb = rationaleFor(target.sectionId, target.label, choice);
    setFeedback(fb);
    setRevealing(true);
    cleanupRevealTimers();
    if (!manualAdvance) {
      // Auto-advance with 4s countdown
      setRevealCountdown(4);
      revealIntervalRef.current = window.setInterval(() => {
        setRevealCountdown(prev => {
          if (prev <= 1) {
            if (revealIntervalRef.current) { window.clearInterval(revealIntervalRef.current); revealIntervalRef.current = null; }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      revealTimeoutRef.current = window.setTimeout(() => {
        advanceStep();
      }, 4000);
    } else {
      // Manual advance, no countdown/timeout
      setRevealCountdown(0);
    }
  setAnswers(prev => [...prev, { key: target.key, label: target.label, chosen: choice, chosenLabel: choice, correct, critical: !!target.critical, options: currentOptions, rationale: fb.msg, ok: fb.ok }]);
  };

  // Cleanup countdown on unmount
  React.useEffect(() => {
  return () => { cleanupRevealTimers(); };
  }, []);

  // Keyboard shortcuts
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // prevent triggering when typing in inputs
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (['input', 'textarea', 'select'].includes(tag)) return;
      if (e.key === 'Enter') {
        if (manualAdvance && revealing) {
          advanceStep();
        } else {
          setStarted(prev => !prev);
        }
        e.preventDefault();
        return;
      }
      if (e.key.toLowerCase() === 'r') { resetAll(); e.preventDefault(); return; }
      if (e.key.toLowerCase() === 'n') { regenerateScenario(); e.preventDefault(); return; }
      // 1-4 map to options index
      if (!started || completed || revealing) return;
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= 4) {
        const idx = num - 1;
        const choice = currentOptions[idx];
        if (choice) selectOption(choice);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [started, completed, revealing, manualAdvance, currentOptions, stepIndex]);

  const resetAll = () => {
    setStarted(false);
    setElapsed(0);
    startRef.current = null;
    setStepIndex(0);
    setAnswers([]);
    setCompleted(false);
    setCurrentOptions(optionsFor(0));
  };

  // Auto-complete if time exceeded
  React.useEffect(() => {
    if (!completed && elapsed >= limitSecs) {
      setCompleted(true);
      setStarted(false);
    }
  }, [elapsed, limitSecs, completed]);

  // Score
  const totalSteps = steps.length;
  const correctCount = answers.filter(a => a.correct).length + (completed ? 0 : 0);
  const criticalMiss = answers.some(a => !a.correct && a.critical);
  const passFail = criticalMiss ? 'FAIL' : 'PASS';

  // Printable report
  const printReport = () => {
    const html = `<!doctype html><html><head><meta charset="utf-8"/><title>Assessment Step Trainer Report</title>
      <style>body{font-family:Arial,sans-serif;padding:20px} .muted{color:#555} .badge{display:inline-block;padding:2px 8px;border-radius:12px;font-weight:600}
      .pass{background:#e6ffed;color:#05620e;border:1px solid #9ae6b4} .fail{background:#fee2e2;color:#991b1b;border:1px solid #fecaca}
  table{border-collapse:collapse;width:100%;margin-top:10px} th,td{border:1px solid #e5e7eb;padding:6px;text-align:left;vertical-align:top} .crit{color:#b91c1c}
      </style></head><body>
      <h1>Patient Assessment Step Trainer</h1>
  <div class="muted">Mode: ${mode.charAt(0).toUpperCase()+mode.slice(1)} • Chaos: ${chaos ? 'On' : 'Off'} • Manual advance: ${manualAdvance ? 'On' : 'Off'} • Reveal correct: ${revealCorrect ? 'On' : 'Off'} • Time: ${formatTime(elapsed)} / ${formatTime(limitSecs)} • Result: <span class="badge ${passFail==='PASS'?'pass':'fail'}">${passFail}</span></div>
      <h3>Scenario</h3><p>${scenario}</p>
  <h3>Results (${answers.length}/${totalSteps} steps answered)</h3>
  <table><thead><tr><th>#</th><th>Section</th><th>Correct Step</th><th>Your Choice</th><th>Result</th><th>Why</th></tr></thead><tbody>
  ${answers.map((a,i)=>`<tr><td>${i+1}</td><td>${steps[i].sectionTitle}</td><td>${a.label}${a.critical?' <span class="crit">(critical)</span>':''}</td><td>${a.chosenLabel}</td><td>${a.correct?'✓':'✗'}</td><td>${a.rationale ? a.rationale.replace(/</g,'&lt;').replace(/>/g,'&gt;') : (a.correct ? 'Correct.' : '')}</td></tr>`).join('')}
      </tbody></table>
      </body></html>`;
    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); w.focus(); w.print(); }
  };

  // Reset when mode changes
  React.useEffect(() => { resetAll(); setScenario(makeScenario(mode, chaos)); }, [mode]);
  React.useEffect(() => { setScenario(makeScenario(mode, chaos)); }, [chaos]);

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Assessment Step Trainer</h1>
        <p className="text-gray-600">Text-based, step-by-step selection. Answers lock in order. Timer remains: {mode==='medical'?'15':'10'} minutes.</p>
      </div>

  {/* Sticky assessment toolbar */}
  <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-30 rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Mode:</span>
            <select value={mode} onChange={e=>setMode(e.target.value as AssessmentMode)} className="text-sm border rounded px-2 py-1">
              <option value="medical">Medical</option>
              <option value="trauma">Trauma</option>
            </select>
            <label className="ml-3 inline-flex items-center gap-1 text-sm">
              <input type="checkbox" checked={chaos} onChange={(e)=>setChaos(e.target.checked)} />
              Chaos Mode
            </label>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Timer:</span>
    <span role="timer" aria-live="polite" className={`text-sm font-mono px-2 py-1 rounded ${elapsed >= limitSecs ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-800'}`}>{formatTime(elapsed)} / {formatTime(limitSecs)}</span>
            {!started ? (
              <button onClick={()=>setStarted(true)} className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded">Start</button>
            ) : (
              <button onClick={()=>setStarted(false)} className="text-sm bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded">Pause</button>
            )}
            <button onClick={resetAll} className="text-sm px-3 py-1.5 rounded border">Reset</button>
            <label className="ml-2 inline-flex items-center gap-1 text-sm">
              <input type="checkbox" checked={manualAdvance} onChange={(e)=>setManualAdvance(e.target.checked)} />
              Manual advance
            </label>
            <label className="ml-2 inline-flex items-center gap-1 text-sm">
              <input type="checkbox" checked={revealCorrect} onChange={(e)=>setRevealCorrect(e.target.checked)} />
              Reveal correct step
            </label>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={regenerateScenario} className="text-sm bg-white border px-3 py-1.5 rounded hover:bg-gray-50">New Scenario</button>
            <button onClick={printReport} className="text-sm bg-white border px-3 py-1.5 rounded hover:bg-gray-50">Print Report</button>
          </div>
        </div>
    <div className="mt-2 text-xs text-gray-500">Shortcuts: 1–4 select options • Enter start/pause • N new scenario • R restart</div>
  <div className="mt-3 text-sm text-gray-800"><strong>Scenario:</strong> {scenario}</div>
  {chaos && <div className="mt-1 inline-block text-xs bg-amber-100 text-amber-800 border border-amber-200 rounded px-2 py-0.5">Chaos Mode</div>}
      </div>

      {/* Section Progress */}
      {(() => {
        const bySection = rubric.sections.map(sec => ({
          id: sec.id,
          title: sec.title,
          total: sec.items.length,
          answered: answers.filter(a => a.key && sec.items.some(i => i.key === a.key)).length
        }));
        const currentSecId = steps[stepIndex]?.sectionId;
        return (
          <div className="mb-4 flex flex-wrap gap-2">
            {bySection.map(s => {
              const theme = sectionTheme[s.id] || { badgeBg: 'bg-gray-100', badgeText: 'text-gray-800', border: 'border-gray-300', hover: 'hover:bg-gray-50', ring: '' };
              const isCurrent = s.id === currentSecId;
              return (
                <div key={s.id} className={`px-3 py-1 rounded-full border ${theme.border} ${theme.badgeBg} ${theme.badgeText} ${isCurrent? 'font-semibold '+theme.ring:''}`}>
                  <span>{s.title}</span>
                  <span className="ml-2 text-xs">{s.answered}/{s.total}</span>
                </div>
              );
            })}
          </div>
        );
      })()}

      {/* Current Step */}
      {!completed ? (
        <div className={`bg-white border rounded-xl p-4 ${sectionTheme[steps[stepIndex].sectionId]?.border || 'border-gray-200'}`}>
          <div className="text-sm text-gray-600 mb-1">
            <span className={`inline-block px-2 py-0.5 rounded ${sectionTheme[steps[stepIndex].sectionId]?.badgeBg || 'bg-gray-100'} ${sectionTheme[steps[stepIndex].sectionId]?.badgeText || 'text-gray-800'}`}>
              {steps[stepIndex].sectionTitle}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Choose the next step ({stepIndex+1} / {totalSteps})</h2>
          {feedback && (
            <div id="trainer-rationale" aria-live="polite" className={`mb-3 text-sm rounded border px-3 py-2 ${feedback.ok ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
              <div className="flex items-center justify-between gap-3">
                <div className="pr-3 flex-1">{feedback.msg}</div>
                {revealing && !manualAdvance && revealCountdown > 0 && (
                  <span className="inline-flex items-center text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-300 px-2 py-0.5">Advancing in {revealCountdown}…</span>
                )}
                {revealing && manualAdvance && (
                  <button onClick={advanceStep} className="text-xs btn btn-ghost">Next →</button>
                )}
              </div>
            </div>
          )}
          <ul className="space-y-2">
            {currentOptions.map((opt, i) => (
              <li key={opt}>
                <button
                  disabled={!started || revealing}
                  onClick={() => selectOption(opt)}
                  aria-describedby={feedback ? 'trainer-rationale' : undefined}
                  className={`w-full text-left px-4 py-2 rounded border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
                    feedback && lastChoice === opt ? (feedback.ok && opt === steps[stepIndex].label
                      ? 'border-emerald-300 bg-emerald-50'
                      : lastChoice === opt && !feedback.ok ? 'border-red-300 bg-red-50' : sectionTheme[steps[stepIndex].sectionId]?.border || 'border-gray-200')
                    : sectionTheme[steps[stepIndex].sectionId]?.border || 'border-gray-200'
                  } ${sectionTheme[steps[stepIndex].sectionId]?.hover || 'hover:bg-gray-50'} ${!started || revealing? 'opacity-60 cursor-not-allowed':''}`}
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300">
                    {i+1}
                  </span>
                  <span className="align-middle">{opt}</span>
                  {revealCorrect && opt === steps[stepIndex].label && !feedback && (
                    <span className="ml-2 inline-flex items-center text-[10px] font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5">Correct step</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
          {!started && <div className="mt-3 text-xs text-gray-500">Start the timer to begin. Your choices lock and you cannot change them.</div>}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Results</h2>
            <div>
              <span className={`inline-block px-2 py-0.5 rounded text-sm font-semibold ${passFail==='PASS'?'bg-emerald-50 text-emerald-700 border border-emerald-200':'bg-red-50 text-red-700 border border-red-200'}`}>{passFail}</span>
              <span className="ml-3 text-sm text-gray-700">Correct: {correctCount} / {answers.length}</span>
            </div>
          </div>
          <div className="mt-3 overflow-x-auto">
      <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-gray-50"><tr>
                <th className="border p-2 text-left">#</th>
                <th className="border p-2 text-left">Section</th>
                <th className="border p-2 text-left">Correct Step</th>
                <th className="border p-2 text-left">Your Choice</th>
        <th className="border p-2 text-left">Result</th>
        <th className="border p-2 text-left">Why</th>
              </tr></thead>
              <tbody>
        {answers.map((a,i)=> (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border p-2">{i+1}</td>
                    <td className="border p-2">{steps[i].sectionTitle}</td>
                    <td className="border p-2">{a.label}{a.critical ? <span className="text-red-600 ml-1">(critical)</span> : null}</td>
                    <td className="border p-2">{a.chosenLabel}</td>
          <td className="border p-2">{a.correct ? '✓' : '✗'}</td>
          <td className="border p-2 align-top text-gray-700">{a.rationale || (a.correct ? 'Correct.' : '')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {criticalMiss && (
            <div className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3">Critical criteria missed. Review airway/breathing/hemorrhage/transport decision steps.</div>
          )}
          <div className="mt-4 flex gap-2">
            <button onClick={resetAll} className="text-sm px-3 py-1.5 rounded border">Restart</button>
            <button onClick={regenerateScenario} className="text-sm px-3 py-1.5 rounded border">New Scenario</button>
            <button onClick={printReport} className="text-sm bg-white border px-3 py-1.5 rounded hover:bg-gray-50">Print Report</button>
          </div>
        </div>
      )}
    </main>
  );
};

// Enhanced Tool Page
const ToolPage = () => {
  const { toolId } = useParams();
  const toolDef = calculatorsUI.find(t => t.id === toolId);
  const calculator = clinicalCalculators.find((c) => c.id === toolId);
  const id = toolId || '';

  // Descriptions for how each calculator works and why used
  const calculatorDescriptions: Record<string, { how: string[]; why: string[]; notes?: string[] }> = {
    'gcs': {
      how: [
        'Score the best Eye (E), Verbal (V), and Motor (M) responses',
        'Add the three subscores: total ranges from 3 (deep coma) to 15 (normal)',
        'Trend scores over time to detect improvement or deterioration'
      ],
      why: [
        'Rapid neurological assessment in trauma and medical patients',
        'Supports triage and transport decisions in suspected TBI',
        'Communicates mental status clearly between providers (e.g., E3 V4 M5)'
      ],
      notes: [
        'GCS ≤8 often indicates need to consider airway protection (per local protocol)',
        'Intubated patients: document verbal as "T" and note confounders (intoxication, aphasia)'
      ]
    },
    'heart-score': {
      how: [
        'Score five elements: History, ECG, Age, Risk factors, Troponin (0–2 each)',
        'Sum to get 0–10; higher scores indicate higher short-term MACE risk',
        'Interpret risk tier and follow recommended disposition'
      ],
      why: [
        'Risk stratification for chest pain to guide ED disposition',
        'Identifies patients suitable for discharge vs. observation vs. urgent cardiology'
      ],
      notes: [
        'Troponin is typically not available prehospital; use primarily for study/training unless labs are present',
        'Always follow local protocols and medical control—HEART score complements clinical judgment'
      ]
    },
    'burn-bsa': {
      how: [
        'Estimate %TBSA burned using adult Rule of Nines region percentages',
        'Sum involved regions to obtain total body surface area burned',
        'Use pediatric adjustments if applicable (not covered in adult Rule of Nines)'
      ],
      why: [
        'Determines burn severity and need for burn center transport',
        'Guides fluid resuscitation considerations and receiving facility notification'
      ],
      notes: [
        'Do not delay transport for prolonged calculations; accuracy improves with practice',
        'Chemical/electrical burns and inhalation injury require special consideration regardless of %TBSA'
      ]
    },
    'pediatric-dosing': {
      how: [
        'Enter weight (kg) and select medication to calculate mg/kg dosing',
        'Displays calculated dose and maximum recommended dose where applicable',
        'Use appropriate route and concentration per local protocol'
      ],
      why: [
        'Reduces dosing errors in children where weight-based calculations are required',
        'Standardizes dosing across common EMT-B medications when permitted'
      ],
      notes: [
        'Always verify with local protocols and drug references; check concentration and route',
        'Round doses safely and monitor for adverse effects; when in doubt, contact medical control'
      ]
    }
  };
  
  if (!toolDef) {
    return <div className="p-6">Tool not found</div>;
  }

  const renderTool = () => {
    switch (toolId) {
      case 'gcs':
        return <GlasgowComaScale />;
      default:
        return calculator ? <CalculatorRunner calculator={calculator} /> : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">Calculator not available.</div>
        );
    }
  };

  return (
    <main className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/tools/calculators" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4">
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span>Back to Calculators</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{toolDef.name}</h1>
          <p className="text-gray-600">{toolDef.description}</p>
        </div>
        {/* About this calculator */}
        {calculatorDescriptions[id] && (
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About this calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">How it works</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {calculatorDescriptions[id].how.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Why it’s used</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {calculatorDescriptions[id].why.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            {calculatorDescriptions[id].notes && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {calculatorDescriptions[id].notes.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Related resources */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Related resources</h3>
          <div className="flex flex-wrap gap-2">
            <Link to="/tools/calculators" className="text-sm px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100">All Calculators</Link>
            {['pediatric-dosing'].includes(id) && (
              <>
                <Link to="/medications" className="text-sm px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100">Medications</Link>
                <Link to="/med-simulations" className="text-sm px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100">Medication Simulations</Link>
              </>
            )}
            {['gcs', 'burn-bsa', 'heart-score'].includes(id) && (
              <Link to="/protocols" className="text-sm px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100">Related Protocols</Link>
            )}
          </div>
        </div>

        {renderTool()}
      </div>
    </main>
  );
};

// Chapter Page with Full Content Integration
// Study Notes: Module 2 (Clinical Fundamentals), Chapter 5 (Essential Terminology for Responders)
const chapter5StudyNotes = `# Chapter 5: Essential Terminology for Responders

Clinically accurate terminology you’ll use in assessment, radio reports, and documentation. Mastering precise language improves care, reduces errors, and builds trust with receiving teams.

## Learning objectives
- Use standard anatomical position and planes to describe findings consistently
- Apply directional, regional, and surface anatomy terms with accuracy
- Decode common medical terms using roots, prefixes, and suffixes to speed understanding
- Document clearly using accepted EMS terminology while avoiding ambiguous or unsafe abbreviations
- Communicate succinctly using SBAR/MIST and standard descriptors for vitals, neuro status, and injuries

## Anatomical position (your default reference)
Assume: standing upright, facing forward, arms at sides, palms forward, feet together and forward. All directional terms reference this position unless stated otherwise.

## Body planes (orientation)
- Sagittal: divides left/right (mid‑sagittal = equal halves)
- Frontal (coronal): divides anterior/posterior
- Transverse (axial): divides superior/inferior

## Directional terms (with field examples)
- Anterior (ventral) / Posterior (dorsal): “Anterior chest pressure,” “Posterior scalp hematoma.”
- Superior / Inferior: “Superior to the umbilicus,” “Inferior rib pain.”
- Medial / Lateral: “Lateral malleolus tenderness,” “Medial epistaxis.”
- Proximal / Distal: “Distal pulses present in the right LE,” “Proximal humerus deformity.”
- Superficial / Deep: “Superficial abrasion,” “Deep laceration through dermis.”
- Ipsilateral / Contralateral: “Contralateral weakness following head injury.”
- Plantar / Palmar / Dorsum (hand/foot): “Laceration to palmar surface,” “Dorsum of foot edema,” “Plantar pain.”
- Cephalad / Caudal: toward the head / toward the feet (often in procedures/airway discussions).
- Prone / Supine / Lateral recumbent: patient positioning. Recovery position = left lateral recumbent when appropriate.

### Surface anatomy lines (useful landmarks)
- Midline; Midclavicular (MCL); Parasternal; Anterior axillary; Midaxillary (MAL); Posterior axillary; Midscapular.
- Common references: “4th–5th intercostal space, mid‑axillary line for lateral chest assessment,” “2nd ICS MCL for decompression (per protocol/scope).”

## Regional references you’ll actually use
- Abdomen: RUQ/LUQ/RLQ/LLQ. Nine‑region terms may appear in hospital notes (e.g., epigastric, periumbilical, suprapubic).
- Spine regions: Cervical, thoracic, lumbar, sacral, coccygeal.
- Extremities: UE (upper extremity), LE (lower extremity); specify side and joint/bone.
- Other common: MSK (musculoskeletal), GI, GU, Neuro, HEENT.

## Movement terms (ROM and mechanism)
- Flexion/Extension; Abduction/Adduction; Internal/External rotation; Circumduction.
- Pronation/Supination (forearm/hand); Inversion/Eversion (ankle); Dorsiflexion/Plantarflexion (foot).
- Special tests are beyond EMT scope but knowing motion language improves documentation of mechanism and pain with movement.
- Positioning: High‑Fowler’s (≈ 60–90°), Fowler’s (≈ 45°), Semi‑Fowler’s (≈ 30°). Trendelenburg is not recommended for shock resuscitation; default for hypotension is supine unless contraindicated.

## Injury and skin terminology (precision matters)
- Abrasion: superficial scraping of epidermis.
- Laceration: tear with irregular edges; Incision: cut with sharp edges.
- Avulsion: tissue flap partially/fully torn away.
- Contusion: bruise from blunt trauma; Hematoma: blood collection in tissue.
- Puncture/Penetrating injury: small external wound may hide deep damage.
- Deformity/Crepitus/Step‑off: describe but avoid excessive manipulation.
- Burn depth (EMT): superficial, partial‑thickness, full‑thickness; estimate TBSA by Rule of 9s (adult/pediatric charts) or palmar method (~1% each patient palm including fingers).

## Vital signs and descriptive terms
- Pulse: regular/irregular; strong/weak; thready; bounding.
- Respirations: rate; shallow/labored; accessory muscle use; one‑word dyspnea; audible wheeze/stridor.
- Skin: warm/cool/cold; dry/moist/diaphoretic; color: normal/pale/flushed/cyanotic/jaundiced/mottled.
- BP: hypotensive/normotensive/hypertensive trends; check manual if automated seems inaccurate.
- Mental status: A&O×4 (person, place, time, event); “follows commands,” “responds to verbal/pain,” “GCS 14 (E4 V4 M6).”

## Neuro/eye terms commonly used
- PERRL (pupils equal, round, reactive to light). Accommodation is rarely needed in EMS—document PERRL when appropriate.
- Facial symmetry, slurred speech, arm drift (stroke screening). Sensory/motor intact distally.

## Abdominal language
- Tenderness, guarding, rigidity, rebound (do not provoke pain; document findings as encountered).
- Distension, tympany vs dullness (basic EMS—note distension, avoid advanced percussion interpretation if untrained).

## OB/pediatric quick terms
- Gravida (pregnancies), Para (births ≥20 wks), Aborta (pregnancy losses): e.g., G3P2A0.
- Crowning, bloody show, contractions (frequency/duration), rupture of membranes (ROM), prenatal care.
- Pediatric descriptors: work of breathing, retractions (subcostal/intercostal/suprasternal), nasal flaring, grunting, listlessness.

## Common medical word parts (decode fast on scene)
- Prefixes: brady‑ (slow), tachy‑ (fast), hypo‑ (low), hyper‑ (high), peri‑ (around), epi‑ (on/above), endo‑ (within), hemi‑ (half), dys‑ (bad/difficult), a‑/an‑ (without), poly‑ (many), olig‑ (few/scanty).
- Roots: cardio (heart), neuro (nerve), gastro (stomach), hepato (liver), nephro/reno (kidney), pneumo/pulmo (lung), angio/vas (vessel), derm(ato) (skin), myo (muscle), osteo (bone), encephalo (brain), hemo/hemato (blood), thoraco (chest).
- Suffixes: ‑itis (inflammation), ‑emia (blood condition), ‑algia (pain), ‑osis (condition), ‑ectomy (removal), ‑otomy (incision), ‑ostomy (opening), ‑pathy (disease), ‑pnea (breathing), ‑rrhea (flow), ‑rrhage (bursting forth), ‑cardia (heart rate).

Quick decode examples:
- Dyspnea on exertion → difficult breathing when active.
- Hypoglycemia → low blood sugar; Hyperglycemia → high blood sugar.
- Tachycardia/Bradycardia → fast/slow heart rate.
- Hematemesis vs Hematochezia vs Melena → blood in vomit vs bright‑red blood per rectum vs black tarry stool.

## Documentation that reads well (concise and specific)
- Avoid vague: “patient stable.” Prefer: “vitals stable for transport; no deterioration during 12‑min interval.”
- Use complete words in the legal chart (avoid slang). “Patient” instead of “pt” in many systems.
- Examples:
  - “Neuro intact distally; PMS present before/after splinting.”
  - “Mechanism significant for high‑energy deceleration; no intrusion; airbags deployed; patient restrained.”
  - “A&O×4, speaking full sentences; moderate respiratory distress with audible wheeze; SpO₂ 90% RA → 95% on 4 L/min NC.”

## Abbreviations: do and don’t
- Commonly used in EMS: A&O×4, PMS/CSM (pulse/circulation‑sensation‑movement), NKA/NKDA, PRN, PO/IV/IM/IN, NRB/NC/BVM, CPAP, ETOH, PTA (prior to arrival), CC (chief complaint), HPI, SOB (use with caution—context matters), NPA/OPA.
- Avoid ambiguous or unsafe (per Joint Commission “Do Not Use” principles): U (write “units”), IU, Q.D./QOD (write “daily”/“every other day”), trailing zeros (write 1 mg, not 1.0 mg), lack of leading zero (write 0.5 mg).
- Local policies prevail—follow agency and receiving facility guidance.

## Radio report and handoff frameworks
- SBAR (Situation, Background, Assessment, Recommendation) for medical control/receiving RN.
- MIST (Mechanism/Medical complaint, Injuries/Illness, Signs, Treatment) for trauma.
- Example SBAR: “S: 58‑year‑old male with chest pressure for 30 min. B: HTN, HLD, aspirin allergy denied. A: A&O×4, diaphoretic, anterior chest pressure 8/10; vitals 148/88, HR 104, RR 22, SpO₂ 92% RA. Lungs clear; no JVD. R: Oxygen titrated to 94%, aspirin 324 mg chewed given, nitro withheld due to suspected RV involvement—awaiting 12‑lead at ED.”

## Pronunciation/spelling pitfalls (avoid wrong‑site/wrong‑word errors)
- Ileum (small intestine) vs Ilium (hip bone)
- Perineum (between genitalia and anus) vs Peroneal (lateral leg/nerve)
- Dysphagia (swallowing) vs Dysphasia (speech)
- Ulnar (forearm bone) vs “ulnar nerve” numbness in 4th/5th digits

## Red‑flag pitfalls
- Left/right documentation errors—verify before procedures and in the chart.
- Missed distal neurovascular checks—document pre‑ and post‑splinting.
- Overuse of slang/ambiguous abbreviations in legal documentation.
- Using Trendelenburg for shock—evidence doesn’t support benefit; prioritize supine, bleeding control, oxygenation, warmth, rapid transport.

## Rapid practice
1) Localize: “2‑cm superficial laceration lateral to the left eye.”
2) Translate: “Right lower quadrant abdominal tenderness with guarding.”
3) Reword for handoff: “Pt c/o dyspnea, tachypnea 28, SpO₂ 90% RA.”
4) Write a one‑sentence MIST for restrained driver, front‑end collision at 40 mph, airbag deployed, chest pain, normal vitals, seatbelt sign absent.

Suggested answers:
1) Left lateral periorbital area; superficial cut near the eye’s outer canthus.
2) Pain and muscle tension in the right lower abdomen.
3) “Short of breath; RR 28; SpO₂ 90% on room air—placed on oxygen with improvement.”
4) “M: 35‑y/o restrained driver MVC ~40 mph; I: reports anterior chest pain, no obvious injuries; S: ABCs intact, vitals WNL; T: oxygen to maintain SpO₂ ≥94%, monitoring, transport code 2.”

---
Field tip: When uncertain, describe location two ways (directional + surface landmark), then confirm with your partner before interventions and in the radio report.
`;

const ChapterPage = () => {
  const { chapterId } = useParams();
  const findChapter = () => {
    const id = parseInt(chapterId || '0', 10);
    for (const module of moduleStructure) {
      const chapter = module.chapters.find(c => c.id === id);
      if (chapter) return { chapter, module };
    }
    // Search bonus module as well
    const bonusHit = bonusModule.chapters.find(c => c.id === id);
    if (bonusHit) return { chapter: bonusHit, module: bonusModule };
    return null;
  };
 
  const result = findChapter();
  if (!result) return <div>Chapter not found</div>;
 
  const { chapter, module } = result;
  const isBonus = bonusModule.chapters.some(c => c.id === chapter.id);
  
  // Get content - Chapter 1 has full content, Chapter 2 has your workforce safety content
  const getChapterContent = () => {
  if (parseInt(chapterId || '0') === 10) {
    return `# Chapter 10: Comprehensive Patient Assessment

## Purpose for EMT-B
Deliver a repeatable, time-efficient assessment that finds life threats fast, stabilizes what you can, and gets the right patient to the right destination at the right time.

## High-yield flow (memorize the order)
1) Standard precautions → Scene safety → MOI/NOI → Number of patients → Additional resources → Consider spinal motion restriction (SMR).
2) Primary assessment (60–90 seconds): General impression → AVPU/LOC → Chief complaint/life threats → Airway → Breathing → Circulation → Disability (neuro quick check) → Exposure/Environment → Priority/transport decision.
3) History and focused exam: SAMPLE, OPQRST; target the system involved; obtain baseline vitals.
4) Secondary exam: Focused (medical) or head-to-toe (significant MOI/unknown); repeat vitals; form working impression and care plan.
5) Reassessment: Unstable every 5 min; stable every 15 min; trend vitals and mental status.

## 1) Scene size-up
- BSI/PPE first; hazards (traffic, violence, electricity, gas, unstable structures).
- Determine MOI/NOI and need for additional resources (fire, rescue, ALS, law enforcement).
- Consider SMR early when MOI or exam suggests spinal injury; manual inline stabilization if indicated.

## 2) Primary assessment (treat life threats as you find them)
- General impression: sick/not sick; obvious distress, position, work of breathing, major bleeding.
- Responsiveness: AVPU; obtain baseline GCS if altered; identify chief complaint.
- Airway: Open it (head-tilt chin-lift; jaw-thrust if trauma suspected). Suction as needed. OPA if no gag; NPA if gag present and no basilar skull fracture.
- Breathing: Rate/effort/sounds; adequate tidal volume? If inadequate, start BVM with oxygen. If adequate but hypoxemic or distressed, give oxygen to maintain SpO₂ ≥ 94%.
- Circulation: Major hemorrhage control first (direct pressure, tourniquet, hemostatic). Check pulse rate/quality, skin color/temp, cap refill. Treat shock (supine, oxygen to effect, keep warm, rapid transport).
- Disability: Pupils, obvious focal deficit, glucose check if trained/equipped and altered.
- Exposure/Environment: Expose to find hidden injury; prevent hypothermia.
- Decision: Priority transport? Consider time-sensitive conditions (stroke, STEMI, major trauma, sepsis, anaphylaxis, OB emergencies).

## 3) History and focused exam
- SAMPLE: Signs/Symptoms; Allergies; Medications; Past history; Last oral intake; Events.
- OPQRST for pain; clarify onset timeline and associated symptoms.
- Targeted physical exam based on CC (e.g., lung sounds for respiratory, JVD/edema for cardiac, abdominal quadrants for GI, FAST symptoms for neuro).
- Baseline vitals: HR, RR, BP, SpO₂, skin, pupils, temp if available; pain score; GCS when altered.

## 4) Secondary assessment
- Medical (focused): Examine the involved system(s) thoroughly; check two adjacent systems that could explain symptoms.
- Trauma (head-to-toe): DCAP-BTLS; palpate skull/face, inspect ears/nose/mouth; neck (trachea, JVD, cervical tenderness); chest (inspect, palpate, auscultate); abdomen (inspect, palpate all quadrants); pelvis (gentle compression once; binder if unstable); extremities (deformity, tenderness, PMS/CSM); back (log roll if needed, maintain SMR).

## 5) Reassessment and trending
- Recheck mental status, ABCs, vitals; evaluate response to interventions.
- Unstable/critical: every 5 minutes. Stable: every 15 minutes.
- Update destination decision if new red flags appear; notify receiving facility early for stroke/STEMI/trauma alerts.

## Special populations
- Pediatric: Use PAT (Appearance, Work of breathing, Circulation to skin). Hypotension is late—act on early distress. Weight-based dosing; involve caregiver.
- Obstetric: Gestational age; left lateral tilt in late pregnancy; vaginal bleeding vs. rupture of membranes; look for preeclampsia/eclampsia signs; prepare for delivery if imminent.
- Geriatric: Atypical presentations; high anticoagulant use; fragile skin; cognitive baseline from family.

## Documentation (PCR) essentials
- Chief complaint in patient’s words; times for assessments/interventions; vitals with trends; negative findings; decision-making and medical direction consults; handoff details.

## Common pitfalls
- Failing to treat life threats during the primary; delaying transport for exhaustive on-scene testing; missing hypoglycemia in AMS; not reassessing after interventions.
`;
  }
  if (parseInt(chapterId || '0') === 5) {
    return chapter5StudyNotes;
  }
  if (parseInt(chapterId || '0') === 6) {
    return `# Chapter 6: Body Systems for Emergency Care

## Purpose for EMT-B
A concise, clinically focused guide to major body systems: what each system does, what red flags look like in the field, and which EMT-B actions matter most. Emphasis on recognition, early stabilization, and rapid transport when indicated.

## System snapshots (function → red flags → EMT-B actions)

### 1) Respiratory system
- Function: Ventilation and gas exchange (O₂ in; CO₂ out) via airways, lungs, alveolar-capillary diffusion, chest wall/diaphragm mechanics.
- Red flags: Increased work of breathing, accessory muscles, retractions, tachypnea or bradypnea, cyanosis, altered mental status, silent chest (severe asthma), stridor, inability to speak full sentences.
- EMT-B actions: Airway positioning, suction as needed, adjuncts (OPA/NPA per tolerance), oxygen to SpO₂ ≥ 94% (titrate), assist ventilations with BVM for inadequate respirations, assist prescribed bronchodilator when indicated; consider epinephrine for anaphylaxis per protocol; rapid transport.

### 2) Cardiovascular system
- Function: Pump (heart) and pipes (vessels) deliver oxygenated blood and remove wastes.
- Red flags: Chest pressure/pain with diaphoresis, dyspnea, syncope, palpitations; signs of shock (cool, clammy, delayed cap refill, AMS, hypotension); unequal pulses in trauma.
- EMT-B actions: Position of comfort (unless hypotensive), oxygen to effect; aspirin for suspected ACS if not contraindicated; assist with nitroglycerin per protocol (check BP, PDE5 inhibitors, RV infarct suspicion); manage life-threatening hemorrhage first in trauma; rapid transport and early notification.

### 3) Nervous system
- Function: Central/peripheral control and coordination; consciousness, movement, sensation, autonomic regulation.
- Red flags: Focal deficits (weakness, facial droop), new confusion or agitation, seizures, severe headache, unequal pupils, rapidly declining GCS.
- EMT-B actions: Protect airway (recovery position when safe), suction as needed, oxygen to effect; glucose check for altered patients when trained/equipped; stroke screening and last known well time; seizure protection from injury; rapid transport to appropriate facility.

### 4) Musculoskeletal system
- Function: Support, movement, protection of organs, mineral storage, hematopoiesis.
- Red flags: Deformity, crepitus, point tenderness, open fractures, pelvic instability, pain out of proportion, compartment syndrome signs (pain with passive stretch, tense compartments).
- EMT-B actions: Hemorrhage control first; assess and document distal PMS/CSM before and after splinting; gentle realignment for pulseless, severely angulated long-bone injuries per protocol; pelvic binders when suspected unstable pelvis; prevent hypothermia; do not delay transport for prolonged splinting in unstable patients.

### 5) Integumentary system (skin)
- Function: Barrier, thermoregulation, sensation, fluid balance.
- Red flags: Extensive burns, full-thickness burns, inhalation injury, rapidly spreading infections (crepitus, bullae), large avulsions or degloving, cyanosis or mottling.
- EMT-B actions: Control bleeding; cover open wounds with sterile dressings; burn care—cool thermal burns briefly (10–20 min) avoiding hypothermia, cover with dry sterile dressings; remove rings/jewelry early; manage airway/oxygen for inhalation injuries; rapid transport based on severity/criteria.

### 6) Gastrointestinal system
- Function: Digestion, absorption, waste elimination.
- Red flags: Severe, localized abdominal pain (RLQ, RUQ, etc.), guarding/rigidity, distension, GI bleeding (hematemesis, melena, hematochezia), vomiting with peritoneal signs, syncope.
- EMT-B actions: Assess pain onset/location/character; manage airway/aspiration risk; position of comfort; oxygen to effect; watch for shock; do not give PO intake; rapid transport when peritonitis, GI bleed, or shock suspected.

### 7) Renal/Genitourinary system
- Function: Fluid/electrolyte balance, waste removal, BP regulation (RAAS), erythropoietin production.
- Red flags: Flank pain radiating to groin (stones), anuria/oliguria, edema, confusion, hyperkalemia risk in dialysis patients.
- EMT-B actions: Check dialysis access site; monitor for fluid overload (crackles, dyspnea) vs dehydration; be cautious with IV fluids per local scope/protocol; rapid transport if unstable.

### 8) Endocrine system
- Function: Hormonal regulation (glucose, metabolism, stress response).
- Red flags: Altered mental status with abnormal glucose, polyuria/polydipsia, fruity breath (DKA), vomiting, dehydration.
- EMT-B actions: Check glucose when trained/equipped; oral glucose for symptomatic hypoglycemia if patient can protect airway; supportive care and oxygen; rapid transport.

### 9) Immune/Lymphatic system
- Function: Defense against pathogens, fluid balance.
- Red flags: Anaphylaxis—rapid onset hives, wheeze/stridor, hypotension, GI symptoms; fever with toxicity signs.
- EMT-B actions: Epinephrine IM first-line for anaphylaxis; airway/oxygen; consider albuterol for wheeze; position and rapid transport; monitor for biphasic reactions.

## Cross-system physiology essentials
- Perfusion requires adequate pump (CO), pipes (SVR), and volume (preload). Shock = failure of perfusion; treat reversible causes and transport.
- Ventilation, diffusion, and perfusion must align (V/Q matching). Oxygen alone cannot fix ventilation failure—assist ventilations when inadequate.
- Temperature management: prevent hypothermia in trauma—improves coagulation and outcomes.

## Assessment priorities (primary → secondary)
- Primary: Airway, breathing, circulation, disability (neuro), exposure/environment. Control life-threatening hemorrhage immediately.
- Secondary: Focused/systemic exam guided by chief complaint and MOI/NOI. Reassess vitals and mental status; trend changes.

## Field pearls
- A normal single vital sign can hide deterioration—look at trends and overall picture.
- “Silent chest” in asthma is ominous. “Normal” SpO₂ with high work of breathing can still require ventilatory support.
- Pelvic instability or femur fracture can bleed significantly—treat as potential shock.

## Related tools and references
- Tools: GCS, Burn BSA, Pediatric dosing, Stroke screening.
- Medications: Oxygen, Albuterol, Epinephrine, Aspirin, Nitroglycerin (assist), Oral Glucose, Naloxone (per local scope).
- Protocols: Shock, Respiratory Distress, ACS, Anaphylaxis, Stroke, Trauma.
`;
  }
  if (parseInt(chapterId || '0') === 11) {
    return `# Chapter 11: Airway Management Techniques

## Goals for EMT-B
Maintain or restore airway patency, ensure adequate ventilation and oxygenation, and prevent aspiration—all with the least invasive, safest approach.

## Core principles
- Open the airway: Head-tilt chin-lift (no trauma). Jaw-thrust (suspected spinal injury).
- Clear the airway: Suction visible secretions/fluids quickly and safely.
- Keep it open: OPA for unresponsive without gag; NPA for patients with gag reflex when no basilar skull fracture suspected.
- Ventilate when inadequate: BVM with O₂; ensure chest rise, correct rate, and minimal gastric insufflation.
- Oxygenate appropriately: Titrate O₂ to SpO₂ ≥ 94% unless CO poisoning or other specific indications.

## Suctioning
- Indications: Gurgling, visible secretions, blood, emesis obstructing airway.
- Technique: Rigid (Yankauer) for oropharynx; soft catheter for nares/ETT suction (ALS). Pre-oxygenate if possible.
- Time limits (single attempt): Adults ≤ 15 sec; Children ≤ 10 sec; Infants ≤ 5 sec. Re-oxygenate between attempts.

## Airway adjuncts
- OPA: Measure corner of mouth to earlobe/angle of jaw; contraindicated with gag reflex.
- NPA: Measure tip of nose to earlobe; lube and insert bevel toward septum along floor of nose; contraindicated with suspected basilar skull fracture or significant facial trauma.

## Ventilation with BVM
- Indications: Inadequate rate or tidal volume, apnea, severe hypoventilation, or failure to protect airway.
- Technique: Two-person preferred—one maintains mask seal (E–C clamp) and airway, the other squeezes bag.
- Rate targets (with pulse): Adult 1 breath every 5–6 sec; Child/Infant 1 breath every 3–5 sec; each breath over ~1 sec to visible chest rise.
- Avoid hyperventilation; allow full exhalation; monitor for gastric distension.

## Oxygen delivery
- Nasal cannula: 1–6 L/min (~24–44% FiO₂) for mild hypoxemia.
- Nonrebreather mask: 10–15 L/min (~60–90% FiO₂) for moderate–severe hypoxemia with adequate breathing.
- BVM with reservoir: 15 L/min; near 100% when seal and ventilation are adequate.

## Foreign-body airway obstruction (FBAO)
- Adult/Child: Responsive complete obstruction → abdominal thrusts; if pregnant/obese → chest thrusts.
- Infant (<1 year): 5 back slaps + 5 chest thrusts; repeat until relieved or unresponsive.
- Unresponsive: Start CPR; check mouth for visible object before breaths; do not perform blind finger sweeps.

## Trauma considerations
- Use jaw-thrust; maintain SMR when indicated; anticipate airway edema/bleeding. Consider suction readiness and rapid transport.

## Post-airway care
- Reassess ABCs and vitals; monitor SpO₂ and mental status; document device size, insertion, tolerance, ventilation rate, and patient response.

## Pitfalls
- Inadequate mask seal, overventilation, skipping suction, inserting OPA with active gag, failing to reassess after interventions.
`;
  }
  if (parseInt(chapterId || '0') === 12) {
    return `# Chapter 12: Medication Administration Essentials

## EMT-B scope (typical; verify local protocols)
- Administer: Oxygen, Oral Glucose, Epinephrine (auto-injector/IM), Naloxone (IN/IM), Aspirin (chewable) for suspected ACS.
- Assist: Patient-prescribed Nitroglycerin (SL), Bronchodilator MDI/nebulizer (e.g., albuterol).

## The 6 Rights (plus two)
Right patient, right medication, right dose, right route, right time, right documentation; plus right indication and check for contraindications.

## Key medications
- Oxygen: Indication—hypoxemia, respiratory distress, shock. Titrate to SpO₂ ≥ 94% (higher for CO poisoning/pregnancy per protocol). Avoid unnecessary hyperoxia.
- Oral Glucose: Indication—symptomatic hypoglycemia with intact gag and ability to swallow. Dose 15–24 g buccal; reassess mental status and glucose if equipped.
- Epinephrine (anaphylaxis): Adult typical 0.3 mg IM (1 mg/mL); Pediatric 0.15 mg IM; repeat per protocol. Indication—anaphylaxis with respiratory compromise and/or hypotension.
- Naloxone: Indication—suspected opioid overdose with hypoventilation/respiratory depression. Typical IN 4 mg (single spray) or 0.4–2 mg IN/IM; repeat per protocol. Prioritize ventilation; naloxone should not delay BVM/CPR.
- Aspirin (ACS): 162–324 mg chewable if no allergy/bleeding risk; not for pediatric fever; contraindicated in active GI bleed, true allergy.
- Nitroglycerin (assist): 0.4 mg SL; q5 min up to 3 doses per protocol; ensure SBP is adequate (e.g., >100–110 mmHg), no PDE5 inhibitor in past 24–48 h, and no suspected RV infarct.
- Bronchodilator (assist/administer per local): Albuterol MDI or nebulized (2.5 mg nebulized common); watch for tachycardia/tremor.

## Process
1) Confirm indications/contraindications; check expiration; inspect medication.
2) Explain to patient; obtain medical direction as required; verify 6 rights.
3) Administer; monitor for effect and adverse reactions; document dose/time/response.

## Pediatric considerations
- Weight-based dosing; use length-based tape; epi 0.15 mg for ~15–30 kg; 0.3 mg for larger children when per protocol.

## Pitfalls
- Giving oral glucose to patients without airway protection; nitro without BP/PDE5 checks; delaying epinephrine in anaphylaxis; failure to reassess and document effects.
`;
  }
  if (parseInt(chapterId || '0') === 13) {
    return `# Chapter 13: Shock Recognition & Response

## Definition
Shock is inadequate tissue perfusion leading to cellular hypoxia and organ dysfunction. Treat reversible causes and transport rapidly.

## Types and hallmarks
- Hypovolemic (hemorrhagic/non-hemorrhagic): tachycardia, cool/clammy skin, narrow pulse pressure, hypotension late.
- Cardiogenic: chest pain, pulmonary edema, hypotension, JVD possible; often post-MI or arrhythmia.
- Obstructive: tension pneumothorax (absent breath sounds, hypotension, JVD, tracheal deviation late), cardiac tamponade (Beck triad), massive PE (sudden dyspnea, hypotension).
- Distributive: septic (fever or hypothermia, warm then cool skin), anaphylactic (hives, wheeze, hypotension), neurogenic (warm/dry skin below lesion, bradycardia, hypotension).

## Recognition
- Early: restlessness/anxiety, tachycardia, cool pale skin, delayed cap refill, tachypnea.
- Late: hypotension, altered mental status, weak/absent radial pulses, oliguria (if measured).

## EMT-B actions
1) Control life-threatening hemorrhage first (direct pressure, tourniquet, hemostatic).
2) Airway and breathing: open airway; oxygen to effect; ventilate if inadequate.
3) Position: supine (unless respiratory distress). Avoid Trendelenburg.
4) Keep warm: prevent hypothermia to preserve coagulation.
5) Specifics:
   - Anaphylaxis: epinephrine IM immediately; add albuterol for wheeze; rapid transport.
   - Tension pneumothorax: recognize and expedite ALS/needle decompression; support ventilation and oxygen.
   - Cardiogenic: cautious oxygen titration; avoid fluid overload; rapid ALS/transport.
   - Septic: identify infection source/signs; oxygen, keep warm, early transport.
6) Reassess every 5 minutes; prepare for deterioration.

## Pediatric/OB notes
- Children compensate then crash—act on early signs.
- Pregnancy: late term may have supine hypotension—tilt 15–30° left.

## Pitfalls
- Missing internal bleeding; failing to keep the patient warm; delaying epinephrine; prolonged on-scene time when definitive care is needed.
`;
  }
  if (parseInt(chapterId || '0') === 14) {
    return `# Chapter 14: BLS Resuscitation Protocols

## Goals
Provide high-quality CPR with minimal interruptions, early defibrillation, effective ventilation, and rapid post-ROSC care—according to current BLS guidance.

## Cardiac arrest recognition
- Unresponsive, not breathing normally (gasping/agonal = not normal), and no pulse (or pulse check uncertain within 10 seconds) → start CPR.

## High-quality CPR
- Compression rate: 100–120/min.
- Compression depth: Adults at least 2 inches (5–6 cm); Children at least 1/3 AP diameter (~2 in/5 cm); Infants at least 1/3 AP (~1.5 in/4 cm).
- Full chest recoil; minimize pauses; change compressors about every 2 minutes.
- Ratio (no advanced airway):
  - Adults: 30:2 for all rescuer counts.
  - Children/Infants: 30:2 single rescuer; 15:2 with two rescuers.
- With advanced airway (if placed by ALS): continuous compressions at 100–120/min with 1 breath every 6 seconds (10/min) without pausing compressions.

## AED use
- Apply as soon as available; follow prompts.
- Witnessed adult arrest: consider immediate shock if shockable rhythm detected.
- Pediatric use: Prefer pediatric-attenuated pads for <8 years or <25 kg; if unavailable, use adult pads ensuring no overlap (anterolateral or anterior–posterior placement).

## Ventilation and oxygenation
- For apneic/pulseless: prioritize compressions; add ventilations with BVM at recommended ratios.
- For patients with a pulse but inadequate breathing: Adult 1 breath every 5–6 sec; Child/Infant 1 breath every 3–5 sec; observe visible chest rise.
- Avoid excessive ventilation; use airway adjuncts and suction as needed.

## Special circumstances
- Opioid-associated emergencies: If pulseless—start CPR and ventilate first; give naloxone when available but do not delay CPR/AED. If pulse but respiratory depression—assist ventilations and give naloxone.
- Drowning: Emphasize ventilation early; remove from water safely; begin CPR; AED as soon as available.
- Hypothermia: Check pulse and breathing up to 10 seconds; begin CPR unless obvious signs of death; limit shocks/meds per local protocol until rewarmed; handle gently.
- Pregnancy (late): Manual left uterine displacement or left lateral tilt to improve venous return; prepare for perimortem resuscitative efforts per local policies (ALS/ED).
- Trauma: Control hemorrhage; prioritize airway/ventilation and rapid transport.

## Post-ROSC care (BLS priorities)
- Support airway/breathing; titrate oxygen to SpO₂ 94–99%; avoid hyperventilation.
- Monitor mental status, airway protection, and hemodynamics; keep patient warm.
- Reassess frequently and prepare for re-arrest; early transport and notification.

## Foreign-body airway obstruction (adults/children/infants)
- See Chapter 11 techniques; if unresponsive, start CPR; check mouth for visible object before each set of breaths.

## Team dynamics
- Clear leadership, closed-loop communication, role clarity, and mutual performance checks improve outcomes.

## Documentation
- Times (collapse, CPR start, AED attach, shocks, ROSC); bystander CPR; airway/ventilation methods; drugs given (e.g., naloxone); transport and handoff details.

## Pitfalls
- Long interruptions for pulse/rhythm checks; shallow/slow compressions; over-ventilation; delayed AED; failing to switch compressors.
`;
  }
  if (parseInt(chapterId || '0') === 7) {
    return `# Chapter 7: Lifespan Considerations in EMS

## Purpose for EMT-B
Adapt assessment, communication, and interventions across the lifespan—from neonates to older adults, including pregnancy. Recognize normal ranges and atypical presentations to avoid mis-triage.

## Age groups and typical vital sign ranges (awake, resting)
Note: Ranges may vary by source and context; use local pediatric/clinical references and treat the patient, not just the number.

- Neonate (0–28 days)
  - RR ~ 30–60/min; HR ~ 100–205/min; SBP ~ 67–84 mmHg
  - Features: obligate nasal breathing; large occiput; soft chest wall; poor thermoregulation.
- Infant (1–12 months)
  - RR ~ 30–53/min; HR ~ 100–190/min; SBP ~ 72–104 mmHg
  - Features: separation anxiety; rapid dehydration; bigger head-to-body ratio.
- Toddler (1–3 years)
  - RR ~ 22–37/min; HR ~ 98–140/min; SBP ~ 86–106 mmHg
  - Features: limited vocabulary; fear of strangers; examine from toe-to-head.
- Preschool (3–5 years)
  - RR ~ 20–28/min; HR ~ 80–120/min; SBP ~ 89–112 mmHg
  - Features: concrete thinking; use simple explanations and allow choices when safe.
- School-age (6–12 years)
  - RR ~ 18–25/min; HR ~ 75–118/min; SBP ~ 97–115 mmHg
  - Features: cooperative; can localize pain; involve in simple decisions.
- Adolescent (13–18 years)
  - RR ~ 12–20/min; HR ~ 60–100/min; SBP ~ 110–131 mmHg
  - Features: privacy concerns; consider confidentiality; risk-taking behaviors.
- Adult (19–64 years)
  - RR ~ 12–20/min; HR ~ 60–100/min; SBP variable (commonly 100–129 systolic)
  - Features: broad variability; comorbidities may alter baselines.
- Older adult (65+ years)
  - RR often 12–20/min; HR baseline may be lower with meds; BP often higher
  - Features: decreased physiologic reserve; atypical presentations (e.g., silent MI, sepsis without fever, confusion instead of pain).

## Pediatric anatomical/physiological considerations
- Airway: larger occiput (pad shoulders in infants), proportionally larger tongue, narrower airway; subglottic narrowing; prefer neutral/sniffing position; jaw-thrust if trauma suspected.
- Breathing: diaphragm-dependent; fatigue quickly; look for retractions (subcostal/intercostal/suprasternal), nasal flaring, grunting, head bobbing.
- Circulation: compensate with tachycardia/vasoconstriction until sudden decompensation; hypotension is a late sign.
- Thermoregulation: infants lose heat quickly; warm environment and minimize exposure.
- Assessment: use PAT (Pediatric Assessment Triangle)—appearance, work of breathing, circulation to skin—for initial impression.

## Communication strategies
- Infants/toddlers: involve caregiver; examine on caregiver’s lap; use distraction; examine toe-to-head.
- School-age: explain what you’re doing; allow them to control small choices; be honest about discomfort.
- Adolescents: respect privacy; offer same-gender provider when feasible; screen for risk behaviors with sensitivity.
- Older adults: speak clearly, allow time, verify hearing/vision aids; avoid medical jargon; confirm baseline from family/caregivers.

## Medication and equipment considerations
- Pediatric dosing is often weight-based (mg/kg). Use pediatric dosing aids/length-based tapes; double-check calculations.
- Airway adjunct sizing, mask size, and BVM volume must match patient size; avoid excessive ventilations.
- Older adults: polypharmacy risks (anticoagulants, beta blockers, sedatives); bring all meds/list if possible.

## Pregnancy overview (time-critical differences)
- Trimester changes: increased blood volume and heart rate; relative anemia; decreased functional residual capacity; delayed gastric emptying; hypotension when supine (aortocaval compression)—tilt 15–30° left.
- Red flags: vaginal bleeding, abdominal pain, severe headache/visual changes (preeclampsia), seizures (eclampsia), decreased fetal movement, trauma (high risk for concealed hemorrhage).
- EMT-B actions: Manage ABCs; oxygen to effect; left lateral tilt; control bleeding; prepare for delivery when imminent (crowning, urge to push, contractions close/frequent); neonatal care and warm environment post-delivery; rapid transport to obstetric-capable facility for high-risk presentations.

## Geriatric specifics
- Atypical presentations: MI without chest pain (dyspnea, weakness, syncope), sepsis with confusion and normothermia, abdominal emergencies with minimal tenderness.
- High risk of dehydration, infection, falls, head injuries (brain atrophy → bridging vein tearing with minor trauma), fractures (osteoporosis).
- Skin/vascular fragility: gentle handling; careful with adhesives/tourniquets.

## Abuse/neglect and safeguarding
- Maintain high index of suspicion for child/elder abuse or neglect; document objectively; follow mandatory reporting laws and agency policy.

## Hand-off frameworks
- Use SBAR for medical and MIST for trauma across all ages; include baseline status (developmental stage or cognitive baseline), pertinent negatives, and caregiver reports.

## Field pearls
- “Parents’ instinct” can be a helpful clue; always correlate with objective findings.
- In children, hypotension is late—act on early signs of respiratory distress or poor perfusion.
- In pregnancy, any significant trauma is a maternal and fetal emergency—early transport and alert.
`;
  }
  if (parseInt(chapterId || '0') === 42) {
  return `# Chapter 42: Human Body Systems Overview

## Focus for EMT-B
This chapter gives a concise, clinically focused map of major body systems and what matters at the scene. Emphasis: recognizing red flags, linking findings to EMT-B treatments, and knowing when to escalate to ALS.

## What Body Systems Do (Big Picture)
• Respiratory brings O₂ in and removes CO₂; Cardiovascular moves blood and nutrients; Nervous controls and coordinates; Musculoskeletal supports and moves; Integumentary protects and regulates temperature; GI digests/absorbs; Renal filters wastes and balances fluids; Endocrine sends hormone signals; Immune/lymph defends and drains fluids.

## Where They Are (Landmarks)
• Chest: lungs and heart. Abdomen: GI solid organs (liver, spleen, pancreas) and hollow organs (stomach, intestines). Flanks/back: kidneys. Head/spine: brain and cord. Everywhere: skin, vessels, nerves, muscles/bones.

## How Key Processes Work
• Blood flow (with valves and O₂ status):
  - Deoxygenated blood from body → Superior & Inferior Vena Cavae → Right Atrium (RA)
  - RA → Tricuspid valve → Right Ventricle (RV)
  - RV → Pulmonic (pulmonary semilunar) valve → Pulmonary arteries → Lungs
  - Alveoli: O₂ diffuses into blood, CO₂ diffuses out → blood becomes oxygenated
  - Lungs → Pulmonary veins → Left Atrium (LA)
  - LA → Mitral (bicuspid) valve → Left Ventricle (LV)
  - LV → Aortic valve → Aorta → Systemic arteries → Arterioles → Capillaries (deliver O₂)
  - Return: Venules → Veins → Vena cavae → RA (deoxygenated again)
  - Coronary circulation: First branches of aorta (RCA/LCA) feed the heart muscle itself
• Gas exchange (in lungs and tissues): Air to alveoli → O₂ diffuses into blood, CO₂ diffuses out; adequate ventilation (air movement), perfusion (blood flow), and matching (V/Q) are required.
• Perfusion = delivery of oxygenated blood to tissues; depends on pump (heart), pipes (vessels), and fluid (blood volume).

## How Systems Interact
• Resp + Cardio: lungs load O₂, heart delivers it. Renal + Endocrine: regulate BP/volume (RAAS, ADH). Nervous + all: autonomic tone modulates HR, RR, vessel size. Skin + Cardio: thermoregulation via vasodilation/constriction.

## Rapid Systems Snapshot (Primary Survey)
• Airway/Breathing: Patency, rate/effort, sounds (wheezes/stridor/rales). SpO₂ target ≥ 94%.
• Circulation: Pulse quality, skin signs, cap refill, obvious bleeding. Shock = time‑critical.
• Neurologic: GCS trend, focal deficits, pupils, glucose when trained/equipped.
• Disability/Exposure: Look for hidden injuries; prevent hypothermia.

## Cross‑References
• Tools: Glasgow Coma Scale (GCS), Pediatric dosing, Burn BSA.
• Medications: Oxygen, Albuterol, Epinephrine, Aspirin, Naloxone, Oral Glucose.
• Protocols: Stroke Alert, Anaphylaxis, Respiratory Failure, Diabetic Emergency, Trauma, Shock.

## Field Pearls
• Titrate oxygen to effect—avoid hyperoxia except CO exposure scenarios.
• Trend matters: a single “normal” value can hide deterioration.
• When in doubt: early transport and early notification.`;
    }

  if (parseInt(chapterId || '0') === 43) {
  return `# Chapter 43: Cardiovascular System Essentials (EMT‑B)

## What It Does
Moves blood to deliver O₂/nutrients and remove CO₂/wastes; maintains BP and perfusion.

## Where It Is
Heart in mediastinum; arteries/veins throughout body; capillaries in all tissues; coronary arteries feed the heart.

## How It Works (Follow the Blood)
• Right heart sends deoxygenated blood to lungs; left heart sends oxygenated blood to body.
• Step-by-step (valves and O₂ status):
  - Body (deoxygenated) → Superior/Inferior Vena Cavae → Right Atrium (RA)
  - RA → Tricuspid valve → Right Ventricle (RV)
  - RV → Pulmonic valve → Pulmonary arteries → Lungs (gas exchange at alveoli)
  - Lungs → Pulmonary veins (oxygenated) → Left Atrium (LA)
  - LA → Mitral (bicuspid) valve → Left Ventricle (LV)
  - LV → Aortic valve → Aorta → Arteries/Arterioles → Capillaries (deliver O₂ to tissues)
  - Venules/Veins → Vena cavae → RA (cycle repeats)
• Coronary first: Right & left coronary arteries branch off proximal aorta to perfuse myocardium.
• Valve mnemonic: "Tri before bi" (Tricuspid on the right, Bicuspid/Mitral on the left).
• Electrical: SA node → AV node → His‑Purkinje coordinates contraction. CO = HR × SV; MAP ≈ DBP + 1/3 PP.

## How It Relates to Other Systems
• Respiratory supplies O₂ for hemoglobin; renal/endocrine regulate volume/BP (RAAS, ADH); nervous system controls rate/contractility.

## What EMTs Must Recognize
• Perfusion: mental status, skin, pulses, BP trends.
• ACS red flags: pressure‑like chest pain, radiation, diaphoresis, dyspnea, nausea.
• Shock: tachycardia, cool/clammy skin, delayed cap refill, AMS.

## EMT‑B Actions
• Position of comfort; limit exertion.
• Oxygen to SpO₂ ≥ 94%; avoid excessive oxygen unless CO exposure.
• Aspirin 324 mg chewable if no contraindication.
• Assist with patient’s nitroglycerin per protocol (check SBP, PDE5 use; consider RV infarct caution).
• Rapid transport; early STEMI center notification per local policy.

## Cross‑References
• Protocols: Acute Coronary Syndrome; Shock; Cardiac Arrest (ALS meds only).
• Medications: Aspirin; Nitroglycerin (assist); Oxygen.
• ECG tip: Inferior STEMI → consider RV involvement (use caution with nitro).

## Pitfalls
• Nitro without SBP/PDE5 check.
• Missing atypical ACS (older, diabetic, female patients).
• Delaying transport for repeated assessments.`;
    }

  if (parseInt(chapterId || '0') === 44) {
  return `# Chapter 44: Respiratory System Essentials (EMT‑B)

## What It Does
Brings oxygen in and removes carbon dioxide; maintains acid‑base balance and speech.

## Where It Is
Upper airway (nose, mouth, pharynx, larynx); lower airway (trachea, bronchi, bronchioles); lungs/alveoli; diaphragm/intercostals.

## How Gas Exchange Works
• Ventilation: air movement to alveoli. Diffusion: O₂ ↔ CO₂ across alveolar‑capillary membrane. Perfusion: blood flow past alveoli.
• V/Q matching is essential. Low V (e.g., asthma, COPD) or low Q (e.g., PE) → hypoxemia.
• Oxyhemoglobin curve: low SpO₂ and acidosis reduce O₂ loading; titrate O₂ to ≥ 94%.

## How It Relates to Other Systems
• Cardiovascular delivers gases; nervous system controls rate/depth; skin and musculoskeletal assist ventilation and thermoregulation.

## Assessment Priorities
• Work of breathing, rate, sounds (wheezes, rales, stridor).
• Pulse oximetry; target SpO₂ ≥ 94%.
• Speaking ability (full sentences?), accessory muscle use, cyanosis.

## EMT‑B Actions
• Position upright if tolerated; manage airway; suction as needed.
• Oxygen: titrate to ≥ 94%; NRB or BVM for severe distress.
• Assist with bronchodilator inhaler; albuterol per protocol.
• Anaphylaxis: epinephrine IM first; add albuterol if wheezing persists.

## Cross‑References
• Protocols: Acute Respiratory Failure; Anaphylaxis; Pediatric Respiratory Distress.
• Medications: Oxygen, Albuterol, Epinephrine.
• Calculators: Pediatric dosing.

## Red Flags
• Silent chest in asthma; rapidly worsening fatigue; stridor; SpO₂ not improving.`;
    }

  if (parseInt(chapterId || '0') === 45) {
  return `# Chapter 45: Nervous System Essentials (EMT‑B)

## What It Does
Controls and coordinates body functions; conscious thought, movement, sensation; autonomic control of HR, BP, RR, pupils.

## Where It Is
Central (brain, spinal cord) and peripheral (spinal/peripheral nerves). Brain regions: cerebrum (thought), cerebellum (coordination), brainstem (vitals).

## How It Works
• Neurons signal via electrical impulses and chemical synapses.
• Autonomic: Sympathetic (fight/flight) ↑ HR/BP, bronchodilation; Parasympathetic (rest/digest) ↓ HR, bronchoconstriction.
• Stroke = sudden loss of blood flow to brain; seizure = abnormal synchronized neuronal firing.

## How It Relates to Other Systems
• Modulates cardiovascular and respiratory drive; controls endocrine axes via hypothalamus; interacts with musculoskeletal for movement.

## Core Concepts for EMT‑B
• GCS trend; stroke screening (FAST/CPSS); pupils; focal deficits; post‑ictal states.

## EMT‑B Actions
• Protect airway; recovery position when safe; suction as needed.
• Check glucose when trained/equipped in altered patients.
• Stroke: determine last known well; rapid transport to stroke center; oxygen to ≥ 94%.
• Seizure: protect from injury; cooling for febrile pediatric seizures.

## Cross‑References
• Protocols: Stroke Alert; Seizure (Adult/Pediatric); Diabetic Emergency.
• Tools: GCS calculator; Pediatric dosing.
• Medications: Oral Glucose.

## Pitfalls
• Missing hypoglycemia in AMS.
• Delayed stroke recognition and transport.`;
    }

  if (parseInt(chapterId || '0') === 46) {
  return `# Chapter 46: Musculoskeletal System & Trauma Basics

## What It Does
Supports body, protects organs, allows movement, stores minerals, makes blood cells (marrow).

## Where It Is
Bones (axial and appendicular), joints/ligaments, skeletal muscles/tendons.

## How It Works
• Muscles contract via sliding filaments (actin‑myosin) triggered by calcium and nerve impulses.
• Joints allow range of motion; stability vs mobility trade‑off.
• Long bone and pelvic fractures can bleed significantly; closed spaces (compartment syndrome) endanger perfusion and nerves.

## How It Relates to Other Systems
• Movement requires nervous input and cardiovascular oxygen delivery; skin protects and signals injury.

## Priorities (Trauma)
• Hemorrhage control first; then splinting when appropriate.
• Assess distal PMS (pulse, motor, sensation) before/after splints.

## EMT‑B Actions
• Direct pressure, tourniquet, hemostatic gauze as indicated.
• Spinal motion restriction based on decision rules and local policy.
• Prevent hypothermia; gentle handling.

## Cross‑References
• Protocols: Multi‑System Trauma; SMR; MCI Triage.
• Tools: Burn BSA calculator.

## Pitfalls
• Delaying transport for prolonged splinting in unstable patients.`;
    }

  if (parseInt(chapterId || '0') === 47) {
  return `# Chapter 47: Integumentary System & Wound Care

## What It Does
Protects against infection/trauma, prevents fluid loss, regulates temperature, enables sensation.

## Where It Is
Skin layers: epidermis (barrier), dermis (vessels, nerves), subcutaneous fat (insulation). Hair, nails, glands.

## How It Works
• Thermoregulation via sweating and vasodilation/vasoconstriction.
• Barrier function seals fluids in and pathogens out; breaks increase infection risk and fluid loss.

## How It Relates to Other Systems
• Cardiovascular supports perfusion; nervous provides sensation/pain; immune responds to breaches.

## Assessment & Care
• Identify depth/extent of burns; look for inhalation injury.
• Irrigate chemical exposures; remove contaminated clothing.

## EMT‑B Actions
• Room‑temp water cooling 10–20 min for thermal burns; avoid hypothermia.
• Cover with sterile dressings; monitor pain and perfusion.

## Cross‑References
• Protocols: Burn Injury Management; Chemical Exposure – Gross Decon.
• Tools: Burn BSA calculator.

## Pitfalls
• Ice application to burns; inadequate decon before transport.`;
    }

  if (parseInt(chapterId || '0') === 48) {
  return `# Chapter 48: Gastrointestinal System & Abdominal Assessment

## What It Does
Breaks down food, absorbs nutrients/water, eliminates waste; supports immunity (gut‑associated lymphoid tissue).

## Where It Is
Mouth → esophagus → stomach → small intestine (duodenum/jejunum/ileum) → large intestine (colon) → rectum/anus; solid organs: liver, gallbladder, pancreas, spleen.

## How It Works
• Mechanical and chemical digestion; bile emulsifies fats; pancreas provides enzymes and bicarbonate; liver processes nutrients and makes clotting factors.
• Quadrants help localization (RUQ liver/GB, LUQ spleen/stomach, RLQ appendix, LLQ sigmoid).

## How It Relates to Other Systems
• Cardiovascular (GI bleed → shock); endocrine (glucose handling); immune (spleen, gut immunity).

## Assessment
• OPQRST pain; palpation (tenderness, guarding, rebound); N/V/D; GI bleeding signs.
• Pregnancy status where applicable; consider AAA risk in older patients.

## EMT‑B Actions
• Position of comfort; oxygen if hypoxic; limit PO intake.
• Watch for shock signs; rapid transport for peritonitis, GI bleed, or AAA concern.

## Cross‑References
• Protocols: Syncope; Shock; Patient Refusal/AMA (capacity with abdominal pain complaints).

## Pitfalls
• Missing GI bleed in patients on anticoagulants; under‑recognizing AAA red flags.`;
    }

  if (parseInt(chapterId || '0') === 49) {
  return `# Chapter 49: Genitourinary/Renal System & Fluids

## What It Does
Kidneys filter blood, remove wastes, balance fluids/electrolytes, regulate acid‑base and BP (RAAS). GU tract stores/eliminates urine; reproductive organs separate.

## Where It Is
Kidneys retroperitoneal in flanks; ureters to bladder; urethra exits pelvis; dialysis access often forearm fistula/graft.

## How It Works
• Nephrons: filtration (glomerulus) → reabsorption/secretion (tubules) → urine.
• RAAS and ADH control volume and BP; kidneys manage potassium and acid‑base.

## How It Relates to Other Systems
• Cardiovascular (BP/volume); endocrine (ADH/aldosterone); affects ECG via potassium.

## Essentials for EMT‑B
• Dehydration recognition; renal failure/dialysis considerations; urinary complaints.

## EMT‑B Actions
• Assess perfusion; manage nausea/vomiting; transport for evaluation.
• Protect dialysis access sites; avoid BP cuffs/IVs in fistula arm.

## Cross‑References
• Protocols: Sepsis Screening; Patient Refusal/AMA; Operations (SMR where trauma).

## Pitfalls
• Ignoring volume status; compromising fistula access.`;
    }

  if (parseInt(chapterId || '0') === 50) {
  return `# Chapter 50: Endocrine System & Glucose Emergencies

## What It Does
Hormones coordinate long‑range control of metabolism, growth, stress, fluids/electrolytes; key for glucose regulation.

## Where It Is
Major glands: pancreas (insulin/glucagon), adrenal (cortisol/aldosterone), pituitary, thyroid/parathyroid, gonads.

## How It Works
• Negative feedback loops maintain homeostasis (e.g., insulin lowers BG; glucagon raises BG).
• Stress response: adrenal medulla (epi/norepi), cortex (cortisol) → ↑ glucose, ↑ BP.

## How It Relates to Other Systems
• Cardiovascular (BP via aldosterone), renal (sodium/water), nervous (stress responses), metabolic coupling to GI/liver.

## Assessment
• Hypoglycemia: AMS, diaphoresis, tachycardia, seizures.
• Hyperglycemia/possible DKA: polyuria, polydipsia, vomiting, Kussmaul respirations.

## EMT‑B Actions
• Glucose check when trained/equipped.
• Oral glucose for conscious, able‑to‑swallow patients with low BG.
• Oxygen to ≥ 94% if hypoxic; rapid transport if altered/uncooperative.

## Cross‑References
• Protocols: Diabetic Emergency; Sepsis Screening.
• Medications: Oral Glucose.
• Tools: Pediatric dosing.

## Pitfalls
• Giving PO glucose to a drowsy patient who can’t protect airway.`;
    }

  if (parseInt(chapterId || '0') === 51) {
  return `# Chapter 51: Immune & Lymphatic Systems (Allergy/Anaphylaxis)

## What They Do
Immune system defends against pathogens; lymphatic system drains interstitial fluid, filters via lymph nodes, and returns it to circulation.

## Where They Are
Widespread lymph vessels/nodes; spleen, thymus, tonsils; immune cells circulate in blood and tissues.

## How They Work
• Innate immunity: fast, non‑specific (barriers, phagocytes, inflammation).
• Adaptive immunity: specific, memory (B/T cells, antibodies).
• Anaphylaxis: IgE‑mediated mast cell activation → histamine release → vasodilation, leaky capillaries (hypotension), bronchoconstriction, edema.

## How They Relate to Other Systems
• Cardiovascular (shock in anaphylaxis), respiratory (airway edema/bronchospasm), skin (hives/angioedema), GI (vomiting/diarrhea).

## Recognition
• Multi‑system involvement: skin (hives/angioedema), respiratory (wheeze/stridor), cardiovascular (hypotension), GI symptoms.

## EMT‑B Actions
• Epinephrine IM via auto‑injector/manual per local protocol—don’t delay.
• Oxygen to SpO₂ ≥ 94%; assist with bronchodilator if wheezing persists.
• Rapid transport; monitor for biphasic reaction.

## Cross‑References
• Protocols: Anaphylaxis; Allergic Reaction (Mild/Moderate).
• Medications: Epinephrine, Albuterol, Oxygen.
• Simulations: Medication Administration – Anaphylaxis.

## Pitfalls
• Waiting for ALS in clear anaphylaxis; under‑dosing pediatrics.`;
    }
  if (parseInt(chapterId || '0') === 18) {
    return `# Chapter 18: Brain & Nerve Emergencies

ProMedixEMS™ Study Guide — concise, field-focused content for EMT-B. Verify local protocols.

## EMT-B focus
- Rapid neuro recognition and transport decisions for stroke, seizures, and altered mental status.
- Protect airway and prevent secondary brain injury (oxygenation, perfusion, temperature, glucose).
- Time targets: last known well (LKW), stroke center notification, seizure timing and recovery.

## High-yield conditions and red flags
- Ischemic stroke: sudden focal neuro deficit (face/arm weakness, speech trouble), gaze deviation, vision loss.
- Hemorrhagic stroke: “worst headache,” vomiting, rapid decline, severe HTN, neck stiffness, focal deficits.
- TIA: stroke-like symptoms that fully resolve ≤ 24 h—still high risk; treat as stroke alert if within window.
- Seizure: tonic–clonic, focal, absence, or unknown; status epilepticus = seizure(s) ≥ 5 min or recurrent without recovery.
- Hypoglycemia: altered, seizure-like, diaphoresis, tachycardia; glucose check when trained/equipped.
- Increased ICP/TBI: vomiting, worsening headache, bradycardia/HTN/irregular respirations (Cushing triad—late), unequal pupils.

## Assessment essentials
- Primary: airway patency, protective reflexes, breathing adequacy, circulation/perfusion; treat life threats as found.
- FAST/CPSS stroke screen; document LKW and exact time; note anticoagulant use (warfarin, DOACs) and glucose.
- GCS trend; focal exam: facial droop, arm drift, leg strength, speech, pupils, gaze, sensation.
- Consider mimics: hypoglycemia, post-ictal state, migraine, Bell palsy, sepsis, intoxication, hypoxia, hypoperfusion.

## Stroke care (prehospital priorities)
- Oxygen: titrate to SpO₂ ≥ 94% (avoid routine hyperoxia if not hypoxic).
- Check glucose early; correct hypoglycemia if indicated.
- Do not give aspirin for suspected stroke in the field unless explicitly directed by medical control.
- Position head midline; elevate head of bed 20–30° if tolerated and not hypotensive.
- Rapid transport to appropriate stroke center; pre-notify with LKW, deficits, glucose, and anticoagulants.
- Avoid hypotension and hyperventilation; keep patient warm; do not delay transport for prolonged on-scene testing.

## Seizure care
- Protect from injury; do not restrain limbs or place objects in mouth; loosen tight clothing.
- Time the seizure; after cessation, place in recovery position when safe; suction as needed.
- Airway/ventilation: assist with BVM if inadequate respirations or persistent post-ictal hypoventilation.
- Check glucose; treat hypoglycemia per protocol. Consider pregnancy, eclampsia (if late pregnancy/postpartum with seizures and hypertension).
- Status epilepticus is time-critical—rapid transport; ALS may administer benzodiazepines per protocol.

## Headache and neurologic red flags
- Thunderclap onset (seconds), “worst headache,” exertional onset, neck stiffness, fever with altered mental status, new neuro deficit, cancer/immunosuppression, anticoagulant use, head trauma.
- EMT-B actions: ABCs, oxygen to effect, glucose check, temperature if available, minimize stimulation; rapid transport for red flags.

## Special situations
- TBI/trauma: maintain SMR when indicated, prevent hypoxia/hypotension/hypothermia; manage life-threatening hemorrhage first.
- Sepsis-associated encephalopathy: fever or hypothermia, hypotension, altered mentation—treat shock, rapid transport.
- Pediatric seizures: febrile seizures common; focus on airway, cooling if febrile (avoid shivering), and glucose.

## Documentation and handoff
- Exact times (LKW, seizure start/stop), neuro findings, glucose, vitals, anticoagulants, pertinent negatives (no trauma, no fever, etc.).

## Cross-references
- Protocols: Stroke Alert; Seizure; Altered Mental Status; Trauma/TBI; Sepsis Screening.
- Tools: GCS; Stroke screening; Pediatric dosing.
- Medications (typical EMT-B scope): Oxygen; Oral Glucose; assist with patient meds per local policy.
`;
  }
  if (parseInt(chapterId || '0') === 19) {
    return `# Chapter 19: GI/GU Crisis Intervention

ProMedixEMS™ Study Guide — abdominal and genitourinary emergencies with EMT-B priorities. Verify local protocols.

## EMT-B focus
- Identify time-sensitive abdominal and GU red flags; prevent aspiration; treat shock; rapid transport when indicated.
- Do not give anything by mouth; manage pain supportively within scope; monitor for deterioration.

## Anatomy quick map
- Quadrants: RUQ (liver/GB), LUQ (spleen/stomach), RLQ (appendix), LLQ (sigmoid).
- Retroperitoneal: kidneys, ureters, pancreas (head), aorta.

## Red flags → high-risk causes
- GI bleed: hematemesis (bright red/coffee-ground), melena (black tarry stool), hematochezia (bright red per rectum) with syncope, tachycardia, hypotension.
- AAA: older age, male, smoking history; sudden tearing back/abdominal pain, hypotension, pulsatile mass (don’t press hard), syncope.
- Peritonitis: rebound/guarding, rigid abdomen, fever; consider appendicitis, perforation.
- Cholecystitis/biliary colic: RUQ pain after fatty meal, shoulder/right scapular radiation, Murphy sign, N/V.
- Pancreatitis: epigastric pain radiating to back, N/V, worse after meals or EtOH; may have tachycardia/fever.
- Bowel obstruction: crampy pain, vomiting, distension, no flatus; high-risk with prior surgeries/hernia.
- Renal colic (stones): severe flank to groin colicky pain, hematuria, restlessness.
- Pyelonephritis: fever, CVA tenderness, dysuria history, malaise.
- Testicular torsion: sudden unilateral scrotal pain, high-riding testis, N/V—time critical.
- Dialysis complications: access bleeding, hypotension, dyspnea (fluid overload), hyperkalemia risk (weakness, peaked T waves reported).

## Assessment essentials
- Primary: airway risk with vomiting; suction ready; consider anti-aspiration positioning.
- Focused history: OPQRST, last oral intake, stool/urine changes, fever, urinary symptoms, menses/LMP and pregnancy possibility in females of childbearing age.
- Exam: gentle palpation (start away from pain), CVA tenderness, look for hernias, inspect stool/emesis description if present.
- Vitals and perfusion; consider orthostatics when safe. Evaluate shock early.

## EMT-B actions
- Airway/aspiration: suction as needed; consider recovery position if vomiting and airway unprotected.
- Oxygen: titrate to SpO₂ ≥ 94% if hypoxic or in shock.
- NPO; position of comfort (knees bent for peritonitis often helps).
- Treat obvious shock: supine, keep warm, external hemorrhage control if applicable; rapid transport.
- Do not delay transport for prolonged on-scene evaluation in unstable patients.
- Protect dialysis access; avoid BP/IV in fistula arm; bring dialysis info if available.

## Special notes
- AAA suspicion: handle gently; minimize movement; rapid transport with early notification.
- Upper vs lower GI bleed clues: hematemesis/coffee-ground suggests upper; melena often upper; hematochezia often lower but can be brisk upper.
- Female lower abdominal pain: consider ectopic pregnancy until ruled out; rapid transport if unstable.
- Torsion is a surgical emergency—time sensitive; transport without delay.

## Documentation and handoff
- Onset/character of pain, associated symptoms (fever, vomiting, GI bleed signs), LMP/pregnancy possibility, dialysis schedule/access issues, vitals trends, shock signs, interventions and responses.

## Cross-references
- Protocols: Abdominal Pain/GI Bleed; Shock; Syncope; Renal Dialysis Patient; Patient Refusal/AMA (capacity with abdominal pain).
- Medications (typical EMT-B scope): Oxygen; Oral Glucose if hypoglycemic (not routine for abdominal pain); assist with patient meds per policy.
`;
  }
  if (parseInt(chapterId || '0') === 20) {
    return `# Chapter 20: Endocrine & Blood Emergencies

ProMedixEMS™ Study Guide — recognition-first approach for EMT-B. Verify local protocols.

## EMT-B focus
- Rapidly identify glucose emergencies; support airway/ventilation; prevent secondary injury; transport appropriately.
- Recognize hematologic crises (sickle cell, bleeding disorders) and endocrine decompensation (DKA/HHS, adrenal, thyroid).

## Diabetes and glucose emergencies
- Hypoglycemia: altered behavior, confusion, diaphoresis, tachycardia, seizure, focal deficit mimic; BG often < 70 mg/dL (device dependent). Most time-critical—treat immediately.
- Hyperglycemia: polyuria, polydipsia, polyphagia, blurred vision, fatigue; slower onset.
- DKA: type 1 common; abdominal pain, vomiting, Kussmaul respirations, fruity breath, dehydration; BG often > 250 mg/dL.
- HHS: type 2; profound dehydration, AMS, minimal/no Kussmaul; BG often > 600 mg/dL.
- EMT-B actions: check glucose when trained/equipped; if symptomatic hypoglycemia and patient can protect airway and follow commands—give oral glucose (typically 15–24 g buccal); reassess mental status and BG if possible. If unable to protect airway—do not give PO; support ABCs and transport.

## Adrenal and thyroid emergencies (recognition)
- Adrenal crisis (addisonian): fatigue, hypotension, vomiting, abdominal pain, possible fever—often in steroid‑dependent patients or recent withdrawal; treat shock supportively, avoid delays.
- Thyroid storm: fever, agitation, tachycardia, possible heart failure—support ABCs, cooling, transport.
- Myxedema coma: hypothermia, bradycardia, hypoventilation, AMS—gentle rewarming, airway/ventilation support.

## Hematologic conditions
- Sickle cell vaso-occlusive crisis: severe pain (chest, limbs, abdomen), fever/infection risk, priapism, acute chest syndrome (pleuritic pain, hypoxia). EMT-B: oxygen to effect, keep warm, gentle handling, transport; pain management per local protocols.
- Hemophilia/anticoagulated patients: prolonged bleeding, joint swelling; apply firm pressure; avoid unnecessary invasive procedures; bring factor/medication list.
- Symptomatic anemia: pallor, fatigue, dyspnea, syncope—supportive care and transport.

## Assessment essentials
- Primary: airway and ventilation; look for hypoventilation in hypo/hyperglycemic and myxedema cases.
- Vitals, temperature if available; glucose early in all unexplained altered mental status.
- Identify triggers: infection, missed insulin, dehydration, recent illness, medication changes.

## EMT-B actions summary
- Airway/oxygen: titrate to SpO₂ ≥ 94%; assist ventilations if inadequate.
- Hypoglycemia: oral glucose if awake and can swallow; do not give PO if risk of aspiration.
- Shock signs: treat per shock protocol; keep warm; rapid transport.
- Reassess mental status, ABCs, vitals frequently; prepare for deterioration.

## Documentation and handoff
- BG values and times; mental status changes; suspected triggers; interventions and responses; medication lists (insulin, anticoagulants), allergies.

## Cross-references
- Protocols: Diabetic Emergency; Altered Mental Status; Sepsis Screening; Sickle Cell Crisis; Shock.
- Medications (typical EMT-B scope): Oral Glucose; Oxygen; Naloxone for suspected opioid co-ingestion with respiratory depression per local policy.
`;
  }
  if (parseInt(chapterId || '0') === 1) {
      return chapter1Content;
    }
    
  if (parseInt(chapterId || '0') === 2) {
      return `# Chapter 2: Safety Protocols for Responders

## Introduction to Safety Protocols for Responders

Emergency Responders face more risks than other jobs. EMTs work in tough, fast-changing situations where they can get exposed to diseases, injuries, and violence. Studies show that 84% of first responders have seen traumatic events, and 34% have been diagnosed with mental health issues like depression or PTSD.

The suicide rate for EMTs and paramedics is much higher than for other adults. **EMTs must take care of their physical, mental, and emotional health to properly care for patients**. This is not just a personal responsibility—it's a professional requirement that directly impacts patient care quality.

## General Health, Wellness, and Resilience

Health is a mix of physical, mental, and emotional states. Ongoing stress in any area can make overall health worse and reduce an EMT's ability to provide effective care. Supporting good physical, mental, and emotional health can greatly lower the chance of health problems and improve job performance.

**Education must continue throughout an EMS career** not only to improve medical knowledge and skills, but also to develop better strategies for personal wellness and resilience in this demanding field.

## Understanding Stress: Eustress vs. Distress

Not all stress is bad. **Eustress** causes positive responses that can improve performance and job satisfaction. An example is the increased focus and heightened awareness that comes from successfully managing a tough emergency situation.

**Distress**, on the other hand, causes negative responses like feeling overwhelmed or anxious. This type of stress can impair judgment and reduce the quality of patient care. Stress can be short-term or long-term, and how someone reacts to stress changes based on their mood, health, and other stressors.

One source of stress can lead to another, creating a difficult cycle that becomes harder to break over time. Recognizing the difference between helpful stress and harmful stress is crucial for maintaining both personal health and professional effectiveness.

## Strategies for Wellness and Resilience

Wellness means actively working towards good health, not just avoiding illness. EMTs must work to keep their wellness, just like they maintain their medical skills through continuing education. **Resilience** is the ability to handle and recover from stress while maintaining high standards of patient care.

To increase resilience, EMTs should eat a healthy diet, get 7 to 9 hours of sleep daily, and build strong relationships with family, friends, and co-workers. Daily exercise and mindfulness practices also contribute significantly to stress management.

**Stress Management** involves developing effective ways to lessen or stop harmful stress reactions. The impact of stress depends as much on how a person reacts to it as on the stressful event itself. Learning healthy coping strategies is essential for career longevity in EMS.

## Nutrition for Emergency Medical Technicians

EMTs can't control many job stressors, so they must prepare their bodies to handle the physical and mental demands of the job. **Physical conditioning and proper nutrition** are key things EMTs can control and should prioritize.

Regular, well-balanced meals provide the sustained energy needed for the job's high physical and mental demands. EMTs should limit sugar, fats, sodium, and alcohol intake, as these can affect energy levels and decision-making ability during long shifts.

Complex carbohydrates like pasta and rice are good sources for long-term energy. Staying properly hydrated with water is essential because the body absorbs it fastest and maintains optimal physical performance. Frequent urination or light yellow urine shows good hydration status.

## Safe Lifting Practices

Lifting patients and equipment is a common and unavoidable task for EMTs. **Back injuries are frequent in EMS work** and can end careers prematurely. Proper lifting technique is not just about personal safety—it's about ensuring you can continue to serve patients throughout your career.

Key principles for safe lifting include pre-planning the move, bending your legs rather than your waist, keeping the weight as close to your body as possible, and lifting straight up using your leg muscles. **These techniques must become second nature** and should be practiced regularly.

## Disease Prevention and Standard Precautions

**Disease Prevention** focuses on medical interventions to avoid illness, such as vaccinations and health screenings. **Health Promotion** focuses on personal lifestyle choices to improve overall health, such as maintaining a proper diet and regular exercise routine.

EMTs regularly treat patients with **infectious diseases** (caused by harmful organisms) and **Communicable Diseases** (diseases that spread from person to person). Understanding disease transmission is critical for both EMT safety and preventing the spread of disease to other patients and family members.

The CDC's **standard precautions** approach means assuming every person might be infected with something contagious, so infection control procedures should always be used regardless of the patient's apparent condition. This approach protects both the EMT and subsequent patients.

**Proper hand washing remains the simplest and most effective way to prevent disease spread**. EMTs must wash their hands before and after every patient contact, even when gloves were worn. All sharp items like needles must be disposed of immediately in approved, puncture-resistant containers.

## Stress Management and Mental Health

EMS is inherently stressful work. **Critical Incident Stress Management (CISM)** programs provide structured support to help responders process traumatic events. These programs include both defusing sessions and formal debriefing sessions with mental health professionals.

**Burnout** is a state of physical and emotional exhaustion that results from long-term exposure to job stress. **Compassion Fatigue** is a gradual loss of compassion that results from caring for patients suffering from trauma.

EMTs have a **significantly higher risk of suicide** than the general population, largely due to cumulative job stress and the persistent stigma surrounding mental health issues in emergency services. **It is crucial for EMTs to recognize signs of stress and trauma in themselves and others** and to actively seek help from available resources.

## Professional Standards and Cultural Competency

EMS workplaces are becoming increasingly diverse, requiring EMTs to provide equitable care to all patients and work effectively with colleagues from different backgrounds. EMTs should strive for **cultural humility** by remaining curious about different cultures, thinking critically about their own biases, and adapting their behavior appropriately.

Professional conduct includes using appropriate language, avoiding offensive terms, and maintaining respectful workplace relationships. **Sexual harassment** is unwelcome sexual conduct that affects work performance or creates an offensive work environment, and **the perception of the recipient matters more than the intent** of the person engaging in the behavior.

## Key Principles for Workforce Safety

**EMTs must take care of their physical, mental, and emotional health to properly care for patients**. This responsibility directly impacts both personal well-being and professional effectiveness. **Physical conditioning and proper nutrition** are fundamental aspects that EMTs can control, even when external job stressors cannot be managed.

Understanding the difference between helpful **eustress** and harmful **distress** is essential for maintaining both personal health and professional effectiveness throughout an EMS career.`;
    }

  if (parseInt(chapterId || '0') === 3) {
      return `# Chapter 3: Legal Frameworks in Emergency Care

## Introduction to Legal Frameworks in Emergency Care

Emergency medical care involves important medical, legal, and ethical principles that form the foundation of professional EMS practice. EMTs must understand these principles thoroughly to avoid legal problems and provide appropriate patient care in complex situations. This comprehensive understanding protects both patients and providers while ensuring the highest standards of emergency medical service delivery.

The legal framework governing emergency medical care encompasses multiple areas including consent procedures, patient privacy protection, professional duties, and ethical responsibilities. These principles guide decision-making in challenging situations and provide clear boundaries for professional conduct in the field.

## Consent: The Foundation of Medical Treatment

Consent represents the fundamental principle that you usually need permission from a conscious, competent adult before starting any medical care or treatment. This permission, known as **consent**, establishes the legal and ethical basis for all medical interventions in emergency situations.

If a patient refuses care after being properly informed of their condition and treatment options, you cannot treat them against their will. Treating someone without proper consent can lead to serious legal consequences, including charges of battery or assault. Understanding the nuances of consent is essential for every EMT to navigate complex patient encounters effectively.

The principle of consent respects patient autonomy and ensures that individuals maintain control over their medical care, even in emergency situations. This fundamental right must be balanced with the EMT's duty to provide life-saving care when appropriate.

## Decision-Making Capacity and Patient Autonomy

**Decision-making capacity** refers to a patient's ability to understand relevant information and make informed choices about their medical care. This capacity involves the patient's ability to comprehend their medical condition, understand proposed treatments, appreciate consequences of decisions, and communicate their choice clearly.

Patients have the fundamental right to make autonomous decisions about their health care, even if these choices seem medically unsound to healthcare providers. This principle of patient autonomy is central to modern medical ethics and must be respected by all EMS providers.

Various factors can affect a patient's decision-making capacity, including altered mental status, age-related considerations, severe pain, traumatic injuries, and medication effects. Additionally, sensory impairments such as hearing or vision problems, as well as language barriers, can significantly impact a patient's ability to make informed decisions about their care.

EMTs must carefully assess these factors when determining whether a patient has the capacity to make informed decisions about their medical treatment.

## Types of Consent in Emergency Medical Care

Understanding different types of consent is crucial for appropriate patient care delivery. **Expressed consent** occurs when a patient clearly communicates, either verbally or through actions, that they want to receive medical care. This communication can be verbal, such as saying "yes, please help me," or non-verbal, such as nodding in agreement or extending an arm for examination.

For consent to be legally valid, it must be **informed consent**, meaning the EMT has explained the patient's condition, proposed treatment options, potential risks and benefits, and available alternatives. This information must be provided in terms the patient can understand.

**Implied consent** is a legal concept that assumes consent when a person is unconscious or otherwise unable to make decisions during a serious medical emergency. This principle applies only when there is an immediate threat to life or limb, and is also known as the **emergency doctrine**. Once the patient regains consciousness and decision-making capacity, implied consent no longer applies and expressed consent must be obtained.

**Involuntary consent** applies to specific situations involving individuals who cannot legally give informed consent. This includes mentally incompetent adults, for whom consent should be obtained from a legal guardian or appointed decision-maker. Law enforcement officers may sometimes provide consent for individuals under arrest or in police custody, depending on local laws and circumstances.

## Consent Considerations for Pediatric Patients

For minor patients, a parent or legal guardian typically must provide consent for medical treatment. However, in emergency situations where a parent or guardian is not immediately available, healthcare providers can still provide necessary life-saving care to children under the principle of implied consent.

**Emancipated minors** represent a special category who can legally consent for themselves without parental involvement. Examples include minors who are married, serving in the armed forces, are parents themselves, or are living independently and financially self-supporting without parental support.

In school settings, school officials can act **in loco parentis** (in place of a parent) to provide consent for emergency medical care when parents are not immediately available. This legal principle allows school administrators to make medical decisions in the best interest of the child during emergencies.

**The fundamental principle is to never delay life-saving care for a minor simply because consent is unavailable from a parent or guardian**. The child's immediate medical needs take precedence over consent procedures in true emergencies.

## Forcible Restraint and Patient Safety

Forcible restraint may become necessary when dealing with combative patients who pose a danger to themselves, other patients, or medical personnel. Such behavior can result from various conditions including mental health disorders, substance intoxication, head injuries, hypoxia, or other medical emergencies that affect judgment and behavior.

Before implementing physical restraints, EMTs should typically obtain approval from medical control or coordinate with law enforcement personnel. The preferred approach is always to attempt verbal de-escalation techniques to calm the patient and gain cooperation before resorting to physical restraints.

When restraints are necessary, careful monitoring of the patient's airway, breathing, and circulation is essential to prevent serious complications or death. Restraints must be applied properly to avoid restricting breathing or blood flow. In some situations, chemical restraint administered by advanced life support personnel may be safer and more effective than physical restraints.

## The Right to Refuse Medical Treatment

Conscious, competent adults possess the fundamental right to refuse or discontinue medical treatment at any time, even if such refusal might result in serious injury or death. This right reflects the principle of patient autonomy and must be respected by all healthcare providers.

When a patient refuses treatment, EMTs must ensure the refusal is informed by clearly explaining the patient's medical condition, recommended treatments, potential risks of the proposed care, and likely consequences of refusing treatment. This information must be provided in terms the patient can understand.

Thorough documentation of treatment refusal is essential and should include all efforts made to obtain consent, the patient's stated reasons for refusal, and witness information. The patient should be asked to sign a formal refusal form, witnessed by a family member, police officer, or other appropriate individual.

When a parent or guardian refuses care for a child, EMTs should employ calm persuasion techniques and involve medical control or law enforcement if necessary to protect the child's welfare and ensure appropriate care is provided.

## Confidentiality and HIPAA Requirements

Patient information is strictly **confidential** and cannot be shared with unauthorized individuals without explicit patient permission or a valid court order. This confidentiality extends to all aspects of patient care, including medical history, physical examination findings, treatments provided, and personal information obtained during the encounter.

The **Health Insurance Portability and Accountability Act (HIPAA)** establishes comprehensive federal protections for patient privacy and health information security. All patient information obtained during EMS encounters constitutes **protected health information** under HIPAA regulations.

EMTs have a professional and legal obligation to guard all protected health information from unlawful disclosure, whether in written documentation, verbal communications, or electronic formats. Information sharing is permitted only for legitimate purposes including treatment provision, payment processing, and healthcare operations.

Understanding and complying with HIPAA requirements is essential for maintaining patient trust, professional integrity, and legal protection for both EMTs and their employing agencies.

## Social Media and Professional Digital Conduct

Sharing any private patient information on social media platforms represents a serious violation of HIPAA regulations and professional ethical standards. Such violations can result in significant legal penalties, professional discipline, and employment termination.

While members of the public may legally record emergency incidents occurring in public places, EMTs are prohibited from taking photographs or videos of patients during the course of their duties. This prohibition protects patient privacy and maintains professional standards.

EMTs must exercise caution when sharing personal opinions about work-related matters on social media platforms. It is particularly important not to associate yourself with your employing agency through uniforms, logos, or other identifying information when expressing personal views that might reflect poorly on the organization.

Professional conduct standards apply to online interactions just as they do to on-duty behavior, and EMTs should maintain the same level of professionalism in digital communications as they would in face-to-face interactions.

## Advanced Directives and End-of-Life Decisions

**Advanced directives** are legally binding written documents that specify a patient's wishes for medical treatment in situations where they cannot communicate their preferences or make decisions. These documents provide crucial guidance for healthcare providers when treating patients who lack decision-making capacity.

A **Do Not Resuscitate (DNR) order** provides specific authorization to withhold resuscitation efforts in the event of cardiac or respiratory arrest. Valid DNR orders must contain clear statements of the patient's medical condition and include proper signatures from the patient or legal guardian and a licensed physician.

Some advanced directives, such as **Physician Orders for Life-Sustaining Treatment (POLST)** forms, provide detailed descriptions of acceptable medical interventions and treatment limitations. These documents offer more comprehensive guidance than basic DNR orders and should be carefully reviewed when present.

Even when a valid DNR order exists, EMTs must continue to provide appropriate supportive measures including oxygen administration, pain management, comfort measures, and other treatments that do not involve resuscitation efforts for patients not in cardiac arrest.

## Recognizing Death and Medical Examiner Cases

Only licensed physicians have the legal authority to determine the official cause of death. In the absence of clear, definitive signs of death and without a valid DNR order, EMTs must initiate appropriate emergency medical care and resuscitation efforts.

**Definitive signs of death** that are clear and obvious include **obvious mortal damage** such as decapitation or massive traumatic injuries incompatible with life. **Dependent lividity** occurs when blood settles in the lower portions of the body, causing characteristic discoloration patterns. **Rigor mortis** refers to the stiffening of muscles that typically occurs 2-12 hours after death.

**Algor mortis** describes the cooling of the body temperature following death, while **putrefaction** involves the decomposition of body tissues, typically occurring 40-96 hours after death. These signs provide clear evidence that death has occurred and resuscitation efforts would be inappropriate.

When trauma or unusual circumstances are involved in a death, the medical examiner or coroner must be notified according to local protocols. EMTs should disturb potential crime scenes as minimally as possible while ensuring scene safety and providing necessary medical care.

## Special Considerations: Organ Donation and Medical Identification

Potential organ donors should be treated with the same urgency and comprehensive care as any other patient requiring emergency medical treatment. EMTs should use all available means to maintain the patient's viability, with particular emphasis on providing adequate oxygenation to preserve organ function for potential transplantation.

Many patients carry **medical identification** in the form of bracelets, necklaces, wallet cards, or smartphone applications that contain crucial health information. These medical identifiers often include important details about chronic medical conditions, current medications, known allergies, and emergency contact information.

EMTs should routinely check for and carefully review any medical identification found on patients, as this information can significantly impact treatment decisions and patient safety. Medical identification can provide vital patient history when the patient is unable to communicate effectively.

## Scope of Practice and Standards of Care

An EMT's **scope of practice** defines the specific medical care and procedures that they are legally authorized to provide, as established by state laws, regulations, and medical director protocols. This scope varies by state and certification level, and EMTs must remain within these defined boundaries at all times.

The **standard of care** represents the level of care that a reasonably prudent EMT with similar training and experience would provide under similar circumstances. This standard is established through professional consensus, legal precedent, and accepted medical practices.

EMTs must thoroughly understand and consistently follow both their scope of practice and accepted standards of care. Performing procedures outside the authorized scope of practice can be considered professional negligence or even criminal misconduct, potentially resulting in legal liability and professional sanctions.

## Legal Standards and Certification Requirements

Legal standards for emergency medical care derive from multiple sources including local customs and practices, state and federal laws, professional organization guidelines, and established medical literature. While textbooks and educational materials contribute to defining standards of care, local protocols and medical director orders take precedence when conflicts arise.

Maintaining current **certification or licensure** is a fundamental legal requirement for all practicing EMTs. This includes completing required continuing education, maintaining clinical competencies, and adhering to recertification schedules established by certifying bodies.

Deviating from established standards, such as failing to follow current CPR guidelines or medication administration protocols, can lead to serious legal consequences including professional sanctions, civil liability, and potential criminal charges in cases of gross negligence.

## Understanding Duty to Act

**Duty to act** represents an EMT's legal and professional responsibility to provide appropriate patient care when called upon to do so. This duty typically arises from employment obligations, service contracts, or voluntary assumption of care responsibility.

Once an EMT responds to an emergency call or begins treating a patient, they have established a legal duty to continue providing competent care until the patient can be transferred to a healthcare facility or another qualified medical professional assumes responsibility.

When choosing to provide assistance while off-duty, an EMT must continue providing competent care according to their training and certification level until someone with equal or higher medical authority can assume patient care responsibilities.

## Negligence in Emergency Medical Care

**Negligence** occurs when an EMT fails to provide the same level of care that a similarly trained professional would provide under comparable circumstances, resulting in patient injury or harm. Understanding the elements of negligence is crucial for risk management and professional practice.

Four essential elements must be present to establish negligence. First, **duty** must be established, meaning the EMT had a legal obligation to provide care. Second, **breach of duty** occurs when the EMT fails to act within accepted standards of care. Third, **damages** must be demonstrated, showing that the patient suffered physical, psychological, or financial harm. Finally, **causation** must be proven, establishing that the EMT's breach of duty directly caused the patient's harm.

Examples of potential negligence include dropping a patient during transport causing injury, administering medications outside one's scope of practice, or failing to properly assess and treat obvious life-threatening conditions. Prevention focuses on maintaining competency, following protocols, and providing care within authorized scope of practice.

## Abandonment of Patient Care

**Abandonment** occurs when an EMT discontinues patient care without the patient's consent and without ensuring that another qualified medical professional assumes responsibility for continued care. This represents a serious breach of professional duty and can result in significant legal consequences.

Once patient care has been initiated, EMTs must continue providing appropriate treatment until the patient can be properly transferred to hospital personnel or another qualified healthcare provider assumes responsibility. The transfer must include a comprehensive report of the patient's condition, treatments provided, and current status.

Leaving patients in the care of untrained individuals or failing to provide adequate report to receiving hospital staff can constitute abandonment. EMTs must ensure proper continuity of care throughout the entire patient encounter.

## Assault, Battery, and Related Legal Concepts

**Assault** involves threatening or attempting to cause harmful or offensive contact with another person, creating reasonable apprehension of imminent harm. In EMS contexts, this might include verbal threats or aggressive gestures toward patients or family members.

**Battery** consists of unlawful, intentional touching or medical treatment provided without proper consent. Even well-intentioned medical care, such as applying a splint or administering medication, can constitute battery if performed without appropriate consent from the patient or authorized decision-maker.

**False imprisonment** involves unlawfully restraining someone's freedom of movement, which could occur during patient transport against their will. **Kidnapping** represents a more serious offense involving taking someone away by force, though false imprisonment charges are more likely in typical EMS scenarios.

**Defamation** involves communicating false statements that harm someone's reputation. **Libel** refers to written defamatory statements, such as inaccurate information in medical reports, while **slander** involves spoken defamatory statements made in casual conversations or other verbal communications.

## Good Samaritan Laws and Legal Protection

**Good Samaritan laws** provide legal protection for individuals who assist others in emergency situations while acting in good faith and without expectation of payment or reward. These laws are designed to encourage bystander assistance by reducing fear of legal liability.

Good Samaritan protections typically apply when EMTs are functioning in an **off-duty** capacity, providing voluntary assistance outside their normal job responsibilities. However, these laws generally do not protect against **gross negligence**, which involves willful or reckless disregard for patient safety and accepted standards of care.

Some jurisdictions provide **immunity** protections for official EMS providers, particularly those working for governmental agencies. However, this immunity is not absolute and does not protect against gross negligence, willful misconduct, or actions taken outside the authorized scope of practice.

## Documentation, Reporting, and Mandatory Obligations

Maintaining complete, accurate, and timely documentation of all patient encounters is essential for legal protection, quality assurance, and continuity of care. Proper documentation serves as legal evidence of care provided and can be crucial in defending against allegations of negligence or malpractice.

The legal principle "if it wasn't documented, it wasn't done" emphasizes the critical importance of thorough record-keeping. All assessments, treatments, patient responses, and significant events must be accurately recorded in appropriate medical documentation.

EMTs have **mandatory reporting obligations** for certain types of cases as specified by state and local laws. These typically include suspected **child abuse** or abuse of elderly or vulnerable adults, injuries resulting from **felony crimes** such as gunshot or stab wounds, **drug-related injuries** in specified circumstances, and **births occurring outside licensed medical facilities**.

Additional reporting requirements may include pediatric burn injuries, suicide attempts, animal bites, communicable disease exposures, assault cases, and incidents involving domestic or sexual violence. EMTs must become familiar with their specific state and local reporting requirements and follow established procedures for fulfilling these legal obligations.

Understanding these legal frameworks ensures that EMTs can provide excellent patient care while protecting themselves and their patients from legal complications and maintaining the highest standards of professional practice.`;
    }

  if (parseInt(chapterId || '0') === 4) {
      return `# Chapter 4: Documentation & Field Reporting

## Introduction to Documentation & Field Reporting

**Communication** represents the fundamental process of transmitting information from one person to another through various methods including written documentation, verbal exchanges, and non-verbal body language. In the demanding environment of pre-hospital emergency care, effective communication serves as the cornerstone for establishing positive therapeutic relationships with both patients and healthcare colleagues.

**Verbal communication skills** are essential tools that enable EMTs to systematically gather critical information from patients, family members, and bystanders at emergency scenes. These same communication abilities facilitate crucial coordination efforts with other emergency response personnel including fire department personnel, law enforcement officers, and hospital staff members.

Effective verbal communication becomes particularly vital during the patient care handover process when transferring responsibility to hospital emergency department staff. **Documentation** encompasses the comprehensive written or electronic record of all patient care activities, which ultimately becomes an integral component of the patient's permanent medical history and serves multiple important functions in the healthcare system.

Proper documentation demonstrates that appropriate medical care was provided according to established standards and protocols. Additionally, these records support ongoing medical research initiatives and help justify funding allocations for emergency medical services programs throughout the healthcare system.

## The Essential Role of Communication in EMS Operations

Modern emergency medical services rely heavily on sophisticated communication systems including computer networks, radio frequencies, and telephone systems to maintain constant connectivity between EMS teams, fire department operations, and law enforcement agencies. This interconnected communication network significantly enhances overall team coordination and effectiveness while maintaining optimal safety standards for all emergency response personnel.

EMTs must develop comprehensive knowledge of their communication system's operational capabilities and demonstrate proficiency in utilizing these tools effectively during emergency responses. Understanding system limitations, backup procedures, and alternative communication methods ensures continuity of operations even when primary communication channels experience technical difficulties.

## Therapeutic Communication: Building Strong Patient Relationships

**Therapeutic communication** encompasses a comprehensive range of verbal and non-verbal communication techniques specifically designed to encourage patients to openly express their feelings, concerns, and medical symptoms. This specialized communication approach helps establish positive, trusting relationships between healthcare providers and patients during stressful emergency situations.

Effective therapeutic communication techniques can significantly improve patient cooperation, reduce anxiety levels, and facilitate more accurate information gathering during patient assessment procedures. Understanding both beneficial communication practices and potential communication barriers helps EMTs optimize their patient interactions and improve overall care quality.

## Critical Factors Influencing Communication Effectiveness

Human communication involves multiple complex elements including eye contact patterns, body positioning, facial expressions, and vocal tone variations. Cultural background, age-related factors, and individual life experiences significantly influence how people interpret and respond to communication attempts from healthcare providers.

Patients with special communication needs may require modified approaches to ensure effective information exchange. For example, deaf patients who are unfamiliar with sign language may need to communicate through written notes or alternative methods. Personal life experiences shape individual perspectives and responses to medical emergencies.

An elderly patient with extensive experience managing chronic pain may perceive current discomfort as relatively minor, while a young child with limited pain experience might display intense emotional reactions to similar discomfort levels. Different cultural backgrounds teach varying approaches to handling illness, injury, and pain management, with some cultures encouraging emotional expression while others promote stoic responses.

These diverse social and personal influences create significant variations in communication styles and must be carefully considered when developing patient interaction strategies.

## Understanding Non-Verbal Communication Cues

Patients communicate their feelings and concerns through multiple channels including spoken words, physical gestures, written notes, and various non-verbal indicators. The manner in which someone speaks—including their tone of voice, speaking speed, and volume levels—provides valuable insight into their emotional state and current level of distress.

These communication cues also reveal the relative importance and urgency that patients place on their messages. For instance, a patient who is yelling may be experiencing anger, fear, or both emotions simultaneously. EMTs must develop skills to notice not only the actual words being spoken but also the manner in which they are delivered.

## Cultural Sensitivity in Professional Communication

Cultural background significantly influences body language patterns and eye contact preferences during interpersonal interactions. In some cultures, direct eye contact is considered disrespectful or confrontational, while in other cultures, looking away during conversation is perceived as rude or dishonest behavior.

For example, in United States culture, direct eye contact typically demonstrates honesty and sincerity, but in many Latin American, Asian, and African cultures, sustained eye contact can seem confrontational or aggressive. People interpret messages based on their own cultural worldview and personal experiences.

**Ethnocentrism** represents the tendency to judge other cultural practices using one's own cultural values as the standard for comparison. A North American EMT might incorrectly assume that a patient who avoids eye contact is hiding something important, but this assumption would only be valid if both individuals shared the same North American cultural background.

All aspects of communication, including eye contact patterns, personal space preferences, body language interpretation, and appropriate touching, are heavily influenced by cultural norms and expectations. In Thailand, for example, touching someone's head is considered extremely personal and inappropriate, so EMTs should always request permission before touching a patient's head during medical examination.

Even during emergency situations, EMTs should demonstrate respect for different cultural practices and beliefs. **Cultural imposition** occurs when healthcare providers inappropriately force their own cultural values on patients because they believe their cultural approach is superior to other methods.

An example of cultural imposition would be a physician angrily criticizing parents who used a traditional Asian healing practice called "coining" on their child, without understanding the cultural significance and intent behind this traditional healing method.

## Managing Hostile and Aggressive Patients

Patients may occasionally become hostile or aggressive toward emergency medical service providers due to various factors including pain, fear, confusion, or underlying medical conditions. EMTs must remain aware of their own body language and communication patterns when dealing with potentially hostile patients to avoid escalating tense situations.

People often respond to anger with reciprocal anger, so EMTs must maintain calm, professional demeanor throughout difficult patient encounters. Effective strategies for managing hostile patients include ensuring scene safety by calling law enforcement when necessary, maintaining adequate backup personnel for safety, and avoiding aggressive body language such as crossing arms or clenching fists.

Instead, EMTs should stand with palms facing outward to demonstrate openness and readiness to move if necessary. Making appropriate eye contact without staring, speaking calmly and confidently at a slower pace, and offering limited choices to patients can help de-escalate potentially volatile situations.

EMTs should never threaten patients verbally or physically, as personal safety remains the highest priority when caring for hostile patients. Paying attention to both your own and the patient's facial expressions, body language, and eye contact patterns helps everyone understand the intended message more clearly.

## Physical Factors Affecting Communication Quality

Various physical factors can significantly impact communication effectiveness, collectively referred to as communication "noise." Noise represents anything that interferes with clear message transmission and reception between healthcare providers and patients during emergency situations.

Loud environmental sounds can make it difficult to understand or be understood during patient care activities. Additionally, lighting conditions, physical distance, or intervening physical objects can also affect communication quality and accuracy.

Cultural norms often determine appropriate personal space requirements during conversations and medical interactions. As healthcare providers move closer to patients, higher levels of trust and rapport become necessary for effective communication. When EMTs enter a patient's very personal space during medical procedures, an extremely high level of trust must be established.

## Essential Verbal Communication Skills for EMS

Emergency medical technicians must master numerous communication skills including radio operations, report writing, and various interpersonal communication techniques. Effective verbal communication with patients, family members, bystanders, and other healthcare workers represents an essential component of high-quality patient care delivery.

EMTs must develop excellent listening skills to understand complex emergency scenes and accurately identify patient problems and needs. Additionally, they must organize their thoughts effectively to provide clear, accurate instructions quickly during time-sensitive emergency situations.

Asking appropriate questions represents a fundamental skill that all EMTs must develop and practice regularly throughout their careers.

## Types of Questions: Open-Ended vs. Closed-Ended Approaches

EMTs utilize two distinct types of questions during patient interactions. **Open-ended questions** require patients to provide detailed, comprehensive answers that allow for extensive information gathering. An example would be asking "What seems to be bothering you today?" This type of question allows free-flowing conversation and permits patients to guide the discussion toward their primary concerns.

**Closed-ended questions** can be answered with brief responses or single words, making them particularly useful when patients cannot provide lengthy answers due to severe breathing difficulties or when dealing with frightened children. Questions that invite "yes" or "no" responses are especially effective for rapidly assessing specific patient conditions.

Examples include asking "Are you having trouble breathing?" or "Do you take medications for your heart condition?" While closed-ended questions provide limited information, they serve as valuable starting points for more detailed patient assessment procedures.

## Effective Patient Interviewing Techniques

Before beginning patient interviews, EMTs should designate who will lead the questioning process to avoid asking duplicate questions and creating confusion. Healthcare providers must remain aware of the number and complexity of questions being asked during patient encounters.

The recommended approach involves asking one question at a time, waiting for a complete answer, and then proceeding to the next question in a logical sequence. EMTs can use appropriate touch to demonstrate care and compassion, but physical contact should be used carefully and sparingly during patient interactions.

When using therapeutic touch, approach slowly and touch the patient's shoulder or arm respectfully. Holding a patient's hand can demonstrate caring while maintaining slight physical distance. EMTs should avoid touching a patient's torso, chest, or face for communication purposes, as these areas are considered highly personal.

Family members, friends, and bystanders can provide valuable assistance during patient interviews, but sometimes family members may attempt to speak for patients when direct patient responses are needed. EMTs should assess whether additional people are helping or interfering with the interview process.

Don't hesitate to politely ask others to step away temporarily if necessary. If family members become disruptive, consider giving them specific tasks such as gathering medications or collecting personal items. However, consider how separation might affect the patient emotionally, as removing loved ones may increase patient anxiety levels significantly.

## Ten Golden Rules for Therapeutic Rapport

**1. Make and maintain appropriate eye contact:** Provide patients with your full attention to demonstrate that they are your priority and help build trust and confidence in your professional abilities.

**2. Provide your name and use the patient's proper name:** Always introduce yourself and your partner clearly, then ask patients what they prefer to be called. Use courtesy titles such as "Mr. Peters" unless dealing with children or unless patients specifically request first-name use.

**3. Always tell patients the truth:** Dishonesty destroys trust rapidly and permanently. While you don't need to share every detail, always answer direct questions honestly and professionally. For example, if asked about a potential heart attack, respond with "I don't know for certain, but we will definitely get more information at the hospital."

**4. Use language that patients can understand:** Avoid talking down to patients or using complex medical terminology that may confuse or intimidate them. Ask about "heart problems" instead of "myocardial infarction" to ensure patient understanding.

**5. Be careful about what you say regarding patients to others:** Understand your relationship with bystanders and ask patients for permission before discussing their condition with others. If private conversation is necessary, step away from the patient's hearing range. Never discuss patients in front of them as if they weren't present.

**6. Remain aware of your body language:** Non-verbal communication carries tremendous importance in patient interactions. Avoid appearing frustrated, threatening, or impatient. Position yourself at the patient's eye level or lower when possible, and always maintain calm, professional appearance and behavior.

**7. Speak slowly, clearly, and distinctly:** Pay careful attention to your tone of voice and speaking pace to ensure optimal patient comprehension and comfort.

**8. Face patients who are hard of hearing:** This positioning allows them to read your lips effectively. Try adjusting your voice pitch higher or lower, as certain frequencies may be heard more clearly. Never shout, as this won't improve hearing and may frighten patients unnecessarily. Never assume that older patients cannot hear or understand clearly, and avoid using "baby talk." If communication remains difficult, have your partner attempt communication or use a stethoscope to amplify your voice.

**9. Allow adequate time for patient responses:** Avoid rushing patients unless immediate danger exists. Sick or injured individuals often need additional time to process questions and formulate appropriate responses.

**10. Act and speak calmly and confidently:** Pay attention to patient comfort needs. Ask if they prefer sitting or lying down, inquire about temperature comfort, and determine if they want family members or friends nearby for emotional support.

## Emotional Intelligence in Emergency Medical Services

**Emotional intelligence** represents the ability to understand and control your own emotions while responding appropriately to others' emotional needs and states. This skill helps EMTs resolve conflicts effectively, build trust with patients and colleagues, improve communication quality, and handle challenging situations with greater success.

Emotional intelligence encompasses five main components: **Self-awareness** involves understanding your own emotions and recognizing how they affect your thoughts and actions. **Self-regulation** includes controlling impulsive emotions and behaviors while managing emotions in positive, productive ways.

**Motivation** represents the ability to motivate yourself and others toward long-term success and goal achievement. **Empathy** involves understanding others' concerns, feelings, and needs by carefully observing their verbal and non-verbal cues. **Social skills** encompass building and maintaining positive relationships through effective communication and interpersonal interaction.

Individuals with high emotional intelligence demonstrate kindness, caring attitudes, and excellent listening skills in their professional interactions. EMTs should continuously work to improve their own emotional intelligence through self-reflection and practice.

Examine how you react to stressful situations—do you become easily upset or frustrated? Practice maintaining calm responses under pressure. Develop mindfulness by focusing on present moments without judging yourself or others harshly. Take responsibility for your actions rather than immediately blaming others, and consider how your behavior affects those around you.

The **Behavioral Change Stairway Model** represents a five-step communication method for managing difficult situations, originally developed by the FBI for hostage negotiation scenarios. The steps include: **1. Employ active listening** by listening carefully and demonstrating that you are actively engaged without interrupting or arguing. **2. Display empathy** by understanding the patient's viewpoint even if you disagree with their actions or decisions. **3. Build rapport** by establishing connection once you have listened and demonstrated understanding. **4. Exert influence** by identifying realistic approaches to move situations forward positively while considering both patient needs and your professional obligations. **5. Initiate behavior change** by suggesting solutions that make sense to patients while remaining acceptable to you as a healthcare provider.

## Communicating with Special Patient Populations

**Older patients** represent a growing demographic in emergency medical services. Focus on patients' **functional age** (their ability to perform daily activities) rather than chronological age when determining communication approaches. Demonstrate competence, confidence, and genuine caring in all interactions.

Listen carefully and act on information you gather rather than focusing solely on obvious presenting problems. Never assume that older patients are confused or senile—if confusion exists, it may result from medical conditions such as hypoxia or infection rather than age-related cognitive decline.

Exercise patience and compassion consistently. Approach slowly and calmly, allowing adequate time for responses. Watch for signs of confusion or hearing and vision impairments that may affect communication. Some older patients with chronic diseases may not experience typical pain responses, so observe carefully for subtle physical changes.

Help patients pack essential personal items such as hearing aids or eyeglasses, and document these items carefully. Share any concerns about patients' home situations or pets with receiving hospital staff for appropriate follow-up care.

**Children** often experience significant fear during emergency situations. Familiar objects such as favorite toys or family members can help reduce anxiety and fear responses. Allow parents to hold children during evaluation when possible, but ensure that parents don't upset children or prevent them from sharing important information.

Always maintain honesty with children, as they can easily detect dishonesty and deception. Explain what is happening and why procedures are necessary, including honestly informing them if treatments may cause discomfort. Respect children's privacy by exposing wounds away from strangers' view when possible and having parents present during examinations.

Speak professionally yet in a friendly manner, using age-appropriate tone and vocabulary. Maintain eye contact and position yourself at children's eye level when communicating.

**Patients who are deaf or hard of hearing** typically possess normal intelligence levels. Most can read lips effectively, so face them directly and speak clearly at normal pace without exaggerating mouth movements. Exercise care not to lose or damage hearing aids during patient care activities.

Five essential steps for communication include: **1.** Have paper and pen available for written questions and answers. **2.** If patients read lips, use clear masks when you need to remove yours, face them directly, and speak clearly without mumbling. Provide adequate lighting on your face if working in dark conditions. **3.** Never shout, as this won't improve communication and may frighten patients unnecessarily. **4.** Listen carefully, ask short questions, and provide brief answers. Some patients may not speak clearly due to hearing impairment. **5.** Learn basic sign language phrases such as "sick," "hurt," and "help" to facilitate emergency communication.

**Visually impaired patients** should be expected to have normal intelligence. Explain everything you are doing in detailed terms throughout patient care procedures. Maintain physical contact by placing a hand lightly on their shoulder or arm, and avoid sudden movements that may startle them.

If patients can walk, guide them by placing their hand on your arm rather than grabbing their arm. Always transport eyeglasses and mobility aids with patients to receiving facilities. If patients have guide dogs (identified by special harnesses), and the patient's condition is stable, bring the dog to the hospital with them. Otherwise, arrange for appropriate pet care according to your department's established policies.

**Non-English speaking patients** still require thorough medical history gathering. Determine how much English patients understand before proceeding with assessment. Use short, simple questions and basic vocabulary while avoiding complex medical terminology.

Point to relevant body parts while asking questions to aid comprehension. Speaking louder does not improve understanding for language barriers. Learn common medical words in local languages—pocket reference cards are often available for this purpose.

Utilize smartphone translation applications or locate qualified interpreters when available. Family members or friends can provide translation assistance during emergencies until professional interpreters arrive at receiving facilities. Request professional translators at hospitals when patients' primary languages are known.

## Mission-Critical Communications and Shared Mental Models

**Mission-critical communications** represent those communications where failure would result in task failure or compromised patient care. A fundamental concept is the **shared mental model**, which occurs when all team members possess identical understanding of current situations and required actions.

The primary goal involves transferring this shared understanding without errors or misinterpretation. When healthcare providers maintain different situational understandings, patient care quality suffers significantly. To establish effective shared mental models, four essential questions must be answered clearly:

**1.** What is the patient's primary problem or chief complaint? **2.** What medical care has the patient received prior to this encounter? **3.** What is the patient's current condition and immediate medical needs? **4.** What interventions or treatments need to occur next?

Answering these questions rapidly and accurately helps prevent medical errors and ensures that new healthcare providers can continue patient care seamlessly without interruption or confusion.

## Patient Care Handover (Handoff) Procedures

Patient care typically involves multiple healthcare providers throughout the continuum of care, making effective communication absolutely crucial for positive patient outcomes. **Patient care handover** or handoff represents the process where patient information and care responsibility are transferred from one healthcare provider to another.

This process often involves physically moving patients and medical equipment between locations and care teams. Handoff represents a particularly **dangerous point** in patient care delivery, as communication failures frequently lead to continuity problems and potential patient harm.

Communication failures during handoff procedures represent a major contributing factor in medical malpractice claims and adverse patient outcomes. A structured **five-point method** can be utilized for both giving and receiving handover reports effectively:

**Giving comprehensive handover reports:** Initiate eye contact with receiving personnel to clearly signal that formal communication is beginning. Manage the environmental factors by reducing background noise and eliminating distractions such as turning down radio volumes.

Avoid moving patients during report delivery so everyone can focus completely on information transfer. Ensure that critical care needs are immediately addressed by receiving clinicians before continuing with detailed reports.

Provide **structured reports** using standardized formats, as this approach significantly improves efficiency while reducing communication errors. **SBAR** (Situation, Background, Assessment, Recommendation) represents a widely utilized reporting format in healthcare settings.

**S** (Situation): Provide concise statement of the primary problem, such as "trauma alert, hypotensive 28-year-old female." **B** (Background): Share brief relevant information, such as "struck by motor vehicle approximately 20 minutes ago." **A** (Assessment): Present your clinical findings, such as "conscious and alert, blood pressure 88/40, pulse 124, visible injuries to pelvis and left leg." **R** (Recommendation): Describe care provided and patient response, such as "applied high-flow oxygen, stabilized pelvis and leg injuries, distal pulse, motor, and sensation remain intact."

Provide appropriate documentation where verbal reports cover priorities, prior care, current status, and immediate needs, while other detailed information appears in written reports. Avoid including irrelevant information that may distract from essential patient care details.

**Receiving handover reports effectively:** Maintain eye contact with reporting personnel and manage environmental distractions by pausing other activities to focus on information transfer. Ensure complete understanding by asking clarifying questions about unclear information.

Summarize your understanding of the patient's situation aloud to ensure that everyone maintains the correct shared mental model before assuming patient care responsibility.

## Written Communications and Documentation: Patient Care Reports

The **Patient Care Report (PCR)** represents a crucial legal document that records all patient care activities from initial dispatch through hospital arrival and care transfer. EMTs may complete documentation en route to hospitals or after transferring patient care to receiving facilities.

Information collected from PCRs contributes to the National Emergency Medical Services Information System (NEMSIS) database, which supports ongoing research and quality improvement initiatives. NEMSIS identifies essential data points that allow for meaningful comparison of EMS responses across different geographical areas and service types.

EMTs should synchronize their watches with dispatch time systems to ensure accurate documentation of all time-sensitive events and interventions. Begin gathering patient information immediately upon arrival at scenes and continue documentation until reaching receiving hospitals and completing care transfers.

PCRs ensure smooth patient care continuity by thoroughly describing injuries, illnesses, and initial treatment interventions provided in the field. These reports serve six main functions: **1.** Information sharing and ensuring continuous patient care between providers. **2.** Meeting legal documentation requirements and regulatory compliance. **3.** Providing administrative information for system management. **4.** Supporting billing and reimbursement processes. **5.** Educational purposes for quality improvement and training. **6.** Data collection for research and system-wide quality improvement initiatives.

## Components and Formats of Patient Care Reports

Document all patient care activities clearly in PCRs, demonstrating that appropriate medical care was provided according to established standards and protocols. Reports should include both objective facts and subjective patient statements to provide comprehensive clinical pictures.

Essential information includes: Chief complaint or primary concern, mechanism of injury or nature of illness, level of consciousness using standardized scales such as AVPU, vital signs measurements, initial and ongoing assessment findings, patient demographic details including age, sex, and ethnic background when relevant, and transport information describing how patients were moved and destination selection reasoning.

PCRs directly reflect professional competence and attention to detail—neat, well-written reports demonstrate high-quality patient care delivery. The common saying "if the report looks sloppy, the patient care was probably sloppy too" emphasizes this important relationship between documentation quality and care quality.

Reports provide essential administrative information including incident times, arrival times, and care transfer times for system management and quality assurance purposes. **Military time** represents the standard format for EMS documentation to eliminate confusion between AM and PM designations.

PCR data analysis helps identify patterns in illness and injury causes while supporting efforts to improve overall care quality and system effectiveness. Requirements for PCRs vary between jurisdictions, but common essential data points help detect important national trends and patterns.

Most modern PCRs utilize electronic formats (ePCRs) that can transmit patient information directly to receiving hospitals, improving communication efficiency and reducing transcription errors. When paper forms are still used, fill all boxes completely and avoid stray marks that might be misinterpreted.

The **narrative section** represents a critically important component that tells the complete story of each emergency response. Include negative findings and relevant scene observations that might impact patient care or provide context for clinical decisions.

Document facts rather than personal opinions—for example, write "patient had strong odor of alcohol on breath" rather than "patient was intoxicated." **Standardized narrative formats** such as CHART and SOAP ensure that all important information is included systematically.

**CHART Method:** **C** - Chief Complaint/Concern, **H** - History (current event and relevant medical history), **A** - Assessment (vital signs and physical examination findings), **R** - Treatments (all interventions performed and patient responses), **T** - Transport (method of patient movement, destination selection, and receiving personnel).

**SOAP Method:** **S** - Subjective (information from patients and others, chief complaint, relevant history), **O** - Objective (assessment details, vital signs, physical examination findings), **A** - Assessment (summary of findings and clinical impressions), **P** - Plan (treatments provided and ongoing care needs).

Narrative sections should always include: Event times for all significant occurrences, comprehensive assessment findings, all care provided including negative interventions, patient response changes, relevant scene observations, final patient status at care transfer, any refusal of care documentation, and identification of hospital staff who received continuing care responsibility.

Avoid radio codes and abbreviations in written reports that might be misunderstood by readers unfamiliar with local terminology. Maintain correct spelling, especially for medical terms, and record times with all significant findings and interventions.

All reports represent confidential medical documents that must be handled and stored according to HIPAA requirements and local regulations. Distribute copies only according to established policies and procedures.

Understanding these comprehensive documentation and communication principles ensures that EMTs can provide excellent patient care while maintaining professional standards and legal compliance throughout their careers.`;
    }
    
    return `# Chapter ${chapter.id}: ${chapter.title}

## Learning Objectives
*Learning objectives for ${chapter.title} will be populated here with specific, measurable outcomes aligned with EMT-B scope of practice.*

## Overview
*Comprehensive content for ${chapter.title} will be integrated here following the same professional medical formatting as Chapter 1.*

**This chapter is currently being prepared with:**
- Professional medical formatting and typography
- EMT-B scope indicators and badges
- Critical alerts for patient safety information
- Interactive content elements and assessments
- Real-world scenarios and case studies

## Key Topics to be Covered
*Detailed content structure for ${chapter.title} will be added following ProMedixEMS™ training standards.*

## Coming Soon
This chapter content will be integrated with the same professional medical formatting, EMT-B scope indicators, and interactive features as Chapter 1. Content will include comprehensive text, clinical scenarios, assessment tools, and multimedia elements.`;
  };

  const content = getChapterContent();
  const contentElements = parseContent(content);

  // Download menu state/refs for ChapterPage
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const downloadMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(e.target as Node)) {
        setShowDownloadMenu(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // Download Functions
  const generateTextContent = () => {
    return content.replace(/#+\s/g, '').replace(/\*\*(.*?)\*\*/g, '$1');
  };

  const downloadAsText = () => {
    const textContent = generateTextContent();
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Chapter_${chapter.id}_${chapter.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAsHTML = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chapter ${chapter.id}: ${chapter.title}</title>
    <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
    h1 { color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; }
        h2 { color: #1f2937; margin-top: 30px; }
        h3 { color: #374151; }
        p { margin-bottom: 15px; }
        strong { color: #1f2937; font-weight: 600; }
        .chapter-info { background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="chapter-info">
        <h1>Chapter ${chapter.id}: ${chapter.title}</h1>
        <p><strong>Module:</strong> ${module.title}</p>
        <p><strong>Duration:</strong> ${chapter.duration}</p>
        <p><strong>Downloaded:</strong> ${new Date().toLocaleDateString()}</p>
    </div>
    
    ${content.replace(/#+\s(.*)/g, '<h2>$1</h2>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n\n/g, '</p><p>').replace(/^(?!<h)/gm, '<p>').replace(/<p><\/p>/g, '')}
    
    <hr>
    <footer>
  <p><em>Generated from ProMedixEMS™ Training Platform - ${new Date().toLocaleDateString()}</em></p>
    </footer>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Chapter_${chapter.id}_${chapter.title.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAsMarkdown = () => {
    const mdContent = `# Chapter ${chapter.id}: ${chapter.title}

**Module:** ${module.title}
**Duration:** ${chapter.duration}
**Downloaded:** ${new Date().toLocaleDateString()}

---

${content}

---
*Generated from ProMedixEMS™ Training Platform - ${new Date().toLocaleDateString()}*
`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Chapter_${chapter.id}_${chapter.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
 
  return (
    <main className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
      <div className="mb-4">
        <Link to={isBonus ? '/bonus' : `/modules/${module.id}`} className="flex items-center space-x-2 link mb-2">
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>{isBonus ? `Back to Bonus Module: ${module.title}` : `Back to Module ${module.id}: ${module.title}`}</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chapter {chapter.id}: {chapter.title}</h1>
          <p className="text-gray-600">{isBonus ? `Bonus: ${module.title}` : `Module ${module.id}: ${module.title}`} • {chapter.duration}</p>
        </div>
       
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="max-w-none">
            {/* Quick Actions for relevant chapters */}
            {[18,19,20].includes(parseInt(chapterId || '0')) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {parseInt(chapterId || '0') === 18 && (
                  <>
                    <Link to="/tools/gcs" className="text-sm px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100">Open GCS Calculator</Link>
                    <Link to="/tools/calculators" className="text-sm px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100">All Calculators</Link>
                  </>
                )}
                {parseInt(chapterId || '0') === 19 && (
                  <>
                    <Link to="/tools/calculators" className="text-sm px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100">Clinical Calculators</Link>
                  </>
                )}
                {parseInt(chapterId || '0') === 20 && (
                  <>
                    <Link to="/tools/pediatric-dosing" className="text-sm px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100">Pediatric Dosing</Link>
                    <Link to="/tools/calculators" className="text-sm px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100">All Calculators</Link>
                  </>
                )}
              </div>
            )}
            {contentElements.map((element, index) => renderContent(element, index))}
          </div>

          {/* System visuals for Human Body Systems (42–51) */}
          {[42,43,44,45,46,47,48,49,50,51].includes(parseInt(chapterId || '0')) && (
            <div className="mt-8 space-y-6">
              {parseInt(chapterId || '0') === 42 && (
                <>
                  <VisualCard title="Blood Flow Through Heart, Lungs, and Body">
                    <BloodFlowDiagramSVG />
                  </VisualCard>
                  <VisualCard title="Alveolar Gas Exchange (O₂ into blood, CO₂ out)">
                    <GasExchangeDiagramSVG />
                  </VisualCard>
                </>
              )}
              {parseInt(chapterId || '0') === 43 && (
                <VisualCard title="Follow the Blood: Right Heart → Lungs → Left Heart → Body">
                  <BloodFlowDiagramSVG />
                </VisualCard>
              )}
              {parseInt(chapterId || '0') === 44 && (
                <>
                  <VisualCard title="Alveolar Gas Exchange">
                    <GasExchangeDiagramSVG />
                  </VisualCard>
                  <VisualCard title="Ventilation/Perfusion (V/Q) Matching">
                    <VQDiagramSVG />
                  </VisualCard>
                </>
              )}
              {parseInt(chapterId || '0') === 45 && (
                <VisualCard title="Neuron Signaling Across a Synapse">
                  <NeuronSignalDiagramSVG />
                </VisualCard>
              )}
              {parseInt(chapterId || '0') === 46 && (
                <VisualCard title="Sliding Filament Model (Actin/Myosin)">
                  <SlidingFilamentDiagramSVG />
                </VisualCard>
              )}
              {parseInt(chapterId || '0') === 47 && (
                <VisualCard title="Skin Layers (Epidermis, Dermis, Subcutaneous)">
                  <SkinLayersDiagramSVG />
                </VisualCard>
              )}
              {parseInt(chapterId || '0') === 48 && (
                <VisualCard title="Abdominal Quadrants (RUQ, LUQ, RLQ, LLQ)">
                  <GIQuadrantsDiagramSVG />
                </VisualCard>
              )}
              {parseInt(chapterId || '0') === 49 && null}
              {parseInt(chapterId || '0') === 50 && (
                <VisualCard title="Endocrine Feedback for Glucose (Insulin ↓BG, Glucagon ↑BG)">
                  <EndocrineFeedbackDiagramSVG />
                </VisualCard>
              )}
              {parseInt(chapterId || '0') === 51 && null}
            </div>
          )}
         
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500"></div>
            <div className="flex space-x-3 items-center">
              <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Take Notes
              </button>

              {/* Download Dropdown */}
              <div className="relative" ref={downloadMenuRef}>
                <button
                  onClick={() => setShowDownloadMenu((v) => !v)}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
                {showDownloadMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
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

                {/* Related resources */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Related resources</h3>
                  <div className="flex flex-wrap gap-2">
                    <Link to="/tools/calculators" className="text-sm px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100">All Calculators</Link>
                    <Link to="/medications" className="text-sm px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100">Medications</Link>
                    <Link to="/med-simulations" className="text-sm px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100">Medication Simulations</Link>
                    <Link to="/protocols" className="text-sm px-3 py-1 rounded bg-white border border-gray-300 hover:bg-gray-100">Protocols</Link>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary">
                Mark Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// Additional component definitions...
type Module = { id: number; title: string; description: string; duration?: string; chapters: Array<{ id: number; title: string; completed?: boolean; duration?: string }>; };
const ModuleCard: React.FC<{ module: Module }> = ({ module }) => {
  const completedChapters = module.chapters.filter((c: { completed?: boolean }) => c.completed).length;
  const progressPercent = (completedChapters / module.chapters.length) * 100;
 
  return (
    <Link to={`/modules/${module.id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:scale-105">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
            Module {module.id}
          </span>
          <span className="text-xs text-gray-500">{completedChapters}/{module.chapters.length}</span>
        </div>
        <h4 className="font-semibold text-gray-900 mb-2">{module.title}</h4>
        <p className="text-xs text-gray-500 mb-3">{module.description}</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

type StatCardColor = 'blue' | 'green' | 'purple' | 'orange';
const StatCard: React.FC<{ icon: React.ComponentType<{ className?: string }>; title: string; value: string | number; color: StatCardColor }> = ({ icon: Icon, title, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };
 
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color as StatCardColor]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

// Study Modules Page
const StudyModulesPage = () => (
  <main className="p-6">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Modules</h1>
  <p className="text-gray-600">ProMedixEMS™ Study Guides • Organized into 14 modules • 41 focused study units (not full chapters)</p>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {moduleStructure.map((module) => (
        <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-12 h-12 bg-${module.color}-100 rounded-lg flex items-center justify-center`}>
              <module.icon className={`w-6 h-6 text-${module.color}-600`} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">Module {module.id}: {module.title}</h3>
              <p className="text-gray-600">{module.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">{module.chapters.length} chapters</div>
            <div className="text-sm text-gray-500">
              {module.chapters.filter(c => c.completed).length}/{module.chapters.length} completed
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(module.chapters.filter(c => c.completed).length / module.chapters.length) * 100}%` }}
            ></div>
          </div>
          <Link 
            to={`/modules/${module.id}`} 
            className="btn btn-primary inline-block"
          >
            View Module
          </Link>
        </div>
      ))}
    </div>

    {/* Bonus content */}
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Bonus Module</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-12 h-12 bg-${bonusModule.color}-100 rounded-lg flex items-center justify-center`}>
            <bonusModule.icon className={`w-6 h-6 text-${bonusModule.color}-600`} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{bonusModule.title} <span className="ml-2 inline-block text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded px-2 py-0.5">Bonus</span></h3>
            <p className="text-gray-600">{bonusModule.description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">{bonusModule.chapters.length} chapters</div>
        </div>
        <Link to="/bonus" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors inline-block">View Bonus Module</Link>
      </div>
    </div>
  </main>
);

// Module Detail Page
const ModuleDetailPage = () => {
  const { moduleId } = useParams();
  const module = moduleStructure.find(m => m.id === parseInt(moduleId || '0'));
  if (!module) return <div>Module not found</div>;
 
  return (
    <main className="p-6">
      <div className="mb-8">
        <Link to="/modules" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4">
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>Back to All Modules</span>
        </Link>
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-16 h-16 bg-${module.color}-100 rounded-xl flex items-center justify-center`}>
            <module.icon className={`w-8 h-8 text-${module.color}-600`} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Module {module.id}: {module.title}</h1>
            <p className="text-gray-600">{module.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <span>{module.chapters.length} chapters</span>
          <span>{module.chapters.filter(c => c.completed).length} completed</span>
          <span>{module.chapters.reduce((total, ch) => total + (parseInt((ch.duration||'0').toString(), 10) || 0), 0)} minutes total</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {module.chapters.map((chapter) => (
          <Link 
            key={chapter.id} 
            to={`/chapter/${chapter.id}`} 
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">Chapter {chapter.id}: {chapter.title}</h3>
              {chapter.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{chapter.duration}</span>
              <span className={chapter.completed ? 'text-green-600 font-medium' : ''}>
                {chapter.completed ? 'Completed' : 'Not started'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

// Bonus Module Page
const BonusModulePage = () => {
  return (
    <main className="p-6">
      <div className="mb-8">
        <Link to="/modules" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4">
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>Back to All Modules</span>
        </Link>
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-16 h-16 bg-${bonusModule.color}-100 rounded-xl flex items-center justify-center`}>
            <bonusModule.icon className={`w-8 h-8 text-${bonusModule.color}-600`} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{bonusModule.title} <span className="ml-2 inline-block text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded px-2 py-0.5 align-middle">Bonus</span></h1>
            <p className="text-gray-600">{bonusModule.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <span>{bonusModule.chapters.length} chapters</span>
          <span>{bonusModule.chapters.reduce((total, ch) => total + (parseInt((ch.duration||'0').toString(), 10) || 0), 0)} minutes total</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bonusModule.chapters.map((chapter) => (
          <Link 
            key={chapter.id} 
            to={`/chapter/${chapter.id}`} 
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">Chapter {chapter.id}: {chapter.title}</h3>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{chapter.duration}</span>
              <span className={'text-teal-700 font-medium'}>
                Bonus
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

// Enhanced AI Assistant
const AIAssistantPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
  content: `Hello! I'm your ProMedixEMS™ AI Assistant. I can help you with:

?? **EMT-B Protocols & Procedures**
?? **Medication Information & Dosing**
?? **Clinical Assessment Tools**
?? **Study Materials & Concepts**
?? **Practice Questions & Scenarios**

What would you like to learn about today?`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const medicalResponses = {
    'aspirin': `**Aspirin (ASA) - EMT-B Quick Reference:**

**Mechanism:** Antiplatelet agent, prevents blood clot formation
**Indications:** Chest pain of cardiac origin, suspected MI
**Dose:** 162-325mg PO (chewable preferred)
**Contraindications:** Allergy, active gastrointestinal bleeding, severe asthma
**Key Point:** Chewing increases absorption rate

**Clinical Pearl:** Give early in suspected ACS for best outcomes`,
    
    'oxygen': `**Oxygen - EMT-B Administration:**

**Indications:** SpO2 < 94% or signs of hypoxia, respiratory distress, chest pain
**Delivery:** Titrate to maintain SpO2 ≥ 94%; use NRB or BVM if severe distress/CO exposure
**Target:** SpO2 94-99% (avoid hyperoxia in COPD—titrate)
**Monitoring:** Continuous pulse oximetry

**Remember:** Oxygen is a drug - use appropriate concentration!`,
    
    'gcs': `**Glasgow Coma Scale (GCS) Assessment:**

**Components:**
• **Eye Opening:** 4-1 points
• **Verbal Response:** 5-1 points  
• **Motor Response:** 6-1 points

**Interpretation:**
• 13-15: Mild TBI
• 9-12: Moderate TBI
• 3-8: Severe TBI

**EMT Tip:** Document initial and trending scores`,
    
  'Shock Recognition & Response': `**Shock Recognition & Response – Recognition & Management:**

**Early Signs:**
• Altered mental status
• Tachycardia
• Cool, clammy skin
� Delayed capillary refill

**EMT Treatment:**
• Oxygen to maintain SpO2 ≥ 94%
• Position supine (legs elevated if no spinal injury)
• Keep warm
• Rapid transport
• Monitor vitals frequently`
  };

  const getAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    // Check for specific medical terms
    for (const [term, response] of Object.entries(medicalResponses)) {
      if (message.includes(term)) {
        return response;
      }
    }
    
    // General responses
    if (message.includes('medication') || message.includes('drug')) {
      return `I can help with EMT-B medications! We cover 8 essential drugs:

?? **Respiratory:** Oxygen, Albuterol
?? **Cardiac:** Epinephrine, Aspirin, Nitroglycerin
?? **Antidotes:** Activated Charcoal, Naloxone
?? **Metabolic:** Oral Glucose

Which medication would you like to learn about?`;
    }
    
    if (message.includes('protocol') || message.includes('procedure')) {
      return `EMT-B protocols cover systematic approaches to patient care:

?? **Comprehensive Patient Assessment:** Primary/Secondary surveys
?? **Airway Management Techniques:** Positioning, suctioning, BVM
?? **Cardiac Emergencies:** ACS, CHF, cardiac arrest
?? **Medical Emergencies:** Stroke, seizures, diabetes
?? **Trauma:** Bleeding control, spinal motion restriction

What specific protocol interests you?`;
    }
    
    if (message.includes('study') || message.includes('learn')) {
      return `**Study Tips for EMT-B Success:**

?? **Use Active Learning:** Practice scenarios, not just reading
?? **Focus on Priorities:** ABCs always come first
?? **Clinical Thinking:** Ask "Why?" not just "What?"
?? **Spaced Repetition:** Review material regularly
?? **Study Groups:** Discuss cases with classmates

Which topic would you like study guidance on?`;
    }
    
    return `I'm here to help with your EMT-B education! I can assist with:

� **Medications** and their uses
� **Assessment protocols** and procedures  
� **Clinical scenarios** and decision-making
� **Study strategies** and exam prep
� **Specific conditions** and treatments

Please ask me about any EMT-B topic, and I'll provide detailed, clinically accurate information!`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newUserMessage = { id: Date.now(), type: 'user', content: inputValue };
      setMessages(prev => [...prev, newUserMessage]);
      
      setIsTyping(true);
      
      // Simulate AI thinking time
      setTimeout(() => {
        const aiResponse = getAIResponse(inputValue);
        const newAIMessage = {
          id: Date.now() + 1,
          type: 'assistant',
          content: aiResponse
        };
        setMessages(prev => [...prev, newAIMessage]);
        setIsTyping(false);
      }, 1500);
      
      setInputValue('');
    }
  };

  return (
    <main className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">ProMedixEMS™ AI Assistant</h2>
                <p className="text-sm text-gray-600">Your intelligent EMT-B study companion</p>
              </div>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg whitespace-pre-line ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Quick Questions */}
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-2">
              {['Aspirin dosing', 'GCS calculation', 'Shock Recognition & Response signs', 'Oxygen therapy'].map((question) => (
                <button
                  key={question}
                  onClick={() => setInputValue(question)}
                  className="text-xs bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          
          {/* Input */}
          <div className="p-6 border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about protocols, medications, procedures..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping || !inputValue.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

// Enhanced Progress Page
const ProgressPage: React.FC<{ progress: ProgressSummary }> = ({ progress }) => {
  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Progress</h1>
        <p className="text-gray-600">Track your EMT-B certification journey</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{Math.round((progress.modulesCompleted / progress.totalModules) * 100)}%</span>
          </div>
          <h3 className="font-semibold text-gray-900">Modules Complete</h3>
          <p className="text-sm text-gray-600">{progress.modulesCompleted} of {progress.totalModules} modules</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(progress.modulesCompleted / progress.totalModules) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">{Math.round((progress.chaptersCompleted / progress.totalChapters) * 100)}%</span>
          </div>
          <h3 className="font-semibold text-gray-900">Chapters Complete</h3>
          <p className="text-sm text-gray-600">{progress.chaptersCompleted} of {progress.totalChapters} chapters</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(progress.chaptersCompleted / progress.totalChapters) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">{progress.quizAverage}%</span>
          </div>
          <h3 className="font-semibold text-gray-900">Quiz Average</h3>
          <p className="text-sm text-gray-600">Overall performance</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress.quizAverage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">{progress.studyTime}h</span>
          </div>
          <h3 className="font-semibold text-gray-900">Study Time</h3>
          <p className="text-sm text-gray-600">{progress.streak} day streak ??</p>
        </div>
      </div>

      {/* Module Progress Detail */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Module Progress Detail</h3>
        <div className="space-y-4">
          {moduleStructure.map((module) => {
            const completedChapters = module.chapters.filter(c => c.completed).length;
            const progressPercent = (completedChapters / module.chapters.length) * 100;
            
            return (
              <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      Module {module.id}
                    </span>
                    <h4 className="font-semibold text-gray-900">{module.title}</h4>
                  </div>
                  <span className="text-sm text-gray-500">
                    {completedChapters}/{module.chapters.length} chapters
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-right">
                  <span className="text-sm font-medium text-gray-700">{Math.round(progressPercent)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

// Remaining placeholder components
const ProtocolsPage = () => {
  const [selectedProtocol, setSelectedProtocol] = React.useState<EMSProtocol | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  // Filter protocols for EMT-B scope only
  const emtBProtocols = emsProtocols.filter(protocol => 
    protocol.certificationLevel === 'EMT' || protocol.certificationLevel === 'All'
  );

  // Create categories from EMT-B protocols data
  const categories = [
    { id: 'all', name: 'All EMT-B Protocols', count: emtBProtocols.length },
    { id: 'adult', name: 'Adult', count: emtBProtocols.filter(p => p.category === 'adult').length },
    { id: 'pediatric', name: 'Pediatric', count: emtBProtocols.filter(p => p.category === 'pediatric').length },
    { id: 'operations', name: 'Operations', count: emtBProtocols.filter(p => p.category === 'operations').length }
  ];

  const filteredProtocols = emtBProtocols.filter(protocol => {
    const matchesSearch = protocol.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || protocol.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCertificationColor = (level: EMSProtocol['certificationLevel']) => {
    switch (level) {
      case 'EMT': return 'bg-green-100 text-green-800 border-green-200';
      case 'AEMT': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Paramedic': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'All': return 'bg-emerald-100 text-emerald-800 border-emerald-200'; // Special color for EMT-B applicable
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cardiac': return 'bg-red-50 text-red-700';
      case 'respiratory': return 'bg-blue-50 text-blue-700';
      case 'trauma': return 'bg-orange-50 text-orange-700';
      case 'neurological': return 'bg-purple-50 text-purple-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  // Infer a relevant calculator by protocol name/id keywords
  const inferCalcForProtocol = (p: EMSProtocol): { id: string; label: string } | null => {
    const text = `${p.name} ${p.id}`.toLowerCase();
    if (text.includes('coronary') || text.includes('chest') || text.includes('acs')) {
      return { id: 'heart-score', label: 'HEART Score' };
    }
    if (text.includes('burn')) {
      return { id: 'burn-bsa', label: 'Burn BSA (Rule of Nines)' };
    }
    if (text.includes('stroke') || text.includes('seizure') || text.includes('neurolog')) {
      return { id: 'gcs', label: 'Glasgow Coma Scale (GCS)' };
    }
    if (text.includes('respiratory') || text.includes('anaphylaxis') || text.includes('pediatric')) {
      return { id: 'pediatric-dosing', label: 'Pediatric Dosing' };
    }
    return null;
  };

  if (selectedProtocol) {
    return (
      <main className="p-4 md:p-6 pb-24 lg:pb-8">
        <div className="mb-6">
          <button
            onClick={() => setSelectedProtocol(null)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            Back to Protocols
          </button>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProtocol.name}</h1>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCertificationColor(selectedProtocol.certificationLevel)}`}>
                      {selectedProtocol.certificationLevel === 'All' ? 'EMT-B Applicable' : selectedProtocol.certificationLevel}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedProtocol.category)}`}>
                      {selectedProtocol.category.charAt(0).toUpperCase() + selectedProtocol.category.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Main Protocol Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Indications */}
                  <div className="bg-blue-50 rounded-lg p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-blue-600" />
                      Indications
                    </h3>
                    <ul className="space-y-2">
                      {selectedProtocol.indications.map((indication, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{indication}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Assessment */}
                  <div className="bg-green-50 rounded-lg p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Stethoscope className="w-5 h-5 mr-2 text-green-600" />
                      Assessment
                    </h3>
                    <ul className="space-y-2">
                      {selectedProtocol.assessment.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interventions */}
                  <div className="bg-orange-50 rounded-lg p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-orange-600" />
                      Interventions
                    </h3>
                    <ul className="space-y-2">
                      {selectedProtocol.interventions.map((intervention, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{intervention}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Transport */}
                  <div className="bg-purple-50 rounded-lg p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-purple-600" />
                      Transport Considerations
                    </h3>
                    <ul className="space-y-2">
                      {selectedProtocol.transport.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sidebar with Medications and Additional Info */}
                <div className="space-y-4 md:space-y-6">
                  {/* Associated Medications */}
                  <div className="bg-red-50 rounded-lg p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-red-600" />
                      Medications
                    </h3>
                    <div className="space-y-2">
                      {selectedProtocol.medications.map((medication, index) => (
                        <div key={index} className="bg-white rounded-md p-3 flex items-center justify-between">
                          <Link to={`/medications?q=${encodeURIComponent(medication)}`} className="text-sm font-medium text-blue-700 hover:underline">
                            {medication}
                          </Link>
                          <div className="flex items-center gap-2">
                            <Link to={`/med-simulations?q=${encodeURIComponent(medication)}`} className="text-xs text-gray-600 hover:text-gray-800">
                              Simulations
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contraindications (if available) */}
                  {selectedProtocol.contraindications && (
                    <div className="bg-red-100 rounded-lg p-4 md:p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                        Contraindications
                      </h3>
                      <div className="space-y-2">
                        {selectedProtocol.contraindications.map((item, index) => (
                          <div key={index} className="bg-white rounded-md p-3">
                            <span className="text-sm font-medium text-red-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Special Considerations (if available) */}
                  {selectedProtocol.specialConsiderations && (
                    <div className="bg-yellow-50 rounded-lg p-4 md:p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-600" />
                        Special Considerations
                      </h3>
                      <div className="space-y-2">
                        {selectedProtocol.specialConsiderations.map((item, index) => (
                          <div key={index} className="bg-white rounded-md p-3">
                            <span className="text-sm font-medium text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Reference */}
                  <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reference</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Category:</span>
                        <span className="ml-2 text-gray-700 capitalize">{selectedProtocol.category}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Certification:</span>
                        <span className="ml-2 text-gray-700">
                          {selectedProtocol.certificationLevel === 'All' ? 'EMT-B Applicable' : selectedProtocol.certificationLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Related Resources */}
                  <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Related resources</h3>
                    <div className="space-y-2">
            {/* Contextual calculator (if inferred) */}
            {inferCalcForProtocol(selectedProtocol) && (
                        <Link
              to={`/tools/${inferCalcForProtocol(selectedProtocol)!.id}`}
                          className="w-full inline-flex items-center justify-between px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 text-blue-700"
                        >
              <span>Open {inferCalcForProtocol(selectedProtocol)!.label} Calculator</span>
                          <Calculator className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        to="/tools/calculators"
                        className="w-full inline-flex items-center justify-between px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-700"
                      >
                        <span>Browse all Calculators</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      {/* Shortcut to medications list prefiltered by first associated med (if any) */}
                      {selectedProtocol.medications && selectedProtocol.medications.length > 0 && (
                        <Link
                          to={`/medications?q=${encodeURIComponent(selectedProtocol.medications[0])}`}
                          className="w-full inline-flex items-center justify-between px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-700"
                        >
                          <span>View medication: {selectedProtocol.medications[0]}</span>
                          <PillIcon className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </button>
                      <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center">
                        <BookmarkIcon className="w-4 h-4 mr-2" />
                        Add to Favorites
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-6 pb-24 lg:pb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">EMT-B Protocols</h1>
        <p className="text-gray-600">Emergency medical protocols within EMT-Basic scope of practice</p>
        <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-blue-700 text-sm">
            <span className="font-medium">Scope Filter Active:</span> Showing only protocols that can be performed by EMT-Basic certification level ({emtBProtocols.length} protocols)
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search protocols by name or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Categories Overview */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        {categories.slice(1).map(category => (
          <div
            key={category.id}
            className={`bg-white rounded-lg border-2 p-4 cursor-pointer transition-colors ${
              selectedCategory === category.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="text-center">
              <div className={`text-2xl font-bold ${getCategoryColor(category.id).split(' ')[1]}`}>
                {category.count}
              </div>
              <div className="text-sm font-medium text-gray-700 mt-1">{category.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Protocols Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredProtocols.map((protocol, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
            onClick={() => setSelectedProtocol(protocol)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{protocol.name}</h3>
                <div className="flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCertificationColor(protocol.certificationLevel)}`}>
                    {protocol.certificationLevel === 'All' ? 'EMT-B Applicable' : protocol.certificationLevel}
                  </span>
                </div>
              </div>
              
              {/* Key Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="w-4 h-4 mr-2" />
                  <span>{protocol.indications.length} Indications</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Activity className="w-4 h-4 mr-2" />
                  <span>{protocol.interventions.length} Interventions</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Heart className="w-4 h-4 mr-2" />
                  <span>{protocol.medications.length} Medications</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(protocol.category)}`}>
                  {protocol.category.charAt(0).toUpperCase() + protocol.category.slice(1)}
                </span>
                <div className="flex items-center text-blue-600">
                  <span className="text-sm mr-1">View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProtocols.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Protocols Found</h3>
          <p className="text-gray-600">Try adjusting your search terms or selected category.</p>
        </div>
      )}
    </main>
  );
};

const FlashcardsPage = () => (
  <main className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Study Flashcards</h1>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="text-center py-8">
        <BookOpen className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Flashcard System</h3>
        <p className="text-gray-600 mb-4">Spaced repetition flashcards ready for integration.</p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-purple-700">Interactive flashcard system with spaced repetition algorithm for optimal learning retention.</p>
        </div>
      </div>
    </div>
  </main>
);

const QuizPage = () => (
  <main className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Practice Quiz</h1>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="text-center py-8">
        <CheckSquare className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Quiz System</h3>
        <p className="text-gray-600 mb-4">Adaptive quiz system ready for integration.</p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-700">Comprehensive quiz system with 500+ questions, adaptive difficulty, and detailed explanations.</p>
        </div>
      </div>
    </div>
  </main>
);

const SearchResultsPage = () => {
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    types: [] as string[],
    chapters: [] as number[],
    categories: [] as string[],
    minScore: 0
  });
  const navigate = useNavigate();

  // Import search engine dynamically to avoid circular dependencies
  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        // Using imported searchEngine
        const searchResults = searchEngine.search(query, filters);
        const searchSuggestions = searchEngine.getSearchSuggestions(query);
        
        setResults(searchResults);
        setSuggestions(searchSuggestions);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query, filters]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flashcard': return BookOpen;
      case 'study-notes': return FileText;
      case 'protocol': return ClipboardList;
      case 'medication': return Heart;
      case 'calculator': return Calculator;
      case 'simulation': return Activity;
      default: return Search;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'flashcard': return 'bg-blue-100 text-blue-800';
      case 'study-notes': return 'bg-green-100 text-green-800';
      case 'protocol': return 'bg-red-100 text-red-800';
      case 'medication': return 'bg-purple-100 text-purple-800';
      case 'calculator': return 'bg-yellow-100 text-yellow-800';
      case 'simulation': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">{part}</mark>
      ) : part
    );
  };

  const filterOptions = {
    types: ['flashcard', 'study-notes', 'protocol', 'medication', 'calculator', 'simulation'],
    chapters: Array.from({ length: 14 }, (_, i) => i + 1)
  };
 
  return (
    <main className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Search Results</h1>
        <p className="text-gray-600 dark:text-gray-300">
          {loading ? 'Searching...' : results.length > 0 ? `${results.length} results for: "${query}"` : query ? `No results for: "${query}"` : 'Enter a search term'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Filters</h3>
            
            {/* Content Type Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content Type</label>
              <div className="space-y-2">
                {filterOptions.types.map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters(f => ({ ...f, types: [...f.types, type] }));
                        } else {
                          setFilters(f => ({ ...f, types: f.types.filter(t => t !== type) }));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 capitalize">{type.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Chapter Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chapters</label>
              <div className="grid grid-cols-4 gap-1">
                {filterOptions.chapters.map(chapter => (
                  <label key={chapter} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.chapters.includes(chapter)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters(f => ({ ...f, chapters: [...f.chapters, chapter] }));
                        } else {
                          setFilters(f => ({ ...f, chapters: f.chapters.filter(c => c !== chapter) }));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-1"
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{chapter}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setFilters({ types: [], chapters: [], categories: [], minScore: 0 })}
              className="w-full px-3 py-2 text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Clear Filters
            </button>
          </div>

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Suggestions</h3>
              <div className="space-y-2">
                {suggestions.slice(0, 5).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(`/search?q=${encodeURIComponent(suggestion)}`)}
                    className="w-full text-left px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result) => {
                const IconComponent = getTypeIcon(result.type);
                return (
                  <div key={result.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(result.type)}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {highlightText(result.title, query)}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="capitalize">{result.type.replace('-', ' ')}</span>
                            <span>•</span>
                            <span>{result.category}</span>
                            {result.chapter && (
                              <>
                                <span>•</span>
                                <span>Chapter {result.chapter}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          Score: {result.relevanceScore}
                        </span>
                        <button
                          onClick={() => navigate(result.url)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {highlightText(result.snippet, query)}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : query ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We couldn't find anything matching "{query}". Try:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <ul className="text-left text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Checking your spelling</li>
                    <li>• Using different keywords</li>
                    <li>• Being more specific or more general</li>
                    <li>• Trying medical abbreviations (CPR, BLS, etc.)</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Search EMT-B Content</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Search across flashcards, study notes, protocols, medications, and clinical tools
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;




