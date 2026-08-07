import React, { useState, useEffect } from 'react';
import ASHAView from './components/ASHAView';
import DashboardView from './components/DashboardView';
import AIView from './components/AIView';
import ElderlyView from './components/ElderlyView';
import AuthView from './components/AuthView';
import ASHAPerformanceView from './components/ASHAPerformanceView';

// Custom inline SVG icons matching Lucide / Heroicons outline styling
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ASHAIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const AIIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const StaffIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const PillIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a6.5 6.5 0 00-9.192-9.192l-2.02 2.02 9.192 9.192 2.02-2.02zM4.293 19.707a1 1 0 001.414 0l4.243-4.243-4.243-4.243-4.243 4.243a1 1 0 000 1.414l2.829 2.829z" />
  </svg>
);

const WaterIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a6.5 6.5 0 00-9.192-9.192l-2.02 2.02 9.192 9.192 2.02-2.02z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </svg>
);

const SOSIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const WifiIcon = () => (
  <svg className="w-4 h-4 text-emerald-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const WifiOffIcon = () => (
  <svg className="w-4 h-4 text-rose-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('District Officer');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [isOnline, setIsOnline] = useState(true);

  // In-Memory registered user accounts database
  const [users, setUsers] = useState([
    { email: 'officer@health.gov.in', password: 'password', name: 'Dr. Alok Verma', role: 'District Officer', village: 'District Headquarter', language: 'English' },
    { email: 'asha@health.gov.in', password: 'password', name: 'Sunita Devi', role: 'ASHA Worker', village: 'Dhemaji', language: 'English' },
    { email: 'senior@health.gov.in', password: 'password', name: 'Ramdas Prasad', role: 'Senior Citizen', village: 'Subansiri', language: 'Hindi' }
  ]);

  const handleLogin = (email, password, role) => {
    const cleanEmail = email.trim();
    const matchedUser = users.find(u => u.email.toLowerCase() === cleanEmail.toLowerCase() && u.role === role);
    let finalUser = matchedUser;
    
    if (!finalUser) {
      let nameFromEmail = cleanEmail;
      if (cleanEmail.includes('@')) {
        nameFromEmail = cleanEmail.split('@')[0];
      }
      
      nameFromEmail = nameFromEmail.replace(/[^a-zA-Z]/g, ' ');
      const parsedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      
      finalUser = {
        email: cleanEmail,
        password: password,
        name: parsedName,
        role: role,
        village: role === 'Senior Citizen' ? 'Namsai' : role === 'ASHA Worker' ? 'Dhemaji' : 'District Headquarter',
        language: role === 'Senior Citizen' ? 'Hindi' : 'English'
      };
      
      setUsers(prev => [...prev, finalUser]);
    }

    setIsLoggedIn(true);
    setUserRole(finalUser.role);
    setCurrentUser(finalUser);
    
    if (finalUser.role === 'District Officer') {
      setActiveTab('dashboard');
    } else if (finalUser.role === 'ASHA Worker') {
      setActiveTab('asha');
    } else if (finalUser.role === 'Senior Citizen') {
      setActiveTab('elderly-meds');
    }
    addToast(`🔑 Logged in as ${finalUser.name}`);
  };

  const handleRegister = (newUser) => {
    setUsers(prev => [...prev, newUser]);
    setIsLoggedIn(true);
    setUserRole(newUser.role);
    setCurrentUser(newUser);
    
    if (newUser.role === 'District Officer') {
      setActiveTab('dashboard');
    } else if (newUser.role === 'ASHA Worker') {
      setActiveTab('asha');
    } else if (newUser.role === 'Senior Citizen') {
      setActiveTab('elderly-meds');
    }
    addToast(`✨ Registered & Logged in as ${newUser.name}`);
  };

  // Shared reporting database log
  const [reports, setReports] = useState([
    { id: 1, patient: 'Rajesh M.', symptom: 'Fever', time: '10 mins ago', synced: true, workerName: 'Meena Gogoi', status: 'Pending' },
    { id: 2, patient: 'Sunita Bai', symptom: 'Diarrhea', time: '2 hours ago', synced: true, workerName: 'Sunita Devi', status: 'Medical Kit Dispatched' },
    { id: 3, patient: 'Bablu Pal', symptom: 'Vomiting', time: '5 hours ago', synced: false, workerName: 'Priya Patel', status: 'Resolved' }
  ]);

  // Mock GIS Village sensors and outbreak points
  const mockVillages = [
    { id: 1, name: 'Bordumsa', risk: 'high', riskScore: 85, cases: 12, lat: 45, lng: 20, waterQuality: 'High Turbidity (7.2 NTU)' },
    { id: 2, name: 'Dhemaji', risk: 'medium', riskScore: 56, cases: 6, lat: 25, lng: 55, waterQuality: 'Coliform detected' },
    { id: 3, name: 'Namsai', risk: 'low', riskScore: 18, cases: 1, lat: 60, lng: 70, waterQuality: 'Safe (0.2 NTU)' },
    { id: 4, name: 'Lohit', risk: 'low', riskScore: 12, cases: 0, lat: 78, lng: 40, waterQuality: 'Safe (0.1 NTU)' },
    { id: 5, name: 'Haroa', risk: 'high', riskScore: 91, cases: 18, lat: 30, lng: 32, waterQuality: 'High Turbidity (8.1 NTU)' },
    { id: 6, name: 'Subansiri', risk: 'medium', riskScore: 44, cases: 4, lat: 18, lng: 76, waterQuality: 'pH Alkaline (8.9)' },
    { id: 7, name: 'Pasighat', risk: 'low', riskScore: 22, cases: 2, lat: 50, lng: 48, waterQuality: 'Safe (0.3 NTU)' },
  ];

  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
  };

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const renderActiveView = () => {
    if (activeTab.startsWith('elderly')) {
      const subTab = activeTab.replace('elderly-', '');
      return <ElderlyView addToast={addToast} currentUser={currentUser} subTab={subTab} setParentActiveTab={setActiveTab} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardView mockVillages={mockVillages} reports={reports} setReports={setReports} />;
      case 'asha':
        return <ASHAView addToast={addToast} reports={reports} setReports={setReports} currentUser={currentUser} isOnline={isOnline} setIsOnline={setIsOnline} />;
      case 'ai':
        return <AIView />;
      case 'asha-performance':
        return <ASHAPerformanceView reports={reports} />;
      default:
        return <DashboardView mockVillages={mockVillages} reports={reports} setReports={setReports} />;
    }
  };

  const getFormattedDate = () => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900/5 flex flex-col justify-center relative overflow-hidden">
        <AuthView onLogin={handleLogin} onRegister={handleRegister} />
        
        {/* Global Toast Alerts */}
        <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0">
          {toasts.map((t) => (
            <div
              key={t.id}
              className="bg-white/95 backdrop-blur-md text-slate-800 font-bold text-xs px-4 py-3 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-lg animate-slide-in"
            >
              <span>{t.message}</span>
              <button
                onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                className="ml-3 text-slate-400 hover:text-slate-600 font-extrabold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
      
      {/* 1. Left Sidebar Navigation (Desktop Layout) */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between flex-shrink-0 z-30 shadow-xs">
        <div>
          {/* Brand Logo Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-black tracking-tight flex items-center gap-1.5">
                <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 bg-clip-text text-transparent">JalSuraksha</span>
              </h1>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-extrabold tracking-widest uppercase mt-1">Water Safety Command</p>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            
            {/* Tab 1: Dashboard (Visible to District Officer & ASHA Worker) */}
            {(userRole === 'District Officer' || userRole === 'ASHA Worker') && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all group ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${
                  activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                }`}>
                  <DashboardIcon />
                </div>
                <span>Dashboard Map</span>
              </button>
            )}

            {/* Tab 2: ASHA Worker (Visible to ASHA Worker) */}
            {userRole === 'ASHA Worker' && (
              <button
                onClick={() => setActiveTab('asha')}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all group ${
                  activeTab === 'asha'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${
                  activeTab === 'asha' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                }`}>
                  <ASHAIcon />
                </div>
                <span>ASHA Reporting</span>
              </button>
            )}

            {/* Tab 3: AI Forecasting (Visible to District Officer) */}
            {userRole === 'District Officer' && (
              <button
                onClick={() => setActiveTab('ai')}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all group ${
                  activeTab === 'ai'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${
                  activeTab === 'ai' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                }`}>
                  <AIIcon />
                </div>
                <span>AI Predictions</span>
              </button>
            )}

            {/* Tab 3.5: ASHA Performance (Visible to District Officer) */}
            {userRole === 'District Officer' && (
              <button
                onClick={() => setActiveTab('asha-performance')}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all group ${
                  activeTab === 'asha-performance'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${
                  activeTab === 'asha-performance' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                }`}>
                  <StaffIcon />
                </div>
                <span>ASHA Performance</span>
              </button>
            )}

            {/* Tabs 4, 5, 6: Separate Senior Citizen Navigation Items */}
            {userRole === 'Senior Citizen' && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 block">Senior Portal</span>
                
                {/* 1. Medication Reminders */}
                <button
                  onClick={() => setActiveTab('elderly-meds')}
                  className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all group ${
                    activeTab === 'elderly-meds'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    activeTab === 'elderly-meds' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}>
                    <PillIcon />
                  </div>
                  <span>Medication Reminders</span>
                </button>

                {/* 2. Water Safety & Alerts */}
                <button
                  onClick={() => setActiveTab('elderly-water')}
                  className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all group ${
                    activeTab === 'elderly-water'
                      ? 'bg-blue-50 text-blue-800 border border-blue-200/60 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    activeTab === 'elderly-water' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}>
                    <WaterIcon />
                  </div>
                  <span>Water Safety & Alerts</span>
                </button>

                {/* 3. Emergency SOS Station */}
                <button
                  onClick={() => setActiveTab('elderly-sos')}
                  className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all group ${
                    activeTab === 'elderly-sos'
                      ? 'bg-rose-50 text-rose-800 border border-rose-200/60 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    activeTab === 'elderly-sos' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}>
                    <SOSIcon />
                  </div>
                  <span>Emergency SOS Station</span>
                </button>
              </div>
            )}

          </nav>
        </div>

        {/* Sidebar Footer Info with Logout */}
        <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50/50">
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div>
              <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider">Active User</span>
              <span className="text-xs font-extrabold text-slate-800 truncate block max-w-[130px]">{currentUser?.name || 'User'}</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100">{userRole.split(' ')[0]}</span>
          </div>

          <button
            onClick={() => {
              setIsLoggedIn(false);
              addToast("🚪 Logged out successfully.");
            }}
            className="w-full h-10 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-2xs"
          >
            <span>🚪</span> Log Out
          </button>
        </div>
      </aside>

      {/* 2. Main Work Content Layout Area */}
      <div className="flex-grow flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex justify-between items-center z-20 shadow-2xs">
          <div>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              {activeTab === 'dashboard' && 'District Command Console'}
              {activeTab === 'asha' && 'Field Worker Reporting Hub'}
              {activeTab === 'ai' && 'Spatiotemporal Neural Outbreak Predictor'}
              {activeTab === 'asha-performance' && 'ASHA Telemetry & Workload Audit'}
              {activeTab === 'elderly-meds' && 'Medication Schedule & Dosage Manager'}
              {activeTab === 'elderly-water' && 'Village Water Quality & Safety Console'}
              {activeTab === 'elderly-sos' && 'Emergency Medical SOS Broadcast Station'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Date Display */}
            <span className="text-xs font-extrabold text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200/60 hidden sm:inline-block">
              📅 {getFormattedDate()}
            </span>

            {/* Interactive Network status badge */}
            <button 
              onClick={() => {
                setIsOnline(!isOnline);
                addToast(isOnline ? "⚠️ System switched to Offline mode. Reports will be queued." : "📶 Back Online! Sync queue ready.");
              }}
              className={`flex items-center px-3.5 py-1.5 rounded-xl text-xs font-black transition-all active:scale-95 cursor-pointer shadow-2xs ${
                isOnline ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
              }`}
              title="Click to toggle Network Connection Simulation"
            >
              {isOnline ? <WifiIcon /> : <WifiOffIcon />}
              <span>{isOnline ? 'ONLINE' : 'OFFLINE (QUEUED)'}</span>
            </button>
          </div>
        </header>

        {/* Dynamic Main Portal Page */}
        <main className="p-8 flex-grow">
          {renderActiveView()}
        </main>

        {/* Global Toast Alerts Container */}
        <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
          {toasts.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900/95 backdrop-blur-md text-white font-bold text-xs px-4 py-3 rounded-xl border border-slate-800 flex items-center justify-between shadow-xl animate-slide-in pointer-events-auto"
            >
              <div className="flex items-center space-x-2">
                <span>{t.message}</span>
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                className="ml-3 text-slate-400 hover:text-white font-extrabold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
