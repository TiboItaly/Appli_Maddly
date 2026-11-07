// ===== script.js =====
// The BRAIN of the app: Oreo the homework coach.
// Now multilingual: Oreo speaks 6 languages and adapts to your age!
// Now with an optional AI mode: with a Mistral API key, Oreo really
// accompanies the student's thinking about THEIR question (never the answer).

// ---- AI MODE (optional) ----
// To activate: paste a key from https://console.mistral.ai between the quotes.
// WITHOUT a key, the app works exactly as before (scripted coaching).
var MISTRAL_API_KEY = "";
var MISTRAL_MODEL = "mistral-small-latest";

// ---- 0. THE LANGUAGES ----
// Maddly's idea: before using the app, you choose your language and your age.
// Every sentence Oreo says lives in the L10N dictionary below.
// Programmers call this "internationalization" (i18n for short).

var L10N = {
  en: {
    names: { maths: "Maths", english: "English", italian: "Italiano", spanish: "Español", french: "Français", german: "Deutsch", chinese: "中文", reading: "Reading", science: "Science", history: "History / Geography", other: "Something else" },
    ui: {
      tagline: "Oreo guides you... but YOU find the answer!",
      welcomeTitle: "Welcome! Before we start, tell Oreo two things.",
      chooseLang: "1. In which language should Oreo talk to you?",
      chooseAge: "2. How old are you?",
      start: "Start!",
      changeSetup: "🖊 Change language or age",
      back: "🔙 Back",
      yourQuestion: "Your question was: ",
      aiMode: "✨ AI mode: Oreo really thinks about YOUR question",
      step1Title: "Step 1: What subject is your homework?",
      step2Title: "Step 2: Your question or exercise",
      step3Title: "Step 3: Coaching with Oreo",
      step2Tip: "Explain it in your own words. Writing it down is already the beginning of understanding!",
      questionPh: "Type your question here...",
      chatPh: "Write your answer to Oreo here...",
      confTip: "How good do you feel in this subject? Oreo adapts to you!",
      confHigh: "😎 Very good",
      confOkay: "🙂 Okay",
      confLow: "😰 I find it hard",
      cameraBtn: "📷 Take a picture with the camera",
      snap: "📷 Snap!",
      snapWork: "📷 Snap my work!",
      startCoach: "Start coaching with Oreo!",
      send: "💬 Send to Oreo",
      hintBtn: "💡 Hint (3 max)",
      moreBtn: "離 More helpful things to do",
      workBtn: "📷 Show my work to Oreo",
      judgeCorrect: "✅ It's correct!",
      judgeCheck: "樂 Not sure, let me check",
      judgeWrong: "😕 I got it wrong",
      restart: "Help me with another question",
      coachMode: "Coach mode: {subject}. I believe in you!",
      photoAlt: "Your homework picture",
      camErr: "I could not open the camera here. You can still type your question!",
      camNo: "This browser cannot use the camera. You can still type your question!",
      writeFirst: "Write something first! Even a few words count.",
      tellMore: "Tell me a bit more! Even two or three words more help me coach you better.",
      dontKnow: "Not knowing is completely normal, it is the start of learning! Press the Hint button if you want a clue, or try answering with what you THINK it could be.",
      finalAnswer: "You worked through my whole method, well done so far! Now write your FINAL answer here, and I will help you check it like a champion.",
      selfCheck: "Good! Now check it before we celebrate. Do this: 1) Read the question one more time. 2) Check your work line by line. 3) In maths, try the opposite operation; in languages, read it out loud. When you have checked, tap the button that matches what you found below.",
      thanksMsg: "You are very welcome! Helping YOU find answers is my favorite job. 礪",
      hateMsg: "It is okay to hate a subject sometimes, really. The good news: hating it does not stop you from being good at it, one small step at a time. Let's take the smallest step possible together!",
      hardMsg: "I hear you. Every student finds things hard sometimes, that is how brains grow! Try the Hint button, and after 3 hints I have a list of great strategies for you.",
      foundMsg: "Fantastic! When you are sure, tap <strong>It's correct!</strong> so we can celebrate together!",
      listening: "I am listening! Remember: I never give answers, but I never let go of your hand either. Tell me which part you are working on right now.",
      photoThanks: "Thank you for showing me your work! I cannot read every detail of a picture yet, but I can see that you are writing it down step by step, and that is exactly the right method. Keep going!",
      wellDoneMsg: "Well done! You checked your answer like a champion, and you found it yourself. I am proud of you! You can keep talking to me below if you want.",
      wrongMsg: "That is completely fine: wrong answers are how brains grow stronger! The fact that you found it yourself is already excellent work. Let's try again together, from the TRY step.",
      checkMaths: "Let's use the OPPOSITE OPERATION trick! Adding and subtracting are opposites: if you think you added, subtract to check. Multiplying and dividing are opposites: if you think you multiplied, divide to check. Example: you found 7 × 8 = 56? Then check with 56 ÷ 8. If it gives 7, your answer is correct! Try it and tell me what you find.",
      checkReading: "Let's check your reading! Retell the text piece by piece in your own words. If one piece is missing or fuzzy, read ONLY that piece again, out loud and slowly. Then tap <strong>It's correct!</strong> or <strong>I got it wrong</strong> below.",
      checkGeneric: "Good instinct: checking is exactly what strong students do! Here is my checklist: 1) Read the question again and compare it word by word with your answer. 2) Redo the difficult line slowly. 3) Compare with a similar example in your notes. Then tap <strong>It's correct!</strong> or <strong>I got it wrong</strong> below.",
      celebration: "🎉 WELL DONE! You found the answer YOURSELF. 🎉<br>That is called learning. See you at the next homework!",
      hintLabel: "Hint",
      ofLabel: "of 3:",
      noMoreHints: "<strong>No more hints! Time to change strategy. Here is what great students do:</strong>",
      stepLabel: "Step"
    },
    kw: {
      dontknow: ["don't know", "dont know", "no idea"],
      thanks: ["thank"],
      hate: ["hate"],
      hard: ["hard", "difficult", "stuck"],
      found: ["found", "solved", "got it"]
    },
    stepTitles: ["UNDERSTAND", "PLAN", "TRY", "CHECK"],
    greetings: {
      high: "Hello! I am Oreo, your coach. You feel strong in {subject}, so today I will help you be precise and check your work like a champion!",
      low: "Hello! I am Oreo, your coach. I know {subject} can feel hard sometimes. Good news: my method works even then, and I stay with you at every step. One small step at a time!",
      mid: "Hello! I am Oreo, your coach. We will go step by step together, and you will see: it is easier than it looks!"
    },
    ageNotes: {
      young: "You are still little, so I will use very simple words and we will take tiny steps together!",
      mid: "We will go at exactly the right speed for you!",
      teen: "We will work like a real study session: focused, efficient, no baby talk!"
    },
    encouragements: ["Great thinking!", "Interesting! I like the way you see it.", "Good job, keep going!", "Nice step forward! You are doing exactly what good students do."],
    encouragementsAge: { young: ["Well done!", "Great idea!", "Keep going, you are doing great!", "One more little step!"], teen: ["Sharp thinking!", "Solid reasoning, keep it up!", "Excellent analysis, carry on!", "Rigorous approach, exactly the right method!"] },
    helpful: [
      "Try an easier, similar exercise from your book. Solve it, then come back to this one.",
      "Ask a friend to explain HOW they would start, not the answer.",
      "Ask a parent to read the question with you: sometimes saying it out loud is enough.",
      "Work on another part of your homework first, then come back with fresh eyes.",
      "Take a 5-minute break: water, stretch, breathe. Your brain solves problems even while you rest!",
      "Write down exactly what you do not understand, and bring that precise question to your teacher. This is what excellent students do."
    ],
    subjects: {
      maths: {
        steps: [
          "Read the exercise twice. Then tell me: what exactly are you asked to find, and which numbers or facts do you have?",
          "Which operation could help: adding, subtracting, multiplying, dividing? Tell me which one you would pick and why.",
          "Write your calculation here, step by step. You can also tap 'Show my work to Oreo' and photograph your paper!",
          "Look at your result: is it logical? (A dog cannot weigh 900 kg!) In maths, the best trick is the opposite operation: try it and tell me what you found."
        ],
        hints: [
          "Read the question again and circle the key words. What exactly are you asked to find?",
          "Look for clue words: 'total' often means add, 'left' means subtract, 'each' means multiply or divide. Which operation fits your problem?",
          "Cut the problem into small pieces and solve the easiest piece first. Small wins unlock big ones!"
        ]
      },
      reading: {
        steps: [
          "First, a secret: lots of students find reading hard, and every one of them learned to read anyway. Look at your text and tell me: how long is it, and what must you do after reading?",
          "We never read a big text all at once: we cut it into small bites, like a cake! One paragraph at a time. Put your finger or a pencil under the line to help your eyes follow. Tell me which small piece you will start with.",
          "Read your first small piece slowly, out loud if you can. Then tell me in ONE sentence what happened in it. Just one piece, that is the whole mission!",
          "Now tell me the whole text in your own words, piece by piece, like a movie summary. If one piece is still fuzzy, read ONLY that piece again. Which piece was the hardest?"
        ],
        hints: [
          "Cut the text into small pieces and celebrate each piece you finish. Small wins make reading lighter!",
          "Use your finger or a pencil under the line: your eyes follow better and you do not lose your place.",
          "If a word blocks you: skip it, read the rest of the sentence, and guess like a detective. Then come back to the word."
        ]
      },
      science: {
        steps: [
          "What is the question really asking? Tell me in your own words.",
          "What do you already know about this topic? You can also draw a little sketch on paper.",
          "Explain your idea here in your own words, like you would to a friend. You can also photograph your sketch!",
          "Find one detail in your book or notes that confirms your idea. Tell me if it confirms it or not."
        ],
        hints: [
          "What is the question really asking? Underline the science words.",
          "What do you already know about this topic? Try drawing or sketching it.",
          "Explain your idea in your own words, like to a friend. Then find one detail in your book that confirms it."
        ]
      },
      history: {
        steps: [
          "What is asked: a date, a reason, a person, a place? Tell me what the question wants from you.",
          "In what order did things happen? Build a mini timeline and tell me what comes first.",
          "Write your answer in your own words, with an example or proof. You can also photograph your timeline!",
          "Did you use facts you learned, not just your opinion? Tell me your strongest fact."
        ],
        hints: [
          "What is asked: a date, a reason, a person, a place? Underline the key words of the question.",
          "Build a mini timeline: what happened first, next, after?",
          "Give a fact you learned as proof. Facts, not just opinion!"
        ]
      },
      other: {
        steps: [
          "Read the instruction slowly. Tell me: what exactly must you do, and what must the final result look like?",
          "Cut the big task into small steps. What is the first small step you can do right now?",
          "Do that first step completely here. You can also photograph your work with 'Show my work to Oreo'!",
          "Look at your work with fresh eyes: did you follow all the instructions? Tell me what you would improve."
        ],
        hints: [
          "Read the instruction slowly. What exactly must you do?",
          "Cut the big task into small steps. What is the first small step you can do right now?",
          "Do the easiest part first. A small success gives you energy for the rest!"
        ]
      }
    },
    langT: {
      steps: [
        "What kind of exercise is it: reading, writing, grammar, vocabulary? Tell me the exact instruction.",
        "Which rule or example from your {name} notebook looks similar? Tell me which one you think applies.",
        "Write your answer or first draft here, in {name}. You can also photograph your paper with 'Show my work to Oreo'!",
        "Read your sentence out loud: does it sound natural? Check spelling, verb endings and accents. Tell me what you corrected."
      ],
      hints: [
        "What kind of exercise is it? The instruction words tell you.",
        "Look at your {name} notebook: find one example that looks similar.",
        "Read your sentence out loud: does it sound natural? Your ears catch mistakes your eyes miss!"
      ]
    }
  },

  fr: {
    names: { maths: "Maths", english: "Anglais", italian: "Italien", spanish: "Espagnol", french: "Français", german: "Allemand", chinese: "Chinois", reading: "Lecture", science: "Sciences", history: "Histoire / Géographie", other: "Autre chose" },
    ui: {
      tagline: "Oreo te guide... mais c'est TOI qui trouves la réponse !",
      welcomeTitle: "Bienvenue ! Avant de commencer, dis deux choses à Oreo.",
      chooseLang: "1. Dans quelle langue Oreo doit-il te parler ?",
      chooseAge: "2. Quel &acirc;ge as-tu ?",
      start: "Commencer !",
      changeSetup: "🖊 Changer la langue ou l'&acirc;ge",
      back: "🔙 Retour",
      yourQuestion: "Ta question était : ",
      aiMode: "✨ Mode IA : Oreo réfléchit vraiment à TA question",
      step1Title: "Étape 1 : Quel est le sujet de tes devoirs ?",
      step2Title: "Étape 2 : Ta question ou ton exercice",
      step3Title: "Étape 3 : Coaching avec Oreo",
      step2Tip: "Explique avec tes propres mots. L'écrire, c'est déjà commencer à comprendre !",
      questionPh: "Écris ta question ici...",
      chatPh: "Écris ta réponse à Oreo ici...",
      confTip: "Comment te sens-tu dans ce sujet ? Oreo s'adapte à toi !",
      confHigh: "😎 Très bien",
      confOkay: "🙂 Comme ci comme ça",
      confLow: "😰 Je trouve ça difficile",
      cameraBtn: "📷 Prendre une photo avec la caméra",
      snap: "📷 Snap !",
      snapWork: "📷 Photographier mon travail !",
      startCoach: "Commencer le coaching avec Oreo !",
      send: "💬 Envoyer à Oreo",
      hintBtn: "💡 Indice (3 max)",
      moreBtn: "離 D'autres bonnes idées",
      workBtn: "📷 Montrer mon travail à Oreo",
      judgeCorrect: "✅ C'est correct !",
      judgeCheck: "樂 Pas s&ucirc;r, je vérifie",
      judgeWrong: "😕 Je me suis trompé(e)",
      restart: "Aide-moi avec une autre question",
      coachMode: "Mode coaching : {subject}. Je crois en toi !",
      photoAlt: "La photo de tes devoirs",
      camErr: "Je n'ai pas pu ouvrir la caméra ici. Tu peux quand même écrire ta question !",
      camNo: "Ce navigateur ne peut pas utiliser la caméra. Tu peux quand même écrire ta question !",
      writeFirst: "Écris quelque chose d'abord ! Même quelques mots, ça compte.",
      tellMore: "Dis-m'en un peu plus ! Deux ou trois mots de plus m'aident mieux à t'accompagner.",
      dontKnow: "Ne pas savoir, c'est complètement normal : c'est le début de l'apprentissage ! Appuie sur le bouton Indice si tu veux un indice, ou essaie de répondre avec ce que tu PENSES que ce pourrait être.",
      finalAnswer: "Tu as suivi toute ma méthode, bravo pour l'instant ! Maintenant écris ta réponse FINALE ici, et je t'aiderai à la vérifier comme un champion.",
      selfCheck: "Bien ! Maintenant vérifie avant de fêter. Fais ceci : 1) Relis la question une fois de plus. 2) Vérifie ton travail ligne par ligne. 3) En maths, essaie l'opération inverse ; en langues, lis à voix haute. Quand tu as vérifié, appuie sur le bouton qui correspond à ce que tu as trouvé.",
      thanksMsg: "Avec plaisir ! T'aider à trouver les réponses, c'est mon métier préféré. 礪",
      hateMsg: "C'est normal de détester une matière parfois, vraiment. La bonne nouvelle : la détester ne t'empêche pas d'être bon(ne) dedans, une petite étape à la fois. Prenons ensemble la plus petite étape possible !",
      hardMsg: "Je t'entends. Tous les élèves trouvent certaines choses difficiles : c'est comme ça que le cerveau grandit ! Essaie le bouton Indice, et après 3 indices j'ai une liste de bonnes stratégies pour toi.",
      foundMsg: "Fantastique ! Quand tu es s&ucirc;r(e), appuie sur <strong>C'est correct !</strong> pour fêter ça ensemble !",
      listening: "J'écoute ! Souviens-toi : je ne donne jamais les réponses, mais je ne te l&acirc;che pas la main non plus. Dis-moi sur quelle partie tu travailles en ce moment.",
      photoThanks: "Merci de me montrer ton travail ! Je ne peux pas encore lire tous les détails d'une photo, mais je vois que tu écris étape par étape, et c'est exactement la bonne méthode. Continue !",
      wellDoneMsg: "Bravo ! Tu as vérifié ta réponse comme un champion, et tu l'as trouvée toi-même. Je suis fier de toi ! Tu peux continuer à me parler ci-dessous si tu veux.",
      wrongMsg: "C'est complètement normal : les erreurs rendent le cerveau plus fort ! Le fait que tu aies trouvé toi-même, c'est déjà excellent. Réessayons ensemble, à l'étape ESSAIE.",
      checkMaths: "Utilisons l'astuce de l'OPÉRATION INVERSE ! Additionner et soustraire sont des inverses : si tu crois avoir additionné, soustrais pour vérifier. Multiplier et diviser sont des inverses : si tu crois avoir multiplié, divise pour vérifier. Exemple : tu as trouvé 7 × 8 = 56 ? Alors vérifie avec 56 ÷ 8. Si ça donne 7, ta réponse est correcte ! Essaie et dis-moi ce que tu trouves.",
      checkReading: "Vérifions ta lecture ! Raconte le texte morceau par morceau avec tes mots. Si un morceau manque ou reste flou, relis SEULEMENT ce morceau, à voix haute et lentement. Puis appuie sur <strong>C'est correct !</strong> ou <strong>Je me suis trompé(e)</strong> ci-dessous.",
      checkGeneric: "Bon réflexe : vérifier, c'est exactement ce que font les bons élèves ! Voici ma liste de contrôle : 1) Relis la question et compare-la mot par mot à ta réponse. 2) Refais la ligne difficile lentement. 3) Compare avec un exemple similaire dans tes notes. Puis appuie sur <strong>C'est correct !</strong> ou <strong>Je me suis trompé(e)</strong> ci-dessous.",
      celebration: "🎉 BRAVO ! Tu as trouvé la réponse TOI-M&Ecirc;ME. 🎉<br>&Ccedil;a s'appelle apprendre. &Agrave; la prochaine question !",
      hintLabel: "Indice",
      ofLabel: "sur 3 :",
      noMoreHints: "<strong>Plus d'indices ! Il est temps de changer de stratégie. Voici ce que font les bons élèves :</strong>",
      stepLabel: "Étape"
    },
    kw: {
      dontknow: ["sais pas", "je ne sais", "aucune idée", "aucune idee"],
      thanks: ["merci"],
      hate: ["déteste", "deteste", "hais"],
      hard: ["dur", "difficile", "bloqu"],
      found: ["trouvé", "trouve", "résolu", "resolu", "y suis arriv"]
    },
    stepTitles: ["COMPRENDS", "PRÉPARE", "ESSAIE", "VÉRIFIE"],
    greetings: {
      high: "Bonjour ! Je suis Oreo, ton coach. Tu te sens fort(e) en {subject}, alors aujourd'hui je vais t'aider à être précis(e) et à vérifier ton travail comme un champion !",
      low: "Bonjour ! Je suis Oreo, ton coach. Je sais que {subject} peut sembler difficile parfois. Bonne nouvelle : ma méthode marche même dans ces moments-là, et je reste avec toi à chaque étape. Une petite étape à la fois !",
      mid: "Bonjour ! Je suis Oreo, ton coach. Nous allons avancer étape par étape ensemble, et tu verras : c'est plus facile que ça en a l'air !"
    },
    ageNotes: {
      young: "Tu es encore petit(e), alors je vais utiliser des mots très simples et nous ferons des mini-étapes ensemble !",
      mid: "Nous irons à exactement la bonne vitesse pour toi !",
      teen: "Nous travaillerons comme une vraie séance de travail : concentré(e), efficace, sans parler bébé !"
    },
    encouragements: ["Super réflexion !", "Intéressant ! J'aime ta façon de voir les choses.", "Bon travail, continue !", "Beau pas en avant ! Tu fais exactement comme les bons élèves."],
    encouragementsAge: { young: ["Bravo, tu es fort !", "Super idée !", "Continue, tu y arrives !", "Encore un petit pas !"], teen: ["Belle analyse !", "Argument solide, continue sur cette voie !", "Raisonnement pertinent, poursuis !", "Démarche rigoureuse, c'est exactement la bonne méthode !"] },
    helpful: [
      "Essaie un exercice similaire plus facile de ton livre. Résous-le, puis reviens à celui-ci.",
      "Demande à un ami d'expliquer COMMENT il commencerait, pas la réponse.",
      "Demande à un parent de lire la question avec toi : parfois la dire à voix haute suffit.",
      "Travaille d'abord sur une autre partie de tes devoirs, puis reviens avec des yeux reposés.",
      "Fais une pause de 5 minutes : eau, étirements, respiration. Ton cerveau résout des problèmes même pendant le repos !",
      "Écris exactement ce que tu ne comprends pas, et apporte cette question précise à ton professeur. C'est ce que font les excellents élèves."
    ],
    subjects: {
      maths: {
        steps: [
          "Lis l'exercice deux fois. Puis dis-moi : que doit-on trouver exactement, et quels nombres ou informations as-tu ?",
          "Quelle opération pourrait aider : additionner, soustraire, multiplier, diviser ? Dis-moi laquelle tu choisirais et pourquoi.",
          "Écris ton calcul ici, étape par étape. Tu peux aussi appuyer sur 'Montrer mon travail à Oreo' et photographier ta feuille !",
          "Regarde ton résultat : est-il logique ? (Un chien ne peut pas peser 900 kg !) En maths, la meilleure astuce c'est l'opération inverse : essaie et dis-moi ce que tu as trouvé."
        ],
        hints: [
          "Relis la question et entoure les mots clés. Que doit-on trouver exactement ?",
          "Cherche les mots indices : 'total' veut souvent dire additionner, 'reste' soustraire, 'chaque' multiplier ou diviser. Quelle opération correspond à ton problème ?",
          "Découpe le problème en petits morceaux et résous le plus facile d'abord. Les petites victoires débloquent les grandes !"
        ]
      },
      reading: {
        steps: [
          "D'abord, un secret : beaucoup d'élèves trouvent la lecture difficile, et tous ont appris à lire quand même. Regarde ton texte et dis-moi : il est long, et que dois-tu faire après la lecture ?",
          "On ne lit jamais un grand texte d'un coup : on le découpe en petites bouchées, comme un g&acirc;teau ! Un paragraphe à la fois. Mets ton doigt ou un crayon sous la ligne pour aider tes yeux. Dis-moi par quel petit morceau tu commences.",
          "Lis ton premier petit morceau lentement, à voix haute si tu peux. Puis raconte-moi en UNE phrase ce qui s'y passe. Un seul morceau, c'est toute la mission !",
          "Maintenant raconte-moi tout le texte avec tes mots, morceau par morceau, comme un résumé de film. Si un morceau reste flou, relis SEULEMENT ce morceau. Quel morceau était le plus difficile ?"
        ],
        hints: [
          "Découpe le texte en petits morceaux et fête chaque morceau terminé. Les petites victoires allègent la lecture !",
          "Utilise ton doigt ou un crayon sous la ligne : tes yeux suivent mieux et tu ne perds pas ta place.",
          "Si un mot te bloque : saute-le, lis le reste de la phrase, devine comme un détective. Puis reviens au mot."
        ]
      },
      science: {
        steps: [
          "Que demande vraiment la question ? Dis-le moi avec tes mots.",
          "Que sais-tu déjà sur ce sujet ? Tu peux aussi faire un petit dessin sur papier.",
          "Explique ton idée ici avec tes mots, comme à un ami. Tu peux aussi photographier ton dessin !",
          "Trouve un détail dans ton livre ou tes notes qui confirme ton idée. Dis-moi s'il la confirme ou non."
        ],
        hints: [
          "Que demande vraiment la question ? Souligne les mots scientifiques.",
          "Que sais-tu déjà sur ce sujet ? Essaie de le dessiner.",
          "Explique ton idée avec tes mots, comme à un ami. Puis trouve un détail dans ton livre qui la confirme."
        ]
      },
      history: {
        steps: [
          "Que demande-t-on : une date, une raison, une personne, un lieu ? Dis-moi ce que la question attend de toi.",
          "Dans quel ordre les choses se sont-elles passées ? Construis une mini frise chronologique et dis-moi ce qui vient en premier.",
          "Écris ta réponse avec tes mots, avec un exemple ou une preuve. Tu peux aussi photographier ta frise !",
          "As-tu utilisé des faits appris, pas seulement ton avis ? Dis-moi ta preuve la plus forte."
        ],
        hints: [
          "Que demande-t-on : une date, une raison, une personne, un lieu ? Souligne les mots clés de la question.",
          "Construis une mini frise : qu'est-ce qui s'est passé d'abord, ensuite, après ?",
          "Donne un fait appris comme preuve. Des faits, pas seulement des avis !"
        ]
      },
      other: {
        steps: [
          "Lis la consigne lentement. Dis-moi : que dois-tu faire exactement, et à quoi doit ressembler le résultat final ?",
          "Découpe la grande t&acirc;che en petites étapes. Quelle est la première petite étape que tu peux faire maintenant ?",
          "Fais complètement cette première étape ici. Tu peux aussi photographier ton travail avec 'Montrer mon travail à Oreo' !",
          "Regarde ton travail avec des yeux neufs : as-tu suivi toutes les consignes ? Dis-moi ce que tu améliorerais."
        ],
        hints: [
          "Lis la consigne lentement. Que dois-tu faire exactement ?",
          "Découpe la grande t&acirc;che en petites étapes. Quelle est la première étape possible maintenant ?",
          "Fais d'abord la partie la plus facile. Une petite réussite donne de l'énergie pour la suite !"
        ]
      }
    },
    langT: {
      steps: [
        "Quel genre d'exercice : lecture, écriture, grammaire, vocabulaire ? Dis-moi la consigne exacte.",
        "Quelle règle ou quel exemple de ton cahier de {name} ressemble à cet exercice ? Dis-moi lequel s'applique.",
        "Écris ta réponse ou ton brouillon ici, en {name}. Tu peux aussi photographier ta feuille avec 'Montrer mon travail à Oreo' !",
        "Lis ta phrase à voix haute : est-ce naturel ? Vérifie l'orthographe, les terminaisons et les accents. Dis-moi ce que tu as corrigé."
      ],
      hints: [
        "Quel genre d'exercice ? Les mots de la consigne te le disent.",
        "Regarde ton cahier de {name} : trouve un exemple qui ressemble.",
        "Lis ta phrase à voix haute : est-ce naturel ? Tes oreilles entendent des erreurs que tes yeux ne voient pas !"
      ]
    }
  },

  it: {
    names: { maths: "Matematica", english: "Inglese", italian: "Italiano", spanish: "Spagnolo", french: "Francese", german: "Tedesco", chinese: "Cinese", reading: "Lettura", science: "Scienze", history: "Storia / Geografia", other: "Altro" },
    ui: {
      tagline: "Oreo ti guida... ma la risposta la trovi TU!",
      welcomeTitle: "Benvenuta! Prima di iniziare, dì due cose a Oreo.",
      chooseLang: "1. In quale lingua Oreo deve parlarti?",
      chooseAge: "2. Quanti anni hai?",
      start: "Inizia!",
      changeSetup: "🖊 Cambia lingua o età",
      back: "🔙 Indietro",
      yourQuestion: "La tua domanda era: ",
      aiMode: "✨ Modalità IA: Oreo pensa davvero alla TUA domanda",
      step1Title: "Passo 1: di che materia sono i tuoi compiti?",
      step2Title: "Passo 2: la tua domanda o il tuo esercizio",
      step3Title: "Passo 3: coaching con Oreo",
      step2Tip: "Spiegalo con le tue parole. Scriverlo è già l'inizio della comprensione!",
      questionPh: "Scrivi qui la tua domanda...",
      chatPh: "Scrivi qui la tua risposta a Oreo...",
      confTip: "Come ti senti in questa materia? Oreo si adatta a te!",
      confHigh: "😎 Molto bene",
      confOkay: "🙂 Cos&igrave; cos&igrave;",
      confLow: "😰 La trovo difficile",
      cameraBtn: "📷 Fai una foto con la fotocamera",
      snap: "📷 Scatta!",
      snapWork: "📷 Fotografa il mio lavoro!",
      startCoach: "Inizia il coaching con Oreo!",
      send: "💬 Invia a Oreo",
      hintBtn: "💡 Indizio (3 al massimo)",
      moreBtn: "離 Altre buone idee",
      workBtn: "📷 Mostra il mio lavoro a Oreo",
      judgeCorrect: "✅ &Egrave; corretto!",
      judgeCheck: "樂 Non sono sicuro/a, verifico",
      judgeWrong: "😕 Ho sbagliato",
      restart: "Aiutami con un'altra domanda",
      coachMode: "Modalità coaching: {subject}. Credo in te!",
      photoAlt: "La foto dei tuoi compiti",
      camErr: "Non sono riuscito ad aprire la fotocamera qui. Puoi comunque scrivere la tua domanda!",
      camNo: "Questo browser non pu&ograve; usare la fotocamera. Puoi comunque scrivere la tua domanda!",
      writeFirst: "Prima scrivi qualcosa! Anche poche parole contano.",
      tellMore: "Dimmi qualcosa in pi&ugrave;! Anche due o tre parole in pi&ugrave; mi aiutano ad aiutarti meglio.",
      dontKnow: "Non sapere è completamente normale: è l'inizio dell'apprendimento! Premi il pulsante Indizio se vuoi un indizio, oppure prova a rispondere con quello che PENSI possa essere.",
      finalAnswer: "Hai seguito tutto il mio metodo, complimenti! Ora scrivi qui la tua risposta FINALE, e ti aiuter&ograve; a controllarla da campione.",
      selfCheck: "Bene! Ora controlla prima di festeggiare. Fai cos&igrave;: 1) Rileggi la domanda un'altra volta. 2) Controlla il tuo lavoro riga per riga. 3) In matematica prova l'operazione inversa; nelle lingue, leggi ad alta voce. Quando hai controllato, premi il pulsante che corrisponde a quello che hai trovato.",
      thanksMsg: "Prego! Aiutare TE a trovare le risposte è il mio lavoro preferito. 礪",
      hateMsg: "&Egrave; normale odiare una materia ogni tanto, davvero. La buona notizia: odiarla non ti impedisce di essere bravo/a, un piccolo passo alla volta. Facciamo insieme il passo pi&ugrave; piccolo possibile!",
      hardMsg: "Ti sento. Ogni studente trova difficoltà a volte: è cos&igrave; che il cervello cresce! Prova il pulsante Indizio, e dopo 3 indizi ho una lista di grandi strategie per te.",
      foundMsg: "Fantastico! Quando sei sicuro/a, premi <strong>&Egrave; corretto!</strong> per festeggiare insieme!",
      listening: "Ti ascolto! Ricorda: non do mai le risposte, ma non ti lascio mai la mano. Dimmi su quale parte stai lavorando adesso.",
      photoThanks: "Grazie per avermi mostrato il tuo lavoro! Non riesco ancora a leggere ogni dettaglio di una foto, ma vedo che scrivi passo per passo, ed è esattamente il metodo giusto. Continua cos&igrave;!",
      wellDoneMsg: "Bravissimo/a! Hai controllato la risposta da campione e l'hai trovata da solo/a. Sono fiero di te! Puoi continuare a parlarmi qui sotto se vuoi.",
      wrongMsg: "Va benissimo: gli errori rendono il cervello pi&ugrave; forte! Il fatto che tu l'abbia trovata da solo/a è già un ottimo lavoro. Riproviamo insieme, dal passo PROVA.",
      checkMaths: "Usiamo il trucco dell'OPERAZIONE INVERSA! Addizionare e sottrarre sono opposte: se pensi di aver addizionato, sottrai per controllare. Moltiplicare e dividere sono opposte: se pensi di aver moltiplicato, dividi per controllare. Esempio: hai trovato 7 × 8 = 56? Allora controlla con 56 ÷ 8. Se dà 7, la tua risposta è corretta! Prova e dimmi cosa trovi.",
      checkReading: "Controlliamo la tua lettura! Racconta il testo pezzo per pezzo con le tue parole. Se un pezzo manca o è confuso, rileggi SOLO quel pezzo, ad alta voce e lentamente. Poi premi <strong>&Egrave; corretto!</strong> o <strong>Ho sbagliato</strong> qui sotto.",
      checkGeneric: "Buon istinto: controllare è esattamente quello che fanno gli studenti bravi! Ecco la mia lista: 1) Rileggi la domanda e confrontala parola per parola con la tua risposta. 2) Rifai lentamente la riga difficile. 3) Confronta con un esempio simile nei tuoi appunti. Poi premi <strong>&Egrave; corretto!</strong> o <strong>Ho sbagliato</strong> qui sotto.",
      celebration: "🎉 BRAVO/A! Hai trovato la risposta DA SOLO/A. 🎉<br>Si chiama imparare. Ci vediamo al prossimo compito!",
      hintLabel: "Indizio",
      ofLabel: "di 3:",
      noMoreHints: "<strong>Niente pi&ugrave; indizi! &Egrave; ora di cambiare strategia. Ecco cosa fanno gli studenti bravi:</strong>",
      stepLabel: "Passo"
    },
    kw: {
      dontknow: ["non so", "non lo so", "nessuna idea"],
      thanks: ["grazie"],
      hate: ["odio", "detesto"],
      hard: ["diffic", "duro", "blocc"],
      found: ["trovato", "risolto", "fatto"]
    },
    stepTitles: ["CAPISCI", "PREPARA", "PROVA", "CONTROLLA"],
    greetings: {
      high: "Ciao! Sono Oreo, il tuo coach. Ti senti forte in {subject}, quindi oggi ti aiuter&ograve; a essere preciso/a e a controllare il tuo lavoro da campione!",
      low: "Ciao! Sono Oreo, il tuo coach. So che {subject} pu&ograve; sembrare difficile a volte. Buona notizia: il mio metodo funziona anche allora, e resto con te a ogni passo. Un piccolo passo alla volta!",
      mid: "Ciao! Sono Oreo, il tuo coach. Andremo passo per passo insieme, e vedrai: è pi&ugrave; facile di quanto sembri!"
    },
    ageNotes: {
      young: "Sei ancora piccolo/a, quindi user&ograve; parole molto semplici e faremo mini-passi insieme!",
      mid: "Andremo esattamente alla velocità giusta per te!",
      teen: "Lavoreremo come una vera sessione di studio: concentrati, efficienti, senza parlare come ai bambini!"
    },
    encouragements: ["Che bella riflessione!", "Interessante! Mi piace come la vedi.", "Bel lavoro, continua!", "Bel passo avanti! Fai esattamente come gli studenti bravi."],
    encouragementsAge: { young: ["Bravissimo!", "Che bella idea!", "Continua, stai andando benissimo!", "Ancora un piccolo passo!"], teen: ["Ottima analisi!", "Ragionamento solido, continua così!", "Ottimo ragionamento, vai avanti!", "Approccio rigoroso, è esattamente il metodo giusto!"] },
    helpful: [
      "Prova un esercizio simile pi&ugrave; facile dal tuo libro. Risolvilo, poi torna a questo.",
      "Chiedi a un amico di spiegarti COME inizierebbe, non la risposta.",
      "Chiedi a un genitore di leggere la domanda con te: a volte dirla ad alta voce basta.",
      "Prima lavora su un'altra parte dei compiti, poi torna con occhi riposati.",
      "Fai una pausa di 5 minuti: acqua, stretching, respiro. Il tuo cervello risolve problemi anche mentre riposi!",
      "Scrivi esattamente cosa non capisci e porta quella domanda precisa al tuo insegnante. &Egrave; quello che fanno gli studenti eccellenti."
    ],
    subjects: {
      maths: {
        steps: [
          "Leggi l'esercizio due volte. Poi dimmi: cosa devi trovare esattamente, e quali numeri o informazioni hai?",
          "Quale operazione pu&ograve; aiutare: addizionare, sottrarre, moltiplicare, dividere? Dimmi quale sceglieresti e perché.",
          "Scrivi qui il tuo calcolo, passo per passo. Puoi anche premere 'Mostra il mio lavoro a Oreo' e fotografare il tuo foglio!",
          "Guarda il risultato: è logico? (Un cane non pu&ograve; pesare 900 kg!) In matematica il trucco migliore è l'operazione inversa: prova e dimmi cosa hai trovato."
        ],
        hints: [
          "Rileggi la domanda e cerchia le parole chiave. Cosa devi trovare esattamente?",
          "Cerca le parole indizio: 'totale' spesso significa addizionare, 'restano' sottrarre, 'ogni' moltiplicare o dividere. Quale operazione si adatta al tuo problema?",
          "Taglia il problema in piccoli pezzi e risolvi prima il pi&ugrave; facile. Le piccole vittorie sbloccano le grandi!"
        ]
      },
      reading: {
        steps: [
          "Primo, un segreto: molti studenti trovano difficile la lettura, e tutti hanno imparato a leggere comunque. Guarda il tuo testo e dimmi: quanto è lungo, e cosa devi fare dopo la lettura?",
          "Non si legge mai un testo lungo tutto d'un colpo: lo tagliamo in piccoli bocconi, come una torta! Un paragrafo alla volta. Metti il dito o una matita sotto la riga per aiutare i tuoi occhi. Dimmi da quale pezzo inizi.",
          "Leggi il primo pezzo lentamente, ad alta voce se puoi. Poi dimmi in UNA frase cosa succede. Solo un pezzo: questa è tutta la missione!",
          "Ora raccontami tutto il testo con le tue parole, pezzo per pezzo, come il riassunto di un film. Se un pezzo è ancora confuso, rileggi SOLO quel pezzo. Quale pezzo è stato il pi&ugrave; difficile?"
        ],
        hints: [
          "Taglia il testo in piccoli pezzi e festeggia ogni pezzo finito. Le piccole vittorie rendono la lettura pi&ugrave; leggera!",
          "Usa il dito o una matita sotto la riga: i tuoi occhi seguono meglio e non perdi il posto.",
          "Se una parola ti blocca: salta-la, leggi il resto della frase e indovina come un detective. Poi torna alla parola."
        ]
      },
      science: {
        steps: [
          "Cosa chiede davvero la domanda? Dimmelo con le tue parole.",
          "Cosa sai già di questo argomento? Puoi anche fare un piccolo disegno su carta.",
          "Spiega qui la tua idea con le tue parole, come faresti con un amico. Puoi anche fotografare il tuo disegno!",
          "Trova un dettaglio nel tuo libro o nei tuoi appunti che confermi la tua idea. Dimmi se la conferma o no."
        ],
        hints: [
          "Cosa chiede davvero la domanda? Sottolinea le parole scientifiche.",
          "Cosa sai già di questo argomento? Prova a disegnarlo.",
          "Spiega la tua idea con le tue parole, come a un amico. Poi trova un dettaglio nel libro che la confermi."
        ]
      },
      history: {
        steps: [
          "Cosa si chiede: una data, un motivo, una persona, un luogo? Dimmi cosa vuole la domanda da te.",
          "In che ordine sono successe le cose? Costruisci una mini linea del tempo e dimmi cosa viene per primo.",
          "Scrivi la tua risposta con le tue parole, con un esempio o una prova. Puoi anche fotografare la tua linea del tempo!",
          "Hai usato fatti che hai studiato, non solo la tua opinione? Dimmi la tua prova pi&ugrave; forte."
        ],
        hints: [
          "Cosa si chiede: una data, un motivo, una persona, un luogo? Sottolinea le parole chiave della domanda.",
          "Costruisci una mini linea del tempo: cosa è successo prima, poi, dopo?",
          "Dai un fatto studiato come prova. Fatti, non solo opinioni!"
        ]
      },
      other: {
        steps: [
          "Leggi la consegna lentamente. Dimmi: cosa devi fare esattamente, e come deve essere il risultato finale?",
          "Taglia il grande compito in piccoli passi. Qual è il primo piccolo passo che puoi fare adesso?",
          "Fai qui quel primo passo completamente. Puoi anche fotografare il tuo lavoro con 'Mostra il mio lavoro a Oreo'!",
          "Guarda il tuo lavoro con occhi nuovi: hai seguito tutte le consegne? Dimmi cosa miglioreresti."
        ],
        hints: [
          "Leggi la consegna lentamente. Cosa devi fare esattamente?",
          "Taglia il grande compito in piccoli passi. Qual è il primo passo possibile adesso?",
          "Fai prima la parte pi&ugrave; facile. Un piccolo successo ti dà energia per il resto!"
        ]
      }
    },
    langT: {
      steps: [
        "Che tipo di esercizio: lettura, scrittura, grammatica, vocabolario? Dimmi la consegna esatta.",
        "Quale regola o esempio del tuo quaderno di {name} sembra simile? Dimmi quale pensi si applichi.",
        "Scrivi qui la tua risposta o la tua brutta copia, in {name}. Puoi anche fotografare il tuo foglio con 'Mostra il mio lavoro a Oreo'!",
        "Leggi la frase ad alta voce: suona naturale? Controlla ortografia, terminazioni verbali e accenti. Dimmi cosa hai corretto."
      ],
      hints: [
        "Che tipo di esercizio? Le parole della consegna te lo dicono.",
        "Guarda il tuo quaderno di {name}: trova un esempio che sembra simile.",
        "Leggi la frase ad alta voce: suona naturale? Le tue orecchie sentono errori che i tuoi occhi non vedono!"
      ]
    }
  },

  es: {
    names: { maths: "Matemáticas", english: "Inglés", italian: "Italiano", spanish: "Español", french: "Francés", german: "Alemán", chinese: "Chino", reading: "Lectura", science: "Ciencias", history: "Historia / Geografía", other: "Otra cosa" },
    ui: {
      tagline: "Oreo te guía... pero la respuesta la encuentras T&Uacute;!",
      welcomeTitle: "¡Bienvenida! Antes de empezar, dile dos cosas a Oreo.",
      chooseLang: "1. ¿En qué idioma debe hablarte Oreo?",
      chooseAge: "2. ¿Cuántos años tienes?",
      start: "¡Empezar!",
      changeSetup: "🖊 Cambiar idioma o edad",
      back: "🔙 Atrás",
      yourQuestion: "Tu pregunta era: ",
      aiMode: "✨ Modo IA: Oreo piensa de verdad en TU pregunta",
      step1Title: "Paso 1: ¿De qué materia son tus deberes?",
      step2Title: "Paso 2: Tu pregunta o tu ejercicio",
      step3Title: "Paso 3: Coaching con Oreo",
      step2Tip: "Explícalo con tus propias palabras. ¡Escribirlo ya es el principio de entenderlo!",
      questionPh: "Escribe aquí tu pregunta...",
      chatPh: "Escribe aquí tu respuesta a Oreo...",
      confTip: "¿C&oacute;mo te sientes en esta materia? ¡Oreo se adapta a ti!",
      confHigh: "😎 Muy bien",
      confOkay: "🙂 Regular",
      confLow: "😰 Me cuesta",
      cameraBtn: "📷 Hacer una foto con la cámara",
      snap: "📷 ¡Foto!",
      snapWork: "📷 ¡Foto de mi trabajo!",
      startCoach: "¡Empezar el coaching con Oreo!",
      send: "💬 Enviar a Oreo",
      hintBtn: "💡 Pista (3 como máximo)",
      moreBtn: "離 Más cosas &uacute;tiles que hacer",
      workBtn: "📷 Mostrar mi trabajo a Oreo",
      judgeCorrect: "✅ ¡Es correcto!",
      judgeCheck: "樂 No estoy seguro/a, lo compruebo",
      judgeWrong: "😕 Me equivoqué",
      restart: "Ay&uacute;dame con otra pregunta",
      coachMode: "Modo coaching: {subject}. ¡Creo en ti!",
      photoAlt: "La foto de tus deberes",
      camErr: "No pude abrir la cámara aquí. ¡Puedes escribir tu pregunta igualmente!",
      camNo: "Este navegador no puede usar la cámara. ¡Puedes escribir tu pregunta igualmente!",
      writeFirst: "¡Escribe algo primero! Incluso unas pocas palabras cuentan.",
      tellMore: "¡Cuéntame un poco más! Incluso dos o tres palabras más me ayudan a ayudarte mejor.",
      dontKnow: "No saber es completamente normal: ¡es el principio del aprendizaje! Pulsa el bot&oacute;n Pista si quieres una pista, o intenta responder con lo que PIENSAS que podría ser.",
      finalAnswer: "Has seguido todo mi método, ¡bien hecho! Ahora escribe aquí tu respuesta FINAL, y te ayudaré a comprobarla como un campe&oacute;n.",
      selfCheck: "¡Bien! Ahora compruébalo antes de celebrar. Haz esto: 1) Lee la pregunta una vez más. 2) Comprueba tu trabajo línea por línea. 3) En matemáticas prueba la operaci&oacute;n inversa; en idiomas, léelo en voz alta. Cuando lo hayas comprobado, pulsa el bot&oacute;n que corresponda a lo que encontraste.",
      thanksMsg: "¡De nada! Ayudarte a TI a encontrar respuestas es mi trabajo favorito. 礪",
      hateMsg: "Está bien odiar una materia a veces, de verdad. La buena noticia: odiarla no te impide ser bueno/a en ella, un pequeño paso a la vez. ¡Demos juntos el paso más pequeño posible!",
      hardMsg: "Te escucho. Todos los estudiantes encuentran cosas difíciles a veces: ¡así crece el cerebro! Prueba el bot&oacute;n Pista, y después de 3 pistas tengo una lista de buenas estrategias para ti.",
      foundMsg: "¡Fantástico! Cuando estés seguro/a, pulsa <strong>¡Es correcto!</strong> para celebrarlo juntos.",
      listening: "¡Te escucho! Recuerda: nunca doy respuestas, pero nunca te suelto la mano. Dime en qué parte estás trabajando ahora.",
      photoThanks: "¡Gracias por enseñarme tu trabajo! Todavía no puedo leer todos los detalles de una foto, pero veo que escribes paso a paso, y ese es exactamente el método correcto. ¡Sigue así!",
      wellDoneMsg: "¡Muy bien! Comprobaste tu respuesta como un campe&oacute;n y la encontraste t&uacute; mismo/a. ¡Estoy orgulloso de ti! Puedes seguir hablándome aquí abajo si quieres.",
      wrongMsg: "Está completamente bien: los errores hacen que el cerebro se fortalezca. Que lo hayas encontrado t&uacute; mismo/a ya es un trabajo excelente. Intentémoslo otra vez juntos, desde el paso INTENTA.",
      checkMaths: "¡Usemos el truco de la OPERACI&Oacute;N INVERSA! Sumar y restar son opuestas: si crees que sumaste, resta para comprobar. Multiplicar y dividir son opuestas: si crees que multiplicaste, divide para comprobar. Ejemplo: ¿encontraste 7 × 8 = 56? Comprueba con 56 ÷ 8. Si da 7, tu respuesta es correcta. Pruébalo y dime qué encuentras.",
      checkReading: "¡Comprobemos tu lectura! Cuenta el texto trozo a trozo con tus palabras. Si falta un trozo o está confuso, lee SOLO ese trozo otra vez, en voz alta y despacio. Luego pulsa <strong>¡Es correcto!</strong> o <strong>Me equivoqué</strong> aquí abajo.",
      checkGeneric: "Buen instinto: comprobar es exactamente lo que hacen los buenos estudiantes. Esta es mi lista: 1) Lee la pregunta otra vez y compárala palabra por palabra con tu respuesta. 2) Repite despacio la línea difícil. 3) Compara con un ejemplo parecido de tus apuntes. Luego pulsa <strong>¡Es correcto!</strong> o <strong>Me equivoqué</strong> aquí abajo.",
      celebration: "🎉 ¡MUY BIEN! Encontraste la respuesta T&Uacute; MISMO/A. 🎉<br>Eso se llama aprender. ¡Nos vemos en el siguiente deber!",
      hintLabel: "Pista",
      ofLabel: "de 3:",
      noMoreHints: "<strong>¡No hay más pistas! Es hora de cambiar de estrategia. Esto es lo que hacen los buenos estudiantes:</strong>",
      stepLabel: "Paso"
    },
    kw: {
      dontknow: ["no sé", "no se", "ni idea"],
      thanks: ["gracias"],
      hate: ["odio", "detesto"],
      hard: ["difícil", "dificil", "difíc", "bloquead", "costar", "cuesta"],
      found: ["encontr", "resuel", "lo tengo"]
    },
    stepTitles: ["ENTIENDE", "PREPARA", "INTENTA", "COMPRUEBA"],
    greetings: {
      high: "¡Hola! Soy Oreo, tu entrenador. Te sientes fuerte en {subject}, así que hoy te ayudaré a ser preciso/a y a comprobar tu trabajo como un campe&oacute;n.",
      low: "¡Hola! Soy Oreo, tu entrenador. Sé que {subject} puede parecer difícil a veces. Buena noticia: mi método funciona incluso entonces, y me quedo contigo en cada paso. ¡Un pasito a la vez!",
      mid: "¡Hola! Soy Oreo, tu entrenador. Iremos paso a paso juntos, y verás: ¡es más fácil de lo que parece!"
    },
    ageNotes: {
      young: "Todavía eres pequeño/a, así que usaré palabras muy sencillas y daremos mini-pasos juntos.",
      mid: "Iremos exactamente a la velocidad correcta para ti.",
      teen: "Trabajaremos como una verdadera sesi&oacute;n de estudio: concentrados, eficientes, sin hablar como a bebés."
    },
    encouragements: ["¡Qué buena reflexi&oacute;n!", "¡Interesante! Me gusta c&oacute;mo lo ves.", "¡Buen trabajo, sigue así!", "¡Buen paso adelante! Haces exactamente lo que hacen los buenos estudiantes."],
    encouragementsAge: { young: ["¡Muy bien!", "¡Qué buena idea!", "¡Sigue, lo estás haciendo genial!", "¡Un pasito más!"], teen: ["¡Buen análisis!", "¡Razonamiento sólido, sigue así!", "¡Excelente razonamiento, continúa!", "¡Enfoque riguroso, exactamente el método correcto!"] },
    helpful: [
      "Prueba un ejercicio similar más fácil de tu libro. Resuélvelo y vuelve a este.",
      "Pide a un amigo que te explique C&Oacute;MO empezaría, no la respuesta.",
      "Pide a un padre o madre que lea la pregunta contigo: a veces decirla en voz alta es suficiente.",
      "Trabaja primero en otra parte de tus deberes y vuelve con ojos descansados.",
      "Toma un descanso de 5 minutos: agua, estiramiento, respiraci&oacute;n. Tu cerebro resuelve problemas incluso mientras descansas.",
      "Escribe exactamente qué no entiendes y lleva esa pregunta precisa a tu profesor. Eso hacen los estudiantes excelentes."
    ],
    subjects: {
      maths: {
        steps: [
          "Lee el ejercicio dos veces. Luego dime: qué debes encontrar exactamente, y qué n&uacute;meros o datos tienes.",
          "¿Qué operaci&oacute;n podría ayudar: sumar, restar, multiplicar, dividir? Dime cuál elegirías y por qué.",
          "Escribe aquí tu cálculo, paso a paso. También puedes pulsar 'Mostrar mi trabajo a Oreo' y fotografiar tu hoja.",
          "Mira tu resultado: ¿es l&oacute;gico? (¡Un perro no puede pesar 900 kg!) En matemáticas, el mejor truco es la operaci&oacute;n inversa: pr&uacute;ebalo y dime qué encontraste."
        ],
        hints: [
          "Lee la pregunta otra vez y rodea las palabras clave. ¿Qué debes encontrar exactamente?",
          "Busca palabras pista: 'total' suele significar sumar, 'quedan' restar, 'cada' multiplicar o dividir. ¿Qué operaci&oacute;n encaja con tu problema?",
          "Corta el problema en trozos pequeños y resuelve primero el más fácil. ¡Las pequeñas victorias desbloquean las grandes!"
        ]
      },
      reading: {
        steps: [
          "Primero, un secreto: muchos estudiantes encuentran difícil la lectura, y todos aprendieron a leer de todos modos. Mira tu texto y dime: cuánto mide, y qué debes hacer después de leer.",
          "Nunca leemos un texto grande de una sola vez: lo cortamos en trocitos, como una tarta. Un párrafo a la vez. Pon tu dedo o un lápiz bajo la línea para ayudar a tus ojos. Dime con qué trocito empezarás.",
          "Lee tu primer trocito despacio, en voz alta si puedes. Luego dime en UNA frase qué pas&oacute;. Solo un trocito: esa es toda la misi&oacute;n.",
          "Ahora cuéntame todo el texto con tus palabras, trozo a trozo, como un resumen de película. Si un trozo sigue confuso, lee SOLO ese trozo otra vez. ¿Cuál fue el más difícil?"
        ],
        hints: [
          "Corta el texto en trozos pequeños y celebra cada trozo terminado. ¡Las pequeñas victorias hacen la lectura más ligera!",
          "Usa tu dedo o un lápiz bajo la línea: tus ojos siguen mejor y no pierdes el sitio.",
          "Si una palabra te bloquea: sáltala, lee el resto de la frase y adivina como un detective. Luego vuelve a la palabra."
        ]
      },
      science: {
        steps: [
          "¿Qué pide realmente la pregunta? Dímelo con tus palabras.",
          "¿Qué sabes ya de este tema? También puedes hacer un pequeño dibujo en papel.",
          "Explica aquí tu idea con tus palabras, como a un amigo. También puedes fotografiar tu dibujo.",
          "Encuentra un detalle en tu libro o apuntes que confirme tu idea. Dime si la confirma o no."
        ],
        hints: [
          "¿Qué pide realmente la pregunta? Subraya las palabras científicas.",
          "¿Qué sabes ya de este tema? Intenta dibujarlo.",
          "Explica tu idea con tus palabras, como a un amigo. Luego busca un detalle en tu libro que la confirme."
        ]
      },
      history: {
        steps: [
          "¿Qué se pide: una fecha, un motivo, una persona, un lugar? Dime qué espera la pregunta de ti.",
          "¿En qué orden ocurrieron las cosas? Construye una mini línea de tiempo y dime qué va primero.",
          "Escribe tu respuesta con tus palabras, con un ejemplo o una prueba. También puedes fotografiar tu línea de tiempo.",
          "¿Usaste datos que aprendiste, no solo tu opini&oacute;n? Dime tu prueba más fuerte."
        ],
        hints: [
          "¿Qué se pide: una fecha, un motivo, una persona, un lugar? Subraya las palabras clave de la pregunta.",
          "Construye una mini línea de tiempo: qué pas&oacute; primero, después, luego.",
          "Da un dato aprendido como prueba. ¡Datos, no solo opiniones!"
        ]
      },
      other: {
        steps: [
          "Lee la instrucci&oacute;n despacio. Dime: qué debes hacer exactamente, y c&oacute;mo debe ser el resultado final.",
          "Corta la gran tarea en pasos pequeños. ¿Cuál es el primer pasito que puedes hacer ahora?",
          "Haz ese primer paso completamente aquí. También puedes fotografiar tu trabajo con 'Mostrar mi trabajo a Oreo'.",
          "Mira tu trabajo con ojos nuevos: ¿seguiste todas las instrucciones? Dime qué mejorarías."
        ],
        hints: [
          "Lee la instrucci&oacute;n despacio. ¿Qué debes hacer exactamente?",
          "Corta la gran tarea en pasos pequeños. ¿Cuál es el primer paso posible ahora?",
          "Haz primero la parte más fácil. Un pequeño éxito te da energía para el resto."
        ]
      }
    },
    langT: {
      steps: [
        "¿Qué tipo de ejercicio es: lectura, escritura, gramática, vocabulario? Dime la instrucci&oacute;n exacta.",
        "¿Qué regla o ejemplo de tu cuaderno de {name} parece similar? Dime cuál crees que se aplica.",
        "Escribe aquí tu respuesta o borrador, en {name}. También puedes fotografiar tu hoja con 'Mostrar mi trabajo a Oreo'.",
        "Lee tu frase en voz alta: ¿suena natural? Comprueba ortografía, terminaciones verbales y tildes. Dime qué corregiste."
      ],
      hints: [
        "¿Qué tipo de ejercicio es? Las palabras de la instrucci&oacute;n te lo dicen.",
        "Mira tu cuaderno de {name}: encuentra un ejemplo que parezca similar.",
        "Lee tu frase en voz alta: ¿suena natural? ¡Tus oídos oyen errores que tus ojos no ven!"
      ]
    }
  },

  de: {
    names: { maths: "Mathe", english: "Englisch", italian: "Italienisch", spanish: "Spanisch", french: "Französisch", german: "Deutsch", chinese: "Chinesisch", reading: "Lesen", science: "Naturwissenschaft", history: "Geschichte / Geografie", other: "Etwas anderes" },
    ui: {
      tagline: "Oreo leitet dich an... aber DU findest die Antwort!",
      welcomeTitle: "Willkommen! Bevor wir starten, sag Oreo zwei Dinge.",
      chooseLang: "1. In welcher Sprache soll Oreo mit dir sprechen?",
      chooseAge: "2. Wie alt bist du?",
      start: "Los geht's!",
      changeSetup: "🖊 Sprache oder Alter ändern",
      back: "🔙 Zurück",
      yourQuestion: "Deine Frage war: ",
      aiMode: "✨ KI-Modus: Oreo denkt wirklich über DEINE Frage nach",
      step1Title: "Schritt 1: In welchem Fach sind deine Hausaufgaben?",
      step2Title: "Schritt 2: Deine Frage oder deine Aufgabe",
      step3Title: "Schritt 3: Coaching mit Oreo",
      step2Tip: "Erkläre es mit deinen eigenen Worten. Es aufzuschreiben ist schon der Anfang vom Verstehen!",
      questionPh: "Schreibe deine Frage hier...",
      chatPh: "Schreibe hier deine Antwort an Oreo...",
      confTip: "Wie fühlst du dich in diesem Fach? Oreo passt sich dir an!",
      confHigh: "😎 Sehr gut",
      confOkay: "🙂 Geht so",
      confLow: "😰 Das finde ich schwer",
      cameraBtn: "📷 Mit der Kamera ein Foto machen",
      snap: "📷 Foto!",
      snapWork: "📷 Foto von meiner Arbeit!",
      startCoach: "Coaching mit Oreo starten!",
      send: "💬 An Oreo senden",
      hintBtn: "💡 Tipp (maximal 3)",
      moreBtn: "離 Weitere gute Ideen",
      workBtn: "📷 Zeige Oreo meine Arbeit",
      judgeCorrect: "✅ Es stimmt!",
      judgeCheck: "樂 Bin nicht sicher, ich prüfe",
      judgeWrong: "😕 Ich habe mich geirrt",
      restart: "Hilf mir mit einer anderen Frage",
      coachMode: "Coaching-Modus: {subject}. Ich glaube an dich!",
      photoAlt: "Das Foto deiner Hausaufgaben",
      camErr: "Ich konnte die Kamera hier nicht öffnen. Du kannst deine Frage trotzdem eintippen!",
      camNo: "Dieser Browser kann die Kamera nicht benutzen. Du kannst deine Frage trotzdem eintippen!",
      writeFirst: "Schreibe zuerst etwas! Auch ein paar Wörter zählen.",
      tellMore: "Erzähl mir etwas mehr! Auch zwei oder drei Wörter mehr helfen mir, dich besser zu unterstützen.",
      dontKnow: "Nicht wissen ist völlig normal, das ist der Anfang vom Lernen! Drück den Tipp-Knopf, wenn du einen Hinweis willst, oder versuche zu antworten mit dem, von dem du GLAUBST, dass es stimmen könnte.",
      finalAnswer: "Du hast meine ganze Methode durchgearbeitet, bisher gut gemacht! Schreibe jetzt deine FINALE Antwort hier, und ich helfe dir, sie wie ein Champion zu prüfen.",
      selfCheck: "Gut! Jetzt prüfe, bevor wir feiern. Mach das: 1) Lies die Frage noch einmal. 2) Prüfe deine Arbeit Zeile für Zeile. 3) In Mathe probiere die Umkehroperation; in Sprachen lies laut vor. Wenn du geprüft hast, drück den Knopf, der zu deinem Ergebnis passt.",
      thanksMsg: "Sehr gern! Dir zu helfen, Antworten zu finden, ist mein Lieblingsjob. 礪",
      hateMsg: "Es ist okay, ein Fach manchmal zu hassen, wirklich. Die gute Nachricht: Das hindert dich nicht daran, gut darin zu sein, ein kleiner Schritt nach dem anderen. Machen wir zusammen den kleinsten möglichen Schritt!",
      hardMsg: "Ich höre dich. Jeder Schüler findet manches schwer, so wächst das Gehirn! Probier den Tipp-Knopf, und nach 3 Tipps habe ich eine Liste guter Strategien für dich.",
      foundMsg: "Fantastisch! Wenn du sicher bist, drück <strong>Es stimmt!</strong>, damit wir zusammen feiern!",
      listening: "Ich höre zu! Denk dran: Ich gebe nie Antworten, aber ich lasse deine Hand auch nie los. Erzähl mir, an welchem Teil du gerade arbeitest.",
      photoThanks: "Danke, dass du mir deine Arbeit zeigst! Ich kann noch nicht jedes Detail eines Fotos lesen, aber ich sehe, dass du Schritt für Schritt schreibst, und genau das ist die richtige Methode. Weiter so!",
      wellDoneMsg: "Gut gemacht! Du hast deine Antwort wie ein Champion geprüft und sie selbst gefunden. Ich bin stolz auf dich! Du kannst unten weiter mit mir reden, wenn du willst.",
      wrongMsg: "Das ist völlig okay: Fehler machen das Gehirn stärker! Dass du es selbst versucht hast, ist schon tolle Arbeit. Versuchen wir es zusammen noch einmal, beim Schritt VERSUCH.",
      checkMaths: "Benutzen wir den Trick mit der UMKEHROPERATION! Plus und Minus sind Gegensätze: Wenn du addiert hast, subtrahiere zum Prüfen. Mal und Geteilt sind Gegensätze: Wenn du multipliziert hast, dividiere zum Prüfen. Beispiel: Du hast 7 × 8 = 56? Dann prüfe mit 56 ÷ 8. Wenn 7 herauskommt, stimmt deine Antwort! Probier es und sag mir, was du findest.",
      checkReading: "Prüfen wir dein Lesen! Erzähl den Text Stück für Stück mit deinen Worten nach. Wenn ein Stück fehlt oder unscharf ist, lies NUR dieses Stück noch einmal, laut und langsam. Dann drück unten <strong>Es stimmt!</strong> oder <strong>Ich habe mich geirrt</strong>.",
      checkGeneric: "Guter Instinkt: Prüfen machen genau starke Schüler! Hier meine Liste: 1) Lies die Frage noch einmal und vergleiche sie Wort für Wort mit deiner Antwort. 2) Mache die schwere Zeile langsam noch einmal. 3) Vergleiche mit einem ähnlichen Beispiel aus deinen Notizen. Dann drück unten <strong>Es stimmt!</strong> oder <strong>Ich habe mich geirrt</strong>.",
      celebration: "🎉 GUT GEMACHT! Du hast die Antwort SELBST gefunden. 🎉<br>Das nennt man lernen. Bis zur nächsten Hausaufgabe!",
      hintLabel: "Tipp",
      ofLabel: "von 3:",
      noMoreHints: "<strong>Keine Tipps mehr! Zeit, die Strategie zu wechseln. Das machen gute Schüler:</strong>",
      stepLabel: "Schritt"
    },
    kw: {
      dontknow: ["weiß nicht", "weiss nicht", "keine ahnung"],
      thanks: ["danke"],
      hate: ["hasse", "hasst"],
      hard: ["schwer", "schwierig", "stecke fest"],
      found: ["gefunden", "gelöst", "geschafft"]
    },
    stepTitles: ["VERSTEHE", "PLANE", "VERSUCH", "PR&Uuml;FE"],
    greetings: {
      high: "Hallo! Ich bin Oreo, dein Coach. Du fühlst dich stark in {subject}, also helfe ich dir heute, präzise zu sein und deine Arbeit wie ein Champion zu prüfen!",
      low: "Hallo! Ich bin Oreo, dein Coach. Ich weiß, {subject} fühlt sich manchmal schwer an. Gute Nachricht: Meine Methode funktioniert auch dann, und ich bleibe bei jedem Schritt bei dir. Ein kleiner Schritt nach dem anderen!",
      mid: "Hallo! Ich bin Oreo, dein Coach. Wir gehen Schritt für Schritt zusammen, und du wirst sehen: Es ist leichter, als es aussieht!"
    },
    ageNotes: {
      young: "Du bist noch klein, also benutze ich sehr einfache Wörter und wir machen Mini-Schritte zusammen!",
      mid: "Wir gehen genau in dem Tempo, das zu dir passt!",
      teen: "Wir arbeiten wie eine echte Lernsession: konzentriert, effizient, ohne Babysprache!"
    },
    encouragements: ["Super gedacht!", "Interessant! Ich mag deine Sichtweise.", "Gute Arbeit, weiter so!", "Schöner Schritt nach vorn! Du machst genau das, was gute Schüler machen."],
    encouragementsAge: { young: ["Gut gemacht!", "Tolle Idee!", "Weiter so, du bist super!", "Noch ein kleiner Schritt!"], teen: ["Scharf gedacht!", "Solide Argumentation, weiter so!", "Exzellente Analyse, mach weiter!", "Gründliches Vorgehen, genau die richtige Methode!"] },
    helpful: [
      "Probier eine ähnliche, leichtere Aufgabe aus deinem Buch. Löse sie und komm dann zu dieser zurück.",
      "Bitte einen Freund zu erklären, WIE er anfangen würde, nicht die Antwort.",
      "Bitte ein Elternteil, die Frage mit dir zu lesen: Manchmal reicht es, sie laut auszusprechen.",
      "Arbeite zuerst an einem anderen Teil deiner Hausaufgaben und komm mit frischen Augen zurück.",
      "Mach eine 5-Minuten-Pause: Wasser, Stretching, atmen. Dein Gehirn löst Probleme sogar im Ruhen!",
      "Schreib genau auf, was du nicht verstehst, und bring diese präzise Frage zu deiner Lehrerin oder deinem Lehrer. Das machen exzellente Schüler."
    ],
    subjects: {
      maths: {
        steps: [
          "Lies die Aufgabe zweimal. Dann sag mir: Was genau sollst du herausfinden, und welche Zahlen oder Angaben hast du?",
          "Welche Rechenart könnte helfen: plus, minus, mal, geteilt? Sag mir, welche du wählen würdest und warum.",
          "Schreib deine Rechnung hier auf, Schritt für Schritt. Du kannst auch auf 'Zeige Oreo meine Arbeit' tippen und dein Blatt fotografieren!",
          "Schau auf dein Ergebnis: Ist es logisch? (Ein Hund kann nicht 900 kg wiegen!) In Mathe ist der beste Trick die Umkehroperation: Probier es und sag mir, was du gefunden hast."
        ],
        hints: [
          "Lies die Frage noch einmal und kreise die Schlüsselwörter ein. Was genau sollst du herausfinden?",
          "Such nach Hinweiswörtern: 'gesamt' heißt oft plus, 'noch' minus, 'jede' mal oder geteilt. Welche Rechenart passt zu deiner Aufgabe?",
          "Zerschneide die Aufgabe in kleine Stücke und löse zuerst das leichteste. Kleine Erfolge entriegeln große!"
        ]
      },
      reading: {
        steps: [
          "Zuerst ein Geheimnis: Viele Schüler finden Lesen schwer, und alle haben trotzdem lesen gelernt. Schau auf deinen Text und sag mir: Wie lang ist er, und was musst du nach dem Lesen tun?",
          "Wir lesen nie einen großen Text auf einmal: Wir schneiden ihn in kleine Häppchen, wie einen Kuchen! Ein Absatz nach dem anderen. Leg deinen Finger oder einen Stift unter die Zeile, damit deine Augen folgen. Sag mir, mit welchem Stück du anfängst.",
          "Lies dein erstes Stück langsam, laut wenn möglich. Dann sag mir in EINEM Satz, was passiert ist. Nur ein Stück, das ist die ganze Mission!",
          "Jetzt erzähl mir den ganzen Text mit deinen Worten, Stück für Stück, wie eine Filmzusammenfassung. Wenn ein Stück noch unscharf ist, lies NUR dieses Stück noch einmal. Welches Stück war am schwersten?"
        ],
        hints: [
          "Zerschneide den Text in kleine Stücke und feiere jedes beendete Stück. Kleine Erfolge machen das Lesen leichter!",
          "Benutze Finger oder Stift unter der Zeile: Deine Augen folgen besser und du verlierst die Stelle nicht.",
          "Wenn ein Wort dich blockiert: überspringe es, lies den Rest des Satzes und rate wie ein Detektiv. Dann komm zum Wort zurück."
        ]
      },
      science: {
        steps: [
          "Was verlangt die Frage wirklich? Sag es mir mit deinen Worten.",
          "Was weißt du schon über dieses Thema? Du kannst auch eine kleine Skizze auf Papier machen.",
          "Erkläre deine Idee hier mit deinen Worten, wie einem Freund. Du kannst auch deine Skizze fotografieren!",
          "Finde ein Detail in deinem Buch oder deinen Notizen, das deine Idee bestätigt. Sag mir, ob es sie bestätigt oder nicht."
        ],
        hints: [
          "Was verlangt die Frage wirklich? Unterstreiche die Fachwörter.",
          "Was weißt du schon über dieses Thema? Versuch, es zu zeichnen.",
          "Erkläre deine Idee mit deinen Worten, wie einem Freund. Dann such ein Detail im Buch, das sie bestätigt."
        ]
      },
      history: {
        steps: [
          "Was wird gefragt: ein Datum, ein Grund, eine Person, ein Ort? Sag mir, was die Frage von dir will.",
          "In welcher Reihenfolge passierte was? Baue eine Mini-Zeitachse und sag mir, was zuerst kommt.",
          "Schreib deine Antwort mit deinen Worten, mit einem Beispiel oder Beweis. Du kannst auch deine Zeitachse fotografieren!",
          "Hast du Fakten benutzt, die du gelernt hast, nicht nur deine Meinung? Sag mir deinen stärksten Beweis."
        ],
        hints: [
          "Was wird gefragt: ein Datum, ein Grund, eine Person, ein Ort? Unterstreiche die Schlüsselwörter der Frage.",
          "Baue eine Mini-Zeitachse: Was passierte zuerst, dann, danach?",
          "Gib eine gelernte Tatsache als Beweis. Fakten, nicht nur Meinung!"
        ]
      },
      other: {
        steps: [
          "Lies die Anleitung langsam. Sag mir: Was genau musst du tun, und wie soll das Ergebnis aussehen?",
          "Zerschneide die große Aufgabe in kleine Schritte. Was ist der erste kleine Schritt, den du jetzt machen kannst?",
          "Mach diesen ersten Schritt hier ganz fertig. Du kannst deine Arbeit auch mit 'Zeige Oreo meine Arbeit' fotografieren!",
          "Schau mit frischen Augen auf deine Arbeit: Hast du alle Anweisungen befolgt? Sag mir, was du verbessern würdest."
        ],
        hints: [
          "Lies die Anleitung langsam. Was genau musst du tun?",
          "Zerschneide die große Aufgabe in kleine Schritte. Was ist der erste mögliche Schritt jetzt?",
          "Mach zuerst den leichtesten Teil. Ein kleiner Erfolg gibt Energie für den Rest!"
        ]
      }
    },
    langT: {
      steps: [
        "Welche Art Aufgabe ist es: Lesen, Schreiben, Grammatik, Wortschatz? Sag mir die genaue Anweisung.",
        "Welche Regel oder welches Beispiel aus deinem {name}-Heft ähnelt der Aufgabe? Sag mir, welche passt.",
        "Schreib deine Antwort oder deinen Entwurf hier auf {name}. Du kannst dein Blatt auch mit 'Zeige Oreo meine Arbeit' fotografieren!",
        "Lies deinen Satz laut vor: Klingt er natürlich? Prüfe Rechtschreibung, Verbendungen und Akzente. Sag mir, was du korrigiert hast."
      ],
      hints: [
        "Welche Art Aufgabe ist es? Die Wörter der Anweisung verraten es.",
        "Schau in dein {name}-Heft: Finde ein ähnliches Beispiel.",
        "Lies deinen Satz laut vor: Klingt er natürlich? Deine Ohren hören Fehler, die deine Augen übersehen!"
      ]
    }
  },

  zh: {
    names: { maths: "数学", english: "英语", italian: "意大利语", spanish: "西班牙语", french: "法语", german: "德语", chinese: "中文", reading: "阅读", science: "自然科学", history: "历史 / 地理", other: "其他" },
    ui: {
      tagline: "Oreo 来引导你... 但是答案要你自己找出来！",
      welcomeTitle: "欢迎！开始之前，告诉 Oreo 两件事。",
      chooseLang: "1. Oreo 该用哪种语言跟你说话？",
      chooseAge: "2. 你几岁了？",
      start: "开始！",
      changeSetup: "🖊 换语言或年龄",
      back: "🔙 返回",
      yourQuestion: "你的问题是：",
      aiMode: "✨ AI 模式：Oreo 真的在思考你的问题",
      step1Title: "第 1 步：你的作业是哪一科？",
      step2Title: "第 2 步：你的问题或练习",
      step3Title: "第 3 步：Oreo 来训练你",
      step2Tip: "用自己的话解释。写下来，就已经是理解的开始了！",
      questionPh: "在这里写下你的问题...",
      chatPh: "在这里写下你给 Oreo 的回答...",
      confTip: "你觉得这一科怎么样？Oreo 会配合你！",
      confHigh: "😎 非常棒",
      confOkay: "🙂 还可以",
      confLow: "😰 我觉得很难",
      cameraBtn: "📷 用照相机拍一张照片",
      snap: "📷 拍！",
      snapWork: "📷 拍我的作业！",
      startCoach: "和 Oreo 一起开始！",
      send: "💬 发给 Oreo",
      hintBtn: "💡 提示（最多 3 个）",
      moreBtn: "離 更多好办法",
      workBtn: "📷 把作业展示给 Oreo",
      judgeCorrect: "✅ 答对了！",
      judgeCheck: "樂 不太确定，我再查查",
      judgeWrong: "😕 我做错了",
      restart: "再帮我做一道题",
      coachMode: "教练模式：{subject}。我相信你！",
      photoAlt: "你的作业照片",
      camErr: "这里打不开照相机。依然可以打字写问题！",
      camNo: "这个浏览器不能用照相机。依然可以打字写问题！",
      writeFirst: "先写点东西吧！即使只有几个字也算数。",
      tellMore: "再告诉我一点吧！多两三个字就能让我更好地帮你。",
      dontKnow: "不知道完全正常，这是学习的开始！想要线索就按提示按钮，或者用你的想法试着回答。",
      finalAnswer: "你已经完成了我的整个方法，到现在为止很棒！现在在这里写下你的最终答案，我会帮你像冠军一样查验它。",
      selfCheck: "好！庆祝之前先查验。这样做：1) 再读一遍题目。2) 一行一行检查你的作业。3) 数学题试试逆运算，语言题就大声读出来。查完以后，按下面符合你结果的按钮。",
      thanksMsg: "不客气！帮你自己找到答案是我最喜欢的工作。礪",
      hateMsg: "有时候讨厌一科学科很正常。好消息是：讨厌它并不会阻碍你学好它，一步一步来。我们一起把最小的一步做完吧！",
      hardMsg: "我听到了。每个学生都有觉得难的时候，大脑就是这样长大的！试试提示按钮，3 个提示之后我还有一份好策略清单给你。",
      foundMsg: "太棒了！确定以后，就按 <strong>答对了！</strong> ，我们一起庆祝！",
      listening: "我在听！记住：我从不给答案，但我也从不放弃你。告诉我你现在在做哪一部分。",
      photoThanks: "谢谢你给我看作业！照片的每个细节我还不能完全看懂，但我看到你在一步一步地写，这正是最好的方法。加油！",
      wellDoneMsg: "干得漂亮！你像冠军一样检查了答案，而且是自己找到的。我为你骄傲！想继续聊天就在下面吧。",
      wrongMsg: "完全没关系：犯错是大脑变强的方式！你能自己去找，这已经很出色了。我们再从试一试这一步开始吧！",
      checkMaths: "用逆运算的妙招！加法和减法互为逆运算：如果你用了加法，就用减法来检查。乘法和除法互为逆运算：如果你用了乘法，就用除法来检查。例子：你算出 7 × 8 = 56 ？那就用 56 ÷ 8 来检查。如果结果是 7，答案就对了！试试，告诉我结果。",
      checkReading: "来检查你的阅读！用自己的话一段一段地复述文章。如果某一段还模糊，就大声慢慢地只重读那一段。然后按下面的 <strong>答对了！</strong> 或 <strong>我做错了</strong>。",
      checkGeneric: "好眼光：会检查正是学生们的绝招！我的清单：1) 再读一遍题目，跟你的答案逐字对比。2) 慢慢地重做难的那一行。3) 跟笔记里相像的例子对比。然后按下面的 <strong>答对了！</strong> 或 <strong>我做错了</strong>。",
      celebration: "🎉 太棒了！答案是你自己找到的！🎉<br>这就叫做学习。下道题再见！",
      hintLabel: "提示",
      ofLabel: "/ 3：",
      noMoreHints: "<strong>没有更多提示了！换个策略吧。好学生是这样做的：</strong>",
      stepLabel: "步骤"
    },
    kw: {
      dontknow: ["不知道", "不会"],
      thanks: ["谢谢"],
      hate: ["讨厌"],
      hard: ["难", "卡住了"],
      found: ["算出来了", "做出来了", "会了", "对了"]
    },
    stepTitles: ["理解", "计划", "尝试", "检查"],
    greetings: {
      high: "你好！我是 Oreo，你的教练。你觉得{subject}很棒，那今天我会帮你做到更准确，像冠军一样检查作业！",
      low: "你好！我是 Oreo，你的教练。我知道{subject}有时候让人觉得难。好消息：我的方法在这种时候也管用，而且每一步我都陪着你。一步一步来！",
      mid: "你好！我是 Oreo，你的教练。我们一步一步来，你会看到：比看起来简单多了！"
    },
    ageNotes: {
      young: "你还小，所以我会用最简单的话，我们一步一小步地来！",
      mid: "我们会用最适合你的速度！",
      teen: "我们像一次真正的学习一样：专心、高效！"
    },
    encouragements: ["想得真好！", "有意思！我喜欢你的想法。", "做得好，继续！", "这一步很棒！你就是这样成为好学生的。"],
    encouragementsAge: { young: ["做得好！", "好主意！", "继续加油，你很棒！", "再走一小步！"], teen: ["分析得好！", "推理扎实，继续！", "思路出色，加油！", "方法严谨，完全正确！"] },
    helpful: [
      "先做书上一道更容易的类似题，做出来再回来做这道。",
      "请朋友讲解他们会怎么开始，而不是要答案。",
      "请爸爸妈妈陪你读一遍题目：有时候大声读出来就懂了。",
      "先做作业的其他部分，然后带着清醒的头脑回来。",
      "休息 5 分钟：喝水、伸展、深呼吸。你的大脑休息时也在想题目！",
      "把你不懂的地方准确地写下来，带着这个问题去问老师。优秀的学生都这样做。"
    ],
    subjects: {
      maths: {
        steps: [
          "把题目读两遍。然后告诉我：到底要求什么，你手里有哪些数字和条件？",
          "用哪种运算有帮助：加、减、乘、除？告诉我你会选哪一个，为什么。",
          "在这里一步一步地写出你的计算过程。也可以把作业展示给 Oreo！",
          "看看你的结果：合理吗？（小狗不可能重 900 公斤！）数学里最好的诀窍是逆运算：试一试，告诉我结果。"
        ],
        hints: [
          "再读一遍题目，圈出关键词。到底要求什么？",
          "找线索词：一共往往是加法，还剩往往是减法，每个往往是乘或除。哪种运算适合你的题？",
          "把题目分小块，先做最容易的那块。小胜利打开大胜利！"
        ]
      },
      reading: {
        steps: [
          "先告诉你一个秘密：很多学生都觉得阅读难，而他们最后都学会了读。看看你的文章：它有多长，读完之后要做什么？",
          "大文章不能一次读完，要像切蛋糕一样切成小块！每次读一段。用手指或铅笔指着行，眼睛更容易跟上。告诉我你从哪一段开始。",
          "慢慢地读第一小段，能大声读就大声读。然后用一句话告诉我这段讲了什么。只读一段，这就是全部任务！",
          "现在像电影摘要一样，一段一段地用自己的话把文章讲完。某段还模糊，就只重读那一段。哪段最难？"
        ],
        hints: [
          "把文章分小块，每完成一块就庆祝一下！小胜利让阅读更轻松！",
          "用手指或铅笔指着行：眼睛跟得更稳，不会丢行。",
          "某个字卡住你了：先跳过它，读完整句再像侦探一样猜猜，然后再回来看那个字。"
        ]
      },
      science: {
        steps: [
          "这个问题到底在问什么？用自己的话告诉我。",
          "关于这个主题你已经知道什么？也可以在纸上画个小图。",
          "用自己的话像给朋友讲解一样，在这里解释你的想法。也可以拍下你的图！",
          "在书或笔记里找一个能证实你想法的细节。告诉我它能不能证实。"
        ],
        hints: [
          "问题到底在问什么？划出科学词。",
          "关于这个主题你已经知道什么？试试画出来。",
          "用自己的话像给朋友一样解释你的想法，然后在书里找一个证实的细节。"
        ]
      },
      history: {
        steps: [
          "问的是什么：日期、原因、人物还是地点？告诉我题目要求你什么。",
          "事情是按什么顺序发生的？做一个小时间线，告诉我最早发生的是什么。",
          "用自己的话写下答案，带上例子或证据。也可以拍下你的时间线！",
          "你用的是学到的事实，还是只是自己的看法？告诉我你最强的证据。"
        ],
        hints: [
          "问的是日期、原因、人物还是地点？划出题目的关键词。",
          "做一个小时间线：什么先发生，然后呢？",
          "用学到的事实做证据。事实，不是光有看法！"
        ]
      },
      other: {
        steps: [
          "慢慢地读题目要求。告诉我：到底要做什么，最后的结果要像什么样子？",
          "把大任务分成小步骤。现在能做的第一小步是什么？",
          "在这里完整地做完这一步。也可以把作业展示给 Oreo！",
          "用新鲜的眼光看你的作业：要求都做到了吗？告诉我你会改进哪里。"
        ],
        hints: [
          "慢慢地读题目要求。到底要做什么？",
          "把大任务分成小步骤。现在能做的第一步是什么？",
          "先做最简单的那部分！小成功给你能量做后面的！"
        ]
      }
    },
    langT: {
      steps: [
        "这是什么类型的练习：阅读、写作、语法还是词汇？告诉我完整的要求。",
        "你的{name}笔记本里有什么规则或例子和这题像？你觉得哪一个用得上？",
        "用{name}在这里写出你的答案或草稿。也可以把作业展示给 Oreo！",
        "大声读出你的句子：听起来自然吗？检查错字、动词结尾和重音符号。告诉我你改了什么。"
      ],
      hints: [
        "这是什么类型的练习？题目里的要求词会告诉你。",
        "翻开你的{name}笔记本：找一个相像的例子。",
        "大声读出你的句子：自然吗？耳朵能听到眼睛看不到的错误！"
      ]
    }
  }
};

