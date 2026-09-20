import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Award,
  Sparkles,
  TrendingUp,
  Building,
  GraduationCap,
  Briefcase
} from 'lucide-react';

export default function LeaderboardPage({ onOpenProfile }) {
  const [activeTab, setActiveTab] = useState('universities'); // 'universities', 'industry'

  const universityData = [
    { rank: 1, name: 'BIT Mesra, Ranchi', team: 'Team Vidyut & Smart Class Hub', projects: 32, rating: '4.9 ★', score: '9,850 pts', city: 'Ranchi, Jharkhand' },
    { rank: 2, name: 'IIT (ISM) Dhanbad', team: 'Center for Mining & Water Tech', projects: 29, rating: '4.9 ★', score: '9,420 pts', city: 'Dhanbad, Jharkhand' },
    { rank: 3, name: 'NIT Jamshedpur', team: 'Steel City Civic Innovators', projects: 24, rating: '4.8 ★', score: '8,760 pts', city: 'Jamshedpur, Jharkhand' },
    { rank: 4, name: 'MANIT Bhopal', team: 'IoT Civic Systems Lab', projects: 21, rating: '4.7 ★', score: '7,980 pts', city: 'Bhopal, MP' },
    { rank: 5, name: 'IIT Delhi', team: 'Rural Technology Action Group', projects: 19, rating: '4.9 ★', score: '7,650 pts', city: 'New Delhi' },
    { rank: 6, name: 'COEP Tech Pune', team: 'Team Jaltarang Hydro Lab', projects: 16, rating: '4.7 ★', score: '6,890 pts', city: 'Pune, Maharashtra' },
    { rank: 7, name: 'NIT Rourkela', team: 'Green Infra Student Circle', projects: 14, rating: '4.6 ★', score: '5,940 pts', city: 'Rourkela, Odisha' },
    { rank: 8, name: 'Birsa Agricultural University', team: 'Agri-Water Sensor Cell', projects: 12, rating: '4.6 ★', score: '5,120 pts', city: 'Ranchi, Jharkhand' }
  ];

  const industryData = [
    { rank: 1, name: 'Tata Steel CSR Foundation', team: 'Sustainable Community Grants', projects: 38, rating: '4.9 ★', score: '₹ 45,00,000 Pledged', city: 'Jamshedpur' },
    { rank: 2, name: 'Bokaro Steel (SAIL) Community Fund', team: 'Urban Infra & Education Initiative', projects: 28, rating: '4.9 ★', score: '₹ 35,00,000 Pledged', city: 'Bokaro' },
    { rank: 3, name: 'Tech Mahindra Makers Lab', team: 'IoT & Smart Education CSR', projects: 22, rating: '4.8 ★', score: '₹ 28,50,000 Pledged', city: 'Pune / National' },
    { rank: 4, name: 'Coal India (CCL) CSR Cell', team: 'Clean Drinking Water Mission', projects: 18, rating: '4.7 ★', score: '₹ 22,00,000 Pledged', city: 'Ranchi' },
    { rank: 5, name: 'Infosys Foundation', team: 'Digital Literacy & Labs', projects: 15, rating: '4.8 ★', score: '₹ 19,00,000 Pledged', city: 'Bengaluru / National' }
  ];

  const handleUniversityClick = (item) => {
    if (!onOpenProfile) return;
    onOpenProfile({
      type: 'university',
      name: item.name,
      avatar: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150',
      institution: item.name,
      location: item.city,
      email: `innovations@${item.name.toLowerCase().replace(/[^a-z]/g, '').slice(0, 10)}.ac.in`,
      phone: '+91 651 2275444',
      rank: item.rank,
      completedProjectsCount: item.projects,
      score: item.score,
      rating: item.rating,
      bio: `National top-ranked innovation institution with ${item.projects}+ completed municipal and rural infrastructure engineering projects across India.`
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 text-slate-800 animate-fadeIn">
      
      {/* Main Card (Exact Mockup Panel 11 Reference) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Header with 2 Tabs */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              Leaderboard
            </h1>
            <p className="text-xs text-slate-500">
              National Institutional Rankings for Civic Problem Solving • Click universities to view public contributor profiles.
            </p>
          </div>

          {/* 2 Tabs: Universities, Industry */}
          <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('universities')}
              className={`px-4 py-2 rounded-xl transition cursor-pointer ${
                activeTab === 'universities'
                  ? 'bg-emerald-700 text-white shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Universities
            </button>
            <button
              onClick={() => setActiveTab('industry')}
              className={`px-4 py-2 rounded-xl transition cursor-pointer ${
                activeTab === 'industry'
                  ? 'bg-emerald-700 text-white shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Industry
            </button>
          </div>
        </div>

        {/* Clean Table (Exact Panel 11 Layout) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-4 pl-6 w-14">#</th>
                <th className="p-4">{activeTab === 'industry' ? 'Partner Organization' : 'Institution / University'}</th>
                <th className="p-4">{activeTab === 'industry' ? 'CSR Initiative' : 'Student Innovation Team'}</th>
                <th className="p-4 text-center">Rating</th>
                <th className="p-4 text-center">{activeTab === 'industry' ? 'Sponsored' : 'Completed Projects'}</th>
                <th className="p-4 pr-6 text-right">{activeTab === 'industry' ? 'Committed Grant' : 'Impact Score'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {(activeTab === 'industry' ? industryData : universityData).map((item, idx) => {
                const isUni = activeTab === 'universities';
                return (
                  <tr
                    key={idx}
                    onClick={() => isUni && handleUniversityClick(item)}
                    className={`${isUni ? 'hover:bg-emerald-50/60 cursor-pointer group/row' : 'hover:bg-slate-50/80'} transition`}
                    title={isUni ? 'Click to view University Contributor Profile' : ''}
                  >
                    <td className="p-4 pl-6 font-bold text-slate-900">
                      {item.rank === 1 ? '🥇 1' : item.rank === 2 ? '🥈 2' : item.rank === 3 ? '🥉 3' : item.rank}
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      <div className={`text-xs sm:text-sm ${isUni ? 'group-hover/row:text-emerald-700 flex items-center gap-1.5' : ''}`}>
                        <span>{item.name}</span>
                        {isUni && <span className="text-[10px] text-emerald-600 font-extrabold opacity-70 group-hover/row:opacity-100">↗</span>}
                      </div>
                      {item.city && <div className="text-[10px] text-slate-400 font-normal">{item.city}</div>}
                    </td>
                    <td className="p-4 text-slate-600 font-medium">
                      {item.team}
                    </td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-extrabold text-[11px] border border-amber-200">
                        {item.rating}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-slate-800">
                      {item.projects}
                    </td>
                    <td className="p-4 pr-6 text-right font-extrabold text-emerald-800 text-xs sm:text-sm">
                      {item.score}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
