'use client';

import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '10+', label: 'Projects Shipped' },
  { value: '3+', label: 'Internships' },
  { value: '1000+', label: 'Problems Solved' },
  { value: '2027', label: 'Graduating' },
];

export function ActAbout() {
  return (
    <section
      id="about"
      className="relative w-full px-4 sm:px-8 md:px-16 py-24 md:py-32 bg-[#050505]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header — same massive style as Experience */}
        <div className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-[0.25em] text-white/40 uppercase mb-4"
          >
            — Who I Am —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none"
          >
            About Me
          </motion.h2>
        </div>

        {/* Two-column layout — same as Experience */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-stretch">

          {/* Left — profile photo */}
          <div className="w-full lg:w-[38%] flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full aspect-square max-w-[280px] lg:max-w-[320px] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] group shadow-2xl"
            >
              <img
                src="/images/dhruv_profile.jpg"
                alt="Dhruv Bajaj"
                className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
            </motion.div>
          </div>

          {/* Right — detail panel (like the Experience detail panel) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10 flex flex-col justify-between gap-8"
          >
            {/* Bio text */}
            <div className="pb-6 border-b border-white/10">
              <h3 className="font-display font-black text-white text-2xl md:text-3xl tracking-tight mb-4">
                Dhruv Bajaj
              </h3>
              <div className="flex flex-col gap-4 text-white/60 text-sm md:text-base leading-relaxed font-light">
                <p>
                  I'm a <span className="text-white font-medium">3rd-year B.Tech student</span> at{' '}
                  <span className="text-white font-medium">NSUT, New Delhi</span>, specialising in Electronics &amp; Communication Engineering with an IoT focus.
                </p>
                <p>
                  I build production-grade web applications and AI systems — from responsive React frontends to scalable REST APIs and autonomous RAG-driven AI agents. I thrive at the intersection of clean engineering and striking user experiences.
                </p>
                <p>
                  Beyond software, I actively compete in algorithmic problem solving and am currently a{' '}
                  <span className="text-white font-medium">LeetCode Knight</span> with a peak rating of 1933.
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                  className="flex flex-col gap-1 p-4 rounded-xl border border-white/8 bg-white/[0.02]"
                >
                  <span className="font-display font-black text-white text-2xl md:text-3xl tracking-tight">
                    {s.value}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
