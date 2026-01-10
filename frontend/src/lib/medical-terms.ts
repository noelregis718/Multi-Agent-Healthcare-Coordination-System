/**
 * medical-terms.ts
 * 
 * Plain language dictionary for medical terminology
 * Implements 8th-grade reading level for health literacy accessibility
 * 
 * Based on CDC Clear Communication principles and
 * NIH Plain Language guidelines for patient communication
 */

export interface MedicalTerm {
    term: string;
    simple: string;
    description: string;
    category: 'condition' | 'medication' | 'procedure' | 'measurement' | 'general';
  }
  
  // Medical terms with plain language equivalents
  export const medicalTerms: Record<string, MedicalTerm> = {
    // Conditions
    'hypertension': {
      term: 'Hypertension',
      simple: 'High blood pressure',
      description: 'When the force of blood against your artery walls is too high.',
      category: 'condition',
    },
    'diabetes mellitus': {
      term: 'Diabetes Mellitus',
      simple: 'Diabetes (high blood sugar)',
      description: 'A condition where your body has trouble controlling blood sugar levels.',
      category: 'condition',
    },
    'type 2 diabetes': {
      term: 'Type 2 Diabetes',
      simple: 'Adult-onset diabetes',
      description: 'The most common type of diabetes where your body doesn\'t use insulin well.',
      category: 'condition',
    },
    'hyperlipidemia': {
      term: 'Hyperlipidemia',
      simple: 'High cholesterol',
      description: 'Too much fat (cholesterol) in your blood.',
      category: 'condition',
    },
    'atrial fibrillation': {
      term: 'Atrial Fibrillation',
      simple: 'Irregular heartbeat (AFib)',
      description: 'When your heart beats in an uneven, often fast rhythm.',
      category: 'condition',
    },
    'heart failure': {
      term: 'Heart Failure',
      simple: 'Weak heart',
      description: 'When your heart can\'t pump blood as well as it should.',
      category: 'condition',
    },
    'chronic kidney disease': {
      term: 'Chronic Kidney Disease',
      simple: 'Kidney problems',
      description: 'When your kidneys are damaged and can\'t filter blood properly.',
      category: 'condition',
    },
    'copd': {
      term: 'COPD',
      simple: 'Lung disease',
      description: 'A lung disease that makes it hard to breathe.',
      category: 'condition',
    },
    'osteoarthritis': {
      term: 'Osteoarthritis',
      simple: 'Joint wear and tear',
      description: 'When the cushioning in your joints breaks down over time.',
      category: 'condition',
    },
    'depression': {
      term: 'Depression',
      simple: 'Feeling very sad or hopeless',
      description: 'A mood condition that affects how you feel, think, and handle daily activities.',
      category: 'condition',
    },
    'anxiety': {
      term: 'Anxiety',
      simple: 'Feeling worried or nervous',
      description: 'Intense feelings of worry or fear that can interfere with daily life.',
      category: 'condition',
    },
    
    // Medications
    'metformin': {
      term: 'Metformin',
      simple: 'Diabetes pill',
      description: 'A medicine that helps control blood sugar levels.',
      category: 'medication',
    },
    'lisinopril': {
      term: 'Lisinopril',
      simple: 'Blood pressure pill',
      description: 'A medicine that helps lower blood pressure.',
      category: 'medication',
    },
    'atorvastatin': {
      term: 'Atorvastatin',
      simple: 'Cholesterol pill',
      description: 'A medicine that helps lower cholesterol.',
      category: 'medication',
    },
    'carvedilol': {
      term: 'Carvedilol',
      simple: 'Heart medicine',
      description: 'A medicine that helps your heart work better and lowers blood pressure.',
      category: 'medication',
    },
    'aspirin': {
      term: 'Aspirin',
      simple: 'Blood thinner',
      description: 'A medicine that helps prevent blood clots.',
      category: 'medication',
    },
    'insulin': {
      term: 'Insulin',
      simple: 'Sugar-lowering shot',
      description: 'A hormone that helps your body use sugar for energy.',
      category: 'medication',
    },
    'warfarin': {
      term: 'Warfarin',
      simple: 'Blood thinner',
      description: 'A medicine that prevents blood clots.',
      category: 'medication',
    },
    'prednisone': {
      term: 'Prednisone',
      simple: 'Steroid medicine',
      description: 'A medicine that reduces swelling and inflammation.',
      category: 'medication',
    },
    
    // Procedures
    'echocardiogram': {
      term: 'Echocardiogram',
      simple: 'Heart ultrasound',
      description: 'A test that uses sound waves to create pictures of your heart.',
      category: 'procedure',
    },
    'colonoscopy': {
      term: 'Colonoscopy',
      simple: 'Colon check',
      description: 'A test where a doctor looks inside your large intestine.',
      category: 'procedure',
    },
    'mammogram': {
      term: 'Mammogram',
      simple: 'Breast X-ray',
      description: 'An X-ray picture of the breast to check for cancer.',
      category: 'procedure',
    },
    'dialysis': {
      term: 'Dialysis',
      simple: 'Kidney cleaning treatment',
      description: 'A treatment that cleans your blood when your kidneys can\'t.',
      category: 'procedure',
    },
    'biopsy': {
      term: 'Biopsy',
      simple: 'Tissue sample test',
      description: 'A test where a small piece of tissue is removed to check for disease.',
      category: 'procedure',
    },
    
    // Measurements
    'hba1c': {
      term: 'HbA1c',
      simple: 'Average blood sugar test',
      description: 'A blood test that shows your average blood sugar over 2-3 months.',
      category: 'measurement',
    },
    'blood pressure': {
      term: 'Blood Pressure',
      simple: 'How hard blood pushes',
      description: 'The force of blood pushing against your artery walls.',
      category: 'measurement',
    },
    'bmi': {
      term: 'BMI',
      simple: 'Body weight measure',
      description: 'A number that shows if your weight is healthy for your height.',
      category: 'measurement',
    },
    'cholesterol': {
      term: 'Cholesterol',
      simple: 'Blood fat',
      description: 'A waxy substance in your blood that can build up in arteries.',
      category: 'measurement',
    },
    'ldl': {
      term: 'LDL',
      simple: 'Bad cholesterol',
      description: 'The type of cholesterol that can clog your arteries.',
      category: 'measurement',
    },
    'hdl': {
      term: 'HDL',
      simple: 'Good cholesterol',
      description: 'The type of cholesterol that helps remove bad cholesterol.',
      category: 'measurement',
    },
    'creatinine': {
      term: 'Creatinine',
      simple: 'Kidney function test',
      description: 'A blood test that shows how well your kidneys are working.',
      category: 'measurement',
    },
    'egfr': {
      term: 'eGFR',
      simple: 'Kidney health score',
      description: 'A number that shows how well your kidneys filter your blood.',
      category: 'measurement',
    },
    
    // General terms
    'chronic': {
      term: 'Chronic',
      simple: 'Long-lasting',
      description: 'A condition that lasts a long time (months or years).',
      category: 'general',
    },
    'acute': {
      term: 'Acute',
      simple: 'Sudden or short-term',
      description: 'A condition that happens quickly and may not last long.',
      category: 'general',
    },
    'benign': {
      term: 'Benign',
      simple: 'Not cancer',
      description: 'A growth that is not cancer and won\'t spread.',
      category: 'general',
    },
    'malignant': {
      term: 'Malignant',
      simple: 'Cancerous',
      description: 'A growth that is cancer and can spread to other parts of the body.',
      category: 'general',
    },
    'prognosis': {
      term: 'Prognosis',
      simple: 'Expected outcome',
      description: 'What doctors expect will happen with your condition.',
      category: 'general',
    },
    'contraindication': {
      term: 'Contraindication',
      simple: 'Reason not to use',
      description: 'A reason why a treatment or medicine shouldn\'t be used.',
      category: 'general',
    },
    'adverse reaction': {
      term: 'Adverse Reaction',
      simple: 'Bad side effect',
      description: 'An unwanted or harmful effect from a medicine or treatment.',
      category: 'general',
    },
    'prophylaxis': {
      term: 'Prophylaxis',
      simple: 'Prevention treatment',
      description: 'Treatment given to prevent a disease or condition.',
      category: 'general',
    },
  };
  
  /**
   * Get plain language version of a medical term
   */
  export function getSimpleTerm(term: string): string {
    const key = term.toLowerCase();
    return medicalTerms[key]?.simple || term;
  }
  
  /**
   * Get full medical term info
   */
  export function getMedicalTermInfo(term: string): MedicalTerm | null {
    const key = term.toLowerCase();
    return medicalTerms[key] || null;
  }
  
  /**
   * Replace medical terms in text with simple versions
   */
  export function simplifyMedicalText(text: string): string {
    let simplified = text;
    
    Object.entries(medicalTerms).forEach(([key, info]) => {
      // Case insensitive replacement
      const regex = new RegExp(`\\b${info.term}\\b`, 'gi');
      simplified = simplified.replace(regex, info.simple);
    });
    
    return simplified;
  }
  
  /**
   * Find medical terms in text that could use explanation
   */
  export function findMedicalTermsInText(text: string): MedicalTerm[] {
    const found: MedicalTerm[] = [];
    const lowerText = text.toLowerCase();
    
    Object.entries(medicalTerms).forEach(([key, info]) => {
      if (lowerText.includes(key) || lowerText.includes(info.term.toLowerCase())) {
        found.push(info);
      }
    });
    
    return found;
  }
  
  /**
   * Reading level helpers
   */
  export const readingLevelGuidelines = {
    targetGrade: 8,
    maxSentenceLength: 20,
    maxSyllablesPerWord: 3,
    tips: [
      'Use short sentences (under 20 words)',
      'Choose common words over medical jargon',
      'Explain numbers and measurements',
      'Use active voice ("Take this pill" not "This pill should be taken")',
      'Break complex ideas into simple steps',
    ],
  };
  
  export default medicalTerms;
  