//powerup

var powerups = [];
var powerupsAktiv = [];

function spawnPowerup() {
    playEffect("spawn");
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
    if(powerups[n][0]<=20){
        $("#powerup"+n).addClass("debuff");
        return
    }
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
            playEffect("despawn");
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
            displayPowerups()
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
        _playerSpeed-=4
    }
    if(name==="reduceDamage"){
        _damage+=35;
    }
    if(name==="toFast"){
        _playerSpeed-=10;
    }
    if(name==="wind"){
        _windY = _windX = 0;
    }
    if(name==="shield"){
        setHealth(_powerupShieldLastHp+300)
    }
}

function getEffectOfPowerup(number) {

    //powerup level 3
    if(powerups[number][0]>95){
        playEffect("powerupExtreme");
        switch (ran(0,6)){
            case 0:
                addHealth(1000);
                addActiveEffect("powerup3", "Health Boost");
                break;
            case 1:
                _powerupShieldLastHp = _hp;
                setHealth(1000000);
                addEffect("shield",8 , "Shield", "powerup3");
                break;
            case 2:
                _maxGamespeed+=2;
                addActiveEffect("powerup3", "Slower Gamer");
                break;
            case 3:
                _damage-=35;
                addEffect("reduceDamage",30,"Reduce Damage","powerup3");
                break;
            case 4:
                _hpReg=-2;
                addActiveEffect("powerup3", "More Regeneration");
                break;
            case 5:
                _gameSpeed+=5;
                addActiveEffect("powerup3", "Gamespeed--");
                break;
            case 6:

                break;
        }
        return;
    }
    //powerup level 2
    if(powerups[number][0]<=20){
        playEffect("debuff");
        switch (ran(0,12)){
            case 0:
                stun(75);
                addActiveEffect("powerup2", "Stun");
                break;
            case 1:
                damagePercentage(200);
                addActiveEffect("powerup2", "Damage");
                break;
            case 3:
                addEffect("slow",15,"Slow Player","powerup2");
                _playerSpeed-=3;
                break;
            case 4:
                _maxShots-=2;
                addActiveEffect("powerup2", "Reduce Shots");
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
                addActiveEffect("powerup2", "Bounce");
                break;
            case 6:
                switch (ran(0,4)){
                    case 0:
                        _windX=10;
                        break;
                    case 1:
                        _windX=-10;
                        break;
                    case 2:
                        _windY=10;
                        break;
                    case 3:
                        _windY=-10;
                }
                addEffect("wind", 15,"Wind", "powerup2");
                break;
            case 7:
                addEffect("toFast",10,"To fast","powerup2");
                _playerSpeed+=10;
                break;
            case 8:
                createBall();
                addActiveEffect("powerup2", "Red Ball");
                break;
            case 9:
                createFastBall();
                addActiveEffect("powerup2", "Fast Ball");
                break;
            case 10:
                createFollowBall();
                addActiveEffect("powerup2", "Follow Ball");
                break;
            case 11:
                _gameSpeed-=4;
                addActiveEffect("powerup2", "Gamespeed++");
                break;
        }
        return;
    }
    //powerup level 1
    playEffect("powerup");
    switch (ran(0,13)){
        case 0:
        case 1:
        case 2:
        case 3:
            amountOfHeal = (250+_round)*(8+powerups[number][1]-_round)/10;
            if(_hp+amountOfHeal>0){
                addHealth(amountOfHeal);
            }
            addActiveEffect("powerup1", "Health Boost");
            break;
        case 4:
            addEffect("speedup",25,"Faster player","powerup1");
            _playerSpeed+=3;
            break;
        case 5:
            addEffect("slowGameSpeed",10,"Slower Game","powerup1");
            _gameSpeed+=10;
            _playerSpeed+=4;
            break;
        case 6:
            addActiveEffect("powerup1", "More Shots");
            _maxShots++;
            break;
        case 7:
            _gameSpeed+=2;
            addActiveEffect("powerup1", "Gamespeed--");
            break;
        case 8:
            _damage-=3;
            addActiveEffect("powerup1", "Reduce Damage");
            break;
        case 9:
            _rushModeBoost++;
            addActiveEffect("powerup1", "Faster rush");
            break;
        case 10:
            _shootSpeed+=2;
            addActiveEffect("powerup1", "Faster Shot");
            break;
        case 11:
            _hpReg--;
            addActiveEffect("powerup1", "More Regeneration");
            break;
        case 12:
            _teleportDistance+=5;
            if(_teleportEnergyCost>=2){
                _teleportEnergyCost-=2
            }
            if(_teleportCooldown>=0.2){
                _teleportCooldown-=0.2
            }
            addActiveEffect("powerup1", "Better Teleport");
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

function addActiveEffect(type, name) {
    powerupsAktiv.push(
        [
            type, name
        ]
    );
    if(powerupsAktiv.length>4){
        powerupsAktiv.shift();
    }
    let text="";
    for (o=0;o<powerupsAktiv.length;o++){
        text="<p class='"+powerupsAktiv[o][0]+"'>"+powerupsAktiv[o][1]+"<p/>"+text;
        //log(text)
    }
    document.getElementById("effectLast").innerHTML = text;
}