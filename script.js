// ===== script.js =====
// The BRAIN of the app: Hedgy the homework coach.

// ---- 1. THE DATA: one coach method and 3 hints per subject ----
var SUBJECTS = {
  maths: {
    name: "Maths",
    steps: [
      { title: "UNDERSTAND", text: "Read the exercise twice. Then tell me: what exactly are you asked to find, and which numbers or facts do you have?" },
      { title: "PLAN", text: "Which operation could help: adding, subtracting, multiplying, dividing? Tell me which one you would pick and why." },
      { title: "TRY", text: "Write your calculation here, step by step, even if you are not sure yet. The first step counts!" },
      { title: "CHECK", text: "Look at your result: is it logical? (A dog cannot weigh 900 kg!) Tell me how you would check it." }
    ],
    hints: [
      "Read the question again and circle the key words. What exactly are you asked to find?",
      "Look for clue words: 'total' often means add, 'left' means subtract, 'each' means multiply or divide. Which operation fits your problem?",
      "Cut the problem into small pieces and solve the easiest piece first. Small wins unlock big ones!"
    ]
  },
  english: {
    name: "English",
    steps: [
      { title: "UNDERSTAND", text: "What kind of task is it: reading, writing, grammar, vocabulary? Tell me the exact instruction." },
      { title: "PLAN", text: "Find the key words. Is there a rule or example in your notebook that looks similar? Which one?" },
      { title: "TRY", text: "Write your answer, or your first draft, right here." },
      { title: "CHECK", text: "Read your answer again: does it answer the WHOLE question? Check spelling, capitals and punctuation, then tell me." }
    ],
    hints: [
      "What kind of task is it: reading, writing, grammar, vocabulary? The instruction words tell you.",
      "Look at your notebook: find one example that looks similar to your exercise.",
      "Read your answer out loud slowly. Your ears catch mistakes your eyes miss!"
    ]
  },
  italian: {
    name: "Italian",
    steps: [
      { title: "UNDERSTAND", text: "What kind of exercise is it: reading, writing, grammar, vocabulary? Tell me the exact instruction." },
      { title: "PLAN", text: "Which rule or example from your Italian notebook looks similar? Tell me which one you think applies." },
      { title: "TRY", text: "Write your answer or first draft here, in Italian. Then read it out loud!" },
      { title: "CHECK", text: "Check articles, gender, verb endings and spelling. Tell me what you corrected." }
    ],
    hints: [
      "What kind of exercise is it? The instruction words tell you.",
      "Look at your Italian notebook: find one example that looks similar.",
      "Read your sentence out loud: does it sound natural? Check articles and verb endings!"
    ]
  },
  spanish: {
    name: "Spanish",
    steps: [
      { title: "UNDERSTAND", text: "What kind of exercise is it: reading, writing, grammar, vocabulary? Tell me the exact instruction." },
      { title: "PLAN", text: "Which rule or example from your Spanish notebook looks similar? Tell me which one you think applies." },
      { title: "TRY", text: "Write your answer or first draft here, in Spanish. Then read it out loud!" },
      { title: "CHECK", text: "Check gender, articles, verb endings and spelling. Tell me what you corrected." }
    ],
    hints: [
      "What kind of exercise is it? The instruction words tell you.",
      "Look at your Spanish notebook: find one example that looks similar.",
      "Read your sentence out loud: does it sound natural? Check gender and verb endings!"
    ]
  },
  science: {
    name: "Science",
    steps: [
      { title: "UNDERSTAND", text: "What is the question really asking? Tell me in your own words." },
      { title: "PLAN", text: "What do you already know about this topic? You can also draw a little sketch on paper." },
      { title: "TRY", text: "Explain your idea here in your own words, like you would to a friend." },
      { title: "CHECK", text: "Does your explanation make sense? Find one detail in your book or notes that confirms it, and tell me." }
    ],
    hints: [
      "What is the question really asking? Underline the science words.",
      "What do you already know about this topic? Try drawing or sketching it.",
      "Explain your idea in your own words, like to a friend. Then find one detail in your book that confirms it."
    ]
  },
  history: {
    name: "History / Geography",
    steps: [
      { title: "UNDERSTAND", text: "What is asked: a date, a reason, a person, a place? Tell me what the question wants from you." },
      { title: "PLAN", text: "In what order did things happen? Build a mini timeline and tell me what comes first." },
      { title: "TRY", text: "Write your answer in your own words, with an example or proof." },
      { title: "CHECK", text: "Did you use facts you learned, not just your opinion? Tell me your strongest fact." }
    ],
    hints: [
      "What is asked: a date, a reason, a person, a place? Underline the key words of the question.",
      "Build a mini timeline: what happened first, next, after?",
      "Give a fact you learned as proof. Facts, not just opinion!"
    ]
  },
  other: {
    name: "your subject",
    steps: [
      { title: "UNDERSTAND", text: "Read the instruction slowly. Tell me: what exactly must you do, and what must the final result look like?" },
      { title: "PLAN", text: "Cut the big task into small steps. What is the first small step you can do right now?" },
      { title: "TRY", text: "Do that first step completely here. Then the next one. Small steps climb big mountains!" },
      { title: "CHECK", text: "Look at your work with fresh eyes: did you follow all the instructions? Tell me what you would improve." }
    ],
    hints: [
      "Read the instruction slowly. What exactly must you do?",
      "Cut the big task into small steps. What is the first small step you can do right now?",
      "Do the easiest part first. A small success gives you energy for the rest!"
    ]
  }
};

