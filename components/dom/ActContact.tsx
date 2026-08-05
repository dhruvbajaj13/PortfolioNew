'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Send,
  Github,
  Linkedin,
  Mail,
  Instagram,
  CheckCircle,
  Copy,
  Check,
} from 'lucide-react';

// Custom X (Twitter) Logo SVG
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom Discord Logo SVG
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export function ActContact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailAddress = 'd4bajaj@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const SOCIAL_CARDS = [
    {
      label: 'GitHub',
      href: 'https://github.com/dhruvbajaj13',
      icon: <Github className="w-7 h-7 text-white group-hover:text-[#00E5FF] transition-colors" />,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/dhruvbajaj13',
      icon: <Linkedin className="w-7 h-7 text-[#0A66C2] group-hover:scale-110 transition-transform" />,
    },
    {
      label: 'X',
      href: 'https://x.com/DhruvBajaj43391',
      icon: <XIcon className="w-6 h-6 text-white group-hover:text-[#00E5FF] transition-colors" />,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/dhruvvv_1307',
      icon: <Instagram className="w-7 h-7 text-[#E4405F] group-hover:scale-110 transition-transform" />,
    },
    {
      label: 'Discord',
      href: 'https://discord.com/invite/8PcMKtM6',
      icon: <DiscordIcon className="w-7 h-7 text-[#5865F2] group-hover:scale-110 transition-transform" />,
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full flex flex-col justify-center px-4 sm:px-8 md:px-16 py-16 md:py-24 overflow-hidden pointer-events-none bg-[#050505]"
    >
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 pointer-events-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight"
          >
            Get in <span className="text-[#00E5FF]">Touch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-display text-base sm:text-xl font-medium text-[#A8A8A8] tracking-wide max-w-2xl mx-auto"
          >
            Open to internships and full-time opportunities.
          </motion.p>
        </div>

        {/* Quantum Terminal Contact Form Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl glass-panel border border-white/10 hover:border-[#00E5FF]/40 p-6 md:p-10 pointer-events-auto shadow-[0_20px_60px_rgba(0,0,0,0.9)] bg-[#080808]"
        >
          {/* Terminal Window Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500/90 shadow-[0_0_8px_#ff5f56]" />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-500/90" />
              <span className="ml-3 font-mono text-xs text-[#A8A8A8] hidden sm:inline-block">
                dhruvbajaj.dev@quantum-terminal:~$
              </span>
            </div>
            <div className="font-mono text-xs text-[#00E5FF] flex items-center gap-2 font-bold tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>ENCRYPTED CHANNEL</span>
            </div>
          </div>

          {/* Form Content */}
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-xs text-[#A8A8A8] uppercase tracking-wider mb-2 font-bold">
                      // YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-[#050505] border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all shadow-inner placeholder:text-[#A8A8A8]/50"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-[#A8A8A8] uppercase tracking-wider mb-2 font-bold">
                      // YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="satoshi@network.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-[#050505] border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all shadow-inner placeholder:text-[#A8A8A8]/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#A8A8A8] uppercase tracking-wider mb-2 font-bold">
                    // TRANSMISSION MESSAGE
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your spatial web project, vision, or architectural requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-[#050505] border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all shadow-inner placeholder:text-[#A8A8A8]/50"
                  />
                </div>

                {/* Send Message Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 rounded-full bg-[#00E5FF] font-sans text-sm font-bold text-black shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-2.5"
                  >
                    <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                    <Send className={`w-4 h-4 ${isSubmitting ? 'animate-bounce' : ''}`} />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF] flex items-center justify-center mx-auto text-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.5)]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl font-bold text-white">
                  MESSAGE RECEIVED
                </h3>
                <p className="font-sans text-[#A8A8A8] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out! Your message has been logged. I will reply within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="font-mono text-xs text-[#00E5FF] underline pt-4 block mx-auto hover:text-white"
                >
                  [ SEND ANOTHER MESSAGE ]
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Quick Email Copy Card */}
        <div className="mt-8 flex items-center justify-center pointer-events-auto">
          <div className="px-6 py-4 rounded-2xl bg-[#080808] border border-white/10 flex items-center gap-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
              <Mail className="w-5 h-5" />
            </div>

            <div className="text-left">
              <span className="font-mono text-[11px] text-[#A8A8A8] block uppercase tracking-wider">
                Email
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-white">
                {emailAddress}
              </span>
            </div>

            <button
              onClick={handleCopyEmail}
              className="ml-4 px-3.5 py-1.5 rounded-lg bg-[#050505] border border-white/10 font-mono text-xs font-semibold text-[#00E5FF] hover:border-[#00E5FF] hover:text-white transition-colors flex items-center gap-1.5"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 5 Social Media Cards Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-4 pointer-events-auto">
          {SOCIAL_CARDS.map((card, idx) => (
            <motion.a
              key={card.label}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden group p-6 rounded-2xl glass-panel border border-white/10 hover:border-[#00E5FF]/60 flex flex-col items-center justify-center gap-3 transition-all duration-300 shadow-xl bg-[#080808] hover:scale-105"
            >
              <div className="relative z-10 flex flex-col items-center gap-2.5">
                {card.icon}
                <span className="font-sans text-sm font-bold text-[#A8A8A8] group-hover:text-white transition-colors">
                  {card.label}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Centered Footer Section */}
        <footer className="mt-16 text-center space-y-1.5 pointer-events-auto border-t border-white/10 pt-8">
          <h4 className="font-display text-lg sm:text-xl font-bold text-white">
            Dhruv Bajaj
          </h4>
          <p className="font-sans text-xs sm:text-sm text-[#A8A8A8] font-light">
            Web Developer • Software Engineer
          </p>
          <p className="font-sans text-[11px] text-[#A8A8A8]/60 pt-2">
            © {new Date().getFullYear()} Dhruv Bajaj. All rights reserved.
          </p>
        </footer>

      </div>
    </section>
  );
}