// ---- 1. STATE ----
var chosenLang = "en";
var chosenAge = null;
var chosenSubject = null;
var chosenQuestion = "";
var confidence = "okay";
var hintCount = 0;
var stepIndex = -1;
var cameraStream = null;
var workStream = null;
var aiHistory = [];

var SUBJECT_EMOJI = {
  maths: "🔢", english: "🇬🇧", italian: "🇮🇹",
  spanish: "🇪🇸", french: "🇫🇷", german: "🇩🇪",
  chinese: "🇨🇳", reading: "📖", science: "🌱",
  history: "🌍", other: "🎯"
};
var LANGUAGE_SUBJECTS = ["english", "italian", "spanish", "french", "german", "chinese"];

function t(key) { return L10N[chosenLang].ui[key]; }
function dict() { return L10N[chosenLang]; }

// Emojis for the four method steps and for encouragements.
var STEP_EMOJI = ["🔍 ", "🗺️ ", "✏️ ", "✅ "];
var ENC_EMOJI = ["💡 ", "🌟 ", "👏 ", "🚀 "];
function stepTitle(i) { return STEP_EMOJI[i] + dict().stepTitles[i]; }

// Get the steps and hints for a subject, in the chosen language.
function subjectData(key) {
  var d = dict();
  if (d.subjects[key]) {
    return { steps: d.subjects[key].steps, hints: d.subjects[key].hints };
  }
  // Language subjects share a template with the subject name inserted.
  var name = d.names[key];
  var fill = function (text) { return text.replace(/\{name\}/g, name); };
  return {
    steps: d.langT.steps.map(fill),
    hints: d.langT.hints.map(fill)
  };
}

