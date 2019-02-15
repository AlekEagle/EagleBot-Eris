'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');
let request = require('request');

module.exports = {
    name: 'ytsearch',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var ytSearch = {
                'url': `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${msg.content.split(' ').splice(1).join(' ')}&safeSearch=strict&type=video&key=${u_wut_m8.ytauth}&maxResults=50`,
                'headers': {
                    'User-Agent': `EagleNugget/${process.version} (AlekEagle YT on Google)`
                    }
                }
                request(ytSearch, (error, res, body) => {
                     if (!error && res.statusCode === 200) {
                        var ytSearchRes = JSON.parse(body);
                        var randomizer = parseInt(ytSearchRes.items.length)
                        if (randomizer > 50) {randomizer = 50}
                        if (ytSearchRes.items.length !== 0) {
                            var vidChooser = Math.floor(Math.random() * randomizer);
                            if (vidChooser === 50) {vidChooser = 49}
                            msg.channel.createMessage({
                                embed: {
                                    title: `${ytSearchRes.items[vidChooser].snippet.title} by ${ytSearchRes.items[vidChooser].snippet.channelTitle}`,
                                    description: `${ytSearchRes.items[vidChooser].snippet.description}`,
                                    image: {
                                        url: `https://i.ytimg.com/vi/${ytSearchRes.items[vidChooser].id.videoId}/hqdefault.jpg`
                                    },
                                    url: `https://youtu.be/${ytSearchRes.items[vidChooser].id.videoId}`
                                }
                            })
                        }else {
                            return 'I smell no videos by that name.'
                        }
                    }
                })
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'Search Youtube videoss!',
        usage: '(search term)'
    }
}