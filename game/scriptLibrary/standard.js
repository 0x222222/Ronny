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
    }
}

var info = [];

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