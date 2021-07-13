module.exports = {
    name: 'publist',
    description: "Lets users post a public list of their cards for other users to scroll through",
    execute(msg, args, con, Discord){
        let k = msg.author.id;
        const embed = new Discord.MessageEmbed().setTitle(msg.member.displayName + "'s Collection");
        if(args.length === 1){
            con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" ORDER BY cardName`, (err, rows) => {
                if (err) throw err;

                let sql;
                let pages = [];
                let page = 1;
                let per = 25;
                let card = [];
                let rarity = [];
                let num = [];
                if (rows.length > 0) {
                    pages[page - 1] = "Card | # | Rarity";
                    card[page - 1] = "";
                    rarity[page - 1] = "";
                    num[page - 1] = "";
                    for (var i = per * (page - 1); i < per * page && i < rows.length; i++) {
                        card[page - 1] += rows[i].cardName + "\n";
                        rarity[page - 1] += rows[i].cardRarity + "\n";
                        num[page - 1] += 'x' + rows[i].cardNum + "\n";
                        if (i != 0 && pages[page - 1].length + card.length + 5 < 2048) {
                            pages[page - 1] += card + "\t x" + num + "\t" + rarity + "\n";
                            
                        }

                    }
                    pages[page - 1] += "";
                    embed.setColor('AQUA'); 
                    embed.addField("Card",card[page - 1], true)
                    embed.addField('#', num[page - 1], true)
                    embed.addField("Rarity",rarity[page - 1], true)
                    embed.setFooter(`Page ${page}`)
                    msg.channel.send(embed).then(msg => {
                        msg.react('◀').then(async r => {
                            msg.react('▶')

                            const backFilt = (reaction, user) => reaction.emoji.name === '◀';
                            const fordFilt = (reaction, user) => reaction.emoji.name === '▶';

                            const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                            const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });

                            

                            back.on('collect',async r => {
                                
                                embed.spliceFields(0, 3);
                                if (page === 1) return;
                                page--;
                                if(card[page - 1] != ""){
                                    embed.addField("Card",card[page - 1], true)
                                    embed.addField('#', num[page - 1], true)
                                    embed.addField("Rarity",rarity[page - 1], true)
                                }
                                embed.setFooter(`Page ${page}`);
                                msg.edit(embed);

                            })
                            ford.on('collect',async r => {
                                
                                embed.spliceFields(0, 3);
                                if (rows[per * page] > rows[rows.length]) return;
                                page++;
                                let exists = false;
                                if (card[page - 1] !== undefined && card[page - 1] != "") {
                                    embed.addField("Card",card[page - 1], true)
                                    embed.addField('#', num[page - 1], true)
                                    embed.addField("Rarity",rarity[page - 1], true)
                                    exists = true;
                                    embed.setFooter(`Page ${page}`);
                                    msg.edit(embed);
                                } else {
                                    pages[page - 1] = "Card \t # \t Rarity \n";
                                    card[page - 1] = "";
                                    rarity[page - 1] = "";
                                    num[page - 1] = "";

                                    for (var c = per; c < per + 25 && c < rows.length; c++) {                        
                                        card[page - 1] += rows[c].cardName + "\n";
                                        rarity[page - 1] += rows[c].cardRarity + "\n";
                                        num[page - 1] += 'x' + rows[c].cardNum + "\n";
                                    }
                                    per += per;
                                    embed.setDescription(pages[page - 1]);
                                    if(card[page - 1] != ""){
                                        embed.addField("Card",card[page - 1], true)
                                        embed.addField('#', num[page - 1], true)
                                        embed.addField("Rarity",rarity[page - 1], true)
                                    }
                                    embed.setFooter(`Page ${page}`);
                                    msg.edit(embed);
                                }
                            })
                        })
                    })
                } else {
                    msg.reply("You currently don't have any cards!");
                }
            })
            
        } else {
            if(args[1].toLowerCase() === "sortby:"){
                var sortBy = args[2].toLowerCase();
                if(sortBy === "cardd"){
                    con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" ORDER BY cardName DESC`, (err, rows) => {
                        if (err) throw err;
        
                        let sql;
                        let pages = [];
                        let page = 1;
                        let per = 25;
                        let card = [];
                        let rarity = [];
                        let num = [];
                        if (rows.length > 0) {
                            pages[page - 1] = "Card | # | Rarity";
                            card[page - 1] = "";
                            rarity[page - 1] = "";
                            num[page - 1] = "";
                            for (var i = per * (page - 1); i < per * page && i < rows.length; i++) {
                                card[page - 1] += rows[i].cardName + "\n";
                                rarity[page - 1] += rows[i].cardRarity + "\n";
                                num[page - 1] += 'x' + rows[i].cardNum + "\n";
                                if (i != 0 && pages[page - 1].length + card.length + 5 < 2048) {
                                    pages[page - 1] += card + "\t x" + num + "\t" + rarity + "\n";
                                    
                                }
        
                            }
                            pages[page - 1] += "";
                            embed.setColor('AQUA'); 
                            embed.addField("Card",card[page - 1], true)
                            embed.addField('#', num[page - 1], true)
                            embed.addField("Rarity",rarity[page - 1], true)
                            embed.setFooter(`Page ${page}`)
                            msg.channel.send(embed).then(msg => {
                                msg.react('◀').then(async r => {
                                    msg.react('▶')
        
                                    const backFilt = (reaction, user) => reaction.emoji.name === '◀';
                                    const fordFilt = (reaction, user) => reaction.emoji.name === '▶';
        
                                    const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                    const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
        
                                    
        
                                    back.on('collect',async r => {
                                        
                                        embed.spliceFields(0, 3);
                                        if (page === 1) return;
                                        page--;
                                        if(card[page - 1] != ""){
                                            embed.addField("Card",card[page - 1], true)
                                            embed.addField('#', num[page - 1], true)
                                            embed.addField("Rarity",rarity[page - 1], true)
                                        }
                                        embed.setFooter(`Page ${page}`);
                                        msg.edit(embed);
        
                                    })
                                    ford.on('collect',async r => {
                                        
                                        embed.spliceFields(0, 3);
                                        if (rows[per * page] > rows[rows.length]) return;
                                        page++;
                                        let exists = false;
                                        if (card[page - 1] !== undefined && card[page - 1] != "") {
                                            embed.addField("Card",card[page - 1], true)
                                            embed.addField('#', num[page - 1], true)
                                            embed.addField("Rarity",rarity[page - 1], true)
                                            exists = true;
                                            embed.setFooter(`Page ${page}`);
                                            msg.edit(embed);
                                        } else {
                                            pages[page - 1] = "Card \t # \t Rarity \n";
                                            card[page - 1] = "";
                                            rarity[page - 1] = "";
                                            num[page - 1] = "";
        
                                            for (var c = per; c < per + 25 && c < rows.length; c++) {                        
                                                card[page - 1] += rows[c].cardName + "\n";
                                                rarity[page - 1] += rows[c].cardRarity + "\n";
                                                num[page - 1] += 'x' + rows[c].cardNum + "\n";
                                            }
                                            per += per;
                                            embed.setDescription(pages[page - 1]);
                                            if(card[page - 1] != ""){
                                                embed.addField("Card",card[page - 1], true)
                                                embed.addField('#', num[page - 1], true)
                                                embed.addField("Rarity",rarity[page - 1], true)
                                            }
                                            embed.setFooter(`Page ${page}`);
                                            msg.edit(embed);
                                        }
                                    })
                                })
                            })
                        } else {
                            msg.reply("You currently don't have any cards!");
                        }
                    })
                }
                if(sortBy === "raritya"){
                    con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" ORDER BY cardRarity ASC`, (err, rows) => {
                        if (err) throw err;
        
                        let sql;
                        let pages = [];
                        let page = 1;
                        let per = 25;
                        let card = [];
                        let rarity = [];
                        let num = [];
                        if (rows.length > 0) {
                            pages[page - 1] = "Card | # | Rarity";
                            card[page - 1] = "";
                            rarity[page - 1] = "";
                            num[page - 1] = "";
                            for (var i = per * (page - 1); i < per * page && i < rows.length; i++) {
                                card[page - 1] += rows[i].cardName + "\n";
                                rarity[page - 1] += rows[i].cardRarity + "\n";
                                num[page - 1] += 'x' + rows[i].cardNum + "\n";
                                if (i != 0 && pages[page - 1].length + card.length + 5 < 2048) {
                                    pages[page - 1] += card + "\t x" + num + "\t" + rarity + "\n";
                                    
                                }
        
                            }
                            pages[page - 1] += "";
                            embed.setColor('AQUA'); 
                            embed.addField("Card",card[page - 1], true)
                            embed.addField('#', num[page - 1], true)
                            embed.addField("Rarity",rarity[page - 1], true)
                            embed.setFooter(`Page ${page}`)
                            msg.channel.send(embed).then(msg => {
                                msg.react('◀').then(async r => {
                                    msg.react('▶')
        
                                    const backFilt = (reaction, user) => reaction.emoji.name === '◀';
                                    const fordFilt = (reaction, user) => reaction.emoji.name === '▶';
        
                                    const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                    const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
        
                                    
        
                                    back.on('collect',async r => {
                                        
                                        embed.spliceFields(0, 3);
                                        if (page === 1) return;
                                        page--;
                                        if(card[page - 1] != ""){
                                            embed.addField("Card",card[page - 1], true)
                                            embed.addField('#', num[page - 1], true)
                                            embed.addField("Rarity",rarity[page - 1], true)
                                        }
                                        embed.setFooter(`Page ${page}`);
                                        msg.edit(embed);
        
                                    })
                                    ford.on('collect',async r => {
                                        
                                        embed.spliceFields(0, 3);
                                        if (rows[per * page] > rows[rows.length]) return;
                                        page++;
                                        let exists = false;
                                        if (card[page - 1] !== undefined && card[page - 1] != "") {
                                            embed.addField("Card",card[page - 1], true)
                                            embed.addField('#', num[page - 1], true)
                                            embed.addField("Rarity",rarity[page - 1], true)
                                            exists = true;
                                            embed.setFooter(`Page ${page}`);
                                            msg.edit(embed);
                                        } else {
                                            pages[page - 1] = "Card \t # \t Rarity \n";
                                            card[page - 1] = "";
                                            rarity[page - 1] = "";
                                            num[page - 1] = "";
        
                                            for (var c = per; c < per + 25 && c < rows.length; c++) {                        
                                                card[page - 1] += rows[c].cardName + "\n";
                                                rarity[page - 1] += rows[c].cardRarity + "\n";
                                                num[page - 1] += 'x' + rows[c].cardNum + "\n";
                                            }
                                            per += per;
                                            embed.setDescription(pages[page - 1]);
                                            if(card[page - 1] != ""){
                                                embed.addField("Card",card[page - 1], true)
                                                embed.addField('#', num[page - 1], true)
                                                embed.addField("Rarity",rarity[page - 1], true)
                                            }
                                            embed.setFooter(`Page ${page}`);
                                            msg.edit(embed);
                                        }
                                    })
                                })
                            })
                        } else {
                            msg.reply("You currently don't have any cards!");
                        }
                    })
                }
                if(sortBy === "rarityd"){
                    con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" ORDER BY cardRarity DESC`, (err, rows) => {
                        if (err) throw err;
        
                        let sql;
                        let pages = [];
                        let page = 1;
                        let per = 25;
                        let card = [];
                        let rarity = [];
                        let num = [];
                        if (rows.length > 0) {
                            pages[page - 1] = "Card | # | Rarity";
                            card[page - 1] = "";
                            rarity[page - 1] = "";
                            num[page - 1] = "";
                            for (var i = per * (page - 1); i < per * page && i < rows.length; i++) {
                                card[page - 1] += rows[i].cardName + "\n";
                                rarity[page - 1] += rows[i].cardRarity + "\n";
                                num[page - 1] += 'x' + rows[i].cardNum + "\n";
                                if (i != 0 && pages[page - 1].length + card.length + 5 < 2048) {
                                    pages[page - 1] += card + "\t x" + num + "\t" + rarity + "\n";
                                    
                                }
        
                            }
                            pages[page - 1] += "";
                            embed.setColor('AQUA'); 
                            embed.addField("Card",card[page - 1], true)
                            embed.addField('#', num[page - 1], true)
                            embed.addField("Rarity",rarity[page - 1], true)
                            embed.setFooter(`Page ${page}`)
                            msg.channel.send(embed).then(msg => {
                                msg.react('◀').then(async r => {
                                    msg.react('▶')
        
                                    const backFilt = (reaction, user) => reaction.emoji.name === '◀';
                                    const fordFilt = (reaction, user) => reaction.emoji.name === '▶';
        
                                    const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                    const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
        
                                    
        
                                    back.on('collect',async r => {
                                        
                                        embed.spliceFields(0, 3);
                                        if (page === 1) return;
                                        page--;
                                        if(card[page - 1] != ""){
                                            embed.addField("Card",card[page - 1], true)
                                            embed.addField('#', num[page - 1], true)
                                            embed.addField("Rarity",rarity[page - 1], true)
                                        }
                                        embed.setFooter(`Page ${page}`);
                                        msg.edit(embed);
        
                                    })
                                    ford.on('collect',async r => {
                                        
                                        embed.spliceFields(0, 3);
                                        if (rows[per * page] > rows[rows.length]) return;
                                        page++;
                                        let exists = false;
                                        if (card[page - 1] !== undefined && card[page - 1] != "") {
                                            embed.addField("Card",card[page - 1], true)
                                            embed.addField('#', num[page - 1], true)
                                            embed.addField("Rarity",rarity[page - 1], true)
                                            exists = true;
                                            embed.setFooter(`Page ${page}`);
                                            msg.edit(embed);
                                        } else {
                                            pages[page - 1] = "Card \t # \t Rarity \n";
                                            card[page - 1] = "";
                                            rarity[page - 1] = "";
                                            num[page - 1] = "";
        
                                            for (var c = per; c < per + 25 && c < rows.length; c++) {                        
                                                card[page - 1] += rows[c].cardName + "\n";
                                                rarity[page - 1] += rows[c].cardRarity + "\n";
                                                num[page - 1] += 'x' + rows[c].cardNum + "\n";
                                            }
                                            per += per;
                                            embed.setDescription(pages[page - 1]);
                                            if(card[page - 1] != ""){
                                                embed.addField("Card",card[page - 1], true)
                                                embed.addField('#', num[page - 1], true)
                                                embed.addField("Rarity",rarity[page - 1], true)
                                            }
                                            embed.setFooter(`Page ${page}`);
                                            msg.edit(embed);
                                        }
                                    })
                                })
                            })
                        } else {
                            msg.reply("You currently don't have any cards!");
                        }
                    })
                }
                if(sortBy === "#d"){
                    con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" ORDER BY cardNum DESC`, (err, rows) => {
                        if (err) throw err;
        
                        let sql;
                        let pages = [];
                        let page = 1;
                        let per = 25;
                        let card = [];
                        let rarity = [];
                        let num = [];
                        if (rows.length > 0) {
                            pages[page - 1] = "Card | # | Rarity";
                            card[page - 1] = "";
                            rarity[page - 1] = "";
                            num[page - 1] = "";
                            for (var i = per * (page - 1); i < per * page && i < rows.length; i++) {
                                card[page - 1] += rows[i].cardName + "\n";
                                rarity[page - 1] += rows[i].cardRarity + "\n";
                                num[page - 1] += 'x' + rows[i].cardNum + "\n";
                                if (i != 0 && pages[page - 1].length + card.length + 5 < 2048) {
                                    pages[page - 1] += card + "\t x" + num + "\t" + rarity + "\n";
                                    
                                }
        
                            }
                            pages[page - 1] += "";
                            embed.setColor('AQUA'); 
                            embed.addField("Card",card[page - 1], true)
                            embed.addField('#', num[page - 1], true)
                            embed.addField("Rarity",rarity[page - 1], true)
                            embed.setFooter(`Page ${page}`)
                            msg.channel.send(embed).then(msg => {
                                msg.react('◀').then(async r => {
                                    msg.react('▶')
        
                                    const backFilt = (reaction, user) => reaction.emoji.name === '◀';
                                    const fordFilt = (reaction, user) => reaction.emoji.name === '▶';
        
                                    const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                    const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
        
                                    
        
                                    back.on('collect',async r => {
                                        
                                        embed.spliceFields(0, 3);
                                        if (page === 1) return;
                                        page--;
                                        if(card[page - 1] != ""){
                                            embed.addField("Card",card[page - 1], true)
                                            embed.addField('#', num[page - 1], true)
                                            embed.addField("Rarity",rarity[page - 1], true)
                                        }
                                        embed.setFooter(`Page ${page}`);
                                        msg.edit(embed);
        
                                    })
                                    ford.on('collect',async r => {
                                        
                                        embed.spliceFields(0, 3);
                                        if (rows[per * page] > rows[rows.length]) return;
                                        page++;
                                        let exists = false;
                                        if (card[page - 1] !== undefined && card[page - 1] != "") {
                                            embed.addField("Card",card[page - 1], true)
                                            embed.addField('#', num[page - 1], true)
                                            embed.addField("Rarity",rarity[page - 1], true)
                                            exists = true;
                                            embed.setFooter(`Page ${page}`);
                                            msg.edit(embed);
                                        } else {
                                            pages[page - 1] = "Card \t # \t Rarity \n";
                                            card[page - 1] = "";
                                            rarity[page - 1] = "";
                                            num[page - 1] = "";
        
                                            for (var c = per; c < per + 25 && c < rows.length; c++) {                        
                                                card[page - 1] += rows[c].cardName + "\n";
                                                rarity[page - 1] += rows[c].cardRarity + "\n";
                                                num[page - 1] += 'x' + rows[c].cardNum + "\n";
                                            }
                                            per += per;
                                            embed.setDescription(pages[page - 1]);
                                            if(card[page - 1] != ""){
                                                embed.addField("Card",card[page - 1], true)
                                                embed.addField('#', num[page - 1], true)
                                                embed.addField("Rarity",rarity[page - 1], true)
                                            }
                                            embed.setFooter(`Page ${page}`);
                                            msg.edit(embed);
                                        }
                                    })
                                })
                            })
                        } else {
                            msg.reply("You currently don't have any cards!");
                        }
                    })
                }
                if(sortBy === "#a"){
                    con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" ORDER BY cardNum ASC`, (err, rows) => {
                        if (err) throw err;
        
                        let sql;
                        let pages = [];
                        let page = 1;
                        let per = 25;
                        let card = [];
                        let rarity = [];
                        let num = [];
                        if (rows.length > 0) {
                            pages[page - 1] = "Card | # | Rarity";
                            card[page - 1] = "";
                            rarity[page - 1] = "";
                            num[page - 1] = "";
                            for (var i = per * (page - 1); i < per * page && i < rows.length; i++) {
                                card[page - 1] += rows[i].cardName + "\n";
                                rarity[page - 1] += rows[i].cardRarity + "\n";
                                num[page - 1] += 'x' + rows[i].cardNum + "\n";
                                if (i != 0 && pages[page - 1].length + card.length + 5 < 2048) {
                                    pages[page - 1] += card + "\t x" + num + "\t" + rarity + "\n";
                                    
                                }
        
                            }
                            pages[page - 1] += "";
                            embed.setColor('AQUA'); 
                            embed.addField("Card",card[page - 1], true)
                            embed.addField('#', num[page - 1], true)
                            embed.addField("Rarity",rarity[page - 1], true)
                            embed.setFooter(`Page ${page}`)
                            msg.channel.send(embed).then(msg => {
                                msg.react('◀').then(async r => {
                                    msg.react('▶')
        
                                    const backFilt = (reaction, user) => reaction.emoji.name === '◀';
                                    const fordFilt = (reaction, user) => reaction.emoji.name === '▶';
        
                                    const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                    const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
        
                                    
        
                                    back.on('collect',async r => {
                                        
                                        embed.spliceFields(0, 3);
                                        if (page === 1) return;
                                        page--;
                                        if(card[page - 1] != ""){
                                            embed.addField("Card",card[page - 1], true)
                                            embed.addField('#', num[page - 1], true)
                                            embed.addField("Rarity",rarity[page - 1], true)
                                        }
                                        embed.setFooter(`Page ${page}`);
                                        msg.edit(embed);
        
                                    })
                                    ford.on('collect',async r => {
                                        
                                        embed.spliceFields(0, 3);
                                        if (rows[per * page] > rows[rows.length]) return;
                                        page++;
                                        let exists = false;
                                        if (card[page - 1] !== undefined && card[page - 1] != "") {
                                            embed.addField("Card",card[page - 1], true)
                                            embed.addField('#', num[page - 1], true)
                                            embed.addField("Rarity",rarity[page - 1], true)
                                            exists = true;
                                            embed.setFooter(`Page ${page}`);
                                            msg.edit(embed);
                                        } else {
                                            pages[page - 1] = "Card \t # \t Rarity \n";
                                            card[page - 1] = "";
                                            rarity[page - 1] = "";
                                            num[page - 1] = "";
        
                                            for (var c = per; c < per + 25 && c < rows.length; c++) {                        
                                                card[page - 1] += rows[c].cardName + "\n";
                                                rarity[page - 1] += rows[c].cardRarity + "\n";
                                                num[page - 1] += 'x' + rows[c].cardNum + "\n";
                                            }
                                            per += per;
                                            embed.setDescription(pages[page - 1]);
                                            if(card[page - 1] != ""){
                                                embed.addField("Card",card[page - 1], true)
                                                embed.addField('#', num[page - 1], true)
                                                embed.addField("Rarity",rarity[page - 1], true)
                                            }
                                            embed.setFooter(`Page ${page}`);
                                            msg.edit(embed);
                                        }
                                    })
                                })
                            })
                        } else {
                            msg.reply("You currently don't have any cards!");
                        }
                    })
                }
                if(sortBy != "cardd" && sortBy != "raritya" && sortBy != "rarityd" && sortBy != "#d" && sortBy != "#a") {
                    msg.reply("That is not a valid sort term! Valid terms are: cardd, raritya, rarityd, #a, #d");
                }
            } else {
                var cardName = "";
                for (let a = 1; a < args.length; a++) {
                    if (a !== args.length - 1) {
                        cardName += args[a] + " ";
                    } else {
                        cardName += args[a];
                    }
                }
                con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" ORDER BY cardName`, (err, rows) => {
                    if (err) throw err;

                    let sql;
                    let pages = [];
                    let page = 1;
                    let per = 25;
                    var card = [];
                    var rarity = [];
                    var num = [];
                    if (rows.length > 0) {
                        pages[page - 1] = "Card | # | Rarity";
                        card[page - 1] = "";
                        rarity[page - 1] = "";
                        num[page - 1] = "";
                        for (var i = per * (page - 1); i < per * page && i < rows.length; i++) {
                            let item = rows[i].cardName;
                            if(item.toLowerCase().includes(cardName.toLowerCase())){
                                card[page - 1] += rows[i].cardName + "\n";
                                rarity[page - 1] += rows[i].cardRarity + "\n";
                                num[page - 1] += 'x' + rows[i].cardNum + "\n";
                                if (i != 0 && pages[page - 1].length + card.length + 5 < 2048) {
                                    pages[page - 1] += card + "\t x" + num + "\t" + rarity + "\n";
                                    
                                }
                            } else {
                                per++;
                            }

                        }
                        pages[page - 1] += "";
                        if(card[page - 1] === ""){
                            card[page - 1] = "NotFound";
                            rarity[page - 1] = "NotFound";
                            num[page - 1] = "0";
                        }
                        embed.setColor('AQUA'); 
                        embed.addField("Card",card[page - 1], true)
                        embed.addField('#', num[page - 1], true)
                        embed.addField("Rarity",rarity[page - 1], true)
                        embed.setFooter(`Page ${page}`)
                        msg.channel.send(embed).then(msg => {
                            msg.react('◀').then(async r => {
                                msg.react('▶')

                                const backFilt = (reaction, user) => reaction.emoji.name === '◀';
                                const fordFilt = (reaction, user) => reaction.emoji.name === '▶';

                                const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });

                                

                                back.on('collect',async r => {
                                    
                                    embed.spliceFields(0, 3);
                                    if (page === 1) return;
                                    page--;
                                    if(card[page - 1] != ""){
                                        embed.addField("Card",card[page - 1], true)
                                        embed.addField('#', num[page - 1], true)
                                        embed.addField("Rarity",rarity[page - 1], true)
                                    }
                                    embed.setFooter(`Page ${page}`);
                                    msg.edit(embed);

                                })
                                ford.on('collect',async r => {
                                    
                                    embed.spliceFields(0, 3);
                                    if (rows[per * page] > rows[rows.length]) return;
                                    page++;
                                    let exists = false;
                                    if (card[page - 1] !== undefined && card[page - 1] != "") {
                                        embed.addField("Card",card[page - 1], true)
                                        embed.addField('#', num[page - 1], true)
                                        embed.addField("Rarity",rarity[page - 1], true)
                                        exists = true;
                                        embed.setFooter(`Page ${page}`);
                                        msg.edit(embed);
                                    } else {
                                        pages[page - 1] = "Card \t # \t Rarity \n";
                                        card[page - 1] = "";
                                        rarity[page - 1] = "";
                                        num[page - 1] = "";

                                        for (var c = per; c < per + 25 && c < rows.length; c++) {
                                            if(rows[c].itemName.toLowerCase().includes(cardName.toLowerCase())){
                                                card[page - 1] += rows[c].cardName + "\n";
                                                rarity[page - 1] += rows[c].cardRarity + "\n";
                                                num[page - 1] += 'x' + rows[c].cardNum + "\n";
                                            } else {
                                                per++;
                                            }
                                        }
                                        per += per;
                                        embed.setDescription(pages[page - 1]);
                                        if(card[page - 1] != ""){
                                            embed.addField("Card",card[page - 1], true)
                                            embed.addField('#', num[page - 1], true)
                                            embed.addField("Rarity",rarity[page - 1], true)
                                        }
                                        embed.setFooter(`Page ${page}`);
                                        msg.edit(embed);
                                    }
                                })
                            })
                        })
                    } else {
                        msg.reply("You currently don't have any cards that fit your search criteria!");
                    }
                })
            }
        }
    }
}