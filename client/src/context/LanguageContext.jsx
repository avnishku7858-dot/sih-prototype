import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const translations = {
  en: {
    // Nav
    home: "Home",
    reportIssue: "Report Issue",
    trackIssues: "Track Issues",
    opportunities: "Opportunities",
    sponsor: "Sponsor",
    sponsorProject: "Sponsor a Project",
    problemVerification: "Problem Verification",
    collegeRequests: "College Requests",
    funding: "Funding",
    progress: "Progress",
    expenses: "Expenses",
    leaderboard: "Leaderboard",
    admin: "Admin",
    searchPlaceholder: "Search issues, projects, locations...",
    sihBadge: "A Platform for Collective Impact",
    
    // User Menu
    myProfile: "My Profile",
    myReports: "My Reports",
    switchRole: "Switch Persona",
    settings: "Settings",
    logout: "Logout",
    login: "Login / Sign In",
    
    // Hero
    heroTitle1: "Your Voice",
    heroTitle2: "A Stronger India",
    heroSubtitle: "AwaazGram connects Citizens, Government, Universities and Industry to turn real local problems into real, impactful solutions.",
    reportBtn: "Report a Problem →",
    trackBtn: "Track an Issue",
    problemsToday: "Problems Today, Better Tomorrows",
    cleanerIndia: "A Cleaner Smarter Stronger India",

    // 4 Pillars
    citizensPillar: "Citizens",
    citizensPillarSub: "Report Local Issues",
    govPillar: "Government",
    govPillarSub: "Validates & Prioritizes",
    uniPillar: "Universities",
    uniPillarSub: "Build Solutions",
    indPillar: "Industry",
    indPillarSub: "Supports & Funds",

    // Stats
    statSolved: "Solved Projects",
    statSolvedSub: "Real impact, real change",
    statTeams: "University Teams",
    statTeamsSub: "Across India",
    statCsr: "CSR Support Committed",
    statCsrSub: "From industry partners",
    statTurnaround: "Average Turnaround",
    statTurnaroundSub: "From issue to action",

    // How it works
    howItWorksTitle: "How AwaazGram Works",
    howItWorksSub: "From a local problem to a lasting solution — together.",
    step1Title: "Report",
    step1Sub: "Citizen reports a real local problem",
    step2Title: "AI Analysis",
    step2Sub: "Gemini AI categorizes & prioritizes the issue",
    step3Title: "Verification",
    step3Sub: "Government verifies and approves",
    step4Title: "Collaboration",
    step4Sub: "Universities work with industry support",
    step5Title: "Progress",
    step5Sub: "Track milestones and updates",
    step6Title: "Impact",
    step6Sub: "Real solutions for a better tomorrow",

    // Quote
    quoteText: "“A platform where every problem finds a solution, and every citizen becomes a changemaker.”",
    bePartBtn: "Be a Part of the Change →",
    
    // Footer
    footerRights: "© 2026 AwaazGram. Built for a Better India.",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact"
  },
  hi: {
    // Nav
    home: "मुख्य पृष्ठ",
    reportIssue: "समस्या दर्ज करें",
    trackIssues: "समस्या ट्रैक करें",
    opportunities: "अवसर और प्रोजेक्ट",
    sponsor: "प्रायोजक (Sponsor)",
    sponsorProject: "प्रोजेक्ट प्रायोजित करें",
    problemVerification: "समस्या सत्यापन",
    collegeRequests: "कॉलेज अनुरोध",
    funding: "फंडिंग",
    progress: "प्रगति",
    expenses: "पारदर्शिता व्यय",
    leaderboard: "लीडरबोर्ड",
    admin: "प्रशासन",
    searchPlaceholder: "समस्याएं, प्रोजेक्ट्स खोजें...",
    sihBadge: "सामूहिक प्रभाव और नागरिक समाधान मंच",

    // User Menu
    myProfile: "मेरी प्रोफाइल",
    myReports: "मेरी दर्ज समस्याएं",
    switchRole: "भूमिका बदलें",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",
    login: "लॉग इन करें",

    // Hero
    heroTitle1: "आपकी आवाज़",
    heroTitle2: "एक सशक्त भारत",
    heroSubtitle: "आवाज़ग्राम नागरिकों, सरकार, विश्वविद्यालयों और उद्योगों को जोड़ता है ताकि स्थानीय समस्याओं का वास्तविक, प्रभावी समाधान हो सके।",
    reportBtn: "समस्या दर्ज करें →",
    trackBtn: "स्थिति देखें",
    problemsToday: "आज की समस्याएं, कल का उज्ज्वल भविष्य",
    cleanerIndia: "स्वच्छ, स्मार्ट और आत्मनिर्भर भारत",

    // 4 Pillars
    citizensPillar: "नागरिक",
    citizensPillarSub: "समस्या दर्ज करें",
    govPillar: "सरकार",
    govPillarSub: "सत्यापन और प्राथमिकता",
    uniPillar: "विश्वविद्यालय",
    uniPillarSub: "इंजीनियरिंग समाधान निर्माण",
    indPillar: "उद्योग / CSR",
    indPillarSub: "फंडिंग और मार्गदर्शन",

    // Stats
    statSolved: "सुलझाई गई समस्याएं",
    statSolvedSub: "वास्तविक बदलाव, प्रमाणित परिणाम",
    statTeams: "विश्वविद्यालय टीमें",
    statTeamsSub: "संपूर्ण भारत से",
    statCsr: "CSR सहायता प्रतिबद्ध",
    statCsrSub: "उद्योग साझेदारों द्वारा",
    statTurnaround: "औसत समाधान समय",
    statTurnaroundSub: "समस्या से परिणाम तक",

    // How it works
    howItWorksTitle: "आवाज़ग्राम कैसे कार्य करता है",
    howItWorksSub: "स्थानीय समस्या से लेकर स्थायी समाधान तक — एक साथ।",
    step1Title: "समस्या रिपोर्ट",
    step1Sub: "नागरिक समस्या दर्ज करते हैं",
    step2Title: "AI विश्लेषण",
    step2Sub: "Gemini AI प्राथमिकता तय करता है",
    step3Title: "सरकारी सत्यापन",
    step3Sub: "अधिकारी जांच कर फंड स्वीकृत करते हैं",
    step4Title: "विश्वविद्यालय सहयोग",
    step4Sub: "इंजीनियरिंग छात्र प्रोजेक्ट बनाते हैं",
    step5Title: "प्रगति ट्रैकिंग",
    step5Sub: "माइलस्टोन और फोटो प्रमाण",
    step6Title: "सार्थक प्रभाव",
    step6Sub: "जमीनी स्तर पर स्थायी समाधान",

    // Quote
    quoteText: "“एक ऐसा मंच जहां हर समस्या को समाधान मिलता है, और हर नागरिक बदलाव का हिस्सा बनता है।”",
    bePartBtn: "बदलाव का हिस्सा बनें →",

    // Footer
    footerRights: "© 2026 आवाज़ग्राम। बेहतर भारत के निर्माण हेतु समर्पित।",
    privacy: "गोपनीयता",
    terms: "नियम व शर्तें",
    contact: "संपर्क"
  },
  sat: {
    // Santhali (संथाली / ᱥᱟᱱᱛᱟᱲᱤ)
    home: "ᱢᱩᱬᱩᱛ (Home)",
    reportIssue: "ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ (Report Issue)",
    trackIssues: "ᱮᱴᱠᱮᱴᱚᱬᱮ ᱯᱟᱸᱡᱟ (Track Issues)",
    opportunities: "ᱫᱟᱣ ᱟᱨ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ (Opportunities)",
    sponsor: "ᱠᱟᱹᱣᱰᱤ ᱜᱚᱲᱚ (Sponsor)",
    sponsorProject: "ᱠᱟᱹᱢᱤ ᱨᱮ ᱠᱟᱹᱣᱰᱤ ᱜᱚᱲᱚ",
    problemVerification: "ᱮᱴᱠᱮᱴᱚᱬᱮ ᱵᱤᱰᱟᱹᱣ (Verification)",
    collegeRequests: "ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱱᱮᱦᱚᱸᱨ (Requests)",
    funding: "ᱯᱷᱟᱱᱰ (Funding)",
    progress: "ᱞᱟᱦᱟᱱᱛᱤ (Progress)",
    expenses: "ᱠᱷᱚᱨᱚᱪ ᱯᱷᱟᱨᱪᱟ (Expenses)",
    leaderboard: "ᱞᱤᱰᱟᱨᱵᱚᱨᱰ (Leaderboard)",
    admin: "ᱥᱟᱥᱚᱱ (Admin)",
    searchPlaceholder: "ᱮᱴᱠᱮᱴᱚᱬᱮ, ᱯᱨᱚᱡᱮᱠᱴ ᱥᱮᱸᱫᱽᱨᱟᱭ ᱢᱮ...",
    sihBadge: "ᱥᱟᱶᱛᱟ ᱩᱛᱱᱟᱹᱣ ᱢᱟᱸᱰᱮᱨ",

    // User Menu
    myProfile: "ᱤᱧᱟᱜ ᱯᱨᱳᱯᱷᱟᱭᱤᱞ (My Profile)",
    myReports: "ᱤᱧᱟᱜ ᱚᱞ ᱠᱚ (My Reports)",
    switchRole: "ᱴᱷᱟᱶ ᱵᱚᱫᱚᱞ",
    settings: "ᱥᱟᱡᱟᱣ (Settings)",
    logout: "ᱚᱰᱚᱠᱚᱜ (Logout)",
    login: "ᱵᱚᱞᱚᱱ (Login)",

    // Hero
    heroTitle1: "ᱟᱢᱟᱜ ᱟᱲᱟᱝ",
    heroTitle2: "ᱱᱟᱯᱟᱭ ᱜᱟᱯᱟ",
    heroSubtitle: "ᱟᱣᱟᱡᱽᱜᱨᱟᱢ ᱫᱚ ᱱᱟᱜᱟᱨᱤᱭᱟᱹ, ᱥᱚᱨᱠᱟᱨ, ᱵᱤᱨᱫᱟᱹᱜᱟᱲ ᱟᱨ ᱠᱟᱹᱨᱜᱟᱲ ᱠᱚ ᱡᱚᱲᱟᱣ ᱠᱟᱛᱮ ᱥᱟᱶᱛᱟ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱠᱚ ᱥᱚᱞᱦᱮᱭᱟ᱾",
    reportBtn: "ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ →",
    trackBtn: "ᱦᱟᱞᱚᱛ ᱧᱮᱞ ᱢᱮ",
    problemsToday: "ᱛᱮᱦᱮᱧᱟᱜ ᱮᱴᱠᱮᱴᱚᱬᱮ, ᱜᱟᱯᱟ ᱨᱮᱭᱟᱜ ᱥᱚᱞᱦᱮ",
    cleanerIndia: "ᱥᱟᱯᱷᱟ ᱟᱨ ᱥᱚᱨᱮᱥ ᱵᱷᱟᱨᱚᱛ",

    // 4 Pillars
    citizensPillar: "ᱱᱟᱜᱟᱨᱤᱭᱟᱹ (Citizens)",
    citizensPillarSub: "ᱮᱴᱠᱮᱴᱚᱬᱮ ᱚᱞ ᱢᱮ",
    govPillar: "ᱥᱚᱨᱠᱟᱨ (Government)",
    govPillarSub: "ᱯᱚᱨᱛᱚᱱ ᱟᱨ ᱜᱚᱲᱚ",
    uniPillar: "ᱵᱤᱨᱫᱟᱹᱜᱟᱲ (Universities)",
    uniPillarSub: "ᱥᱚᱞᱦᱮ ᱵᱮᱱᱟᱣ",
    indPillar: "ᱠᱟᱹᱨᱜᱟᱲ (Industry)",
    indPillarSub: "ᱠᱟᱹᱣᱰᱤ ᱟᱨ ᱜᱚᱲᱚ",

    // Stats
    statSolved: "ᱥᱚᱞᱦᱮ ᱠᱟᱹᱢᱤ",
    statSolvedSub: "ᱥᱟᱹᱨᱤ ᱵᱚᱫᱚᱞ",
    statTeams: "ᱪᱮᱛᱮᱫᱤᱭᱟᱹ ᱫᱚᱞ",
    statTeamsSub: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱟᱨ ᱵᱷᱟᱨᱚᱛ ᱠᱷᱚᱱ",
    statCsr: "CSR ᱜᱚᱲᱚ ᱠᱟᱹᱣᱰᱤ",
    statCsrSub: "ᱠᱟᱹᱨᱜᱟᱲ ᱠᱷᱚᱱ",
    statTurnaround: "ᱥᱚᱞᱦᱮ ᱚᱠᱛᱚ",
    statTurnaroundSub: "ᱚᱞ ᱠᱷᱚᱱ ᱥᱚᱞᱦᱮ ᱫᱷᱟᱹᱵᱤᱡ",

    // Quote
    quoteText: "“ᱡᱟᱦᱟᱸᱨᱮ ᱥᱟᱱᱟᱢ ᱮᱴᱠᱮᱴᱚᱬᱮ ᱨᱮᱭᱟᱜ ᱥᱚᱞᱦᱮ ᱧᱟᱢᱚᱜᱼᱟ, ᱟᱨ ᱥᱟᱱᱟᱢ ᱱᱟᱜᱟᱨᱤᱭᱟᱹ ᱵᱚᱫᱚᱞ ᱨᱮᱱ ᱦᱟᱹᱴᱤᱧᱤᱭᱟᱹ ᱵᱮᱱᱟᱣᱜᱼᱟ᱾”",
    bePartBtn: "ᱵᱚᱫᱚᱞ ᱨᱮ ᱥᱮᱞᱮᱫᱚᱜ ᱢᱮ →",

    // Footer
    footerRights: "© 2026 ᱟᱣᱟᱡᱽᱜᱨᱟᱢ (AwaazGram)᱾ ᱥᱟᱶᱛᱟ ᱩᱛᱱᱟᱹᱣ ᱞᱟᱹᱜᱤᱫ᱾",
    privacy: "ᱜᱩᱯᱤᱛ",
    terms: "ᱱᱤᱭᱚᱢ",
    contact: "ᱡᱚᱜᱟᱡᱚᱜ"
  },
  nag: {
    // Nagpuri / Sadri (नागपुरी)
    home: "घर (Home)",
    reportIssue: "समस्या दर्ज करू (Report)",
    trackIssues: "हालत देखू (Track Issues)",
    opportunities: "अवसर अउर प्रोजेक्ट",
    sponsor: "प्रायोजक (Sponsor)",
    sponsorProject: "प्रोजेक्ट में फंड देवू",
    problemVerification: "समस्या जांच (Verification)",
    collegeRequests: "कॉलेज दरखास्त (Requests)",
    funding: "फंडिंग (Funding)",
    progress: "प्रगति (Progress)",
    expenses: "खर्चा के हिसाब",
    leaderboard: "लीडरबोर्ड (Leaderboard)",
    admin: "प्रशासन",
    searchPlaceholder: "समस्या, प्रोजेक्ट खोजू...",
    sihBadge: "झारखंड जन-कल्याण अउर समाधान मंच",

    // User Menu
    myProfile: "हमार प्रोफाइल (My Profile)",
    myReports: "हमार दर्ज समस्या (My Reports)",
    switchRole: "रोल बदलू",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",
    login: "लॉग इन करू",

    // Hero
    heroTitle1: "रउरे मनक आवाज",
    heroTitle2: "सुग्घर झारखंड",
    heroSubtitle: "आवाज़ग्राम जनता, सरकार, कॉलेज अउर उद्योग के जोड़ के गांव-घर के समस्या के पक्का समाधान निकाले ला।",
    reportBtn: "समस्या दर्ज करू →",
    trackBtn: "हालत देखू",
    problemsToday: "आज के समस्या, काल के सुग्घर समाधान",
    cleanerIndia: "स्वच्छ अउर सुंदर झारखंड",

    // 4 Pillars
    citizensPillar: "नागरिक (Citizens)",
    citizensPillarSub: "समस्या बताबू",
    govPillar: "सरकार (Government)",
    govPillarSub: "जांच अउर मंजूरी",
    uniPillar: "कॉलेज / यूनिवर्सिटी",
    uniPillarSub: "इंजीनियरिंग समाधान",
    indPillar: "उद्योग / CSR",
    indPillarSub: "फंड अउर सहयोग",

    // Stats
    statSolved: "सुलझल प्रोजेक्ट",
    statSolvedSub: "जमीनी स्तर पर बदलाव",
    statTeams: "कॉलेज टीम",
    statTeamsSub: "झारखंड भर से",
    statCsr: "CSR सहयोग राशि",
    statCsrSub: "उद्योग साझेदार मन से",
    statTurnaround: "समाधान के समय",
    statTurnaroundSub: "रिपोर्ट से पूरा होवे तक",

    // Quote
    quoteText: "“अइसन मंच जहां हर समस्या के समाधान मिलेला, अउर हर नागरिक बदलाव के साथी बनेला।”",
    bePartBtn: "बदलाव में शामिल होऊ →",

    // Footer
    footerRights: "© 2026 आवाज़ग्राम। सुग्घर झारखंड के निर्माण खातिर।",
    privacy: "गोपनीयता",
    terms: "नियम",
    contact: "संपर्क"
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('awaazgram_lang') || 'en';
  });

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('awaazgram_lang', newLang);
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
