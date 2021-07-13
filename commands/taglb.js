//rows[p].wins/rows[p].lose
module.exports = {
    name: 'taglb',
    description: "Lets users see the top ten users by wins!",
    execute(msg, args, con, Discord){
        let k = msg.author.id;
        con.query(`SELECT * FROM tag ORDER BY wins DESC`, (err, rows) => {
            if (err) throw err;

            let pages = [];
            let page = 1;
            let per = 10;
            pages[page - 1] = '';
            for(let p = per * (page - 1); p < per * page && p < rows.length; p++){
                if(p < rows.length){
                    pages[page - 1] += (p+1) + ". " + rows[p].name + ", Wins: " + rows[p].wins + ", Win Rate: " + (rows[p].wins/rows[p].lose) + "\n"; 
                }
            }
            const embed = new Discord.MessageEmbed()
                .setColor('AQUA')
                .setTitle('Tag Leaderboard')
                .setFooter(`Page ${page}`)
                .setDescription(pages[page - 1]);
            msg.channel.send(embed).then(msg => {
                msg.react('◀').then(r => {
                    msg.react('▶')

                    const backFilt = (reaction, user) => reaction.emoji.name === '◀' && user.id === k;
                    const fordFilt = (reaction, user) => reaction.emoji.name === '▶' && user.id === k;

                    const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                    const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });

                    back.on('collect', r => {
                        if (page === 1) return;
                        page--;
                        embed.setDescription(pages[page - 1]);
                        embed.setFooter(`Page ${page}`);
                        msg.edit(embed);

                    })
                    ford.on('collect', r => {
                        if (rows[per * page] > rows[rows.length]) return;
                        page++;
                        let exists = false;
                        if (pages[page - 1] !== undefined) {
                            embed.setDescription(pages[page - 1]);
                            embed.setFooter(`Page ${page}`);
                            msg.edit(embed);
                            exists = true;
                        } else {
                            pages[page - 1] = '';
                        }


                        for (var i = per; i < per + 10 && i < rows.length; i++) {
                            if(i < rows.length){
                                pages[page - 1] += (i+1) + ". " + rows[i].name + ", Wins: " + rows[i].wins + ", Win Rate: " + (rows[i].wins/rows[i].lose) + "\n"; 
                            }
                        }
                        per += 10;
                        embed.setDescription(pages[page - 1]);
                        embed.setFooter(`Page ${page}`);
                        msg.edit(embed);
                    })
                })
            })
        })   
    }
}