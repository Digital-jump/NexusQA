'use client';

import { motion } from 'motion/react';
import { 
  BrainCircuit, 
  Database, 
  GitBranch, 
  LineChart as LineChartIcon,
  Network,
  Cpu,
  RefreshCw,
  Bug
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';

const learningData = [
  { epoch: '100', accuracy: 82, coverage: 60 },
  { epoch: '200', accuracy: 85, coverage: 65 },
  { epoch: '300', accuracy: 89, coverage: 72 },
  { epoch: '400', accuracy: 92, coverage: 80 },
  { epoch: '500', accuracy: 95, coverage: 88 },
  { epoch: '600', accuracy: 97, coverage: 94 },
  { epoch: '700', accuracy: 98, coverage: 96 },
];

const radarData = [
  { subject: 'UI/UX', A: 120, B: 110, fullMark: 150 },
  { subject: 'API', A: 98, B: 130, fullMark: 150 },
  { subject: 'Security', A: 86, B: 130, fullMark: 150 },
  { subject: 'Performance', A: 99, B: 100, fullMark: 150 },
  { subject: 'E2E', A: 85, B: 90, fullMark: 150 },
  { subject: 'Accessibility', A: 65, B: 85, fullMark: 150 },
];

export default function Intelligence() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">AI Test Intelligence Layer</h1>
          <p className="text-sm text-slate-400">Continuous learning loop and predictive analytics</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 border border-purple-500/20">
            <Cpu className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Model: Nexus-v4.2 (Active)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Learning Loop Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-cyan-400" />
              Data Learning Loop
            </h2>
            <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">Real-time</span>
          </div>
          
          <div className="relative h-64 flex items-center justify-center">
            {/* Center Brain */}
            <div className="absolute z-10 flex flex-col items-center justify-center w-24 h-24 rounded-full bg-slate-950 border-2 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              <BrainCircuit className="h-10 w-10 text-cyan-400" />
              <span className="text-[10px] font-mono text-cyan-400 mt-1">CORE</span>
            </div>

            {/* Orbiting Nodes */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-48 h-48 rounded-full border border-slate-700/50 border-dashed"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
                  <Database className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 absolute top-8 whitespace-nowrap">Test Data</span>
              </div>
              
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center">
                  <GitBranch className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 absolute top-8 whitespace-nowrap">Code Changes</span>
              </div>
            </motion.div>

            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64 rounded-full border border-slate-700/30 border-dashed"
            >
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500 flex items-center justify-center">
                  <Bug className="h-4 w-4 text-rose-400" />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 absolute top-8 whitespace-nowrap">Defect Logs</span>
              </div>
              
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center">
                  <Network className="h-4 w-4 text-amber-400" />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 absolute top-8 whitespace-nowrap">Prod Telemetry</span>
              </div>
            </motion.div>

            {/* Connecting lines animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                  <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.circle 
                cx="50%" cy="50%" r="60" 
                stroke="url(#grad1)" strokeWidth="2" fill="none"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Model Accuracy & Coverage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              <LineChartIcon className="h-5 w-5 text-cyan-400" />
              Model Learning Curve
            </h2>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-cyan-400"></div>Accuracy</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-purple-400"></div>Coverage</div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={learningData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCoverage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c084fc" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#c084fc" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="epoch" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[50, 100]} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="accuracy" stroke="#22d3ee" fillOpacity={1} fill="url(#colorAccuracy)" strokeWidth={2} />
                <Area type="monotone" dataKey="coverage" stroke="#c084fc" fillOpacity={1} fill="url(#colorCoverage)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Test Coverage Radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Test Coverage Intelligence</h2>
            <p className="text-sm text-slate-400">AI-identified gaps vs Current Coverage</p>
          </div>
        </div>
        <div className="h-80 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar name="Current Coverage" dataKey="A" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.3} />
              <Radar name="AI Recommended" dataKey="B" stroke="#c084fc" fill="#c084fc" fillOpacity={0.3} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
