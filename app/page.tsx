'use client';

import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Activity, 
  Bug, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const kpiData = [
  { name: 'Total Tests', value: '1,248', change: '+12%', icon: Activity, color: 'text-cyan-400' },
  { name: 'Pass Rate', value: '96.4%', change: '+2.1%', icon: CheckCircle2, color: 'text-emerald-400' },
  { name: 'Open Defects', value: '24', change: '-5', icon: Bug, color: 'text-rose-400' },
  { name: 'AI Confidence', value: '92%', change: '+4%', icon: ShieldCheck, color: 'text-purple-400' },
];

const executionData = [
  { time: '00:00', passed: 120, failed: 10, healed: 5 },
  { time: '04:00', passed: 132, failed: 8, healed: 12 },
  { time: '08:00', passed: 101, failed: 15, healed: 8 },
  { time: '12:00', passed: 145, failed: 5, healed: 20 },
  { time: '16:00', passed: 160, failed: 12, healed: 15 },
  { time: '20:00', passed: 150, failed: 9, healed: 10 },
];

const scalabilityData = [
  { name: 'Mon', nodes: 12, tests: 400 },
  { name: 'Tue', nodes: 15, tests: 550 },
  { name: 'Wed', nodes: 18, tests: 700 },
  { name: 'Thu', nodes: 24, tests: 950 },
  { name: 'Fri', nodes: 30, tests: 1200 },
  { name: 'Sat', nodes: 10, tests: 300 },
  { name: 'Sun', nodes: 10, tests: 350 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">AI Testing Command Center</h1>
          <p className="text-sm text-slate-400">Real-time intelligence and release governance</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm font-medium text-emerald-400">System Healthy</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">{kpi.name}</p>
                <p className="mt-2 text-3xl font-bold text-slate-100 font-mono">{kpi.value}</p>
              </div>
              <div className={`rounded-lg bg-slate-800/50 p-3 ${kpi.color}`}>
                <kpi.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={kpi.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}>
                {kpi.change}
              </span>
              <span className="ml-2 text-slate-500">vs last week</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Release Governance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="col-span-1 rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm flex flex-col"
        >
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Release Governance</h2>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center w-48 h-48 rounded-full border-4 border-emerald-500/20 bg-emerald-500/5">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin-slow"></div>
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400 mb-2" />
                <span className="text-2xl font-bold text-emerald-400 tracking-widest">GO</span>
              </div>
            </div>
            <div className="mt-8 w-full space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Security Scan</span>
                <span className="text-emerald-400">Passed</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Performance</span>
                <span className="text-emerald-400">Optimal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Regression</span>
                <span className="text-emerald-400">100%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Execution Trends */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="col-span-1 lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-100">Continuous Execution & Self-Healing</h2>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-400"></div>Passed</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-rose-400"></div>Failed</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-purple-400"></div>AI Healed</div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={executionData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Bar dataKey="passed" stackId="a" fill="#34d399" radius={[0, 0, 4, 4]} />
                <Bar dataKey="healed" stackId="a" fill="#c084fc" />
                <Bar dataKey="failed" stackId="a" fill="#fb7185" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Enterprise Scalability and Adoption Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Enterprise Scalability</h2>
              <p className="text-sm text-slate-400">Dynamic node allocation vs test volume</p>
            </div>
            <Zap className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scalabilityData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="tests" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#22d3ee' }} activeDot={{ r: 6 }} name="Test Volume" />
                <Line yAxisId="right" type="stepAfter" dataKey="nodes" stroke="#818cf8" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Active Nodes" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Adoption Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">AI Adoption Roadmap</h2>
              <p className="text-sm text-slate-400">Enterprise rollout progression</p>
            </div>
            <Activity className="h-5 w-5 text-purple-400" />
          </div>
          
          <div className="flex-1 relative">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-800"></div>
            <div className="space-y-6 relative">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shrink-0 z-10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-200">Phase 1: Pilot & Discovery</h3>
                  <p className="text-xs text-slate-400 mt-1">Initial AI agent deployment, baseline metrics established, and shadow testing mode enabled.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center shrink-0 z-10">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-cyan-400">Phase 2: Core Integration (Current)</h3>
                  <p className="text-xs text-slate-400 mt-1">CI/CD pipeline hooks, automated defect triage, and self-healing locators activated.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 z-10">
                  <span className="text-xs text-slate-500 font-mono">3</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-500">Phase 3: Autonomous Execution</h3>
                  <p className="text-xs text-slate-500 mt-1">Zero-touch test generation, predictive risk modeling, and full agent swarm collaboration.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 z-10">
                  <span className="text-xs text-slate-500 font-mono">4</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-500">Phase 4: Enterprise Scale</h3>
                  <p className="text-xs text-slate-500 mt-1">Cross-portfolio governance, dynamic node scaling, and business-KPI driven testing.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
