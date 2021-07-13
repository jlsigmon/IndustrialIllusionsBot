module.exports = {
    name: 'challenge',
    description: "Lets users challenge each other to a duel!",
    execute(msg, args, coconut, walnut, challengers, challenge){
        if(msg.channel.name !== 'general-dueling'){
            if (args[1] && !challengers.includes(msg.author.id) && msg.mentions.users.first() != undefined) {
                var son = msg.mentions.users.first();

                if (!challenge.includes(son.id) && son.id !== msg.author.id && !son.bot) {
                    coconut[coconut.length] = son;
                    walnut[walnut.length] = msg.author;
                    challengers[challengers.length] = msg.author.id;
                    challenge[challenge.length] = son.id;
                    msg.channel.send(son.username + ", you have been challenged to a duel by " + msg.author.username + "!");
                }
                else if (challenge.includes(son.id)) {
                    msg.reply('That user is already in a duel!');
                }
                else if (son.id === msg.author.id) {
                    msg.reply('You cannot challenge youself silly!')
                }
                else if(son.bot){
                    msg.reply("You cannot challenge a bot to a duel!");
                }
                

            } else if (challengers.includes(msg.author.id)) {
                msg.reply('You are already challenging someone to a duel!');
            }
            if (!args[1]) {
                msg.reply('Please provide a user to challenge!');
            }
        } else {
            msg.reply(" You cannot use that command here!");
        }
    }
}