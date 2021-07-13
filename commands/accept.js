module.exports = {
    name: 'accept',
    description: "Lets users accept duel challenges!",
    execute(msg, walnut, challenge){
        if (challenge.includes(msg.author.id)) {
            var n = challenge.indexOf(msg.author.id);
            msg.channel.send('<@' + walnut[n].id + '>, Your challenge has been accepted!');

        } else {
            msg.reply('You do not have a pending challenge!');
        }
    }
}