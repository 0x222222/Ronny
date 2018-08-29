//standard contactBall

contactBalls = [];

function createContactBall() {
    let div = document.createElement("div");
    div.id = "contactBall"+(contactBalls.length);
    div.className = "contactBall";
    document.getElementById("gamebox").appendChild(div);
    spawnSide("contactBall"+(contactBalls.length));
    contactBalls.push(
        [Math.random().toFixed(3)/2+0.25, ran(0,1), ran(0,1), _time]
    );
}

function moveContactBall() {

    for(i=0;i<contactBalls.length;i++){
        movHeigth = parseInt(document.getElementById(("contactBall"+i)).offsetHeight);
        movWidth = parseInt(document.getElementById(("contactBall"+i)).offsetWidth);
        movTop =  parseInt(document.getElementById(("contactBall"+i)).style.top.slice(0, -2));
        movLeft = parseInt(document.getElementById(("contactBall"+i)).style.left.slice(0, -2));
        if(movTop<0||(movTop+movHeigth)>1520){
            contactBalls[i][1]= 1 - contactBalls[i][1]
        }
        if(movLeft<0||(movLeft+movWidth)>3200){
            contactBalls[i][2]= 1 - contactBalls[i][2]
        }

        if(contactBalls[i][1]===1){
            hor = _contactBallSpeed*contactBalls[i][0]
        } else {
            hor = _contactBallSpeed*-1*contactBalls[i][0]
        }
        if(contactBalls[i][2]===1){
            ver = _contactBallSpeed*(1-contactBalls[i][0])
        } else {
            ver = _contactBallSpeed*-1*(1-contactBalls[i][0])
        }
        move(hor, ver, ("contactBall"+i));


        //test for collision

        let iteration = i;

        if(contactBalls[iteration][3]+200<_time&&collsionRound(("contactBall"+i),"player")){
            damage();
            _bounceHorizontal = hor;
            _bounceVertical   = ver;
            contactBalls[iteration][1]= 1-contactBalls[iteration][1];
            contactBalls[iteration][2]= 1-contactBalls[iteration][2];
            contactBalls[iteration][3]= _time;
        }

    }
}
