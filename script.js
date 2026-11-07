// ===== script.js =====
// This file is the BRAIN of the app.
// It waits for the user to click, then reacts.

// ---- 1. THE DATA: the coach method for each subject ----
var METHODS = {
  maths: [
    { title: "UNDERSTAND", text: "Read the problem twice. What exactly are you asked to find? Which numbers or facts do you have?" },
    { title: "PLAN", text: "Which operation could help: adding, subtracting, multiplying, dividing? Have you seen a similar example in class?" },
    { title: "TRY", text: "Write your calculation step by step. Do not stay in your head: put it on paper!" },
    { title: "CHECK", text: "Is your answer logical? (A dog cannot weigh 900 kg!) Try the opposite operation to verify." }
  ],
  english: [
    { title: "UNDERSTAND", text: "What kind of task is it: reading, writing, grammar, vocabulary? What is the exact instruction?" },
    { title: "PLAN", text: "Find the key words. For grammar, which rule do you think applies? Look at your notebook examples." },
    { title: "TRY", text: "Write your answer, then read it out loud. Your ears can catch mistakes your eyes miss!" },
    { title: "CHECK", text: "Did you answer the whole question? Check spelling, capital letters and punctuation." }
  ],
  science: [
    { title: "UNDERSTAND", text: "What is the question really asking? Which science words are important?" },
    { title: "PLAN", text: "What do you already know about this topic? Can you draw or sketch it?" },
    { title: "TRY", text: "Explain your idea in your own words, like you would to a friend." },
    { title: "CHECK", text: "Does your explanation make sense? Can you find one detail in your book or notes that confirms it?" }
  ],
  history: [
    { title: "UNDERSTAND", text: "What is asked: a date, a reason, a person, a place? Underline the key words of the question." },
    { title: "PLAN", text: "In what order did things happen? A timeline can help you see it clearly." },
    { title: "TRY", text: "Write your answer using your own words. Give an example or a proof." },
    { title: "CHECK", text: "Did you answer with facts you learned, not just with your opinion?" }
  ],
  other: [
    { title: "UNDERSTAND", text: "Read the instruction slowly. What exactly must you do? What is the result you need to produce?" },
    { title: "PLAN", text: "Cut the big task into small steps. What is the very first small step you can do right now?" },
    { title: "TRY", text: "Do that first step completely. Then the next one. Small steps climb big mountains!" },
    { title: "CHECK", text: "Look at your work again with fresh eyes. Did you follow all the instructions?" }
  ]
};

// General hints, given one at a time, NEVER the answer.
var HINTS = [
  "Take a deep breath. You learn best when you are calm.",
  "Say the question out loud in your own words. If you cannot explain it, you have not fully understood it yet.",
  "Look at your class notes or textbook: is there a similar example you can compare with?",
  "Try to solve just a small piece of the problem. A small success gives you energy for the rest.",
  "Still stuck? Write down exactly WHAT you do not understand. Then bring that precise question to your teacher: this is what excellent students do."
];

// ---- 2. THE MEMORY: variables that remember things ----
var chosenSubject = null;
var hintCount = 0;

// ---- 3. HELPERS: small functions to show and hide sections ----
function show(id) {
  document.getElementById(id).classList.remove("hidden");
}
function hide(id) {
  document.getElementById(id).classList.add("hidden");
}

// ---- 4. THE REACTIONS: what happens when the user clicks ----

// When a subject button is clicked:
document.querySelectorAll(".subject").forEach(function (button) {
  button.addEventListener("click", function () {
    chosenSubject = button.dataset.subject;
    hide("step-subject");
    show("step-question");
  });
});

// When the student starts coaching:
document.getElementById("start-coach").addEventListener("click", function () {
  var steps = METHODS[chosenSubject];
  var list = document.getElementById("method-steps");
  list.innerHTML = "";
  steps.forEach(function (step, index) {
    var box = document.createElement("div");
    box.className = "method-step";
    box.innerHTML = "<strong>Step " + (index + 1) + " - " + step.title + ":</strong> " + step.text;
    list.appendChild(box);
  });
  var names = { maths: "Maths", english: "English / French", science: "Science", history: "History / Geography", other: "your subject" };
  document.getElementById("subject-reminder").textContent = "Coach mode: " + names[chosenSubject] + ". I believe in you!";
  hintCount = 0;
  hide("step-question");
  hide("hint-box");
  hide("celebration");
  hide("restart-btn");
  show("step-coach");
});

// Hint button: reveals hints one by one:
document.getElementById("hint-btn").addEventListener("click", function () {
  var hint = HINTS[Math.min(hintCount, HINTS.length - 1)];
  var box = document.getElementById("hint-box");
  box.innerHTML = "<strong>Hint " + (hintCount + 1) + ":</strong> " + hint;
  show("hint-box");
  hintCount = hintCount + 1;
});

// Celebration button:
document.getElementById("done-btn").addEventListener("click", function () {
  var celebration = document.getElementById("celebration");
  celebration.innerHTML = "&#127881; Congratulations! You found the answer YOURSELF. &#127881;<br>That is called learning. See you at the next homework!";
  show("celebration");
  show("restart-btn");
  hide("hint-box");
});

// Restart button:
document.getElementById("restart-btn").addEventListener("click", function () {
  hide("step-coach");
  show("step-subject");
  document.getElementById("question-box").value = "";
});
