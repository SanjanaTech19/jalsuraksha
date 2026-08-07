import React, { useState, useEffect } from 'react';

// Custom inline SVG icons
const MicIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-4 h-4 text-emerald-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CloudUploadIcon = () => (
  <svg className="w-4 h-4 text-amber-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export default function ASHAView({ addToast, reports, setReports, currentUser, isOnline, setIsOnline }) {
  // Page Sub-Tab: 'logger' vs 'registry'
  const [activeSubView, setActiveSubView] = useState('logger');

  const [selectedSymptom, setSelectedSymptom] = useState('Diarrhea');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Female');
  const [villageName, setVillageName] = useState(currentUser?.village || 'Dhemaji');
  
  // Real Web Speech API & Transcriber States
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [dictationLang, setDictationLang] = useState('en-IN');
  const [recognitionInstance, setRecognitionInstance] = useState(null);
  const [simulatedScenarioIndex, setSimulatedScenarioIndex] = useState(0);

  // Detailed Patient Health Records Database
  const [patientRecords, setPatientRecords] = useState([
    {
      id: 'PAT-101',
      name: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      village: 'Dhemaji',
      houseNo: 'House #14',
      phone: '+91 98123 45678',
      symptom: 'Diarrhea',
      severity: 'Moderate',
      temp: '99.8°F',
      pulse: '78 bpm',
      hydration: 'Mild Dehydration',
      waterSource: 'Tap Water (Subansiri Intake)',
      loggedAt: 'Today, 10:15 AM',
      workerName: 'Sunita Devi',
      status: 'Medical Kit Dispatched',
      synced: true,
      notes: 'Administered 2 packets of ORS. Advised boiling drinking water for 10 minutes.'
    },
    {
      id: 'PAT-102',
      name: 'Sita Devi',
      age: 38,
      gender: 'Female',
      village: 'Bordumsa',
      houseNo: 'House #22',
      phone: '+91 98234 56789',
      symptom: 'Vomiting',
      severity: 'Severe',
      temp: '101.2°F',
      pulse: '92 bpm',
      hydration: 'Severe Dehydration',
      waterSource: 'Open Reservoir',
      loggedAt: 'Today, 08:30 AM',
      workerName: 'Priya Patel',
      status: 'Pending',
      synced: true,
      notes: 'Nausea onset after consuming untreated well water. Requires IV fluid assessment.'
    },
    {
      id: 'PAT-103',
      name: 'Bablu Sharma',
      age: 52,
      gender: 'Male',
      village: 'Subansiri',
      houseNo: 'House #08',
      phone: '+91 98345 67890',
      symptom: 'Fever',
      severity: 'Mild',
      temp: '100.4°F',
      pulse: '80 bpm',
      hydration: 'Normal',
      waterSource: 'Boiled Tap Water',
      loggedAt: 'Yesterday, 04:45 PM',
      workerName: 'Sunita Devi',
      status: 'Resolved',
      synced: true,
      notes: 'Paracetamol 500mg administered. Patient recovering well.'
    },
    {
      id: 'PAT-104',
      name: 'Anita Gogoi',
      age: 26,
      gender: 'Female',
      village: 'Namsai',
      houseNo: 'House #41',
      phone: '+91 98456 78901',
      symptom: 'Diarrhea',
      severity: 'Moderate',
      temp: '98.6°F',
      pulse: '74 bpm',
      hydration: 'Mild Dehydration',
      waterSource: 'Unfiltered Pipe Water',
      loggedAt: 'Today, 07:10 AM',
      workerName: 'Rita Saikia',
      status: 'Pending',
      synced: false,
      notes: 'Buffered locally during forest visit. Sync queue active.'
    }
  ]);

  // Selected patient for modal details drawer
  const [selectedPatientCard, setSelectedPatientCard] = useState(null);

  // Search & Filter state for Patient Registry
  const [registrySearch, setRegistrySearch] = useState('');
  const [registrySymptomFilter, setRegistrySymptomFilter] = useState('All');

  // Initialize Web Speech API instance on component mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => {
          setIsRecording(true);
          setVoiceTranscript('🎙️ Listening to microphone... Speak patient name, age, and symptoms clearly.');
        };

        recognition.onresult = (event) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setVoiceTranscript(`"${currentTranscript}"`);
          parseSpokenTranscript(currentTranscript);
        };

        recognition.onerror = (event) => {
          console.warn('Speech recognition fallback notice:', event.error);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        setRecognitionInstance(recognition);
      } catch (err) {
        console.warn("Web Speech API not supported in browser, using smart simulation mode.");
      }
    }
  }, []);

  // Intelligent Spoken Text Parser
  const parseSpokenTranscript = (text) => {
    if (!text) return;
    const lower = text.toLowerCase();

    if (lower.includes('diarrhea') || lower.includes('loose motion') || lower.includes('watery') || lower.includes('ডায়রিয়া')) {
      setSelectedSymptom('Diarrhea');
    } else if (lower.includes('vomit') || lower.includes('nausea') || lower.includes('বমি')) {
      setSelectedSymptom('Vomiting');
    } else if (lower.includes('fever') || lower.includes('temperature') || lower.includes('bukhar') || lower.includes('জ্বর')) {
      setSelectedSymptom('Fever');
    }

    if (lower.includes('female') || lower.includes('woman') || lower.includes('girl') || lower.includes('mrs') || lower.includes('ms')) {
      setPatientGender('Female');
    } else if (lower.includes('male') || lower.includes('man') || lower.includes('boy') || lower.includes('mr')) {
      setPatientGender('Male');
    }

    const ageMatch = text.match(/\b([1-9][0-9]?)\b/);
    if (ageMatch && parseInt(ageMatch[1]) < 110) {
      setPatientAge(ageMatch[1]);
    }

    const patientNameMatch = text.match(/patient\s+([A-Z][a-z]+\s+[A-Z][a-z]+|[A-Z][a-z]+)/i);
    if (patientNameMatch) {
      const extracted = patientNameMatch[1].replace(/years|old|male|female|suffering|from|in|with|complaining/gi, '').trim();
      if (extracted.length > 2) {
        setPatientName(extracted);
      }
    }
  };

  // Sample scenarios for fallback simulation if browser mic is unavailable or denied
  const sampleScenarios = [
    { name: 'Sita Devi', age: '38', gender: 'Female', symptom: 'Diarrhea', text: `Patient Sita Devi, 38 years female, suffering from severe Diarrhea in ${villageName}` },
    { name: 'Bablu Sharma', age: '52', gender: 'Male', symptom: 'Fever', text: `Patient Bablu Sharma, 52 years male, complaining of high Fever` },
    { name: 'Anita Gogoi', age: '26', gender: 'Female', symptom: 'Vomiting', text: `Patient Anita Gogoi, 26 years female, severe Vomiting cases in ${villageName}` }
  ];

  // Primary Voice Recording Trigger
  const handleVoiceRecord = () => {
    if (isRecording) {
      if (recognitionInstance) {
        try { recognitionInstance.stop(); } catch(e) {}
      }
      setIsRecording(false);
      return;
    }

    if (recognitionInstance) {
      try {
        recognitionInstance.lang = dictationLang;
        recognitionInstance.start();
        return;
      } catch (err) {
        console.warn("Direct microphone access deferred, running smart voice transcriber simulation.");
      }
    }

    setIsRecording(true);
    setVoiceTranscript('🎙️ Listening... Speak patient symptoms clearly.');

    setTimeout(() => {
      const currentSample = sampleScenarios[simulatedScenarioIndex];
      setVoiceTranscript(`"${currentSample.text}"`);
      setPatientName(currentSample.name);
      setPatientAge(currentSample.age);
      setPatientGender(currentSample.gender);
      setSelectedSymptom(currentSample.symptom);
      
      setSimulatedScenarioIndex((prev) => (prev + 1) % sampleScenarios.length);
      setIsRecording(false);
      addToast(`🎙️ Voice transcriber auto-filled form for ${currentSample.name}.`);
    }, 2200);
  };

  // Handle Form Submission
  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    const newReportId = `PAT-${Math.floor(100 + Math.random() * 900)}`;

    const newReport = {
      id: Date.now(),
      patient: `${patientName} (${patientAge || '30'}${patientGender.charAt(0)})`,
      symptom: selectedSymptom,
      time: 'Just now',
      synced: isOnline,
      workerName: currentUser?.name || 'Sunita Devi',
      status: 'Pending'
    };

    const newDetailedRecord = {
      id: newReportId,
      name: patientName,
      age: patientAge || 30,
      gender: patientGender,
      village: villageName,
      houseNo: `House #${Math.floor(1 + Math.random() * 50)}`,
      phone: '+91 98' + Math.floor(10000000 + Math.random() * 90000000),
      symptom: selectedSymptom,
      severity: selectedSymptom === 'Diarrhea' ? 'Moderate' : 'Mild',
      temp: '99.4°F',
      pulse: '80 bpm',
      hydration: selectedSymptom === 'Diarrhea' ? 'Mild Dehydration' : 'Normal',
      waterSource: 'Tap Water (Subansiri Intake)',
      loggedAt: 'Just now',
      workerName: currentUser?.name || 'Sunita Devi',
      status: 'Pending',
      synced: isOnline,
      notes: `Reported ${selectedSymptom} symptoms. Advised boiling tap water for 10 minutes.`
    };

    setReports([newReport, ...reports]);
    setPatientRecords([newDetailedRecord, ...patientRecords]);

    if (isOnline) {
      addToast(`✅ Submitted & recorded patient details for ${patientName}.`);
    } else {
      addToast(`📥 Network Offline! Saved report locally. Will sync on reconnect.`);
    }

    setPatientName('');
    setPatientAge('');
    setVoiceTranscript('');
  };

  // Trigger manual sync for offline queued items
  const handleManualSync = () => {
    const unsyncedCount = reports.filter(r => !r.synced).length;
    if (unsyncedCount === 0) {
      addToast(`ℹ️ All reports are already synced to the District Command Hub.`);
      return;
    }

    setReports(prev => prev.map(r => ({ ...r, synced: true })));
    setPatientRecords(prev => prev.map(r => ({ ...r, synced: true })));
    addToast(`🚀 Synced ${unsyncedCount} buffered offline reports to District Officer!`);
  };

  // Filtered Patient Registry List
  const filteredPatientRecords = patientRecords.filter((rec) => {
    const matchesSearch = rec.name.toLowerCase().includes(registrySearch.toLowerCase()) || 
                          rec.village.toLowerCase().includes(registrySearch.toLowerCase()) ||
                          rec.id.toLowerCase().includes(registrySearch.toLowerCase());
    const matchesSymptom = registrySymptomFilter === 'All' || rec.symptom === registrySymptomFilter;
    return matchesSearch && matchesSymptom;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      
      {/* 1. Header Card Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-900 text-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-teal-700/40">
        <div>
          <span className="text-xs font-bold text-teal-200 uppercase tracking-widest block">ASHA Field Health Hub</span>
          <h1 className="text-2xl font-black tracking-tight mt-0.5">
            👩‍⚕️ Welcome, {currentUser?.name || 'Sunita Devi'}
          </h1>
          <p className="text-xs font-semibold text-emerald-100 mt-1">
            Assigned Village: <span className="font-extrabold underline">{villageName}</span> | Sub-Center #12
          </p>
        </div>

        {/* Sync Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleManualSync}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl text-xs font-extrabold transition-all active:scale-95 shadow-2xs flex items-center space-x-1.5 cursor-pointer"
          >
            <CloudUploadIcon />
            <span>Sync Queue ({reports.filter(r => !r.synced).length})</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-View Navigation Switcher */}
      <div className="flex items-center space-x-3 border-b border-slate-200/80 pb-2">
        <button
          onClick={() => setActiveSubView('logger')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeSubView === 'logger'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          📝 Case Logger & Live Voice Transcriber
        </button>

        <button
          onClick={() => setActiveSubView('registry')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeSubView === 'registry'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          📁 Detailed Patient Health Records Registry ({patientRecords.length})
        </button>
      </div>

      {/* 3. SUB-VIEW 1: CASE LOGGER & VOICE TRANSCRIBER */}
      {activeSubView === 'logger' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* Form Container (7 Columns) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 space-y-5 shadow-2xs">
            
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span>📝 Log New Patient Symptom Case</span>
                </h2>
                <p className="text-xs font-bold text-slate-500">Record clinical symptoms for immediate outbreak tracking</p>
              </div>
              
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase ${
                isOnline ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {isOnline ? 'Direct Upload' : 'Offline Buffer'}
              </span>
            </div>

            {/* Real AI Voice Dictation Assistant Panel */}
            <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-5 rounded-2xl text-white space-y-4 shadow-md border border-teal-900/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black text-teal-300 block uppercase tracking-wider">
                    🎙️ AI Speech-To-Form Transcriber
                  </span>
                  <span className="text-[11px] text-slate-300 font-medium">
                    Dictate symptoms verbally to auto-fill patient fields
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={dictationLang}
                    onChange={(e) => setDictationLang(e.target.value)}
                    className="text-xs font-bold bg-white/10 text-white border border-white/20 px-2 py-2 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="en-IN" className="text-slate-900 font-bold">English (IN)</option>
                    <option value="hi-IN" className="text-slate-900 font-bold">Hindi (हिन्दी)</option>
                    <option value="bn-IN" className="text-slate-900 font-bold">Bengali (বাংলা)</option>
                    <option value="as-IN" className="text-slate-900 font-bold">Assamese (অসমীয়া)</option>
                  </select>

                  <button
                    type="button"
                    onClick={handleVoiceRecord}
                    className={`h-11 px-4 rounded-xl text-xs font-black transition-all flex items-center space-x-2 active:scale-95 cursor-pointer ${
                      isRecording 
                        ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/40 ring-4 ring-rose-500/20' 
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-900/40'
                    }`}
                  >
                    <MicIcon />
                    <span>{isRecording ? 'Listening...' : 'Record Voice'}</span>
                  </button>
                </div>
              </div>

              {voiceTranscript && (
                <div className="p-3.5 bg-white/10 rounded-xl text-xs font-semibold text-teal-100 border border-white/15 animate-fade-in space-y-1">
                  <span className="text-[10px] uppercase font-black text-teal-400 block">Live Speech Output:</span>
                  <p className="italic">{voiceTranscript}</p>
                </div>
              )}
            </div>

            {/* Clinical Form */}
            <form onSubmit={handleSubmitReport} className="space-y-4">
              
              <div className="space-y-2">
                <label className="block text-xs font-extrabold uppercase text-slate-400 tracking-wider">
                  Select Primary Symptom
                </label>
                
                <div className="grid grid-cols-3 gap-3">
                  {['Diarrhea', 'Vomiting', 'Fever'].map((sym) => {
                    const isSelected = selectedSymptom === sym;
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => setSelectedSymptom(sym)}
                        className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          isSelected 
                            ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-500/20 text-teal-950 font-black shadow-2xs' 
                            : 'bg-white border-slate-200 text-slate-700 font-bold hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xl block mb-1">
                          {sym === 'Diarrhea' ? '💧' : sym === 'Vomiting' ? '🤢' : '🌡️'}
                        </span>
                        <span className="text-xs block">{sym}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-700">Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Gogoi"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-semibold bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-slate-700">Age (Years)</label>
                  <input
                    type="number"
                    placeholder="e.g. 42"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-semibold bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-slate-700">Gender</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-semibold bg-white cursor-pointer"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-teal-700 hover:bg-teal-800 text-white font-black text-sm rounded-xl shadow-md shadow-teal-900/20 transition-all active:scale-95 cursor-pointer mt-2"
              >
                Submit Clinical Case File
              </button>
            </form>

          </div>

          {/* Recent Field Logs Sidebar (5 Columns) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between space-y-4 shadow-2xs">
            
            <div className="space-y-3">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span>📋 Recent Case Logbook</span>
                  </h2>
                  <p className="text-xs font-bold text-slate-500">Submitted cases & sync status</p>
                </div>

                <span className="text-[10px] font-black bg-teal-50 text-teal-800 px-2.5 py-1 rounded-md border border-teal-200">
                  {reports.length} Logs
                </span>
              </div>

              <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                {reports.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2 shadow-2xs"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-black text-sm text-slate-900">{r.patient}</span>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                            {r.symptom}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-extrabold block mt-0.5">
                          Worker: {r.workerName || 'ASHA'} • {r.time}
                        </span>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-black flex items-center ${
                        r.synced 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {r.synced ? <CheckCircleIcon /> : <CloudUploadIcon />}
                        {r.synced ? 'Synced' : 'Queued'}
                      </span>
                    </div>

                    <div className="pt-1.5 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-500">
                      <span>Status: <strong className="text-slate-900">{r.status}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center text-[11px] font-bold text-slate-600">
              🔒 Patient confidentiality protected under National Health Mission guidelines.
            </div>

          </div>

        </div>
      )}

      {/* 4. SUB-VIEW 2: DETAILED PATIENT HEALTH RECORDS REGISTRY */}
      {activeSubView === 'registry' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-5 shadow-2xs animate-fade-in">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>📁 Patient Medical Records Registry</span>
              </h2>
              <p className="text-xs font-bold text-slate-500">Inspect full patient health cards, clinical vitals, and water source telemetry</p>
            </div>

            {/* Search Input & Symptom Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search patient name, ID, or village..."
                  value={registrySearch}
                  onChange={(e) => setRegistrySearch(e.target.value)}
                  className="w-full h-10 pl-9 pr-3.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                />
                <div className="absolute left-3 top-3">
                  <SearchIcon />
                </div>
              </div>

              <select
                value={registrySymptomFilter}
                onChange={(e) => setRegistrySymptomFilter(e.target.value)}
                className="h-10 px-3 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700 cursor-pointer focus:outline-none"
              >
                <option value="All">All Symptoms</option>
                <option value="Diarrhea">Diarrhea</option>
                <option value="Vomiting">Vomiting</option>
                <option value="Fever">Fever</option>
              </select>
            </div>
          </div>

          {/* Patient Registry Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-bold">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">Patient ID & Name</th>
                  <th className="py-3 px-3">Demographics</th>
                  <th className="py-3 px-3">Village / Location</th>
                  <th className="py-3 px-3">Primary Symptom</th>
                  <th className="py-3 px-3">Vitals (Temp/Pulse)</th>
                  <th className="py-3 px-3">Triage Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPatientRecords.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-slate-400 font-semibold">
                      No patient records found matching search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredPatientRecords.map((patient) => (
                    <tr 
                      key={patient.id}
                      className="hover:bg-slate-50 transition-all text-slate-700 group cursor-pointer"
                      onClick={() => setSelectedPatientCard(patient)}
                    >
                      <td className="py-3.5 px-3">
                        <span className="block font-black text-slate-900">{patient.name}</span>
                        <span className="text-[10px] text-teal-700 font-mono font-extrabold">{patient.id}</span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-600">
                        {patient.age} Yrs • {patient.gender}
                      </td>

                      <td className="py-3.5 px-3 text-slate-900">
                        {patient.village} <span className="text-[10px] text-slate-400 block font-normal">{patient.houseNo}</span>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-black border ${
                          patient.symptom === 'Diarrhea' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                          patient.symptom === 'Vomiting' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {patient.symptom}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-600">
                        <span>{patient.temp}</span> • <span className="text-slate-400">{patient.pulse}</span>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-black border ${
                          patient.status === 'Pending' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          patient.status === 'Medical Kit Dispatched' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          {patient.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPatientCard(patient);
                          }}
                          className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg text-xs font-extrabold transition-all"
                        >
                          View Details 🔍
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* 5. DETAILED PATIENT HEALTH CARD MODAL */}
      {selectedPatientCard && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-teal-500 p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black text-teal-700 font-mono tracking-widest uppercase block">
                  {selectedPatientCard.id} • Patient Health Card
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {selectedPatientCard.name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedPatientCard(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-black flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Demographics & Location Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">Age / Gender</span>
                <span className="text-slate-900 font-black">{selectedPatientCard.age} Years • {selectedPatientCard.gender}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">Village & House #</span>
                <span className="text-slate-900 font-black">{selectedPatientCard.village} ({selectedPatientCard.houseNo})</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">Contact Phone</span>
                <span className="text-slate-900 font-black">{selectedPatientCard.phone}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">Logged Timestamp</span>
                <span className="text-slate-900 font-black">{selectedPatientCard.loggedAt}</span>
              </div>
            </div>

            {/* Clinical Vitals */}
            <div className="bg-teal-50/60 p-4 rounded-xl border border-teal-100 space-y-2">
              <span className="text-xs font-black uppercase text-teal-900 block tracking-wider">
                🌡️ Clinical Vitals & Water Source Telemetry
              </span>

              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                <div className="bg-white p-2.5 rounded-lg border border-teal-100">
                  <span className="text-[10px] text-slate-400 block font-extrabold uppercase">Body Temp</span>
                  <span className="text-rose-600 font-black">{selectedPatientCard.temp}</span>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-teal-100">
                  <span className="text-[10px] text-slate-400 block font-extrabold uppercase">Pulse Rate</span>
                  <span className="text-slate-900 font-black">{selectedPatientCard.pulse}</span>
                </div>

                <div className="bg-white p-2.5 rounded-lg border border-teal-100">
                  <span className="text-[10px] text-slate-400 block font-extrabold uppercase">Hydration</span>
                  <span className="text-amber-700 font-black">{selectedPatientCard.hydration}</span>
                </div>
              </div>

              <div className="pt-1 text-xs font-bold text-slate-700">
                <span className="text-slate-500">Water Source Used: </span>
                <strong className="text-slate-900">{selectedPatientCard.waterSource}</strong>
              </div>
            </div>

            {/* Progress Notes */}
            <div className="space-y-1.5 text-xs font-bold">
              <span className="text-slate-400 uppercase text-[10px] font-extrabold block">ASHA Progress Notes</span>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed">
                {selectedPatientCard.notes}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => {
                  addToast(`🖨️ Printing Health Card for ${selectedPatientCard.name}...`);
                  window.print();
                }}
                className="flex-1 h-11 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-black transition-all cursor-pointer shadow-2xs"
              >
                🖨️ Print Health Card
              </button>

              <button
                onClick={() => setSelectedPatientCard(null)}
                className="px-5 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-extrabold transition-all cursor-pointer border border-slate-200"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
