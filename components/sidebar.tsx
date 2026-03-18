'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Wand2, 
  Activity, 
  Bug, 
  Users, 
  ShieldAlert,
  Settings,
  FlaskConical
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Intelligence', href: '/intelligence', icon: BrainCircuit },
  { name: 'Autonomous Gen', href: '/generation', icon: Wand2 },
  { name: 'Execution Engine', href: '/execution', icon: Activity },
  { name: 'Defect Triage', href: '/defects', icon: Bug },
  { name: 'Risk Engine', href: '/risk', icon: ShieldAlert },
  { name: 'AI Agents', href: '/agents', icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-800 bg-slate-950">
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-6 w-6 text-cyan-400" />
          <span className="text-lg font-bold tracking-tight text-slate-100">
            Nexus<span className="text-cyan-400">QA</span>
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-slate-800 p-4">
        <Link
          href="/settings"
          className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-colors"
        >
          <Settings className="mr-3 h-5 w-5 flex-shrink-0 text-slate-500 group-hover:text-slate-300" />
          Settings
        </Link>
      </div>
    </div>
  );
}
