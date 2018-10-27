//get posistion

//noinspection JSSuspiciousNameCombination
function cornerX(obj) {
    return  parseInt(document.getElementById(obj).offsetTop);
}
//noinspection JSSuspiciousNameCombination
function cornerY(obj) {
    return  parseInt(document.getElementById(obj).offsetLeft);
}


function PT() {
    return  parseInt(document.getElementById("player").offsetTop+document.getElementById("player").offsetHeight/2);
}

function  PL() {
    return parseInt(document.getElementById("player").offsetLeft+document.getElementById("player").offsetWidth/2);
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
    return Math.hypot(disHor, disVer)
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

function stun(value){
    playBounceSound();
    document.getElementById("gameboxOverlayerStun").style.boxShadow ="inset 0px 0px 1500px purple";
    _playerStun = value;
}

function toggleMenu() {
    if(endscreen.style.display !== "none"&&endscreen.style.display !== ""){
        $("#endscreen").slideUp("fast");
        $("#endscreenBackground").fadeOut("fast");
        _menue=false;
    } else {
        $("#endscreen").slideDown("fast", function () {
            document.getElementById("gameboxOverlayer").style.boxShadow ="";
            document.getElementById("gameboxOverlayerStun").style.boxShadow ="";
        });
        $("#endscreenBackground").fadeIn("fast");
        _menue=true;
        document.getElementById("scoreMenue").innerHTML = _score.toFixed(0);
    }
}

function toggleSlide(id) {
    if(endscreen.style.display !== "none"){
        $("#"+id).slideUp("fast");
    } else {
        $("#endscreen"+id).slideDown("fast");
    }
}

function toggleFade(id) {
    if (endscreen.style.display !== "none") {
        $("#" + id).fadeOut("fast");
    } else {
        $("#endscreen" + id).fadeOut("fast");
    }
}

function death() {
    if(!_godmode){
        _live = false;
        toggleMenu();
        playEffect("death");
        playEffect("endmusic");
    }
}

let info = [];

//info layer
//layer 0 = standart layer

function addInfo(text, layer) {
    if(layer===undefined){
        layer=0
    }
    info.push(
        [text, layer, _round]
    );
    updateInfoDisplay();
}

function updateInfoDisplay() {
    log("Round:"+info[info.length-1][2]+"|"+info[info.length-1][0]);
}

//Delete a dom object and remove it from the array. index in the array, array name, object name without the number as an string
//example:   removeFromArray(1, cellBalls,"cellBall");

function removeFromArray(id, array, object) {
    array.splice(id,1);
    document.getElementById(object+id).outerHTML = "";
    for(k=id;k<array.length;k++){
        document.getElementById(object+(k+1)).id = object+k;
    }
}

//calc the direction of the radis
//top direction = 0 or 1;
//left direction = 0 or 1;
//perDeg = 0 - 1;

function calcDeg(topDirection, leftDirection, perDeg) {

    let deg = 0;

    lowDeg = parseInt((90*perDeg-45).toFixed(0));

    if(topDirection===0&&leftDirection===0){
        deg = 315+lowDeg;
    }
    if(topDirection===0&&leftDirection===1){
        deg = 45-lowDeg;
    }
    if(topDirection===1&&leftDirection===0){
        deg = 225-lowDeg;
    }
    if(topDirection===1&&leftDirection===1){
        deg = 135+lowDeg;
    }

    if(deg===0){
        deg = 360;
    }

    return deg;
}

function calcDirectionHor(deg) {

    let hor = 0;

    switch (deg-((deg-45)%90)) {
        case 45:
            hor=0;
            break;
        case 135:
            hor=1;
            break;
        case 225:
            hor=1;
            break;
        case 315:
            hor=0;
    }
    return hor
}

function calcDirectionVer(deg) {

    let ver = 0;

    switch (deg-((deg-45)%90)) {
        case 45:
            ver=1;
            break;
        case 135:
            ver=1;
            break;
        case 225:
            ver=0;
            break;
        case 315:
            ver=0;
    }
    return ver
}

function calcLowDeg(deg) {
    return ((deg-45)%90+45)/90;
}

function calcForce(deg1,deg2,f1,f2) {

    let deg = 0;
    let force = 0;
    let deg1LessDeg2 = false;
    let angle = 0;

    if(deg1<deg2){
        deg1LessDeg2 = true;
        deg = deg2-deg1;
    } else {
        deg = deg1-deg2;
    }

    //console.log("Deg: "+deg);

    force = Math.sqrt(
        Math.pow(f1,2)
        +
        Math.pow(f2,2)
        +
        (Math.cos(deg*Math.PI/180)*2*f1*f2)
    );

    if(deg1LessDeg2){
        angle = Math.atan((f2*Math.sin(deg*Math.PI/180))/(f1+f2*(Math.cos(deg*Math.PI/180))))*180/Math.PI;
    } else {
        angle = Math.atan((f1*Math.sin(deg*Math.PI/180))/(f2+f1*(Math.cos(deg*Math.PI/180))))*180/Math.PI;
    }


 return [force,angle]
}

function posPlayerVariable() {
    _posTopPlayer =document.getElementById("player").offsetTop;
    _posLeftPlayer=document.getElementById("player").offsetLeft;
}