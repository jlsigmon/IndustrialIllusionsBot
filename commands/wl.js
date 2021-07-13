module.exports = {
    name: 'wl',
    description: "Lets users see their wl",
    execute(msg, con) {

        con.query(`SELECT * FROM leaderboard WHERE id = '${msg.author.id}' AND serverId = '${msg.guild.id}'`, (err, rows) => {
            if (err) throw err;

            let win = parseInt(rows[0].wins);
            let lose = parseInt(rows[0].lose);
            let ratio = parseFloat(win / rows[0].duels);
            msg.reply('You have won ' + win + ' duels and lost ' + lose + ' duels with a win rate of ' + ratio);
        })

    }
}