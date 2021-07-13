module.exports = {
    name: 'give',
    description: "Command for users to give other users points",
    execute(msg, args, con){
        var person = msg.mentions.users.first();
        if (args[1] && person !== undefined) {
            if (args[2] && args[2] > 0) {
                con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    if (rows.length > 0) {
                        if (args[2] <= rows[0].points) {
                            let point = parseInt(rows[0].points);
                            let pts = parseInt(args[2]);
                            sql = `UPDATE tokens SET points = ${point - pts} WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`;
                            con.query(sql, console.log);
                            con.query(`SELECT * FROM tokens WHERE id = '${person.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                                if (err) throw err;

                                let sql;

                                if (rows.length > 0) {
                                    let point = parseInt(rows[0].points);
                                    let pts2 = parseInt(args[2]);
                                    sql = `UPDATE tokens SET points = ${point + pts2} WHERE id = '${person.id}' AND serverId = "${msg.guild.id}"`;
                                    con.query(sql, console.log);
                                }

                            })
                            msg.channel.send(msg.author.username + " Has given " + person.username + ' ' + args[2] + " Tokens.");

                        } else {
                            msg.reply('You do not have enough Tokens!');
                        }
                    }
                })
            } else {
                msg.reply('Please provide a number greater than 0');
            }
        } else {
            msg.reply('Please provide a valid user');
        }
    }
}