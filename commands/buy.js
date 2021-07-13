const decklist = ["yugi","kaiba","joey","pegasus","sye","ske","sd1"];
const promolist = ["dds","fmr","eds","dor","sdd","tfk","tsc","pcy","wc4","dod","pck","rod","pcj","dbt","cmc","mov"];
const tinlist = ["tin2002","tin2003","tin2004"]
module.exports = {
    name: 'buy',
    description: "Lets users accept duel challenges!",
    execute(msg, args, con, commands, decks, packs, packTypes, promos, Discord){
        if (args[1] === undefined) {
            msg.reply('Please provide a pack, deck, or promo item!');
        } else if (packs.get(args[1].toLowerCase()) === undefined && !decklist.includes(args[1].toLowerCase()) && !promolist.includes(args[1].toLowerCase()) && !tinlist.includes(args[1].toLowerCase())) {
            msg.reply('Please provide a valid pack, deck, or promo item to buy!');
        } else if(packs.get(args[1].toLowerCase()) !== undefined) {
            commands.get('buypack').execute(msg, args, con, packs, packTypes, Discord);
        } else if (decklist.includes(args[1].toLowerCase())){
            commands.get('buydeck').execute(msg, args, con, decks, Discord);
        } else if(promolist.includes(args[1].toLowerCase())) {
            commands.get('buypromo').execute(msg, args, con, promos, Discord);
        }
        else if(tinlist.includes(args[1].toLowerCase())) {
            commands.get('buytin').execute(msg, args, con, packs, Discord);
        }
    }
}