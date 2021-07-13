module.exports = {
    name: 'givecard',
    description: "Lets users give cards to other users",
    execute(msg, args, con){
        var p = msg.mentions.users.first();
        if(p !== undefined){
            var rarity = args[2];
            var crd = '';
            var nu = parseInt(args[args.length - 1]);
            for (let i = 3; i < args.length - 1; i++) {
                if (i !== args.length - 2) {
                    crd += args[i] + ' ';
                } else {
                    crd += args[i];
                }
            }
            if (!isNaN(parseInt(nu)) && nu > 0) {
                con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" AND cardRarity = "${rarity}" AND cardName = ?`, [crd], (err, rows) => {
                    if (err) throw err;

                    let sql;

                    if (rows.length > 0) {
                        if (nu <= rows[0].cardNum) {
                            let numHave = parseInt(rows[0].cardNum);
                            let numGive = parseInt(nu);
                            if(numHave - numGive != 0){
                                sql = `UPDATE collection SET cardNum = ${numHave - numGive} WHERE userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" AND cardRarity = "${rarity}" AND cardName = "${crd}"`;
                                con.query(sql, console.log);
                            } else {
                                sql = `DELETE FROM collection where userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" AND cardRarity = "${rarity}" AND cardName = "${crd}"`;
                                con.query(sql, console.log);
                            }
                            con.query(`SELECT * FROM collection WHERE userId = '${p.id}' AND serverId = "${msg.guild.id}" AND cardRarity = "${rarity}" AND cardName = "${crd}" `, (err, rows) => {
                                if (err) throw err;

                                let sql2;

                                if (rows.length > 0) {
                                    let numHave = parseInt(rows[0].cardNum);
                                    let numGive = parseInt(nu);
                                    sql2 = `UPDATE collection SET cardNum = ${numHave + numGive} WHERE userId = '${p.id}' AND serverId = "${msg.guild.id}" AND cardRarity = "${rarity}" AND cardName = "${crd}"`;
                                    con.query(sql2, console.log);
                                } else {
                                    sql2 = `INSERT INTO collection (userId, serverId, cardName, cardRarity, cardNum) VALUES ('${p.id}', "${msg.guild.id}", "${crd}", "${rarity}", ${numGive})`;
                                    con.query(sql2,console.log);
                                }

                            })
                            msg.channel.send(msg.author.username + " has given " + p.username + ' ' + nu + ' ' + crd + "(s).");

                        } else {
                            msg.reply('You do not have enough of that card at that rarity!');
                        }
                    } else {
                        msg.reply('You do not have that card at that rarity!');
                    }
                })
            } else {
                msg.reply('Please provide a integer greater than 0! ex. i!givecard @user Common Dark Magician 1');
            }
        } else {
            msg.reply("Please provide a valid user!");
        }
    }
}