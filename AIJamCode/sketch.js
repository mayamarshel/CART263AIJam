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

let timer = 0;
let waitLength = 60 * 4
let state = 'start'

let option1 = ['antyoga', 'beeflower', 'bulldozer', 'catbus', 'catpig', 'crabchair']
let option2 = ['crabrabbitfacepig', 'dogbunny', 'elephantpig', 'floweryoga', 'frogsofa', 'hedgeberry']
let option3 = ['lionsheep', 'monapassport', 'pigsheep', 'rabbitturtle', 'radioface', 'everything']



function setup() {
  createCanvas(750, 600);
  background(247, 171, 229);

  

       // // Button to reset drawing
  let button = createButton('clear');
  button.mousePressed(startDrawing);
   //button to change text
  // let button2 = createButton('next');
  // button2.mousePressed(changeValues('ant', 'butterfly', 'cactus', 'this is a test'));
}

function startStory(){
  if (state = 'actualStory') {
    model = ml5.sketchRNN(selectedValue);
    startDrawing()
      }
}


function startDrawing() {
  background(247, 171, 229)
  x = 300;
  y = 300;
  model.reset();
  // Generate the first stroke path
  model.generate(gotStroke);

}


function draw() {

  // If something new to draw
  if (strokePath) {
      //check if the pen is down to start drawing 
    if (previous_pen == 'down') {
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
    }
  }

  if (state === 'blackScreen'){
    countDown();
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
  console.log('value is ' + selectedValue)

  turnScreenBlack()
  state = 'blackScreen'

  
}


function changeValues(first, second, third, text){
  document.getElementById('text').innerText = text

  document.getElementById('option1').innerText = first
  document.getElementById('option2').innerText = second
  document.getElementById('option3').innerText = third

}

function turnScreenBlack() {
  document.body.style.backgroundColor = "black";
  background(0)
  push()
  fill(255)
  text('i do not understand', 300, 300)
  text('try again', 300, 330)
  pop()
//ADD CODE to change the button colors to black too
}

function countDown(){
  timer++;
  if (timer >= waitLength) {
    background(247, 171, 229)
    document.body.style.backgroundColor = "white";
    changeValues('yogabicycle', 'rabbitturtle', 'monapassport', 'we bought a ')
    state = 'actualStory'

    startStory()

}
}

function 






