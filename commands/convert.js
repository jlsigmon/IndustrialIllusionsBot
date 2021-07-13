module.exports = {
    name: 'convert',
    description: "Lets users convert extra cards into points!",
    execute(msg, args, con){
        let rarity = "none";
        if(args.length > 1){
            rarity = args[args.length - 1].toLowerCase();
        }
        var cards = [];
        var burned = 0;
        let total = 0;
        con.query(`SELECT * FROM collection WHERE userId = '${msg.author.id}' AND serverId = "${msg.guild.id}" ORDER BY cardName`, (err, rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                
                for(let x = 0; x < rows.length; x++){
                    if(rows[x].cardNum > 3){
                        if(rows[x].cardRarity === "Common" && (rarity === "none" || rarity === "common")){
                            let burnAmount = rows[x].cardNum - 3;
                            total += (5 * burnAmount);
                            burned += burnAmount;
                            cards[cards.length] = rows[x].cardName;
                        }
                        else if(rows[x].cardRarity === "Rare" && (rarity === "none" || rarity === "rare")){
                            let burnAmount = rows[x].cardNum - 3;
                            total += (10 * burnAmount);
                            burned += burnAmount;
                            cards[cards.length] = rows[x].cardName;
                        }
                        else if(rows[x].cardRarity === "Starfoil" && (rarity === "none" || rarity === "starfoil")){
                            let burnAmount = rows[x].cardNum - 3;
                            total += (10 * burnAmount);
                            burned += burnAmount;
                            cards[cards.length] = rows[x].cardName;
                        }
                        else if(rows[x].cardRarity === "Super" && (rarity === "none" || rarity === "super")){
                            let burnAmount = rows[x].cardNum - 3;
                            total += (25 * burnAmount);
                            burned += burnAmount;
                            cards[cards.length] = rows[x].cardName;
                        }
                        else if(rows[x].cardRarity === "Ultra" && (rarity === "none" || rarity === "ultra")){
                            let burnAmount = rows[x].cardNum - 3;
                            total += (50 * burnAmount);
                            burned += burnAmount;
                            cards[cards.length] = rows[x].cardName;
                        }
                        else if(rows[x].cardRarity === "Secret" && (rarity === "none" || rarity === "secret")){
                            let burnAmount = rows[x].cardNum - 3;
                            total += (75 * burnAmount);
                            burned += burnAmount;
                            cards[cards.length] = rows[x].cardName;
                        } 
                    }
                }
                msg.reply('You have made ' + total + ' Tokens from converting ' + burned + ' extra cards!');
                con.query(`SELECT * FROM tokens WHERE id = "${msg.author.id}" AND serverId = "${msg.guild.id}"`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    //if message sender doesn't have a place in the database
                    //creates row in points giving them the "defaultPoints" value in the config
                    //Otherwise they gain points equal to "points" in config  
                    let gain = parseInt(rows[0].points + total);
                    sql = `UPDATE tokens SET points = '${gain}' WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`;
                    con.query(sql, console.log);
                })
            }  
            
            for(let i = 0; i < cards.length; i++){
                let sql2;
                sql2 = `UPDATE collection SET cardNum = 3 where userId = "${msg.author.id}" AND cardName = "${cards[i]}"`;
                con.query(sql2,console.log);
            }
        })    
        
    }
}