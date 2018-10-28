function healStandard() {
    if(_standardHeal){
        if(_hp<_hpMax){
            _hp += _hpAmount*2;

            if(_hp > _hpMax){
                _hp = _hpMax;
            }
        }


        if(_hpAmount>12){_hpAmount--;
        }

        if(_hpAmount%6===0&&_hpAmount!==60&&_hpReg!==3){
            _hpReg--;
        }

        showHealth();
    }
}

function additionalHeal() {
    if(_additionalHeal){
        if(_hp<_hpMax){
            _hp += (60-_hpAmount);
            hp = _hp.round;

            if(_hp > _hpMax){
                _hp = _hpMax;
            }
        }
        showHealth();
    }
}

function addHealth(value) {
   _hp += value;
    showHealth();
    showHealth();
}

function damage() {

    //debug
    _DB_lastDamage.push(["Round: "+_round,"Time: "+_time,"HP before: "+_hp,"Damage: "+_damage,"HP after: "+(_hp-_damage)]);
    _hp -= _damage;


    if(_hp<1){
        _hp = 0;
        death();
    }

    //document.getElementById("gamebox").style.boxShadow ="inset 0px 0px 1500px  red ";
    _lastDamage = _time;
    playDamageSound();
    showHealth();
}

function damagePercentage(value) {

    //debug
    _DB_lastDamage.push(["Round: "+_round,"Time: "+_time,"HP before: "+_hp,"Damage: "+_damage*value/100,"HP after: "+(_hp-_damage*value/100)])

    _hp -= _damage*value/100;

    if(_hp<1){
        _hp = 0;
        death()
    }


    //document.getElementById("gamebox").style.boxShadow ="inset 0px 0px 1500px  red ";
    _lastDamage = _time;
    showHealth();
    playDamageSound();
}

function damageIncrease() {
    _damage += _damageIncrease;
}

function setDamage(value) {
    _damage = parseFloat(value);
}

function changeHp(value) {
    _hp += parseFloat(value);


    showHealth();

    if(_hp<1){
        _hp = 0;
        death()
    }
}


function setHealth(value) {
    _hp = parseFloat(value);
    showHealth();
    if(_hp<1){
        _hp = 0;
        death()
    }
}

function showHealth() {
    if (_hp <= 0) {
        changeHealthbarLength(0);
        return true
    }
    if (_hp > 0 && _hp < 260) {
        changeHealthbarLength(1);
        return true
    }
    if (_hp >= 260 && _hp < 360) {
        changeHealthbarLength(2);
        return true
    }
    if (_hp >= 360 && _hp < 440) {
        changeHealthbarLength(3);
        return true
    }
    if (_hp >= 440 && _hp < 520) {
        changeHealthbarLength(4);
        return true
    }
    if (_hp >= 520 && _hp < 600) {
        changeHealthbarLength(5);
        return true
    }
    if (_hp >= 600 && _hp < 680) {
        changeHealthbarLength(6);
        return true
    }
    if (_hp >= 680 && _hp < 760) {
        changeHealthbarLength(7);
        return true
    }
    if (_hp >= 760 && _hp < 840) {
        changeHealthbarLength(8);
        return true
    }
    if (_hp >= 840 && _hp < 920) {
        changeHealthbarLength(9);
        return true
    }
    if (_hp >= 920) {
        changeHealthbarLength(10);
        return true
    }
}

function changeHealthbarLength(health) {
    document.getElementById("debug0").innerHTML = " |Energy: "+_hp.toFixed(0);
    range = 0;
    overload = false;
    

    if(health<=10&&health>=0){
        range = health.toFixed(0);
    }
    if(health<=0){
        range = 0;
    }
    if(_hp>1000){
        overload = true;
        range = 10;
    }

    color = "rgb("+(250-(range*25).toFixed(0))+","+(range*25).toFixed(0)+",50)";

    for(i=0;i<range;i++){
        document.getElementById("healthbar"+i).style.backgroundColor = color;
    }

    for(i=range;i<10;i++){
        document.getElementById("healthbar"+i).style.backgroundColor = "transparent";
    }
    if(overload){
        document.getElementById("healthtableOverlayer").style.boxShadow = "0 -10px 20px yellow";
    } else {
        if(_hp<100){
            document.getElementById("healthtableOverlayer").style.boxShadow = "0 -10px 20px red";
        } else {
            document.getElementById("healthtableOverlayer").style.boxShadow = "";
        }
    }
}