function hit(lowerText, key) {
  var words = dict().kw[key];
  return words.some(function (w) { return lowerText.indexOf(w) !== -1; });
}

// ---- 2. OREO'S PORTRAIT ----
var OREO_AVATAR = '<svg class="oreo-avatar" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
  '<polygon points="10,62 22,54.5 15.4,42 29.5,41.5 30,27.4 42.5,34 50,22 57.5,34 70,27.4 70.5,41.5 84.6,42 78,54.5 90,62" fill="#8a5a2b"/>' +
  '<ellipse cx="50" cy="66" rx="26" ry="24" fill="#f5deb3"/>' +
  '<circle cx="32" cy="71" r="5" fill="#ffb3c6"/>' +
  '<circle cx="68" cy="71" r="5" fill="#ffb3c6"/>' +
  '<circle cx="40" cy="60" r="4.5" fill="#222222"/>' +
  '<circle cx="60" cy="60" r="4.5" fill="#222222"/>' +
  '<circle cx="41.5" cy="58.5" r="1.5" fill="#ffffff"/>' +
  '<circle cx="61.5" cy="58.5" r="1.5" fill="#ffffff"/>' +
  '<ellipse cx="50" cy="72" rx="5" ry="6" fill="#4a3728"/>' +
  '<ellipse cx="48.5" cy="70" rx="1.5" ry="2" fill="#ffffff"/>' +
  '<path d="M43,80 Q50,85 57,80" stroke="#4a3728" stroke-width="2" fill="none" stroke-linecap="round"/>' +
  '</svg>';

