import React, { useState, useEffect } from 'react';
import ASHAView from './components/ASHAView';
import DashboardView from './components/DashboardView';
import AIView from './components/AIView';
import ElderlyView from './components/ElderlyView';
import AuthView from './components/AuthView';
import ASHAPerformanceView from './components/ASHAPerformanceView';


// Custom inline SVG icons matching Lucide / Heroicons outline styling (strokeWidth=2, slate color)
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

const ElderlyIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const StaffIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);


const WifiIcon = () => (
  <svg className="w-4 h-4 text-emerald-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const WifiOffIcon = () => (
  <svg className="w-4 h-4 text-rose-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // holds name, role, village, language
  const [activeTab, setActiveTab] = useState('dashboard'); // Start on command dashboard
  const [toasts, setToasts] = useState([]);
  const [isOnline, setIsOnline] = useState(true);

  // Registered users state list
  const [users, setUsers] = useState([
    { email: 'officer@health.gov.in', password: 'password', name: 'Rajesh Kumar', role: 'District Officer', village: 'District Headquarter', language: 'English' },
    { email: 'asha@health.gov.in', password: 'password', name: 'Sunita Devi', role: 'ASHA Worker', village: 'Dhemaji', language: 'English' },
    { email: 'senior@health.gov.in', password: 'password', name: 'Ramdas Prasad', role: 'Senior Citizen', village: 'Lower Subansiri', language: 'Hindi' }
  ]);

  const handleLogin = (email, password, role) => {
    const cleanEmail = email.trim();
    // Attempt lookup in current database
    const matchedUser = users.find(u => u.email.toLowerCase() === cleanEmail.toLowerCase() && u.role === role);
    let finalUser = matchedUser;
    
    // If user is not found, dynamically register them using their login credential prefix
    if (!finalUser) {
      let nameFromEmail = cleanEmail;
      if (cleanEmail.includes('@')) {
        nameFromEmail = cleanEmail.split('@')[0];
      }
      
      // Clean up symbols and capitalize first letter
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
      
      // Save new credential dynamically
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
      setActiveTab('elderly');
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
      setActiveTab('elderly');
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
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView mockVillages={mockVillages} reports={reports} setReports={setReports} />;
      case 'asha':
        return <ASHAView addToast={addToast} reports={reports} setReports={setReports} currentUser={currentUser} isOnline={isOnline} setIsOnline={setIsOnline} />;
      case 'ai':
        return <AIView />;
      case 'asha-performance':
        return <ASHAPerformanceView reports={reports} />;
      case 'elderly':
        return <ElderlyView addToast={addToast} currentUser={currentUser} />;
      default:
        return <DashboardView mockVillages={mockVillages} reports={reports} />;
    }
  };

  const getFormattedDate = () => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center">
        <AuthView onLogin={handleLogin} onRegister={handleRegister} />
        
        {/* Global Toast Alerts */}
        <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0">
          {toasts.map((t) => (
            <div
              key={t.id}
              className="bg-white text-slate-800 font-semibold text-sm px-4 py-3 rounded-lg border border-slate-200 flex items-center justify-between shadow-sm animate-slide-in"
            >
              <span>{t.message}</span>
              <button
                onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                className="ml-3 text-slate-400 hover:text-slate-600 font-bold"
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
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* 1. Left Sidebar Navigation (Desktop Layout) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between flex-shrink-0 z-30">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-slate-200">
            <h1 className="text-xl font-extrabold text-blue-800 tracking-tight flex items-center gap-1.5">
              <span className="text-blue-600">Jal</span>Suraksha
            </h1>
            <p className="text-[10px] text-slate-500 font-bold tracking-wider uppercase mt-1">Water Safety & Health Command</p>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            
            {/* Tab 1: Dashboard (Visible to District Officer & ASHA Worker) */}
            {(userRole === 'District Officer' || userRole === 'ASHA Worker') && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <DashboardIcon />
                <span>Dashboard Map</span>
              </button>
            )}

            {/* Tab 2: ASHA Worker (Visible to ASHA Worker) */}
            {userRole === 'ASHA Worker' && (
              <button
                onClick={() => setActiveTab('asha')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'asha'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <ASHAIcon />
                <span>ASHA Reporting</span>
              </button>
            )}

            {/* Tab 3: AI Forecasting (Visible to District Officer) */}
            {userRole === 'District Officer' && (
              <button
                onClick={() => setActiveTab('ai')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'ai'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <AIIcon />
                <span>AI Predictions</span>
              </button>
            )}

            {/* Tab 3.5: ASHA Performance (Visible to District Officer) */}
            {userRole === 'District Officer' && (
              <button
                onClick={() => setActiveTab('asha-performance')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'asha-performance'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <StaffIcon />
                <span>ASHA Performance</span>
              </button>
            )}

            {/* Tab 4: Elderly SOS (Visible to Senior Citizen) */}
            {userRole === 'Senior Citizen' && (
              <button
                onClick={() => setActiveTab('elderly')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'elderly'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <ElderlyIcon />
                <span>Elderly SOS</span>
              </button>
            )}

          </nav>
        </div>

        {/* Sidebar Footer Info with Logout */}
        <div className="p-4 border-t border-slate-200 space-y-3">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 text-center">
            <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Active Role</span>
            <span className="text-xs font-bold text-slate-700">{userRole}</span>
          </div>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              addToast("🚪 Logged out successfully.");
            }}
            className="w-full h-10 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <span>🚪</span> Log Out
          </button>
          <div className="text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SIH HACKATHON 2026</p>
          </div>
        </div>
      </aside>

      {/* 2. Main Work Content Layout Area */}
      <div className="flex-grow flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex justify-between items-center z-20">
          <div>
            <h2 className="text-base font-bold text-slate-700 uppercase tracking-wider">
              {activeTab === 'dashboard' && 'District Command Console'}
              {activeTab === 'asha' && 'Field Worker reporting dashboard'}
              {activeTab === 'ai' && 'Spatiotemporal Forecasting'}
              {activeTab === 'asha-performance' && 'Health Worker Performance & Logs'}
              {activeTab === 'elderly' && 'Elderly Outbreak Companion'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Interactive Network status badge */}
            <button 
              onClick={() => {
                setIsOnline(!isOnline);
                addToast(isOnline ? "⚠️ System switched to Offline mode. Reports will be queued." : "📶 Back Online! Sync queue ready.");
              }}
              className={`flex items-center px-3 py-1 rounded-lg text-xs font-bold transition-colors tactile-btn ${
                isOnline ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {isOnline ? <WifiIcon /> : <WifiOffIcon />}
              <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
            </button>
            <span className="text-sm font-bold text-slate-500">{getFormattedDate()}</span>
          </div>
        </header>

        {/* Active Router Content Area */}
        <main className="flex-grow p-8 overflow-y-auto">
          {renderActiveView()}
        </main>

      </div>

      {/* 3. Global Toast Alerts Container */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-white text-slate-800 font-semibold text-sm px-4 py-3 rounded-lg border border-slate-200 flex items-center justify-between shadow-sm animate-slide-in"
          >
            <span>{t.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              className="ml-3 text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
