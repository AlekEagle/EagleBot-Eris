'use strict';

let manager = require('../functions/blacklistManager');
let eco = require('../functions/economy');

module.exports = {
    name: 'wallet',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var walletID = ''
            if (msg.content.split(' ')[1] !== undefined) {
                walletID = msg.content.split(' ').splice(1).join(' ').replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')
            }else {walletID = msg.author.id}
            eco.readWal(walletID).then((wal) => {
                if (walletID === msg.author.id) {
                    client.createMessage(msg.channel.id, `You have ${wal.money} e-bucks and a level ${wal.spinner} fidget spinner.`)
                }else if (walletID !== msg.author.id) {
                    client.createMessage(msg.channel.id, `${client.users.get(walletID).username} has ${wal.money} e-bucks and a level ${wal.spinner} fidget spinner.`)
                }
            }, () => {
                if (walletID !== msg.author.id) {
                    msg.channel.createMessage('I cannot find a wallet linked with that ID')
                }else {
                    updateWal(msg.author.id, 0, 0)
                    msg.channel.createMessage('You have 0 e-bucks and a level 0 fidget spinner.')
                }
            });
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'Shows how much e-bucks you or another person has',
        aliases: [
            'wal',
            'money',
            'ebucks'
        ]
    }
}