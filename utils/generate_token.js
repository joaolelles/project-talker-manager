const cryto = require('crypto');

function genToken() {
    return cryto.randomBytes(8).toString('hex');
}

module.exports = genToken;