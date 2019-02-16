'use strict';

const Map = require('collections/map');
const fs = require('fs');

module.exports = {
    economy: new Map(),

    updateWal: (id, money, spinner) => {
        return new Promise((resolve, reject) => {
            try {
                if (module.exports.economy.has(id)) module.exports.economy.delete(id)
                module.exports.economy.set(id, {
                    money: money,
                    spinner: spinner
                })
                module.exports.saveEconomy().then(() => {
                    resolve(module.exports.economy.get(id))
                }, (err) => {
                    reject(err)
                })
            }catch (err) {
                reject(err)
            }
        })
    },
    readWal: (id) => {
        return new Promise((resolve, reject) => {
            if (module.exports.economy.get(id) === undefined) {
                module.exports.updateWal(id, 0, 0).then(walObj => {
                    resolve(walObj)
                }, err => {
                    reject(err)
                })
            }else {
                resolve(module.exports.economy.get(id))
            }
        });
    },
    initializeEconomy: () => {
        return new Promise((resolve, reject) => {
            try {
                module.exports.economy.clear();
                JSON.parse(fs.readFileSync('./economy.json', 'utf-8')).entries.forEach(e => {
                    module.exports.economy.set(e[0], e[1])
                });
            }catch (err) {
                reject(err)
            }
            resolve(module.exports.economy.size)
        });
    },
    saveEconomy: () => {
        return new Promise((resolve, reject) => {
            fs.writeFile('./economy.json', `{ "entries": [ ${module.exports.economy.toJSON().map(e => `[ "${e[0]}", ${JSON.stringify(e[1])} ]`).join(', ')} ] }`, (err) => {
                if (err) reject(err)
                else resolve()
            })
        });
        
    }
}