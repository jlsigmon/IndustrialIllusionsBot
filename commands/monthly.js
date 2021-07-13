const month = 2.628e+9;
module.exports = {
    name: 'monthly',
    description: "Monthly points command for patreon peeps!",
    execute(msg, con, Discord, bronze, silver, gold){
        con.query(`SELECT * FROM monthly WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
            if (err) throw err;

            let sql;

            let tim = 0;
            if(rows.length > 0){
                tim = month - (Date.now() - parseInt(rows[0].months));
            }
            
            let dut = parseInt(Date.now());
                 
            if (tim <= 0) {
                if(bronze.includes(msg.author.id)){
                    sql = `UPDATE monthly SET months = ${dut} WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`;
                    con.query(sql, console.log);
                    con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        let pointers = parseInt(rows[0].points + 4000);

                        sql = `UPDATE tokens SET points = '${pointers}' WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`;
                        con.query(sql, console.log);
                        
                        msg.reply('You have claimed your 4000 monthly Tokens!');
                    })
                }
                else if(silver.includes(msg.author.id)){
                    sql = `UPDATE monthly SET months = ${dut} WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`;
                    con.query(sql, console.log);
                    con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        let pointers = parseInt(rows[0].points + 6000);

                        sql = `UPDATE tokens SET points = '${pointers}' WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`;
                        con.query(sql, console.log);
                        
                        msg.reply('You have claimed your 6000 monthly Tokens!');
                    })
                }
                else if(gold.includes(msg.author.id)){
                    sql = `UPDATE monthly SET months = ${dut} WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`;
                    con.query(sql, console.log);
                    con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        let pointers = parseInt(rows[0].points + 8000);

                        sql = `UPDATE tokens SET points = '${pointers}' WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`;
                        con.query(sql, console.log);
                        
                        msg.reply('You have claimed your 8000 monthly Tokens!');
                    })
                } else {
                    sql = `UPDATE monthly SET months = ${dut} WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`;
                    con.query(sql, console.log);
                    con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        let pointers = parseInt(rows[0].points + 3000);

                        sql = `UPDATE tokens SET points = '${pointers}' WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`;
                        con.query(sql, console.log);
                        
                        msg.reply('You have claimed your 3000 monthly Tokens!');
                    })
                }
            } else {
                msg.reply("You have already claimed your monthly reward for this month! You can use this command again on the 1st of the next month after 1am EST!");
            }
        })  
    }
}

function timeLeft(ms) {
    var sec = ms / 1000;

    var day = parseInt(sec / 86400);
    sec = sec % 86400;

    var hours = parseInt(sec / 3600);
    sec = sec % 3600;

    var min = parseInt(sec / 60);
    sec = parseInt(sec % 60);
    return (day + " days:" + hours + " hours:" + min + " minutes:" + sec + " seconds!");
}
function getRandomCards(cardList, number){
    let contains = [];
    for(var i = 0; i < number; i++){
        let num = Math.floor(Math.random() * cardList.length);
        contains[i] = cardList[num];
    }
    return contains;
}