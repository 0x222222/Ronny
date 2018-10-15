function backgroundmusic() {
    let audio = new Audio("assets/music/Beginning.wav");
    audio.play();
}

function playEffect(effect) {
    //def
    let powerup = new Audio("assets/music/powerup.wav");
    let damage = new Audio("assets/music/damage.wav");
    let debuff = new Audio("assets/music/debuff.wav");
    let bounce = new Audio("assets/music/bounce.wav");
    let powerupExtreme = new Audio("assets/music/powerupExtreme.wav");
    let shot = new Audio("assets/music/shot.wav");
    let endmusic = new Audio("assets/music/endmusic.wav");
    let death = new Audio("assets/music/death.wav");
    let despawn = new Audio("assets/music/despawn.wav");
    let spawn = new Audio("assets/music/spawn.wav");
    let create = new Audio("assets/music/create.wav");


    switch (effect){
        case "powerup":
            powerup.play();
            break;
        case "create":
            create.play();
            break;
        case "death":
            death.play();
            break;
        case "debuff":
            debuff.play();
            break;
        case "damage":
            damage.play();
            break;
        case "bounce":
            bounce.play();
            break;
        case "shot":
            shot.play();
            break;
        case "powerupExtreme":
            powerupExtreme.play();
            break;
        case "endmusic":
            endmusic.play();
            break;
        case "despawn":
            despawn.play();
            break;
        case "spawn":
            spawn.play();
            break;

        default:
            return false;
    }
}

_lastDamageSound = 0;

function playDamageSound(){
    if(_lastDamageSound+200<_time){
        _lastDamageSound = _time;
        playEffect("damage");
    }
}