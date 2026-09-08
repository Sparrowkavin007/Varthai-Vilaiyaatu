"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CategoryCode, CategoryInfo, Language } from '../types/quiz';

const CATEGORIES: CategoryInfo[] = [
  {
    code: 'A',
    titleEn: '(A) General Economics & Teaching',
    titleTa: '(A) பொது பொருளியல் மற்றும் கற்பித்தல்',
    descEn: 'Methodology, schools of thought, and economic education.',
    descTa: 'பொருளியல் முறையியல், கோட்பாடுகள் மற்றும் கல்வி.',
    icon: '📚',
    color: 'from-blue-600 to-indigo-700'
  },
  {
    code: 'C',
    titleEn: '(C) Mathematical & Quantitative Methods',
    titleTa: '(C) கணித மற்றும் அளவுசார் முறைகள்',
    descEn: 'Econometrics, game theory, and optimization models.',
    descTa: 'பொருளாதார அளவையியல் மற்றும் விளையாட்டு கோட்பாடு.',
    icon: '📐',
    color: 'from-cyan-600 to-teal-700'
  },
  {
    code: 'D',
    titleEn: '(D) Microeconomics',
    titleTa: '(D) நுண்ணியல் பொருளியல்',
    descEn: 'Consumer theory, duality, market structures & general equilibrium.',
    descTa: 'நுகர்வோர் கோட்பாடு, இருமைத்தன்மை மற்றும் பொது சமநிலை.',
    icon: '🔬',
    color: 'from-emerald-600 to-green-700'
  },
  {
    code: 'E',
    titleEn: '(E) Macroeconomics & Monetary Economics',
    titleTa: '(E) பேரியல் பொருளியல் மற்றும் பணவியல்',
    descEn: 'DSGE models, monetary transmission, and fiscal policy dynamics.',
    descTa: 'DSGE மாதிரிகள், பணவியல் கொள்கை மற்றும் நிதிக் கொள்கை.',
    icon: '🏛️',
    color: 'from-amber-600 to-orange-700'
  },
  {
    code: 'F',
    titleEn: '(F) International Economics',
    titleTa: '(F) பன்னாட்டு பொருளியல்',
    descEn: 'Heckscher-Ohlin, gravity models, and exchange rate regimes.',
    descTa: 'ஹெக்ஷர்-ஓலின் மாதிரி, வர்த்தகம் மற்றும் அந்நியச் செலாவணி.',
    icon: '🌐',
    color: 'from-purple-600 to-violet-700'
  },
  {
    code: 'G',
    titleEn: '(G) Financial Economics',
    titleTa: '(G) நிதியியல் பொருளியல்',
    descEn: 'Asset pricing, CAPM, derivatives, and systemic risk.',
    descTa: 'சொத்து மதிப்பீடு, மூலதனச் சந்தை மற்றும் இடர் மேலாண்மை.',
    icon: '📈',
    color: 'from-rose-600 to-pink-700'
  },
  {
    code: 'I',
    titleEn: '(I) Health, Education, & Welfare',
    titleTa: '(I) சுகாதாரம், கல்வி மற்றும் நல்வாழ்வு',
    descEn: 'Human capital formation, social choice, and welfare theorems.',
    descTa: 'மனித மூலதனம், சமூகத் தெரிவுக் கோட்பாடு மற்றும் நலம்.',
    icon: '🏥',
    color: 'from-red-600 to-rose-800'
  },
  {
    code: 'J',
    titleEn: '(J) Labor & Demographic Economics',
    titleTa: '(J) உழைப்பு மற்றும் மக்கள்தொகை பொருளியல்',
    descEn: 'Search & matching, wage dispersion, and fertility models.',
    descTa: 'வேலைவாய்ப்பு மாதிரி, ஊதிய முரண்பாடுகள் மற்றும் மக்கள் தொகை.',
    icon: '👥',
    color: 'from-fuchsia-600 to-purple-800'
  },
  {
    code: 'O',
    titleEn: '(O) Economic Development & Tech Change',
    titleTa: '(O) பொருளாதார வளர்ச்சி & தொழில்நுட்ப மாற்றம்',
    descEn: 'Endogenous growth, innovation diffusion, and structural transformation.',
    descTa: 'உள்ளீடான வளர்ச்சி, கண்டுபிடிப்புகள் மற்றும் கட்டமைப்பு மாற்றம்.',
    icon: '🚀',
    color: 'from-indigo-600 to-cyan-800'
  }
];

interface Props {
  language: Language;
  onSelectCategory: (code: CategoryCode) => void;
  onToggleLanguage: (lang: Language) => void;
}

export const CategorySelector: React.FC<Props> = ({ language, onSelectCategory, onToggleLanguage }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header & Language Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-black shadow-lg shadow-amber-500/20">
              📊
            </span>
            {language === 'ta' ? 'பொருளியல் வினாடி வினா' : 'Economics MCQ Arena'}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-1">
            {language === 'ta'
              ? 'முதுகலை மற்றும் போட்டித் தேர்வுக்கான கடினமான வினாக்கள்'
              : 'Post-Graduate & Competitive Exam Analytical MCQ Engine'}
          </p>
        </div>

        {/* Bilingual Switcher */}
        <div className="flex items-center bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700 shadow-inner">
          <button
            onClick={() => onToggleLanguage('en')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              language === 'en'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onToggleLanguage('ta')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              language === 'ta'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            தமிழ்
          </button>
        </div>
      </div>

      {/* 9 Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCategory(cat.code)}
            className="group cursor-pointer relative overflow-hidden rounded-3xl p-6 bg-slate-900/70 border border-slate-800 hover:border-slate-600 transition-all shadow-xl hover:shadow-2xl hover:shadow-cyan-950/20 backdrop-blur-md"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-30 transition-opacity`} />

            <div className="flex items-start justify-between">
              <span className="text-4xl p-3 bg-slate-800/80 rounded-2xl border border-slate-700/50 shadow-md group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-800 text-amber-400 border border-slate-700 tracking-wider">
                CODE: {cat.code}
              </span>
            </div>

            <h3 className="mt-5 text-xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
              {language === 'ta' ? cat.titleTa : cat.titleEn}
            </h3>

            <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2">
              {language === 'ta' ? cat.descTa : cat.descEn}
            </p>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
              <span>{language === 'ta' ? 'தொடங்கு (Level 1)' : 'Start (Level 1)'}</span>
              <span className="text-amber-400 group-hover:translate-x-1 transition-transform">
                ➔
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
