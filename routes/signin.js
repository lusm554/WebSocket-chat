const Router = require('express').Router()
const path = require('path')
const jwt = require('jsonwebtoken')
const config = require('config')
const userModel = require('../models/user')

const accessTokenSecret = config.get('accessTokenSecret')
const refreshTokenSecret = config.get('refreshTokenSecret')

const refreshTokens = new Set()

Router.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'signin.html'))
})

Router.post('/signin', async (req, res) => {
    const { username, password } = req.body

    // get user from DB
    const user = ( await userModel.find({ username, password }) )[0] || null

    if(user) {
        /* generate an access tokens */

        // create a temporary token 
        const accessToken = jwt.sign({
            username: user.username,
            password: user.password 
        }, accessTokenSecret, {expiresIn: '30m'})

        // create a token to update the access token { accessToken }
        const refreshToken = jwt.sign({
            username: user.username,
            password: user.password
        }, refreshTokenSecret)

        refreshTokens.add(refreshToken)
        res.json({ accessToken, refreshToken})
    }
    else {
        res.status(401).send('UNAUTHORIZED')
    }
})

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
            throw res.status(403).send('Forbidden')
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