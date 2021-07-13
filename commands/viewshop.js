module.exports = {
    name: 'viewshop',
    description: "Lets users see what packs contain a card!",
    execute(msg, con, Discord){
        const embed = new Discord.MessageEmbed().setTitle("Shop");
        con.query(`SELECT * FROM shop`, (err, rows) => {
            if (err) throw err;

            if(rows.length > 0){
                let idNum = "";
                let cardName = "";
                //let cardRarity = "";
                let cardCost = "";
                for(let i = 0; i < rows.length; i++){
                    idNum += rows[i].shopID + "\n";
                    cardName += rows[i].shopCard + "\n";
                    //cardRarity += rows[i].shopRarity + "\n";
                    cardCost += rows[i].shopCost + "\n";
                }
                embed.addField("ID",idNum, true);
                embed.addField("Card", cardName, true);
                //embed.addField("Rarity",cardRarity, true);
                embed.addField("Cost",cardCost, true);
                msg.channel.send(embed);
            }
        })
    }
}