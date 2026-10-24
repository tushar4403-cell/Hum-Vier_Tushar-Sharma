'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Shield,
  Briefcase,
  FileCheck,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { UserProfile } from '@/lib/userStore';

type UserType = 'customer' | 'partner';
type AuthMode = 'login' | 'signup';

const PARTNER_SKILLS = [
  'Plumber',
  'Electrician',
  'Cleaner',
  'Cook',
  'Maid',
  'Painter',
  'Carpenter',
  'AC Technician',
];

const GOVT_ID_TYPES = [
  { id: 'aadhaar', name: 'Aadhaar Card (UIDAI)', mask: 'XXXX-XXXX-XXXX', hint: '12-digit Unique Identification Number' },
  { id: 'pan', name: 'Permanent Account Number (PAN)', mask: 'ABCDE1234F', hint: '10-character Tax Identification' },
  { id: 'driving_license', name: 'Driving License', mask: 'DL-XXXXXXXXXXXXX', hint: 'State Issued Transport Authority License' },
  { id: 'voter_id', name: 'Voter ID (EPIC)', mask: 'ABC1234567', hint: 'Election Commission Electoral Photo ID' },
];

export default function AuthPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>('customer');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Partner signup multi-step
  const [partnerStep, setPartnerStep] = useState<'details' | 'verification'>('details');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    skill: 'Plumber',
    experience: '5 years',
    hourlyRate: '350',
    idType: 'aadhaar',
    idNumber: '',
    idDocumentName: '',
  });

  const [idFileUploaded, setIdFileUploaded] = useState(false);
  const [idScanning, setIdScanning] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSimulateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, idDocumentName: file.name }));
      setIdScanning(true);
      setTimeout(() => {
        setIdScanning(false);
        setIdFileUploaded(true);
      }, 1200);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If partner is on details step during signup, advance to ID verification step
    if (userType === 'partner' && authMode === 'signup' && partnerStep === 'details') {
      setPartnerStep('verification');
      return;
    }

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 900));

    // Determine fallback name if logging in without full name input
    let resolvedName = formData.name.trim();
    if (!resolvedName) {
      if (formData.email) {
        resolvedName = formData.email.split('@')[0].replace(/[._]/g, ' ');
        resolvedName = resolvedName.charAt(0).toUpperCase() + resolvedName.slice(1);
      } else {
        resolvedName = userType === 'customer' ? 'Aarav Patel' : 'Rajesh Kumar';
      }
    }

    const initial = resolvedName.charAt(0).toUpperCase();

    const userProfile: UserProfile = {
      name: resolvedName,
      email: formData.email || (userType === 'customer' ? 'customer@fixo.in' : 'partner@fixo.in'),
      phone: formData.phone || '+91 98765 43210',
      role: userType,
      address: userType === 'customer' ? 'Indiranagar 100ft Road, Bangalore' : 'Koramangala, Bangalore',
      avatarInitial: initial,
      partnerDetails:
        userType === 'partner'
          ? {
              skill: formData.skill,
              experience: formData.experience,
              hourlyRate: Number(formData.hourlyRate) || 350,
              idType: formData.idType,
              idNumber: formData.idNumber || 'XXXX-XXXX-8921',
              idDocumentName: formData.idDocumentName || 'Govt_ID_Scanned.pdf',
              isVerified: true,
              verificationDate: new Date().toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }),
            }
          : undefined,
    };

    try {
      localStorage.setItem('fixo_user_profile', JSON.stringify(userProfile));
    } catch {}

    setIsLoading(false);

    // Redirect to designated dashboard
    if (userType === 'customer') {
      router.push('/dashboard');
    } else {
      router.push('/partner-dashboard');
    }
  };

  return (
    <main className="min-h-screen animated-bg flex items-center justify-center relative overflow-hidden py-12 px-4">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-modal p-7 sm:p-9 shadow-2xl"
        >
          {/* Logo badge */}
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Fixo
            </span>
          </div>

          {/* User type toggle */}
          <div className="relative bg-white/5 rounded-xl p-1 flex mb-6 border border-white/[0.08]">
            <motion.div
              className="absolute inset-y-1 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 shadow-md shadow-purple-500/25"
              animate={{
                left: userType === 'customer' ? '4px' : '50%',
                right: userType === 'customer' ? '50%' : '4px',
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
            <button
              type="button"
              onClick={() => {
                setUserType('customer');
                setPartnerStep('details');
              }}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                userType === 'customer' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-4 h-4" />
              Customer
            </button>
            <button
              type="button"
              onClick={() => setUserType('partner')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                userType === 'partner' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Service Partner
            </button>
          </div>

          {/* Title and subtitle */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">
              {authMode === 'login'
                ? `Welcome back, ${userType === 'customer' ? 'Customer' : 'Partner'}`
                : userType === 'customer'
                ? 'Join as Customer'
                : partnerStep === 'details'
                ? 'Register as Service Partner'
                : 'Government ID Verification'}
            </h1>
            <p className="text-sm text-slate-400">
              {authMode === 'login'
                ? userType === 'customer'
                  ? 'Access instant home services in under 30 minutes'
                  : 'Manage your jobs, live negotiations, and earnings'
                : userType === 'customer'
                ? 'Create your free account with transparent rates'
                : partnerStep === 'details'
                ? 'Step 1 of 2: Your Professional & Contact Details'
                : 'Step 2 of 2: Anti-Fraud Verification with Govt ID'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ── Partner Signup Step 2: Government ID Verification ── */}
            {userType === 'partner' && authMode === 'signup' && partnerStep === 'verification' ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {/* Anti-fraud banner */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-300">
                      Mandatory Anti-Fraud Verification
                    </h4>
                    <p className="text-xs text-emerald-400/80 mt-0.5 leading-relaxed">
                      To prevent fake accounts, scammers, and protect both customers & workers, every service partner is verified against official government registries.
                    </p>
                  </div>
                </div>

                {/* ID Type selector */}
                <div>
                  <label className="text-xs text-slate-300 mb-1.5 block font-medium">
                    Select Government ID Type *
                  </label>
                  <select
                    name="idType"
                    value={formData.idType}
                    onChange={handleChange}
                    className="input-glass text-sm"
                  >
                    {GOVT_ID_TYPES.map((t) => (
                      <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ID Number */}
                <div>
                  <label className="text-xs text-slate-300 mb-1.5 block font-medium">
                    {GOVT_ID_TYPES.find((t) => t.id === formData.idType)?.name} Number *
                  </label>
                  <div className="relative">
                    <FileCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      name="idNumber"
                      placeholder={GOVT_ID_TYPES.find((t) => t.id === formData.idType)?.mask}
                      value={formData.idNumber}
                      onChange={handleChange}
                      required
                      className="input-glass !pl-11 text-sm font-mono tracking-wider"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {GOVT_ID_TYPES.find((t) => t.id === formData.idType)?.hint}
                  </span>
                </div>

                {/* Document Upload Dropzone */}
                <div>
                  <label className="text-xs text-slate-300 mb-1.5 block font-medium">
                    Upload Scanned Photo / PDF of ID Document *
                  </label>
                  <label className="border-2 border-dashed border-white/15 hover:border-violet-500/50 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden group">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleSimulateFileUpload}
                      className="hidden"
                    />
                    {idScanning ? (
                      <div className="flex flex-col items-center py-2">
                        <div className="w-8 h-8 border-2 border-violet-400 border-t-transparent rounded-full animate-spin mb-2" />
                        <span className="text-xs text-violet-300 font-medium">
                          Verifying with Government Registry...
                        </span>
                      </div>
                    ) : idFileUploaded ? (
                      <div className="flex items-center gap-3 py-1 text-left">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">
                            {formData.idDocumentName || 'Aadhaar_Front_Back.pdf'}
                          </p>
                          <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                            <Sparkles className="w-3 h-3" /> AI Verification Passed · Ready
                          </span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-7 h-7 text-slate-400 group-hover:text-violet-400 transition-colors mb-2" />
                        <span className="text-xs text-white font-medium">
                          Click to upload or drag & drop ID copy
                        </span>
                        <span className="text-[11px] text-slate-500 mt-0.5">
                          PNG, JPG, or PDF (Max 10MB) · Encrypted
                        </span>
                      </>
                    )}
                  </label>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setPartnerStep('details')}
                    className="btn-secondary flex-1 text-sm !py-3"
                  >
                    Back to Details
                  </button>
                  <motion.button
                    type="submit"
                    disabled={isLoading || idScanning}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="btn-primary flex-1 text-sm !py-3 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Verify & Finish
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              /* ── Standard Login or Signup (Customer or Partner Step 1) ── */
              <>
                {/* Full name on Signup */}
                {authMode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="relative"
                  >
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your full legal name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-glass !pl-11 text-sm"
                      required
                    />
                  </motion.div>
                )}

                {/* Email Address */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-glass !pl-11 text-sm"
                    required
                  />
                </div>

                {/* Phone number on Signup */}
                {authMode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="relative"
                  >
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Mobile number (+91)"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-glass !pl-11 text-sm"
                      required
                    />
                  </motion.div>
                )}

                {/* Partner specific fields on Signup (Step 1) */}
                {userType === 'partner' && authMode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-3 pt-1 border-t border-white/[0.08]"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">Primary Trade</label>
                        <select
                          name="skill"
                          value={formData.skill}
                          onChange={handleChange}
                          className="input-glass text-sm !py-2.5"
                        >
                          {PARTNER_SKILLS.map((s) => (
                            <option key={s} value={s} className="bg-slate-900 text-white">
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">Base Rate (₹/hr)</label>
                        <input
                          type="number"
                          name="hourlyRate"
                          placeholder="e.g. 350"
                          value={formData.hourlyRate}
                          onChange={handleChange}
                          className="input-glass text-sm !py-2.5"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Password field */}
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password (minimum 6 characters)"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-glass !pl-11 !pr-11 text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {authMode === 'login' && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">
                      Logging in as <strong className="text-slate-300 capitalize">{userType}</strong>
                    </span>
                    <a href="#" className="text-violet-400 hover:text-violet-300 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full btn-primary !py-3.5 flex items-center justify-center gap-2 text-sm font-semibold"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : authMode === 'login' ? (
                    <>
                      Sign In to {userType === 'customer' ? 'Customer' : 'Partner'} Dashboard
                      <Shield className="w-4 h-4" />
                    </>
                  ) : userType === 'partner' ? (
                    <>
                      Continue to Govt ID Verification
                      <FileCheck className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Create Customer Account
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </>
            )}
          </form>

          {/* Mode switch */}
          {!(userType === 'partner' && authMode === 'signup' && partnerStep === 'verification') && (
            <p className="text-center text-sm text-slate-400 mt-6">
              {authMode === 'login' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setPartnerStep('details');
                    }}
                    className="text-violet-400 hover:text-violet-300 font-medium transition-colors ml-1"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setPartnerStep('details');
                    }}
                    className="text-violet-400 hover:text-violet-300 font-medium transition-colors ml-1"
                  >
                    Sign In
                  </button>
                </>
              )}
            </p>
          )}
        </motion.div>

        {/* Security badge footer */}
        <div className="mt-5 text-center flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
          <span>Fixo SafeGuard: End-to-end encrypted · 100% Anti-Fraud & Scam Protected</span>
        </div>
      </div>
    </main>
  );
}

function ShieldCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}
