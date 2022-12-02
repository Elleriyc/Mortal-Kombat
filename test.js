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
const subWalkingLoop = [0,1,2,3,4,5,6,7];


let keyPresses = {};
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 0;
let positionY = 0;


let img = new Image();
let subWalk = new Image();

let x = 0;




var time = 0;
var time_framerate = 100; //in milliseconds'

//

window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}

function loadImage() {
  subWalk.src = "/src/SubZero/Sub_Walk.png";
  subWalk.onload = function() {
    window.requestAnimationFrame(gameLoop);
  };

  img.src = "/src/SubZero/Sub_idle.png";
     img.onload = function() {
       window.requestAnimationFrame(gameLoop);
     };
}



/*function drawFrame(image,largeur, frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(image,
                frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
                canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
}*/
function drawFrame(img, largeur, frameX, frameY/*canvasX*/,canvasY){
     ctx.drawImage(img, frameX * largeur, frameY * HEIGHT, largeur, HEIGHT, /*canvas*/x, canvasY, SCALE * largeur, SCALED_HEIGHT);
 }

loadImage();

function gameLoop(timestamp) {
     if(timestamp > time + time_framerate) {
          time = timestamp;
     
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let hasMoved = false;

  if (keyPresses.a) {
    //moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
    x -= 10;
    hasMoved = true;
  } else if (keyPresses.d) {
    //moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
    x += 10;
    hasMoved = true;
  }

  if (hasMoved) {
      currentLoopIndex++;
      if (currentLoopIndex >= subWalkingLoop.length) {
        currentLoopIndex = 0;
    }
    drawFrame(subWalk,48,subWalkingLoop[currentLoopIndex], 0, 0);
  }

  if (!hasMoved) {
          currentLoopIndex++;
          if (currentLoopIndex >= subIdleLoop.length) {
            currentLoopIndex = 0;
     }
    drawFrame(img, 48,subIdleLoop[currentLoopIndex], 0 , 0 );
  }
}


  
  window.requestAnimationFrame(gameLoop);
}
//setInterval(gameLoop, 2000);

/*function moveCharacter(deltaX, deltaY, direction) {
  if (positionX + deltaX > 0 && positionX + SCALED_WIDTH + deltaX < canvas.width) {
    positionX += deltaX;
  }
  if (positionY + deltaY > 0 && positionY + SCALED_HEIGHT + deltaY < canvas.height) {
    positionY += deltaY;
  }
  currentDirection = direction;
}*/

