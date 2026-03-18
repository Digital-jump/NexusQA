'use client';

import { motion } from 'motion/react';
import { 
  Users, 
  ShieldAlert, 
  Zap, 
  Eye, 
  MessageSquare,
  Bot,
  ArrowRightLeft
} from 'lucide-react';

const agents = [
  {
    id: 'agent-sec',
    name: 'SecOps Sentinel',
    role: 'Security Testing',
    icon: ShieldAlert,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    status: 'Active',
    tasks: 14,
    description: 'Specializes in penetration testing, vulnerability scanning, and compliance checks.'
  },
  {
    id: 'agent-perf',
    name: 'Velocity Core',
    role: 'Performance Testing',
    icon: Zap,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    status: 'Active',
    tasks: 8,
    description: 'Monitors load times, stress tests endpoints, and identifies bottlenecks.'
  },
  {
    id: 'agent-ui',
    name: 'Pixel Perfect',
    role: 'UI/UX Validation',
    icon: Eye,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    status: 'Idle',
    tasks: 0,
    description: 'Validates visual regressions, responsive design, and accessibility standards.'
  }
];

const workflowEvents = [
  { time: '10:42 AM', agent: 'SecOps Sentinel', action: 'Detected exposed API key in staging environment.', type: 'alert' },
  { time: '10:45 AM', agent: 'Velocity Core', action: 'Initiated load test on affected endpoint to verify rate limiting.', type: 'action' },
  { time: '10:50 AM', agent: 'System', action: 'Rate limit confirmed. Vulnerability marked as High Severity.', type: 'system' },
  { time: '11:05 AM', agent: 'Pixel Perfect', action: 'Verified error messaging on UI for rate-limited requests.', type: 'action' },
];

export default function Agents() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">AI QA Agent Swarm</h1>
          <p className="text-sm text-slate-400">Collaborative autonomous testing personas</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white hover:bg-cyan-500 transition-colors">
            <Bot className="h-5 w-5" />
            Deploy New Agent
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl border ${agent.borderColor} bg-slate-900/50 p-6 backdrop-blur-sm relative overflow-hidden`}
          >
            <div className={`absolute top-0 right-0 p-4 ${agent.bgColor} rounded-bl-3xl`}>
              <agent.icon className={`h-8 w-8 ${agent.color}`} />
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-100">{agent.name}</h3>
              <p className={`text-sm font-medium ${agent.color}`}>{agent.role}</p>
            </div>
            
            <p className="text-sm text-slate-400 mb-6 h-10">{agent.description}</p>
            
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${agent.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`}></div>
                <span className="text-sm text-slate-300">{agent.status}</span>
              </div>
              <div className="text-sm text-slate-400">
                <span className="font-mono text-slate-200">{agent.tasks}</span> active tasks
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-cyan-400" />
            Live Collaboration Workflow
          </h2>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <MessageSquare className="h-4 w-4" />
            Agent Comms Channel
          </div>
        </div>

        <div className="space-y-6">
          {workflowEvents.map((event, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center border ${
                  event.type === 'alert' ? 'border-rose-500/30 bg-rose-500/10 text-rose-400' :
                  event.type === 'system' ? 'border-slate-500/30 bg-slate-800 text-slate-400' :
                  'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                }`}>
                  {event.type === 'alert' ? <ShieldAlert className="h-5 w-5" /> :
                   event.type === 'system' ? <Bot className="h-5 w-5" /> :
                   <Zap className="h-5 w-5" />}
                </div>
                {i !== workflowEvents.length - 1 && (
                  <div className="w-px h-full bg-slate-800 my-2"></div>
                )}
              </div>
              
              <div className="flex-1 pb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-slate-200">{event.agent}</span>
                  <span className="text-xs text-slate-500 font-mono">{event.time}</span>
                </div>
                <div className={`rounded-lg p-3 text-sm ${
                  event.type === 'alert' ? 'bg-rose-500/5 border border-rose-500/20 text-rose-200' :
                  event.type === 'system' ? 'bg-slate-800/50 border border-slate-700 text-slate-300' :
                  'bg-slate-950 border border-slate-800 text-slate-300'
                }`}>
                  {event.action}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
