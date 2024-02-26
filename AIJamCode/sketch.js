// Citations:
//ML5 SketchRNN framework- 
//Pippin: timers, use of random, 
//Mathilde: help with HTML changing 


 //model chosen: Initialize Model
let model;
 //pen settings like if it is drawing and where it is on the canvas
let previous_pen = 'down';
let x, y;
let strokePath;

 //position for the start of the drawing
let position = 0;

 //timer and length screen will appear before changing
let timer = 0;
let waitLength = 60 * 3
 //begins states
let state = 'start'

 //arrays for options to make piece different each time- allows for lots of exploration
let option1 = ['antyoga', 'beeflower', 'bulldozer', 'catbus', 'catpig', 'crabchair']
let option2 = ['crabrabbitfacepig', 'dogbunny', 'elephantpig', 'floweryoga', 'frogsofa', 'hedgeberry']
let option3 = ['lionsheep', 'monapassport', 'pigsheep', 'rabbitturtle', 'radioface', 'everything']


function setup() {
  createCanvas(750, 600);
  background(247, 171, 229);

    //press button to draw with selectedValue
  let button = createButton('draw');
  button.mousePressed(startDrawing);
}

function startStory(){
    //if on correct screen start loading model and drawing 
  if (state = 'actualStory') {
    model = ml5.sketchRNN(selectedValue);
    startDrawing()
      }
}


function startDrawing() {
    //resets background, sets pen position, generates strokes. I think it generates stroke by stroke and checks previous stroke to 
    //establish next one
  background(247, 171, 229)
  x = 300;
  y = 300;
  model.reset();
  // Generate the first stroke path
  model.generate(gotStroke);

}


function draw() {
    //if pen is down draw stroke, then check stroke and base next on off of previous
  if (strokePath) {
      //check if the pen is down to start drawing 
    if (previous_pen == 'down') {
      stroke(0);
      strokeWeight(3.0);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
    }
    x += strokePath.dx;
    y += strokePath.dy;
    previous_pen = strokePath.pen;

      // if the drawing is complete then set stroke path to null to stop it 
    if (strokePath.pen !== 'end') {
      strokePath = null;
      model.generate(gotStroke);
    }
  }
   //start timer if black screen is up
  if (state === 'blackScreen'){
    countDown();
  }
}
   //new stroke path to follow
function gotStroke(err, s) {
  strokePath = s;
}


//CODE FOR DROPDOWN MENU
function selectOption() {
    //creates and fills drop down menu with text and fills selectedValue variable with what the user clicks on
  let dropdown = document.getElementById('dropdown');
  let selectedIndex = dropdown.selectedIndex;
  selectedValue = dropdown.options[selectedIndex].text;
  console.log('value is ' + selectedValue)

    //turns screen black or starts story if on correct screen  
  if (state === 'start'){
    turnScreenBlack()
    state = 'blackScreen'}
    else if (state === 'actualStory') {
      startStory()
    }

  
}

function turnScreenBlack() {
    //turns canvas and window screen to black and displays text 
  document.body.style.backgroundColor = "black";
  background(0)
  push()
  fill(255)
  text('i do not understand', 300, 300)
  text('try again', 300, 330)
  pop()
  const dropDown = document.getElementById('dropDown');

    // Apply black background color using JavaScript
  dropDown.style.backgroundColor = "black";

//ADD CODE to change the button colors to black too
}

function countDown(){
    //counts down to the waitlength on the black screen and then changes it back to original colors
  timer++;
  if (timer >= waitLength) {
    background(247, 171, 229)
    document.body.style.backgroundColor = "white";
      //calls change value function and sets parameters using random value function to pick a random value from 
      //the respective arrays 
    changeValues(randomValue(option1), randomValue(option2), randomValue(option2), 'we bought a ')
    state = 'actualStory'
    }

}

function changeValues(first, second, third, text){
  //initial function for changing values by parameters for dropdown 
document.getElementById('text').innerText = text

document.getElementById('option1').innerText = first
document.getElementById('option2').innerText = second
document.getElementById('option3').innerText = third
}

function randomValue(array){
    //selects random number and rounds it, gets a random index from the appropriate array and returns the value in that index 
  const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}






