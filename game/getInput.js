

//register mouse pos
document.onmousemove = function(e) {
    _mouseX = e.pageX;
    _mouseY = e.pageY;
};

document.onclick = function (e) {
    if(e.button===2){
        _mouseclickRight = true
    }
};


//register key input

var keyStatus = {
    q: false,
    w: false,
    e: false,
    a: false,
    s: false,
    d: false,


    c: false,
    v: false,



    space: false,

    ArrowUp:    false,
    ArrowDown:  false,
    ArrowLeft:  false,
    ArrowRight: false,

    F1: false,
    F2: false,
    F3: false,
    F4: false,
    F5: false,
    F6: false,
    F7: false,
    F8: false,
    F9: false,
    F10: false,
    F11: false,
    F12: false,

    //Special

    SP_SHIFT: false,
};

document.addEventListener('keydown', function(event) {
document.onkeydown = document.onkeyup = document.onkeypress = handle;
function handle(e) {

    keyStatus.SP_SHIFT = e.shiftKeyshiftKey;


    if(e.type === "keypress") {

        keyStatus[e.key.toLowerCase()] = true;
        document.getElementById("debugExtend0").innerHTML = "last down: "+e.key;

        if(e.key==="ArrowUp"  ){keyStatus.w = true}

        if(e.key==="ArrowDown"){keyStatus.s = true}

        if(e.key==="ArrowLeft"){keyStatus.a = true}

        if(e.key==="ArrowRight"){keyStatus.d = true}

        if(e.key==="Escape"){
            toggleMenu()
        }
        if((e.key.toLowerCase() ==="r"&&!_live)||(e.key.toLowerCase() ==="r"&&_live&&endscreen.style.display !== "none"&&_live&&endscreen.style.display !== "")){
            window.open("game.html","_self")
        }
        if(keyStatus.F8&&keyStatus.F9){
            $( "#debug" ).slideToggle( "fast");
            $( "#debugExtend" ).slideToggle( "fast");
        }
        specialInputDown(e.key);
    }
    if(e.type === "keyup") {
        keyStatus[e.key.toLowerCase()] = false;

        document.getElementById("debugExtend1").innerHTML = "last up: "+e.key;

        if(e.key==="ArrowUp"   ||e.key==="SP_SHIFT"){keyStatus.w = false}

        if(e.key==="ArrowDown" ||e.key==="SP_SHIFT"){keyStatus.s = false}

        if(e.key==="ArrowLeft" ||e.key==="SP_SHIFT"){keyStatus.a = false}

        if(e.key==="ArrowRight"||e.key==="SP_SHIFT"){keyStatus.d = false}
    }

    if(e.key===" "){
        if(e.type === "keypress") {
            keyStatus["space"] = true;
        }
        if(e.type === "keyup") {
            keyStatus["space"] = false;
        }
    }

}
});