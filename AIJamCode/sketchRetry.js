// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
SketchRNN
=== */

let model;
let previous_pen = 'down';
let x, y;
let strokePath;

function setup() {
  createCanvas(750, 600);
  background(247, 171, 229);


       // // Button to reset drawing
  let button = createButton('clear');
  button.mousePressed(startDrawing);
   //button to change text
  // let button2 = createButton('next');
  // button2.mousePressed(changeValues('ant', 'butterfly', 'cactus', 'this is a test'));
  
  model = ml5.sketchRNN('face');
  startDrawing()
}

function setup() {
  createCanvas(640, 480);
  background(220);

  // Button to reset drawing
  let button = createButton('clear');
  button.mousePressed(startDrawing()  );
  
  // run sketchRNN
  startDrawing();
}

function modelReady() {
  console.log('model loaded');
  startDrawing();
}

// Reset the drawing
function startDrawing() {
  // Start in the middle
  x = width / 2;
  y = height / 2;
  model.reset();
  // Generate the first stroke path
  model.generate(gotStroke);
}

function draw() {
  // If something new to draw
  if (strokePath) {
    // If the pen is down, draw a line
    if (previous_pen == 'down') {
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
    }
    // Move the pen
    x += strokePath.dx;
    y += strokePath.dy;
    // The pen state actually refers to the next stroke
    previous_pen = strokePath.pen;

    // If the drawing is complete
    if (strokePath.pen !== 'end') {
      strokePath = null;
      model.generate(gotStroke);
    }
  }
}

// A new stroke path
function gotStroke(err, s) {
  strokePath = s;
}


//CODE FOR DROPDOWN MENU
function selectOption() {
    let dropdown = document.getElementById('dropdown');
    let selectedIndex = dropdown.selectedIndex;
    selectedValue = dropdown.options[selectedIndex].text;
    console.log('value is' + selectedValue)
    startDrawing
    //getElementByClassName
  }
  
  function changeValues(first, second, third, text){
    document.getElementById('text').innerText = text
  
    document.getElementById('option1').innerText = first
    document.getElementById('option2').innerText = second
    document.getElementById('option3').innerText = third
  
  }