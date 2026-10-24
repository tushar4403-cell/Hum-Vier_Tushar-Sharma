'use client';

import { motion } from 'framer-motion';
import { Search, UserCheck, CalendarCheck, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Search & Discover',
    description:
      'Enter your location and browse verified workers by category, ratings, and distance. Find the perfect match in seconds.',
    color: 'from-violet-500 to-purple-600',
    glow: 'shadow-violet-500/20',
  },
  {
    step: '02',
    icon: UserCheck,
    title: 'Negotiate & Choose',
    description:
      'See transparent base rates. Propose your budget, compare options, and pick a worker that fits. You set the terms.',
    color: 'from-cyan-400 to-teal-500',
    glow: 'shadow-cyan-500/20',
  },
  {
    step: '03',
    icon: CalendarCheck,
    title: 'Book & Relax',
    description:
      'Confirm your booking instantly or schedule for later. Track arrival in real-time. Pay securely after the job is done.',
    color: 'from-amber-400 to-orange-500',
    glow: 'shadow-amber-500/20',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/8 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium text-violet-400 tracking-wider uppercase mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Three steps to{' '}
            <span className="gradient-text">getting&nbsp;it&nbsp;fixed.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            No complicated processes. No hidden fees. Just seamless service.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection line - desktop */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-violet-500/30 via-cyan-500/30 to-amber-500/30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative"
            >
              <div className="glass-card p-8 text-center group hover:border-white/20 transition-all duration-500">
                {/* Step number */}
                <div className="text-6xl font-bold text-white/[0.04] absolute top-4 right-6 select-none">
                  {step.step}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 shadow-xl ${step.glow} group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow between steps - mobile */}
              {i < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <ArrowRight className="w-5 h-5 text-slate-600 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
