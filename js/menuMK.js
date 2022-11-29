function launch() {
    let btnStart = document.getElementById("btn");
    btnStart.onclick = function() {
        console.log("Lancer ! "); 
        
    }
}

function drawMenu() 
{

}

function update() 
{
    drawMenu();
    launch();
}

setInterval(update,60);