// ---- 3. HELPERS ----
function show(id) { document.getElementById(id).classList.remove("hidden"); }
function hide(id) { document.getElementById(id).classList.add("hidden"); }

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(function (track) { track.stop(); });
    cameraStream = null;
  }
  hide("camera-video");
  hide("snap-btn");
}

function stopWorkCamera() {
  if (workStream) {
    workStream.getTracks().forEach(function (track) { track.stop(); });
    workStream = null;
  }
  hide("work-camera-video");
  hide("work-snap-btn");
}

function oreoSay(text) {
  var chat = document.getElementById("chat");
  var bubble = document.createElement("div");
  bubble.className = "bubble oreo";
  bubble.innerHTML = OREO_AVATAR + '<div class="oreo-text">' + text + '</div>';
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

function studentSay(text) {
  var chat = document.getElementById("chat");
  var bubble = document.createElement("div");
  bubble.className = "bubble student";
  bubble.textContent = text;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

function studentPhoto(photoData) {
  var chat = document.getElementById("chat");
  var bubble = document.createElement("div");
  bubble.className = "bubble student";
  var img = document.createElement("img");
  img.src = photoData;
  img.alt = t("photoAlt");
  bubble.appendChild(img);
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

function applyLanguage() {
  var d = dict();
  document.documentElement.setAttribute("lang", chosenLang);
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.innerHTML = d.ui[el.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
    el.setAttribute("placeholder", d.ui[el.dataset.i18nPh]);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
    el.setAttribute("alt", d.ui[el.dataset.i18nAlt]);
  });
  // Subject buttons keep their emoji, the name follows the language.
  document.querySelectorAll(".subject").forEach(function (button) {
    var key = button.dataset.subject;
    button.innerHTML = SUBJECT_EMOJI[key] + " " + d.names[key];
  });
}

// ---- 3b. AI MODE ----
// With a Mistral API key, Oreo uses a real AI to think about the student's
// question. The system prompt forbids giving the answer, so the student
// always finds it alone. Without a key, everything stays scripted.
function aiEnabled() { return MISTRAL_API_KEY.length > 5; }

function buildSystemPrompt() {
  var langNames = { en: "English", fr: "French", it: "Italian", es: "Spanish", de: "German", zh: "simplified Chinese" };
  var subjectName = dict().names[chosenSubject];
  var prompt =
    "You are Oreo, a warm, kind homework coach for a " + chosenAge + "-year-old student. " +
    "Always reply in " + langNames[chosenLang] + ". " +
    "VOCABULARY BY AGE: " +
    (chosenAge <= 7
      ? "the student is " + chosenAge + " years old: use only very simple words a small child knows, very short sentences (under 10 words), name concrete everyday objects, ask exactly ONE tiny question at a time, be playful. "
      : chosenAge <= 12
      ? "the student is " + chosenAge + " years old: use simple everyday sentences; if you need a school word, explain it right away with a tiny example. "
      : "the student is a teenager: use precise vocabulary and correct school terminology for the subject, treat them like a serious student, never use baby talk. ") +
    "The school subject: " + subjectName + ". " +
    "The student's homework question or exercise: \"" + chosenQuestion + "\". " +
    "The student's confidence in this subject: " + confidence + ". " +
    "STAY ON TOPIC: this app is only for homework. If the student changes the subject (video games, TV, films, toys, going out), do not follow them: say kindly that you are here for homework and bring the conversation back to the exercise with a guiding question. NEVER suggest playing video games, watching films or anything else instead of doing homework; the only exception is a short 5-minute break if the student is tired, followed by returning to work. ABSOLUTE RULE: you NEVER give the final answer and never solve the exercise, not even partially, even if the student insists or is upset. The student must find it alone. " +
    "Coach with the four-step method: UNDERSTAND, PLAN, TRY, CHECK. Ask short guiding questions, one small step at a time. " +
    "Praise effort. If the student says the answer, help them CHECK it (opposite operation in maths, reading out loud in languages) instead of confirming it yourself. " +
    "Keep every message under 80 words, warm and encouraging, use a few emojis.";
  return prompt;
}

function aiCall() {
  var sendBtn = document.getElementById("send-btn");
  var input = document.getElementById("chat-input");
  sendBtn.disabled = true;
  input.placeholder = "💭";
  var messages = [{ role: "system", content: buildSystemPrompt() }].concat(aiHistory.slice(-12));
  fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + MISTRAL_API_KEY },
    body: JSON.stringify({ model: MISTRAL_MODEL, messages: messages, temperature: 0.6, max_tokens: 350 })
  })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var reply = (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
      if (reply === "") { throw new Error("empty reply"); }
      aiHistory.push({ role: "assistant", content: reply });
      oreoSay(reply);
      if (aiHistory.length >= 3) { show("judge-buttons"); }
    })
    .catch(function () {
      // Network or key problem: Oreo falls back to her scripted coaching.
      oreoSay(t("hardMsg"));
    })
    .then(function () {
      sendBtn.disabled = false;
      input.placeholder = t("chatPh");
    });
}

