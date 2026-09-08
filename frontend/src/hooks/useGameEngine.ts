"use client";

import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function useGameEngine(initialCategory = 'D', initialLanguage = 'en') {
  const [category, setCategory] = useState(initialCategory);
  const [language, setLanguage] = useState(initialLanguage);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [questionsArray, setQuestionsArray] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  
  // Interaction & Animation states
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Questions from API for the specified level
  const fetchLevelQuestions = useCallback(async (cat, lang, lvl) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/questions?category=${cat}&language=${lang}&level=${lvl}&gameMode=MCQ`
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch level questions');
      }

      setQuestionsArray(data.questions);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(null);
      setIsLoading(false);
    } catch (err) {
      console.error('[Game Engine Fetch Error]:', err);
      setError(err.message || 'Network error fetching questions');
      setIsLoading(false);
    }
  }, []);

  // Initial Level 1 load
  useEffect(() => {
    fetchLevelQuestions(category, language, currentLevel);
  }, [category, language, currentLevel, fetchLevelQuestions]);

  // Handle Answer Selection & Auto-advancement loop
  const handleAnswerSubmit = (selectedIndex) => {
    if (isAnswered || questionsArray.length === 0 || isGameOver) return;

    const currentQuestion = questionsArray[currentQuestionIndex];
    const correct = selectedIndex === currentQuestion.correctAnswerIndex;

    setSelectedOption(selectedIndex);
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 100 * currentLevel);
    }

    // Auto-advance after 1.5 seconds delay (1500ms) to display animations
    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex < questionsArray.length) {
        // Move to next question within the current level
        setCurrentQuestionIndex(nextIndex);
        setSelectedOption(null);
        setIsAnswered(false);
        setIsCorrect(null);
      } else {
        // Reached end of current level questions array -> Elevate Level (L1 -> L2)
        if (currentLevel < 2) {
          const nextLevel = currentLevel + 1;
          setCurrentLevel(nextLevel);
          // fetchLevelQuestions will trigger via useEffect or explicit call
        } else {
          // Completed Level 2 (Game Finished)
          setIsGameOver(true);
        }
      }
    }, 1500);
  };

  // Restart / Reset Game Loop
  const restartGame = () => {
    setCurrentLevel(1);
    setScore(0);
    setIsGameOver(false);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(null);
    fetchLevelQuestions(category, language, 1);
  };

  const switchCategory = (newCat) => {
    setCategory(newCat);
    setCurrentLevel(1);
    setScore(0);
    setIsGameOver(false);
  };

  const toggleLanguage = (newLang) => {
    setLanguage(newLang);
  };

  return {
    category,
    language,
    currentLevel,
    questionsArray,
    currentQuestionIndex,
    currentQuestion: questionsArray[currentQuestionIndex] || null,
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
  };
}
