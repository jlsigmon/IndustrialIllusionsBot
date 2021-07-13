module.exports = {
    name: 'help',
    description: "Gives users info on different commands",
    execute(msg, args, Discord, PREFIX){
        if (!args[1]) {
            let k = msg.author.id;
            let page = 1;
            let pages = 4;
            const embed = new Discord.MessageEmbed()
                .setTitle('Help')
                .addField('Prefix', PREFIX)
                .addField('More Info', 'Do ' + PREFIX + 'help commandName for more info! \nSupport Discord: https://discord.gg/7HHQSrh')
                .addField('General Commands', 'help\nping\npoints or balance or bal\ndaily\nweekly\nmonthly\nviewdecks\nviewpacks\ntimeroulette or tr\nfind\ncheck\narchcheck\nviewshop\nshopbuy\ninvite\nreset');
            embed.setFooter(`Page ${page} out of ${pages}`);
            msg.channel.send(embed).then(msg =>{
                    msg.react('◀').then(async r => {
                        msg.react('▶')
        
                        const backFilt = (reaction, user) => reaction.emoji.name === '◀' && user.id === k;
                        const fordFilt = (reaction, user) => reaction.emoji.name === '▶' && user.id === k;
        
                        const back = msg.createReactionCollector(backFilt, { time: 3000000 });
                        const ford = msg.createReactionCollector(fordFilt, { time: 3000000 });
                        
                        back.on('collect',async r => {
                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                            try {
                                for (const reaction of userReactions.values()) {
                                    await reaction.users.remove(k);
                                }
                            } catch (error) {
                                console.error('Failed to remove reactions.');
                            }
                            embed.spliceFields(2, 1);
                            if (page === 1) return;
                            page--;
                            switch(page){
                                case 1:
                                    embed.addField('General Commands', 'help\nping\npoints or balance or bal\nticekts\ndaily\nweekly\nmonthly\nviewdecks\nviewpacks\ntimeroulette or tr\nfind\ncheck\narchcheck\nviewshop\nshopbuy\ninvite\nreset')
                                break;
                                case 2:
                                    embed.addField('Collection Commands', 'points or bal or balance\ngive\ngivecard\nbuydeck\nlistcards or collection or trunk or binder\npublist\nbuypack\nconvert\nlct or sort\nmissing')

                                break;
                                case 3:
                                    embed.addField('Challenge Commands', 'challenge\naccept\ndecline\nvictory\ncancel\nmodernlink\ntagchallenge\ntagaccept\ntagdecline\ntagvictory\ntagcancel\ntaglink')
                                break;
                                case 4:
                                    embed.addField('Admin Commands', 'admingive\nadmingivecard\nadmintake\n\nYou must have administrator permissions in order to use these commands!')
                                break;
                            }
                            embed.setFooter(`Page ${page} out of ${pages}`);
                            msg.edit(embed);
        
                        })
                        ford.on('collect',async r => {
                            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(k));
                            try {
                                for (const reaction of userReactions.values()) {
                                    await reaction.users.remove(k);
                                }
                            } catch (error) {
                                console.error('Failed to remove reactions.');
                            }
                            embed.spliceFields(2, 1);
                            if (page === 4) return;
                            page++;
                            
                            switch(page){
                                case 1:
                                    embed.addField('General Commands', 'help\nping\npoints or balance or bal\nticekts\ndaily\nweekly\nmonthly\nviewdecks\nviewpacks\ntimeroulette or tr\nfind\ncheck\narchcheck\nviewshop\nshopbuy\ninvite\nreset')

                                break;
                                case 2:
                                    embed.addField('Collection Commands', 'points or bal or balance\ngive\ngivecard\nbuydeck\nlistcards or collection or trunk or binder\npublist\nbuypack\nconvert\nlct or sort\nmissing')

                                break;
                                case 3:
                                    embed.addField('Challenge Commands', 'challenge\naccept\ndecline\nvictory\ncancel\nmodernlink\ntagchallenge\ntagaccept\ntagdecline\ntagvictory\ntagcancel\ntaglink')

                                break;
                                case 4:
                                    embed.addField('Admin Commands', 'admingive\nadmingivecard\nadmintake\n\nYou must have administrator permissions in order to use these commands!')
                                break;
                            }
                            embed.setFooter(`Page ${page} out of ${pages}`);
                            msg.edit(embed);
                            
                        })
                    })  
                });
        }
        else {
            switch (args[1]) {
                case 'points':
                    const embed = new Discord.MessageEmbed()
                        .setTitle('Points')
                        .addField('Desc', 'View how many tokens you have')
                        .addField('Usage', PREFIX + 'points');
                    msg.channel.send(embed);
                    break;
                case 'ping':
                    const embed2 = new Discord.MessageEmbed()
                        .setTitle('Ping')
                        .addField('Desc', 'Gets response time')
                        .addField('Usage', PREFIX + 'ping');
                    msg.channel.send(embed2);
                    break;
                case 'give':
                    const embed3 = new Discord.MessageEmbed()
                        .setTitle('Give')
                        .addField('Desc', 'Give tokens to another user!')
                        .addField('Usage', PREFIX + 'give @user #');
                    msg.channel.send(embed3);
                    break;
                case 'buydeck':
                    const embed4 = new Discord.MessageEmbed()
                        .setTitle('Buy Deck')
                        .addField('Desc', 'Allows you to use your tokens to buy a deck!')
                        .addField('Usage', PREFIX + 'buydeck deckname');
                    msg.channel.send(embed4);
                    break;
                case 'listcards':
                    const embed5 = new Discord.MessageEmbed()
                        .setTitle('List Cards')
                        .addField('Desc', 'List the cards you have collected! You can also add a word to search for! You can also sort your collection!')
                        .addField('Sort Terms', 'named, raritya, rarityd, #a, #d')
                        .addField('Usage', PREFIX + 'listcards')
                        .addField('Usage 2', PREFIX + 'listcards word/phrase')
                        .addField('Usage 3', PREFIX + 'listcards sortby: sortterm');
                    msg.channel.send(embed5);
                    break;
                case 'buypack':
                    const embed6 = new Discord.MessageEmbed()
                        .setTitle('Buy Pack')
                        .addField('Desc', 'Allows you to use your tokens to buy a pack! You can buy multiple of a pack if you provide a number after the pack name!')
                        .addField('Usage', PREFIX + 'buypack packname or ' + PREFIX + 'buypack packname #');
                    msg.channel.send(embed6);
                    break;
                case 'viewdecks':
                    const embed7 = new Discord.MessageEmbed()
                        .setTitle('View Decks')
                        .addField('Desc', 'Allows you to view the decks available to buy!')
                        .addField('Usage', PREFIX + 'viewdecks');
                    msg.channel.send(embed7);
                    break;
                case 'viewpacks':
                    const embed8 = new Discord.MessageEmbed()
                        .setTitle('View Packs')
                        .addField('Desc', 'Allows you to view the packs available to buy!')
                        .addField('Usage', PREFIX + 'viewpacks');
                    msg.channel.send(embed8);
                    break;
                case 'daily':
                    const embed9 = new Discord.MessageEmbed()
                        .setTitle('Daily')
                        .addField('Desc', 'Allows you to claim your free daily tokens! Resets every day at 1am EST')
                        .addField('Usage', PREFIX + 'daily');
                    msg.channel.send(embed9);
                    break;
                case 'weekly':
                    const embed10 = new Discord.MessageEmbed()
                        .setTitle('Weekly')
                        .addField('Desc', 'Allows you to claim your free weekly tokens! Resets every Sunday at 1am EST')
                        .addField('Usage', PREFIX + 'weekly');
                    msg.channel.send(embed10);
                    break;
                case 'challenge':
                    const embed11 = new Discord.MessageEmbed()
                        .setTitle('Challenge')
                        .addField('Desc', 'Allows you to challenge another user to a duel!')
                        .addField('Usage', PREFIX + 'challenge @user');
                    msg.channel.send(embed11);
                    break;
                case 'lct':
                    const embed12 = new Discord.MessageEmbed()
                        .setTitle('lct')
                        .addField('Desc', 'Allows you to search for specific types of cards such as an attribute or level!')
                        .addField('Usage', PREFIX + 'lct searchtype')
                        .addField('lct types', 'legendaryknight, elementalhero, amazoness, archfiend, gravekeepers, darkmagician, redeyes, blueeyes, exodia, agent, ancientgear, cloudian, crystalbeast, cyberdragon, cyberdark, batteryman, harpie, destinyhero, darkscorpion, darkworld, lightsworn, mistvalley, monarch, neospacian, ojama, roid, toon, venom, secret, normal, ultra, rare, uncommon, common, xyz, synchro, union, spirit, flip, tuner, gemini, level12, level11, level10, level9, level8, level7, level6, level5, level4, level3, level2, level1, fire, water, wind, earth, dark, light, ritspell, ritmons, divine, contspell, equipspell, fieldspell, quickspell, normspell, counttrap, normtrap, conttrap, wingedbeast, zombie, fusion, rock, seaserpent, spellcaster, thunder, warrior, plant, psychic, pyro, reptile, machine, aqua, beast, beastwarrior, dinosaur, dragon, fairy, fiend, fish, insect')
                        .addField('lct types 2', 'asanctuary, soulduel, feternity, ichaos, rdestiny, destinedroads, db1, custom3, magicforce, dcrisis, pguardian, newbeginnings, custom, demonstuff, ldarkness, labnight, pservant, legendblue, magicruler, metalraider, custom1');
                    msg.channel.send(embed12);
                    break;
                case 'givecard':
                    const embed13 = new Discord.MessageEmbed()
                        .setTitle('Givecard')
                        .addField('Desc', 'Give a card to another user!')
                        .addField('Usage', PREFIX + 'givecard @user rarityname cardname #togive');
                    msg.channel.send(embed13);
                    break;
                case 'publist':
                    const embed14 = new Discord.MessageEmbed()
                        .setTitle('Publist')
                        .addField('Desc', 'List the cards you have collected and let others scroll through the list!')
                        .addField('Usage', PREFIX + 'publist');
                    msg.channel.send(embed14);
                    break;
                case 'accept':
                    const embed15 = new Discord.MessageEmbed()
                        .setTitle('Accept')
                        .addField('Desc', 'Allows you to accept a challenge from another user!')
                        .addField('Usage', PREFIX + 'accept');
                    msg.channel.send(embed15);
                    break;
                case 'decline':
                    const embed16 = new Discord.MessageEmbed()
                        .setTitle('Decline')
                        .addField('Desc', 'Allows you to decline a challenge from another user!')
                        .addField('Usage', PREFIX + 'decline');
                    msg.channel.send(embed16);
                    break;
                case 'cancel':
                    const embed17 = new Discord.MessageEmbed()
                        .setTitle('Cancel')
                        .addField('Desc', 'Allows you to cancel a duel request!')
                        .addField('Usage', PREFIX + 'cancel');
                    msg.channel.send(embed17);
                    break;  
                case 'victory':
                    const embed18 = new Discord.MessageEmbed()
                        .setTitle('Victory')
                        .addField('Desc', 'Allows you to claim the victory of a duel!')
                        .addField('Usage', PREFIX + 'victory');
                    msg.channel.send(embed18);
                    break; 
                case 'timeroulette':
                    const embed19 = new Discord.MessageEmbed()
                        .setTitle('Timeroulette')
                        .addField('Desc', 'Allows you to flip a coin!')
                        .addField('Usage', PREFIX + 'timeroulette or ' + PREFIX + 'tr');
                    msg.channel.send(embed19);
                    break;
                case 'tr':
                    const embed55 = new Discord.MessageEmbed()
                        .setTitle('Timeroulette')
                        .addField('Desc', 'Allows you to flip a coin!')
                        .addField('Usage', PREFIX + 'timeroulette or ' + PREFIX + 'tr');
                    msg.channel.send(embed55);
                    break;
                case 'convert':
                    const embed20 = new Discord.MessageEmbed()
                        .setTitle('Convert')
                        .addField('Desc', 'Allows you to convert any extra cards into points! Convert gives 5 tokens for commons, 10 for rares, 25 for supers, 50 for ultras, and 75 for secrets!')
                        .addField('Usage', PREFIX + 'convert');
                    msg.channel.send(embed20);
                    break;
                case 'tickets':
                    const embed21 = new Discord.MessageEmbed()
                        .setTitle('Tickets')
                        .addField('Desc', 'Tells you how many event tickets you have!')
                        .addField('Usage', PREFIX + 'tickets');
                    msg.channel.send(embed21);
                    break;
                case 'wl':
                    const embed22 = new Discord.MessageEmbed()
                        .setTitle('wl')
                        .addField('Desc', 'Tells you your standard duel stats!')
                        .addField('Usage', PREFIX + 'wl');
                    msg.channel.send(embed22);
                    break;
                case 'rank':
                    const embed23 = new Discord.MessageEmbed()
                        .setTitle('rank')
                        .addField('Desc', 'Tells you your ranked duel stats!')
                        .addField('Usage', PREFIX + 'rank');
                    msg.channel.send(embed23);
                    break;
                case 'tagwl':
                    const embed24 = new Discord.MessageEmbed()
                        .setTitle('tagwl')
                        .addField('Desc', 'Tells you your tag duel stats!')
                        .addField('Usage', PREFIX + 'tagwl');
                    msg.channel.send(embed24);
                    break;
                case 'find':
                    const embed25 = new Discord.MessageEmbed()
                        .setTitle('find')
                        .addField('Desc', 'Allows you to find which packs a card is in!')
                        .addField('Usage', PREFIX + 'find Card Name');
                    msg.channel.send(embed25);
                    break;
                case 'slap':
                    const embed26 = new Discord.MessageEmbed()
                        .setTitle('slap')
                        .addField('Desc', 'Allows you to slap another user!')
                        .addField('Usage', PREFIX + 'slap @person');
                    msg.channel.send(embed26);
                    break;
                case 'lb':
                    const embed27 = new Discord.MessageEmbed()
                        .setTitle('lb')
                        .addField('Desc', 'Allows you to view the leaderboard for standard duels!')
                        .addField('Usage', PREFIX + 'lb');
                    msg.channel.send(embed27);
                    break;
                case 'rlb':
                    const embed28 = new Discord.MessageEmbed()
                        .setTitle('rlb')
                        .addField('Desc', 'Allows you to view the leaderboard for ranked duels!')
                        .addField('Usage', PREFIX + 'rlb');
                    msg.channel.send(embed28);
                    break;
                case 'taglb':
                    const embed29 = new Discord.MessageEmbed()
                        .setTitle('taglb')
                        .addField('Desc', 'Allows you to view the leaderboard for tag duels!')
                        .addField('Usage', PREFIX + 'taglb');
                    msg.channel.send(embed29);
                    break;
                case 'rchallenge':
                    const embed31 = new Discord.MessageEmbed()
                        .setTitle('rchallenge')
                        .addField('Desc', 'Allows you to challenge another user to a ranked duel!')
                        .addField('Usage', PREFIX + 'rchallenge @user');
                    msg.channel.send(embed31);
                    break;
                case 'raccept':
                    const embed32 = new Discord.MessageEmbed()
                        .setTitle('raccept')
                        .addField('Desc', 'Allows you to accept a ranked challenge from another user!')
                        .addField('Usage', PREFIX + 'raccept');
                    msg.channel.send(embed32);
                    break;
                case 'rdecline':
                    const embed33 = new Discord.MessageEmbed()
                        .setTitle('rdecline')
                        .addField('Desc', 'Allows you to decline a ranked challenge from another user!')
                        .addField('Usage', PREFIX + 'rdecline');
                    msg.channel.send(embed33);
                    break;
                case 'rcancel':
                    const embed34 = new Discord.MessageEmbed()
                        .setTitle('rcancel')
                        .addField('Desc', 'Allows you to cancel a ranked duel request!')
                        .addField('Usage', PREFIX + 'rcancel');
                    msg.channel.send(embed34);
                    break;  
                case 'rvictory':
                    const embed35 = new Discord.MessageEmbed()
                        .setTitle('rvictory')
                        .addField('Desc', 'Allows you to claim the victory of a ranked duel!')
                        .addField('Usage', PREFIX + 'rvictory');
                    msg.channel.send(embed35);
                    break;
                case 'tagchallenge':
                    const embed36 = new Discord.MessageEmbed()
                        .setTitle('tagchallenge')
                        .addField('Desc', 'Allows you to challenge another user to a tag duel!')
                        .addField('Usage', PREFIX + 'tagchallenge @teammate @opponent1 @opponent2');
                    msg.channel.send(embed36);
                    break;
                case 'tagaccept':
                    const embed37 = new Discord.MessageEmbed()
                        .setTitle('tagaccept')
                        .addField('Desc', 'Allows you to accept a tag challenge from another user!')
                        .addField('Usage', PREFIX + 'tagaccept');
                    msg.channel.send(embed37);
                    break;
                case 'tagdecline':
                    const embed38 = new Discord.MessageEmbed()
                        .setTitle('tagdecline')
                        .addField('Desc', 'Allows you to decline a tag challenge from another user!')
                        .addField('Usage', PREFIX + 'tagdecline');
                    msg.channel.send(embed38);
                    break;
                case 'tagcancel':
                    const embed39 = new Discord.MessageEmbed()
                        .setTitle('tagancel')
                        .addField('Desc', 'Allows you to cancel a tag duel request!')
                        .addField('Usage', PREFIX + 'tagcancel');
                    msg.channel.send(embed39);
                    break;  
                case 'tagvictory':
                    const embed40 = new Discord.MessageEmbed()
                        .setTitle('tagvictory')
                        .addField('Desc', 'Allows you to claim the victory of a tag duel!')
                        .addField('Usage', PREFIX + 'tagvictory');
                    msg.channel.send(embed40);
                    break;
                case 'check':
                    const embed41 = new Discord.MessageEmbed()
                        .setTitle('check')
                        .addField('Desc', 'Allows you to find which packs cards are in with a specific word or phrase in their name!')
                        .addField('Usage', PREFIX + 'check word/phrase');
                    msg.channel.send(embed41);
                    break;
                case 'raffleinfo':
                    const embed42 = new Discord.MessageEmbed()
                        .setTitle('raffleinfo')
                        .addField('Desc', 'Allows you to get info on the active raffle!')
                        .addField('Usage', PREFIX + 'raffleinfo');
                    msg.channel.send(embed42);
                    break;
                case 'rafflejoin':
                    const embed43 = new Discord.MessageEmbed()
                        .setTitle('rafflejoin')
                        .addField('Desc', 'Allows you to join the current active raffle!')
                        .addField('Usage', PREFIX + 'rafflejoin');
                    msg.channel.send(embed43);
                    break;
                case 'rarity':
                    const embed44 = new Discord.MessageEmbed()
                        .setTitle('find')
                        .addField('Desc', 'Allows you to check the rarity of a card!')
                        .addField('Usage', PREFIX + 'rarity Card Name');
                    msg.channel.send(embed44);
                    break;
                case 'monthly':
                    const embed45 = new Discord.MessageEmbed()
                        .setTitle('Monthly')
                        .addField('Desc', 'Allows you to claim your free monthly pack! Patreon supporters also get additional tokens! Resets the 1st of every month at 1am EST')
                        .addField('Usage', PREFIX + 'monthly');
                    msg.channel.send(embed45);
                    break;
                case 'wchallenge':
                    const embed46 = new Discord.MessageEmbed()
                        .setTitle('wchallenge')
                        .addField('Desc', 'Allows you to challenge another user to a wild duel!')
                        .addField('Usage', PREFIX + 'wchallenge @user');
                    msg.channel.send(embed46);
                    break;
                case 'waccept':
                    const embed47 = new Discord.MessageEmbed()
                        .setTitle('waccept')
                        .addField('Desc', 'Allows you to accept a wild challenge from another user!')
                        .addField('Usage', PREFIX + 'waccept');
                    msg.channel.send(embed47);
                    break;
                case 'wdecline':
                    const embed48 = new Discord.MessageEmbed()
                        .setTitle('wdecline')
                        .addField('Desc', 'Allows you to decline a wild challenge from another user!')
                        .addField('Usage', PREFIX + 'wdecline');
                    msg.channel.send(embed48);
                    break;
                case 'wcancel':
                    const embed49 = new Discord.MessageEmbed()
                        .setTitle('wcancel')
                        .addField('Desc', 'Allows you to cancel a wild duel request!')
                        .addField('Usage', PREFIX + 'wcancel');
                    msg.channel.send(embed49);
                    break;  
                case 'wvictory':
                    const embed50 = new Discord.MessageEmbed()
                        .setTitle('wvictory')
                        .addField('Desc', 'Allows you to claim the victory of a wild duel!')
                        .addField('Usage', PREFIX + 'wvictory');
                    msg.channel.send(embed50);
                    break;
                case 'wlb':
                    const embed51 = new Discord.MessageEmbed()
                        .setTitle('wlb')
                        .addField('Desc', 'Allows you to view the leaderboard for wild duels!')
                        .addField('Usage', PREFIX + 'wlb');
                    msg.channel.send(embed51);
                case 'wwl':
                    const embed52 = new Discord.MessageEmbed()
                        .setTitle('wwl')
                        .addField('Desc', 'Tells you your wild duel stats!')
                        .addField('Usage', PREFIX + 'wwl');
                    msg.channel.send(embed52);
                    break;
                case 'joinhouse':
                    const embed53 = new Discord.MessageEmbed()
                        .setTitle('Join House')
                        .addField('Desc', 'Allows you to join a house! Houses: avatar, dreadroot, eraser')
                        .addField('Usage', PREFIX + 'joinhouse housename');
                    msg.channel.send(embed53);
                    break;
                case 'archcheck':
                    const embed54 = new Discord.MessageEmbed()
                        .setTitle('Archetype Check')
                        .addField('Desc', 'Allows you to find which packs cards are in that belong to a specific archetype!')
                        .addField('Archetypes', 'legendaryknight, elementalhero, amazoness, archfiend, gravekeepers, darkmagician, redeyes, blueeyes, exodia, agent, ancientgear, cloudian, crystalbeast, cyberdragon, cyberdark, batteryman, harpie, destinyhero, darkscorpion, darkworld, lightsworn, mistvalley, monarch, neospacian, ojama, roid, toon, venom')
                        .addField('Usage', PREFIX + 'archcheck archetype');
                    msg.channel.send(embed54);
                    break;
                case 'viewshop':
                    const embed56 = new Discord.MessageEmbed()
                        .setTitle('View Shop')
                        .addField('Desc', 'Allows you to view the current cards in the shop! The shop changes cards everyday at Noon EST!')
                        .addField('Usage', PREFIX + 'viewshop');
                    msg.channel.send(embed56);
                    break;
                case 'shopbuy':
                    const embed57 = new Discord.MessageEmbed()
                        .setTitle('Shop Buy')
                        .addField('Desc', 'Allows you to buy a card from the shop using the cards ID!')
                        .addField('Usage', PREFIX + 'shopbuy ID# so i!shopbuy 3 would by the 3rd card.');
                    msg.channel.send(embed57);
                    break;
                case 'collection':
                    const embed58 = new Discord.MessageEmbed()
                        .setTitle('Collection')
                        .addField('Desc', 'List the cards you have collected! You can also add a word to search for! You can also sort your collection!')
                        .addField('Sort Terms', 'named, raritya, rarityd, #a, #d')
                        .addField('Usage', PREFIX + 'collection')
                        .addField('Usage 2', PREFIX + 'collection word/phrase')
                        .addField('Usage 3', PREFIX + 'collection sortby: sortterm');
                    msg.channel.send(embed58);
                    break;
                case 'trunk':
                    const embed59 = new Discord.MessageEmbed()
                        .setTitle('Trunk')
                        .addField('Desc', 'List the cards you have collected! You can also add a word to search for! You can also sort your collection!')
                        .addField('Sort Terms', 'named, raritya, rarityd, #a, #d')
                        .addField('Usage', PREFIX + 'trunk')
                        .addField('Usage 2', PREFIX + 'trunk word/phrase')
                        .addField('Usage 3', PREFIX + 'trunk sortby: sortterm');
                    msg.channel.send(embed59);
                    break;
                case 'binder':
                    const embed60 = new Discord.MessageEmbed()
                        .setTitle('Binder')
                        .addField('Desc', 'List the cards you have collected! You can also add a word to search for! You can also sort your collection!')
                        .addField('Sort Terms', 'named, raritya, rarityd, #a, #d')
                        .addField('Usage', PREFIX + 'binder')
                        .addField('Usage 2', PREFIX + 'binder word/phrase')
                        .addField('Usage 3', PREFIX + 'binder sortby: sortterm');
                    msg.channel.send(embed60);
                    break;
                case 'bal':
                    const embed61 = new Discord.MessageEmbed()
                        .setTitle('Balance')
                        .addField('Desc', 'View how many tokens you have')
                        .addField('Usage', PREFIX + 'bal');
                    msg.channel.send(embed61);
                    break;
                case 'balance':
                    const embed62 = new Discord.MessageEmbed()
                        .setTitle('balance')
                        .addField('Desc', 'View how many tokens you have')
                        .addField('Usage', PREFIX + 'balance');
                    msg.channel.send(embed62);
                    break;
                case 'sort':
                    const embed63 = new Discord.MessageEmbed()
                        .setTitle('sort')
                        .addField('Desc', 'Allows you to search for specific types of cards such as an attribute or level!')
                        .addField('Usage', PREFIX + 'sort searchtype')
                        .addField('lct types', 'legendaryknight, elementalhero, amazoness, archfiend, gravekeepers, darkmagician, redeyes, blueeyes, exodia, agent, ancientgear, cloudian, crystalbeast, cyberdragon, cyberdark, batteryman, harpie, destinyhero, darkscorpion, darkworld, lightsworn, mistvalley, monarch, neospacian, ojama, roid, toon, venom, secret, normal, ultra, rare, uncommon, common, xyz, synchro, union, spirit, flip, tuner, gemini, level12, level11, level10, level9, level8, level7, level6, level5, level4, level3, level2, level1, fire, water, wind, earth, dark, light, ritspell, ritmons, divine, contspell, equipspell, fieldspell, quickspell, normspell, counttrap, normtrap, conttrap, wingedbeast, zombie, fusion, rock, seaserpent, spellcaster, thunder, warrior, plant, psychic, pyro, reptile, machine, aqua, beast, beastwarrior, dinosaur, dragon, fairy, fiend, fish, insect')
                        .addField('lct types 2', 'asanctuary, soulduel, feternity, ichaos, rdestiny, destinedroads, db1, custom3, magicforce, dcrisis, pguardian, newbeginnings, custom, demonstuff, ldarkness, labnight, pservant, legendblue, magicruler, metalraider, custom1');
                    msg.channel.send(embed63);
                    break;
                case 'missing':
                    const embed64 = new Discord.MessageEmbed()
                        .setTitle('missing')
                        .addField('Desc', 'Allows you to see what cards you are missing from a particular pack!')
                        .addField('Usage', PREFIX + 'missing packName');
                        msg.channel.send(embed64);
                    break;
                case 'modernlink':
                    const embed65 = new Discord.MessageEmbed()
                        .setTitle('modernlink')
                        .addField('Desc', 'Provides a link to an MR5 room on dueling nexus!')
                        .addField('Usage', PREFIX + 'modernlink');
                        msg.channel.send(embed65);
                    break;
                case 'taglink':
                    const embed66 = new Discord.MessageEmbed()
                        .setTitle('taglink')
                        .addField('Desc', 'Provides a link to a tag duel MR5 room on dueling nexus!')
                        .addField('Usage', PREFIX + 'taglink');
                        msg.channel.send(embed66);
                    break;
                case 'admingive':
                    const embed67 = new Discord.MessageEmbed()
                        .setTitle('Admin Give')
                        .addField('Desc', 'Admin command to give tokens to another user!')
                        .addField('Usage', PREFIX + 'admingive @user #');
                    msg.channel.send(embed67);
                    break;
                case 'admingivecard':
                    const embed68 = new Discord.MessageEmbed()
                        .setTitle('Admin Givecard')
                        .addField('Desc', 'Admin command to give a card to another user!')
                        .addField('Usage', PREFIX + 'admingivecard @user rarityname cardname #togive');
                    msg.channel.send(embed68);
                    break;
                case 'admintake':
                    const embed69 = new Discord.MessageEmbed()
                        .setTitle('Admin Take')
                        .addField('Desc', 'Admin command to take tokens from a user!')
                        .addField('Usage', PREFIX + 'admintake @user #');
                    msg.channel.send(embed69);
                    break;
                case 'invite':
                    const embed70 = new Discord.MessageEmbed()
                        .setTitle('Invite')
                        .addField('Desc', 'Returns an invite link so you can invite the bot to your server!')
                        .addField('Usage', PREFIX + 'invite');
                    msg.channel.send(embed70);
                    break;
                case 'reset':
                    const embed71 = new Discord.MessageEmbed()
                        .setTitle('Reset')
                        .addField('Desc', 'Allows you to reset your data! This command will ask for a confirmation just to make sure this is what you want to do.')
                        .addField('Usage', PREFIX + 'reset');
                    msg.channel.send(embed71);
                    break;
            }
        }
    }
}