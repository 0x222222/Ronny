function f() {
    var rect = document.querySelector('#player').getBoundingClientRect();
    var left = rect.left;
    var top = rect.top;
    var width = rect.width;
    document.getElementById('Hierbinich').innerHTML = top.toString();
}
