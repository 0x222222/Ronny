
//standard ball

balls = [];




function createBall() {


    var div = document.createElement("div");
    div.id = "ball"+(balls.length);
    div.className = "ball";
    document.getElementById("gamebox").appendChild(div);
    spawnSide("ball"+(balls.length));
    balls.push(
        [Math.random().toFixed(3)/2+0.25, ran(0,2), ran(0,2)]
    );
}

function moveBall() {

    for(i=0;i<balls.length;i++){
        movHeigth = parseInt(document.getElementById(("ball"+i)).offsetHeight);
        movWidth = parseInt(document.getElementById(("ball"+i)).offsetWidth);
        movTop =  parseInt(document.getElementById(("ball"+i)).style.top.slice(0, -2));
        movLeft = parseInt(document.getElementById(("ball"+i)).style.left.slice(0, -2));
        if(movTop<0||(movTop+movHeigth)>1520){
            balls[i][1]= 1 - balls[i][1]
        }
        if(movLeft<0||(movLeft+movWidth)>3200){
            balls[i][2]= 1 - balls[i][2]
        }

        if(balls[i][1]===1){
            hor = _ballSpeed*balls[i][0]
        } else {
            hor = _ballSpeed*-1*balls[i][0]
        }
        if(balls[i][2]===1){
            ver = _ballSpeed*(1-balls[i][0])
        } else {
            ver = _ballSpeed*-1*(1-balls[i][0])
        }
        move(hor, ver, ("ball"+i));


        //test for collision

        if(collsionRound(("ball"+i),"player")){
            damagePercentage(60);
        }

    }
}

//fast balls

var fastBalls = [];

function createFastBall() {
    i = fastBalls.length;
    fastBalls.push(
        [Math.random().toFixed(3)/1.25+0.1, ran(0,2), ran(0,2),_round-_fastBallRegneration]
    );
    var div = document.createElement("div");
    div.id = "fastBall"+i;
    div.className = "fastBall";
    document.getElementById("gamebox").appendChild(div);
    spawnSide("fastBall"+i);
    redirectFastBall(i);
}

function moveFastBall() {

    for(i=0;i<fastBalls.length;i++){
        if(fastBalls[i][3]+_fastBallRegneration<_round){
            movHeigth = parseInt(document.getElementById(("fastBall"+i)).offsetHeight);
            movWidth = parseInt(document.getElementById(("fastBall"+i)).offsetWidth);
            movTop =  parseInt(document.getElementById(("fastBall"+i)).style.top.slice(0, -2));
            movLeft = parseInt(document.getElementById(("fastBall"+i)).style.left.slice(0, -2));


            //border interaction

            leave = false;

            if((movTop+movHeigth)>1520){
                fastBalls[i][1]= 1 - fastBalls[i][1];
                fastBalls[i][3]= _round;
                document.getElementById(("fastBall"+i)).style.top = (1519-movHeigth)+"px";
                leave = true;
            }
            if(movTop<0){
                fastBalls[i][1]= 1 - fastBalls[i][1];
                fastBalls[i][3]= _round;
                document.getElementById(("fastBall"+i)).style.top = "1px";
                leave = true;
            }

            if((movLeft+movWidth)>3200){
                fastBalls[i][2]= 1 - fastBalls[i][2];
                fastBalls[i][3]= _round;
                document.getElementById(("fastBall"+i)).style.left = (3199-movWidth)+"px";
                leave = true;
            }
            if(movLeft<0){
                fastBalls[i][2]= 1 - fastBalls[i][2];
                fastBalls[i][3]= _round;
                document.getElementById(("fastBall"+i)).style.left = "1px";
                leave = true;
            }
            redirectFastBall(i);
            if(leave){continue}


            //movement

            if(fastBalls[i][1]===1){
                hor = _fastBallSpeed*fastBalls[i][0]
            } else {
                hor = _fastBallSpeed*-1*fastBalls[i][0]
            }
            if(fastBalls[i][2]===1){
                ver = _fastBallSpeed*(1-fastBalls[i][0])
            } else {
                ver = _fastBallSpeed*-1*(1-fastBalls[i][0])
            }
            move(hor, ver, ("fastBall"+i))





        }
        //test for collision
        if(collsionRound(("fastBall"+i),"player")){
            damage();
        }
    }
}

