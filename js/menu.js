let menu = document.getElementById("menuMortalKombat");
let ctx = menu.getContext("2d");
ctx.imageSmoothingEnabled = false;
let imgMenu = new Image();
imgMenu.src = './assets/images/mkmenu.png';
let button = document.createElement("button");
button.innerHTML = "Start Game";
document.body.appendChild(button);
button.onclick = function () {
    console.log("Jeu lancer");
}

function drawMenu(){
    ctx.drawImage(imgMenu,0,0,menu.width,menu.height);
}

function update() {
drawMenu();
}
setInterval(update,100);