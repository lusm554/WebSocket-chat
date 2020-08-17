const Router = require('express').Router()
const path = require('path')
const userModel = require('../models/user')

Router.get('/signup', (req, res) => {
    const PATH_TO_SIGNUP = path.join(__dirname, '..', 'public', 'signup.html')

    res.sendFile(PATH_TO_SIGNUP)
})

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

Router.post('/signup', validateUser, (req, res) => {
    /**
     * If the user is verified,
     * we send the ID to 
     * the server 
     */
    res.json({ id: req.doc._id, ...req.user })
})

module.exports = Router