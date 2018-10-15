function glowHealth() {
    if(_glow>2800){
        _glow = 0;
        document.getElementById("glow").style.filter = "opacity(100%)";
    }
    document.getElementById("glow").style.left = (_glow-300)+"px";
    //console.log(_glow);

    if(_glow>2600&&_glow<=2900){
        document.getElementById("glow").style.filter = "opacity("+(100-(_glow-2600)/3)+"%)";
    }
    _glow+=10;
}

function removeVignette() {
    if(_lastDamage+100<_time){
        document.getElementById("gamebox").style.boxShadow ="";
    }
}

function test() {
    log(test)
}