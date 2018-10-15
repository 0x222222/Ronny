//standard beastBall

beastBalls = [];
_beastBallSpeed             =30;

function createBeastBall() {
    let div = document.createElement("div");
    div.id = "beastBall"+(beastBalls.length);
    div.className = "beastBall";
    document.getElementById("gamebox").appendChild(div);
    spawnSide("beastBall"+(beastBalls.length));
    beastBalls.push(
        [Math.random().toFixed(3)/2+0.25, ran(0,1), ran(0,1), _round, 0]
    );
}

function moveBeastBall() {

    for(let i=0;i<beastBalls.length;i++){


        //Change mode when [3] less than round
        //change when you like it with -1
        //when value is -2 the function has to give a new value
        if(beastBalls[i][3]<_round&&beastBalls[i][3]>=0){
            beastBalls[i][4]=ran(0,3);
            beastBalls[i][3]=-2;
        }

        //*****************************MODE1*************************************************************

        if(_round&&beastBalls[i][4]===0){

            if( beastBalls[i][3]===-2){
                beastBalls[i][3]= 8-ran(0,5)+_round;
                beastBalls[i][0]= Math.random().toFixed(3)/2+0.25;
                beastBalls[i][1]= ran(0,1);
                beastBalls[i][2]= ran(0,1);
                redirectBeastBalls(i);
                _beastBallSpeed = 30;
            }

            movHeigth = parseInt(document.getElementById(("beastBall"+i)).offsetHeight);
            movWidth = parseInt(document.getElementById(("beastBall"+i)).offsetWidth);
            movTop =  parseInt(document.getElementById(("beastBall"+i)).style.top.slice(0, -2));
            movLeft = parseInt(document.getElementById(("beastBall"+i)).style.left.slice(0, -2));
            if(movTop<0||(movTop+movHeigth)>1520){
                beastBalls[i][1]= 1 - beastBalls[i][1];
                redirectBeastBalls(i)
            }
            if(movLeft<0||(movLeft+movWidth)>3200){
                beastBalls[i][2]= 1 - beastBalls[i][2];
                redirectBeastBalls(i)
            }

            if(beastBalls[i][1]===1){
                hor = _beastBallSpeed*beastBalls[i][0]
            } else {
                hor = _beastBallSpeed*-1*beastBalls[i][0]
            }
            if(beastBalls[i][2]===1){
                ver = _beastBallSpeed*(1-beastBalls[i][0])
            } else {
                ver = _beastBallSpeed*-1*(1-beastBalls[i][0])
            }
            move(hor, ver, ("beastBall"+i));


            //test for collision

            let iteration = i;

            if(collsionRound(("beastBall"+i),"player")){
                damage();
            }
        }

        //*****************************MODE2*************************************************************
        if(_round&&beastBalls[i][4]===1){

            //set timer

            if( beastBalls[i][3]===-2){
                beastBalls[i][3]= 8-ran(0,5)+_round;
                _beastBallSpeed = 15;
            }


            //redirect

            _beastBallSpeed = 10;

            up = 1;
            side = 1;

            if(PT()-posT("beastBall"+i)<0){
                up = 0;
            }

            if(PL()-posL(("beastBall"+i))<0){
                side = 0;
            }
            beastBalls[i][0] = (1/(Math.abs(PT()-posT(("beastBall"+i)))+Math.abs(PL()-posL(("beastBall"+i))))*(Math.abs(PT()-posT(("beastBall"+i)))));
            beastBalls[i][1] =up;
            beastBalls[i][2] =side;

            redirectBeastBalls(i);

            //move

            if(beastBalls[i][1]===1){
                hor = _beastBallSpeed*beastBalls[i][0]
            } else {
                hor = _beastBallSpeed*-1*beastBalls[i][0]
            }
            if(beastBalls[i][2]===1){
                ver = _beastBallSpeed*(1-beastBalls[i][0])
            } else {
                ver = _beastBallSpeed*-1*(1-beastBalls[i][0])
            }



            let multiplier = Math.abs(1 - beastBalls[0]);

            move(hor, ver, ("beastBall"+i));


            if(collsionRound(("beastBall"+i),"player")){
                damage();
            }
        }
        //*****************************MODE3*************************************************************
        if(_round&&beastBalls[i][4]===2){
            if( beastBalls[i][3]===-2){
                beastBalls[i][3]= 1+_round;
                beastBalls[i][0]= Math.random().toFixed(3)/2+0.25;
                beastBalls[i][1]= ran(0,1);
                beastBalls[i][2]= ran(0,1);
                redirectBeastBalls(i);
                _beastBallSpeed = 10;
            }

            movHeigth = parseInt(document.getElementById(("beastBall"+i)).offsetHeight);
            movWidth = parseInt(document.getElementById(("beastBall"+i)).offsetWidth);
            movTop =  parseInt(document.getElementById(("beastBall"+i)).style.top.slice(0, -2));
            movLeft = parseInt(document.getElementById(("beastBall"+i)).style.left.slice(0, -2));
            if(movTop<0||(movTop+movHeigth)>1520){
                beastBalls[i][1]= 1 - beastBalls[i][1];
                redirectBeastBalls(i)
            }
            if(movLeft<0||(movLeft+movWidth)>3200){
                beastBalls[i][2]= 1 - beastBalls[i][2];
                redirectBeastBalls(i)
            }

            if(beastBalls[i][1]===1){
                hor = _beastBallSpeed*beastBalls[i][0]
            } else {
                hor = _beastBallSpeed*-1*beastBalls[i][0]
            }
            if(beastBalls[i][2]===1){
                ver = _beastBallSpeed*(1-beastBalls[i][0])
            } else {
                ver = _beastBallSpeed*-1*(1-beastBalls[i][0])
            }
            move(hor, ver, ("beastBall"+i));


            //test for collision

            let iteration = i;

            if(collsionRound(("beastBall"+i),"player")){
                damage();
            }
        }
        //*****************************MODE4*************************************************************
        //*****************************MODE5*************************************************************
        //*****************************MODE6*************************************************************

    }
}


function redirectBeastBalls(id) {
    deg = 0;

    lowDeg = parseInt((90*beastBalls[id][0]-45).toFixed(0));

    if(beastBalls[id][1]===0&&beastBalls[id][2]===0){
        deg = 315+lowDeg;
    }
    if(beastBalls[id][1]===0&&beastBalls[id][2]===1){
        deg = 45-lowDeg;
    }
    if(beastBalls[id][1]===1&&beastBalls[id][2]===0){
        deg = 225-lowDeg;
    }
    if(beastBalls[id][1]===1&&beastBalls[id][2]===1){
        deg = 135+lowDeg;
    }

    document.getElementById("beastBall"+id).style.transform = "rotate("+deg+"deg)"
}
