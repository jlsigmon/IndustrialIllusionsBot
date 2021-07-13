const Discord = require('discord.js');
const mysql = require('mysql');
const ms = require('ms');
const bot = new Discord.Client();
const fs = require('fs');
const CronJob = require('cron').CronJob;

const token = "discord-bot-token-here";

const PREFIX = "i!";
const PREFIXU = "I!";

//folders containing commands, decks, and packs
bot.commands = new Discord.Collection();
bot.decks = new Discord.Collection();
bot.packs = new Discord.Collection();
bot.promos = new Discord.Collection();
bot.packTypes = new Discord.Collection();
bot.cardTypes = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

const deckFiles = fs.readdirSync('./decks/').filter(file => file.endsWith('.js'));
for(const file of deckFiles){
    const deck = require(`./decks/${file}`);

    bot.decks.set(deck.name, deck);
}

const packFiles = fs.readdirSync('./packs/').filter(file => file.endsWith('.js'));
for(const file of packFiles){
    const pack = require(`./packs/${file}`);

    bot.packs.set(pack.name, pack);
}

const packTypeFiles = fs.readdirSync('./packTypes/').filter(file => file.endsWith('.js'));
for(const file of packTypeFiles){
    const packType = require(`./packTypes/${file}`);

    bot.packTypes.set(packType.name, packType);
}

const promoFiles = fs.readdirSync('./promos/').filter(file => file.endsWith('.js'));
for(const file of promoFiles){
    const promo = require(`./promos/${file}`);

    bot.promos.set(promo.name, promo);
}

const cardTypeFiles = fs.readdirSync('./cardTypes').filter(file => file.endsWith('.js'));
for (const file of cardTypeFiles) {
    const cardType = require(`./cardTypes/${file}`);

    bot.cardTypes.set(cardType.name, cardType);
}

//login to database 
//password given by "password" in the config
//database given by "database" in the config

var con = mysql.createConnection({
    host: "mysql-host",
    user: "Username",
    password: "Password",
    database: "DatabaseName"
});

//challenger vars
var acoconut = [];
var awalnut = [];
var achallengers = [];
var achallenge = [];
var tagcoconut1 = [];
var tagcoconut2 = [];
var tagcoconut3 = [];
var tagwalnut = [];
var tagchallengers = [];
var tagchallenge1 = [];
var tagchallenge2 = [];
var tagchallenge3 = [];
var chatPoints = 3;

