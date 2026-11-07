// ===== script.js =====
// This file is the BRAIN of the app.

// ---- 1. THE DATA ----
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

// Only 3 hints. After that, the coach changes strategy!
var HINTS = [
  "Take a deep breath. You learn best when you are calm.",
  "Say the question out loud in your own words. If you cannot explain it, you have not fully understood it yet.",
  "Look at your class notes or textbook: is there a similar example you can compare with?"
];

// After the 3 hints, the app suggests helpful ACTIONS instead.
var HELPFUL_THINGS = [
  "Try an easier, similar exercise from your book. Solve it, then come back to this one.",
  "Ask a friend to explain HOW they would start, not the answer.",
  "Ask a parent to read the question with you: sometimes saying it out loud is enough.",
  "Work on another part of your homework first, then come back with fresh eyes.",
  "Take a 5-minute break: water, stretch, breathe. Your brain solves problems even while you rest!",
  "Write down exactly what you do not understand, and bring that precise question to your teacher. This is what excellent students do."
];

// ---- 2. THE MEMORY ----
var chosenSubject = null;
var hintCount = 0;
var cameraStream = null; // remembers if the camera is open

// ---- 3. HELPERS ----
function show(id) { document.getElementById(id).classList.remove("hidden"); }
function hide(id) { document.getElementById(id).classList.add("hidden"); }

// A polite program always stops the camera when it is not needed.
function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(function (track) { track.stop(); });
    cameraStream = null;
  }
  hide("camera-video");
  hide("snap-btn");
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

// NEW: open the camera and show it LIVE in the <video>.
// getUserMedia asks the user for permission, then gives a video stream.
document.getElementById("open-camera-btn").addEventListener("click", function () {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(function (stream) {
        cameraStream = stream;
        var video = document.getElementById("camera-video");
        video.srcObject = stream; // the video plays the camera stream
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

// NEW: take the picture when the student presses "Snap!".
// We draw the live image onto an invisible canvas (a drawing sheet),
// then save it as a picture.
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

  stopCamera(); // clean up: we are done with the camera
});

// Start coaching:
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

  // Show the photo again next to the method, if the student took one.
  if (document.getElementById("photo-preview").classList.contains("hidden") === false) {
    show("coach-photo");
  }

  hintCount = 0;
  document.getElementById("hint-btn").innerHTML = "&#128161; Give me a hint (3 max)";
  hide("step-question");
  hide("hint-box");
  hide("helpful-box");
  hide("celebration");
  hide("restart-btn");
  show("step-coach");
});

// Hint button: 3 hints, then helpful things to do.
document.getElementById("hint-btn").addEventListener("click", function () {
  if (hintCount < HINTS.length) {
    var hint = HINTS[hintCount];
    var box = document.getElementById("hint-box");
    box.innerHTML = "<strong>Hint " + (hintCount + 1) + " of 3:</strong> " + hint;
    show("hint-box");
    hintCount = hintCount + 1;
    if (hintCount === HINTS.length) {
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
  var celebration = document.getElementById("celebration");
  celebration.innerHTML = "&#127881; Congratulations! You found the answer YOURSELF. &#127881;<br>That is called learning. See you at the next homework!";
  show("celebration");
  show("restart-btn");
  hide("hint-box");
  hide("helpful-box");
});

// Restart:
document.getElementById("restart-btn").addEventListener("click", function () {
  stopCamera();
  hide("step-coach");
  show("step-subject");
  document.getElementById("question-box").value = "";
  hide("photo-preview");
  hide("coach-photo");
});