// After the 3 hints, the coach suggests helpful ACTIONS instead.
var HELPFUL_THINGS = [
  "Try an easier, similar exercise from your book. Solve it, then come back to this one.",
  "Ask a friend to explain HOW they would start, not the answer.",
  "Ask a parent to read the question with you: sometimes saying it out loud is enough.",
  "Work on another part of your homework first, then come back with fresh eyes.",
  "Take a 5-minute break: water, stretch, breathe. Your brain solves problems even while you rest!",
  "Write down exactly what you do not understand, and bring that precise question to your teacher. This is what excellent students do."
];

// Hedgy's little encouragements when you answer a step.
var ENCOURAGEMENTS = [
  "Great thinking!",
  "Interesting! I like the way you see it.",
  "Good job, keep going!",
  "Nice step forward! You are doing exactly what good students do."
];

// ---- 2. THE MEMORY ----
var chosenSubject = null;
var confidence = "okay";
var hintCount = 0;
var stepIndex = -1; // which step of the method we are on (-1 = not started)
var cameraStream = null;

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

// Hedgy says something in the chat.
function hedgySay(text) {
  var chat = document.getElementById("chat");
  var bubble = document.createElement("div");
  bubble.className = "bubble hedgy";
  bubble.innerHTML = text;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

// The student says something in the chat.
function studentSay(text) {
  var chat = document.getElementById("chat");
  var bubble = document.createElement("div");
  bubble.className = "bubble student";
  bubble.textContent = text;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

// Hedgy's greeting depends on how good the student feels.
function greeting(level, subjectName) {
  if (level === "high") {
    return "Hello! I am Hedgy, your coach. You feel strong in " + subjectName + ", so today I will help you be precise and check your work like a champion!";
  }
  if (level === "low") {
    return "Hello! I am Hedgy, your coach. I know " + subjectName + " can feel hard sometimes. Good news: my method works even then, and I stay with you at every step. One small step at a time!";
  }
  return "Hello! I am Hedgy, your coach. We will go step by step together, and you will see: it is easier than it looks!";
}

// ---- 4. THE REACTIONS ----

// Choose a subject:
document.querySelectorAll(".subject").forEach(function (button) {
  button.addEventListener("click", function () {
    chosenSubject = button.dataset.subject;
    hide("step-subject");
    show("step-question");
  });
});

// Choose your confidence level:
document.querySelectorAll(".conf-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    confidence = button.dataset.level;
    document.querySelectorAll(".conf-btn").forEach(function (b) { b.classList.remove("selected"); });
    button.classList.add("selected");
  });
});

// Open the camera:
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
        alert("I could not open the camera here. You can still type your question!");
      });
  } else {
    alert("This browser cannot use the camera. You can still type your question!");
  }
});

// Take the picture:
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

// Start coaching: the conversation begins!
document.getElementById("start-coach").addEventListener("click", function () {
  var subject = SUBJECTS[chosenSubject];
  document.getElementById("subject-reminder").textContent = "Coach mode: " + subject.name + ". I believe in you!";

  if (document.getElementById("photo-preview").classList.contains("hidden") === false) {
    show("coach-photo");
  }

  document.getElementById("chat").innerHTML = "";
  document.getElementById("chat-input").value = "";
  hintCount = 0;
  stepIndex = 0;
  document.getElementById("hint-btn").innerHTML = "&#128161; Hint (3 max)";
  hide("step-question");
  hide("hint-box");
  hide("helpful-box");
  hide("celebration");
  hide("restart-btn");
  show("step-coach");

  hedgySay(greeting(confidence, subject.name));
  var firstStep = subject.steps[0];
  hedgySay("<strong>Step 1 - " + firstStep.title + ":</strong> " + firstStep.text);
});

