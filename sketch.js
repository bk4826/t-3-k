let font;
let t3points;
let canvas;
let particles = [];

function preload() {
  font = loadFont('GLSNECB.woff');
}

function windowResized() {
  canvas = resizeCanvas(windowWidth ,windowHeight - 5);
}

function setup() {
  // put setup code here
  canvas = createCanvas(windowWidth ,windowHeight - 5);
  
  textFont(font);
  textSize(438);
  fill(208);
  //noStroke();
  //text('T3K', 180, 490);
  points = font.textToPoints('T3K', windowWidth / 2.55, windowHeight / 1.55);
  
  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var particle = new Particle(pt.x,pt.y);
    particles.push(particle);
    


    //stroke(239,53,8);
    //stroke(238,238,238);
    //strokeWeight(9);
    //point(pt.x, pt.y);
  }

}

function draw() {
  background(18);
  for (var i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.behave();
    p.update();
    p.show();
  }
}