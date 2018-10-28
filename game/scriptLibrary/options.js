let jsonObject;

async function getJson() {
    jsonObject = await $.getJSON("stages/json/stage0.json");
    applyOptions();
    game();
}


function spawnList() {
    if(jsonObject!==undefined){
        if(jsonObject["spawnList"][_round] !== undefined){
            summonList = jsonObject["spawnList"][_round];

            let argument = "",
                functionName = "",
                occurrence,
                stringLength;

            for(let key in summonList){
                argument = "";
                functionName = "";
                occurrence = summonList[key].search("\\(");
                stringLength = summonList[key].length


                if(occurrence!==-1){
                    argument = summonList[key].slice(occurrence+1,length-1)
                    functionName = summonList[key].slice(0,occurrence)
                    console.log(argument)
                    console.log(functionName)
                } else {
                    functionName = summonList[key];
                }

                if(functionName.search("create")!==-1){
                    playEffect("create")
                }

                window[functionName](argument);
            }
        }
    }

    for(let modulus in jsonObject["spawnListModulus"]){
        if(_round%parseInt(modulus.split(",")[0])===parseInt(modulus.split(",")[1])){
            summonList = jsonObject["spawnListModulus"][modulus];

            let argument = "",
                functionName = "",
                occurrence,
                stringLength;

            for(let key in summonList) {
                argument = "";
                functionName = "";
                occurrence = summonList[key].search("\\(");
                stringLength = summonList[key].length;


                if (occurrence !== -1) {
                    argument = summonList[key].slice(occurrence + 1, length - 1);
                    functionName = summonList[key].slice(0, occurrence);
                    console.log(argument);
                    console.log(functionName)
                } else {
                    functionName = summonList[key];
                }

                if (functionName.search("create") !== -1) {
                    playEffect("create")
                }

                window[functionName](argument);
            }
        }
    }
}

function applyOptions() {
    document.getElementById("fadeoutTitle").innerText = jsonObject["title"],
    document.getElementById("fadeoutDescription").innerText = jsonObject["description"]
}