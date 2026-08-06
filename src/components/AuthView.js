import React, { useState } from 'react';

export default function AuthView({ onLogin, onRegister }) {
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ASHA Worker'); // 'District Officer', 'ASHA Worker', 'Senior Citizen'
  const [village, setVillage] = useState('Bordumsa');
  const [language, setLanguage] = useState('English'); // Language preference

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    if (isSignUp) {
      if (!name) return;
      onRegister({
        name: name,
        email: email,
        password: password,
        role: role,
        village: village,
        language: language
      });
    } else {
      onLogin(email, password, role);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-blue-800 tracking-tight">
            <span className="text-blue-600">Jal</span>Suraksha
          </h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1.5">
            Water Safety & Health Command Portal
          </p>
        </div>

        {/* Title */}
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-800">
            {isSignUp ? 'Create Health Command Account' : 'Sign In to Portal'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isSignUp ? 'Register to start reporting water contamination logs' : 'Enter your credentials to access telemetry logs'}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isSignUp && (
            <div>
              <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramdas Prasad"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-semibold text-slate-800"
              />
            </div>
          )}

          <div>
            <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">Email or Mobile Number *</label>
            <input
              type="text"
              required
              placeholder="e.g. user@health.gov.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">Password *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-semibold text-slate-800"
            />
          </div>

          {/* User Role Selection */}
          <div>
            <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">Portal Role *</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-semibold bg-white text-slate-800"
            >
              <option value="District Officer">District Command Officer</option>
              <option value="ASHA Worker">ASHA Health Worker</option>
              <option value="Senior Citizen">Senior Citizen (Elderly Care)</option>
            </select>
          </div>

          {/* List of Villages Dropdown for Sign Up */}
          {isSignUp && (
            <div>
              <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">Assigned Village *</label>
              <select
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-semibold bg-white text-slate-800"
              >
                <option value="Bordumsa">Bordumsa</option>
                <option value="Dhemaji">Dhemaji</option>
                <option value="Namsai">Namsai</option>
                <option value="Lohit">Lohit</option>
                <option value="Haroa">Haroa</option>
                <option value="Subansiri">Subansiri</option>
                <option value="Pasighat">Pasighat</option>
              </select>
            </div>
          )}

          {/* Preferred Language Dropdown for Sign Up with Northeast Tribal Languages */}
          {isSignUp && (
            <div>
              <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">Preferred Language *</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-semibold bg-white text-slate-800"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिन्दी)</option>
                <option value="Bengali">Bengali (বাংলা)</option>
                <option value="Assamese">Assamese (অসমীয়া)</option>
                {/* Northeast Tribal Languages */}
                <option value="Khasi">Khasi (Meghalaya)</option>
                <option value="Mizo">Mizo (Mizoram)</option>
                <option value="Bodo">Bodo (Assam - बोडो)</option>
              </select>
            </div>
          )}

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-base font-bold transition-all tactile-btn flex items-center justify-center"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Toggle between Sign In / Sign Up */}
        <div className="text-center pt-2 border-t border-slate-100">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm font-bold text-blue-600 hover:underline hover:text-blue-800 focus:outline-none"
          >
            {isSignUp 
              ? 'Already have an account? Sign In' 
              : "Don't have an account? Create one"}
          </button>
        </div>

      </div>
    </div>
  );
}
