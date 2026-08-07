import React, { useState } from 'react';

// Custom inline icons
const AlertTriangleIcon = () => (
  <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-4 h-4 text-slate-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

export default function DashboardView({ mockVillages, reports, setReports }) {
  const [selectedVillage, setSelectedVillage] = useState(mockVillages[0]);
  const [activeSymptomFilter, setActiveSymptomFilter] = useState('All');

  // Handle executive dispatch action on reports
  const handleAction = (reportId, newStatus) => {
    setReports(prev =>
      prev.map(r => r.id === reportId ? { ...r, status: newStatus } : r)
    );
  };

  // Filtered reports list for Action Console
  const filteredReports = activeSymptomFilter === 'All' 
    ? reports 
    : reports.filter(r => r.symptom.toLowerCase() === activeSymptomFilter.toLowerCase());

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* 1. Header Banner & KPI Summary Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>🛡️</span> District Surveillance & Outbreak Triage Desk
          </h1>
          <p className="text-xs font-bold text-slate-500 mt-1">
            Real-time IoT water quality sensors, field case logs, and automated outbreak response control.
          </p>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl flex items-center space-x-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-extrabold text-emerald-800">7 Sensor Nodes Live</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 border-t-4 border-t-blue-500 shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Telemetry Nodes</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">7 Villages</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
              🛰️
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-600 mt-2 block">100% Sensor Network Online</span>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 border-t-4 border-t-rose-500 shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Active High Risk Alerts</span>
              <h3 className="text-2xl font-black text-rose-600 mt-1">2 Villages</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-black">
              ⚠️
            </div>
          </div>
          <span className="text-[11px] font-bold text-rose-600 mt-2 block">Haroa & Bordumsa breach limits</span>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 border-t-4 border-t-amber-500 shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Pending Field Cases</span>
              <h3 className="text-2xl font-black text-amber-600 mt-1">{reports.filter(r => r.status === 'Pending').length} Pending</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
              📋
            </div>
          </div>
          <span className="text-[11px] font-bold text-amber-600 mt-2 block">Requires Kit Dispatch</span>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 border-t-4 border-t-emerald-500 shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Avg Turbidity Index</span>
              <h3 className="text-2xl font-black text-emerald-700 mt-1">3.4 NTU</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
              💧
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-600 mt-2 block">Within regional safe boundaries</span>
        </div>

      </div>

      {/* 2. Main Work Dashboard: GIS Map (Left) + Outbreak Action Console (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* GIS Interactive Topological Map Panel (7 Columns) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between space-y-4 shadow-2xs">
          
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <span>🗺️ Interactive Topological GIS Map</span>
              </h2>
              <p className="text-xs font-bold text-slate-500">Tap village node to inspect telemetry & water parameters</p>
            </div>
            <span className="text-[10px] font-extrabold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
              7 Active Nodes
            </span>
          </div>

          {/* Interactive Topological Map Grid Graphic */}
          <div className="relative w-full h-[400px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-4 shadow-inner flex items-center justify-center">
            
            {/* Background River Grid Graphic Overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none stroke-blue-400" fill="none">
              <path d="M 0 100 Q 150 50, 300 180 T 600 250 T 800 350" strokeWidth="6" />
              <path d="M 100 0 Q 200 150, 350 200 T 550 400" strokeWidth="4" />
              <circle cx="300" cy="180" r="80" fill="currentColor" opacity="0.05" />
            </svg>

            {/* Village Sensor Nodes */}
            {mockVillages.map((v) => {
              const isSelected = selectedVillage.id === v.id;
              const isHigh = v.risk === 'high';
              const isMed = v.risk === 'medium';

              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVillage(v)}
                  style={{ top: `${v.lat}%`, left: `${v.lng}%` }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-200 ${
                    isSelected ? 'z-30 scale-125' : 'z-10 hover:scale-110'
                  }`}
                >
                  {/* Ping Animation for High Risk Nodes */}
                  {isHigh && (
                    <span className="absolute -inset-2 rounded-full bg-rose-500 opacity-40 animate-ping"></span>
                  )}

                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-black text-xs shadow-lg transition-all ${
                    isHigh 
                      ? 'bg-rose-600 border-white text-white shadow-rose-900/50' 
                      : isMed 
                      ? 'bg-amber-500 border-white text-white shadow-amber-900/50' 
                      : 'bg-emerald-500 border-white text-white shadow-emerald-900/50'
                  }`}>
                    {v.name.charAt(0)}
                  </div>

                  {/* Village Label Tooltip */}
                  <div className={`absolute top-9 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[10px] font-black px-2 py-0.5 rounded-md backdrop-blur-md shadow-md border ${
                    isSelected 
                      ? 'bg-blue-600 text-white border-blue-400' 
                      : 'bg-slate-900/90 text-slate-200 border-slate-700'
                  }`}>
                    {v.name}
                  </div>
                </button>
              );
            })}

            {/* Map Legend Bar */}
            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md border border-slate-800 p-2.5 rounded-lg flex items-center space-x-4 text-[10px] font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> High Risk
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Medium Risk
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Safe
              </span>
            </div>

          </div>

          {/* Selected Village Detailed Telemetry Panel */}
          {selectedVillage && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <span>📍 Selected Node:</span> {selectedVillage.name} Village
                </h3>
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                  selectedVillage.risk === 'high' 
                    ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                    : selectedVillage.risk === 'medium'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  Risk Score: {selectedVillage.riskScore}/100
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-bold text-slate-600">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase block font-extrabold">Water Quality</span>
                  <span className="text-slate-900 font-black">{selectedVillage.waterQuality}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase block font-extrabold">Reported Symptoms</span>
                  <span className="text-slate-900 font-black">{selectedVillage.cases} active cases</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Outbreak Action Console (5 Columns) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between space-y-4 shadow-2xs">
          
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span>⚡ Outbreak Action Console</span>
                </h2>
                <p className="text-xs font-bold text-slate-500">Executive triage & medical kit dispatches</p>
              </div>
              <span className="text-[10px] font-black bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-200">
                {reports.length} Total Logs
              </span>
            </div>

            {/* Symptom Pill Filter Bar */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
              <span className="flex items-center text-[10px] font-black text-slate-400 uppercase mr-1">
                <FilterIcon /> Filter:
              </span>
              {['All', 'Diarrhea', 'Vomiting', 'Fever'].map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => setActiveSymptomFilter(symptom)}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                    activeSymptomFilter === symptom
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>

            {/* Interactive Reports Table */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {filteredReports.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-xs font-bold text-slate-400">No reports found for "{activeSymptomFilter}" filter.</p>
                </div>
              ) : (
                filteredReports.map((r) => {
                  const isPending = r.status === 'Pending';
                  const isDispatched = r.status === 'Medical Kit Dispatched';
                  const isResolved = r.status === 'Resolved';

                  return (
                    <div
                      key={r.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2.5 shadow-2xs"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-black text-sm text-slate-900">{r.patient}</span>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                              {r.symptom}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-extrabold block mt-0.5">
                            Logged by {r.workerName || 'ASHA Worker'} • {r.time}
                          </span>
                        </div>

                        {/* Status Tag */}
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-black border ${
                          isPending 
                            ? 'bg-amber-50 text-amber-800 border-amber-200' 
                            : isDispatched 
                            ? 'bg-blue-50 text-blue-800 border-blue-200' 
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          {r.status}
                        </span>
                      </div>

                      {/* Executive Action Controls */}
                      <div className="flex items-center space-x-2 pt-1 border-t border-slate-100">
                        {isPending && (
                          <button
                            onClick={() => handleAction(r.id, 'Medical Kit Dispatched')}
                            className="flex-1 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center justify-center space-x-1"
                          >
                            <span>🚚 Dispatch Medical Kit</span>
                          </button>
                        )}
                        {!isResolved && (
                          <button
                            onClick={() => handleAction(r.id, 'Resolved')}
                            className="flex-1 h-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center justify-center space-x-1"
                          >
                            <CheckCircleIcon />
                            <span>Mark Resolved</span>
                          </button>
                        )}
                        {isResolved && (
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircleIcon /> Case Closed
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100 text-center">
            <span className="text-[11px] font-bold text-blue-900">
              💡 Actions taken here immediately update the field status on ASHA workers' devices.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
