async function hover(id){

    var elem = document.getElementById('movementTitle')
    var posY = 250;
    var posX = 600;
    var fontSize = 100;
    var aktposY = setInterval(frameY, 3);

    function frameY() {
    /*    if(posY <= 8)
        clearInterval();
        else {
            posY -= 10;
            elem.style.top = posY + 'px';
        }*/
    }

    var aktposY = setInterval(frameX, 3);
    function frameX() {
        if(posX >=700)
            clearInterval();
        else{
            posX += 1;
            elem.style.left = posX + 'px';
        }
    }

    var aktsize = setInterval(resize, 10);
    function resize() {
        if(fontSize <= 30)
            clearInterval();
        else{
            fontSize -=
        }

    }


    document.getElementById(id).style.opacity = "1";
}

async function unhover(id){

    document.getElementById(id).style.opacity = "0";
}