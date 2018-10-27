function specialInputDown(key) {
        switch (key) {
            case 'e':
                reduceStun();
                break;
            default:
                return false;
        }
}

function reduceStun() {
    if(_playerStun>=30){
        _playerStun-=30;
    } else {
        if(_playerStun>0){
            _playerStun = 0;
        }
    }
}