
var w = window.innerWidth;
var h = window.innerHeight;  

class Point {
  constructor(_x, _y){
    this.x = _x;
    this.y = _y;
  }
}

class Ball {
  
  constructor(_center, _radius, _blurPoint){
    this.center = _center;
    this.radius = _radius;
    this.flagX = true;
    this.flagY = true;
    this.tmp1 = random(-5, 5);
    this.tmp2 = random(-5, 5);
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);

    this.blurPoint = _blurPoint;
  }
  
  move(){
    if (this.flagX){
      this.center.x += this.tmp1;
    }
    else {
      this.center.x -= this.tmp1;
    }
    if (this.flagY){
      this.center.y += this.tmp2;
    }
    else {
      this.center.y -= this.tmp2;
    } 
  
    if (this.center.x + this.radius / 2 >= width){
      this.flagX = false;
      this.tmp1 = random(5);
    }
    else if (this.center.x - this.radius / 2 <= 0){
      this.flagX = true;
      this.tmp1 = random(5);
    }
  
    if (this.center.y + this.radius / 2 >= height){
      this.flagY = false;
      this.tmp2 = random(5);
    }
    else if (this.center.y - this.radius / 2 <= 0){
      this.flagY = true;
      this.tmp2 = random(5);
    }
  }
}

var tmp1;
var tmp2;
var arrSize = 1;
var ball = [];
var cnt = 0;
var fs;

function setup(){
  background(0);
  createCanvas(w, h);
  
  for (var i=0;i<arrSize;i++){
    center = new Point(random(0, width), random(0, height));
    tmp_ball = new Ball(center, random(80, 300), random(5, 20));
    ball.push(tmp_ball);
  }  
}

function draw(){
  clear();
  background(0);
  //fullscreen(true);
  noStroke();
  //noLoop();
  blendMode(ADD);
  
  for(var i=0;i<arrSize;i++){
    fill(ball[i].r, ball[i].g, ball[i].b);
    ellipse(ball[i].center.x, ball[i].center.y, ball[i].radius, ball[i].radius);
    drawingContext.filter = 'blur('+ball[i].blurPoint+'px)';
    ball[i].move();
  }
}

function mousePressed() {
  center = new Point(mouseX, mouseY);
  tmp_ball = new Ball(center, random(80, 300), random(5, 30));
  ball.push(tmp_ball);
  arrSize = ball.length;
}

//function mouseReleased() {
//  noLoop();
//}
