let song;
let fft;
let kickDetector;
let snareDetector;
let voiceDetector;

let panels;
let kickBall;
let circle_arr = [];
let sq_arr = [];

function preload() {
  song = loadSound('Audio.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  fft = new p5.FFT();
  fft.setInput(song);

  kickDetector = new BeatDetect('kick');
  snareDetector = new BeatDetect('snare');
  voiceDetector = new BeatDetect('male');

  panels = new Panels(6);
  kickBall = new BounceBall();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  drawGradientBackground();

  push();
  translate(width * 0.5, height * 0.5);

  const kick = kickDetector.update(fft);
  const snare = snareDetector.update(fft);
  const voice = voiceDetector.update(fft);

  if (snare.isBeat) panels.setColors();
  panels.run();

  kickBall.run(kick.isBeat);

  if (kick.isBeat) {
    if (random(1) <= 0.5) {
      circle_arr.push(new BeatStar(0, 0));
    } else {
      sq_arr.push(new BeatTriangle(0, 0));
    }
  }

  for (let i = circle_arr.length - 1; i >= 0; i--) {
    circle_arr[i].run();
    if (circle_arr[i].isDead()) circle_arr.splice(i, 1);
  }

  for (let i = sq_arr.length - 1; i >= 0; i--) {
    sq_arr[i].run();
    if (sq_arr[i].isDead()) sq_arr.splice(i, 1);
  }

  pop();
  showSpectrum(fft);
}

function mouseClicked() {
  togglePlay();
}

function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}

function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color('#1e3c72'), color('#2a5298'), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function showSpectrum(fft) {
  let spectrum = fft.analyze();
  noFill();
  stroke(255, 150);
  strokeWeight(1.5);
  beginShape();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let y = map(spectrum[i], 0, 255, height, height * 0.4);
    vertex(x, y);
  }
  endShape();
}

class BounceBall {
  constructor() {
    this.maxR = 80;
    this.minR = 10;
    this.r = this.minR;
  }
  run(isBeat = false) {
    this.update(isBeat);
    this.display();
  }
  update(isBeat) {
    if (isBeat) this.r = this.maxR;
    this.r = max(this.r - 2, this.minR);
  }
  display() {
    fill(255, 255, 150, 150);
    noStroke();
    ellipse(0, 0, this.r);
    fill(255, 255, 255, 80);
    ellipse(0, 0, this.r * 1.5);
  }
}

class Panels {
  constructor(n) {
    this.n = n;
    this.lifemax = 300;
    this.life = 0;
    this.colors = [];
    this.setColors(n);
  }
  setColors() {
    this.n = Math.floor(random(5, 9));
    let palette = ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'];
    for (let i = 0; i < this.n; i++) this.colors.push(random(palette));
    this.life = this.lifemax;
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.alph = ('0' + Math.floor(map(this.life, this.lifemax, 0, 255, 100)).toString(16)).slice(-2);
    this.life = max(this.life - 4, 0);
  }
  display() {
    push();
    rotate(frameCount * 0.01);
    for (let i = 0; i < this.n; i++) {
      stroke(255);
      strokeWeight(2);
      fill(this.colors[i % this.colors.length] + this.alph);
      arc(0, 0, width + height, width + height, ((2 * PI) / this.n) * i, ((2 * PI) / this.n) * (i + 1), PIE);
    }
    pop();
  }
}

class BeatTriangle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.growth = 6;
    this.lifespan = 300;
    this.angle = random(TWO_PI);
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.size += this.growth;
    this.lifespan -= 2;
  }
  display() {
    push();
    rotate(this.angle);
    stroke(255, this.lifespan);
    noFill();
    triangle(this.x, this.y - this.size, this.x - this.size, this.y + this.size, this.x + this.size, this.y + this.size);
    pop();
  }
  isDead() {
    return this.lifespan < 0;
  }
}

class BeatStar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.m = 5;
    this.lifespan = 255;
    this.points = 5;
  }
  run() {
    this.update();
    this.display();
  }
  update() {
    this.r += this.m;
    this.lifespan -= 3.0;
  }
  display() {
    push();
    stroke(255, this.lifespan);
    noFill();
    strokeWeight(2);
    translate(this.x, this.y);
    beginShape();
    for (let i = 0; i < TWO_PI; i += TWO_PI / (this.points * 2)) {
      let radius = i % (TWO_PI / this.points) === 0 ? this.r : this.r * 0.5;
      let x = cos(i) * radius;
      let y = sin(i) * radius;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
  isDead() {
    return this.lifespan < 0;
  }
}

class BeatDetect {
  constructor(mode = 'kick', freq2) {
    if (!isNaN(freq2) && !isNaN(mode)) {
      this.freq1 = mode;
      this.freq2 = freq2;
    } else {
      if (mode == 'snare') {
        this.freq1 = 2000;
        this.freq2 = 6000;
      } else if (mode == 'male') {
        this.freq1 = 200;
        this.freq2 = 2000;
      } else {
        this.freq1 = 20;
        this.freq2 = 80;
      }
    }
    this.time = 0;
    this.threshold = 0;
    this.minThreshold = 0;
    this.decayRate = 0.01;
    this.minThresholdRate = 0.8;
    this.holdTime = 45;
    this.marginThresholdTime = 10;
    this.marginThreshold = 0.06;
  }
  update(fft) {
    const e = fft.getEnergy(this.freq1, this.freq2);
    const level = e / 255.0 || 0.0;
    let isBeat = false;
    if (level > this.threshold && level > this.minThreshold) {
      this.threshold = level * 1.05;
      this.minThreshold = max(this.minThreshold, level * this.minThresholdRate);
      if (this.time > this.marginThresholdTime) isBeat = true;
      this.time = 0;
    } else {
      if (this.time == this.marginThresholdTime) this.threshold -= this.marginThreshold;
      this.time += 1;
      if (this.time > this.holdTime) this.threshold -= this.decayRate;
    }
    return { threshold: this.threshold, level: level, isBeat: isBeat };
  }
}
