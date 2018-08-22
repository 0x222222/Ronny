

//register mouse pos
document.onmousemove = function(e) {
    _mouseX = e.pageX;
    _mouseY = e.pageY;
};

document.onclick = function (e) {
    _mouseclick = true
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
    ArrowRight: false
};

document.addEventListener('keydown', function(event) {
document.onkeydown = document.onkeyup = document.onkeypress = handle;
function handle(e) {



    if(e.type === "keypress") {

        keyStatus[e.key] = true;
        document.getElementById("debugExtend0").innerHTML = "last down: "+e.key;

        if(e.key==="ArrowUp"  ){keyStatus.w = true}

        if(e.key==="ArrowDown"){keyStatus.s = true}

        if(e.key==="ArrowLeft"){keyStatus.a = true}

        if(e.key==="ArrowRight"){keyStatus.d = true}


    }
    if(e.type === "keyup") {
        keyStatus[e.key] = false;

        document.getElementById("debugExtend1").innerHTML = "last up: "+e.key;

        if(e.key==="ArrowUp"   ||e.key==="Shift"){keyStatus.w = false}

        if(e.key==="ArrowDown" ||e.key==="Shift"){keyStatus.s = false}

        if(e.key==="ArrowLeft" ||e.key==="Shift"){keyStatus.a = false}

        if(e.key==="ArrowRight"||e.key==="Shift"){keyStatus.d = false}

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
