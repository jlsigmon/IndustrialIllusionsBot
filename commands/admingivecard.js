module.exports = {
    name: 'admingivecard',
    description: "Admin command to give cards to a user",
    execute(msg, args, con, trusted){
        if (msg.member.hasPermission("ADMINISTRATOR")) {
            var mentionArray = msg.mentions.users.array();
            if(mentionArray.length === 1){
                var person = msg.mentions.users.first();
                var rarity = args[2];
                var itemName = "";
                for (let i = 3; i < args.length - 1; i++) {
                    if (i !== args.length - 2) {
                        itemName += args[i] + " ";
                    } else {
                        itemName += args[i];
                    }
                }
                var numItem = args[args.length - 1];
                if (!isNaN(parseInt(numItem)) && numItem > 0) {                   
                    con.query(`SELECT * FROM collection WHERE userId = '${person.id}' AND serverId = "${msg.guild.id}" AND cardRarity = "${rarity}" AND cardName = "${itemName}" `, (err, rows) => {
                        if (err) throw err;

                        let sql2;

                        if (rows.length > 0) {
                            let numHave = parseInt(rows[0].cardNum);
                            let numGive = parseInt(numItem);
                            sql2 = `UPDATE collection SET cardNum = ${numHave + numGive} WHERE userId = '${person.id}' AND serverId = "${msg.guild.id}" AND cardRarity = "${rarity}" AND cardName = ?`;
                            con.query(sql2, [itemName],console.log);
                        } else {
                            let numGive = parseInt(numItem);
                            sql2 = `INSERT INTO collection (userId, serverId, cardName, cardRarity, cardNum) VALUES ('${person.id}', "${msg.guild.id}", ?, "${rarity}", ${numGive})`;
                            con.query(sql2,[itemName],console.log);
                        }

                    })
                    msg.channel.send(msg.author.username + " has given " + person.username + ' ' + numItem + ' ' + itemName + "(s).");
                } else {
                    msg.reply('Please provide a integer greater than 0! ex. i!admingive @user Common Dark Magician 1');
                }    
            } else {
                msg.reply('Please provide a user!')
            }
        } else {
            msg.reply('You do not have permission to use this command!');
        }
    }
}