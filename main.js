let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;

const SCALE = 2;
const HEIGHT = 112;
const SCALED_HEIGHT = SCALE * HEIGHT;

const subHurtLoop = [0,1,2,3,4];
const subIdleLoop = [0,1,2,3,4,5,6,7];
const subKamehaLoop = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];//Array.from(Array(13).keys())
const subKickLoop = [0,1,2,3,4];
const subOneTwoLoop = [0,1,2,3,4,5];
const subRunLoop = [0,1,2,3,4,5];
const subWalkingingLoop = [0,1,2,3,4,5,6,7];

const kanoKamehaLoop = Array.from(Array(20).keys())
const kanoFreezedLoop = [0,0,0,0,0,0,0];

let keyPresses = {};
let currentLoopIndexSub = 0;
let currentLoopIndexKano = 0;
let frameCount = 0;
let positionX = 0;
let positionY = 0;

let pos_sub = 0;
let pos_kano = 300

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

let kick_sub = false;
let oneTwo_sub = false;
let kameha_sub = false;

let kick_kano = false;
let oneTwo_kano = false;
let kameha_kano = false;

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

}
loadImage();

window.addEventListener('keydown', keyDownListener);
function keyDownListener(event) {
     keyPresses[event.key] = true;
}

window.addEventListener('keyup', keyUpListener);
function keyUpListener(event) {
     keyPresses[event.key] = false;
}

function drawFrame(image, largeur, frameX, position){
     ctx.drawImage(image, frameX * largeur, 0 * HEIGHT, largeur, HEIGHT, position, 200, SCALE * largeur, SCALED_HEIGHT);
}

let sub_damaged = true;
let kano_damaged = false;
let freezed = true;


function animationsSubzero(){
     //animation de marche
     let hasMoved = false;
     let forward = true; 
     let sprint = false;
     
     

     if (keyPresses.a) {
          pos_sub -= 10;
          hasMoved = true;
          forward = false;
     } else if (keyPresses.d) {
          pos_sub += 10;
          hasMoved = true;
          forward = true;
     } else if (keyPresses.Shift){
          sprint = true;
          hasMoved = true;
          pos_sub += 25;
     } else if (keyPresses.e){
          kick_sub = true;
          currentLoopIndexSub = 0;
     } else if (keyPresses.r){
          oneTwo_sub = true;
          currentLoopIndexSub = 0;
     } else if(keyPresses.t){
          kameha_sub = true;
          currentLoopIndexSub = 0;
     }


     if (hasMoved && forward && !sprint) {
          if (currentLoopIndexSub >= subWalkingingLoop.length) {
               currentLoopIndexSub = 0;
          }
          drawFrame(subWalking,48,subWalkingingLoop[currentLoopIndexSub],pos_sub);
          currentLoopIndexSub++;
     }
     // animation de sprint vers l'avant
     else if (hasMoved && forward && sprint){ 
          if (currentLoopIndexSub >= subRunLoop.length) {
               currentLoopIndexSub = 0;
          }
          drawFrame(subRun,48,subRunLoop[currentLoopIndexSub],pos_sub);    
          currentLoopIndexSub++;
     }
     //animation de marche vers l'arriere
     else if (hasMoved && !forward) { 
          if (currentLoopIndexSub == 0){
               currentLoopIndexSub = 7;
          }
          drawFrame(subWalking,48,subWalkingingLoop[currentLoopIndexSub],pos_sub);
          currentLoopIndexSub--;
     }
     //animation d'idle
     else if (!hasMoved && !kick_sub && !oneTwo_sub && !kameha_sub && !sub_damaged){
          if(currentLoopIndexSub == (subIdleLoop.length - 1)){
               currentLoopIndexSub = 0;
          }
          drawFrame(subIdle, 48, subIdleLoop[currentLoopIndexSub],pos_sub)
          currentLoopIndexSub++;
     }
     // animation de coups de pieds
     else if (kick_sub){
          if (currentLoopIndexSub >= subKickLoop.length) {
               currentLoopIndexSub = 0;
               kick_sub = false;
          }
          drawFrame(subKick,80,subKickLoop[currentLoopIndexSub],pos_sub);
          currentLoopIndexSub++;
     }
     // animation jab droite
     else if (oneTwo_sub){
          if (currentLoopIndexSub >= subOneTwoLoop.length) {
               currentLoopIndexSub = 0;
               oneTwo_sub = false;
          }
          drawFrame(subOneTwo,64,subOneTwoLoop[currentLoopIndexSub],pos_sub);
          currentLoopIndexSub++;
     }
     else if (kameha_sub){
          if (currentLoopIndexSub >= subKamehaLoop.length) {
               currentLoopIndexSub = 0;
               kameha_sub = false;
          }
          drawFrame(subKameha,112,subKamehaLoop[currentLoopIndexSub],pos_sub);
          currentLoopIndexSub++;
     }
     //subzero au sol
     else if (sub_damaged){
          if(currentLoopIndexSub >= subHurtLoop.length) {
               currentLoopIndexSub = 0
               sub_damaged = false;
          }
          drawFrame(subHurt,96, subHurtLoop[currentLoopIndexSub],pos_sub);
          currentLoopIndexSub++;
     }
}
     

