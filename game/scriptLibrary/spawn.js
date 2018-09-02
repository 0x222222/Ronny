

function spawnSide(obj) {
    objDom = document.getElementById(obj).style;

    heigth = parseInt(document.getElementById(obj).offsetHeight);
    width = parseInt(document.getElementById(obj).offsetWidth);
    switch (ran(0,4)){
        case 0:
            objDom.top =  "0px";
            objDom.left = ran(0,3200-width) + "px";
            break;
        case 1:
            objDom.top =  (1520-heigth) + "px";
            objDom.left = ran(0,3200-width) + "px";
            break;
        case 2:
            objDom.top =  ran(0,1520-heigth) + "px";
            objDom.left = "0px";
            break;
        case 3:
            objDom.top =  ran(0,1520-heigth) + "px";
            objDom.left = (3200-width) + "px";
            break;
    }

    return true;
}

function spawn(ystart, ystop, xstart, xstop, obj) {
    tpT(obj,ran(ystart,ystop));
    tpL(obj,ran(xstart,xstop))
}

