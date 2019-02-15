'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');
let owners = require('../functions/getOwners');
let eco = require('../functions/economy');

module.exports = {
    name: 'givemoney',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            if (owners.isOwner(msg.author.id)) {
                var username = ''
                var valid = true;
                try {
                    username = client.users.get(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).username
                }catch(err) {
                    if (err ) {
                        valid = false;
                        return 'Not a valid user!'
                    }
                }
                if (valid) {
                    eco.readWal(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).then((nonExecWal) => {
                        eco.updateWal(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, ''), parseInt(nonExecWal.money) + parseInt(msg.content.split(' ')[2]), nonExecWal.spinner)
                        msg.channel.createMessage(`Gave ${username} ${msg.content.split(' ')[2]} e-bucks!`)
                    }, (err) => {
                        eco.updateWal(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, ''), parseInt(msg.content.split(' ')[2]), 0)
                        msg.channel.createMessage(`Gave ${username} ${msg.content.split(' ')[2]} e-bucks!`)
                    });
                }
            }else {
                var username = ''
                var valid = true;
                try {
                    username = client.users.get(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).username
                }catch(err) {
                    if (err) {
                        valid = false;
                        return 'Not a valid user!'
                    }
                }
                if (valid) {
                    eco.readWal(msg.author.id).then((cmdExecWal) => {
                        if (parseInt(cmdExecWal.money) < parseInt(msg.content.split(' ')[2])) {
                            msg.channel.createMessage(`You do not have enough e-bucks to give ${username} ${msg.content.split(' ')[2]} e-bucks!`)
                        }else if (parseInt(msg.content.split(' ')[2]) < 1) {
                            readWal(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, '')).then((nonExecWal) => {
                                eco.updateWal(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, ''), parseInt(nonExecWal.money) + parseInt(msg.content.split(' ')[2]), nonExecWal.spinner)
                                eco.updateWal(msg.author.id, parseInt(cmdExecWal.money) - parseInt(msg.content.split(' ')[2]), cmdExecWal.spinner)
                                msg.channel.createMessage(`Gave ${username} ${msg.content.split(' ')[2]} e-bucks!`)
                            }, (err) => {
                                eco.updateWal(msg.content.split(' ')[1].replace(/</g, '').replace(/@/g, '').replace(/!/g, '').replace(/>/g, ''), parseInt(msg.content.split(' ')[2]), 0)
                                eco.updateWal(msg.author.id, parseInt(cmdExecWal.money) - parseInt(msg.content.split(' ')[2]), cmdExecWal.spinner)
                                msg.channel.createMessage(`Gave ${username} ${msg.content.split(' ')[2]} e-bucks!`)
                            });
                        } else {
                            msg.channel.createMessage('You can\'t give someone anything less than 0 e-bucks.')
                        }
                    }, (err) => {
                        eco.updateWal(msg.author.id, 0, 0)
                        msg.channel.createMessage(`You do not have enough e-bucks to give ${username} ${msg.content.split(' ')[2]} e-bucks!`)
                    });
                }
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
        fullDescription: 'give e-bucks to other users!',
        usage: '(user mention) (money)'
    }
}