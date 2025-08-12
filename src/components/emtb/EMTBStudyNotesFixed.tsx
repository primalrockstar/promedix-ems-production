import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, BookOpen, AlertCircle, Heart, Shield, Stethoscope, ChevronDown, ChevronUp, Download, FileText } from 'lucide-react';
import MedicalDisclaimer from '../MedicalDisclaimer';

interface StudySection {
  title: string;
  content: string[];
}

const EMTBStudyNotes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
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
  const chapter2StudyNotes = {
    title: "Chapter 2: Workforce Safety and Wellness",
    description: "Comprehensive study guide covering essential workforce safety, health, and wellness concepts for Emergency Medical Technicians.",
    learningObjectives: [
      "Understand the unique risks faced by emergency responders",
      "Identify strategies for maintaining physical, mental, and emotional health",
      "Recognize the difference between eustress and distress",
      "Implement proper nutrition and exercise practices for EMTs",
      "Apply safe lifting techniques and injury prevention methods",
      "Understand infectious disease transmission and prevention",
      "Use appropriate Personal Protective Equipment (PPE)",
      "Manage stress and recognize signs of PTSD and burnout",
      "Handle emotional aspects of emergency care professionally",
      "Maintain cultural sensitivity and workplace professionalism"
    ],
    keyTerms: [
      "Eustress vs. Distress",
      "Wellness and Resilience",
      "Stress Management",
      "Sleep Deprivation",
      "Disease Prevention",
      "Health Promotion",
      "Infectious Diseases",
      "Communicable Diseases",
      "Pathogen",
      "Contamination",
      "Personal Protective Equipment (PPE)",
      "Standard Precautions",
      "Critical Incident Stress",
      "PTSD",
      "Burnout",
      "Compassion Fatigue",
      "Cultural Humility",
      "Sexual Harassment"
    ],
    sections: [
      {
        title: "1. Introduction to Workforce Safety and Wellness",
        content: [
          "Emergency Responders face more risks than other jobs",
          "EMTs work in tough, fast-changing situations",
          "They can get exposed to diseases, injuries, and violence",
          "Studies show that 84% of first responders have seen traumatic events, and 34% have been diagnosed with mental health issues like depression or PTSD",
          "The suicide rate for EMTs and paramedics is much higher than for other adults",
          "**EMTs must take care of their physical, mental, and emotional health to properly care for patients**"
        ]
      },
      {
        title: "2. General Health, Wellness, and Resilience",
        content: [
          "Health is a mix of physical, mental, and emotional states",
          "Ongoing stress in any area can make overall health worse",
          "Supporting good physical, mental, and emotional health can greatly lower the chance of health problems"
        ]
      },
      {
        title: "3. Understanding Stress: Eustress vs. Distress",
        content: [
          "Not all stress is bad; **Eustress** causes positive responses",
          "An example is increased focus and job satisfaction from doing well in a tough situation",
          "**Distress** causes negative responses, like feeling overwhelmed or anxious",
          "Stress can be short-term or long-term",
          "How someone reacts to stress changes based on their mood, health, and other Stressors",
          "One source of stress can lead to another, creating a difficult cycle"
        ]
      },
      {
        title: "4. Strategies for Wellness and Resilience",
        content: [
          "Wellness means actively working towards good health",
          "EMTs must work to keep their Wellness, just like they keep their skills",
          "Resilience is being able to handle and recover from stress",
          "To increase Resilience, you should: Eat a healthy diet, Get 7 to 9 hours of sleep daily, Build strong relationships with family, friends, and co-workers, Exercise daily, Practice mindfulness",
          "Stress Management involves ways to lessen or stop stress reactions",
          "The impact of stress depends on how a person reacts to it, not just the event itself"
        ]
      },
      {
        title: "5. Nutrition for Emergency Medical Technicians",
        content: [
          "EMTs can't control job Stressors, so they must prepare their bodies",
          "**Physical conditioning and proper nutrition** are key things EMTs can control",
          "Regular, good meals provide energy for the job's high demands",
          "Limit sugar, fats, sodium, and alcohol intake",
          "Complex carbohydrates like pasta and rice are good for long-term energy",
          "Staying hydrated with water is essential because the body absorbs it fastest",
          "Frequent urination or light yellow urine shows good hydration"
        ]
      },
      {
        title: "6. Exercise and Relaxation",
        content: [
          "Regular exercise helps nutrition and hydration work better",
          "Being in good physical shape makes it easier to handle job stress",
          "Aim for at least 30 minutes of moderate to vigorous physical activity five days a week",
          "Include cardiovascular, strength, and flexibility training",
          "Planning activities and exercising with others can help you stick to it and enjoy it more"
        ]
      },
      {
        title: "7. Safe Lifting Practices",
        content: [
          "Lifting is a common task for EMTs",
          "**Back injuries are frequent in EMS work**",
          "Key tips for safe lifting are: Pre-plan the move, Bend your legs not your waist, Keep the weight close to your body, Lift straight up using your legs"
        ]
      },
      {
        title: "8. Sleep and Fatigue Management",
        content: [
          "Many EMTs feel tired and lack sleep due to shift work and intense emergency care",
          "Sleep Deprivation can lead to mistakes, crashes, and long-term health problems like high blood pressure and diabetes",
          "Adults need 7 to 9 hours of sleep each night",
          "Recommendations for fatigue management include: Using surveys to check fatigue, Working shifts shorter than 24 hours, Having access to caffeine and naps while on duty, Receiving education on fatigue risks",
          "Individual strategies involve getting enough quality sleep, taking short naps, doing physical and mental exercise, and avoiding substances like caffeine or alcohol before bed",
          "Keep your sleep schedule consistent and expose yourself to natural light during waking hours"
        ]
      },
      {
        title: "9. Disease Prevention and Health Promotion",
        content: [
          "Disease Prevention focuses on medical care to avoid illness, like vaccinations and screenings",
          "Health Promotion focuses on personal habits to improve health, like proper diet and exercise",
          "**Avoiding tobacco and vaping is crucial** due to severe health risks, including lung and heart damage, and various cancers",
          "Strategies to quit nicotine include creating a plan, setting a quit date, telling friends and family, removing tobacco products, and seeking medical help"
        ]
      },
      {
        title: "10. Substance Abuse: Alcohol and Drugs",
        content: [
          "Acceptable alcohol use is one drink per day for women and two for men",
          "Excessive drinking, especially binge drinking, leads to many deaths and high economic costs in the US",
          "Drug abuse, including both prescription and illegal drugs, is dangerous and costly",
          "EMTs testing positive for illegal or unverified prescription drugs can face suspension or dismissal",
          "Always avoid illegal drugs and take prescribed medications only as directed, considering how they might affect your performance and safety"
        ]
      },
      {
        title: "11. Balancing Work, Family, and Health",
        content: [
          "EMTs often work at unpredictable times, so balancing work and personal life is important",
          "Make time to relax with family and friends",
          "Co-workers, family, and friends might not understand the stress of EMS calls",
          "**Seek help from peer support groups, critical incident Stress Management teams, or employee assistance programs** if work stress is overwhelming",
          "Taking vacations and rotating schedules can help lower stress",
          "Seeking help shows you are in control of your life, not that you are weak"
        ]
      },
      {
        title: "12. Infectious and Communicable Diseases: Terminology and Transmission",
        content: [
          "EMTs treat patients with **infectious diseases** (caused by harmful organisms) and **Communicable Diseases** (spread from person to person)",
          "Key terms include: **Pathogen**: A germ that causes disease, **Contamination**: Presence of Pathogens on objects or in the body, **Exposure**: Contact with blood, fluids, or airborne particles that could spread disease, **Personal Protective Equipment (PPE)**: Gear worn to prevent Exposure",
          "Diseases spread in several ways: **Contact** (direct or indirect via objects called **fomites**), **Airborne** (droplets or dust, like from coughing or sneezing), **Foodborne** (contaminated food or water), **Vector-borne** (animals or insects like fleas or ticks)"
        ]
      },
      {
        title: "13. Risk Reduction and Prevention: Standard Precautions and PPE",
        content: [
          "OSHA requires EMTs to be trained in handling Blood-borne Pathogens and infectious diseases",
          "The CDC's **standard precautions** mean assuming every person might be infected, so always use infection control procedures",
          "Properly putting on (**donning**) and taking off (**doffing**) PPE is vital to avoid Contamination",
          "Common PPE includes a mask, eyewear, gloves, and gown",
          "Always don PPE in a specific order (gown, mask, eyewear, gloves) and doff (remove) the mask last",
          "**Proper hand washing** is the simplest and most effective way to prevent disease spread, always wash hands before and after patient contact",
          "Wear gloves and eye protection if there's any chance of contact with blood or body fluids",
          "Dispose of sharp items like needles in approved, closed containers"
        ]
      },
      {
        title: "14. Types of Protective Clothing and Gear",
        content: [
          "Wearing the right protective clothing and gear is crucial for safety and must be in good condition",
          "For cold weather, wear multiple layers: A thin inner layer to wick away moisture, A thermal middle layer for insulation, An outer layer to resist wind and wetness",
          "Avoid cotton in cold, wet conditions as it absorbs moisture and causes chilling",
          "Do not wear flammable synthetic materials near fire"
        ]
      },
      {
        title: "15. Specialized Protective Equipment",
        content: [
          "**Turnout gear** (bunker gear) protects against fire heat, impact, and cuts, but offers minimal electrical shock protection",
          "**Firefighting gloves** protect from heat, cold, and cuts, but can make it harder to use your hands",
          "**Helmets** should be worn in areas where objects might fall or where there are electrical hazards, providing top and side impact protection",
          "**Boots** should be water-resistant, fit well, cover ankles, and have good traction, with steel toes preferred"
        ]
      },
      {
        title: "16. Sensory and Personal Protection",
        content: [
          "**Eye protection** (goggles, face shields) is critical against blood, airborne droplets, and objects, especially during extrication or in bright conditions",
          "**Ear protection** (earplugs) is needed for loud noises like sirens to prevent hearing loss",
          "**Skin protection** with sunscreen (SPF 15 minimum) is important outdoors to prevent sunburn and reduce skin cancer risk",
          "**Secure long hair, loose rings, and jewelry** to prevent them from getting caught in machinery",
          "**Body armor** provides protection from firearms, with different types for various situations"
        ]
      },
      {
        title: "17. Caring for Critically Ill and Injured Patients",
        content: [
          "Tell critically ill patients who you are and what you are doing to reduce their confusion",
          "Avoid sad or grim comments, and be honest without scaring the patient",
          "Always allow for hope, even in serious situations",
          "For children, a relative or responsible adult should be with them to ease anxiety and help with care"
        ]
      },
      {
        title: "18. Coping with the Death of a Child",
        content: [
          "The death of a child is very hard for EMTs and families",
          "Acknowledge the death in a private place",
          "Allow parents to hold or touch the child if appropriate, as it helps their grieving",
          "Express sorrow and offer nonverbal support like holding a hand",
          "Encourage parents to talk about their feelings",
          "Avoid judgmental or trite statements like 'Everything will be alright'"
        ]
      },
      {
        title: "19. The Grieving Process and EMT Support",
        content: [
          "EMTs will often face grief in their work",
          "Dr. Elizabeth Kubler-Ross identified five stages of grief, which can occur in any order: Denial, Anger, Bargaining, Depression, Acceptance",
          "EMTs can offer support by asking how they can help, like calling a relative",
          "Reinforce reality gently, be sincere, and listen to the grieving person",
          "If anger is directed at you, maintain a professional attitude"
        ]
      },
      {
        title: "20. Stress Management on the Job",
        content: [
          "EMS is a high-stress job, and understanding stress is key to performance and well-being",
          "The body's stress response, called **general adaptation syndrome**, causes physical changes like increased heart rate and blood pressure",
          "Stressors for EMTs include dangerous situations, critically ill patients, and even routine calls",
          "Reactions to stress can be: **Acute**: Happens during the event, increasing focus, **Delayed**: Occurs after the event, leaving nervous energy, **Cumulative**: From prolonged or excessive stress, leading to tiredness and physical/psychological symptoms",
          "Long-term stress contributes to heart disease, cancer, and depression"
        ]
      },
      {
        title: "21. Critical Incident Stress and Post-Traumatic Stress Disorder (PTSD)",
        content: [
          "Acute severe Stressors can cause **critical incident stress**, which may lead to **PTSD**",
          "PTSD symptoms include re-experiencing events and over-responding to related stimuli",
          "**Critical Incident Stress Management (CISM)** programs, including defusing and debriefing sessions, help responders process traumatic events",
          "Defusing sessions are informal group discussions during or immediately after an event",
          "Debriefing sessions are held 24-72 hours later with mental health professionals to express emotions",
          "If CISM isn't suitable, other options like Employee Assistance Programs or private counseling should be offered"
        ]
      },
      {
        title: "22. Burnout, Compassion Fatigue, and Responder Suicide Risk",
        content: [
          "**Burnout** is exhaustion, cynicism, and poor performance from long-term job stress",
          "It can lead to medical errors, lawsuits, and decreased morale",
          "**Compassion Fatigue** (secondary stress disorder) is a gradual loss of compassion from caring for trauma victims",
          "Symptoms include absenteeism, difficulty with colleagues, and lack of empathy",
          "EMTs have a **much higher risk of suicide** than the general population, largely due to job stress and the stigma of mental illness",
          "It is crucial for EMTs to recognize signs of stress and trauma in themselves and others and to seek help from available resources like peer support or mental health services"
        ]
      },
      {
        title: "23. Emotional Aspects of Emergency Care",
        content: [
          "EMTs must remain calm and professional, even in horrific situations",
          "Avoid false promises like 'Everything will be alright'; instead, be calm and caring",
          "Patient reactions vary based on their background, fears, and mental health",
          "**Prioritize professional judgment over compassion** in critical situations to address the most urgent needs first",
          "Allow patients to express fears and concerns, and respond discreetly and diplomatically",
          "For critical news, wait for clergy or hospital staff if possible to provide psychological support"
        ]
      },
      {
        title: "24. Respecting Patient Needs and Customs",
        content: [
          "Handle deceased bodies with **respect and dignity**, following local rules, especially at crime scenes",
          "Always perform CPR and appropriate treatment unless there are clear signs of death",
          "Respect religious customs, like requests for counsel or rites if death is near, and report religious convictions about medical treatments"
        ]
      },
      {
        title: "25. Workplace Issues: Cultural Diversity",
        content: [
          "EMS workplaces are becoming more diverse, requiring EMTs to provide fair care to all patients and work well with colleagues from different backgrounds",
          "Cultural diversity improves patient care by bringing together a wide range of skills",
          "Strive for **cultural humility** by being curious, thinking about your own biases, and adapting your behavior",
          "Use appropriate language; avoid offensive terms like 'cripple' or 'retard'",
          "Consider multilingual training to improve communication and cultural sensitivity"
        ]
      },
      {
        title: "26. Sexual Harassment and Substance Abuse in the Workplace",
        content: [
          "**Sexual harassment** is unwelcome sexual conduct that affects work or creates an offensive environment, including **quid pro quo** (favors for something) and **hostile work environment** (jokes, touching)",
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
    ]
  };

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
    let textContent = `${chapter2StudyNotes.title}\n`;
    textContent += `${chapter2StudyNotes.description}\n\n`;
    
    textContent += "LEARNING OBJECTIVES:\n";
    chapter2StudyNotes.learningObjectives.forEach((objective, index) => {
      textContent += `${index + 1}. ${objective}\n`;
    });
    textContent += "\n";

    textContent += "KEY TERMS:\n";
    chapter2StudyNotes.keyTerms.forEach((term, index) => {
      textContent += `• ${term}\n`;
    });
    textContent += "\n";

    textContent += "STUDY CONTENT:\n\n";
    chapter2StudyNotes.sections.forEach((section, index) => {
      textContent += `${section.title}\n`;
      textContent += "=".repeat(section.title.length) + "\n";
      section.content.forEach(paragraph => {
        // Remove markdown-style bold formatting for plain text
        const cleanParagraph = paragraph.replace(/\*\*(.*?)\*\*/g, '$1');
        textContent += `${cleanParagraph}\n`;
      });
      textContent += "\n";
    });

    textContent += "CRITICAL CONCEPTS:\n";
    chapter2StudyNotes.criticalConcepts.forEach((concept, index) => {
      textContent += `${index + 1}. ${concept}\n`;
    });

    return textContent;
  };

  const downloadAsText = () => {
    const content = generateTextContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'EMT-B_Chapter2_Study_Notes.txt';
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
    <title>${chapter2StudyNotes.title}</title>
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
    <h1>${chapter2StudyNotes.title}</h1>
    <p><em>${chapter2StudyNotes.description}</em></p>
    
    <div class="objectives">
        <h2>Learning Objectives</h2>
        <ul>
            ${chapter2StudyNotes.learningObjectives.map(obj => `<li>${obj}</li>`).join('')}
        </ul>
    </div>

    <div class="terms">
        <h2>Key Terms</h2>
        <ul>
            ${chapter2StudyNotes.keyTerms.map(term => `<li><strong>${term}</strong></li>`).join('')}
        </ul>
    </div>

    <h2>Study Content</h2>
    ${chapter2StudyNotes.sections.map(section => `
        <div class="section">
            <h3>${section.title}</h3>
            ${section.content.map(paragraph => {
              // Convert markdown bold to HTML
              const htmlParagraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
              return `<p>${htmlParagraph}</p>`;
            }).join('')}
        </div>
    `).join('')}

    <div class="concepts">
        <h2>Critical Concepts</h2>
        <ul>
            ${chapter2StudyNotes.criticalConcepts.map(concept => `<li>${concept}</li>`).join('')}
        </ul>
    </div>

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
    link.download = 'EMT-B_Chapter2_Study_Notes.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAsMarkdown = () => {
    let mdContent = `# ${chapter2StudyNotes.title}\n\n`;
    mdContent += `*${chapter2StudyNotes.description}*\n\n`;
    
    mdContent += "## Learning Objectives\n\n";
    chapter2StudyNotes.learningObjectives.forEach((objective, index) => {
      mdContent += `${index + 1}. ${objective}\n`;
    });
    mdContent += "\n";

    mdContent += "## Key Terms\n\n";
    chapter2StudyNotes.keyTerms.forEach(term => {
      mdContent += `- **${term}**\n`;
    });
    mdContent += "\n";

    mdContent += "## Study Content\n\n";
    chapter2StudyNotes.sections.forEach((section, index) => {
      mdContent += `### ${section.title}\n\n`;
      section.content.forEach(paragraph => {
        mdContent += `${paragraph}\n\n`;
      });
    });

    mdContent += "## Critical Concepts\n\n";
    chapter2StudyNotes.criticalConcepts.forEach((concept, index) => {
      mdContent += `${index + 1}. ${concept}\n`;
    });
    mdContent += "\n";

    mdContent += `---\n*Generated from EMT-B Study Notes - ${new Date().toLocaleDateString()}*\n`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'EMT-B_Chapter2_Study_Notes.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return chapter2StudyNotes.sections;
    
    return chapter2StudyNotes.sections.filter(section =>
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.some(item => 
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <AlertCircle className="h-6 w-6 text-blue-400 mr-3 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              {chapter2StudyNotes.title}
            </h3>
            <p className="text-blue-700">
              {chapter2StudyNotes.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <Heart className="h-8 w-8 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">Learning Objectives</h3>
          <ul className="space-y-2 text-green-700">
            {chapter2StudyNotes.learningObjectives.map((objective, index) => (
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
            {chapter2StudyNotes.keyTerms.map((term, index) => (
              <div key={index} className="text-sm font-medium flex items-center">
                <span className="text-red-500 mr-2">•</span>
                <span>{term}</span>
              </div>
            ))}
          </div>
        </div>
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
      {chapter2StudyNotes.criticalConcepts.map((concept, index) => (
        <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 shadow-sm rounded-r-lg">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-yellow-800 text-sm font-medium leading-relaxed">{concept}</p>
          </div>
        </div>
      ))}
    </div>
  );

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
              <p className="text-gray-600 mt-1">Chapter 2: Workforce Safety and Wellness</p>
            </div>
          </div>
          
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
        </div>
      </div>

  <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 border touch-manipulation">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'study' && renderStudyMaterial()}
        {activeTab === 'critical' && renderCriticalConcepts()}
      </div>
    </div>
  );
};

export default EMTBStudyNotes;
