let font;
let points;
let fontSize;
let basePoints = [];
let startTime;
let bounceDuration = 10000;  
let letterDelay = 10;      

function preload() {
  font = loadFont('BlackOps.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(LEFT, LEFT);
  fontSize = min(width * 0.07, 120);
  textSize(fontSize);
  let textStr = 'BATH SPA UNIVERSITY';
  let bounds = font.textBounds(textStr, 0, 0, fontSize);
  let x = width / 2 - bounds.w / 2;
  let y = height / 2 + bounds.h / 2;

  points = font.textToPoints(textStr, x, y, fontSize, {
    sampleFactor: 0.3,
    simplifyThreshold: 0
  });

  basePoints = points.map(pt => ({
    x: pt.x,
    finalY: pt.y,
    y: height + random(50, 150)
  }));

  startTime = millis();
  background(0);
}

function draw() {
  background(0);
  fill("#00FFFF");
  noStroke();
  let currentTime = millis() - startTime;

  basePoints.forEach((pt, i) => {
    let letterTime = i * letterDelay;
    let t = constrain((currentTime - letterTime) / bounceDuration, 0, 1);
    let bounceY = easeOutBounce(t);
    let y = lerp(pt.y, pt.finalY, bounceY);
    ellipse(pt.x, y, 5, 5);
  });
}

function easeOutBounce(t) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    t -= 1.5 / d1;
    return n1 * t * t + 0.75;
  } else if (t < 2.5 / d1) {
    t -= 2.25 / d1;
    return n1 * t * t + 0.9375;
  } else {
    t -= 2.625 / d1;
    return n1 * t * t + 0.984375;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
