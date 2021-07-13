module.exports = {
    name: 'admintake',
    description: "Admin command to take points from a user",
    execute(msg, args, con, trusted){
        if (msg.member.hasPermission("ADMINISTRATOR")) {
            var person = msg.mentions.users.first();
            if (args[1] && person !== undefined) {
                
                if (args[2] && args[2] > 0) {
                    con.query(`SELECT * FROM tokens WHERE id = '${person.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        if (rows.length > 0 && rows[0].points > parseInt(args[2])) {
                            let point = parseInt(rows[0].points);
                            let pts = parseInt(args[2]);
                            sql = `UPDATE tokens SET points = ${point - pts} WHERE id = '${person.id}' AND serverId = "${msg.guild.id}"`;

                            con.query(sql, console.log);
                        }
                        msg.channel.sendMessage(person.username + ' has had ' + args[2] + " Tokens taken away!");

                    })
                } else {
                    msg.reply('Please provide a number greater than 0');
                }
            } else {
                msg.reply('Please provide a valid user');
            }
        } else {
            msg.reply('You do not have permission to use this command!');
        }
    }
}