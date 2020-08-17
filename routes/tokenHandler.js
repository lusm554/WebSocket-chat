const Router = require('express').Router()
const config = require('config')
const jwt = require('jsonwebtoken')
/* Get token storage */
const refreshTokens = require('../index')

const accessTokenSecret = config.get('accessTokenSecret')
const refreshTokenSecret = config.get('refreshTokenSecret')

Router.post('/token', (req, res) => {
    const { token } = req.body

    if(!token) {
        res.status(401).send('Unauthorized')
    }

    if(!refreshTokens.has(token)) {
        res.status(403).send('Forbidden')
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if(err) {
            return res.status(403)
        }
         
        // create new access token for 30 min 
        const accessToken = jwt.sign({ 
            username: user.username, 
            password: user.password 
        }, accessTokenSecret, { expiresIn: '30min'})

        res.json({ accessToken })
    })
})

Router.post('/logout', (req, res) => {
    const { token } = req.body
    const isTokenRemoved = refreshTokens.delete(token)

    if(!isTokenRemoved) {
        return res.status(403).send('Forbidden')
    }

    res.sendStatus(200)
})

module.exports = Router