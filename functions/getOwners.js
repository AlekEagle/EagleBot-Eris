'use strict';

module.exports = {
    owners: ['222882552472535041'],

    isOwner: (id) => {
        return module.exports.owners.includes(id)
    }
}