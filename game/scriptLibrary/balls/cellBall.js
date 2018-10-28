//standard cellBall

cellBalls = [];




function createCellBall(preDefSize) {

    let size = 0;

    if(preDefSize===""){
        size = 40;
    } else {
        size =  parseInt(preDefSize)
    }

    let div = document.createElement("div");
    div.id = "cellBall"+(cellBalls.length);
    div.className = "cellBall";
    div.style.height = size+"px";
    div.style.width = size+"px";
    document.getElementById("gamebox").appendChild(div);
    spawnLeftRight("cellBall"+(cellBalls.length));
    let i = cellBalls.length;
    cellBalls.push(
        [
            /*0*/Math.random().toFixed(3)/2+0.25,
            /*1*/ran(0,2),
            /*2*/ran(0,2),
            /*3*/document.getElementById(("cellBall"+i)).offsetTop,
            /*4*/document.getElementById(("cellBall"+i)).offsetLeft,
            /*5*/ size,
            /*6*/ size,
            /*7*/ _CellBallSpeed,//Speed
            /*8*/ _time,
        ]
    );
}




widthPlayer   = w("player");

function moveCellBall() {


    posTopPlayer  = PT();
    posLeftPlayer = PL("player");


    for(let i=0;i<cellBalls.length;i++){
        movHeigth = cellBalls[i][5];
        movWidth  = cellBalls[i][6];

        movTop    = cellBalls[i][3];
        movLeft   = cellBalls[i][4];


        if(movTop<0||(movTop+movHeigth)>1520){
            cellBalls[i][1]= 1 - cellBalls[i][1];
        }
        if(movLeft<0||(movLeft+movWidth)>3200){
            cellBalls[i][2]= 1 - cellBalls[i][2];
        }

        if(cellBalls[i][1]===1){
            hor = cellBalls[i][7]*cellBalls[i][0]
        } else {
            hor = cellBalls[i][7]*-1*cellBalls[i][0]
        }
        if(cellBalls[i][2]===1){
            ver = cellBalls[i][7]*(1-cellBalls[i][0])
        } else {
            ver = cellBalls[i][7]*-1*(1-cellBalls[i][0])
        }

        if(movTop<0){
           hor = Math.abs(hor)
        }
        if((movTop+movHeigth)>1520){
            hor = -Math.abs(hor)
        }
        if(movLeft<0){
            ver = Math.abs(ver)
        }
        if((movLeft+movWidth)>3200){
            ver = -Math.abs(ver)
        }


        //movement

        cellBalls[i][3] += hor;
        cellBalls[i][4] += ver;


        //apply move

        document.getElementById("cellBall"+i).style.top  = Math.round(cellBalls[i][3]) + "px";
        document.getElementById("cellBall"+i).style.left = Math.round(cellBalls[i][4]) + "px";


        //test for collision

        posTopBall  = cellBalls[i][3]+cellBalls[i][5]/2;
        posLeftBall = cellBalls[i][4]+cellBalls[i][6]/2;

        disHor = posTopPlayer - posTopBall;
        disVer = posLeftPlayer - posLeftBall;

        distanceG2 = Math.sqrt(Math.pow(disHor,2)+Math.pow(disVer,2));

        rad12 = (widthPlayer/2 + movWidth/2);

        if(distanceG2 < rad12){
            let possibleDamage = cellBalls[i][5]/2;
            if(possibleDamage>100){possibleDamage=100}
            damagePercentage(possibleDamage);
        }

    }
    testForMerge()
}

function testForMerge() {

    for(let i=0;i<cellBalls.length;i++){

        let widthA =cellBalls[i][5];
        let topA =  cellBalls[i][3];
        let leftA = cellBalls[i][4];

        for(let a=i;a<cellBalls.length;a++){
            if(i!==a){

                let widthB = cellBalls[a][5];
                let topB   =  cellBalls[a][3];
                let leftB  = cellBalls[a][4];

                let disHor = topA - topB;
                let disVer = leftA - leftB;

                let distance = Math.sqrt(Math.pow(disHor,2)+Math.pow(disVer,2));

                rad = (widthA + widthB)/2;

                if(distance < rad){

                    A1 = Math.pow(widthA/2, 2);
                    A2 = Math.pow(widthB/2, 2);

                    size = Math.sqrt(A1+A2)*2;

                    BtoA = 1/(A1+A2)*A2;

                    let degA =calcDeg(cellBalls[i][1],cellBalls[i][2],cellBalls[i][0]),
                        degB =calcDeg(cellBalls[a][1],cellBalls[a][2],cellBalls[a][0]);

                    let fA = A1*cellBalls[i][7];
                    let fB = A2*cellBalls[a][7];

                    let parallel = calcForce(degA,degB,fA,fB);
                    let newSpeed = parallel[0]/size;
                    let degNew = parallel[1];

                    mergeCellBall((topA+disHor*BtoA),(leftA+disVer*BtoA), size, i, a,calcLowDeg(degNew) , calcDirectionHor(degNew), calcDirectionVer(degNew), newSpeed);
                    testForMerge();
                    break;
                }
            }
        }
    }
}

function mergeCellBall(top, left, size, id1, id2, lowDeg, topDirection, leftDirection, newSpeed){

    removeFromArray(id1, cellBalls, "cellBall");
    removeFromArray(id2-1, cellBalls, "cellBall");



    //console.log(lowDeg+" | " + topDirection +" | " + leftDirection);

    let div = document.createElement("div");
    div.id = "cellBall"+(cellBalls.length);
    div.style.height = size+"px";
    div.style.width = size+"px";
    div.style.top = top+"px";
    div.style.left = left+"px";
    div.className = "cellBall";
    document.getElementById("gamebox").appendChild(div);
    let i = cellBalls.length;
    cellBalls.push(
        [
            /*0*/ lowDeg,
            /*1*/ topDirection,
            /*2*/ leftDirection,
            /*3*/top,
            /*4*/left,
            /*5*/size,
            /*6*/size,
            /*7*/_CellBallSpeed,
            /*8*/_time,
        ]
    );
}