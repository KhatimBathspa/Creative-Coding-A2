function setup() {
  createCanvas(600, 400);
  noLoop();
}

function draw() {
  background(100, 120, 150); // sky gradient

  // Road
  fill(30);
  rect(0, 300, width, 100);

  // Shadow 
  fill(0, 100);
  noStroke();
  ellipse(300, 315, 350, 40);
  filter(BLUR, 3);


  fill(220, 60, 40); // Deep red
  noStroke();
  beginShape();
  vertex(120, 300); // Front bumper
  bezierVertex(150, 280, 180, 260, 220, 250); // front slope
  bezierVertex(280, 240, 320, 235, 380, 240); // Windshield curve
  bezierVertex(440, 245, 480, 260, 500, 280); // Rear slope
  vertex(480, 300); // Rear bumper
  endShape(CLOSE);

  // Carbon Fiber Spoiler
  fill(20);
  beginShape();
  vertex(480, 280);
  vertex(520, 265);
  vertex(525, 270);
  vertex(485, 285);
  endShape(CLOSE);

  // Side Air Intakes
  fill(15);
  quad(280, 280, 300, 265, 310, 280, 290, 295);
  quad(350, 280, 370, 265, 380, 280, 360, 295);

  // Windows (tinted)
  fill(10, 20, 30, 200);
  beginShape();
  vertex(230, 255);
  bezierVertex(280, 245, 320, 242, 370, 245);
  vertex(370, 270);
  bezierVertex(320, 265, 280, 268, 230, 275);
  endShape(CLOSE);

  // Wheels 
  // Front Wheel
  fill(40);
  ellipse(220, 305, 65, 60);
  fill(30);
  ellipse(220, 305, 50, 45);
  fill(180);
  ellipse(220, 305, 15, 15);
  // Spokes
  for (let i = 0; i < 5; i++) {
    push();
    translate(220, 305);
    rotate(i * TWO_PI / 5);
    rect(0, -3, 25, 6);
    pop();
  }

  // Rear Wheel (larger)
  fill(40);
  ellipse(430, 305, 75, 70);
  fill(30);
  ellipse(430, 305, 60, 55);
  fill(180);
  ellipse(430, 305, 20, 20);
  // Spokes
  for (let i = 0; i < 6; i++) {
    push();
    translate(430, 305);
    rotate(i * TWO_PI / 6);
    rect(0, -4, 30, 8);
    pop();
  }

  // Exhaust Pipes (chrome)
  fill(180, 190, 200);
  rect(490, 290, 8, 15);
  rect(505, 290, 8, 15);

  // Headlights (LED strips)
  fill(255, 250, 200);
  beginShape();
  vertex(130, 285);
  bezierVertex(140, 275, 160, 270, 180, 275);
  vertex(180, 280);
  bezierVertex(160, 275, 140, 280, 130, 290);
  endShape(CLOSE);

  // Taillights (LED clusters)
  fill(255, 50, 30);
  rect(480, 280, 20, 8);
  fill(255, 80, 0);
  rect(480, 290, 20, 5);
}