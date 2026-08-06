import React, { useState, useEffect } from 'react';

// Custom high-contrast SVG phone icon
const PhoneIcon = () => (
  <svg className="w-6 h-6 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

// Translation Dictionary for static UI elements and voice speech templates
const languageDict = {
  English: {
    langCode: 'en-US',
    welcome: (name) => `Welcome, ${name}`,
    village: 'Village',
    house: 'House',
    createReminder: 'Create New Reminder',
    testBtn: 'Test',
    todayReminders: 'Medication Schedule',
    tapToCheck: 'Tap to check',
    addReminder: '＋ Add Reminder',
    closeForm: '✕ Close Form',
    pillName: 'Pill or Reminder Name',
    reminderTime: 'Reminder Time',
    saveReminder: 'Save Reminder',
    taken: 'TAKEN',
    pending: 'PENDING',
    waterTipTitle: '💧 Senior Water Safety Tip',
    waterTipBody: 'Always drink water only after boiling it for 10 minutes. Safe water protects you from diarrhea!',
    emergencyTitle: '⚠️ Press button below for health emergency ⚠️',
    callAsha: 'CALL ASHA DIDI',
    notified: 'Sunita Didi (ASHA) has been notified.',
    cancelAlert: 'Cancel Alert',
    bpPill: 'Blood Pressure Pill',
    multiCapsule: 'Multivitamin Capsule',
    pillAlertText: 'Time to Take Medicine!',
    prescribedAction: 'Prescribed Action',
    confirmTaken: '✓ Taken',
    placeholder: 'e.g. Diabetes Medicine',
    pillAlert: (name, time, userName) => `Hello ${userName}. It is ${time}. Please take your ${name} now.`,
    waterWarning: (userName) => `Alert. Water contamination warning detected in your block. Please do not drink tap water.`
  },
  Hindi: {
    langCode: 'hi-IN',
    welcome: (name) => `स्वागत है, ${name} जी`,
    village: 'गाँव',
    house: 'घर',
    createReminder: 'नया अनुस्मारक बनाएं',
    testBtn: 'जांचें',
    todayReminders: 'दवा की समय-सारणी',
    tapToCheck: 'मार्क करने के लिए टैप करें',
    addReminder: '＋ नई दवा जोड़ें',
    closeForm: '✕ फॉर्म बंद करें',
    pillName: 'दवा या अनुस्मारक का नाम',
    reminderTime: 'अनुस्मारक का समय',
    saveReminder: 'अनुस्मारक सहेजें',
    taken: 'ले ली',
    pending: 'बाकी है',
    waterTipTitle: '💧 वरिष्ठ नागरिक जल सुरक्षा सलाह',
    waterTipBody: 'हमेशा पानी को 10 मिनट तक उबालने के बाद ही पिएं। सुरक्षित पानी आपको दस्त से बचाता है!',
    emergencyTitle: '⚠️ स्वास्थ्य आपातकाल के लिए नीचे का बटन दबाएं ⚠️',
    callAsha: 'आशा दीदी को बुलाएं',
    notified: 'सुनीता दीदी (आशा) को सूचित कर दिया गया है।',
    cancelAlert: 'चेतावनी रद्द करें',
    bpPill: 'रक्तचाप की दवा',
    multiCapsule: 'मल्टीविटामिन कैप्सूल',
    pillAlertText: 'दवा लेने का समय हो गया!',
    prescribedAction: 'निर्धारित दवा',
    confirmTaken: '✓ ले ली',
    placeholder: 'जैसे: मधुमेह की दवा',
    pillAlert: (name, time, userName) => `नमस्ते ${userName} जी। ${time} हो गए हैं। कृपया अपनी दवा ${name} अभी ले लें।`,
    waterWarning: (userName) => `चेतावनी। आपके क्षेत्र में दूषित पानी की चेतावनी पाई गई है। कृपया नल का पानी न पीएं।`
  },
  Bengali: {
    langCode: 'bn-IN',
    welcome: (name) => `স্বাগতম, ${name} বাবু`,
    village: 'গ্রাম',
    house: 'বাড়ি',
    createReminder: 'নতুন অনুস্মারক তৈরি করুন',
    testBtn: 'পরীক্ষা',
    todayReminders: 'ওষুধের সময়সূচী',
    tapToCheck: 'চিহ্নিত করতে আলতো চাপুন',
    addReminder: '＋ অনুস্মারক যোগ করুন',
    closeForm: '✕ বন্ধ করুন',
    pillName: 'ওষুধের নাম',
    reminderTime: 'অনুস্মারকের সময়',
    saveReminder: 'সংরক্ষণ করুন',
    taken: 'খাওয়া হয়েছে',
    pending: 'বাকি আছে',
    waterTipTitle: '💧 প্রবীণ নাগরিকদের জল সুরক্ষা টিপস',
    waterTipBody: 'সবসময় জল ১০ মিনিট ফোটানোর পর পান করুন। নিরাপদ জল আপনাকে ডায়রিয়া থেকে রক্ষা করে!',
    emergencyTitle: '⚠️ স্বাস্থ্য জরুরি অবস্থার জন্য নীচের বোতামটি টিপুন ⚠️',
    callAsha: 'আশা দিদিকে কল করুন',
    notified: 'সুনীতা দিদি (আশা) কে জানানো হয়েছে।',
    cancelAlert: 'সতর্কতা বাতিল করুন',
    bpPill: 'রক্তচাপের ওষুধ',
    multiCapsule: 'মাল্টিভিটামিন ক্যাপসুল',
    pillAlertText: 'ওষুধ খাওয়ার সময় হয়েছে!',
    prescribedAction: 'প্রদত্ত ওষুধ',
    confirmTaken: '✓ খেয়েছি',
    placeholder: 'যেমন: ডায়াবেটিসের ওষুধ',
    pillAlert: (name, time, userName) => `নমস্কার ${userName} বাবু। এখন ${time}। দয়া করে আপনার ওষুধ ${name} খেয়ে নিন।`,
    waterWarning: (userName) => `সতর্কতা। আপনার এলাকায় দূষিত জলের সন্ধান মিলেছে। অনুগ্রহ করে কলের জল খাবেন না।`,
    // Devanagari phonetic transcription to let Hindi voice engine speak actual Bengali words if native voice is missing
    devaFallback: {
      pillAlert: (name, time, userName) => `नमस्कार ${userName} बाबू। एखोन ${time}। दया कोरे आपनार ओशुध ${name} खेये निन।`,
      waterWarning: (userName) => `सतोर्कोता। आपनार एलाकाय दूषित जलेर सन्ध्यान मिलेछे। अनुग्रहो कोरे कोलेर जॉल खाबेन ना।`
    }
  },
  Assamese: {
    langCode: 'as-IN',
    welcome: (name) => `স্বাগতম, ${name} ডাঙৰীয়া`,
    village: 'গাঁও',
    house: 'ঘৰ',
    createReminder: 'নতুন অনুস্মাৰক সৃষ্টি কৰক',
    testBtn: 'পৰীক্ষা',
    todayReminders: 'ঔষধৰ সময়সূচী',
    tapToCheck: 'চিহ্নিত কৰিবলৈ টিপক',
    addReminder: '＋ অনুস্মাৰক যোগ কৰক',
    closeForm: '✕ বন্ধ কৰক',
    pillName: 'ঔষধৰ নাম',
    reminderTime: 'অনুস্মাৰকৰ সময়',
    saveReminder: 'সংৰক্ষণ কৰক',
    taken: 'খোৱা হ’ল',
    pending: 'বাকী আছে',
    waterTipTitle: '💧 জ্যেষ্ঠ নাগৰিকৰ পানীৰ সুৰক্ষা দিহা',
    waterTipBody: 'সদায়ে পানী ১০ মিনিট উতলাইহে খাব। সুৰক্ষিত পানীয়ে আপোনাক ডায়েৰিয়াৰ পৰা বচাব!',
    emergencyTitle: '⚠️ স্বাস্থ্য জৰুৰীকালীন অৱস্থাৰ বাবে তলৰ বুটামটো টিপক ⚠️',
    callAsha: 'আশা দিদিক কল কৰক',
    notified: 'সুনীতা দিদিক (আশা) অৱগত কৰা হৈছে।',
    cancelAlert: 'সতৰ্কবাণী বাতিল কৰক',
    bpPill: 'ৰক্তচাপৰ ঔষধ',
    multiCapsule: 'মাল্টিভিটামিন কেপচুল',
    pillAlertText: 'ঔষধ গ্ৰহণৰ সময় হ’ল!',
    prescribedAction: 'প্ৰেছক্ৰিপশ্বন ঔষধ',
    confirmTaken: '✓ খালোঁ',
    placeholder: 'যেনে: ডায়েবেটিছৰ ঔষধ',
    pillAlert: (name, time, userName) => `নমস্কাৰ ${userName} ডাঙৰীয়া। এতিয়া ${time} বাজিছে। অনুগ্ৰহ কৰি আপোনাৰ ঔষধ ${name} এতিয়াই গ্ৰহণ কৰক।`,
    waterWarning: (userName) => `সতৰ্কবাণী। আপোনাৰ অঞ্চলত দূষিত পানী ধৰা পৰিছে। অনুগ্ৰহ কৰি টেপৰ পানী নাখাব।`,
    // Devanagari phonetic transcription to let Hindi voice engine speak actual Assamese words if native voice is missing
    devaFallback: {
      pillAlert: (name, time, userName) => `नमस्कार ${userName} डाङोरिया। एतिया ${time} बाजीछे। अनुग्रह कोरी आपोनार औषध ${name} एतियाई ग्रोहन कोरॉक।`,
      waterWarning: (userName) => `सतोर्कोबाणी। आपोनार ऑन्सोलोट दूषित पानी धोरा पोरीछे। अनुग्रह कोरी टेपोर पानी नाखाबो।`
    }
  },
  Khasi: {
    langCode: 'en-IN',
    welcome: (name) => `Khublei, ${name}`,
    village: 'Shnong',
    house: 'Iing',
    createReminder: 'Thoh Kynmaw Thymmai',
    testBtn: 'Shon Pyndep',
    todayReminders: 'Ryntih Dih Dawai',
    tapToCheck: 'Shon ban pyndep',
    addReminder: '＋ Pyniasoh',
    closeForm: '✕ Khang',
    pillName: 'Kyrteng ka Dawai',
    reminderTime: 'Ka Por Dih',
    saveReminder: 'Pynskhem Dawai',
    taken: 'Lah Dih',
    pending: 'Dang Ap',
    waterTipTitle: '💧 Jingmut halor ka Um',
    waterTipBody: 'Dih ia ka um tang hadien ba lah thnam da 10 minit. Ka um kaba bha ka iada na ka suhkhriat!',
    emergencyTitle: '⚠️ Shon ia kane ha ka por ba don jingma ia ka koit ka khiah ⚠️',
    callAsha: 'KONG ASHA DIDI',
    notified: 'Lah pyntip ia Kong Sunita Didi.',
    cancelAlert: 'Kynriah',
    bpPill: 'Dawai BP',
    multiCapsule: 'Dawai Multivitamin',
    pillAlertText: 'Ka por ban dih dawai!',
    prescribedAction: 'Ka Dawai prescribed',
    confirmTaken: '✓ Lah Dih',
    placeholder: 'e.g. Dawai Sugar',
    pillAlert: (name, time, userName) => `Khublei ${userName}. Lah poi ka por ${time}. Sngewbha dih ia ka dawai ${name} kham kloi.`,
    waterWarning: (userName) => `Sngewbha pyrshah! Ki don ki jingma ba pynjah ia ka um ha ka dong jong phi. Wat dih ia ka um tyndong.`
  },
  Mizo: {
    langCode: 'en-IN',
    welcome: (name) => `Chibai, ${name}`,
    village: 'Khua',
    house: 'In',
    createReminder: 'Siam Thar Na',
    testBtn: 'Fiahna',
    todayReminders: 'Damdawi Ei Huna Tur',
    tapToCheck: 'Hmet rawh le',
    addReminder: '＋ Dah belh na',
    closeForm: '✕ Kharkhung na',
    pillName: 'Damdawi Hming',
    reminderTime: 'Ei Hun Tur',
    saveReminder: 'Vawn that na',
    taken: 'EI TAWH',
    pending: 'EI LOH',
    waterTipTitle: '💧 Tui Thianghlim In Tur',
    waterTipBody: 'Tui in hmain minit sàwm tal chhum hlum ziah rawh. Tui thianghlim chuan thluak leh pum natna lakah a veng che.',
    emergencyTitle: '⚠️ Harsatna lian tham a awm chuan hmet rawh ⚠️',
    callAsha: 'ASHA DIDI KOP NA',
    notified: 'Sunita Didi hnenah hriattirna thawn a ni ta.',
    cancelAlert: 'Thulh leh na',
    bpPill: 'BP Damdawi',
    multiCapsule: 'Multivitamin Capsule',
    pillAlertText: 'Damdawi ei a hun ta!',
    prescribedAction: 'Damdawi pek che',
    confirmTaken: '✓ EI TAWH',
    placeholder: 'e.g. Zungthlum Damdawi',
    pillAlert: (name, time, userName) => `Chibai ${userName}. ${time} a ni tawh e. Khawngaihin i damdawi ${name} kha ei rawh le.`,
    waterWarning: (userName) => `Fimkhur rawh! In tui hnai ah hrik hlauhawm hmuh a ni. Khawngaihin tui pipe in suh.`
  },
  Bodo: {
    langCode: 'hi-IN',
    welcome: (name) => `खुलुमबाय, ${name}`,
    village: 'गामि',
    house: 'नो',
    createReminder: 'गोदान मलि थिननाय',
    testBtn: 'आनजाद',
    todayReminders: 'औषधनि समयसूची',
    tapToCheck: 'मार्क खालामनो थाखाय थु',
    addReminder: '＋ गोदान मलि थिन',
    closeForm: '✕ बन्द खालाम',
    pillName: 'मलि नि मुं',
    reminderTime: 'मलि लानो समय',
    saveReminder: 'मलि दोनथुम',
    taken: 'जाबाय',
    pending: 'जानाय नङा',
    waterTipTitle: '💧 जारिमिन दै सांग्रांथि',
    waterTipBody: 'सावधान! नोंथांनि ओनसोलआव दै उबालनानैसो लोंनांगौ। उबालनाय दैआ नोंथांखौ बेमारनिफ्राय रैखा खालामगोन।',
    emergencyTitle: '⚠️ आपतकालिन समयआव गाहायनि बुटम थु ⚠️',
    callAsha: 'आशा दीदी खौ बुंहर',
    notified: 'सुनीता दीदी (आशा) नो खौरां हरबाय।',
    cancelAlert: 'बातिल खालाम',
    bpPill: 'रक्तचापनि मुलि',
    multiCapsule: 'मल्टीविटामिन केपसुल',
    pillAlertText: 'मलि लानो समय जाबाय!',
    prescribedAction: 'मुंगख्लि मलि',
    confirmTaken: '✓ जाबाय',
    placeholder: 'जैरे: डायबिटिस मलि',
    pillAlert: (name, time, userName) => `खुलुमबाय ${userName} जी। ${time} जाबाय। अननानैनो नोंथांनि मुलि ${name} खौ एबा लानो जाबाय।`,
    waterWarning: (userName) => `सावधान। नोंथांनि ओनसोलआव गाज्रि दैनि सांग्रांथि मोननाय जादों। अननानैनो टेपनि दैखौ दा लोङो।`
  }
};

// Dynamic Transliteration/Translation map for user inputs (usernames, custom entries, village names)
const termTranslations = {
  English: {
    "diabetes medication": "Diabetes medication",
    "diabetes medicine": "Diabetes medicine",
    "diabetes": "Diabetes",
    "punit": "Punit",
    "ramdas": "Ramdas",
    "prasad": "Prasad",
    "ramdas prasad": "Ramdas Prasad",
    "water": "Water",
    "medicine": "Medicine",
    "lower subansiri": "Lower Subansiri",
    "subansiri": "Subansiri",
    "namsai": "Namsai",
    "bordumsa": "Bordumsa",
    "dhemaji": "Dhemaji",
    "lohit": "Lohit",
    "haroa": "Haroa",
    "pasighat": "Pasighat"
  },
  Hindi: {
    "diabetes medication": "मधुमेह की दवा",
    "diabetes medicine": "मधुमेह की दवा",
    "diabetes": "मधुमेह",
    "punit": "पुनीत",
    "ramdas": "रामदास",
    "prasad": "प्रसाद",
    "ramdas prasad": "रामदास प्रसाद",
    "water": "पानी",
    "medicine": "दवा",
    "lower subansiri": "लोअर सुबनसिरी",
    "subansiri": "सुबनसिरी",
    "namsai": "नामसाई",
    "bordumsa": "बोरडुमसा",
    "dhemaji": "धेमाजी",
    "lohit": "लोहित",
    "haroa": "हरोआ",
    "pasighat": "पासीघाट"
  },
  Bengali: {
    "diabetes medication": "ডায়াবেটিসের ওষুধ",
    "diabetes medicine": "ডায়াবেটিসের ওষুধ",
    "diabetes": "ডায়াবেটিস",
    "punit": "পুনীত",
    "ramdas": "রামদাস",
    "prasad": "প্রসাদ",
    "ramdas prasad": "রামদাস প্রসাদ",
    "water": "জল",
    "medicine": "ওষুধ",
    "lower subansiri": "লোয়ার সুবনসিরি",
    "subansiri": "সুবনসিরি",
    "namsai": "নামসাই",
    "bordumsa": "বোরডুমসা",
    "dhemaji": "ধেমাজি",
    "lohit": "লোহিত",
    "haroa": "হারোয়া",
    "pasighat": "পাসিঘাট"
  },
  Assamese: {
    "diabetes medication": "ডায়েবেটিছৰ ঔষধ",
    "diabetes medicine": "ডায়েবেটিছৰ ঔষধ",
    "diabetes": "ডায়েবেটিছ",
    "punit": "পুনীত",
    "ramdas": "ৰামদাস",
    "prasad": "প্ৰসাদ",
    "ramdas prasad": "ৰামদাস প্ৰসাদ",
    "water": "পানী",
    "medicine": "ঔষধ",
    "lower subansiri": "নামনি সোৱণশিৰি",
    "subansiri": "সোৱণশিৰি",
    "namsai": "নামছাই",
    "bordumsa": "বৰডুমচা",
    "dhemaji": "ধেমাছী",
    "lohit": "লোহিত",
    "haroa": "হাৰোৱา",
    "pasighat": "পাছিঘাট"
  },
  Khasi: {
    "diabetes medication": "Dawai Sugar",
    "diabetes medicine": "Dawai Sugar",
    "diabetes": "Dawai Sugar",
    "punit": "Punit",
    "ramdas": "Ramdas",
    "prasad": "Prasad",
    "ramdas prasad": "Ramdas Prasad",
    "water": "Um",
    "medicine": "Dawai",
    "lower subansiri": "Lower Subansiri",
    "subansiri": "Subansiri",
    "namsai": "Namsai",
    "bordumsa": "Bordumsa",
    "dhemaji": "Dhemaji",
    "lohit": "Lohit",
    "haroa": "Haroa",
    "pasighat": "Pasighat"
  },
  Mizo: {
    "diabetes medication": "Zungthlum Damdawi",
    "diabetes medicine": "Zungthlum Damdawi",
    "diabetes": "Zungthlum",
    "punit": "Punit",
    "ramdas": "Ramdas",
    "prasad": "Prasad",
    "ramdas prasad": "Ramdas Prasad",
    "water": "Tui",
    "medicine": "Damdawi",
    "lower subansiri": "Lower Subansiri",
    "subansiri": "Subansiri",
    "namsai": "Namsai",
    "bordumsa": "Bordumsa",
    "dhemaji": "Dhemaji",
    "lohit": "Lohit",
    "haroa": "Haroa",
    "pasighat": "Pasighat"
  },
  Bodo: {
    "diabetes medication": "डायबिटिस मलि",
    "diabetes medicine": "डायबिटिस मलि",
    "diabetes": "डायबिटिस",
    "punit": "पुनीत",
    "ramdas": "रामदास",
    "prasad": "प्रसाद",
    "ramdas prasad": "रामदास प्रसाद",
    "water": "दै",
    "medicine": "मलि",
    "lower subansiri": "लोअर सुबनसिरी",
    "subansiri": "सुबनसिरी",
    "namsai": "नामसाई",
    "bordumsa": "बोरडुमसा",
    "dhemaji": "धेमाजी",
    "lohit": "लोहित",
    "haroa": "हरोआ",
    "pasighat": "पासीघाट"
  }
};

export default function ElderlyView({ addToast, currentUser }) {
  // Active page display language (defaults to user signup language config)
  const [localLang, setLocalLang] = useState(currentUser?.language || 'English');

  // Sync state language preference when user credentials change
  useEffect(() => {
    if (currentUser?.language) {
      setLocalLang(currentUser.language);
    }
  }, [currentUser]);

  // Pre-load voices on mount to ensure speechSynthesis registry is ready
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  // Interactive reminders list state (with alerted tracker)
  const [reminders, setReminders] = useState([
    { id: 1, time: "10:00 AM", name: "Blood Pressure Pill", nameKey: "bpPill", completed: false, alerted: false },
    { id: 2, time: "08:00 PM", name: "Multivitamin Capsule", nameKey: "multiCapsule", completed: false, alerted: false }
  ]);

  // SOS Emergency Trigger
  const [sosActive, setSosActive] = useState(false);

  // Form states to add new reminders
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminderName, setNewReminderName] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('');

  // Active alarm modal state
  const [activeAlarm, setActiveAlarm] = useState(null);

  // Retrieve translation configs based on active language setting
  const t = languageDict[localLang] || languageDict.English;

  // Intercept and translate custom inputs (usernames, custom reminders, village names)
  const translateText = (text) => {
    if (!text) return '';
    const lowerText = text.toLowerCase().trim();
    const activeDict = termTranslations[localLang] || termTranslations.English;
    
    // 1. Direct match check
    if (activeDict[lowerText]) {
      return activeDict[lowerText];
    }
    
    // 2. Substring replace check (case-insensitive keyword matching)
    let translated = text;
    Object.keys(activeDict).forEach((key) => {
      if (lowerText.includes(key)) {
        const regex = new RegExp(key, 'gi');
        translated = translated.replace(regex, activeDict[key]);
      }
    });
    
    return translated;
  };

  // Safe Speech Synthesizer engine with cross-dialect and multilingual fallback logic
  const speakText = (textToSpeak, targetLangCode, fallbackTexts, targetLangDict) => {
    if (!('speechSynthesis' in window)) return;

    // 1. Instantly clear any pending cues in browser buffer queue
    window.speechSynthesis.cancel();

    // 2. Retrieve system voice profiles
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;

    // 3. Dialogue-Script Candidate List
    // For Assamese ('as'), search for 'as' first, but fallback to Bengali 'bn' since they share the same alphabet script
    let langCandidates = [targetLangCode.split('-')[0].toLowerCase()];
    if (targetLangCode === 'as-IN') {
      langCandidates.push('bn'); // Add Bengali as a dialect phonetic proxy
    }

    // 4. Voice lookup
    for (let prefix of langCandidates) {
      selectedVoice = voices.find(v => v.lang.toLowerCase() === targetLangCode.toLowerCase() || v.lang.toLowerCase().startsWith(prefix));
      if (selectedVoice) break;
    }

    // 5. Initialize synthesis utterance
    const utterance = new SpeechSynthesisUtterance();

    if (selectedVoice) {
      // OS has native voice or dialect proxy (e.g. Bengali voice reads Assamese text)
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
      utterance.text = textToSpeak;
    } else {
      // OS is completely missing target voice
      // For Hindi, Bengali (fallback Devanagari), and Assamese (fallback Devanagari), try speaking Devanagari using Hindi voice!
      const hasDevaFallback = targetLangDict && targetLangDict.devaFallback;
      const hindiVoice = voices.find(v => v.lang.toLowerCase().startsWith('hi'));
      
      if (hasDevaFallback && hindiVoice) {
        utterance.voice = hindiVoice;
        utterance.lang = hindiVoice.lang;
        
        // Find which alarm we are speaking to trigger Devanagari text representation
        if (textToSpeak.includes('Alert') || textToSpeak.includes('সতৰ্কবাণী') || textToSpeak.includes('সতর্কতা')) {
          utterance.text = targetLangDict.devaFallback.waterWarning(translateText(currentUser?.name || 'Ramdas Prasad'));
        } else {
          // Pill alert (find current active alarm name)
          const alarmName = activeAlarm ? (activeAlarm.nameKey ? t[activeAlarm.nameKey] : translateText(activeAlarm.name)) : t.bpPill;
          utterance.text = targetLangDict.devaFallback.pillAlert(alarmName, getFormattedCurrentTime(), translateText(currentUser?.name || 'Ramdas Prasad'));
        }
        console.warn(`Speech falling back to Hindi Phonetics for ${localLang}`);
      } else {
        // Ultimate Fallback: Use English voice, speaking the English translation
        const englishVoice = voices.find(v => v.lang.toLowerCase().startsWith('en'));
        if (englishVoice) {
          utterance.voice = englishVoice;
          utterance.lang = englishVoice.lang;
        }
        utterance.text = fallbackTexts.English;
        console.warn(`Speech falling back to English (OS lacks native ${localLang} voice pack)`);
      }
    }

    // 6. Play vocal alert
    window.speechSynthesis.speak(utterance);
  };

  // Helper: Convert 24h browser time input (e.g. "14:30") to 12h format ("02:30 PM")
  const convert24hTo12h = (time24) => {
    if (!time24) return '';
    const [hoursStr, minutesStr] = time24.split(':');
    let hours = parseInt(hoursStr);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // hour '0' should be '12'
    return `${hours.toString().padStart(2, '0')}:${minutesStr} ${ampm}`;
  };

  // Helper: Format current date to match "HH:MM AM/PM" format
  const getFormattedCurrentTime = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    const strHours = hours < 10 ? '0' + hours : hours;
    return `${strHours}:${strMinutes} ${ampm}`;
  };

  // Time Checker Loop Effect
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimeStr = getFormattedCurrentTime();
      
      reminders.forEach((rem) => {
        if (rem.time === currentTimeStr && !rem.completed && !rem.alerted) {
          setActiveAlarm(rem);
          setReminders(prev => prev.map(r => r.id === rem.id ? { ...r, alerted: true } : r));
          
          const rawUserName = currentUser?.name || 'Ramdas Prasad';
          const userNameTranslated = translateText(rawUserName);
          const pillDisplayNameTranslated = rem.nameKey ? t[rem.nameKey] : translateText(rem.name);
          
          // Target speech content (Native translation)
          const nativeSpeechContent = t.pillAlert(pillDisplayNameTranslated, rem.time, userNameTranslated);
          
          // Fallbacks translations database mapping
          const fallbackTexts = {
            English: languageDict.English.pillAlert(
              rem.nameKey ? languageDict.English[rem.nameKey] : rem.name, 
              rem.time, 
              rawUserName
            ),
            Hindi: languageDict.Hindi.pillAlert(
              rem.nameKey ? languageDict.Hindi[rem.nameKey] : translateText(rem.name), 
              rem.time, 
              translateText(rawUserName)
            )
          };
          
          // Determine if target language is Latin-based (English, Khasi, Mizo)
          const isLatin = localLang === 'English' || localLang === 'Khasi' || localLang === 'Mizo';
          
          // For Latin script, fallback is the native text itself
          const finalFallbackTexts = {
            English: isLatin ? nativeSpeechContent : fallbackTexts.English,
            Hindi: isLatin ? nativeSpeechContent : fallbackTexts.Hindi
          };
          
          speakText(nativeSpeechContent, t.langCode, finalFallbackTexts, t);
          addToast(`🚨 Medication Alert: Time to take ${rem.nameKey ? t[rem.nameKey] : translateText(rem.name)}!`);
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [reminders, currentUser, addToast, t, localLang]);

  const toggleReminder = (id) => {
    setReminders(prev =>
      prev.map(rem => {
        if (rem.id === id) {
          const newState = !rem.completed;
          if (newState) {
            addToast(`💊 Marked "${rem.nameKey ? t[rem.nameKey] : translateText(rem.name)}" as taken.`);
          }
          return { ...rem, completed: newState };
        }
        return rem;
      })
    );
  };

  // Handle adding new custom reminder
  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminderName.trim() || !newReminderTime) return;

    const formattedTime = convert24hTo12h(newReminderTime);
    
    const newRem = {
      id: Date.now(),
      time: formattedTime,
      name: newReminderName,
      completed: false,
      alerted: false
    };

    setReminders([...reminders, newRem]);
    addToast(`📅 Added reminder for ${newReminderName} at ${formattedTime}`);
    
    // Reset Form
    setNewReminderName('');
    setNewReminderTime('');
    setShowAddForm(false);
  };

  const handleEmergencySOS = () => {
    alert("Emergency Alert sent to nearest ASHA Worker!");
    setSosActive(true);
    addToast(`🆘 EMERGENCY SOS broadcast sent! ${t.notified}`);
  };

  // Helper to trigger demo alert in preferred regional language
  const triggerDemoAlert = () => {
    const demoRem = {
      id: 999,
      time: getFormattedCurrentTime(),
      name: t.bpPill,
      completed: false,
      alerted: true
    };
    
    setActiveAlarm(demoRem);
    
    const rawUserName = currentUser?.name || 'Ramdas Prasad';
    const userNameTranslated = translateText(rawUserName);
    
    const nativeSpeechContent = t.waterWarning(userNameTranslated);
    const fallbackTexts = {
      English: languageDict.English.waterWarning(rawUserName),
      Hindi: languageDict.Hindi.waterWarning(translateText(rawUserName))
    };
    
    const isLatin = localLang === 'English' || localLang === 'Khasi' || localLang === 'Mizo';
    const finalFallbackTexts = {
      English: isLatin ? nativeSpeechContent : fallbackTexts.English,
      Hindi: isLatin ? nativeSpeechContent : fallbackTexts.Hindi
    };
    
    speakText(nativeSpeechContent, t.langCode, finalFallbackTexts, t);
    addToast(`🔔 Simulating immediate alert in ${localLang}!`);
  };

  return (
    <div className="flex flex-col space-y-6 pb-20 text-slate-950 font-sans max-w-lg mx-auto relative">
      
      {/* 1. Welcome Card Header */}
      <header className="bg-amber-50/50 border border-amber-300 p-5 rounded-xl text-slate-950 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <span>👴</span> {t.welcome(translateText(currentUser?.name || 'Ramdas Prasad'))}
          </h1>
          <p className="text-sm font-bold text-slate-700 mt-1">
            {t.village}: {translateText(currentUser?.village || 'Lower Subansiri')} | {t.house} #42
          </p>
        </div>
        
        {/* Dynamic Translation Selector & TTS Test */}
        <div className="flex items-center gap-2">
          <select
            value={localLang}
            onChange={(e) => {
              setLocalLang(e.target.value);
              addToast(`🌐 Translate UI: ${e.target.value}`);
            }}
            className="text-xs font-bold border border-slate-300 rounded px-2 py-1.5 bg-white text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="English">English</option>
            <option value="Hindi">हिन्दी</option>
            <option value="Bengali">বাংলা</option>
            <option value="Assamese">অসমীয়া</option>
            <option value="Khasi">Khasi</option>
            <option value="Mizo">Mizo</option>
            <option value="Bodo">बोडो</option>
          </select>

          <button
            onClick={triggerDemoAlert}
            className="text-[10px] bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-600 px-2 py-1.5 rounded-lg font-bold transition-all active:scale-95"
            title={`Click to test TTS speech in ${localLang}`}
          >
            🔊 {t.testBtn}
          </button>
        </div>
      </header>

      {/* 2. Medication Reminders Panel */}
      <section className="bg-white border border-emerald-500 rounded-xl p-5 space-y-4">
        <div className="border-b border-emerald-100 pb-2 flex justify-between items-center">
          <h2 className="text-lg font-black text-emerald-900 flex items-center gap-2">
            <span>📅 {t.todayReminders}</span>
          </h2>
          <span className="text-[10px] font-bold text-slate-400">{t.tapToCheck}</span>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-xs font-black text-blue-600 hover:underline flex items-center gap-1 focus:outline-none"
          >
            {showAddForm ? t.closeForm : t.addReminder}
          </button>
        </div>

        {/* Dynamic New Reminder Input Form */}
        {showAddForm && (
          <form onSubmit={handleAddReminder} className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">{t.createReminder}</h3>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-600">{t.pillName}</label>
              <input
                type="text"
                required
                placeholder={t.placeholder}
                value={newReminderName}
                onChange={(e) => setNewReminderName(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-600">{t.reminderTime}</label>
              <input
                type="time"
                required
                value={newReminderTime}
                onChange={(e) => setNewReminderTime(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-bold transition-all"
            >
              {t.saveReminder}
            </button>
          </form>
        )}

        {/* Reminders List */}
        <div className="space-y-3">
          {reminders.map((rem) => (
            <button
              key={rem.id}
              onClick={() => toggleReminder(rem.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between min-h-[64px] ${
                rem.completed 
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 line-through opacity-70' 
                  : 'bg-amber-50/40 border-amber-200 text-slate-950 hover:border-slate-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-md border flex items-center justify-center font-bold text-sm ${
                  rem.completed ? 'bg-emerald-600 border-emerald-700 text-white' : 'border-slate-800 bg-white'
                }`}>
                  {rem.completed ? '✓' : ''}
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase text-slate-500">{rem.time}</span>
                  <span className="text-base font-black text-slate-950">
                    {rem.nameKey ? t[rem.nameKey] : translateText(rem.name)}
                  </span>
                </div>
              </div>
              
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                rem.completed 
                  ? 'bg-emerald-200 border-emerald-300 text-emerald-800' 
                  : 'bg-amber-200 border-amber-300 text-amber-900'
              }`}>
                {rem.completed ? t.taken : t.pending}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Water Health Tip */}
      <section className="bg-blue-50/50 border border-blue-200 p-4 rounded-xl text-slate-950">
        <h3 className="text-base font-black text-blue-900">{t.waterTipTitle}</h3>
        <p className="text-sm font-bold text-slate-700 mt-1">
          {t.waterTipBody}
        </p>
      </section>

      {/* Emergency SOS Call Panel */}
      <section className="flex flex-col items-center justify-center pt-4 space-y-4 w-full">
        <p className="text-xs font-bold text-rose-700 uppercase tracking-widest text-center">
          {t.emergencyTitle}
        </p>
        
        <button
          onClick={handleEmergencySOS}
          className="w-full h-16 bg-rose-600 hover:bg-rose-700 text-white font-black text-lg rounded-xl flex items-center justify-center transition-all tactile-btn border border-rose-700"
        >
          <PhoneIcon />
          <span>{t.callAsha}</span>
        </button>
 
        {sosActive && (
          <div className="bg-rose-50 border border-rose-300 p-4 rounded-xl text-center text-rose-900 font-bold mt-2 w-full">
            🚑 {t.notified}
            <button 
              onClick={() => setSosActive(false)} 
              className="block mx-auto mt-1 text-xs text-rose-700 underline font-bold"
            >
              {t.cancelAlert}
            </button>
          </div>
        )}
      </section>

      {/* Active Alarm Reminder Modal Overlay */}
      {activeAlarm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-sm rounded-xl border border-rose-500 p-6 space-y-5 text-center shadow-lg">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-4xl">🚨</span>
              <h3 className="text-xl font-black text-rose-900 uppercase tracking-tight">
                {t.pillAlertText}
              </h3>
              <p className="text-sm text-slate-500 font-semibold">{activeAlarm.time}</p>
            </div>
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-lg">
              <span className="block text-xs font-bold text-slate-500 uppercase">
                {t.prescribedAction}
              </span>
              <span className="text-lg font-black text-rose-950 mt-1 block">
                {activeAlarm.nameKey ? t[activeAlarm.nameKey] : translateText(activeAlarm.name)}
              </span>
            </div>
            <button
              onClick={() => {
                toggleReminder(activeAlarm.id);
                setActiveAlarm(null);
                if ('speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
              }}
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-lg font-black transition-all flex items-center justify-center"
            >
              {t.confirmTaken}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
