'use strict';

let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'remindme',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var time = msg.content.split(' ').splice(1);
            time = parseInt(time[0]);
            var waitTimeAmount = msg.content.split(' ').splice(2);
            waitTimeAmount = waitTimeAmount[0];
            var reminder = msg.content.split(' ').splice(3).join(' ');
            if (waitTimeAmount === 's') {time = (time * 1000)}else if (waitTimeAmount === 'sec') {time = (time * 1000)}else if (waitTimeAmount === 'm') {time = (time * 1000 * 60)}else if (waitTimeAmount === 'min') {time = (time * 1000 * 60)}else if (waitTimeAmount === 'h') {time = (time * 1000 * 60 * 60)}else if (waitTimeAmount === 'hr') {time = (time * 1000 * 60 * 60)}else if (waitTimeAmount === 'd') {time = (time * 1000 * 60 * 60 * 24)}else if (waitTimeAmount === 'day') {time = (time * 1000 * 60 * 60 * 24)}else if (waitTimeAmount === 'w') {time = (time * 1000 * 60 * 60 * 24 * 7)}else if (waitTimeAmount === 'week') {time = (time * 1000 * 60 * 60 * 24 * 7)}
            client.createMessage(msg.channel.id, 'I will remind you about that in ' + (time / 1000) + ' seconds.')
            setTimeout(() => {
                client.getDMChannel(msg.author.id).then((message) => {
                    client.createMessage(message.id, '<@' + msg.author.id + '> You asked me to remind you ' + time / 1000 + ' seconds ago about `' + reminder + '`')
                })
            }, time);
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'Reminds you of stuff! (only supports one time unit at the moment)',
        usage: '(time in numbers) ([s|sec]|[m|min]|[h|hr]|[d|day]) (reminder thing)'
    }
}