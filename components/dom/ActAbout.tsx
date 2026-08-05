'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';

export function ActAbout() {
  return (
    <section
      id="about"
      className="relative w-full flex flex-col justify-center px-4 sm:px-8 md:px-16 py-16 md:py-24 overflow-hidden pointer-events-none bg-[#050505]"
    >
      <div className="max-w-6xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 pointer-events-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight"
          >
            About <span className="text-[#00E5FF]">Me</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-display text-base sm:text-xl font-medium text-[#A8A8A8] tracking-wide max-w-2xl mx-auto"
          >
            Passionate Full-Stack & AI Engineer pursuing ECE at NSUT
          </motion.p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
          
          {/* Left Column: Profile Avatar Frame (Perfect Circle) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex justify-center"
          >
            <div className="relative group">
              {/* Outer Cyan Ring Glow */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#00E5FF] via-blue-500 to-[#00E5FF] opacity-40 group-hover:opacity-100 blur-lg transition duration-700 animate-pulse" />

              {/* Circular Avatar Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-[#080808]">
                <img
                  src="/images/dhruv_profile.jpg"
                  alt="Dhruv Bajaj"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Details Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-8 space-y-6"
          >
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 shadow-2xl bg-[#080808] space-y-6">
              
              <div className="space-y-4 font-sans text-sm sm:text-base text-[#A8A8A8] leading-relaxed">
                <p>
                  I am a <strong className="text-white font-medium">3rd-year B.Tech student</strong> at <strong className="text-white font-medium">Netaji Subhas University of Technology (NSUT), New Delhi</strong>, specializing in Electronics & Communication Engineering (ECE) with an IoT focus (Graduating 2027).
                </p>

                <p>
                  I build production-grade web applications and AI systems using <strong className="text-white font-medium">React, Next.js, Node.js, Express, Java, and Python</strong>. My passion lies in creating responsive UI experiences, scalable backend REST APIs, and intelligent RAG-driven AI workflows.
                </p>

                <p>
                  Beyond software development, I actively engage in problem-solving and algorithmic challenges across competitive programming platforms.
                </p>
              </div>

              {/* Details Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-[#00E5FF] shrink-0" />
                  <div>
                    <span className="font-mono text-xs text-[#A8A8A8] block">DEGREE & COLLEGE</span>
                    <span className="font-sans text-sm font-semibold text-white">B.Tech ECE @ NSUT (2027)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#00E5FF] shrink-0" />
                  <div>
                    <span className="font-mono text-xs text-[#A8A8A8] block">LOCATION</span>
                    <span className="font-sans text-sm font-semibold text-white">New Delhi, India</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
