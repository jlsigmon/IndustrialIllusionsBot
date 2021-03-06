module.exports = {
    name: "tourney",
    openPack(msg, args, con, pack, Discord, numToPull) {
        let k = msg.author.id;
        let totalAdd = 0;
        var newCard = [];
        var numNew = [];
        var newRarity = [];
        var newIndex = 0;
        var numC = 0;
        let pagesC = [];
        let pagesSr = [];
        let pagesR = [];
        let pagesU = [];
        let pagesS = [];
        let page = 0;

        for (let p = 0; p < numToPull; p++) {
            let com = getRandomCards(pack.get(args[1].toLowerCase()).common, pack.get(args[1].toLowerCase()).commonnum);
            let upChance = Math.floor(Math.random() * 108);
            let strc = '';
            let strsr = '';
            let strr = '';
            let stru = '';
            for (let i = 0; i < com.length; i++) {
                if (newCard.includes(com[i])) {
                    let curIndex = newCard.indexOf(com[i]);
                    if (newRarity[curIndex] === "Common") {
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
                let card = com[i];
                strc += card + "\n";
                numC++;
            }
            pagesC[p] = strc;

            if (upChance <= 64) {
                let com2 = getRandomCards(pack.get(args[1].toLowerCase()).common, pack.get(args[1].toLowerCase()).commonnum2);
                for (let i = 0; i < com2.length; i++) {
                    if (newCard.includes(com2[i])) {
                        let curIndex = newCard.indexOf(com2[i]);
                        if (newRarity[curIndex] === "Common") {
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = com2[i];
                            newRarity[newIndex] = "Common";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = com2[i];
                        newRarity[newIndex] = "Common";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    let card = com2[i];
                    strc += card + "\n";
                    numC++;
                }
                pagesC[p] = strc;
            } else if (upChance > 64 && upChance <= 100) {
                let rare = getRandomCards(pack.get(args[1].toLowerCase()).rare, pack.get(args[1].toLowerCase()).rarenum);
                for (let i = 0; i < rare.length; i++) {
                    if (newCard.includes(rare[i])) {
                        let curIndex = newCard.indexOf(rare[i]);
                        if (newRarity[curIndex] === "Rare") {
                            numNew[curIndex] += 1;
                        } else {
                            newCard[newIndex] = rare[i];
                            newRarity[newIndex] = "Rare";
                            numNew[newIndex] = 1;
                            newIndex++;
                        }
                    } else {
                        newCard[newIndex] = rare[i];
                        newRarity[newIndex] = "Rare";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                    let card = rare[i];
                    strr += card + "\n";
                    numC++;
                }
                pagesR[p] = strr;

            } else if (upChance > 100 && upChance <= 106) {
                let sRare = getRandomCards(pack.get(args[1].toLowerCase()).super, pack.get(args[1].toLowerCase()).supernum);
                for (let i = 0; i < sRare.length; i++) {
                    if (newCard.includes(sRare[i])) {
                        let curIndex = newCard.indexOf(sRare[i]);
                        if (newRarity[curIndex] === "Super") {
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
                    let card = sRare[i];
                    strsr += card + "\n";
                    numC++;
                }
                pagesSr[p] = strsr;
            } else {
                let ultra = getRandomCards(pack.get(args[1].toLowerCase()).ultra, pack.get(args[1].toLowerCase()).ultranum);
                for (let i = 0; i < ultra.length; i++) {
                    if (newCard.includes(ultra[i])) {
                        let curIndex = newCard.indexOf(ultra[i]);
                        if (newRarity[curIndex] === "Ultra") {
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
                    let card = ultra[i];
                    stru += card + "\n";
                    numC++;
                }
                pagesU[p] = stru;
            }
        }

        con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
            if (err) throw err;

            let sql;

            if (rows.length > 0) {
                if (rows[0].points >= pack.get(args[1].toLowerCase()).price * numToPull) {
                    let point = parseInt(rows[0].points);
                    let pts = parseInt(pack.get(args[1].toLowerCase()).price * numToPull);
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
                                con.query(sql, [newCard[i]], console.log);
                            } else {
                                let sql2;
                                totalAdd = numNew[i];
                                sql2 = `INSERT INTO collection (userId, serverId, cardName, cardRarity, cardNum) VALUES ('${msg.author.id}', "${msg.guild.id}", ?, "${newRarity[i]}", ${totalAdd})`;
                                con.query(sql2, [newCard[i]], console.log);
                            }
                        })
                    }

                    const embed = new Discord.MessageEmbed()
                        .setColor('AQUA')
                        .setTitle('Cards Pulled by ' + msg.member.displayName)
                        .addField("Common", pagesC[page]);
                    if (pagesR[page] != undefined) {
                        embed.addField("Rare", pagesR[page]);
                    } else if (pagesSr[page] != undefined) {
                        embed.addField("Super", pagesSr[page]);
                    } else if (pagesU[page] != undefined) {
                        embed.addField("Ultra", pagesU[page]);
                    }
                    embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                    msg.channel.send(embed).then(msg => {
                        msg.react('???').then(async r => {
                            msg.react('???')

                            const backFilt = (reaction, user) => reaction.emoji.name === '???' && user.id === k;
                            const fordFilt = (reaction, user) => reaction.emoji.name === '???' && user.id === k;

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
                                if (page === 0) return;
                                page--;
                                embed.addField("Common", pagesC[page]);
                                if (pagesR[page] != undefined) {
                                    embed.addField("Rare", pagesR[page]);
                                } else if (pagesSr[page] != undefined) {
                                    embed.addField("Super", pagesSr[page]);
                                } else if (pagesU[page] != undefined) {
                                    embed.addField("Ultra", pagesU[page]);
                                }
                                embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
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
                                if (page === numToPull - 1) return;
                                page++;
                                embed.addField("Common", pagesC[page]);
                                if (pagesR[page] != undefined) {
                                    embed.addField("Rare", pagesR[page]);
                                } else if (pagesSr[page] != undefined) {
                                    embed.addField("Super", pagesSr[page]);
                                } else if (pagesU[page] != undefined) {
                                    embed.addField("Ultra", pagesU[page]);
                                }
                                embed.setFooter(`Pack # ${page + 1} out of ${numToPull}`);
                                msg.edit(embed);

                            })
                        })
                    });

                }
                else {
                    msg.reply('You dont have enough tokens!');
                }
            }
        })
    },
    viewContents(msg, args, pack, Discord) {
        var k = msg.author.id;
        let name = args[1];
        const packEmbed = new Discord.MessageEmbed().setTitle(name.toLowerCase());
        packEmbed.addField("Full Name", pack.get(name.toLowerCase()).description)
        packEmbed.addField("Cost", pack.get(name.toLowerCase()).price)
        let page = 1;
        let pages = 4;
        let comList = pack.get(name.toLowerCase()).common;
        let rareList = pack.get(name.toLowerCase()).rare;
        let superList = pack.get(name.toLowerCase()).super;
        let ultraList = pack.get(name.toLowerCase()).ultra;
        let common = "";
        let rare = "";
        let sRare = "";
        let ultra = "";
        for (let i = 0; i < comList.length; i++) {
            common += comList[i] + "\n";
        }
        for (let i = 0; i < rareList.length; i++) {
            rare += rareList[i] + "\n";
        }
        for (let i = 0; i < superList.length; i++) {
            sRare += superList[i] + "\n";
        }
        for (let i = 0; i < ultraList.length; i++) {
            ultra += ultraList[i] + "\n";
        }
        packEmbed.addField("Commons", common);
        packEmbed.setFooter(`Page ${page} out of ${pages}`)
        msg.channel.send(packEmbed).then(msg => {
            msg.react('???').then(async r => {
                msg.react('???')

                const backFilt = (reaction, user) => reaction.emoji.name === '???' && user.id === k;
                const fordFilt = (reaction, user) => reaction.emoji.name === '???' && user.id === k;

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
                    packEmbed.spliceFields(2, 1);
                    if (page === 1) return;
                    page--;
                    switch (page) {
                        case 1:
                            packEmbed.addField("Commons", common);
                            break;
                        case 2:
                            packEmbed.addField("Rares", rare);
                            break;
                        case 3:
                            packEmbed.addField("Supers", sRare);
                            break;
                        case 4:
                            packEmbed.addField("Ultras", ultra);
                            break;
                    }
                    packEmbed.setFooter(`Page ${page} out of ${pages}`);
                    msg.edit(packEmbed);

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
                    packEmbed.spliceFields(2, 1);
                    if (page === 4) return;
                    page++;

                    switch (page) {
                        case 1:
                            packEmbed.addField("Commons", common);
                            break;
                        case 2:
                            packEmbed.addField("Rares", rare);
                            break;
                        case 3:
                            packEmbed.addField("Supers", sRare);
                            break;
                        case 4:
                            packEmbed.addField("Ultras", ultra);
                            break;
                    }
                    packEmbed.setFooter(`Page ${page} out of ${pages}`);
                    msg.edit(packEmbed);

                })
            })
        });
    },
    missingCards(msg, args, con, Discord, pack) {
        let k = msg.author.id;
        const embed = new Discord.MessageEmbed().setTitle(msg.member.displayName + "'s Missing Collection");
        //create comparison arrays
        let comList = pack.get(args[1].toLowerCase()).common;
        let superList = pack.get(args[1].toLowerCase()).super;
        let rareList = pack.get(args[1].toLowerCase()).rare;
        let ultraList = pack.get(args[1].toLowerCase()).ultra;
        let commons = [];
        let supers = [];
        let rares = [];
        let ultras = [];
        //query the database
        con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" ORDER BY cardName`, (err, rows) => {
            if (err) throw err;
            //vars related to the embed pages
            let sql;
            let count = 0;
            let curPage = 0;
            let pages = [];
            let page = 1;
            let per = 25;
            let card = [];
            let rarity = [];
            let num = [];
            if (rows.length > 0) {
                //initialize pages
                pages[page - 1] = "Card | # | Rarity";
                card[page - 1] = "";
                rarity[page - 1] = "";
                num[page - 1] = "";
                //adds card to array if it is in the pack and at the correct rarity
                for (var z = 0; z < rows.length; z++) {
                    if (comList.includes(rows[z].cardName) && rows[z].cardRarity === 'Common') {
                        commons[commons.length] = rows[z].cardName;
                    }
                    if (superList.includes(rows[z].cardName) && rows[z].cardRarity === 'Super') {
                        supers[supers.length] = rows[z].cardName;
                    }
                    if (rareList.includes(rows[z].cardName) && rows[z].cardRarity === 'Rare') {
                        rares[rares.length] = rows[z].cardName;
                    }
                    if (ultraList.includes(rows[z].cardName) && rows[z].cardRarity === 'Ultra') {
                        ultras[ultras.length] = rows[z].cardName;
                    }
                }
                //compares arrays and adds missing cards to the embed page
                for (var x = 0; x < comList.length; x++) {
                    if (!commons.includes(comList[x])) {
                        card[curPage] += comList[x] + "\n";
                        rarity[curPage] += "Common \n";
                        num[curPage] += "x0 \n";
                        count++;
                    }
                    if (count === 25) {
                        curPage++;
                        card[curPage] = "";
                        rarity[curPage] = "";
                        num[curPage] = "";
                    }
                }
                for (var x = 0; x < rareList.length; x++) {
                    if (!rares.includes(rareList[x])) {
                        card[curPage] += rareList[x] + "\n";
                        rarity[curPage] += "Rare \n";
                        num[curPage] += "x0 \n";
                        count++;
                    }
                    if (count === 25) {
                        curPage++;
                        card[curPage] = "";
                        rarity[curPage] = "";
                        num[curPage] = "";
                    }
                }
                for (var x = 0; x < superList.length; x++) {
                    if (!supers.includes(superList[x])) {
                        card[curPage] += superList[x] + "\n";
                        rarity[curPage] += "Super \n";
                        num[curPage] += "x0 \n";
                        count++;
                    }
                    if (count === 25) {
                        curPage++;
                        card[curPage] = "";
                        rarity[curPage] = "";
                        num[curPage] = "";
                    }
                }
                for (var x = 0; x < ultraList.length; x++) {
                    if (!ultras.includes(ultraList[x])) {
                        card[curPage] += ultraList[x] + "\n";
                        rarity[curPage] += "Ultra \n";
                        num[curPage] += "x0 \n";
                        count++;
                    }
                    if (count === 25) {
                        curPage++;
                        card[curPage] = "";
                        rarity[curPage] = "";
                        num[curPage] = "";
                    }
                }

                //if the page is empty
                if (card[page - 1] === "") {
                    msg.reply('You have at least one of every card in this pack!');
                } else {
                    //add pages to embed and send the embed.
                    pages[page - 1] += "";
                    embed.setColor('AQUA');
                    embed.addField("Card", card[page - 1], true)
                    embed.addField('#', num[page - 1], true)
                    embed.addField("Rarity", rarity[page - 1], true)
                    embed.setFooter(`Page ${page}`)
                    //look for a reaction and then change page accordingly
                    msg.channel.send(embed).then(msg => {
                        msg.react('???').then(async r => {
                            msg.react('???')

                            const backFilt = (reaction, user) => reaction.emoji.name === '???' && user.id === k;
                            const fordFilt = (reaction, user) => reaction.emoji.name === '???' && user.id === k;

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
                                if (page === card.length) return;
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
                                        card[page - 1] += rows[c].cardName + "\n";
                                        rarity[page - 1] += rows[c].cardRarity + "\n";
                                        num[page - 1] += 'x' + rows[c].cardNum + "\n";
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
                }
            } else {
                msg.reply("You currently don't have any cards!");
            }
        })
    }
}
function getRandomCards(cardList, number) {
    let contains = [];
    for (let i = 0; i < number; i++) {
        let num = Math.floor(Math.random() * cardList.length);
        if (!contains.includes(cardList[num])) {
            contains[i] = cardList[num];
        } else {
            i--;
        }
    }
    return contains;
}