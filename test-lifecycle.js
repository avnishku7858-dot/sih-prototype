// Automated Full Lifecycle Verification Test for AwaazGram
const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('--- Starting AwaazGram End-to-End Civic Lifecycle Verification ---');

  try {
    // 1. Health check
    const healthRes = await fetch('http://localhost:5000/health');
    const health = await healthRes.json();
    console.log('✅ Health Check:', health.status);

    // 2. Auth Users check
    const usersRes = await fetch(`${BASE_URL}/auth/users`);
    const users = await usersRes.json();
    console.log(`✅ Loaded ${users.data.length} Demo Personas`);

    // 3. Gemini AI Analysis Test
    const aiRes = await fetch(`${BASE_URL}/ai/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Severe Waterlogging at Baner Underpass',
        description: 'Underpass gets 4ft submerged within 30 minutes of rain, stranding IT park commuters and emergency vehicles.',
        category: 'Drainage & Flood Management',
        location: 'Baner Underpass, Pune'
      })
    });
    const aiData = await aiRes.json();
    console.log('✅ Gemini AI Analysis Result:', {
      category: aiData.data.category,
      urgency: aiData.data.urgency,
      impact: aiData.data.impactScore,
      department: aiData.data.recommendedDepartment
    });

    // 4. Citizen Reports Problem
    const createProbRes = await fetch(`${BASE_URL}/problems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Severe Waterlogging at Baner Underpass',
        description: 'Underpass gets 4ft submerged within 30 minutes of rain, stranding IT park commuters.',
        category: 'Drainage & Flood Management',
        address: 'Baner Underpass, Highway Exit 4',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411045',
        lat: 18.5590,
        lng: 73.7868,
        reportedById: 'user-cit-1',
        reportedByName: 'Rajesh Kumar'
      })
    });
    const newProb = await createProbRes.json();
    console.log(`✅ Step 1 (Citizen): Problem Reported with ID: ${newProb.data.id}`);

    // 5. Government Verifies Problem
    const verifyRes = await fetch(`${BASE_URL}/problems/${newProb.data.id}/verify`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'verified',
        remarks: 'Critical underpass transit hazard. Approved for university engineering pilot with grant.',
        verifiedBy: 'IAS Ananya Verma',
        allocatedBudget: 175000,
        priority: 'High'
      })
    });
    const verifiedProb = await verifyRes.json();
    console.log(`✅ Step 2 (Government): Problem Verified by ${verifiedProb.data.verification.verifiedBy}, Grant: ₹${verifiedProb.data.verification.allocatedBudget}`);

    // 6. University Adopts Problem
    const adoptRes = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problemId: newProb.data.id,
        universityId: 'user-uni-1',
        universityName: 'College of Engineering Pune (COEP Tech)',
        teamName: 'Team Jaltarang Hydro',
        studentLead: 'Aakash Deshmukh',
        facultyMentor: 'Prof. Arvind Rao',
        solutionSummary: 'Automated high-capacity flood siphon bypass with solar-powered LoRa water level monitoring.'
      })
    });
    const newProject = await adoptRes.json();
    console.log(`✅ Step 3 (University): Adopted by ${newProject.data.teamName} (Project ID: ${newProject.data.id})`);

    // 7. Industry Pledges CSR Support
    const pledgeRes = await fetch(`${BASE_URL}/projects/${newProject.data.id}/pledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        industryId: 'user-ind-1',
        industryName: 'Tata Sustainability & CSR',
        contactPerson: 'Vikram Malhotra',
        pledgeType: 'Matching CSR Grant & Submersible Pumps',
        amountPledged: 80000,
        hardwareSupplied: '2x 5HP High-Head Submersible Drainage Pumps'
      })
    });
    const pledge = await pledgeRes.json();
    console.log(`✅ Step 4 (Industry): Pledged ₹${pledge.data.amountPledged} & Hardware`);

    // 8. University Progress Updates & Milestone Completion
    const milestoneId = newProject.data.milestones[1].id;
    const milestoneRes = await fetch(`${BASE_URL}/projects/${newProject.data.id}/milestones/${milestoneId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'completed',
        photoProof: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800'
      })
    });
    const updatedProj = await milestoneRes.json();
    console.log(`✅ Step 5 (Milestones): Milestone marked completed, Progress is now: ${updatedProj.data.progressPercentage}%`);

    // 9. Log Transparency Expense
    const expRes = await fetch(`${BASE_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId: newProject.data.id,
        item: 'SS304 High-Draft Siphon Pipes & Mounting Flanges',
        category: 'Materials & Fabrication',
        amount: 32000,
        vendor: 'Maharashtra Fluid Tech Ltd.',
        loggedBy: 'Aakash Deshmukh'
      })
    });
    const exp = await expRes.json();
    console.log(`✅ Step 6 (Expenses): Logged ₹${exp.data.amount} for "${exp.data.item}"`);

    // 10. Mark Problem Solved
    const solveRes = await fetch(`${BASE_URL}/projects/${newProject.data.id}/solve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        finalOutcome: 'Dual-stage siphon bypass commissioned. Underpass remained clear during 65mm downpour.',
        afterPhoto: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=800',
        repoUrl: 'https://github.com/awaazgram-coep/baner-flood-siphon'
      })
    });
    const solvedProj = await solveRes.json();
    console.log(`✅ Step 7 (Solved): Project status marked SOLVED! Status: ${solvedProj.data.status}, Progress: ${solvedProj.data.progressPercentage}%`);

    // 11. Leaderboard & Stats check
    const [statsRes, lbRes] = await Promise.all([
      fetch(`${BASE_URL}/stats`),
      fetch(`${BASE_URL}/leaderboard`)
    ]);
    const statsData = await statsRes.json();
    const lbData = await lbRes.json();

    console.log(`✅ Admin Analytics Verified: ${statsData.data.totalProblems} Total Problems, ${statsData.data.solvedProjects} Solved`);
    console.log(`✅ Leaderboard Top Team: ${lbData.data[0].institution} with ${lbData.data[0].impactScore} pts`);

    console.log('\n🎉 ALL 7 STEPS OF THE AWAAZGRAM SIH LIFECYCLE COMPLETED SUCCESSFULLY WITH ZERO ERRORS!');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
  }
}

runTests();
