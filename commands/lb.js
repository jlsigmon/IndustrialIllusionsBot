//rows[p].wins/rows[p].lose
module.exports = {
    name: 'lb',
    description: "Lets users see the top ten users by wins!",
    execute(msg, con, Discord) {
        let k = msg.author.id;
        con.query(`SELECT * FROM leaderboard WHERE serverId = '${msg.guild.id}' ORDER BY level DESC`, (err, rows) => {
            if (err) throw err;
            let pages = [];
            let page = 1;
            let per = 10;
            pages[page - 1] = '';
            for (let p = 0; p < rows.length; p++) {
                if(p % 10 === 0 && p != 0){
                    page++;
                }
                pages[page - 1] += (p + 1) + ". " + rows[p].name + ", Wins: " + rows[p].wins + ", Level: " + rows[p].level + "\n";
            }
            const embed = new Discord.MessageEmbed()
                .setColor('AQUA')
                .setTitle('Standard Leaderboard')
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
                        embed.setDescription(pages[page - 1]);
                        embed.setFooter(`Page ${page}`);
                        msg.edit(embed);
                    })
                })
            })
        })
    }
}