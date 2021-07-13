module.exports = {
    name: 'reset',
    description: "Admin command to give points to a user",
    execute(msg, args, con){
        var person = msg.member;
        var server = msg.guild;
        
        msg.reply('Are you sure you want to reset all your data for this server? This will clear all the cards you have collected in this server and reset your token amount back to 3000.').then(msg =>{
            msg.react('✅').then(async r => {

                const confirmFilt = (reaction, user) => reaction.emoji.name === '✅' && user.id === person.id;

                const confirm = msg.createReactionCollector(confirmFilt, { time: 3000000 });
                
                confirm.on('collect',async r => {
                    con.query(`SELECT * FROM tokens WHERE id = '${person.id}' AND serverId = '${server.id}'`, (err, rows) => {
                        if (err) throw err;
        
                        let sql;
        
                        if (rows.length > 0) {
                            sql = `UPDATE tokens SET points = ${3000} WHERE id = '${person.id}' AND serverId = '${server.id}'`;
                            con.query(sql, console.log);
                            sql = `DELETE from collection WHERE userId = '${person.id}' AND serverId = '${server.id}'`;
                            con.query(sql, console.log);
                            sql = `DELETE from daily WHERE id = '${person.id}' AND serverId = '${server.id}'`;
                            con.query(sql, console.log);
                            sql = `DELETE from weekly WHERE id = '${person.id}' AND serverId = '${server.id}'`;
                            con.query(sql, console.log);
                            sql = `DELETE from monthly WHERE id = '${person.id}' AND serverId = '${server.id}'`;
                            con.query(sql, console.log);
                        }
                        msg.channel.send(person.displayName + ', your data has been reset!');
                    })
                })
            })
        })
    }
}