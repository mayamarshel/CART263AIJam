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

let selectedValue = 'blank'

 //position for the start of the drawing
let position = 0;

let modelStart = false;


function setup() {
  createCanvas(900, 750);
  background(247, 171, 229);

  

       // // Button to reset drawing
       // let button = createButton('clear');
       // button.mousePressed(startDrawing);
   //button to change text
  let button2 = createButton('next');
  button2.mousePressed(changeValues);
  

}

function keyPressed(){
  push();
  fill(255);
  text('loading...', 10, 350)
  pop();

  if (selectedValue != 'blank') {
    model = ml5.sketchRNN(selectedValue);
    startDrawing();  }
}


function startDrawing() {
  x = 50;
  y = 200;
  model.reset();
  // Generate the first stroke path
  model.generate(gotStroke);
  position = position + 50;
  console.log(position)
  console.log('i am drawing')
}



function draw() {

  // If something new to draw
  if (strokePath) {
      //check if the pen is down to start drawing 
    if (previous_pen == 'down') {
      fill(187, 131, 247)
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
    }
      // Move the pen
      //dividing the values by 2 gave it a cool sketchy look and it made the drawings smaller
    x += strokePath.dx;
    y += strokePath.dy;
      // the pen looks at the last stroke and bases its next move off the last one I'm guessing
    previous_pen = strokePath.pen;

      // If the drawing is complete
    if (strokePath.pen !== 'end') {
      strokePath = null;
      model.generate(gotStroke);
      selectedValue = 'blank'
      changeValues('ant', 'butterfly', 'cactus', 'this is a test');
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
  //getElementByClassName
}

function changeValues(first, second, third, text){
  document.getElementById('text').innerText = text

  document.getElementById('option1').innerText = first
  document.getElementById('option2').innerText = second
  document.getElementById('option3').innerText = third

}





