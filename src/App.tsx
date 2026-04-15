/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  Users, 
  Package, 
  Zap, 
  Send, 
  Brain, 
  Activity, 
  Settings,
  Plus,
  Search,
  ChevronRight,
  MoreVertical,
  Terminal,
  Cpu,
  Database,
  DollarSign,
  AlertCircle,
  Clock,
  CheckCircle2,
  Lock,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_PROJECTS, AI_MODELS, INITIAL_HEALTH } from './lib/mockData';
import { Project, Block, Task, AIModel } from './types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';

const CHART_DATA = [
  { name: '08:00', value: 40 },
  { name: '09:00', value: 30 },
  { name: '10:00', value: 65 },
  { name: '11:00', value: 45 },
  { name: '12:00', value: 80 },
  { name: '13:00', value: 55 },
  { name: '14:00', value: 90 },
];

export default function App() {
  const [activeProjectId, setActiveProjectId] = useState(MOCK_PROJECTS[0].id);
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [health] = useState(INITIAL_HEALTH);

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  const getNextAction = (project: Project) => {
    const blockedTasks = project.tasks.filter(t => t.status === 'blocked');
    const readyTasks = project.tasks.filter(t => t.status === 'ready');
    const runningBlocks = project.blocks.filter(b => b.status === 'running');

    if (blockedTasks.length > 0) {
      return {
        text: `Resolve dependency for "${blockedTasks[0].title}" to unblock workflow.`,
        action: "Unblock Task"
      };
    }
    if (runningBlocks.length > 0) {
      return {
        text: `${runningBlocks[0].assignedAIId} is currently generating assets for "${runningBlocks[0].title}".`,
        action: "Monitor Progress"
      };
    }
    if (readyTasks.length > 0) {
      return {
        text: `You have enough material to execute "${readyTasks[0].title}".`,
        action: "Execute Task"
      };
    }
    return {
      text: "All systems nominal. Ready for new project directives.",
      action: "New Directive"
    };
  };

  const nextAction = getNextAction(activeProject);

  return (
    <TooltipProvider>
      <div className="flex h-screen w-full bg-[#0a0a0a] text-zinc-100 overflow-hidden font-sans selection:bg-blue-500/30">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #27272a;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #3f3f46;
          }
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .scanline {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.1), transparent);
            animation: scanline 8s linear infinite;
            pointer-events: none;
          }
        `}</style>
        <div className="scanline" />
        {/* Left Sidebar: Project Stack */}
        <aside className="w-[240px] border-r border-zinc-800 bg-[#0d0d0d] flex flex-col">
          <div className="p-6 flex items-center gap-2 border-b border-zinc-800">
            <span className="font-black tracking-tighter text-xl text-primary italic">SUPERBOARD.AI</span>
          </div>

          <ScrollArea className="flex-1 px-4 py-6">
            <div className="space-y-10">
              <div>
                <div className="flex items-center justify-between px-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Active Stack</span>
                  <Button variant="ghost" size="icon" className="h-4 w-4 text-zinc-500 hover:text-primary">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <div className="space-y-0">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => setActiveProjectId(project.id)}
                      className={cn(
                        "w-full flex items-center justify-between py-3 border-b border-zinc-800 transition-all group",
                        activeProjectId === project.id 
                          ? "border-primary text-white" 
                          : "text-zinc-500 hover:text-zinc-200"
                      )}
                    >
                      <span className="text-sm font-bold truncate">{project.name}</span>
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        activeProjectId === project.id ? "bg-primary" : "bg-zinc-700"
                      )} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 px-2 mb-4 block">Memory Presets</span>
                <div className="space-y-4">
                  {activeProject.memory.map((item) => (
                    <div key={item.id} className="px-2 border-l-2 border-zinc-800 pl-3">
                      <span className="text-[10px] text-zinc-500 block mb-1 uppercase tracking-wider">{item.key}</span>
                      <span className="text-xs font-medium text-zinc-300">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-zinc-800/50 space-y-3">
            <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <span>System Health</span>
              <Activity className="w-3 h-3" />
            </div>
            <HealthBar label="Tokens" value={health.tokenUsage} color="bg-blue-500" />
            <HealthBar label="Storage" value={health.storageUsage} color="bg-purple-500" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a]">
          {/* Top Navigation Strip */}
          <header className="h-[50px] border-b border-zinc-800 flex items-center justify-between px-8 bg-[#0d0d0d] sticky top-0 z-10">
            <div className="flex items-center gap-8">
              <nav className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.1em]">
                <button className="text-primary">Projects</button>
                <button className="text-zinc-500 hover:text-zinc-200">Agents</button>
                <button className="text-zinc-500 hover:text-zinc-200">Assets</button>
                <button className="text-zinc-500 hover:text-zinc-200">Automations</button>
                <button className="text-zinc-500 hover:text-zinc-200">Memory</button>
              </nav>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary border border-white/10" />
              </div>
            </div>
          </header>

          {/* Workspace Panel */}
          <div className="flex-1 flex overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeProjectId}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar pb-20"
              >
                {/* Project Header */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-[72px] font-black leading-[0.9] tracking-[-0.04em] uppercase text-white">
                    {activeProject.name.split(' ')[0]}<br />
                    {activeProject.name.split(' ').slice(1).join(' ')}
                  </h1>
                  <div className="font-mono text-xs text-primary uppercase tracking-widest">
                    STAGE: ARCHITECTURE / BUILD • VERSION 0.4.1
                  </div>
                </div>

                {/* Modular Blocks Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                  {activeProject.blocks.map((block) => (
                    <BlockCard key={block.id} block={block} />
                  ))}
                </div>

                {/* Tasks Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                      Project Tasks
                    </h3>
                    <Button variant="ghost" size="sm" className="text-zinc-500 text-xs">View All</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeProject.tasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Sidebar: AI Assignment & Memory */}
            <aside className="w-[240px] border-l border-zinc-800 bg-[#0d0d0d] flex flex-col">
              <Tabs defaultValue="ai" className="flex-1 flex flex-col">
                <div className="px-6 pt-6">
                  <TabsList className="w-full bg-zinc-900 border border-zinc-800 p-1 rounded-none">
                    <TabsTrigger value="ai" className="flex-1 text-[10px] uppercase tracking-wider font-bold data-[state=active]:bg-zinc-800 rounded-none">AI</TabsTrigger>
                    <TabsTrigger value="status" className="flex-1 text-[10px] uppercase tracking-wider font-bold data-[state=active]:bg-zinc-800 rounded-none">Live</TabsTrigger>
                  </TabsList>
                </div>

                <ScrollArea className="flex-1 p-6">
                  <TabsContent value="ai" className="m-0 space-y-8">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6">Active Specialists</h4>
                      <div className="space-y-4">
                        {AI_MODELS.map((model) => (
                          <AIModelItem key={model.id} model={model} />
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="status" className="m-0 space-y-8">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Live Limits</h4>
                        <div className="space-y-4">
                          <LimitBar label="Claude 3.5 Opus" value={85} />
                          <LimitBar label="Gemini 1.5 Pro" value={32} />
                        </div>
                      </div>
                      <StatusMetric icon={<DollarSign className="w-4 h-4" />} label="Est. Cost" value={`$${health.costEstimate}`} />
                      <StatusMetric icon={<Cpu className="w-4 h-4" />} label="Exports" value={health.activeExports} />
                    </div>
                  </TabsContent>
                </ScrollArea>

                <div className="p-6 border-t border-zinc-800 bg-zinc-900/20">
                  <div className="border border-primary bg-primary/5 p-4 space-y-3">
                    <h5 className="text-[11px] font-bold uppercase tracking-widest text-primary">Next Best Action</h5>
                    <p className="text-[11px] text-zinc-300 leading-relaxed">
                      {nextAction.text}
                    </p>
                    <Button size="sm" className="w-full h-8 text-[10px] bg-primary hover:bg-primary/90 text-black uppercase tracking-widest font-black rounded-none">
                      {nextAction.action}
                    </Button>
                  </div>
                </div>
              </Tabs>
            </aside>
          </div>
        </main>

        {/* Global Status Footer */}
        <footer className="fixed bottom-0 left-0 right-0 h-10 bg-[#0a0a0a] border-t border-zinc-800 flex items-center px-6 text-[10px] font-mono text-zinc-500 z-50">
          <div className="flex items-center gap-10 flex-1">
            <div className="flex items-center gap-2 text-primary">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="font-bold uppercase tracking-widest">System Online</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-zinc-200 uppercase">Tokens:</span>
                <span>1.2M / 2.0M</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-zinc-200 uppercase">Est. Cost:</span>
                <span>${health.costEstimate} USD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-zinc-200 uppercase">Exports:</span>
                <span>{health.activeExports} Running</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Database className="w-3 h-3" />
              <span>4.2ms</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>124ms</span>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}

function NavItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-colors">
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function TopNavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
      active ? "bg-white text-black" : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"
    )}>
      {icon}
      {label}
    </button>
  );
}

function HealthBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] text-zinc-400">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={cn("h-full", color)}
        />
      </div>
    </div>
  );
}

function LimitBar({ label, value }: { label: string, value: number }) {
  return (
    <div className="space-y-2">
      <div className="text-[11px] text-zinc-300">{label}</div>
      <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className="h-full bg-primary"
        />
      </div>
    </div>
  );
}

function BlockCard({ block }: { block: Block, key?: string }) {
  const model = AI_MODELS.find(m => m.id === block.assignedAIId);
  
  return (
    <Card className="bg-[#141414] border-zinc-800 rounded-none hover:border-primary/50 transition-all group relative overflow-hidden">
      <CardHeader className="p-5 pb-2 flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-zinc-500">{block.type} Module</span>
            {block.status === 'running' && (
              <Badge variant="outline" className="h-4 px-1 text-[8px] border-primary/50 text-primary animate-pulse rounded-none">Running</Badge>
            )}
          </div>
          <CardTitle className="text-sm font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight">{block.title}</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-5 pt-0 space-y-4">
        <p className="text-[13px] text-[#BBB] leading-relaxed">
          {block.content}
        </p>
        
        <div className="border-t border-zinc-800 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Assigned: {model?.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TaskCard({ task }: { task: Task, key?: string }) {
  return (
    <div className="bg-[#141414] border border-zinc-800 p-4 flex items-center justify-between hover:border-primary/50 transition-all cursor-pointer group">
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-xs font-bold uppercase tracking-tight",
          task.status === 'complete' ? "text-zinc-600 line-through" : "text-zinc-200"
        )}>
          {task.title}
        </p>
      </div>
      <div className={cn(
        "w-2 h-2 rounded-full ml-4",
        task.status === 'complete' ? "bg-zinc-700" : 
        task.status === 'blocked' ? "bg-rose-500" : 
        task.status === 'ready' ? "bg-primary" : "bg-amber-500"
      )} />
    </div>
  );
}

function AIModelItem({ model }: { model: AIModel, key?: string }) {
  return (
    <div className="flex flex-col gap-1 py-3 border-b border-zinc-800 group cursor-pointer">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-white uppercase tracking-tighter group-hover:text-primary transition-colors">{model.name}</span>
        <span className="text-[9px] font-bold text-primary uppercase tracking-widest">{model.provider}</span>
      </div>
      <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{model.specialty}</p>
    </div>
  );
}

function MemoryItemCard({ item }: { item: any, key?: string }) {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-lg p-3 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.category}</span>
        <Lock className="w-3 h-3 text-zinc-600" />
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-zinc-300">{item.key}</span>
        <span className="text-xs font-mono text-blue-400 truncate">{item.value}</span>
      </div>
    </div>
  );
}

function StatusMetric({ icon, label, value, color = "text-zinc-300" }: { icon: React.ReactNode, label: string, value: any, color?: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
          {icon}
        </div>
        <span className="text-xs font-medium text-zinc-400">{label}</span>
      </div>
      <span className={cn("text-sm font-bold", color)}>{value}</span>
    </div>
  );
}
