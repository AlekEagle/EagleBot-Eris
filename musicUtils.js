'use strict';

// Import dependencies
const axios = require('axios');
const moment = require('moment');
const lavalinkConfig = {
    'nodes': [
        {'host': 'lavalink', 'port': 8080, 'region': 'us', 'password': 'canudontstealthiskthx'}
    ],
    'regions': {
        "eu": ["eu", "amsterdam", "frankfurt", "russia", "hongkong", "singapore", "sydney"],
        "us": ["us", "brazil"]
    }
}

module.exports = {
    servers: [],

    resolveTracks: async (logger, node, searchQuery) => {
        let result = await axios.get(`http://${node.host}:2333/loadtracks?identifier=${searchQuery}`, {
            headers: {
                'Authorization': node.password,
                'Accept': 'application/json'
            }
        });

        if (!result) {
            throw new Error('Unable to play the video!');
        }
        return result.data;
    },

    getPlayer: (bot, logger, channel) => {
        if (!channel || !channel.guild) {
            throw new Error('No guild channel');
        }

        let player = bot.voiceConnections.get(channel.guild.id);
        if (player) return player;

        let options = {};
        if (channel.guild.region) {
            options.region = channel.guild.region;
        }

        return bot.joinVoiceChannel(channel.id, options);
    },

    playMusic: async (bot, logger, msg, voiceChannel) => {
        let player =  await module.exports.getPlayer(bot, logger, voiceChannel);

        player.setVolume(45);

        let playSong = () => {
            player.play(module.exports.servers[msg.member.guild.id].queue[0].track);
            msg.channel.createMessage(`Now playing **[${module.exports.servers[msg.member.guild.id].queue[0].title} by ${module.exports.servers[msg.member.guild.id].queue[0].author} [${module.exports.servers[msg.member.guild.id].queue[0].length}]](${module.exports.servers[msg.member.guild.id].queue[0].url})** requested by **${module.exports.servers[msg.member.guild.id].queue[0].requester.username}#${module.exports.servers[msg.member.guild.id].queue[0].requester.discriminator}**`)
        };

        player.on('end', () => {
            msg.channel.createMessage(`Finished **[${module.exports.servers[msg.member.guild.id].queue[0].title} by ${module.exports.servers[msg.member.guild.id].queue[0].author} [${module.exports.servers[msg.member.guild.id].queue[0].length}]](${module.exports.servers[msg.member.guild.id].queue[0].url})** requested by **${module.exports.servers[msg.member.guild.id].queue[0].requester.username}#${module.exports.servers[msg.member.guild.id].queue[0].requester.discriminator}**`)
        });
        module.exports.servers[msg.member.guild.id].queue.shift(); // Remove from queue
        if (module.exports.servers[msg.member.guild.id].queue[0]) {
            playSong();
        } else {
            msg.channel.createMessage('Queue ended, leaving voice channel. :wave:')
            voiceChannel.leave(); // Leave voice channel
        }

        player.on('error', err => {
            logger.error(err);
        });

        player.on('disconnect', err => {
            logger.error(err);
        });

        playSong();
    },

    getInfo: async (bot, logger, msg, voiceChannel, searchQuery) => {
        let tracks = await module.exports.resolveTracks(logger, lavalinkConfig.nodes[0], searchQuery);
        if (tracks.length === 0) {
            msg.channel.createMessage('According to my research, that song does not exist.');
            return;
        }
        let song = {
            title: tracks[0].info.title,
            author: tracks[0].info.author,
            url: tracks[0].info.uri,
            length: moment.utc(tracks[0].info.lengh * 1000).format('HH:mm:ss'),
            requester: msg.author,
            channel: msg.channel,
            track: tracks[0].track
        };
        module.exports.servers[msg.member.guild.id].queue.push(song);

        let songAdded = module.exports.servers[msg.member.guild.id].queue[module.exports.servers[msg.member.guild.id].queue.length - 1];

        msg.channel.createMessage(`Song added **[${songAdded.title} by ${songAdded.author} [${songAdded.length}]](${songAdded.url})** requested by **${songAdded.requester.username}#${songAdded.requester.discriminator}** has been added to queue at position #${module.exports.servers[msg.member.guild.id].queue.length}`);

        if (!module.exports.servers[msg.member.guild.id].queue[1]) {
            module.exports.playMusic(bot, logger, msg, voiceChannel);
        }
    }
};