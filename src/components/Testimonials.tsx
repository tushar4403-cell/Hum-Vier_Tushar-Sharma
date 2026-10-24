'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ananya Gupta',
    role: 'Homeowner, Mumbai',
    text: 'Fixo sent a verified plumber within 20 minutes! The negotiation feature is brilliant — I got excellent service at a price that fit my budget. Never going back to random contacts.',
    rating: 5,
    initials: 'AG',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Vikram Reddy',
    role: 'Business Owner, Bangalore',
    text: 'We use Fixo for all our office maintenance. The quality of workers is consistently high, and the booking process is the smoothest I\'ve ever experienced. A game-changer.',
    rating: 5,
    initials: 'VR',
    gradient: 'from-cyan-400 to-teal-500',
  },
  {
    name: 'Deepika Nair',
    role: 'Working Professional, Delhi',
    text: 'As someone who barely gets time, Fixo is a lifesaver. Scheduled a deep cleaning for the weekend in just 2 minutes. The cleaner was professional, on time, and thorough.',
    rating: 5,
    initials: 'DN',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    name: 'Rahul Joshi',
    role: 'Service Partner, Pune',
    text: 'Joining Fixo as a partner transformed my business. I get steady bookings, set my own rates, and the verification badge builds instant trust with customers. Highly recommend.',
    rating: 5,
    initials: 'RJ',
    gradient: 'from-emerald-400 to-green-500',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-violet-400 tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Loved by <span className="gradient-text">thousands.</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Here&apos;s what our customers and partners are saying.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="glass-card p-7 relative group hover:border-white/20 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-300" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-300 leading-relaxed mb-6 text-[15px]">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-sm font-bold text-white shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 glass-card p-8 rounded-3xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50K+', label: 'Happy Customers' },
              { value: '12K+', label: 'Verified Workers' },
              { value: '4.9', label: 'Average Rating' },
              { value: '18 min', label: 'Avg. Arrival Time' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
