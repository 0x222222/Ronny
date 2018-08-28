var shots = [];



function shot() {
    if(_mouseclickRight&&shots.length<_maxShots){

        var div = document.createElement("div");
        div.id = "shot"+shots.length;
        div.className = "shot";
        div.style.top  = PT()-15+"px";
        div.style.left = PL("player")-15+"px";
        document.getElementById("gamebox").appendChild(div);

        movePlayerHor = 0;
        movePlayerVer = 0;

        if(keyStatus.w){movePlayerHor += 1}
        if(keyStatus.a){movePlayerVer += 1}
        if(keyStatus.s){movePlayerHor += 2}
        if(keyStatus.d){movePlayerVer += 2}

        up = 0;
        side = 0;


        if(PT()-_mouseY<0){
            up = 1;
        }

        if(PL()-_mouseX<0) {
            side = 1;
        }


        shots.push(
            [
                ((1/(Math.abs(PT()-_mouseY)+Math.abs(PL()-_mouseX)))*(Math.abs(PT()-_mouseY))*4+Math.random())/5,
                up,
                side,
                movePlayerHor,
                movePlayerVer,
                _round
            ]
        );
    }
    _mouseclickRight = false;

    document.getElementById("debugExtend6").innerHTML = " Shots: "+shots.length+"/"+_maxShots;
}

function moveShot() {

    for(i=0;i<shots.length;i++){
        if(shots[i][5]+6<_round){
            shots.splice(i,1);
            document.getElementById("shot"+i).outerHTML = "";
            for(k=i;k<shots.length;k++){
                document.getElementById("shot"+(k+1)).id = "shot"+k;
            }
        }
    }
    for(j=0;j<3;j++){



        for(i=0;i<shots.length;i++){





            //movement

            if (shots[i][1] === 1) {
                hor = _shootSpeed * shots[i][0]
            } else {
                hor = _shootSpeed * -1 * shots[i][0]
            }
            if (shots[i][2] === 1) {
                ver = _shootSpeed * (1 - shots[i][0])
            } else {
                ver = _shootSpeed * -1 * (1 - shots[i][0])
            }

            if(shots[i][3]===1){hor-=5}
            if(shots[i][3]===2){hor+=5}
            if(shots[i][4]===1){ver-=5}
            if(shots[i][4]===2){ver+=5}

            for(m=0;m<fastBalls.length;m++){
                if(collsionRound("shot"+i,"fastBall"+m)){
                    fastBalls[m][3] = _round+2;
                }
            }
            for(m=0;m<followBalls.length;m++){
                if(collsionRound("shot"+i,"followBall"+m)&& followBalls[m][3]-_round<2){
                    followBalls[m][3] = _round+1-_followBallRegneration;
                }
            }

            for(m=0;m<pushBalls.length;m++){
                if(collsionRound("shot"+i,"pushBall"+m)&& pushBalls[m][3]>10){
                    pushBalls[m][3]--;
                }
            }



            move(hor, ver, ("shot" + i));

            if(collisionBorder("shot" + i)){

                shots.splice(i,1);
                document.getElementById("shot"+i).outerHTML = "";
                for(k=i;k<shots.length;k++){
                    document.getElementById("shot"+(k+1)).id = "shot"+k;
                }

                document.getElementById("debugExtend6").innerHTML = " Shots: "+shots.length+"/"+_maxShots;
            }
        }

    }
}