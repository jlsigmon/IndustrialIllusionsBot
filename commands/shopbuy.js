module.exports = {
    name: 'shopbuy',
    description: "Lets users see what packs contain a card!",
    execute(msg, con, args){
        if(args[1] && !isNaN(args[1])){
            let buyID = args[1];
            con.query(`SELECT * FROM shop WHERE shopID = ${buyID}`, (err, rows) => {
                if (err) throw err;

                if(rows.length > 0){ 
                    let cardName = rows[0].shopCard;
                    let cardRarity = rows[0].shopRarity;
                    let cardCost = rows[0].shopCost;
                    con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                        if (err) throw err;
        
                        let sql;
        
                        if (rows.length > 0) {
                            if (rows[0].points >= cardCost) {
                                let point = parseInt(rows[0].points);
                                let pts = parseInt(cardCost);
                                sql = `UPDATE tokens SET points = ${point - pts} WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`;
                                con.query(sql, console.log);
                                con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" AND cardName = "${cardName}" AND cardRarity = "${cardRarity}"`, (err, rows) => {
                                    if (err) throw err;

                                    var sql3;
                                    
                                    if (rows.length > 0) {
                                        var total = rows[0].cardNum + 1;
                
                                        sql3 = `UPDATE collection SET cardNum = ${total} where userId = "${msg.author.id}" AND serverId = "${msg.guild.id}" AND cardName = "${cardName}" AND cardRarity = "${cardRarity}"`;
                                        con.query(sql3,console.log);
                                        msg.reply("You have successfully bought a " + cardName + "!");
                                    } else {
                                        let sql2;
                                        let totalAdd = 1;
                                        sql2 = `INSERT INTO collection (userId, serverId, cardName, cardRarity, cardNum) VALUES ('${msg.author.id}', "${msg.guild.id}", "${cardName}", "${cardRarity}", ${totalAdd})`;
                                        con.query(sql2,console.log);
                                        msg.reply("You have successfully bought a " + cardName + "!");
                                    }
                                    
                                })
                            } else {
                                msg.reply('You do not have enough tokens!');
                            }
                        }
                    })
                } else {
                    msg.reply("There is not a shop listing with that ID!");
                }
            })
        }
    }
}