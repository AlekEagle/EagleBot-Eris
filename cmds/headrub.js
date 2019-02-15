'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');
let owners = require('../functions/getOwners');
let guildCount = require('../functions/getGuilds');
let eco = require('../functions/economy');
let prefixes = require('../functions/getPrefixes');
let toHHMMSS = require('../functions/toReadableTime');

module.exports = {
    name: 'headrub',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var headrubslist = [
                'http://31.media.tumblr.com/6cccbad91b425c421ae18a1108d03e88/tumblr_ni12jgvWEy1szc9g2o2_500.gif',
                'https://alekeagle.tk/screenshots/3ldrk.gif',
                'https://alekeagle.tk/screenshots/8okvkfk0GD.gif',
                'https://alekeagle.tk/screenshots/tenor.gif'
            ]
            msg.channel.createMessage({
                content:`${msg.author.username} gave ${msg.content.split(' ').splice(1).join(' ')} headrubs owo`,
                embed: {
                    image: {
                        url: headrubslist[Math.floor(Math.random() * headrubslist.length - 1)]
                    }
                }
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
        fullDescription: 'gives people headrubs'
    }
}