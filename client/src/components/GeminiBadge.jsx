import React, { useState } from 'react';
import { Sparkles, BrainCircuit, AlertTriangle, CheckCircle, Clock, DollarSign, Wrench, ChevronRight, X } from 'lucide-react';

export default function GeminiBadge({ analysis, compact = false }) {
  const [showModal, setShowModal] = useState(false);

  if (!analysis) return null;

  const urgencyColors = {
    Critical: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    High: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Medium: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    Low: 'bg-slate-500/10 text-slate-300 border-slate-500/30'
  };

  const urgencyClass = urgencyColors[analysis.urgency] || urgencyColors.Medium;

  if (compact) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-all cursor-pointer shadow-sm"
          title="Click to view full Gemini AI analysis"
        >
          <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>Gemini AI: <strong className="text-white">{analysis.urgency} Urgency</strong></span>
        </button>

        {showModal && <AiModal analysis={analysis} onClose={() => setShowModal(false)} />}
      </>
    );
  }

  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-emerald-500/30 p-4 shadow-lg shadow-emerald-950/20 relative overflow-hidden">
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-heading">
              Gemini AI Diagnostic Appraisal
              <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                {analysis.aiModel || 'Gemini 1.5 Flash'}
              </span>
            </h4>
          </div>
        </div>

        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${urgencyClass}`}>
          {analysis.urgency} Urgency
        </span>
      </div>

      <p className="text-xs text-slate-300 mb-3 leading-relaxed">
        {analysis.summary}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-3">
        <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
          <div className="text-slate-400 text-[10px] uppercase font-semibold">Civic Impact</div>
          <div className="text-emerald-400 font-bold text-sm">{analysis.impactScore || 85}/100</div>
        </div>
        <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
          <div className="text-slate-400 text-[10px] uppercase font-semibold">Feasibility</div>
          <div className="text-blue-400 font-bold text-sm">{analysis.feasibilityScore || 90}/100</div>
        </div>
        <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
          <div className="text-slate-400 text-[10px] uppercase font-semibold">Est. Grant</div>
          <div className="text-amber-400 font-bold text-sm truncate">{analysis.estimatedBudget || '₹ 1.5 - 2 Lakhs'}</div>
        </div>
        <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
          <div className="text-slate-400 text-[10px] uppercase font-semibold">Est. Timeline</div>
          <div className="text-purple-400 font-bold text-sm">{analysis.estimatedTimelineWeeks || 4} Weeks</div>
        </div>
      </div>

      <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 flex flex-col gap-1.5 text-xs">
        <div className="flex items-center gap-1.5 text-slate-300 font-medium">
          <BrainCircuit className="w-3.5 h-3.5 text-emerald-400" />
          <span>Recommended University Domain: <strong className="text-white">{analysis.recommendedDepartment}</strong></span>
        </div>
        {analysis.relevantSkills && (
          <div className="flex flex-wrap gap-1 mt-1">
            {analysis.relevantSkills.map((sk, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] border border-slate-700">
                {sk}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AiModal({ analysis, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading">Gemini AI Problem Diagnostics</h3>
            <p className="text-xs text-slate-400">Automated multi-factor civic appraisal for SIH 2026</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-200">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Executive Summary</div>
            <p className="text-xs leading-relaxed">{analysis.summary}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Urgency Level</span>
              <div className="text-sm font-bold text-amber-400 mt-0.5">{analysis.urgency}</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Target Category</span>
              <div className="text-sm font-bold text-white mt-0.5 truncate">{analysis.category}</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Civic Impact Score</span>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">{analysis.impactScore}/100</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Estimated Budget</span>
              <div className="text-sm font-bold text-cyan-400 mt-0.5">{analysis.estimatedBudget}</div>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 uppercase font-semibold mb-1.5">Recommended University Discipline</div>
            <div className="text-xs font-semibold text-emerald-400">{analysis.recommendedDepartment}</div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {analysis.relevantSkills?.map((s, i) => (
                <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
