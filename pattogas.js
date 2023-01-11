get = id => document.getElementById(id)

var dir = 1
var dir_x = 1
t = 1

setInterval(_ => {
    //console.log(get("pattogoKor").cy.baseVal.value);
    if (t == 10 || t == 0) {
        dir *= -1
    }
    t += dir * 1;
    //get("pattogoKor").cy.baseVal.value = 0.5*t**2 + 140;
    get("mozgoPattogoKor").cy.baseVal.value = 0.5*t**2 + 50;
    //get("pattogoKor").cx.baseVal.value += 100 * dir
}, 1)

setInterval(_ => {
    var cx = get("mozgoPattogoKor").cx.baseVal.value
    if (cx == 40 || cx == 500) {
        dir_x *= -1
    }
    console.log(dir_x)
    get("mozgoPattogoKor").cx.baseVal.value += 10*dir_x;
}, 1)