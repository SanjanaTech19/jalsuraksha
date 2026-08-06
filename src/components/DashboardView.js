import React, { useState } from 'react';

// Crisp inline SVG Lucide representation icons
const BuildingIcon = () => (
  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ActivityIcon = () => (
  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const WaterIcon = () => (
  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

export default function DashboardView({ mockVillages, reports, setReports }) {
  const [selectedVillage, setSelectedVillage] = useState(mockVillages[0]);
  const [hoveredVillage, setHoveredVillage] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  const filteredReports = reports.filter(r => {
    if (activeCategoryFilter === 'All') return true;
    return r.symptom === activeCategoryFilter;
  });

  const handleUpdateStatus = (idOrPatient, newStatus) => {
    if (!setReports) return;
    setReports(prev => prev.map(r => {
      const match = r.id ? r.id === idOrPatient : r.patient === idOrPatient;
      if (match) {
        return { ...r, status: newStatus };
      }
      return r;
    }));
  };

  // Live critical alerts list
  const tickerAlerts = [
    { type: 'high', text: "High turbidity in Haroa (8.1 NTU)" },
    { type: 'high', text: "Suspected diarrhea case in Bordumsa" },
    { type: 'medium', text: "Chlorine low in Dhemaji reservoir" },
  ];

  return (
    <div className="flex flex-col space-y-6">
      
      {/* 1. Flat KPI Cards at the Top (5 Cards with Trend Arrows) */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Villages</span>
            <BuildingIcon />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800">100</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <span>↑</span> <span className="ml-0.5">2%</span>
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alerts</span>
            <BellIcon />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800">7</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <span>↓</span> <span className="ml-0.5">12%</span>
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cases Today</span>
            <FileIcon />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800">34</span>
            <span className="text-xs font-bold text-rose-600 flex items-center">
              <span>↑</span> <span className="ml-0.5">8%</span>
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sensors</span>
            <ActivityIcon />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800">42<span className="text-slate-400 font-bold text-sm">/50</span></span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <span>↑</span> <span className="ml-0.5">1.2%</span>
            </span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 col-span-2 lg:col-span-1 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Water Index</span>
            <WaterIcon />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800">94.8%</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <span>↑</span> <span className="ml-0.5">0.5%</span>
            </span>
          </div>
        </div>

      </section>

      {/* 2. Main Work Area Layout (Map left, Reports/Alerts right) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Focus: Large Interactive Map & AI Recommendation */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          
          {/* Main Map Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-800">GIS Telemetry Surveillance Map</h3>
                <p className="text-xs text-slate-500">Select village pins to view real-time contamination logs</p>
              </div>
              <div className="flex gap-2.5 text-[11px] font-bold text-slate-600">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-600"></span> High</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500"></span> Medium</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-600"></span> Low Risk</span>
              </div>
            </div>

            {/* GIS SVG Map Container */}
            <div className="relative w-full h-[360px] bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
              
              {/* Topological map background grid */}
              <svg className="absolute inset-0 w-full h-full text-slate-200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="mapGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mapGrid)" />
                {/* River path */}
                <path d="M -20,150 C 120,120 220,240 380,180 C 520,120 600,280 800,230" fill="none" stroke="#e0f2fe" strokeWidth="8" strokeLinecap="round" />
                <path d="M -20,150 C 120,120 220,240 380,180 C 520,120 600,280 800,230" fill="none" stroke="#bae6fd" strokeWidth="1" strokeDasharray="3,3" />
                {/* Elevation Contours */}
                <path d="M 80,40 C 160,30 220,70 240,130 C 260,190 200,240 130,230 C 70,220 50,150 80,40 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M 520,60 C 600,50 670,90 660,160 C 650,230 570,250 500,230 C 430,210 450,90 520,60 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>

              {/* Water reservoir indicator */}
              <div className="absolute top-8 left-12 flex items-center space-x-1.5 bg-white px-2 py-1 rounded border border-slate-200 text-[10px] font-bold text-slate-700">
                <span>💧 Intake Station Alpha</span>
              </div>

              {/* Village Nodes */}
              {mockVillages.map((village) => {
                const riskColor = village.risk === 'high' ? 'bg-rose-600' : village.risk === 'medium' ? 'bg-amber-500' : 'bg-emerald-600';
                const borderColor = village.risk === 'high' ? 'border-rose-200' : village.risk === 'medium' ? 'border-amber-200' : 'border-emerald-200';
                
                return (
                  <div
                    key={village.id}
                    style={{ top: `${village.lat}%`, left: `${village.lng}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                    onClick={() => setSelectedVillage(village)}
                    onMouseEnter={() => setHoveredVillage(village)}
                    onMouseLeave={() => setHoveredVillage(null)}
                  >
                    {/* Small flat circular pin with thin border */}
                    <div className={`w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center transition-transform hover:scale-110 border-slate-300 ${borderColor}`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${riskColor}`}></div>
                    </div>

                    {/* Small name tag */}
                    <div className="absolute top-5.5 left-1/2 -translate-x-1/2 bg-white text-slate-700 border border-slate-200 text-[9px] font-bold px-1 rounded whitespace-nowrap">
                      {village.name}
                    </div>
                  </div>
                );
              })}

              {/* Hover Tooltip Overlay (Clean light styling) */}
              {hoveredVillage && (
                <div
                  style={{
                    top: `${hoveredVillage.lat - 12}%`,
                    left: `${hoveredVillage.lng > 75 ? hoveredVillage.lng - 32 : hoveredVillage.lng + 5}%`
                  }}
                  className="absolute z-20 bg-white border border-slate-200 p-3 rounded-lg w-48 text-xs font-semibold pointer-events-none"
                >
                  <h4 className="font-bold border-b border-slate-100 pb-1.5 mb-1.5 flex justify-between">
                    <span>{hoveredVillage.name}</span>
                    <span className={`text-[10px] font-bold uppercase ${
                      hoveredVillage.risk === 'high' ? 'text-rose-600' :
                      hoveredVillage.risk === 'medium' ? 'text-amber-500' :
                      'text-emerald-600'
                    }`}>
                      {hoveredVillage.risk} Risk
                    </span>
                  </h4>
                  <p className="flex justify-between text-slate-500">Cases: <span className="text-slate-800 font-bold">{hoveredVillage.cases}</span></p>
                  <p className="flex justify-between mt-0.5 text-slate-500">Risk Factor: <span className="text-slate-800 font-bold">{hoveredVillage.riskScore}%</span></p>
                  <p className="flex justify-between mt-0.5 text-slate-500">Water Quality: <span className="text-slate-800 font-bold">{hoveredVillage.waterQuality}</span></p>
                </div>
              )}

            </div>
          </div>

          {/* AI Recommendation: Redesigned as a normal info panel */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col space-y-2">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>📋</span> Current Predictive Risk Intelligence Summary
            </h4>
            <p className="text-base font-bold text-slate-900 leading-snug">
              Outbreak warning indicators projecting potential cholera spike in <span className="text-blue-600">Dhemaji District</span> within 48 hours. 
              Recommended mitigation step: Dispatch chlorination kits to PHC and coordinate water boiling warnings.
            </p>
          </div>

        </div>

        {/* Right Column: Recent Reports and Alerts */}
        <div className="flex flex-col space-y-6">
          
          {/* Alerts Feed */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-800">Critical Warnings</h3>
              <p className="text-xs text-slate-500">Real-time alerts requiring immediate action</p>
            </div>
            
            <div className="space-y-2.5">
              {tickerAlerts.map((alert, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-lg border text-sm font-semibold flex items-start gap-2.5 ${
                    alert.type === 'high' ? 'bg-rose-50/50 border-rose-200 text-rose-900' : 'bg-amber-50/50 border-amber-200 text-amber-900'
                  }`}
                >
                  <span className="mt-0.5">{alert.type === 'high' ? '🆘' : '⚠️'}</span>
                  <span>{alert.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outbreak Action Console */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col space-y-4 min-h-[350px]">
            <div>
              <h3 className="text-base font-bold text-slate-800">Field Reports Action Console</h3>
              <p className="text-xs text-slate-500">Track and take care of ASHA worker submissions</p>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1 border-b border-slate-105 pb-3">
              {['All', 'Diarrhea', 'Vomiting', 'Fever'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all ${
                    activeCategoryFilter === cat
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Scrollable list of reports */}
            <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
              {filteredReports.length > 0 ? (
                filteredReports.map(report => (
                  <div 
                    key={report.id || report.patient} 
                    className="p-3 bg-slate-50/50 rounded-lg border border-slate-100 text-xs font-semibold space-y-2.5 transition-all hover:border-slate-350"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-bold text-slate-800 text-sm">{report.patient}</h5>
                        <div className="text-slate-500 flex gap-1 mt-0.5">
                          <span>{report.symptom}</span>
                          <span>•</span>
                          <span>{report.time}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-1">By: {report.workerName || 'Sunita Devi'}</span>
                      </div>
                      
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${
                        report.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        report.status === 'Medical Kit Dispatched' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {report.status || 'Pending'}
                      </span>
                    </div>

                    {/* Officer actions */}
                    {report.status !== 'Resolved' ? (
                      <div className="flex gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => handleUpdateStatus(report.id || report.patient, 'Medical Kit Dispatched')}
                          className="flex-1 bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 hover:border-blue-300 py-1.5 rounded text-[10px] font-bold transition-all cursor-pointer text-center"
                        >
                          Dispatch Kit
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(report.id || report.patient, 'Resolved')}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded text-[10px] font-bold transition-all cursor-pointer text-center"
                        >
                          Resolve
                        </button>
                      </div>
                    ) : (
                      <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 pt-2 border-t border-slate-100">
                        <span>✓</span> <span>Taken Care Of</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 py-8 text-xs">
                  No submissions in this category.
                </div>
              )}
            </div>
          </div>

        </div>

      </section>

      {/* Selected Node Details Panel (Appears at bottom if village clicked) */}
      <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-lg font-bold text-slate-800">Selected Node Telemetry: {selectedVillage.name}</h4>
            <p className="text-xs text-slate-500 font-semibold">Sensor diagnostics logs</p>
          </div>
          <span className={`px-2.5 py-1 rounded text-xs font-bold border ${
            selectedVillage.risk === 'high' ? 'bg-rose-50 border-rose-200 text-rose-700' :
            selectedVillage.risk === 'medium' ? 'bg-amber-50 border-amber-200 text-amber-700' :
            'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}>
            {selectedVillage.risk.toUpperCase()} RISK (Score: {selectedVillage.riskScore}%)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-sm font-semibold">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
            <span className="block text-[11px] font-bold text-slate-400 uppercase">Active Case Count</span>
            <span className="text-base font-extrabold text-slate-800 mt-1 block">{selectedVillage.cases} cases registered</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
            <span className="block text-[11px] font-bold text-slate-400 uppercase">Water Sensor Health</span>
            <span className="text-base font-extrabold text-slate-800 mt-1 block">{selectedVillage.waterQuality}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60">
            <span className="block text-[11px] font-bold text-slate-400 uppercase">Action Protocol Checklist</span>
            <span className="text-xs font-bold text-slate-600 mt-1.5 block">
              {selectedVillage.risk === 'high' ? '🚨 Deploy water disinfection & medical camps immediately.' : '✓ Standard water monitoring checks scheduled.'}
            </span>
          </div>
        </div>
      </section>



    </div>
  );
}
