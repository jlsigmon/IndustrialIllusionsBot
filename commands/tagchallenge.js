module.exports = {
    name: 'tagchallenge',
    description: "Lets users challenge each other to a duel!",
    execute(msg, args, coconut1, coconut2, coconut3, walnut, challengers, challenge1, challenge2, challenge3){
        if(msg.channel.name !== 'general-dueling'){
            if (args.length === 4 && !challengers.includes(msg.author.id) && args[1] !== args[2] && args[1] !== args[3]) {
                var son = msg.mentions.users.array();

                if (!challenge1.includes(son[0].id) && !challenge2.includes(son[1].id) && !challenge3.includes(son[2].id) && son[1].id !== msg.author.id && !son[1].bot) {
                    coconut1[coconut1.length] = son[0];
                    coconut2[coconut2.length] = son[1];
                    coconut3[coconut3.length] = son[2];
                    walnut[walnut.length] = msg.author;
                    challengers[challengers.length] = msg.author.id;
                    challenge1[challenge1.length] = son[0].id;
                    challenge2[challenge2.length] = son[1].id;
                    challenge3[challenge3.length] = son[2].id;
                    msg.channel.send("<@" + son[1] + "> and <@" + son[2] + ">, you have been challenged to a tag duel by <@" + msg.author.id + "> and <@" + son[0] + ">!");
                }
                else if (challenge1.includes(son[0].id) || challenge2.includes(son[1].id) || challenge3.includes(son[2].id)) {
                    msg.reply('One of those users are already in a duel!');
                }
                else if (son[0].id === msg.author.id || son[1].id === msg.author.id || son[2].id === msg.author.id) {
                    msg.reply('You cannot challenge youself silly!')
                }
                else if(son[0].bot || son[1].bot || son[2].bot){
                    msg.reply("You cannot challenge a bot to a duel!");
                }
                

            } else if (challengers.includes(msg.author.id)) {
                msg.reply('You are already challenging someone to a duel!');
            } else {
                msg.reply('You cannot have the same person in multiple positions on teams!')
            }
            if (!args[1] || !args[2] || !args[3]) {
                msg.reply('Please provide users to challenge!');
            }
        } else {
            msg.reply(" You cannot use that command here!");
        }
    }
}