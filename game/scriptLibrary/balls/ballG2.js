//standard ballG2

ballG2s = [];




function createBallG2() {


    let div = document.createElement("div");
    div.id = "ballG2"+(ballG2s.length);
    div.className = "ball";
    document.getElementById("gamebox").appendChild(div);
    spawnSide("ballG2"+(ballG2s.length));
    ballG2s.push(
        [
            /*0*/Math.random().toFixed(3)/2+0.25,
            /*1*/ran(0,2),
            /*2*/ran(0,2),
            /*3*/document.getElementById(("ballG2"+i)).offsetTop,
            /*4*/document.getElementById(("ballG2"+i)).offsetLeft,
            /*5*/document.getElementById(("ballG2"+i)).offsetWidth,
            /*6*/document.getElementById(("ballG2"+i)).offsetHeight
        ]
    );
}




function moveBallG2() {

    if(0<ballG2s.length){
        movHeigth = ballG2s[0][5];
        movWidth  = ballG2s[0][6];
    }


    for(i=0;i<ballG2s.length;i++){

        movTop    = ballG2s[i][3];
        movLeft   = ballG2s[i][4];

        if(movTop<0||(movTop+movHeigth)>1520){
            ballG2s[i][1]= 1 - ballG2s[i][1]
        }
        if(movLeft<0||(movLeft+movWidth)>3200){
            ballG2s[i][2]= 1 - ballG2s[i][2]
        }

        if(ballG2s[i][1]===1){
            hor = _ballG2Speed*ballG2s[i][0]
        } else {
            hor = _ballG2Speed*-1*ballG2s[i][0]
        }
        if(ballG2s[i][2]===1){
            ver = _ballG2Speed*(1-ballG2s[i][0])
        } else {
            ver = _ballG2Speed*-1*(1-ballG2s[i][0])
        }

        //movement

        ballG2s[i][3] += hor;
        ballG2s[i][4] += ver;


        document.getElementById("ballG2"+i).style.top  = Math.round(ballG2s[i][3]) + "px";
        document.getElementById("ballG2"+i).style.left = Math.round(ballG2s[i][4]) + "px";


        //test for collision

        posTopBall  = ballG2s[i][3]+ballG2s[i][5]/2;
        posLeftBall = ballG2s[i][4]+ballG2s[i][6]/2;




        if(collisionG2(movWidth, posTopBall, posLeftBall)){
            damagePercentage(60);
        }
    }
}

function collisionG2(width, posTopBall, postLeftBall) {
    disHor = _posTopPlayer  - posTopBall;
    disVer = _posLeftPlayer - posLeftBall;
    rad = _widthPlayer/2 + width/2;
    return(distance<rad)
}