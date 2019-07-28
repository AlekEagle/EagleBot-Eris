'use strict';

let manager = require('../functions/blacklistManager');
let eco = require('../functions/economy');

module.exports = {
    name: 'spinner',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            if (msg.content.split(' ')[1] === undefined) {
                var displayTime = 0;
                var spinTime = 0
                eco.readWal(msg.author.id).then((wal) => {
                    switch(wal.spinner) {
                        case '0':
                            displayTime = Math.floor(Math.random() * 277);
                            spinTime = displayTime * 1000
                        break;
                        case '1':
                            displayTime = Math.floor(Math.random() * 455);
                            spinTime = displayTime * 1000
                        break;
                        case '2':
                            displayTime = Math.floor(Math.random() * 633);
                            spinTime = displayTime * 1000
                        break;
                    }
                }, () => {
                    updateWal(msg.author.id, 0, 0)
                    displayTime = Math.floor(Math.random() * 277);
                    spinTime = displayTime * 1000
                });
                client.createMessage(msg.channel.id, 'I spun your spinner! let\'s see how long it spins for!').then((message) => {
                    setTimeout(() => {
                        client.editMessage(message.channel.id, message.id, `Wow, your spinner spun for ${displayTime.toString().toHHMMSS()}!`)
                    }, spinTime);
                })
            }else if (msg.content.split(' ')[1] === 'upgrade') {
                readWal(msg.author.id).then((wal) => {
                    switch(wal.spinner) {
                        case '0':
                            if (parseInt(wal.money) < 1000) {
                                msg.channel.createMessage(`You can't upgrade your fidget spinner! you need ${1000 - parseInt(wal.money)} more e-bucks!`)
                            }else {
                                eco.updateWal(msg.author.id, parseInt(wal.money) - 1000, parseInt(wal.spinner) + 1)
                                msg.channel.createMessage('1000 e-bucks have been taken from your account, you now have ' + (parseInt(wal.money) - 1000) + ' e-bucks and your fidget spinner has been upgraded to level 1!')
                            }
                        break;
                        case '1':
                            if (parseInt(wal.money) < 5000) {
                                msg.channel.createMessage(`You can't upgrade your fidget spinner! you need ${5000 - parseInt(wal.money)} more e-bucks!`)
                            }else {
                                eco.updateWal(msg.author.id, parseInt(wal.money) - 5000, parseInt(wal.spinner) + 1)
                                msg.channel.createMessage('5000 e-bucks have been taken from your account, you now have ' + (parseInt(wal.money) - 5000) + ' e-bucks and your fidget spinner has been upgraded to level 2!')
                            }
                        break;
                        case '2':
                            msg.channel.createMessage('Your spinner is at max!')
                        break;
                    }
                }, () => {
                    eco.updateWal(msg.author.id, 0, 0)
                    msg.channel.createMessage('You can\'t upgrade your fidget spinner! you need 1000 more e-bucks!')
                });
            }
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'spin a fidget spinner, use the economy to upgrade your spinner!',
        usage: '[upgrade]'
    }
}