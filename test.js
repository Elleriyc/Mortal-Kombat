let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;

const SCALE = 2;
const HEIGHT = 112;
const SCALED_HEIGHT = SCALE * HEIGHT;
const CYCLE_LOOP = [0, 1, 0, 2];

const subHurtLoop = [0,1,2,3,4];
const subIdleLoop = [0,1,2,3,4,5,6,7];
const subKamehaLoop = Array.from(Array(13).keys())
const subKickLoop = [0,1,2,3,4];
const subOneTwoLoop = [0,1,2,3,4,5];
const subRunLoop = [0,1,2,3,4,5];
const subWalkingingLoop = [0,1,2,3,4,5,6,7];


let keyPresses = {};
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 0;
let positionY = 0;

let x = 0;

let subHurt = new Image();
let subIdle = new Image();
let subKameha = new Image();
let subKick = new Image();
let subOneTwo = new Image();
let subRun = new Image();
let subWalking = new Image();

var time = 0;
var time_framerate = 100; //in milliseconds'

function loadImage() {

     subHurt.src = "/src/SubZero/Sub_hurt.png"
     subIdle.src = "/src/SubZero/Sub_idle.png";
     subKameha.src = "/src/SubZero/Sub_Kameha.png"
     subKick.src = "/src/SubZero/Sub_kick.png"
     subOneTwo.src = "/src/SubZero/Sub_OneTwo.png"
     subRun.src = "/src/SubZero/Sub_Run.png"
     subWalking.src = "/src/SubZero/Sub_Walk.png";

     subHurt.onload = function() {
     window.requestAnimationFrame(gameLoop);
     }
}

let x = 0;

var time = 0;
var time_framerate = 100; //in milliseconds'

window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
     keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
     keyPresses[event.key] = false;
}

function drawFrame(image, largeur, frameX, frameY,canvasY){
     ctx.drawImage(image, frameX * largeur, frameY * HEIGHT, largeur, HEIGHT, /*canvas*/x, canvasY, SCALE * largeur, SCALED_HEIGHT);
}

loadImage();

function gameLoop(timestamp) {
     if(timestamp > time + time_framerate) {
          time = timestamp;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          let hasMoved = false;

          if (keyPresses.a) {
               x -= 10;
               hasMoved = true;
          } else if (keyPresses.d) {
               x += 10;
               hasMoved = true;
          }

          if (hasMoved) {
               currentLoopIndex++;
               if (currentLoopIndex >= subIdleLoop.length) {
                    currentLoopIndex = 0;
          }
               drawFrame(subIdle,48,subIdleLoop[currentLoopIndex], 0, 0);
          }

          if (!hasMoved) {
               currentLoopIndex++;
               if (currentLoopIndex >= subRunLoop.length) {
                    currentLoopIndex = 0;
               }
               drawFrame(subRun, 48,subRunLoop[currentLoopIndex], 0 , 0 );
          }
     }

     window.requestAnimationFrame(gameLoop);
}

