module.exports = {
    name: 'tagdecline',
    description: "Lets users decline duel challenges!",
    execute(msg, args, coconut1, coconut2, coconut3, walnut, challengers, challenge1, challenge2, challenge3){
        if (challenge1.includes(msg.author.id)) {
            var n = challenge1.indexOf(msg.author.id);
            challenge1.splice(n, 1);
            challenge2.splice(n, 1);
            challenge3.splice(n, 1);
            coconut1.splice(n, 1);
            coconut2.splice(n, 1);
            coconut3.splice(n, 1);
            msg.channel.send('<@' + walnut[n].id + '>, Your tag challenge has been declined!');
            challengers.splice(n, 1);
            walnut.splice(n, 1);
        } else if (challenge2.includes(msg.author.id)) {
            var n = challenge2.indexOf(msg.author.id);
            challenge1.splice(n, 1);
            challenge2.splice(n, 1);
            challenge3.splice(n, 1);
            coconut1.splice(n, 1);
            coconut2.splice(n, 1);
            coconut3.splice(n, 1);
            msg.channel.send('<@' + walnut[n].id + '>, Your tag challenge has been declined!');
            challengers.splice(n, 1);
            walnut.splice(n, 1);
        } else if (challenge3.includes(msg.author.id)) {
            var n = challenge3.indexOf(msg.author.id);
            challenge1.splice(n, 1);
            challenge2.splice(n, 1);
            challenge3.splice(n, 1);
            coconut1.splice(n, 1);
            coconut2.splice(n, 1);
            coconut3.splice(n, 1);
            msg.channel.send('<@' + walnut[n].id + '>, Your tag challenge has been declined!');
            challengers.splice(n, 1);
            walnut.splice(n, 1);
        } else {
            msg.reply('You do not have a pending challenge!');
        }
    }
}