var approvedAdmins = [''];
var bronzeSupporters = [];
var silverSupporters = [];
var goldSupporters = [''];
//packs and rarity list
const packlist = ["lob","mrd","srl","psv","lon","lod","pgd","mfc","dcr","tp1","tp2","tp3","tp4","ioc","ast","bp01","sod","rds","tp5","db1","fet","tlm","crv","een","soi","eoj","potd","cdip","ston","taev","glas","ptdn","lodt","tdgs","csoc","bp02","crms","rgbt"];
const common = ["Phoenixian Seed","Rose Tentacles","Hedge Guard","Evil Thorn","Blackwing - Shura the Blue Flame","Blackwing - Kalut the Moon Shadow","Morphtronic Videon","Morphtronic Scopen","Gadget Arms","Koa'ki Meiru Guardian","Koa'ki Meiru Doom","Minoan Centaur","Master Gig","Emissary from Pandemonium","Gigastone Omega","Alien Dog","Spined Gillman","Mermaid Archer","Lava Dragon","Vanguard of the Dragon","G.B. Hunter","Mind Trust","Thorn of Malice","Wonder Clover","Blackwing Whirlwind","Junk Box","Double Tool C&D","Morphtronic Repair Unit","Iron Core Immediate Disposal","Urgent Synthesis","Psychic Path","Natural Tune","Supremacy Berry","Miracle Locus","Crimson Fire","Tuner Capture","Overdoom Line","Wicked Rebirth","Level Retuner","Fake Feather","Trap Stun","Morphtronic Bind","Reckoned Power","Automatic Laser","Attack of the Cornered Rat","Proof of Powerlessness","Bone Temple Block","Mirror of Oaths","Trap Eater","Twin-Sword Marauder","Dark Tinker","Blackwing - Bora the Spear","Blackwing - Sirocco the Dawn","Summon Reactor SK","Trap Reactor Y FI","Spell Reactor RE","Morphtronic Boarden","Morphtronic Slingen","Assault Mercenary","Night Wing Sorceress","Dupe Frog","Flip Flop Frog","Desert Protector","Cross-Sword Beetle","Bee List Soldier","Hydra Viper","Prevention Star","Vengeful Servant","Raptor Wing Strike","Morphtronic Rusty Engine","Morphtronic Map","Assault Overload","Assault Teleport","Assault Revival","Psychic Sword","Telekinetic Power Wall","Indomitable Gladiator Beast","Seed Cannon","Super Solar Nutrient","Six Scrolls of the Samurai","Verdant Sanctuary","Mysterious Triangle","Assault Mode Activate","Descending Lost Star","Half or Nothing","Nightmare Archfiends","Ebon Arrow","Ivy Shackles","Fake Explosion","Morphtronic Forcefield","Morphtronic Mix-up","Assault Slash","Assault Counter","Supernatural Regeneration","Trojan Gladiator Beast","Submarine Frog","Healing Wave Generator","Wall of Ivy","Copy Plant","Morphtronic Celfon","Morphtronic Magnen","Morphtronic Datatron","Morphtronic Cameran","Morphtronic Clocken","Gadget Hauler","Gadget Driver","Pursuit Chaser","Iron Chain Snake","Iron Chain Blaster","Iron Chain Coil","Power Injector","Psychic Jumper","Nettles","Gigantic Cephalotus","Horseytail","Botanical Girl","Cursed Fig","Zombie Mammoth","Goblin Decoy Squad","Comrade Swordsman of Landstar","The White Stone of Legend","Jade Knights","Card Rotator","Seed of Deception","Factory of 100 Machines","Morphtronic Cord","Morphtronic Engine","Poison Chain","Teleport","Fragrance Storm","Everliving Underworld Cannon","Omega Goggles","Confusion Chaff","Synchro Strike","Revival Gift","Lineage of Destruction","Doppelganger","Morphtransition","Morphtronic Monitron","Bamboo Scrap","Plant Food Chain","DNA Checkup","Gozen Match","Giant Trap Hole","Turbo Booster","Quillbolt Hedgehog","Ghost Gardna","Small Piece Golem","Medium Piece Golem","Twin-Shield Defender","Jutte Fighter","Gonogo","Doctor Cranium","Krebons","Mind Protector","Psychic Commander","Psychic Snail","Telekinetic Shocker","Destructotron","Gladiator Beast Equeste","Jenis, Lightsworn Mender","Dharc the Dark Charmer","Mecha Bunny","Oyster Meister","Kunoichi","Beast of the Pharaoh","Noisy Gnat","Domino Effect","Junk Barrage","Battle Tuned","Lightwave Tuning","Psi-Station","Psi-Impulse","Sword of Kusanagi","Orb of Yasaka","Mirror of Yata","Geartown","Recycling Batteries","Book of Eclipse","Equip Shot","Remote Revenge","Spacegate","Synchro Deflector","Psychic Rejuvenation","Telepathic Power","Lightsworn Barrier","Judgment of Thunder","Fish Depth Charge","Needlebug Nest","Overworked","Tricky Spell 4","Cross Porter","Miracle Flipper","Destiny HERO - Dread Servant","Volcanic Queen","Arcana Force 0 - The Fool","Arcana Force I - The Magician","Arcana Force III - The Empress","Arcana Force IV - The Emperor","Arcana Force VI - The Lovers","Arcana Force VII - The Chariot","Arcana Force XVIII - The Moon","Jain, Lightsworn Paladin","Garoth, Lightsworn Warrior","Gragonith, Lightsworn Dragon","Unifrog","Batteryman Charger","Batteryman Micro-Cell","Goblin Recon Squad","Interplanetary Invader 'A'","The Lady in Wight","Cloudian - Storm Dragon","Hero Mask","Space Gift","Demise of the Land","D - Formation","Spell Gear","Cup of Ace","Realm of Light","Wetlands","Quick Charger","Short Circuit","Mystical Cards of Light","Level Tuning","Golden Bamboo Sword","Limit Reverse","Rainbow Gravity","D - Fortune","Reversal of Fate","Tour of Doom","Arcana Call","Light Spiral","Portable Battery Pack","Gladiator Lash","Raging Cloudian","Sanguine Swamp","Lucky Chance","Summon Limit","Dice Try!","Gladiator Beast Andal","Atlantean Pikeman","Samsara Lotus","Regnerating Rose","Armored Cybern","Cyber Ouroboros","Fire Trooper","Destiny HERO - Dunker","Destiny HERO - Departed","Dark Crusader","Obsidian Dragon","Gemini Lancer","Vengeful Shinobi","The Immortal Bushi","Gladiator Beast Darius","Imprisoned Queen Archfiend","Black Veloci","Cannon Soldier MK-2","The Calculator","Sea Koala","Blue Thunder T-45","Magnetic Mosquito","Earth Effigy","Wind Effigy","Neo-Spacian Twinkle Moss","Rainbow Veil","Vicious Claw","Instant Neo Space","Mirage Tube","Spell Chronicle","Dimension Explosion","Cybernetic Zone","Unleash Your Power!","Chain Summoning","Acidic Downpour","Gladiator Beast's Battle Archfiend Shield","Gladiator Proving Ground","Dark World Grimoire","Rainbow Path","Sinister Seeds","Chain Material","Alchemy Cycle","Cybernetic Hidden Technology","Gemini Trap Hole","All-Out Attacks","Double Tag Team","Transmigration Break","Fine","Chamberlain of the Six Samurai","Cloudian - Smoke Ball","Cloudian - Ghost Fog","Cloudian - Nimbusman","Cloudian - Poison Cloud","Cloudian - Turbulence","Truckroid","Stealthroid","Gladiator Beast Bestiari","Gladiator Beast Hoplomus","Gladiator Beast Dimacari","Gladiator Beast Secutor","Test Ape","Witch Doctor of Sparta","Infinity Dark","Magical Reflect Slime","Ancient Gear Knight","Gambler of Legend","Spirit of the Six Samurai","Alien Hypno","Superalloy Beast Raptinus","Contact Out","Swing of Memories","Summon Cloud","Lucky Cloud","Fog Control","Cloudian Squall","Super Double Summon","Gladiator Beast's Battle Halberd","Gladiator Beast's Battle Gladius","Gladiator's Return","Soul Devouring Bamboo Sword","'A' Cell Incubator","Over Limit","No Entry!!","Natural Disaster","Rain Storm","Release from Stone","Light-Imprisoning Mirror","Shadow-Imprisoning Mirror","Disarm","Parry","Swiftstrike Armor","Double-Edged Sword Technique","Detonator Circle 'A'","Interdimensional Warp","Foolish Revival","An Unfortunate Report","Alien Shocktrooper","Volcanic Rat","Renge, Gatekeeper of Dark World","Venom Cobra","Chrysalis Pantail","Chrysalis Chicky","Chrysalis Larva","Chrysalis Mole","Venom Snake","Venom Boa","Venom Serpent","Goggle Golem","Dawnbreak Gardna","King Pyron","Shadow Delver","Flint Lock","Gravitic Orb","Phantom Cricket","Ritual Raven","Razor Lizard","Light Effigy","Dark Effigy","Neo-Spacian Marine Dolphin","Ojama Knight","Reverse of Neos","Convert Contact","Cocoon Party","NEX","Cocoon Rebirth","Venom Swamp","Venom Shot","Flint Missile","Creature Seizure","Amulet of Ambition","Broken Bamboo Sword","Hero Counterattack","Cocoon Veil","Snake Whistle","Rise of the Snake Deity","Ambush Fangs","Venom Burn","Destructive Draw","Shield Spear","Strike Slash","Gift Card","The Gift of Greed","Counter Counter","Crystal Beast Ruby Carbuncle","Crystal Beast Amethyst Cat","Crystal Beast Emerald Tortoise","Crystal Beast Amber Mammoth","Crystal Beast Cobalt Eagle","Volcanic Scattershot","Volcanic Blaster","Volcanic Hammerer","Mei-Kou, Master of Barriers","Seismic Crasher","Dweller in the Depths","Magna-Slash Dragon","Gravi-Crush Dragon","Crystal Beacon","Crystal Blessing","Crystal Abundance","Crystal Promise","Tornado","Wild Fire","Blaze Accelerator","Field Barrier","'A' Cell Breeding Device","'Otherworld - The 'A' Zone'","Last Resort","Crystal Raigeki","Volcanic Recharge","Terrible Deal","Breakthrough!","Backs to the Wall","Introduction to Gallantry","Secrets of the Gallant","Hard-sellin' Goblin","Hard-sellin' Zombie","Mass Hypnosis","Gem Flash Energy","Neo-Spacian Glow Moss","The Six Samurai - Yaichi","The Six Samurai - Kamon","The Six Samurai - Yariza","The Six Samurai - Nisashi","The Six Samurai - Irou","Shien's Footsoldier","Sage of Stillness","Kahkki, Guerilla of Dark World","Gren, Tactician of Dark World","Electric Virus","Puppet Plant","Marionette Mite","Silent Abyss","Firestorm Prominence","Raging Earth","Destruction Cyclone","Radiant Spirit","Umbral Soul","Alien Psychic","Lycanthrope","Cu Chulainn the Awakened","Legendary Ebon Steed","'A' Cell Scatter Burst","Synthesis Spell","Emblem of the Awakening","Advanced Ritual Art","Shien's Castle of Mist","Change of Hero - Reflector Ray","Return of the Six Samurai","Flashbang","Anti-Fusion Device","Ritual Sealing","Swift Samurai Storm!","Cyber Ogre","Allure Queen LV3","Dark Lucius LV4","Stray Asmodian","Abaki","Flame Ogre","Snipe Hunter","Blast Asmodian","Barrier Statue of the Abyss","Barrier Statue of the Torrent","Barrier Statue of the Inferno","Barrier Statue of the Stormwinds","Barrier Statue of the Drought","Barrier Statue of the Heavens","Queen's Bodyguard","Combo Fighter","Man Beast of Ares","Alien Infiltrator","Alien Mars","Corruption Cell 'A'","Ritual Foregone","Instant Fusion","Counter Cleaner","Linear Accelerator Cannon","Chain Strike","Mystical Wind Typhoon","Level Down!?","Senet Switch","Straight Flush","Justi-Break","Chain Healing","Chain Detonation","Byroad Sacrifice","Accumulated Fortune","Vanity's Call","Elemental HERO Neos","Sabersaurus","Chrysalis Dolphin","Rallis the Star Bird","Ambulanceroid","Decoyroid","Rescueroid","Destiny HERO - Defender","Destiny HERO - Blade Master","Destiny HERO - Fear Monger","Black Ptera","Black Stego","Miracle Jurassic Egg","Babycerasaurus","Bitelon","Alien Grey","Alien Skull","Alien Hunter","Flying Saucer Muusik'i","Ambulance Rescueroid","Contact","Fake Hero","Vehicroid Connection Zone","D - Spirit","Common Soul","Mausoleum of the Emperor","Destiny Mirage","Crop Circles","The Paths of Destiny","Orbital Bombardment","Royal Writ of Taxation","Wonder Garage","Fossil Excavation","Synthetic Seraphim","Brainwashing Beam","Destiny HERO - Doom Lord","Destiny HERO - Captain Tenacious","Cyber Tutu","Cyber Gymnast","Cyber Kirin","Searchlightman","Swift Birdman Joe","Majestic Mech - Senku","Royal Knight","Bountiful Artemis","Layard the Liberator","Guard Dog","Whirlwind Weasel","Avalanching Aussa","Raging Eria","Blazing Hiita","Storming Wynn","Batteryman D","Elemental HERO Mariner","Elemental HERO Necroid Shaman","Misfortune","H - Heated Heart","E - Emergency Call","R- Righteous Justice","O - Oversoul","Power Capsule","Celestial Transformation","Grand Convergence","Dimensional Fissure","Elemental Recharge","Destiny Signal","D - Shield","Icarus Attack","Macro Cosmos","Shattered Axe","Elemental HERO Neo Bubbleman","Hero Kid","Ancient Gear","Ancient Gear Cannon","Machine King Prototype","D.D. Guide","Chain Thrasher","Disciple of the Forbidden Spell","Tenkabito Shien","Parasitic Ticky","Gokipon","Silent Insect","Anteatereatingant","Saber Beetle","Beelze Frog","Malice Ascendant","Grass Phantom","Sand Moth","D.3.S. Frog","Hero Heart","Magnet Circle LV2","Ancient Gear Factory","Ancient Gear Drill","Symbol of Heritage","Trial of the Princess","Photon Generator Unit","End of the World","Samsara","Super Junior Confrontation","Miracle Kids","Attack Reflector Unit","Next to be Lost","Generation Shift","Full Salvo","Succcess Probability 0%","Zure, Knight of Dark World","V-Tiger Jet","Blade Skater","Elemental HERO Wildheart","Reborn Zombie","W-Wing Catapult","Infernal Incinerator","Hydrogeddon","Oxygeddon","Etoile Cyber","Nanobreaker","Beiige, Vanguard of Dark World","Scarr, Scout of Dark World","Familiar-Possessed - Aussa","Familiar-Possessed - Eria","Familiar-Possessed - Hiita","Familiar-Possessed - Wynn","VW-Tiger Catapult","Dark World Lightning","Level Modulation","Ojamagic","Ojamuscle","Bonding - H2O","Branch!","Boss Rush","Gateway to Dark World","The Forces of Darkness","Dark Deal","Simultaneous Loss","Weed Out","The League of Uniform Nomenclature","Roll Out!","Chthonian Polymer","Feather Wind","Non-Fusion Area","Cycroid","Soitsu","Mad Lobster","Jerry Beans Man","Patroid","Gyroid","Steamroid","Drillroid","Jetroid","Cybernetic Cyclopean","Mechanical Hound","Cyber Archfiend","Giant Kozaky","Indomitable Fighter Lei Lei","Protective Soul Ailin","Doitsu","Des Frog","T.A.D.P.O.L.E.","Poison Draw Frog","Tyranno Infinity","Batteryman C","Ebon Magician Curran","Steam Gyroid","Fusion Recovery","Dragon's Mirror","Des Croaking","Pot of Generosity","Shien's Spy","Spiritual Earth Art - Kurogane","Spiritual Water Art - Aoi","Spiritual Fire Art - Kurenai","Spiritual Wind Art - Miyabi","A Rival Appears!","Conscription","Prepare to Strike Back","Elemental HERO Avian","Elemental HERO Burstinatrix","Elemental HERO Clayman","Elemental HERO Sparkman","Ancient Gear Soldier","Lost Guardian","Moai Interceptor Cannons","Dummy Golem","Mine Golem","Monk Fighter","Guardian Statue","Medusa Worm","White Ninja","Aussa the Earth Charmer","Eria the Water Charmer","Hiita the Fire Charmer","Wynn the Wind Charmer","Batteryman AA","Des Wombat","King of the Skull Servants","Gift of the Martyr","Double Attack","Battery Charger","Kaminote Blow","Doriado's Blessing","Final Ritual of the Ancients","Shifting Shadows","Impenetrable Formation","Pikeru's Second Sight","Minefield Eruption","Mispolymerization","Level Conversion Lab","Rock Bombardment","Grave Lure","Lone Wolf","Space Mambo","Divine Dragon Ragnarok","Chu-Ske the Mouse Fighter","Insect Knight","Hand of Nephthys","Element Valkyrie","Element Doom","Maji-Gire Panda","Catnipped Kitty","Kangaroo Champ","Hyena","Blade Rabbit","Mecha-Dog Marron","Armed Samurai - Ben Kei","Golem Sentry","Abare Ushioni","The Light - Hex-Sealed Fusion","The Dark - Hex-Sealed Fusion","The Earth - Hex-Sealed Fusion","Whirlwind Prodigy","Flame Ruler","Firebird","Rescue Cat","Poison Fangs","Release Restraint","Centrifugal Field","Fulfillment of the Contract","Re-Fusion","The Big March of Animals","Pole Position","Threatening Roar","Good Goblin Housekeeping","Beast Soul Swap","D.D. Dynamite","Elemental Burst","Woodborg Inpachi","Mighty Guard","Bokoichi the Freightening Car","Harpie Girl","The Creator Incarnate","Nightmare Penguin","Heavy Mech Support Platform","Element Magician","Element Saurus","Roc from the Valley of Haze","Harpie Lady 1","Harpie Lady 2","Harpie Lady 3","Raging Flame Sprite","Eagle Eye","Tactical Espionage Expert","Invasion of Flames","Creeping Doom Manta","Pitch-Black Warwolf","Mirage Dragon","Fox Fire","Homunculus the Alchemic Being","Mokey Mokey King","Harpies' Hunting Ground","Mokey Mokey Smackdown","Back to Square One","Ballista of Rampart Smashing","Lighten the Load","Malice Dispersion","Xing Zhen Hu","Fruits of Kozaky's Studies","Mind Haxorz","Fuh-Rin-Ka-Zan","Spell Purification","Astral Barrier","Neo Aqua Madoor","Skull Dog Marron","Goblin Calligrapher","Dark Mimic LV1","Armed Dragon LV3","Horus' Servant","Black Dragon's Chick","Malice Doll of Demise","Ultimate Baseball Kid","Element Dragon","Element Soldier","Howling Insect","Masked Dragon","Unshaven Angler","The Trojan Horse","Nobleman-Eater Bug","Enraged Muka Muka","Hade-Hane","Sanwitch","Dark Factory of Mass Production","Mind Wipe","Abyssal Designator","Level Up!","The Graveyard in the Fourth Dimension","Two-Man Cell Battle","Big Wave Small Wave","Fusion Weapon","Ritual Weapon","Taunt","Absolute End","Ninjitsu Art of Decoy","Heavy Slump","Mind Crush","Gorgon's Eye","Cemetary Bomb","Gogiga Gagagigo","Warrior of Zera","Mystical Shine Ball","Metal Armored Bug","The Unhappy Girl","The Kick Man","Vampire Lady","Rocket Jumper","Legendary Jujitsu Master","KA-2 Des Scissors","Sonic Jammer","Atomic Firefly","Mermaid Knight","Piranha Army","Two Thousand Needles","Disc Fighter","Arcane Archer of the Forest","Lady Ninja Yae","Goblin King","Solar Flare Dragon","White Magician Pikeru","Opti-Camouflage Armor","Mystic Wok","Monster Gate","Weapon Change","Earthquake","Goblin Thief","Backfire","Micro Ray","Light of Judgment","Wall of Revealing Light","Solar Ray","Ninjitsu Art of Transformation","Beckoning Light","Armor Break","Gigobyte","Mokey Mokey","Kozaky","Fiend Scorpion","Pharaoh's Servant","Pharaonic Protector","Aswan Apparition","Protector of the Sanctuary","Nubian Guard","Desertapir","Sand Gambler","3-Hump Lacooda","Absorbing Kid from the Sky","Elephant Statue of Blessing","Elephant Statue of Disaster","Spirit Caller","Regenerating Mummy","Night Assailant","Man-Thro' Tro'","Emissary of the Oasis","Order to Charge","Sword of the Soul-Eater","Dust Barrier","Soul Reversal","Blessings of the Nile","7","Level Limit - Area B","Enchanting Fitting Room","The Law of the Normal","Delta Attacker","The Third Sarcophagus","The Second Sarcophagus","Dora of Fate","Judgment of the Desert","Human-Wave Tactics","Desert Sunlight","Labyrinth of Nightmare","Order to Smash","Ojama Yellow","Ojama Black","Soul Tiger","Big Koala","Des Kangaroo","Crimson Ninja","Gale Lizard","Spirit of the Pot of Greed","Chopman the Desperate Outlaw","Coach Goblin","Witch Doctor of Chaos","Chaos Necromancer","Inferno","Fenrir","Gigantes","Silpheed","Chaos Sorcerer","Gren Maju Da Eiza","Lord Poison","Bowganian","Granadora","Heart of the Underdog","Ojama Delta Hurricane!!","Stumbling","Chaos End","Yellow Luster Shield","Chaos Greed","D.D. Borderline","Recycle","Primal Seed","Thunder Crash","Dimension Distortion","Soul Absorption","Blasting the Ruins","Cursed Seal of the Forbidden Spell","Tower of Babel","Spatial Collapse","Zero Gravity","Energy Drain","Giga Gagagigo","Neo Bug","Sea Serpent Warrior of Darkness","Terrorking Salmon","Blazing Inpachi","Burning Algae","The Thing in the Crater","Molten Zombie","Gora Turtle of Illusion","Stealth Bird","Sacred Crane","Don Turtle","Balloon Lizard","Hyper Hammerhead","Anti-Aircraft Flower","Prickle Fairy","Pinch Hopper","Skull-Mark Ladybug","Amphibious Bugroth MK-3","Torpedo Fish","Cannonball Spear Shellfish","Manju of the Ten Thousand Hands","Ryu Kokki","Gryphon's Feather Duster","Smashing Ground","Salvage","Multiplication of Ants","Earth Chant","Jade Insect Whistle","Fiend's Hand Mirror","A Hero Emerges","Self-Destruct Button","Begone, Knave!","DNA Transplant","Battle Footballer","Nin-Ken Dog","Acrobat Monkey","Arsenal Summoner","Guardian Elma","Guardian Kay'est","Cyber Raider","Little-Winguard","Gyaku-Gire Panda","Blindly Loyal Goblin","Despair from the Dark","Maju Garzett","Dark Scorpion - Chick the Yellow","Thousand Needles","Shinato's Ark","A Deal with Dark Ruler","Contract with Exodia","Shooting Star Bow - Ceal","Gravity Axe - Grarl","Rod of Silence - Kay'est","Twin Swords of Flashing Light - Tryce","Precious Cards from Beyond","Rod of the Mind's Eye","Fairy of the Spring","Token Thanksgiving","Morale Boost","Non-Spellcasting Area","Final Attack Orders","Staunch Defender","Ojama Trio","Arsenal Robber","Really Eternal Rest","Gagagigo","D.D. Trainer","Ojama Green","Pandemonium Watchbear","Sasuke Samurai #2","Dark Scorpion - Gorg the Strong","Dark Scorpion - Meanae the Thorn","Outstanding Dog Marron","Iron Blacksmith Kotetsu","Goblin of Greed","Vilepawn Archfiend","Shadowknight Archfiend","Desrook Archfiend","Keldo","Kelbek","Zolga","Agido","Spell Reproduction","Dragged Down into the Grave","Incandescent Ordeal","Contract with the Dark Master","Falling Down","Checkmate","Cestus of Dagla","Final Countdown","Archfiend's Oath","Mustering of the Dark Scorpions","Pandemonium","Altar for Tribute","Frozen Soul","Battle-Scarred","Archfiend's Roar","Dice Re-Roll","Sakuretsu Armor","Ray of Hope","People Running About","Oppressed People","United Resistance","Pitch-Dark Dragon","Kiryu","Decayed Commander","Zombie Tiger","Giant Orc","Second Goblin","Vampiric Orchis","Des Dendle","Burning Beast","Freezing Beast","Union Rider","Neko Mane King","Dimension Jar","Roulette Barrel","White Dragon Ritual","Frontline Base","Demotion","Kaiser Colosseum","Autonomous Action Unit","Poison of the Old Man","Raregold Armor","Metalsilver Armor","Kishido Spirit","Wave-Motion Cannon","Huge Revolution","Thunder of Ruler","Meteorain","Pineapple Blast","Secret Barrel","Physical Double","Rivalry of Warlords","Formation Unit","Adhesion Trap Hole","Great Angus","Aitsu","Sonic Duck","Amazoness Paladin","Amazoness Fighter","Amazoness Blowpiper","Old Vindictive Magician","Magical Marionette","Pixie Knight","Magical Plant Mandragola","Magical Scientist","Royal Magical Library","Dark Scorpion - Cliff the Trap Remover","Magical Merchant","Koitsu","Ultimate Obedient Fiend","Dark Cat with White Tail","Amazoness Spellcaster","Gather Your Mind","Mass Driver","Senri Eye","Emblem of Dragon Destroyer","Jar Robber","My Body as a Shield","Spellbook Organization","Pitch-Black Power Stone","Exhausting Spell","Hidden Spellbook","Miracle Restoring","Remove Brainwashing","Disarmament","Anti-Spell","The Spell Absorbing Life","Molten Behemoth","Shapesnatch","Souleater","Birdface","Kryuel","Arsenal Bug","Maiden of the Aqua","Timeater","Mucus Yolk","Servant of Catabolism","Poison Mummy","Dark Dust Spirit","Royal Keeper","Swarm of Scarabs","Swarm of Locusts","Giant Axe Mummy","8-Claws Scorpion","Dice Jar","Dark Scorpion Burglars","Des Lacooda","Cobraman Sakuzy","Book of Taiyou","Secret Pass to the Treasures","Call of the Mummy","Timidity","Pyramid Energy","Tutan Mask","Ordeal of a Traveler","Bottomless Shifting Sand","Needle Ceiling","Dark Coffin","Needle Wall","Trap Dustshoot","Pyro Clock of Destiny","Master Kyonshee","Kabazauls","Inpachi","Gravekeeper's Spy","Gravekeeper's Curse","Gravekeeper's Guard","Gravekeeper's Spear Soldier","Gravekeeper's Vassal","Gravekeeper's Cannonholder","Gravekeeper's Assailant","A Man with Wdjat","A Cat of Ill Omen","Yomi Ship","An Owl of Luck","Charm of Shabti","Cobra Jar","Nightmare Horse","Card Shuffle","Reasoning","Different Dimension Capsule","Buster Rancher","Hieroglyph Lithograph","Dark Snake Syndrome","Terraforming","Banner of Courage","Metamorphosis","Royal Tribute","Reversal Quiz","Curse of Aging","Raigeki Break","Narrow Pass","Disturbance Strategy","Rite of Spirit","Non Aggression Area","D. Tribe","Possessed Dark Soul","Winged Minion","Skull Knight #2","Ryu-Kishin Clown","Twin-Headed Wolf","Bark of Dark Ruler","Life Absorbing Machine","The Puppet Magic of Dark Ruler","Soul Demolition","Double Snare","Throwstone Unit","Warrior Dai Grepher","Mysterious Guard","Frontier Wiseman","The Hunter with 7 Weapons","Dragon Manipulator","Ready for Intercepting","A Feint Plan","Emergency Provisions","Spirit Ryu","The Dragon Dwelling in the Cave","Lizard Soldier","Cave Dragon","Gray Wing","Troop Dragon","A Wingbeat of Giant Dragon","Dragon's Gunfire","Stamping Destruction","Super Rejuvenation","Dragon's Rage","Burst Breath","Robotic Knight","Wolf Axwielder","The Illusory Gentleman","Robolady","Roboyarou","Serpentine Princess","Patrician of Darkness","Gradius' Option","Woodland Sprite","Maharaghi","Inaba White Rabbit","Great Long Nose","Otohime","Fushi No Tori","Super Robolady","Super Roboyarou","Fengsheng Mirror","Spring of Rebirth","Heart of Clear Water","A Legendary Ocean","Smoke Grenade of the Thief","Spiritual Energy Settle Machine","Convulsion of Nature","The Secret of the Bandit","Disappear","Bubble Crash","Bad Reaction to Simochi","Ominous Fortunetelling","Spirit's Invitation","Nutrient Z","Fiend Comedian","Swordsman of Landstar","Humanoid Slime","Worm Drake","Humanoid Worm Drake","Flying Fish","Shining Abyss","Gadget Soldier","Grand Tiki Elder","Melchid the Four-Face Beast","Chosen One","Mask of Weakness","Curse of the Masked Beast","Lightning Blade","Tornado Wall","Fairy Box","Jam Defender","Lady Panther","The Unfriendly Amazon","Amazoness Archer","Crimson Sentry","Lady Assailant of Flames","Fire Sorcerer","Dancing Fairy","Fairy Guardian","Empress Mantis","Cure Mermaid","Hysteric Fairy","Bio-Mage","The Forgiving Maiden","St. Joan","Scroll of Bewitchment","Offerings to the Doomed","The Portrait's Secret","The Gross Ghost of Fled Dreams","Headless Knight","Earthbound Spirit","The Earl of Demise","Boneheimer","Flame Dancer","Spherous Lady","Lightning Conger","Summoner of Illusions","Sould of Purity and Light","Spirit of Flames","Aqua Spirit","The Rock Spirit","Garuda the Wind Spirit","Dreamsprite","Zombyra the Dark","Supply","Maryokutai","Collected Power","Skull Lair","Graverobber's Retribution","Deal of Phantom","Blind Destruction","The Emperor's Holiday","The Dark Door","Cyclon Laser","Bait Doll","Fusion Gate","Ekibyo Drakmord","Miracle Dig","Dragonic Attack","Spirit Elimination","Vengeful Bog Spirit","Steel Ogre Grotto #2","Three-Headed Geedo","7 Completed","Time Seal","Gift of the Mystical Elf","The Eye of Truth","Solomon's Lawbook","Earthshaker","Enchanted Javelin","Gust","Driving Snow","Armored Glass","World Suppression","Mystic Probe","Metal Detector","Numinous Healer","DNA Surgery","The Regulation of Tribe","Major Riot","Light of Intervention","Respect Play","Inspection","Flame Champion","Twin-Headed Fire Dragon","Darkfire Soldier #1","Mr. Volcano","Darkfire Soldier #2","Kiseitai","Cyber Falcon","Flying Kamakiri #2","Sky Scout","Minor Goblin Official","Gamble","Attack and Receive","Solemn Wishes","Bubonic Vermin","Dark Bat","Oni Tank T-34","Overdrive","Burning Land","Cold Wave","Rain of Mercy","Insect Imitation","Ground Collapse","Infinite Dismissal","Type Zero Magic Crusher","Shadow of Eyes","Sword Hunter","Drill Bug","Deepsea Warrior","Bite Shoes","Spikebot","Invitation to a Dark Sleep","Thousand-Eyes Idol","Girochin Kuwagata","Bombardment Beetle","4-Starred Ladybug of Doom","Gradius","Skull Mariner","The All-Seeing White Tiger","Island Turtle","Wingweaver","Science Soldier","Souls of the Forgotten","Dokuroyaiba","Insect Barrier","Penguin Knight","Horn of Light","Malevolent Nuzzler","Metal Fish","Electric Snake","Queen Bird","Peacock","Guardian of the Throne Room","Fire Kraken","Minar","Griggle","Tyhone #2","Ancient One of the Deep Forest","Dark Witch","Weather Report","Mechanical Snail","Giant Turtle Who Feeds on Flames","Liquid Beast","High Tide Gyojin","Whiptail Crow","Slot Machine","Red Archery Girl","Gravekeeper's Servant","Curse of Fiend","Upstart Goblin","Toll","Final Destiny","Chorus of Sanctuary","Darkness Approaches","Fairy's Hand Mirror","Tailor of the Fickle","The Reliable Guardian","Chain Energy","Snake Fang","Octoberser","Psychic Kappa","Labyrinth Wall","Wall Shadow","Twin Long Rods #2","Stone Ogre Grotto","Magical Labyrinth","Eternal Rest","Commencement Dance","Hamburger Recipe","House of Adhesive Tape","Eatgaboon","Turtle Oath","Performance of Sword","Hungry Burger","Crab Turtle","Ryu-Ran","Jigen Bakudan","Flash Assailant","Dark Zebra","Spear Cretin","Boar Soldier","Ceremonial Bell","Sonic Bird","Kotodama","Gaia Power","Umiiruka","Molten Destruction","Rising Air Current","Luminous Spark","Mystic Plasma Zone","Ring of Magnetism","Share the Pain","Stim-Pack","Germ Infection","Paralyzing Potion","Sword of Deep-Seated","Block Attack","The Unhappy Maiden","Blue-Winged Crown","Skull Knight","Gazelle the King of Mythical Beasts","Mushroom Man #2","Lady of Faith","Lava Battleguard","Musician King","Flame Cerebrus","Niwatori","The Bistro Butcher","Yado Karu","Cyber Saurus","Labyrinth Tank","Ryu-Kishin Powered","Bickuribox","Giltia the D. Knight","Launcher Spider","Giga-Tech Wolf","Thunder Dragon","7 Colored Fish","The Immortal of Thunder","Punished Eagle","Insect Soldiers of the Sky","Protector of the Throne","Tremendous Fire","Jirai Gumo","Guardian of the Labyrinth","Prevent Rat","The Little Swordsman of Aile","Mystic Horseman","Rabid Horseman","Crass Clown","Pumpking the King of Ghosts","Dream Clown","Tainted Wisdom","Ancient Brain","Jellyfish","Castle of Dark Illusions","King of Yamimakai","Saggi the Dark Clown","Dragon Piper","Illusionist Faceless Mage","Soul Release","Baby Dragon","Blackland Fire Dragon","Swamp Battleguard","Battle Steer","The Cheerful Coffin","Disk Magician","Hyosube","Hibikime","Tongyo","Empress Judge","Pale Beast","Electric Lizard","Hunter Spider","Ancient Lizard Warrior","Queen's Double","Trent","Ancient Elft","Deepsea Shark","Bottom Dweller","Destroyer Golem","Kaminari Attack","Rainbow Flower","Morinphen","Mega Thunderball","Mystic Lamp","Steel Scorpion","Ocubeam","Leghul","Ooguchi","Leogun","Blast Juggler","Jinzo #7","Roaring Ocean Snake","Water Omotics","Ground Attacker Bugroth","Petit Moth","Kojikocy","Doma the Angel of Silence","Big Eye","Cocoon of Evolution","Crawling Dragon","Armored Zombie","Feral Imp","Winged Dragon, Guardian of the Fortress #1","Rock Ogre Grotto #1","Armored Lizard","Killer Needle","Larvae Moth","Harpie Lady","Hitotsu-Me Giant","Skull Servant","The 13th Grave","Nemuriko","Trial of Nightmare","Dark Gray","Silver Fang","Mammoth Graveyard","Basic Insect","Firegrass","Monster Egg","Flame Manipulator","Fiend Reflection #2","Dark King of the Abyss","Hinotama Soul","Petit Angel","Petit Dragon","Turtle Tiger","Kagemusha of the Blue Flame","Root Water","Dissolverock","Two-Mouth Darkruler","Masaki the Legendary Swordsman","Mystical Sheep #2","King Fog","Ray & Temperature","Green Phantom King","The Furious Sea King","Yami","Umi","Sogen","Power of Kaishin","Book of Secret Arts","Violet Crystal","Beast Fangs","Legendary Sword","Kurama","Mountain","Wasteland","Forest","Hinotama","Sparks","Red Medicine","Remove Trap","Beaver Warrior","Tyhone","Uraby","Man Eater","Hard Armor","Larvas","Witty Phantom","Fireyarou","Enchanting Mermaid","Meda Bat","Kumootoko","Frenzied Panda","Terra the Terrible","Armaill","M-Warrior #2","M-Warrior #1","Mystical Moon","Electro-Whip","Dragon Treasure","Silver Bow and Arrow","Vile Germs","Laser Cannon Armor","Dark Energy","One-Eyed Shield Dragon","Follow Wind","Raise Body Heat","Machine Conversion Factory","Skull Red Bird","Tripwire Beast","Spike Seadra","Succubus Knight","Armored Starfish","Drooling Lizard","Darkworld Thorns","Lesser Dragon","Steel Ogre Grotto #1","Misairuzame","Sand Stone"];
const rare = ["Dark Verger","Blackwing - Blizzard the Far North","Morphtronic Remoten","Torapart","Koa'ki Meiru Ice","Brain Golem","Deep Sea Diva","One for One","Against the Wind","Iron Core of Koa'ki Meiru","Calming Magic","Moja","Berserking","Spell of Pain","Snowman Eater","Tree Otter","Ojama Red","Ojama Blue","Ojama Country","Emperor Sem","Debris Dragon","Hyper Synchron","Blackwing - Gale the Whirlwind","Flying Fortress SKY FIRE","Arcane Apprentice","Assault Beast","Gladiator Beast Samnite","B.E.S. Big Core MK-2","Inmato","Alien Overlord","Alien Ammonite","Star Blast","Arcane Barrier","Shining Silver Force","Psychic Tuning","Wall of Thorns","Planet Pollutant Virus","Synchro Change","Makiu, the Magical Mist","Assault Armor","Turbo Synchron","Mad Archfiend","Morphtronic Boomboxen","Morphtronic Radion","Search Striker","Iron Chain Repairman","Storm Caller","Tiger Dragon","Iron Chain Dragon","Psychic Lifetrancer","Morphtronic Accelerator","Paralyzing Chain","Miracle Fertilizer","The World Tree","Prideful Roar","Pollinosis","Trap of the Imperial Tomb","Cactus Fighter","Virus Cannon","Mosaic Manticore","Shield Warrior","Big Piece Golem","Dark Resonator","Handcuffs Dragon","Mind Master","Yamato-no-Kami","Fighting Spirit","De-Synchro","Graceful Revival","Defense Draw","Mind Over Matter","Herald of Orange Light","Izanami","Maiden of Macabre","Grapple Blocker","Telekinetic Charging Cell","The Tricky","Trap of Darkness","The Selection","Cold Enchanter","Jinzo - Returner","Arcana Force XIV - Temperance","Lumina, Lightsworn Summoner","Dark Valkyria","Substitoad","Batteryman Industial Strength","Diskblade Rider","Golden Ladybug","Simorgh, Bird of Ancestry","Light Barrier","Deck Lockdown","Ribbon of Rebirth","Hero Blast","Glorious Illusion","Destruction Jammer","Froggy Forcefield","Maniacal Servant","Nimble Musasabi","Flame Spirit Ignis","Owner's Seal","Shadowpriestess of Ohm","Gigaplant","Future Samurai","Super Polymerization","Fires of Doomsday","Six Samurai United","Rainbow Life","Hate Buster","Dark Spirit Art - Greed","Dark Illusion","Offering to the Snake Deity","Cry Havoc!","Deepsea Macrotrema","Metabo Globster","Lonefire Blossom","Aztekipede, the Worm Warrior","Castle Gate","Dark-Eyes Illusionist","Legendary Fiend","Call of the Earthbound","Evil HERO Infernal Gainer","Cloudian - Acid Cloud","Cloudian - Cirrostratus","Cloudian - Altus","Expressroid","Gladiator Beast Spartacus","Gladiator Beast Murmillo","Gladiator Beast Laquari","Goblin Black Ops","Alien Telepath","Evil HERO Dark Gaia","Gladiator Beast Gaiodiaz","Dark Fusion","Diamond-Dust Cyclone","Colosseum - Cage of the Gladiator Beasts","Gladiator Beast's Battle Manica","Gladiator Beast's Respite","Cell Explosion Virus","Hunter Dragon","Grasschopper","Neo Space Pathfinder","Elemental HERO Marine Neos","Snake Rain","Doube Summon","Summoner's Art","Phalanx Pike","Symbols of Duty","Damage = Reptile","Snake Deity's Command","Common Charity","Spell Reclamation","Trap Reclamation","Ocean's Keeper","Thousand-Eyes Jellyfish","Fossil Tusker","Phantom Dragonray Bronto","Crystal Beast Topaz Tiger","Volcanic Shell","Volcanic Slicer","Gravekeeper's Commandant","Warrior of Atlantis","Destroyersaurus","Zeradias, Herald of Heaven","Archfiend General","Harpie Queen","Goe Goe the Gallant Ninja","Lucky Iron Axe","Ancient City - Rainbow Ruins","Triggered Summon","Firewall","Frostosaurus","Spiral Serpent","Neo-Spacian Grand Mole","Sage of Silence","Fusion Devourer","D.D. Crow","Ancient Rules","Neos Force","Twister","Hero Medal","Eliminating the League","The Transmigration Prophecy","Cloak and Dagger","Pulling the Rug","Allure Queen LV5","Dark Lucius LV6","Vanity's Fiend","Vanity's Ruler","Iris, the Earth Mother","Lightning Punisher","Combo Master","Rampaging Rhynos","Flash of the Forbidden Spell","Miraculous Rebirth","Degenerate Circuit","Blasting Fuse","Dimensional Inversion","Black Horn of Heaven","Submarineroid","Destiny HERO - Dasher","Alien Warrior","Alien Mother","Cosmic Horror Gangi'el","Spell Calling","Overload Fusion","Cyclone Blade","Future Fusion","Neo Space","Dark City","D - Chain","Supercharge","Cyber Summon Blaster","Destiny HERO - Diamond Dude","Harpie's Pet Dragon","Majestic Mech - Ohka","Herald of Green Light","Herald of Purple Light","Banisher of the Radiance","Hero Flash!!","Guard Penalty","Life Equalizer","Destruction of Destiny","D - Time","Elemental Absorber","Miraculous Descent","Forced Break","Proto-Cyber Dragon","Adhesive Explosive","Chainsaw Insect","Doom Dozer","Treeborn Frog","Princess Pikeru","Princess Curran","Memory Crusher","Phantasmal Martyrs","Cyclone Boomerang","Karma Cut","Option Hunter","Goblin Out of the Frying Pan","Malfunction","Queen's Knight","Jack's Knight","King's Knight","Chthonian Soldier","Rapid-Fire Magician","Broww, Huntsman of Dark World","Brron, Mad King of Dark World","Sillva, Warlord of Dark World","Feather Shot","Chthonian Alliance","Armed Changer","Hero Barrier","Chthonian Blast","Level Limit - Area A","Wroughtweiler","Dark Catapulter","Elemental HERO Bubbleman","D.D.M. - Different Dimension Master","Miracle Fusion","System Down","Transcendant Wings","Bubble Shuffle","Spark Blaster","Fire Darts","Magical Explosion","Rising Energy","D.D. Trap Hole","Dimension Wall","Ancient Gear Beast","Millennium Scorpion","Criosphinx","Grave Ohja","D.D. Survivor","Mid Shield Gardna","Elemental Mistress Doriado","Legendary Black Belt","Nitro Unit","Hero Signal","Kozaky's Self-Destruct Button","Token Feastevil","Spell-Stopping Statue","Royal Surrender","Ultimate Insect LV5","Big-Tusked Mammoth","Chiron the Mage","Shadowslayer","Brain Jacker","Meteor of Destruction","Swords of Concealing Light","Spiral Spear Strike","Cross Counter","Penalty Game!","Phoenix Wing Wind Blast","Assault of GHQ","Forced Ceasefire","Ultimate Insect LV3","Sasuke Samurai #4","Gaia Soul the Combustible Collective","Fusilier Dragon, the Dual-Mode Beast","Dekoichi the Battlechanted Locomotive","A-Team: Trap Disposal Unit","Dark Blade the Dragon Knight","Serial Spell","Necklace of Command","Machine Duplication","Flint","Rare Metalmorph","Chain Burst","Covering Fire","Charcoal Inpachi","Ultimate Insect LV1","Horus the Black Flame Dragon LV4","Dark Mimic LV3","Mystic Swordsman LV2","Armed Dragon LV5","Ninja Grandmaster Sasuke","Rafflesia Seduction","Mind on Air","Ojama King","Master of Oz","Hammer Shot","Spirit Barrier","Enervating Mist","Sealmaster Meisei","The Agent of Wisdom - Mercury","The Agent of Creation - Venus","Soul-Absorbing Bone Tower","Avatar of the Pot","Talisman of Trap Sealing","Talisman of Spell Sealing","Draining Shield","Theban Nightmare","Grave Protector","Double Coston","King of the Swamp","Special Hurricane","Spell Economics","Thousand Energy","Triangle Power","Soul Resurrection","Sasuke Samurai #3","Berserk Gorilla","Drillago","Lekunga","Fuhma Shuriken","Chain Disappearance","Mad Dog of Darkness","Enraged Battle Ox","Dark Driceratops","Mataza the Zapper","Getsu Fuhma","Stray Lambs","Ultra Evolution Pill","Destruction Ring","Compulsory Evacuation Device","Curse of Darkness","Robbin' Zombie","Guardian Baou","Guardian Tryce","Des Feral Imp","Fear from the Dark","Wicked-Breaking Flameberge - Baou","Different Dimension Gate","Skill Drain","Archfiend Soldier","Great Maju Garzett","Mefist the Infernal General","Darkbishop Archfiend","Infernalqueen Archfiend","Metallizing Parasite - Lunatite","Tsukuyomi","Legendary Flame Lord","Contract with the Abyss","Dark Scorpion Combination","Dark Blade","D.D. Crazy Beast","Helping Robo for Combat","Great Phantom Thief","Combination Attack","Ante","Dark Core","Tribute Doll","Amazoness Tiger","Apprentice Magician","Armor Exe","Des Koala","Cat's Ear Tribe","Continuous Destruction Punch","Big Bang Shot","Mega Ton Magical Cannon","Dramatic Rescue","King Tiger Wanghu","Jowls of Dark Demise","Moisture Creature","Gora Turtle","Wandering Mummy","Pyramid Turtle","Book of Moon","Curse of Royal","Reckless Greed","Pharaoh's Treasure","Dark Jeroid","Newdoria","Gravekeeper's Watcher","Winged Sage Falcos","Spirit Reaper","Dark Designator","Coffin Seller","Lesser Fiend","Opticlops","Fatal Abacus","Shadow Tamer","The A. Forces","Array of Revealing Light","The Warrior Returning Alive","The Dragon's Bead","Thunder Nyan Nyan","Susa Soldier","Fusion Sword Murasame Blade","Second Coin Toss","After the Struggle","Magic Reflector","Blast with Chain","Royal Oppression","Bottomless Trap Hole","Amphibian Beast","Nuvia the Wicked","Mask of Brutality","Return of the Doomed","Jam Breeding Machine","Infinite Cards","Spirit of the Breeze","Darklord Marie","Jowgen the Spiritualist","Gilasaurus","Tornado Bird","Destruction Punch","Spirit Message 'I'","Spirit Message 'N'","Spirit Message 'A'","Spirit Message 'L'","Spiritualism","Lightforce Sword","Appropriate","Forced Requisition","Nobleman of Extermination","The Shallow Grave","Prohibition","Morphing Jar #2","Michizure","Skull Invitation","Monster Recovery","Shift","Dimensionhole","Magic Drain","Gravity Bind","Hayabusa Knight","Vampire Baby","Mad Sword Beast","Ameba","Hiro's Shadow Scout","Rush Recklessly","Horn of the Unicorn","Manga Ryu-Ran","Hyozanryu","Cyber Jar","Giant Rat","Senju of the Thousand Hands","UFO Turtle","Karate Man","Giant Germ","Nimble Momonga","Shining Angel","Mother Grizzly","Flying Kamakiri #1","Mystic Tomato","Robbin' Goblin","Shield & Sword","Witch's Apprentice","Little Chimera","Bladefly","Witch of the Black Forest","Cannon Soldier","Dark Elf","Muka Muka","Star Boy","Milus Radiant","Hoshiningen","Shadow Ghoul","Mask of Darkness","White Magical Hat","Masked Sorcerer","Elegant Egotist","Magician of Faith","Fake Trap","Sangan","Great Moth","Princess of Tsurugi","Charubin the Fire Knight","Darkfire Dragon","Aqua Madoor","Flame Ghost","Dragon Capture Jar","Fissure","Fusionist","Two-Pronged Attack","Gravedigger Ghoul","Giant Soldier of Stone","Karbonala Warrior","Reaper of the Cards","Spirit of the Harp","Dragoness the Wicked Knight","Pot of Greed","Hane-Hane","Flower Wolf","Armed Ninja","Metal Dragon","Final Flame","Goblin's Secret Remedy","Stop Defense"];
const sRare = ["Rockstone Warrior","Level Warrior","Phoenixian Cluster Amaryllis","Koa'ki Meiru Valafar","Koa'ki Meiru Powerhand","Reinforced Human Psychic Borg","Blackwing Armed Wing","Sea Dragon Lord Gishilnodon","Magic Planter","Delta Crow - Anti Reverse","Swallow Flip","Koa'ki Meiru War Arms","Beast Striker","Swallow's Nest","Turret Warrior","Twilight Rose Knight","Black Salvo","Scanner","Dimension Fortress Weapon","Dark Strike Fighter","Arcanite Magician","Spirit Force","Alien Kid","Totem Dragon","Royal Swamp Eel","Code A Ancient Ruins","Multiply","Armoroid","Hanewata","Queen of Thorns","Black Garden","Secret Village of the Spellcasters","Battle Mania","Urgent Tuning","Psychic Trigger","Rai-Jin","Rai-Mei","Night's End Sorcerer","Puppet Master","Goka, the Pyre of Malice","Red Ogre","Botanical Lion","Nitro Synchron","Sinister Sprocket","Twin-Barrel Dragon","Izanagi","Kinka-byo","Magical Android","Power Filter","Lightsworn Sabre","Unstable Evolution","Broken Blocker","Gladiator Beast War Chariot","Intercept","Counselor Lily","Kunai with Chain","Jinzo - Lord","Ryko, Lightsworn Hunter","Wulf, Lightsworn Beast","DUCKER Mobile Cannon","Gladiator Beast Gyzarus","Light of Redemption","Aurkus, Lightsworn Druid","Magical Exempler","Vanquishing Light","Divine Knight Ishzark","Union Attack","Helios Trice Megistus","Yubel","Cyber Valley","Volcanic Counter","Armageddon Knight","Doomsday Horror","Field-Commander Rahz","Elemental HERO Storm Neos","Dark Eruption","Escape from the Dark Dimension","Golden Flying Fish","Prime Material Dragon","Zoma the Spirit","Evil HERO Malicious Edge","Cloudian - Eye of the Typhoon","Cloudian - Sheep Cloud","Gladiator Beast Alexander","Cunning of the Six Samurai","Updraft","Energy-Absorbing Monolith","Gladiator Beast Torax","Defensive Tactics","Necro Gardna","Elemental HERO Neos Alius","Aquarian Alessa","Lucky Pied Piper","Doom Shaman","Zombie Master","Fifth Hope","Mirror Gate","Blazewing Butterfly","Sky Scourge Enrise","Sky Scourge Norleras","Sky Scourge Invicil","Raiza the Storm Monarch","Soul of Fire","Tri-Blaze Accelerator","Radiant Mirror Force","Gene-Warped Warwolf","Neo-Spacian Air Hummingbird","Great Shogun Shien","Dark World Dealings","Card Trader","Skyscraper 2 - Hero City","Birthright","Cyberdark Horn","Cyberdark Edge","Cyberdark Keel","Cyber Esper","Storm Shooter","Trojan Blast","Cyber Shadow Gardna","Neo-Spacian Aqua Dolphin","Neo-Spacian Flare Scarab","Neo-Spacian Dark Panther","Destiny HERO - Double Dude","Destiny HERO - Dogma","Ultimate Tyranno","Super Vehicroid Jumbo Drill","Cyber Prima","Cyber Phoenix","Victory Viper XX03","Majestic Mech - Goryu","Super-Electromagnetic Voltech Dragon","Elemental HERO Wild Wingman","Clock Tower Prison","Cyber Barrier Dragon","B.E.S. Covered Core","Divine Dragon - Excelion","Ruin, Queen of Oblivion","Demise, King of Armageddon","Ancient Gear Castle","Damage Condenser","Elemental HERO Bladedge","Water Dragon","B.E.S. Tetran","Goldd, Wu-Lord of Dark World","VWXYZ-Dragon Catapult Cannon","Cyber Blader","Pot of Avarice","UFOroid","Cyber Dragon","Cybernetic Magician","Goblin Elite Attack Force","B.E.S. Crystal Core","Cyber Twin Dragon","Skyscraper","Winged Kuriboh","Ultimate Insect LV7","Hieracosphinx","Megarock Dragon","Master Monk","Card of Sanctity","Brain Control","Granmarg the Rock Monarch","Behemoth the King of All Animals","Blast Magician","King Dragun","A Feather of the Phoenix","Lightning Vortex","Deck Devastation Virus","Thestalos the Firestorm Monarch","B.E.S Big Core","Triangle Ectasy Spark","Monster Reincarnation","Tragedy","Divine Wrath","Pikeru's Circle of Enchantment","Horus the Black Flame Dragon LV6","Mobius the Frost Monarch","Penumbral Soldier Lady","Ectoplasmer","Greed","Muko","Hallowed Life Barrier","The Agent of Force - Mars","Stone Statue of the Aztecs","Needle Burrower","Zaborg the Thunder Monarch","Amplifier","The Sanctuary in the Sky","Legacy Hunter","Emissary of the Afterlife","The First Sarcophagus","Des Counterblow","D.D Scout Plane","Freed the Brave Wanderer","Chaosrider Gustaph","Wild Nature's Release","D.D. Designator","Reload","Big Burn","Orca Mega-Fortress of Darkness","Dedication through Light and Darkness","Trap Jammer","Different Dimension Dragon","Dark Flare Knight","Mirage Knight","Berserk Dragon","D.D Warrior Lady","Butterfly Dagger - Elma","Terrorking Archfiend","Mudora","Dark Master - Zorc","Spell Vanishing","X-Head Cannon","Y-Dragon Head","Z-Metal Tank","Spell Shield Type-8","XZ-Tank Cannon","YZ-Tank Dragon","Skilled White Dragon","Skilled Dark Magician","Tribe-Infecting Virus","Amazoness Archers","Sasuke Samurai","Book of Life","Mirage of Nightmare","Statue of the Wicked","Gravekeeper's Chief","Reaper on the Nightmare","Dark Room of Nightmare","Necrovalley","Barrel Behind the Door","Trap of Board Eraser","Dark Balter the Terrible","Ryu Senshi","Exiled Force","Reinforcement of the Army","Spear Dragon","Fiend Skull Dragon","Luster Dragon #2","Twin-Headed Behemoth","Asura Priest","Drop Off","Revival Jam","Mask of Dispel","Mask of the Accursed","Fire Princess","Jar of Greed","Kycoo the Ghost Destroyer","Bazoo the Soul-Eater","Dark Spirit of the Silent","Riryoku","De-Fusion","Parasite Paracide","Graverobber","Dust Tornado","Mirror Wall","Backup Soldier","Magical Hats","Nobleman of Crossout","Fairy Meteor Crush","Limiter Removal","Gearfried the Iron Knight","Black Pendant","Maha Vailo","Invader of the Throne","Confiscation","Giant Trunade","Painful Choice","Black Illusion Ritual","Toon World","Banisher of the Light","Messenger of Peace","Heavy Storm","Garnecia Elefantis","Harpie Lady Sisters","Sanga of the Thunder","Kazejin","Suijin","Tribute to the Doomed","Kuriboh","Catapult Turtle","Twin-Headed Thunder Dragon","Flame Swordsman","Celtic Guardian","Man-Eater Bug","Swords of Revealing Light","Curse of Dragon","Mystical Elf","Polymerization","Trap Hole","Raigeki","Dark Hole"];
const ultra = ["Strong Wind Dragon","Blackwing - Elphin the Raven","Earthbound Immortal Aslla piscu","Earthbound Immortal Ccapac Apu","Koa'ki Meiru Drago","Exploder Dragonwing","Power Tool Dragon","Trident Dragion","Forbidden Chalice","Grave of the Super Ancient Organism","Red Dragon Archfiend/Assault Mode","Doomkaiser Dragon/Assault Mode","Hyper Psychic Blaster/Assault Mode","Arcanite Magician/Assault Mode","Lifeforce Harmonizer","Blackwing Armor Master","Hyper Psychic Blaster","Cosmic Fortress Gol'gar","Bone Crusher","Violet Witch","Rose, Warrior of Revenge","Tytannial, Princess of Camellias","Plaguespreader Zombie","Turbo Warrior","Black Rose Dragon","Doomkaiser Dragon","Revived King Ha Des","Mark of the Rose","Psychokinesis","Seed of Flame","Montage Dragon","Dark Hunter","Multiple Piece Golem","Nitro Warrior","Stardust Dragon","Red Dragon Archfiend","Goyo Guardian","Thought Ruler Archfiend","Emergency Teleport","Psychic Overload","Arcana Force XXI - The World","Lyla, Lightsworn Sorceress","Celestia, Lightsworn Angel","Phantom Dragon","Destiny End Dragoon","Ultimate Ancient Gear Golem","Solar Recharge","Super-Ancient Dinobeast","Dangerous Machine Type-6","Maximum Six","Yubel - Terror Incarnate","Dark Horus","Dark Nephthys","Superancient Deepsea King Coelacanth","The Beginning of the End","Drastic Drop Off","Darkknight Parshath","Allure of Darkness","Vampire's Curse","Metal Reflect Slime","Enishi, Shien's Chancellor","Evil HERO Inferno Wing","Evil HERO Lightning Golem","Test Tiger","Security Orb","Vennominon the King of Poisonous Snakes","Chthonian Emperor Dragon","Crystal Seer","Desert Twister","Elemental HERO Darkbright","Crystal Beast Sapphire Pegasus","Volcanic Doomfire","Elemental HERO Captain Gold","Rare Value","Reign-Beaux, Overlord of Dark World","Elemental HERO Air Neos","Elemental HERO Grand Neos","Elemental HERO Glow Neos","Allure Queen LV7","Dark Lucius LV8","Cyberdark Dragon","Cyber OGre 2","Elemental HERO Aqua Neos","Elemental HERO Flare Neos","Elemental HERO Dark Neos","Chimeratech Overdragon","Destiny HERO - Dreadmaster","Voltanis the Adjudicator","Elemental HERO Phoenix Enforcer","Elemental HERO Shining Phoenix Enforcer","Uria, Lord of Searing Flames","Hamon, Lord of Striking Thunder","Raviel, Lord of Phantasms","Cyber Laser Dragon","Elemental HERO Rampart Blaster","Elemental HERO Tempest","Elemental HERO Wildedge","Elemental HERO Shining Flare Wingman","Winged Kuriboh LV10","UFOroid Fighter","Cyber End Dragon","Power Bond","Ancient Gear Golem","Reshef the Dark Being","Elemental HERO Flame Wingman","Elemental HERO Thunder Giant","Sacred Phoenix of Nephthys","Silent Swordsman LV5","Gearfried the Swordmaster","Gatling Dragon","The Creator","Mystic Swordsman LV6","Silent Swordsman LV3","Perfect Machine King","Horus the Black Flame Dragon LV8","Mystic Swordsman LV4","Armed Dragon LV7","Inferno Fire Blast","The Agent of Judgment - Saturn","Gear Golem the Moving Fortress","Blowback Dragon","Archlord Zerato","Enemy Controller","Burst Stream of Destruction","Spirit of the Pharaoh","Ghost Knight of Jackal","Dark Magic Attack","Curse of Anubis","Strike Ninja","Black Luster Soldier - Envoy of the Beginning","Dark Mirror Force","Dark Magician of Chaos","Manticore of Darkness","Black Tyranno","Insect Princess","Levia-Dragon - Daedalus","Guardian Angel Joan","Dimension Fusion","Guardian Ceal","Guardian Grarl","Reflect Bounder","Shinato King of a Higher Plane","Exodia Necross","Kaiser Glider","Interdimensional Matter Transporter","Cost Down","Skull Archfiend of Lightning","Blast Held by a Tribute","Spell Canceller","Paladin of White Dragon","XY-Dragon Cannon","XYZ-Dragon Cannon","Luster Dragon","Amazoness Swords Woman","Chaos Command Magician","Breaker the Magical Warrior","Dark Paladin","Double Spell","Great Dezard","Guardian Sphinx","Don Zaloog","Fushioh Richie","Helpoemer","Mystical Knight of Jackal","Byser Shock","Question","Rope of Life","Nightmare Wheel","Dark Ruler Ha Des","Freed the Matchless General","Marauding Captain","Tyrant Dragon","Fiber Jar","Airknight Parshath","Yamata Dragon","Hino-Kagu-Tsuchi","Creature Swap","Last Turn","The Masked Beast","Mask of Restrict","Torrential Tribute","Card of Safe Return","United We Stand","Mage Power","Dark Necrofear","The Last Warrior from Another Planet","Royal Command","Destiny Board","Chain Destruction","Call of the Haunted","Ceasefire","Premature Burial","Buster Blader","The Legendary Fisherman","Thousand-Eyes Restrict","Goblin Attack Force","The Fiend Megacyber","Beast of Talwar","Axe of Despair","Spellbinding Circle","Relinquished","Snatch Steal","Delinquent Duo","The Forceful Sentry","Mystical Space Typhoon","Megamorph","Toon Mermaid","Toon Summoned Skull","Mirror Force","Summoned Skull","Black Skull Dragon","Change of Heart","Time Wizard","Barrel Dragon","Solemn Judgment","Magic Jammer","Seven Tools of the Bandit","Horn of Heaven","Blue-Eyes White Dragon","Gaia the Fierce Knight","Dark Magician","Red-Eyes Black Dragon","Monster Reborn","Exodia the Forbidden One","Left Arm of the Forbidden One","Right Arm of the Forbidden One","Left Leg of the Forbidden One","Right Leg of the Forbidden One"];
const secret = ["Battlesotrm","Immortal Ruler","Hardened Armed Dragon","King of the Beasts","Overwhelm","Light End Dragon","Chaos-End Master","Sphere of Chaos","Colossal Fighter/Assault Mode","Dark Voltanis","Prime Material Falcon","Puppet King","Zeta Reticulant","Tethys, Goddess of Light","Ido the Supreme Magical Force","Greed Quasar","Overdrive Teleporter","Gladiator Beast Retiari","Tempest Magician","Treacherous Trap Hole","Time Machine","Neos Wiseman","Elemental HERO Divine Neos","Avenging Knight Parshath","Hand of the Six Samurai","Cyber Shark","Charge of the Light Brigade","Splendid Venus","Fiendish Engine Omega","Ice Master","Toy Magician","Guardian of Order","Honest","Arcana Force EX - The Dark Ruler","Judgment Dragon","Ehren, Lightsworn Monk","Dark General Freed","Tualatin","Angel O7","Fog King","Fossil Dyna Pachycephalo","Dark Grepher","Rainbow Dark Dragon","Yubel - The Ultimate Nightmare","The Dark Creator","Dark Armed Dragon","Rainbow Neos","Darklord Zerato","Dark Red Enchanter","Goblin Zombie","Belial - Marquis of Darkness","Gladiator Beast Octavius","Elemental HERO Chaos Neos","Elemental HERO Plasma Vice","Super Vehicroid - Stealth Union","Gladiator Beast Heraklinos","Dragon Ice","Tongue Twister","Skreech","Royal Firestorm Guards","Veil of Darkness","Necroface","Gil Garth","Soul Taker","Magic Formula","Silent Doom","Gemini Summoner","Rainbow Dragon","Vennominaga the Deity of Poisonous Snakes","Frost and Flame Dragon","Elemental HERO Magma Neos","Cyberdark Impact!","Cranium Fish","Abyssal Kingshark","Mormolith","Il Blud","Volcanic Rocket","Diabolos, King of the Abyss","Lich Lord, King of the Underworld","Prometheus, King of the Shadows","Mist Archfiend","Plague Wolf","Recurring Nightmare","Sword of Dark Rites","Eradicator Epidemic Virus","Grandmaster of the Six Samurai","Neo-Parshath, the Sky Paladin","Meltiel, Sage of the Sky","Harvest Angel of Wisdom","Freya, Spirit of Victory","Nova Summoner","Radiant Jeral","Gellenduo","Aegis of Gaia","The End of Anubis","Mazera DeVille","Chaos Emperor Dragon - Envoy of the End","Invader of Darkness","Vampire Lord","Judgment of Anubis","Dark Magician Girl","Diffusion Wave-Motion","Ring of Destruction","Lava Golem","Yata-Garasu","Injection Fairy Lily","Gemini Elf","Magic Cylinder","Jinzo","Imperial Order","Blue-Eyes Toon Dragon","Serpent Night Dragon","Gate Guardian","Thousand Dragon","Gaia the Dragon Champion","Tri-Horned Dragon"];
//connect to database
con.connect(err => {
    if (err) throw err;
    console.log("connected to database");
})

