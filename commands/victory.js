module.exports = {
    name: 'victory',
    description: "Lets users claim the victory for a duel!",
    execute(msg, con, coconut, walnut, challengers, challenge) {
        let author = msg.author.username;

        if (challengers.includes(msg.author.id)) {
            var x = challengers.indexOf(msg.author.id);
            var n = challenge[x];
            var m = challengers[x];
            msg.channel.send(msg.author.username + ' claims they have won the duel, ' + coconut[x].username + ' do you confirm?').then(msg => {
                msg.react('✅').then(r => {
                    msg.react('❌')

                    const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challenge[x];
                    const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challenge[x];

                    const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                    const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                    agr.on('collect', r => {

                        con.query(`SELECT * FROM tokens WHERE id = '${m}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                            if (err) throw err;

                            let sql;

                            if (rows.length > 0) {
                                let point = parseInt(rows[0].points + 200);
                                sql = `UPDATE tokens SET points = ${point} WHERE id = '${m}' AND serverId = "${msg.guild.id}"`;
                                con.query(sql, console.log);
                            }

                        })

                        con.query(`SELECT * FROM leaderboard WHERE id = '${m}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                            if (err) throw err;

                            let sql;

                            if (rows.length > 0) {
                                let win = parseInt(rows[0].wins + 1);
                                let duel = parseInt(rows[0].duels + 1);
                                let level = parseInt(rows[0].level + 100);
                                sql = `UPDATE leaderboard SET wins = ${win}, duels = ${duel}, level = ${level} WHERE id = '${m}' AND serverId = "${msg.guild.id}"`;
                                con.query(sql, console.log);
                            }

                        })

                        con.query(`SELECT * FROM tokens WHERE id = '${n}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                            if (err) throw err;

                            let sql;

                            if (rows.length > 0) {
                                let point = parseInt(rows[0].points + 150);
                                sql = `UPDATE tokens SET points = ${point} WHERE id = '${n}' AND serverId = "${msg.guild.id}"`;
                                con.query(sql, console.log);
                            }

                        })

                        con.query(`SELECT * FROM leaderboard WHERE id = '${n}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                            if (err) throw err;

                            let sql;

                            if (rows.length > 0) {
                                let loses = parseInt(rows[0].lose + 1);
                                let duel = parseInt(rows[0].duels + 1);
                                let level = parseInt(rows[0].level - 50);
                                sql = `UPDATE leaderboard SET lose = ${loses}, duels = ${duel}, level = ${level} WHERE id = '${n}' AND serverId = "${msg.guild.id}"`;
                                con.query(sql, console.log);
                            }

                        })

                        msg.channel.send('Congrats ' + walnut[x].username + ' on the victory! You have been given 200 Kaiba Tokens!');
                        challenge.splice(x, 1);
                        challengers.splice(x, 1);
                        walnut.splice(x, 1);
                        coconut.splice(x, 1);
                    })
                    decl.on('collect', r => {
                        msg.channel.send(coconut[x].username + ' claims they won the duel instead. Please figure it out and reuse the command.');
                    })
                })
            })

        } else if (challenge.includes(msg.author.id)) {
            var x = challenge.indexOf(msg.author.id);
            var n = challenge[x];
            var m = challengers[x];
            msg.channel.send(msg.author.username + ' claims they have won the duel, ' + walnut[x].username + ' do you confirm?').then(msg => {
                msg.react('✅').then(r => {
                    msg.react('❌')

                    const agrFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === challengers[x];
                    const declFilt = (reaction, user) => reaction.emoji.name === '❌' && user.id === challengers[x];

                    const agr = msg.createReactionCollector(agrFilt, { time: 300000 });
                    const decl = msg.createReactionCollector(declFilt, { time: 300000 });

                    agr.on('collect', r => {
                        con.query(`SELECT * FROM tokens WHERE id = '${n}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                            if (err) throw err;

                            let sql;

                            if (rows.length > 0) {
                                let point = parseInt(rows[0].points + 200);
                                sql = `UPDATE tokens SET points = ${point} WHERE id = '${n}' AND serverId = "${msg.guild.id}"`;
                                con.query(sql, console.log);
                            }

                        })

                        con.query(`SELECT * FROM leaderboard WHERE id = '${n}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                            if (err) throw err;

                            let sql;

                            if (rows.length > 0) {
                                let win = parseInt(rows[0].wins + 1);
                                let duel = parseInt(rows[0].duels + 1);
                                let level = parseInt(rows[0].level + 100);
                                sql = `UPDATE leaderboard SET wins = ${win}, duels = ${duel}, level = ${level} WHERE id = '${n}' AND serverId = "${msg.guild.id}"`;
                                con.query(sql, console.log);
                            }

                        })

                        con.query(`SELECT * FROM tokens WHERE id = '${m}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                            if (err) throw err;

                            let sql;

                            if (rows.length > 0) {
                                let point = parseInt(rows[0].points + 150);
                                sql = `UPDATE tokens SET points = ${point} WHERE id = '${m}' AND serverId = "${msg.guild.id}"`;
                                con.query(sql, console.log);
                            }

                        })

                        con.query(`SELECT * FROM leaderboard WHERE id = '${m}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                            if (err) throw err;

                            let sql;

                            if (rows.length > 0) {
                                let loses = parseInt(rows[0].lose + 1);
                                let duel = parseInt(rows[0].duels + 1);
                                let level = parseInt(rows[0].level - 50);
                                sql = `UPDATE leaderboard SET lose = ${loses}, duels = ${duel}, level = ${level} WHERE id = '${m}' AND serverId = "${msg.guild.id}"`;
                                con.query(sql, console.log);
                            }

                        })

                        msg.channel.send('Congrats ' + coconut[x].username + ' on the victory! You have been given 200 Kaiba Tokens!');
                        challenge.splice(x, 1);
                        challengers.splice(x, 1);
                        walnut.splice(x, 1);
                        coconut.splice(x, 1);
                    })
                    decl.on('collect', r => {
                        msg.channel.send(walnut[x].username + ' claims they won the duel instead. Please figure it out and reuse the command.');
                    })
                })
            })
        } else {
            msg.reply('You are currently not in a duel!');
        }
    }
}