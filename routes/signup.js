const Router = require('express').Router()
const path = require('path')
const userModel = require('../models/user')
const config = require('config')
const jwt = require('jsonwebtoken')

Router.get('/signup', (req, res) => {
    const PATH_TO_SIGNUP = path.join(__dirname, '..', 'public', 'signup.html')

    res.sendFile(PATH_TO_SIGNUP)
})

const accessTokenSecret = config.get('accessTokenSecret')
const refreshTokenSecret = config.get('refreshTokenSecret')

const refreshTokens = require( path.join(__dirname, '..', 'index.js') )

//performs user verification 
async function validateUser(req, res, next) {
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(401).send('Unauthorized')
    }

    const isUserExist = ( await userModel.find({ username, password }) ).length !== 0
    if(isUserExist) {
        return res.status(403).send('Forbidden')
    }

    // add user to DB
    new userModel({ username, password }).save((err, doc) => {
        if(err) {
            res.status(500).send('Internal Server Error')
            throw err;
        }
        /* pass the arguments to the next middlerware */
        req.doc = doc
        req.user = { username, password }
        next()
    })
}

async function createTokens(req, res, next) {
    const user = req.user
    /* generate an access tokens */

    // create a temporary token 
    const accessToken = jwt.sign({
        username: user.username,
        password: user.password 
    }, accessTokenSecret, {expiresIn: '1d'})

    // create a token to update the access token { accessToken }
    const refreshToken = jwt.sign({
        username: user.username,
        password: user.password
    }, refreshTokenSecret)

    refreshTokens.add(refreshToken)

    req.tokens = { accessToken, refreshToken }
    next()
}   

Router.post('/signup', validateUser, createTokens, (req, res) => {
    /**
     * If the user is verified,
     * we send the ID to 
     * the server 
     */
    res.json({ id: req.doc._id, ...req.tokens })
})

module.exports = Router