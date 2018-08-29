//standard inviBall

inviBalls = [];




function createInviBall() {
    let div = document.createElement("div");
    div.id = "inviBall"+(inviBalls.length);
    div.className = "inviBall";
    document.getElementById("gamebox").appendChild(div);
    spawnSide("inviBall"+(inviBalls.length));
    inviBalls.push(
        [Math.random().toFixed(3)/2+0.25, ran(0,1), ran(0,1)]
    );
}

function moveInviBall() {

    for(i=0;i<inviBalls.length;i++){
        movHeigth = parseInt(document.getElementById(("inviBall"+i)).offsetHeight);
        movWidth = parseInt(document.getElementById(("inviBall"+i)).offsetWidth);
        movTop =  parseInt(document.getElementById(("inviBall"+i)).style.top.slice(0, -2));
        movLeft = parseInt(document.getElementById(("inviBall"+i)).style.left.slice(0, -2));
        if(movTop<0||(movTop+movHeigth)>1520){
            inviBalls[i][1]= 1 - inviBalls[i][1]
        }
        if(movLeft<0||(movLeft+movWidth)>3200){
            inviBalls[i][2]= 1 - inviBalls[i][2]
        }

        if(inviBalls[i][1]===1){
            hor = _inviBallSpeed*inviBalls[i][0]
        } else {
            hor = _inviBallSpeed*-1*inviBalls[i][0]
        }
        if(inviBalls[i][2]===1){
            ver = _inviBallSpeed*(1-inviBalls[i][0])
        } else {
            ver = _inviBallSpeed*-1*(1-inviBalls[i][0])
        }
        move(hor, ver, ("inviBall"+i));


        //test for collision

        if(collsionRound(("inviBall"+i),"player")){
            damagePercentage(25);
        }

    }
}
