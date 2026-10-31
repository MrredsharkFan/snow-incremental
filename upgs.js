// idk
// please STOP using # like ur still pythoning

const upg_data = [
    {
        title: "Hope into the future",
        effect_disp: "x4 energy.",
        cost: new Decimal(5e4)
    }
]

function buy_upg(n) {
    if (player.energy.gte(upg_data[n].cost) && !player.upgrades.includes(n)) {
        player.energy = player.energy.sub(upg_data[n].cost)
        player.upgrades = player.upgrades.concat(n)
    }
}

function has_upgrade(n) {
    return player.upgrades.includes(n)
}