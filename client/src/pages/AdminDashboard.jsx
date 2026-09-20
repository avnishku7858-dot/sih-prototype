import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  BarChart3,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  GraduationCap,
  Building,
  Users,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function AdminDashboard({ onResetDb }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.getStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

  const statusData = stats ? [
    { name: 'Solved', value: stats.solvedProjects, color: '#22c55e' },
    { name: 'Active Engineering', value: stats.activeProjects, color: '#6366f1' },
    { name: 'Pending Gov Review', value: stats.pendingVerification, color: '#f59e0b' },
    { name: 'Verified & Open', value: stats.verifiedProblems, color: '#06b6d4' },
  ] : [];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SIH Central Control Room & Command Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            AwaazGram System Overview & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time telemetry across Municipal wards, Universities, Industry CSR funds, and Citizen grievance resolutions.
          </p>
        </div>

        <button
          onClick={onResetDb}
          className="px-5 py-2.5 rounded-2xl bg-rose-900/60 hover:bg-rose-800/80 text-rose-200 border border-rose-700/50 font-bold text-xs transition shadow-lg flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Demo Database</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs text-slate-400 font-semibold uppercase">Total Reported Issues</div>
          <div className="text-3xl font-black text-white font-heading mt-1">{stats?.totalProblems || 0}</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 100% Geo-tagged
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs text-slate-400 font-semibold uppercase">Gov Budget Allocated</div>
          <div className="text-3xl font-black text-emerald-400 font-heading mt-1">
            ₹ {(stats?.totalBudgetAllocated || 0).toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Smart City Seed Fund</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs text-slate-400 font-semibold uppercase">Industry Funds Pledged</div>
          <div className="text-3xl font-black text-amber-400 font-heading mt-1">
            ₹ {(stats?.totalFundsPledged || 0).toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-amber-400 mt-1">Corporate CSR matching</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="text-xs text-slate-400 font-semibold uppercase">Solved Projects</div>
          <div className="text-3xl font-black text-cyan-400 font-heading mt-1">{stats?.solvedProjects || 0}</div>
          <div className="text-[11px] text-cyan-400 mt-1">Ground validated</div>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Category Breakdown Bar Chart */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Civic Problem Categories Breakdown</span>
          </h3>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.categoryBreakdown || []} margin={{ top: 10, right: 10, left: -20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={10}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown Donut Chart */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Project Lifecycle Status Distribution</span>
          </h3>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {statusData.map((s, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                <div className="truncate">
                  <span className="text-[10px] text-slate-400 block truncate">{s.name}</span>
                  <span className="font-bold text-white">{s.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
