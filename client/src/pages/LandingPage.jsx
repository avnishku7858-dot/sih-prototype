import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Megaphone,
  Search,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  Flag,
  Handshake,
  TrendingUp,
  FileText,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Leaf,
  Cog,
  Award,
  Star,
  Quote,
  BookOpen,
  School,
  MapPin,
  CheckCircle
} from 'lucide-react';

export default function LandingPage({ setActiveTab, onOpenLogin }) {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Role-based Primary CTA config
  const getPrimaryCta = () => {
    switch (currentUser?.role) {
      case 'university':
        return {
          label: 'Take a Project →',
          target: 'university_opps',
          icon: <GraduationCap className="w-4 h-4" />
        };
      case 'government':
        return {
          label: 'Verify a Project →',
          target: 'government_verification',
          icon: <ShieldCheck className="w-4 h-4" />
        };
      case 'industry':
        return {
          label: 'Sponsor a Project →',
          target: 'industry',
          icon: <Briefcase className="w-4 h-4" />
        };
      case 'citizen':
      default:
        return {
          label: 'Report a Problem →',
          target: 'citizen',
          icon: <Megaphone className="w-4 h-4" />
        };
    }
  };

  const primaryCta = getPrimaryCta();

  const reviews = [
    {
      id: 1,
      name: "Sunita Soren",
      role: "Panchayat Ward Member",
      location: "Khunti, Jharkhand",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      date: "2 days ago",
      tag: "Smart Education",
      comment: "Through AwaazGram, our village upgraded 2 primary schools with solar-powered smart class projectors and digital tablet labs in collaboration with BIT Mesra students. Attendance jumped by 40%!"
    },
    {
      id: 2,
      name: "Prof. Alok Mukherjee",
      role: "Faculty Mentor & Innovation Lead",
      location: "BIT Mesra, Ranchi",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      date: "1 week ago",
      tag: "University Innovation",
      comment: "Our engineering students designed an automated IoT water filtration and distribution system for rural Dhanbad. Direct funding from CSR partners made real-world deployment seamless."
    },
    {
      id: 3,
      name: "Rajeshwar Mahato",
      role: "Citizen & Youth Volunteer",
      location: "Bokaro Steel City, Jharkhand",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      date: "2 weeks ago",
      tag: "Civic Infrastructure",
      comment: "Reported broken street lights along the 3km school walking route in Sector 4. The problem was verified by municipal authorities within 48 hours and solar LED lights were installed."
    },
    {
      id: 4,
      name: "Dr. Ananya Tirkey",
      role: "District Education & Welfare Officer",
      location: "Ranchi, Jharkhand",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      date: "3 weeks ago",
      tag: "Government Oversight",
      comment: "AwaazGram provides complete visibility into school infrastructure needs. The public expense ledger and real-time photo verification keep every rupee transparent and audited."
    },
    {
      id: 5,
      name: "Vikas Agarwal",
      role: "CSR Lead, Steel & Mining Sector",
      location: "Jamshedpur, Jharkhand",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      date: "1 month ago",
      tag: "CSR Impact",
      comment: "We pledged ₹12 Lakhs for smart education kits and STEM robotics labs across 6 tribal district schools. The student milestone tracking gave us clear measurable impact."
    },
    {
      id: 6,
      name: "Pooja Kumari",
      role: "B.Tech Student Lead",
      location: "IIT (ISM) Dhanbad, Jharkhand",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      rating: 5,
      date: "1 month ago",
      tag: "Smart Education",
      comment: "Working on low-cost offline digital learning servers for remote schools in Dumka gave our team real engineering experience while making an unforgettable impact on young learners."
    }
  ];

  const filteredReviews = selectedFilter === 'all' 
    ? reviews 
    : reviews.filter(r => r.tag.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <div className="space-y-16 pb-16 font-sans text-slate-800 animate-fadeIn">
      
      {/* Hero Section */}
      <section className="relative pt-2 pb-6 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Tag / Location Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Jharkhand Community Solutions & Smart Education</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-heading leading-[1.1]">
                Your Voice
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-heading leading-[1.1]">
                Can Build a
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-emerald-700 font-heading leading-[1.1]">
                Better Tomorrow
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
              AwaazGram unites citizens, district administrations, universities, and CSR partners across Jharkhand to transform local civic challenges into smart education, clean water, and sustainable community solutions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={() => setActiveTab(primaryCta.target)}
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
              >
                {primaryCta.icon}
                <span>{primaryCta.label}</span>
              </button>

              <button
                onClick={() => setActiveTab('explorer')}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 hover:border-slate-300 cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Track an Issue</span>
              </button>
            </div>

          </div>

          {/* Right Column: Clean Jharkhand Community & Smart Education Visuals */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-slate-100 to-emerald-50/60 border border-slate-200/90 p-4 sm:p-6 shadow-lg">
              
              {/* Smart Education & Community Visual */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-inner mb-4 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80"
                  alt="Smart Education and Community Empowerment in Jharkhand"
                  className="w-full h-full object-cover opacity-95"
                />
                
                {/* Clean soft ambient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-emerald-900/30" />

                {/* Bottom Overlay Info on Photo */}
                <div className="absolute bottom-3 left-3 right-3 text-white p-2.5 rounded-xl bg-black/40 backdrop-blur-xs flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <School className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-xs">Active Projects in Ranchi, Dhanbad & Jamshedpur</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-white font-extrabold text-[10px]">
                    Verified
                  </span>
                </div>
              </div>

              {/* Bottom Slogan Container */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Clean Communities • Smart Digital Classrooms</div>
                    <div className="text-[11px] text-slate-500">Transforming grassroots education & infrastructure</div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('citizen')}
                  className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition shrink-0 cursor-pointer"
                >
                  Join Us →
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Floating 4-Metric Statistics Bar */}
      <section className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-lg shadow-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          
          {/* Stat 1: Problems Reported */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-2">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-heading">1,250+</div>
              <div className="text-xs font-bold text-slate-800">Problems Reported</div>
              <div className="text-[11px] text-slate-400">By verified citizens</div>
            </div>
          </div>

          {/* Stat 2: Projects in Progress */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Cog className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-heading">420+</div>
              <div className="text-xs font-bold text-slate-800">Projects in Progress</div>
              <div className="text-[11px] text-slate-400">Smart education & infra</div>
            </div>
          </div>

          {/* Stat 3: Solutions Delivered */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-6">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-heading">180+</div>
              <div className="text-xs font-bold text-slate-800">Solutions Delivered</div>
              <div className="text-[11px] text-slate-400">Ground certified</div>
            </div>
          </div>

          {/* Stat 4: Partner Institutions */}
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-6">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-heading">300+</div>
              <div className="text-xs font-bold text-slate-800">Partner Institutions</div>
              <div className="text-[11px] text-slate-400">Colleges & Industry CSR</div>
            </div>
          </div>

        </div>
      </section>

      {/* A Platform for Collective Impact */}
      <section className="max-w-6xl mx-auto pt-2 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
            A Platform for Collective Impact
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Connecting four essential pillars to create sustainable real-world change across Jharkhand.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-400 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Citizens</h3>
              <p className="text-xs text-slate-500 mt-1">Report local issues, school needs, and track transparent resolution progress.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Government</h3>
              <p className="text-xs text-slate-500 mt-1">Validate civic & education problems, allocate budgets and authorize student deployment.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-indigo-400 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Universities</h3>
              <p className="text-xs text-slate-500 mt-1">Build innovative smart education tools and engineering prototypes with faculty mentors.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-orange-400 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Industry</h3>
              <p className="text-xs text-slate-500 mt-1">Provide CSR matching grants, smart learning devices, and technical mentorship.</p>
            </div>
          </div>

        </div>
      </section>

      {/* NEW: Reviews & Community Feedback Section */}
      <section className="max-w-6xl mx-auto pt-4 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>4.9 / 5.0 Rating from 1,400+ Verified Community Stakeholders</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Community Voices & Reviews
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real feedback from citizens, teachers, panchayat heads, and university teams across Jharkhand.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-bold overflow-x-auto">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'smart education', label: 'Smart Education' },
              { id: 'civic infrastructure', label: 'Infrastructure' },
              { id: 'csr impact', label: 'CSR & Grants' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-white text-emerald-800 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div 
              key={rev.id} 
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Rating & Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                    {rev.tag}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <span>{rev.name}</span>
                      <CheckCircle className="w-3 h-3 text-emerald-600 fill-emerald-100" />
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">{rev.role}</div>
                    <div className="text-[10px] text-emerald-700 font-semibold">{rev.location}</div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400">{rev.date}</div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Quote Banner & Call to Action */}
      <section className="max-w-6xl mx-auto pt-2">
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 italic">
                “A platform where every problem finds a solution, and every citizen becomes a changemaker.”
              </p>
              <span className="text-[11px] text-emerald-700 font-semibold">— AwaazGram Jharkhand Innovation Cell</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab(primaryCta.target)}
            className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition shadow-xs shrink-0 cursor-pointer"
          >
            Be a Part of the Change →
          </button>
        </div>
      </section>

    </div>
  );
}

