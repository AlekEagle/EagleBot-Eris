'use strict';

const owners = require('../functions/getOwners');
const request = require('request');
let nums = require('../functions/numbers');

module.exports = {
    name: 'reloadevts',

    exec: (client, msg, args) => {
        if (owners.isOwner(msg.author.id)) {
            msg.channel.createMessage('Reloading event handlers. This may take a bit...')
            for (let thing = 0; thing < nums.shardCount; thing ++) {
                request({
                    method: 'GET',
                    url: `http://127.0.0.1:3203${thing}/reloadevts`
                }, (err, res, body) => {
                    if (err) {
                        console.error('can\'t connect to the other shards')
                        console.error(err)
                    }
                })
            }
        }
    },

    options: {
        description: 'Reloads event handlers',
        fullDescription: 'Reloads reloads event handlers (owner only)',
        hidden: true,
        aliases: [
            'reevts'
        ]
    }
}