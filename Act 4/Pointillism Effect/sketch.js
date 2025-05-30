var img, x, y;

function preload() {

img = loadImage("Car image.jpg");

}


function setup() {

createCanvas (600, 600);

background(0);

noStroke();

}


function draw() {

x = random(width);

y = random(height);

var c = img.get(x, y); 
fill(c[0], c[1], c[2], 50);
ellipse (x, y, 30, 30);

}