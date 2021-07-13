module.exports = {
    name: 'invite',
    description: "Gives users info on different commands",
    execute(msg){
        msg.reply('You can invite the bot to your server via this link -> https://discord.com/api/oauth2/authorize?client_id=819277372624338985&permissions=388160&scope=bot')
    }
}