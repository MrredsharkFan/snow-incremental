function update_canvas() {
    const c = document.getElementById("main")
    const ctx = c.getContext("2d")

    // background (?)
    // hsl(240, 100%, 77%) at 36
    // hsl(240, 100%, 83%) at 32
    ctx.fillStyle = `hsl(210,90%,66%)`
    ctx.fillRect(0,0,500,500)
    ctx.fillStyle = "#88ff88"
    ctx.fillRect(0, 500, 500, -40)
    
    // shop
    ctx.fillStyle = "#664400"
    ctx.fillRect(350, 400, 120, 70)
    ctx.beginPath()
    ctx.moveTo(350, 400)
    ctx.lineTo(410, 350)
    ctx.lineTo(470, 400)
    ctx.fill()
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(360, 410, 30, 30)
    
    ctx.font = "14px monospace"
    ctx.fillText("Shop", 333.333, 333.333)

    //upgrades
    ctx.fillStyle = "#888866"
    ctx.fillRect(100, 400, 70, 70)
    ctx.fillStyle = "#ffffff"
    ctx.fillText("Upgrades", 100, 355)

    //clouds

    //player
    ctx.fillStyle = "#ffffee"
    ctx.fillRect(-2 + player.player_x_pos, 429, 14, 14)
    ctx.fillRect(player.player_x_pos, 445, 10, 28)

    if (player.player_x_pos > 340 && player.player_x_pos < 470) {
        player.tab = "shop"
    }
    else {
        player.tab = "none"
    }
}

function update(dt) {
    update_canvas()
    //the player, dt = delta time
    player.energy = player.energy.add(new Decimal(dt).times(funcs.energy_gain()))
    player.temp = new Decimal(32).sub(player.energy.add(1).log10().div(3).pow(2))
}



ct = Date.now()
let loop = setInterval(function () {

    var t = Date.now() - ct
    ct = Date.now()
    update(typeof (t) == "undefined" ? 0 : t/1000)

    
},1)