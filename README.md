# Appli_Maddly

**Homework Helper** - a web application created by Maddly (Grade 6, IB school) for a school project.

## The idea

Students often want the answer. This app never gives the answer.
It works like a **coach**: it guides students through a method in 4 steps
(Understand, Plan, Try, Check) so they find the answer by themselves.

## How to use it

1. Choose your subject.
2. Type your homework question and (optional) take a picture of your exercise
   directly with the camera: the app opens a live camera view and a "Snap!" button.
3. Follow the 4 steps of the Coach Method. Your picture stays visible next to the steps.
4. If you are stuck, click "Give me a hint": you get 3 hints maximum.
5. After the 3 hints, the app gives a list of helpful things to do instead
   (try an easier exercise, ask a friend, take a break, prepare a precise question for the teacher...).
6. When you succeed, click "I did it!" and celebrate.

Note: the camera needs to be used in a secure context (opened as a local file, localhost,
or an https page). The browser will ask for camera permission the first time.

## How it is built (Maddly's first web app!)

| File | Role |
|------|------|
| index.html | The skeleton of the page (titles, buttons, boxes, live camera view) |
| style.css | The style (colors, round shapes, layout) |
| script.js | The brain (clicks, the coach method, hints, helpful actions, live camera) |

Built with plain HTML, CSS and JavaScript: no complicated tools, perfect for learning.
Concepts learned: conditions (if / else), arrays and loops, events, getUserMedia (live camera),
the canvas drawing sheet, and cleaning up resources (stopping the camera).

## Try it locally

Download the 3 files in the same folder and double-click on `index.html`.
It opens in any web browser. That is all!

---

*Made with the help of an AI coding assistant, but every design decision was Maddly's.*
