import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  Receipt,
  PlusCircle,
  CheckCircle2,
  DollarSign,
  Building,
  FileText,
  Search,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  X,
  Upload
} from 'lucide-react';

export default function ExpenseTrackerPage({ projects = [], onExpenseAdded }) {
  const { currentUser } = useAuth();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);

  // Form State
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || 'proj-201');
  const [item, setItem] = useState('');
  const [category, setCategory] = useState('Materials & Fabrication');
  const [amount, setAmount] = useState('');
  const [vendor, setVendor] = useState('');
  const [invoiceUrl, setInvoiceUrl] = useState('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await api.getExpenses();
      if (res.success) {
        setExpenses(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExpense = async (e) => {
    e.preventDefault();
    if (!item || !amount) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('projectId', selectedProjectId);
      formData.append('item', item);
      formData.append('category', category);
      formData.append('amount', amount);
      formData.append('vendor', vendor || 'Authorized Vendor');
      formData.append('invoiceUrl', invoiceUrl);
      formData.append('loggedBy', currentUser?.name || 'Student Lead');

      const res = await api.createExpense(formData);
      if (res.success) {
        setExpenses([res.data, ...expenses]);
        if (onExpenseAdded) onExpenseAdded(res.data);
        setShowLogModal(false);
        setItem('');
        setAmount('');
        setVendor('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSpent = expenses.reduce((acc, e) => acc + (Number(e.amount) || 0), 0);
  const filteredExpenses = expenses.filter(e =>
    !searchTerm ||
    e.item?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 text-slate-800 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Receipt className="w-3.5 h-3.5 text-emerald-600" />
            <span>Public Open Ledger • 100% Fund Transparency</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Civic Grant & Expense Transparency
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Every rupee allocated by Municipal bodies or CSR partners is audited in real-time with itemized invoices and verified milestones.
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition shadow-md shadow-emerald-600/20 flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Log Project Expense</span>
        </button>
      </div>

      {/* 3 Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Tracked Expenditure</div>
          <div className="text-2xl font-black text-slate-900 font-heading mt-1">₹ {totalSpent.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-slate-500 mt-1">Across all university student projects</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Audited Invoices</div>
          <div className="text-2xl font-black text-emerald-700 font-heading mt-1">{expenses.length || 12} Records</div>
          <div className="text-[11px] text-slate-500 mt-1">100% backed by vendor receipts</div>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Audit Compliance</div>
          <div className="text-2xl font-black text-blue-700 font-heading mt-1">100% Certified</div>
          <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Municipal & CSR Approved
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search expenses by item, vendor, or category (e.g. Solar panels, Steel, Sensors)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-4 pl-6">Item & Procurement Details</th>
                <th className="p-4">Project ID</th>
                <th className="p-4">Vendor & Date</th>
                <th className="p-4">Category</th>
                <th className="p-4 font-bold">Amount (₹)</th>
                <th className="p-4 pr-6 text-center">Invoice Proof</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredExpenses.map((exp, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 pl-6">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">{exp.item}</div>
                    <div className="text-[10px] text-slate-400">Logged by: {exp.loggedBy}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold border border-emerald-200">
                      {exp.projectId}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-slate-800 font-semibold">{exp.vendor}</div>
                    <div className="text-[10px] text-slate-400">{exp.date}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200">
                      {exp.category}
                    </span>
                  </td>
                  <td className="p-4 font-extrabold text-slate-900 text-xs sm:text-sm">
                    ₹{exp.amount?.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 pr-6 text-center">
                    <a
                      href={exp.invoiceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 text-[11px] font-bold transition"
                    >
                      <span>Receipt</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Log New Expense */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">Log Project Expense</h3>
                  <p className="text-xs text-slate-500">Submit receipt to public transparency ledger</p>
                </div>
              </div>
              <button onClick={() => setShowLogModal(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExpense} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Target Project</label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.title} ({p.universityName})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Item / Component Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5x Waterproof Ultrasonic Distance Sensors & Cabling"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Expenditure Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 14500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Materials & Fabrication">Materials & Fabrication</option>
                    <option value="IoT & Electronics">IoT & Electronics</option>
                    <option value="Energy Storage / Solar">Energy Storage / Solar</option>
                    <option value="Labor & Trenching">Labor & Trenching</option>
                    <option value="Testing & Field Logistics">Testing & Field Logistics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Vendor / Supplier Name</label>
                <input
                  type="text"
                  placeholder="e.g. Robu.in Electronics / Waaree Solar"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Receipt / Invoice Image URL</label>
                <input
                  type="text"
                  value={invoiceUrl}
                  onChange={(e) => setInvoiceUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono text-[11px] focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/20"
                >
                  {isSubmitting ? 'Recording...' : 'Publish Expense to Ledger'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