// Send a message to Hedgy:
document.getElementById("send-btn").addEventListener("click", function () {
  var input = document.getElementById("chat-input");
  var text = input.value.trim();
  if (text === "") {
    hedgySay("Write something first! Even a few words count.");
    return;
  }
  studentSay(text);
  input.value = "";
  var lower = text.toLowerCase();
  var subject = SUBJECTS[chosenSubject];

  if (stepIndex >= 0 && stepIndex < subject.steps.length) {
    // We are inside the method: react to the student's answer.
    if (lower.indexOf("don't know") !== -1 || lower.indexOf("dont know") !== -1 || lower.indexOf("no idea") !== -1) {
      hedgySay("Not knowing is completely normal, it is the start of learning! Press the Hint button if you want a clue, or try answering with what you THINK it could be.");
    } else if (text.length < 5) {
      hedgySay("Tell me a bit more! Even two or three words more help me coach you better.");
    } else {
      hedgySay(ENCOURAGEMENTS[stepIndex % ENCOURAGEMENTS.length]);
      stepIndex = stepIndex + 1;
      if (stepIndex < subject.steps.length) {
        var step = subject.steps[stepIndex];
        hedgySay("<strong>Step " + (stepIndex + 1) + " - " + step.title + ":</strong> " + step.text);
      } else {
        hedgySay("You worked through all four steps of my method! Now look at your work: does the answer seem logical? If you found it, tap <strong>I did it!</strong>. If not, take a hint, or ask for helpful things to do.");
      }
    }
  } else {
    // Free conversation with Hedgy.
    if (lower.indexOf("thank") !== -1) {
      hedgySay("You are very welcome! Helping YOU find answers is my favorite job. &#129413;");
    } else if (lower.indexOf("hard") !== -1 || lower.indexOf("difficult") !== -1 || lower.indexOf("stuck") !== -1) {
      hedgySay("I hear you. Every student finds things hard sometimes, that is how brains grow! Try the Hint button, and after 3 hints I have a list of great strategies for you.");
    } else if (lower.indexOf("found") !== -1 || lower.indexOf("solved") !== -1 || lower.indexOf("got it") !== -1) {
      hedgySay("Fantastic! When you are sure, tap <strong>I did it!</strong> so we can celebrate together!");
    } else {
      hedgySay("I am listening! Remember: I never give answers, but I never let go of your hand either. Tell me which part you are working on right now.");
    }
  }
});

// Hint button: 3 subject-specific hints, then helpful things to do.
document.getElementById("hint-btn").addEventListener("click", function () {
  var hints = SUBJECTS[chosenSubject].hints;
  if (hintCount < hints.length) {
    var box = document.getElementById("hint-box");
    box.innerHTML = "<strong>Hint " + (hintCount + 1) + " of 3:</strong> " + hints[hintCount];
    show("hint-box");
    hintCount = hintCount + 1;
    if (hintCount === hints.length) {
      document.getElementById("hint-btn").innerHTML = "&#129514; More helpful things to do";
    }
  } else {
    var helpfulBox = document.getElementById("helpful-box");
    var listHTML = "<strong>No more hints! Time to change strategy. Here is what great students do:</strong><ul>";
    HELPFUL_THINGS.forEach(function (thing) {
      listHTML = listHTML + "<li>" + thing + "</li>";
    });
    helpfulBox.innerHTML = listHTML + "</ul>";
    show("helpful-box");
  }
});

// Celebration:
document.getElementById("done-btn").addEventListener("click", function () {
  stepIndex = -1; // free conversation mode now
  var celebration = document.getElementById("celebration");
  celebration.innerHTML = "&#127881; Congratulations! You found the answer YOURSELF. &#127881;<br>That is called learning. See you at the next homework!";
  show("celebration");
  show("restart-btn");
  hide("hint-box");
  hide("helpful-box");
  hedgySay("Amazing work! I am proud of you. If you want, you can keep talking to me below.");
});

// Restart:
document.getElementById("restart-btn").addEventListener("click", function () {
  stopCamera();
  stepIndex = -1;
  hide("step-coach");
  show("step-subject");
  document.getElementById("question-box").value = "";
  hide("photo-preview");
  hide("coach-photo");
  document.querySelectorAll(".conf-btn").forEach(function (b) { b.classList.remove("selected"); });
});
