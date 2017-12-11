var mode = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll('.square');
var colorDisplay = document.querySelector('#colorDisplay');
var messageDisplay = document.querySelector('#message');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode');
var h1 = document.querySelector('h1');


init();

function init() {
    // modeButtons event listeners
    setModeButtons();    
    // add squares event listeners
    setSquares();
    // update everything we see
    reset();
}

resetButton.addEventListener('click', function() {
    reset();
});



///////////////////////////////////////////
// functions

function setModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function() {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');

            if (this.textContent === 'Easy') {
                mode = 3;
            } else if (this.textContent === 'Hard'){
                mode = 6;
            }

            reset();

        });
    }
}


function setSquares() {
    for (var i=0; i < squares.length; i++) {
        // add click listeners to squares
        squares[i].addEventListener('click', function() {
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                // you got it
                messageDisplay.textContent = 'You Got it!';
                // change all the squares to pickedColor
                changeColors(clickedColor);
                // change h1 background to pickedColor
                h1.style.backgroundColor = clickedColor;
                // change reset button to play again
                resetButton.textContent = 'Play Again!';
            } else {
                // try again
                messageDisplay.textContent = 'Try Again!';
                // dim off the square (change it's color to the color of the body)
                this.style.backgroundColor = '#232323';   
            }
        });
    }
}


function reset() {
    // generate all new colors
    colors = generateColors(mode);
    // pick a new random color from array
    pickedColor = colors[random(colors.length)];
    // update colorDisplay
    colorDisplay.textContent = pickedColor;
    // update colors of all squares
    for (var i=0; i < squares.length; i++) {
        // updating depending on the mode
        if (colors[i]) {
            // reshow all the squares (to see them if it's hard mode)
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
            // hide bottom 3 squares
        } else {
            squares[i].style.display = "none";
        }
    }
    // reset h1 background color
    h1.style.backgroundColor = 'steelblue';
    // change reset button to new game
    resetButton.textContent = 'New Colors';
    // empty message
    messageDisplay.textContent = '';
}


function changeColors(color) {
    for (var j = 0; j < squares.length; j++) {
        squares[j].style.backgroundColor = color;
    }
}


function generateColors(numOfColors) {
    var arr = [];
    for (var k = 0; k < numOfColors; k++) {
        // create an rgb color string
        var randomColor = 'rgb(' + random(256) + ', ' + random(256) + ', ' + random(256) + ')';
        // push rgb color string into colors array    
        arr.push(randomColor);   
    } 
    return arr;
}
    

function random(num) {
    return Math.floor(Math.random() * num);
}
