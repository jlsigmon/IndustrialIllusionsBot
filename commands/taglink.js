const links = ["https://duelingnexus.com/game/NA-Z09A0D0DI1J4","https://duelingnexus.com/game/NA-772KFH0DI1J4","https://duelingnexus.com/game/NA-V33MUL0DI1J4","https://duelingnexus.com/game/NA-SB47L90DI1J4","https://duelingnexus.com/game/NA-B341GT0DI1J4"];
module.exports = {
    name: 'taglink',
    description: "Command for users to buy a pack",
    execute(msg){
        let num = Math.floor(Math.random() * links.length);
        msg.reply(links[num]);
    }
}