'use client';

import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  CreditCard, 
  TrendingUp, 
  AlertOctagon,
  Lock,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const transactionData = [
  { time: '10:00', volume: 4000, riskScore: 12 },
  { time: '11:00', volume: 3000, riskScore: 15 },
  { time: '12:00', volume: 5500, riskScore: 18 },
  { time: '13:00', volume: 4500, riskScore: 14 },
  { time: '14:00', volume: 6000, riskScore: 45 }, // Spike in risk
  { time: '15:00', volume: 3500, riskScore: 22 },
  { time: '16:00', volume: 4200, riskScore: 16 },
];

const anomalyTypes = [
  { name: 'Velocity Check', count: 145, color: '#fb7185' },
  { name: 'Geo-Mismatch', count: 89, color: '#c084fc' },
  { name: 'CVV Failure', count: 234, color: '#22d3ee' },
  { name: 'Device Fingerprint', count: 67, color: '#fcd34d' },
];

export default function RiskEngine() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">Payment & Transaction Risk Engine</h1>
          <p className="text-sm text-slate-400">Real-time fraud detection and transaction validation</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-rose-500/10 px-3 py-1 border border-rose-500/20">
            <ShieldAlert className="h-4 w-4 text-rose-400" />
            <span className="text-sm font-medium text-rose-400">High Alert Mode</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Processed Volume</p>
              <p className="text-2xl font-bold text-slate-100">$2.4M</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-rose-500/10 text-rose-400">
              <AlertOctagon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Blocked Transactions</p>
              <p className="text-2xl font-bold text-slate-100">1,284</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">AI False Positive Rate</p>
              <p className="text-2xl font-bold text-slate-100">0.04%</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              Transaction Volume vs Risk Score
            </h2>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactionData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="volume" stroke="#22d3ee" strokeWidth={2} dot={false} name="Volume ($)" />
                <Line yAxisId="right" type="monotone" dataKey="riskScore" stroke="#fb7185" strokeWidth={2} dot={{ r: 4, fill: '#fb7185' }} name="Avg Risk Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="col-span-1 rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-100">Anomaly Distribution</h2>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={anomalyTypes} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                  cursor={{ fill: '#1e293b' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {anomalyTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
