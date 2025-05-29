function setup() {
  createCanvas(600, 400);
  background(50);
}

function draw() {
  background(50);


  fill(30);
  rect(0, 300, width, 100);

  // Car body
  fill(0);
  rect(180, 250, 240, 50, 10);       // main body code
  rect(220, 220, 160, 40, 10);       // top body code

  // Windows
  fill(100);
  rect(230, 230, 50, 25, 5);
  rect(295, 230, 50, 25, 5);

  // Wheels
  fill(20);
  ellipse(210, 305, 40, 40);
  ellipse(370, 305, 40, 40);

  // Wheel caps
  fill(100);
  ellipse(210, 305, 15, 15);
  ellipse(370, 305, 15, 15);

  // Headlights
  fill(255, 255, 100);
  ellipse(420, 270, 15, 10);
  fill(255, 255, 150, 80);  // light beam
  noStroke();
  triangle(430, 270, 600, 260, 600, 280);

  // Tail lights
  fill(255, 50, 50);
  ellipse(180, 270, 10, 10);
}
