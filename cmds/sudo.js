'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');
let owners = require('../functions/getOwners');

module.exports = {
    name: 'sudo',

    exec: (client, msg, args) => {
        nums.cmdsRan = ++nums.cmdsRan
        var thing;
        if (owners.isOwner(msg.author.id)) {
            var args = msg.content.split(' ').splice(1)
            var userID = args[0].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')
            msg.channel.createMessage(`Executing \`${args[1]}\` as \`${client.users.get(userID).username}\`.`)
            var command = args[1]
            if (msg.channel.guild.members.get(userID) !== undefined) {
                msg.member = thing
            }
            msg.author = client.users.get(userID)
            msg.content = `a}${args.splice(1).join(' ')}`
            if (client.resolveCommand(command).execute(msg) !== undefined) {
                msg.channel.createMessage(client.resolveCommand(command).execute(msg))
            }
        }else if (!manager.gblacklist.users.includes(msg.author.id)) {
            client.createMessage(msg.channel.id, 'You need the permission `BOT_OWNER` to use this command!')
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from dad bot! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from dad bot! If you think this is a mistake, please go here https://alekeagle.tk/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        fullDescription: 'executes commands as other users (owner only)',
        usage: '(userID) (command) [command args]',
        hidden: true
    }
}