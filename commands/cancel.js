module.exports = {
    name: 'cancel',
    description: "Lets users cancel duel challenges!",
    execute(msg, coconut, walnut, challengers, challenge){
        if (challengers.includes(msg.author.id)) {
            let z = challengers.indexOf(msg.author.id);
            challenge.splice(z, 1);
            challengers.splice(z, 1);
            walnut.splice(z, 1);
            coconut.splice(z, 1);
            msg.reply('You have cancelled your duel request!');
        } else {
            msg.reply('You are not currently challenging anyone to a duel!');
        }
    }
}