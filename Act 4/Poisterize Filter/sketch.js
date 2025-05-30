let img;
let levels = 3;

function preload() {
  img = loadImage('Car image.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  image(img, 0, 0);
  applyPosterize(levels);
}

function applyPosterize(levels) {
  loadPixels();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;

      for (let i = 0; i < 3; i++) {
        let val = pixels[index + i];
        let step = 255 / (levels - 1);
        pixels[index + i] = round(val / step) * step;
      }
    }
  }

  updatePixels();
}
