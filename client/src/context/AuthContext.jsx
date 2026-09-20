import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const DEMO_PERSONAS = [
  {
    id: "user-cit-1",
    name: "Rahul Mishra",
    role: "citizen",
    badge: "Citizen Reporter",
    title: "Ward 12 Resident & Civic Activist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    color: "emerald",
    city: "Bhopal",
    state: "Madhya Pradesh",
    email: "rahul.mishra@gmail.com"
  },
  {
    id: "user-gov-1",
    name: "Anita Sharma",
    role: "government",
    badge: "Government / Municipal Cell",
    title: "Municipal Verification Officer & Smart City Lead",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    color: "blue",
    city: "Bhopal",
    state: "Madhya Pradesh",
    email: "anita.sharma@gov.in"
  },
  {
    id: "user-uni-1",
    name: "Prof. Kumar",
    role: "university",
    badge: "University / Innovation Cell",
    title: "MANIT Bhopal - Engineering Projects Mentor",
    institution: "MANIT Bhopal",
    teamName: "MANIT Civic Innovation Hub",
    studentLead: "Rohan Nair",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    color: "indigo",
    city: "Bhopal",
    state: "Madhya Pradesh",
    email: "prof.kumar@manit.ac.in"
  },
  {
    id: "user-ind-1",
    name: "Amit Verma",
    role: "industry",
    badge: "Industry / CSR Partner",
    title: "Tata & Tech Mahindra CSR Initiatives Lead",
    organization: "Tata Sustainability & CSR Initiatives",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    color: "amber",
    city: "Bhopal",
    state: "Madhya Pradesh",
    email: "amit.verma@tatacsr.org"
  },
  {
    id: "user-admin",
    name: "AwaazGram Administrator",
    role: "admin",
    badge: "Platform Admin",
    title: "National Civic Network Operations",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    color: "emerald",
    email: "admin@awaazgram.org"
  }
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('awaazgram_user');
    return saved ? JSON.parse(saved) : DEMO_PERSONAS[0];
  });

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    localStorage.setItem('awaazgram_user', JSON.stringify(currentUser));
    fetchNotifications();
  }, [currentUser]);

  const fetchNotifications = async () => {
    try {
      const res = await api.getNotifications(currentUser.role);
      if (res.success) {
        setNotifications(res.data);
        setUnreadCount(res.data.filter(n => !n.read).length);
      }
    } catch (e) {
      console.error('Failed to fetch notifications', e);
    }
  };

  const switchPersona = (personaId) => {
    const target = DEMO_PERSONAS.find(p => p.id === personaId);
    if (target) {
      setCurrentUser(target);
    }
  };

  const switchRole = (role) => {
    const target = DEMO_PERSONAS.find(p => p.role === role) || DEMO_PERSONAS[0];
    setCurrentUser(target);
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      currentRole: currentUser?.role || 'citizen',
      switchPersona,
      switchRole,
      notifications,
      unreadCount,
      refreshNotifications: fetchNotifications,
      markNotificationRead,
      personas: DEMO_PERSONAS
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
