import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Compass,
  Bell,
  User,
  Settings,
  LogOut,
  Building2,
  GraduationCap,
  Briefcase,
  Users,
  ShieldCheck,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

export default function DashboardLayout({
  title,
  subtitle,
  activeNav,
  onNavigate,
  children
}) {
  const { currentUser, currentRole, switchPersona } = useAuth();
  const { t } = useLanguage();

  // Define sidebar links based on role
  const getSidebarLinks = () => {
    switch (currentRole) {
      case 'government':
        return [
          { id: 'government', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'pending', label: 'Pending Issues', icon: ShieldCheck },
          { id: 'my_projects', label: 'My Projects', icon: Layers },
          { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
          { id: 'milestones', label: 'Milestones', icon: Award },
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      case 'university':
        return [
          { id: 'university', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'available', label: 'Available Projects', icon: Sparkles },
          { id: 'my_projects', label: 'My Projects', icon: Layers },
          { id: 'team', label: 'Team Members', icon: Users },
          { id: 'milestones', label: 'Milestones', icon: Award },
          { id: 'notifications', label: 'Notifications', icon: Bell, badge: 2 },
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      case 'industry':
        return [
          { id: 'industry', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'support_opps', label: 'Support Opportunities', icon: Sparkles },
          { id: 'collaborations', label: 'My Collaborations', icon: Layers },
          { id: 'csr_funding', label: 'CSR & Funding', icon: Briefcase },
          { id: 'notifications', label: 'Notifications', icon: Bell, badge: 1 },
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      default: // Citizen
        return [
          { id: 'citizen', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'report_issue', label: 'Report Issue', icon: PlusCircle },
          { id: 'my_reports', label: 'My Reports', icon: FileText },
          { id: 'track_issues', label: 'Track Issues', icon: Compass },
          { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
    }
  };

  const sidebarLinks = getSidebarLinks();

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden animate-fadeIn text-slate-800 mb-12">
      
      {/* Top Banner with Green Pill Title & User Widget (Exact mockup reference) */}
      <div className="bg-emerald-800 text-white px-6 py-2.5 flex items-center justify-between text-xs font-bold">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-heading tracking-wide uppercase">{title || `${currentUser?.role?.toUpperCase()} DASHBOARD`}</span>
        </div>
        <div className="text-[11px] text-emerald-200 font-normal">
          AwaazGram Unified Civic Portal
        </div>
      </div>

      {/* Sub-Header bar with Logo and User Info */}
      <div className="px-6 py-3.5 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L3 19h5l2-4h4l2 4h5L12 2z" />
              <path d="M10 12h4" />
            </svg>
          </div>
          <span className="text-base font-black text-slate-900 font-heading">
            Awaaz<span className="text-emerald-600">Gram</span>
          </span>
        </div>

        {/* User Card */}
        <button
          onClick={() => onNavigate && onNavigate('profile')}
          className="flex items-center gap-3 p-1 pl-2.5 rounded-full hover:bg-white border border-transparent hover:border-slate-200 transition text-left"
        >
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-900">{currentUser?.name}</div>
            <div className="text-[10px] text-slate-500 capitalize">{currentUser?.role}</div>
          </div>
          <img
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
            alt={currentUser?.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
          />
        </button>
      </div>

      {/* Main Container: Left Sidebar + Right Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        
        {/* Sidebar */}
        <aside className="md:col-span-3 lg:col-span-2.5 border-r border-slate-100 p-4 space-y-1 bg-slate-50/40">
          {sidebarLinks.map(link => {
            const Icon = link.icon;
            const isActive = activeNav === link.id || (activeNav === 'citizen' && link.id === 'citizen');

            return (
              <button
                key={link.id}
                onClick={() => onNavigate && onNavigate(link.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-200/80">
            <button
              onClick={() => onNavigate && onNavigate('login')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs text-rose-600 hover:bg-rose-50 font-bold transition"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Logout / Switch Role</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <div className="md:col-span-9 lg:col-span-9.5 p-6 sm:p-8 bg-white">
          {children}
        </div>

      </div>

    </div>
  );
}
