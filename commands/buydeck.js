let decks = ["yugi","kaiba","joey","pegasus","sye","ske"];
let structure = ["sd1"];
module.exports = {
    name: 'buydeck',
    description: "Command to buy a deck",
    execute(msg, args, con, deck, Discord){
        if (args[1] === undefined) {
            msg.reply('Please provide a deck to buy!');
        } else if (!decks.includes(args[1].toLowerCase()) && !structure.includes(args[1].toLowerCase())) {
            msg.reply('Please provide a valid deck!');
        } else  {
            if(decks.includes(args[1].toLowerCase())){
                let totalAdd = 0;
                var newCard = [];
                var numNew = [];
                var newRarity = [];
                var newIndex = 0;
                var numC = 0;
                let com = deck.get(args[1].toLowerCase()).common;
                let sRare = deck.get(args[1].toLowerCase()).super;
                let ultra = deck.get(args[1].toLowerCase()).ultra;

                for (let i = 0; i < com.length; i++) {
                    if(newCard.includes(com[i])){
                        let curIndex = newCard.indexOf(com[i]);
                        if(newRarity[curIndex] === "Common"){
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = com[i];
                            newRarity[newIndex] = "Common";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = com[i];
                        newRarity[newIndex] = "Common";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    numC++;
                }
                for (let i = 0; i < sRare.length; i++) {
                    if(newCard.includes(sRare[i])){
                        let curIndex = newCard.indexOf(sRare[i]);
                        if(newRarity[curIndex] = "Super"){
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = sRare[i];
                            newRarity[newIndex] = "Super";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = sRare[i];
                        newRarity[newIndex] = "Super";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    numC++;
                }
                for (let i = 0; i < ultra.length; i++) {
                    if(newCard.includes(ultra[i])){
                        let curIndex = newCard.indexOf(ultra[i]);
                        if(newRarity[curIndex] = "Ultra"){
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = ultra[i];
                            newRarity[newIndex] = "Ultra";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = ultra[i];
                        newRarity[newIndex] = "Ultra";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    numC++;
                }
                con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    if (rows.length > 0) {
                        if (rows[0].points >= deck.get(args[1].toLowerCase()).price) {
                            let point = parseInt(rows[0].points);
                            let pts = parseInt(deck.get(args[1].toLowerCase()).price);
                            sql = `UPDATE tokens SET points = ${point - pts} WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`;
                            con.query(sql, console.log);
    
                            for (let i = 0; i < newCard.length; i++) {
                                con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" AND cardName = ? AND cardRarity = "${newRarity[i]}"`, [newCard[i]], (err, rows) => {
                                    if (err) throw err;

                                    var sql;
                                        
                                    if (rows.length > 0) {
                                        var total = rows[0].cardNum;
                                        totalAdd = numNew[i];
                                        sql = `UPDATE collection SET cardNum = ${total + totalAdd} where userId = "${msg.author.id}" AND serverId = "${msg.guild.id}" AND cardName = ? AND cardRarity = "${newRarity[i]}"`;
                                        con.query(sql, [newCard[i]],console.log);
                                    } else {
                                        let sql2;
                                        totalAdd = numNew[i];
                                        sql2 = `INSERT INTO collection (userId, serverId, cardName, cardRarity, cardNum) VALUES ('${msg.author.id}', "${msg.guild.id}", ?, "${newRarity[i]}", ${totalAdd})`;
                                        con.query(sql2, [newCard[i]],console.log);
                                    }
                                })
                            }
                            
                            const embed = new Discord.MessageEmbed()
                                .setColor('AQUA')
                                .setTitle('Successfully purchased the ' + deck.get(args[1].toLowerCase()).description + ' deck!')
                            msg.channel.send(embed);
                                
                            //msg.reply('You have pulled ' + str);
                            
                        }
                        else {
                            msg.reply('You dont have enough tokens!');
                        }
                    }
                })
            }
            if(structure.includes(args[1].toLowerCase())){
                let totalAdd = 0;
                var newCard = [];
                var numNew = [];
                var newRarity = [];
                var newIndex = 0;
                var numC = 0;
                let com = deck.get(args[1].toLowerCase()).common;
                let ultra = deck.get(args[1].toLowerCase()).ultra;

                for (let i = 0; i < com.length; i++) {
                    if(newCard.includes(com[i])){
                        let curIndex = newCard.indexOf(com[i]);
                        if(newRarity[curIndex] === "Common"){
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = com[i];
                            newRarity[newIndex] = "Common";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = com[i];
                        newRarity[newIndex] = "Common";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    numC++;
                }
                for (let i = 0; i < ultra.length; i++) {
                    if(newCard.includes(ultra[i])){
                        let curIndex = newCard.indexOf(ultra[i]);
                        if(newRarity[curIndex] = "Ultra"){
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = ultra[i];
                            newRarity[newIndex] = "Ultra";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = ultra[i];
                        newRarity[newIndex] = "Ultra";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    numC++;
                }
                con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    if (rows.length > 0) {
                        if (rows[0].points >= deck.get(args[1].toLowerCase()).price) {
                            let point = parseInt(rows[0].points);
                            let pts = parseInt(deck.get(args[1].toLowerCase()).price);
                            sql = `UPDATE tokens SET points = ${point - pts} WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`;
                            con.query(sql, console.log);
    
                            for (let i = 0; i < newCard.length; i++) {
                                con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" AND cardName = ? AND cardRarity = "${newRarity[i]}"`, [newCard[i]], (err, rows) => {
                                    if (err) throw err;

                                    var sql;
                                        
                                    if (rows.length > 0) {
                                        var total = rows[0].cardNum;
                                        totalAdd = numNew[i];
                                        sql = `UPDATE collection SET cardNum = ${total + totalAdd} where userId = "${msg.author.id}" AND serverId = "${msg.guild.id}" AND cardName = ? AND cardRarity = "${newRarity[i]}"`;
                                        con.query(sql, [newCard[i]],console.log);
                                    } else {
                                        let sql2;
                                        totalAdd = numNew[i];
                                        sql2 = `INSERT INTO collection (userId, serverId, cardName, cardRarity, cardNum) VALUES ('${msg.author.id}', "${msg.guild.id}", ?, "${newRarity[i]}", ${totalAdd})`;
                                        con.query(sql2, [newCard[i]],console.log);
                                    }
                                })
                            }
                            
                            const embed = new Discord.MessageEmbed()
                                .setColor('AQUA')
                                .setTitle('Successfully purchased the ' + deck.get(args[1].toLowerCase()).description + ' deck!')
                            msg.channel.send(embed);
                                
                            //msg.reply('You have pulled ' + str);
                            
                        }
                        else {
                            msg.reply('You dont have enough tokens!');
                        }
                    }
                })
            }
       }
    }
}