module.exports = {
    name: 'buypack',
    description: "Command for users to buy a pack",
    execute(msg, args, con, pack, packType, Discord) {
        let numToPull = 1;
        if (args[1] === undefined) {
            msg.reply('Please provide a pack!');
        } else if (pack.get(args[1].toLowerCase()) === undefined) {
            msg.reply('Please provide a valid pack!');
        } else {
            if (args[2] !== undefined) {
                numToPull = parseInt(args[2]);
            }

            switch (pack.get(args[1].toLowerCase()).type) {
                case "lob-ast":
                    packType.get('lob-ast').openPack(msg, args, con, pack, Discord, numToPull);
                    break;
                case "sod-cdip":
                    packType.get('sod-cdip').openPack(msg, args, con, pack, Discord, numToPull);
                    break;
                case "ston-fotb":
                    packType.get('ston-fotb').openPack(msg, args, con, pack, Discord, numToPull);
                    break;
                case "taev-docs":
                    packType.get('taev-docs').openPack(msg, args, con, pack, Discord, numToPull);
                    break;
                case "battlepack":
                    packType.get('battlepack').openPack(msg, args, con, pack, Discord, numToPull);
                    break;
                case "db":
                    packType.get('db').openPack(msg, args, con, pack, Discord, numToPull);
                    break;
                case "exclusive":
                    packType.get('exclusive').openPack(msg, args, con, pack, Discord, numToPull);
                    break;
                case "tourney":
                    packType.get('tourney').openPack(msg, args, con, pack, Discord, numToPull);
                    break;
            }
        }
    }
}