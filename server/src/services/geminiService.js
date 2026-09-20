import dotenv from 'dotenv';
dotenv.config();

/**
 * Intelligent civic fallback analyzer if Gemini API key is not configured or in offline mode.
 */
function heuristicCivicAnalysis(title = '', description = '', category = '', location = '') {
  const text = `${title} ${description} ${category} ${location}`.toLowerCase();

  let urgency = 'Medium';
  let impactScore = 75;
  let feasibilityScore = 80;
  let recommendedCategory = category || 'Civic Infrastructure';
  let recommendedDepartment = 'Civil & Environmental Engineering';
  let relevantSkills = ['Problem Diagnostics', 'CAD Modeling', 'Field Prototyping'];
  let estimatedBudget = '₹ 1,00,000 - ₹ 1,50,000';
  let estimatedTimelineWeeks = 4;
  let summary = `Automated analysis for civic intervention: "${title}".`;

  if (text.includes('flood') || text.includes('waterlog') || text.includes('drain') || text.includes('gutter') || text.includes('overflow')) {
    urgency = 'High';
    impactScore = 92;
    feasibilityScore = 86;
    recommendedCategory = 'Urban Drainage & Flood Resiliency';
    recommendedDepartment = 'Civil Engineering / Smart Hydraulic IoT';
    relevantSkills = ['Hydraulic Flow Modeling', 'IoT Water Level Sensors', 'Modular Siphon Design', 'Precast Civil Structures'];
    estimatedBudget = '₹ 1,50,000 - ₹ 2,20,000';
    estimatedTimelineWeeks = 6;
    summary = 'Critical urban drainage bottleneck risking transit and sanitation. Recommended modular IoT-monitored self-cleaning trash barriers and gravity-assisted bypass channel.';
  } else if (text.includes('hospital') || text.includes('power') || text.includes('voltage') || text.includes('electric') || text.includes('solar') || text.includes('energy') || text.includes('blackout')) {
    urgency = 'Critical';
    impactScore = 96;
    feasibilityScore = 88;
    recommendedCategory = 'Renewable Energy & Microgrids';
    recommendedDepartment = 'Electrical & Energy Engineering';
    relevantSkills = ['Solar PV Array Sizing', 'LiFePO4 BMS Integration', 'Sub-cycle Fast Transfer Switching', 'Telemetry Alerting'];
    estimatedBudget = '₹ 2,00,000 - ₹ 3,00,000';
    estimatedTimelineWeeks = 6;
    summary = 'High vulnerability identified for vital services. Recommended rooftop solar micro-grid backed by high-durability battery storage and automated surge protection.';
  } else if (text.includes('plastic') || text.includes('garbage') || text.includes('waste') || text.includes('dump') || text.includes('trash') || text.includes('smell')) {
    urgency = 'Medium';
    impactScore = 82;
    feasibilityScore = 85;
    recommendedCategory = 'Solid Waste & Circular Economy';
    recommendedDepartment = 'Chemical Engineering / AI Vision Robotics';
    relevantSkills = ['Computer Vision Object Sorting', 'Pyrolysis / Bio-digestion', 'Public Kiosk Gamification'];
    estimatedBudget = '₹ 90,000 - ₹ 1,60,000';
    estimatedTimelineWeeks = 5;
    summary = 'Environmental degradation and public health hazard. Recommended smart camera-assisted segregation hopper and decentralized organic/plastic processing kiosk.';
  } else if (text.includes('road') || text.includes('pothole') || text.includes('manhole') || text.includes('footpath') || text.includes('accident') || text.includes('pedestrian')) {
    urgency = 'High';
    impactScore = 88;
    feasibilityScore = 92;
    recommendedCategory = 'Road Safety & Smart Transportation';
    recommendedDepartment = 'Civil & Materials Engineering / IoT Sensors';
    relevantSkills = ['FRP Composite Covers', 'Bitumen Cold-Mix Formulation', 'LoRaWAN Vibration/Tilt Sensors'];
    estimatedBudget = '₹ 60,000 - ₹ 1,10,000';
    estimatedTimelineWeeks = 3;
    summary = 'Direct hazard to pedestrian and vehicular traffic. Recommended fast-cure polymer asphalt patching and smart theft-resistant composite manhole covers with tilt telemetry.';
  } else if (text.includes('water') || text.includes('contamination') || text.includes('borewell') || text.includes('purif') || text.includes('drinking')) {
    urgency = 'Critical';
    impactScore = 95;
    feasibilityScore = 84;
    recommendedCategory = 'Water Quality & Public Health';
    recommendedDepartment = 'Environmental Engineering & Biotechnology';
    relevantSkills = ['Membrane Filtration', 'Real-time TDS/Turbidity IoT Sensors', 'UV-C Disinfection'];
    estimatedBudget = '₹ 1,20,000 - ₹ 2,00,000';
    estimatedTimelineWeeks = 4;
    summary = 'Contaminated water supply threatening community health. Recommended solar-assisted multi-stage nano-filtration unit with automated water purity sensor telemetry.';
  } else if (text.includes('school') || text.includes('education') || text.includes('children') || text.includes('library') || text.includes('stem')) {
    urgency = 'Low';
    impactScore = 78;
    feasibilityScore = 95;
    recommendedCategory = 'Smart Education & Digital Inclusion';
    recommendedDepartment = 'Computer Science & EdTech Innovation';
    relevantSkills = ['Offline Digital Learning Apps', 'Raspberry Pi Kiosks', 'Interactive STEM Kits'];
    estimatedBudget = '₹ 50,000 - ₹ 90,000';
    estimatedTimelineWeeks = 3;
    summary = 'Opportunity for educational empowerment. Recommends solar-powered offline digital library and hands-on STEM engineering learning modules.';
  }

  return {
    category: recommendedCategory,
    urgency,
    impactScore,
    feasibilityScore,
    recommendedDepartment,
    summary,
    estimatedBudget,
    estimatedTimelineWeeks,
    relevantSkills,
    aiModel: 'AwaazGram Civic AI Engine (Heuristic + Knowledge Graph)'
  };
}

