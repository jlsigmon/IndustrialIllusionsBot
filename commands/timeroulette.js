module.exports = {
    name: 'timeroulette',
    description: "Lets users flip a coin!",
    execute(msg){
        msg.channel.send("Time roulette go!");
            let flip = Math.floor(Math.random() * 2);
            if (flip === 1) {
                msg.channel.send("Time roulette has landed heads!");
            } else {
                msg.channel.send("Time roulette has landed tails!");
            }
    }
}