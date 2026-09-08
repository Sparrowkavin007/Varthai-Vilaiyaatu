"use client";

import { useState, useEffect, useCallback } from 'react';
import { CategoryCode, Language, QuestionItem, QuizState } from '../types/quiz';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function useQuizLogic() {
  const [state, setState] = useState<QuizState>({
    category: null,
    language: 'en',
    level: 1,
    questions: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    selectedOption: null,
    isAnswered: false,
    isCorrect: null,
    isLevelComplete: false,
    isLoading: false,
    error: null,
  });

  // Fetch Questions for the current category, language, and level
  const fetchLevelQuestions = useCallback(async (cat: CategoryCode, lang: Language, lvl: number) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null, isLevelComplete: false }));
    try {
      const res = await fetch(`${API_BASE_URL}/questions?category=${cat}&language=${lang}&level=${lvl}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to load level questions');
      }

      setState((prev) => ({
        ...prev,
        category: cat,
        language: lang,
        level: lvl,
        questions: data.questions,
        currentIndex: 0,
        selectedOption: null,
        isAnswered: false,
        isCorrect: null,
        isLoading: false,
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err.message || 'Network error fetching questions',
      }));
    }
  }, []);

  // Set category and start Level 1
  const selectCategory = (cat: CategoryCode) => {
    setState((prev) => ({
      ...prev,
      category: cat,
      level: 1,
      score: 0,
      streak: 0,
    }));
    fetchLevelQuestions(cat, state.language, 1);
  };

  // Toggle Language between English and Tamil
  const setLanguage = (lang: Language) => {
    setState((prev) => ({ ...prev, language: lang }));
    if (state.category) {
      fetchLevelQuestions(state.category, lang, state.level);
    }
  };

  // Answer Option Selection
  const submitAnswer = (optionIdx: number) => {
    if (state.isAnswered || state.questions.length === 0) return;

    const currentQ = state.questions[state.currentIndex];
    const correct = optionIdx === currentQ.correctAnswerIndex;

    setState((prev) => ({
      ...prev,
      selectedOption: optionIdx,
      isAnswered: true,
      isCorrect: correct,
      score: correct ? prev.score + (100 * prev.level) : prev.score,
      streak: correct ? prev.streak + 1 : 0,
    }));
  };

  // Advance to next question or trigger level completion
  const advanceQuestion = () => {
    if (state.currentIndex + 1 < state.questions.length) {
      setState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedOption: null,
        isAnswered: false,
        isCorrect: null,
      }));
    } else {
      // Current level completed!
      setState((prev) => ({
        ...prev,
        isLevelComplete: true,
      }));
    }
  };

  // Level Up: Automatically elevates player from Level 1 (10 Qs) to Level 2 (8 Qs), Level 3+
  const upgradeToNextLevel = () => {
    if (!state.category) return;
    const nextLevel = state.level + 1;
    fetchLevelQuestions(state.category, state.language, nextLevel);
  };

  // Reset or return to Category Selector
  const resetGame = () => {
    setState({
      category: null,
      language: state.language,
      level: 1,
      questions: [],
      currentIndex: 0,
      score: 0,
      streak: 0,
      selectedOption: null,
      isAnswered: false,
      isCorrect: null,
      isLevelComplete: false,
      isLoading: false,
      error: null,
    });
  };

  return {
    state,
    selectCategory,
    setLanguage,
    submitAnswer,
    advanceQuestion,
    upgradeToNextLevel,
    resetGame,
    refetchLevel: () => {
      if (state.category) fetchLevelQuestions(state.category, state.language, state.level);
    }
  };
}
