let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;

let kanoHurt = new Image();
kanoHurt.src = "/src/Kano/hurt.png"

let kanoIdle = new Image();
kanoIdle.src = "/src/Kano/idle.png";

let kanoKameha = new Image();
kanoKameha.src = "/src/Kano/kamehameha.png"

let kanoFreezed = new Image();
kanoFreezed.src = "/src/Kano/Kano_freezed.png"

let kanoKick = new Image();
kanoKick.src = "/src/Kano/kick.png"

let kanoOneTwo = new Image();
kanoOneTwo.src = "/src/Kano/OneTwo.png"

let kanoRun = new Image();
kanoRun.src = "/src/Kano/run.png"

let kanoWalking = new Image();
kanoWalking.src = "/src/Kano/walking-sheet.png"


kanoHurt.onload = function() {
  init();
};

kanoIdle.onload = function() {
  init();
};

kanoKameha.onload = function() {
  init();
};

kanoFreezed.onload = function() {
  init();
};

kanoKick.onload = function() {
  init();
};

kanoOneTwo.onload = function() {
  init();
};

kanoRun.onload = function() {
  init();
};

kanoWalking.onload = function() {
  init();
};

const scale = 2;
const hauteur = 112;
const scaledHeight = scale * hauteur;

const kanoHurtLoop = [0,1,2,3,4];
const kanoIdleLoop = [0,1,2,3,4,5,6,7];
const kanoKamehaLoop = Array.from(Array(20).keys())
const kanoFreezedLoop = [0];
const kanoKickLoop = [0,1,2,3,4];
const kanoOneTwoLoop = [0,1,2,3,4,5];
const kanoRunLoop = [0,1,2,3,4,5];
const kanoWalkingLoop = [0,1,2,3,4,5,6,7];

let currentLoopIndex = 0;
let frameCount = 0;

function drawFrame(img, largeur, frameX, frameY,canvasX,canvasY){
    ctx.drawImage(img, frameX * largeur, frameY * hauteur, largeur, hauteur, canvasX, canvasY, scale * largeur, scaledHeight);
}

function hurtKano(){
  frameCount++;
  if (frameCount < 30) {
    window.requestAnimationFrame(hurtKano);
    return;
  }
  frameCount = 0;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame( kanoHurt, 96, kanoHurtLoop[currentLoopIndex], 0, 0, 0);

  currentLoopIndex ++;
  if (currentLoopIndex >= kanoHurtLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(hurtKano);
} 

function idleKano(){
  frameCount++;
  if (frameCount < 120) {
    window.requestAnimationFrame(idleKano);
    return;
  }
  frameCount = 0;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame( kanoIdle, 48, kanoIdleLoop[currentLoopIndex], 0, 0, 0);

  currentLoopIndex ++;
  if (currentLoopIndex >= kanoIdleLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(idleKano);
} 

function kamehaKano(){
  frameCount++;
  if (frameCount < 30) {
    window.requestAnimationFrame(kamehaKano);
    return;
  }
  frameCount = 0;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame( kanoKameha, 64, kanoKamehaLoop[currentLoopIndex], 0, 0, 0);

  currentLoopIndex ++;
  if (currentLoopIndex >= kanoKamehaLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(kamehaKano);
} 

function freezedKano(){
  frameCount++;
  if (frameCount < 30) {
    window.requestAnimationFrame(freezedKano);
    return;
  }
  frameCount = 0;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame( kanoFreezed, 48, kanoFreezedLoop[currentLoopIndex], 0, 0, 0);

  currentLoopIndex ++;
  if (currentLoopIndex >= kanoFreezedLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(freezedKano);
} 

function kickKano(){
  frameCount++;
  if (frameCount < 30) {
    window.requestAnimationFrame(kickKano);
    return;
  }
  frameCount = 0;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(kanoKick, 80,kanoKickLoop[currentLoopIndex], 0, 0, 0);

  currentLoopIndex ++;
  if (currentLoopIndex >= kanoKickLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(kickKano);

}

function oneTwoKano(){
  frameCount++;
  if (frameCount < 60) {
    window.requestAnimationFrame(oneTwoKano);
    return;
  }
  frameCount = 0;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(kanoOneTwo, 64,kanoOneTwoLoop[currentLoopIndex], 0, 0, 0);

  currentLoopIndex ++;
  if (currentLoopIndex >= kanoOneTwoLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(oneTwoKano);

}

function runKano(){
  frameCount++;
  if (frameCount < 120) {
    window.requestAnimationFrame(runKano);
    return;
  }
  frameCount = 0;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(kanoRun, 48,kanoRunLoop[currentLoopIndex], 0, 0, 0);

  currentLoopIndex ++;
  if (currentLoopIndex >= kanoRunLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(runKano);

}

function walkKano(){
  frameCount++;
  if (frameCount < 120) {
    window.requestAnimationFrame(walkKano);
    return;
  }
  frameCount = 0;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(kanoWalking, 48,kanoWalkingLoop[currentLoopIndex], 0, 0, 0);

  currentLoopIndex ++;
  if (currentLoopIndex >= kanoWalkingLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(walkKano);

}



function init() {
  //drawFrame(0, 0, 0, 0);
  window.requestAnimationFrame(walkKano);
}
