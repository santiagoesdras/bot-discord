const cheerioModule = require("cheerio");
const request = require("request-promise");


module.exports = (client, message, args) => {
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

                    arreglo === '' ? init() : msg.reply($(el).text().trim())
                }
            }
        });

    }
    init();
    };