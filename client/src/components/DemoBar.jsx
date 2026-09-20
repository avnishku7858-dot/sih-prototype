import React from 'react';
import { useAuth, DEMO_PERSONAS } from '../context/AuthContext';
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react';

export default function DemoBar({ activeTab, setActiveTab, onResetDb }) {
  const { currentUser, switchPersona } = useAuth();

  const workflowSteps = [
    { num: 1, role: 'citizen', label: '1. Report', targetTab: 'citizen' },
    { num: 2, role: 'government', label: '2. Verify', targetTab: 'government' },
    { num: 3, role: 'university', label: '3. Adopt', targetTab: 'university' },
    { num: 4, role: 'industry', label: '4. CSR Pledge', targetTab: 'industry' },
    { num: 5, role: 'university', label: '5. Milestone', targetTab: 'university' },
    { num: 6, role: 'citizen', label: '6. Public Outcome', targetTab: 'explorer' },
  ];

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-3 sm:px-6 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        
        {/* Persona Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40 text-[10px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-emerald-400" /> AwaazGram Live Demo
          </span>
          <span className="text-slate-400 font-medium">Switch Persona:</span>
          
          <div className="flex items-center gap-1.5 flex-wrap">
            {DEMO_PERSONAS.map(p => {
              const isActive = currentUser.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    switchPersona(p.id);
                    if (p.role === 'citizen' && activeTab !== 'citizen' && activeTab !== 'explorer') setActiveTab('citizen');
                    if (p.role === 'government') setActiveTab('government');
                    if (p.role === 'university') setActiveTab('university');
                    if (p.role === 'industry') setActiveTab('industry');
                    if (p.role === 'admin') setActiveTab('admin');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all font-medium ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-sm ring-2 ring-emerald-400 font-bold'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  <img src={p.avatar} alt={p.name} className="w-3.5 h-3.5 rounded-full object-cover" />
                  <span>{p.name.split(' ')[0]} ({p.badge.split('/')[0].trim()})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Guided Civic Workflow steps */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium mr-1">Lifecycle Flow:</span>
          {workflowSteps.map((s, idx) => (
            <React.Fragment key={idx}>
              <button
                onClick={() => {
                  const targetPersona = DEMO_PERSONAS.find(p => p.role === s.role);
                  if (targetPersona) switchPersona(targetPersona.id);
                  setActiveTab(s.targetTab);
                }}
                className={`px-2 py-0.5 rounded-full text-[11px] transition-colors ${
                  activeTab === s.targetTab
                    ? 'text-emerald-400 font-bold bg-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s.label}
              </button>
              {idx < workflowSteps.length - 1 && (
                <ArrowRight className="w-2.5 h-2.5 text-slate-600" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Reset DB Button */}
        <button
          onClick={onResetDb}
          title="Reset database to default seed state"
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 border border-slate-700 text-slate-400 text-[11px] transition-colors ml-auto md:ml-0"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Demo Data</span>
        </button>

      </div>
    </div>
  );
}
