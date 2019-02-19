'use strict';

let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'howfurry',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var amountOfFurry = 0;
            var howFurryCommand = msg.content.split(' ').splice(1).join(' ')
            if (howFurryCommand.includes('400303913456107520')) {
                amountOfFurry = 200;
            }else if (howFurryCommand.includes('222882552472535041')) {
                amountOfFurry = 100;
            }else if (howFurryCommand.includes('158750488563679232')) {
                amountOfFurry = 100;
            }else if (howFurryCommand.includes('439373663905513473')) {
                amountOfFurry = 100;
            }else if (howFurryCommand.includes('267494526359306241')) {
                amountOfFurry = 25;
            }else if (howFurryCommand.includes('69')) {
                amountOfFurry = 69;
            }else if (howFurryCommand.includes('416274552126177282')) {
                amountOfFurry = 100;
            }else if (howFurryCommand.includes('225405394644631552')) {
                amountOfFurry = 100;
            }else {
                amountOfFurry = Math.floor(Math.random() * 101);
            }
            if (amountOfFurry === 0) {
                client.createMessage(msg.channel.id, howFurryCommand + ' is not a furry.')
            }else {
                if (amountOfFurry === 69) {
                    client.createMessage(msg.channel.id, howFurryCommand + ' is: ' + amountOfFurry + '% furry ( ͡° ͜ʖ ͡°)\n' + ':fox:'.repeat(amountOfFurry))
                }else {
                    client.createMessage(msg.channel.id, howFurryCommand + ' is: ' + amountOfFurry + '% furry\n' + ':fox:'.repeat(amountOfFurry))
                }
            }
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'howfurry.',
        usage: '(literally anything)'
    }
}