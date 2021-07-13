const dmpromo = "tin2002\ntin2003\ntin2004";
const tourneyPacks = "tp1\ntp2\ntp3\ntp4";
const gxbasic = "tlm";
const fivedsbasic = "tdgs";
const zexalbasic = "genf"
const arcvbasic = "duea";
module.exports = {
    name: 'viewtins',
    description: "Lets users see available packs",
    execute(msg, Discord){
        let k = msg.author.id;
        let page = 1;
        let pages = 1;
        const embed = new Discord.MessageEmbed()
            .setTitle('Available Tins')
            .addField('Duel Monsters Tins', dmpromo)
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
                            embed.addField('Duel Monster Tins', dmpromo);
                        break;
                        case 2:
                            embed.addField('Tourney Sets', tourneyPacks);
                        break;
                        case 3:
                            embed.addField('5ds Sets', fivedsbasic);
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
                    if (page === 1) return;
                    page++;
                    
                    switch(page){
                        case 1:
                            embed.addField('Duel Monsters Tins', dmpromo);
                        break;
                        case 2:
                            embed.addField('Tourney Sets', tourneyPacks);
                        break;
                        case 3:
                            embed.addField('5ds Sets', fivedsbasic);
                        break;
                    }
                    embed.setFooter(`Page ${page} out of ${pages}`);
                    msg.edit(embed);
                    
                })
            })    
        });
    }
}