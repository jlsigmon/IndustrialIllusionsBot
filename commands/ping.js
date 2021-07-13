const { Message } = require("discord.js");

module.exports = {
    name: 'ping',
    description: "Returns a ping message",
    async execute(msg, bot){
        var message = await msg.channel.send('Pinging...');
        var latency = message.createdTimestamp - msg.createdTimestamp;
        message.edit(`Latency is ${Math.floor(latency)}ms\nAPI Latency is ${Math.round(bot.ping)}ms`);
        msg.channel.send('I summon Blue-Eyes White Dragon!');
    }
    
}