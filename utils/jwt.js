var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_ACCESS_TOKEN;

const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '100s' });
}

module.exports = {
    generateAccessToken
}