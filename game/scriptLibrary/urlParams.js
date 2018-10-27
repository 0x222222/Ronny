

var a = "te";

let urlParams = new URLSearchParams(location.search);
let myParam = urlParams.entries();




function getParams() {
    let parameter = myParam.next();
    while(!parameter.done){

        /*log parameter*/
        //console.log(parameter);

        /*proceed parameter*/

        let name = parameter.value[0];
        let value = parameter.value[1];

        if(name.slice(0,1)==="_"){
            overwriteGlobalVariable(name, value)
        }

        if(name.slice(0,1)==="*"){
            initialStages()
        }


        parameter = myParam.next();
    }
}



getParams();

//change golobal variable
//using: ?_VARIABLENAME0=VALUE0&_VARIABLENAME1=VALUE1

let _test0 = 3;

function overwriteGlobalVariable(name, value) {

    if(value==="false"){
        this[name] = false;
        return
    }

    if(value==="true"){
        this[name] = true;
        return
    }
    if(isNaN(value)){
        this[name] = value;
        return
    }

    this[name] = parseInt(value);
}

function initialStages() {
    stage();
}

