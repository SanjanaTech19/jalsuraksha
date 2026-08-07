import React, { useState } from 'react';

export default function ASHAPerformanceView({ reports }) {
  const [selectedWorker, setSelectedWorker] = useState(null);

  // Mock list of active ASHA field staff
  const ashaStaff = [
    { id: 1, name: 'Sunita Devi', village: 'Dhemaji', assignedCases: 14, accuracy: '98%', syncSpeed: 'Fast (LTE)', status: 'Active' },
    { id: 2, name: 'Meena Gogoi', village: 'Subansiri', assignedCases: 9, accuracy: '95%', syncSpeed: 'Medium (3G)', status: 'Active' },
    { id: 3, name: 'Priya Patel', village: 'Bordumsa', assignedCases: 18, accuracy: '92%', syncSpeed: 'Offline Buffer', status: 'In Field' },
    { id: 4, name: 'Rita Saikia', village: 'Namsai', assignedCases: 6, accuracy: '99%', syncSpeed: 'Fast (LTE)', status: 'Active' },
    { id: 5, name: 'Anita Das', village: 'Haroa', assignedCases: 12, accuracy: '94%', syncSpeed: 'Fast (LTE)', status: 'Active' }
  ];

  const currentWorker = selectedWorker || ashaStaff[0];

  // Filter reports submitted by current selected worker
  const workerReports = reports.filter(r => r.workerName?.toLowerCase().includes(currentWorker.name.split(' ')[0].toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* 1. Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-2xs">
        <div>
          <span className="text-xs font-black uppercase text-indigo-600 tracking-wider">Field Personnel Telemetry</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5 flex items-center gap-2">
            <span>👩‍⚕️</span> ASHA Worker Activity & Performance Analytics
          </h1>
          <p className="text-xs font-bold text-slate-500 mt-1">
            Real-time workload metrics, disease reporting accuracy, and offline sync speed auditing.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-black px-3.5 py-1.5 rounded-xl">
            5 Active Field Staff
          </span>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 border-t-4 border-t-indigo-500 shadow-2xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Cases Logged</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">59 Reports</h3>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">↑ 14% increase from last week</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 border-t-4 border-t-emerald-500 shadow-2xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Avg Reporting Accuracy</span>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">95.6%</h3>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">Verified by clinical labs</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 border-t-4 border-t-blue-500 shadow-2xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Sync Latency</span>
          <h3 className="text-2xl font-black text-blue-600 mt-1">&lt; 4 Minutes</h3>
          <span className="text-[11px] font-bold text-blue-600 mt-1 block">Auto-flushes on network recovery</span>
        </div>

      </div>

      {/* 3. Main Content: Staff Table (Left 7 Cols) + Worker Profile Feed (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Staff List Table (7 Columns) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-2xs">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <span>📊 Field Staff Directory</span>
              </h2>
              <p className="text-xs font-bold text-slate-500">Tap worker row to inspect detailed activity log</p>
            </div>

            <span className="text-[10px] font-black bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
              5 Staff Listed
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-bold">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-2">ASHA Name</th>
                  <th className="py-3 px-2">Village</th>
                  <th className="py-3 px-2">Assigned Cases</th>
                  <th className="py-3 px-2">Accuracy</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ashaStaff.map((worker) => {
                  const isSelected = currentWorker.id === worker.id;
                  return (
                    <tr
                      key={worker.id}
                      onClick={() => setSelectedWorker(worker)}
                      className={`cursor-pointer transition-all ${
                        isSelected ? 'bg-indigo-50/70 font-black text-indigo-950' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <td className="py-3.5 px-2 flex items-center">
                        <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center mr-2.5 border border-slate-200">
                          {worker.name.charAt(0)}
                        </div>
                        <span>{worker.name}</span>
                      </td>
                      <td className="py-3.5 px-2 text-slate-600">{worker.village}</td>
                      <td className="py-3.5 px-2 text-slate-900">{worker.assignedCases} cases</td>
                      <td className="py-3.5 px-2 text-emerald-600 font-extrabold">{worker.accuracy}</td>
                      <td className="py-3.5 px-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                          worker.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {worker.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Worker Activity Feed (5 Columns) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-2xs flex flex-col justify-between">
          <div className="space-y-4">
            
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <span>👤 Staff Telemetry Profile</span>
                </h2>
                <p className="text-xs font-bold text-slate-500">Activity & log submitted by {currentWorker.name}</p>
              </div>

              <span className="text-[10px] font-black bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md border border-indigo-200">
                {currentWorker.village}
              </span>
            </div>

            {/* Profile Overview Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-400 uppercase text-[10px] font-extrabold">Network Sync Speed</span>
                <span className="text-slate-900 font-black">{currentWorker.syncSpeed}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-400 uppercase text-[10px] font-extrabold">Accuracy Score</span>
                <span className="text-emerald-600 font-black">{currentWorker.accuracy}</span>
              </div>
            </div>

            {/* Submitted Reports Feed */}
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Submitted Clinical Reports</h3>
              
              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {workerReports.length === 0 ? (
                  <div className="p-4 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <p className="text-xs font-bold text-slate-400">No recent reports logged by {currentWorker.name}.</p>
                  </div>
                ) : (
                  workerReports.map((r) => (
                    <div key={r.id} className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-2xs">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-slate-900">{r.patient}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                          {r.symptom}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">Time: {r.time} | Status: <strong className="text-slate-700">{r.status}</strong></span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          <div className="bg-indigo-50/60 p-3 rounded-xl border border-indigo-100 text-center text-[11px] font-bold text-indigo-900">
            ✅ Verified active field responder under National Health Mission telemetry.
          </div>
        </div>

      </div>

    </div>
  );
}