function aiStart() {
  aiHistory = [{ role: "user", content: "Hello Oreo! My question is written above. Please start coaching me." }];
  aiCall();
}

function aiExchange(text) {
  aiHistory.push({ role: "user", content: text });
  aiCall();
}

// ---- 4. THE WELCOME SCREEN (language + age) ----
document.querySelectorAll(".lang-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    chosenLang = button.dataset.lang;
    document.querySelectorAll(".lang-btn").forEach(function (b) { b.classList.remove("selected"); });
    button.classList.add("selected");
    applyLanguage();
    updateWelcome();
  });
});

document.querySelectorAll(".age-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    chosenAge = parseInt(button.dataset.age, 10);
    document.querySelectorAll(".age-btn").forEach(function (b) { b.classList.remove("selected"); });
    button.classList.add("selected");
    updateWelcome();
  });
});

function updateWelcome() {
  document.getElementById("welcome-start").disabled = !(chosenLang && chosenAge);
}

document.getElementById("welcome-start").addEventListener("click", function () {
  hide("step-welcome");
  show("step-subject");
});

document.getElementById("change-setup-btn").addEventListener("click", function () {
  hide("step-subject");
  show("step-welcome");
});

// ---- 4b. BACK BUTTONS (Maddly's dad's idea) ----
document.getElementById("back-to-subjects-btn").addEventListener("click", function () {
  stopCamera();
  hide("step-question");
  show("step-subject");
});

