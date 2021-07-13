const packs = ["lob","mrd","srl","psv","lon","lod","pgd","mfc","dcr","ioc","ast"];
const packs2 = ["sod","rds","fet","tlm","crv","een","soi","eoj","potd","cdip"];
const tourneyPacks = ["tp1","tp2","tp3","tp4","tp5"];
const battlePacks = ["bp01","bp02"];
const decks = ["yugi","kaiba","joey","pegasus","sye","ske"];
const struct = ["sd1"];
const tins = ["tin2002","tin2003","tin2004"];
const otherPacks = ["ston","fotb","taev","glas","ptdn","lodt","tdgs","csoc"];
module.exports = {
    name: 'view',
    description: "Command to view the number of points you have",
    execute(msg, args, pack, packType, deck, Discord){
        var k = msg.author.id;
        let name = args[1];
        const packEmbed = new Discord.MessageEmbed().setTitle(name.toLowerCase());
        if(args.length === 2){
            if(pack.get(args[1].toLowerCase()) !== undefined){
                switch (pack.get(args[1].toLowerCase()).type) {
                    case "lob-ast":
                        packType.get('lob-ast').viewContents(msg, args, pack, Discord);
                        break;
                    case "sod-cdip":
                        packType.get('sod-cdip').viewContents(msg, args, pack, Discord);
                        break;
                    case "ston-fotb":
                        packType.get('ston-fotb').viewContents(msg, args, pack, Discord);
                        break;
                    case "taev-docs":
                        packType.get('taev-docs').viewContents(msg, args, pack, Discord);
                        break;
                    case "battlepack":
                        packType.get('battlepack').viewContents(msg, args, pack, Discord);
                        break;
                    case "db":
                        packType.get('db').viewContents(msg, args, pack, Discord);
                        break;
                    case "exclusive":
                        packType.get('exclusive').viewContents(msg, args, pack, Discord);
                        break;
                    case "tourney":
                        packType.get('tourney').viewContents(msg, args, pack, Discord);
                        break;
                }
            }
            if(decks.includes(name.toLowerCase())){
                packEmbed.addField("Full Name",deck.get(name.toLowerCase()).description)
                packEmbed.addField("Cost",deck.get(name.toLowerCase()).price)
                let page = 1;
                let pages = 3;
                let comList = deck.get(name.toLowerCase()).common;
                let superList = deck.get(name.toLowerCase()).super;
                let ultraList = deck.get(name.toLowerCase()).ultra;
                let common = "";
                let sRare = "";
                let ultra = "";
                for(let i = 0; i < comList.length; i++){
                    common += comList[i] + "\n";
                }
                for(let i = 0; i < superList.length; i++){
                    sRare += superList[i] + "\n";
                }
                for(let i = 0; i < ultraList.length; i++){
                    ultra += ultraList[i] + "\n";
                }
                packEmbed.addField("Commons",common);
                packEmbed.setFooter(`Page ${page} out of ${pages}`)
                msg.channel.send(packEmbed).then(msg =>{
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
                            packEmbed.spliceFields(2, 1);
                            if (page === 1) return;
                            page--;
                            switch(page){
                                case 1:
                                    packEmbed.addField("Commons",common);
                                break;
                                case 2:
                                    packEmbed.addField("Supers",sRare);
                                break;
                                case 3:
                                    packEmbed.addField("Ultras",ultra);
                                break;
                            }
                            packEmbed.setFooter(`Page ${page} out of ${pages}`);
                            msg.edit(packEmbed);
        
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
                            packEmbed.spliceFields(2, 1);
                            if (page === 3) return;
                            page++;
                            
                            switch(page){
                                case 1:
                                    packEmbed.addField("Commons",common);
                                break;
                                case 2:
                                    packEmbed.addField("Supers",sRare);
                                break;
                                case 3:
                                    packEmbed.addField("Ultras",ultra);
                                break;
                            }
                            packEmbed.setFooter(`Page ${page} out of ${pages}`);
                            msg.edit(packEmbed);
                            
                        })
                    })
                });    
            }
            if(tins.includes(name.toLowerCase())){
                if(name.toLowerCase() === "tin2002"){
                    packEmbed.addField("Full Name","Collectible Tin 2002");
                    packEmbed.addField("Cost","550");
                    packEmbed.addField("Packs","2x Legend of Blue Eyes White Dragon\n2x Metal Raiders\n1x Spell Ruler");
                    packEmbed.addField("Possible Promos","Dark Magician, Summoned Skull, Blue-Eyes White Dragon, Lord of D., Red-Eyes Black Dragon, Black Skull Dragon")
                    msg.channel.send(packEmbed);
                }
                if(name.toLowerCase() === "tin2003"){
                    packEmbed.addField("Full Name","Collectible Tin 2003");
                    packEmbed.addField("Cost","550");
                    packEmbed.addField("Packs","1x Legend of Blue Eyes White Dragon\n1x Metal Raiders\n1x Spell Ruler\n1x Pharoah's Servant\n1x Labyrinth of Nightmare");
                    packEmbed.addField("Possible Promos","Dark Magician, Buster Blader, Blue-Eyes White Dragon, XYZ-Dragon Cannon, Jinzo, Gearfried the Iron Knight")
                    msg.channel.send(packEmbed);
                }
                if(name.toLowerCase() === "tin2004"){
                    packEmbed.addField("Full Name","Collectible Tin 2004");
                    packEmbed.addField("Cost","550");
                    packEmbed.addField("Packs","1x Pharaonic Guardian\n1x Magician's Force\n1x Dark Crisis\n1x Invasion of Chaos\n1x Ancient Sanctuary");
                    packEmbed.addField("Possible Promos","Total Defense Shogun, Blade Knight, Command Knight, Swift Gaia the Fierce Knight, Insect Queen, Obnoxious Celtic Guard")
                    msg.channel.send(packEmbed);
                }
            }
            if(struct.includes(name.toLowerCase())){
                packEmbed.addField("Full Name",deck.get(name.toLowerCase()).description)
                packEmbed.addField("Cost",deck.get(name.toLowerCase()).price)
                let page = 1;
                let pages = 2;
                let comList = deck.get(name.toLowerCase()).common;
                let ultraList = deck.get(name.toLowerCase()).ultra;
                let common = "";
                let ultra = "";
                for(let i = 0; i < comList.length; i++){
                    common += comList[i] + "\n";
                }
                for(let i = 0; i < ultraList.length; i++){
                    ultra += ultraList[i] + "\n";
                }
                packEmbed.addField("Commons",common);
                packEmbed.setFooter(`Page ${page} out of ${pages}`)
                msg.channel.send(packEmbed).then(msg =>{
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
                            packEmbed.spliceFields(2, 1);
                            if (page === 1) return;
                            page--;
                            switch(page){
                                case 1:
                                    packEmbed.addField("Commons",common);
                                break;
                                case 2:
                                    packEmbed.addField("Ultras",ultra);
                                break;
                            }
                            packEmbed.setFooter(`Page ${page} out of ${pages}`);
                            msg.edit(packEmbed);
        
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
                            packEmbed.spliceFields(2, 1);
                            if (page === 3) return;
                            page++;
                            
                            switch(page){
                                case 1:
                                    packEmbed.addField("Commons",common);
                                break;
                                case 2:
                                    packEmbed.addField("Ultras",ultra);
                                break;
                            }
                            packEmbed.setFooter(`Page ${page} out of ${pages}`);
                            msg.edit(packEmbed);
                            
                        })
                    })
                });    
            }
        } else {
            msg.reply("Please provide a pack or deck to view! ex. i!view lob");
        }       
    }
}