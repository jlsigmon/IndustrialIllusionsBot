module.exports = {
    name: 'checkcards',
    description: "Lets users see what cards they have",
    execute(msg, args, con, Discord, trusted){
        if(msg.member.hasPermission("ADMINISTRATOR")){
        
        let k = msg.mentions.members.first();
        let n = msg.author.id;
        const embed = new Discord.MessageEmbed().setTitle(k.displayName + "'s Collection");
            if (args.length > 1) {
                let crd = '';
                for (let i = 2; i < args.length; i++) {
                    if (i !== args.length - 1) {
                        crd += (args[i] + ' ');
                    } else {
                        crd += args[i];
                    }
                }
                con.query(`SELECT * FROM collection WHERE userId = '${k.id}' AND serverId = "${msg.guild.id}" ORDER BY cardName`, (err, rows) => {
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
                            if(item.toLowerCase().includes(crd.toLowerCase())){
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

                                const backFilt = (reaction, user) => reaction.emoji.name === '◀' && user.id === n;
                                const fordFilt = (reaction, user) => reaction.emoji.name === '▶' && user.id === n;

                                const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });

                                

                                back.on('collect',async r => {
                                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(n));
                                    try {
                                        for (const reaction of userReactions.values()) {
                                            await reaction.users.remove(n);
                                        }
                                    } catch (error) {
                                        console.error('Failed to remove reactions.');
                                    }
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
                                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(n));
                                    try {
                                        for (const reaction of userReactions.values()) {
                                            await reaction.users.remove(n);
                                        }
                                    } catch (error) {
                                        console.error('Failed to remove reactions.');
                                    }
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
                                            if(rows[c].itemName.toLowerCase().includes(crd.toLowerCase())){
                                                card[page - 1] += rows[c].cardName + "\n";
                                                rarity[page - 1] += rows[c].cardRarity + "\n";
                                                num[page - 1] += 'x' + rows[c].cardNum + "\n";
                                            } else {
                                                per++;
                                            }
                                        }
                                        per += per;
                                        
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
                        msg.reply("That user currently doesn't have any cards that fit your search criteria!");
                    }
                })
            }
            else {
                con.query(`SELECT * FROM collection WHERE userId = '${k.id}' AND serverId = "${msg.guild.id}" ORDER BY cardName`, (err, rows) => {
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
    
                                const backFilt = (reaction, user) => reaction.emoji.name === '◀' && user.id === n;
                                const fordFilt = (reaction, user) => reaction.emoji.name === '▶' && user.id === n;
    
                                const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
    
                                
    
                                back.on('collect',async r => {
                                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(n));
                                    try {
                                        for (const reaction of userReactions.values()) {
                                            await reaction.users.remove(n);
                                        }
                                    } catch (error) {
                                        console.error('Failed to remove reactions.');
                                    }
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
                                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(n));
                                    try {
                                        for (const reaction of userReactions.values()) {
                                            await reaction.users.remove(n);
                                        }
                                    } catch (error) {
                                        console.error('Failed to remove reactions.');
                                    }
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
                        msg.reply("That user currently doesn't have any cards!");
                    }
                })
            }
        }else{
            msg.reply("You do not have permission to use this command!");
        }
    }
}