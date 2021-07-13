const dmbasic = "lob\nmrd\nsrl\npsv\nlon\nlod\npgd\nmfc\ndcr\nioc\nast\nsod\nrds\ndb1\nep1\nfet";
const tourneyPacks = "tp1\ntp2\ntp3\ntp4\ntp5";
const battlePacks = "bp01\nbp02";
const gxbasic = "tlm\ncrv\neen\nsoi\neoj\npotd\ncdip\nston\nfotb\ntaev\nglas\nptdn\nlodt";
const fivedsbasic = "tdgs\ncsoc\ncrms\nrgbt";
const zexalbasic = "genf"
const arcvbasic = "duea";
module.exports = {
    name: 'viewpacks',
    description: "Lets users see available packs",
    execute(msg, Discord){
        let k = msg.author.id;
        let page = 1;
        let pages = 5;
        const embed = new Discord.MessageEmbed()
            .setTitle('Available Packs')
            .addField('Duel Monsters Sets', dmbasic)
            .setFooter(`Page ${page} out of ${pages}`);
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
                    embed.spliceFields(0, 1);
                    if (page === 1) return;
                    page--;
                    switch(page){
                        case 1:
                            embed.addField('Duel Monster Sets', dmbasic);
                        break;
                        case 2:
                            embed.addField('GX Sets', gxbasic);
                        break;
                        case 3:
                            embed.addField('5Ds Sets', fivedsbasic);
                        break;
                        case 4:
                            embed.addField('Tourney Sets', tourneyPacks);
                        break;
                        case 5:
                            embed.addField('Battle Pack Sets', battlePacks);
                        break;
                    }
                    embed.setFooter(`Page ${page} out of ${pages}`);
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
                    embed.spliceFields(0, 1);
                    if (page === 5) return;
                    page++;
                    
                    switch(page){
                        case 1:
                            embed.addField('Duel Monster Sets', dmbasic);
                        break;
                        case 2:
                            embed.addField('GX Sets', gxbasic);
                        break;
                        case 3:
                            embed.addField('5Ds Sets', fivedsbasic);
                        break;
                        case 4:
                            embed.addField('Tourney Sets', tourneyPacks);
                        break;
                        case 5:
                            embed.addField('Battle Pack Sets', battlePacks);
                        break;
                    }
                    embed.setFooter(`Page ${page} out of ${pages}`);
                    msg.edit(embed);
                    
                })
            })    
        });
    }
}