const links = ["https://duelingnexus.com/game/NA-RLY6QX","https://duelingnexus.com/game/NA-GZWOMH","https://duelingnexus.com/game/NA-3ZG3OP","https://duelingnexus.com/game/NA-J7XX9L","https://duelingnexus.com/game/NA-Y0QR3D"];
module.exports = {
    name: 'modernlink',
    description: "Command for users to buy a pack",
    execute(msg){
        let num = Math.floor(Math.random() * links.length);
        msg.reply(links[num]);
    }
}