//turn the bot on
bot.on('ready', () => {
    console.log('Kaiba is badass!');
    bot.user.setActivity('i!help for commands', { type: "PLAYING" });

    const job = new CronJob({
        // Run at 05:00 Central time, only on weekdays
        cronTime: '00 00 01 * * 0-6',
        onTick: function() {
            // Run whatever you like here..
            let sql = `TRUNCATE daily`;
            con.query(sql, console.log);
            console.log("Daily table has been reset!");
        },
        start: true,
        timeZone: 'US/Eastern'
      });
    
    const job1 = new CronJob({
        // Run at 05:00 Central time, only on weekdays
        cronTime: '00 00 01 * * 0',
        onTick: function() {
            // Run whatever you like here..
            let sql = `TRUNCATE weekly`;
            con.query(sql, console.log);
            console.log("Weekly table has been reset!");
        },
        start: true,
        timeZone: 'US/Eastern'
      });
    
    const job2 = new CronJob({
        // Run at 05:00 Central time, only on weekdays
        cronTime: '00 00 01 01 * *',
        onTick: function() {
            // Run whatever you like here..
            let sql = `TRUNCATE monthly`;
            con.query(sql, console.log);
            console.log("monthly table has been reset!");
        },
        start: true,
        timeZone: 'US/Eastern'
      });

      const job3 = new CronJob({
        // Run at 05:00 Central time, only on weekdays
        cronTime: '00 00 12 * * 0-6',
        onTick: function() {
            // Run whatever you like here..
            let com1 = Math.floor(Math.random() * common.length);
            let com2 = Math.floor(Math.random() * common.length);
            let com3 = Math.floor(Math.random() * common.length);
            let com4 = Math.floor(Math.random() * common.length);
            let rare1 = Math.floor(Math.random() * rare.length);
            let rare2 = Math.floor(Math.random() * rare.length);
            let rare3 = Math.floor(Math.random() * rare.length);
            let sRare1 = Math.floor(Math.random() * sRare.length);
            let ultra1 = Math.floor(Math.random() * ultra.length);
            let secret1 = Math.floor(Math.random() * secret.length);
            let higherRarityChance = Math.floor(Math.random() * 100);
            let sql = `UPDATE shop SET shopCard = "${common[com1]}" WHERE shopID = 1`;
            con.query(sql, console.log);
            let sql2 = `UPDATE shop SET shopCard = "${common[com2]}" WHERE shopID = 2`;
            con.query(sql2, console.log);
            let sql3 = `UPDATE shop SET shopCard = "${common[com3]}" WHERE shopID = 3`;
            con.query(sql3, console.log);
            let sql4 = `UPDATE shop SET shopCard = "${common[com4]}" WHERE shopID = 4`;
            con.query(sql4, console.log);
            let sql5 = `UPDATE shop SET shopCard = "${rare[rare3]}" WHERE shopID = 5`;
            con.query(sql5, console.log);
            let sql6 = `UPDATE shop SET shopCard = "${rare[rare1]}" WHERE shopID = 6`;
            con.query(sql6, console.log);
            if(higherRarityChance >= 1 && higherRarityChance < 17){
                let sql7 = `UPDATE shop SET shopRarity = "Super", shopCard = "${sRare[sRare1]}", shopCost = 100 WHERE shopID = 7`;
                con.query(sql7, console.log);
            } else if(higherRarityChance >= 17 && higherRarityChance < 26){
                let sql8 = `UPDATE shop SET shopRarity = "Ultra", shopCard = "${ultra[ultra1]}", shopCost = 200 WHERE shopID = 7`;
                con.query(sql8, console.log);
            } else if(higherRarityChance >= 26 && higherRarityChance < 31){
                let sql9 = `UPDATE shop SET shopRarity = "Secret", shopCard = "${secret[secret1]}", shopCost = 300 WHERE shopID = 7`;
                con.query(sql9, console.log);
            } else {
                let sql10 = `UPDATE shop SET shopRarity = "Rare", shopCard = "${rare[rare2]}", shopCost = 50 WHERE shopID = 7`;
                con.query(sql10, console.log);
            }
            console.log("Shop restocked!");
        },
        start: true,
        timeZone: 'US/Eastern'
      });
});
//Does stuff when a user joins
bot.on('guildMemberAdd', member => {
    
});

