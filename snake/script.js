get = id => document.getElementById(id)
Nai = (length, func) => Array(length).fill().map(func)
const Fills = {
    Def: "rgb(247, 231, 195)",
    Blue: "rgb(130, 190, 214)",
    Red: "rgb(221, 46, 68)"
}
const Heading = {
    Up: 0,
    Right: 1,
    Down: 2,
    Left: 3,
};
class Table {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.notes = Nai(row, (_, i) => {return Nai(col, (_, j) => {return {
                    fill: 0,
                    row: i,
                    col: j
                }
            })
        })
    }
    display() {
        var code = "";
        this.notes.forEach(row => {
            code += "<tr>"
            row.forEach(elem => {
                code += `<td id="${elem.row}${elem.col}" style="background-color:${elem.fill == 0 ? Fills.Def : elem.fill != -1 ? Fills.Blue : Fills.Red};">`
                code += "</td>"
            })
            code += "</tr>"
        })
        get("game").innerHTML = code;
    }
    colorIn(row, col, size) {
        if (this.notes[row][col].fill != 0) {
            if (this.notes[row][col].fill < 0) {
                this.notes[row][col].fill = size+1;
                return "apple"
            }
            return "end"
        }
        this.notes[row][col].fill = size;
    }
    update() {
        this.notes.forEach(row => {
            row.forEach(note => {
                if (note.fill > 0) {note.fill -= 1};
            })
        })
    }
}
class Snake {
    constructor(name, x, y, heading, table, size, controls=["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"]) {
        this.name = name;
        this.y = y;
        this.x = x;
        this.heading = heading;
        this.table = table;
        this.size = size;
        this.controls = controls;
        table.colorIn(y, x, size)
    }
    update() {
        [_ => {--this.y < 0 && stopper(this)},
         _ => {++this.x >= this.table.col && stopper(this)},
         _ => {++this.y >= this.table.row && stopper(this)},
         _ => {--this.x < 0 && stopper(this)}
        ][this.heading]();
        if (!stop) {
            var color = this.table.colorIn(this.y, this.x, this.size)
            if (color == "end") {
                console.log("end")
                stopper(this);
            } else if (color == "apple") {
                console.log("apple")
                this.size += 1;
            }
        }
    }
}

function start() {
    stop = 0;
    var game = new Table(50, 50);
    var snake = new Snake(get("snakeName").value, 0, 0, Heading.Right, game, 1, ["w", "d", "s", "a"])
    var snakes = [snake];

    get("state").style.color = Fills.Def;
    get("state").innerHTML = "Ongoing"

    window.addEventListener("keydown", event => {
        snakes.forEach(snake => {
            var head = snake.heading;
            var s = snake.controls.indexOf(event.key)
            if ((s + 2) % 4 != head && [0, 1, 2, 3].includes(s)) {
                snake.heading = s;
            }
        })
    })

    updater = setInterval(() => {
        snakes.forEach(snake => snake.update())
        game.display()
        game.update()
        var chance = Math.random() * 100;
        if (chance <= 5) {
            var x = Math.floor(Math.random() * game.col);
            var y = Math.floor(Math.random() * game.row);
            game.colorIn(y, x, -1);
        }
    }, 150)
}
function stopper(player) {
    stop++;
    get("state").style.color = player.fill;
    get("state").innerHTML = player.name + " has died..."
    clearInterval(updater);
}

