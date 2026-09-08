const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: [true, 'Question text is mandatory'],
      trim: true
    },
    options: {
      type: [String],
      required: [true, 'Options array is mandatory'],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length === 4;
        },
        message: 'Options array must contain exactly 4 choices'
      }
    },
    correctAnswerIndex: {
      type: Number,
      required: [true, 'Correct answer index is mandatory'],
      min: [0, 'Index must be between 0 and 3'],
      max: [3, 'Index must be between 0 and 3']
    },
    language: {
      type: String,
      enum: ['en', 'ta'],
      required: [true, 'Language must be either en or ta'],
      index: true
    },
    category: {
      type: String,
      enum: ['A', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'O'],
      required: [true, 'Category code must be one of A, C, D, E, F, G, I, J, O'],
      index: true
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Hard'
    },
    gameMode: {
      type: String,
      enum: ['MCQ', 'WORD_PUZZLE'],
      default: 'MCQ',
      index: true
    },
    explanation: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

questionSchema.index({ category: 1, language: 1, gameMode: 1, difficulty: 1 });

module.exports = mongoose.model('Question', questionSchema);
