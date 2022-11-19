get = id => document.getElementById(id)

acceptable = "abcdefghijklmnopqrstuvwxyz "
var keyboard_press_sound = document.createElement("audio");
keyboard_press_sound.src = "./sounds/keyboard-press2.mp3";

var backspace_press_sound = document.createElement("audio");
backspace_press_sound.src = "./sounds/keyboard-press-sound-effect.mp3";

var spacebar_press_sound = document.createElement("audio");
spacebar_press_sound.src = "./sounds/spacebar-press.mp3";

var power_buzz = document.createElement("audio");
power_buzz.src = "./sounds/power-buzz.mp3"

power_buzz.loop = true;
power_buzz.volume = 0.3

async function print(message, elementID) {
    for (char of message) {
        get(elementID).innerHTML += char;
        if (char == "\n") {
            get(elementID).appendChild(document.createElement('br'));
        }
        if (",.?!:".includes(char)) {
            await sleep(300)
        } else {
            await sleep(20);
        }
    }
}
function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}


schedule_re = "Hello, what are you doing here in this lovely little";
schedule_ac = "Monday █ Tuesday █ Wednesday █ Thursday █ Friday\n████████████████████████████████████\nVisArt _█ Maths _█ Grammar █ Geography █ Chem\nInformT █ Lit_ _ █ Lit _ _ █ Physical _█ French\nPhysics █ French █ Maths _ █ English _ █ Maths\nChem __ █ Bio __ █ Physics █ Biology _ █ English\nInformT █ PhysEd █ InformT █ Math _ _ _█ InformT\nLit _ _ █ History█ History █ French _ _█ Physics\nEnglish █ HomeR _█ Music _ █ _ _ _ _ __█" 
ifLink = "opening..."

command_answer = {
    "" : "type help to get a list of available commands",
    "hi" : "Welcome to my website. Pretty cozy, ain't it? Try out some of the other commands!",
    "bye": "It was great having you :), bye!!",
    "who am i" : "The better question is: who are YOU?",
    "schedule" : schedule_ac,
    "what is the purpose of this" : "it's moi weaubsite",
    "github": ifLink,
    "amoeba": ifLink,
    "tron": ifLink,
    "snake": ifLink,
}
links = {
    "github": "https://github.com",
    "amoeba": "./amoeba/index.html",
    "tron": "./tron/index.html",
    "snake": "./snake/index.html"
}
  
window.addEventListener('focus', function() {
    power_buzz.play();
});

window.addEventListener('blur', function() {
    power_buzz.pause();
});

document.body.addEventListener("keydown", function(event) {
    if (event.key == " ") {
        var clone_audio = spacebar_press_sound.cloneNode();
        clone_audio.volume = 1;
    }
    else if (event.key == "Backspace") {
        var clone_audio = spacebar_press_sound.cloneNode();
        clone_audio.volume = 0.20;
    }
    else {
        var clone_audio = keyboard_press_sound.cloneNode();
        clone_audio.volume = 0.10;
    }
    clone_audio.play();
    power_buzz.play();

    console.log(event)
    var current = get("current_writing").innerHTML;
    var after = get("after_write").innerHTML;

    if (acceptable.includes(event.key)) {
        current = current.replace(/█/g, "");
        current += acceptable.includes(event.key) ? event.key : "";
        if (after.length == 0) {
            after = after.replace(/_/g, "");
            current += "█";
        }
    }
    else if (event.key == "Enter") {
        let command = current.slice().replace(/█/g, "");
        if (command == "help") {
            get("feeder").innerHTML = "";
            let answer = Object.keys(command_answer);
            print(answer.slice(1, answer.length).join("..\n"), "feeder");
        }
        else {
            let answer = command_answer[command];
            console.log("you typed: " + command);
            if (answer != undefined) {
                get("feeder").innerHTML = "";
                print(answer, "feeder");
            }
            if (answer == ifLink) {
                window.location = links[command];
            }
        }
        current = "";
    }
    else if (event.key == "Backspace") {
        if (current[current.length - 1] == "█") {
            current = current.slice(0, current.length - 2);
        } else {
            current = current.slice(0, current.length - 1);
        }
    }
    else if (event.key == "ArrowLeft" && current.length != 0) { //left
        current = current.replace(/█/g, "");
        after = after.replace(/_/g, "");
        after = "_" + current[current.length - 1] + after
        current = current.slice(0, current.length - 1);
    }
    else if (event.key == "ArrowRight" && after.length != 0) { //right
        current += after[1];
        after = after[0] + after.slice(2);
        if (after.length == 1) {
            after = "";
        }

    }
    //console.log(after.length);
    get("after_write").innerHTML = after;
    get("current_writing").innerHTML = current;
});

document.body.addEventListener("keyup", () => {
    get("current_writing").innerHTML = get("current_writing").innerHTML.replace(/█/g, "")
});

var intervalID = setInterval(blink1, 1500);

function blink1() {
    if (get("after_write").innerHTML == "") {
        get("current_writing").innerHTML += "█";
        setTimeout(blink2, 750)
    }
}
function blink2() {
    get("current_writing").innerHTML = get("current_writing").innerHTML.replace(/█/g, "")
    get("after_write").innerHTML = get("after_write").innerHTML.replace(/█/g, "");
}
