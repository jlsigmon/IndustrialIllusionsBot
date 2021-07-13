let tins = ["tin2002","tin2003","tin2004"];
let colTin2 = ["lob","lob","mrd","mrd","srl"];
let colTin3 = ["lob","mrd","srl","psv","lon"];
let colTin1 = ["pgd","mfc","dcr","ioc","ast"];
let superPromos = ["dbt","cmc"];
module.exports = {
    name: 'buytin',
    description: "Command to buy a promo set",
    execute(msg, args, con, pack, Discord){
        let k = msg.author.id;
        if (args[1] === undefined) {
            msg.reply('Please provide a promo item to buy!');
        } else if (!tins.includes(args[1].toLowerCase())) {
            msg.reply('Please provide a valid promo item!');
        } else  {
            if(args[1].toLowerCase() === "tin2002"){
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
                let numToPull = 5;
                let promoCard = ["Dark Magician","Summoned Skull","Blue-Eyes White Dragon","Lord of D.","Red-Eyes Black Dragon","Black Skull Dragon"];

                for(let p = 0; p < numToPull; p++){
                    let com = getRandomCards(pack.get(colTin2[p]).common, pack.get(colTin2[p]).commonnum);
                    let rare = getRandomCards(pack.get(colTin2[p]).rare, pack.get(colTin2[p]).rarenum);
                    let upChance = Math.floor(Math.random() * 1380);
                    let strc = '';
                    let strsr = '';
                    let strr = '';
                    let stru = '';
                    let strs = '';
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
                        let card = com[i];
                        strc += card + "\n";
                        numC++;
                    }
                    pagesC[p] = strc;
                    for (let i = 0; i < rare.length; i++) {
                        if(newCard.includes(rare[i])){
                            let curIndex = newCard.indexOf(rare[i]);
                            if(newRarity[curIndex] === "Rare"){
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
                    if(upChance <= 929){
                        let com2 = getRandomCards(pack.get(colTin2[p]).common, pack.get(colTin2[p]).commonnum2);
                        for (let i = 0; i < com2.length; i++) {
                            if(newCard.includes(com2[i])){
                                let curIndex = newCard.indexOf(com2[i]);
                                if(newRarity[curIndex] === "Common"){
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
                    } else if(upChance > 929 && upChance <= 1205){
                        let sRare = getRandomCards(pack.get(colTin2[p]).super, pack.get(colTin2[p]).supernum);
                        for (let i = 0; i < sRare.length; i++) {
                            if(newCard.includes(sRare[i])){
                                let curIndex = newCard.indexOf(sRare[i]);
                                if(newRarity[curIndex] === "Super"){
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
                        
                    } else if(upChance > 1205 && upChance <= 1320){
                        let ultra = getRandomCards(pack.get(colTin2[p]).ultra, pack.get(colTin2[p]).ultranum);
                        for (let i = 0; i < ultra.length; i++) {
                            if(newCard.includes(ultra[i])){
                                let curIndex = newCard.indexOf(ultra[i]);
                                if(newRarity[curIndex] === "Ultra"){
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
                    } else {
                        let secret = getRandomCards(pack.get(colTin2[p]).secret, pack.get(colTin2[p]).secretnum);
                        for (let i = 0; i < secret.length; i++) {
                            if(newCard.includes(secret[i])){
                                let curIndex = newCard.indexOf(secret[i]);
                                if(newRarity[curIndex] === "Secret"){
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
                            let card = secret[i];
                            strs += card + "\n";
                            numC++;
                        }
                        pagesS[p] = strs;
                    }
                }
                let promoChoice = promoCard[Math.floor(Math.random() * promoCard.length)];
                if(newCard.includes(promoChoice)){
                    let curIndex = newCard.indexOf(promoChoice);
                    if(newRarity[curIndex] === "Secret"){
                        numNew[curIndex] += 1;
                    } else {
                        newCard[newIndex] = promoChoice;
                        newRarity[newIndex] = "Secret";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                } else {
                    newCard[newIndex] = promoChoice;
                    newRarity[newIndex] = "Secret";
                    numNew[newIndex] = 1;
                    newIndex++;
                }
                numC++;
                pagesS[5] = promoChoice;
                
                    con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                        if (err) throw err;
        
                        let sql;
        
                        if (rows.length > 0) {
                            if (rows[0].points >= 550) {
                                let point = parseInt(rows[0].points);
                                let pts = parseInt(550);
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
                                    .setTitle('Cards Pulled by ' + msg.member.displayName)
                                    .addField("Common",pagesC[page])
                                    .addField("Rare",pagesR[page]);
                                if(pagesSr[page] != undefined){
                                    embed.addField("Super",pagesSr[page]);
                                } else if(pagesU[page] != undefined){
                                    embed.addField("Ultra",pagesU[page]);
                                } else if(pagesS[page] != undefined){
                                    embed.addField("SECRET",pagesS[page]);
                                }
                                embed.setFooter(`Pack # ${page + 1} out of ${numToPull + 1}`);
                                msg.channel.send(embed).then(msg =>{
                                    msg.react('◀').then(async r => {
                                        msg.react('▶')
                    
                                        const backFilt = (reaction, user) => reaction.emoji.name === '◀' && user.id === k;
                                        const fordFilt = (reaction, user) => reaction.emoji.name === '▶' && user.id === k;
                    
                                        const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                        const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
                                        
                                        back.on('collect',async r => {
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
                                            embed.addField("Common",pagesC[page])
                                            embed.addField("Rare",pagesR[page]);
                                            if(pagesSr[page] != undefined){
                                                embed.addField("Super",pagesSr[page]);
                                            } else if(pagesU[page] != undefined){
                                                embed.addField("Ultra",pagesU[page]);
                                            } else if(pagesS[page] != undefined){
                                                embed.addField("SECRET",pagesS[page]);
                                            }
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull + 1}`);
                                            msg.edit(embed);
                    
                                        })
                                        ford.on('collect',async r => {
                                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                            try {
                                                for (const reaction of userReactions.values()) {
                                                    await reaction.users.remove(k);
                                                }
                                            } catch (error) {
                                                console.error('Failed to remove reactions.');
                                            }
                                            embed.spliceFields(0, 3);
                                            if (page === numToPull) return;
                                            page++;   
                                            if(pagesC[page] != undefined){ 
                                                embed.addField("Common",pagesC[page])
                                            } 
                                            if(pagesR[page] != undefined){
                                                embed.addField("Rare",pagesR[page]);
                                            } 
                                            if(pagesSr[page] != undefined){
                                                embed.addField("Super",pagesSr[page]);
                                            } 
                                            if(pagesU[page] != undefined){
                                                embed.addField("Ultra",pagesU[page]);
                                            } 
                                            if(pagesS[page] != undefined){
                                                embed.addField("SECRET",pagesS[page]);
                                            }
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull + 1}`);
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
            }
            if(args[1].toLowerCase() === "tin2003"){
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
                let numToPull = 5;
                let promoCard = ["Dark Magician","Buster Blader","Blue-Eyes White Dragon","XYZ-Dragon Cannon","Jinzo","Gearfried the Iron Knight"];

                for(let p = 0; p < numToPull; p++){
                    let com = getRandomCards(pack.get(colTin3[p]).common, pack.get(colTin3[p]).commonnum);
                    let rare = getRandomCards(pack.get(colTin3[p]).rare, pack.get(colTin3[p]).rarenum);
                    let upChance = Math.floor(Math.random() * 1380);
                    let strc = '';
                    let strsr = '';
                    let strr = '';
                    let stru = '';
                    let strs = '';
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
                        let card = com[i];
                        strc += card + "\n";
                        numC++;
                    }
                    pagesC[p] = strc;
                    for (let i = 0; i < rare.length; i++) {
                        if(newCard.includes(rare[i])){
                            let curIndex = newCard.indexOf(rare[i]);
                            if(newRarity[curIndex] === "Rare"){
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
                    if(upChance <= 929){
                        let com2 = getRandomCards(pack.get(colTin3[p]).common, pack.get(colTin3[p]).commonnum2);
                        for (let i = 0; i < com2.length; i++) {
                            if(newCard.includes(com2[i])){
                                let curIndex = newCard.indexOf(com2[i]);
                                if(newRarity[curIndex] === "Common"){
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
                    } else if(upChance > 929 && upChance <= 1205){
                        let sRare = getRandomCards(pack.get(colTin3[p]).super, pack.get(colTin3[p]).supernum);
                        for (let i = 0; i < sRare.length; i++) {
                            if(newCard.includes(sRare[i])){
                                let curIndex = newCard.indexOf(sRare[i]);
                                if(newRarity[curIndex] === "Super"){
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
                        
                    } else if(upChance > 1205 && upChance <= 1320){
                        let ultra = getRandomCards(pack.get(colTin3[p]).ultra, pack.get(colTin3[p]).ultranum);
                        for (let i = 0; i < ultra.length; i++) {
                            if(newCard.includes(ultra[i])){
                                let curIndex = newCard.indexOf(ultra[i]);
                                if(newRarity[curIndex] === "Ultra"){
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
                    } else {
                        let secret = getRandomCards(pack.get(colTin3[p]).secret, pack.get(colTin3[p]).secretnum);
                        for (let i = 0; i < secret.length; i++) {
                            if(newCard.includes(secret[i])){
                                let curIndex = newCard.indexOf(secret[i]);
                                if(newRarity[curIndex] === "Secret"){
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
                            let card = secret[i];
                            strs += card + "\n";
                            numC++;
                        }
                        pagesS[p] = strs;
                    }
                }
                let promoChoice = promoCard[Math.floor(Math.random() * promoCard.length)];
                if(newCard.includes(promoChoice)){
                    let curIndex = newCard.indexOf(promoChoice);
                    if(newRarity[curIndex] === "Secret"){
                        numNew[curIndex] += 1;
                    } else {
                        newCard[newIndex] = promoChoice;
                        newRarity[newIndex] = "Secret";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                } else {
                    newCard[newIndex] = promoChoice;
                    newRarity[newIndex] = "Secret";
                    numNew[newIndex] = 1;
                    newIndex++;
                }
                numC++;
                pagesS[5] = promoChoice;
                
                    con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                        if (err) throw err;
        
                        let sql;
        
                        if (rows.length > 0) {
                            if (rows[0].points >= 550) {
                                let point = parseInt(rows[0].points);
                                let pts = parseInt(550);
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
                                    .setTitle('Cards Pulled by ' + msg.member.displayName)
                                    .addField("Common",pagesC[page])
                                    .addField("Rare",pagesR[page]);
                                if(pagesSr[page] != undefined){
                                    embed.addField("Super",pagesSr[page]);
                                } else if(pagesU[page] != undefined){
                                    embed.addField("Ultra",pagesU[page]);
                                } else if(pagesS[page] != undefined){
                                    embed.addField("SECRET",pagesS[page]);
                                }
                                embed.setFooter(`Pack # ${page + 1} out of ${numToPull + 1}`);
                                msg.channel.send(embed).then(msg =>{
                                    msg.react('◀').then(async r => {
                                        msg.react('▶')
                    
                                        const backFilt = (reaction, user) => reaction.emoji.name === '◀' && user.id === k;
                                        const fordFilt = (reaction, user) => reaction.emoji.name === '▶' && user.id === k;
                    
                                        const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                        const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
                                        
                                        back.on('collect',async r => {
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
                                            embed.addField("Common",pagesC[page])
                                            embed.addField("Rare",pagesR[page]);
                                            if(pagesSr[page] != undefined){
                                                embed.addField("Super",pagesSr[page]);
                                            } else if(pagesU[page] != undefined){
                                                embed.addField("Ultra",pagesU[page]);
                                            } else if(pagesS[page] != undefined){
                                                embed.addField("SECRET",pagesS[page]);
                                            }
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull + 1}`);
                                            msg.edit(embed);
                    
                                        })
                                        ford.on('collect',async r => {
                                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                            try {
                                                for (const reaction of userReactions.values()) {
                                                    await reaction.users.remove(k);
                                                }
                                            } catch (error) {
                                                console.error('Failed to remove reactions.');
                                            }
                                            embed.spliceFields(0, 3);
                                            if (page === numToPull) return;
                                            page++;   
                                            if(pagesC[page] != undefined){ 
                                                embed.addField("Common",pagesC[page])
                                            } 
                                            if(pagesR[page] != undefined){
                                                embed.addField("Rare",pagesR[page]);
                                            } 
                                            if(pagesSr[page] != undefined){
                                                embed.addField("Super",pagesSr[page]);
                                            } 
                                            if(pagesU[page] != undefined){
                                                embed.addField("Ultra",pagesU[page]);
                                            } 
                                            if(pagesS[page] != undefined){
                                                embed.addField("SECRET",pagesS[page]);
                                            }
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull + 1}`);
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
            }
            if(args[1].toLowerCase() === "tin2004"){
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
                let numToPull = 5;
                let promoCard = ["Total Defense Shogun","Blade Knight","Command Knight","Swift Gaia the Fierce Knight","Insect Queen","Obnoxious Celtic Guard"]

                for(let p = 0; p < numToPull; p++){
                    let com = getRandomCards(pack.get(colTin1[p]).common, pack.get(colTin1[p]).commonnum);
                    let rare = getRandomCards(pack.get(colTin1[p]).rare, pack.get(colTin1[p]).rarenum);
                    let upChance = Math.floor(Math.random() * 1380);
                    let strc = '';
                    let strsr = '';
                    let strr = '';
                    let stru = '';
                    let strs = '';
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
                        let card = com[i];
                        strc += card + "\n";
                        numC++;
                    }
                    pagesC[p] = strc;
                    for (let i = 0; i < rare.length; i++) {
                        if(newCard.includes(rare[i])){
                            let curIndex = newCard.indexOf(rare[i]);
                            if(newRarity[curIndex] === "Rare"){
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
                    if(upChance <= 929){
                        let com2 = getRandomCards(pack.get(colTin1[p]).common, pack.get(colTin1[p]).commonnum2);
                        for (let i = 0; i < com2.length; i++) {
                            if(newCard.includes(com2[i])){
                                let curIndex = newCard.indexOf(com2[i]);
                                if(newRarity[curIndex] === "Common"){
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
                    } else if(upChance > 929 && upChance <= 1205){
                        let sRare = getRandomCards(pack.get(colTin1[p]).super, pack.get(colTin1[p]).supernum);
                        for (let i = 0; i < sRare.length; i++) {
                            if(newCard.includes(sRare[i])){
                                let curIndex = newCard.indexOf(sRare[i]);
                                if(newRarity[curIndex] === "Super"){
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
                        
                    } else if(upChance > 1205 && upChance <= 1320){
                        let ultra = getRandomCards(pack.get(colTin1[p]).ultra, pack.get(colTin1[p]).ultranum);
                        for (let i = 0; i < ultra.length; i++) {
                            if(newCard.includes(ultra[i])){
                                let curIndex = newCard.indexOf(ultra[i]);
                                if(newRarity[curIndex] === "Ultra"){
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
                    } else {
                        let secret = getRandomCards(pack.get(colTin1[p]).secret, pack.get(colTin1[p]).secretnum);
                        for (let i = 0; i < secret.length; i++) {
                            if(newCard.includes(secret[i])){
                                let curIndex = newCard.indexOf(secret[i]);
                                if(newRarity[curIndex] === "Secret"){
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
                            let card = secret[i];
                            strs += card + "\n";
                            numC++;
                        }
                        pagesS[p] = strs;
                    }
                }
                let promoChoice = promoCard[Math.floor(Math.random() * promoCard.length)];
                if(newCard.includes(promoChoice)){
                    let curIndex = newCard.indexOf(promoChoice);
                    if(newRarity[curIndex] === "Secret"){
                        numNew[curIndex] += 1;
                    } else {
                        newCard[newIndex] = promoChoice;
                        newRarity[newIndex] = "Secret";
                        numNew[newIndex] = 1;
                        newIndex++;
                    }
                } else {
                    newCard[newIndex] = promoChoice;
                    newRarity[newIndex] = "Secret";
                    numNew[newIndex] = 1;
                    newIndex++;
                }
                numC++;
                pagesS[5] = promoChoice;
                
                    con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                        if (err) throw err;
        
                        let sql;
        
                        if (rows.length > 0) {
                            if (rows[0].points >= 550) {
                                let point = parseInt(rows[0].points);
                                let pts = parseInt(550);
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
                                    .setTitle('Cards Pulled by ' + msg.member.displayName)
                                    .addField("Common",pagesC[page])
                                    .addField("Rare",pagesR[page]);
                                if(pagesSr[page] != undefined){
                                    embed.addField("Super",pagesSr[page]);
                                } else if(pagesU[page] != undefined){
                                    embed.addField("Ultra",pagesU[page]);
                                } else if(pagesS[page] != undefined){
                                    embed.addField("SECRET",pagesS[page]);
                                }
                                embed.setFooter(`Pack # ${page + 1} out of ${numToPull + 1}`);
                                msg.channel.send(embed).then(msg =>{
                                    msg.react('◀').then(async r => {
                                        msg.react('▶')
                    
                                        const backFilt = (reaction, user) => reaction.emoji.name === '◀' && user.id === k;
                                        const fordFilt = (reaction, user) => reaction.emoji.name === '▶' && user.id === k;
                    
                                        const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                                        const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
                                        
                                        back.on('collect',async r => {
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
                                            embed.addField("Common",pagesC[page])
                                            embed.addField("Rare",pagesR[page]);
                                            if(pagesSr[page] != undefined){
                                                embed.addField("Super",pagesSr[page]);
                                            } else if(pagesU[page] != undefined){
                                                embed.addField("Ultra",pagesU[page]);
                                            } else if(pagesS[page] != undefined){
                                                embed.addField("SECRET",pagesS[page]);
                                            }
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull + 1}`);
                                            msg.edit(embed);
                    
                                        })
                                        ford.on('collect',async r => {
                                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                                            try {
                                                for (const reaction of userReactions.values()) {
                                                    await reaction.users.remove(k);
                                                }
                                            } catch (error) {
                                                console.error('Failed to remove reactions.');
                                            }
                                            embed.spliceFields(0, 3);
                                            if (page === numToPull) return;
                                            page++;   
                                            if(pagesC[page] != undefined){ 
                                                embed.addField("Common",pagesC[page])
                                            } 
                                            if(pagesR[page] != undefined){
                                                embed.addField("Rare",pagesR[page]);
                                            } 
                                            if(pagesSr[page] != undefined){
                                                embed.addField("Super",pagesSr[page]);
                                            } 
                                            if(pagesU[page] != undefined){
                                                embed.addField("Ultra",pagesU[page]);
                                            } 
                                            if(pagesS[page] != undefined){
                                                embed.addField("SECRET",pagesS[page]);
                                            }
                                            embed.setFooter(`Pack # ${page + 1} out of ${numToPull + 1}`);
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
            }
       }
    }
}

function getRandomCards(cardList, number){
    let contains = [];
    for(let i = 0; i < number; i++){
        let num = Math.floor(Math.random() * cardList.length);
        if(!contains.includes(cardList[num])){
            contains[i] = cardList[num];
        } else {
            i--;
        }
    }
    return contains;
}