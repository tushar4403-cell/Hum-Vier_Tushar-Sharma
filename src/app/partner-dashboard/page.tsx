'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  IndianRupee,
  Phone,
  User,
  Star,
  LogOut,
  Bell,
  Sparkles,
  TrendingUp,
  Briefcase,
  FileText,
  AlertCircle,
  Send,
  Zap,
} from 'lucide-react';
import { useUserStore } from '@/lib/userStore';

interface IncomingJob {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  location: string;
  distance: string;
  customerOffer: number;
  partnerBaseRate: number;
  schedule: string;
  description: string;
  status: 'pending' | 'accepted' | 'countered' | 'declined';
  counterRate?: number;
}

const INITIAL_REQUESTS: IncomingJob[] = [
  {
    id: 'REQ-101',
    customerName: 'Ananya Sharma',
    customerPhone: '+91 98451 22340',
    service: 'Plumber',
    location: 'Indiranagar 12th Main, Bangalore',
    distance: '0.9 km',
    customerOffer: 380,
    partnerBaseRate: 350,
    schedule: 'Immediate (<20 mins)',
    description: 'Bathroom shower mixer leaking heavily from the top pipe. Please bring seal tape.',
    status: 'pending',
  },
  {
    id: 'REQ-102',
    customerName: 'Vikram Sengupta',
    customerPhone: '+91 97123 44512',
    service: 'Plumber',
    location: 'Defence Colony, Indiranagar',
    distance: '1.4 km',
    customerOffer: 300,
    partnerBaseRate: 350,
    schedule: 'Immediate (<30 mins)',
    description: 'Kitchen drainage pipe clogged. Urgent assistance needed.',
    status: 'pending',
  },
  {
    id: 'REQ-103',
    customerName: 'Meera Iyer',
    customerPhone: '+91 99201 88714',
    service: 'Plumber',
    location: 'Domlur 2nd Stage, Bangalore',
    distance: '2.1 km',
    customerOffer: 450,
    partnerBaseRate: 350,
    schedule: 'Today, 4:00 PM',
    description: 'New water purifier valve connection and pipeline fitting.',
    status: 'pending',
  },
];

