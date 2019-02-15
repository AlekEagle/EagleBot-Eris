'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');
let owners = require('../functions/getOwners');
let guildCount = require('../functions/getGuilds');
let eco = require('../functions/economy');
let prefixes = require('../functions/getPrefixes');
let toHHMMSS = require('../functions/toReadableTime');

module.exports = {
    name: 'duck',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var duckSearch = {
                url: 'https://e621.net/post/index.json?tags=order:random+rating:s+duck',
                headers: {
                    'User-Agent': `EagleBot-Eris/${process.version} (by CantCreative on e621)`
                }
            }
        client.sendChannelTyping(msg.channel.id)
        request(duckSearch, (error, res, body) => {
            if (!error && res.statusCode == 200) {
                var duckSearchResults = JSON.parse(body);
                if(typeof (duckSearchResults[0]) != "undefined") {
                    msg.channel.createMessage({
                        embed: {
                            title: 'Here is your duck kind sir. This duck has been voted for President ' + duckSearchResults[0].score + ' times',
                            url: 'https://e621.net/post/show/' + duckSearchResults[0].id.toString(),
                            image: {
                                url: duckSearchResults[0].file_url.toString()
                            }
                        }
                    })
                }else {
                    msg.channel.createMessage('notfin, idk if i looked for the right stuff.')
                }
            }else {
                msg.channel.createMessage('I tried talkin to e621, but they told me to go away.')
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
        fullDescription: 'random picture of a duck, courtesy of e621'
    }
}