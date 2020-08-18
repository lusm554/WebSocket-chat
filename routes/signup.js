const Router = require('express').Router()
const path = require('path')
const userModel = require('../models/user')
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890', 4)

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

    const external_id = nanoid()
    // add user to DB
    new userModel({ username, password, external_id }).save((err, doc) => {
        if(err) {
            res.status(500).send('Internal Server Error')
            throw err;
        }
        /* pass the arguments to the next middlerware */
        req.doc = doc
        next()
    })
}

Router.post('/signup', validateUser, (req, res) => {
    /**
     * If the user is verified,
     * we send the ID to 
     * the server 
     */
    res.json(req.doc)
})

module.exports = Router