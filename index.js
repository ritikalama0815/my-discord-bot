const fs = require('fs');
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits, Message } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

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

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command){
        console.error('No command matching ${interaction.commandName} found.');
        return;
    }

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

client.login(token);