export default function PartnerDashboard() {
  const { profile, isLoaded } = useUserStore();
  const [isOnline, setIsOnline] = useState(true);
  const [jobs, setJobs] = useState<IncomingJob[]>(INITIAL_REQUESTS);
  const [activeTab, setActiveTab] = useState<'requests' | 'active' | 'verification'>('requests');
  const [counterModalJob, setCounterModalJob] = useState<IncomingJob | null>(null);
  const [counterPrice, setCounterPrice] = useState('350');
  const [acceptedJob, setAcceptedJob] = useState<IncomingJob | null>(null);
  const [earnings, setEarnings] = useState(2450);
  const [completedJobsCount, setCompletedJobsCount] = useState(4);

  const handleAccept = (job: IncomingJob) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === job.id ? { ...j, status: 'accepted' as const } : j))
    );
    setAcceptedJob(job);
  };

  const handleDecline = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: 'declined' as const } : j))
    );
  };

  const handleSendCounter = () => {
    if (!counterModalJob) return;
    const parsedPrice = Number(counterPrice) || counterModalJob.partnerBaseRate;
    setJobs((prev) =>
      prev.map((j) =>
        j.id === counterModalJob.id
          ? { ...j, status: 'countered' as const, counterRate: parsedPrice }
          : j
      )
    );
    setCounterModalJob(null);
  };

  const partnerName = isLoaded ? profile.name : 'Rajesh Kumar';
  const partnerInitial = isLoaded ? profile.avatarInitial : 'R';
  const partnerSkill = profile.partnerDetails?.skill || 'Plumber';
  const idDocumentType = profile.partnerDetails?.idType || 'Aadhaar Card';
  const idMaskedNumber = profile.partnerDetails?.idNumber || 'XXXX-XXXX-8921';

  return (
    <main className="min-h-screen animated-bg">
      {/* ── Top Navigation Bar ── */}
      <nav className="sticky top-0 z-40 bg-black/40 backdrop-blur-2xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md shadow-purple-500/30">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Fixo
              </span>
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
              <Briefcase className="w-3 h-3" />
              Partner Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Online / Offline switch */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/[0.08] rounded-xl px-3 py-1.5">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isOnline
                    ? 'bg-emerald-400 shadow-md shadow-emerald-400/50 animate-pulse'
                    : 'bg-slate-500'
                }`}
              />
              <span className="text-xs font-medium text-white hidden sm:inline">
                {isOnline ? 'Online (Accepting Jobs)' : 'Offline'}
              </span>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`text-[11px] font-bold px-2 py-0.5 rounded transition-colors ${
                  isOnline
                    ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                {isOnline ? 'Pause' : 'Go Live'}
              </button>
            </div>

            {/* Partner Avatar & Sign Out */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 bg-white/5 border border-white/[0.08] rounded-xl px-3 py-1.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  {partnerInitial}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-semibold text-white flex items-center gap-1">
                    {partnerName}
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-slate-400">{partnerSkill} Specialist</span>
                </div>
              </div>

              <Link
                href="/auth"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-rose-500/10 border border-white/[0.08] hover:border-rose-500/30 flex items-center justify-center text-slate-400 hover:text-rose-400 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Main Content Container ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Verification banner if verified */}
        <div className="glass-card p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-emerald-500/30 bg-emerald-500/[0.04]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  Government ID Verified Partner
                </h3>
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  100% Anti-Fraud Authenticated
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Verified with {idDocumentType.toUpperCase()} ({idMaskedNumber}). Trust & Safety score: 99.8/100.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('verification')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4"
          >
            View Verification Certificate
          </button>
        </div>

        {/* ── Metric Highlights ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs">Today&apos;s Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white flex items-center">
              <IndianRupee className="w-5 h-5 mr-0.5" />
              {earnings.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-400 mt-1 block">
              +₹750 from yesterday · Direct payout
            </span>
          </div>

          <div className="glass-card p-5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs">Completed Jobs</span>
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {completedJobsCount} <span className="text-sm text-slate-400 font-normal">today</span>
            </div>
            <span className="text-[11px] text-cyan-400 mt-1 block">
              100% On-time completion
            </span>
          </div>

          <div className="glass-card p-5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs">Customer Rating</span>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white">4.92 ★</div>
            <span className="text-[11px] text-amber-300 mt-1 block">
              Based on 148 verified reviews
            </span>
          </div>

          <div className="glass-card p-5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs">Base Hourly Rate</span>
              <Zap className="w-4 h-4 text-violet-400" />
            </div>
            <div className="text-2xl font-bold text-white">₹350/hr</div>
            <span className="text-[11px] text-violet-300 mt-1 block">
              Open to customer negotiations
            </span>
          </div>
        </div>

        {/* ── Tab Switcher ── */}
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3 mb-6">
          <button
            onClick={() => setActiveTab('requests')}
            className={`text-sm font-semibold pb-2 border-b-2 transition-all duration-150 flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'border-violet-400 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Live Job Requests & Negotiations</span>
            <span className="bg-violet-500/20 text-violet-300 text-xs px-2 py-0.5 rounded-full">
              {jobs.filter((j) => j.status === 'pending').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('active')}
            className={`text-sm font-semibold pb-2 border-b-2 transition-all duration-150 flex items-center gap-2 ${
              activeTab === 'active'
                ? 'border-violet-400 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Accepted / Active Jobs</span>
            {jobs.some((j) => j.status === 'accepted') && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('verification')}
            className={`text-sm font-semibold pb-2 border-b-2 transition-all duration-150 ${
              activeTab === 'verification'
                ? 'border-violet-400 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Government ID & Anti-Fraud Credentials
          </button>
        </div>

        {/* ── Tab 1: Live Job Requests & Negotiation ── */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {jobs.filter((j) => j.status === 'pending' || j.status === 'countered').length === 0 ? (
              <div className="glass-card p-12 text-center rounded-3xl">
                <Clock className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">No pending requests right now</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Keep your status set to <strong>Online</strong> to receive nearby instant requests.
                </p>
              </div>
            ) : (
              jobs
                .filter((j) => j.status === 'pending' || j.status === 'countered')
                .map((job) => {
                  const diff = job.customerOffer - job.partnerBaseRate;
                  const diffPercent = ((diff / job.partnerBaseRate) * 100).toFixed(0);

                  return (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-card p-6 rounded-3xl relative overflow-hidden"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-xs font-mono font-bold bg-white/10 px-2.5 py-1 rounded-lg text-slate-300">
                              {job.id}
                            </span>
                            <span className="text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {job.schedule}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-violet-400" />
                              {job.location} ({job.distance})
                            </span>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                              {job.customerName}
                              <span className="text-xs font-normal text-slate-400">
                                needs {job.service}
                              </span>
                            </h3>
                            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                              &ldquo;{job.description}&rdquo;
                            </p>
                          </div>

                          {/* Pricing & Negotiation breakdown */}
                          <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] p-3.5 rounded-2xl max-w-xl">
                            <div>
                              <span className="text-[11px] text-slate-400 block">Your Base Rate</span>
                              <span className="text-sm font-semibold text-slate-200">
                                ₹{job.partnerBaseRate}/hr
                              </span>
                            </div>
                            <div className="h-7 w-[1px] bg-white/10" />
                            <div>
                              <span className="text-[11px] text-slate-400 block">Customer Proposed Budget</span>
                              <div className="flex items-center gap-2">
                                <span className="text-base font-bold text-emerald-400">
                                  ₹{job.customerOffer}/hr
                                </span>
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    diff >= 0
                                      ? 'bg-emerald-500/20 text-emerald-300'
                                      : 'bg-amber-500/20 text-amber-300'
                                  }`}
                                >
                                  {diff >= 0 ? `+₹${diff} (+${diffPercent}%)` : `-₹${Math.abs(diff)} (${diffPercent}%)`}
                                </span>
                              </div>
                            </div>
                            {job.status === 'countered' && (
                              <>
                                <div className="h-7 w-[1px] bg-white/10" />
                                <div>
                                  <span className="text-[11px] text-violet-300 block">Your Counter-Offer</span>
                                  <span className="text-sm font-bold text-violet-400">
                                    ₹{job.counterRate}/hr (Awaiting customer)
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-row lg:flex-col gap-2.5 shrink-0 justify-end">
                          <button
                            onClick={() => handleAccept(job)}
                            className="btn-primary !py-2.5 !px-5 text-sm flex items-center justify-center gap-1.5 font-semibold"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Accept ₹{job.customerOffer}/hr
                          </button>
                          <button
                            onClick={() => {
                              setCounterModalJob(job);
                              setCounterPrice(job.partnerBaseRate.toString());
                            }}
                            className="btn-secondary !py-2.5 !px-5 text-sm flex items-center justify-center gap-1.5"
                          >
                            <Send className="w-4 h-4 text-violet-400" />
                            Counter-Offer
                          </button>
                          <button
                            onClick={() => handleDecline(job.id)}
                            className="text-xs text-slate-400 hover:text-rose-400 transition-colors py-1 text-center"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
            )}
          </div>
        )}

        {/* ── Tab 2: Accepted / Active Jobs ── */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {jobs.filter((j) => j.status === 'accepted').length === 0 ? (
              <div className="glass-card p-12 text-center rounded-3xl">
                <Briefcase className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">No active dispatches right now</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Accept an incoming request from the &quot;Live Job Requests&quot; tab to start working.
                </p>
              </div>
            ) : (
              jobs
                .filter((j) => j.status === 'accepted')
                .map((job) => (
                  <div
                    key={job.id}
                    className="glass-card p-6 rounded-3xl border-emerald-500/30 bg-emerald-500/[0.02]"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            Active Dispatch · In Progress
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white">{job.customerName}</h3>
                        <p className="text-sm text-slate-300 mt-0.5">{job.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-violet-400" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1 text-emerald-400 font-bold">
                            <IndianRupee className="w-3.5 h-3.5" />
                            Rate: ₹{job.customerOffer}/hr
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2.5 w-full md:w-auto">
                        <a
                          href={`tel:${job.customerPhone}`}
                          className="btn-secondary !py-2.5 text-sm flex items-center justify-center gap-2 flex-1 md:flex-initial"
                        >
                          <Phone className="w-4 h-4 text-emerald-400" />
                          Call Customer
                        </a>
                        <button
                          onClick={() => {
                            setJobs((prev) => prev.filter((j) => j.id !== job.id));
                            setEarnings((prev) => prev + job.customerOffer * 1.5);
                            setCompletedJobsCount((prev) => prev + 1);
                          }}
                          className="btn-primary !py-2.5 text-sm flex items-center justify-center gap-2 flex-1 md:flex-initial bg-gradient-to-r from-emerald-500 to-green-600 shadow-emerald-500/20"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Mark Completed
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {/* ── Tab 3: Government ID & Anti-Fraud Security Credentials ── */}
        {activeTab === 'verification' && (
          <div className="glass-card p-8 rounded-3xl max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Government ID Verification Record</h2>
                <p className="text-xs text-slate-400">
                  National UIDAI & Digital India Verified Security Credentials
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/[0.08] p-4 rounded-2xl">
                  <span className="text-xs text-slate-400 block mb-1">ID Document Type</span>
                  <span className="text-sm font-semibold text-white uppercase">{idDocumentType}</span>
                </div>
                <div className="bg-white/5 border border-white/[0.08] p-4 rounded-2xl">
                  <span className="text-xs text-slate-400 block mb-1">Masked Identity Number</span>
                  <span className="text-sm font-semibold text-white font-mono tracking-wider">
                    {idMaskedNumber}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/[0.08] p-4 rounded-2xl">
                  <span className="text-xs text-slate-400 block mb-1">Police & Fraud Clearance</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" /> Passed Clean Background Check
                  </span>
                </div>
                <div className="bg-white/5 border border-white/[0.08] p-4 rounded-2xl">
                  <span className="text-xs text-slate-400 block mb-1">Status on Customer App</span>
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 mt-0.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" /> &quot;Verified Partner&quot; Badge Active
                  </span>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.06] p-4 rounded-2xl text-xs text-slate-400 leading-relaxed">
                🔒 <strong>Anti-Fraud Protection:</strong> Your identity is locked to this account and cross-verified with official government databases. Fake profiles, impersonators, and fraudulent workers are automatically detected and permanently banned.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Counter Offer Modal ── */}
      <AnimatePresence>
        {counterModalJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-modal max-w-md w-full p-7"
            >
              <h3 className="text-xl font-bold text-white mb-1">Propose Counter-Offer</h3>
              <p className="text-xs text-slate-400 mb-5">
                Customer offered ₹{counterModalJob.customerOffer}/hr. Enter your proposed rate for {counterModalJob.customerName}.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs text-slate-300 mb-1.5 block">Your Counter Rate (₹/hr)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      value={counterPrice}
                      onChange={(e) => setCounterPrice(e.target.value)}
                      className="input-glass !pl-10 text-lg font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCounterModalJob(null)}
                  className="btn-secondary flex-1 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendCounter}
                  className="btn-primary flex-1 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  Send Counter
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Accepted Job Confirmation Toast / Modal ── */}
      <AnimatePresence>
        {acceptedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-modal max-w-md w-full p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Job Accepted!</h3>
              <p className="text-sm text-slate-300 mb-6">
                You have accepted the request for <strong>{acceptedJob.customerName}</strong> at <strong>₹{acceptedJob.customerOffer}/hr</strong>.
              </p>
              <div className="glass p-4 rounded-2xl text-left text-xs space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Destination:</span>
                  <span className="text-white font-medium">{acceptedJob.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Customer Phone:</span>
                  <span className="text-cyan-400 font-medium">{acceptedJob.customerPhone}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setAcceptedJob(null);
                  setActiveTab('active');
                }}
                className="w-full btn-primary text-sm font-semibold"
              >
                Go to Active Jobs
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
