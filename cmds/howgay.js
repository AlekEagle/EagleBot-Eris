'use strict';

let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'howgay',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var amountOfGay = 0
            var howGayCommand = msg.content.split(' ').splice(1).join(' ')
            if (howGayCommand.includes('400303913456107520')) {
                amountOfGay = 150;
            }else if (howGayCommand.includes('244311039125094410')) {
                amountOfGay = 100;
            }else if (howGayCommand.includes('404148789314846721')) {
                amountOfGay = 100;
            }else if (howGayCommand.includes('454985083607056395')) {
                amountOfGay = 50;
            }else if (howGayCommand.includes('348577384678686721')) {
                amountOfGay = 0;
            }else if (howGayCommand.includes('366156674853240832')) {
                amountOfGay = 5;
            }else if (howGayCommand.includes('267494526359306241')) {
                amountOfGay = 25;
            }else if (howGayCommand.includes('69')) {
                amountOfGay = 69;
            }else {
                amountOfGay = Math.floor(Math.random() * 101);
            }
            if (amountOfGay === 0) {
                client.createMessage(msg.channel.id, howGayCommand + ' is not gay.')
            }else {
                if (amountOfGay === 69) {
                    client.createMessage(msg.channel.id, howGayCommand + ' is: ' + amountOfGay + '% gay ( ͡° ͜ʖ ͡°)\n' + '🏳️‍🌈'.repeat(amountOfGay))
                }else {
                    client.createMessage(msg.channel.id, howGayCommand + ' is: ' + amountOfGay + '% gay\n' + '🏳️‍🌈'.repeat(amountOfGay))
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
        fullDescription: 'shows how gay you or a friend are.',
        usage: '(literally anything)',
        
    }
}