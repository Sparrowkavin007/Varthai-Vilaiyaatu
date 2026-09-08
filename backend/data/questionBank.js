const CATEGORY_FACTS = {
  A: {
    en: ['scarcity', 'opportunity cost', 'production possibility frontier', 'positive economics', 'normative economics', 'marginal analysis', 'incentives', 'economic models', 'comparative advantage', 'market failure', 'public goods', 'externalities'],
    ta: ['பற்றாக்குறை', 'வாய்ப்பு செலவு', 'உற்பத்தி சாத்திய எல்லை', 'நேர்மறை பொருளியல்', 'நெறிமுறை பொருளியல்', 'விளிம்பு பகுப்பாய்வு', 'ஊக்கங்கள்', 'பொருளியல் மாதிரிகள்', 'ஒப்பீட்டு அனுகூலம்', 'சந்தைத் தோல்வி', 'பொதுப் பொருட்கள்', 'புறவிளைவுகள்']
  },
  C: {
    en: ['derivative', 'partial derivative', 'Lagrange multiplier', 'convex set', 'concave function', ' Nash equilibrium', 'expected value', 'variance', 'correlation', 'regression', 'elasticity', 'linear programming'],
    ta: ['வகைக்கெழு', 'பகுதி வகைக்கெழு', 'லாக்ராஞ்ச் பெருக்கி', 'குவிந்த தொகுப்பு', 'குழிவான சார்பு', 'நாஷ் சமநிலை', 'எதிர்பார்ப்பு மதிப்பு', 'மாறுபாடு', 'தொடர்பு', 'பின்னடைவு', 'நெகிழ்ச்சி', 'நேரியல் நிரலாக்கம்']
  },
  D: {
    en: ['utility maximization', 'indifference curve', 'income effect', 'substitution effect', 'Giffen good', 'consumer surplus', 'revealed preference', 'cost minimization', 'economies of scale', 'monopoly pricing', 'Nash equilibrium', 'general equilibrium'],
    ta: ['பயன்பாடு அதிகபட்சமாக்கல்', 'சம பயன்பாட்டு வளைவு', 'வருமான விளைவு', 'பதிலீட்டு விளைவு', 'கிஃபன் பண்டம்', 'நுகர்வோர் உபரி', 'வெளிப்படுத்தப்பட்ட விருப்பம்', 'செலவு குறைத்தல்', 'அளவளாவிய பொருளாதாரம்', 'ஏகபோக விலை நிர்ணயம்', 'நாஷ் சமநிலை', 'பொது சமநிலை']
  },
  E: {
    en: ['GDP', 'inflation', 'fiscal policy', 'monetary policy', 'IS-LM model', 'Phillips curve', 'aggregate demand', 'multiplier effect', 'business cycle', 'unemployment', 'exchange rate', 'public debt'],
    ta: ['மொத்த உள்நாட்டு உற்பத்தி', 'பணவீக்கம்', 'நிதிக் கொள்கை', 'பணவியல் கொள்கை', 'IS-LM மாதிரி', 'பிலிப்ஸ் வளைவு', 'மொத்த தேவை', 'பெருக்கி விளைவு', 'வணிகச் சுழற்சி', 'வேலையின்மை', 'மாற்று விகிதம்', 'பொதுக் கடன்']
  },
  F: {
    en: ['absolute advantage', 'comparative advantage', 'Heckscher-Ohlin model', 'trade tariff', 'import quota', 'balance of payments', 'terms of trade', 'exchange rate', 'trade creation', 'trade diversion', 'gravity model', 'global value chain'],
    ta: ['முழுமையான அனுகூலம்', 'ஒப்பீட்டு அனுகூலம்', 'ஹெக்ஷர்-ஓலின் மாதிரி', 'வர்த்தக வரி', 'இறக்குமதி ஒதுக்கீடு', 'செலுத்தல் சமநிலை', 'வர்த்தக நிபந்தனைகள்', 'மாற்று விகிதம்', 'வர்த்தக உருவாக்கம்', 'வர்த்தக திசைமாற்றம்', 'ஈர்ப்பு மாதிரி', 'உலகளாவிய மதிப்புச் சங்கிலி']
  },
  G: {
    en: ['time value of money', 'present value', 'net present value', 'CAPM', 'risk premium', 'portfolio diversification', 'bond duration', 'yield curve', 'option contract', 'market efficiency', 'systemic risk', 'dividend policy'],
    ta: ['பணத்தின் கால மதிப்பு', 'தற்போதைய மதிப்பு', 'நிகர தற்போதைய மதிப்பு', 'CAPM', 'இடர் பிரீமியம்', 'முதலீட்டு தொகுப்பு பன்முகப்படுத்தல்', 'பத்திர கால அளவு', 'வட்டி வளைவு', 'விருப்ப ஒப்பந்தம்', 'சந்தை திறன்', 'அமைப்புசார் இடர்', 'பங்காதாயக் கொள்கை']
  },
  I: {
    en: ['human capital', 'education externality', 'health insurance', 'moral hazard', 'adverse selection', 'social welfare function', 'Pareto efficiency', 'poverty line', 'income inequality', 'public health', 'social choice', 'welfare theorem'],
    ta: ['மனித மூலதனம்', 'கல்வி புறவிளைவு', 'சுகாதார காப்பீடு', 'தார்மீக இடர்', 'பாதகத் தேர்வு', 'சமூக நலச் சார்பு', 'பரேட்டோ திறன்', 'வறுமைக் கோடு', 'வருமான சமத்துவமின்மை', 'பொது சுகாதாரம்', 'சமூகத் தேர்வு', 'நலத் தேற்றம்']
  },
  J: {
    en: ['labor supply', 'labor demand', 'human capital', 'efficiency wage', 'minimum wage', 'search unemployment', 'matching function', 'wage bargaining', 'fertility choice', 'migration', 'ageing population', 'gender wage gap'],
    ta: ['உழைப்பு வழங்கல்', 'உழைப்பு தேவை', 'மனித மூலதனம்', 'திறன் ஊதியம்', 'குறைந்தபட்ச ஊதியம்', 'தேடல் வேலையின்மை', 'பொருத்தச் சார்பு', 'ஊதியப் பேரம்', 'கருவுறுதல் தேர்வு', 'இடம்பெயர்வு', 'முதியோர் மக்கள் தொகை', 'பாலின ஊதிய இடைவெளி']
  },
  O: {
    en: ['Solow growth model', 'endogenous growth', 'total factor productivity', 'innovation', 'creative destruction', 'technology diffusion', 'learning by doing', 'infrastructure', 'structural transformation', 'inclusive growth', 'demographic dividend', 'sustainable development'],
    ta: ['சோலோ வளர்ச்சி மாதிரி', 'உள்ளார்ந்த வளர்ச்சி', 'மொத்த காரணி உற்பத்தித்திறன்', 'புதுமை', 'படைப்பூக்க அழிவு', 'தொழில்நுட்பப் பரவல்', 'செய்து கற்றல்', 'உள்கட்டமைப்பு', 'கட்டமைப்பு மாற்றம்', 'உள்ளடக்கிய வளர்ச்சி', 'மக்கள்தொகை ஈவுத்தொகை', 'நிலையான வளர்ச்சி']
  }
};

