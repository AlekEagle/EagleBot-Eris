'use strict';

const fs = require('fs');
let manager = require('../functions/blacklistManager');
let eco = require('../functions/economy');
const Logger = require('./functions/logger');
const console = new Logger();

module.exports = {
    name: 'curecancer',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            eco.readWal(msg.author.id).then((wal) => {
                if (parseInt(wal.money) < 100) {msg.channel.createMessage(`You do not have enough e-bucks for research! you need at least ${100 - parseInt(wal.money)} more e-bucks!`)}else {
                    eco.updateWal(msg.author.id, parseInt(wal.money) - 100, wal.spinner)
                    var rNG  = Math.floor(Math.random() * 100);
                    // var rNG = 100;
                    if (rNG < 99) {
                        client.createMessage(msg.channel.id, ':skull: You spend 100 e-bucks on research. But, you still died. The ironic part is you died from cancer. I\'m not sure you\'re able to cure cancer, but keep on trying!')
                    }else {
                        client.createMessage(msg.channel.id, 'You spent 100 e-bucks on research and somehow cured all types of cancer! <@' + msg.author.id + '> actually did it! *We all thought you were crazy*')
                        fs.readFile('cancercured.txt', function(err, data) {
                            var string = data.toString('utf8')
                            var numForCancer = parseInt(string)
                            fs.writeFile('cancercured.txt', ++numForCancer)
                        });
                    }
                }
            }, err => {
                console.error(err)
            });
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'This will cure cancer (not really), you have a 1 in 100 chance of it actually happening.'
    }
}