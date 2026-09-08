const Question = require('../models/Question');
const redisClient = require('../config/redis');
const questionBank = require('../data/questionBank');

/**
 * Strict Level Pagination Limit:
 * - Level 1: Exactly 10 questions
 * - Level 2: Exactly 8 questions
 * - Level 3+: Formula: Math.max(5, 8 - (level - 2))
 */
const getLimitForLevel = (level) => {
  const lvl = parseInt(level, 10) || 1;
  if (lvl === 1) return 10;
  if (lvl === 2) return 8;
  return Math.max(5, 8 - (lvl - 2));
};

exports.getQuestions = async (req, res) => {
  try {
    const {
      language = 'en',
      category,
      level = 1,
      gameMode = 'MCQ'
    } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category query parameter (A, C, D, E, F, G, I, J, O) is required.'
      });
    }

    const targetCount = getLimitForLevel(level);
    const cacheKey = `quiz:${gameMode}:${category.toUpperCase()}:${language.toLowerCase()}:lvl_${level}`;

    if (Question.db.readyState !== 1) {
      const availableQuestions = questionBank.filter((question) => (
        question.category === category.toUpperCase() && question.language === language.toLowerCase()
      ));
      const questions = Array.from({ length: targetCount }, (_, index) => (
        availableQuestions[index % availableQuestions.length]
      ));

      return res.status(200).json({
        success: true,
        source: 'local-fallback',
        level: Number(level),
        count: questions.length,
        questions
      });
    }

    // 1. Check Redis Cache for Zero-Lag Performance
    try {
      if (redisClient.status === 'ready') {
        const cached = await redisClient.get(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          res.setHeader('X-Cache', 'HIT');
          return res.status(200).json({
            success: true,
            source: 'redis-cache',
            level: Number(level),
            count: parsed.length,
            questions: parsed
          });
        }
      }
    } catch (cacheErr) {
      console.warn('[Redis Cache Warning]:', cacheErr.message);
    }

    // 2. Query MongoDB using Aggregation $sample for Randomization
    const matchFilter = {
      category: category.toUpperCase(),
      language: language.toLowerCase(),
      gameMode: gameMode.toUpperCase()
    };

    let questions = await Question.aggregate([
      { $match: matchFilter },
      { $sample: { size: targetCount } },
      {
        $project: {
          _id: 1,
          questionText: 1,
          options: 1,
          correctAnswerIndex: 1,
          language: 1,
          category: 1,
          difficulty: 1,
          gameMode: 1,
          explanation: 1
        }
      }
    ]);

    // 3. Fallback: If DB contains fewer unique records than required for level,
    // pad results from available pool to strictly return the exact required count (10 for L1, 8 for L2)
    if (questions.length > 0 && questions.length < targetCount) {
      const padded = [];
      for (let i = 0; i < targetCount; i++) {
        padded.push(questions[i % questions.length]);
      }
      questions = padded;
    }

    // 4. Cache in Redis with 5-minute TTL
    try {
      if (redisClient.status === 'ready' && questions.length > 0) {
        await redisClient.set(cacheKey, JSON.stringify(questions), 'EX', 300);
      }
    } catch (setErr) {
      console.warn('[Redis Save Warning]:', setErr.message);
    }

    res.setHeader('X-Cache', 'MISS');
    return res.status(200).json({
      success: true,
      source: 'mongodb-aggregation',
      level: Number(level),
      count: questions.length,
      questions
    });
  } catch (error) {
    console.error('[API Controller Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve questions from database.',
      error: error.message
    });
  }
};
