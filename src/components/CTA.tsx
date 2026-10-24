'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-600/15 rounded-full blur-[180px]" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] animate-float" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-slate-300">
              Join 50,000+ households
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Ready to get
            <br />
            <span className="gradient-text">things fixed?</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Whether you need an emergency repair or a scheduled service,
            Fixo connects you with the right professional at the right price.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth"
              className="btn-primary text-base flex items-center justify-center gap-2 group !px-8 !py-4"
            >
              Get Started — It&apos;s Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/auth"
              className="btn-secondary text-base flex items-center justify-center gap-2 !px-8 !py-4"
            >
              Become a Partner
            </Link>
          </div>

          {/* Fine print */}
          <p className="mt-6 text-xs text-slate-500">
            No credit card required · Free for customers · Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
