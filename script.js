// ===== script.js =====
// The BRAIN of the app: Oreo the homework coach.
// Now multilingual: Oreo speaks 6 languages and adapts to your age!

// ---- 0. THE LANGUAGES ----
// Maddly's idea: before using the app, you choose your language and your age.
// Every sentence Oreo says lives in the L10N dictionary below.
// Programmers call this "internationalization" (i18n for short).

var L10N = {
  en: {
    names: { maths: "Maths", english: "English", italian: "Italiano", spanish: "Espa&ntilde;ol", french: "Fran&ccedil;ais", german: "Deutsch", chinese: "&#20013;&#25991;", reading: "Reading", science: "Science", history: "History / Geography", other: "Something else" },
    ui: {
      tagline: "Oreo guides you... but YOU find the answer!",
      welcomeTitle: "Welcome! Before we start, tell Oreo two things.",
      chooseLang: "1. In which language should Oreo talk to you?",
      chooseAge: "2. How old are you?",
      start: "Start!",
      changeSetup: "&#128394; Change language or age",
      step1Title: "Step 1: What subject is your homework?",
      step2Title: "Step 2: Your question or exercise",
      step3Title: "Step 3: Coaching with Oreo",
      step2Tip: "Explain it in your own words. Writing it down is already the beginning of understanding!",
      questionPh: "Type your question here...",
      chatPh: "Write your answer to Oreo here...",
      confTip: "How good do you feel in this subject? Oreo adapts to you!",
      confHigh: "&#128526; Very good",
      confOkay: "&#128578; Okay",
      confLow: "&#128560; I find it hard",
      cameraBtn: "&#128247; Take a picture with the camera",
      snap: "&#128247; Snap!",
      snapWork: "&#128247; Snap my work!",
      startCoach: "Start coaching with Oreo!",
      send: "&#128172; Send to Oreo",
      hintBtn: "&#128161; Hint (3 max)",
      moreBtn: "&#129514; More helpful things to do",
      workBtn: "&#128247; Show my work to Oreo",
      judgeCorrect: "&#9989; It's correct!",
      judgeCheck: "&#129300; Not sure, let me check",
      judgeWrong: "&#128533; I got it wrong",
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
      thanksMsg: "You are very welcome! Helping YOU find answers is my favorite job. &#129413;",
      hateMsg: "It is okay to hate a subject sometimes, really. The good news: hating it does not stop you from being good at it, one small step at a time. Let's take the smallest step possible together!",
      hardMsg: "I hear you. Every student finds things hard sometimes, that is how brains grow! Try the Hint button, and after 3 hints I have a list of great strategies for you.",
      foundMsg: "Fantastic! When you are sure, tap <strong>It's correct!</strong> so we can celebrate together!",
      listening: "I am listening! Remember: I never give answers, but I never let go of your hand either. Tell me which part you are working on right now.",
      photoThanks: "Thank you for showing me your work! I cannot read every detail of a picture yet, but I can see that you are writing it down step by step, and that is exactly the right method. Keep going!",
      wellDoneMsg: "Well done! You checked your answer like a champion, and you found it yourself. I am proud of you! You can keep talking to me below if you want.",
      wrongMsg: "That is completely fine: wrong answers are how brains grow stronger! The fact that you found it yourself is already excellent work. Let's try again together, from the TRY step.",
      checkMaths: "Let's use the OPPOSITE OPERATION trick! Adding and subtracting are opposites: if you think you added, subtract to check. Multiplying and dividing are opposites: if you think you multiplied, divide to check. Example: you found 7 &times; 8 = 56? Then check with 56 &divide; 8. If it gives 7, your answer is correct! Try it and tell me what you find.",
      checkReading: "Let's check your reading! Retell the text piece by piece in your own words. If one piece is missing or fuzzy, read ONLY that piece again, out loud and slowly. Then tap <strong>It's correct!</strong> or <strong>I got it wrong</strong> below.",
      checkGeneric: "Good instinct: checking is exactly what strong students do! Here is my checklist: 1) Read the question again and compare it word by word with your answer. 2) Redo the difficult line slowly. 3) Compare with a similar example in your notes. Then tap <strong>It's correct!</strong> or <strong>I got it wrong</strong> below.",
      celebration: "&#127881; WELL DONE! You found the answer YOURSELF. &#127881;<br>That is called learning. See you at the next homework!",
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
    names: { maths: "Maths", english: "Anglais", italian: "Italien", spanish: "Espagnol", french: "Fran&ccedil;ais", german: "Allemand", chinese: "Chinois", reading: "Lecture", science: "Sciences", history: "Histoire / G&eacute;ographie", other: "Autre chose" },
    ui: {
      tagline: "Oreo te guide... mais c'est TOI qui trouves la r&eacute;ponse !",
      welcomeTitle: "Bienvenue ! Avant de commencer, dis deux choses &agrave; Oreo.",
      chooseLang: "1. Dans quelle langue Oreo doit-il te parler ?",
      chooseAge: "2. Quel &acirc;ge as-tu ?",
      start: "Commencer !",
      changeSetup: "&#128394; Changer la langue ou l'&acirc;ge",
      step1Title: "&Eacute;tape 1 : Quel est le sujet de tes devoirs ?",
      step2Title: "&Eacute;tape 2 : Ta question ou ton exercice",
      step3Title: "&Eacute;tape 3 : Coaching avec Oreo",
      step2Tip: "Explique avec tes propres mots. L'&eacute;crire, c'est d&eacute;j&agrave; commencer &agrave; comprendre !",
      questionPh: "&Eacute;cris ta question ici...",
      chatPh: "&Eacute;cris ta r&eacute;ponse &agrave; Oreo ici...",
      confTip: "Comment te sens-tu dans ce sujet ? Oreo s'adapte &agrave; toi !",
      confHigh: "&#128526; Tr&egrave;s bien",
      confOkay: "&#128578; Comme ci comme &ccedil;a",
      confLow: "&#128560; Je trouve &ccedil;a difficile",
      cameraBtn: "&#128247; Prendre une photo avec la cam&eacute;ra",
      snap: "&#128247; Snap !",
      snapWork: "&#128247; Photographier mon travail !",
      startCoach: "Commencer le coaching avec Oreo !",
      send: "&#128172; Envoyer &agrave; Oreo",
      hintBtn: "&#128161; Indice (3 max)",
      moreBtn: "&#129514; D'autres bonnes id&eacute;es",
      workBtn: "&#128247; Montrer mon travail &agrave; Oreo",
      judgeCorrect: "&#9989; C'est correct !",
      judgeCheck: "&#129300; Pas s&ucirc;r, je v&eacute;rifie",
      judgeWrong: "&#128533; Je me suis tromp&eacute;(e)",
      restart: "Aide-moi avec une autre question",
      coachMode: "Mode coaching : {subject}. Je crois en toi !",
      photoAlt: "La photo de tes devoirs",
      camErr: "Je n'ai pas pu ouvrir la cam&eacute;ra ici. Tu peux quand m&ecirc;me &eacute;crire ta question !",
      camNo: "Ce navigateur ne peut pas utiliser la cam&eacute;ra. Tu peux quand m&ecirc;me &eacute;crire ta question !",
      writeFirst: "&Eacute;cris quelque chose d'abord ! M&ecirc;me quelques mots, &ccedil;a compte.",
      tellMore: "Dis-m'en un peu plus ! Deux ou trois mots de plus m'aident mieux &agrave; t'accompagner.",
      dontKnow: "Ne pas savoir, c'est compl&egrave;tement normal : c'est le d&eacute;but de l'apprentissage ! Appuie sur le bouton Indice si tu veux un indice, ou essaie de r&eacute;pondre avec ce que tu PENSES que ce pourrait &ecirc;tre.",
      finalAnswer: "Tu as suivi toute ma m&eacute;thode, bravo pour l'instant ! Maintenant &eacute;cris ta r&eacute;ponse FINALE ici, et je t'aiderai &agrave; la v&eacute;rifier comme un champion.",
      selfCheck: "Bien ! Maintenant v&eacute;rifie avant de f&ecirc;ter. Fais ceci : 1) Relis la question une fois de plus. 2) V&eacute;rifie ton travail ligne par ligne. 3) En maths, essaie l'op&eacute;ration inverse ; en langues, lis &agrave; voix haute. Quand tu as v&eacute;rifi&eacute;, appuie sur le bouton qui correspond &agrave; ce que tu as trouv&eacute;.",
      thanksMsg: "Avec plaisir ! T'aider &agrave; trouver les r&eacute;ponses, c'est mon m&eacute;tier pr&eacute;f&eacute;r&eacute;. &#129413;",
      hateMsg: "C'est normal de d&eacute;tester une mati&egrave;re parfois, vraiment. La bonne nouvelle : la d&eacute;tester ne t'emp&ecirc;che pas d'&ecirc;tre bon(ne) dedans, une petite &eacute;tape &agrave; la fois. Prenons ensemble la plus petite &eacute;tape possible !",
      hardMsg: "Je t'entends. Tous les &eacute;l&egrave;ves trouvent certaines choses difficiles : c'est comme &ccedil;a que le cerveau grandit ! Essaie le bouton Indice, et apr&egrave;s 3 indices j'ai une liste de bonnes strat&eacute;gies pour toi.",
      foundMsg: "Fantastique ! Quand tu es s&ucirc;r(e), appuie sur <strong>C'est correct !</strong> pour f&ecirc;ter &ccedil;a ensemble !",
      listening: "J'&eacute;coute ! Souviens-toi : je ne donne jamais les r&eacute;ponses, mais je ne te l&acirc;che pas la main non plus. Dis-moi sur quelle partie tu travailles en ce moment.",
      photoThanks: "Merci de me montrer ton travail ! Je ne peux pas encore lire tous les d&eacute;tails d'une photo, mais je vois que tu &eacute;cris &eacute;tape par &eacute;tape, et c'est exactement la bonne m&eacute;thode. Continue !",
      wellDoneMsg: "Bravo ! Tu as v&eacute;rifi&eacute; ta r&eacute;ponse comme un champion, et tu l'as trouv&eacute;e toi-m&ecirc;me. Je suis fier de toi ! Tu peux continuer &agrave; me parler ci-dessous si tu veux.",
      wrongMsg: "C'est compl&egrave;tement normal : les erreurs rendent le cerveau plus fort ! Le fait que tu aies trouv&eacute; toi-m&ecirc;me, c'est d&eacute;j&agrave; excellent. R&eacute;essayons ensemble, &agrave; l'&eacute;tape ESSAIE.",
      checkMaths: "Utilisons l'astuce de l'OP&Eacute;RATION INVERSE ! Additionner et soustraire sont des inverses : si tu crois avoir additionn&eacute;, soustrais pour v&eacute;rifier. Multiplier et diviser sont des inverses : si tu crois avoir multipli&eacute;, divise pour v&eacute;rifier. Exemple : tu as trouv&eacute; 7 &times; 8 = 56 ? Alors v&eacute;rifie avec 56 &divide; 8. Si &ccedil;a donne 7, ta r&eacute;ponse est correcte ! Essaie et dis-moi ce que tu trouves.",
      checkReading: "V&eacute;rifions ta lecture ! Raconte le texte morceau par morceau avec tes mots. Si un morceau manque ou reste flou, relis SEULEMENT ce morceau, &agrave; voix haute et lentement. Puis appuie sur <strong>C'est correct !</strong> ou <strong>Je me suis tromp&eacute;(e)</strong> ci-dessous.",
      checkGeneric: "Bon r&eacute;flexe : v&eacute;rifier, c'est exactement ce que font les bons &eacute;l&egrave;ves ! Voici ma liste de contr&ocirc;le : 1) Relis la question et compare-la mot par mot &agrave; ta r&eacute;ponse. 2) Refais la ligne difficile lentement. 3) Compare avec un exemple similaire dans tes notes. Puis appuie sur <strong>C'est correct !</strong> ou <strong>Je me suis tromp&eacute;(e)</strong> ci-dessous.",
      celebration: "&#127881; BRAVO ! Tu as trouv&eacute; la r&eacute;ponse TOI-M&Ecirc;ME. &#127881;<br>&Ccedil;a s'appelle apprendre. &Agrave; la prochaine question !",
      hintLabel: "Indice",
      ofLabel: "sur 3 :",
      noMoreHints: "<strong>Plus d'indices ! Il est temps de changer de strat&eacute;gie. Voici ce que font les bons &eacute;l&egrave;ves :</strong>",
      stepLabel: "&Eacute;tape"
    },
    kw: {
      dontknow: ["sais pas", "je ne sais", "aucune id&eacute;e", "aucune idee"],
      thanks: ["merci"],
      hate: ["d&eacute;teste", "deteste", "hais"],
      hard: ["dur", "difficile", "bloqu"],
      found: ["trouv&eacute;", "trouve", "r&eacute;solu", "resolu", "y suis arriv"]
    },
    stepTitles: ["COMPRENDS", "PR&Eacute;PARE", "ESSAIE", "V&Eacute;RIFIE"],
    greetings: {
      high: "Bonjour ! Je suis Oreo, ton coach. Tu te sens fort(e) en {subject}, alors aujourd'hui je vais t'aider &agrave; &ecirc;tre pr&eacute;cis(e) et &agrave; v&eacute;rifier ton travail comme un champion !",
      low: "Bonjour ! Je suis Oreo, ton coach. Je sais que {subject} peut sembler difficile parfois. Bonne nouvelle : ma m&eacute;thode marche m&ecirc;me dans ces moments-l&agrave;, et je reste avec toi &agrave; chaque &eacute;tape. Une petite &eacute;tape &agrave; la fois !",
      mid: "Bonjour ! Je suis Oreo, ton coach. Nous allons avancer &eacute;tape par &eacute;tape ensemble, et tu verras : c'est plus facile que &ccedil;a en a l'air !"
    },
    ageNotes: {
      young: "Tu es encore petit(e), alors je vais utiliser des mots tr&egrave;s simples et nous ferons des mini-&eacute;tapes ensemble !",
      mid: "Nous irons &agrave; exactement la bonne vitesse pour toi !",
      teen: "Nous travaillerons comme une vraie s&eacute;ance de travail : concentr&eacute;(e), efficace, sans parler b&eacute;b&eacute; !"
    },
    encouragements: ["Super r&eacute;flexion !", "Int&eacute;ressant ! J'aime ta fa&ccedil;on de voir les choses.", "Bon travail, continue !", "Beau pas en avant ! Tu fais exactement comme les bons &eacute;l&egrave;ves."],
    helpful: [
      "Essaie un exercice similaire plus facile de ton livre. R&eacute;sous-le, puis reviens &agrave; celui-ci.",
      "Demande &agrave; un ami d'expliquer COMMENT il commencerait, pas la r&eacute;ponse.",
      "Demande &agrave; un parent de lire la question avec toi : parfois la dire &agrave; voix haute suffit.",
      "Travaille d'abord sur une autre partie de tes devoirs, puis reviens avec des yeux repos&eacute;s.",
      "Fais une pause de 5 minutes : eau, &eacute;tirements, respiration. Ton cerveau r&eacute;sout des probl&egrave;mes m&ecirc;me pendant le repos !",
      "&Eacute;cris exactement ce que tu ne comprends pas, et apporte cette question pr&eacute;cise &agrave; ton professeur. C'est ce que font les excellents &eacute;l&egrave;ves."
    ],
    subjects: {
      maths: {
        steps: [
          "Lis l'exercice deux fois. Puis dis-moi : que doit-on trouver exactement, et quels nombres ou informations as-tu ?",
          "Quelle op&eacute;ration pourrait aider : additionner, soustraire, multiplier, diviser ? Dis-moi laquelle tu choisirais et pourquoi.",
          "&Eacute;cris ton calcul ici, &eacute;tape par &eacute;tape. Tu peux aussi appuyer sur 'Montrer mon travail &agrave; Oreo' et photographier ta feuille !",
          "Regarde ton r&eacute;sultat : est-il logique ? (Un chien ne peut pas peser 900 kg !) En maths, la meilleure astuce c'est l'op&eacute;ration inverse : essaie et dis-moi ce que tu as trouv&eacute;."
        ],
        hints: [
          "Relis la question et entoure les mots cl&eacute;s. Que doit-on trouver exactement ?",
          "Cherche les mots indices : 'total' veut souvent dire additionner, 'reste' soustraire, 'chaque' multiplier ou diviser. Quelle op&eacute;ration correspond &agrave; ton probl&egrave;me ?",
          "D&eacute;coupe le probl&egrave;me en petits morceaux et r&eacute;sous le plus facile d'abord. Les petites victoires d&eacute;bloquent les grandes !"
        ]
      },
      reading: {
        steps: [
          "D'abord, un secret : beaucoup d'&eacute;l&egrave;ves trouvent la lecture difficile, et tous ont appris &agrave; lire quand m&ecirc;me. Regarde ton texte et dis-moi : il est long, et que dois-tu faire apr&egrave;s la lecture ?",
          "On ne lit jamais un grand texte d'un coup : on le d&eacute;coupe en petites bouch&eacute;es, comme un g&acirc;teau ! Un paragraphe &agrave; la fois. Mets ton doigt ou un crayon sous la ligne pour aider tes yeux. Dis-moi par quel petit morceau tu commences.",
          "Lis ton premier petit morceau lentement, &agrave; voix haute si tu peux. Puis raconte-moi en UNE phrase ce qui s'y passe. Un seul morceau, c'est toute la mission !",
          "Maintenant raconte-moi tout le texte avec tes mots, morceau par morceau, comme un r&eacute;sum&eacute; de film. Si un morceau reste flou, relis SEULEMENT ce morceau. Quel morceau &eacute;tait le plus difficile ?"
        ],
        hints: [
          "D&eacute;coupe le texte en petits morceaux et f&ecirc;te chaque morceau termin&eacute;. Les petites victoires all&egrave;gent la lecture !",
          "Utilise ton doigt ou un crayon sous la ligne : tes yeux suivent mieux et tu ne perds pas ta place.",
          "Si un mot te bloque : saute-le, lis le reste de la phrase, devine comme un d&eacute;tective. Puis reviens au mot."
        ]
      },
      science: {
        steps: [
          "Que demande vraiment la question ? Dis-le moi avec tes mots.",
          "Que sais-tu d&eacute;j&agrave; sur ce sujet ? Tu peux aussi faire un petit dessin sur papier.",
          "Explique ton id&eacute;e ici avec tes mots, comme &agrave; un ami. Tu peux aussi photographier ton dessin !",
          "Trouve un d&eacute;tail dans ton livre ou tes notes qui confirme ton id&eacute;e. Dis-moi s'il la confirme ou non."
        ],
        hints: [
          "Que demande vraiment la question ? Souligne les mots scientifiques.",
          "Que sais-tu d&eacute;j&agrave; sur ce sujet ? Essaie de le dessiner.",
          "Explique ton id&eacute;e avec tes mots, comme &agrave; un ami. Puis trouve un d&eacute;tail dans ton livre qui la confirme."
        ]
      },
      history: {
        steps: [
          "Que demande-t-on : une date, une raison, une personne, un lieu ? Dis-moi ce que la question attend de toi.",
          "Dans quel ordre les choses se sont-elles pass&eacute;es ? Construis une mini frise chronologique et dis-moi ce qui vient en premier.",
          "&Eacute;cris ta r&eacute;ponse avec tes mots, avec un exemple ou une preuve. Tu peux aussi photographier ta frise !",
          "As-tu utilis&eacute; des faits appris, pas seulement ton avis ? Dis-moi ta preuve la plus forte."
        ],
        hints: [
          "Que demande-t-on : une date, une raison, une personne, un lieu ? Souligne les mots cl&eacute;s de la question.",
          "Construis une mini frise : qu'est-ce qui s'est pass&eacute; d'abord, ensuite, apr&egrave;s ?",
          "Donne un fait appris comme preuve. Des faits, pas seulement des avis !"
        ]
      },
      other: {
        steps: [
          "Lis la consigne lentement. Dis-moi : que dois-tu faire exactement, et &agrave; quoi doit ressembler le r&eacute;sultat final ?",
          "D&eacute;coupe la grande t&acirc;che en petites &eacute;tapes. Quelle est la premi&egrave;re petite &eacute;tape que tu peux faire maintenant ?",
          "Fais compl&egrave;tement cette premi&egrave;re &eacute;tape ici. Tu peux aussi photographier ton travail avec 'Montrer mon travail &agrave; Oreo' !",
          "Regarde ton travail avec des yeux neufs : as-tu suivi toutes les consignes ? Dis-moi ce que tu am&eacute;liorerais."
        ],
        hints: [
          "Lis la consigne lentement. Que dois-tu faire exactement ?",
          "D&eacute;coupe la grande t&acirc;che en petites &eacute;tapes. Quelle est la premi&egrave;re &eacute;tape possible maintenant ?",
          "Fais d'abord la partie la plus facile. Une petite r&eacute;ussite donne de l'&eacute;nergie pour la suite !"
        ]
      }
    },
    langT: {
      steps: [
        "Quel genre d'exercice : lecture, &eacute;criture, grammaire, vocabulaire ? Dis-moi la consigne exacte.",
        "Quelle r&egrave;gle ou quel exemple de ton cahier de {name} ressemble &agrave; cet exercice ? Dis-moi lequel s'applique.",
        "&Eacute;cris ta r&eacute;ponse ou ton brouillon ici, en {name}. Tu peux aussi photographier ta feuille avec 'Montrer mon travail &agrave; Oreo' !",
        "Lis ta phrase &agrave; voix haute : est-ce naturel ? V&eacute;rifie l'orthographe, les terminaisons et les accents. Dis-moi ce que tu as corrig&eacute;."
      ],
      hints: [
        "Quel genre d'exercice ? Les mots de la consigne te le disent.",
        "Regarde ton cahier de {name} : trouve un exemple qui ressemble.",
        "Lis ta phrase &agrave; voix haute : est-ce naturel ? Tes oreilles entendent des erreurs que tes yeux ne voient pas !"
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
      changeSetup: "&#128394; Cambia lingua o et&agrave;",
      step1Title: "Passo 1: di che materia sono i tuoi compiti?",
      step2Title: "Passo 2: la tua domanda o il tuo esercizio",
      step3Title: "Passo 3: coaching con Oreo",
      step2Tip: "Spiegalo con le tue parole. Scriverlo &egrave; gi&agrave; l'inizio della comprensione!",
      questionPh: "Scrivi qui la tua domanda...",
      chatPh: "Scrivi qui la tua risposta a Oreo...",
      confTip: "Come ti senti in questa materia? Oreo si adatta a te!",
      confHigh: "&#128526; Molto bene",
      confOkay: "&#128578; Cos&igrave; cos&igrave;",
      confLow: "&#128560; La trovo difficile",
      cameraBtn: "&#128247; Fai una foto con la fotocamera",
      snap: "&#128247; Scatta!",
      snapWork: "&#128247; Fotografa il mio lavoro!",
      startCoach: "Inizia il coaching con Oreo!",
      send: "&#128172; Invia a Oreo",
      hintBtn: "&#128161; Indizio (3 al massimo)",
      moreBtn: "&#129514; Altre buone idee",
      workBtn: "&#128247; Mostra il mio lavoro a Oreo",
      judgeCorrect: "&#9989; &Egrave; corretto!",
      judgeCheck: "&#129300; Non sono sicuro/a, verifico",
      judgeWrong: "&#128533; Ho sbagliato",
      restart: "Aiutami con un'altra domanda",
      coachMode: "Modalit&agrave; coaching: {subject}. Credo in te!",
      photoAlt: "La foto dei tuoi compiti",
      camErr: "Non sono riuscito ad aprire la fotocamera qui. Puoi comunque scrivere la tua domanda!",
      camNo: "Questo browser non pu&ograve; usare la fotocamera. Puoi comunque scrivere la tua domanda!",
      writeFirst: "Prima scrivi qualcosa! Anche poche parole contano.",
      tellMore: "Dimmi qualcosa in pi&ugrave;! Anche due o tre parole in pi&ugrave; mi aiutano ad aiutarti meglio.",
      dontKnow: "Non sapere &egrave; completamente normale: &egrave; l'inizio dell'apprendimento! Premi il pulsante Indizio se vuoi un indizio, oppure prova a rispondere con quello che PENSI possa essere.",
      finalAnswer: "Hai seguito tutto il mio metodo, complimenti! Ora scrivi qui la tua risposta FINALE, e ti aiuter&ograve; a controllarla da campione.",
      selfCheck: "Bene! Ora controlla prima di festeggiare. Fai cos&igrave;: 1) Rileggi la domanda un'altra volta. 2) Controlla il tuo lavoro riga per riga. 3) In matematica prova l'operazione inversa; nelle lingue, leggi ad alta voce. Quando hai controllato, premi il pulsante che corrisponde a quello che hai trovato.",
      thanksMsg: "Prego! Aiutare TE a trovare le risposte &egrave; il mio lavoro preferito. &#129413;",
      hateMsg: "&Egrave; normale odiare una materia ogni tanto, davvero. La buona notizia: odiarla non ti impedisce di essere bravo/a, un piccolo passo alla volta. Facciamo insieme il passo pi&ugrave; piccolo possibile!",
      hardMsg: "Ti sento. Ogni studente trova difficolt&agrave; a volte: &egrave; cos&igrave; che il cervello cresce! Prova il pulsante Indizio, e dopo 3 indizi ho una lista di grandi strategie per te.",
      foundMsg: "Fantastico! Quando sei sicuro/a, premi <strong>&Egrave; corretto!</strong> per festeggiare insieme!",
      listening: "Ti ascolto! Ricorda: non do mai le risposte, ma non ti lascio mai la mano. Dimmi su quale parte stai lavorando adesso.",
      photoThanks: "Grazie per avermi mostrato il tuo lavoro! Non riesco ancora a leggere ogni dettaglio di una foto, ma vedo che scrivi passo per passo, ed &egrave; esattamente il metodo giusto. Continua cos&igrave;!",
      wellDoneMsg: "Bravissimo/a! Hai controllato la risposta da campione e l'hai trovata da solo/a. Sono fiero di te! Puoi continuare a parlarmi qui sotto se vuoi.",
      wrongMsg: "Va benissimo: gli errori rendono il cervello pi&ugrave; forte! Il fatto che tu l'abbia trovata da solo/a &egrave; gi&agrave; un ottimo lavoro. Riproviamo insieme, dal passo PROVA.",
      checkMaths: "Usiamo il trucco dell'OPERAZIONE INVERSA! Addizionare e sottrarre sono opposte: se pensi di aver addizionato, sottrai per controllare. Moltiplicare e dividere sono opposte: se pensi di aver moltiplicato, dividi per controllare. Esempio: hai trovato 7 &times; 8 = 56? Allora controlla con 56 &divide; 8. Se d&agrave; 7, la tua risposta &egrave; corretta! Prova e dimmi cosa trovi.",
      checkReading: "Controlliamo la tua lettura! Racconta il testo pezzo per pezzo con le tue parole. Se un pezzo manca o &egrave; confuso, rileggi SOLO quel pezzo, ad alta voce e lentamente. Poi premi <strong>&Egrave; corretto!</strong> o <strong>Ho sbagliato</strong> qui sotto.",
      checkGeneric: "Buon istinto: controllare &egrave; esattamente quello che fanno gli studenti bravi! Ecco la mia lista: 1) Rileggi la domanda e confrontala parola per parola con la tua risposta. 2) Rifai lentamente la riga difficile. 3) Confronta con un esempio simile nei tuoi appunti. Poi premi <strong>&Egrave; corretto!</strong> o <strong>Ho sbagliato</strong> qui sotto.",
      celebration: "&#127881; BRAVO/A! Hai trovato la risposta DA SOLO/A. &#127881;<br>Si chiama imparare. Ci vediamo al prossimo compito!",
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
      mid: "Ciao! Sono Oreo, il tuo coach. Andremo passo per passo insieme, e vedrai: &egrave; pi&ugrave; facile di quanto sembri!"
    },
    ageNotes: {
      young: "Sei ancora piccolo/a, quindi user&ograve; parole molto semplici e faremo mini-passi insieme!",
      mid: "Andremo esattamente alla velocit&agrave; giusta per te!",
      teen: "Lavoreremo come una vera sessione di studio: concentrati, efficienti, senza parlare come ai bambini!"
    },
    encouragements: ["Che bella riflessione!", "Interessante! Mi piace come la vedi.", "Bel lavoro, continua!", "Bel passo avanti! Fai esattamente come gli studenti bravi."],
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
          "Quale operazione pu&ograve; aiutare: addizionare, sottrarre, moltiplicare, dividere? Dimmi quale sceglieresti e perch&eacute;.",
          "Scrivi qui il tuo calcolo, passo per passo. Puoi anche premere 'Mostra il mio lavoro a Oreo' e fotografare il tuo foglio!",
          "Guarda il risultato: &egrave; logico? (Un cane non pu&ograve; pesare 900 kg!) In matematica il trucco migliore &egrave; l'operazione inversa: prova e dimmi cosa hai trovato."
        ],
        hints: [
          "Rileggi la domanda e cerchia le parole chiave. Cosa devi trovare esattamente?",
          "Cerca le parole indizio: 'totale' spesso significa addizionare, 'restano' sottrarre, 'ogni' moltiplicare o dividere. Quale operazione si adatta al tuo problema?",
          "Taglia il problema in piccoli pezzi e risolvi prima il pi&ugrave; facile. Le piccole vittorie sbloccano le grandi!"
        ]
      },
      reading: {
        steps: [
          "Primo, un segreto: molti studenti trovano difficile la lettura, e tutti hanno imparato a leggere comunque. Guarda il tuo testo e dimmi: quanto &egrave; lungo, e cosa devi fare dopo la lettura?",
          "Non si legge mai un testo lungo tutto d'un colpo: lo tagliamo in piccoli bocconi, come una torta! Un paragrafo alla volta. Metti il dito o una matita sotto la riga per aiutare i tuoi occhi. Dimmi da quale pezzo inizi.",
          "Leggi il primo pezzo lentamente, ad alta voce se puoi. Poi dimmi in UNA frase cosa succede. Solo un pezzo: questa &egrave; tutta la missione!",
          "Ora raccontami tutto il testo con le tue parole, pezzo per pezzo, come il riassunto di un film. Se un pezzo &egrave; ancora confuso, rileggi SOLO quel pezzo. Quale pezzo &egrave; stato il pi&ugrave; difficile?"
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
          "Cosa sai gi&agrave; di questo argomento? Puoi anche fare un piccolo disegno su carta.",
          "Spiega qui la tua idea con le tue parole, come faresti con un amico. Puoi anche fotografare il tuo disegno!",
          "Trova un dettaglio nel tuo libro o nei tuoi appunti che confermi la tua idea. Dimmi se la conferma o no."
        ],
        hints: [
          "Cosa chiede davvero la domanda? Sottolinea le parole scientifiche.",
          "Cosa sai gi&agrave; di questo argomento? Prova a disegnarlo.",
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
          "Costruisci una mini linea del tempo: cosa &egrave; successo prima, poi, dopo?",
          "Dai un fatto studiato come prova. Fatti, non solo opinioni!"
        ]
      },
      other: {
        steps: [
          "Leggi la consegna lentamente. Dimmi: cosa devi fare esattamente, e come deve essere il risultato finale?",
          "Taglia il grande compito in piccoli passi. Qual &egrave; il primo piccolo passo che puoi fare adesso?",
          "Fai qui quel primo passo completamente. Puoi anche fotografare il tuo lavoro con 'Mostra il mio lavoro a Oreo'!",
          "Guarda il tuo lavoro con occhi nuovi: hai seguito tutte le consegne? Dimmi cosa miglioreresti."
        ],
        hints: [
          "Leggi la consegna lentamente. Cosa devi fare esattamente?",
          "Taglia il grande compito in piccoli passi. Qual &egrave; il primo passo possibile adesso?",
          "Fai prima la parte pi&ugrave; facile. Un piccolo successo ti d&agrave; energia per il resto!"
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
    names: { maths: "Matem&aacute;ticas", english: "Ingl&eacute;s", italian: "Italiano", spanish: "Espa&ntilde;ol", french: "Franc&eacute;s", german: "Alem&aacute;n", chinese: "Chino", reading: "Lectura", science: "Ciencias", history: "Historia / Geograf&iacute;a", other: "Otra cosa" },
    ui: {
      tagline: "Oreo te gu&iacute;a... pero la respuesta la encuentras T&Uacute;!",
      welcomeTitle: "&iexcl;Bienvenida! Antes de empezar, dile dos cosas a Oreo.",
      chooseLang: "1. &iquest;En qu&eacute; idioma debe hablarte Oreo?",
      chooseAge: "2. &iquest;Cu&aacute;ntos a&ntilde;os tienes?",
      start: "&iexcl;Empezar!",
      changeSetup: "&#128394; Cambiar idioma o edad",
      step1Title: "Paso 1: &iquest;De qu&eacute; materia son tus deberes?",
      step2Title: "Paso 2: Tu pregunta o tu ejercicio",
      step3Title: "Paso 3: Coaching con Oreo",
      step2Tip: "Expl&iacute;calo con tus propias palabras. &iexcl;Escribirlo ya es el principio de entenderlo!",
      questionPh: "Escribe aqu&iacute; tu pregunta...",
      chatPh: "Escribe aqu&iacute; tu respuesta a Oreo...",
      confTip: "&iquest;C&oacute;mo te sientes en esta materia? &iexcl;Oreo se adapta a ti!",
      confHigh: "&#128526; Muy bien",
      confOkay: "&#128578; Regular",
      confLow: "&#128560; Me cuesta",
      cameraBtn: "&#128247; Hacer una foto con la c&aacute;mara",
      snap: "&#128247; &iexcl;Foto!",
      snapWork: "&#128247; &iexcl;Foto de mi trabajo!",
      startCoach: "&iexcl;Empezar el coaching con Oreo!",
      send: "&#128172; Enviar a Oreo",
      hintBtn: "&#128161; Pista (3 como m&aacute;ximo)",
      moreBtn: "&#129514; M&aacute;s cosas &uacute;tiles que hacer",
      workBtn: "&#128247; Mostrar mi trabajo a Oreo",
      judgeCorrect: "&#9989; &iexcl;Es correcto!",
      judgeCheck: "&#129300; No estoy seguro/a, lo compruebo",
      judgeWrong: "&#128533; Me equivoqu&eacute;",
      restart: "Ay&uacute;dame con otra pregunta",
      coachMode: "Modo coaching: {subject}. &iexcl;Creo en ti!",
      photoAlt: "La foto de tus deberes",
      camErr: "No pude abrir la c&aacute;mara aqu&iacute;. &iexcl;Puedes escribir tu pregunta igualmente!",
      camNo: "Este navegador no puede usar la c&aacute;mara. &iexcl;Puedes escribir tu pregunta igualmente!",
      writeFirst: "&iexcl;Escribe algo primero! Incluso unas pocas palabras cuentan.",
      tellMore: "&iexcl;Cu&eacute;ntame un poco m&aacute;s! Incluso dos o tres palabras m&aacute;s me ayudan a ayudarte mejor.",
      dontKnow: "No saber es completamente normal: &iexcl;es el principio del aprendizaje! Pulsa el bot&oacute;n Pista si quieres una pista, o intenta responder con lo que PIENSAS que podr&iacute;a ser.",
      finalAnswer: "Has seguido todo mi m&eacute;todo, &iexcl;bien hecho! Ahora escribe aqu&iacute; tu respuesta FINAL, y te ayudar&eacute; a comprobarla como un campe&oacute;n.",
      selfCheck: "&iexcl;Bien! Ahora compru&eacute;balo antes de celebrar. Haz esto: 1) Lee la pregunta una vez m&aacute;s. 2) Comprueba tu trabajo l&iacute;nea por l&iacute;nea. 3) En matem&aacute;ticas prueba la operaci&oacute;n inversa; en idiomas, l&eacute;elo en voz alta. Cuando lo hayas comprobado, pulsa el bot&oacute;n que corresponda a lo que encontraste.",
      thanksMsg: "&iexcl;De nada! Ayudarte a TI a encontrar respuestas es mi trabajo favorito. &#129413;",
      hateMsg: "Est&aacute; bien odiar una materia a veces, de verdad. La buena noticia: odiarla no te impide ser bueno/a en ella, un peque&ntilde;o paso a la vez. &iexcl;Demos juntos el paso m&aacute;s peque&ntilde;o posible!",
      hardMsg: "Te escucho. Todos los estudiantes encuentran cosas dif&iacute;ciles a veces: &iexcl;as&iacute; crece el cerebro! Prueba el bot&oacute;n Pista, y despu&eacute;s de 3 pistas tengo una lista de buenas estrategias para ti.",
      foundMsg: "&iexcl;Fant&aacute;stico! Cuando est&eacute;s seguro/a, pulsa <strong>&iexcl;Es correcto!</strong> para celebrarlo juntos.",
      listening: "&iexcl;Te escucho! Recuerda: nunca doy respuestas, pero nunca te suelto la mano. Dime en qu&eacute; parte est&aacute;s trabajando ahora.",
      photoThanks: "&iexcl;Gracias por ense&ntilde;arme tu trabajo! Todav&iacute;a no puedo leer todos los detalles de una foto, pero veo que escribes paso a paso, y ese es exactamente el m&eacute;todo correcto. &iexcl;Sigue as&iacute;!",
      wellDoneMsg: "&iexcl;Muy bien! Comprobaste tu respuesta como un campe&oacute;n y la encontraste t&uacute; mismo/a. &iexcl;Estoy orgulloso de ti! Puedes seguir habl&aacute;ndome aqu&iacute; abajo si quieres.",
      wrongMsg: "Est&aacute; completamente bien: los errores hacen que el cerebro se fortalezca. Que lo hayas encontrado t&uacute; mismo/a ya es un trabajo excelente. Intent&eacute;moslo otra vez juntos, desde el paso INTENTA.",
      checkMaths: "&iexcl;Usemos el truco de la OPERACI&Oacute;N INVERSA! Sumar y restar son opuestas: si crees que sumaste, resta para comprobar. Multiplicar y dividir son opuestas: si crees que multiplicaste, divide para comprobar. Ejemplo: &iquest;encontraste 7 &times; 8 = 56? Comprueba con 56 &divide; 8. Si da 7, tu respuesta es correcta. Pru&eacute;balo y dime qu&eacute; encuentras.",
      checkReading: "&iexcl;Comprobemos tu lectura! Cuenta el texto trozo a trozo con tus palabras. Si falta un trozo o est&aacute; confuso, lee SOLO ese trozo otra vez, en voz alta y despacio. Luego pulsa <strong>&iexcl;Es correcto!</strong> o <strong>Me equivoqu&eacute;</strong> aqu&iacute; abajo.",
      checkGeneric: "Buen instinto: comprobar es exactamente lo que hacen los buenos estudiantes. Esta es mi lista: 1) Lee la pregunta otra vez y comp&aacute;rala palabra por palabra con tu respuesta. 2) Repite despacio la l&iacute;nea dif&iacute;cil. 3) Compara con un ejemplo parecido de tus apuntes. Luego pulsa <strong>&iexcl;Es correcto!</strong> o <strong>Me equivoqu&eacute;</strong> aqu&iacute; abajo.",
      celebration: "&#127881; &iexcl;MUY BIEN! Encontraste la respuesta T&Uacute; MISMO/A. &#127881;<br>Eso se llama aprender. &iexcl;Nos vemos en el siguiente deber!",
      hintLabel: "Pista",
      ofLabel: "de 3:",
      noMoreHints: "<strong>&iexcl;No hay m&aacute;s pistas! Es hora de cambiar de estrategia. Esto es lo que hacen los buenos estudiantes:</strong>",
      stepLabel: "Paso"
    },
    kw: {
      dontknow: ["no s&eacute;", "no se", "ni idea"],
      thanks: ["gracias"],
      hate: ["odio", "detesto"],
      hard: ["dif&iacute;cil", "dificil", "dif&iacute;c", "bloquead", "costar", "cuesta"],
      found: ["encontr", "resuel", "lo tengo"]
    },
    stepTitles: ["ENTIENDE", "PREPARA", "INTENTA", "COMPRUEBA"],
    greetings: {
      high: "&iexcl;Hola! Soy Oreo, tu entrenador. Te sientes fuerte en {subject}, as&iacute; que hoy te ayudar&eacute; a ser preciso/a y a comprobar tu trabajo como un campe&oacute;n.",
      low: "&iexcl;Hola! Soy Oreo, tu entrenador. S&eacute; que {subject} puede parecer dif&iacute;cil a veces. Buena noticia: mi m&eacute;todo funciona incluso entonces, y me quedo contigo en cada paso. &iexcl;Un pasito a la vez!",
      mid: "&iexcl;Hola! Soy Oreo, tu entrenador. Iremos paso a paso juntos, y ver&aacute;s: &iexcl;es m&aacute;s f&aacute;cil de lo que parece!"
    },
    ageNotes: {
      young: "Todav&iacute;a eres peque&ntilde;o/a, as&iacute; que usar&eacute; palabras muy sencillas y daremos mini-pasos juntos.",
      mid: "Iremos exactamente a la velocidad correcta para ti.",
      teen: "Trabajaremos como una verdadera sesi&oacute;n de estudio: concentrados, eficientes, sin hablar como a beb&eacute;s."
    },
    encouragements: ["&iexcl;Qu&eacute; buena reflexi&oacute;n!", "&iexcl;Interesante! Me gusta c&oacute;mo lo ves.", "&iexcl;Buen trabajo, sigue as&iacute;!", "&iexcl;Buen paso adelante! Haces exactamente lo que hacen los buenos estudiantes."],
    helpful: [
      "Prueba un ejercicio similar m&aacute;s f&aacute;cil de tu libro. Resu&eacute;lvelo y vuelve a este.",
      "Pide a un amigo que te explique C&Oacute;MO empezar&iacute;a, no la respuesta.",
      "Pide a un padre o madre que lea la pregunta contigo: a veces decirla en voz alta es suficiente.",
      "Trabaja primero en otra parte de tus deberes y vuelve con ojos descansados.",
      "Toma un descanso de 5 minutos: agua, estiramiento, respiraci&oacute;n. Tu cerebro resuelve problemas incluso mientras descansas.",
      "Escribe exactamente qu&eacute; no entiendes y lleva esa pregunta precisa a tu profesor. Eso hacen los estudiantes excelentes."
    ],
    subjects: {
      maths: {
        steps: [
          "Lee el ejercicio dos veces. Luego dime: qu&eacute; debes encontrar exactamente, y qu&eacute; n&uacute;meros o datos tienes.",
          "&iquest;Qu&eacute; operaci&oacute;n podr&iacute;a ayudar: sumar, restar, multiplicar, dividir? Dime cu&aacute;l elegir&iacute;as y por qu&eacute;.",
          "Escribe aqu&iacute; tu c&aacute;lculo, paso a paso. Tambi&eacute;n puedes pulsar 'Mostrar mi trabajo a Oreo' y fotografiar tu hoja.",
          "Mira tu resultado: &iquest;es l&oacute;gico? (&iexcl;Un perro no puede pesar 900 kg!) En matem&aacute;ticas, el mejor truco es la operaci&oacute;n inversa: pr&uacute;ebalo y dime qu&eacute; encontraste."
        ],
        hints: [
          "Lee la pregunta otra vez y rodea las palabras clave. &iquest;Qu&eacute; debes encontrar exactamente?",
          "Busca palabras pista: 'total' suele significar sumar, 'quedan' restar, 'cada' multiplicar o dividir. &iquest;Qu&eacute; operaci&oacute;n encaja con tu problema?",
          "Corta el problema en trozos peque&ntilde;os y resuelve primero el m&aacute;s f&aacute;cil. &iexcl;Las peque&ntilde;as victorias desbloquean las grandes!"
        ]
      },
      reading: {
        steps: [
          "Primero, un secreto: muchos estudiantes encuentran dif&iacute;cil la lectura, y todos aprendieron a leer de todos modos. Mira tu texto y dime: cu&aacute;nto mide, y qu&eacute; debes hacer despu&eacute;s de leer.",
          "Nunca leemos un texto grande de una sola vez: lo cortamos en trocitos, como una tarta. Un p&aacute;rrafo a la vez. Pon tu dedo o un l&aacute;piz bajo la l&iacute;nea para ayudar a tus ojos. Dime con qu&eacute; trocito empezar&aacute;s.",
          "Lee tu primer trocito despacio, en voz alta si puedes. Luego dime en UNA frase qu&eacute; pas&oacute;. Solo un trocito: esa es toda la misi&oacute;n.",
          "Ahora cu&eacute;ntame todo el texto con tus palabras, trozo a trozo, como un resumen de pel&iacute;cula. Si un trozo sigue confuso, lee SOLO ese trozo otra vez. &iquest;Cu&aacute;l fue el m&aacute;s dif&iacute;cil?"
        ],
        hints: [
          "Corta el texto en trozos peque&ntilde;os y celebra cada trozo terminado. &iexcl;Las peque&ntilde;as victorias hacen la lectura m&aacute;s ligera!",
          "Usa tu dedo o un l&aacute;piz bajo la l&iacute;nea: tus ojos siguen mejor y no pierdes el sitio.",
          "Si una palabra te bloquea: s&aacute;ltala, lee el resto de la frase y adivina como un detective. Luego vuelve a la palabra."
        ]
      },
      science: {
        steps: [
          "&iquest;Qu&eacute; pide realmente la pregunta? D&iacute;melo con tus palabras.",
          "&iquest;Qu&eacute; sabes ya de este tema? Tambi&eacute;n puedes hacer un peque&ntilde;o dibujo en papel.",
          "Explica aqu&iacute; tu idea con tus palabras, como a un amigo. Tambi&eacute;n puedes fotografiar tu dibujo.",
          "Encuentra un detalle en tu libro o apuntes que confirme tu idea. Dime si la confirma o no."
        ],
        hints: [
          "&iquest;Qu&eacute; pide realmente la pregunta? Subraya las palabras cient&iacute;ficas.",
          "&iquest;Qu&eacute; sabes ya de este tema? Intenta dibujarlo.",
          "Explica tu idea con tus palabras, como a un amigo. Luego busca un detalle en tu libro que la confirme."
        ]
      },
      history: {
        steps: [
          "&iquest;Qu&eacute; se pide: una fecha, un motivo, una persona, un lugar? Dime qu&eacute; espera la pregunta de ti.",
          "&iquest;En qu&eacute; orden ocurrieron las cosas? Construye una mini l&iacute;nea de tiempo y dime qu&eacute; va primero.",
          "Escribe tu respuesta con tus palabras, con un ejemplo o una prueba. Tambi&eacute;n puedes fotografiar tu l&iacute;nea de tiempo.",
          "&iquest;Usaste datos que aprendiste, no solo tu opini&oacute;n? Dime tu prueba m&aacute;s fuerte."
        ],
        hints: [
          "&iquest;Qu&eacute; se pide: una fecha, un motivo, una persona, un lugar? Subraya las palabras clave de la pregunta.",
          "Construye una mini l&iacute;nea de tiempo: qu&eacute; pas&oacute; primero, despu&eacute;s, luego.",
          "Da un dato aprendido como prueba. &iexcl;Datos, no solo opiniones!"
        ]
      },
      other: {
        steps: [
          "Lee la instrucci&oacute;n despacio. Dime: qu&eacute; debes hacer exactamente, y c&oacute;mo debe ser el resultado final.",
          "Corta la gran tarea en pasos peque&ntilde;os. &iquest;Cu&aacute;l es el primer pasito que puedes hacer ahora?",
          "Haz ese primer paso completamente aqu&iacute;. Tambi&eacute;n puedes fotografiar tu trabajo con 'Mostrar mi trabajo a Oreo'.",
          "Mira tu trabajo con ojos nuevos: &iquest;seguiste todas las instrucciones? Dime qu&eacute; mejorar&iacute;as."
        ],
        hints: [
          "Lee la instrucci&oacute;n despacio. &iquest;Qu&eacute; debes hacer exactamente?",
          "Corta la gran tarea en pasos peque&ntilde;os. &iquest;Cu&aacute;l es el primer paso posible ahora?",
          "Haz primero la parte m&aacute;s f&aacute;cil. Un peque&ntilde;o &eacute;xito te da energ&iacute;a para el resto."
        ]
      }
    },
    langT: {
      steps: [
        "&iquest;Qu&eacute; tipo de ejercicio es: lectura, escritura, gram&aacute;tica, vocabulario? Dime la instrucci&oacute;n exacta.",
        "&iquest;Qu&eacute; regla o ejemplo de tu cuaderno de {name} parece similar? Dime cu&aacute;l crees que se aplica.",
        "Escribe aqu&iacute; tu respuesta o borrador, en {name}. Tambi&eacute;n puedes fotografiar tu hoja con 'Mostrar mi trabajo a Oreo'.",
        "Lee tu frase en voz alta: &iquest;suena natural? Comprueba ortograf&iacute;a, terminaciones verbales y tildes. Dime qu&eacute; corregiste."
      ],
      hints: [
        "&iquest;Qu&eacute; tipo de ejercicio es? Las palabras de la instrucci&oacute;n te lo dicen.",
        "Mira tu cuaderno de {name}: encuentra un ejemplo que parezca similar.",
        "Lee tu frase en voz alta: &iquest;suena natural? &iexcl;Tus o&iacute;dos oyen errores que tus ojos no ven!"
      ]
    }
  },

  de: {
    names: { maths: "Mathe", english: "Englisch", italian: "Italienisch", spanish: "Spanisch", french: "Franz&ouml;sisch", german: "Deutsch", chinese: "Chinesisch", reading: "Lesen", science: "Naturwissenschaft", history: "Geschichte / Geografie", other: "Etwas anderes" },
    ui: {
      tagline: "Oreo leitet dich an... aber DU findest die Antwort!",
      welcomeTitle: "Willkommen! Bevor wir starten, sag Oreo zwei Dinge.",
      chooseLang: "1. In welcher Sprache soll Oreo mit dir sprechen?",
      chooseAge: "2. Wie alt bist du?",
      start: "Los geht's!",
      changeSetup: "&#128394; Sprache oder Alter &auml;ndern",
      step1Title: "Schritt 1: In welchem Fach sind deine Hausaufgaben?",
      step2Title: "Schritt 2: Deine Frage oder deine Aufgabe",
      step3Title: "Schritt 3: Coaching mit Oreo",
      step2Tip: "Erkl&auml;re es mit deinen eigenen Worten. Es aufzuschreiben ist schon der Anfang vom Verstehen!",
      questionPh: "Schreibe deine Frage hier...",
      chatPh: "Schreibe hier deine Antwort an Oreo...",
      confTip: "Wie f&uuml;hlst du dich in diesem Fach? Oreo passt sich dir an!",
      confHigh: "&#128526; Sehr gut",
      confOkay: "&#128578; Geht so",
      confLow: "&#128560; Das finde ich schwer",
      cameraBtn: "&#128247; Mit der Kamera ein Foto machen",
      snap: "&#128247; Foto!",
      snapWork: "&#128247; Foto von meiner Arbeit!",
      startCoach: "Coaching mit Oreo starten!",
      send: "&#128172; An Oreo senden",
      hintBtn: "&#128161; Tipp (maximal 3)",
      moreBtn: "&#129514; Weitere gute Ideen",
      workBtn: "&#128247; Zeige Oreo meine Arbeit",
      judgeCorrect: "&#9989; Es stimmt!",
      judgeCheck: "&#129300; Bin nicht sicher, ich pr&uuml;fe",
      judgeWrong: "&#128533; Ich habe mich geirrt",
      restart: "Hilf mir mit einer anderen Frage",
      coachMode: "Coaching-Modus: {subject}. Ich glaube an dich!",
      photoAlt: "Das Foto deiner Hausaufgaben",
      camErr: "Ich konnte die Kamera hier nicht &ouml;ffnen. Du kannst deine Frage trotzdem eintippen!",
      camNo: "Dieser Browser kann die Kamera nicht benutzen. Du kannst deine Frage trotzdem eintippen!",
      writeFirst: "Schreibe zuerst etwas! Auch ein paar W&ouml;rter z&auml;hlen.",
      tellMore: "Erz&auml;hl mir etwas mehr! Auch zwei oder drei W&ouml;rter mehr helfen mir, dich besser zu unterst&uuml;tzen.",
      dontKnow: "Nicht wissen ist v&ouml;llig normal, das ist der Anfang vom Lernen! Dr&uuml;ck den Tipp-Knopf, wenn du einen Hinweis willst, oder versuche zu antworten mit dem, von dem du GLAUBST, dass es stimmen k&ouml;nnte.",
      finalAnswer: "Du hast meine ganze Methode durchgearbeitet, bisher gut gemacht! Schreibe jetzt deine FINALE Antwort hier, und ich helfe dir, sie wie ein Champion zu pr&uuml;fen.",
      selfCheck: "Gut! Jetzt pr&uuml;fe, bevor wir feiern. Mach das: 1) Lies die Frage noch einmal. 2) Pr&uuml;fe deine Arbeit Zeile f&uuml;r Zeile. 3) In Mathe probiere die Umkehroperation; in Sprachen lies laut vor. Wenn du gepr&uuml;ft hast, dr&uuml;ck den Knopf, der zu deinem Ergebnis passt.",
      thanksMsg: "Sehr gern! Dir zu helfen, Antworten zu finden, ist mein Lieblingsjob. &#129413;",
      hateMsg: "Es ist okay, ein Fach manchmal zu hassen, wirklich. Die gute Nachricht: Das hindert dich nicht daran, gut darin zu sein, ein kleiner Schritt nach dem anderen. Machen wir zusammen den kleinsten m&ouml;glichen Schritt!",
      hardMsg: "Ich h&ouml;re dich. Jeder Sch&uuml;ler findet manches schwer, so w&auml;chst das Gehirn! Probier den Tipp-Knopf, und nach 3 Tipps habe ich eine Liste guter Strategien f&uuml;r dich.",
      foundMsg: "Fantastisch! Wenn du sicher bist, dr&uuml;ck <strong>Es stimmt!</strong>, damit wir zusammen feiern!",
      listening: "Ich h&ouml;re zu! Denk dran: Ich gebe nie Antworten, aber ich lasse deine Hand auch nie los. Erz&auml;hl mir, an welchem Teil du gerade arbeitest.",
      photoThanks: "Danke, dass du mir deine Arbeit zeigst! Ich kann noch nicht jedes Detail eines Fotos lesen, aber ich sehe, dass du Schritt f&uuml;r Schritt schreibst, und genau das ist die richtige Methode. Weiter so!",
      wellDoneMsg: "Gut gemacht! Du hast deine Antwort wie ein Champion gepr&uuml;ft und sie selbst gefunden. Ich bin stolz auf dich! Du kannst unten weiter mit mir reden, wenn du willst.",
      wrongMsg: "Das ist v&ouml;llig okay: Fehler machen das Gehirn st&auml;rker! Dass du es selbst versucht hast, ist schon tolle Arbeit. Versuchen wir es zusammen noch einmal, beim Schritt VERSUCH.",
      checkMaths: "Benutzen wir den Trick mit der UMKEHROPERATION! Plus und Minus sind Gegens&auml;tze: Wenn du addiert hast, subtrahiere zum Pr&uuml;fen. Mal und Geteilt sind Gegens&auml;tze: Wenn du multipliziert hast, dividiere zum Pr&uuml;fen. Beispiel: Du hast 7 &times; 8 = 56? Dann pr&uuml;fe mit 56 &divide; 8. Wenn 7 herauskommt, stimmt deine Antwort! Probier es und sag mir, was du findest.",
      checkReading: "Pr&uuml;fen wir dein Lesen! Erz&auml;hl den Text St&uuml;ck f&uuml;r St&uuml;ck mit deinen Worten nach. Wenn ein St&uuml;ck fehlt oder unscharf ist, lies NUR dieses St&uuml;ck noch einmal, laut und langsam. Dann dr&uuml;ck unten <strong>Es stimmt!</strong> oder <strong>Ich habe mich geirrt</strong>.",
      checkGeneric: "Guter Instinkt: Pr&uuml;fen machen genau starke Sch&uuml;ler! Hier meine Liste: 1) Lies die Frage noch einmal und vergleiche sie Wort f&uuml;r Wort mit deiner Antwort. 2) Mache die schwere Zeile langsam noch einmal. 3) Vergleiche mit einem &auml;hnlichen Beispiel aus deinen Notizen. Dann dr&uuml;ck unten <strong>Es stimmt!</strong> oder <strong>Ich habe mich geirrt</strong>.",
      celebration: "&#127881; GUT GEMACHT! Du hast die Antwort SELBST gefunden. &#127881;<br>Das nennt man lernen. Bis zur n&auml;chsten Hausaufgabe!",
      hintLabel: "Tipp",
      ofLabel: "von 3:",
      noMoreHints: "<strong>Keine Tipps mehr! Zeit, die Strategie zu wechseln. Das machen gute Sch&uuml;ler:</strong>",
      stepLabel: "Schritt"
    },
    kw: {
      dontknow: ["wei&szlig; nicht", "weiss nicht", "keine ahnung"],
      thanks: ["danke"],
      hate: ["hasse", "hasst"],
      hard: ["schwer", "schwierig", "stecke fest"],
      found: ["gefunden", "gel&ouml;st", "geschafft"]
    },
    stepTitles: ["VERSTEHE", "PLANE", "VERSUCH", "PR&Uuml;FE"],
    greetings: {
      high: "Hallo! Ich bin Oreo, dein Coach. Du f&uuml;hlst dich stark in {subject}, also helfe ich dir heute, pr&auml;zise zu sein und deine Arbeit wie ein Champion zu pr&uuml;fen!",
      low: "Hallo! Ich bin Oreo, dein Coach. Ich wei&szlig;, {subject} f&uuml;hlt sich manchmal schwer an. Gute Nachricht: Meine Methode funktioniert auch dann, und ich bleibe bei jedem Schritt bei dir. Ein kleiner Schritt nach dem anderen!",
      mid: "Hallo! Ich bin Oreo, dein Coach. Wir gehen Schritt f&uuml;r Schritt zusammen, und du wirst sehen: Es ist leichter, als es aussieht!"
    },
    ageNotes: {
      young: "Du bist noch klein, also benutze ich sehr einfache W&ouml;rter und wir machen Mini-Schritte zusammen!",
      mid: "Wir gehen genau in dem Tempo, das zu dir passt!",
      teen: "Wir arbeiten wie eine echte Lernsession: konzentriert, effizient, ohne Babysprache!"
    },
    encouragements: ["Super gedacht!", "Interessant! Ich mag deine Sichtweise.", "Gute Arbeit, weiter so!", "Sch&ouml;ner Schritt nach vorn! Du machst genau das, was gute Sch&uuml;ler machen."],
    helpful: [
      "Probier eine &auml;hnliche, leichtere Aufgabe aus deinem Buch. L&ouml;se sie und komm dann zu dieser zur&uuml;ck.",
      "Bitte einen Freund zu erkl&auml;ren, WIE er anfangen w&uuml;rde, nicht die Antwort.",
      "Bitte ein Elternteil, die Frage mit dir zu lesen: Manchmal reicht es, sie laut auszusprechen.",
