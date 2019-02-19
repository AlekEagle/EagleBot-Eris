'use strict';

let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'fakecopypasta',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var username = '',
            discriminator = '';
        try {
            username = client.users.get(msg.content.split(' ').splice(1).join(' ').replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).username;
            discriminator = client.users.get(msg.content.split(' ').splice(1).join(' ').replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).discriminator;
        }catch (err) {
            return 'That user is invalid!';
        }
        msg.channel.createMessage(`Look out for a Discord user by the name of "${username}" with the tag #${discriminator}. He is going around sending friend requests to random Discord users, and those who accept his friend requests will have their accounts DDoSed and their groups exposed with the members inside it becoming a victim aswell. Spread the word and send this to as many discord servers as you can. If you see this user, DO NOT accept his friend request and immediately block him.\nOur team is currently working very hard to remove this user from our database, please stay safe.\n\n-Discord team.`)
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'One of those fake "watch out for x user" copypastas'
    }
}