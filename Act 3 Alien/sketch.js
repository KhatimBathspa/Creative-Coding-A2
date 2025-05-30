function setup() {
  createCanvas(500, 500);
  noStroke();
}

function draw() {
  background(0); 

  let centerX = width / 2;
  let centerY = height / 2;

  fill(255, 165, 0); 

  // --- Body ---
  ellipse(centerX, centerY, 150, 220); 

  // --- Head bumps  ---
  ellipse(centerX - 40, centerY - 130, 20, 20);
  ellipse(centerX + 40, centerY - 130, 20, 20);

  // --- One Eye ---
  fill(255); // White eye background
  ellipse(centerX, centerY - 50, 40, 40); 
  fill(0); // Pupil
  ellipse(centerX, centerY - 50, 15, 15);

  // --- Mouth ---
  fill(0);
  arc(centerX, centerY + 10, 50, 20, 0, PI); 

  // --- Legs ---
  fill(255, 165, 0);
  rect(centerX - 30, centerY + 110, 20, 50, 10);
  rect(centerX + 10, centerY + 110, 20, 50, 10);


  push();
  stroke(255, 165, 0);
  strokeWeight(8);
  noFill();

  // Left  arm
  beginShape();
  curveVertex(centerX - 75, centerY);
  curveVertex(centerX - 90, centerY - 20);
  curveVertex(centerX - 100, centerY + 20);
  curveVertex(centerX - 110, centerY - 10);
  endShape();

  // Right  arm
  beginShape();
  curveVertex(centerX + 75, centerY);
  curveVertex(centerX + 90, centerY - 20);
  curveVertex(centerX + 100, centerY + 20);
  curveVertex(centerX + 110, centerY - 10);
  endShape();

  pop();
}
