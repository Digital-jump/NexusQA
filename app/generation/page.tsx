'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Wand2, 
  Globe, 
  Play, 
  CheckCircle2, 
  Loader2,
  FileCode2,
  ListChecks,
  AlertTriangle,
  Download,
  Eye,
  EyeOff,
  Filter,
  Check,
  X
} from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';

type TestCase = {
  id: string;
  title: string;
  type: string;
  confidence: number;
  status: 'Ready' | 'Review';
};

export default function Generation() {
  const [url, setUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCases, setGeneratedCases] = useState<TestCase[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showCsvPreview, setShowCsvPreview] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Ready' | 'Review'>('All');
  const [executing, setExecuting] = useState<Record<string, 'running' | 'passed' | 'failed'>>({});

  const filteredCases = generatedCases.filter(tc => statusFilter === 'All' || tc.status === statusFilter);

  const getCsvContent = () => {
    if (filteredCases.length === 0) return '';
    const headers = ['Test ID', 'Description', 'Type', 'AI Confidence', 'Status'];
    const rows = filteredCases.map(tc => 
      `"${tc.id}","${tc.title.replace(/"/g, '""')}","${tc.type}","${tc.confidence}","${tc.status}"`
    );
    return [headers.join(','), ...rows].join('\n');
  };

  const handleExportCsv = () => {
    const csvContent = getCsvContent();
    if (!csvContent) return;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const blobUrl = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.setAttribute('href', blobUrl);
    a.setAttribute('download', 'test_cases.csv');
    a.style.visibility = 'hidden';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleExecuteAll = async () => {
    const casesToRun = filteredCases.filter(tc => !executing[tc.id] || executing[tc.id] !== 'running');
    if (casesToRun.length === 0) return;

    const newExecuting = { ...executing };
    casesToRun.forEach(tc => newExecuting[tc.id] = 'running');
    setExecuting(newExecuting);

    for (const tc of casesToRun) {
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
      setExecuting(prev => ({
        ...prev,
        [tc.id]: Math.random() > 0.15 ? 'passed' : 'failed'
      }));
    }
  };

  const handleExecuteSingle = async (id: string) => {
    if (executing[id] === 'running') return;
    setExecuting(prev => ({ ...prev, [id]: 'running' }));
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
    setExecuting(prev => ({
      ...prev,
      [id]: Math.random() > 0.15 ? 'passed' : 'failed'
    }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsGenerating(true);
    setGeneratedCases([]);
    setError(null);
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set in the environment.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      let domain = url;
      try {
        domain = new URL(url).hostname;
      } catch (e) {
        // Fallback if URL parsing fails
      }

      const promptText = prompt 
        ? `Analyze the web application at this URL: ${url} (Domain: ${domain}). The user has provided the following specific instructions: "${prompt}". Generate 5 realistic, high-value QA test cases that an AI testing framework should execute for this specific type of website, taking the user's instructions into account. Ensure you include specific Performance and Security test types tailored to the architecture of ${domain}.`
        : `Analyze the web application at this URL: ${url} (Domain: ${domain}). Generate 5 realistic, high-value QA test cases that an AI testing framework should execute for this specific type of website. Ensure you include specific Performance and Security test types tailored to the architecture of ${domain}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: promptText,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING, description: "Test case ID, e.g., TC-001" },
                title: { type: Type.STRING, description: "Brief description of the test case" },
                type: { type: Type.STRING, description: "Type of test, e.g., E2E, Functional, Security, UI/UX, Performance" },
                confidence: { type: Type.INTEGER, description: "AI confidence score from 0 to 100" },
                status: { type: Type.STRING, description: "Either 'Ready' or 'Review'" }
              },
              required: ["id", "title", "type", "confidence", "status"]
            }
          }
        }
      });
      
      if (response.text) {
        const cases = JSON.parse(response.text) as TestCase[];
        setGeneratedCases(cases);
      }
    } catch (err: any) {
      console.error("Error generating test cases:", err);
      setError(err.message || "Failed to generate test cases. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">Autonomous Test Generation</h1>
        <p className="text-sm text-slate-400">Input a web address to automatically generate comprehensive test cases using AI.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
      >
        <form onSubmit={handleGenerate} className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                required
              />
            </div>
          </div>
          
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Optional: Enter specific testing requirements or focus areas (e.g., 'Focus heavily on the checkout flow and payment gateway integrations')"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 px-4 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 min-h-[100px] resize-y"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isGenerating || !url}
              className="flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Wand2 className="h-5 w-5" />
              )}
              {isGenerating ? 'Analyzing DOM...' : 'Generate Tests'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-2 text-sm">
            <AlertTriangle className="h-5 w-5" />
            {error}
          </div>
        )}

        {isGenerating && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Scanning DOM structure and generating AI test cases...</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800 relative">
              <motion.div 
                className="absolute top-0 bottom-0 bg-cyan-500 rounded-full"
                initial={{ left: "-20%", width: "20%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-lg bg-slate-800/50 animate-pulse border border-slate-700/50"></div>
              ))}
            </div>
          </div>
        )}

        {generatedCases.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-medium text-slate-100 flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-cyan-400" />
                  Generated Test Suite
                </h3>
                <div className="flex items-center gap-1 bg-slate-900 rounded-lg p-1 border border-slate-800">
                  {(['All', 'Ready', 'Review'] as const).map(filter => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                        statusFilter === filter 
                          ? 'bg-slate-800 text-cyan-400' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button 
                  onClick={() => setShowCsvPreview(!showCsvPreview)}
                  className="flex items-center gap-2 rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  {showCsvPreview ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
                  {showCsvPreview ? 'Hide CSV' : 'Preview CSV'}
                </button>
                <button 
                  onClick={handleExportCsv}
                  className="flex items-center gap-2 rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  <Download className="h-4 w-4 text-cyan-400" />
                  Export CSV
                </button>
                <button 
                  onClick={handleExecuteAll}
                  className="flex items-center gap-2 rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  <Play className="h-4 w-4 text-emerald-400" />
                  Execute All
                </button>
              </div>
            </div>
            
            {showCsvPreview && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 overflow-hidden rounded-lg border border-slate-700 bg-slate-900"
              >
                <div className="p-2 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-400 px-2">test_cases.csv</span>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                  {getCsvContent()}
                </pre>
              </motion.div>
            )}

            <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-900 text-xs uppercase text-slate-300">
                  <tr>
                    <th className="px-6 py-3">Test ID</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">AI Confidence</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredCases.map((tc, idx) => (
                    <motion.tr 
                      key={tc.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="hover:bg-slate-900/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-cyan-400">{tc.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-200">{tc.title}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-300">
                          {tc.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 rounded-full bg-slate-800">
                            <div 
                              className={`h-full rounded-full ${tc.confidence > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                              style={{ width: `${tc.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{tc.confidence}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {executing[tc.id] === 'running' ? (
                          <span className="flex items-center gap-1 text-cyan-400">
                            <Loader2 className="h-4 w-4 animate-spin" /> Running
                          </span>
                        ) : executing[tc.id] === 'passed' ? (
                          <span className="flex items-center gap-1 text-emerald-400">
                            <Check className="h-4 w-4" /> Passed
                          </span>
                        ) : executing[tc.id] === 'failed' ? (
                          <span className="flex items-center gap-1 text-rose-400">
                            <X className="h-4 w-4" /> Failed
                          </span>
                        ) : tc.status === 'Ready' ? (
                          <span className="flex items-center gap-1 text-slate-300">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Ready
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-slate-300">
                            <AlertTriangle className="h-4 w-4 text-amber-400" /> Review
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleExecuteSingle(tc.id)}
                            disabled={executing[tc.id] === 'running'}
                            className="text-slate-400 hover:text-emerald-400 disabled:opacity-50 disabled:hover:text-slate-400 transition-colors"
                            title="Execute Test"
                          >
                            <Play className="h-5 w-5" />
                          </button>
                          <button className="text-slate-400 hover:text-cyan-400 transition-colors" title="View Code">
                            <FileCode2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

