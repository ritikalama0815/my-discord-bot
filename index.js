const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { Client, Collection, GatewayIntentBits, Events, Message} = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);//reads the path to dir and returns an array of all 
    //the folders names it contains
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);//helps to construct a path to commands in dir
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));//reads the path to this dir and returns an
    //array of all the file names they contain

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if('data' in command && 'execute' in command){
            client.commands.set(command.data.name, command);
        } else{
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

//when client ready, run this code once
client.once(Events.ClientReady, readyClient => {
    console.log('Ready! Logged in as ${readyClient.user.tag}'); 
});

//when interaction is created, run this code
const wait = require('node:timers/promises').setTimeout;
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'ping') {
       //await interaction.deferReply(); -> use for deferring reply 
        await interaction.reply('Pong!');
        await wait(2_000);
        await interaction.editReply('Pong! (edited)');
    }

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command){
        console.error('No command matching ${interaction.commandName} found.');
        return;
    }

    const { cooldowns } = interaction.client;
    
    if(!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, new Collection());
    }
    
    const now = Date.now(); //current timestamp
    const timestamps = cooldowns.get(command.data.name); //a reference to the collection of user ids and timestamps
    const defaultCooldownDuration = 2;
    const coolDownAmount = (command.cooldown ?? defaultCooldownDuration) * 1_000; //specified cooldown
    
    if(timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + coolDownAmount;
    
        if(now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return interaction.reply({ content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.data.name}\` command.`, flags: MessageFlags.Ephemeral });
        }
    }
    
    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), coolDownAmount);
    
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if(interaction.replied || interaction.deferred){
            await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
        }else{
        await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });}
    }
}
); 

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event =
        require(filePath);
    if (event.once) {
        //client class extents EventEmitter so client object exposes tjhe on and once methods
        //that you can register event listeners
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        //callback function that takes arguments returned by its respective event, collect
        //them in args array using ... then calls event.execute
        //used because different events can have different number of arguments
        client.on(event.name, (...args) => event.execute(...args));
    }
}
// Login to Discord with your client's token

client.login(token);