module.exports = {
    name: 'lct',
    description: "Lets users list their cards by type!",
    execute(msg, args, con, types, Discord) {
        let k = msg.author.id;
        let searchArray = [];
        const embed = new Discord.MessageEmbed().setTitle(msg.member.displayName + "'s Collection");
        if (args.length > 1) {
            for(let x = 1; x < args.length; x++){
                if(types.get(args[x].toLowerCase()) === undefined){
                    msg.reply('One of the search terms you provided is not valid! For a list of search terms use k!help lct');
                    return;
                }
            }
            if(args.length === 2){
                searchArray = types.get(args[1].toLowerCase()).cards;
            } else {
                let firstArray = types.get(args[1].toLowerCase()).cards;
                let compArray = [];
                for(let m = 0; m < firstArray.length; m++){
                    compArray.push(firstArray[m]);
                }
                for(let i = 2; i < args.length; i++){
                    let tempArray = types.get(args[i].toLowerCase()).cards;
                    for(let n = compArray.length; n >= 0; n--){
                        if(!tempArray.includes(compArray[n])){
                            compArray.splice(n, 1);
                        }
                    }
                }
                searchArray = compArray;
            }
            if(searchArray.length !== 0){
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
                            if (searchArray.includes(rows[i].cardName)) {
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
                        embed.setColor('AQUA');
                        if (card[page - 1] === "") {
                            embed.addField("Card", "Not Found", true)
                            embed.addField('#', "0", true)
                            embed.addField("Rarity", "N/A", true)
                        } else {
                            embed.addField("Card", card[page - 1], true)
                            embed.addField('#', num[page - 1], true)
                            embed.addField("Rarity", rarity[page - 1], true)
                        }
                        embed.setFooter(`Page ${page}`)
                        msg.channel.send(embed).then(msg => {
                            msg.react('◀').then(async r => {
                                msg.react('▶')

                                const backFilt = (reaction, user) => reaction.emoji.name === '◀' && user.id === k;
                                const fordFilt = (reaction, user) => reaction.emoji.name === '▶' && user.id === k;

                                const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });



                                back.on('collect', async r => {
                                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                    try {
                                        for (const reaction of userReactions.values()) {
                                            await reaction.users.remove(k);
                                        }
                                    } catch (error) {
                                        console.error('Failed to remove reactions.');
                                    }
                                    embed.spliceFields(0, 3);
                                    if (page === 1) return;
                                    page--;
                                    if (card[page - 1] != "") {
                                        embed.addField("Card", card[page - 1], true)
                                        embed.addField('#', num[page - 1], true)
                                        embed.addField("Rarity", rarity[page - 1], true)
                                    }
                                    embed.setFooter(`Page ${page}`);
                                    msg.edit(embed);

                                })
                                ford.on('collect', async r => {
                                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                    try {
                                        for (const reaction of userReactions.values()) {
                                            await reaction.users.remove(k);
                                        }
                                    } catch (error) {
                                        console.error('Failed to remove reactions.');
                                    }
                                    embed.spliceFields(0, 3);
                                    if (rows[per * page] > rows[rows.length]) return;
                                    page++;
                                    let exists = false;
                                    if (card[page - 1] !== undefined && card[page - 1] != "") {
                                        embed.addField("Card", card[page - 1], true)
                                        embed.addField('#', num[page - 1], true)
                                        embed.addField("Rarity", rarity[page - 1], true)
                                        exists = true;
                                        embed.setFooter(`Page ${page}`);
                                        msg.edit(embed);
                                    } else {
                                        pages[page - 1] = "Card \t # \t Rarity \n";
                                        card[page - 1] = "";
                                        rarity[page - 1] = "";
                                        num[page - 1] = "";

                                        for (var c = per; c < per + 25 && c < rows.length; c++) {
                                            if (searchArray.includes(rows[c].cardName)) {
                                                card[page - 1] += rows[c].cardName + "\n";
                                                rarity[page - 1] += rows[c].cardRarity + "\n";
                                                num[page - 1] += 'x' + rows[c].cardNum + "\n";
                                            } else {
                                                per++;
                                            }
                                        }
                                        per += 25;

                                        if (card[page - 1] != "") {
                                            embed.addField("Card", card[page - 1], true)
                                            embed.addField('#', num[page - 1], true)
                                            embed.addField("Rarity", rarity[page - 1], true)
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
                msg.reply("You don't own any cards that fit that criteria!");
            }

        } else {
            msg.reply("that is not a lct term! Use k!help lct for a list of terms!");
        }
    }
}