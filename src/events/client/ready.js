const Event = require('../../structures/Event');
const { ActivityType } = require('discord.js');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {
        console.log(`✅ ${this.client.user.username} logado com sucesso em ${this.client.guilds.cache.size} servidores!`) //info que aparece no terminal ao iniciar o bot
        this.client.user.setPresence({ activities: ({ name: 'aaaaaaaaaa', type: ActivityType.Watching })}) //defina o name para aparecer na presence do bot.
        this.client.user.setStatus('online') //status do bot, veja no discord.js as outras opções
        this.client.registryCommands()
        await this.client.connectToDatabase()
    }
}