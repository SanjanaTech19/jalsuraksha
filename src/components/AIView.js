import React, { useState, useMemo } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function AIView() {
  // Horizon slider value: 0 is "Now", 6 is "6 Months Ahead"
  const [horizonMonths, setHorizonMonths] = useState(0);

  // Generate dynamic date text based on slider selection
  const targetDateText = useMemo(() => {
    const baseDate = new Date();
    baseDate.setMonth(baseDate.getMonth() + parseInt(horizonMonths));
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[baseDate.getMonth()]} ${baseDate.getFullYear()}`;
  }, [horizonMonths]);

  // Generate dynamic chart data based on forecast horizon to show reactive interaction
  const chartData = useMemo(() => {
    const data = [];
    const basePeakDay = 15; // Mid-month peak
    // Shift peak and scale cases based on horizon slider
    const shift = horizonMonths * 2; 
    const amplitude = 12 + horizonMonths * 3;

    for (let day = 1; day <= 30; day += 2) {
      // Baseline historical averages (stable curve)
      const baseline = Math.round(15 + 8 * Math.sin((day - 10) / 5));
      
      // ST-GNN AI Prediction (dynamic curve shifts depending on timeline selected)
      const gnnTrend = Math.round(
        15 + amplitude * Math.sin((day - basePeakDay + shift) / 4) + (horizonMonths * 1.5)
      );
      const predicted = Math.max(5, gnnTrend);

      const dataPoint = {
        day: `Day ${day}`,
        'Historical Baseline': baseline,
        'ST-GNN AI Prediction': predicted,
        // The gap represents the innovation: early warning gap
        'Early Warning Gap': Math.max(0, predicted - baseline)
      };
      data.push(dataPoint);
    }
    return data;
  }, [horizonMonths]);

  // Context-aware insights changing based on selected timeline
  const insightDetails = useMemo(() => {
    const h = parseInt(horizonMonths);
    if (h === 0) {
      return {
        title: "CRITICAL ALERT: Outbreak Spike Imminent (Next 48 Hours)",
        message: "ST-GNN deep spatial model detects abnormal runoff patterns + spike in water turbidity in Dhemaji District. Outbreak risk is calculated at 92%.",
        recommendation: "Deploy 2 Mobile Medical Units immediately. Distribute chlorine tablets & ORS packages to all border ASHA workers.",
        severity: "critical"
      };
    } else if (h <= 2) {
      return {
        title: "HIGH CONFIDENCE FORECAST: Monsoon Runoff Outbreak",
        message: `Predictive models project a significant water pollution surge for ${targetDateText} due to heavy rainfall forecasting. Anticipating case load index to exceed safety limits by 35%.`,
        recommendation: "Pre-position water chlorination kits and begin community boiling water campaigns. Clean local open water reservoirs in Bordumsa.",
        severity: "warning"
      };
    } else {
      return {
        title: "LONG-RANGE OUTLOOK: Dry Season Water Table Depletion",
        message: `Spatial models show high likelihood of water source contamination in ${targetDateText} due to stagnant pool formations. Low risk of rapid outbreaks, but high threat of chronic gastrointestinal issues.`,
        recommendation: "Schedule maintenance for community tubewells in Lohit and Namsai. Initiate bio-sand filter distribution drives.",
        severity: "info"
      };
    }
  }, [horizonMonths, targetDateText]);

  return (
    <div className="flex flex-col space-y-6 pb-20">
      
      {/* 1. Header Section */}
      <header className="bg-white p-5 rounded-xl border border-slate-200">
        <h2 className="text-xl font-extrabold text-slate-800">AI Predictive Outbreak Modeler</h2>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-0.5">Spatiotemporal Graph Neural Network (ST-GNN) analytics</p>
      </header>

      {/* 2. Interactive Time Slider Control */}
      <section className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-slate-700">Forecast Timeline Horizon</span>
          <span className="bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-200">
            {horizonMonths === 0 ? 'Current Status (Now)' : `${horizonMonths} Months Ahead`}
          </span>
        </div>

        <div className="space-y-2">
          {/* Custom styled range slider */}
          <input
            type="range"
            min="0"
            max="6"
            step="1"
            value={horizonMonths}
            onChange={(e) => setHorizonMonths(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
          />
          <div className="flex justify-between text-[11px] font-bold text-slate-400 px-1">
            <span>Now</span>
            <span>+1 Month</span>
            <span>+2 Months</span>
            <span>+3 Months</span>
            <span>+4 Months</span>
            <span>+5 Months</span>
            <span>+6 Months</span>
          </div>
        </div>

        <div className="pt-2 text-center">
          <p className="text-sm font-bold text-slate-800">
            Projecting Outbreak Risk Index For: <span className="text-blue-600 underline font-extrabold">{targetDateText}</span>
          </p>
        </div>
      </section>

      {/* 3. Recharts Dual-Line and Area Chart */}
      <section className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-800">Predicted Case Volumes vs Baseline</h3>
          <p className="text-xs text-slate-500">
            Shaded region highlights the <span className="text-rose-600 font-bold">Early Warning Gap</span> (Action Window)
          </p>
        </div>

        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 5, bottom: 5, left: -20 }}>
              <defs>
                <linearGradient id="warningGapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} fontWeight={600} />
              <YAxis stroke="#94a3b8" fontSize={11} fontWeight={600} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '8px', 
                  color: '#1e293b', 
                  border: '1px solid #e2e8f0',
                  fontSize: '12px',
                  fontWeight: '600'
                }} 
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: '600' }} />
              
              {/* Shaded Early Warning Gap Area */}
              <Area
                type="monotone"
                dataKey="ST-GNN AI Prediction"
                stroke="none"
                fill="url(#warningGapGrad)"
                name="Early Warning Risk Zone"
              />

              {/* Historical baseline curve */}
              <Line
                type="monotone"
                dataKey="Historical Baseline"
                stroke="#94a3b8"
                strokeWidth={2.5}
                strokeDasharray="4 4"
                dot={false}
              />
              
              {/* AI Predicted Case Load Curve */}
              <Line
                type="monotone"
                dataKey="ST-GNN AI Prediction"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{ r: 3, fill: '#dc2626', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 4. AI Insight Recommendation Card */}
      <section className={`p-5 rounded-xl border transition-all duration-300 ${
        insightDetails.severity === 'critical' ? 'bg-rose-50 border-rose-200 text-rose-950' :
        insightDetails.severity === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-950' :
        'bg-blue-50/50 border-blue-200 text-blue-950'
      }`}>
        <div className="flex items-start space-x-3">
          <div className="text-xl mt-0.5">
            {insightDetails.severity === 'critical' ? '🆘' :
             insightDetails.severity === 'warning' ? '⚠️' : '📢'}
          </div>
          <div className="space-y-2">
            <h4 className="font-extrabold text-base tracking-tight">{insightDetails.title}</h4>
            <p className="text-sm font-semibold leading-relaxed opacity-90">{insightDetails.message}</p>
            <div className="mt-3 bg-white p-3.5 rounded-lg border border-slate-200/60">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Recommended Response Action</span>
              <p className="text-sm font-bold text-slate-800">{insightDetails.recommendation}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
