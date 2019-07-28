'use strict';

let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'userinfo',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            try {
                var userID = '';
                if (msg.content.split(' ')[1] === undefined) {userID = msg.author.id}else {userID = msg.content.split(' ').splice(1).join(' ').replace(/<@/g, '').replace(/!/g, '').replace(/>/g, '')}
                var createdat = new Date(client.users.get(userID).createdAt);
                var joinedat = new Date(msg.channel.guild.members.get(userID).joinedAt);
                var type = '';
                if (client.users.get(userID).avatarURL.includes('gif')) {
                    type = 'gif'
                }else {type = 'png'}
                var status = '';
                var gameType = '';
                var gameName = '';
                if (msg.channel.guild.members.get(userID).game === null) {gameType = 'Just';gameName = 'Nothing';}else if (msg.channel.guild.members.get(userID).game.type === 0) {gameType = 'Playing';gameName = msg.channel.guild.members.get(userID).game.name;}else if (msg.channel.guild.members.get(userID).game.type === 1) {gameType = 'Streaming';gameName = msg.channel.guild.members.get(userID).game.name;}else if (msg.channel.guild.members.get(userID).game.type === 2) {gameType = 'Listening To';gameName = msg.channel.guild.members.get(userID).game.name;}else if (msg.channel.guild.members.get(userID).game.type === 3) {gameType = 'Watching';gameName = msg.channel.guild.members.get(userID).game.name;}
                if (msg.channel.guild.members.get(userID).status === 'online') {status = '<:online:479044155184513047>'}else if (msg.channel.guild.members.get(userID).status === 'idle') {status = '<:idle:479044059134951425>'}else if (msg.channel.guild.members.get(userID).status === 'dnd') {status = '<:dnd:479044022757883907>'}else if (msg.channel.guild.members.get(userID).status === 'offline') {status = '<:offline:479044084829257753>'}
                client.createMessage(msg.channel.id, {
                    content: `Info for user\nUsername: \`${client.users.get(userID).username}#${client.users.get(userID).discriminator}\`\nID: \`${client.users.get(userID).id}\`\nAre They a Bot?: \`${client.users.get(userID).bot}\`\nNickname in server (if set): \`${msg.channel.guild.members.get(userID).nick ? msg.channel.guild.members.get(userID).nick : 'None'}\`\nCreated account at: \`${createdat}\`\nJoined At: \`${joinedat}\`\nStatus: ${msg.channel.guild.members.get(userID).status} ${status}\nGame: \`${gameType} ${gameName}\`\nProfile Picture:`,
                    embed: {
                        image: {
                            url: client.users.get(userID).dynamicAvatarURL(type, 1024)
                        }
                    }
                });
            }catch (err) {
                client.createMessage(msg.channel.id, 'It appears that the user you are trying to get info about is not in this server, please go into the server that the user is in to get their info')
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
        fullDescription: 'get user info',
        usage: '[@user|user id]'
    }
}