function animationsKano(){
     //animation de marche
     let k_hasMoved = false;
     let forward = true; 
     let sprint = false;
     

     if (keyPresses.ArrowLeft) {
          pos_kano -= 10;
          k_hasMoved = true;
          forward = false;
     } else if (keyPresses.ArrowRight) {
          pos_kano += 10;
          k_hasMoved = true;
          forward = true;
     } else if (keyPresses.ArrowDown){
          sprint = true;
          k_hasMoved = true;
          pos_kano += 25;
     } else if (keyPresses.i){
          kick_kano = true;
          currentLoopIndexKano = 0;
     } else if (keyPresses.o){
          oneTwo_kano = true;
          currentLoopIndexKano = 0;
     } else if(keyPresses.p){
          kameha_kano = true;
          currentLoopIndexKano = 0;
     }

     
     if (k_hasMoved && forward && !sprint) {
          if (currentLoopIndexKano >= subWalkingingLoop.length) {
               currentLoopIndexKano = 0;
          }
          drawFrame(kanoWalking,48,subWalkingingLoop[currentLoopIndexKano], pos_kano);
          currentLoopIndexKano++;
     }
     // animation de sprint vers l'avant
     else if (k_hasMoved && forward && sprint){ 
          if (currentLoopIndexKano >= subRunLoop.length) {
               currentLoopIndexKano = 0;
          }
          drawFrame(kanoRun,48,subRunLoop[currentLoopIndexKano], pos_kano);    
          currentLoopIndexKano++;
     }
     //animation de marche vers l'arriere
     else if (k_hasMoved && !forward) { 
          if (currentLoopIndexKano == 0){
               currentLoopIndexKano = 7;
          }
          drawFrame(kanoWalking,48,subWalkingingLoop[currentLoopIndexKano],pos_kano);
          currentLoopIndexKano--;
     }
     //animation d'idle
     else if (!k_hasMoved && !kick_kano && !oneTwo_kano && !kameha_kano && !kano_damaged && !freezed){
          if(currentLoopIndexKano == (subIdleLoop.length - 1)){
               currentLoopIndexKano = 0;
          }
          drawFrame(kanoIdle, 48, subIdleLoop[currentLoopIndexKano],pos_kano)
          currentLoopIndexKano++;
     }
     // animation de coups de pieds
     else if (kick_kano){
          if (currentLoopIndexKano >= subKickLoop.length) {
               currentLoopIndexKano = 0;
               kick_kano = false;
          }
          drawFrame(kanoKick,80,subKickLoop[currentLoopIndexKano], pos_kano);
          currentLoopIndexKano++;
     }
     // animation jab droite
     else if (oneTwo_kano){
          if (currentLoopIndexKano >= subOneTwoLoop.length) {
               currentLoopIndexKano = 0;
               oneTwo_kano = false;
          }
          drawFrame(kanoOneTwo,64,subOneTwoLoop[currentLoopIndexKano], pos_kano);
          currentLoopIndexKano++;
     }
     else if (kameha_kano){
          if (currentLoopIndexKano >= kanoKamehaLoop.length) {
               currentLoopIndexKano = 0;
               kameha_kano = false;
          }
          drawFrame(kanoKameha,64,kanoKamehaLoop[currentLoopIndexKano], pos_kano);
          currentLoopIndexKano++;
     }
     //subzero blesse
     else if (kano_damaged){
          if(currentLoopIndexSub >= subHurtLoop.length) {
               currentLoopIndexSub = 0
               kano_damaged = false;
          }
          drawFrame(kanoHurt,96, subHurtLoop[currentLoopIndexSub],pos_kano);
          currentLoopIndexKano++;
     }
     else if (freezed){
          if(currentLoopIndexKano >= kanoFreezedLoop.length) {
               currentLoopIndexKano = 0
               freezed = false;
          }
          drawFrame(kanoFreezed,48, kanoFreezedLoop[currentLoopIndexKano],pos_kano);
          currentLoopIndexKano++;
     }
}

function update(){

     ctx.clearRect(0, 0, canvas.width, canvas.height);
     
     animationsSubzero();
     animationsKano();
     
}
setInterval(update, 100);