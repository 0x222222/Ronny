//collison between 2 balls/spaceship
function collsionRound(obj1, obj2) {

    rad1 = parseInt(document.getElementById(obj1).offsetWidth/2);
    rad2 = parseInt(document.getElementById(obj2).offsetWidth/2);


    rad12 = (rad1 +rad2);

    return distance(obj1, obj2) < rad12;

}

//collision with border

function collisionBorder(obj) {

    colHeigth = parseInt(document.getElementById(obj).offsetHeight);
    colWidth = parseInt(document.getElementById(obj).offsetWidth);
    colTop =  parseInt(document.getElementById(obj).style.top.slice(0, -2));
    colLeft = parseInt(document.getElementById(obj).style.left.slice(0, -2));
    if(colTop<0||(colTop+colHeigth)>1520){return true}
    return colLeft < 0 || (colLeft + colWidth) > 3200;

}

function collisionBorderPlayer() {

    colHeigth = parseInt(document.getElementById("player").offsetHeight);
    colWidth = parseInt(document.getElementById("player").offsetWidth);
    colTop =  parseInt(document.getElementById("player").style.top.slice(0, -2));
    colLeft = parseInt(document.getElementById("player").style.left.slice(0, -2));
    if(colTop<0){
        _bounceHorizontal+=20;
        stun(5);
        return;
    }
    if((colTop+colHeigth)>1520){
        _bounceHorizontal-=20;
        stun(5);
        return;
    }
    if(colLeft < 0){
        _bounceVertical+=20;
        stun(5);
        return;
    }
    if((colLeft + colWidth) > 3200){
        _bounceVertical-=20;
        stun(5);
    }

}