const CATEGORY_CONTEXT = {
  A: ['general economics and teaching', 'பொது பொருளியல் மற்றும் கற்பித்தல்'],
  C: ['mathematical and quantitative methods', 'கணித மற்றும் அளவுசார் முறைகள்'],
  D: ['microeconomics', 'நுண்ணியல் பொருளியல்'],
  E: ['macroeconomics and monetary economics', 'பேரியல் மற்றும் பணவியல் பொருளியல்'],
  F: ['international economics', 'பன்னாட்டு பொருளியல்'],
  G: ['financial economics', 'நிதியியல் பொருளியல்'],
  I: ['health, education, and welfare economics', 'சுகாதாரம், கல்வி மற்றும் நலப் பொருளியல்'],
  J: ['labor and demographic economics', 'உழைப்பு மற்றும் மக்கள்தொகை பொருளியல்'],
  O: ['economic development and technology change', 'பொருளாதார வளர்ச்சி மற்றும் தொழில்நுட்ப மாற்றம்']
};

const QUESTION_FORMS = [
  ['Which concept is most directly associated with this topic?', 'இந்த தலைப்புடன் நேரடியாக தொடர்புடைய கருத்து எது?'],
  ['Which term best describes this economic idea?', 'இந்த பொருளியல் கருத்தை சிறப்பாகக் குறிக்கும் சொல் எது?'],
  ['What should a student identify when studying this topic?', 'இந்த தலைப்பைப் படிக்கும்போது மாணவர் எதை அடையாளம் காண வேண்டும்?'],
  ['Which concept belongs to this area of economics?', 'இந்த பொருளியல் பிரிவைச் சேர்ந்த கருத்து எது?'],
  ['What is the correct analytical term for this subject?', 'இந்த பொருளுக்கு சரியான பகுப்பாய்வு சொல் எது?'],
  ['Which idea would appear in an economics examination on this topic?', 'இந்த தலைப்புக்கான பொருளியல் தேர்வில் தோன்றும் கருத்து எது?'],
  ['What is the standard name for this economic principle?', 'இந்த பொருளியல் கோட்பாட்டின் நிலையான பெயர் என்ன?'],
  ['Which term should complete the study note for this topic?', 'இந்த தலைப்புக்கான படிப்பு குறிப்பை நிறைவு செய்யும் சொல் எது?'],
  ['Which concept is the best match for the topic shown?', 'கொடுக்கப்பட்ட தலைப்புக்குப் பொருத்தமான கருத்து எது?'],
  ['What is the most relevant concept in this category?', 'இந்த பிரிவில் மிகவும் தொடர்புடைய கருத்து எது?'],
  ['Which answer correctly classifies this economic topic?', 'இந்த பொருளியல் தலைப்பை சரியாக வகைப்படுத்தும் பதில் எது?'],
  ['What is the key term associated with this area?', 'இந்த பிரிவுடன் தொடர்புடைய முக்கிய சொல் எது?']
];

