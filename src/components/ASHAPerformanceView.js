import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ASHAPerformanceView({ reports }) {
  const [selectedWorkerId, setSelectedWorkerId] = useState(1);

  // Mock database of ASHA workers in the district
  const workers = useMemo(() => [
    { id: 1, name: "Sunita Devi", village: "Dhemaji", baseReports: 42, activeCases: 4, efficiency: 98, lastSeen: "5 mins ago", status: "Active" },
    { id: 2, name: "Priya Patel", village: "Namsai", baseReports: 28, activeCases: 2, efficiency: 94, lastSeen: "1 hour ago", status: "Active" },
    { id: 3, name: "Meena Gogoi", village: "Bordumsa", baseReports: 31, activeCases: 5, efficiency: 91, lastSeen: "2 hours ago", status: "Active" },
    { id: 4, name: "Rimi Sangma", village: "Haroa", baseReports: 18, activeCases: 1, efficiency: 89, lastSeen: "1 day ago", status: "Offline" },
    { id: 5, name: "Kiran Bala", village: "Subansiri", baseReports: 12, activeCases: 0, efficiency: 95, lastSeen: "3 days ago", status: "On Leave" }
  ], []);

  // Merge the dynamically submitted reports from App.js to calculate real-time stats!
  const workerStats = useMemo(() => {
    return workers.map(worker => {
      // Find reports filed by this worker
      const customReports = reports.filter(r => r.workerName === worker.name || (worker.name === "Sunita Devi" && !r.workerName));
      const totalReports = worker.baseReports + customReports.length;
      
      return {
        ...worker,
        reportsCount: totalReports,
        recentSubmissions: customReports.map(r => ({
          patient: r.patient,
          symptom: r.symptom,
          time: r.time,
          synced: r.synced
        }))
      };
    });
  }, [workers, reports]);

  const selectedWorker = useMemo(() => {
    return workerStats.find(w => w.id === selectedWorkerId) || workerStats[0];
  }, [workerStats, selectedWorkerId]);

  // Overall District Metrics
  const summaryMetrics = useMemo(() => {
    const totalSubmissions = workerStats.reduce((sum, w) => sum + w.reportsCount, 0);
    const avgEfficiency = Math.round(workerStats.reduce((sum, w) => sum + w.efficiency, 0) / workerStats.length);
    const activeStaff = workerStats.filter(w => w.status === 'Active').length;
    return {
      totalSubmissions,
      avgEfficiency,
      activeStaff
    };
  }, [workerStats]);

  // Chart Data preparation
  const chartData = useMemo(() => {
    return workerStats.map(w => ({
      name: w.name.split(' ')[0], // just first name for chart fit
      'Reports Submitted': w.reportsCount,
      'Efficiency %': w.efficiency
    }));
  }, [workerStats]);

  return (
    <div className="flex flex-col space-y-6 pb-20">
      
      {/* Header section */}
      <header className="bg-white p-5 rounded-xl border border-slate-200">
        <h2 className="text-xl font-extrabold text-slate-800">ASHA Performance & Field Logs</h2>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-0.5">District Officer monitoring of rural health worker efficiency</p>
      </header>

      {/* Summary metrics card grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Field Staff</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800">{summaryMetrics.activeStaff} <span className="text-slate-400 font-bold text-sm">/ {workerStats.length}</span></span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <span>↑</span> <span className="ml-0.5">Stable</span>
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Reports Monitored</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800">{summaryMetrics.totalSubmissions}</span>
            <span className="text-xs font-bold text-blue-600 flex items-center">
              <span>↑</span> <span className="ml-0.5">Live</span>
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Sync Efficiency</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-800">{summaryMetrics.avgEfficiency}%</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <span>↑</span> <span className="ml-0.5">99% SLA</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main interactive performance section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Workers Table list */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 flex flex-col space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-800">Assigned ASHA Health Workers</h3>
            <p className="text-xs text-slate-500">Select any worker to view their active cases and telemetry logs</p>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-lg">
            <table className="min-w-full divide-y divide-slate-150 text-left text-xs font-semibold">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="px-4 py-3">ASHA Name</th>
                  <th className="px-4 py-3">Assigned Village</th>
                  <th className="px-4 py-3 text-center">Total Reports</th>
                  <th className="px-4 py-3 text-center">Sync Efficiency</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 bg-white">
                {workerStats.map(w => (
                  <tr 
                    key={w.id} 
                    onClick={() => setSelectedWorkerId(w.id)}
                    className={`cursor-pointer transition-all hover:bg-slate-50/50 ${
                      selectedWorkerId === w.id ? 'bg-blue-50/40 hover:bg-blue-50/50 border-l-2 border-blue-600' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-bold text-slate-900">{w.name}</td>
                    <td className="px-4 py-3">{w.village}</td>
                    <td className="px-4 py-3 text-center font-extrabold">{w.reportsCount}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${
                        w.efficiency >= 95 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        w.efficiency >= 90 ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {w.efficiency}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1.5 font-bold ${
                        w.status === 'Active' ? 'text-emerald-600' :
                        w.status === 'Offline' ? 'text-slate-400' : 'text-amber-500'
                      }`}>
                        <span className={`h-2.5 w-2.5 rounded-full ${
                          w.status === 'Active' ? 'bg-emerald-500' :
                          w.status === 'Offline' ? 'bg-slate-300' : 'bg-amber-400'
                        }`}></span>
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Submission volume chart */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Field Worker Reports Comparison</h4>
            <div className="w-full h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontWeight={600} />
                  <YAxis stroke="#94a3b8" fontSize={10} fontWeight={600} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '8px', 
                      color: '#1e293b', 
                      border: '1px solid #e2e8f0',
                      fontSize: '11px',
                      fontWeight: '600'
                    }} 
                  />
                  <Bar dataKey="Reports Submitted" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column: Detailed Worker Performance & logs */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col space-y-5">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-800">Worker Profile</h3>
              <p className="text-xs text-slate-500">Live field logs & performance tracking</p>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Seen: {selectedWorker.lastSeen}</span>
          </div>

          {/* Performance profile card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-3 font-semibold text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Full Name:</span>
              <span className="text-slate-800 font-bold">{selectedWorker.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Jurisdiction:</span>
              <span className="text-slate-800 font-bold">{selectedWorker.village} Block</span>
            </div>
            <div className="flex justify-between">
              <span>Accuracy Index:</span>
              <span className="text-slate-800 font-bold">99.2% (Audited)</span>
            </div>
            <div className="flex justify-between">
              <span>Active Outbreak Cases:</span>
              <span className="text-slate-800 font-bold text-rose-600">{selectedWorker.activeCases} active</span>
            </div>
          </div>

          {/* Activity Log Feed */}
          <div className="space-y-3 flex-grow flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Worker Activity Feed</h4>
              
              {selectedWorker.recentSubmissions.length > 0 ? (
                <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                  {selectedWorker.recentSubmissions.map((sub, idx) => (
                    <div key={idx} className="p-3 bg-slate-50/50 border border-slate-100 rounded-lg flex items-center justify-between text-[11px] font-bold">
                      <div>
                        <span className="block text-slate-800 text-xs font-extrabold">{sub.patient}</span>
                        <span className="text-slate-500 block mt-0.5">Symptom: {sub.symptom} | {sub.time}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${
                        sub.synced ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {sub.synced ? 'Synced' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-lg text-center text-slate-400">
                  No dynamically submitted logs.
                </div>
              )}
            </div>

            {/* Response guidelines */}
            <div className="bg-blue-50/50 border border-blue-200 p-3 rounded-lg text-[11px] font-semibold text-blue-900 leading-relaxed mt-2">
              💡 **Officer Action Note:** Coordinate MMU vehicles if active cases in {selectedWorker.village} exceed 5, and chlorination supply drops to under 20%.
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
