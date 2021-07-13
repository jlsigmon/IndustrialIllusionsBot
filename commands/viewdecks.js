let dmdecks = "yugi\nkaiba\njoey\npegasus\nsye\nske\nsd1";
let gxdecks = "2006"
module.exports = {
    name: 'viewdecks',
    description: "Lets users see available decks",
    execute(msg, Discord){
        let k = msg.author.id;
        let page = 1;
        let pages = 2;
        const embed = new Discord.MessageEmbed()
            .setTitle('Available Decks')
            .addField('Duel Monsters Decks', dmdecks)
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
                            embed.addField('Duel Monsters Decks', dmdecks);
                        break;
                        case 2:
                            embed.addField('GX Decks', gxdecks);
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
                            embed.addField('DM Decks', dmdecks);
                        break;
                        case 2:
                            embed.addField('GX Decks', gxdecks);
                        break;
                    }
                    embed.setFooter(`Page ${page} out of ${pages}`);
                    msg.edit(embed);
                    
                })
            })    
        });
    }
}