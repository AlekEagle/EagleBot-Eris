'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');
let musicUtils = require('../functions/musicUtils');

module.exports = {
    name: 'play',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var args = msg.content.split(' ').splice(1)
            let voiceChannel =msg.member.guild.channels.get(msg.member.voiceState.channelID);
            if (!msg.member.voiceState.channelID) {
                msg.channel.createMessage('You heff to join a voice channel lol.');
                return;
            }else if (!voiceChannel.permissionsOf(client.user.id).has('voiceConnect')) {
                msg.channel.createMessage('I heff to be able to join the voice channel with you lol.');
                return;
            }else if (!voiceChannel.permissionsOf(client.user.id).has('voiceSpeak')) {
                msg.channel.createMessage('I heff to be able to __play__ the music yknow? Not just be some random bot sitting a voice channel with you, being absloutely silent, since I can\'t speak in there.');
                return;
            }else if (!msg.content.split(' ').splice(1).join(' ')) {
                msg.channel.createMessage('Umm, what do you want me to play? Thats the only function of this command after all.');
                return;
            }else if (!musicUtils.servers[msg.member.guild.id]) {
                musicUtils.servers[msg.member.guild.id] = {
                    queue : []
                };
            }
         
            let searchQuery = 'ytsearch:';
         
            if (args[0] === 'search') {
                for (let i = 1; i < args.length; i++) {
                    searchQuery += args[i] + ' ';
                }
            }else {
                searchQuery = args[0];
            }
         
            musicUtils.getInfo(client, console, msg, voiceChannel, searchQuery);
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'Play music!',
        usage: '(search {search terms}|URL)',
        guildOnly: true
    }
}