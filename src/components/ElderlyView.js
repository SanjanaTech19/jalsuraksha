import React, { useState, useEffect } from 'react';

// Custom inline SVG icons
const PhoneIcon = () => (
  <svg className="w-6 h-6 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const PillIcon = () => (
  <svg className="w-5 h-5 text-emerald-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a6.5 6.5 0 00-9.192-9.192l-2.02 2.02 9.192 9.192 2.02-2.02z" />
  </svg>
);

const WaterIcon = () => (
  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-5 h-5 text-rose-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

// Translation Dictionary for static UI elements, native voice speech templates, and Romanized Phonetic Fallbacks
const languageDict = {
  English: {
    langCode: 'en-US',
    welcome: (name) => `Welcome, ${name}`,
    village: 'Village',
    house: 'House',
    createReminder: 'Create New Reminder',
    testBtn: 'Test Voice Alert',
    todayReminders: 'Medication Schedule',
    tapToCheck: 'Tap to check',
    addReminder: '＋ Add Reminder',
    closeForm: '✕ Close Form',
    pillName: 'Pill or Reminder Name',
    reminderTime: 'Reminder Time',
    saveReminder: 'Save Reminder',
    taken: 'TAKEN',
    pending: 'PENDING',
    waterTipTitle: '💧 Senior Water Safety Alert',
    waterTipBody: 'Warning: Water contamination detected in your block. Boil water for 10 minutes before drinking.',
    emergencyTitle: '⚠️ Press button below for health emergency ⚠️',
    callAsha: 'CALL ASHA DIDI (SUNITA DEVI)',
    notified: 'Sunita Didi (ASHA) and District Command Room notified.',
    cancelAlert: 'Cancel Emergency Alert',
    bpPill: 'Blood Pressure Pill',
    multiCapsule: 'Multivitamin Capsule',
    pillAlertText: 'Time to Take Medicine!',
    prescribedAction: 'Prescribed Action',
    confirmTaken: '✓ Taken',
    placeholder: 'e.g. Diabetes Medicine',
    pillAlert: (name, time, userName) => `Hello ${userName}. It is ${time}. Please take your ${name} now.`,
    waterWarning: (userName) => `Alert. Water contamination warning detected in your block. Please do not drink tap water.`,
    romanAlert: (name, time, userName) => `Hello ${userName}. It is ${time}. Please take your ${name} now.`,
    romanWaterWarning: (userName) => `Alert. Water contamination warning detected in your block. Please do not drink tap water.`
  },
  Hindi: {
    langCode: 'hi-IN',
    welcome: (name) => `स्वागत है, ${name} जी`,
    village: 'गाँव',
    house: 'घर',
    createReminder: 'नया अनुस्मारक बनाएं',
    testBtn: 'आवाज़ जांचें',
    todayReminders: 'दवा की समय-सारणी',
    tapToCheck: 'मार्क करने के लिए टैप करें',
    addReminder: '＋ नई दवा जोड़ें',
    closeForm: '✕ फॉर्म बंद करें',
    pillName: 'दवा या अनुस्मारक का नाम',
    reminderTime: 'अनुस्मारक का समय',
    saveReminder: 'अनुस्मारक सहेजें',
    taken: 'ले ली',
    pending: 'बाकी है',
    waterTipTitle: '💧 वरिष्ठ नागरिक जल सुरक्षा चेतावनी',
    waterTipBody: 'चेतावनी: आपके क्षेत्र में दूषित पानी की सूचना मिली है। पीने से पहले पानी को 10 मिनट तक उबालें।',
    emergencyTitle: '⚠️ स्वास्थ्य आपातकाल के लिए नीचे का बटन दबाएं ⚠️',
    callAsha: 'आशा दीदी को बुलाएं (सुनीता दीदी)',
    notified: 'सुनीता दीदी (आशा) और जिला नियंत्रण कक्ष को सूचित कर दिया गया है।',
    cancelAlert: 'चेतावनी रद्द करें',
    bpPill: 'रक्तचाप की दवा',
    multiCapsule: 'मल्टीविटामिन कैप्सूल',
    pillAlertText: 'दवा लेने का समय हो गया!',
    prescribedAction: 'निर्धारित दवा',
    confirmTaken: '✓ ले ली',
    placeholder: 'जैसे: मधुमेह की दवा',
    pillAlert: (name, time, userName) => `नमस्ते ${userName} जी। ${time} हो गए हैं। कृपया अपनी दवा ${name} अभी ले लें।`,
    waterWarning: (userName) => `चेतावनी। आपके क्षेत्र में दूषित पानी की चेतावनी पाई गई है। कृपया नल का पानी न पीएं।`,
    romanAlert: (name, time, userName) => `Namaste ${userName} ji. ${time} ho gaye hain. Kripya apni dava ${name} abhi le lein.`,
    romanWaterWarning: (userName) => `Chetavani! Aapke kshetra mein dooshit paani ki chetavani paai gayi hai. Kripya nal ka paani na peeyein.`
  },
  Bengali: {
    langCode: 'bn-IN',
    welcome: (name) => `স্বাগতম, ${name} বাবু`,
    village: 'গ্রাম',
    house: 'বাড়ি',
    createReminder: 'নতুন অনুস্মারক তৈরি করুন',
    testBtn: 'ভয়েস পরীক্ষা',
    todayReminders: 'ওষুধের সময়সূচী',
    tapToCheck: 'চিহ্নিত করতে আলতো চাপুন',
    addReminder: '＋ অনুস্মারক যোগ করুন',
    closeForm: '✕ বন্ধ করুন',
    pillName: 'ওষুধের নাম',
    reminderTime: 'অনুস্মারকের সময়',
    saveReminder: 'সংরক্ষণ করুন',
    taken: 'খাওয়া হয়েছে',
    pending: 'বাকি আছে',
    waterTipTitle: '💧 প্রবীণ নাগরিকদের জল সুরক্ষা সতর্কতা',
    waterTipBody: 'সতর্কতা: আপনার এলাকায় দূষিত জলের সন্ধান মিলেছে। পান করার আগে ১০ মিনিট জল ফুটিয়ে নিন।',
    emergencyTitle: '⚠️ স্বাস্থ্য জরুরি অবস্থার জন্য নীচের বোতামটি টিপুন ⚠️',
    callAsha: 'আশা দিদিকে কল করুন (সুনীতা দিদি)',
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
    romanAlert: (name, time, userName) => `Nomoshkar ${userName} babu. Ekhon ${time}. Daya kore apnar oshudh ${name} kheye nin.`,
    romanWaterWarning: (userName) => `Sotorkota! Apnar elakay dushito joler shondhan mileche. Anugroh kore koler jol khaben na.`
  },
  Assamese: {
    langCode: 'as-IN',
    welcome: (name) => `স্বাগতম, ${name} ডাঙৰীয়া`,
    village: 'গাঁও',
    house: 'ঘৰ',
    createReminder: 'নতুন অনুস্মাৰক সৃষ্টি কৰক',
    testBtn: 'ভয়েচ পৰীক্ষা',
    todayReminders: 'ঔষধৰ সময়সূচী',
    tapToCheck: 'চিহ্নিত কৰিবলৈ টিপক',
    addReminder: '＋ অনুস্মাৰক যোগ কৰক',
    closeForm: '✕ বন্ধ কৰক',
    pillName: 'ঔষধৰ নাম',
    reminderTime: 'অনুস্মাৰকৰ সময়',
    saveReminder: 'সংৰক্ষণ কৰক',
    taken: 'খোৱা হ’ল',
    pending: 'বাকী আছে',
    waterTipTitle: '💧 জ্যেষ্ঠ নাগৰিকৰ পানীৰ সুৰক্ষা সতৰ্কবাণী',
    waterTipBody: 'সতৰ্কবাণী: আপোনাৰ অঞ্চলত দূষিত পানী ধৰা পৰিছে। খোৱাৰ আগতে পানী ১০ মিনিট উতলাই লব।',
    emergencyTitle: '⚠️ স্বাস্থ্য জৰুৰীকালীন অৱস্থাৰ বাবে তলৰ বুটামটো টিপক ⚠️',
    callAsha: 'আশা দিদিক কল কৰক (সুনীতা দিদি)',
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
    romanAlert: (name, time, userName) => `Nomoskar ${userName} dangoriya. Etiya ${time} bajise. Anugrah kori aponar oushodh ${name} etiyai grohon korok.`,
    romanWaterWarning: (userName) => `Sotorkobani! Aponar onsolot dushito pani dhora porise. Anugrah kori tepor pani nakhabo.`
  },
  Khasi: {
    langCode: 'en-IN',
    welcome: (name) => `Khublei, ${name}`,
    village: 'Shnong',
    house: 'Iing',
    createReminder: 'Thoh Kynmaw Thymmai',
    testBtn: 'Test Voice Alert',
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
    waterWarning: (userName) => `Sngewbha pyrshah! Ki don ki jingma ba pynjah ia ka um ha ka dong jong phi. Wat dih ia ka um tyndong.`,
    romanAlert: (name, time, userName) => `Khublei ${userName}. Lah poi ka por ${time}. Sngewbha dih ia ka dawai ${name} kham kloi.`,
    romanWaterWarning: (userName) => `Sngewbha pyrshah! Ki don ki jingma ba pynjah ia ka um ha ka dong jong phi. Wat dih ia ka um tyndong.`
  },
  Mizo: {
    langCode: 'en-IN',
    welcome: (name) => `Chibai, ${name}`,
    village: 'Khua',
    house: 'In',
    createReminder: 'Siam Thar Na',
    testBtn: 'Test Voice Alert',
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
    waterWarning: (userName) => `Fimkhur rawh! In tui hnai ah hrik hlauhawm hmuh a ni. Khawngaihin tui pipe in suh.`,
    romanAlert: (name, time, userName) => `Chibai ${userName}. ${time} a ni tawh e. Khawngaihin i damdawi ${name} kha ei rawh le.`,
    romanWaterWarning: (userName) => `Fimkhur rawh! In tui hnai ah hrik hlauhawm hmuh a ni. Khawngaihin tui pipe in suh.`
  },
  Bodo: {
    langCode: 'hi-IN',
    welcome: (name) => `खुलुमबाय, ${name}`,
    village: 'गामि',
    house: 'नो',
    createReminder: 'गोदान मलि थिननाय',
    testBtn: 'आवाज़ जांचें',
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
    waterWarning: (userName) => `सावधान। नोंथांनि ओनसोलआव गाज्रि दैनि सांग्रांथि मोननाय जादों। अननानैनो टेपनि दैखौ दा लोङो।`,
    romanAlert: (name, time, userName) => `Khulumbai ${userName} ji. ${time} jabai. Annanaino nongthangni mulhi ${name} khao lano jabai.`,
    romanWaterWarning: (userName) => `Savadhan! Nongthangni onsolao gajri daini sangranthi monnay jadong. Annanaino tepni daikhou da longo.`
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
    "haroa": "হাৰোৱা",
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

export default function ElderlyView({ addToast, currentUser, subTab = 'meds', setParentActiveTab }) {
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

  // Interactive reminders list state (with alerted tracker & refill status)
  const [reminders, setReminders] = useState([
    { id: 1, time: "10:00 AM", name: "Blood Pressure Pill", nameKey: "bpPill", completed: false, alerted: false, pillsLeft: 12, dosage: "1 Tablet after breakfast" },
    { id: 2, time: "08:00 PM", name: "Multivitamin Capsule", nameKey: "multiCapsule", completed: false, alerted: false, pillsLeft: 24, dosage: "1 Capsule with water" }
  ]);

  // Boiling Water Countdown Timer Feature (10 Minutes = 600s)
  const [boilTimerSeconds, setBoilTimerSeconds] = useState(600);
  const [boilTimerActive, setBoilTimerActive] = useState(false);

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
    
    if (activeDict[lowerText]) {
      return activeDict[lowerText];
    }
    
    let translated = text;
    Object.keys(activeDict).forEach((key) => {
      if (lowerText.includes(key)) {
        const regex = new RegExp(key, 'gi');
        translated = translated.replace(regex, activeDict[key]);
      }
    });
    
    return translated;
  };

  // Multilingual Speech Synthesizer
  const speakText = (nativeText, targetLangCode, romanText) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;

    let langCandidates = [targetLangCode.split('-')[0].toLowerCase()];
    if (targetLangCode === 'as-IN') {
      langCandidates.push('bn');
    }

    for (let prefix of langCandidates) {
      selectedVoice = voices.find(v => v.lang.toLowerCase() === targetLangCode.toLowerCase() || v.lang.toLowerCase().startsWith(prefix));
      if (selectedVoice) break;
    }

    const utterance = new SpeechSynthesisUtterance();

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
      utterance.text = nativeText;
    } else {
      const defaultVoice = voices.find(v => v.lang.toLowerCase().startsWith('en')) || (voices.length > 0 ? voices[0] : null);
      if (defaultVoice) {
        utterance.voice = defaultVoice;
        utterance.lang = defaultVoice.lang;
      }
      utterance.text = romanText || nativeText;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Helper: Convert 24h browser time input (e.g. "14:30") to 12h format ("02:30 PM")
  const convert24hTo12h = (time24) => {
    if (!time24) return '';
    const [hoursStr, minutesStr] = time24.split(':');
    let hours = parseInt(hoursStr);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
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
          
          const nativeSpeechContent = t.pillAlert(pillDisplayNameTranslated, rem.time, userNameTranslated);
          const romanSpeechContent = t.romanAlert ? t.romanAlert(rem.nameKey ? t[rem.nameKey] : rem.name, rem.time, rawUserName) : nativeSpeechContent;
          
          speakText(nativeSpeechContent, t.langCode, romanSpeechContent);
          addToast(`🚨 Medication Alert: Time to take ${rem.nameKey ? t[rem.nameKey] : translateText(rem.name)}!`);
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [reminders, currentUser, addToast, t, localLang]);

  // Boiling Timer Effect
  useEffect(() => {
    let interval = null;
    if (boilTimerActive && boilTimerSeconds > 0) {
      interval = setInterval(() => {
        setBoilTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (boilTimerSeconds === 0 && boilTimerActive) {
      setBoilTimerActive(false);
      addToast(`🔔 10-Minute Boiling Complete! Water is now safe to drink.`);
      const rawUserName = currentUser?.name || 'Ramdas Prasad';
      speakText(`Boiling complete. Water is now safe to drink.`, 'en-US', `Boiling complete. Water is now safe to drink.`);
    }
    return () => clearInterval(interval);
  }, [boilTimerActive, boilTimerSeconds, addToast, currentUser]);

  const toggleReminder = (id) => {
    setReminders(prev =>
      prev.map(rem => {
        if (rem.id === id) {
          const newState = !rem.completed;
          if (newState) {
            addToast(`💊 Marked "${rem.nameKey ? t[rem.nameKey] : translateText(rem.name)}" as taken.`);
          }
          return { ...rem, completed: newState, pillsLeft: Math.max(0, rem.pillsLeft - 1) };
        }
        return rem;
      })
    );
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminderName.trim() || !newReminderTime) return;

    const formattedTime = convert24hTo12h(newReminderTime);
    
    const newRem = {
      id: Date.now(),
      time: formattedTime,
      name: newReminderName,
      completed: false,
      alerted: false,
      pillsLeft: 30,
      dosage: "1 Dose with water"
    };

    setReminders([...reminders, newRem]);
    addToast(`📅 Added reminder for ${newReminderName} at ${formattedTime}`);
    
    setNewReminderName('');
    setNewReminderTime('');
    setShowAddForm(false);
  };

  const handleEmergencySOS = () => {
    alert("Emergency Alert sent to Sunita Didi (ASHA) & District Control Room!");
    setSosActive(true);
    addToast(`🆘 EMERGENCY SOS broadcast sent! ${t.notified}`);
  };

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
    const romanSpeechContent = t.romanWaterWarning ? t.romanWaterWarning(rawUserName) : nativeSpeechContent;
    
    speakText(nativeSpeechContent, t.langCode, romanSpeechContent);
    addToast(`🔔 Simulating immediate alert in ${localLang}!`);
  };

  // Helper format seconds to MM:SS
  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const completedCount = reminders.filter(r => r.completed).length;

  return (
    <div className="flex flex-col space-y-6 pb-20 text-slate-950 font-sans max-w-2xl mx-auto relative">
      
      {/* 1. Universal Senior Header with Dialect Selector */}
      <header className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-amber-400/40">
        <div>
          <span className="text-xs font-black uppercase text-amber-100 tracking-wider">Senior Care Companion</span>
          <h1 className="text-2xl font-black tracking-tight mt-0.5 flex items-center gap-2">
            <span>👴</span> {t.welcome(translateText(currentUser?.name || 'Ramdas Prasad'))}
          </h1>
          <p className="text-xs font-bold text-amber-50 mt-1">
            {t.village}: <span className="font-extrabold underline">{translateText(currentUser?.village || 'Lower Subansiri')}</span> | {t.house} #42
          </p>
        </div>
        
        {/* Dynamic Language Selector & Voice Test */}
        <div className="flex items-center gap-2.5">
          <select
            value={localLang}
            onChange={(e) => {
              setLocalLang(e.target.value);
              addToast(`🌐 UI & Voice Language: ${e.target.value}`);
            }}
            className="text-xs font-black border border-white/40 rounded-xl px-3 py-2 bg-white/10 text-white focus:outline-none cursor-pointer backdrop-blur-md shadow-2xs"
          >
            <option value="English" className="text-slate-900 font-bold">English</option>
            <option value="Hindi" className="text-slate-900 font-bold">हिन्दी</option>
            <option value="Bengali" className="text-slate-900 font-bold">বাংলা</option>
            <option value="Assamese" className="text-slate-900 font-bold">অসমীয়া</option>
            <option value="Khasi" className="text-slate-900 font-bold">Khasi</option>
            <option value="Mizo" className="text-slate-900 font-bold">Mizo</option>
            <option value="Bodo" className="text-slate-900 font-bold">बोडो</option>
          </select>

          <button
            onClick={triggerDemoAlert}
            className="text-xs bg-white/20 hover:bg-white/30 text-white border border-white/40 px-3 py-2 rounded-xl font-black transition-all active:scale-95 shadow-2xs cursor-pointer flex items-center gap-1"
            title={`Click to test TTS speech in ${localLang}`}
          >
            <span>🔊</span> {t.testBtn}
          </button>
        </div>
      </header>

      {/* 2. DEDICATED VIEW 1: MEDICATION REMINDERS (`subTab === 'meds'`) */}
      {subTab === 'meds' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Daily Dosage Compliance Progress Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex justify-between items-center text-xs font-extrabold">
              <span className="text-slate-700 uppercase tracking-wider text-[11px]">Today's Dosage Compliance</span>
              <span className="text-emerald-700 font-black">{completedCount} of {reminders.length} Taken ({Math.round((completedCount / reminders.length) * 100)}%)</span>
            </div>

            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / reminders.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Reminders List Panel */}
          <section className="bg-white border border-emerald-500/40 rounded-2xl overflow-hidden shadow-2xs">
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 px-6 flex justify-between items-center">
              <h2 className="text-base font-black flex items-center gap-2">
                <span>💊 {t.todayReminders}</span>
              </h2>
              
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-xs font-black bg-white/15 hover:bg-white/25 border border-white/20 text-white px-3 py-1.5 rounded-lg transition-all"
              >
                {showAddForm ? t.closeForm : t.addReminder}
              </button>
            </div>

            <div className="p-5 space-y-4">
              
              {/* New Reminder Form */}
              {showAddForm && (
                <form onSubmit={handleAddReminder} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">{t.createReminder}</h3>
                  
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">{t.pillName}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.placeholder}
                      value={newReminderName}
                      onChange={(e) => setNewReminderName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">{t.reminderTime}</label>
                    <input
                      type="time"
                      required
                      value={newReminderTime}
                      onChange={(e) => setNewReminderTime(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-black transition-all shadow-2xs"
                  >
                    {t.saveReminder}
                  </button>
                </form>
              )}

              {/* Reminders Stream */}
              <div className="space-y-3">
                {reminders.map((rem) => (
                  <div
                    key={rem.id}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between min-h-[72px] ${
                      rem.completed 
                        ? 'bg-emerald-50/70 border-emerald-400 text-emerald-950 opacity-80' 
                        : 'bg-amber-50/40 border-amber-200 text-slate-950 hover:border-amber-400 hover:shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => toggleReminder(rem.id)}
                        className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center font-black text-sm cursor-pointer transition-all ${
                          rem.completed ? 'bg-emerald-600 border-emerald-700 text-white' : 'border-slate-400 bg-white text-transparent'
                        }`}
                      >
                        ✓
                      </button>
                      <div>
                        <span className="block text-[10px] font-black uppercase text-slate-400">{rem.time} • {rem.dosage}</span>
                        <span className={`text-base font-black ${rem.completed ? 'line-through text-emerald-900' : 'text-slate-950'}`}>
                          {rem.nameKey ? t[rem.nameKey] : translateText(rem.name)}
                        </span>
                        <span className="block text-[10px] font-bold text-slate-500 mt-0.5">
                          💊 Refill Stock: <strong className="text-slate-800">{rem.pillsLeft} pills left</strong>
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleReminder(rem.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black border cursor-pointer ${
                        rem.completed 
                          ? 'bg-emerald-200 border-emerald-300 text-emerald-900' 
                          : 'bg-amber-200 border-amber-300 text-amber-950'
                      }`}
                    >
                      {rem.completed ? t.taken : t.pending}
                    </button>
                  </div>
                ))}
              </div>

            </div>
          </section>

        </div>
      )}

      {/* 3. DEDICATED VIEW 2: WATER SAFETY & ALERTS (`subTab === 'water'`) */}
      {subTab === 'water' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Water Quality Telemetry Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white p-6 rounded-2xl border border-blue-800 shadow-md space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase text-blue-300 tracking-wider">Village Water Safety Console</span>
              <span className="bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md animate-pulse">
                HIGH TURBIDITY BREACH
              </span>
            </div>
            
            <h2 className="text-xl font-black">{translateText(currentUser?.village || 'Lower Subansiri')} Water Quality Status</h2>
            
            <div className="bg-white/10 p-4 rounded-xl border border-white/10 text-xs font-bold space-y-1">
              <p className="text-blue-100 flex items-center gap-1.5">
                <span>⚠️</span> <strong>Contamination Warning:</strong> High Turbidity (7.2 NTU) detected at Subansiri Intake Station.
              </p>
              <p className="text-amber-200 font-extrabold">
                Recommendation: Do not consume unboiled tap water.
              </p>
            </div>

            {/* Read Warning Aloud Button */}
            <button
              onClick={() => {
                const rawUserName = currentUser?.name || 'Ramdas Prasad';
                const userNameTranslated = translateText(rawUserName);
                const nativeSpeechContent = t.waterWarning(userNameTranslated);
                const romanSpeechContent = t.romanWaterWarning ? t.romanWaterWarning(rawUserName) : nativeSpeechContent;
                speakText(nativeSpeechContent, t.langCode, romanSpeechContent);
                addToast(`🔊 Playing water safety alert in ${localLang}...`);
              }}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-2xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>🔊 Read Water Warning Aloud ({localLang})</span>
            </button>
          </div>

          {/* Interactive 10-Minute Boiling Water Timer */}
          <section className="bg-white border border-blue-200 p-6 rounded-2xl shadow-2xs space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span>⏱️ 10-Minute Boiling Countdown Timer</span>
                </h3>
                <p className="text-xs font-bold text-slate-500">Boil water for 10 full minutes to kill waterborne coliform bacteria</p>
              </div>

              <span className="text-2xl font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200 font-mono">
                {formatTimer(boilTimerSeconds)}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setBoilTimerActive(!boilTimerActive)}
                className={`flex-1 h-12 text-white font-black rounded-xl text-sm transition-all cursor-pointer ${
                  boilTimerActive ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-900/20'
                }`}
              >
                {boilTimerActive ? '⏸️ Pause Timer' : '▶️ Start Boiling Timer (10 Min)'}
              </button>

              <button
                onClick={() => {
                  setBoilTimerActive(false);
                  setBoilTimerSeconds(600);
                  addToast("⏱️ Boiling timer reset to 10 minutes.");
                }}
                className="px-4 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl border border-slate-200 transition-all cursor-pointer"
              >
                🔄 Reset
              </button>
            </div>
          </section>

          {/* Boiling & Purification Safety Guide */}
          <section className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-2xs space-y-3">
            <h3 className="text-sm font-black text-slate-900">🛡️ Safe Drinking Water Guidelines</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-lg block">1️⃣ Cloth Filter</span>
                <span className="text-slate-600">Filter tap water through a clean cotton cloth before boiling.</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-lg block">2️⃣ Rolling Boil</span>
                <span className="text-slate-600">Ensure water reaches a rolling boil for a full 10 minutes.</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-lg block">3️⃣ Covered Storage</span>
                <span className="text-slate-600">Store cooled water in clean, covered stainless steel vessels.</span>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* 4. DEDICATED VIEW 3: EMERGENCY SOS STATION (`subTab === 'sos'`) */}
      {subTab === 'sos' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Main Huge SOS Distress Button Panel */}
          <section className="bg-white border border-rose-200 p-6 rounded-2xl shadow-2xs space-y-4 text-center">
            
            <div>
              <span className="text-xs font-black text-rose-700 uppercase tracking-widest block">
                {t.emergencyTitle}
              </span>
              <p className="text-xs font-bold text-slate-500 mt-1">
                Directly alerts Sunita Didi (ASHA) and broadcasts location coordinates to District Control
              </p>
            </div>

            {/* Pulsing Huge Emergency Button */}
            <button
              onClick={handleEmergencySOS}
              className="relative group w-full h-24 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xl font-black rounded-2xl flex items-center justify-center shadow-xl shadow-rose-600/30 border border-rose-500 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <PhoneIcon />
              <span>{t.callAsha}</span>
            </button>

            {sosActive && (
              <div className="bg-rose-50 border border-rose-300 p-4 rounded-xl text-center text-rose-900 font-bold mt-2 w-full animate-slide-in">
                🚑 {t.notified}
                <button 
                  onClick={() => setSosActive(false)} 
                  className="block mx-auto mt-2 text-xs text-rose-700 underline font-extrabold cursor-pointer"
                >
                  {t.cancelAlert}
                </button>
              </div>
            )}
          </section>

          {/* Senior Emergency Medical Profile Card */}
          <section className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-black flex items-center gap-2">
                  <span>🆔 Senior Medical Profile</span>
                </h3>
                <p className="text-xs text-slate-400 font-semibold">Shared automatically during emergency distress calls</p>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-black">
                Blood Group: O+
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-bold">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] font-extrabold uppercase">Full Name</span>
                <span className="text-white font-black text-sm">{currentUser?.name || 'Ramdas Prasad'}</span>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] font-extrabold uppercase">Age / Gender</span>
                <span className="text-white font-black text-sm">68 Yrs / Male</span>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 block text-[10px] font-extrabold uppercase">Chronic Conditions</span>
                <span className="text-amber-300 font-black text-sm">Hypertension, Diabetes</span>
              </div>
            </div>
          </section>

          {/* Quick One-Tap Emergency Contacts */}
          <section className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-2xs space-y-3">
            <h3 className="text-sm font-black text-slate-900">📞 Quick Emergency Phone Directory</h3>
            
            <div className="space-y-2.5">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs font-bold">
                <div>
                  <span className="block text-slate-900 font-black">Sunita Devi (ASHA Health Worker)</span>
                  <span className="text-slate-500 text-[10px]">Mobile: +91 98765 43210</span>
                </div>
                <a href="tel:9876543210" className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-black hover:bg-emerald-700">
                  Call ASHA
                </a>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs font-bold">
                <div>
                  <span className="block text-slate-900 font-black">Primary Health Center (PHC Dhemaji)</span>
                  <span className="text-slate-500 text-[10px]">National Health Ambulance: 108</span>
                </div>
                <a href="tel:108" className="px-3 py-1.5 bg-rose-600 text-white rounded-lg font-black hover:bg-rose-700">
                  Call 108
                </a>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* Active Alarm Reminder Modal Overlay */}
      {activeAlarm && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-2xl border border-rose-500 p-6 space-y-5 text-center shadow-2xl">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-5xl animate-bounce">🚨</span>
              <h3 className="text-xl font-black text-rose-900 uppercase tracking-tight">
                {t.pillAlertText}
              </h3>
              <p className="text-sm text-slate-500 font-bold">{activeAlarm.time}</p>
            </div>
            
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl">
              <span className="block text-xs font-black text-slate-400 uppercase tracking-wider">
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
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-lg font-black transition-all shadow-md flex items-center justify-center cursor-pointer active:scale-95"
            >
              {t.confirmTaken}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
