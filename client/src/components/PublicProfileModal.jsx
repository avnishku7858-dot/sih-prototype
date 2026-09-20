import React, { useState } from 'react';
import {
  X,
  User,
  GraduationCap,
  Building,
  CheckCircle2,
  Clock,
  MapPin,
  Mail,
  Phone,
  Send,
  Sparkles,
  Trophy,
  Award,
  Layers,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function PublicProfileModal({ profile, onClose, onSelectProblem, onSelectProject }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'projects', 'contact'
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  if (!profile) return null;

  // Mask sensitive information
  const maskEmail = (email) => {
    if (!email) return 'c*******@awaazgram.org';
    const [user, domain] = email.split('@');
    if (!domain) return 'c*******@awaazgram.org';
    return `${user.charAt(0)}*****@${domain}`;
  };

  const maskPhone = (phone) => {
    if (!phone) return '+91 ••••• ••920';
    return phone.replace(/(\+?\d{2,3})?\s*(\d{2})\d{4,6}(\d{2})/, '$1 $2•••• ••$3');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setContactSubject('');
      setContactMessage('');
      setActiveTab('overview');
    }, 2500);
  };

  const isCitizen = profile.type === 'citizen';
  const isUniversity = profile.type === 'university';
  const isStudent = profile.type === 'student';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Modal Top Header Banner */}
        <div className="relative bg-gradient-to-r from-emerald-600 to-teal-700 p-6 rounded-t-3xl text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
            title="Close Profile"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
              alt={profile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/30 shadow-md shrink-0 bg-white"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
                  {profile.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white/20 text-white border border-white/30">
                  {isCitizen && 'Verified Citizen'}
                  {isUniversity && 'University Partner'}
                  {isStudent && 'Student Innovator'}
                </span>
              </div>

              <div className="text-xs text-emerald-100 font-medium flex items-center gap-2 flex-wrap">
                {profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{profile.location}</span>
                  </span>
                )}
                {profile.institution && (
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" />
                    <span>{profile.institution}</span>
                  </span>
                )}
                {profile.department && (
                  <span>• {profile.department}</span>
                )}
                {profile.year && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-800/40 text-[11px] font-bold">
                    {profile.year}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-slate-50/80 px-6 pt-3 gap-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-xs font-bold transition border-b-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Overview & Impact
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-3 text-xs font-bold transition border-b-2 cursor-pointer ${
              activeTab === 'projects'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {isCitizen ? 'Submitted & Solved Problems' : 'Projects & Solutions'}
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-3 text-xs font-bold transition border-b-2 cursor-pointer ${
              activeTab === 'contact'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Contact
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Quick Stat Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {isCitizen && (
                  <>
                    <div className="bg-emerald-50/70 border border-emerald-100 p-3 rounded-2xl text-center">
                      <div className="text-[10px] text-emerald-800 font-bold uppercase">Submitted Issues</div>
                      <div className="text-xl font-extrabold text-emerald-950 mt-0.5">{profile.submittedCount || 3}</div>
                    </div>
                    <div className="bg-blue-50/70 border border-blue-100 p-3 rounded-2xl text-center">
                      <div className="text-[10px] text-blue-800 font-bold uppercase">Solved On Ground</div>
                      <div className="text-xl font-extrabold text-blue-950 mt-0.5">{profile.solvedCount || 2}</div>
                    </div>
                    <div className="bg-amber-50/70 border border-amber-100 p-3 rounded-2xl text-center col-span-2 sm:col-span-1">
                      <div className="text-[10px] text-amber-800 font-bold uppercase">Civic Rating</div>
                      <div className="text-xl font-extrabold text-amber-950 mt-0.5">{profile.rating || '4.9 ★'}</div>
                    </div>
                  </>
                )}

                {isUniversity && (
                  <>
                    <div className="bg-emerald-50/70 border border-emerald-100 p-3 rounded-2xl text-center">
                      <div className="text-[10px] text-emerald-800 font-bold uppercase">National Rank</div>
                      <div className="text-xl font-extrabold text-emerald-950 mt-0.5">#{profile.rank || 1}</div>
                    </div>
                    <div className="bg-blue-50/70 border border-blue-100 p-3 rounded-2xl text-center">
                      <div className="text-[10px] text-blue-800 font-bold uppercase">Completed Projects</div>
                      <div className="text-xl font-extrabold text-blue-950 mt-0.5">{profile.completedProjectsCount || 32}</div>
                    </div>
                    <div className="bg-amber-50/70 border border-amber-100 p-3 rounded-2xl text-center col-span-2 sm:col-span-1">
                      <div className="text-[10px] text-amber-800 font-bold uppercase">Impact Score</div>
                      <div className="text-base font-extrabold text-amber-950 mt-1">{profile.score || '9,850 pts'}</div>
                    </div>
                  </>
                )}

                {isStudent && (
                  <>
                    <div className="bg-indigo-50/70 border border-indigo-100 p-3 rounded-2xl text-center">
                      <div className="text-[10px] text-indigo-800 font-bold uppercase">Team Role</div>
                      <div className="text-xs font-extrabold text-indigo-950 mt-1">{profile.roleInTeam || 'Student Lead & IoT Lead'}</div>
                    </div>
                    <div className="bg-emerald-50/70 border border-emerald-100 p-3 rounded-2xl text-center">
                      <div className="text-[10px] text-emerald-800 font-bold uppercase">Solved Projects</div>
                      <div className="text-xl font-extrabold text-emerald-950 mt-0.5">{profile.solvedCount || 4}</div>
                    </div>
                    <div className="bg-blue-50/70 border border-blue-100 p-3 rounded-2xl text-center col-span-2 sm:col-span-1">
                      <div className="text-[10px] text-blue-800 font-bold uppercase">Team Members</div>
                      <div className="text-xl font-extrabold text-blue-950 mt-0.5">{profile.teamSize || 5}</div>
                    </div>
                  </>
                )}
              </div>

              {/* Bio & Details */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Contributor Summary</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {profile.bio || (
                    isCitizen
                      ? "Active community member advocating for infrastructure upgrades, sanitation, and street lighting safety in the district."
                      : isUniversity
                      ? "Leading research and engineering cell deploying student-built IoT hardware, smart water systems, and solar microgrid solutions for rural communities."
                      : "Final-year engineering student specializing in embedded firmware, telemetry circuits, and field-tested civic engineering hardware."
                  )}
                </p>
              </div>

              {/* Skills / Focus Areas */}
              {(profile.skills || isStudent || isUniversity) && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Engineering Focus & Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(profile.skills || ['IoT & LoRa Telemetry', 'LiFePO4 Solar Systems', 'Hardware Assembly', 'Rapid Prototyping', 'Field Testing']).map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy Notice with Masked Contact */}
              <div className="border border-slate-200/80 bg-slate-50/50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Privacy Protected Contributor</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Email: {maskEmail(profile.email)} • Phone: {maskPhone(profile.phone)}
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition cursor-pointer self-start sm:self-center whitespace-nowrap"
                >
                  Send Message
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: PROJECTS & PROBLEMS */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {isCitizen ? 'Civic Issues Reported & Solved' : 'Projects & Solutions'}
                </h3>
              </div>

              <div className="space-y-3">
                {(profile.problems || [
                  {
                    id: 'p1',
                    title: isCitizen ? 'Broken High-Tension Wire & Damaged Transformer in Tupudana' : 'Smart Street Light Automation & Solar Battery Node',
                    category: isCitizen ? 'Street Lighting & Electrical' : 'IoT & Energy Systems',
                    status: 'solved',
                    date: 'May 2025'
                  },
                  {
                    id: 'p2',
                    title: isCitizen ? 'Hazardous Open Pothole at Main Market Intersection' : 'Clean Water ATM & Automated RO Purification Unit',
                    category: isCitizen ? 'Roads & Infrastructure' : 'Water Sanitation',
                    status: 'in_progress',
                    date: 'June 2025'
                  },
                  {
                    id: 'p3',
                    title: isCitizen ? 'Fluoride Contamination in Handpumps' : 'Solar Microgrid Remote Diagnostic Hub',
                    category: isCitizen ? 'Clean Water Supply' : 'Solar Power',
                    status: 'solved',
                    date: 'April 2025'
                  }
                ]).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-3 hover:bg-slate-100/80 transition"
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-slate-900">{item.title}</div>
                      <div className="text-[10px] text-slate-500">{item.category} • {item.date}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase shrink-0 ${
                      item.status === 'solved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status === 'solved' ? 'Solved' : 'In Progress'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT FORM */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Contact Contributor via AwaazGram Relay
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Personal phone and email are kept private. Your message is safely forwarded through the platform.
                </p>
              </div>

              {messageSent ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-fadeIn">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-900">Message Delivered Successfully!</h4>
                  <p className="text-xs text-emerald-700">The contributor has been notified via email relay.</p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={`Inquiry regarding project / community collaboration...`}
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your message here..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to {profile.name}</span>
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
