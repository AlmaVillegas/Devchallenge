import expressJwt from 'express-jwt'
import userService from '../users/service'
import Config from '../config.json'

module.exports = jwt 

function jwt() {
    const secret = Config.secret
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            '/users/authenticate',
            '/users/register'
        ]
    }) 
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub)
    if (!user) {
        return done(null, true)
    }
    done()
}