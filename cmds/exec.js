'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');
let owners = require('../functions/getOwners');

module.exports = {
    name: 'exec',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            if (owners.isOwner(msg.author.id)) {
                var execstuff = msg.content.split(' ').splice(1).join(' ')
                client.createMessage(msg.channel.id, 'Executing please wait... <a:loading1:470030932775272469>').then((message) => {
                    exec(execstuff, (err, stdout, stderr) => {
                        if (err != undefined) {
                            client.editMessage(message.channel.id, message.id, 'OOF I BROKE: ```' + err + '```')
                        }else {
                            if (stdout.length > 2000) {
                                client.editMessage(message.channel.id, message.id, 'Output too large, goto https://alekeagle.tk/exec_out.').then(() => {
                                fs.writeFile('../node_server/root/exec_out/exec_output.txt', stdout.replace(client.token, "(insert token here)"), (err) => {
                                    if (err != undefined) {
                                        client.createMessage(message.channel.id, 'An error occurred while this action was being preformed error code: `' + err.code + '`')
                                    }
                                });
                            });
                            }else {
                                if (stdout === '') {
                                    client.editMessage(message.channel.id, message.id, 'Done')
                                }else {
                                    client.editMessage(message.channel.id, message.id, stdout.replace(client.token, "(insert token here)"))
                                }
                            }
                        }
                    });
                });
            }else {
                return 'You need the permission `BOT_OWNER` to use this command!';
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
        fullDescription: 'executes shit (owner only)',
        usage: '(shit to execute)',
        aliases: [
            'ex',
            'execute'
        ],
        hidden: true
    }
}