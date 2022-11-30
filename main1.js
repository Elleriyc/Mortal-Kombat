let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;

let subHurt = new Image();
subHurt.src = "/src/SubZero/Sub_hurt.png"

let subIdle = new Image();
subIdle.src = "/src/SubZero/Sub_idle.png";

let subKameha = new Image();
subKameha.src = "/src/SubZero/Sub_Kameha.png"

let subKick = new Image();
subKick.src = "/src/SubZero/Sub_kick.png"

let subOneTwo = new Image();
subOneTwo.src = "/src/SubZero/Sub_OneTwo.png"

let subRun = new Image();
subRun.src = "/src/SubZero/Sub_Run.png"

let subWalking = new Image();
subWalking.src = "/src/SubZero/Sub_Walk.png"


subHurt.onload = function() {
  init();
};

subIdle.onload = function() {
  init();
};

subKameha.onload = function() {
  init();
};


subKick.onload = function() {
  init();
};

subOneTwo.onload = function() {
  init();
};

subRun.onload = function() {
  init();
};

subWalking.onload = function() {
  init();
};

const scale = 2;
const hauteur = 112;
const scaledHeight = scale * hauteur;

const subHurtLoop = [0,1,2,3,4];
const subIdleLoop = [0,1,2,3,4,5,6,7];
const subKamehaLoop = Array.from(Array(13).keys())
const subKickLoop = [0,1,2,3,4];
const subOneTwoLoop = [0,1,2,3,4,5];
const subRunLoop = [0,1,2,3,4,5];
const subWalkingLoop = [0,1,2,3,4,5,6,7];

let currentLoopIndex = 0;
let frameCount = 0;
let x = 0;

let move = false;

window.addEventListener("keydown", (event) => {
     if (event.defaultPrevented) {
       return; // Do nothing if the event was already processed
     }
     switch (event.key){
          case "ArrowRight":
               move = true;
               x = x + 3;
               
               break;
          case "ArrowLeft":
               move = true;
               x = x - 3;
               break;
     default:
          return;
     }
     event.preventDefault();
},true);

function drawFrame(img, largeur, frameX, frameY/*canvasX*/,canvasY){
    ctx.drawImage(img, frameX * largeur, frameY * hauteur, largeur, hauteur, /*canvas*/x, canvasY, scale * largeur, scaledHeight);
}

function hurtSubzero(){
  frameCount++;
  if (frameCount < 120) {
    window.requestAnimationFrame(hurtSubzero);
    return;
  }
  frameCount = 0;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame( subHurt, 96, subHurtLoop[currentLoopIndex], 0, 0, 0);

  currentLoopIndex ++;
  if (currentLoopIndex >= subHurtLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(hurtSubzero);
}

function idleSubzero(){
  frameCount++;
  if (frameCount < 120) {
    window.requestAnimationFrame(idleSubzero);
      ctx.font = '48px serif';
      ctx.fillText(x, 50, 300);
    return;
  }
  frameCount = 0;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame( subIdle, 48, subIdleLoop[currentLoopIndex], 0, 0, 0);

  currentLoopIndex ++;
  if (currentLoopIndex >= subIdleLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(idleSubzero);
} 

function kamehaSubzero(){
  frameCount++;
  if (frameCount < 30) {
    window.requestAnimationFrame(kamehaSubzero);
    return;
  }
  frameCount = 0;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame( subKameha, 112, subKamehaLoop[currentLoopIndex], 0, 0, 0);

  currentLoopIndex ++;
  if (currentLoopIndex >= subKamehaLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(kamehaSubzero);
} 

function kickSubzero(){
  frameCount++;
  if (frameCount < 30) {
    window.requestAnimationFrame(kickSubzero);
    return;
  }
  frameCount = 0;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(subKick, 80,subKickLoop[currentLoopIndex], 0, 0, 0);

  currentLoopIndex ++;
  if (currentLoopIndex >= subKickLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(kickSubzero);

}
function oneTwoSubzero(){
     frameCount++;
     if (frameCount < 30) {
       window.requestAnimationFrame(oneTwoSubzero);
       return;
     }
     frameCount = 0;
     
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     drawFrame(subOneTwo, 64,subOneTwoLoop[currentLoopIndex], 0, 0, 0);
   
     currentLoopIndex ++;
     if (currentLoopIndex >= subOneTwoLoop.length) {
       currentLoopIndex = 0;
     }
     window.requestAnimationFrame(oneTwoSubzero);
   
   }

function runSubzero(){
  frameCount++;
  if (frameCount < 60) {
    window.requestAnimationFrame(runSubzero);
    return;
  }
  frameCount = 0;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(subRun, 48,subRunLoop[currentLoopIndex], 0, 0, 0);

  currentLoopIndex ++;
  if (currentLoopIndex >= subRunLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(runSubzero);

}

function walkSubzero(){
  frameCount++;
  if (frameCount < 120) {
    window.requestAnimationFrame(walkSubzero);
      ctx.font = '48px serif';
      ctx.fillText(x, 50, 300);
    return;
  }
  frameCount = 0;

  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(subWalking, 48,subWalkingLoop[currentLoopIndex], 0, 0);

  currentLoopIndex ++;
  if (currentLoopIndex >= subWalkingLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(walkSubzero);

}



function init() {
  //drawFrame(0, 0, 0, 0);

  if (x > 100){
     window.requestAnimationFrame(walkSubzero);
  }
  else{
     window.requestAnimationFrame(idleSubzero);
  }
}