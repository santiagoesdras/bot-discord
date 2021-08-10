const cheerio = require("cheerio");
const request = require("request-promise");
const { Client, MessageEmbed} = require('discord.js');
const client = new Client();
const config = require('../config.json');
const axios = require('axios');
require('dotenv').config();
const commands = require('./command/command');

const prefix = config.PREFIX;

// Bot listenning messages
client.on('ready', () => {
    console.log("Bot ready");
});

client.on('message', msg => {
    let minuscula = msg.content.toLowerCase();

    if (minuscula === `${prefix}chiste`) {
        let number = parseInt((Math.random() * 10));

        if (number <= 8) {
            console.log(number);
            msg.reply(chistes[number]);
            msg.react("👍");
        }
        else if (number > 8) {
            msg.reply('Se me acabaron los chistes xd \n;(');
            console.log(number);
            msg.react("👎");
        }
    } else if (minuscula === `${prefix}help`) {
        
        const embed = new MessageEmbed();
        const availableCommands = commands.map((command) => command.command);

        embed
            .setColor('#0099ff')
            .setTitle('Comandos disponibles :sunglasses:')
            .setDescription(availableCommands);

        msg.reply(embed);

    } else if (minuscula === prefix + 'perdon') {
        msg.channel.send(`${msg.author} SI TE HE FALLADO TE PIDO PERDON DE LA UNICA FORMA QUE SE, DIJO EL CHAYANNE \nPAPI JUANCHO              :eyes:\n                                    :love_you_gesture:  :tongue: :v:`);
    }

    else if (minuscula === `${prefix}kenethcoins`) {
        const embed = new MessageEmbed();
        embed
            .setColor('#0EE500')
            .setTitle('Tu cantidad de kenethcoins son: :money_mouth:')
            .setDescription('0$ pobre, con razon vives debajo de un puente');

        msg.reply(embed);

    } else if (minuscula === prefix + 'command') {
        async function init() {
            const numero = parseInt(Math.random() * 45);
            const numerorest = (numero - 1);
            const $ = await request({
                uri: "http://www.todohumor.com/chistes/",
                transform: body => cheerio.load(body)
            });
            const chiste_ = $('div.card-inner').find('p').each((i, el) => {
                if (i < numero) {

                    if (i === numerorest) {
                        var arreglo = $(el).text().trim();

                        arreglo === '' ? init() : msg.channel.send($(el).text().trim())
                    }
                }
            });

        }
        init();
    } else if (minuscula === prefix + 'nipedo') {
        msg.channel.send('/tts message:  oli')
    }

    if (minuscula === prefix + 'que bot es mejor?') {
        msg.channel.send('El del poderosisimo admin Juancho1pistolas\nPasense por mi twitch\nhttps://www.twitch.tv/juancho1pistolas');
    }
    else if (minuscula === prefix + 'hora') {
        msg.reply('Esto de momento no funciona porfavor deja de spamear esto.');
    }
    else if (minuscula === `${prefix}senosfuekeneth`) {
        msg.channel.send('SENOS fue keneth     :blond_haired_woman:\n                          :muscle:  :melon: :melon: :right_facing_fist: \n                                 :leg:   :leg:');
    }
    else if (minuscula === prefix + 'perdon') {
        msg.channel.send(`${msg.author} SI TE HE FALLADO TE PIDO PERDON DE LA UNICA FORMA QUE SE, DIJO EL CHAYANNE \nPAPI JUANCHO              :eyes:\n                                    :love_you_gesture:  :tongue: :v:`);
    } else if (minuscula === `${prefix}avatar`) {
        msg.reply(msg.author.displayAvatarURL());
    }
    else if (minuscula === prefix + 'ping') {
        msg.channel.send('pong')
    }

    else if (minuscula === prefix + 'hello' || minuscula === prefix + 'hola') {
        msg.channel.send(`Hello world ${msg.author}`);
    }

    else if (minuscula.includes('!test')) {
        msg.channel.send('Glad you are testing');
    }

    else if (minuscula === prefix + 'twitch') {
        msg.channel.send('https://www.twitch.tv/juancho1pistolas');
        msg.channel.send('https://www.instagram.com/juancho_1pistolas/');
    }

    else if (minuscula === prefix + 'spam') {
        const member = msg.mentions.users.first();
        if (member) {
            contar(1);
            async function contar(i) {
                var i = this.i;
                for (i = 0; i <= 100; i++) {
                    await msg.channel.send(`${member}`);
                }
            }
        }
        else {
            msg.channel.send("No pusiste al usario para spamear");
        }

    }
    else if (minuscula === prefix + 'papi juancho') {
        msg.channel.send("PAPI JUANCHO              :eyes:\n                                    :love_you_gesture:  :tongue: :v:");
    }
    else if (minuscula === prefix + 'adios') {
        msg.channel.send('Descansa ella te esta amando y te amara simpre, de lo contrario yo te amo');
    }
    // Deleting 100 messages
    else if (msg.content.startsWith('!clean')) {
        async function clear() {
            try {
                // await msg.delete();
                const fetched = await msg.channel.fetch({ limit: 99 });

                msg.channel.bulkDelete(fetched);;
                console.log('Messages deleted');
            }
            catch (e) {
                console.log(e);
            }
        }
        clear();
    }
    else if (msg.content.startsWith("!servers")) {
        /* function servers() {
            axios({
                method: 'get',
                url: 'https://xivapi.com/servers',
            })
                .then((res) => console.log(res.data));
        } */
        const getServers = async() =>{
            const servers = (await axios.get('https://xivapi.com/servers')).data;
            msg.reply(servers);
    } 
        getServers();
    }
});

client.login(process.env.BOT_TOKEN);
