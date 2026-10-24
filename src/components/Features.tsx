'use client';

import { motion } from 'framer-motion';
import {
  Wrench,
  Zap,
  Paintbrush,
  SprayCan,
  ChefHat,
  Home,
  Sparkles,
  Shield,
  Clock,
  IndianRupee,
} from 'lucide-react';

const services = [
  { icon: Wrench, name: 'Plumbing', desc: 'Leak fixes, installations & more', color: 'from-blue-500 to-cyan-500' },
  { icon: Zap, name: 'Electrical', desc: 'Wiring, repairs & safety checks', color: 'from-amber-500 to-orange-500' },
  { icon: Paintbrush, name: 'Painting', desc: 'Interior & exterior finishing', color: 'from-rose-500 to-pink-500' },
  { icon: SprayCan, name: 'Cleaning', desc: 'Deep cleaning & sanitization', color: 'from-emerald-500 to-green-500' },
  { icon: ChefHat, name: 'Cooking', desc: 'Personal chefs & meal prep', color: 'from-violet-500 to-purple-500' },
  { icon: Home, name: 'Housekeeping', desc: 'Daily maid & home management', color: 'from-teal-500 to-cyan-500' },
];

const highlights = [
  { icon: Shield, title: 'Verified & Background-Checked', desc: 'Every worker undergoes rigorous ID and background verification.' },
  { icon: Clock, title: 'On-Demand in 30 Minutes', desc: 'Need help now? A verified worker arrives at your doorstep fast.' },
  { icon: IndianRupee, title: 'Transparent & Negotiable Pricing', desc: 'See base rates upfront. Propose your budget. Pay what\'s fair.' },
  { icon: Sparkles, title: 'Quality Guaranteed', desc: 'Not satisfied? We\'ll send another worker or refund — no questions.' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="services" className="relative py-28 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-violet-400 tracking-wider uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Everything your home needs,{' '}
            <span className="gradient-text">one&nbsp;tap&nbsp;away.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            From quick fixes to scheduled deep cleans, Fixo connects you with the right professional instantly.
          </p>
        </motion.div>

        {/* Service cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-24"
        >
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card p-6 cursor-pointer group hover:border-white/20 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {service.name}
              </h3>
              <p className="text-sm text-slate-400">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Fixo highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-cyan-400 tracking-wider uppercase mb-4 block">
            Why Fixo
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Built on <span className="gradient-text-accent">trust.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {highlights.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="glass-card p-6 flex gap-5 items-start hover:border-white/20 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
