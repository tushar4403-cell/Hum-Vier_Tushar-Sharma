'use client';

import Link from 'next/link';
import { Wrench, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Services: ['Plumbing', 'Electrical', 'Painting', 'Cleaning', 'Cooking', 'Housekeeping'],
  Company: ['About Us', 'Careers', 'Blog', 'Press', 'Partners'],
  Support: ['Help Center', 'Safety', 'Community Guidelines', 'Cancellation Policy'],
  Legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility'],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Fixo
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              Connecting homes with trusted, verified workers for on-demand
              services. Fair pricing, seamless booking.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:hello@fixo.app"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@fixo.app
              </a>
              <a
                href="tel:+911800123456"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                1800-123-4567
              </a>
              <p className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4" />
                Mumbai, India
              </p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Fixo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-slate-500 hover:text-white transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
