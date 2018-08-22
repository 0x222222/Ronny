//powerup

var powerups = [];

function spawnPowerup() {
    n = powerups.length;
    powerups.push(
        [ran(1,100), _round]
    );

    var div = document.createElement("div");
    div.id = "powerup"+n;
    div.className = "powerup";
    document.getElementById("gamebox").appendChild(div);
    length =h("powerup"+n);

    if(quadrant("player")===3){spawn(0,     760-length,     1600,   3200-length,    "powerup"+n)}
    if(quadrant("player")===4){spawn(0,     760-length,     0,      1600-length,    "powerup"+n)}
    if(quadrant("player")===1){spawn(760,   1520-length,    0,      1600-length,    "powerup"+n)}
    if(quadrant("player")===2){spawn(760,   1520-length,    1600,   3200-length,    "powerup"+n)}
    //powerup level 2 (Debuff)
    if(powerups[n][0]<=20){document.getElementById("powerup"+n).style.backgroundImage = "url(assets/powerup-shot.png)";return}
    //powerup level 3
    if(powerups[n][0]>95) {
        document.getElementById("powerup"+n).style.backgroundImage = "url(assets/powerup-ultra.png)";
        powerups[n][1]-=5;
    }
    //else powerup level 1
}

function powerupCollect() {

    for(a=0;a<powerups.length;a++){

        if(powerups[a][1]+_powerupLifetime<_round){
            removePowerup(a);
            continue;
        }

        if(collsionRound("player", ("powerup"+a))){
            getEffectOfPowerup(a);
            removePowerup(a);
        }
    }
}

function removePowerup(i) {
    document.getElementById("powerup"+i).outerHTML = "";
    powerups.splice(i,1);
    for(k=i;k<powerups.length;k++){
        document.getElementById("powerup"+(k+1)).id = "powerup"+k;
    }
    displayPowerups();
}

var buffs=[];

function addEffect(name, lifetime, displayname, type) {
    buffs.push(
        [_round, name, lifetime, displayname, type]
    );
    displayPowerups()
}

function removeEffectArray() {
    for(i=0;i<buffs.length;i++) {
        if (lifetime(buffs[i][0], buffs[i][2])) {
            removeEffect(buffs[i][1]);
            buffs.splice(i, 1);
            i--;
        }
    }
}

function removeEffect(name) {
    if(name==="speedup"){
        _playerSpeed-=5
    }
    if(name==="slow"){
        _playerSpeed+=3
    }
    if(name==="slowGameSpeed"){
        _gameSpeed-=10;
    }
    if(name==="reduceDamage"){
        _damage+=35;
    }

}

function getEffectOfPowerup(number) {

    //powerup level 3
    if(powerups[number][0]>95){
        switch (ran(0,3)){
            case 0:
                addHealth(1000);
                break;
            case 1:
                _playerSpeed+=2;
                break;
            case 2:
                _maxGamespeed+=2;
                break;
            case 3:
                _damage-=35;
                addEffect("reduceDamage",10,"Reduce Damage","powerup3");
                break;
        }
        return;
    }
    //powerup level 2
    if(powerups[number][0]<=20){
        switch (ran(0,5)){
            case 0:
                stun(75);
                break;
            case 1:
                damagePercentage(200);
                break;
            case 3:
                addEffect("slow",15,"Slow Player","powerup2");
                _playerSpeed-=3;
                break;
            case 4:
                _maxShots-=2;
                break;
            case 5:
                switch (ran(0,8)){
                    case 0:
                        _bounceHorizontal+=50;
                        break;
                    case 1:
                        _bounceHorizontal-=50;
                        break;
                    case 2:
                        _bounceHorizontal+=50;
                        _bounceVertical  +=50;
                        break;
                    case 3:
                        _bounceHorizontal-=50;
                        _bounceVertical  +=50;
                        break;
                    case 4:
                        _bounceHorizontal+=50;
                        _bounceVertical  -=50;
                        break;
                    case 5:
                        _bounceHorizontal -=50;
                        _bounceVertical   -=50;
                        break;
                    case 6:
                        _bounceVertical+=50;
                        break;
                    case 7:
                        _bounceVertical-=50;
                        break;
                }
                break;
            case 6:
        }
        return;
    }
    //powerup level 1
    switch (ran(0,7)){
        case 0:
        case 1:
        case 2:
        case 3:
            amountOfHeal = (250+_round)*(8+powerups[number][1]-_round)/10;
            if(_hp+amountOfHeal>0){
                addHealth(amountOfHeal);

            }
            break;
        case 4:
            addEffect("speedup",25,"Faster player","powerup1");
            _playerSpeed+=5;
            break;
        case 5:
            addEffect("slowGameSpeed",10,"Slower Game","powerup1");
            _gameSpeed+=10;
            break;
        case 6:
            _maxShots++;
            break;
    }
}

function displayPowerups() {

    var text = "";

    for (o=0;o<buffs.length;o++){
        text+="<p class='"+buffs[o][4]+"'>"+buffs[o][3]+"<p/>"
    }

    document.getElementById("effectBox").innerHTML = text;
}