const DISTRACTORS = {
  en: ['market equilibrium', 'consumer choice', 'economic growth'],
  ta: ['சந்தை சமநிலை', 'நுகர்வோர் தேர்வு', 'பொருளாதார வளர்ச்சி']
};

const buildQuestionBank = () => Object.entries(CATEGORY_FACTS).flatMap(([category, facts]) => facts.en.flatMap((answerEn, index) => {
  const answerTa = facts.ta[index];
  const form = QUESTION_FORMS[index];
  const languageVariants = [
    { language: 'en', questionText: `In ${CATEGORY_CONTEXT[category][0]}, ${form[0].toLowerCase()}`, answer: answerEn, distractors: DISTRACTORS.en },
    { language: 'ta', questionText: `${CATEGORY_CONTEXT[category][1]} பிரிவில், ${form[1]}`, answer: answerTa, distractors: DISTRACTORS.ta }
  ];

  return languageVariants.map(({ language, questionText, answer, distractors }) => {
    const correctAnswerIndex = index % 4;
    const options = [...distractors.slice(0, 3)];
    options.splice(correctAnswerIndex, 0, answer);
    return {
      _id: `local-${category}-${language}-${index + 1}`,
      questionText,
      options,
      correctAnswerIndex,
      language,
      category,
      difficulty: index < 4 ? 'Easy' : index < 8 ? 'Medium' : 'Hard',
      gameMode: 'MCQ',
      explanation: language === 'en'
        ? `${answer} is the key concept associated with this economics topic.`
        : `${answer} என்பது இந்த பொருளியல் தலைப்புடன் தொடர்புடைய முக்கிய கருத்தாகும்.`
    };
  });
}));

module.exports = buildQuestionBank();
