const jsonwebtoken = require('jsonwebtoken');

const  JWT_KEY  = `2343admin73245Project2347`

function issueToken(data) {
    return jsonwebtoken.sign(data, "2343admin73245Project2347");
}

module.exports.issueToken = issueToken;
