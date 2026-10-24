'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Bell,
  Wrench,
  Zap,
  Paintbrush,
  SprayCan,
  ChefHat,
  Home,
  Star,
  BadgeCheck,
  X,
  IndianRupee,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Plus,
  Navigation,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { useUserStore, Booking } from '@/lib/userStore';

/* ─── Worker Types ─── */
interface Worker {
  id: number;
  name: string;
  skill: string;
  rating: number;
  reviews: number;
  distance: string;
  baseRate: number;
  verified: boolean;
  experience: string;
  initials: string;
  gradient: string;
  bio: string;
  completedJobs: number;
  responseTime: string;
}

const categories = [
  { name: 'All', icon: Search },
  { name: 'Plumber', icon: Wrench },
  { name: 'Electrician', icon: Zap },
  { name: 'Painter', icon: Paintbrush },
  { name: 'Cleaner', icon: SprayCan },
  { name: 'Cook', icon: ChefHat },
  { name: 'Maid', icon: Home },
];

const workers: Worker[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    skill: 'Plumber',
    rating: 4.9,
    reviews: 127,
    distance: '0.8 km',
    baseRate: 350,
    verified: true,
    experience: '8 years',
    initials: 'RK',
    gradient: 'from-blue-500 to-cyan-500',
    bio: 'Specialist in sanitary fittings, high-pressure leak repairs, and pipe installations. Govt ID verified.',
    completedJobs: 842,
    responseTime: '12 min',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    skill: 'Cleaner',
    rating: 4.9,
    reviews: 203,
    distance: '1.1 km',
    baseRate: 300,
    verified: true,
    experience: '5 years',
    initials: 'PS',
    gradient: 'from-emerald-500 to-green-500',
    bio: 'Deep residential cleaning, kitchen degreasing, and sanitization with eco-safe organic materials.',
    completedJobs: 1205,
    responseTime: '8 min',
  },
  {
    id: 3,
    name: 'Mohammed Ali',
    skill: 'Electrician',
    rating: 4.8,
    reviews: 89,
    distance: '1.5 km',
    baseRate: 400,
    verified: true,
    experience: '12 years',
    initials: 'MA',
    gradient: 'from-amber-500 to-orange-500',
    bio: 'Certified master electrician: short circuits, MCB panels, smart home fixtures, and appliance wiring.',
    completedJobs: 634,
    responseTime: '15 min',
  },
  {
    id: 4,
    name: 'Sunita Devi',
    skill: 'Cook',
    rating: 4.7,
    reviews: 156,
    distance: '1.8 km',
    baseRate: 450,
    verified: true,
    experience: '6 years',
    initials: 'SD',
    gradient: 'from-violet-500 to-purple-500',
    bio: 'North & South Indian gourmet cooking, healthy meal preparations, and party catering.',
    completedJobs: 412,
    responseTime: '20 min',
  },
  {
    id: 5,
    name: 'Ramesh Yadav',
    skill: 'Painter',
    rating: 4.7,
    reviews: 74,
    distance: '2.3 km',
    baseRate: 500,
    verified: true,
    experience: '10 years',
    initials: 'RY',
    gradient: 'from-rose-500 to-pink-500',
    bio: 'Texture painting, waterproofing, damp wall treatment, and precision interior finish.',
    completedJobs: 389,
    responseTime: '25 min',
  },
  {
    id: 6,
    name: 'Meena Patel',
    skill: 'Maid',
    rating: 4.8,
    reviews: 312,
    distance: '0.6 km',
    baseRate: 250,
    verified: true,
    experience: '7 years',
    initials: 'MP',
    gradient: 'from-teal-500 to-cyan-500',
    bio: 'Daily and weekly housekeeping, organizing, and laundry. Verified background credentials.',
    completedJobs: 2150,
    responseTime: '6 min',
  },
];

