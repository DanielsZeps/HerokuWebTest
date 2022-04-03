function backgroundChange(value) {
    document.body.style.backgroundColor = value;
}
function randomColor() {
    return Math.floor( Math.random() * 256);
}
function renderBackground() {
    var temp = "rgb(" + randomColor() + ", " + randomColor() + ", " + randomColor() + ")";
    backgroundChange(temp);
}