document.getElementById("back-to-question-btn").addEventListener("click", function () {
  stopCamera();
  stopWorkCamera();
  hide("step-coach");
  show("step-question");
});

// ---- 5. SUBJECT AND CONFIDENCE ----
document.querySelectorAll(".subject").forEach(function (button) {
  button.addEventListener("click", function () {
    chosenSubject = button.dataset.subject;
    hide("step-subject");
    show("step-question");
  });
});

document.querySelectorAll(".conf-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    confidence = button.dataset.level;
    document.querySelectorAll(".conf-btn").forEach(function (b) { b.classList.remove("selected"); });
    button.classList.add("selected");
  });
});

// ---- 6. CAMERAS ----
document.getElementById("open-camera-btn").addEventListener("click", function () {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(function (stream) {
        cameraStream = stream;
        var video = document.getElementById("camera-video");
        video.srcObject = stream;
        show("camera-video");
        show("snap-btn");
      })
      .catch(function () {
        alert(t("camErr"));
      });
  } else {
    alert(t("camNo"));
  }
});

document.getElementById("snap-btn").addEventListener("click", function () {
  var video = document.getElementById("camera-video");
  var drawingSheet = document.createElement("canvas");
  drawingSheet.width = video.videoWidth;
  drawingSheet.height = video.videoHeight;
  drawingSheet.getContext("2d").drawImage(video, 0, 0);
  var photoData = drawingSheet.toDataURL("image/jpeg", 0.8);
  document.getElementById("photo-preview").src = photoData;
  document.getElementById("coach-photo").src = photoData;
  show("photo-preview");
  stopCamera();
});