bot.on('message', msg =>{
    if(msg.member !== null){
        let args = msg.content.substring(PREFIX.length).split(" ");

        //looking in database for everything in table points
        //where id equals the message sender
        con.query(`SELECT * FROM tokens WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
            if (err) throw err;

            let sql;

            //if message sender doesn't have a place in the database
            //creates row in points giving them the "defaultPoints" value in the config
            //Otherwise they gain points equal to "points" in config
            if (rows.length > 0) {
                let points = parseInt(rows[0].points) + parseInt(chatPoints);
                if(bronzeSupporters.includes(msg.author.id)){
                    points++;
                }
                if(silverSupporters.includes(msg.author.id)){
                    points += 2;
                }
                if(goldSupporters.includes(msg.author.id)){
                    points += 3;
                }
                sql = `UPDATE tokens SET points = ${points} WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`;
                con.query(sql, console.log); 
            } else {
                sql = `INSERT INTO tokens (id, serverId, points) VALUES ('${msg.author.id}', '${msg.guild.id}', ${3000})`;
                con.query(sql, console.log); 
            }
        })
        
        con.query(`SELECT * FROM daily WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
            if (err) throw err;

            let sql;

            let time = 0;

            //if id not found, adds them to the table
            if (rows.length < 1) {
                sql = `INSERT INTO daily (id, serverId, days) VALUES ('${msg.author.id}', "${msg.guild.id}", ${time})`
                con.query(sql, console.log);
            }

        })

        con.query(`SELECT * FROM weekly WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
            if (err) throw err;

            let sql;

            let time2 = 0;

            //if id not found, adds them to the table
            if (rows.length < 1) {
                sql = `INSERT INTO weekly (id, serverId, weeks) VALUES ('${msg.author.id}', '${msg.guild.id}', ${time2})`
                con.query(sql, console.log);
            }


        })
        con.query(`SELECT * FROM monthly WHERE id = '${msg.author.id}' AND serverId = "${msg.guild.id}"`, (err, rows) => {
            if (err) throw err;

            let sql;

            let time3 = 0;

            //if id not found, adds them to the table
            if (rows.length < 1) {
                sql = `INSERT INTO monthly (id, serverId, months) VALUES ('${msg.author.id}', '${msg.guild.id}', ${time3})`
                con.query(sql, console.log);
            }


        })

        con.query(`SELECT * FROM leaderboard WHERE id = '${msg.author.id}' AND serverId = '${msg.guild.id}'`, (err, rows) => {
            if (err) throw err;

            let sql;
            if (rows.length < 1) {
                if(msg.member !== undefined && msg.member !== null){
                    sql = `INSERT INTO leaderboard (serverId, id, wins, lose, duels, ratio, name, level) VALUES ('${msg.guild.id}','${msg.author.id}', ${0}, ${0}, ${0}, ${0}, "${msg.member.displayName}", ${0})`
                    con.query(sql, console.log);
                }
            }else{
                if(msg.member !== undefined && msg.member !== null){
                    sql = `UPDATE leaderboard SET name = "${msg.member.displayName}" WHERE id = '${msg.author.id}'`
                    con.query(sql, console.log);
                }
            }

        })

        if ((msg.content.startsWith(PREFIX) || msg.content.startsWith(PREFIXU))){
            switch(args[0].toLowerCase()){
                case "ping":
                    bot.commands.get('ping').execute(msg, bot);
                break;
                
                case "points":
                    bot.commands.get('points').execute(msg, con);
                break;

                case "bal":
                    bot.commands.get('points').execute(msg, con);
                break;

                case "balance":
                    bot.commands.get('points').execute(msg, con);
                break;

                case "admingive":
                    bot.commands.get('admingive').execute(msg, args, con, approvedAdmins);
                break;

                case "reset":
                    bot.commands.get('reset').execute(msg, args, con);
                break;

                case "admingivecard":
                    bot.commands.get('admingivecard').execute(msg, args, con, approvedAdmins);
                break;

                case "admintake":
                    bot.commands.get('admintake').execute(msg, args, con, approvedAdmins);
                break;

                case "give":
                    bot.commands.get('give').execute(msg, args, con);
                break;

                case "buy":
                    bot.commands.get('buy').execute(msg, args, con, bot.commands, bot.decks, bot.packs, bot.packTypes, bot.promos, Discord);
                break;

                case "buydeck":
                    bot.commands.get('buydeck').execute(msg, args, con, bot.decks, Discord);
                break;

                case "buypromo":
                    bot.commands.get('buypromo').execute(msg, args, con, bot.promos, Discord);
                break;
                
                case "viewdecks":
                    bot.commands.get('viewdecks').execute(msg, Discord);
                break;

                case "viewtins":
                    bot.commands.get('viewtins').execute(msg, Discord);
                break;

                case "viewpacks":
                    bot.commands.get('viewpacks').execute(msg, Discord);
                break;

                case "viewpromos":
                    bot.commands.get('viewpromos').execute(msg, Discord);
                break;
                
                case "listcards":
                    bot.commands.get('listcards').execute(msg, args, con,Discord);
                break;

                case "collection":
                    bot.commands.get('listcards').execute(msg, args, con,Discord);
                break;

                case "trunk":
                    bot.commands.get('listcards').execute(msg, args, con,Discord);
                break;

                case "binder":
                    bot.commands.get('listcards').execute(msg, args, con,Discord);
                break;

                case "buypack":
                    bot.commands.get('buypack').execute(msg, args, con, bot.packs, bot.packTypes, Discord);
                break;

                case "buytin":
                    bot.commands.get('buytin').execute(msg, args, con, bot.packs, Discord);
                break;
                
                case "help":
                    bot.commands.get('help').execute(msg, args, Discord, PREFIX);
                break;

                case "daily":
                    bot.commands.get('daily').execute(msg, con);
                break;

                case "weekly":
                    bot.commands.get('weekly').execute(msg, args, con);
                break;
                
                case "givecard":
                    bot.commands.get('givecard').execute(msg, args, con);
                break;

                case "convert":
                    bot.commands.get('convert').execute(msg, args, con);
                break;
            
                case "publist":
                    bot.commands.get('publist').execute(msg, args, con, Discord);
                break;
                
                case "timeroulette":
                    bot.commands.get('timeroulette').execute(msg);
                break;

                case "tr":
                    bot.commands.get('timeroulette').execute(msg);
                break;

                case "find":
                    bot.commands.get('find').execute(msg, args, bot.packs, packlist, Discord);
                break;

                case "check":
                    bot.commands.get('check').execute(msg, args, bot.packs, packlist, Discord);
                break;

                case "archcheck":
                    bot.commands.get('archcheck').execute(msg, args, bot.packs, packlist, Discord);
                break;
                
                case "lct":
                    bot.commands.get('lct').execute(msg, args, con, bot.cardTypes, Discord);
                break;

                case "sort":
                    bot.commands.get('lct').execute(msg, args, con, Discord, packlist);
                break;
            
                case "monthly":
                    bot.commands.get('monthly').execute(msg, con, Discord, bronzeSupporters, silverSupporters, goldSupporters);
                break;

                case "giverole":
                    bot.commands.get('giverole').execute(msg, args, con, admin);
                break;

                case "checkcards":
                    bot.commands.get('checkcards').execute(msg, args, con, Discord, approvedAdmins);
                break;

                case "challenge":
                    bot.commands.get('challenge').execute(msg, args, acoconut, awalnut, achallengers, achallenge);
                break;

                case "accept":
                    bot.commands.get('accept').execute(msg, awalnut, achallenge);
                break;

                case "decline":
                    bot.commands.get('decline').execute(msg, acoconut, awalnut, achallengers, achallenge);
                break;

                case "victory":
                    bot.commands.get('victory').execute(msg, con, acoconut, awalnut, achallengers, achallenge);
                break;

                case "cancel":
                    bot.commands.get('cancel').execute(msg, acoconut, awalnut, achallengers, achallenge);
                break;
                
                case "lb":
                    bot.commands.get('lb').execute(msg, con, Discord);
                break;

                case "wl":
                    bot.commands.get('wl').execute(msg, con);
                break;
                
                case "tagchallenge":
                    bot.commands.get('tagchallenge').execute(msg, args, tagcoconut1, tagcoconut2, tagcoconut3, tagwalnut, tagchallengers, tagchallenge1, tagchallenge2, tagchallenge3);
                break;

                case "tagaccept":
                    bot.commands.get('tagaccept').execute(msg, args, tagwalnut, tagchallenge1, tagchallenge2, tagchallenge3);
                break;

                case "tagdecline":
                    bot.commands.get('tagdecline').execute(msg, args, tagcoconut1, tagcoconut2, tagcoconut3, tagwalnut, tagchallengers, tagchallenge1, tagchallenge2, tagchallenge3);
                break;

                case "tagvictory":
                    bot.commands.get('tagvictory').execute(msg, args, con, tagcoconut1, tagcoconut2, tagcoconut3, tagwalnut, tagchallengers, tagchallenge1, tagchallenge2, tagchallenge3, admin);
                break;

                case "tagcancel":
                    bot.commands.get('tagcancel').execute(msg, args, tagcoconut1, tagcoconut2, tagcoconut3, tagwalnut, tagchallengers, tagchallenge1, tagchallenge2, tagchallenge3);
                break;
                /*
                case "rarity":
                    bot.commands.get('rarity').execute(msg, args);
                break;
                */
                case "taglink":
                    bot.commands.get('taglink').execute(msg);
                break;

                case "modernlink":
                    bot.commands.get('modernlink').execute(msg);
                break;

                case "view":
                    bot.commands.get('view').execute(msg, args, bot.packs, bot.packTypes, bot.decks, Discord);
                break;

                case "viewshop":
                    bot.commands.get('viewshop').execute(msg, con, Discord);
                break;

                case "shopbuy":
                    bot.commands.get('shopbuy').execute(msg, con, args);
                break;

                case "missing":
                    bot.commands.get('missing').execute(msg, args, con, Discord, bot.packs, bot.packTypes);
                break;

                case "restart":
                    bot.commands.get('restart').execute(msg);
                break;

                case "invite":
                    bot.commands.get('invite').execute(msg);
                break;
            }
        }
    }
});

bot.login(token);