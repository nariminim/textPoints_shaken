let points = [];
let x = 20;
let fsize = 200;
let y = fsize;
let txt = "hello";
let font;
let changeTarget = false;
let inputBox;

function preload() {
  font = loadFont("asset/BebasNeue-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(fsize);
  points = font.textToPoints(txt, x, y, fsize);
  // 오브젝트 키워드 추가하기...
  for (let point of points) {
    point["targetPos"] = { x: random(width), y: random(height) };
    point["originalPos"] = { x: point.x, y: point.y };
    point["color"] = color(random(150, 255), random(100, 220), 50, 100);
  }

  inputBox = createInput("hello");
  inputBox.changed(updateText);
  inputBox.position(20, 250);
  inputBox.size(150, 30);
}
function updateText() {
  txt = inputBox.value();
  points = font.textToPoints(txt, x, y, fsize);
  // 키워드 추가하기
  for (let point of points) {
    point["targetPos"] = { x: random(width), y: random(height) };
    point["originalPos"] = { x: point.x, y: point.y };
    point["color"] = color(random(150, 255), random(100, 200), 100);
  }
  changeTarget = true;
}

function draw() {
  background("#f8f4edff");
  //text(txt, x, y); d

  beginShape();
  for (let p of points) {
    p.x = lerp(p.x, p.targetPos.x, 0.1);
    p.y = lerp(p.y, p.targetPos.y, 0.1);
    //vertex(p.x, p.y);
    // fill(0);
    // noStroke();
    //fill(255, 200, 0, 50);
    fill(p.color);
    stroke("#ff6cc9ff");
    circle(p.x, p.y, 10);
  }
  endShape();
}

function mousePressed() {
  for (let point of points) {
    if (changeTarget) {
      point.targetPos.x = random(width);
      point.targetPos.y = random(height);
    } else {
      point.targetPos.x = point.originalPos.x;
      point.targetPos.y = point.originalPos.y;
    }
  }
  changeTarget = !changeTarget;
}

function touchStarted() {
  for (let point of points) {
    if (changeTarget) {
      point.targetPos.x = random(width);
      point.targetPos.y = random(height);
    } else {
      point.targetPos.x = point.originalPos.x;
      point.targetPos.y = point.originalPos.y;
    }
  }
  changeTarget = !changeTarget;
}

function deviceShaken() {
  for (let point of points) {
    if (changeTarget) {
      point.targetPos.x = random(width);
      point.targetPos.y = random(height);
    } else {
      point.targetPos.x = point.originalPos.x;
      point.targetPos.y = point.originalPos.y;
    }
  }
  changeTarget = !changeTarget;
}
