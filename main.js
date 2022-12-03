var V = SAT.Vector;
var P = SAT.Polygon;

// A square
var polygon1 = new P(new V(0,0), [
  new V(0,0), new V(40,0), new V(40,40), new V(0,40)
]);
// A triangle
var polygon2 = new P(new V(30,0), [
  new V(0,0), new V(30, 0), new V(0, 30)
]);
var response = new SAT.Response();
var collided = SAT.testPolygonPolygon(polygon1, polygon2, response);
console.log(collided); // true



let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const SCALE = 2;
const HEIGHT = 112;
const SCALED_HEIGHT = SCALE * HEIGHT;

const subHurtLoop = [0, 1, 2, 3, 4];
const subIdleLoop = [0, 1, 2, 3, 4, 5, 6, 7];
const subKamehaLoop = Array.from(Array(13).keys())
const subKickLoop = [0, 1, 2, 3, 4];
const subOneTwoLoop = [0, 1, 2, 3, 4, 5];
const subRunLoop = [0, 1, 2, 3, 4, 5];
const subWalkingingLoop = [0, 1, 2, 3, 4, 5, 6, 7];

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

let kanoHurt = new Image();
let kanoIdle = new Image();
let kanoKameha = new Image();
let kanoFreezed = new Image();
let kanoKick = new Image();
let kanoOneTwo = new Image();
let kanoRun = new Image();
let kanoWalking = new Image();

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

     kanoHurt.src = "/src/Kano/hurt.png";
     kanoIdle.src = "/src/Kano/idle.png";
     kanoKameha.src = "/src/Kano/kamehameha.png";
     kanoFreezed.src = "/src/Kano/Kano_freezed.png";
     kanoKick.src = "/src/Kano/kick.png";
     kanoOneTwo.src = "/src/Kano/OneTwo.png";
     kanoRun.src = "/src/Kano/run.png";
     kanoWalking.src = "/src/Kano/walking-sheet.png";

     subHurt.onload = function () {
          window.requestAnimationFrame(gameLoop);
     }
}

window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
     keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
     keyPresses[event.key] = false;
}

function drawFrame(image, largeur, frameX, frameY, canvasY) {
     ctx.drawImage(image, frameX * largeur, frameY * HEIGHT, largeur, HEIGHT, /*canvas*/x, canvasY, SCALE * largeur, SCALED_HEIGHT);
}

loadImage();

// function drawRect() {

//      let dm = 100;
//      let dp = -100;
//      ctx.beginPath();
//      ctx.fillStyle = "black";
//      ctx.strokeRect(290, 0, 70, 200);
//      ctx.fillStyle = "green";
//      ctx.fillRect(300, 0, 50, 200);
//      ctx.fillStyle = "black";
//      ctx.fillRect(dm, dp, 50, 50);
//      ctx.closePath();
// }

function gameLoop(timestamp) {
     if (timestamp > time + time_framerate) {
          time = timestamp;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          let hasMoved = false;
          let forward = true;
          let animation = true;

          if (keyPresses.a) {
               x -= 10;
               hasMoved = true;
               forward = false;
          } else if (keyPresses.d) {
               x += 10;
               hasMoved = true;
               forward = true;
          }

          if (hasMoved && forward) {
               currentLoopIndex++;
               if (currentLoopIndex >= subIdleLoop.length) {
                    currentLoopIndex = 0;
               }
               drawFrame(subWalking, 48, subWalkingingLoop[currentLoopIndex], 0, 0);
          } if (hasMoved && !forward) {
               if (currentLoopIndex == 0) {
                    currentLoopIndex = 7;
               }
               currentLoopIndex--;
               drawFrame(subWalking, 48, subWalkingingLoop[currentLoopIndex], 0, 0);
          } if (!hasMoved) {
               currentLoopIndex++;
               if (currentLoopIndex >= subRunLoop.length) {
                    currentLoopIndex = 0;
               }
               drawFrame(subIdle, 48, subIdleLoop[currentLoopIndex], 0, 0);
          }


          // if (keyPresses.z) {
          //      let s;
          //      s = s+10;
          //      ctx.fillStyle = "black";
          //      ctx.fillRect(s,0,10,10);
          // }

          if (keyPresses.k) {
               for (currentLoopIndex = 0; currentLoopIndex <= 4; currentLoopIndex++) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawFrame(subKick, 80, subKickLoop[currentLoopIndex], 0, 0);

            
                    // drawRect();
                    // m += dm;
                    // p += dp; 
                    // let subCollision = { x: currentLoopIndex[5], y: 0, width: 80, height: 112 };
                    // let rectCollision = { x: 290, y: 0, width: 120, height: 112 };
                    // if (currentLoopIndex == 5) {
                    //      if (subCollision.x < rectCollision.x + rectCollision.width
                    //           && subCollision.y < rectCollision.y + rectCollision.height) {
                    //           console.log("putain");
                    //           console.log("10 PV enlever");
                    //      }
                    // }
               }



          }





     }
     window.requestAnimationFrame(gameLoop);
}

// function subCollison() {


// }


// window.requestAnimationFrame(subCollison);