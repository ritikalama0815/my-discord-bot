const {SlashCommandBuilder} = require('@discordjs/builders');

const data = new SlashCommandBuilder() 
    .setName('gif')
    .setDescription('Sends a random gif')
    .addStringOption(option => 
        option.setName('category')
            .setDescription('What category of gif?')
            .setRequired(true)
            .addChoices(
                { name: 'funny', value: 'funny' },
                { name: 'sad', value: 'sad' },
                { name: 'happy', value: 'happy' }
            ));
   
    