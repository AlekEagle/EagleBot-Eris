'use strict';

let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'windows98',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var rng = Math.floor(Math.random() * 2)
            if (rng === 1) {
                console.log(rng)
                client.createMessage(msg.channel.id, 'Booting up please wait <a:loading1:470030932775272469>').then((mess) => {
                    setTimeout(() => {
                        client.editMessage(mess.channel.id, mess.id, 'OOF I CRASHED');
                    }, 60000)
                })
            }else {
                client.createMessage(msg.channel.id, 'Booting up please wait <a:loading1:470030932775272469>')
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
        fullDescription: 'will it boot up? try and see!'
    }
}