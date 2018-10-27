function getRound() {
    if(_round<_time/_ticksForRound){
        round();
        _round++
    }
}

function round() {
    _score += 15*(1+_round/50)+2*_hp/1000+10/_gameSpeed;

    document.getElementById("time").innerHTML = " |Round: "+_round;

    document.getElementById("debug1").innerHTML = " |FPS: "+_fps.toFixed();
    document.getElementById("debug2").innerHTML = " |FPS Cal. time: "+_fpsCalcDiffernce.toFixed()+"%";

    document.getElementById("debugExtend2").innerHTML = " Quadrant: "+quadrant("player");
    document.getElementById("debugExtend3").innerHTML = " Damage: "+ _damage;
    document.getElementById("debugExtend4").innerHTML = " Gamespeed: "+_gameSpeed;
    document.getElementById("debugExtend5").innerHTML = " Playerspeed: "+_playerSpeed;
    //document.getElementById("debugExtend6").innerHTML = " Shots: "+shots.length+"/"+_maxShots;
    document.getElementById("score").innerHTML = _score.toFixed(0);

    removeEffectArray();

    if(_lastReg+_hpReg<_round&&_round!==0){
        healStandard();
        _lastReg=_round;
    }

    if(_round%_speedTimeIncreaseStand===0){
        gameSpeedStanding()
    }

    //if(_round%5===0){
    //    console.log(_round)
    //}

    if(_round%5===0&&_round!==0){
        damageIncrease();
    }

    if(_round%10===0&&_round!==0){
        additionHeal();
    }

    //TEMP

    if(_round%42===0&&_round!==0){
        _maxGamespeed--
    }



    if(ran(0, (_powerupRandom+(Math.round((400-_round)/40)))*(1+powerups.length*4))===1){
        spawnPowerup();
        _debugString+="\n"+_round+","+40+","+powerups.length*4+","+((_powerupRandom+(Math.round((400-_round)/40)))*(1+powerups.length*4));
        //console.log(_round);
    } else {
        _debugString+="\n"+_round+","+0+","+powerups.length*4+","+((_powerupRandom+(Math.round((400-_round)/40)))*(1+powerups.length*4));
    }



    if(_spawn){
        //spawn
        spawnList()
    }
}

