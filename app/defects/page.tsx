'use client';

import { motion } from 'motion/react';
import { 
  Bug, 
  AlertTriangle, 
  Search, 
  Filter, 
  ArrowUpRight,
  ShieldAlert,
  Clock,
  CheckCircle2
} from 'lucide-react';

const defects = [
  {
    id: 'DEF-892',
    title: 'Payment Gateway Timeout on High Load',
    severity: 'Critical',
    aiConfidence: 98,
    module: 'Transaction Risk Engine',
    status: 'Triage',
    time: '2h ago',
    assignee: 'SecOps Sentinel',
    rootCause: 'Database connection pool exhaustion',
  },
  {
    id: 'DEF-891',
    title: 'UI Misalignment on Mobile Checkout',
    severity: 'Medium',
    aiConfidence: 92,
    module: 'Checkout Flow',
    status: 'Assigned',
    time: '4h ago',
    assignee: 'Pixel Perfect',
    rootCause: 'CSS Grid gap property not supported in older Safari',
  },
  {
    id: 'DEF-890',
    title: 'Data Sync Delay in Dashboard',
    severity: 'High',
    aiConfidence: 85,
    module: 'Analytics',
    status: 'Investigating',
    time: '1d ago',
    assignee: 'Velocity Core',
    rootCause: 'Redis cache invalidation failure',
  },
  {
    id: 'DEF-889',
    title: 'Incorrect Currency Symbol for JPY',
    severity: 'Low',
    aiConfidence: 99,
    module: 'Localization',
    status: 'Resolved',
    time: '2d ago',
    assignee: 'System',
    rootCause: 'Hardcoded USD symbol in component',
  },
];

const severityColors = {
  Critical: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  High: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
};

export default function Defects() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">Defect Detection & Triage</h1>
          <p className="text-sm text-slate-400">AI-powered root cause analysis and automated assignment</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search defects..."
              className="rounded-lg border border-slate-700 bg-slate-900 py-2 pl-9 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-rose-400 mb-2">
            <ShieldAlert className="h-5 w-5" />
            <h3 className="font-semibold">Critical</h3>
          </div>
          <p className="text-3xl font-bold text-slate-100">3</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-orange-400 mb-2">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="font-semibold">High</h3>
          </div>
          <p className="text-3xl font-bold text-slate-100">12</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Clock className="h-5 w-5" />
            <h3 className="font-semibold">Avg Triage Time</h3>
          </div>
          <p className="text-3xl font-bold text-slate-100">4.2m</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="font-semibold">AI Resolution</h3>
          </div>
          <p className="text-3xl font-bold text-slate-100">68%</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-950/50 text-xs uppercase text-slate-300 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 font-medium">Defect ID</th>
              <th className="px-6 py-4 font-medium">Issue Details</th>
              <th className="px-6 py-4 font-medium">Severity</th>
              <th className="px-6 py-4 font-medium">AI Confidence</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {defects.map((defect, idx) => (
              <motion.tr 
                key={defect.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="hover:bg-slate-800/30 transition-colors group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Bug className="h-4 w-4 text-slate-500" />
                    <span className="font-mono text-cyan-400 font-medium">{defect.id}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 ml-6">{defect.time}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-200 mb-1">{defect.title}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{defect.module}</span>
                    <span className="truncate max-w-xs" title={defect.rootCause}>AI Root Cause: {defect.rootCause}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${severityColors[defect.severity as keyof typeof severityColors]}`}>
                    {defect.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-slate-800">
                      <div 
                        className={`h-full rounded-full ${defect.aiConfidence > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${defect.aiConfidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-slate-300">{defect.aiConfidence}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-slate-300">{defect.status}</span>
                    <span className="text-xs text-slate-500 mt-1">{defect.assignee}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-md hover:bg-cyan-500/10">
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
