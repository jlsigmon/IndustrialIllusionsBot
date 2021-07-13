module.exports = {
    name: 'find',
    description: "Lets users see what packs contain a card!",
    execute(msg, args, packs, packlist, Discord){
        if (args[1] === undefined) {
            msg.reply('Please provide a card to search for!');
        } 
        let cr = '';
        let found = '';
        for (let i = 1; i < args.length; i++) {
            if (i !== args.length - 1) {
                cr += (args[i] + ' ');
            } else {
                cr += args[i];
            }
        }
        for(let i = 0; i < packlist.length; i++){
            let c = packs.get(packlist[i]).cards;
            if (c.includes(cr)){
                found += packlist[i] + "\n";
            }
        }
        if(found == ''){
            msg.reply('Could not find a card with that name! Keep in mind this command is case sensitive!');
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle(cr + ' is in these packs')
                .addField('Packs', found)
            msg.channel.send(embed);
        }
        //msg.reply(cr + ' can be found in ' + found);
    }
}