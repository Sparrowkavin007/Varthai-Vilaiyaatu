"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameEngine } from '../hooks/useGameEngine';

export const QuizBoard: React.FC = () => {
  const {
    category,
    language,
    currentLevel,
    questionsArray,
    currentQuestionIndex,
    currentQuestion,
    score,
    isGameOver,
    selectedOption,
    isAnswered,
    isCorrect,
    isLoading,
    error,
    handleAnswerSubmit,
    restartGame,
    switchCategory,
    toggleLanguage
  } = useGameEngine('D', 'en');

  const optionLetters = ['A', 'B', 'C', 'D'];

  // Categories list for switching
  const categoriesList = [
    { code: 'A', label: '(A) General Economics' },
    { code: 'C', label: '(C) Quantitative Methods' },
    { code: 'D', label: '(D) Microeconomics' },
    { code: 'E', label: '(E) Macroeconomics' },
    { code: 'F', label: '(F) International Economics' },
    { code: 'G', label: '(G) Financial Economics' },
    { code: 'I', label: '(I) Health/Education' },
    { code: 'J', label: '(J) Labor Economics' },
    { code: 'O', label: '(O) Development' }
  ];

  if (isLoading && questionsArray.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-white">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-400 text-sm font-semibold">
          {language === 'ta' ? 'வினாக்கள் ஏற்றப்படுகின்றன...' : 'Loading Dynamic Level Questions...'}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-slate-900 border border-rose-800 rounded-3xl text-center text-white">
        <div className="text-3xl mb-2">⚠️</div>
        <h3 className="text-lg font-bold text-rose-400">Connection Notice</h3>
        <p className="text-xs text-slate-400 mt-2">{error}</p>
        <button
          onClick={restartGame}
          className="mt-4 px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  // Game Over View
  if (isGameOver) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center shadow-2xl text-white"
      >
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-2xl font-black">
          {language === 'ta' ? 'அனைத்து நிலைகளும் முடிந்தது!' : 'All Game Levels Completed!'}
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          {language === 'ta' ? `உங்கள் மொத்த மதிப்பெண்: ${score}` : `Final Cumulative Score: ${score}`}
        </p>
        <button
          onClick={restartGame}
          className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all"
        >
          {language === 'ta' ? 'மீண்டும் விளையாடுக' : 'Play Again'}
        </button>
      </motion.div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 font-sans">
      {/* Top Header: Level, Score, Category, Language */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-black tracking-wider uppercase">
            {language === 'ta' ? `நிலை ${currentLevel}` : `LEVEL ${currentLevel}`}
            <span className="ml-1 text-[10px] text-amber-400/70 font-normal">
              ({currentLevel === 1 ? '10 Qs' : '8 Qs'})
            </span>
          </div>

          <div className="text-xs text-slate-400">
            <span className="font-semibold text-white">
              {currentQuestionIndex + 1}
            </span>{' '}
            / {questionsArray.length}
          </div>
        </div>

        {/* Real-Time Score */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              {language === 'ta' ? 'மதிப்பெண்' : 'Score'}
            </span>
            <span className="text-lg font-black text-amber-400 leading-none">
              {score}
            </span>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => toggleLanguage('en')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === 'en' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => toggleLanguage('ta')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === 'ta' ? 'bg-amber-400 text-slate-950' : 'text-slate-400'
              }`}
            >
              தமிழ்
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 to-yellow-500"
          animate={{
            width: `${((currentQuestionIndex + 1) / questionsArray.length) * 100}%`
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion._id || currentQuestionIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl"
        >
          {/* Question Meta */}
          <div className="flex items-center justify-between text-xs mb-3 text-amber-400 font-bold">
            <span>[DIFFICULTY: {currentQuestion.difficulty}]</span>
            <span className="text-slate-400">CAT: {currentQuestion.category}</span>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQuestion.questionText}
          </h2>

          {/* 4 Options Grid */}
          <div className="mt-6 space-y-3.5">
            {currentQuestion.options.map((optionText, idx) => {
              const isSelected = selectedOption === idx;
              const isThisCorrect = idx === currentQuestion.correctAnswerIndex;

              // Styles determination
              let btnClass = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-800';
              let badgeClass = 'bg-slate-700 text-slate-300';

              if (isAnswered) {
                if (isThisCorrect) {
                  // GREEN Background for correct answer
                  btnClass = 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400';
                  badgeClass = 'bg-emerald-700 text-white';
                } else if (isSelected && !isThisCorrect) {
                  // RED Background with shake animation for wrong answer
                  btnClass = 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-500/25 ring-2 ring-rose-400';
                  badgeClass = 'bg-rose-700 text-white';
                } else {
                  btnClass = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-40';
                }
              }

              return (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswerSubmit(idx)}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.01, x: 4 } : {}}
                  whileTap={!isAnswered ? { scale: 0.99 } : {}}
                  animate={isSelected && !isThisCorrect ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-4 ${btnClass}`}
                >
                  <span className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm ${badgeClass}`}>
                    {optionLetters[idx]}
                  </span>
                  <span className="text-sm sm:text-base font-medium leading-normal pt-1">
                    {optionText}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback & Analytical Explanation */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800"
            >
              <div className="text-sm font-bold mb-1 flex items-center gap-2">
                <span className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                  {isCorrect
                    ? '✓ ' + (language === 'ta' ? 'சரியான விடை!' : 'Correct Answer!')
                    : '✕ ' + (language === 'ta' ? 'தவறான விடை!' : 'Incorrect!')}
                </span>
                <span className="text-xs text-slate-500">
                  (Auto-advancing in 1.5s...)
                </span>
              </div>
              {currentQuestion.explanation && (
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  <strong className="text-slate-300">
                    {language === 'ta' ? 'விளக்கம்: ' : 'Analysis: '}
                  </strong>
                  {currentQuestion.explanation}
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Category Quick Switcher Footer */}
      <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <span>Change Category:</span>
        <div className="flex flex-wrap gap-1.5">
          {categoriesList.map((cat) => (
            <button
              key={cat.code}
              onClick={() => switchCategory(cat.code)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                category === cat.code
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-600 text-slate-300'
              }`}
            >
              {cat.code}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
