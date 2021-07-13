const packs = ["lob","mrd","srl","psv","lon","lod","pgd","mfc","dcr","ioc","ast"];
const packs2 = ["sod","rds","fet","tlm","crv","een","soi","eoj","potd","cdip"];
const tourneyPacks = ["tp1","tp2","tp3","tp4","tp5","db1"];
const battlePacks = ["bp01","bp02"];
const otherPacks = ["ston","fotb","taev","glas","ptdn","lodt","tdgs","csoc"];
module.exports = {
    name: 'missing',
    description: "Lets users see what cards they have",
    execute(msg, args, con, Discord, pack, packType){
        if (args[1] === undefined) {
            msg.reply('Please provide a pack!');
        } else if(pack.get(args[1].toLowerCase()) !== undefined){
            switch (pack.get(args[1].toLowerCase()).type) {
                case "lob-ast":
                    packType.get('lob-ast').missingCards(msg, args, con, Discord, pack);
                    break;
                case "sod-cdip":
                    packType.get('sod-cdip').missingCards(msg, args, con, Discord, pack);
                    break;
                case "ston-fotb":
                    packType.get('ston-fotb').missingCards(msg, args, con, Discord, pack);
                    break;
                case "taev-docs":
                    packType.get('taev-docs').missingCards(msg, args, con, Discord, pack);
                    break;
                case "battlepack":
                    packType.get('battlepack').missingCards(msg, args, con, Discord, pack);
                    break;
                case "db":
                    packType.get('db').missingCards(msg, args, con, Discord, pack);
                    break;
                case "exclusive":
                    packType.get('exclusive').missingCards(msg, args, con, Discord, pack);
                    break;
                case "tourney":
                    packType.get('tourney').missingCards(msg, args, con, Discord, pack);
                    break;
            }
        } else {
            msg.reply('Please provide a valid pack!');
        }
    }
}