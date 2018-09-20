

function move(mx, my, obj) {

    var top = parseInt(document.getElementById(obj).style.top.slice(0,-2));
    var left = parseInt(document.getElementById(obj).style.left.slice(0,-2));

    document.getElementById(obj).style.top = (top + mx)+"px";
    document.getElementById(obj).style.left = (left + my)+"px";
}

//move player

function movePlayer() {
    movePlayerHor = 0;
    movePlayerVer = 0;
    keynumber = 0;

    if(keyStatus.w&&_playerStun<=0){movePlayerHor += -_playerSpeed; keynumber++}
    if(keyStatus.a&&_playerStun<=0){movePlayerVer += -_playerSpeed; keynumber++}
    if(keyStatus.s&&_playerStun<=0){movePlayerHor += _playerSpeed;  keynumber++}
    if(keyStatus.d&&_playerStun<=0){movePlayerVer += _playerSpeed;  keynumber++}

    if(keynumber===1){
        movePlayerHor = movePlayerHor*1.4;
        movePlayerVer = movePlayerVer*1.4;
    }

    //rush
    if(keyStatus.space&&_hp>_rushModeEnergyCost+1){
        movePlayerHor = movePlayerHor*_rushModeBoost;
        movePlayerVer = movePlayerVer*_rushModeBoost;
        changeHp(-_rushModeEnergyCost);
    }
    //jump
    if(keyStatus.c&&_lastTelepor+_teleportCooldown<_round&&!keyStatus.e&&_hp>_teleportEnergyCost+1){
        movePlayerHor = movePlayerHor*_teleportDistance;
        movePlayerVer = movePlayerVer*_teleportDistance;
        changeHp(-_teleportEnergyCost);
        _lastTelepor = _round;
    }


    move(movePlayerHor+_bounceHorizontal+_windX, movePlayerVer+_bounceVertical+_windY, "player");



    if(_bounceVertical!==0){
        for(k=0;k<2;k++){
            if(_bounceVertical>0){
                _bounceVertical--;
            }
            if(_bounceVertical<0){
                _bounceVertical++;
            }
        }
    }

    if(_bounceHorizontal!==0){
        for(k=0;k<2;k++){
            if(_bounceHorizontal>0){
                _bounceHorizontal--;
            }
            if(_bounceHorizontal<0){
                _bounceHorizontal++;
            }
        }
    }

    if(_playerStun>0){
        _playerStun--;
    }
    if(_playerStun===0){
        _playerStun = -1;
        document.getElementById("gameboxOverlayerStun").style.boxShadow ="";
    }



    if(collisionBorderPlayer()){
        damage();
    }
    
    _lastMove = !(movePlayerHor === 0 && movePlayerVer === 0);
    //Background

    pt = PT();
    pl = PL();

    if(pt<1520&&pt>0){
        document.getElementById("gamebox").style.backgroundPositionY = ((1520-pt)/1520*300-300)+"px";
    }
    if(pl<3200&&pl>0){
        document.getElementById("gamebox").style.backgroundPositionX = ((3200-pl)/3200*600-600)+"px";
    }
}

function gameSpeedStanding() {
    if(!_lastMove&&_gameSpeed>_minGamespeed){
        _gameSpeed--;
    }
    if(_lastMove&&_gameSpeed<_maxGamespeed){
        _gameSpeed++
    }


}

function changePlayerColor() {
    document.getElementById("player").style.filter = "hue-rotate("+(240-(_gameSpeed-5)*12)+"deg)"
}


