import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  seedUsers,
  seedProblems,
  seedProjects,
  seedExpenses,
  seedLeaderboard,
  seedNotifications
} from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

class Storage {
  constructor() {
    this.data = {
      users: [],
      problems: [],
      projects: [],
      expenses: [],
      leaderboard: [],
      notifications: []
    };
    this.init();
  }

  init() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.problems) && parsed.problems.length > 0) {
          this.data = parsed;
          console.log(`[Storage] Loaded existing database with ${this.data.problems.length} problems & ${this.data.projects.length} projects.`);
          return;
        }
      } catch (err) {
        console.warn('[Storage] Could not parse existing db.json, re-seeding...', err.message);
      }
    }

    // Seed default data
    this.data = {
      users: seedUsers,
      problems: seedProblems,
      projects: seedProjects,
      expenses: seedExpenses,
      leaderboard: seedLeaderboard,
      notifications: seedNotifications
    };
    this.save();
    console.log('[Storage] Seeded fresh AwaazGram database.');
  }

  save() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[Storage] Error persisting to db.json:', err);
    }
  }

  // Users
  getUsers() { return this.data.users; }
  getUserById(id) { return this.data.users.find(u => u.id === id); }
  getUserByEmail(email) { return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase()); }
  createUser(user) {
    this.data.users.push(user);
    this.save();
    return user;
  }

  // Problems
  getProblems(filters = {}) {
    let result = [...this.data.problems];
    if (filters.status) {
      result = result.filter(p => p.status === filters.status);
    }
    if (filters.city) {
      result = result.filter(p => p.location?.city?.toLowerCase() === filters.city.toLowerCase());
    }
    if (filters.category) {
      result = result.filter(p => p.category?.toLowerCase().includes(filters.category.toLowerCase()));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location?.city?.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt));
  }

  getProblemById(id) {
    return this.data.problems.find(p => p.id === id);
  }

  createProblem(problem) {
    this.data.problems.unshift(problem);
    this.save();
    return problem;
  }

  updateProblem(id, updates) {
    const idx = this.data.problems.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.data.problems[idx] = { ...this.data.problems[idx], ...updates };
      this.save();
      return this.data.problems[idx];
    }
    return null;
  }

  upvoteProblem(id, userId) {
    const problem = this.getProblemById(id);
    if (!problem) return null;
    if (!problem.upvotedBy) problem.upvotedBy = [];
    
    if (problem.upvotedBy.includes(userId)) {
      problem.upvotedBy = problem.upvotedBy.filter(u => u !== userId);
      problem.upvotes = Math.max(0, (problem.upvotes || 1) - 1);
    } else {
      problem.upvotedBy.push(userId);
      problem.upvotes = (problem.upvotes || 0) + 1;
    }
    this.save();
    return problem;
  }

  // Projects
  getProjects(filters = {}) {
    let result = [...this.data.projects];
    if (filters.status) {
      result = result.filter(p => p.status === filters.status);
    }
    if (filters.universityId) {
      result = result.filter(p => p.universityId === filters.universityId);
    }
    return result;
  }

  getProjectById(id) {
    return this.data.projects.find(p => p.id === id);
  }

  getProjectByProblemId(problemId) {
    return this.data.projects.find(p => p.problemId === problemId);
  }

  createProject(project) {
    this.data.projects.unshift(project);
    // Link to problem
    const prob = this.getProblemById(project.problemId);
    if (prob) {
      prob.projectId = project.id;
      prob.status = "in_progress";
    }
    this.save();
    return project;
  }

  updateProject(id, updates) {
    const idx = this.data.projects.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.data.projects[idx] = { ...this.data.projects[idx], ...updates };
      this.save();
      return this.data.projects[idx];
    }
    return null;
  }

  // Expenses
  getExpenses(projectId = null) {
    if (projectId) {
      return this.data.expenses.filter(e => e.projectId === projectId);
    }
    return this.data.expenses;
  }

  createExpense(expense) {
    this.data.expenses.unshift(expense);
    // update project total expenses
    const project = this.getProjectById(expense.projectId);
    if (project) {
      project.totalExpenses = (project.totalExpenses || 0) + Number(expense.amount || 0);
    }
    this.save();
    return expense;
  }

  // Leaderboard
  getLeaderboard() {
    return this.data.leaderboard.sort((a, b) => b.impactScore - a.impactScore);
  }

  updateLeaderboardScore(teamOrInst, additionalPoints, projectSolved = false) {
    let item = this.data.leaderboard.find(l => 
      l.institution.toLowerCase().includes(teamOrInst.toLowerCase()) || 
      l.teamName.toLowerCase().includes(teamOrInst.toLowerCase())
    );
    if (item) {
      item.impactScore += additionalPoints;
      if (projectSolved) {
        item.projectsSolved += 1;
        item.activeProjects = Math.max(0, item.activeProjects - 1);
      }
      this.save();
    }
  }

  // Notifications
  getNotifications(role = null) {
    if (!role || role === 'admin') return this.data.notifications;
    return this.data.notifications.filter(n => n.recipientRole === 'all' || n.recipientRole === role);
  }

  createNotification(notif) {
    const newNotif = {
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
      ...notif
    };
    this.data.notifications.unshift(newNotif);
    this.save();
    return newNotif;
  }

  resetDemoData() {
    this.data = {
      users: seedUsers,
      problems: seedProblems,
      projects: seedProjects,
      expenses: seedExpenses,
      leaderboard: seedLeaderboard,
      notifications: seedNotifications
    };
    this.save();
    return this.data;
  }
}

export const storage = new Storage();
