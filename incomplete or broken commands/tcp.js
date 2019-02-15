'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');

module.exports = {
    name: 'tcp',

    exec: (client, msg, args) => {
        ++nums.cmdsRan
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var tcpargs = msg.content.split(' ').splice(1)
            switch(tcpargs[0]) {
                case 'connect':
                    if (tcpOwner === '') {
                        tcpClient.connect(tcpargs[2], tcpargs[1], function() {
                            client.createMessage(msg.channel.id, `Connected to host: ${tcpargs[1]}:${tcpargs[2]}.`)
                            client.getDMChannel(msg.author.id).then((message) => {
                                tcpOwner = message.id;
                                tcpOwnerID = msg.author.id;
                            });
                        });
                        tcpClient.on('error', (err) => {
                            client.createMessage(msg.channel.id, 'Unable to connect')
                        });
                    }else {
                        client.createMessage(msg.channel.id, 'The TCP client is in use right now!')
                    }
                break;
                case 'send':
                    if (tcpOwner !== '' && tcpOwnerID === msg.author.id) {
                        tcpClient.write(tcpargs.splice(1).join(' '))
                        client.createMessage(msg.channel.id, 'Sent!')
                    }else if (tcpOwnerID === '') {
                        client.createMessage(msg.channel.id, 'The TCP client is not connected right now! use `a}tcp connect <ip> <port>` to connect!')
                    }else {
                        client.createMessage(msg.channel.id, 'You are not the owner of the TCP Client!')
                    }
                break;
                case 'disconnect':
                    if (tcpOwnerID !== '' && tcpOwnerID === msg.author.id) {
                        tcpClient.destroy();
                    }else if (tcpOwnerID !== msg.author.id) {
                        client.createMessage(msg.channel.id, 'You are not the owner of the current session!')
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
        fullDescription: 'A TCP Client!',
        usage: '(connect|send|disconnect)'
    }
}