function redirectFastBall(i) {
    deg = 0;

    lowDeg = parseInt((90*fastBalls[i][0]-45).toFixed(0));

    if(fastBalls[i][1]===0&&fastBalls[i][2]===0){
        deg = 315+lowDeg;
    }
    if(fastBalls[i][1]===0&&fastBalls[i][2]===1){
        deg = 45-lowDeg;
    }
    if(fastBalls[i][1]===1&&fastBalls[i][2]===0){
        deg = 225-lowDeg;
    }
    if(fastBalls[i][1]===1&&fastBalls[i][2]===1){
        deg = 135+lowDeg;
    }

    document.getElementById("fastBall"+i).style.transform = "rotate("+deg+"deg)"
}

//follow ball

var followBalls = [];

function createFollowBall() {
    i = followBalls.length;

    var div = document.createElement("div");
    div.id = "followBall"+i;
    div.className = "followBall";
    document.getElementById("gamebox").appendChild(div);
    spawnSide("followBall"+i);

    up = 1;
    side = 1;

    if(PT()-posT("followBall"+i)<0){
        up = 0;
    }

    if(PL()-posL(("followBall"+i))<0){
        side = 0;
    }


    followBalls.push(
        [
            (1/(Math.abs(PT()-posT(("followBall"+i)))+Math.abs(PL()-posL(("followBall"+i))))*(Math.abs(PT()-posT(("followBall"+i))))),
            up,
            side,
            _round-ran(0,_followBallRegneration)+2,
            (distanceUS("player", ("followBall"+i))/_followBallSpeed).toFixed(1)
        ]
    );
    redirectFollowBall(i)
    //redirectFollowBall(round);
}


function moveFollowBall() {

    for(i=0;i<followBalls.length;i++) {

        if(followBalls[i][3]+_followBallRegneration<_round) {



            if(followBalls[i][4]<1){
                followBalls[i][3] = _round-ran(-5,_followBallRegneration);
            } else {
                followBalls[i][4]--
            }

            movHeigth = parseInt(document.getElementById(("followBall" + i)).offsetHeight);
            movWidth = parseInt(document.getElementById(("followBall" + i)).offsetWidth);
            movTop = parseInt(document.getElementById(("followBall" + i)).style.top.slice(0, -2));
            movLeft = parseInt(document.getElementById(("followBall" + i)).style.left.slice(0, -2));


            //movement

            if (followBalls[i][1] === 1) {
                hor = _followBallSpeed * followBalls[i][0]
            } else {
                hor = _followBallSpeed * -1 * followBalls[i][0]
            }
            if (followBalls[i][2] === 1) {
                ver = _followBallSpeed * (1 - followBalls[i][0])
            } else {
                ver = _followBallSpeed * -1 * (1 - followBalls[i][0])
            }
            move(hor, ver, ("followBall" + i))
        } else {

            up = 1;
            side = 1;

            if(PT()-posT("followBall"+i)<0){
                up = 0;
            }

            if(PL()-posL(("followBall"+i))<0){
                side = 0;
            }
            followBalls[i][0] = (1/(Math.abs(PT()-posT(("followBall"+i)))+Math.abs(PL()-posL(("followBall"+i))))*(Math.abs(PT()-posT(("followBall"+i)))));
            followBalls[i][1] =up;
            followBalls[i][2] =side;

            followBalls[i][4] = (distanceUS("player", ("followBall"+i))/_followBallSpeed).toFixed(1);
            redirectFollowBall(i);
        }
        if(collsionRound("player", "followBall"+i)){
            damagePercentage(70);
        }
    }
}

function redirectFollowBall(id) {
    deg = 0;

    lowDeg = parseInt((90*followBalls[id][0]-45).toFixed(0));

    if(followBalls[id][1]===0&&followBalls[id][2]===0){
        deg = 315+lowDeg;
    }
    if(followBalls[id][1]===0&&followBalls[id][2]===1){
        deg = 45-lowDeg;
    }
    if(followBalls[id][1]===1&&followBalls[id][2]===0){
        deg = 225-lowDeg;
    }
    if(followBalls[id][1]===1&&followBalls[id][2]===1){
        deg = 135+lowDeg;
    }

    document.getElementById("followBall"+id).style.transform = "rotate("+deg+"deg)"
}

//infinty ball

//standard infinityBalls

let infinityBalls = [];




function createInfinityBall() {
    let round = infinityBalls.length;
    infinityBalls.push(
        [
            Math.random().toFixed(3)/2+0.25, ran(0,2), ran(0,2)]
    );

    let div = document.createElement("div");
    div.id = "infinityBalls"+round;
    div.className = "infintyball";
    document.getElementById("gamebox").appendChild(div);
    spawnSide("infinityBalls"+round);
}

