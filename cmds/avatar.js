'use strict';

let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'avatar',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var avatarLol = msg.content.replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '').split(' ').splice(1).join(' ')
            try{
                if (!avatarLol) {
                    avatarLol = msg.author.id;
                }
                var type = '';
                if (client.users.get(avatarLol).avatarURL.includes('gif')) {
                    type = 'gif'
                }else {type = 'png'}
                client.createMessage(msg.channel.id, {embed: {
                    title: client.users.get(avatarLol).username + '#' + client.users.get(avatarLol).discriminator + '\'s avatar (click for link to avatar)',
                    url: client.users.get(avatarLol).dynamicAvatarURL(type, 2048),
                    image: {
                        url: client.users.get(avatarLol).dynamicAvatarURL(type, 2048)
                    }
                }});
            }catch (err) {
                client.createMessage(msg.channel.id, 'I can\'t seem to find a avatar for that person. Hmm')
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
        fullDescription: 'gets a user/bot\'s avatar',
        usage: '[@mention|ID]'
    }
}