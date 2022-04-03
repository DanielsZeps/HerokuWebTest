psition = [0, 0]
id = -1
color = "rgb(0,0,0)"
function returnUserData() {
    const d = new Date();
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
    }
    xhttp.open("GET", "/user/" + id + " " + d.getTime());
    xhttp.send();
}
function getId() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        id = this.responseText;
    }
    xhttp.open("GET", "/code");
    xhttp.send();
}
function returnValue(value) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        return this.responseText;
    }
    xhttp.open("GET", "/" + value);
    xhttp.send();
}
gameData = []
function responseData() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (this.readyState == 4 && this.status == 200) {
            gameData.push(this.responseText);
            if (gameData.length > 10) {
                gameData.shift();
            }
        }
    }
    xhttp.open("GET", "/textResponse");
    xhttp.send();
}
function renderUsers() {
    a = gameData.shift();
    a = JSON.parse(a);
    for (x in a) {
        try {
            element = document.getElementById(a[x]["id"]);
            if (element == null) {
                throw "Error"
            }
        } catch {
            element = document.createElement("user");
            element.id = a[x]["id"];
            element1 = document.getElementById("plane");
            element1.appendChild(element);
        }
        try {element.style.left = a[x]["left"];} catch {element.style.left = 0};
        try {element.style.top = a[x]["top"];} catch {element.style.top = 0};
    }
}
function updateValue(index, value) {
    const d = new Date();
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
    }
    xhttp.open("GET", "/user/" + id + " " + String(index) + " " + String(value));
    xhttp.send();
}
function movePlayer() {
    x = event.key;
    if (x == "a" || x == "A") {psition[0] -= 5; updateValue("left", psition[0]);
    } else if (x == "d" || x == "D") {psition[0] += 5; updateValue("left", psition[0]);
    } else if (x == "w" || x == "W") {psition[1] -= 5; updateValue("top", psition[1]);
    } else if (x == "s" || x == "S") {psition[1] += 5;} updateValue("top", psition[1]);
}
