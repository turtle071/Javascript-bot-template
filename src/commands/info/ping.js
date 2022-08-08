const Command = require('../../structures/Command');
const { ApplicationCommandType } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'mostra o ping do bot',
            type: ApplicationCommandType.ChatInput
        })
    }

    run = async (interaction) => {
        interaction.reply(`O ping do bot é \`${this.client.ws.ping}\` ms`)
    }
}