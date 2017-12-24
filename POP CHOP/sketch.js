var bubbles = [], // Array of bubble data
    totalBubbles = 80; // Number of bubbles

var backgroundColor = '#66ffcc'; //to be used more than once 

var state = 0;

// var gameSong = "#"; Need to find a pop effect

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    //background(backgroundColor);
    function draw(){
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
  
}
//for loop one bubble at a time and add to bubbles array
    for (var i = 0; i < totalBubbles; i++) { 
        bubbles.push({          //push to bubble array instead of using a variable 
            x: random(0, width), //generate random x postions 
            y: height + 200, //genrate random y 
            diameter: random(50, 150),
            speed: random(1, 4),
            offset: 0, //increament offset in draw bubble
            textOpacity: 1
        });
    }
}

function draw() {
    background(backgroundColor);
    drawBubble();
    
}



//All Code relating to the bubble
function drawBubble() {

//for Each to edit over the bubble array in the draw function
    bubbles.forEach(function (bubble) { //pasing in bubble as an argument single bubble in the array
        if (bubble.offset > height + 400) { //resetting th offset to get towhere it started.
            bubble.offset = 0;
        }

        bubble.offset = bubble.offset + bubble.speed; //value of previous offset + random sppeed values, 0,5,10,15

        if (bubble.popped) {
            fill('rgba(0, 0, 0, ' + bubble.textOpacity + ')');
            textSize(24);
            textAlign(CENTER);
            text('*popped*', bubble.x, bubble.y - bubble.offset);

//making bubble go once clicked
            if (bubble.textOpacity > 0.01) {
                bubble.textOpacity = bubble.textOpacity - 0.01;
            } else {
                bubble.textOpacity = 0;
            }
        } else {
            // Drawing the bubble.
            fill('lightblue');
            stroke('white');
            strokeWeight(1);
            ellipse(bubble.x, bubble.y - bubble.offset, bubble.diameter, bubble.diameter);

            // Drawing of the shine to make it look more  like a bubble.
            fill('white');
            ellipse(
                bubble.x + (bubble.diameter * 0.2), //this makes the x position appear 0.2 from the diameter from the center point 
                bubble.y - (bubble.diameter * 0.25) - bubble.offset, //this makes the y position appear 0.2 from the diameter from the center point 
                bubble.diameter / 8,
                bubble.diameter / 8
            );
//Drawing another ellipse to draw over the shine to carve out a shape from the one behind it
// Using a slighty different position. offset'...'
            fill('lightblue');
            noStroke();
            ellipse(
                bubble.x + (bubble.diameter * 0.15),
                bubble.y - (bubble.diameter * 0.2) - bubble.offset,
                bubble.diameter / 8,
                bubble.diameter / 8
            );
        }
    });
}

function arrow() {
    
}
//checking if the bubble has been clicked
function wasClickInsideBubble(bubble) { //passing bubble as a parameter
    var bubbleRadius = bubble.diameter / 2; // do later

//if statement to check if the mouse is being cliced inside the bubble 
    if (
        (mouseX > bubble.x - bubbleRadius) &&  //mouse click to the right of bubble
        (mouseX < bubble.x + bubbleRadius) &&  //left of righ
        (mouseY > bubble.y - bubble.offset - bubbleRadius) && //offset,including actual position  
        (mouseY < bubble.y - bubble.offset + bubbleRadius)
    ) {
        return true;
    } else {
        return false;
    }
}

function mouseClicked() {
    bubbles.forEach(function (bubble) { //calling for edach bubble in the bubbles array
        if (wasClickInsideBubble(bubble)) {
            bubble.popped = true; //boolean value inside the bub ble so if thebubble is clicked then the status becomes popped
        }
        
    });
}
