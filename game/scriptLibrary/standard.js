//get posistion

//noinspection JSSuspiciousNameCombination
function cornerX(obj) {
    return document.getElementById(obj).offsetTop;
}
//noinspection JSSuspiciousNameCombination
function cornerY(obj) {
    return document.getElementById(obj).offsetLeft;
}


function PT() {
    return document.getElementById("player").offsetTop+document.getElementById("player").offsetHeight/2;
}

function PL() {
    return document.getElementById("player").offsetLeft+document.getElementById("player").offsetWidth/2;
}

function posT(obj) {
    return document.getElementById(obj).offsetTop+document.getElementById(obj).offsetHeight/2;
}

function posL(obj) {
    return document.getElementById(obj).offsetLeft+document.getElementById(obj).offsetWidth/2;
}

//height width

function h(obj) {
    return document.getElementById(obj).offsetHeight;
}

function w(obj) {
    return document.getElementById(obj).offsetWidth;
}

//distance vertical

function distance(obj1, obj2) {
    disHor = posT(obj1) - posT(obj2);
    disVer = posL(obj1) - posL(obj2);
    return Math.sqrt(Math.pow(disHor,2)+Math.pow(disVer,2));
}

//distance up and side

function distanceUS(obj1, obj2) {
    disHor = Math.abs(posT(obj1) - posT(obj2));
    disVer = Math.abs(posL(obj1) - posL(obj2));
    return disHor + disVer;
}

//teleport

function tpT(obj, value){
    document.getElementById(obj).style.top = value+"px"
}

function tpL(obj, value){
    document.getElementById(obj).style.left = value+"px"
}

//quadrant

function quadrant(obj){

    topDistance  = posT(obj);
    side = posL(obj);
    if(side>=1600&&topDistance>=760){
        return 4;
    }

    if(side>=1600&&topDistance<760){
        return 1;
    }

    if(side<1600&&topDistance>=760){
        return 3;
    }

    if(side<1600&&topDistance<760){
        return 2;
    }
}

function ran(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function lifetime(spawnround, life) {
    return spawnround + life < _round;
}

function log(text) {
    console.log(text)
}

function stun(value) {
    document.getElementById("gameboxOverlayerStun").style.boxShadow ="inset 0px 0px 1500px purple";
    _playerStun = value;
}