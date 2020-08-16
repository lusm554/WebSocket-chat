const Router = require('express').Router()
const path = require('path')
const userModel = require('../models/user')

Router.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'signin.html'))
})

Router.post('/signin', async (req, res) => {
    const { username, password } = req.body

    // get user from DB
    const user = ( await userModel.find({ username, password }) )[0] || null

    if(user) {
        res.json(user)
    }
    else {
        res.status(401).send('UNAUTHORIZED')
    }
})

module.exports = Router