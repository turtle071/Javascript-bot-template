const { Client } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const mongoose = require('mongoose');
const Models = require('../database/models/models');

module.exports = class extends Client {
    constructor (options) {
        super(options)

        this.commands = []
        this.loadCommands()
        this.loadEvents()
    };

    registryCommands() {
        this.application.commands.set(this.commands)  //seta os comandos do bot para serem globais
    };

    loadCommands(path = 'src/commands') {
        const categories = readdirSync(path);

        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (commandClass)(this)

                this.commands.push(cmd)
            }
        
        }

    };

    loadEvents(path = 'src/events') { 
            const categories = readdirSync(path);
    
            for (const category of categories) {
                const events = readdirSync(`${path}/${category}`)
    
                for (const event of events) {
                    const eventClass = require(join(process.cwd(), `${path}/${category}/${event }`))
                    const evt = new (eventClass)(this)

                    this.on(evt.name, evt.run)

            }
         }
    }

    async connectToDatabase() {
        const connection = await mongoose.connect(process.env.MONGO_URL, { //aqui ele vai pegar pela .env a sua key do mongodb
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('database connected') //caso a key esteja certa será exibido no terminal ao ligar o bot

        this.db = { connection, ...Models }
    }
};