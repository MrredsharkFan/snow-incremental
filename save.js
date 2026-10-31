function initPlayer() {
    return {
        version: "1.0.0",
        snow: new Decimal(0),
        energy: new Decimal(0),
        temp: new Decimal(30),
        player_x_pos: 0,

        generators: [new Decimal(1), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
        upgrades: [],

        tab: "none"
    }
}

NAME = "snow-incremental" //place you want to direct your local storage thing
//change this to sth else to enable saving!!!



player = initPlayer()

const player_vars_d = ["snow","energy","temp"]
const player_vars_l = ["generators"]
const player_vars_str = ["player_x_pos","upgrades"]

function detectNaN() {
    for (var i in player_vars_d) {
        if (player[player_vars_d[i]].isNan()) { player[player_vars_d[i]] = initPlayer()[player_vars_d[i]] }
    }
    for (var i in player_vars_l) {
        for (var j in player[player_vars_l[i]]) {
            if (player[player_vars_l[i]][j].isNan()) {
                console.log(player[player_vars_l[i]][j])
                player[player_vars_l[i]][j] = initPlayer()[player_vars_l[i]][j]
            }
        }
    }
    for (var i in player_vars_str) {
        if (player[player_vars_str[i]] == NaN) { player[player_vars_str[i]] = initPlayer()[player_vars_str[i]] }
    }
}



function save() {
    detectNaN()
    localStorage.setItem(NAME, JSON.stringify(player))
}

if (NAME != "67") s = setInterval(save, 1000, 1)

function load() {
    var u = JSON.parse(localStorage.getItem(NAME))
    console.log(JSON.parse(localStorage.getItem(NAME)))
    for (var i in player_vars_d) {
        player[player_vars_d[i]] = new Decimal(u[player_vars_d[i]])
    }
    for (var i in player_vars_l) {
        player[player_vars_l[i]] = initPlayer()[player_vars_l[i]]
        for (var j in u[player_vars_l[i]]) {
            player[player_vars_l[i]][j] = new Decimal(u[player_vars_l[i]][j])
        }
    }
    for (var i in player_vars_str) {
        player[player_vars_str[i]] = u[player_vars_str[i]]
        if (player[player_vars_str[i]] == undefined) {
            if (player_vars_str[i] == "version") { //old save revert
                //idk
            }
            else {
                player[player_vars_str[i]] = initPlayer()[player_vars_str[i]]
            }
        }
    }
}


const banks =
    [
            ]

load()
player.version = "1.0.0"

function bank(num) {
    if (confirm("Are you sure you want to use this save? This will OVERRIDE your progress!")) {
        clearInterval(s)
        localStorage.setItem(NAME, banks[num])
        location.reload()
    }
}

function import_player(data) {
    console.log(data)
    if (confirm("Are you sure you want to use this save to override the previous save?")) {
        clearInterval(s)
        localStorage.setItem(NAME, data)
        location.reload()
    }
}