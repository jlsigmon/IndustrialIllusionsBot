const { MessageAttachment } = require("discord.js");

module.exports = {
    name: 'tagaccept',
    description: "Lets users accept duel challenges!",
    execute(msg, args, walnut, challenge1, challenge2, challenge3){
        if (challenge1.includes(msg.author.id)) {
            var n = challenge1.indexOf(msg.author.id);
            msg.channel.send(walnut[n].username + ', Your tag challenge has been accepted by ' + msg.author.username + '!');

        }
        else if (challenge2.includes(msg.author.id)) {
            var n = challenge2.indexOf(msg.author.id);
            msg.channel.send(walnut[n].username + ', Your tag challenge has been accepted ' + msg.author.username + '!');

        }
        else if (challenge3.includes(msg.author.id)) {
            var n = challenge3.indexOf(msg.author.id);
            msg.channel.send(walnut[n].username + ', Your tag challenge has been accepted ' + msg.author.username + '!');

        } else {
            msg.reply('You do not have a pending challenge!');
        }
    }
}