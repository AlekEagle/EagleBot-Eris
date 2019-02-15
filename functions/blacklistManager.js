'use strict';

const fs = require('fs');

module.exports = {
    gblacklist: {users: []},

    manageBlacklist: (value) => {
        return new Promise((resolve, reject) => {
            switch (value.action) {
                case 'add':
                    switch (value.blklist) {
                        case 'gblk':
                            module.exports.gblacklist.users.push(value.id)
                            fs.writeFile('./gblacklist.blk', JSON.stringify(module.exports.gblacklist), err => {
                                if (err) {
                                    reject(err);
                                }else {
                                    resolve(module.exports.gblacklist.users.length);
                                }
                            });
                        break;
                    }
                break;
                case 'refresh':
                    switch (value.blklist) {
                        case 'gblk':
                            fs.readFile('./gblacklist.blk', (err, data) => {
                                if (err) {
                                    reject(err);
                                }else {
                                    data = JSON.parse(data.toString());
                                    module.exports.gblacklist = data;
                                    resolve(module.exports.gblacklist);
                                }
                            });
                        break;
                    }
                break;
                case 'remove':
                    switch (value.blklist) {
                        case 'gblk': 
                            module.exports.gblacklist.users = module.exports.gblacklist.users.filter(u => u !== value.id)
                            fs.writeFile('./gblacklist.blk', JSON.stringify(module.exports.gblacklist), err => {
                                if (err) {
                                    reject(err);
                                }else {
                                    module.exports.manageBlacklist({action: 'refresh', blklist: 'gblk'}).then(() => {
                                        resolve(module.exports.gblacklist.users.length);
                                    }, (err) => {
                                        reject(err);
                                    });
                                }
                            });
                        break;
                    }
                break;
            }
        });
    }
}