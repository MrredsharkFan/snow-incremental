//you can create more of those things, like
/**
 * const rebirth = {
 * rp_gain: function(){return player.points.add(1).slog().add(1).slog().add(1).pow(595959).sub(1)},
 * rp_effect: function(){return new Decimal(67)}
 * 
 * }
 */

const gen_data = [
    [25,1],
    [500,10],
    [12500,100],
    [625000,1000],
    [3.125e7,10000],
    [1.5625e9,1.5e6],
    [1e11,1e8],
    [1e23,1e11]
]

const gen_names = [
    "battery",
    "generator",
    "wind turbine",
    "coal power plant",
    "hydroelectric dam",
    "geothermal energy",
    "nuclear power plant",
    "[[youself]]"
]

const funcs = {
    goo: function () { return "idk" },
    
    
    move_right: function(s) {
        player.player_x_pos = player.player_x_pos + s
    },

    move_left: function(s) {
        player.player_x_pos = player.player_x_pos - s
    },

    //generator 1
    gen_cost: function (p, s = player.generators[p]) {
        return s.pow_base(1.1+p/10).times(gen_data[p][0])
    },

    buy_gen: function(p) {
        if (player.energy.gte(funcs.gen_cost(p))) {
            player.energy = player.energy.sub(funcs.gen_cost(p))
            player.generators[p] = player.generators[p].add(1)
        }
    },

    energy_gain: function() {
        L = new Decimal(0)
        for (i in player.generators) {
            L = L.add(player.generators[i].times(gen_data[i][1]))
        }
        if (has_upgrade(0)){L = L.times(4)}
        return L
    },

    gens: function(){
        S = ""
        for (i = 0; i < 8; i++) {
        S = S + `<button onclick="funcs.buy_gen(Number(${i}))">
            Buy a ${gen_names[i]}<br>
                Cost: ${format(funcs.gen_cost(i))} energy<br>
                    (You currently have ${format(player.generators[i])})
                </button>`
            }
        return S
    },

    upgs: function () {
        S = ""
        for (i = 0; i < upg_data.length; i++) {
            S = S + `<button class=${has_upgrade(i) ? 'bought' : 'unbought'} onclick="buy_upg(Number(${i}))">
            ${upg_data[i].title}<br>
            <small>
            ${upg_data[i].effect_disp}<br>
                Cost: ${format(upg_data[i].cost)} energy<br>
            </small>    
            </button>`
        }
        return S
    }
}