document.getElementById("work-camera-btn").addEventListener("click", function () {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(function (stream) {
        workStream = stream;
        var video = document.getElementById("work-camera-video");
        video.srcObject = stream;
        show("work-camera-video");
        show("work-snap-btn");
      })
      .catch(function () {
        alert(t("camErr"));
      });
  } else {
    alert(t("camNo"));
  }
});

document.getElementById("work-snap-btn").addEventListener("click", function () {
  var video = document.getElementById("work-camera-video");
  var drawingSheet = document.createElement("canvas");
  drawingSheet.width = video.videoWidth;
  drawingSheet.height = video.videoHeight;
  drawingSheet.getContext("2d").drawImage(video, 0, 0);
  var photoData = drawingSheet.toDataURL("image/jpeg", 0.8);
  studentPhoto(photoData);
  stopWorkCamera();
  oreoSay(t("photoThanks"));
});

// ---- 7. START COACHING ----
function ageBand() {
  if (chosenAge <= 7) { return "young"; }
  if (chosenAge <= 12) { return "mid"; }
  return "teen";
}

function greeting(level, subjectName) {
  var text = dict().greetings[level === "high" ? "high" : (level === "low" ? "low" : "mid")];
  text = text.replace("{subject}", subjectName);
  return "🦔 " + text + " " + dict().ageNotes[ageBand()];
}

