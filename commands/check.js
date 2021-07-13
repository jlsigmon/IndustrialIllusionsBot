module.exports = {
    name: 'check',
    description: "Lets users see what packs contain a card!",
    execute(msg, args, packs, packlist, Discord){
        if (args[1] === undefined) {
            msg.reply('Please provide a word(s) to search for!');
        } 
        let k = msg.author.id;
        let cr = '';
        let cards = [];
        let page = 0;
        let pages = [];
        for (let i = 1; i < args.length; i++) {
            if (i !== args.length - 1) {
                cr += (args[i] + ' ');
            } else {
                cr += args[i];
            }
        }
        for(let i = 0; i < packlist.length; i++){
            let c = packs.get(packlist[i]).cards;
            for(let x = 0; x < c.length; x++){
                let cc = c[x];
                if (cc.includes(cr)){
                    if(!cards.includes(cc)){
                        cards[cards.length] = cc;
                    }
                }
            }
        }
        if(cards[0] !== undefined){
            for(let x = page; x < cards.length; x++){
                for(let i = 0; i < packlist.length; i++){
                    let c = packs.get(packlist[i]).cards;
                    if (c.includes(cards[x])){
                        if(pages[x] == undefined){
                            pages[x] = packlist[i] + "\n";
                        } else {
                            pages[x] += packlist[i] + "\n";
                        }
                    }
                }
            }
            const embed = new Discord.MessageEmbed()
                .setTitle(cards[page])
                .addField('Packs', pages[page])
                .setFooter(`Page ${page + 1} out of ${cards.length}`);
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
                        if (page === 0) return;
                        page--;
                        embed.setTitle(cards[page])
                        embed.addField('Packs', pages[page])
                        embed.setFooter(`Page ${page + 1} out of ${cards.length}`);
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
                        if (page === cards.length - 1) return;
                        page++;    
                        embed.setTitle(cards[page])
                        embed.addField('Packs', pages[page])
                        embed.setFooter(`Page ${page + 1} out of ${cards.length}`);
                        msg.edit(embed);
                        
                    })
                })    
            });
        } else {
            msg.reply('Could not find any cards with those word(s) in their name! Keep in mind this command is case sensitive!');
        }
        //msg.reply("The " + cr + " cards in the system are " + cards);
        //msg.reply('They can be found in ' + found);
    }
}