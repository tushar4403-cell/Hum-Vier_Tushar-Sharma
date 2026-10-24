'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Clock, Zap, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[128px] animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] animate-float-delayed"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-slate-300">
              Trusted by 50,000+ households across India
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
          >
            <span className="text-white">Reliable local</span>
            <br />
            <span className="text-white">services </span>
            <span className="gradient-text">in&nbsp;under</span>
            <br />
            <span className="gradient-text">30&nbsp;minutes.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Connect with verified plumbers, electricians, cleaners, and more.
            Transparent pricing. Seamless booking. Your terms.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/auth"
              className="btn-primary text-base flex items-center justify-center gap-2 group"
            >
              Book a Service
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/auth"
              className="btn-secondary text-base flex items-center justify-center gap-2"
            >
              Join as Service Partner
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-6 md:gap-10"
          >
            {[
              { icon: Shield, label: 'Verified Workers', color: 'text-emerald-400' },
              { icon: Clock, label: 'Under 30 min', color: 'text-cyan-400' },
              { icon: Zap, label: 'Instant Booking', color: 'text-amber-400' },
              { icon: Star, label: '4.9★ Average', color: 'text-violet-400' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-slate-400"
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating preview cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="glass-card p-1 rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-br from-white/[0.04] to-transparent rounded-[20px] p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    name: 'Rajesh K.',
                    skill: 'Expert Plumber',
                    rating: '4.9',
                    eta: '12 min away',
                    color: 'from-blue-500/20 to-cyan-500/20',
                  },
                  {
                    name: 'Priya S.',
                    skill: 'Deep Cleaner',
                    rating: '4.8',
                    eta: '8 min away',
                    color: 'from-violet-500/20 to-purple-500/20',
                  },
                  {
                    name: 'Arjun M.',
                    skill: 'Electrician',
                    rating: '4.7',
                    eta: '15 min away',
                    color: 'from-amber-500/20 to-orange-500/20',
                  },
                ].map((worker, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 + i * 0.15 }}
                    className={`bg-gradient-to-br ${worker.color} backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300 cursor-pointer group`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                        {worker.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {worker.name}
                        </p>
                        <p className="text-xs text-slate-400">{worker.skill}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm text-white font-medium">
                          {worker.rating}
                        </span>
                      </div>
                      <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                        {worker.eta}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
