'use strict';

var wait = false;
let nums = require('../functions/numbers');
let u_wut_m8 = require('../.auth.json');

module.exports = {
    name: 'messageCreate',

    exec: (client, msg) => {
        ++nums.msgsRead
        if (msg.channel.guild.id === '400304296119500811' && msg.channel.id === '456399054969110528' && !wait) {
            wait = true;
            setTimeout(() => {
                client.executeWebhook('551189401582043136', u_wut_m8.tfnWebhook, {
                    content: 'hi',
                    embeds: [
                        {
                            title:'hi',
                            author: {
                                name: 'hi'
                            },
                            footer: {
                                text: 'hi'
                            },
                            description: 'hi',
                            fields: [
                                {
                                    name: 'hi',
                                    value: 'hi'
                                }
                            ]
                        }
                    ]
                });
                wait = false;
            }, 3600000);
        }
    }
}