require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');
const connectDB = require('../config/db');

const masterSeedQuestions = [
  // ==========================================
  // CATEGORY D: MICROECONOMICS (ENGLISH)
  // ==========================================
  {
    questionText: "Under non-homothetic consumer preferences where the income elasticity of demand for good X is strictly negative (η_I < 0), what condition must hold for the Giffen paradox to be observed according to the Slutsky equation decomposition (∂x_i/∂p_i = ∂h_i/∂p_i - x_i * ∂x_i/∂w)?",
    options: [
      "The substitution effect must be positive and strictly dominate the negative income effect.",
      "The negative income effect of a price change must exceed the always negative substitution effect in absolute magnitude.",
      "The cross-price elasticity between good X and the numeraire commodity must strictly equal zero.",
      "The compensating variation must exactly equal the equivalent variation under Hicksian compensated demand."
    ],
    correctAnswerIndex: 1,
    language: "en",
    category: "D",
    difficulty: "Hard",
    gameMode: "MCQ",
    explanation: "For a good to exhibit Giffen behavior, it must be an inferior good whose negative income effect outweighs the substitution effect, forcing the total derivative ∂x_i/∂p_i to become strictly positive."
  },
  {
    questionText: "Let C(w, y) be a twice continuously differentiable, strictly concave, homogeneous of degree 1 cost function with input price vector w. By Shephard's Lemma, evaluating the Hessian matrix ∇_w^2 C(w, y) dictates which fundamental property regarding the conditional factor demand curves?",
    options: [
      "The Hessian matrix is positive semi-definite, dictating upward-sloping factor demand curves.",
      "The own-price partial derivatives ∂^2C/∂w_i^2 ≤ 0, ensuring that conditional factor demand curves are non-increasing with respect to their own prices.",
      "The determinant of the input demand Hessian must be strictly positive for all output levels y > 0.",
      "The elasticity of factor substitution σ must identically equal 1 across all factor intensities."
    ],
    correctAnswerIndex: 1,
    language: "en",
    category: "D",
    difficulty: "Hard",
    gameMode: "MCQ",
    explanation: "Because the cost function C(w, y) is concave in input prices w, its Hessian matrix is negative semi-definite. Hence ∂x_i(w, y)/∂w_i = ∂^2C/∂w_i^2 ≤ 0."
  },

  // ==========================================
  // CATEGORY D: MICROECONOMICS (TAMIL)
  // ==========================================
  {
    questionText: "ஒரு நுகர்வோரின் விருப்பத் தெரிவுகள் சமச்சீரற்றதாக (Non-homothetic) இருக்கும்போது, பண்டம் X-க்கான வருமான நெகிழ்ச்சி எதிர்க்குறியாக (η_I < 0) அமைகிறது. ஸ்லட்ஸ்கி சமன்பாட்டின்படி (∂x_i/∂p_i = ∂h_i/∂p_i - x_i * ∂x_i/∂w), கிஃபன் முரண்பாடு (Giffen Paradox) ஏற்படுவதற்கு கீழ்க்கண்டவற்றுள் எது சரியான நிபந்தனை?",
    options: [
      "பதிலீட்டு விளைவு நேர்மறையாக இருந்து, எதிர்மறை வருமான விளைவை விட மேலோங்கி இருக்க வேண்டும்.",
      "விலை மாற்றத்தின் எதிர்மறை வருமான விளைவு, எப்போதுமே எதிர்மறையாக இருக்கும் பதிலீட்டு விளைவை விட தனி மதிப்பளவில் (Absolute Magnitude) அதிகமாக இருக்க வேண்டும்.",
      "பண்டம் X மற்றும் எண்ணளவை பண்டத்திற்கு இடையேயான குறுக்கு விலை நெகிழ்ச்சி பூஜ்ஜியமாக இருக்க வேண்டும்.",
      "ஈடுசெய்யும் மாறுபாடு (Compensating Variation) சமமான மாறுபாட்டிற்கு (Equivalent Variation) சமமாக இருக்க வேண்டும்."
    ],
    correctAnswerIndex: 1,
    language: "ta",
    category: "D",
    difficulty: "Hard",
    gameMode: "MCQ",
    explanation: "கிஃபன் பண்டம் என்பது ஒரு தரம் குறைந்த பண்டமாகும். இதில் விலை மாற்றத்தின் எதிர்மறை வருமான விளைவு பதிலீட்டு விளைவை விட வலிமையாக இருக்கும்போது தேவைக்கோடு நேர்மறைச் சரிவைப் பெறும்."
  },
  {
    questionText: "w என்ற உள்ளீட்டு விலைகளைக் கொண்ட ஒரு கண்டிப்பான குழிவுடைய (Concave), முதற்படி சமபடித்தான (Homogeneous of degree 1) செலவுச் சார்பு C(w, y) என்க. ஷெப்பர்டின் தேற்றத்தின்படி (Shephard's Lemma), அதன் ஹெஸ்சியன் அணியின் (Hessian Matrix ∇_w^2 C) பண்பு குறித்து எது உண்மையானது?",
    options: [
      "ஹெஸ்சியன் அணி நேர்மறை அரை-வரையறுக்கப்பட்டதாக (Positive Semi-Definite) இருக்கும்.",
      "சொந்த விலை பகுதி வகைக்கெழு ∂^2C/∂w_i^2 ≤ 0 என்பதால் நிபந்தனை காரணி தேவைக்கோடு எப்போதும் கீழ்நோக்கிச் சரியும் (Non-increasing).",
      "எல்லா y > 0 மதிப்பிற்கும் காரணி தேவை ஹெஸ்சியன் அணியின் அணிக்கோவை மதிப்பு strictly நேர்மறையாக இருக்கும்.",
      "காரணி பதிலீட்டு நெகிழ்ச்சி (σ) எல்லா உற்பத்திக் காரணிகளுக்கும் சரியாக 1 ஆக இருக்கும்."
    ],
    correctAnswerIndex: 1,
    language: "ta",
    category: "D",
    difficulty: "Hard",
    gameMode: "MCQ",
    explanation: "உற்பத்திச் செலவுச் சார்பு C(w, y) உள்ளீட்டு விலைகளில் குழிவுத் தன்மை (Concave) கொண்டிருப்பதால், அதன் ஹெஸ்சியன் அணி எதிர்மறை அரை-வரையறுக்கப்பட்டது (Negative Semi-Definite). எனவே ∂x_i/∂w_i ≤ 0 ஆகும்."
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Question.deleteMany({ category: 'D', gameMode: 'MCQ' });
    console.log('[Seed] Cleared existing Category D MCQ records.');

    const docs = await Question.insertMany(masterSeedQuestions);
    console.log(`[Seed] Injected ${docs.length} Post-Graduate Level Bilingual MCQ records successfully!`);
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err.message);
    process.exit(1);
  }
};

seedDB();