export default function CustomerDashboard() {
  const {
    profile,
    bookings,
    savedAddresses,
    isLoaded,
    updateProfile,
    setAddress,
    addBooking,
    cancelBooking,
    addCustomAddress,
  } = useUserStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  // Modals state
  const [profileOpen, setProfileOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [bookingsModalOpen, setBookingsModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  // Profile Edit Form State
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Custom Address Form State
  const [customAddressTitle, setCustomAddressTitle] = useState('');
  const [customAddressVal, setCustomAddressVal] = useState('');

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const openEditProfile = () => {
    setProfileForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    });
    setProfileOpen(false);
    setEditProfileModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setEditProfileModalOpen(false);
    showToast('Profile updated successfully!', 'success');
  };

  const handleBookingConfirmed = (worker: Worker, offer: number, schedule: string, jobDesc?: string) => {
    addBooking({
      workerId: worker.id,
      workerName: worker.name,
      skill: worker.skill,
      rate: offer,
      originalRate: worker.baseRate,
      status: 'arriving',
      schedule: schedule === 'now' ? 'Immediate (<30 mins)' : schedule,
      address: profile.address,
      eta: worker.responseTime,
      jobDescription: jobDesc || `${worker.skill} repair and service`,
    });
    setSelectedWorker(null);
    showToast(`Booking confirmed with ${worker.name}! ETA: ${worker.responseTime}`, 'success');
  };

  const filteredWorkers = useMemo(() => {
    return workers.filter((w) => {
      const matchCategory = activeCategory === 'All' || w.skill === activeCategory;
      const matchSearch =
        !searchQuery ||
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.skill.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const activeBookingsCount = bookings.filter((b) => b.status === 'arriving' || b.status === 'in_progress').length;

  return (
    <main className="min-h-screen animated-bg pb-20">
      {/* ── Top Navigation Bar ── */}
      <nav className="sticky top-0 z-40 bg-black/40 backdrop-blur-2xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md shadow-purple-500/30">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Fixo
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Bookings shortcut pill */}
            <button
              onClick={() => setBookingsModalOpen(true)}
              className="relative flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">My Bookings</span>
              {activeBookingsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-violet-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/[0.08] rounded-xl px-3 py-2 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  {isLoaded ? profile.avatarInitial : 'A'}
                </div>
                <span className="text-xs font-semibold text-white hidden sm:block">
                  {isLoaded ? profile.name.split(' ')[0] : 'Customer'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 glass-modal p-2 shadow-2xl z-50"
                  >
                    <div className="px-3 py-2 border-b border-white/[0.08] mb-1">
                      <p className="text-xs font-bold text-white truncate">{profile.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{profile.email}</p>
                    </div>

                    <button
                      onClick={openEditProfile}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-violet-400" />
                      My Profile
                    </button>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        setBookingsModalOpen(true);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      My Bookings ({bookings.length})
                    </button>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        setAddressModalOpen(true);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      Change Address
                    </button>

                    <div className="border-t border-white/[0.08] mt-1 pt-1">
                      <Link
                        href="/auth"
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Main Dashboard Body ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Location Indicator & Real-Time Greeting */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-medium text-white truncate max-w-md">
              {isLoaded ? profile.address : 'Indiranagar 100ft Road, Bangalore'}
            </span>
            <button
              onClick={() => setAddressModalOpen(true)}
              className="text-violet-400 hover:text-violet-300 font-semibold underline underline-offset-2 ml-1 transition-colors"
            >
              Change
            </button>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Welcome, <span className="text-violet-300">{isLoaded ? profile.name.split(' ')[0] : 'there'}</span>. What do you need <span className="gradient-text">fixed</span> today?
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Verified local professionals ready for on-demand dispatch in under 30 minutes. Propose your budget!
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by trade (Plumber, Cleaner, Electrician) or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-glass !pl-11 text-sm !py-3.5 shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((c) => {
            const Icon = c.icon;
            const isActive = activeCategory === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setActiveCategory(c.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 transform-gpu ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/[0.08]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Worker Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="glass-card p-6 rounded-3xl hover:border-violet-500/30 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${worker.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}
                    >
                      {worker.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-white text-base">{worker.name}</h3>
                        {worker.verified && (
                          <span title="Govt ID & Anti-Fraud Verified">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-violet-300">
                        {worker.skill} · {worker.experience}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold justify-end">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {worker.rating}
                      <span className="text-slate-500 font-normal">({worker.reviews})</span>
                    </div>
                    <span className="text-[11px] text-cyan-400 block mt-0.5 font-medium">
                      ETA: {worker.responseTime}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                  {worker.bio}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 bg-white/[0.03] p-3 rounded-2xl mb-5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-violet-400" />
                    {worker.distance} away
                  </span>
                  <span>{worker.completedJobs} jobs finished</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] mb-4">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Base Rate</span>
                    <span className="text-base font-bold text-white">₹{worker.baseRate}/hr</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    Negotiation Available
                  </span>
                </div>

                <button
                  onClick={() => setSelectedWorker(worker)}
                  className="w-full btn-primary !py-2.5 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  Book & Negotiate Budget
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 1. My Profile Modal ── */}
      <AnimatePresence>
        {editProfileModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="glass-modal max-w-md w-full p-7"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                    <User className="w-4 h-4 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">My Profile</h3>
                </div>
                <button
                  onClick={() => setEditProfileModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-300 mb-1.5 block font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      required
                      className="input-glass !pl-11 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 mb-1.5 block font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      required
                      className="input-glass !pl-11 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 mb-1.5 block font-medium">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      required
                      className="input-glass !pl-11 text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setEditProfileModalOpen(false)}
                    className="btn-secondary flex-1 text-sm"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary flex-1 text-sm font-semibold">
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 2. My Bookings Modal ── */}
      <AnimatePresence>
        {bookingsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="glass-modal max-w-2xl w-full p-7 max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">My Bookings</h3>
                    <p className="text-xs text-slate-400">Track current dispatches and previous service history</p>
                  </div>
                </div>
                <button
                  onClick={() => setBookingsModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 overflow-y-auto pr-1 flex-1">
                {bookings.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-sm">
                    No bookings yet. Book a worker to see your dispatch status here!
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="glass-card p-4 rounded-2xl border border-white/[0.08] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                            {booking.id}
                          </span>
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              booking.status === 'arriving'
                                ? 'bg-cyan-500/20 text-cyan-300 animate-pulse'
                                : booking.status === 'completed'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-rose-500/20 text-rose-300'
                            }`}
                          >
                            {booking.status === 'arriving'
                              ? `Partner Arriving (${booking.eta})`
                              : booking.status === 'completed'
                              ? 'Service Completed'
                              : 'Cancelled'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          {booking.workerName}
                          <span className="text-xs text-violet-300 font-normal">({booking.skill})</span>
                        </h4>
                        <p className="text-xs text-slate-400">{booking.jobDescription}</p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                          <span>{booking.date}</span>
                          <span>•</span>
                          <span>{booking.address}</span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-slate-500 block">Agreed Rate</span>
                          <span className="text-sm font-bold text-emerald-400">₹{booking.rate}/hr</span>
                        </div>
                        {booking.status === 'arriving' && (
                          <button
                            onClick={() => {
                              cancelBooking(booking.id);
                              showToast('Booking cancelled.', 'info');
                            }}
                            className="text-xs text-rose-400 hover:text-rose-300 font-medium py-1"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 3. Address Switcher Modal ── */}
      <AnimatePresence>
        {addressModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="glass-modal max-w-md w-full p-7"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Select Service Address</h3>
                </div>
                <button
                  onClick={() => setAddressModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5 mb-6">
                {savedAddresses.map((addr) => {
                  const isCurrent = profile.address === addr.address;
                  return (
                    <button
                      key={addr.id}
                      onClick={() => {
                        setAddress(addr.address);
                        setAddressModalOpen(false);
                        showToast(`Location set to: ${addr.title}`, 'success');
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-150 flex items-center justify-between ${
                        isCurrent
                          ? 'bg-violet-500/15 border-violet-500/40 text-white shadow-sm'
                          : 'bg-white/5 hover:bg-white/10 border-white/[0.08] text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{addr.title}</span>
                          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-400">
                            {addr.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{addr.address}</p>
                      </div>
                      {isCurrent && <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Address */}
              <div className="border-t border-white/[0.08] pt-4">
                <h4 className="text-xs font-semibold text-slate-300 mb-2">Add New Locality</h4>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Address Title (e.g. My Flat)"
                    value={customAddressTitle}
                    onChange={(e) => setCustomAddressTitle(e.target.value)}
                    className="input-glass text-xs !py-2.5"
                  />
                  <input
                    type="text"
                    placeholder="Area / Street name (e.g. Whitefield Main Road, Bangalore)"
                    value={customAddressVal}
                    onChange={(e) => setCustomAddressVal(e.target.value)}
                    className="input-glass text-xs !py-2.5"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customAddressVal.trim()) {
                        addCustomAddress(customAddressTitle || 'Custom', customAddressVal.trim());
                        setAddressModalOpen(false);
                        showToast('New location saved and activated!', 'success');
                      }
                    }}
                    className="w-full btn-secondary text-xs !py-2.5 flex items-center justify-center gap-1.5 font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Save & Use This Address
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 4. Negotiation & Booking Modal ── */}
      <AnimatePresence>
        {selectedWorker && (
          <BookingNegotiationModal
            worker={selectedWorker}
            onClose={() => setSelectedWorker(null)}
            onConfirm={handleBookingConfirmed}
          />
        )}
      </AnimatePresence>

      {/* ── 5. Toast Notification ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div
              className={`glass-modal px-4 py-3 shadow-2xl flex items-center gap-3 border ${
                toast.type === 'success'
                  ? 'border-emerald-500/40 text-emerald-300'
                  : 'border-violet-500/40 text-violet-300'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="text-xs font-semibold text-white">{toast.message}</span>
              <button
                onClick={() => setToast(null)}
                className="text-slate-400 hover:text-white ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ─── Negotiation & Booking Modal Component ─── */
function BookingNegotiationModal({
  worker,
  onClose,
  onConfirm,
}: {
  worker: Worker;
  onClose: () => void;
  onConfirm: (worker: Worker, offer: number, schedule: string, desc: string) => void;
}) {
  const [offerPrice, setOfferPrice] = useState(worker.baseRate.toString());
  const [scheduleType, setScheduleType] = useState<'now' | 'later'>('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [step, setStep] = useState<'negotiate' | 'review'>('negotiate');

  const numOffer = Number(offerPrice) || worker.baseRate;
  const diff = numOffer - worker.baseRate;
  const percent = ((diff / worker.baseRate) * 100).toFixed(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="glass-modal max-w-lg w-full p-7"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${worker.gradient} flex items-center justify-center text-white font-bold text-sm`}
            >
              {worker.initials}
            </div>
            <div>
              <h3 className="font-bold text-white text-base">{worker.name}</h3>
              <p className="text-xs text-slate-400">
                {worker.skill} · Base Rate: ₹{worker.baseRate}/hr
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'negotiate' ? (
          <div className="space-y-4">
            {/* Offer Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs text-slate-300 font-medium">Your Proposed Hourly Rate (₹)</label>
                <span
                  className={`text-[11px] font-semibold ${
                    diff >= 0 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {diff === 0
                    ? 'Worker Base Rate'
                    : diff > 0
                    ? `+₹${diff} (+${percent}%)`
                    : `-₹${Math.abs(diff)} (${percent}%)`}
                </span>
              </div>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  className="input-glass !pl-10 text-lg font-bold"
                />
              </div>
            </div>

            {/* Timing */}
            <div>
              <label className="text-xs text-slate-300 font-medium mb-1.5 block">Schedule Dispatch</label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setScheduleType('now')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    scheduleType === 'now'
                      ? 'bg-violet-500/20 border-violet-500/40 text-white'
                      : 'bg-white/5 border-white/[0.08] text-slate-400'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Instant (&lt;30 mins)
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleType('later')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    scheduleType === 'later'
                      ? 'bg-violet-500/20 border-violet-500/40 text-white'
                      : 'bg-white/5 border-white/[0.08] text-slate-400'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-violet-400" />
                  Schedule Later
                </button>
              </div>

              {scheduleType === 'later' && (
                <div className="mt-2.5">
                  <input
                    type="datetime-local"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="input-glass text-xs !py-2.5"
                  />
                </div>
              )}
            </div>

            {/* Job Description */}
            <div>
              <label className="text-xs text-slate-300 font-medium mb-1.5 block">Describe the Job</label>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="e.g. Tap leaking in master bathroom, pipeline seal broken..."
                rows={2}
                className="input-glass text-xs resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={onClose} className="btn-secondary flex-1 text-xs">
                Cancel
              </button>
              <button
                onClick={() => setStep('review')}
                className="btn-primary flex-1 text-xs font-semibold"
              >
                Review & Confirm
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/[0.08] p-4 rounded-2xl space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Worker:</span>
                <span className="text-white font-bold">{worker.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Trade:</span>
                <span className="text-white font-medium">{worker.skill}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Proposed Rate:</span>
                <span className="text-emerald-400 font-bold">₹{numOffer}/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dispatch Time:</span>
                <span className="text-cyan-400 font-medium">
                  {scheduleType === 'now' ? 'Immediate (<30 mins)' : scheduleDate || 'Scheduled'}
                </span>
              </div>
              {jobDesc && (
                <div className="flex justify-between border-t border-white/[0.08] pt-2">
                  <span className="text-slate-400">Notes:</span>
                  <span className="text-slate-200">{jobDesc}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setStep('negotiate')} className="btn-secondary flex-1 text-xs">
                Modify
              </button>
              <button
                onClick={() => onConfirm(worker, numOffer, scheduleType === 'now' ? 'now' : scheduleDate, jobDesc)}
                className="btn-primary flex-1 text-xs font-semibold bg-gradient-to-r from-emerald-500 to-green-600 shadow-emerald-500/20"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
