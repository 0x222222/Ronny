/**
 * Created by hschach on 21.08.2018.
 */

var fpsQueue = [];

function fps() {
    fpsQueue.push(
        [
            (new Date()).getTime(),
            _time
        ]
    );
    if(fpsQueue.length>11){
        fpsQueue.shift();

        time1fpsTakes = (fpsQueue[10][0]-fpsQueue[0][0])/10;
        time1fpsTakesWithoutCalc = (fpsQueue[10][1]-fpsQueue[0][1])/10;

        _fps = 1000/time1fpsTakes;
        _fpsWithoutCalc = 1000/time1fpsTakesWithoutCalc;
        _fpsCalcDiffernce =100/time1fpsTakes*Math.abs(time1fpsTakesWithoutCalc-time1fpsTakes);
    }

    //console.log(_fps);
}

function benchmark(type, iterate) {


    console.log("benchmark type = "+type);
    clock = new Date().getTime();
    if(type==="getDom"){
        for(i=0;i<iterate;i++){
            testValue = document.getElementById("player").style.width;
        }
    }

    if(type==="setDom"){
        for(i=0;i<iterate;i++){
            document.getElementById("player").style.height = i+"px";
        }
        document.getElementById("player").style.height = 100+"px";
    }

    if(type==="getDomPreset"){
        width = document.getElementById("player").style.width;
        for(i=0;i<iterate;i++){
            testValue = width;
        }
    }
    if(type==="if1"){
        for(i=0;i<iterate;i++){
            if(i%1===0){

            }
        }
    }
    if(type==="if10"){
        for(i=0;i<iterate;i++){
            if(i%10===0){

            }
        }
    }
    if(type==="if100"){
        for(i=0;i<iterate;i++){
            if(i%100===0){

            }
        }
    }
    if(type==="ifMulti5"){
        for(i=0;i<iterate;i++){
            value = i%5;
            if(value===0){continue}
            if(value===1){continue}
            if(value===2){continue}
            if(value===3){continue}
            if(value===4){}
        }
    }
    if(type==="switchMulti5"){
        for(i=0;i<iterate;i++){
            value = i%5;
            switch (value){
                case 0: break;
                case 1: break;
                case 2: break;
                case 3: break;
                case 4: break;
            }
        }
    }

    if(type==="set"){
        for(i=0;i<iterate;i++){
            a = 0.1;
        }
    }
    console.log(((new Date().getTime())-clock)+"ms");
}