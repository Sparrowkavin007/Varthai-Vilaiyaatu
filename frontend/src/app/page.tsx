"use client";

import React from 'react';
import { QuizBoard } from '../components/QuizBoard';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col justify-center py-6">
        <QuizBoard />
      </div>

      <footer className="relative z-10 py-3 text-center text-xs text-slate-600 border-t border-slate-900">
        Economics Dynamic MCQ Engine • Level 1 (10 Qs) ➔ Level 2 (8 Qs) • Next.js & MongoDB
      </footer>
    </main>
  );
}