function moveInfinityBall() {

    for(i=0;i<infinityBalls.length;i++){
        if(infinityBalls[i][0]>0.95){
            infinityBalls[i][0]=  Math.random().toFixed(3)/1.12+0.1;
        }

        movHeigth = parseInt(document.getElementById(("infinityBalls"+i)).offsetHeight);
        movWidth = parseInt(document.getElementById(("infinityBalls"+i)).offsetWidth);
        movTop =  parseInt(document.getElementById(("infinityBalls"+i)).style.top.slice(0, -2));
        movLeft = parseInt(document.getElementById(("infinityBalls"+i)).style.left.slice(0, -2));
        if(movTop+movHeigth>1520){
            //document.getElementById(("infinityBalls"+i)).style.top = (1-movHeigth)+"px";
            infinityBalls[i][1]= 1 - infinityBalls[i][1];
            //infinityBallss[i][0]=1-infinityBallss[i][0]
        }
        if(movTop<0){
            //document.getElementById(("infinityBalls"+i)).style.top = (1519)+"px";
            infinityBalls[i][1]= 1 - infinityBalls[i][1]
            //infinityBallss[i][0]=1-infinityBallss[i][0]
        }
        if(movLeft>3200){
            document.getElementById(("infinityBalls"+i)).style.left = (1-movWidth)+"px";
            infinityBalls[i][0]=  Math.random().toFixed(3)/1.12+0.1;
        }
        if(movLeft+movWidth<0){
            document.getElementById(("infinityBalls"+i)).style.left = (3201)+"px";
            infinityBalls[i][0]=  Math.random().toFixed(3)/1.12+0.1;
        }

        if(infinityBalls[i][1]===1){
            hor = _infinityBallSpeed*infinityBalls[i][0]
        } else {
            hor = _infinityBallSpeed*-1*infinityBalls[i][0]
        }
        if(infinityBalls[i][2]===1){
            ver = _infinityBallSpeed*(1-infinityBalls[i][0])
        } else {
            ver = _infinityBallSpeed*-1*(1-infinityBalls[i][0])
        }
        move(hor, ver, ("infinityBalls"+i));


        //test for collision

        if(collsionRound(("infinityBalls"+i),"player")){
            stun(70);
        }

    }
}

//standard pushBall

var pushBalls = [];




function createPushBall() {


    var div = document.createElement("div");
    div.id = "pushBall"+(pushBalls.length);
    div.className = "pushBall";
    document.getElementById("gamebox").appendChild(div);
    spawnSide("pushBall"+(pushBalls.length));
    pushBalls.push(
        [Math.random().toFixed(3)/2+0.25, ran(0,2), ran(0,2), _pushBallSpeed]
    );
}

function movePushBall() {

    for(i=0;i<pushBalls.length;i++){
        movHeigth = parseInt(document.getElementById(("pushBall"+i)).offsetHeight);
        movWidth = parseInt(document.getElementById(("pushBall"+i)).offsetWidth);
        movTop =  parseInt(document.getElementById(("pushBall"+i)).style.top.slice(0, -2));
        movLeft = parseInt(document.getElementById(("pushBall"+i)).style.left.slice(0, -2));

        if(movTop<0||(movTop+movHeigth)>1520){
            pushBalls[i][1]= 1 - pushBalls[i][1];
            if(pushBalls[i][3]<=40){
                pushBalls[i][3]++
            }
        }
        if(movLeft<0||(movLeft+movWidth)>3200){
            pushBalls[i][2]= 1 - pushBalls[i][2];
            if(pushBalls[i][3]<=40){
                pushBalls[i][3]++
            }
        }

        if(pushBalls[i][1]===1){
            hor = pushBalls[i][3]*pushBalls[i][0]
        } else {
            hor = pushBalls[i][3]*-1*pushBalls[i][0]
        }
        if(pushBalls[i][2]===1){
            ver = pushBalls[i][3]*(1-pushBalls[i][0])
        } else {
            ver = pushBalls[i][3]*-1*(1-pushBalls[i][0])
        }
        move(hor, ver, ("pushBall"+i));


        //test for collision
        let size = document.getElementById("pushBall"+i).offsetHeight

        if(collsionRound(("pushBall"+i),"player")){
            _bounceVertical = ver*4/100*size;
            _bounceHorizontal = hor*4/100*size;
            for(l=0;l<20;l++){
                if(pushBalls[i][3]>10){
                    pushBalls[i][3]--;
                }
            }
            stun(25);
        }

    }
}