/**
 * Calls Google Gemini API if GEMINI_API_KEY is configured, else falls back to HeuristicCivicAnalysis.
 */
export async function analyzeProblemWithGemini({ title, description, category, location }) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    console.log('[GeminiService] No API key provided. Using built-in AwaazGram AI Civic Heuristic Engine.');
    return heuristicCivicAnalysis(title, description, category, location);
  }

  try {
    const prompt = `You are the lead AI Civic Solutions Architect for AwaazGram.
Analyze this citizen-reported civic issue and produce a structured JSON evaluation for Government verification and University engineering student adoption.

Problem Title: "${title}"
Problem Description: "${description}"
User Category: "${category || 'Unspecified'}"
Location: "${location || 'Local community'}"

Respond ONLY with a valid JSON object matching this schema:
{
  "category": "Precise Engineering/Civic Category (e.g., Urban Hydrology & Smart Drainage, Clean Tech & Microgrids, Road Safety)",
  "urgency": "Low" | "Medium" | "High" | "Critical",
  "impactScore": number between 50 and 100,
  "feasibilityScore": number between 50 and 100,
  "recommendedDepartment": "Exact University Engineering Department or Interdisciplinary Team",
  "summary": "2-sentence actionable technical engineering appraisal and recommended solution architecture.",
  "estimatedBudget": "Estimated cost in INR formatted like '₹ 1,50,000 - ₹ 2,20,000'",
  "estimatedTimelineWeeks": number of weeks (2 to 12),
  "relevantSkills": ["Skill1", "Skill2", "Skill3", "Skill4"]
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.2
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[GeminiService] Gemini API returned ${response.status}: ${errText}. Falling back to heuristics.`);
      return heuristicCivicAnalysis(title, description, category, location);
    }

    const json = await response.json();
    const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (rawText) {
      const parsed = JSON.parse(rawText);
      return {
        ...parsed,
        aiModel: 'Gemini 1.5 Flash (Google AI)'
      };
    }

    return heuristicCivicAnalysis(title, description, category, location);
  } catch (error) {
    console.error('[GeminiService] Error calling Gemini API:', error.message);
    return heuristicCivicAnalysis(title, description, category, location);
  }
}
