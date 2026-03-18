'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  PlayCircle, 
  StopCircle, 
  RefreshCw, 
  AlertOctagon, 
  CheckCircle,
  Wrench
} from 'lucide-react';

type Test = {
  id: string;
  name: string;
  status: 'running' | 'pending' | 'passed' | 'failed' | 'healed';
  duration: string;
  browser: string;
  error?: string;
  note?: string;
};

const initialTests: Test[] = [
  { id: 'E2E-01', name: 'User Authentication Flow', status: 'running', duration: '12s', browser: 'Chrome' },
  { id: 'E2E-02', name: 'Checkout Process', status: 'pending', duration: '-', browser: 'Firefox' },
  { id: 'API-01', name: 'Payment Gateway Sync', status: 'passed', duration: '1.2s', browser: 'API' },
  { id: 'UI-05', name: 'Dashboard Rendering', status: 'failed', duration: '4.5s', browser: 'Safari', error: 'ElementNotInteractableException' },
  { id: 'E2E-08', name: 'Profile Update', status: 'healed', duration: '18s', browser: 'Chrome', note: 'AI updated locator from #btn-save to .save-action' },
];

export default function ExecutionEngine() {
  const [isRunning, setIsRunning] = useState(true);
  const [tests, setTests] = useState(initialTests);

  // Simulate real-time updates
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTests(current => {
        const newTests = [...current];
        const pendingIdx = newTests.findIndex(t => t.status === 'pending');
        const runningIdx = newTests.findIndex(t => t.status === 'running');

        if (runningIdx !== -1) {
          // Randomly pass or fail a running test
          newTests[runningIdx] = {
            ...newTests[runningIdx],
            status: Math.random() > 0.2 ? 'passed' : 'failed',
            duration: `${(Math.random() * 10 + 2).toFixed(1)}s`,
            error: Math.random() > 0.2 ? undefined : 'Timeout waiting for element'
          };
        }

        if (pendingIdx !== -1) {
          // Start a pending test
          newTests[pendingIdx] = {
            ...newTests[pendingIdx],
            status: 'running',
          };
        }

        // Simulate self-healing
        const failedIdx = newTests.findIndex(t => t.status === 'failed' && !t.note);
        if (failedIdx !== -1 && Math.random() > 0.5) {
          newTests[failedIdx] = {
            ...newTests[failedIdx],
            status: 'healed',
            note: 'AI auto-healed broken XPath selector',
          };
        }

        return newTests;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <RefreshCw className="h-5 w-5 text-cyan-400 animate-spin" />;
      case 'passed': return <CheckCircle className="h-5 w-5 text-emerald-400" />;
      case 'failed': return <AlertOctagon className="h-5 w-5 text-rose-400" />;
      case 'healed': return <Wrench className="h-5 w-5 text-purple-400" />;
      default: return <div className="h-3 w-3 rounded-full bg-slate-600 ml-1" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">Continuous Execution Engine</h1>
          <p className="text-sm text-slate-400">Real-time test execution with AI Self-Healing</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900 px-3 py-1.5 rounded-md border border-slate-800">
            <Activity className="h-4 w-4 text-cyan-400" />
            <span>Active Nodes: 24/30</span>
          </div>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white transition-colors ${
              isRunning ? 'bg-rose-600 hover:bg-rose-500' : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            {isRunning ? (
              <><StopCircle className="h-5 w-5" /> Stop Execution</>
            ) : (
              <><PlayCircle className="h-5 w-5" /> Resume Execution</>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Execution Feed */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            Live Execution Feed
          </h2>
          <div className="space-y-3">
            <AnimatePresence>
              {tests.map((test) => (
                <motion.div
                  key={test.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border ${
                    test.status === 'failed' ? 'border-rose-500/30 bg-rose-500/5' :
                    test.status === 'healed' ? 'border-purple-500/30 bg-purple-500/5' :
                    test.status === 'running' ? 'border-cyan-500/30 bg-cyan-500/5' :
                    'border-slate-800 bg-slate-950'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {getStatusIcon(test.status)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-500">{test.id}</span>
                        <span className="font-medium text-slate-200">{test.name}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                        <span>{test.browser}</span>
                        <span>•</span>
                        <span>{test.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status specific content */}
                  <div className="mt-3 sm:mt-0 sm:text-right">
                    {test.status === 'failed' && test.error && (
                      <span className="text-xs text-rose-400 font-mono bg-rose-400/10 px-2 py-1 rounded">
                        {test.error}
                      </span>
                    )}
                    {test.status === 'healed' && test.note && (
                      <span className="text-xs text-purple-400 flex items-center gap-1 sm:justify-end">
                        <Wrench className="h-3 w-3" />
                        {test.note}
                      </span>
                    )}
                    {test.status === 'passed' && (
                      <span className="text-xs text-emerald-400 font-medium">Passed</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Self-Healing Dashboard */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm flex flex-col">
          <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-purple-400" />
            Self-Healing Analytics
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
              <div className="text-3xl font-bold text-purple-400">142</div>
              <div className="text-xs text-slate-400 mt-1">Locators Healed</div>
            </div>
            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
              <div className="text-3xl font-bold text-emerald-400">94%</div>
              <div className="text-xs text-slate-400 mt-1">Success Rate</div>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-medium text-slate-300 mb-3">Recent AI Interventions</h3>
            <div className="space-y-6">
              {[
                { 
                  time: '2m ago', 
                  desc: 'Updated CSS selector for login button', 
                  conf: 98,
                  oldCode: 'await page.locator("#btn-login").click();',
                  newCode: 'await page.locator("[data-testid=\'login-submit\']").click();'
                },
                { 
                  time: '15m ago', 
                  desc: 'Handled unexpected popup modal', 
                  conf: 85,
                  oldCode: 'await page.click(".checkout");',
                  newCode: 'await handlePromoModal(page);\nawait page.click(".checkout");'
                },
                { 
                  time: '1h ago', 
                  desc: 'Adjusted wait timeout for API response', 
                  conf: 92,
                  oldCode: 'await expect(response).toBeOK();',
                  newCode: 'await expect(response).toBeOK({ timeout: 15000 });'
                },
              ].map((item, i) => (
                <div key={i} className="relative pl-4 border-l-2 border-slate-800 pb-2 last:pb-0 last:border-transparent">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-purple-500"></div>
                  <div className="text-xs text-slate-500 mb-1">{item.time}</div>
                  <div className="text-sm text-slate-300 font-medium">{item.desc}</div>
                  
                  <div className="mt-3 rounded-md overflow-hidden border border-slate-800 text-xs font-mono">
                    <div className="bg-rose-500/10 text-rose-400 px-3 py-1.5 border-b border-slate-800/50 flex items-start gap-2">
                      <span className="select-none opacity-50">-</span>
                      <span className="whitespace-pre-wrap break-all">{item.oldCode}</span>
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1.5 flex items-start gap-2">
                      <span className="select-none opacity-50">+</span>
                      <span className="whitespace-pre-wrap break-all">{item.newCode}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-800">
                      <div className="h-full rounded-full bg-purple-500" style={{ width: `${item.conf}%` }}></div>
                    </div>
                    <span className="text-xs text-slate-400">{item.conf}% conf</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
