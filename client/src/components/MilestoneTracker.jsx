import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Camera, Plus, Check } from 'lucide-react';

export default function MilestoneTracker({ milestones = [], progressPercentage = 0, onUpdateMilestone, isUniversityLead = false }) {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');

  const handleComplete = (milestoneId) => {
    if (onUpdateMilestone) {
      onUpdateMilestone(milestoneId, {
        status: 'completed',
        photoProof: photoUrl || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80'
      });
      setSelectedMilestone(null);
      setPhotoUrl('');
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
            <span>Project Milestones & Verification</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {progressPercentage}% Complete
            </span>
          </h3>
          <p className="text-xs text-slate-400">Stepwise execution with verified visual audit trail</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 rounded-full h-3 mb-6 p-0.5 border border-slate-800">
        <div
          className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-2 rounded-full transition-all duration-500 shadow-sm shadow-emerald-500/50"
          style={{ width: `${Math.min(100, Math.max(5, progressPercentage))}%` }}
        />
      </div>

      {/* Milestone List */}
      <div className="space-y-4 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
        {milestones.map((m, idx) => {
          const isDone = m.status === 'completed';
          const isInProgress = m.status === 'in_progress';

          return (
            <div key={m.id || idx} className="relative pl-9 group">
              {/* Dot Icon */}
              <div
                className={`absolute left-2.5 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                  isDone
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/30'
                    : isInProgress
                    ? 'bg-amber-500/20 border-amber-400 text-amber-400 animate-pulse'
                    : 'bg-slate-900 border-slate-700 text-slate-500'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
              </div>

              {/* Milestone Box */}
              <div className={`p-4 rounded-xl border transition ${
                isDone
                  ? 'bg-slate-950/60 border-emerald-500/20'
                  : isInProgress
                  ? 'bg-slate-950 border-amber-500/30 ring-1 ring-amber-500/20'
                  : 'bg-slate-950/40 border-slate-800/80'
              }`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{m.title}</span>
                      <span className={`text-[10px] px-2 py-0.2 rounded-full uppercase font-bold ${
                        isDone
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : isInProgress
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {m.status.replace('_', ' ')}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{m.description}</p>
                    
                    {m.completedAt && (
                      <div className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>Completed on: {new Date(m.completedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Complete Action Button if University user */}
                  {isUniversityLead && !isDone && (
                    <button
                      onClick={() => setSelectedMilestone(m)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] whitespace-nowrap transition shadow-sm"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>

                {/* Photo Proof */}
                {m.photoProof && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-3">
                    <a
                      href={m.photoProof}
                      target="_blank"
                      rel="noreferrer"
                      className="relative rounded-lg overflow-hidden border border-slate-700 hover:border-emerald-500 transition group/img block w-20 h-14 bg-slate-900"
                    >
                      <img src={m.photoProof} alt="Milestone proof" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                    </a>
                    <div>
                      <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider block">Field Proof Verified</span>
                      <span className="text-[11px] text-slate-400">Click thumbnail to inspect high-resolution verification imagery</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete Milestone Modal */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h4 className="text-base font-bold text-white font-heading mb-1">Verify Milestone Completion</h4>
            <p className="text-xs text-slate-300 mb-4">{selectedMilestone.title}</p>

            <div className="space-y-3 mb-6">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-semibold">Photo Proof URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/... or uploaded photo link"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Leaving this blank will attach a high-resolution engineering field proof automatically for demo purposes.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedMilestone(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleComplete(selectedMilestone.id)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition"
              >
                Confirm Milestone Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
