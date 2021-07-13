let promos = ["dds","fmr","eds","dor","sdd","tfk","tsc","pcy","wc4","dod","pck","rod","pcj"];
let superPromos = ["dbt","cmc"]
let movies = ["mov"]
module.exports = {
    name: 'buypromo',
    description: "Command to buy a promo set",
    execute(msg, args, con, promo, Discord){
        if (args[1] === undefined) {
            msg.reply('Please provide a promo item to buy!');
        } else if (!promos.includes(args[1].toLowerCase()) && !superPromos.includes(args[1].toLowerCase()) && !movies.includes(args[1].toLowerCase())) {
            msg.reply('Please provide a valid promo item!');
        } else  {
            if(promos.includes(args[1].toLowerCase())){
                let totalAdd = 0;
                var newCard = [];
                var numNew = [];
                var newRarity = [];
                var newIndex = 0;
                var numC = 0;
                let game = promo.get(args[1].toLowerCase()).game;
                let secret = promo.get(args[1].toLowerCase()).secret1;
                if(args[1].toLowerCase() === "dds"){
                    let choice = Math.floor(Math.random() * 2);
                    if (choice === 1) {
                        secret = promo.get(args[1].toLowerCase()).secret2;
                    } 
                }

                for (let i = 0; i < game.length; i++) {
                    if(newCard.includes(game[i])){
                        let curIndex = newCard.indexOf(game[i]);
                        if(newRarity[curIndex] === "Game"){
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = game[i];
                            newRarity[newIndex] = "Game";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = game[i];
                        newRarity[newIndex] = "Game";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    numC++;
                }
                for (let i = 0; i < secret.length; i++) {
                    if(newCard.includes(secret[i])){
                        let curIndex = newCard.indexOf(secret[i]);
                        if(newRarity[curIndex] = "Secret"){
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = secret[i];
                            newRarity[newIndex] = "Secret";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = secret[i];
                        newRarity[newIndex] = "Secret";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    numC++;
                }
                con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    if (rows.length > 0) {
                        if (rows[0].points >= promo.get(args[1].toLowerCase()).price) {
                            let point = parseInt(rows[0].points);
                            let pts = parseInt(promo.get(args[1].toLowerCase()).price);
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
                                .setTitle('Successfully purchased the ' + promo.get(args[1].toLowerCase()).description + ' promo item!')
                            msg.channel.send(embed);
                                
                            //msg.reply('You have pulled ' + str);
                            
                        }
                        else {
                            msg.reply('You dont have enough tokens!');
                        }
                    }
                })
            }
            if(superPromos.includes(args[1].toLowerCase())){
                let totalAdd = 0;
                var newCard = [];
                var numNew = [];
                var newRarity = [];
                var newIndex = 0;
                var numC = 0;
                let game = promo.get(args[1].toLowerCase()).game;
                let secret = promo.get(args[1].toLowerCase()).super;

                for (let i = 0; i < game.length; i++) {
                    if(newCard.includes(game[i])){
                        let curIndex = newCard.indexOf(game[i]);
                        if(newRarity[curIndex] === "Game"){
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = game[i];
                            newRarity[newIndex] = "Game";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = game[i];
                        newRarity[newIndex] = "Game";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    numC++;
                }
                for (let i = 0; i < secret.length; i++) {
                    if(newCard.includes(secret[i])){
                        let curIndex = newCard.indexOf(secret[i]);
                        if(newRarity[curIndex] = "Super"){
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = secret[i];
                            newRarity[newIndex] = "Super";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = secret[i];
                        newRarity[newIndex] = "Super";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    numC++;
                }
                con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    if (rows.length > 0) {
                        if (rows[0].points >= promo.get(args[1].toLowerCase()).price) {
                            let point = parseInt(rows[0].points);
                            let pts = parseInt(promo.get(args[1].toLowerCase()).price);
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
                                .setTitle('Successfully purchased the ' + promo.get(args[1].toLowerCase()).description + ' promo item!')
                            msg.channel.send(embed);
                                
                            //msg.reply('You have pulled ' + str);
                            
                        }
                        else {
                            msg.reply('You dont have enough tokens!');
                        }
                    }
                })
            }
            if(movies.includes(args[1].toLowerCase())){
                let totalAdd = 0;
                var newCard = [];
                var numNew = [];
                var newRarity = [];
                var newIndex = 0;
                var numC = 0;
                let movie = promo.get(args[1].toLowerCase()).movie;
                let common = promo.get(args[1].toLowerCase()).common
                let secret = promo.get(args[1].toLowerCase()).super;

                for (let i = 0; i < movie.length; i++) {
                    if(newCard.includes(movie[i])){
                        let curIndex = newCard.indexOf(movie[i]);
                        if(newRarity[curIndex] === "Movie"){
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = movie[i];
                            newRarity[newIndex] = "Movie";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = movie[i];
                        newRarity[newIndex] = "Movie";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    numC++;
                }
                for (let i = 0; i < common.length; i++) {
                    if(newCard.includes(common[i])){
                        let curIndex = newCard.indexOf(common[i]);
                        if(newRarity[curIndex] = "Common"){
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = common[i];
                            newRarity[newIndex] = "Common";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = common[i];
                        newRarity[newIndex] = "Common";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    numC++;
                }
                for (let i = 0; i < secret.length; i++) {
                    if(newCard.includes(secret[i])){
                        let curIndex = newCard.indexOf(secret[i]);
                        if(newRarity[curIndex] = "Super"){
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = secret[i];
                            newRarity[newIndex] = "Super";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = secret[i];
                        newRarity[newIndex] = "Super";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    numC++;
                }
                con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    if (rows.length > 0) {
                        if (rows[0].points >= promo.get(args[1].toLowerCase()).price) {
                            let point = parseInt(rows[0].points);
                            let pts = parseInt(promo.get(args[1].toLowerCase()).price);
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
                                .setTitle('Successfully purchased the ' + promo.get(args[1].toLowerCase()).description + ' promo item!')
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