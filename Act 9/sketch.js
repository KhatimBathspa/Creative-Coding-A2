let places = [
  "Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Desert Safari", "Dubai Marina",
  "Burj Al Arab", "Dubai Creek", "Global Village", "Dubai Aquarium", "Miracle Garden"
];
let values = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
let barColors = [];

function setup() {
  createCanvas(windowWidth, 700); // Increased height for visibility
  background('#EAF2EF');
  generatePastelColors();
}

function draw() {
  drawBarChart();
  noLoop(); // Draw once
}

function generatePastelColors() {
  for (let i = 0; i < places.length; i++) {
    let r = random(150, 255);
    let g = random(150, 255);
    let b = random(200, 255);
    barColors.push(color(r, g, b));
  }
}

function drawBarChart() {
  let barWidth = (width - 100) / places.length - 10;
  let startX = 50;
  let startY = height - 100;
  let cornerRadius = 10;

  // Title
  fill(30);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Favorite Places to Visit in Dubai", width / 2, 40);

  for (let i = 0; i < places.length; i++) {
    let barHeight = map(values[i], 0, 100, 0, height - 200);

    // Shadow
    fill(180);
    stroke(0, 20);
    rect(startX + i * (barWidth + 10) + 5, startY - barHeight + 3, barWidth, barHeight, cornerRadius);

    // Main bar
    noStroke();
    fill(barColors[i]);
    rect(startX + i * (barWidth + 10), startY - barHeight, barWidth, barHeight, cornerRadius);

    // Percentage label
    textSize(12);
    textAlign(CENTER);
    fill(0);
    text(values[i] + "%", startX + i * (barWidth + 10) + barWidth / 2, startY - barHeight - 10);

    // Place label below bar
    textSize(11);
    textAlign(CENTER, TOP);
    fill(0);
    text(places[i], startX + i * (barWidth + 10) + barWidth / 2, startY + 8, barWidth + 10);
  }
}