document.getElementById("start-coach").addEventListener("click", function () {
  var d = dict();
  var subjectName = d.names[chosenSubject];
  chosenQuestion = document.getElementById("question-box").value.trim();
  document.getElementById("subject-reminder").textContent = t("coachMode").replace("{subject}", subjectName);
  if (document.getElementById("photo-preview").classList.contains("hidden") === false) {
    show("coach-photo");
  }
  document.getElementById("chat").innerHTML = "";
  document.getElementById("chat-input").value = "";
  hintCount = 0;
  stepIndex = 0;
  document.getElementById("hint-btn").innerHTML = t("hintBtn");
  hide("step-question");
  hide("hint-box");
  hide("helpful-box");
  hide("celebration");
  hide("restart-btn");
  hide("judge-buttons");
  show("step-coach");
  oreoSay(greeting(confidence, subjectName));
  // Oreo remembers the question typed in step 2 and repeats it in step 3.
  if (chosenQuestion !== "") {
    oreoSay("📝 <strong>" + t("yourQuestion") + "</strong>" + chosenQuestion);
  }
  if (aiEnabled()) {
    oreoSay(t("aiMode"));
    aiStart();
    return;
  }
  var data = subjectData(chosenSubject);
  oreoSay("<strong>" + t("stepLabel") + " 1 - " + stepTitle(0) + ":</strong> " + data.steps[0]);
});

// ---- 8. THE CONVERSATION ----
document.getElementById("send-btn").addEventListener("click", function () {
  var input = document.getElementById("chat-input");
  var text = input.value.trim();
  if (text === "") {
    oreoSay(t("writeFirst"));
    return;
  }
  studentSay(text);
  input.value = "";
  if (aiEnabled()) {
    aiExchange(text);
    return;
  }
  var lower = text.toLowerCase();
  var d = dict();
  var data = subjectData(chosenSubject);
  var totalSteps = d.stepTitles.length;

  if (stepIndex >= 0 && stepIndex < totalSteps) {
    // We are walking through the method.
    if (hit(lower, "dontknow")) {
      oreoSay(t("dontKnow"));
    } else if (text.length < 5) {
      oreoSay(t("tellMore"));
    } else {
      var encList = (d.encouragementsAge && ageBand() !== "mid" ? d.encouragementsAge[ageBand()] : d.encouragements);
      oreoSay(ENC_EMOJI[stepIndex % ENC_EMOJI.length] + encList[stepIndex % encList.length]);
      stepIndex = stepIndex + 1;
      if (stepIndex < totalSteps) {
        oreoSay("<strong>" + t("stepLabel") + " " + (stepIndex + 1) + " - " + stepTitle(stepIndex) + ":</strong> " + data.steps[stepIndex]);
      } else {
        oreoSay(t("finalAnswer"));
      }
    }
  } else if (stepIndex === totalSteps) {
    // We received the final answer: teach the student to self-check.
    oreoSay(t("selfCheck"));
    show("judge-buttons");
    stepIndex = stepIndex + 1;
  } else {
    // Free conversation with Oreo.
    if (hit(lower, "thanks")) {
      oreoSay(t("thanksMsg"));
    } else if (hit(lower, "hate")) {
      oreoSay(t("hateMsg"));
    } else if (hit(lower, "hard")) {
      oreoSay(t("hardMsg"));
    } else if (hit(lower, "found")) {
      oreoSay(t("foundMsg"));
    } else {
      oreoSay(t("listening"));
    }
  }
});

// ---- 9. HINTS ----
document.getElementById("hint-btn").addEventListener("click", function () {
  var d = dict();
  var data = subjectData(chosenSubject);
  if (hintCount < data.hints.length) {
    var box = document.getElementById("hint-box");
    box.innerHTML = "<strong>" + t("hintLabel") + " " + (hintCount + 1) + " " + t("ofLabel") + "</strong> " + data.hints[hintCount];
    show("hint-box");
    hintCount = hintCount + 1;
    if (hintCount === data.hints.length) {
      document.getElementById("hint-btn").innerHTML = t("moreBtn");
    }
  } else {
    var helpfulBox = document.getElementById("helpful-box");
    var listHTML = t("noMoreHints") + "<ul>";
    d.helpful.forEach(function (thing) {
      listHTML = listHTML + "<li>" + thing + "</li>";
    });
    helpfulBox.innerHTML = listHTML + "</ul>";
    show("helpful-box");
  }
});

// ---- 10. THE JUDGMENT BUTTONS ----
document.getElementById("judge-correct").addEventListener("click", function () {
  hide("judge-buttons");
  stepIndex = -1;
  var celebration = document.getElementById("celebration");
  celebration.innerHTML = t("celebration");
  show("celebration");
  show("restart-btn");
  oreoSay(t("wellDoneMsg"));
});

document.getElementById("judge-check").addEventListener("click", function () {
  if (chosenSubject === "maths") {
    oreoSay(t("checkMaths"));
  } else if (chosenSubject === "reading") {
    oreoSay(t("checkReading"));
  } else {
    oreoSay(t("checkGeneric"));
  }
});

document.getElementById("judge-wrong").addEventListener("click", function () {
  hide("judge-buttons");
  var d = dict();
  oreoSay(t("wrongMsg"));
  if (aiEnabled()) {
    aiHistory.push({ role: "user", content: "I checked and my answer was wrong. Help me try again." });
    aiCall();
    return;
  }
  var data = subjectData(chosenSubject);
  stepIndex = 2;
  oreoSay("<strong>" + t("stepLabel") + " 3 - " + stepTitle(2) + ":</strong> " + data.steps[2]);
});

// ---- 11. RESTART ----
document.getElementById("restart-btn").addEventListener("click", function () {
  stopCamera();
  stopWorkCamera();
  stepIndex = -1;
  hide("step-coach");
  show("step-subject");
  document.getElementById("question-box").value = "";
  hide("photo-preview");
  hide("coach-photo");
  hide("judge-buttons");
  document.querySelectorAll(".conf-btn").forEach(function (b) { b.classList.remove("selected"); });
});

// Initial paint: English first, Maddly chooses the language on the welcome screen.
applyLanguage();
updateWelcome();
