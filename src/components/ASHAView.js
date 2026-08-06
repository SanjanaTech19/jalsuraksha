import React, { useState } from 'react';

// Custom inline SVG icons for guaranteed render with no package issues
const DropletIcon = () => (
  <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </svg>
);

const FrownIcon = () => (
  <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ThermometerIcon = () => (
  <svg className="w-8 h-8 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6a3 3 0 016 0v13M9 10h6m-6 4h6M9 18a3 3 0 01-3-3v-3a3 3 0 013-3m6 9a3 3 0 003-3v-3a3 3 0 00-3-3" />
  </svg>
);

const MicrophoneIcon = ({ active }) => (
  <svg className={`w-8 h-8 ${active ? 'text-white' : 'text-teal-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const WifiIcon = () => (
  <svg className="w-4 h-4 text-emerald-500 mr-1 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.24 0 1 1 0 01-1.415-1.413 5 5 0 017.07 0 1 1 0 01-1.414 1.415zM9 17a1 1 0 102 0 1 1 0 00-2 0z" clipRule="evenodd" />
  </svg>
);

const WifiOffIcon = () => (
  <svg className="w-4 h-4 text-rose-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M13.477 14.89l2.24 2.24a1 1 0 001.414-1.414l-12-12a1 1 0 00-1.414 1.414l2.09 2.09a9 9 0 0012.728 0c.2-.2.38-.415.544-.64a1 1 0 00-1.614-1.18 7 7 0 01-9.9 0l1.414 1.414a3 3 0 004.24 0l1.414 1.414a1 1 0 001.415-1.414z" clipRule="evenodd" />
  </svg>
);

export default function ASHAView({ addToast, reports, setReports, currentUser, isOnline, setIsOnline }) {
  
  // Pending counts for UI badges
  const [pendingCounts, setPendingCounts] = useState({
    Diarrhea: 2,
    Vomiting: 1,
    Fever: 0,
  });

  // Voice recording simulation states
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  // Report Modal states
  const [activeFormType, setActiveFormType] = useState(null); // 'Diarrhea', 'Vomiting', 'Fever'
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Female');
  const [patientPhone, setPatientPhone] = useState('');
  const [severity, setSeverity] = useState('Medium');

  // Triggered when clicking a symptom reporter card
  const handleCardClick = (type) => {
    setActiveFormType(type);
    // Pre-populate with typical mock values for demo speed, but allow edits
    const mockNames = ['Ramesh Kumar', 'Sunita Devi', 'Karan Sharma', 'Anjali Patil'];
    setPatientName(mockNames[Math.floor(Math.random() * mockNames.length)]);
    setPatientAge(Math.floor(Math.random() * 50) + 15);
    setPatientPhone('98765' + Math.floor(Math.random() * 90000 + 10000));
    setSeverity('Medium');
  };

  // Submit quick report logic
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    const newReport = {
      id: Date.now(),
      patient: patientName,
      symptom: activeFormType,
      time: 'Just now',
      synced: isOnline,
      workerName: currentUser?.name || 'Sunita Devi',
      status: 'Pending'
    };

    // Add to top of reports log
    setReports([newReport, ...reports]);

    // Handle offline sync queues
    if (!isOnline) {
      setPendingCounts(prev => ({
        ...prev,
        [activeFormType]: prev[activeFormType] + 1
      }));
      addToast(`✅ Report saved offline! Will sync when network is available.`);
    } else {
      addToast(`🚀 Success! Report for ${patientName} synced immediately to District Hub.`);
    }

    // Reset Form Modal state
    setActiveFormType(null);
  };

  // Voice Report simulation toggle
  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      setVoiceTranscript('Listening to patient description...');
      
      // Simulate speech-to-text translation after 2.5 seconds
      setTimeout(() => {
        setIsListening(false);
        setVoiceTranscript('Transcribed: "6-year-old child in Ward 3 exhibiting high fever and dehydration. Severe diarrhea for last 12 hours."');
        
        // Open Report form pre-filled with transcribed details
        setActiveFormType('Diarrhea');
        setPatientName('Aarav Singh (Ward 3)');
        setPatientAge('6');
        setPatientGender('Male');
        setSeverity('High');
        
        addToast('🎙️ Voice input transcribed! Please confirm the report.');
      }, 2500);
    } else {
      setIsListening(false);
      setVoiceTranscript('');
    }
  };

  // Clear pending badge counts simulating an offline force sync
  const forceManualSync = () => {
    if (!isOnline) {
      addToast('⚠️ Cannot sync. System is currently OFFLINE.');
      return;
    }
    
    // Check if there are any reports that are currently pending sync
    const hasPending = reports.some(r => !r.synced);
    if (!hasPending && pendingCounts.Diarrhea === 0 && pendingCounts.Vomiting === 0 && pendingCounts.Fever === 0) {
      addToast('ℹ️ All reports are already synced.');
      return;
    }

    // Update state to set all reports as synced
    const updatedReports = reports.map(r => ({ ...r, synced: true }));
    setReports(updatedReports);
    setPendingCounts({ Diarrhea: 0, Vomiting: 0, Fever: 0 });
    addToast('🔄 Sync Complete! 5 pending offline reports sent to server.');
  };

  // Formatting date dynamically (DD MMM YYYY)
  const getFormattedDate = () => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="flex flex-col space-y-6 pb-20">
      
      {/* 1. Header Section */}
      <header className="flex justify-between items-center bg-white p-5 rounded-xl border border-slate-200/80">
        <div>
          <h1 className="text-2xl font-extrabold text-blue-800 tracking-tight flex items-center gap-1.5">
            <span className="text-blue-600">Jal</span>Suraksha
          </h1>
          <p className="text-xs text-slate-500 font-bold tracking-wide uppercase mt-0.5">
            Health Worker Hub {currentUser?.name ? `| ${currentUser.name} (${currentUser.village})` : ''}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          {/* Interactive Network status badge */}
          <button 
            onClick={() => {
              setIsOnline(!isOnline);
              addToast(isOnline ? "⚠️ System switched to Offline mode. Reports will be queued." : "📶 Back Online! Sync queue ready.");
            }}
            className={`flex items-center px-3 py-1.5 rounded-lg text-xs font-bold transition-colors tactile-btn ${
              isOnline ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
            title="Click to toggle network simulation"
          >
            {isOnline ? <WifiIcon /> : <WifiOffIcon />}
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </button>
          <span className="text-xs font-bold text-slate-500 mt-1">{getFormattedDate()}</span>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Quick Symptom Report</h2>
          {/* Manual sync command button */}
          <button 
            onClick={forceManualSync}
            disabled={!isOnline}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
              isOnline 
                ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100/50' 
                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Sync Queue
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          
          {/* Action 1: Diarrhea */}
          <button
            onClick={() => handleCardClick('Diarrhea')}
            className="flex flex-col items-center justify-between p-5 rounded-xl border text-center transition-all bg-white border-slate-200 hover:border-emerald-500/50 hover:bg-emerald-50/10 active:scale-95 group text-slate-800 min-h-[130px]"
          >
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <DropletIcon />
            </div>
            <div className="mt-2.5">
              <span className="block font-bold text-base text-slate-800">Report Diarrhea</span>
              {pendingCounts.Diarrhea > 0 && (
                <span className="inline-block mt-1 text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                  {pendingCounts.Diarrhea} pending
                </span>
              )}
            </div>
          </button>

          {/* Action 2: Vomiting */}
          <button
            onClick={() => handleCardClick('Vomiting')}
            className="flex flex-col items-center justify-between p-5 rounded-xl border text-center transition-all bg-white border-slate-200 hover:border-amber-500/50 hover:bg-amber-50/10 active:scale-95 group text-slate-800 min-h-[130px]"
          >
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <FrownIcon />
            </div>
            <div className="mt-2.5">
              <span className="block font-bold text-base text-slate-800">Report Vomiting</span>
              {pendingCounts.Vomiting > 0 && (
                <span className="inline-block mt-1 text-[11px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md">
                  {pendingCounts.Vomiting} pending
                </span>
              )}
            </div>
          </button>

          {/* Action 3: Fever */}
          <button
            onClick={() => handleCardClick('Fever')}
            className="flex flex-col items-center justify-between p-5 rounded-xl border text-center transition-all bg-white border-slate-200 hover:border-rose-500/50 hover:bg-rose-50/10 active:scale-95 group text-slate-800 min-h-[130px]"
          >
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <ThermometerIcon />
            </div>
            <div className="mt-2.5">
              <span className="block font-bold text-base text-slate-800">Report Fever</span>
              {pendingCounts.Fever > 0 ? (
                <span className="inline-block mt-1 text-[11px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md">
                  {pendingCounts.Fever} pending
                </span>
              ) : (
                <span className="inline-block mt-1 text-[11px] font-bold text-slate-400">
                  Ready
                </span>
              )}
            </div>
          </button>

          {/* Action 4: Voice Report */}
          <button
            onClick={handleVoiceToggle}
            className={`flex flex-col items-center justify-between p-5 rounded-xl border text-center transition-all active:scale-95 group min-h-[130px] ${
              isListening 
                ? 'bg-blue-800 border-blue-500 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 border-blue-600 text-white'
            }`}
          >
            <div className={`p-2.5 rounded-lg border ${isListening ? 'bg-blue-900 border-blue-700' : 'bg-blue-700/40 border-blue-500/30'}`}>
              <MicrophoneIcon active={isListening} />
            </div>
            <div className="mt-2.5">
              <span className="block font-bold text-base">
                {isListening ? 'Listening...' : 'Voice Report'}
              </span>
              <span className="inline-block mt-0.5 text-[11px] font-bold opacity-80">
                {isListening ? 'Speak now' : 'Tap to Record'}
              </span>
            </div>
          </button>

        </div>

        {/* Voice Transcript Display */}
        {voiceTranscript && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900">
            <div className="flex items-center space-x-2 font-bold mb-1">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              <span>Voice Transcriber AI</span>
            </div>
            <p className="italic font-medium">"{voiceTranscript}"</p>
          </div>
        )}
      </section>

      {/* 3. Recent Activity List */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-800">Recent Outbreak Activity Log</h2>
        <div className="space-y-3">
          {reports.map((report, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-4 bg-white rounded-xl border border-slate-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-lg border ${
                  report.symptom === 'Diarrhea' ? 'bg-emerald-50/50 border-emerald-100 text-emerald-600' :
                  report.symptom === 'Vomiting' ? 'bg-amber-50/50 border-amber-100 text-amber-600' :
                  'bg-rose-50/50 border-rose-100 text-rose-600'
                }`}>
                  {report.symptom === 'Diarrhea' && <span className="text-lg">💧</span>}
                  {report.symptom === 'Vomiting' && <span className="text-lg">🤢</span>}
                  {report.symptom === 'Fever' && <span className="text-lg">🌡️</span>}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">{report.patient}</h4>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold">
                    <span>{report.symptom}</span>
                    <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                    <span>{report.time}</span>
                  </div>
                </div>
              </div>

              {/* Sync Badge */}
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                report.synced 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                  : 'bg-amber-50 text-amber-700 border-amber-100'
              }`}>
                {report.synced ? 'Synced' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Reporting Modal Overlay / Drawer */}
      {activeFormType && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-xl border border-slate-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  New {activeFormType} Case Report
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">Fill patient details to record</p>
              </div>
              <button 
                onClick={() => setActiveFormType(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-slate-700 text-sm font-bold mb-1.5">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Meena"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-semibold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 text-sm font-bold mb-1.5">Age *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 34"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-sm font-bold mb-1.5">Gender *</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-semibold bg-white text-slate-800"
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 text-sm font-bold mb-1.5">Contact Number</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-sm font-bold mb-1.5">Symptom Severity</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Low', 'Medium', 'High'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSeverity(level)}
                      className={`h-11 rounded-lg font-bold border transition-all text-sm ${
                        severity === level 
                          ? level === 'Low' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' :
                            level === 'Medium' ? 'bg-amber-50 border-amber-500 text-amber-800' :
                            'bg-rose-50 border-rose-500 text-rose-800'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-bold transition-all tactile-btn flex items-center justify-center"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
