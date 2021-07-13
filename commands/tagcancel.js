module.exports = {
    name: 'tagcancel',
    description: "Lets users cancel duel challenges!",
    execute(msg, args, coconut1, coconut2, coconut3, walnut, challengers, challenge1, challenge2, challenge3){
        if (challengers.includes(msg.author.id)) {
            let z = challengers.indexOf(msg.author.id);
            challenge1.splice(z, 1);
            challenge2.splice(z, 1);
            challenge3.splice(z, 1);
            challengers.splice(z, 1);
            walnut.splice(z, 1);
            coconut1.splice(z, 1);
            coconut2.splice(z, 1);
            coconut3.splice(z, 1);
            msg.reply('You have cancelled your tag duel request!');
        } else {
            msg.reply('You are not currently challenging anyone to a duel!');
        }
    }
}